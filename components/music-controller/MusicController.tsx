import { type MouseEvent, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import GlassSurface, { type GlassSurfaceProps } from '@/components/react-bits/GlassSurface';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

const controlVariants = cva('rounded-full outline', {
  variants: {
    variant: {
      dark: 'outline-white/30 text-white hover:bg-white/20',
      light: 'outline-black/30 text-black hover:bg-black/10',
    },
  },
  defaultVariants: {
    variant: 'dark',
  },
});

const playButtonVariants = cva('rounded-full outline', {
  variants: {
    variant: {
      dark: 'outline-white/30 bg-white/10 text-white hover:bg-white/25',
      light: 'outline-black/30 bg-black/5 text-black hover:bg-black/15',
    },
  },
  defaultVariants: {
    variant: 'dark',
  },
});

const selectVariants = cva('w-[180px] outline border-none', {
  variants: {
    variant: {
      dark: 'outline-white/30 bg-white/10 text-white hover:bg-white/20',
      light: 'outline-black/30 bg-black/5 text-black hover:bg-black/10',
    },
  },
  defaultVariants: {
    variant: 'dark',
  },
});

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: number;
}

interface MusicControllerProps extends Omit<GlassSurfaceProps, 'children' | 'width' | 'height'> {
  tracks?: Track[];
  currentTrackIndex?: number;
  isPlaying?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  onTrackSelect?: (index: number) => void;
  className?: string;
  children?: ReactNode;
  variant?: 'dark' | 'light';
}

export default function MusicController({
  tracks = [],
  currentTrackIndex = 0,
  isPlaying = false,
  onPlay,
  onPause,
  onNext,
  onPrevious,
  onTrackSelect,
  className,
  children,
  variant = 'dark',
  ...glassProps
}: MusicControllerProps) {
  const currentTrack = tracks[currentTrackIndex];

  const handlePlayPause = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (isPlaying) {
      onPause?.();
    } else {
      onPlay?.();
    }
  };

  const handleNext = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onNext?.();
  };

  const handlePrevious = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onPrevious?.();
  };

  const handleTrackSelect = (index: number) => {
    onTrackSelect?.(index);
  };

  return (
    <div className={cn('relative', className)}>
      <GlassSurface
        width="auto"
        height="auto"
        borderRadius={16}
        backgroundOpacity={0.2}
        blur={7}
        {...glassProps}
      >
        <div className="p-4 flex items-center gap-4">
          <Button
            onClick={handlePrevious}
            variant="ghost"
            size="icon"
            className={controlVariants({ variant })}
            aria-label="Previous track"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13 3L6 8L13 13V3Z" fill="currentColor" />
              <rect x="3" y="3" width="2" height="10" fill="currentColor" />
            </svg>
          </Button>

          <Button
            onClick={handlePlayPause}
            variant="ghost"
            size="icon-lg"
            className={playButtonVariants({ variant })}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="5" y="4" width="3" height="12" fill="currentColor" />
                <rect x="12" y="4" width="3" height="12" fill="currentColor" />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6 4L15 10L6 16V4Z" fill="currentColor" />
              </svg>
            )}
          </Button>

          <Button
            onClick={handleNext}
            variant="ghost"
            size="icon"
            className={controlVariants({ variant })}
            aria-label="Next track"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 3L10 8L3 13V3Z" fill="currentColor" />
              <rect x="11" y="3" width="2" height="10" fill="currentColor" />
            </svg>
          </Button>

          {tracks.length > 0 && (
            <Select
              value={currentTrackIndex.toString()}
              onValueChange={(value) => handleTrackSelect(Number(value))}
            >
              <SelectTrigger className={selectVariants({ variant })}>
                <SelectValue>{currentTrack ? currentTrack.title : 'Select track'}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {tracks.map((track, index) => (
                  <SelectItem key={track.id} value={index.toString()}>
                    {track.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          {children}
        </div>
      </GlassSurface>
    </div>
  );
}

export type { Track, MusicControllerProps };
