import React, { useState } from 'react';
import { X, Check, CreditCard, Wallet } from 'lucide-react';
import { BANK_CARD_CATALOG, type BankCardOption } from '../../tempalte/CardAtm/bankCardCatalog';
import { InteractiveAtmCard3D } from '../../tempalte/CardAtm/InteractiveAtmCard3D';

interface Card3DSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCard: (card: BankCardOption) => void;
  currentTheme?: string;
  sampleNumber?: string;
  sampleHolder?: string;
}

export const Card3DSelectorModal: React.FC<Card3DSelectorModalProps> = ({
  isOpen,
  onClose,
  onSelectCard,
  currentTheme,
  sampleNumber = '10050213051101',
  sampleHolder = 'SILVANA REZA ANGGRAINI',
}) => {
  const [filterType, setFilterType] = useState<'all' | 'bank' | 'wallet'>('all');

  if (!isOpen) return null;

  const filteredCards = BANK_CARD_CATALOG.filter((c) => {
    if (filterType === 'all') return true;
    return c.type === filterType;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-stone-200 z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-[#2D6A4F] flex items-center justify-center shadow-xs">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-base font-serif flex items-center gap-2">
                Pilih Desain Kartu ATM &amp; E-Wallet 3D
                <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 uppercase">
                  3D Interactive
                </span>
              </h3>
              <p className="text-xs text-stone-500">
                Pilih tema kartu ATM untuk tanda kasih amplop digital undangan Anda.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-800 flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="px-6 py-3 border-b border-stone-100 flex items-center gap-2 bg-white">
          <button
            type="button"
            onClick={() => setFilterType('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
              filterType === 'all'
                ? 'bg-[#2D6A4F] text-white shadow-xs'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            Semua Kartu ({BANK_CARD_CATALOG.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterType('bank')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
              filterType === 'bank'
                ? 'bg-[#2D6A4F] text-white shadow-xs'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" /> Debit / Bank Transfer
          </button>
          <button
            type="button"
            onClick={() => setFilterType('wallet')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
              filterType === 'wallet'
                ? 'bg-[#2D6A4F] text-white shadow-xs'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            <Wallet className="w-3.5 h-3.5" /> E-Wallet
          </button>
        </div>

        {/* Cards Grid */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-2 gap-5 bg-stone-50/50">
          {filteredCards.map((card) => {
            const isSelected =
              currentTheme?.toLowerCase() === card.cardTheme.toLowerCase() ||
              currentTheme?.toLowerCase() === card.id.toLowerCase();

            return (
              <div
                key={card.id}
                onClick={() => {
                  onSelectCard(card);
                  onClose();
                }}
                className={`relative rounded-3xl p-4 transition-all duration-200 cursor-pointer border flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-emerald-50/60 border-[#2D6A4F] ring-2 ring-[#2D6A4F]/20 shadow-md'
                    : 'bg-white border-stone-200 hover:border-stone-400 hover:shadow-lg'
                }`}
              >
                {/* Selection Badge */}
                {isSelected && (
                  <div className="absolute top-3 right-3 z-20 flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-bold shadow-md">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Aktif Dipilih</span>
                  </div>
                )}

                {/* 3D Card Interactive Preview */}
                <div className="w-full pointer-events-auto mb-3">
                  <InteractiveAtmCard3D
                    bankName={card.bankName}
                    accountNumber={sampleNumber}
                    holderName={sampleHolder}
                    cardTheme={card.cardTheme}
                    type={card.type}
                    logoUrl={card.logoUrl}
                    compact={true}
                    interactive={false}
                    showFlipButton={false}
                  />
                </div>

                {/* Card Info & Select Button */}
                <div className="flex items-center justify-between pt-2 border-t border-stone-100 mt-1">
                  <div>
                    <h4 className="font-bold text-xs text-stone-800 flex items-center gap-1.5">
                      {card.bankName}
                    </h4>
                    <span className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold">
                      {card.type === 'wallet' ? 'Dompet Digital' : 'Rekening Bank'}
                    </span>
                  </div>

                  <button
                    type="button"
                    className={`px-4 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-600 text-white'
                        : 'bg-stone-100 group-hover:bg-[#2D6A4F] group-hover:text-white text-stone-700'
                    }`}
                  >
                    {isSelected ? 'Terpilih' : 'Pilih Desain'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-white border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
          <span>* Desain kartu ATM 3D ini akan otomatis tampil pada halaman Tanda Kasih undangan.</span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
