import { type ReactNode } from 'react';

interface DefaultPadProps {
  children: ReactNode;
  className?: string;
}

export default function DefaultPad({ children, className = '' }: DefaultPadProps) {
  return (
    <div className={`px-20 lg:px-30 xl:px-40 ${className}`}>
      {children}
    </div>
  );
}