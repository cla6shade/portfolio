import { cva } from 'class-variance-authority';
import ThemeToggle from '@/components/navigation/ThemeToggle';
import GithubButton from '@/components/navigation/GithubButton';

const collectionVariants = cva('flex gap-2', {
  variants: {
    variant: {
      sheet: 'p-4',
      navigation: '',
    },
  },
});

export default function BlogButtonCollection({
  variant = 'navigation',
}: {
  variant?: 'navigation' | 'sheet';
}) {
  return (
    <div className={collectionVariants({ variant })}>
      <ThemeToggle />
      <GithubButton variant="ghost" />
    </div>
  );
}
