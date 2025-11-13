'use client';

import { useRef, useEffect } from 'react';
import { SpotLight as ThreeSpotLight } from 'three';
import { useFrame } from '@react-three/fiber';

interface StageLightProps {
  position: [number, number, number];
  target: [number, number, number];
}

export default function StageLight({ position, target }: StageLightProps) {
  const spotLightRef = useRef<ThreeSpotLight>(null);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    if (spotLightRef.current) {
      spotLightRef.current.target.position.set(...target);
      spotLightRef.current.target.updateMatrixWorld();
    }
  }, [target]);

  useFrame((_, delta) => {
    const intensityLimit = 3000;
    const durationSec = 1.0;
    if (!spotLightRef.current || timeRef.current >= durationSec) return;
    timeRef.current += delta;
    const t = Math.min(timeRef.current / durationSec, 1);
    const eased = easeOutQuad(t);
    spotLightRef.current.intensity = eased * intensityLimit;
  });

  return (
    <>
      <spotLight
        ref={spotLightRef}
        position={position}
        angle={0.6}
        penumbra={0.8}
        intensity={0}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
    </>
  );
}

function easeOutQuad(t: number): number {
  return t * (2 - t);
}
