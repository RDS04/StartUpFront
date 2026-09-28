import { useState, useMemo, type FormEvent } from 'react';
import { Calculator, ShieldCheck, Clock, Zap, Send, Sparkles } from 'lucide-react';

interface OrderCalculatorProps {
  selectedGame: string;
  onGameChange: (game: string) => void;
}

export const OrderCalculator = ({
  selectedGame,
  onGameChange,
}: OrderCalculatorProps) => {
  const [serviceType, setServiceType] = useState<'tier' | 'star'>('tier');
  const [currentRank, setCurrentRank] = useState('Epic');
  const [targetRank, setTargetRank] = useState('Mythic');
  const [starCount, setStarCount] = useState<number>(5);
  
  // Add-ons
  const [expressDelivery, setExpressDelivery] = useState(false);
  const [requestHero, setRequestHero] = useState(false);
  const [liveStream, setLiveStream] = useState(false);

  // Contact info
  const [whatsapp, setWhatsapp] = useState('');
  const [inGameId, setInGameId] = useState('');

  const rankTiers = ['Grandmaster', 'Epic', 'Legend', 'Mythic', 'Mythical Glory', 'Mythical Immortal'];

  const rankBasePrices: Record<string, number> = {
    'Grandmaster': 15000,
    'Epic': 30000,
    'Legend': 55000,
    'Mythic': 120000,
    'Mythical Glory': 250000,
    'Mythical Immortal': 500000,
  };

  const calculatedPrice = useMemo(() => {
    let base = 0;
    if (serviceType === 'star') {
      base = starCount * 6000;
    } else {
      const currentIndex = rankTiers.indexOf(currentRank);
      const targetIndex = rankTiers.indexOf(targetRank);
      
      if (targetIndex <= currentIndex) {
        return 0;
      }
      
      for (let i = currentIndex + 1; i <= targetIndex; i++) {
        base += rankBasePrices[rankTiers[i]] || 40000;
      }
    }

    if (expressDelivery) base *= 1.25;
    if (requestHero) base *= 1.15;
    if (liveStream) base *= 1.10;

    return Math.round(base);
  }, [serviceType, currentRank, targetRank, starCount, expressDelivery, requestHero, liveStream]);

  const estimatedTime = useMemo(() => {
    if (serviceType === 'star') {
      return `${Math.max(2, Math.round(starCount * 0.8))} - ${Math.round(starCount * 1.5)} Jam`;
    }
    const currentIndex = rankTiers.indexOf(currentRank);
    const targetIndex = rankTiers.indexOf(targetRank);
    const diff = targetIndex - currentIndex;
    if (diff <= 0) return '-';
    if (expressDelivery) return `${Math.max(1, diff * 12)} Jam (Express)`;
    return `${diff} - ${diff * 2} Hari`;
  }, [serviceType, currentRank, targetRank, starCount, expressDelivery]);

  const handleOrderSubmit = (e: FormEvent) => {
    e.preventDefault();
    const message = `Halo JokiPro, saya ingin memesan joki:%0A` +
      `- Game: ${selectedGame}%0A` +
      `- Tipe: ${serviceType === 'tier' ? `Rank ${currentRank} ke ${targetRank}` : `${starCount} Bintang`}%0A` +
      `- Fitur Tambahan: ${expressDelivery ? 'Express, ' : ''}${requestHero ? 'Request Hero, ' : ''}${liveStream ? 'Live Stream' : 'Standar'}%0A` +
      `- Estimasi Harga: Rp ${calculatedPrice.toLocaleString('id-ID')}%0A` +
      `- ID Akun / Game: ${inGameId || '-'}`;
    
    window.open(`https://wa.me/6281234567890?text=${message}`, '_blank');
  };

  return (
    <section id="calculator" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold">
            <Calculator className="w-3.5 h-3.5 text-cyan-400" />
            Kalkulator & Form Pemesanan
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Hitung Estimasi Harga & Durasi Joki
          </h2>
          <p className="text-slate-400 text-sm">
            Harga transparan tanpa biaya tersembunyi. Sesuaikan paket dengan kebutuhan rank Anda.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl shadow-indigo-950/40 p-6 sm:p-10 backdrop-blur-xl">
          <form onSubmit={handleOrderSubmit} className="space-y-8">
            
            {/* 1. Pilih Game & Tipe Layanan */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  1. Pilih Game
                </label>
                <select
                  value={selectedGame}
                  onChange={(e) => onGameChange(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                >
                  <option value="Mobile Legends: Bang Bang">Mobile Legends: Bang Bang</option>
                  <option value="Valorant">Valorant</option>
                  <option value="Honor of Kings">Honor of Kings</option>
                  <option value="Free Fire">Free Fire</option>
                  <option value="PUBG Mobile">PUBG Mobile</option>
                  <option value="Genshin Impact">Genshin Impact</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  2. Model Hitungan
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setServiceType('tier')}
                    className={`py-3 px-4 rounded-xl text-xs font-semibold border transition-all ${
                      serviceType === 'tier'
                        ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    Paket Rank (Tier)
                  </button>
                  <button
                    type="button"
                    onClick={() => setServiceType('star')}
                    className={`py-3 px-4 rounded-xl text-xs font-semibold border transition-all ${
                      serviceType === 'star'
                        ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    Per Bintang / Poin
                  </button>
                </div>
              </div>
            </div>

            {/* 2. Rank selection or Star count */}
            {serviceType === 'tier' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950/60 p-5 rounded-2xl border border-slate-800/80">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-2">
                    Rank Saat Ini
                  </label>
                  <select
                    value={currentRank}
                    onChange={(e) => setCurrentRank(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                  >
                    {rankTiers.map((tier) => (
                      <option key={tier} value={tier}>{tier}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-2">
                    Target Rank
                  </label>
                  <select
                    value={targetRank}
                    onChange={(e) => setTargetRank(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                  >
                    {rankTiers.map((tier) => (
                      <option key={tier} value={tier}>{tier}</option>
                    ))}
                  </select>
                </div>
              </div>
            ) : (
              <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800/80">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-xs font-medium text-slate-400">
                    Jumlah Bintang yang Diinginkan
                  </label>
                  <span className="font-bold text-indigo-400 text-lg">{starCount} Bintang</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={starCount}
                  onChange={(e) => setStarCount(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                  <span>1 Bintang</span>
                  <span>15 Bintang</span>
                  <span>30 Bintang</span>
                </div>
              </div>
            )}

            {/* 3. Add-on Options */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
                3. Fitur Tambahan (Opsional)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  expressDelivery 
                    ? 'bg-indigo-950/40 border-indigo-500 text-white' 
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}>
                  <input
                    type="checkbox"
                    checked={expressDelivery}
                    onChange={(e) => setExpressDelivery(e.target.checked)}
                    className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <div>
                    <div className="text-xs font-semibold text-white flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      Prioritas Express
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">Selesai 2x lebih cepat (+25%)</p>
                  </div>
                </label>

                <label className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  requestHero 
                    ? 'bg-indigo-950/40 border-indigo-500 text-white' 
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}>
                  <input
                    type="checkbox"
                    checked={requestHero}
                    onChange={(e) => setRequestHero(e.target.checked)}
                    className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <div>
                    <div className="text-xs font-semibold text-white flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      Request Hero / Agen
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">Pilih hero favorit (+15%)</p>
                  </div>
                </label>

                <label className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  liveStream 
                    ? 'bg-indigo-950/40 border-indigo-500 text-white' 
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}>
                  <input
                    type="checkbox"
                    checked={liveStream}
                    onChange={(e) => setLiveStream(e.target.checked)}
                    className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <div>
                    <div className="text-xs font-semibold text-white flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      Live Stream Privat
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">Pantau match live (+10%)</p>
                  </div>
                </label>
              </div>
            </div>

            {/* 4. Data Akun & Kontak */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  ID Game / Nickname
                </label>
                <input
                  type="text"
                  placeholder="Contoh: 12345678 (1234) / ProGamer"
                  value={inGameId}
                  onChange={(e) => setInGameId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  Nomor WhatsApp Anda
                </label>
                <input
                  type="tel"
                  placeholder="Contoh: 08123456789"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none"
                />
              </div>
            </div>

            {/* 5. Summary & Price Breakdown Box */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/60 to-slate-950 border border-indigo-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center md:text-left">
                <span className="text-xs text-indigo-300 font-semibold uppercase tracking-wider">
                  Total Estimasi Pembayaran
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-white">
                    Rp {calculatedPrice.toLocaleString('id-ID')}
                  </span>
                  {calculatedPrice === 0 && (
                    <span className="text-xs text-rose-400 font-medium">
                      (Target rank harus lebih tinggi)
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400 justify-center md:justify-start">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Estimasi Pengerjaan: <strong className="text-slate-200">{estimatedTime}</strong></span>
                </div>
              </div>

              <button
                type="submit"
                disabled={calculatedPrice <= 0}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all duration-200 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Pesanan ke WhatsApp</span>
              </button>
            </div>

          </form>
        </div>

      </div>
    </section>
  );
};
