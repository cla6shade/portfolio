'use client';

import { useTexture } from '@react-three/drei';

interface BoxProps {
  position: [number, number, number];
  rotation: [number, number, number];
}

export default function Chair({ position, rotation }: BoxProps) {
  // const { baseColor, normal, roughness, ambientOcclusion, metallic } = useTexture({
  //   baseColor: '/chair/base_color.webp',
  //   normal: '/chair/normal.webp',
  //   roughness: '/chair/roughness.webp',
  //   ambientOcclusion: '/chair/ambient_occlusion.webp',
  //   metallic: '/chair/metallic.webp',
  // });

  return (
    <mesh position={position} rotation={rotation} castShadow>
      <boxGeometry args={[4, 1, 2]} />
      <meshStandardMaterial
        // map={baseColor}
        // normalMap={normal}
        // roughnessMap={roughness}
        // aoMap={ambientOcclusion}
        // metalnessMap={metallic}
        color="#CD853F"
      />
    </mesh>
  );
}
