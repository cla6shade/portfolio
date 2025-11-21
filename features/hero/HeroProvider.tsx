import { createContext, ReactNode, use, useEffect, useRef, useState } from 'react';
import { Camera, Vector3 } from 'three';
import { PIANO_POSITION, PIANO_ROTATION } from '@/features/hero/piano/constants';

export type THeroContext = {
  isPianoFocused: boolean;
  cameraTarget: Vector3;
  lookAtTarget: Vector3;
  isAnimating: boolean;
  setIsAnimating: (animating: boolean) => void;
  focusPiano: () => void;
  unfocusPiano: () => void;
  setCameraRef: (camera: Camera) => void;
};

const initialCameraPos = new Vector3(-0.68, 9.19, 14.46);
const initialLookAt = new Vector3(0, 0, 0);

export const HeroContext = createContext<THeroContext>({
  isPianoFocused: false,
  cameraTarget: initialCameraPos,
  lookAtTarget: initialLookAt,
  isAnimating: false,
  setIsAnimating: () => {},
  focusPiano: () => {},
  unfocusPiano: () => {},
  setCameraRef: () => {},
});

export type HeroContextProps = {
  children: ReactNode;
};

export function HeroContextProvider({ children }: HeroContextProps) {
  const [isPianoFocused, setIsPianoFocused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [cameraTarget, setCameraTarget] = useState(initialCameraPos);
  const [lookAtTarget, setLookAtTarget] = useState(initialLookAt);

  const cameraRef = useRef<Camera | null>(null);
  const currentLookAtRef = useRef(new Vector3(0, 0, 0));
  const animationFrameRef = useRef<number | null>(null);

  const setCameraRef = (camera: Camera) => {
    cameraRef.current = camera;
    currentLookAtRef.current.copy(initialLookAt);
  };

  const animateCamera = (targetPosition: Vector3, targetLookAt: Vector3) => {
    if (!cameraRef.current) return;

    const camera = cameraRef.current;
    const lerpFactor = 0.05;

    const animate = () => {
      if (!cameraRef.current) return;

      const posDistance = camera.position.distanceTo(targetPosition);
      const lookAtDistance = currentLookAtRef.current.distanceTo(targetLookAt);

      if (posDistance < 0.01 && lookAtDistance < 0.01) {
        camera.position.copy(targetPosition);
        currentLookAtRef.current.copy(targetLookAt);
        camera.lookAt(currentLookAtRef.current);
        setIsAnimating(false);
        return;
      }

      camera.position.lerp(targetPosition, lerpFactor);
      currentLookAtRef.current.lerp(targetLookAt, lerpFactor);
      camera.lookAt(currentLookAtRef.current);

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    setIsAnimating(true);
    animationFrameRef.current = requestAnimationFrame(animate);
  };

  const focusPiano = () => {
    setIsPianoFocused(true);

    const pianoCenter = new Vector3(...PIANO_POSITION);
    const pianoRotationY = PIANO_ROTATION[1];

    const distance = 4;
    const height = 3;
    const cameraPos = new Vector3(
      pianoCenter.x + Math.sin(pianoRotationY) * distance,
      pianoCenter.y + height,
      pianoCenter.z + Math.cos(pianoRotationY) * distance,
    );

    setCameraTarget(cameraPos);
    setLookAtTarget(pianoCenter);
    animateCamera(cameraPos, pianoCenter);
  };

  const unfocusPiano = () => {
    setIsPianoFocused(false);
    setCameraTarget(initialCameraPos);
    setLookAtTarget(initialLookAt);
    animateCamera(initialCameraPos, initialLookAt);
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <HeroContext.Provider
      value={{
        isPianoFocused,
        cameraTarget,
        lookAtTarget,
        isAnimating,
        setIsAnimating,
        focusPiano,
        unfocusPiano,
        setCameraRef,
      }}
    >
      {children}
    </HeroContext.Provider>
  );
}

export function useHero() {
  return use(HeroContext);
}
