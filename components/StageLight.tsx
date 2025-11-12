'use client';

import { useRef, useEffect } from 'react';
import { SpotLight as ThreeSpotLight } from 'three';

interface StageLightProps {
  position: [number, number, number];
  target: [number, number, number];
}

export default function StageLight({ position, target }: StageLightProps) {
  const spotLightRef = useRef<ThreeSpotLight>(null);

  useEffect(() => {
    if (spotLightRef.current) {
      spotLightRef.current.target.position.set(target[0], target[1], target[2]);
      spotLightRef.current.target.updateMatrixWorld();
    }
  }, [target]);

  return (
    <>
      <spotLight
        ref={spotLightRef}
        position={position}
        angle={0.5}
        penumbra={0.4}
        intensity={10000}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
    </>
  );
}
