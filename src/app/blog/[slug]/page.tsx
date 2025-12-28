import DefaultPad from '@/components/container/DefaultPad';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import Link from 'next/link';
import { type Metadata } from 'next';
import { BlogMetadata, getAllBlogPosts } from '@/features/blog/utils/post';
import { Badge } from '@/components/ui/badge';
import ContentVerticalPad from '@/components/container/ContentVerticalPad';
import PostControllerTrack from '@/features/blog/controller/PostControllerTrack';
import PostController from '@/features/blog/controller/PostController';
import Image from 'next/image';

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const { metadata } = await import(`@/contents/${slug}/index.mdx`);
    const { title, description, author, thumbnail } = metadata as BlogMetadata;

    return {
      metadataBase: 'https://cla6sha.de',
      title,
      description,
      authors: [{ name: author }],
      openGraph: {
        title,
        description,
        type: 'article',
        images: thumbnail ? [{ url: thumbnail }] : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: thumbnail ? [thumbnail] : undefined,
      },
    };
  } catch {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let mdx = null;
  try {
    mdx = await import(`@/contents/${slug}/index.mdx`);
  } catch (_: unknown) {
    return <></>;
  }
  const { default: Post, metadata } = mdx;
  const { title, description, date, author, tags } = metadata as BlogMetadata;

  const formattedDate = new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <DefaultPad className="flex justify-center">
      <ContentVerticalPad className="w-full max-w-4xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sandy-brown hover:text-peru transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={date}>{formattedDate}</time>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{author}</span>
            </div>
          </div>

          <p className="text-lg text-muted-foreground mb-6">{description}</p>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={`tag-${tag}`} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </header>

        <article>
          <Post />
        </article>
      </ContentVerticalPad>
      <ContentVerticalPad>
        <PostControllerTrack>
          <PostController />
        </PostControllerTrack>
      </ContentVerticalPad>
    </DefaultPad>
  );
}
