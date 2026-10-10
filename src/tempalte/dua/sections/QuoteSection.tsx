import React from 'react';
import { Reveal } from '../components/Reveal';
import { Section } from '../components/Shared';
import { PHOTOS, QUOTE } from '../data';

const QuoteSection: React.FC = () => (
  <Section innerClassName="flex min-h-[100svh] flex-col items-center justify-center px-8 py-20 text-center">
    <Reveal anim="down" className="mb-8">
      <div className="relative mx-auto h-[340px] w-[235px] rounded-t-[999px] border-[3px] border-white/60 p-2.5 shadow-[0_20px_50px_rgba(60,40,42,.35)]">
        <div className="absolute -inset-3 rounded-t-[999px] border border-white/25" />
        <div className="h-full w-full overflow-hidden rounded-t-[999px]">
          <img src={PHOTOS.quoteArch} alt="Vani & Rahmat" loading="lazy" className="h-full w-full object-cover transition-transform duration-[2s] hover:scale-110" />
        </div>
      </div>
    </Reveal>

    <Reveal anim="up" delay={150}>
      <span className="dr-display block text-5xl leading-none text-white/50">“</span>
      <p className="mx-auto -mt-3 max-w-[340px] text-[13.5px] leading-relaxed text-white/95">{QUOTE.text}</p>
      <p className="dr-display mt-4 text-[15px] italic tracking-wide text-white">{QUOTE.source}</p>
    </Reveal>
  </Section>
);

export default QuoteSection;
