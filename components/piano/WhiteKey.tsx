'use client';

import { useState } from 'react';
import { ThreeEvent } from '@react-three/fiber';
import { Edges } from '@react-three/drei';
import { WHITE_KEY_WIDTH, WHITE_KEY_HEIGHT, WHITE_KEY_LENGTH } from './constants';

interface WhiteKeyProps {
  keyIndex: number;
  xOffset: number;
  onKeyPress: (keyIndex: number, isBlack: boolean) => void;
  isPianoFocused: boolean;
}

function calculateKeyPosition(
  basePosition: [number, number, number],
  pressed: boolean,
): [number, number, number] {
  const pressDepth = 0.02;
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
  onKeyPress(keyIndex, false);
}

function handleKeyPointerUp(setPressed: (pressed: boolean) => void) {
  setPressed(false);
}

function handleKeyPointerLeave(setPressed: (pressed: boolean) => void) {
  setPressed(false);
}

export default function WhiteKey({ keyIndex, xOffset, onKeyPress, isPianoFocused }: WhiteKeyProps) {
  const [pressed, setPressed] = useState(false);
  const basePosition: [number, number, number] = [xOffset, WHITE_KEY_HEIGHT / 2, 0];
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
      <boxGeometry args={[WHITE_KEY_WIDTH, WHITE_KEY_HEIGHT, WHITE_KEY_LENGTH]} />
      <meshStandardMaterial color="#f5f5f5" />
      <Edges color="#333333" linewidth={1} />
    </mesh>
  );
}
