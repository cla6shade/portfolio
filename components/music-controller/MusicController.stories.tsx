import { type Meta, type StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import MusicController, { type Track } from './MusicController';

const mockTracks: Track[] = [
  {
    id: '1',
    title: 'Moonlight Sonata',
    artist: 'Ludwig van Beethoven',
    duration: 360,
  },
  {
    id: '2',
    title: 'Clair de Lune',
    artist: 'Claude Debussy',
    duration: 300,
  },
  {
    id: '3',
    title: 'Für Elise',
    artist: 'Ludwig van Beethoven',
    duration: 180,
  },
  {
    id: '4',
    title: 'Nocturne in E-flat major',
    artist: 'Frédéric Chopin',
    duration: 270,
  },
];

interface MusicControllerWrapperProps {
  initialTracks?: Track[];
  initialTrackIndex?: number;
  initialPlaying?: boolean;
  backgroundOpacity?: number;
  blurAmount?: number;
  borderRadius?: number;
  className?: string;
  variant?: 'dark' | 'light';
}

function MusicControllerWrapper({
  initialTracks = mockTracks,
  initialTrackIndex = 0,
  initialPlaying = false,
  backgroundOpacity,
  blurAmount,
  borderRadius,
  className,
  variant = 'light',
}: MusicControllerWrapperProps) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(initialTrackIndex);
  const [isPlaying, setIsPlaying] = useState(initialPlaying);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % initialTracks.length);
  };

  const handlePrevious = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + initialTracks.length) % initialTracks.length);
  };

  const handleTrackSelect = (index: number) => {
    setCurrentTrackIndex(index);
  };

  return (
    <MusicController
      tracks={initialTracks}
      currentTrackIndex={currentTrackIndex}
      isPlaying={isPlaying}
      onPlay={handlePlay}
      onPause={handlePause}
      onNext={handleNext}
      onPrevious={handlePrevious}
      onTrackSelect={handleTrackSelect}
      backgroundOpacity={backgroundOpacity}
      blur={blurAmount}
      borderRadius={borderRadius}
      className={className}
      variant={variant}
    />
  );
}

const meta: Meta<typeof MusicControllerWrapper> = {
  title: 'Components/MusicController',
  component: MusicControllerWrapper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    initialTracks: {
      description: 'Initial array of track objects',
    },
    initialTrackIndex: {
      description: 'Initial track index',
      control: { type: 'number', min: 0, max: 3 },
    },
    initialPlaying: {
      description: 'Initial playing state',
      control: 'boolean',
    },
    backgroundOpacity: {
      description: 'Glass surface background opacity',
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
    },
    blurAmount: {
      description: 'Glass surface blur amount',
      control: { type: 'number', min: 0, max: 50 },
    },
    borderRadius: {
      description: 'Border radius in pixels',
      control: { type: 'number', min: 0, max: 50 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MusicControllerWrapper>;

export const Default: Story = {
  args: {
    initialTracks: mockTracks,
    initialTrackIndex: 0,
    initialPlaying: false,
  },
};

export const InitiallyPlaying: Story = {
  args: {
    initialTracks: mockTracks,
    initialTrackIndex: 0,
    initialPlaying: true,
  },
};

export const SecondTrack: Story = {
  args: {
    initialTracks: mockTracks,
    initialTrackIndex: 1,
    initialPlaying: true,
  },
};

export const NoTracks: Story = {
  args: {
    initialTracks: [],
    initialTrackIndex: 0,
    initialPlaying: false,
  },
};

export const CustomGlassProps: Story = {
  args: {
    initialTracks: mockTracks,
    initialTrackIndex: 0,
    initialPlaying: false,
    backgroundOpacity: 0.4,
    blurAmount: 20,
    borderRadius: 24,
  },
};

export const WithClassName: Story = {
  args: {
    initialTracks: mockTracks,
    initialTrackIndex: 2,
    initialPlaying: true,
    className: 'shadow-lg',
  },
};
