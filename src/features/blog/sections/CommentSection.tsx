'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useTheme } from 'next-themes';

const UTTERANCES_SRC = 'https://utteranc.es/client.js';
const UTTERANCES_REPO = 'cla6shade/portfolio';
const getUtterancesTheme = (resolvedTheme?: string) =>
  resolvedTheme === 'dark' ? 'github-dark' : 'github-light';

export default function CommentSection() {
  const { resolvedTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const utterancesTheme = useMemo(() => getUtterancesTheme(resolvedTheme), [resolvedTheme]);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    containerRef.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = UTTERANCES_SRC;
    script.async = true;
    script.setAttribute('repo', UTTERANCES_REPO);
    script.setAttribute('issue-term', 'pathname');
    script.setAttribute('label', 'comment');
    script.setAttribute('theme', utterancesTheme);
    script.crossOrigin = 'anonymous';

    containerRef.current.appendChild(script);
  }, [utterancesTheme]);

  return <div ref={containerRef} className="mt-16 relative" />;
}
