'use client';

import { Canvas, ThreeEvent } from '@react-three/fiber';
import Floor from '@/features/hero/scene/Floor';
import StageLight from '@/features/hero/scene/StageLight';
import { useHero } from '@/features/hero/HeroProvider';
import Piano from '@/features/hero/piano/Piano';

import { useRef } from 'react';
import { INITIAL_CAMERA_FOV, INITIAL_CAMERA_POSITION } from '@/features/hero/piano/constants';

export default function Scene() {
  const { isPianoFocused, isAnimating, focusPiano, setCameraRef } = useHero();
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleGroupClick = (e: ThreeEvent<MouseEvent>) => {
    if (!isPianoFocused) {
      e.stopPropagation();
      focusPiano();
    }
  };

  const isSoundEnabled = isPianoFocused && !isAnimating;
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div ref={canvasRef} className="w-full max-h-full aspect-video relative">
        <Canvas
          camera={{
            fov: INITIAL_CAMERA_FOV,
            position: INITIAL_CAMERA_POSITION,
          }}
          shadows
          onCreated={({ camera }) => setCameraRef(camera)}
        >
          <StageLight position={[7, 13, 0]} target={[7, 4, 0]} />
          <Floor />
          <group onClick={handleGroupClick}>
            <Piano isSoundEnabled={isSoundEnabled} />
          </group>
        </Canvas>
      </div>
    </div>
  );
}
