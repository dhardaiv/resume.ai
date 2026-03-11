'use client';

import { useEffect, useState } from 'react';

const STEPS = [
  { id: 0, label: 'Extracting text…', duration: 1400 },
  { id: 1, label: 'Computing embeddings…', duration: 2200 },
  { id: 2, label: 'Matching resume to job…', duration: 1600 },
];

export default function LoadingState() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    let elapsed = 0;
    const timers = STEPS.map((step, idx) => {
      const timer = setTimeout(() => setActiveStep(idx), elapsed);
      elapsed += step.duration;
      return timer;
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="card flex flex-col items-center gap-8 py-12">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-slate-700" />
        <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
      </div>

      <div className="w-full max-w-xs flex flex-col gap-3">
        {STEPS.map((step, idx) => {
          const state =
            idx < activeStep ? 'done' : idx === activeStep ? 'active' : 'pending';
          return (
            <div key={step.id} className="flex items-center gap-3">
              <StepDot state={state} />
              <span
                className={[
                  'text-sm transition-colors duration-300',
                  state === 'done'
                    ? 'text-green-400 line-through'
                    : state === 'active'
                    ? 'text-slate-100 font-medium'
                    : 'text-slate-600',
                ].join(' ')}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StepDot({ state }: { state: 'done' | 'active' | 'pending' }) {
  if (state === 'done') {
    return (
      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
        <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
          <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );
  }
  if (state === 'active') {
    return (
      <span className="flex-shrink-0 w-5 h-5 rounded-full border-2 border-blue-400 flex items-center justify-center">
        <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
      </span>
    );
  }
  return (
    <span className="flex-shrink-0 w-5 h-5 rounded-full border-2 border-slate-700" />
  );
}
