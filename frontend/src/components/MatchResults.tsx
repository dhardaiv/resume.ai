'use client';

import { useEffect, useRef } from 'react';

export interface AnalyzeResult {
  match_score: number;
  matched_skills: string[];
  missing_skills: string[];
  section_scores: Record<string, number>;
}

function scoreColor(score: number) {
  if (score >= 0.75) return { text: 'text-green-400', bar: 'bg-green-500', ring: 'text-green-400' };
  if (score >= 0.5)  return { text: 'text-yellow-400', bar: 'bg-yellow-500', ring: 'text-yellow-400' };
  return { text: 'text-red-400', bar: 'bg-red-500', ring: 'text-red-400' };
}

function scoreLabel(score: number) {
  if (score >= 0.75) return 'Strong Match';
  if (score >= 0.5)  return 'Moderate Match';
  return 'Weak Match';
}

/* ─── Animated circle gauge ──────────────────────────────────────────── */
function CircleGauge({ score }: { score: number }) {
  const pct = Math.round(score * 100);
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;
  const colors = scoreColor(score);

  return (
    <div className="relative flex items-center justify-center">
      <svg width="136" height="136" className="-rotate-90">
        <circle cx="68" cy="68" r={radius} fill="none" stroke="#1e293b" strokeWidth="10" />
        <circle
          cx="68" cy="68" r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={`${colors.ring} transition-all duration-1000 ease-out`}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className={`text-3xl font-bold tabular-nums ${colors.text}`}>
          {pct}%
        </span>
        <span className="text-xs text-slate-400 mt-0.5">{scoreLabel(score)}</span>
      </div>
    </div>
  );
}

/* ─── Animated horizontal bar ────────────────────────────────────────── */
function ProgressBar({ value, color }: { value: number; color: string }) {
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      el.style.width = `${Math.round(value * 100)}%`;
    });
  }, [value]);

  return (
    <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
      <div
        ref={barRef}
        style={{ width: '0%' }}
        className={`h-full rounded-full ${color} transition-all duration-700 ease-out`}
      />
    </div>
  );
}

/* ─── Skill pill ─────────────────────────────────────────────────────── */
function SkillPill({ label, variant }: { label: string; variant: 'match' | 'missing' }) {
  return (
    <span
      className={[
        'inline-block rounded-full px-3 py-1 text-xs font-medium border',
        variant === 'match'
          ? 'bg-green-950 text-green-300 border-green-800'
          : 'bg-red-950 text-red-300 border-red-800',
      ].join(' ')}
    >
      {label}
    </span>
  );
}

/* ─── Section scores ─────────────────────────────────────────────────── */
function SectionScores({ sections }: { sections: Record<string, number> }) {
  const entries = Object.entries(sections);
  if (entries.length === 0) return null;

  return (
    <div className="card flex flex-col gap-5">
      <h3 className="font-semibold text-slate-200">Section Similarity</h3>
      <div className="flex flex-col gap-4">
        {entries.map(([section, score]) => {
          const colors = scoreColor(score);
          return (
            <div key={section} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-300 capitalize">{section}</span>
                <span className={`font-semibold tabular-nums ${colors.text}`}>
                  {Math.round(score * 100)}%
                </span>
              </div>
              <ProgressBar value={score} color={colors.bar} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Main results component ─────────────────────────────────────────── */
export default function MatchResults({ result }: { result: AnalyzeResult }) {
  const { match_score, matched_skills, missing_skills, section_scores } = result;

  return (
    <div className="flex flex-col gap-6">
      {/* Score overview */}
      <div className="card flex flex-col sm:flex-row items-center gap-6">
        <CircleGauge score={match_score} />
        <div className="flex flex-col gap-3 flex-1 w-full">
          <h2 className="text-xl font-bold text-slate-100">Overall Match Score</h2>
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-sm text-slate-400">
              <span>Match strength</span>
              <span>{Math.round(match_score * 100)}%</span>
            </div>
            <ProgressBar value={match_score} color={scoreColor(match_score).bar} />
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            {match_score >= 0.75
              ? 'Your resume aligns very well with this job. You are a strong candidate.'
              : match_score >= 0.5
              ? 'Decent alignment. Consider tailoring your resume to the missing skills.'
              : 'Low alignment detected. Review the missing skills and consider bridging the gap.'}
          </p>
        </div>
      </div>

      {/* Skills grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Matched skills */}
        <div className="card flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <CheckCircleIcon className="text-green-400 w-5 h-5" />
            <h3 className="font-semibold text-slate-200">Matching Skills</h3>
            <span className="ml-auto text-xs text-slate-500">
              {matched_skills.length} found
            </span>
          </div>
          {matched_skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {matched_skills.map((s) => (
                <SkillPill key={s} label={s} variant="match" />
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500 italic">No matched skills identified.</p>
          )}
        </div>

        {/* Missing skills */}
        <div className="card flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <XCircleIcon className="text-red-400 w-5 h-5" />
            <h3 className="font-semibold text-slate-200">Missing Skills</h3>
            <span className="ml-auto text-xs text-slate-500">
              {missing_skills.length} found
            </span>
          </div>
          {missing_skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {missing_skills.map((s) => (
                <SkillPill key={s} label={s} variant="missing" />
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500 italic">No missing skills detected.</p>
          )}
        </div>
      </div>

      {/* Section scores */}
      <SectionScores sections={section_scores} />
    </div>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
    </svg>
  );
}

function XCircleIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
    </svg>
  );
}
