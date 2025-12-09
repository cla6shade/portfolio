import Constants from './constants';
import Track from './Track';
import Utils from './Utils';
import { PlayerEvent, MIDIEvent } from '@/features/landing/hero/piano/midi/types';

// Polyfill Uint8Array.forEach: Doesn't exist on Safari <10
if (!Uint8Array.prototype.forEach) {
  Object.defineProperty(Uint8Array.prototype, 'forEach', {
    value: Array.prototype.forEach,
  });
}

export type MIDIEventHandler = (data: MIDIEvent | PlayerEvent) => void;

/**
 * Main player class.  Contains methods to load files, start, stop.
 * @param {function} - Callback to fire for each MIDI event.  Can also be added with on('midiEvent', fn)
 * @param {array} - Array buffer of MIDI file (optional).
 */
export default class Player {
  sampleRate: number;
  startTime: number;
  buffer: Uint8Array<ArrayBuffer> | null;
  midiChunksByteLength: number | null;
  division: number;
  format: number;
  setIntervalId: NodeJS.Timeout | null;
  tracks: Array<Track>;
  instruments: Array<number>;
  defaultTempo: number;
  tempo: number | null;
  startTick: number;
  tick: number;
  lastTick: number | null;
  inLoop: boolean;
  totalTicks: number;
  events: Array<Array<MIDIEvent>>;
  totalEvents: number;
  eventListeners: Record<string, Array<MIDIEventHandler>>;

  constructor(eventHandler?: MIDIEventHandler, buffer?: ArrayBuffer) {
    this.sampleRate = 5; // milliseconds
    this.startTime = 0;
    this.buffer = buffer ? new Uint8Array(buffer) : null;
    this.midiChunksByteLength = null;
    this.division = 0;
    this.format = 0;
    this.setIntervalId = null;
    this.tracks = [];
    this.instruments = [];
    this.defaultTempo = 120;
    this.tempo = null;
    this.startTick = 0;
    this.tick = 0;
    this.lastTick = null;
    this.inLoop = false;
    this.totalTicks = 0;
    this.events = [];
    this.totalEvents = 0;
    this.eventListeners = {};

    if (typeof eventHandler === 'function') this.on('midiEvent', eventHandler);
  }

  /**
   * Load a file into the player (Node.js only).
   * @param {string} path - Path of file.
   * @return {Player}
   */
  async loadFile(path: string): Promise<Player> {
    if (typeof window === 'undefined') {
      const fs = await import('fs');
      this.buffer = fs.readFileSync(path);
      return this.fileLoaded();
    } else {
      throw 'loadFile is only supported on Node.js';
    }
  }

  /**
   * Load an array buffer into the player.
   * @param {array} arrayBuffer - Array buffer of file to be loaded.
   * @return {Player}
   */
  loadArrayBuffer(arrayBuffer: ArrayBuffer): Player {
    this.buffer = new Uint8Array(arrayBuffer);
    return this.fileLoaded();
  }

  /**
   * Load a data URI into the player.
   * @param {string} dataUri - Data URI to be loaded.
   * @return {Player}
   */
  loadDataUri(dataUri: string): Player {
    // convert base64 to raw binary data held in a string.
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    const byteString: string = Utils.atob(dataUri.split(',')[1]);

    // write the bytes of the string to an ArrayBuffer
    const ia: Uint8Array<ArrayBuffer> = new Uint8Array(byteString.length);
    for (let i: number = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    this.buffer = ia;
    return this.fileLoaded();
  }

  /**
   * Get filesize of loaded file in number of bytes.
   * @return {number} - The filesize.
   */
  getFilesize(): number {
    return this.buffer ? this.buffer.length : 0;
  }

  /**
   * Sets default tempo, parses file for necessary information, and does a dry run to calculate total length.
   * Populates this.events & this.totalTicks.
   * @return {Player}
   */
  fileLoaded(): Player {
    if (!this.validate()) throw 'Invalid MIDI file; should start with MThd';
    return this.setTempo(this.defaultTempo).getDivision().getFormat().getTracks().dryRun();
  }

  /**
   * Validates file using simple means - first four bytes should == MThd.
   * @return {boolean}
   */
  validate(): boolean {
    //console.log((this.buffer.subarray(0, 15)));
    if (!this.buffer) return false;
    return Utils.bytesToLetters(this.buffer.subarray(0, 4)) === 'MThd';
  }

  /**
   * Gets MIDI file format for loaded file.
   * @return {Player}
   */
  getFormat(): Player {
    /*
		MIDI files come in 3 variations:
		Format 0 which contain a single track
		Format 1 which contain one or more simultaneous tracks
		(ie all tracks are to be played simultaneously).
		Format 2 which contain one or more independant tracks
		(ie each track is to be played independantly of the others).
		return Utils.bytesToNumber(this.buffer.subarray(8, 10));
		*/

    if (!this.buffer) throw 'Buffer not loaded';
    this.format = Utils.bytesToNumber(this.buffer.subarray(8, 10));
    return this;
  }

  /**
   * Parses out tracks, places them in this.tracks and initializes this.pointers
   * @return {Player}
   */
  getTracks(): Player {
    if (!this.buffer) throw 'Buffer not loaded';
    this.tracks = [];
    let trackOffset: number = 0;
    while (trackOffset < this.buffer.length) {
      if (Utils.bytesToLetters(this.buffer.subarray(trackOffset, trackOffset + 4)) == 'MTrk') {
        const trackLength: number = Utils.bytesToNumber(
          this.buffer.subarray(trackOffset + 4, trackOffset + 8),
        );
        this.tracks.push(
          new Track(
            this.tracks.length,
            this.buffer.subarray(trackOffset + 8, trackOffset + 8 + trackLength),
          ),
        );
      }

      trackOffset +=
        Utils.bytesToNumber(this.buffer.subarray(trackOffset + 4, trackOffset + 8)) + 8;
    }

    // Get sum of all MIDI chunks here while we're at it
    let trackChunksByteLength: number = 0;

    this.tracks.forEach((track: Track): void => {
      trackChunksByteLength += 8 + track.data.length;
    });

    this.midiChunksByteLength = Constants.HEADER_CHUNK_LENGTH + trackChunksByteLength;
    return this;
  }

  /**
   * Enables a track for playing.
   * @param {number} trackNumber - Track number
   * @return {Player}
   */
  enableTrack(trackNumber: number): Player {
    this.tracks[trackNumber - 1].enable();
    return this;
  }

  /**
   * Disables a track for playing.
   * @return {Player}
   * @param trackNumber
   */
  disableTrack(trackNumber: number): Player {
    this.tracks[trackNumber - 1].disable();
    return this;
  }

  /**
   * Gets quarter note division of loaded MIDI file.
   * @return {Player}
   */
  getDivision(): Player {
    if (!this.buffer) throw 'Buffer not loaded';
    this.division = Utils.bytesToNumber(this.buffer.subarray(12, Constants.HEADER_CHUNK_LENGTH));
    return this;
  }

  /**
   * The main play loop.
   * @return {void}
   * @param dryRun
   */
  playLoop(dryRun?: boolean): void {
    if (!this.inLoop) {
      this.inLoop = true;
      this.tick = this.getCurrentTick();

      this.tracks.forEach(function (this: Player, track: Track, index: number): void {
        // Handle next event
        if (!dryRun && this.endOfFile()) {
          //console.log('end of file')
          this.triggerPlayerEvent('endOfFile', { name: 'End Of File' });
          this.stop();
        } else {
          const event: MIDIEvent | null = track.handleEvent(this.tick, dryRun);

          if (dryRun && event) {
            if (event.hasOwnProperty('name') && event.name === 'Set Tempo') {
              // Grab tempo if available.
              this.defaultTempo = event.data as number;
              this.setTempo(event.data as number);
            }
            if (event.hasOwnProperty('name') && event.name === 'Program Change') {
              if (!this.instruments.includes(event.value as number)) {
                this.instruments.push(event.value as number);
              }
            }
          } else if (event) {
            if (event.hasOwnProperty('name') && event.name === 'Set Tempo') {
              // Grab tempo if available.
              this.setTempo(event.data as number);

              if (this.isPlaying()) {
                this.pause().play();
              }
            }

            this.emitEvent(event);
          }
        }
      }, this);

      if (!dryRun) this.triggerPlayerEvent('playing', { name: 'Playing', tick: this.tick });
      this.inLoop = false;
    }
  }

  /**
   * Setter for tempo.
   * @param tempo
   */
  setTempo(tempo: number): Player {
    this.tempo = tempo;
    return this;
  }

  /**
   * Setter for startTime.
   * @param {number} - UTC timestamp
   * @return {Player}
   */
  setStartTime(startTime: number): Player {
    this.startTime = startTime;
    return this;
  }

  /**
   * Start playing loaded MIDI file if not already playing.
   * @return {Player}
   */
  play(): Player {
    if (this.isPlaying()) throw 'Already playing...';

    // Initialize
    if (!this.startTime) this.startTime = new Date().getTime();

    // Start play loop
    //window.requestAnimationFrame(this.playLoop.bind(this));
    this.setIntervalId = setInterval(this.playLoop.bind(this), this.sampleRate);
    //this.setIntervalId = this.loop();
    return this;
  }

  loop(): void {
    setTimeout(
      function (this: Player): void {
        // Do Something Here
        this.playLoop();

        // Then recall the parent function to
        // create a recursive loop.
        this.loop();
      }.bind(this),
      this.sampleRate,
    );
  }

  /**
   * Pauses playback if playing.
   * @return {Player}
   */
  pause(): Player {
    if (this.setIntervalId) clearInterval(this.setIntervalId);
    this.setIntervalId = null;
    this.startTick = this.tick;
    this.startTime = 0;
    return this;
  }

  /**
   * Stops playback if playing.
   * @return {Player}
   */
  stop(): Player {
    if (this.setIntervalId) clearInterval(this.setIntervalId);
    this.setIntervalId = null;
    this.startTick = 0;
    this.startTime = 0;
    this.resetTracks();
    return this;
  }

  /**
   * Skips player pointer to specified tick.
   * @return {Player}
   * @param tick
   */
  skipToTick(tick: number): Player {
    this.stop();
    this.startTick = tick;

    // Need to set track event indexes to the nearest possible event to the specified tick.
    this.tracks.forEach(function (track: Track): void {
      track.setEventIndexByTick(tick);
    });
    return this;
  }

  /**
   * Skips player pointer to specified percentage.
   * @return {Player}
   * @param percent
   */
  skipToPercent(percent: number): Player {
    if (percent < 0 || percent > 100) throw 'Percent must be number between 1 and 100.';
    this.skipToTick(Math.round((percent / 100) * this.totalTicks));
    return this;
  }

  /**
   * Skips player pointer to specified seconds.
   * @return {Player}
   * @param seconds
   */
  skipToSeconds(seconds: number): Player {
    const songTime: number = this.getSongTime();
    if (seconds < 0 || seconds > songTime)
      throw seconds + ' seconds not within song time of ' + songTime;
    this.skipToPercent((seconds / songTime) * 100);
    return this;
  }

  /**
   * Checks if player is playing
   * @return {boolean}
   */
  isPlaying(): boolean {
    return !!this.setIntervalId;
  }

  /**
   * Plays the loaded MIDI file without regard for timing and saves events in this.events.  Essentially used as a parser.
   * @return {Player}
   */
  dryRun(): Player {
    // Reset tracks first
    this.resetTracks();
    while (!this.endOfFile()) {
      this.playLoop(true);
      //console.log(this.bytesProcessed(), this.midiChunksByteLength);
    }
    this.events = this.getEvents();
    this.totalEvents = this.getTotalEvents();
    this.totalTicks = this.getTotalTicks();
    this.startTick = 0;
    this.startTime = 0;

    // Leave tracks in pristine condish
    this.resetTracks();

    //console.log('Song time: ' + this.getSongTime() + ' seconds / ' + this.totalTicks + ' ticks.');

    this.triggerPlayerEvent('fileLoaded', {
      name: 'File Loaded',
    });
    return this;
  }

  /**
   * Resets play pointers for all tracks.
   * @return {Player}
   */
  resetTracks(): Player {
    this.tracks.forEach((track: Track): void => {
      track.reset();
    });
    return this;
  }

  /**
   * Gets an array of events grouped by track.
   * @return {array}
   */
  getEvents(): Array<Array<MIDIEvent>> {
    return this.tracks.map((track: Track): Array<MIDIEvent> => track.events);
  }

  /**
   * Gets total number of ticks in the loaded MIDI file.
   * @return {number}
   */
  getTotalTicks(): number {
    return Math.max.apply(
      null,
      this.tracks.map((track: Track): number => track.delta),
    );
  }

  /**
   * Gets total number of events in the loaded MIDI file.
   * @return {number}
   */
  getTotalEvents(): number {
    return this.tracks.reduce(
      (
        a: { events: { length: number } },
        b: Track,
      ): {
        events: { length: number };
      } => {
        return { events: { length: a.events.length + b.events.length } };
      },
      { events: { length: 0 } },
    ).events.length;
  }

  /**
   * Gets song duration in seconds.
   * @return {number}
   */
  getSongTime(): number {
    if (!this.tempo) return 0;
    return (this.totalTicks / this.division / this.tempo) * 60;
  }

  /**
   * Gets remaining number of seconds in playback.
   * @return {number}
   */
  getSongTimeRemaining(): number {
    if (!this.tempo) return 0;
    return Math.round(
      ((this.totalTicks - this.getCurrentTick()) / this.division / this.tempo) * 60,
    );
  }

  /**
   * Gets remaining percent of playback.
   * @return {number}
   */
  getSongPercentRemaining(): number {
    return Math.round((this.getSongTimeRemaining() / this.getSongTime()) * 100);
  }

  /**
   * Number of bytes processed in the loaded MIDI file.
   * @return {number}
   */
  bytesProcessed(): number {
    return (
      Constants.HEADER_CHUNK_LENGTH +
      this.tracks.length * 8 +
      this.tracks.reduce(
        (a: { pointer: number }, b: Track): { pointer: number } => {
          return { pointer: a.pointer + b.pointer };
        },
        { pointer: 0 },
      ).pointer
    );
  }

  /**
   * Number of events played up to this point.
   * @return {number}
   */
  eventsPlayed(): number {
    return this.tracks.reduce(
      (a: { eventIndex: number }, b: Track): { eventIndex: number } => {
        return { eventIndex: a.eventIndex + b.eventIndex };
      },
      { eventIndex: 0 },
    ).eventIndex;
  }

  /**
   * Determines if the player pointer has reached the end of the loaded MIDI file.
   * Used in two ways:
   * 1. If playing result is based on loaded JSON events.
   * 2. If parsing (dryRun) it's based on the actual buffer length vs bytes processed.
   * @return {boolean}
   */
  endOfFile(): boolean {
    if (this.isPlaying()) {
      return this.totalTicks - this.tick <= 0;
    }

    if (!this.midiChunksByteLength) return false;
    return this.bytesProcessed() >= this.midiChunksByteLength; //this.buffer.length;
  }

  /**
   * Gets the current tick number in playback.
   * @return {number}
   */
  getCurrentTick(): number {
    if (!this.startTime) return this.startTick;
    if (!this.tempo) return this.startTick;
    return (
      Math.round(
        ((new Date().getTime() - this.startTime) / 1000) * (this.division * (this.tempo / 60)),
      ) + this.startTick
    );
  }

  /**
   * Sends MIDI event out to listener.
   * @return {Player}
   * @param event
   */
  emitEvent(event: MIDIEvent): Player {
    this.triggerPlayerEvent('midiEvent', event);
    return this;
  }

  /**
   * Subscribes events to listeners
   * @return {Player}
   * @param playerEvent
   * @param fn
   */
  on(playerEvent: string, fn: MIDIEventHandler): Player {
    if (!this.eventListeners.hasOwnProperty(playerEvent)) this.eventListeners[playerEvent] = [];
    this.eventListeners[playerEvent].push(fn);
    return this;
  }

  /**
   * Broadcasts event to trigger subscribed callbacks.
   * @return {Player}
   * @param playerEvent
   * @param data
   */
  triggerPlayerEvent(playerEvent: string, data: MIDIEvent | PlayerEvent): Player {
    if (this.eventListeners.hasOwnProperty(playerEvent))
      this.eventListeners[playerEvent].forEach((fn: MIDIEventHandler): void => {
        fn(data);
      });
    return this;
  }
}
