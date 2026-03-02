import type { Metadata } from 'next';
import { getSkills } from '@/lib/cosmic';
import SkillCard from '@/components/SkillCard';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Skills | My Portfolio',
  description: 'Explore my technical skills and proficiencies across various technologies and tools.',
};

export default async function SkillsPage() {
  const skills = await getSkills();

  // Group skills by category
  const skillsByCategory: Record<string, typeof skills> = {};
  const uncategorized: typeof skills = [];

  for (const skill of skills) {
    const category = skill.metadata?.category;
    if (category) {
      if (!skillsByCategory[category]) {
        skillsByCategory[category] = [];
      }
      const arr = skillsByCategory[category];
      if (arr) {
        arr.push(skill);
      }
    } else {
      uncategorized.push(skill);
    }
  }

  const categoryKeys = Object.keys(skillsByCategory).sort();

  return (
    <div className="section-padding max-w-7xl mx-auto">
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
          My <span className="gradient-text">Skills</span>
        </h1>
        <p className="text-lg text-dark-500 max-w-2xl mx-auto">
          Technologies, tools, and frameworks I work with to bring ideas to life.
        </p>
      </div>

      {skills.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 bg-dark-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-dark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-dark-700 mb-2">No skills added yet</h3>
          <p className="text-dark-500">Skills will appear here once added to Cosmic CMS.</p>
        </div>
      ) : (
        <div className="space-y-16">
          {categoryKeys.map((category) => {
            const categorySkills = skillsByCategory[category];
            if (!categorySkills || categorySkills.length === 0) {
              return null;
            }

            return (
              <section key={category}>
                <h2 className="text-2xl font-bold text-dark-900 mb-8 flex items-center gap-3">
                  <span className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center text-white text-lg">
                    {category.charAt(0).toUpperCase()}
                  </span>
                  {category}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {categorySkills.map((skill, index) => (
                    <div
                      key={skill.id}
                      className="animate-slide-up"
                      style={{ animationDelay: `${index * 80}ms` }}
                    >
                      <SkillCard skill={skill} />
                    </div>
                  ))}
                </div>
              </section>
            );
          })}

          {uncategorized.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-dark-900 mb-8 flex items-center gap-3">
                <span className="w-10 h-10 bg-dark-200 rounded-lg flex items-center justify-center text-dark-600 text-lg">
                  •
                </span>
                Other Skills
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {uncategorized.map((skill, index) => (
                  <div
                    key={skill.id}
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    <SkillCard skill={skill} />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}