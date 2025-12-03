'use client';

import { Html } from '@react-three/drei';
import { PIANO_POSITION, PIANO_ROTATION } from '@/features/landing/hero/piano/constants';

export default function PianoFallback() {
  return (
    <Html
      position={PIANO_POSITION}
      rotation={PIANO_ROTATION}
      style={{
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div
        className="flex flex-col
        items-center justify-center gap-4 px-6 py-6 bg-secondary text-secondary-foreground
        rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl animate-in fade-in"
      >
        <div className="flex gap-1.5">
          <div
            className="w-1 h-6 bg-light-peru rounded-full transition-transform duration-700 animate-[pulse_0.8s_ease-in-out_infinite]"
            style={{ animationDelay: '0ms' }}
          ></div>
          <div
            className="w-1 h-6 bg-light-peru rounded-full transition-transform duration-700 animate-[pulse_0.8s_ease-in-out_infinite]"
            style={{ animationDelay: '100ms' }}
          ></div>
          <div
            className="w-1 h-6 bg-light-peru rounded-full transition-transform duration-700 animate-[pulse_0.8s_ease-in-out_infinite]"
            style={{ animationDelay: '300ms' }}
          ></div>
        </div>
        <p className="text-sm font-semibold text-light-peru whitespace-nowrap">
          Loading Soundfonts
        </p>
      </div>
    </Html>
  );
}
