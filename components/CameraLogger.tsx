'use client'

import { useThree, useFrame } from '@react-three/fiber';

export default function CameraLogger() {
  const { camera, controls } = useThree();

  useFrame(() => {
    console.log('Camera Position:', camera.position.toArray());
    if (controls && 'target' in controls) {
      console.log('Camera Target:', (controls as any).target.toArray());
    }
  });

  return null;
}