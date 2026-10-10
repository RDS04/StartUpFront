import React, { useState } from 'react';
import { Check, Copy, Gift, MapPin } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { NameBadge, ScriptTitle, Section } from '../components/Shared';
import { GIFT } from '../data';

const BankCard: React.FC<{ bank: string; number: string; holder: string; onCopy: (v: string) => void; copied: boolean }> = ({
  bank,
  number,
  holder,
  onCopy,
  copied,
}) => (
  <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#fdf8f5] via-[#f3e6e3] to-[#e2cfcd] p-5 text-left text-[var(--dr-ink)] shadow-[0_15px_40px_rgba(60,40,42,.25)] transition-transform duration-500 hover:-translate-y-1">
    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[var(--dr-bg)]/25 blur-xl" />
    <div className="absolute -bottom-12 -left-8 h-28 w-28 rounded-full bg-white/70 blur-xl" />
    <div className="relative flex items-start justify-between">
      <span className="rounded-md bg-[#f15a22] px-2.5 py-0.5 text-sm font-extrabold italic tracking-wide text-white">{bank}</span>
      <div className="h-7 w-10 rounded-md bg-gradient-to-br from-[#e9cf8f] to-[#b8955a] shadow-inner" />
    </div>
    <p className="relative mt-5 font-mono text-xl font-semibold tracking-[0.18em]">
      {number.replace(/(\d{4})(?=\d)/g, '$1 ')}
    </p>
    <div className="relative mt-3 flex items-end justify-between">
      <div>
        <p className="text-[9px] uppercase tracking-[0.25em] text-[var(--dr-ink)]/50">Atas Nama</p>
        <p className="text-sm font-semibold">{holder}</p>
      </div>
      <button
        onClick={() => onCopy(number)}
        className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-[var(--dr-accent)] px-3.5 py-1.5 text-[11px] font-medium text-white transition hover:bg-[#3f3a38] active:scale-95"
      >
        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        {copied ? 'Tersalin' : 'Salin'}
      </button>
    </div>
  </div>
);

const GiftSection: React.FC<{ onToast: (msg: string) => void }> = ({ onToast }) => {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (value: string, label: string) => {
    navigator.clipboard?.writeText(value);
    setCopied(value);
    onToast(`${label} berhasil disalin`);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <Section innerClassName="flex min-h-[100svh] flex-col items-center justify-center px-7 py-20 text-center">
      <Reveal anim="zoom" className="mb-8">
        <NameBadge />
      </Reveal>
      <ScriptTitle>Tanda Kasih</ScriptTitle>
      <Reveal anim="up" delay={120}>
        <p className="mx-auto mt-4 max-w-[330px] text-[13.5px] leading-relaxed text-white/90">{GIFT.intro}</p>
      </Reveal>

      <div className="mt-8 w-full max-w-[340px] space-y-4">
        {GIFT.accounts.map((a, i) => (
          <Reveal key={a.number} anim={i % 2 ? 'right' : 'left'} delay={200 + i * 120}>
            <BankCard {...a} copied={copied === a.number} onCopy={(v) => copy(v, 'Nomor rekening')} />
          </Reveal>
        ))}

        <Reveal anim="up" delay={450}>
          <div className="rounded-2xl border border-white/40 bg-white/10 p-5 backdrop-blur-md">
            <div className="mb-2 flex items-center justify-center gap-2">
              <Gift className="h-4 w-4" />
              <p className="font-semibold">Kirim Kado</p>
            </div>
            <p className="text-[13px] leading-relaxed text-white/90">
              <MapPin className="mr-1 inline h-3.5 w-3.5" />
              {GIFT.address}
            </p>
            <button
              onClick={() => copy(GIFT.address, 'Alamat')}
              className="mt-3 inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-[11px] font-medium text-[var(--dr-accent)] transition hover:bg-[var(--dr-cream)] active:scale-95"
            >
              {copied === GIFT.address ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              Salin Alamat
            </button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
};

export default GiftSection;
