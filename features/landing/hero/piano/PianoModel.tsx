'use client';

import XStand from './XStand';
import {
  TOTAL_KEYS,
  blackKeyPattern,
  KEY_GAP,
  CASE_WIDTH,
  CASE_LENGTH,
  PIANO_WIDTH,
  PIANO_POSITION,
  PIANO_ROTATION,
} from './constants';
import { playPianoNote, Player } from './pianoSound';
import PianoKey from '@/features/landing/hero/piano/PianoKey';
import { ReactNode } from 'react';

interface PianoProps {
  offset?: [number, number, number];
  rotation?: [number, number, number];
  player?: Player | null;
}

export default function PianoModel({
  offset = PIANO_POSITION,
  rotation = PIANO_ROTATION,
  player = null,
}: PianoProps) {
  return (
    <group position={offset} rotation={rotation}>
      <mesh position={[0, -0.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[CASE_WIDTH, 0.3, CASE_LENGTH]} />
        <meshStandardMaterial color="#CD853F" />
      </mesh>

      <group position={[-PIANO_WIDTH / 2, 0, 0]}>
        <KeyGroup player={player} />
      </group>

      <XStand width={CASE_WIDTH} yPosition={-2} />
    </group>
  );
}

function KeyGroup({ player }: { player?: Player | null }) {
  const handleKeyClick = (keyIndex: number) => {
    if (player) {
      playPianoNote(player, keyIndex);
    }
  };

  const keys: ReactNode[] = [];
  let whiteKeyOffset = 0;

  for (let i = 0; i < TOTAL_KEYS; i++) {
    // 건반 번호를 음계로 변환 (A0 = 0부터 시작)
    const noteInOctave = (i + 9) % 12; // A0부터 시작하므로 +9
    const isBlackKey = blackKeyPattern.includes(noteInOctave);

    if (isBlackKey) {
      // 검은 건반: 이전 흰 건반 사이에 위치
      const x = whiteKeyOffset - KEY_GAP / 2;
      keys.push(
        <PianoKey
          key={`black-${i}`}
          keyIndex={i}
          variant="black"
          x={x}
          onKeyPress={handleKeyClick}
        />,
      );
      continue;
    }
    keys.push(
      <PianoKey
        key={`white-${i}`}
        keyIndex={i}
        variant="white"
        x={whiteKeyOffset}
        onKeyPress={handleKeyClick}
      />,
    );
    whiteKeyOffset += KEY_GAP;
  }
  return keys;
}
