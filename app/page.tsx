import HeroSection from '@/components/HeroSection';
import FeaturedProjects from '@/components/FeaturedProjects';
import SkillsPreview from '@/components/SkillsPreview';
import ExperiencePreview from '@/components/ExperiencePreview';
import { getFeaturedProjects, getProjects, getSkills, getWorkExperience } from '@/lib/cosmic';

export default async function HomePage() {
  const [featuredProjectsResult, allProjectsResult, skills, experiences] = await Promise.all([
    getFeaturedProjects(),
    getProjects(),
    getSkills(),
    getWorkExperience(),
  ]);

  const featuredProjects = featuredProjectsResult.length > 0
    ? featuredProjectsResult
    : allProjectsResult.slice(0, 3);

  return (
    <>
      <HeroSection
        projectCount={allProjectsResult.length}
        skillCount={skills.length}
        experienceCount={experiences.length}
      />
      <FeaturedProjects projects={featuredProjects} />
      <SkillsPreview skills={skills.slice(0, 8)} />
      <ExperiencePreview experiences={experiences.slice(0, 3)} />
    </>
  );
}