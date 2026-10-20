import React, { useState } from 'react';
import { Check, Copy, Gift, MapPin } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { NameBadge, ScriptTitle, Section } from '../components/Shared';
import { useTemplateDuaData } from '../context';

import { InteractiveAtmCard3D } from '../../CardAtm/InteractiveAtmCard3D';

const Smart3DBankCard: React.FC<{
  bank: string;
  number: string;
  holder: string;
  onCopy: (num: string, label?: string) => void;
}> = ({ bank, number, holder, onCopy }) => {
  return (
    <InteractiveAtmCard3D
      bankName={bank}
      accountNumber={number}
      holderName={holder}
      onCopy={onCopy}
      compact={false}
      interactive={true}
    />
  );
};

const GiftSection: React.FC<{ onToast: (msg: string) => void }> = ({ onToast }) => {
  const { gift } = useTemplateDuaData();
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
        <p className="mx-auto mt-4 max-w-[330px] text-[13.5px] leading-relaxed text-white/90">{gift.intro}</p>
      </Reveal>

      <div className="mt-8 w-full max-w-[360px] space-y-6">
        {gift.accounts.map((a, i) => (
          <Reveal key={`${a.bank}-${a.number}-${i}`} anim={i % 2 ? 'right' : 'left'} delay={200 + i * 120}>
            <Smart3DBankCard
              bank={a.bank}
              number={a.number}
              holder={a.holder}
              onCopy={(num, label) => copy(num, label || `Nomor Rekening ${a.bank}`)}
            />
          </Reveal>
        ))}

        <Reveal anim="up" delay={450}>
          <div className="rounded-2xl border border-white/40 bg-white/10 p-5 backdrop-blur-md">
            <div className="mb-2 flex items-center justify-center gap-2 text-white">
              <Gift className="h-4 w-4" />
              <p className="font-semibold text-white">Kirim Kado</p>
            </div>
            <p className="text-[13px] leading-relaxed text-white/90">
              <MapPin className="mr-1 inline h-3.5 w-3.5" />
              {gift.address}
            </p>
            <button
              onClick={() => copy(gift.address, 'Alamat')}
              className="mt-3 inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-[11px] font-medium text-[var(--dr-accent)] transition hover:bg-[var(--dr-cream)] active:scale-95"
            >
              {copied === gift.address ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              Salin Alamat
            </button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
};

export default GiftSection;
