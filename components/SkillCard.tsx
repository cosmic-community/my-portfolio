import type { Skill } from '@/types';
import { resolveMetafieldValue } from '@/lib/cosmic';

interface SkillCardProps {
  skill: Skill;
}

export default function SkillCard({ skill }: SkillCardProps) {
  const name = resolveMetafieldValue(skill.metadata?.name) || skill.title;
  const category = resolveMetafieldValue(skill.metadata?.category); // Changed: safely resolve potential {key,value} object
  const proficiency = typeof skill.metadata?.proficiency === 'number'
    ? skill.metadata.proficiency
    : Number(resolveMetafieldValue(skill.metadata?.proficiency)) || undefined; // Changed: safely resolve proficiency
  const icon = resolveMetafieldValue(skill.metadata?.icon); // Changed: safely resolve potential {key,value} object

  const proficiencyLabel = (level: number | undefined): string => {
    if (!level) return '';
    if (level >= 90) return 'Expert';
    if (level >= 70) return 'Advanced';
    if (level >= 50) return 'Intermediate';
    return 'Beginner';
  };

  const proficiencyColor = (level: number | undefined): string => {
    if (!level) return 'bg-dark-200';
    if (level >= 90) return 'bg-green-500';
    if (level >= 70) return 'bg-primary-500';
    if (level >= 50) return 'bg-accent-500';
    return 'bg-amber-500';
  };

  return (
    <div className="bg-white rounded-xl border border-dark-100 p-5 card-hover group">
      <div className="flex items-start gap-3 mb-3">
        {/* Icon */}
        <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center text-xl flex-shrink-0 group-hover:bg-primary-100 transition-colors">
          {icon || '🔧'}
        </div>

        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-dark-900 truncate">{name}</h3>
          {category && (
            <p className="text-xs text-dark-400 mt-0.5">{category}</p>
          )}
        </div>
      </div>

      {/* Proficiency Bar */}
      {proficiency != null && proficiency > 0 && (
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-dark-500">{proficiencyLabel(proficiency)}</span>
            <span className="text-xs font-medium text-dark-600">{proficiency}%</span>
          </div>
          <div className="w-full bg-dark-100 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${proficiencyColor(proficiency)}`}
              style={{ width: `${proficiency}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}