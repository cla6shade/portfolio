'use client'

import { Canvas, ThreeEvent } from '@react-three/fiber';
import Piano from '@/components/Piano';
import Floor from '@/components/Floor';
import StageLight from '@/components/StageLight';
// import { OrbitControls } from '@react-three/drei';
// import CameraLogger from '@/components/CameraLogger';

function PianoScene() {

  const handleGroupClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
  };

  return (
    <>
      <ambientLight intensity={0.3} />
      <StageLight position={[8, 13, 1]} target={[8, 4, 1]} />
      <Floor />
      <group onClick={handleGroupClick}>
        <Piano offset={[8, 4, 2]} rotation={[0, - Math.PI / 3, 0]} />
      </group>
    </>
  );
}

export default function Scene() {
  return (
    <Canvas camera={{
      fov: 75,
      position: [
        -0.68,
        9.19,
        14.46
      ]
    }} shadows
    >
      {/*<OrbitControls makeDefault target={[0, -5, -10]} />*/}
      {/*<CameraLogger />*/}
      <PianoScene />
    </Canvas>
  )
}
