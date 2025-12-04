import { type ReactNode } from 'react';
import { Badge } from '@/components/ui/badge';
import { type VariantProps } from 'class-variance-authority';
import { badgeVariants } from '@/components/ui/badge';

interface BadgeCollectionProps {
  badges: string[];
  variant?: VariantProps<typeof badgeVariants>['variant'];
  className?: string;
  badgeClassName?: string;
}

export default function BadgeCollection({
  badges,
  variant = 'default',
  className = '',
  badgeClassName = '',
}: BadgeCollectionProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {badges.map((badge, index) => (
        <Badge
          key={`badge-${index}`}
          variant={variant}
          className={badgeClassName}
        >
          {badge}
        </Badge>
      ))}
    </div>
  );
}
