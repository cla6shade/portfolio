import BlogPostCard from '@/features/blog/BlogPostCard';
import { type PostInfo } from '@/features/blog/utils/post';
import SectionTitle from '@/features/blog/sections/SectionTitle';

interface RecentPostsSectionProps {
  posts: PostInfo[];
  limit?: number;
}

export default function RecentPostsSection({ posts, limit = 6 }: RecentPostsSectionProps) {
  const recentPosts = posts.slice(0, limit);

  if (recentPosts.length === 0) {
    return null;
  }

  return (
    <section className="space-y-8 pb-24 grow">
      <SectionTitle>Recent Posts</SectionTitle>
      <div className="grid grid-cols-1 gap-6">
        {recentPosts.map((post) => (
          <BlogPostCard
            key={`recent-post-${post.slug}`}
            slug={post.slug}
            title={post.metadata.title}
            description={post.metadata.description}
            date={post.metadata.date}
            tags={post.metadata.tags}
            thumbnail={post.metadata.thumbnail}
            variant="horizontal"
          />
        ))}
      </div>
    </section>
  );
}
