'use client';

import { useState } from 'react';
import FileUpload from '@/components/FileUpload';
import LoadingState from '@/components/LoadingState';
import MatchResults, { type AnalyzeResult } from '@/components/MatchResults';

type AppState = 'idle' | 'loading' | 'results' | 'error';

const RESUME_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
    <path fillRule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zM9.75 17.25a.75.75 0 00-1.5 0V18a.75.75 0 001.5 0v-.75zm2.25-3a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0v-3a.75.75 0 01.75-.75zm3.75-1.5a.75.75 0 00-1.5 0V18a.75.75 0 001.5 0v-4.5z" clipRule="evenodd" />
    <path d="M14.25 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0016.5 7.5h-1.875a.375.375 0 01-.375-.375V5.25z" />
  </svg>
);

const JOB_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
    <path fillRule="evenodd" d="M7.5 5.25a3 3 0 013-3h3a3 3 0 013 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0112 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 017.5 5.455V5.25zm7.5 0v.09a49.488 49.488 0 00-6 0v-.09a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5zm-3 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
    <path d="M3 18.4v-2.796a4.3 4.3 0 00.713.31A26.226 26.226 0 0012 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 01-6.477-.427C4.047 21.128 3 19.852 3 18.4z" />
  </svg>
);

export default function HomePage() {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobFile, setJobFile]       = useState<File | null>(null);
  const [appState, setAppState]     = useState<AppState>('idle');
  const [result, setResult]         = useState<AnalyzeResult | null>(null);
  const [errorMsg, setErrorMsg]     = useState('');

  const canAnalyze = resumeFile !== null && jobFile !== null;

  async function handleAnalyze() {
    if (!canAnalyze) return;
    setAppState('loading');
    setErrorMsg('');

    try {
      const form = new FormData();
      form.append('resume', resumeFile);
      form.append('job_description', jobFile);

      const res = await fetch('/api/analyze', { method: 'POST', body: form });
      if (!res.ok) throw new Error(`Server error ${res.status}: ${await res.text()}`);
      const data: AnalyzeResult = await res.json();
      setResult(data);
      setAppState('results');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'An unknown error occurred.');
      setAppState('error');
    }
  }

  function handleReset() {
    setResumeFile(null);
    setJobFile(null);
    setResult(null);
    setErrorMsg('');
    setAppState('idle');
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
          <BrainIcon />
          <div>
            <h1 className="text-lg font-bold text-white leading-tight tracking-tight">
              Resume–Job Match Analyzer
            </h1>
            <p className="text-xs text-slate-400 hidden sm:block">
              Powered by Hugging Face embeddings
            </p>
          </div>
          {appState === 'results' && (
            <button
              onClick={handleReset}
              className="ml-auto text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1"
            >
              <ResetIcon />
              New analysis
            </button>
          )}
        </div>
      </header>

      {/* ── Main ───────────────────────────────────────────────────── */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-10 flex flex-col gap-10">

        {/* Input section — hidden once results arrive */}
        {appState !== 'results' && (
          <>
            <section className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold text-white">Upload Documents</h2>
              <p className="text-slate-400 text-sm">
                Upload your resume and the target job description to get an AI-driven match analysis.
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card">
                <FileUpload
                  label="Resume"
                  accept=".pdf,.docx"
                  acceptLabel="PDF or DOCX, up to 10 MB"
                  icon={RESUME_ICON}
                  file={resumeFile}
                  onFileChange={setResumeFile}
                />
              </div>
              <div className="card">
                <FileUpload
                  label="Job Description"
                  accept=".pdf,.docx,.txt"
                  acceptLabel="PDF, DOCX or TXT, up to 10 MB"
                  icon={JOB_ICON}
                  file={jobFile}
                  onFileChange={setJobFile}
                />
              </div>
            </div>

            {/* Analyze button */}
            {appState !== 'loading' && (
              <div className="flex flex-col items-center gap-3">
                <button
                  onClick={handleAnalyze}
                  disabled={!canAnalyze}
                  className="btn-primary text-base px-12 py-4"
                >
                  <SparkleIcon />
                  Analyze Match
                </button>
                {!canAnalyze && (
                  <p className="text-xs text-slate-500">
                    Please upload both files to continue.
                  </p>
                )}
              </div>
            )}
          </>
        )}

        {/* Loading */}
        {appState === 'loading' && <LoadingState />}

        {/* Error */}
        {appState === 'error' && (
          <div className="card border-red-900 bg-red-950/20 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-red-400">
              <AlertIcon />
              <span className="font-semibold">Analysis failed</span>
            </div>
            <p className="text-sm text-red-300">{errorMsg}</p>
            <button
              onClick={handleReset}
              className="self-start text-sm text-slate-400 hover:text-white underline transition-colors"
            >
              Try again
            </button>
          </div>
        )}

        {/* Results */}
        {appState === 'results' && result && (
          <section className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Analysis Results</h2>
                <p className="text-sm text-slate-400 mt-1">
                  {resumeFile?.name} &nbsp;↔&nbsp; {jobFile?.name}
                </p>
              </div>
            </div>
            <MatchResults result={result} />
          </section>
        )}
      </main>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer className="border-t border-slate-800 py-5 text-center text-xs text-slate-600">
        Resume–Job Match Analyzer · Powered by sentence-transformers
      </footer>
    </div>
  );
}

/* ── Icon helpers ────────────────────────────────────────────────────── */
function BrainIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-blue-400">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
      <path d="M15.98 1.804a1 1 0 00-1.96 0l-.24 1.192a1 1 0 01-.784.785l-1.192.238a1 1 0 000 1.962l1.192.238a1 1 0 01.785.785l.238 1.192a1 1 0 001.962 0l.238-1.192a1 1 0 01.785-.785l1.192-.238a1 1 0 000-1.962l-1.192-.238a1 1 0 01-.785-.785l-.238-1.192zM6.949 5.684a1 1 0 00-1.898 0l-.683 2.051a1 1 0 01-.633.633l-2.051.683a1 1 0 000 1.898l2.051.684a1 1 0 01.633.632l.683 2.051a1 1 0 001.898 0l.684-2.051a1 1 0 01.632-.632l2.051-.684a1 1 0 000-1.898l-2.051-.683a1 1 0 01-.632-.633L6.95 5.684zM13.949 13.684a1 1 0 00-1.898 0l-.184.551a1 1 0 01-.632.633l-.551.183a1 1 0 000 1.898l.551.183a1 1 0 01.633.633l.183.551a1 1 0 001.898 0l.184-.551a1 1 0 01.632-.633l.551-.183a1 1 0 000-1.898l-.551-.184a1 1 0 01-.633-.632l-.183-.551z" />
    </svg>
  );
}

function ResetIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.389zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z" clipRule="evenodd" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
      <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
    </svg>
  );
}
