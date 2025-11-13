import { Vector3 } from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';

export default function CameraController({
  targetPosition,
  targetLookAt,
  isAnimating,
  setIsAnimating,
}: {
  targetPosition: Vector3;
  targetLookAt: Vector3;
  isAnimating: boolean;
  setIsAnimating: (value: boolean) => void;
}) {
  const { camera } = useThree();
  const currentLookAt = useRef(new Vector3(0, 0, 0));

  useFrame(() => {
    if (!isAnimating) return;

    const posDistance = camera.position.distanceTo(targetPosition);
    const lookAtDistance = currentLookAt.current.distanceTo(targetLookAt);

    if (posDistance < 0.01 && lookAtDistance < 0.01) {
      camera.position.copy(targetPosition);
      currentLookAt.current.copy(targetLookAt);
      camera.lookAt(currentLookAt.current);
      setIsAnimating(false);
      return;
    }

    camera.position.lerp(targetPosition, 0.05);

    currentLookAt.current.lerp(targetLookAt, 0.05);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}
