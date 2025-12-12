import DefaultPad from '@/components/container/DefaultPad';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { default: Post } = await import(`@/contents/${slug}.mdx`);

  return (
    <DefaultPad className="py-16">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sandy-brown hover:text-peru transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <article className="prose prose-lg max-w-none prose-headings:heading-gradient prose-a:text-sandy-brown prose-a:no-underline hover:prose-a:text-peru prose-strong:text-foreground prose-code:text-peru prose-code:bg-cream prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-neutral-950 prose-pre:text-foreground prose-blockquote:border-l-sandy-brown prose-blockquote:text-muted-foreground">
          <Post />
        </article>
      </div>
    </DefaultPad>
  );
}
