import React from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

interface MusicPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ isPlaying, onToggle }) => {
  return (
    <div className="fixed bottom-24 right-5 z-40 flex items-center gap-2">
      <button
        type="button"
        onClick={onToggle}
        className={`relative w-12 h-12 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 cursor-pointer ${
          isPlaying
            ? 'bg-[#5b6e55] text-[#f4f7f0] border-2 border-[#dbe4d3]/80 shadow-[#5b6e55]/40'
            : 'bg-slate-800/90 text-slate-300 border-2 border-slate-600 shadow-black/40'
        }`}
        title={isPlaying ? 'Jeda Musik' : 'Putar Musik'}
        aria-label={isPlaying ? 'Jeda Musik' : 'Putar Musik'}
      >
        {/* Animated Sound Wave Rings */}
        {isPlaying && (
          <span className="absolute -inset-1.5 rounded-full border-2 border-[#8f9e7b]/50 animate-ping pointer-events-none" />
        )}

        {/* Vinyl Disc Center Icon */}
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform ${
            isPlaying ? 'animate-spin-slow' : ''
          }`}
        >
          {isPlaying ? (
            <Volume2 className="w-4 h-4 text-white" />
          ) : (
            <VolumeX className="w-4 h-4 text-slate-400" />
          )}
        </div>

        {/* Small floating note badge */}
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#c5a454] text-white flex items-center justify-center shadow-xs">
          <Music className="w-2.5 h-2.5" />
        </span>
      </button>
    </div>
  );
};
