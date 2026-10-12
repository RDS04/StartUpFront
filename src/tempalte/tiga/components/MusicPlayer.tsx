import React from 'react';
import { Disc3 } from 'lucide-react';

interface MusicPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ isPlaying, onToggle }) => {
  return (
    <div className="fixed bottom-20 right-4 z-40 sm:bottom-24 sm:right-6">
      <button
        onClick={onToggle}
        title={isPlaying ? 'Jeda Musik' : 'Putar Musik'}
        aria-label={isPlaying ? 'Jeda Musik' : 'Putar Musik'}
        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#200306]/90 border-2 border-[#cfa84a] shadow-[0_4px_20px_rgba(0,0,0,0.6)] flex items-center justify-center text-[#f3df95] hover:scale-105 active:scale-95 transition-all cursor-pointer backdrop-blur-md group ${
          isPlaying ? 'animate-vinyl shadow-[0_0_15px_rgba(207,168,74,0.4)]' : 'opacity-85'
        }`}
      >
        <Disc3 className="w-6 h-6 sm:w-7 sm:h-7 text-[#f3df95]" />
        {/* Needle / center pin visual */}
        <div className="absolute w-3 h-3 rounded-full bg-[#cfa84a] border border-[#3a060d]" />
      </button>
    </div>
  );
};
