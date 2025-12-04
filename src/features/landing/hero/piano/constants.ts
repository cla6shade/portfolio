export const KEY_PROPERTIES = {
  black: {
    width: 0.1,
    height: 0.075,
    length: 0.6,
    pressDepth: 0.025,
  },
  white: {
    width: 0.15,
    height: 0.1,
    length: 1.0,
    pressDepth: 0.05,
  },
};
export const TOTAL_KEYS = 88;
export const TOTAL_WHITE_KEYS = 52;

export const KEY_GAP = KEY_PROPERTIES.white.width;
export const PIANO_WIDTH = TOTAL_WHITE_KEYS * KEY_GAP;
export const CASE_WIDTH = PIANO_WIDTH + 0.8;
export const CASE_LENGTH = KEY_PROPERTIES.white.length + 0.3;

export const whiteKeyPattern = [0, 2, 4, 5, 7, 9, 11]; // C, D, E, F, G, A, B
export const blackKeyPattern = [1, 3, 6, 8, 10]; // C#, D#, F#, G#, A#

export const PIANO_POSITION: [number, number, number] = [8, 4, 1];
export const PIANO_ROTATION: [number, number, number] = [0, -Math.PI / 3, 0];
export const PIANO_SIZE: [number, number, number] = [CASE_WIDTH, 0.3, CASE_LENGTH];

export const INITIAL_CAMERA_POSITION: [number, number, number] = [-0.68, 9.19, 14.46];
export const INITIAL_CAMERA_FOV = 75;
