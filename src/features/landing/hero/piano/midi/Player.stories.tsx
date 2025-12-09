import { useState, useRef, useEffect, type ChangeEvent } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Player from '@/features/landing/hero/piano/midi/Player';
import { type MIDIEvent } from '@/features/landing/hero/piano/midi/Track';

function MIDIPlayerDemo() {
  const playerRef = useRef<typeof Player.prototype | null>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const currentTickRef = useRef<HTMLSpanElement>(null);
  const progressPercentRef = useRef<HTMLSpanElement>(null);
  const eventsContainerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [totalTicks, setTotalTicks] = useState(0);
  const [songTime, setSongTime] = useState(0);
  const [tempo, setTempo] = useState(120);
  const [error, setError] = useState<string | null>(null);

  const updateProgress = (currentTick: number) => {
    const progress = totalTicks > 0 ? (currentTick / totalTicks) * 100 : 0;

    if (progressBarRef.current) {
      progressBarRef.current.style.width = `${progress}%`;
    }
    if (currentTickRef.current) {
      currentTickRef.current.textContent = String(currentTick);
    }
    if (progressPercentRef.current) {
      progressPercentRef.current.textContent = progress.toFixed(1) + '%';
    }
  };

  const addEventToList = (event: MIDIEvent) => {
    if (!eventsContainerRef.current) return;

    const eventDiv = document.createElement('div');
    eventDiv.className = 'p-2 bg-white rounded border border-gray-300 text-sm font-mono';

    const headerDiv = document.createElement('div');
    headerDiv.className = 'flex justify-between';

    const nameSpan = document.createElement('span');
    nameSpan.className = 'font-semibold';
    nameSpan.textContent = event.name;

    const tickSpan = document.createElement('span');
    tickSpan.className = 'text-gray-600';
    tickSpan.textContent = `Tick: ${event.tick}`;

    headerDiv.appendChild(nameSpan);
    headerDiv.appendChild(tickSpan);
    eventDiv.appendChild(headerDiv);

    if (event.noteName) {
      const noteDiv = document.createElement('div');
      noteDiv.className = 'text-gray-700';
      noteDiv.textContent = `Note: ${event.noteName} (#${event.noteNumber}) - Velocity: ${event.velocity}`;
      eventDiv.appendChild(noteDiv);
    }

    if (event.channel) {
      const channelDiv = document.createElement('div');
      channelDiv.className = 'text-gray-700';
      channelDiv.textContent = `Channel: ${event.channel}`;
      eventDiv.appendChild(channelDiv);
    }

    if (event.data && typeof event.data === 'number') {
      const dataDiv = document.createElement('div');
      dataDiv.className = 'text-gray-700';
      dataDiv.textContent = `Data: ${event.data}`;
      eventDiv.appendChild(dataDiv);
    }

    eventsContainerRef.current.insertBefore(eventDiv, eventsContainerRef.current.firstChild);

    while (eventsContainerRef.current.children.length > 50) {
      eventsContainerRef.current.removeChild(eventsContainerRef.current.lastChild as Node);
    }
  };

  useEffect(() => {
    const player = new Player();
    playerRef.current = player;

    const handleFileLoaded = () => {
      setTotalTicks(player.totalTicks);
      setSongTime(player.getSongTime());
      setTempo(player.tempo || 120);
      setError(null);
    };

    const handleMidiEvent = (
      event: MIDIEvent | Record<string, unknown> | typeof Player.prototype,
    ) => {
      const midiEvent = event as MIDIEvent;
      addEventToList(midiEvent);
    };

    const handlePlaying = (data: MIDIEvent | Record<string, unknown> | typeof Player.prototype) => {
      const playingData = data as Record<string, unknown>;
      const tick = playingData.tick as number;
      updateProgress(tick);
    };

    const handleEndOfFile = () => {
      setIsPlaying(false);
    };

    player.on('fileLoaded', handleFileLoaded);
    player.on('midiEvent', handleMidiEvent);
    player.on('playing', handlePlaying);
    player.on('endOfFile', handleEndOfFile);

    return () => {
      if (player.isPlaying()) {
        player.stop();
      }
    };
  }, []);

  const handleFileLoad = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !playerRef.current) return;

    try {
      const arrayBuffer = await file.arrayBuffer();
      playerRef.current.loadArrayBuffer(arrayBuffer);
      if (eventsContainerRef.current) {
        eventsContainerRef.current.innerHTML = '';
      }
      setError(null);
    } catch (err) {
      setError(`Failed to load file: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const handlePlay = () => {
    if (!playerRef.current) return;
    try {
      playerRef.current.play();
      setIsPlaying(true);
    } catch (err) {
      setError(`Failed to play: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const handlePause = () => {
    if (!playerRef.current) return;
    playerRef.current.pause();
    setIsPlaying(false);
  };

  const handleStop = () => {
    if (!playerRef.current) return;
    playerRef.current.stop();
    setIsPlaying(false);
    updateProgress(0);
    if (eventsContainerRef.current) {
      eventsContainerRef.current.innerHTML = '';
    }
  };

  const handleSkipToPercent = (percent: number) => {
    if (!playerRef.current) return;
    try {
      const wasPlaying = playerRef.current.isPlaying();
      playerRef.current.skipToPercent(percent);
      if (wasPlaying) {
        playerRef.current.play();
      }
    } catch (err) {
      setError(`Failed to skip: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const handleTempoChange = (newTempo: number) => {
    if (!playerRef.current) return;
    playerRef.current.setTempo(newTempo);
    setTempo(newTempo);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4 text-black">MIDI Player Demo</h1>

        <div className="mb-4">
          <label className="block mb-2 font-semibold text-black">Load MIDI File:</label>
          <input
            type="file"
            accept=".mid,.midi"
            onChange={handleFileLoad}
            className="border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
      </div>

      <div className="mb-8 p-6 bg-gray-100 rounded-lg">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold">Progress:</span>
            <span className="text-sm text-gray-600">
              Tick: <span ref={currentTickRef}>0</span> / {totalTicks} (
              <span ref={progressPercentRef}>0.0%</span>)
            </span>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-2">
            <div
              ref={progressBarRef}
              className="bg-blue-600 h-2 rounded-full transition-all duration-100"
              style={{ width: '0%' }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <span className="font-semibold">Song Time:</span>
            <span className="ml-2">{songTime.toFixed(2)}s</span>
          </div>
          <div>
            <span className="font-semibold">Tempo:</span>
            <span className="ml-2">{tempo} BPM</span>
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Adjust Tempo:</label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="60"
              max="240"
              value={tempo}
              onChange={(e) => handleTempoChange(Number(e.target.value))}
              className="flex-1"
            />
            <button
              onClick={() => handleTempoChange(120)}
              className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Jump to Position:</label>
          <div className="flex gap-2">
            {[0, 25, 50, 75, 100].map((percent) => (
              <button
                key={`jump-${percent}`}
                onClick={() => handleSkipToPercent(percent)}
                className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                disabled={totalTicks === 0}
              >
                {percent}%
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handlePlay}
            disabled={isPlaying || totalTicks === 0}
            className="px-6 py-2 border-2 border-green-600 bg-green-600 text-white rounded hover:bg-green-700 hover:border-green-700 disabled:bg-gray-300 disabled:border-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
          >
            Play
          </button>
          <button
            onClick={handlePause}
            disabled={!isPlaying}
            className="px-6 py-2 border-2 border-yellow-600 bg-yellow-600 text-white rounded hover:bg-yellow-700 hover:border-yellow-700 disabled:bg-gray-300 disabled:border-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
          >
            Pause
          </button>
          <button
            onClick={handleStop}
            className="px-6 py-2 border-2 border-red-600 bg-red-600 text-white rounded hover:bg-red-700 hover:border-red-700"
          >
            Stop
          </button>
        </div>
      </div>

      <div className="p-6 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-bold mb-4">MIDI Events (Last 50)</h2>
        <div className="max-h-96 overflow-y-auto">
          <div ref={eventsContainerRef} className="space-y-2">
            <p className="text-gray-500">No events yet. Load a MIDI file and press play.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const meta: Meta<typeof MIDIPlayerDemo> = {
  title: 'Features/Piano/MidiPlayer',
  component: MIDIPlayerDemo,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof MIDIPlayerDemo>;

export const Default: Story = {};
