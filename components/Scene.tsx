'use client'

import { Canvas, ThreeEvent  } from '@react-three/fiber';
import Floor from '@/components/Floor';
import StageLight from '@/components/StageLight';
import { useHero } from '@/features/hero/HeroProvider';
import CameraController from '@/components/scene/CameraController';
import Piano from '@/components/piano/Piano';

export default function Scene() {
  const {
    isPianoFocused,
    cameraTarget,
    lookAtTarget,
    isAnimating,
    setIsAnimating,
    focusPiano,
  } = useHero();

  const handleGroupClick = (e: ThreeEvent<MouseEvent>) => {
    if (!isPianoFocused) {
      e.stopPropagation();
      focusPiano();
    }
  };

  const isSoundEnabled = isPianoFocused && !isAnimating;
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full max-h-full aspect-video">
        <Canvas camera={{
          fov: 75,
          position: [-0.68, 9.19, 14.46]
        }} shadows
        >
          <CameraController
            targetPosition={cameraTarget}
            targetLookAt={lookAtTarget}
            isAnimating={isAnimating}
            setIsAnimating={setIsAnimating}
          />
          <ambientLight intensity={0.1} />
          <StageLight position={[8, 13, 1]} target={[8, 4, 1]} />
          <Floor />
          <group onClick={handleGroupClick}>
            <Piano isSoundEnabled={isSoundEnabled} />
          </group>
        </Canvas>
      </div>
    </div>
  )
}
