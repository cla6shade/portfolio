'use client';

interface BoxProps {
  position: [number, number, number];
  rotation: [number, number, number];
}

export default function Chair({ position, rotation }: BoxProps) {
  return (
    <mesh position={position} rotation={rotation} castShadow>
      <boxGeometry args={[4, 1, 2]} />
      <meshStandardMaterial color="#c25a00" />
    </mesh>
  );
}
