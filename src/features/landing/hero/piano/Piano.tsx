import { Suspense, use, useMemo } from 'react';
import { loadPiano } from '@/features/landing/hero/piano/pianoSound';
import PianoModel from '@/features/landing/hero/piano/PianoModel';

export type PianoProps = {
  isSoundEnabled: boolean;
};
export default function Piano({ isSoundEnabled }: PianoProps) {
  return isSoundEnabled ? (
    <Suspense fallback={<PianoModel />}>
      <SoundBoundPiano />
    </Suspense>
  ) : (
    <PianoModel />
  );
}

function SoundBoundPiano() {
  const pianoPromise = useMemo(() => loadPiano(), []);
  const player = use(pianoPromise);
  return <PianoModel player={player} />;
}
