import React from 'react';
import { Heart } from 'lucide-react';

export const QuoteSection: React.FC = () => {
  return (
    <section className="relative px-6 py-14 bg-gradient-to-b from-[#fafbf7] via-[#f3f6ee] to-[#fafbf7] text-[#2c3d2f] text-center overflow-hidden">
      {/* Decorative Dividers */}
      <div className="max-w-sm sm:max-w-md mx-auto space-y-6">
        {/* Basmalah */}
        <div className="space-y-2">
          <p className="font-sage-arabic text-2xl sm:text-3xl text-[#394d3c] tracking-wide" dir="rtl">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
          <h2 className="font-sage-serif font-bold text-sm sm:text-base text-[#243525] tracking-wide">
            Assalamu'alaikum Warahmatullahi Wabarakatuh
          </h2>
        </div>

        {/* Narrative Intro */}
        <p className="text-xs sm:text-sm text-[#546850] leading-relaxed font-light">
          Maha Suci Allah SWT yang telah menciptakan makhluk-Nya berpasang-pasangan.
          Dengan memohon rahmat dan ridho-Nya, kami bermaksud menyelenggarakan syukuran
          pernikahan putra-putri kami:
        </p>

        {/* Quran Verse Card */}
        <div className="relative p-6 rounded-2xl bg-white/80 backdrop-blur-xs border border-[#8f9e7b]/30 shadow-md">
          {/* Small Heart Icon Center */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#5b6e55] text-white flex items-center justify-center shadow-xs">
            <Heart className="w-3.5 h-3.5 fill-current text-[#c5a454]" />
          </div>

          <p className="text-xs sm:text-[13px] italic text-[#44563f] leading-relaxed mb-3">
            &ldquo;Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan
            untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya,
            dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu
            benar-benar terdapat tanda-tanda bagi kaum yang berpikir.&rdquo;
          </p>

          <span className="inline-block px-3 py-1 rounded-full bg-[#8f9e7b]/15 text-[#324534] font-sage-serif text-[11px] font-bold tracking-wider">
            QS. Ar-Rum: 21
          </span>
        </div>
      </div>
    </section>
  );
};
