"""Hugging Face embedding model and similarity scoring."""

import re
from typing import Dict, List, Optional

from sentence_transformers import SentenceTransformer

from app.config import settings

_model: Optional[SentenceTransformer] = None

# Section headers to look for in a resume (maps canonical name → regex variants)
_SECTION_PATTERNS: Dict[str, re.Pattern] = {
    "experience": re.compile(
        r"(?:work\s+)?experience|employment(\s+history)?|work\s+history",
        re.IGNORECASE,
    ),
    "skills": re.compile(
        r"(?:technical\s+)?skills?|competenc(?:y|ies)|technologies",
        re.IGNORECASE,
    ),
    "education": re.compile(
        r"education(?:al\s+background)?|academic|qualifications?",
        re.IGNORECASE,
    ),
}

# Regex that matches a line that looks like a section header:
# - all-caps word(s), or
# - a word/phrase followed by an optional colon at the start of a line
_HEADER_LINE = re.compile(r"^([A-Z][A-Za-z\s&/]+):?\s*$", re.MULTILINE)


def _get_model() -> SentenceTransformer:
    global _model
    if _model is None:
        _model = SentenceTransformer(settings.embedding_model_id)
    return _model


def _cosine(a, b) -> float:
    score = float((a @ b) / ((a @ a) ** 0.5 * (b @ b) ** 0.5))
    return (score + 1) / 2  # normalise [-1, 1] → [0, 1]


def get_match_score(resume_text: str, job_description: str) -> float:
    """Compute overall cosine similarity (0–1) between resume and job description."""
    model = _get_model()
    a, b = model.encode([resume_text, job_description])
    return _cosine(a, b)


def get_section_scores(resume_text: str, job_description: str) -> Dict[str, float]:
    """
    Split the resume into Experience / Skills / Education sections and return
    the cosine similarity of each section against the full job description.
    Falls back to scoring the whole resume when a section cannot be found.
    """
    sections = _split_sections(resume_text)
    if not sections:
        return {}

    model = _get_model()
    job_vec = model.encode([job_description])[0]

    scores: Dict[str, float] = {}
    for section_name, text in sections.items():
        if text.strip():
            sec_vec = model.encode([text])[0]
            scores[section_name] = round(_cosine(sec_vec, job_vec), 4)

    return scores


def _split_sections(resume_text: str) -> Dict[str, str]:
    """
    Locate canonical sections in the resume text.
    Returns a dict of { canonical_name: section_text }.
    """
    lines = resume_text.splitlines()

    # Find header lines and their positions
    header_positions: List[tuple] = []  # (line_index, canonical_name)
    for i, line in enumerate(lines):
        stripped = line.strip()
        for canonical, pattern in _SECTION_PATTERNS.items():
            if pattern.fullmatch(stripped) or (
                _HEADER_LINE.match(stripped) and pattern.search(stripped)
            ):
                header_positions.append((i, canonical))
                break

    if not header_positions:
        return {}

    # Slice text between consecutive headers
    sections: Dict[str, str] = {}
    for idx, (line_no, name) in enumerate(header_positions):
        start = line_no + 1
        end = header_positions[idx + 1][0] if idx + 1 < len(header_positions) else len(lines)
        sections[name] = "\n".join(lines[start:end]).strip()

    return sections
