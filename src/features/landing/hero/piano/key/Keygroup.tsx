import { ReactNode, use } from 'react';
import { blackKeyPattern, KEY_GAP, TOTAL_KEYS } from '@/features/landing/hero/piano/constants';
import PianoKey from '@/features/landing/hero/piano/key/PianoKey';
import { getNoteName } from '@/features/landing/hero/piano/soundfont/pianoSound';
import { PianoContext } from '@/features/landing/hero/piano/provider/PianoProvider';

export default function KeyGroup() {
  const { soundfont } = use(PianoContext);
  const handleKeyClick = (note: string) => {
    if (soundfont) {
      soundfont.start({ note, velocity: 80 });
    }
  };

  const keys: ReactNode[] = [];
  let whiteKeyOffset = 0;

  for (let i = 0; i < TOTAL_KEYS; i++) {
    // 건반 번호를 음계로 변환 (A0 = 0부터 시작)
    const noteInOctave = (i + 9) % 12; // A0부터 시작하므로 +9
    const isBlackKey = blackKeyPattern.includes(noteInOctave);
    const note = getNoteName(i);

    if (isBlackKey) {
      // 검은 건반: 이전 흰 건반 사이에 위치
      const x = whiteKeyOffset - KEY_GAP / 2;
      keys.push(
        <PianoKey
          key={`black-${i}`}
          note={note}
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
        note={note}
        variant="white"
        x={whiteKeyOffset}
        onKeyPress={handleKeyClick}
      />,
    );
    whiteKeyOffset += KEY_GAP;
  }
  return keys;
}
