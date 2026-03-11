"""POST /analyze — accepts uploaded files, returns full match analysis."""

from fastapi import APIRouter, File, HTTPException, UploadFile

from app.models.schemas import AnalyzeResponse
from app.services.embeddings import get_match_score, get_section_scores
from app.services.skills import get_skill_matches
from app.services.text_extraction import extract_text

router = APIRouter()

_MAX_FILE_BYTES = 10 * 1024 * 1024  # 10 MB


@router.post("", response_model=AnalyzeResponse)
async def analyze(
    resume: UploadFile = File(..., description="Resume file (PDF or DOCX)"),
    job_description: UploadFile = File(..., description="Job description file (PDF, DOCX, or TXT)"),
) -> AnalyzeResponse:
    """
    Accept resume and job-description files, extract their text, and return
    a full semantic match analysis including score, skill gaps, and section scores.
    """
    resume_bytes = await resume.read()
    job_bytes    = await job_description.read()

    if len(resume_bytes) > _MAX_FILE_BYTES:
        raise HTTPException(413, "Resume file exceeds the 10 MB limit.")
    if len(job_bytes) > _MAX_FILE_BYTES:
        raise HTTPException(413, "Job description file exceeds the 10 MB limit.")

    resume_text = extract_text(resume_bytes, resume.filename or "resume.pdf")
    job_text    = extract_text(job_bytes,    job_description.filename or "job.txt")

    if not resume_text.strip():
        raise HTTPException(422, "Could not extract any text from the resume.")
    if not job_text.strip():
        raise HTTPException(422, "Could not extract any text from the job description.")

    match_score              = get_match_score(resume_text, job_text)
    matched_skills, missing_skills = get_skill_matches(resume_text, job_text)
    section_scores           = get_section_scores(resume_text, job_text)

    return AnalyzeResponse(
        match_score=round(match_score, 4),
        matched_skills=matched_skills,
        missing_skills=missing_skills,
        section_scores=section_scores,
    )
