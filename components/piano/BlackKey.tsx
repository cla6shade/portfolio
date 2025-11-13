'use client';

import { useState } from 'react';
import { ThreeEvent } from '@react-three/fiber';
import { Edges } from '@react-three/drei';
import {
  BLACK_KEY_WIDTH,
  BLACK_KEY_HEIGHT,
  BLACK_KEY_LENGTH,
  WHITE_KEY_HEIGHT,
  WHITE_KEY_LENGTH,
} from './constants';

interface BlackKeyProps {
  keyIndex: number;
  blackKeyX: number;
  onKeyPress: (keyIndex: number, isBlack: boolean) => void;
  isPianoFocused: boolean;
}

function calculateKeyPosition(
  basePosition: [number, number, number],
  pressed: boolean,
): [number, number, number] {
  const pressDepth = 0.015;
  return [basePosition[0], basePosition[1] - (pressed ? pressDepth : 0), basePosition[2]];
}

function handleKeyPointerDown(
  e: ThreeEvent<PointerEvent>,
  keyIndex: number,
  isPianoFocused: boolean,
  onKeyPress: (keyIndex: number, isBlack: boolean) => void,
  setPressed: (pressed: boolean) => void,
) {
  if (!isPianoFocused) return;
  e.stopPropagation();
  setPressed(true);
  onKeyPress(keyIndex, true);
}

function handleKeyPointerUp(setPressed: (pressed: boolean) => void) {
  setPressed(false);
}

function handleKeyPointerLeave(setPressed: (pressed: boolean) => void) {
  setPressed(false);
}

export default function BlackKey({
  keyIndex,
  blackKeyX,
  onKeyPress,
  isPianoFocused,
}: BlackKeyProps) {
  const [pressed, setPressed] = useState(false);
  const basePosition: [number, number, number] = [
    blackKeyX,
    BLACK_KEY_HEIGHT / 2 + WHITE_KEY_HEIGHT,
    -WHITE_KEY_LENGTH / 2 + BLACK_KEY_LENGTH / 2,
  ];
  const position = calculateKeyPosition(basePosition, pressed);

  return (
    <mesh
      position={position}
      castShadow
      receiveShadow
      onPointerDown={(e) =>
        handleKeyPointerDown(e, keyIndex, isPianoFocused, onKeyPress, setPressed)
      }
      onPointerUp={() => handleKeyPointerUp(setPressed)}
      onPointerLeave={() => handleKeyPointerLeave(setPressed)}
    >
      <boxGeometry args={[BLACK_KEY_WIDTH, BLACK_KEY_HEIGHT, BLACK_KEY_LENGTH]} />
      <meshStandardMaterial color="#1a1a1a" />
      <Edges color="#555555" linewidth={1} />
    </mesh>
  );
}
