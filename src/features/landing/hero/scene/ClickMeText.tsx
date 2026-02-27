'use client';

import { Html } from '@react-three/drei';
import { useHero } from '@/features/landing/hero/HeroProvider';
import { PIANO_POSITION, PIANO_ROTATION } from '@/features/landing/hero/piano/constants';

const RIGHT_OFFSET = 0.5;
const TEXT_X = PIANO_POSITION[0] + Math.cos(PIANO_ROTATION[1]) * RIGHT_OFFSET;
const TEXT_Z = PIANO_POSITION[2] - Math.sin(PIANO_ROTATION[1]) * RIGHT_OFFSET;

export default function ClickMeText() {
  const { isPianoFocused } = useHero();

  if (isPianoFocused) return null;

  return (
    <Html
      position={[TEXT_X, PIANO_POSITION[1] + 0.7, TEXT_Z]}
      rotation={PIANO_ROTATION}
      transform
      center
      style={{ pointerEvents: 'none' }}
    >
      <p className="text-cream font-normal text-lg whitespace-nowrap select-none">
        Click me!
      </p>
    </Html>
  );
}
