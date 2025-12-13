import DefaultPad from '@/components/container/DefaultPad';
import BlogPostCard from '@/features/blog/BlogPostCard';
import { getAllBlogPosts } from '@/features/blog/mdx';

export default async function BlogPage() {
  const blogPosts = await getAllBlogPosts();

  return (
    <DefaultPad className="py-16 font-noto-serif">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-peru">Clavis.log</h1>
          <p className="text-lg text-muted-foreground">
            개발하면서 배운 것들과 생각들을 기록합니다.
          </p>
        </header>

        <div className="grid gap-6">
          {blogPosts.map((post) => (
            <BlogPostCard
              key={`blog-post-${post.slug}`}
              slug={post.slug}
              title={post.metadata.title}
              description={post.metadata.description}
              date={post.metadata.date}
              tags={post.metadata.tags}
            />
          ))}
        </div>

        {blogPosts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">아직 작성된 포스트가 없습니다.</p>
          </div>
        )}
      </div>
    </DefaultPad>
  );
}
