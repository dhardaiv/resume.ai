"""Extract plain text from uploaded PDF, DOCX, or TXT files."""

import io
from pathlib import Path

import pypdf
import docx
from fastapi import HTTPException


def extract_text(file_bytes: bytes, filename: str) -> str:
    """Return plain text content from a PDF, DOCX, or TXT file."""
    ext = Path(filename).suffix.lower()

    if ext == ".pdf":
        return _extract_pdf(file_bytes)
    if ext == ".docx":
        return _extract_docx(file_bytes)
    if ext == ".txt":
        return file_bytes.decode("utf-8", errors="replace")

    raise HTTPException(
        status_code=415,
        detail=f"Unsupported file type '{ext}'. Upload PDF, DOCX, or TXT.",
    )


def _extract_pdf(data: bytes) -> str:
    try:
        reader = pypdf.PdfReader(io.BytesIO(data))
        pages = [page.extract_text() or "" for page in reader.pages]
        text = "\n".join(pages).strip()
        if not text:
            raise HTTPException(
                status_code=422,
                detail="Could not extract text from the PDF. The file may be scanned/image-only.",
            )
        return text
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=422, detail=f"Failed to parse PDF: {exc}") from exc


def _extract_docx(data: bytes) -> str:
    try:
        doc = docx.Document(io.BytesIO(data))
        paragraphs = [p.text for p in doc.paragraphs if p.text.strip()]
        return "\n".join(paragraphs)
    except Exception as exc:
        raise HTTPException(status_code=422, detail=f"Failed to parse DOCX: {exc}") from exc
