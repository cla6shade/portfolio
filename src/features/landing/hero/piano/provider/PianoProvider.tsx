import { createContext, ReactNode, use, useMemo } from 'react';
import { SplendidGrandPiano } from 'smplr';
import { loadPianoSound } from '@/features/landing/hero/piano/soundfont/pianoSound';
import Player from '@/features/landing/hero/piano/midi/Player';

interface PianoContextValue {
  soundfont: SplendidGrandPiano | null;
  midiPlayer: Player | null;
}

export const PianoContext = createContext<PianoContextValue>({
  soundfont: null,
  midiPlayer: null,
});

interface PianoContextProps {
  children?: ReactNode;
}

export default function PianoProvider({ children }: PianoContextProps) {
  const soundfont = use(loadPianoSound());
  const midiPlayer = useMemo(() => new Player(), []);
  return (
    <PianoContext.Provider
      value={{
        soundfont,
        midiPlayer,
      }}
    >
      {children}
    </PianoContext.Provider>
  );
}

export function usePiano() {}
