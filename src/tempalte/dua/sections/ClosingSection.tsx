import React from 'react';
import { Reveal } from '../components/Reveal';
import { NameBadge, Section } from '../components/Shared';
import { CLOSING, PHOTOS } from '../data';

const ClosingSection: React.FC = () => (
  <Section
    photo={PHOTOS.closing}
    overlay="bg-gradient-to-b from-black/55 via-black/10 to-black/60"
    innerClassName="flex min-h-[100svh] flex-col items-center justify-between px-8 pt-20 pb-10 text-center"
  >
    <div>
      <Reveal anim="down">
        <p className="mx-auto max-w-[320px] text-[14px] leading-relaxed text-white drop-shadow">{CLOSING.text}</p>
      </Reveal>
      <Reveal anim="down" delay={150}>
        <p className="mt-6 text-[13px] text-white/90">{CLOSING.thanks}</p>
      </Reveal>
      <Reveal anim="zoom" delay={280} className="mt-4">
        <NameBadge size="lg" />
      </Reveal>
    </div>

    <Reveal anim="fade" delay={400}>
      <p className="text-[11px] tracking-[0.3em] text-white/70">THANK YOU</p>
    </Reveal>
  </Section>
);

export default ClosingSection;
