import { type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';

interface GithubButtonProps {
  children: ReactNode;
}

export default function GithubButton({ children }: GithubButtonProps) {
  return (
    <a href="https://github.com/cla6shade" target="_blank" className="group">
      <Button className="py-2 bg-orange-300 rounded-full cursor-pointer hover:bg-peach-puff">
        Follow Me
        <div className="px-3 rounded-full bg-white py-1 translate-x-3 flex items-center gap-2">
          {children} <Github fill="#000000" />
        </div>
      </Button>
    </a>
  );
}
