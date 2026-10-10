import React from 'react';
import { MailOpen } from 'lucide-react';
import { FloralCorners } from '../components/FloralCorners';
import { NameBadge, Petals } from '../components/Shared';
import { PHOTOS } from '../data';

interface CoverProps {
  guestName: string;
  isOpen: boolean;
  isEmbedded?: boolean;
  onOpen: () => void;
}

const CoverSection: React.FC<CoverProps> = ({ guestName, isOpen, isEmbedded, onOpen }) => (
  <div
    className={`dr-cover ${isOpen ? 'is-open' : ''} ${
      isEmbedded ? 'absolute' : 'fixed'
    } inset-y-0 left-1/2 z-50 w-full max-w-[430px] -translate-x-1/2 overflow-hidden bg-[#4b3d3e]`}
  >
    <img src={PHOTOS.cover} alt="Vani & Rahmat" className="dr-kenburns absolute inset-0 h-full w-full object-cover" />
    <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/15 to-black/70" />
    <FloralCorners size="w-36" opacity={0.85} />
    <Petals count={10} />

    <div className="relative z-[5] flex h-full flex-col items-center justify-end px-8 pb-16 text-center">
      <p className="mb-3 text-[11px] uppercase tracking-[0.45em] text-white/80 [animation:dr-fade-in_1.4s_ease_.2s_both]">
        The Wedding Of
      </p>
      <div className="[animation:dr-modal-in_1.4s_cubic-bezier(.2,.7,.2,1)_.35s_both]">
        <NameBadge size="lg" />
      </div>

      <div className="mt-8 w-full max-w-[280px] rounded-2xl border border-white/25 bg-white/10 px-5 py-4 backdrop-blur-md [animation:dr-modal-in_1.4s_cubic-bezier(.2,.7,.2,1)_.6s_both]">
        <p className="text-[12px] text-white/80">Kepada Yth. Bapak/Ibu/Saudara/i</p>
        <p className="mt-1 text-base font-semibold text-white">{guestName}</p>
        <p className="mt-1 text-[10px] text-white/60">Mohon maaf apabila ada kesalahan penulisan nama/gelar</p>
      </div>

      <button
        onClick={onOpen}
        className="dr-btn-shine dr-float mt-6 inline-flex cursor-pointer items-center gap-2 rounded-full bg-[var(--dr-accent)] px-7 py-2.5 text-sm font-medium text-white shadow-[0_10px_30px_rgba(0,0,0,.35)] transition hover:bg-[#3f3a38] [animation:dr-fade-in_1.4s_ease_.9s_both]"
      >
        <MailOpen className="h-4 w-4" />
        Open Invitation
      </button>
    </div>
  </div>
);

export default CoverSection;
