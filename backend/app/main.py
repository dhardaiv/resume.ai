"""FastAPI app entrypoint."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import analyze as analyze_routes
from app.api.routes import match as match_routes

app = FastAPI(
    title="Resume–Job Match API",
    description="Semantic matching between resume and job description using HF embeddings.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Bug 1 fix: register the /analyze endpoint that the frontend calls
app.include_router(analyze_routes.router, prefix="/analyze", tags=["analyze"])
# Legacy text-based endpoint kept for backward compatibility
app.include_router(match_routes.router, prefix="/match", tags=["match"])


@app.get("/health")
def health():
    return {"status": "ok"}
