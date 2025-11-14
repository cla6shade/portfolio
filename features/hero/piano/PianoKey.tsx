import { useState } from 'react';
import { KEY_PROPERTIES } from '@/features/hero/piano/constants';
import { ThreeEvent } from '@react-three/fiber';
import { Edges } from '@react-three/drei';
import { useHero } from '@/features/hero/HeroProvider';

export interface PianoKeyProps {
  keyIndex: number;
  variant: 'black' | 'white';
  x: number;
  onKeyPress: (keyIndex: number) => void;
}
export default function PianoKey({ keyIndex, x, onKeyPress, variant }: PianoKeyProps) {
  const [pressed, setPressed] = useState(false);

  const { isPianoFocused } = useHero();
  const { width, height, length, pressDepth } = KEY_PROPERTIES[variant];

  const keyColor = variant === 'black' ? '#1a1a1a' : '#f5f5f5';
  const edgeColor = variant === 'black' ? '#555555' : '#333333';

  const basePosition = getBasePosition(x, variant);
  const position: [number, number, number] = [
    basePosition[0],
    basePosition[1] - (pressed ? pressDepth : 0),
    basePosition[2],
  ];

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    if (!isPianoFocused) return;
    e.stopPropagation();
    setPressed(true);
    onKeyPress(keyIndex);
  };

  const handlePointerUp = () => {
    setPressed(false);
  };

  const handlePointerLeave = () => {
    setPressed(false);
  };

  return (
    <mesh
      position={position}
      castShadow
      receiveShadow
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
    >
      <boxGeometry args={[width, height, length]} />
      <meshStandardMaterial color={keyColor} />
      <Edges color={edgeColor} linewidth={1} />
    </mesh>
  );
}

export function getBasePosition(x: number, variant: 'black' | 'white'): [number, number, number] {
  const { height, length } = KEY_PROPERTIES[variant];
  if (variant === 'black') {
    const { height: whiteHeight, length: whiteLength } = KEY_PROPERTIES['white'];
    return [x, height / 2 + whiteHeight, -whiteLength / 2 + length / 2];
  }
  return [x, height / 2, 0];
}
