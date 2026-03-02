import type { Metadata } from 'next';
import { getProjects } from '@/lib/cosmic';
import ProjectCard from '@/components/ProjectCard';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Projects | My Portfolio',
  description: 'Browse my collection of projects showcasing my development skills and creativity.',
};

export default async function ProjectsPage() {
  const projects = await getProjects();

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
          My <span className="gradient-text">Projects</span>
        </h1>
        <p className="text-lg text-dark-500 max-w-2xl mx-auto">
          A collection of projects I&apos;ve built, from web applications to creative experiments.
          Each one represents a unique challenge and learning experience.
        </p>
      </div>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 bg-dark-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-dark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-dark-700 mb-2">No projects yet</h3>
          <p className="text-dark-500">Projects will appear here once added to Cosmic CMS.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}