import type { Metadata } from 'next';
import { getWorkExperience } from '@/lib/cosmic';
import ExperienceCard from '@/components/ExperienceCard';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Experience | My Portfolio',
  description: 'My professional work experience, roles, and contributions across various companies.',
};

export default async function ExperiencePage() {
  const experiences = await getWorkExperience();

  return (
    <div className="section-padding max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="text-center mb-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-dark-500 hover:text-primary-600 transition-colors mb-6"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>
        <h1 className="text-4xl sm:text-5xl font-bold text-dark-900 mb-4">
          Work <span className="gradient-text">Experience</span>
        </h1>
        <p className="text-lg text-dark-500 max-w-2xl mx-auto">
          My professional journey and the companies I&apos;ve had the privilege to work with.
        </p>
      </div>

      {experiences.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 bg-dark-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-dark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-dark-700 mb-2">No experience added yet</h3>
          <p className="text-dark-500">Work experience will appear here once added to Cosmic CMS.</p>
        </div>
      ) : (
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary-400 via-accent-400 to-primary-300 transform md:-translate-x-px hidden md:block" />

          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <div
                key={experience.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <ExperienceCard
                  experience={experience}
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}