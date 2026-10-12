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
  ArrowRight
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

  const handleBankSelect = (bank: BankOption) => {
    setSelectedBank(bank.id);
    setCustomAccountNumber(bank.defaultNumber);
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
      className="py-24 bg-gradient-to-b from-[#fafbfc] via-slate-900 to-slate-950 text-white relative overflow-hidden border-t border-slate-200/60"
    >
      {/* Anchor for alt hash */}
      <div id="kartu-atm" className="absolute -top-24" />

      {/* Atmospheric lighting glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none -z-0" />
      <div className="absolute top-1/2 -right-32 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none -z-0" />
      <div className="absolute bottom-10 -left-32 w-[450px] h-[450px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none -z-0" />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-8 right-6 z-[100] bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <Check className="w-4 h-4 text-white" />
          </div>
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold tracking-wide uppercase shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>FITUR EKSKLUSIF • AMPLOP DIGITAL 3D</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Kartu ATM &amp; Rekening Digital <br className="hidden sm:inline" />
            <span className="font-display-luxury italic font-bold bg-gradient-to-r from-amber-300 via-yellow-200 to-emerald-300 bg-clip-text text-transparent">
              3D Tilt &amp; Parallax Interaktif
            </span>
          </h2>

          <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
            Hadirkan pengalaman mengirim kado pernikahan digital (cashless) yang elegan dan berkelas. Tamu undangan dapat melihat kartu dengan efek 3D realistis, membalik kartu, dan menyalin nomor rekening dengan 1 sentuhan.
          </p>
        </div>

        {/* Bank Selection Tabs (Pills) */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-amber-400" />
              Pilih Desain Bank:
            </span>
            <button
              onClick={openFullView}
              className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 hover:underline cursor-pointer"
            >
              <span>Lihat 20+ Bank di Galeri Penuh</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
            {banks.map((bank) => {
              const isSelected = selectedBank === bank.id;
              return (
                <button
                  key={bank.id}
                  onClick={() => handleBankSelect(bank)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 border ${
                    isSelected
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/25 scale-[1.03]'
                      : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700/80 border-slate-700/70'
                  }`}
                >
                  <span>{bank.name}</span>
                  {bank.badge && (
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-md font-semibold ${
                      isSelected ? 'bg-slate-950/20 text-slate-900' : 'bg-slate-700 text-slate-300'
                    }`}>
                      {bank.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Showcase Showcase (2-Column Grid: Left Card, Right Customizer & Features) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-slate-900/60 rounded-3xl border border-slate-800 p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          
          {/* Left Column: Interactive 3D ATM Card with Live Tilt */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center space-y-4">
            
            <div className="w-full flex items-center justify-between text-xs text-slate-400 px-2">
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                Gerakkan kursor / sentuh untuk efek 3D
              </span>
              <span className="text-slate-400 font-medium flex items-center gap-1">
                <RotateCw className="w-3 h-3 text-amber-400" />
                Klik kartu untuk membalik
              </span>
            </div>

            {/* Render Active Bank Card */}
            <div className="w-full py-2 flex justify-center">
              {renderActiveCard()}
            </div>

            <div className="w-full max-w-sm flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => handleCopy(customAccountNumber, banks.find(b => b.id === selectedBank)?.name || 'Bank')}
                className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md hover:border-amber-400/50"
              >
                <Copy className="w-3.5 h-3.5 text-amber-400" />
                <span>Salin No. Rekening</span>
              </button>

              <button
                onClick={openFullView}
                className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md shadow-amber-500/20"
              >
                <span>Semua Bank (20+)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

          {/* Right Column: Live Card Customizer & Feature Highlights */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Interactive Simulator Box */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-inner">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  Coba Ketik Data Anda (Simulasi Realtime)
                </span>
                <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
                  Live Preview
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Nama Pemilik Rekening / Mempelai:
                  </label>
                  <input
                    type="text"
                    value={customHolderName}
                    onChange={(e) => setCustomHolderName(e.target.value.toUpperCase())}
                    placeholder="Contoh: ANDI IRAWAN & ROSNA"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors uppercase font-mono tracking-wider"
                    maxLength={26}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Nomor Rekening:
                  </label>
                  <input
                    type="text"
                    value={customAccountNumber}
                    onChange={(e) => setCustomAccountNumber(e.target.value)}
                    placeholder="Contoh: 8730 4912 3000"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors font-mono tracking-wider"
                    maxLength={24}
                  />
                </div>

                {/* Quick Presets */}
                <div className="pt-1 flex items-center gap-2 flex-wrap text-[11px] text-slate-400">
                  <span>Contoh Nama:</span>
                  {[
                    'ANDI & ROSNA',
                    'VANI & RAHMAT',
                    'RADEN & SEKAR'
                  ].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setCustomHolderName(preset)}
                      className="px-2 py-0.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] transition-colors cursor-pointer"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 3 Value Proposition Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/60 space-y-1.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-1">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-white">3D Tilt &amp; Foil</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Efek kilau metalik dan pergerakan 3D mengikuti kursor layaknya kartu fisik asli.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/60 space-y-1.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-1">
                  <Copy className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-white">Salin 1-Klik</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Tamu cukup klik kartu untuk menyalin nomor rekening tanpa salah ketik transfer.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/60 space-y-1.5">
                <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-1">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-white">20+ Bank Resmi</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Dukungan lengkap: BCA, Mandiri, BNI, BSI, BTN, CIMB, Danamon, Neo, Maybank, dll.
                </p>
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={openFullView}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:brightness-105 active:scale-[0.98] text-slate-950 text-xs sm:text-sm font-black shadow-[0_10px_25px_-5px_rgba(245,158,11,0.3)] flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Buka Galeri Penuh 20+ Desain Kartu</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {onUseAtmCard && (
                <button
                  type="button"
                  onClick={onUseAtmCard}
                  className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-emerald-700/80 hover:bg-emerald-600/90 border border-emerald-500/50 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer text-center shadow-lg"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Gunakan Desain Kartu ATM</span>
                </button>
              )}

              <a
                href="#pilihan-template"
                className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer text-center"
              >
                <HeartHandshake className="w-4 h-4 text-rose-400" />
                <span>Pilih Template Undangan</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
