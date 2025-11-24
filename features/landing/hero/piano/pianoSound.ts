import Soundfont from 'soundfont-player';

export interface Player {
  play: (note: string, time?: number, options?: { gain?: number; duration?: number }) => void;
}

let cachedPromise: Promise<Player> | null = null;

export function loadPiano(): Promise<Player> {
  if (cachedPromise) return cachedPromise;

  cachedPromise = (async () => {
    const audioContext = new AudioContext();
    const instrument = await Soundfont.instrument(audioContext, 'acoustic_grand_piano');
    return instrument as Player;
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
    player.play(noteName);
  } catch (error) {
    console.error('Failed to play note:', noteName, error);
  }
}
