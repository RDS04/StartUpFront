import React from 'react';
import { Reveal } from '../components/Reveal';
import { ScriptTitle, Section } from '../components/Shared';
import { LOVE_STORY } from '../data';

const LoveStorySection: React.FC = () => (
  <Section innerClassName="flex min-h-[100svh] flex-col items-center justify-center px-8 py-24">
    <ScriptTitle>Our Love Story</ScriptTitle>

    <ol className="relative mt-10 w-full max-w-[340px]">
      {/* vertical line */}
      <span className="absolute left-[7px] top-2 bottom-6 w-[2px] rounded-full bg-gradient-to-b from-[var(--dr-accent)] via-[var(--dr-accent)]/80 to-transparent" />
      {LOVE_STORY.map((s, i) => (
        <Reveal as="li" key={s.title} anim="right" delay={i * 160} className="relative mb-8 pl-8 last:mb-0">
          <span className="dr-pulse absolute left-0 top-1 h-4 w-4 rounded-full border-2 border-white/80 bg-[var(--dr-accent)]" />
          <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm transition-colors duration-500 hover:bg-white/15">
            <h3 className="text-[14px] font-semibold">{s.title}</h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-white/90">{s.text}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  </Section>
);

export default LoveStorySection;
