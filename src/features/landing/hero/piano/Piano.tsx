import { Suspense } from 'react';
import PianoModel from '@/features/landing/hero/piano/PianoModel';
import PianoFallback from '@/features/landing/hero/piano/PianoFallback';
import PianoProvider from '@/features/landing/hero/piano/provider/PianoProvider';

export type PianoProps = {
  isSoundEnabled: boolean;
};
export default function Piano({ isSoundEnabled }: PianoProps) {
  return isSoundEnabled ? (
    <Suspense
      fallback={
        <>
          <PianoModel />
          <PianoFallback />
        </>
      }
    >
      <PianoProvider>
        <PianoModel />
      </PianoProvider>
    </Suspense>
  ) : (
    <PianoModel />
  );
}
