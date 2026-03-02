import Link from 'next/link';

interface HeroSectionProps {
  projectCount: number;
  skillCount: number;
  experienceCount: number;
}

export default function HeroSection({ projectCount, skillCount, experienceCount }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50" />
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
        backgroundSize: '40px 40px',
      }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md border border-dark-100 mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-dark-600">Available for opportunities</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-dark-900 mb-6 animate-slide-up">
            Hi, I&apos;m a{' '}
            <span className="gradient-text">Creative</span>
            <br />
            <span className="gradient-text">Developer</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-dark-500 max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '100ms' }}>
            I build modern web applications and digital experiences.
            Passionate about clean code, beautiful design, and solving complex problems.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-8 py-4 gradient-bg text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-primary-500/25"
            >
              View My Work
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/experience"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-dark-700 font-semibold rounded-xl border border-dark-200 hover:bg-dark-50 transition-colors"
            >
              My Experience
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto animate-slide-up" style={{ animationDelay: '300ms' }}>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold gradient-text">{projectCount}</div>
              <div className="text-sm text-dark-500 mt-1">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold gradient-text">{skillCount}</div>
              <div className="text-sm text-dark-500 mt-1">Skills</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold gradient-text">{experienceCount}</div>
              <div className="text-sm text-dark-500 mt-1">Roles</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}