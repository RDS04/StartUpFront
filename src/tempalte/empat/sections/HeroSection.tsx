import React from 'react';
import { Sparkles, Calendar, MapPin } from 'lucide-react';
import { useTemplateEmpatData } from '../context';

export const HeroSection: React.FC = () => {
  const { weddingInfo: WEDDING_INFO, assets: ASSETS } = useTemplateEmpatData();
  return (
    <section id="hero-section" className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 py-16 overflow-hidden bg-[#fafbf7]">
      {/* Background Soft Glow Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#8f9e7b_1px,transparent_1px)] [background-size:20px_20px] opacity-15 pointer-events-none" />

      {/* Ornamen Daun Goyang Atas Kiri & Kanan */}
      <div className="absolute -top-4 -left-4 w-32 sm:w-44 pointer-events-none origin-top-left animate-goyang-kiri opacity-90 z-10">
        <img
          src={ASSETS.leafCorner}
          alt="Ornamen Daun Kiri"
          className="w-full h-auto drop-shadow-md"
        />
      </div>

      <div className="absolute -top-4 -right-4 w-32 sm:w-44 pointer-events-none origin-top-right animate-goyang-kanan scale-x-[-1] opacity-90 z-10">
        <img
          src={ASSETS.leafCorner}
          alt="Ornamen Daun Kanan"
          className="w-full h-auto drop-shadow-md"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-20 max-w-sm sm:max-w-md w-full flex flex-col items-center">
        {/* Top Mini Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5b6e55]/10 text-[#44563f] border border-[#8f9e7b]/30 text-[10px] uppercase font-bold tracking-widest mb-4">
          <Sparkles className="w-3 h-3 text-[#b8953f]" />
          <span>The Wedding Celebration</span>
        </div>

        {/* Framed Couple Photo */}
        <div className="relative w-64 h-80 sm:w-72 sm:h-92 rounded-t-[140px] rounded-b-2xl overflow-hidden p-2 bg-gradient-to-b from-[#8f9e7b]/40 via-[#dbe4d3]/60 to-[#c5a454]/40 shadow-2xl mb-6">
          <div className="w-full h-full rounded-t-[132px] rounded-b-xl overflow-hidden relative shadow-inner">
            <img
              src={ASSETS.coupleHero}
              alt="Eza & Islammy"
              className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
            />
            {/* Soft lighting overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 inset-x-3 text-center text-white/95">
              <span className="text-[11px] font-sage-serif tracking-widest uppercase">
                Forever &amp; Always
              </span>
            </div>
          </div>
        </div>

        {/* Names */}
        <h1 className="font-sage-script text-5xl sm:text-6xl text-[#2b3b2d] leading-none mb-2">
          {WEDDING_INFO.groomNickname} <span className="text-[#c5a454] font-serif">&amp;</span> {WEDDING_INFO.brideNickname}
        </h1>

        <p className="font-sage-serif text-xs uppercase tracking-[0.25em] text-[#63765f] font-semibold mb-4">
          {WEDDING_INFO.weddingDateDisplay}
        </p>

        {/* Quick Date & Location Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-[#475a43] font-medium">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#c9d4bf] shadow-xs">
            <Calendar className="w-3.5 h-3.5 text-[#8f9e7b]" />
            <span>16 &amp; 17 Desember 2023</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#c9d4bf] shadow-xs">
            <MapPin className="w-3.5 h-3.5 text-[#8f9e7b]" />
            <span>Padang, Sumatera Barat</span>
          </div>
        </div>
      </div>
    </section>
  );
};
