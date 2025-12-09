/**
 * MIDI event types
 */
export type MIDIEventName =
  | 'Sequence Number'
  | 'Text Event'
  | 'Copyright Notice'
  | 'Sequence/Track Name'
  | 'Instrument Name'
  | 'Lyric'
  | 'Marker'
  | 'Cue Point'
  | 'Device Name'
  | 'MIDI Channel Prefix'
  | 'MIDI Port'
  | 'End of Track'
  | 'Set Tempo'
  | 'SMTPE Offset'
  | 'Time Signature'
  | 'Key Signature'
  | 'Sequencer-Specific Meta-event'
  | 'Sysex'
  | 'Note off'
  | 'Note on'
  | 'Polyphonic Key Pressure'
  | 'Controller Change'
  | 'Program Change'
  | 'Channel Key Pressure'
  | 'Pitch Bend'
  | string;

/**
 * MIDI event interface
 */
export interface MIDIEvent {
  name: MIDIEventName;

  track: number;
  delta: number;
  tick: number;
  byteIndex: number;

  string?: string;
  data?: Uint8Array<ArrayBuffer> | Array<number> | number;
  tempo?: number;

  running?: boolean;
  noteNumber?: number;
  noteName?: string;
  note?: string;
  velocity?: number;
  channel?: number;
  pressure?: number;

  /**
   * Controller change number
   */
  number?: number;
  /**
   * Controller change value
   */
  value?: number;

  timeSignature?: string;
  keySignature?: string;
}

/**
 * Player event types
 */
export type PlayerEventType = 'midiEvent' | 'endOfFile' | 'playing' | 'fileLoaded';

/**
 * Player-specific events
 */
export interface EndOfFileEvent {
  name: 'End Of File';
}

export interface PlayingEvent {
  name: 'Playing';
  tick: number;
}

export interface FileLoadedEvent {
  name: 'File Loaded';
}

export type PlayerEvent = EndOfFileEvent | PlayingEvent | FileLoadedEvent;

/**
 * Event handler type
 */
export type MIDIEventHandler = (data: MIDIEvent | PlayerEvent) => void;
