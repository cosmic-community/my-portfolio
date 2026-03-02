import Link from 'next/link';
import SkillCard from '@/components/SkillCard';
import type { Skill } from '@/types';

interface SkillsPreviewProps {
  skills: Skill[];
}

export default function SkillsPreview({ skills }: SkillsPreviewProps) {
  if (skills.length === 0) {
    return null;
  }

  return (
    <section className="section-padding bg-dark-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-dark-900 mb-3">
              Technical <span className="gradient-text">Skills</span>
            </h2>
            <p className="text-dark-500 text-lg">Technologies and tools I use daily.</p>
          </div>
          <Link
            href="/skills"
            className="hidden sm:inline-flex items-center gap-2 text-primary-600 font-medium hover:text-primary-700 transition-colors"
          >
            View All
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {skills.map((skill, index) => (
            <div
              key={skill.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <SkillCard skill={skill} />
            </div>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-10 text-center sm:hidden">
          <Link
            href="/skills"
            className="inline-flex items-center gap-2 text-primary-600 font-medium hover:text-primary-700 transition-colors"
          >
            View All Skills
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}