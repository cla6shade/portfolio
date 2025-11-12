'use client';

import XStand from './XStand';

interface PianoProps {
  offset?: [number, number, number];
}

export default function Piano({ offset = [0, 0, 0] }: PianoProps) {
  const keys = [];
  const whiteKeyWidth = 0.15;
  const whiteKeyLength = 1.0;
  const whiteKeyHeight = 0.1;
  const blackKeyWidth = 0.1;
  const blackKeyLength = 0.6;
  const blackKeyHeight = 0.15;

  const whiteKeyPattern = [0, 2, 4, 5, 7, 9, 11]; // C, D, E, F, G, A, B
  const blackKeyPattern = [1, 3, 6, 8, 10]; // C#, D#, F#, G#, A#

  let whiteKeyIndex = 0;
  let xOffset = 0;

  // 88개 건반 생성
  for (let i = 0; i < 88; i++) {
    // 건반 번호를 음계로 변환 (A0 = 0부터 시작)
    const noteInOctave = (i + 9) % 12; // A0부터 시작하므로 +9
    const isBlackKey = blackKeyPattern.includes(noteInOctave);

    if (!isBlackKey) {
      // 흰 건반
      keys.push(
        <mesh
          key={`white-${i}`}
          position={[xOffset, whiteKeyHeight / 2, 0]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[whiteKeyWidth, whiteKeyHeight, whiteKeyLength]} />
          <meshStandardMaterial color="#f5f5f5" />
        </mesh>
      );
      xOffset += whiteKeyWidth;
      whiteKeyIndex++;
    }
  }

  // 검은 건반 추가
  xOffset = 0;
  let whiteCount = 0;
  for (let i = 0; i < 88; i++) {
    const noteInOctave = (i + 9) % 12;
    const isBlackKey = blackKeyPattern.includes(noteInOctave);

    if (isBlackKey) {
      const blackKeyX = xOffset - whiteKeyWidth / 2;
      keys.push(
        <mesh
          key={`black-${i}`}
          position={[blackKeyX, blackKeyHeight / 2 + whiteKeyHeight / 2, -whiteKeyLength / 2 + blackKeyLength / 2]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[blackKeyWidth, blackKeyHeight, blackKeyLength]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      );
    } else {
      xOffset += whiteKeyWidth;
      whiteCount++;
    }
  }

  const pianoWidth = 52 * whiteKeyWidth;
  const caseWidth = pianoWidth + 0.8; // 건반보다 넓은 케이스
  const caseDepth = whiteKeyLength + 0.3;

  return (
    <group position={offset} rotation={[0, -Math.PI / 6, 0]}>
      {/* 피아노 본체 (케이스) - 건반보다 크게 */}
      <mesh position={[0, -0.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[caseWidth, 0.3, caseDepth]} />
        <meshStandardMaterial color="#222222" />
      </mesh>

      {/* 건반들 */}
      <group position={[-pianoWidth / 2, 0, 0]}>
        {keys}
      </group>

      {/* X다리 스탠드 */}
      <XStand width={caseWidth} yPosition={-2.175} />
    </group>
  );
}
