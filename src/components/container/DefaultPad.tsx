import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface DefaultPadProps {
  children: ReactNode;
  className?: string;
}

export default function DefaultPad({ children, className = '' }: DefaultPadProps) {
  return (
    <div className={cn('px-6 tablet:px-16 desktop:px-24 lg-desktop:px-32', className)}>
      {children}
    </div>
  );
}
