import React from 'react';
import { Sparkles } from 'lucide-react';
import { useTemplateEmpatData } from '../context';

export const CoupleSection: React.FC = () => {
  const { bride: BRIDE_DATA, groom: GROOM_DATA } = useTemplateEmpatData();
  return (
    <section id="couple-section" className="relative px-6 py-16 bg-[#fafbf7] text-[#2c3d2f] overflow-hidden">
      <div className="max-w-sm sm:max-w-md mx-auto space-y-12">
        {/* Section Heading */}
        <div className="text-center space-y-1.5">
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#718569] bg-[#8f9e7b]/15 px-3 py-1 rounded-full border border-[#8f9e7b]/25">
            Kedua Mempelai
          </span>
          <h2 className="font-sage-serif text-2xl sm:text-3xl font-bold text-[#233325]">
            Mempelai Pengantin
          </h2>
          <div className="w-12 h-0.5 bg-[#c5a454] mx-auto rounded-full mt-2" />
        </div>

        {/* Mempelai Wanita (The Bride) */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="relative w-48 h-60 rounded-t-[100px] rounded-b-2xl p-1.5 bg-gradient-to-b from-[#8f9e7b] to-[#c5a454]/60 shadow-xl overflow-hidden group">
            <div className="w-full h-full rounded-t-[94px] rounded-b-xl overflow-hidden">
              <img
                src={BRIDE_DATA.photoUrl}
                alt={BRIDE_DATA.fullName}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center text-[#c5a454] shadow-xs">
              <Sparkles className="w-3 h-3" />
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="font-sage-script text-3xl sm:text-4xl text-[#2a3c2c] leading-tight">
              {BRIDE_DATA.name}
            </h3>
            <h4 className="font-sage-serif font-bold text-sm sm:text-base text-[#1e2c20]">
              {BRIDE_DATA.fullName}
            </h4>
            <p className="text-xs text-[#5f745a] leading-relaxed max-w-xs mx-auto pt-1 font-light">
              {BRIDE_DATA.childOrder} <br />
              <strong className="font-semibold text-[#2f4130]">{BRIDE_DATA.father}</strong> <br />
              &amp; <span className="text-[#3b4e3c]">{BRIDE_DATA.mother}</span>
            </p>
          </div>
        </div>

        {/* Amperstand Divider */}
        <div className="flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white border border-[#c5a454]/50 shadow-md flex items-center justify-center">
            <span className="font-sage-script text-3xl text-[#c5a454] leading-none select-none">
              &amp;
            </span>
          </div>
        </div>

        {/* Mempelai Pria (The Groom) */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="relative w-48 h-60 rounded-t-[100px] rounded-b-2xl p-1.5 bg-gradient-to-b from-[#8f9e7b] to-[#c5a454]/60 shadow-xl overflow-hidden group">
            <div className="w-full h-full rounded-t-[94px] rounded-b-xl overflow-hidden">
              <img
                src={GROOM_DATA.photoUrl}
                alt={GROOM_DATA.fullName}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center text-[#c5a454] shadow-xs">
              <Sparkles className="w-3 h-3" />
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="font-sage-script text-3xl sm:text-4xl text-[#2a3c2c] leading-tight">
              {GROOM_DATA.name}
            </h3>
            <h4 className="font-sage-serif font-bold text-sm sm:text-base text-[#1e2c20]">
              {GROOM_DATA.fullName}
            </h4>
            <p className="text-xs text-[#5f745a] leading-relaxed max-w-xs mx-auto pt-1 font-light">
              {GROOM_DATA.childOrder} <br />
              <strong className="font-semibold text-[#2f4130]">{GROOM_DATA.father}</strong> <br />
              &amp; <span className="text-[#3b4e3c]">{GROOM_DATA.mother}</span>
            </p>

            {GROOM_DATA.instagram && (
              <div className="pt-3">
                <a
                  href={GROOM_DATA.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#c9d4bf] hover:border-[#8f9e7b] text-xs font-semibold text-[#3b4e3c] shadow-xs hover:shadow-sm hover:scale-105 transition-all"
                >
                  <svg className="w-3.5 h-3.5 text-[#E1306C]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  <span>@islammyshaleh_rz</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
