import { join, basename, dirname } from 'path';
import { type ReactNode } from 'react';
import { glob } from 'glob';

export interface BlogMetadata {
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  published: boolean;
  thumbnail?: string;
}

export interface BlogPost {
  slug: string;
  Post: ReactNode;
  metadata: BlogMetadata;
}

export interface PostInfo {
  slug: string;
  metadata: BlogMetadata;
}

export async function getAllMdxFiles() {
  try {
    const contentsPath = join(process.cwd(), 'src/contents/**/index.mdx');
    return await glob(contentsPath, {
      windowsPathsNoEscape: true,
    });
  } catch (error) {
    console.error('Failed to read MDX files:', error);
    return [];
  }
}

export function getSlugByFilename(filename: string): string {
  // Extract the parent directory name as the slug
  // e.g., "C:\...\src\contents\portfolio-dev-1\index.mdx" -> "portfolio-dev-1"
  const dir = dirname(filename);
  return basename(dir);
}

export async function getAllSlugs() {
  const files = await getAllMdxFiles();
  return files.map((file) => getSlugByFilename(file));
}

export async function getMdxBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const { default: Post, metadata } = await import(`@/contents/${slug}/index.mdx`);
    return { slug, Post, metadata: metadata as BlogMetadata };
  } catch {
    return null;
  }
}

export async function getAllBlogPosts() {
  const files = await getAllMdxFiles();

  const posts = (
    await Promise.all(
      files.map((file) => {
        const slug = getSlugByFilename(file);
        return getMdxBySlug(slug);
      }),
    )
  ).filter((post): post is BlogPost => post !== null && post.metadata.published);

  return posts.sort((a, b) => {
    const dateA = new Date(a.metadata.date);
    const dateB = new Date(b.metadata.date);
    return dateB.getTime() - dateA.getTime();
  });
}
