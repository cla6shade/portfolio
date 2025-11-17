import { createContext, ReactNode, use, useState } from 'react';
import { Vector3 } from 'three';
import { PIANO_POSITION, PIANO_ROTATION } from '@/features/hero/piano/constants';

export type THeroContext = {
  isPianoFocused: boolean;
  cameraTarget: Vector3;
  lookAtTarget: Vector3;
  isAnimating: boolean;
  setIsAnimating: (animating: boolean) => void;
  focusPiano: () => void;
  unfocusPiano: () => void;
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
});

export type HeroContextProps = {
  children: ReactNode;
};

export function HeroContextProvider({ children }: HeroContextProps) {
  const [isPianoFocused, setIsPianoFocused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [cameraTarget, setCameraTarget] = useState(initialCameraPos);
  const [lookAtTarget, setLookAtTarget] = useState(initialLookAt);

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
    setIsAnimating(true);
  };

  const unfocusPiano = () => {
    setIsPianoFocused(false);
    setCameraTarget(initialCameraPos);
    setLookAtTarget(initialLookAt);
    setIsAnimating(true);
  };

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
      }}
    >
      {children}
    </HeroContext.Provider>
  );
}

export function useHero() {
  return use(HeroContext);
}
