import DefaultPad from '@/components/container/DefaultPad';
import BlogPostCard from '@/features/blog/BlogPostCard';

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
}

const blogPosts: BlogPost[] = [
  {
    slug: 'example',
    title: 'Example MDX Content',
    description: 'This is an example MDX file demonstrating various markdown and MDX features',
    date: '2025-12-11',
    tags: ['example', 'mdx', 'demo'],
  },
];

export default function BlogPage() {
  return (
    <DefaultPad className="py-16">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-peru">Blog</h1>
          <p className="text-lg text-muted-foreground">
            개발하면서 배운 것들과 생각들을 기록합니다.
          </p>
        </header>

        <div className="grid gap-6">
          {blogPosts.map((post) => (
            <BlogPostCard
              key={`blog-post-${post.slug}`}
              slug={post.slug}
              title={post.title}
              description={post.description}
              date={post.date}
              tags={post.tags}
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
