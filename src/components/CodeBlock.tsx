import { type ReactNode } from 'react';
import { codeToHtml } from 'shiki';

interface CodeBlockProps {
  children: ReactNode;
  className?: string;
}

export default async function CodeBlock({ children, className }: CodeBlockProps) {
  const match = /language-(\w+)/.exec(className || '');
  const lang = match ? match[1] : 'text';
  const code = String(children).replace(/\n$/, '');

  const html = await codeToHtml(code, {
    lang,
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
  });

  return <div className="p-4 overflow-hidden" dangerouslySetInnerHTML={{ __html: html }} />;
}
