import { SplendidGrandPiano } from 'smplr';

let cachedPromise: Promise<SplendidGrandPiano> | null = null;

export function loadPianoSound(): Promise<SplendidGrandPiano> {
  if (cachedPromise) return cachedPromise;

  cachedPromise = (async () => {
    const startTime = performance.now();

    const audioContext = new AudioContext();
    const piano = new SplendidGrandPiano(audioContext);
    await piano.load;

    const endTime = performance.now();
    const loadTime = endTime - startTime;

    console.log(`Piano loaded in ${loadTime.toFixed(2)}ms`);

    return piano;
  })();

  return cachedPromise;
}

export function getNoteName(keyIndex: number): string {
  const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const noteInOctave = (keyIndex + 9) % 12;
  const octave = Math.floor((keyIndex + 9) / 12);
  return `${noteNames[noteInOctave]}${octave}`;
}

export function playPianoNote(player: SplendidGrandPiano, keyIndex: number): void {
  const noteName = getNoteName(keyIndex);
  try {
    player.start({ note: noteName, velocity: 80 });
  } catch (error) {
    console.error('Failed to play note:', noteName, error);
  }
}
