import { type ReactNode } from 'react';
import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import CodeBlock from '@/components/CodeBlock';
import Image, { ImageProps } from 'next/image';

interface TextProps {
  children: ReactNode;
}

interface LinkProps {
  href: string;
  children: ReactNode;
}

interface CodeProps {
  children: ReactNode;
  className?: string;
}

interface PreProps {
  children: ReactNode;
}

export function useMDXComponents(): MDXComponents {
  return {
    h1: ({ children }: TextProps) => (
      <h1 className="text-4xl font-bold mt-8 mb-4 text-foreground">{children}</h1>
    ),
    h2: ({ children }: TextProps) => (
      <h2 className="text-3xl font-bold mt-6 mb-3 text-foreground">{children}</h2>
    ),
    h3: ({ children }: TextProps) => (
      <h3 className="text-2xl font-bold mt-5 mb-2 text-foreground">{children}</h3>
    ),
    h4: ({ children }: TextProps) => (
      <h4 className="text-xl font-bold mt-4 mb-2 text-muted-foreground">{children}</h4>
    ),
    h5: ({ children }: TextProps) => (
      <h5 className="text-lg font-bold mt-3 mb-2 text-muted-foreground">{children}</h5>
    ),
    h6: ({ children }: TextProps) => (
      <h6 className="text-base font-bold mt-2 mb-1 text-muted-foreground">{children}</h6>
    ),
    p: ({ children }: TextProps) => <p className="my-4 leading-relaxed text-foreground">{children}</p>,
    a: ({ href, children }: LinkProps) => {
      const isExternal = href.startsWith('http');
      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sandy-brown hover:text-peru underline decoration-sandy-brown/30 hover:decoration-peru transition-colors"
          >
            {children}
          </a>
        );
      }
      return (
        <Link
          href={href}
          className="text-sandy-brown hover:text-peru underline decoration-sandy-brown/30 hover:decoration-peru transition-colors"
        >
          {children}
        </Link>
      );
    },
    code: ({ children, className }: CodeProps) => {
      const isInline = !className;
      if (isInline) {
        return (
          <code className="px-1.5 py-0.5 rounded bg-inline-code-bg text-inline-code-text text-sm font-mono">
            {children}
          </code>
        );
      }
      return <CodeBlock className={className}>{children}</CodeBlock>;
    },
    pre: ({ children }: PreProps) => <>{children}</>,
    blockquote: ({ children }: TextProps) => (
      <blockquote className="border-l-4 border-sandy-brown pl-4 py-2 my-6 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
    ul: ({ children }: TextProps) => <ul className="list-disc list-inside my-4">{children}</ul>,
    ol: ({ children }: TextProps) => (
      <ol className="list-decimal list-inside my-4">{children}</ol>
    ),
    li: ({ children }: TextProps) => <li className="my-2">{children}</li>,
    table: ({ children }: TextProps) => (
      <div className="overflow-x-auto my-6">
        <table className="min-w-full border-collapse border border-sandy-brown/20">
          {children}
        </table>
      </div>
    ),
    th: ({ children }: TextProps) => (
      <th className="border border-sandy-brown/20 bg-cream px-4 py-2 text-left font-bold text-sandy-brown">
        {children}
      </th>
    ),
    td: ({ children }: TextProps) => (
      <td className="border border-sandy-brown/20 px-4 py-2">{children}</td>
    ),
    hr: () => <hr className="my-8 border-sandy-brown/20" />,
    img: ({ alt, ...rest }: ImageProps) => (
      <Image
        alt={alt}
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
        {...rest}
      />
    ),
  };
}
