import React, { useState } from 'react';
import { Copy, Check, CreditCard, Sparkles } from 'lucide-react';
import type { BankAccount } from '../types';
import { ASSETS } from '../data';

interface AtmCardProps {
  account: BankAccount;
}

export const AtmCard: React.FC<AtmCardProps> = ({ account }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(account.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const isBankNagari = account.id === 'bank-nagari';

  return (
    <div className="relative w-full overflow-hidden rounded-2xl p-5 shadow-xl border transition-all duration-300 hover:scale-[1.01] bg-gradient-to-br from-[#2f4033] via-[#3d5341] to-[#1f2b21] border-[#8f9e7b]/30 text-white shadow-[#1f2b21]/30">
      {/* Decorative Subtle Watermark Background */}
      <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-white/5 blur-2xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#c5a454]/20 via-transparent to-transparent pointer-events-none" />

      {/* Top Header: Logo & Type */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-2">
          {account.logoUrl ? (
            <img
              src={account.logoUrl}
              alt={account.bankName}
              className={`h-7 w-auto object-contain ${isBankNagari ? 'brightness-125' : ''}`}
            />
          ) : (
            <div className="flex items-center gap-1.5 font-bold tracking-wider text-sm text-[#f4f7f0]">
              <CreditCard className="w-4 h-4 text-[#c5a454]" />
              <span>{account.bankName}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/25 text-[#e5edd8] border border-white/10 text-[10px] font-semibold tracking-wider uppercase">
          <Sparkles className="w-2.5 h-2.5 text-[#c5a454]" />
          <span>{account.type === 'bank' ? 'Debit Card' : 'E-Wallet'}</span>
        </div>
      </div>

      {/* Chip EMV & Contactless Indicator */}
      <div className="flex items-center gap-3 mb-5 relative z-10">
        <div className="w-10 h-7 rounded-md bg-gradient-to-tr from-[#d4af37] via-[#f7e7a9] to-[#b38b25] p-1 shadow-inner border border-[#fff4cc]/40 flex items-center justify-center">
          <img
            src={ASSETS.chipAtm}
            alt="Chip ATM"
            className="w-full h-full object-contain mix-blend-multiply opacity-80"
            onError={(e) => {
              // Fallback chip lines jika gambar gagal load
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        </div>
        <div className="flex flex-col gap-0.5 opacity-60">
          <span className="w-3 h-0.5 bg-white/60 rounded-full" />
          <span className="w-2 h-0.5 bg-white/60 rounded-full" />
          <span className="w-1 h-0.5 bg-white/60 rounded-full" />
        </div>
      </div>

      {/* Account Number */}
      <div className="mb-4 relative z-10">
        <div className="text-[10px] uppercase tracking-widest text-[#a8b89d] font-medium mb-1">
          Nomor Rekening / Akun
        </div>
        <div className="font-mono text-lg sm:text-xl font-bold tracking-widest text-[#f5f8f1] drop-shadow-sm select-all">
          {account.accountNumber}
        </div>
      </div>

      {/* Bottom Row: Account Holder Name & Copy Button */}
      <div className="flex items-end justify-between pt-2 border-t border-white/10 relative z-10">
        <div>
          <div className="text-[9px] uppercase tracking-wider text-[#a8b89d]">
            Atas Nama (A.N)
          </div>
          <div className="font-sage-serif font-bold text-xs sm:text-sm text-white tracking-wide">
            {account.accountHolder}
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer shadow-md ${
            copied
              ? 'bg-emerald-600 text-white border border-emerald-400'
              : 'bg-[#c5a454] hover:bg-[#d6b565] text-[#1e2a1f] border border-[#f0de9e]/60 hover:scale-105'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Tersalin!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Salin Nomor</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
