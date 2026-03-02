import Link from 'next/link';
import ExperienceCard from '@/components/ExperienceCard';
import type { WorkExperience } from '@/types';

interface ExperiencePreviewProps {
  experiences: WorkExperience[];
}

export default function ExperiencePreview({ experiences }: ExperiencePreviewProps) {
  if (experiences.length === 0) {
    return null;
  }

  return (
    <section className="section-padding bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-dark-900 mb-3">
              Work <span className="gradient-text">Experience</span>
            </h2>
            <p className="text-dark-500 text-lg">My professional journey so far.</p>
          </div>
          <Link
            href="/experience"
            className="hidden sm:inline-flex items-center gap-2 text-primary-600 font-medium hover:text-primary-700 transition-colors"
          >
            View All
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Experience List */}
        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <div
              key={experience.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <ExperienceCard experience={experience} index={index} />
            </div>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-10 text-center sm:hidden">
          <Link
            href="/experience"
            className="inline-flex items-center gap-2 text-primary-600 font-medium hover:text-primary-700 transition-colors"
          >
            View Full Experience
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}