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
      light: 'material-theme',
      dark: 'material-theme-darker',
    },
  });

  return (
    <div
      className="[&_pre]:p-4 [&_pre]:rounded-md [&_pre]:text-wrap overflow-x-auto [&_pre]:w-fit ![scrollbar-width:none]
    [&::-webkit-scrollbar]:hidden"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
