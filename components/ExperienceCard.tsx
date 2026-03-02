import type { WorkExperience } from '@/types';
import { resolveMetafieldValue } from '@/lib/cosmic';

interface ExperienceCardProps {
  experience: WorkExperience;
  index: number;
}

export default function ExperienceCard({ experience, index }: ExperienceCardProps) {
  const company = resolveMetafieldValue(experience.metadata?.company) || 'Company'; // Changed: safely resolve
  const role = resolveMetafieldValue(experience.metadata?.role) || experience.title; // Changed: safely resolve
  const startDate = resolveMetafieldValue(experience.metadata?.start_date); // Changed: safely resolve
  const endDate = resolveMetafieldValue(experience.metadata?.end_date); // Changed: safely resolve
  const currentlyWorking = experience.metadata?.currently_working;
  const description = resolveMetafieldValue(experience.metadata?.description); // Changed: safely resolve

  const formatDate = (dateStr: string | undefined): string => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  };

  const dateRange = `${formatDate(startDate || undefined)}${startDate ? ' — ' : ''}${
    currentlyWorking ? 'Present' : formatDate(endDate || undefined)
  }`;

  const isEven = index % 2 === 0;

  return (
    <div className={`relative flex flex-col md:flex-row items-start gap-6 ${
      !isEven ? 'md:flex-row-reverse' : ''
    }`}>
      {/* Timeline Dot (Desktop) */}
      <div className="hidden md:flex absolute left-1/2 top-6 transform -translate-x-1/2 z-10">
        <div className={`w-4 h-4 rounded-full border-4 border-white shadow-md ${
          currentlyWorking ? 'bg-green-500' : 'gradient-bg'
        }`} />
      </div>

      {/* Card */}
      <div className={`flex-1 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
        <div className="bg-white rounded-xl border border-dark-100 p-6 card-hover">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h3 className="text-lg font-bold text-dark-900">{role}</h3>
              <p className="text-primary-600 font-medium">{company}</p>
            </div>
            {currentlyWorking && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full flex-shrink-0">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                Current
              </span>
            )}
          </div>

          {/* Date */}
          <div className="flex items-center gap-2 text-sm text-dark-400 mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {dateRange}
          </div>

          {/* Description */}
          {description && (
            <div className="text-dark-600 text-sm leading-relaxed whitespace-pre-wrap">
              {description}
            </div>
          )}
        </div>
      </div>

      {/* Spacer for alternating layout */}
      <div className="hidden md:block flex-1" />
    </div>
  );
}