import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import Image from 'next/image';
import CodeBlock from '@/components/CodeBlock';
import {
  ComponentPropsWithoutRef, ElementType,
} from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';

type CreateComponentArgs<T extends ElementType> = ComponentPropsWithoutRef<T>

function BaseComponent<T extends ElementType>({ className, ...rest }: CreateComponentArgs<T>) {
  return (
    <Slot className={cn('scroll-mt-20', className)} {...rest} />
  )
}

export function useMDXComponents(): MDXComponents {
  return {
    h1: (props) => <BaseComponent><h1 className="text-4xl font-bold mt-8 mb-4 text-foreground" {...props} /></BaseComponent>,
    h2: (props) => <BaseComponent><h2 className="text-3xl font-bold mt-6 mb-3 text-foreground" {...props} /></BaseComponent>,
    h3: (props) => <BaseComponent><h3 className="text-2xl font-bold mt-5 mb-2 text-foreground" {...props} /></BaseComponent>,
    h4: (props) => <BaseComponent><h4 className="text-xl font-bold mt-4 mb-2 text-muted-foreground" {...props} /></BaseComponent>,
    h5: (props) => <BaseComponent><h5 className="text-lg font-bold mt-3 mb-2 text-muted-foreground" {...props} /></BaseComponent>,
    h6: (props) => (
      <BaseComponent><h6 className="text-base font-bold mt-2 mb-1 text-muted-foreground" {...props} /></BaseComponent>
    ),
    p: (props) => <p className="my-4 leading-relaxed text-foreground" {...props} />,
    a: ({ href, ...props }) => {
      if (!href) return <a {...props} />;

      const isExternal = href.startsWith('http');
      const className =
        'text-sandy-brown hover:text-peru underline decoration-sandy-brown/30 hover:decoration-peru transition-colors';

      return isExternal ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={className} {...props} />
      ) : (
        <Link href={href} className={className} {...props} />
      );
    },
    code: ({ className, ...props }) => {
      const isInline = !className;

      return isInline ? (
        <code
          className="px-1.5 py-0.5 rounded bg-inline-code-bg text-inline-code-text text-sm font-mono"
          {...props}
        />
      ) : (
        <CodeBlock className={className} {...props} />
      );
    },
    pre: ({ children }) => <>{children}</>,
    blockquote: (props) => (
      <blockquote
        className="border-l-4 border-sandy-brown pl-4 py-2 my-6 italic text-muted-foreground"
        {...props}
      />
    ),
    ul: (props) => <ul className="list-disc list-inside my-4" {...props} />,
    ol: (props) => <ol className="list-decimal list-inside my-4" {...props} />,
    li: (props) => <li className="my-2" {...props} />,
    table: (props) => (
      <div className="overflow-x-auto my-6">
        <table className="min-w-full border-collapse border border-sandy-brown/20" {...props} />
      </div>
    ),
    th: (props) => (
      <th
        className="border border-sandy-brown/20 bg-cream px-4 py-2 text-left font-bold text-sandy-brown"
        {...props}
      />
    ),
    td: (props) => <td className="border border-sandy-brown/20 px-4 py-2" {...props} />,
    hr: (props) => <hr className="my-8 border-sandy-brown/20" {...props} />,
    img: (props) => (
      <Image
        alt=""
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
        {...props}
      />
    ),
  };
}
