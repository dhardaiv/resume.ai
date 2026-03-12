# Resume -- Job Description Matching Engine

Match resumes to job descriptions using semantic similarity powered by Hugging Face embeddings.

## Tech stack

- **Frontend:** React / Next.js (App Router)
- **Backend:** FastAPI
- **Embeddings:** Hugging Face sentence-transformers (e.g. `sentence-transformers/all-MiniLM-L6-v2`)

## Repo structure

```
resume.ai/
├── frontend/          # Next.js app
├── backend/           # FastAPI + HF embeddings
├── README.md
└── .gitignore
```

## Quick start

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env       # edit as needed
uvicorn app.main:app --reload
```
