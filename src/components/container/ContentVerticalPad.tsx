import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ContentVerticalPadProps {
  children: ReactNode;
  className?: string;
}

export default function ContentVerticalPad({ children, className }: ContentVerticalPadProps) {
  return <div className={cn('py-16', className)}>{children}</div>;
}
