"""Match resume to job description."""

from fastapi import APIRouter, HTTPException

from app.models.schemas import MatchRequest, MatchResponse
from app.services.embeddings import get_match_score

router = APIRouter()


@router.post("", response_model=MatchResponse)
def match_resume_to_job(req: MatchRequest) -> MatchResponse:
    """Compute semantic similarity (0–1) between resume and job description."""
    if not req.resume_text.strip():
        raise HTTPException(400, "resume_text is required")
    if not req.job_description.strip():
        raise HTTPException(400, "job_description is required")
    score = get_match_score(req.resume_text, req.job_description)
    return MatchResponse(score=score)
