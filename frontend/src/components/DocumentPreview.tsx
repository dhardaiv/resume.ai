'use client';

import { useEffect, useState } from 'react';

interface DocumentPreviewProps {
  file: File | null;
  label: string;
}

const TYPE_CONFIG: Record<string, { bg: string; text: string; border: string; tag: string }> = {
  pdf:  { bg: 'bg-red-950',   text: 'text-red-400',   border: 'border-red-900',   tag: 'PDF' },
  docx: { bg: 'bg-blue-950',  text: 'text-blue-400',  border: 'border-blue-900',  tag: 'DOCX' },
  txt:  { bg: 'bg-slate-800', text: 'text-slate-300', border: 'border-slate-700', tag: 'TXT' },
};

const FALLBACK_TYPE = { bg: 'bg-slate-800', text: 'text-slate-300', border: 'border-slate-700', tag: '' };

export default function DocumentPreview({ file, label }: DocumentPreviewProps) {
  const [textContent, setTextContent] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setTextContent(null);
      return;
    }
    if (file.type === 'text/plain' || file.name.toLowerCase().endsWith('.txt')) {
      const reader = new FileReader();
      reader.onload = (e) => setTextContent((e.target?.result as string) ?? null);
      reader.readAsText(file);
    } else {
      setTextContent(null);
    }
  }, [file]);

  if (!file) return null;

  const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
  const cfg = TYPE_CONFIG[ext] ?? { ...FALLBACK_TYPE, tag: ext.toUpperCase() };
  const displaySize =
    file.size > 1024 * 1024
      ? `${(file.size / 1024 / 1024).toFixed(2)} MB`
      : `${(file.size / 1024).toFixed(1)} KB`;

  return (
    <div className="flex flex-col gap-2 animate-fade-up">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-1">
        {label} Preview
      </p>

      <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
        {/* File header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-800 bg-slate-900/60">
          <DocIcon ext={ext} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-200 truncate">{file.name}</p>
            <p className="text-xs text-slate-500 mt-0.5">{displaySize}</p>
          </div>
          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.text} border ${cfg.border}`}
          >
            {cfg.tag}
          </span>
        </div>

        {/* Content */}
        {textContent !== null ? (
          <div className="px-4 py-3 max-h-56 overflow-y-auto">
            <pre className="text-xs text-slate-300 whitespace-pre-wrap font-mono leading-relaxed">
              {textContent.slice(0, 2000)}
              {textContent.length > 2000 && (
                <span className="text-slate-600">
                  {' '}
                  …[{(textContent.length - 2000).toLocaleString()} more characters]
                </span>
              )}
            </pre>
          </div>
        ) : (
          <div className="px-4 py-8 flex flex-col items-center gap-3 text-center">
            <div
              className={`w-14 h-14 rounded-xl ${cfg.bg} border ${cfg.border} flex items-center justify-center`}
            >
              <DocIconLarge ext={ext} color={cfg.text} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-300">Document ready for analysis</p>
              <p className="text-xs text-slate-500 mt-1 max-w-[220px] mx-auto">
                {ext === 'pdf'
                  ? 'Text will be extracted from the PDF on the server.'
                  : 'Text will be extracted from the DOCX on the server.'}
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                Ready
              </span>
              <span>{displaySize}</span>
              <span>{cfg.tag}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Internal icons ──────────────────────────────────────────────────────── */

function DocIcon({ ext }: { ext: string }) {
  const color =
    ext === 'pdf' ? 'text-red-400' : ext === 'docx' ? 'text-blue-400' : 'text-slate-400';
  return (
    <svg
      viewBox="0 0 28 34"
      fill="none"
      className={`w-6 h-7 flex-shrink-0 ${color}`}
    >
      <rect
        x="1"
        y="1"
        width="26"
        height="32"
        rx="3"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M18 1v8h8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 15h14M7 19.5h10M7 24h12"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DocIconLarge({ ext, color }: { ext: string; color: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`w-7 h-7 ${color}`}
    >
      <path
        fillRule="evenodd"
        d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875z"
        clipRule="evenodd"
      />
      <path d="M14.25 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0016.5 7.5h-1.875a.375.375 0 01-.375-.375V5.25z" />
    </svg>
  );
}
