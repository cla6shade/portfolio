'use client';

import { ReactNode } from 'react';
import { usePageTransition } from '@/components/transition/Transition';

export default function BlogClientLayout({ children }: { children: ReactNode }) {
  usePageTransition();
  return <>{children}</>;
}
