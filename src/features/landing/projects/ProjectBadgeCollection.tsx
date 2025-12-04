import BadgeCollection from '@/components/ui/badge-collection';
import { type Project } from '@/features/landing/projects/projects';

interface ProjectBadgeCollectionProps {
  project: Project;
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  className?: string;
}

export default function ProjectBadgeCollection({
  project,
  variant = 'secondary',
  className = '',
}: ProjectBadgeCollectionProps) {
  return <BadgeCollection badges={project.tags} variant={variant} badgeClassName={className} />;
}
