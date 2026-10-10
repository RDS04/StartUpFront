import React, { useState } from 'react';
import { Check, Copy, Gift, MapPin } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { NameBadge, ScriptTitle, Section } from '../components/Shared';
import { GIFT } from '../data';

// Import 3D ATM Card Components
import { CardBni } from '../../CardAtm/Bni';
import { CardBca } from '../../CardAtm/Bca';
import { CardMandiri } from '../../CardAtm/Mandiri';
import { CardBsi } from '../../CardAtm/bsi';
import { CardCimbNiaga } from '../../CardAtm/cmniaga';
import { CardDanamon } from '../../CardAtm/danamon';
import { CardPermata } from '../../CardAtm/permata';
import { CardMega } from '../../CardAtm/mega';
import { CardOcbc } from '../../CardAtm/ocbc';
import { CardSinarmas } from '../../CardAtm/sinarmas';
import { CardMaybank } from '../../CardAtm/maybank';
import { CardBtpn } from '../../CardAtm/bptn';
import { CardBukopin } from '../../CardAtm/bukopin';
import { CardChartered } from '../../CardAtm/carthered';
import { CardMuamalat } from '../../CardAtm/muamalat';
import { CardNagari } from '../../CardAtm/nagari';
import { CardNeo } from '../../CardAtm/neo';
import { CardBtn } from '../../CardAtm/btn';
import { CardBtnGold } from '../../CardAtm/btn-gold';
import { CardBtnPremium } from '../../CardAtm/btn-premium';
import { AtmCard } from '../../CardAtm/AtmCard';

const Smart3DBankCard: React.FC<{
  bank: string;
  number: string;
  holder: string;
  onCopy: (num: string, label: string) => void;
}> = ({ bank, number, holder, onCopy }) => {
  const normalizedBank = bank.toUpperCase().trim();

  if (normalizedBank.includes('BNI')) {
    return <CardBni accountNumber={number} holderName={holder} onCopy={onCopy} />;
  }
  if (normalizedBank.includes('BCA')) {
    return <CardBca accountNumber={number} holderName={holder} onCopy={onCopy} />;
  }
  if (normalizedBank.includes('MANDIRI')) {
    return <CardMandiri accountNumber={number} holderName={holder} onCopy={onCopy} />;
  }
  if (normalizedBank.includes('BSI') || normalizedBank.includes('SYARIAH INDONESIA')) {
    return <CardBsi accountNumber={number} holderName={holder} onCopy={onCopy} />;
  }
  if (normalizedBank.includes('CIMB') || normalizedBank.includes('NIAGA')) {
    return <CardCimbNiaga accountNumber={number} holderName={holder} onCopy={onCopy} />;
  }
  if (normalizedBank.includes('DANAMON')) {
    return <CardDanamon accountNumber={number} holderName={holder} onCopy={onCopy} />;
  }
  if (normalizedBank.includes('PERMATA')) {
    return <CardPermata accountNumber={number} holderName={holder} onCopy={onCopy} />;
  }
  if (normalizedBank.includes('MEGA')) {
    return <CardMega accountNumber={number} holderName={holder} onCopy={onCopy} />;
  }
  if (normalizedBank.includes('OCBC')) {
    return <CardOcbc accountNumber={number} holderName={holder} onCopy={onCopy} />;
  }
  if (normalizedBank.includes('SINARMAS')) {
    return <CardSinarmas accountNumber={number} holderName={holder} onCopy={onCopy} />;
  }
  if (normalizedBank.includes('MAYBANK')) {
    return <CardMaybank accountNumber={number} holderName={holder} onCopy={onCopy} />;
  }
  if (normalizedBank.includes('BTPN')) {
    return <CardBtpn accountNumber={number} holderName={holder} onCopy={onCopy} />;
  }
  if (normalizedBank.includes('BUKOPIN')) {
    return <CardBukopin accountNumber={number} holderName={holder} onCopy={onCopy} />;
  }
  if (normalizedBank.includes('STANDARD') || normalizedBank.includes('CHARTERED')) {
    return <CardChartered accountNumber={number} holderName={holder} onCopy={onCopy} />;
  }
  if (normalizedBank.includes('MUAMALAT')) {
    return <CardMuamalat accountNumber={number} holderName={holder} onCopy={onCopy} />;
  }
  if (normalizedBank.includes('NAGARI')) {
    return <CardNagari accountNumber={number} holderName={holder} onCopy={onCopy} />;
  }
  if (normalizedBank.includes('NEO') || normalizedBank.includes('KOINWORKS')) {
    return <CardNeo accountNumber={number} holderName={holder} onCopy={onCopy} />;
  }
  if (normalizedBank.includes('BTN PLATINUM')) {
    return <CardBtnPremium accountNumber={number} holderName={holder} onCopy={onCopy} />;
  }
  if (normalizedBank.includes('BTN GOLD')) {
    return <CardBtnGold accountNumber={number} holderName={holder} onCopy={onCopy} />;
  }
  if (normalizedBank.includes('BTN')) {
    return <CardBtn accountNumber={number} holderName={holder} onCopy={onCopy} />;
  }

  return <AtmCard bankName={bank} accountNumber={number} holderName={holder} onCopy={onCopy} />;
};

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

      <div className="mt-8 w-full max-w-[360px] space-y-6">
        {GIFT.accounts.map((a, i) => (
          <Reveal key={a.number} anim={i % 2 ? 'right' : 'left'} delay={200 + i * 120}>
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
