import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 overflow-x-hidden">
      {/* Background radial glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-blue-600/[0.07] blur-[120px] rounded-full" />
      </div>

      {/* ── Navigation ─────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BrainIcon />
            <span className="text-lg font-bold text-white tracking-tight">
              resume<span className="text-blue-400">.ai</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#how-it-works"
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              How it works
            </a>
            <a
              href="#features"
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              Features
            </a>
          </div>
          <Link
            href="/analyze"
            className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 shadow-lg shadow-blue-900/30"
          >
            Try it free
            <ArrowRightIcon />
          </Link>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="relative max-w-6xl mx-auto w-full px-4 sm:px-6 pt-20 pb-28">
        <div className="flex flex-col lg:flex-row items-center gap-14">
          {/* Left: copy */}
          <div className="flex-1 flex flex-col gap-7 animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-blue-950/60 border border-blue-800/60 rounded-full px-3.5 py-1.5 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-xs font-medium text-blue-300">
                AI-Powered Resume Matching
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-extrabold leading-[1.07] tracking-tight">
              <span className="text-white">Match your resume</span>
              <br />
              <span className="gradient-text">to any job.</span>
            </h1>

            <p className="text-lg text-slate-400 leading-relaxed max-w-lg">
              Upload your resume and a job description to instantly discover how well
              they align — and exactly which skills to highlight or bridge the gap.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/analyze"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-blue-900/30 hover:shadow-blue-700/40 text-base"
              >
                <SparkleIcon />
                Start analyzing free
              </Link>
              <a
                href="#how-it-works"
                className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
              >
                See how it works
                <ChevronDownIcon />
              </a>
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-6 pt-1">
              {[
                { value: '~80', label: 'Skills tracked' },
                { value: '3', label: 'File formats' },
                { value: '<30s', label: 'Analysis time' },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-2xl font-bold text-white">{stat.value}</span>
                  <span className="text-xs text-slate-500">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: visual mockup */}
          <div className="flex-1 flex justify-center lg:justify-end w-full max-w-md lg:max-w-none">
            <HeroMockup />
          </div>
        </div>
      </section>

      {/* ── How it works ───────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-20 border-t border-slate-800/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-white mb-3">How it works</h2>
            <p className="text-slate-400">Three steps to understand your fit</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-8 left-[calc(33%-24px)] right-[calc(33%-24px)] h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

            {HOW_IT_WORKS.map((step, i) => (
              <div key={i} className="relative flex flex-col items-center text-center gap-4 px-4">
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-blue-400">
                    {step.icon}
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-white">{step.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────────────────── */}
      <section id="features" className="py-20 border-t border-slate-800/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-white mb-3">Everything you need</h2>
            <p className="text-slate-400">Powered by state-of-the-art NLP</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((feature, i) => (
              <div
                key={i}
                className="card flex flex-col gap-4 hover:border-slate-700 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 group-hover:border-blue-800/60 group-hover:bg-blue-950/30 flex items-center justify-center text-blue-400 transition-colors">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-200 mb-1.5">{feature.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA banner ─────────────────────────────────────────────────── */}
      <section className="py-24 border-t border-slate-800/50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center gap-7">
          <h2 className="text-4xl font-extrabold text-white leading-tight">
            Ready to land your
            <br />
            <span className="gradient-text">dream job?</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-md">
            Start with your resume today — free, instant, no sign-up needed.
          </p>
          <Link
            href="/analyze"
            className="inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg shadow-blue-900/30 hover:shadow-blue-700/40 text-base"
          >
            <SparkleIcon />
            Analyze my resume
          </Link>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer className="border-t border-slate-800 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <BrainIcon />
            <span className="text-sm font-bold text-slate-400">
              resume<span className="text-blue-400">.ai</span>
            </span>
          </div>
          <p className="text-xs text-slate-600 text-center">
            Powered by Hugging Face sentence-transformers · Built with Next.js & FastAPI
          </p>
        </div>
      </footer>
    </div>
  );
}

/* ── Data ──────────────────────────────────────────────────────────────── */

const HOW_IT_WORKS = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path fillRule="evenodd" d="M11.47 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 01-1.06 1.06l-3.22-3.22V16.5a.75.75 0 01-1.5 0V4.81L8.03 8.03a.75.75 0 01-1.06-1.06l4.5-4.5zM3 15.75a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
      </svg>
    ),
    title: 'Upload Your Files',
    description:
      'Drag and drop your resume (PDF or DOCX) and the job description (PDF, DOCX, or TXT) — up to 10 MB each.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
      </svg>
    ),
    title: 'AI Analyzes Them',
    description:
      'Our NLP model computes semantic similarity using sentence embeddings and extracts skills from both documents.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
      </svg>
    ),
    title: 'Get Actionable Insights',
    description:
      'See your overall match score, matched and missing skills, and a section-by-section similarity breakdown.',
  },
];

const FEATURES = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path d="M15.98 1.804a1 1 0 00-1.96 0l-.24 1.192a1 1 0 01-.784.785l-1.192.238a1 1 0 000 1.962l1.192.238a1 1 0 01.785.785l.238 1.192a1 1 0 001.962 0l.238-1.192a1 1 0 01.785-.785l1.192-.238a1 1 0 000-1.962l-1.192-.238a1 1 0 01-.785-.785l-.238-1.192zM6.949 5.684a1 1 0 00-1.898 0l-.683 2.051a1 1 0 01-.633.633l-2.051.683a1 1 0 000 1.898l2.051.684a1 1 0 01.633.632l.683 2.051a1 1 0 001.898 0l.684-2.051a1 1 0 01.632-.632l2.051-.684a1 1 0 000-1.898l-2.051-.683a1 1 0 01-.632-.633L6.95 5.684z" />
      </svg>
    ),
    title: 'Semantic Matching',
    description:
      'Goes beyond keyword matching — sentence embeddings understand context and meaning, just like a recruiter would.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
      </svg>
    ),
    title: 'Skill Gap Analysis',
    description:
      'Identifies exactly which of ~80 tracked skills you have versus what the job requires, so you know what to add.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path d="M2 4.25A2.25 2.25 0 014.25 2h11.5A2.25 2.25 0 0118 4.25v8.5A2.25 2.25 0 0115.75 15h-3.105a3.501 3.501 0 001.1 1.677A.75.75 0 0113.26 18H6.74a.75.75 0 01-.484-1.323A3.501 3.501 0 007.355 15H4.25A2.25 2.25 0 012 12.75v-8.5z" />
      </svg>
    ),
    title: 'Section Breakdown',
    description:
      'Scores your Experience, Skills, and Education sections individually so you know exactly where you shine.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5V7.621a1.5 1.5 0 00-.44-1.06l-4.12-4.122A1.5 1.5 0 0011.378 2H4.5zm2.25 8.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5zm0 3a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5zm0-6a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" clipRule="evenodd" />
      </svg>
    ),
    title: 'Multiple Formats',
    description:
      'Accepts PDF, DOCX, and TXT files for both your resume and the job description. Text extraction is automatic.',
  },
];

/* ── Hero Mockup ─────────────────────────────────────────────────────────── */

function HeroMockup() {
  return (
    <div className="relative w-full max-w-[440px] animate-float" style={{ animationDelay: '0.4s' }}>
      {/* Glow */}
      <div className="absolute -inset-6 bg-blue-600/8 blur-3xl rounded-full" />
      <div className="relative bg-slate-900 border border-slate-700/80 rounded-2xl overflow-hidden shadow-2xl shadow-black/60">
        {/* Titlebar */}
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-slate-800 bg-slate-950/70">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          <div className="flex-1 mx-3 h-5 bg-slate-800 rounded-md flex items-center px-2.5">
            <span className="text-[10px] text-slate-500">resume.ai/analyze</span>
          </div>
        </div>

        <div className="p-4 flex flex-col gap-3.5">
          {/* Docs + Score row */}
          <div className="flex items-center gap-2.5">
            {/* Resume doc */}
            <div className="flex-1 bg-slate-800/70 rounded-xl p-3 border border-slate-700/50">
              <div className="flex items-center gap-1.5 mb-2">
                <div className="w-2 h-2.5 bg-blue-400/80 rounded-sm" />
                <span className="text-[10px] text-slate-300 font-medium">Resume.pdf</span>
              </div>
              <div className="space-y-1.5">
                {[100, 85, 75, 95, 60].map((w, i) => (
                  <div
                    key={i}
                    className="h-1.5 bg-slate-700 rounded-full"
                    style={{ width: `${w}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Score circle */}
            <div className="flex-shrink-0 flex flex-col items-center gap-1">
              <div className="relative w-14 h-14">
                <svg viewBox="0 0 56 56" className="w-full h-full -rotate-90">
                  <circle cx="28" cy="28" r="22" fill="none" stroke="#1e293b" strokeWidth="5" />
                  <circle
                    cx="28"
                    cy="28"
                    r="22"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray="138.2"
                    strokeDashoffset="18"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold text-green-400">87%</span>
                </div>
              </div>
              <span className="text-[9px] text-slate-500 font-medium uppercase tracking-wide">
                Match
              </span>
            </div>

            {/* Job doc */}
            <div className="flex-1 bg-slate-800/70 rounded-xl p-3 border border-slate-700/50">
              <div className="flex items-center gap-1.5 mb-2">
                <div className="w-2 h-2.5 bg-indigo-400/80 rounded-sm" />
                <span className="text-[10px] text-slate-300 font-medium">Job Desc.txt</span>
              </div>
              <div className="space-y-1.5">
                {[90, 100, 80, 70, 85].map((w, i) => (
                  <div
                    key={i}
                    className="h-1.5 bg-slate-700 rounded-full"
                    style={{ width: `${w}%` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="bg-slate-800/40 rounded-xl p-3 border border-slate-700/30">
            <p className="text-[9px] text-slate-500 font-semibold uppercase tracking-wider mb-2">
              Skills
            </p>
            <div className="flex flex-wrap gap-1.5">
              {[
                { label: 'Python', match: true },
                { label: 'React', match: true },
                { label: 'SQL', match: true },
                { label: 'TypeScript', match: true },
                { label: 'Kubernetes', match: false },
                { label: 'Go', match: false },
              ].map(({ label, match }) => (
                <span
                  key={label}
                  className={[
                    'text-[9px] px-2 py-0.5 rounded-full font-medium border',
                    match
                      ? 'bg-green-950 text-green-400 border-green-900'
                      : 'bg-red-950 text-red-400 border-red-900',
                  ].join(' ')}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Section bars */}
          <div className="flex flex-col gap-2">
            {[
              { label: 'Experience', value: 82, color: 'bg-green-500' },
              { label: 'Skills', value: 91, color: 'bg-green-500' },
              { label: 'Education', value: 58, color: 'bg-yellow-500' },
            ].map(({ label, value, color }) => (
              <div key={label} className="flex items-center gap-2">
                <span className="text-[9px] text-slate-500 w-14 text-right">{label}</span>
                <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full ${color} rounded-full`} style={{ width: `${value}%` }} />
                </div>
                <span className="text-[9px] text-slate-500 w-6">{value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Icons ───────────────────────────────────────────────────────────────── */

function BrainIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="w-7 h-7 text-blue-400"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
      />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-5 h-5"
    >
      <path d="M15.98 1.804a1 1 0 00-1.96 0l-.24 1.192a1 1 0 01-.784.785l-1.192.238a1 1 0 000 1.962l1.192.238a1 1 0 01.785.785l.238 1.192a1 1 0 001.962 0l.238-1.192a1 1 0 01.785-.785l1.192-.238a1 1 0 000-1.962l-1.192-.238a1 1 0 01-.785-.785l-.238-1.192zM6.949 5.684a1 1 0 00-1.898 0l-.683 2.051a1 1 0 01-.633.633l-2.051.683a1 1 0 000 1.898l2.051.684a1 1 0 01.633.632l.683 2.051a1 1 0 001.898 0l.684-2.051a1 1 0 01.632-.632l2.051-.684a1 1 0 000-1.898l-2.051-.683a1 1 0 01-.632-.633L6.95 5.684zM13.949 13.684a1 1 0 00-1.898 0l-.184.551a1 1 0 01-.632.633l-.551.183a1 1 0 000 1.898l.551.183a1 1 0 01.633.633l.183.551a1 1 0 001.898 0l.184-.551a1 1 0 01.632-.633l.551-.183a1 1 0 000-1.898l-.551-.184a1 1 0 01-.633-.632l-.183-.551z" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-4 h-4"
    >
      <path
        fillRule="evenodd"
        d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-4 h-4"
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}
