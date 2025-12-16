'use client';

import { useState, useMemo } from 'react';
import { Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import BlogPostCard from '@/features/blog/BlogPostCard';
import { type PostInfo } from '@/features/blog/utils/post';
import { cn } from '@/lib/utils';
import SectionTitle from '@/features/blog/sections/SectionTitle';

interface PostsByTagsSectionProps {
  posts: PostInfo[];
}

export default function AllPostsSection({ posts }: PostsByTagsSectionProps) {
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach((post) => {
      post.metadata.tags.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [posts]);

  const isAllSelected = selectedTags.size === 0;

  const handleTagClick = (tag: string) => {
    const newSelectedTags = new Set(selectedTags);

    if (newSelectedTags.has(tag)) {
      newSelectedTags.delete(tag);
    } else {
      newSelectedTags.add(tag);
    }

    setSelectedTags(newSelectedTags);
  };

  const handleAllClick = () => {
    setSelectedTags(new Set());
  };

  const filteredPosts = useMemo(() => {
    if (selectedTags.size === 0) {
      return posts;
    }
    return posts.filter((post) => post.metadata.tags.some((tag) => selectedTags.has(tag)));
  }, [posts, selectedTags]);

  if (allTags.length === 0) {
    return null;
  }

  return (
    <section className="space-y-8 pb-24">
      <SectionTitle>모든 게시글</SectionTitle>

      <div className="flex flex-col desktop:flex-row gap-8">
        <aside className="desktop:w-64 desktop:order-2 lg-desktop:w-72 shrink-0">
          <div className="desktop:sticky desktop:top-24">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <Tag className="w-4 h-4" />
              <span>태그</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge
                asChild
                variant={isAllSelected ? 'default' : 'outline'}
                className={cn(
                  'cursor-pointer transition-colors',
                  isAllSelected
                    ? 'bg-sandy-brown border-sandy-brown hover:bg-sandy-brown/90'
                    : 'hover:border-sandy-brown',
                )}
              >
                <button onClick={handleAllClick}>전체</button>
              </Badge>
              {allTags.map((tag) => (
                <Badge
                  key={`tag-filter-${tag}`}
                  asChild
                  variant={selectedTags.has(tag) ? 'default' : 'outline'}
                  className={cn(
                    'cursor-pointer transition-colors px-3 py-1',
                    selectedTags.has(tag)
                      ? 'bg-sandy-brown border-sandy-brown hover:bg-sandy-brown/90'
                      : 'hover:border-sandy-brown',
                  )}
                >
                  <button onClick={() => handleTagClick(tag)}>{tag}</button>
                </Badge>
              ))}
            </div>
          </div>
        </aside>

        <div className="flex-1 min-w-0 desktop:order-1">
          <div className="grid grid-cols-1 tablet:grid-cols-2 lg-desktop:grid-cols-3 gap-6">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <BlogPostCard
                  key={`tagged-post-${post.slug}`}
                  slug={post.slug}
                  title={post.metadata.title}
                  description={post.metadata.description}
                  date={post.metadata.date}
                  tags={post.metadata.tags}
                  thumbnail={post.metadata.thumbnail}
                />
              ))
            ) : (
              <div className="py-20">
                <p className="text-muted-foreground">해당 태그의 게시글이 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
