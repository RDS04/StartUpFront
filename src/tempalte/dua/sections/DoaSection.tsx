import React from 'react';
import { MessageCircleHeart } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { Petals, ScriptTitle, Section } from '../components/Shared';
import { DOA, PHOTOS } from '../data';

const DoaSection: React.FC<{ onOpenRsvp: () => void }> = ({ onOpenRsvp }) => (
  <Section
    photo={PHOTOS.doa}
    overlay="bg-gradient-to-b from-black/45 via-black/20 to-black/40"
    innerClassName="flex min-h-[100svh] flex-col items-center justify-start px-8 pt-24 pb-16 text-center"
  >
    <Petals count={8} />
    <ScriptTitle>Do'a Untuk Pengantin</ScriptTitle>
    <Reveal anim="up" delay={150}>
      <p className="mx-auto mt-6 max-w-[340px] text-[14px] leading-relaxed text-white drop-shadow">{DOA.text}</p>
      <p className="mt-4 text-[13px] text-white/90">{DOA.source}</p>
    </Reveal>
    <Reveal anim="up" delay={280}>
      <p className="mx-auto mt-6 max-w-[300px] text-[13px] text-white/90 drop-shadow">
        Tekan tombol di bawah ini untuk mengirim ucapan dan konfirmasi kehadiran
      </p>
    </Reveal>
    <Reveal anim="zoom" delay={380} className="mt-5">
      <button
        onClick={onOpenRsvp}
        className="dr-btn-shine inline-flex cursor-pointer items-center gap-2 rounded-full bg-[var(--dr-accent)]/90 px-6 py-2.5 text-[13px] font-medium text-white shadow-[0_10px_30px_rgba(0,0,0,.35)] backdrop-blur transition hover:-translate-y-0.5 hover:bg-[var(--dr-accent)]"
      >
        <MessageCircleHeart className="h-4 w-4" />
        Konfirmasi &amp; Kirim Ucapan
      </button>
    </Reveal>
  </Section>
);

export default DoaSection;
