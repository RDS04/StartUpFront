import React from 'react';
import { Mail, Sparkles } from 'lucide-react';
import { useTemplateEmpatData } from '../context';

interface CoverSectionProps {
  guestName: string;
  onOpen: () => void;
}

export const CoverSection: React.FC<CoverSectionProps> = ({ guestName, onOpen }) => {
  const { weddingInfo: WEDDING_INFO, assets: ASSETS } = useTemplateEmpatData();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#223124] text-white">
      {/* Background Image with Slow Ken-Burns Motion */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={ASSETS.coupleCover}
          alt={`${WEDDING_INFO.coupleDisplay} Cover`}
          className="w-full h-full object-cover object-center brightness-60 scale-105 animate-ken-burns"
        />
        {/* Soft Sage Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1b261d] via-[#243526]/75 to-[#1c271e]/85 backdrop-blur-[1px]" />
      </div>

      {/* Ornamen Dedaunan Goyang (Kiri & Kanan) */}
      <div className="absolute top-0 left-0 w-36 sm:w-48 z-10 pointer-events-none origin-top-left animate-goyang-kiri opacity-90">
        <img
          src={ASSETS.leafCorner}
          alt="Ornamen Daun Kiri"
          className="w-full h-auto drop-shadow-lg"
        />
      </div>

      <div className="absolute top-0 right-0 w-36 sm:w-48 z-10 pointer-events-none origin-top-right animate-goyang-kanan scale-x-[-1] opacity-90">
        <img
          src={ASSETS.leafCorner}
          alt="Ornamen Daun Kanan"
          className="w-full h-auto drop-shadow-lg"
        />
      </div>

      {/* Main Cover Card Content */}
      <div className="relative z-20 w-full max-w-sm sm:max-w-md mx-auto px-6 py-10 flex flex-col items-center text-center">
        {/* Top Tagline */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#e2edd3] text-[11px] font-semibold tracking-widest uppercase mb-4 shadow-sm animate-pulse">
          <Sparkles className="w-3 h-3 text-[#c5a454]" />
          <span>The Wedding Of</span>
        </div>

        {/* Couple Names */}
        <h1 className="font-sage-script text-5xl sm:text-6xl text-[#f4f7f0] leading-none mb-2 drop-shadow-md">
          {WEDDING_INFO.groomNickname} <span className="text-[#c5a454] font-serif">&amp;</span> {WEDDING_INFO.brideNickname}
        </h1>

        <p className="font-sage-serif text-xs uppercase tracking-[0.25em] text-[#cbd9bf] mb-8 font-medium">
          {WEDDING_INFO.weddingDateDisplay}
        </p>

        {/* Guest Greeting Box */}
        <div className="w-full bg-[#2f4031]/80 backdrop-blur-md border border-[#8f9e7b]/40 rounded-2xl p-5 mb-8 shadow-2xl text-center">
          <p className="text-[11px] uppercase tracking-wider text-[#d4dec9] font-medium mb-1">
            Kepada Yth. Bapak/Ibu/Saudara/i:
          </p>
          <h2 className="font-sage-serif font-bold text-lg sm:text-xl text-[#fbfdf9] tracking-wide my-1">
            {guestName || 'Tamu Undangan'}
          </h2>
          <p className="text-[10px] text-[#b6c6aa] italic mt-1 leading-relaxed">
            Mohon maaf apabila ada kesalahan penulisan nama atau gelar
          </p>
        </div>

        {/* Open Invitation Button */}
        <button
          type="button"
          onClick={onOpen}
          className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#597053] via-[#6e8867] to-[#c5a454] text-white font-semibold text-xs sm:text-sm shadow-xl shadow-[#162418]/60 hover:shadow-[#c5a454]/40 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border border-[#f1f7eb]/30"
        >
          <Mail className="w-4 h-4 text-[#f4f7f0] group-hover:rotate-12 transition-transform duration-300" />
          <span className="tracking-wider uppercase font-bold text-[#fbfdf9]">
            Buka Undangan
          </span>
        </button>
      </div>

      {/* Bottom Floating Subtitle */}
      <div className="absolute bottom-4 inset-x-0 z-20 text-center text-[10px] text-white/50 tracking-widest font-mono">
        &bull; SAGE BOTANICAL WEDDING &bull;
      </div>
    </div>
  );
};
