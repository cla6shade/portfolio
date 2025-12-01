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
      spotLightRef.current.target.position.set(...target);
      spotLightRef.current.target.updateMatrixWorld();
    }
  }, [target]);

  useEffect(() => {
    if (!spotLightRef.current) return;

    const startTime = performance.now();
    const intensityLimit = 1000;
    const durationMs = 1000;

    const animate = () => {
      if (!spotLightRef.current) return;

      const elapsed = performance.now() - startTime;
      if (elapsed >= durationMs) {
        spotLightRef.current.intensity = intensityLimit;
        return;
      }

      const t = elapsed / durationMs;
      const eased = easeOutQuad(t);
      spotLightRef.current.intensity = eased * intensityLimit;

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, []);

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
