import { createContext, ReactNode, use } from 'react';
import { SplendidGrandPiano } from 'smplr';
import { loadPianoSound } from '@/features/landing/hero/piano/soundfont/pianoSound';

interface PianoContextValue {
  soundfont: SplendidGrandPiano | null;
}

export const PianoContext = createContext<PianoContextValue>({
  soundfont: null,
});

interface PianoContextProps {
  children?: ReactNode;
}

export default function PianoProvider({ children }: PianoContextProps) {
  const soundfont = use(loadPianoSound());
  return (
    <PianoContext.Provider
      value={{
        soundfont,
      }}
    >
      {children}
    </PianoContext.Provider>
  );
}

export function usePiano() {}
