"""Keyword-based skill extraction and matching."""

import re
from typing import List, Tuple

# Curated list of common technical and professional skills.
# Multi-word entries are matched before single-word ones (ordered by length desc).
_SKILLS_CATALOG: List[str] = sorted(
    [
        # Languages
        "Python", "JavaScript", "TypeScript", "Java", "C++", "C#", "Go", "Rust",
        "Ruby", "Swift", "Kotlin", "Scala", "R", "MATLAB", "PHP", "Bash",
        # Frontend
        "React", "Next.js", "Vue.js", "Angular", "Svelte", "HTML", "CSS",
        "Tailwind CSS", "Bootstrap", "Sass", "Redux", "GraphQL",
        # Backend
        "FastAPI", "Django", "Flask", "Express.js", "Node.js", "Spring Boot",
        "REST API", "gRPC",
        # Databases
        "PostgreSQL", "MySQL", "SQLite", "MongoDB", "Redis", "Elasticsearch",
        "DynamoDB", "Cassandra", "Supabase", "Firebase",
        # Cloud & DevOps
        "AWS", "GCP", "Azure", "Docker", "Kubernetes", "Terraform", "Ansible",
        "CI/CD", "GitHub Actions", "Jenkins", "Linux",
        # ML / AI
        "Machine Learning", "Deep Learning", "Natural Language Processing",
        "Computer Vision", "TensorFlow", "PyTorch", "scikit-learn",
        "Hugging Face", "LangChain", "OpenAI", "RAG",
        "sentence-transformers", "BERT", "GPT",
        # Data
        "Pandas", "NumPy", "Spark", "Hadoop", "Kafka", "Airflow", "dbt",
        "SQL", "ETL", "Data Pipelines",
        # Tools & practices
        "Git", "GitHub", "Agile", "Scrum", "Jira", "Figma",
        "Unit Testing", "Integration Testing", "TDD", "System Design",
        "Microservices", "API Design",
    ],
    key=lambda s: -len(s),
)

# Pre-compile a regex per skill (case-insensitive, word-boundary aware)
_SKILL_PATTERNS = [
    (skill, re.compile(r"(?<![A-Za-z])" + re.escape(skill) + r"(?![A-Za-z])", re.IGNORECASE))
    for skill in _SKILLS_CATALOG
]


def extract_skills(text: str) -> List[str]:
    """Return a deduplicated list of skills found in *text*."""
    found: List[str] = []
    for skill, pattern in _SKILL_PATTERNS:
        if pattern.search(text):
            found.append(skill)
    return found


def get_skill_matches(resume_text: str, job_text: str) -> Tuple[List[str], List[str]]:
    """
    Compare skills in the resume vs the job description.

    Returns:
        matched_skills: skills present in both
        missing_skills: skills in the job description but absent from the resume
    """
    resume_skills = set(s.lower() for s in extract_skills(resume_text))
    job_skills    = extract_skills(job_text)

    matched: List[str] = []
    missing: List[str] = []

    seen: set = set()
    for skill in job_skills:
        key = skill.lower()
        if key in seen:
            continue
        seen.add(key)
        if key in resume_skills:
            matched.append(skill)
        else:
            missing.append(skill)

    return matched, missing
