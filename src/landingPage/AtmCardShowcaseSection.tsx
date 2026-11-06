import React, { useState } from 'react';
import { 
  CreditCard, 
  Sparkles, 
  Copy, 
  Check, 
  ExternalLink, 
  RotateCw, 
  ShieldCheck, 
  Zap, 
  HeartHandshake,
  ArrowRight,
  ChevronDown
} from 'lucide-react';
import { CardBca } from '../tempalte/CardAtm/Bca';
import { CardMandiri } from '../tempalte/CardAtm/Mandiri';
import { CardBni } from '../tempalte/CardAtm/Bni';
import { CardBsi } from '../tempalte/CardAtm/bsi';
import { CardBtnGold } from '../tempalte/CardAtm/btn-gold';
import { CardCimbNiaga } from '../tempalte/CardAtm/cmniaga';
import { CardDanamon } from '../tempalte/CardAtm/danamon';
import { CardPermata } from '../tempalte/CardAtm/permata';
import { CardChartered } from '../tempalte/CardAtm/carthered';
import { CardMaybank } from '../tempalte/CardAtm/maybank';
import { CardBukopin } from '../tempalte/CardAtm/bukopin';

interface AtmCardShowcaseSectionProps {
  onOpenFullGallery?: () => void;
  onUseAtmCard?: () => void;
}

type BankKey = 
  | 'bca' 
  | 'mandiri' 
  | 'bni' 
  | 'bsi' 
  | 'btn' 
  | 'cimb' 
  | 'danamon' 
  | 'permata' 
  | 'chartered' 
  | 'maybank' 
  | 'bukopin';

interface BankOption {
  id: BankKey;
  name: string;
  badge: string;
  color: string;
  defaultNumber: string;
}

const banks: BankOption[] = [
  { id: 'bca', name: 'BCA', badge: 'Terpopuler', color: 'from-blue-600 to-blue-800', defaultNumber: '8730 4912 3000' },
  { id: 'mandiri', name: 'Mandiri', badge: 'Gold/Platinum', color: 'from-blue-900 via-sky-800 to-amber-600', defaultNumber: '1370 0192 8491 2' },
  { id: 'bni', name: 'BNI', badge: 'Batik Heritage', color: 'from-teal-800 to-emerald-900', defaultNumber: '0839 2019 4410' },
  { id: 'bsi', name: 'BSI Syariah', badge: 'Islami & Berkah', color: 'from-teal-700 via-emerald-800 to-amber-500', defaultNumber: '7192 8301 2940' },
  { id: 'btn', name: 'BTN Gold', badge: 'Luxury Edition', color: 'from-amber-600 to-yellow-800', defaultNumber: '0012 9018 4591 0' },
  { id: 'cimb', name: 'CIMB Niaga', badge: 'Octo Card', color: 'from-red-700 to-red-900', defaultNumber: '7051 8890 2314' },
  { id: 'permata', name: 'PermataBank', badge: 'Prestige', color: 'from-emerald-700 to-teal-900', defaultNumber: '4981 7200 9314' },
  { id: 'danamon', name: 'Danamon', badge: 'Modern', color: 'from-orange-600 to-amber-700', defaultNumber: '3620 9182 7401' },
  { id: 'chartered', name: 'Standard Chartered', badge: 'International', color: 'from-sky-700 to-blue-950', defaultNumber: '5399 2719 9999 9999' },
  { id: 'maybank', name: 'Maybank U', badge: 'Vertical 3D', color: 'from-yellow-600 to-amber-800', defaultNumber: '5241 8900 1234 5678' },
  { id: 'bukopin', name: 'Bukopin', badge: 'GPN Debit', color: 'from-green-700 to-emerald-900', defaultNumber: '6013 7890 4603 5589' },
];

export const AtmCardShowcaseSection: React.FC<AtmCardShowcaseSectionProps> = ({ 
  onOpenFullGallery,
  onUseAtmCard,
}) => {
  const [selectedBank, setSelectedBank] = useState<BankKey>('bca');
  const [customHolderName, setCustomHolderName] = useState('ANDI IRAWAN & ROSNA');
  const [customAccountNumber, setCustomAccountNumber] = useState('8730 4912 3000');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const popularBankIds: BankKey[] = ['bca', 'mandiri', 'bni', 'bsi'];
  const popularBanks = banks.filter((b) => popularBankIds.includes(b.id));
  const otherBanks = banks.filter((b) => !popularBankIds.includes(b.id));
  const isOtherSelected = otherBanks.some((b) => b.id === selectedBank);
  const selectedBankOption = banks.find((b) => b.id === selectedBank);

  const handleBankSelect = (bank: BankOption) => {
    setSelectedBank(bank.id);
    setCustomAccountNumber(bank.defaultNumber);
    setIsDropdownOpen(false);
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setToastMessage(`Nomor Rekening ${label} (${text}) berhasil disalin!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const openFullView = () => {
    if (onOpenFullGallery) {
      onOpenFullGallery();
    } else {
      window.location.hash = '#/card-atm';
    }
  };

  const renderActiveCard = () => {
    const props = {
      accountNumber: customAccountNumber || '8730 4912 3000',
      holderName: customHolderName || 'NAMA MEMPELAI',
      expiry: '12/28',
      cvv: '892',
      onCopy: handleCopy,
    };

    switch (selectedBank) {
      case 'bca':
        return <CardBca {...props} />;
      case 'mandiri':
        return <CardMandiri {...props} />;
      case 'bni':
        return <CardBni {...props} />;
      case 'bsi':
        return <CardBsi {...props} />;
      case 'btn':
        return <CardBtnGold {...props} />;
      case 'cimb':
        return <CardCimbNiaga {...props} />;
      case 'danamon':
        return <CardDanamon {...props} />;
      case 'permata':
        return <CardPermata {...props} />;
      case 'chartered':
        return <CardChartered {...props} refCode="5399" />;
      case 'maybank':
        return <CardMaybank {...props} />;
      case 'bukopin':
        return <CardBukopin {...props} refCode="6013" />;
      default:
        return <CardBca {...props} />;
    }
  };

  return (
    <section 
      id="amplop-digital" 
      className="py-20 sm:py-28 bg-[#faf8f5]/80 relative overflow-hidden border-t border-stone-200/70 section-performance"
    >
      {/* Anchor for alt hash */}
      <div id="kartu-atm" className="absolute -top-24" />

      {/* Atmospheric lighting glows - aligned with warm luxury theme */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-emerald-100/30 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute top-1/2 -right-24 w-[350px] h-[350px] bg-amber-100/40 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-10 -left-24 w-[350px] h-[350px] bg-emerald-100/20 rounded-full blur-3xl pointer-events-none -z-0" />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-8 right-6 z-[100] bg-[#154632] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300 border border-emerald-600/40">
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <Check className="w-4 h-4 text-emerald-200" />
          </div>
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-[#154632] text-xs font-bold tracking-wider uppercase shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#c29629]" />
            <span>Fitur Eksklusif • Amplop Digital 3D</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#14181f] tracking-tight leading-tight">
            Kartu ATM &amp; Rekening Digital <br className="hidden sm:inline" />
            <span className="font-serif-wedding italic font-normal text-[#c29629]">
              3D Tilt &amp; Parallax Interaktif
            </span>
          </h2>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Hadirkan pengalaman mengirim kado pernikahan digital (cashless) yang elegan dan berkelas. Tamu undangan dapat melihat kartu dengan efek 3D realistis, membalik kartu, dan menyalin nomor rekening dalam 1 sentuhan.
          </p>
        </div>

        {/* Bank Selection Bar - Sleek Segmented Control */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 px-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-[#c29629]" />
                Pilih Bank:
              </span>
              <span className="text-[11px] text-stone-400 font-normal hidden sm:inline">
                • Klik bank untuk ganti tampilan kartu 3D
              </span>
            </div>

            <button
              onClick={openFullView}
              className="text-xs text-[#154632] hover:text-[#113a29] font-bold flex items-center gap-1.5 hover:underline cursor-pointer transition-colors self-start sm:self-auto"
            >
              <span>Lihat 20+ Bank di Galeri Penuh</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#c29629]" />
            </button>
          </div>

          {/* Unified Segmented Control */}
          <div className="relative inline-flex p-1.5 bg-stone-100/90 border border-stone-200/80 rounded-2xl shadow-2xs items-center gap-1 max-w-full overflow-x-auto scrollbar-none">
            {/* 4 Popular Banks */}
            {popularBanks.map((bank) => {
              const isSelected = selectedBank === bank.id;
              return (
                <button
                  key={bank.id}
                  type="button"
                  onClick={() => handleBankSelect(bank)}
                  className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-150 cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? 'bg-[#154632] text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-white/80'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    isSelected ? 'bg-amber-300' : 'bg-stone-300'
                  }`} />
                  <span>{bank.name}</span>
                </button>
              );
            })}

            {/* Other Banks Dropdown Trigger */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-150 cursor-pointer flex items-center gap-1.5 ${
                  isOtherSelected
                    ? 'bg-[#154632] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-white/80'
                }`}
              >
                <span>
                  {isOtherSelected ? selectedBankOption?.name : `Bank Lainnya (${otherBanks.length}+)`}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsDropdownOpen(false)} 
                  />
                  <div className="absolute left-0 sm:right-0 sm:left-auto top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-stone-200/90 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-1.5 text-[10px] font-bold text-stone-400 uppercase tracking-wider border-b border-stone-100">
                      Pilihan Bank Lain
                    </div>
                    <div className="max-h-60 overflow-y-auto py-1">
                      {otherBanks.map((bank) => {
                        const isSelected = selectedBank === bank.id;
                        return (
                          <button
                            key={bank.id}
                            type="button"
                            onClick={() => handleBankSelect(bank)}
                            className={`w-full px-3.5 py-2 text-left text-xs font-medium flex items-center justify-between hover:bg-stone-50 transition-colors cursor-pointer ${
                              isSelected ? 'text-[#154632] font-bold bg-emerald-50/60' : 'text-stone-700'
                            }`}
                          >
                            <span>{bank.name}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-[#154632]" />}
                          </button>
                        );
                      })}
                    </div>
                    <div className="border-t border-stone-100 p-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          setIsDropdownOpen(false);
                          openFullView();
                        }}
                        className="w-full py-1.5 px-3 text-left text-[11px] font-bold text-[#154632] hover:bg-emerald-50/50 rounded-lg flex items-center justify-between"
                      >
                        <span>Lihat Semua di Galeri Penuh</span>
                        <ArrowRight className="w-3 h-3 text-[#c29629]" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Main Showcase (2-Column Grid: Left Card, Right Customizer & Features) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white/95 rounded-3xl border border-stone-200/90 p-6 sm:p-8 lg:p-10 shadow-[0_20px_50px_-15px_rgba(21,70,50,0.07)] backdrop-blur-sm">
          
          {/* Left Column: Interactive 3D ATM Card with Live Tilt */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center space-y-4">
            
            <div className="w-full flex items-center justify-between text-xs text-stone-500 px-2">
              <span className="flex items-center gap-1.5 text-[#154632] font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#c29629]" />
                Gerakkan kursor untuk efek 3D
              </span>
              <span className="text-stone-500 font-medium flex items-center gap-1">
                <RotateCw className="w-3.5 h-3.5 text-stone-400" />
                Klik kartu untuk membalik
              </span>
            </div>

            {/* Render Active Bank Card (includes its own copy & flip buttons) */}
            <div className="w-full py-2 flex justify-center">
              {renderActiveCard()}
            </div>

            {/* Clean sub-caption without redundant stacked buttons */}
            <div className="w-full max-w-sm flex items-center justify-center pt-1 text-center">
              <button
                onClick={openFullView}
                className="text-xs text-stone-500 hover:text-[#154632] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer py-1"
              >
                <span>Tersedia 20+ variasi kartu & e-wallet resmi di galeri</span>
                <ExternalLink className="w-3 h-3 text-[#c29629]" />
              </button>
            </div>

          </div>

          {/* Right Column: Live Card Customizer & Feature Highlights */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Interactive Simulator Box */}
            <div className="bg-[#faf8f5] border border-stone-200/90 rounded-2xl p-5 space-y-4 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#154632] flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#c29629]" />
                  Simulasi Data Realtime
                </span>
                <span className="text-[10px] text-stone-600 bg-stone-200/70 px-2.5 py-0.5 rounded-full font-medium">
                  Live Preview
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-stone-700 mb-1">
                    Nama Pemilik Rekening / Mempelai:
                  </label>
                  <input
                    type="text"
                    value={customHolderName}
                    onChange={(e) => setCustomHolderName(e.target.value.toUpperCase())}
                    placeholder="Contoh: ANDI IRAWAN & ROSNA"
                    className="w-full bg-white border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#154632] focus:ring-1 focus:ring-[#154632] transition-colors uppercase font-mono tracking-wider shadow-2xs"
                    maxLength={26}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-700 mb-1">
                    Nomor Rekening:
                  </label>
                  <input
                    type="text"
                    value={customAccountNumber}
                    onChange={(e) => setCustomAccountNumber(e.target.value)}
                    placeholder="Contoh: 8730 4912 3000"
                    className="w-full bg-white border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#154632] focus:ring-1 focus:ring-[#154632] transition-colors font-mono tracking-wider shadow-2xs"
                    maxLength={24}
                  />
                </div>

                {/* Quick Presets */}
                <div className="pt-0.5 flex items-center gap-2 flex-wrap text-[11px] text-stone-500">
                  <span className="font-medium">Contoh Nama:</span>
                  {[
                    'ANDI & ROSNA',
                    'VANI & RAHMAT',
                    'RADEN & SEKAR'
                  ].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setCustomHolderName(preset)}
                      className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-[10px] font-semibold transition-colors cursor-pointer border border-stone-200/60"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 3 Value Proposition Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3.5 rounded-2xl bg-stone-50/80 border border-stone-200/70 shadow-2xs space-y-1">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-[#c29629] flex items-center justify-center mb-1">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-stone-900">3D Tilt &amp; Foil</h4>
                <p className="text-[11px] text-stone-500 leading-relaxed">
                  Efek kilau metalik dan orientasi 3D interaktif mengikuti kursor.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-50/80 border border-stone-200/70 shadow-2xs space-y-1">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#154632] flex items-center justify-center mb-1">
                  <Copy className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-stone-900">Salin 1-Sentuh</h4>
                <p className="text-[11px] text-stone-500 leading-relaxed">
                  Tamu cukup klik kartu untuk menyalin nomor rekening secara otomatis.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-50/80 border border-stone-200/70 shadow-2xs space-y-1">
                <div className="w-8 h-8 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center mb-1">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-stone-900">20+ Bank &amp; E-Wallet</h4>
                <p className="text-[11px] text-stone-500 leading-relaxed">
                  Dukungan BCA, Mandiri, BNI, BSI, BTN, CIMB, QRIS, dll.
                </p>
              </div>
            </div>

            {/* Primary Action Buttons (Clear Visual Hierarchy) */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              {onUseAtmCard && (
                <button
                  type="button"
                  onClick={onUseAtmCard}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#154632] hover:bg-[#113a29] active:scale-[0.98] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_10px_25px_-5px_rgba(21,70,50,0.35)]"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Gunakan Desain Kartu ATM</span>
                </button>
              )}

              <button
                onClick={openFullView}
                className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-white hover:bg-stone-50 border-2 border-[#c29629]/70 active:scale-[0.98] text-stone-800 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
              >
                <span>Buka Galeri 20+ Desain</span>
                <ArrowRight className="w-4 h-4 text-[#c29629]" />
              </button>

              <a
                href="#pilihan-template"
                className="w-full sm:w-auto px-4 py-3 text-stone-600 hover:text-stone-900 text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors text-center hover:underline"
              >
                <HeartHandshake className="w-4 h-4 text-[#c29629]" />
                <span>Pilih Template</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
