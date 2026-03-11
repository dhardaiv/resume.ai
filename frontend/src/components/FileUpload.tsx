'use client';

import { useCallback, useState } from 'react';

interface FileUploadProps {
  label: string;
  accept: string;
  acceptLabel: string;
  icon: React.ReactNode;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

export default function FileUpload({
  label,
  accept,
  acceptLabel,
  icon,
  file,
  onFileChange,
}: FileUploadProps) {
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const processFile = useCallback(
    (f: File) => {
      onFileChange(f);
      if (f.type === 'text/plain') {
        const reader = new FileReader();
        reader.onload = (e) =>
          setPreview((e.target?.result as string).slice(0, 400));
        reader.readAsText(f);
      } else {
        setPreview(null);
      }
    },
    [onFileChange],
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const dropped = e.dataTransfer.files[0];
      if (dropped) processFile(dropped);
    },
    [processFile],
  );

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) processFile(selected);
  };

  const clear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFileChange(null);
    setPreview(null);
  };

  const inputId = `file-upload-${label.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
        {label}
      </label>

      <label
        htmlFor={inputId}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={[
          'relative flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed',
          'cursor-pointer transition-all duration-200 min-h-[160px] p-6 text-center',
          file
            ? 'border-blue-500 bg-blue-950/30'
            : dragging
            ? 'border-blue-400 bg-blue-950/40 scale-[1.01]'
            : 'border-slate-700 bg-slate-800/50 hover:border-slate-500 hover:bg-slate-800',
        ].join(' ')}
      >
        <input
          id={inputId}
          type="file"
          accept={accept}
          className="sr-only"
          onChange={onInputChange}
        />

        {file ? (
          <>
            <div className="flex items-center gap-2 text-blue-400">
              <FileIcon />
              <span className="font-medium text-slate-200 max-w-[200px] truncate">
                {file.name}
              </span>
            </div>
            <span className="text-xs text-slate-400">
              {(file.size / 1024).toFixed(1)} KB
            </span>
            <button
              onClick={clear}
              className="absolute top-2 right-2 text-slate-500 hover:text-red-400 transition-colors p-1"
              aria-label="Remove file"
            >
              <CloseIcon />
            </button>
          </>
        ) : (
          <>
            <div className="text-slate-500">{icon}</div>
            <div>
              <p className="text-sm text-slate-300">
                <span className="text-blue-400 font-medium">Click to upload</span>{' '}
                or drag & drop
              </p>
              <p className="text-xs text-slate-500 mt-1">{acceptLabel}</p>
            </div>
          </>
        )}
      </label>

      {preview && (
        <div className="bg-slate-800 rounded-lg p-3 border border-slate-700">
          <p className="text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">
            Preview
          </p>
          <pre className="text-xs text-slate-300 whitespace-pre-wrap font-mono leading-relaxed line-clamp-6">
            {preview}
            {preview.length >= 400 && (
              <span className="text-slate-500"> …</span>
            )}
          </pre>
        </div>
      )}
    </div>
  );
}

function FileIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625z" />
      <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
    </svg>
  );
}
