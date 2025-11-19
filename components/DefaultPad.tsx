import { type ReactNode } from 'react';

interface DefaultPadProps {
  children: ReactNode;
  className?: string;
}

export default function DefaultPad({ children, className = '' }: DefaultPadProps) {
  return <div className={`px-16 md:px-20 lg:px-60 ${className}`}>{children}</div>;
}
