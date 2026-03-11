"""Request/response schemas."""

from typing import Dict, List

from pydantic import BaseModel, Field


# ── Legacy /match endpoint ────────────────────────────────────────────────────

class MatchRequest(BaseModel):
    resume_text: str = Field(..., description="Full resume text")
    job_description: str = Field(..., description="Full job description text")


class MatchResponse(BaseModel):
    score: float = Field(..., ge=0, le=1, description="Similarity score 0–1")


# ── /analyze endpoint ─────────────────────────────────────────────────────────

class AnalyzeResponse(BaseModel):
    match_score: float = Field(..., ge=0, le=1, description="Overall similarity score 0–1")
    matched_skills: List[str] = Field(default_factory=list, description="Skills present in both resume and job description")
    missing_skills: List[str] = Field(default_factory=list, description="Skills in the job description absent from the resume")
    section_scores: Dict[str, float] = Field(default_factory=dict, description="Per-section similarity scores")
