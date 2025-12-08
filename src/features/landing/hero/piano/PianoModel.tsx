'use client';

import XStand from './XStand';
import { CASE_WIDTH, CASE_LENGTH, PIANO_WIDTH, PIANO_POSITION, PIANO_ROTATION } from './constants';
import { SplendidGrandPiano } from 'smplr';
import KeyGroup from '@/features/landing/hero/piano/key/Keygroup';

interface PianoProps {
  offset?: [number, number, number];
  rotation?: [number, number, number];
  soundfont?: SplendidGrandPiano | null;
}

export default function PianoModel({
  offset = PIANO_POSITION,
  rotation = PIANO_ROTATION,
}: PianoProps) {
  return (
    <group position={offset} rotation={rotation}>
      <mesh position={[0, -0.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[CASE_WIDTH, 0.3, CASE_LENGTH]} />
        <meshStandardMaterial color="#c25a00" />
      </mesh>

      <group position={[-PIANO_WIDTH / 2, 0, 0]}>
        <KeyGroup />
      </group>

      <XStand width={CASE_WIDTH} yPosition={-2} />
    </group>
  );
}
