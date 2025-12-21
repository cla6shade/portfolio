import { type ComponentProps } from 'react';
import { cn } from '@/lib/utils';

type VideoProps = ComponentProps<'video'>;

export default function Video({ className, ...props }: VideoProps) {
  return (
    <div className="w-full aspect-video">
      <video
        className={cn('w-full h-full object-cover rounded-md shadow', className)}
        autoPlay
        loop
        muted
        playsInline
        {...props}
      />
    </div>
  );
}
