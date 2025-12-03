import { SplendidGrandPiano } from 'smplr';

export interface Player {
  start: (options: { note: string; velocity?: number; time?: number }) => void;
  stop: (options: { note: string; time?: number }) => void;
}

let cachedPromise: Promise<Player> | null = null;

export function loadPiano(): Promise<Player> {
  if (cachedPromise) return cachedPromise;

  cachedPromise = (async () => {
    const startTime = performance.now();

    const audioContext = new AudioContext();
    const piano = new SplendidGrandPiano(audioContext);
    await piano.load;

    const endTime = performance.now();
    const loadTime = endTime - startTime;

    console.log(`Piano loaded in ${loadTime.toFixed(2)}ms`);

    return piano as Player;
  })();

  return cachedPromise;
}

export function getNoteName(keyIndex: number): string {
  const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const noteInOctave = (keyIndex + 9) % 12;
  const octave = Math.floor((keyIndex + 9) / 12);
  return `${noteNames[noteInOctave]}${octave}`;
}

export function playPianoNote(player: Player, keyIndex: number): void {
  const noteName = getNoteName(keyIndex);
  try {
    player.start({ note: noteName, velocity: 80 });
  } catch (error) {
    console.error('Failed to play note:', noteName, error);
  }
}
