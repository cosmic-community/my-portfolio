// app/projects/[slug]/page.tsx
import type { Metadata } from 'next';
import { getProjectBySlug, getProjects } from '@/lib/cosmic';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: 'Project Not Found | My Portfolio' };
  }

  return {
    title: `${project.title} | My Portfolio`,
    description: project.metadata?.description || `Details about the ${project.title} project.`,
  };
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const screenshot = project.metadata?.screenshot;
  const techStackValue = project.metadata?.tech_stack; // Changed: handle array or string values safely
  const techStack = Array.isArray(techStackValue)
    ? techStackValue
        .filter((tech): tech is string => typeof tech === 'string' && tech.trim().length > 0)
    : typeof techStackValue === 'string'
      ? techStackValue
          .split(',')
          .map((t: string) => t.trim())
          .filter(Boolean)
      : [];
  const liveUrl = project.metadata?.live_url;
  const sourceUrl = project.metadata?.source_url;
  const description = project.metadata?.description || '';

  return (
    <div className="section-padding max-w-5xl mx-auto">
      {/* Back Link */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm text-dark-500 hover:text-primary-600 transition-colors mb-8"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      {/* Project Header */}
      <div className="mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-dark-900 mb-4">
          {project.title}
        </h1>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mt-6">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 gradient-bg text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View Live
            </a>
          )}
          {sourceUrl && (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-dark-900 text-white font-medium rounded-lg hover:bg-dark-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Source Code
            </a>
          )}
        </div>
      </div>

      {/* Screenshot */}
      {screenshot && screenshot.imgix_url && (
        <div className="mb-10 rounded-2xl overflow-hidden shadow-2xl border border-dark-100">
          <img
            src={`${screenshot.imgix_url}?w=2000&h=1200&fit=crop&auto=format,compress`}
            alt={`${project.title} screenshot`}
            width={1000}
            height={600}
            className="w-full h-auto"
          />
        </div>
      )}

      {/* Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Description */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-dark-900 mb-4">About This Project</h2>
          <div className="prose prose-lg max-w-none text-dark-600 leading-relaxed whitespace-pre-wrap">
            {description || 'No description available.'}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Tech Stack */}
          {techStack.length > 0 && (
            <div className="bg-dark-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-dark-900 mb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech: string) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 bg-white text-dark-700 text-sm font-medium rounded-lg border border-dark-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Project Info */}
          <div className="bg-dark-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-dark-900 mb-4">Project Info</h3>
            <dl className="space-y-3">
              {project.metadata?.featured && (
                <div>
                  <dt className="text-sm text-dark-500">Status</dt>
                  <dd className="text-sm font-medium text-primary-600 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    Featured Project
                  </dd>
                </div>
              )}
              <div>
                <dt className="text-sm text-dark-500">Created</dt>
                <dd className="text-sm font-medium text-dark-700">
                  {new Date(project.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}