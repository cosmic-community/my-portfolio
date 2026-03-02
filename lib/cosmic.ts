import { createBucketClient } from '@cosmicjs/sdk';
import type { Project, Skill, WorkExperience } from '@/types';
import { hasStatus } from '@/types';

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging',
});

/**
 * Safely extract a string value from a Cosmic metafield value.
 * Some metafield types (like select-dropdown) return {key, value} objects
 * instead of plain strings. This helper handles both cases.
 */
export function resolveMetafieldValue(val: unknown): string {
  if (val === null || val === undefined) return '';
  if (typeof val === 'string') return val;
  if (typeof val === 'number' || typeof val === 'boolean') return String(val);
  if (typeof val === 'object' && 'value' in (val as Record<string, unknown>)) {
    return String((val as Record<string, unknown>).value ?? '');
  }
  if (typeof val === 'object' && 'key' in (val as Record<string, unknown>)) {
    return String((val as Record<string, unknown>).key ?? '');
  }
  return String(val);
}

export async function getProjects(): Promise<Project[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'projects' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at', 'type'])
      .depth(1);

    return response.objects as Project[];
  } catch (error: unknown) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch projects');
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'projects', 'metadata.featured': true })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at', 'type'])
      .depth(1);

    return response.objects as Project[];
  } catch (error: unknown) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch featured projects');
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'projects', slug })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at', 'type'])
      .depth(1);

    return response.object as Project;
  } catch (error: unknown) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch project');
  }
}

export async function getSkills(): Promise<Skill[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'skills' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at', 'type'])
      .depth(1);

    return response.objects as Skill[];
  } catch (error: unknown) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch skills');
  }
}

export async function getWorkExperience(): Promise<WorkExperience[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'work-experience' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at', 'type'])
      .depth(1);

    const experiences = response.objects as WorkExperience[];

    return experiences.sort((a, b) => {
      const dateA = new Date(a.metadata?.start_date || '').getTime();
      const dateB = new Date(b.metadata?.start_date || '').getTime();
      return dateB - dateA;
    });
  } catch (error: unknown) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch work experience');
  }
}