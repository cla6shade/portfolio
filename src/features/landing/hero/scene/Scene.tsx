'use client';

import { Canvas, Frameloop, ThreeEvent } from '@react-three/fiber';
import Floor from '@/features/landing/hero/scene/Floor';
import StageLight from '@/features/landing/hero/scene/StageLight';
import Chair from '@/features/landing/hero/scene/Chair';
import { useHero } from '@/features/landing/hero/HeroProvider';
import Piano from '@/features/landing/hero/piano/Piano';
import Flex from '@/components/container/Flex';

import { useRef } from 'react';
import {
  INITIAL_CAMERA_FOV,
  INITIAL_CAMERA_POSITION,
  PIANO_POSITION,
  PIANO_ROTATION,
} from '@/features/landing/hero/piano/constants';

export default function Scene({ frameloop }: { frameloop: Frameloop }) {
  const { isPianoFocused, isAnimating, focusPiano, setCameraRef } = useHero();
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleGroupClick = (e: ThreeEvent<MouseEvent>) => {
    if (!isPianoFocused) {
      e.stopPropagation();
      focusPiano();
    }
  };

  const isSoundEnabled = isPianoFocused && !isAnimating;
  // Calculate box position in front of piano
  // Front direction: z+ and x-
  const boxDistance = 2.4;
  const boxX = PIANO_POSITION[0] - Math.sin(-PIANO_ROTATION[1]) * boxDistance;
  const boxY = 0.6;
  const boxZ = PIANO_POSITION[2] + Math.cos(-PIANO_ROTATION[1]) * boxDistance;

  return (
    <Flex align="center" justify="center" className="w-full h-full">
      <div ref={canvasRef} className="w-full max-h-full aspect-video relative">
        <Canvas
          camera={{
            fov: INITIAL_CAMERA_FOV,
            position: INITIAL_CAMERA_POSITION,
          }}
          frameloop={frameloop}
          shadows
          resize={{
            scroll: false,
          }}
          onCreated={({ camera }) => setCameraRef(camera)}
        >
          <StageLight position={[7, 13, 0]} target={[7, 4, 0]} />
          <Floor />
          <Chair position={[boxX, boxY, boxZ]} rotation={PIANO_ROTATION} />
          <group onClick={handleGroupClick}>
            <Piano isSoundEnabled={isSoundEnabled} />
          </group>
        </Canvas>
      </div>
    </Flex>
  );
}
