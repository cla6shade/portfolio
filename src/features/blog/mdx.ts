import { readdirSync } from 'fs';
import { join } from 'path';
import { type ReactNode } from 'react';

export interface BlogMetadata {
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  published: boolean;
}

export interface BlogPost {
  slug: string;
  Post: ReactNode;
  metadata: BlogMetadata;
}

export function getAllMdxFiles(): string[] {
  try {
    const contentsPath = join(process.cwd(), 'src', 'contents');
    const files = readdirSync(contentsPath);
    return files.filter((file) => file.endsWith('.mdx'));
  } catch (error) {
    console.error('Failed to read MDX files:', error);
    return [];
  }
}

export function getAllSlugs(): string[] {
  const files = getAllMdxFiles();
  return files.map((file) => file.replace(/\.mdx$/, ''));
}

export async function getMdxBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const { default: Post, metadata } = await import((`@/contents/${slug}.mdx`));
    return { slug, Post, metadata: metadata as BlogMetadata };
  } catch {
    return null;
  }
}

export async function getAllBlogPosts() {
  const files = getAllMdxFiles();

  const posts = (await Promise.all(files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '');
      return getMdxBySlug(slug);
    })))
    .filter((post): post is BlogPost => post !== null && post.metadata.published);

  return posts.sort((a, b) => {
    const dateA = new Date(a.metadata.date);
    const dateB = new Date(b.metadata.date);
    return dateB.getTime() - dateA.getTime();
  });
}
