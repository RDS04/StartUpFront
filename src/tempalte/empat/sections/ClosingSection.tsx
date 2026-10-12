import React from 'react';
import { ASSETS } from '../data';

export const ClosingSection: React.FC = () => {
  return (
    <footer className="relative px-6 py-20 bg-[#223124] text-white text-center overflow-hidden">
      {/* Background Dim Image */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-25">
        <img
          src={ASSETS.coupleClosing}
          alt="Eza & Islammy"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1b261d] via-[#243526]/90 to-[#223124]" />
      </div>

      <div className="relative z-10 max-w-sm sm:max-w-md mx-auto space-y-8">
        {/* Narrative Thank You */}
        <div className="space-y-4">
          <p className="text-xs sm:text-sm text-[#cbd9bf] leading-relaxed font-light">
            Menjadi sebuah kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir
            dalam hari bahagia ini. Terima kasih atas segala ucapan, doa, dan perhatian yang
            telah diberikan.
          </p>

          <h3 className="font-sage-serif font-bold text-sm sm:text-base text-[#f2f6ee]">
            Wassalamu'alaikum Warahmatullahi Wabarakatuh
          </h3>
        </div>

        {/* Closing Framed Couple Photo */}
        <div className="w-40 h-52 sm:w-44 sm:h-56 mx-auto rounded-t-[90px] rounded-b-2xl p-1 bg-gradient-to-b from-[#8f9e7b] to-[#c5a454] shadow-2xl overflow-hidden">
          <div className="w-full h-full rounded-t-[86px] rounded-b-xl overflow-hidden">
            <img
              src={ASSETS.coupleClosing}
              alt="Eza & Islammy"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>

        {/* Big Day Callout */}
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.25em] text-[#b6c7aa] font-medium">
            See you on our big day!
          </p>
          <h2 className="font-sage-script text-4xl sm:text-5xl text-[#f4f7f0] leading-tight">
            Eza <span className="text-[#c5a454] font-serif">&amp;</span> Islammy
          </h2>
        </div>

        {/* Footer Brand */}
        <div className="pt-8 border-t border-white/10 space-y-2 text-[11px] text-[#9aab8f]">
          <p className="font-serif">
            The Wedding of Eza &amp; Islammy &bull; 2023
          </p>
          <p className="text-[10px] text-[#86967b]">
            Dibuat dengan cinta menggunakan platform undangan digital
          </p>
        </div>
      </div>
    </footer>
  );
};
