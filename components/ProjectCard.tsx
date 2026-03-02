import Link from 'next/link';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
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
  const isFeatured = project.metadata?.featured;

  return (
    <div className="group bg-white rounded-2xl border border-dark-100 overflow-hidden card-hover">
      {/* Screenshot */}
      <div className="relative aspect-video bg-dark-100 overflow-hidden">
        {screenshot && screenshot.imgix_url ? (
          <img
            src={`${screenshot.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
            alt={`${project.title} screenshot`}
            width={400}
            height={225}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center gradient-bg opacity-20">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Featured Badge */}
        {isFeatured && (
          <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-primary-700 flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            Featured
          </div>
        )}

        {/* Hover Overlay with Links */}
        <div className="absolute inset-0 bg-dark-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white text-dark-900 text-sm font-medium rounded-lg hover:bg-dark-50 transition-colors"
            >
              Live Demo
            </a>
          )}
          {sourceUrl && (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-dark-800 text-white text-sm font-medium rounded-lg hover:bg-dark-700 transition-colors"
            >
              Source
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <Link href={`/projects/${project.slug}`} className="block group/title">
          <h3 className="text-lg font-bold text-dark-900 mb-2 group-hover/title:text-primary-600 transition-colors">
            {project.title}
          </h3>
        </Link>

        {description && (
          <p className="text-dark-500 text-sm mb-4 line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}

        {/* Tech Stack Tags */}
        {techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {techStack.slice(0, 4).map((tech: string) => (
              <span
                key={tech}
                className="px-2.5 py-1 bg-dark-50 text-dark-600 text-xs font-medium rounded-md"
              >
                {tech}
              </span>
            ))}
            {techStack.length > 4 && (
              <span className="px-2.5 py-1 bg-primary-50 text-primary-600 text-xs font-medium rounded-md">
                +{techStack.length - 4} more
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}