import React, { useState } from 'react';
import { Gift, MapPin, Copy, Check, MessageCircle } from 'lucide-react';
import { AtmCard } from '../components/AtmCard';
import { useTemplateEmpatData } from '../context';

export const GiftSection: React.FC = () => {
  const { bankAccounts: BANK_ACCOUNTS, weddingInfo: WEDDING_INFO } = useTemplateEmpatData();
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(WEDDING_INFO.physicalGiftAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  return (
    <section id="gift-section" className="relative px-6 py-16 bg-[#fafbf7] text-[#2c3d2f] overflow-hidden">
      <div className="max-w-sm sm:max-w-md mx-auto space-y-8">
        {/* Section Header */}
        <div className="text-center space-y-1.5">
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#718569] bg-[#8f9e7b]/15 px-3 py-1 rounded-full border border-[#8f9e7b]/25">
            Wedding Gift
          </span>
          <h2 className="font-sage-serif text-2xl sm:text-3xl font-bold text-[#233325]">
            Tanda Kasih
          </h2>
          <div className="w-12 h-0.5 bg-[#c5a454] mx-auto rounded-full mt-2" />
        </div>

        {/* Note */}
        <p className="text-xs text-[#52664e] text-center leading-relaxed font-light px-2">
          Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika
          memberi adalah ungkapan tanda kasih Anda, Anda dapat memberi kado secara cashless
          atau melalui alamat di bawah ini. Kami akan dengan senang hati menerimanya.
        </p>

        {/* ATM Cards List (Bank Nagari & DANA) */}
        <div className="space-y-4">
          {BANK_ACCOUNTS.map((account) => (
            <AtmCard key={account.id} account={account} />
          ))}
        </div>

        {/* Physical Gift Box */}
        <div className="p-5 rounded-2xl bg-white border border-[#8f9e7b]/30 shadow-md space-y-3">
          <div className="flex items-center gap-2.5 text-[#2c3e2e] font-sage-serif font-bold text-sm">
            <Gift className="w-4 h-4 text-[#c5a454]" />
            <span>Kirim Kado Fisik</span>
          </div>

          <div className="flex items-start gap-2 text-xs text-[#52664e]">
            <MapPin className="w-4 h-4 text-[#8f9e7b] shrink-0 mt-0.5" />
            <p className="leading-relaxed font-light">
              {WEDDING_INFO.physicalGiftAddress}
            </p>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={handleCopyAddress}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                copiedAddress
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#5b6e55]/15 hover:bg-[#5b6e55]/25 text-[#30432f]'
              }`}
            >
              {copiedAddress ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Alamat Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Salin Alamat</span>
                </>
              )}
            </button>

            <a
              href={`https://api.whatsapp.com/send?phone=${WEDDING_INFO.whatsappRsvpNumber}&text=${encodeURIComponent(`Halo ${WEDDING_INFO.coupleDisplay}, saya ingin mengirimkan kado pernikahan`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Konfirmasi WA</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
