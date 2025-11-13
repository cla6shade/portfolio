'use client';

import XStand from '../XStand';
import { useHero } from '@/features/hero/HeroProvider';
import WhiteKey from './WhiteKey';
import BlackKey from './BlackKey';
import {
  WHITE_KEY_WIDTH,
  WHITE_KEY_LENGTH,
  TOTAL_KEYS,
  TOTAL_WHITE_KEYS,
  blackKeyPattern,
} from './constants';
import { playPianoNote, getNoteName, Player } from './pianoSound';

interface PianoProps {
  offset?: [number, number, number];
  rotation?: [number, number, number];
  player?: Player | null;
}

export default function PianoModel({
  offset = [8, 4, 2],
  rotation = [0, -Math.PI / 3, 0],
  player = null,
}: PianoProps) {
  const { isPianoFocused } = useHero();

  const handleKeyClick = (keyIndex: number, isBlack: boolean) => {
    const noteName = getNoteName(keyIndex);
    console.log(`🎹 Key pressed: ${noteName} (${isBlack ? 'Black' : 'White'} key #${keyIndex})`);
    if (player) {
      playPianoNote(player, keyIndex);
    }
  };

  const keys = [];
  let whiteKeyIndex = 0;
  let xOffset = 0;

  // 88개 건반 생성
  for (let i = 0; i < TOTAL_KEYS; i++) {
    // 건반 번호를 음계로 변환 (A0 = 0부터 시작)
    const noteInOctave = (i + 9) % 12; // A0부터 시작하므로 +9
    const isBlackKey = blackKeyPattern.includes(noteInOctave);

    if (!isBlackKey) {
      // 흰 건반
      keys.push(
        <WhiteKey
          key={`white-${i}`}
          keyIndex={i}
          xOffset={xOffset}
          onKeyPress={handleKeyClick}
          isPianoFocused={isPianoFocused}
        />,
      );
      xOffset += WHITE_KEY_WIDTH;
      whiteKeyIndex++;
    }
  }

  // 검은 건반 추가
  xOffset = 0;
  let whiteCount = 0;
  for (let i = 0; i < TOTAL_KEYS; i++) {
    const noteInOctave = (i + 9) % 12;
    const isBlackKey = blackKeyPattern.includes(noteInOctave);

    if (isBlackKey) {
      const blackKeyX = xOffset - WHITE_KEY_WIDTH / 2;
      keys.push(
        <BlackKey
          key={`black-${i}`}
          keyIndex={i}
          blackKeyX={blackKeyX}
          onKeyPress={handleKeyClick}
          isPianoFocused={isPianoFocused}
        />,
      );
    } else {
      xOffset += WHITE_KEY_WIDTH;
      whiteCount++;
    }
  }

  const pianoWidth = TOTAL_WHITE_KEYS * WHITE_KEY_WIDTH;
  const caseWidth = pianoWidth + 0.8; // 건반보다 넓은 케이스
  const caseDepth = WHITE_KEY_LENGTH + 0.3;

  return (
    <group position={offset} rotation={rotation}>
      <mesh position={[0, -0.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[caseWidth, 0.3, caseDepth]} />
        <meshStandardMaterial color="#222222" />
      </mesh>

      <group position={[-pianoWidth / 2, 0, 0]}>{keys}</group>

      <XStand width={caseWidth} yPosition={-2} />
    </group>
  );
}
