import { type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';
import { cn } from '@/lib/utils';

const githubButtonVariants = cva('py-2 bg-orange-300 cursor-pointer hover:bg-peach-puff', {
  variants: {
    variant: {
      navigation: 'rounded-full',
      sheet: 'w-full rounded-sm py-5',
    },
  },
  defaultVariants: {
    variant: 'navigation',
  },
});

const linkVariants = cva('group', {
  variants: {
    variant: {
      navigation: '',
      sheet: 'w-full px-3 py-3',
    },
  },
  defaultVariants: {
    variant: 'navigation',
  },
});

interface GithubButtonProps extends VariantProps<typeof githubButtonVariants> {
  children: ReactNode;
}

export default function GithubButton({ children, variant }: GithubButtonProps) {
  return (
    <a
      href="https://github.com/cla6shade"
      target="_blank"
      className={cn(linkVariants({ variant }))}
    >
      <Button className={cn(githubButtonVariants({ variant }))}>
        Follow Me
        <div className="px-3 rounded-full bg-white py-1 translate-x-3 flex items-center gap-2">
          {children} <Github fill="#000000" />
        </div>
      </Button>
    </a>
  );
}
