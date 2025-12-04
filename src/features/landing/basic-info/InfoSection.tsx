import { type ReactNode } from 'react';
import Flex from '@/components/container/Flex';
import { cn } from '@/lib/utils';

interface InfoSectionProps {
  icon: ReactNode;
  title: string;
  className?: string;
  children: ReactNode;
}

export default function InfoSection({ icon, title, className, children }: InfoSectionProps) {
  return (
    <div className={cn('border-l-4 pl-6', className)}>
      <Flex align="center" className="gap-3 mb-6">
        {icon}
        <h4 className="text-2xl tablet:text-3xl font-bold text-white">{title}</h4>
      </Flex>
      <Flex direction="col" className="gap-6">
        {children}
      </Flex>
    </div>
  );
}