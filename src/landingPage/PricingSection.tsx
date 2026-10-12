import { useState, useEffect, useRef } from 'react';
import { Check, Sparkles, ShieldCheck, Zap, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

export interface PricingSectionProps {
  onSelectPlan?: (planId: 'silver' | 'gold' | 'platinum') => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const plans = [
    {
      id: 'silver' as const,
      name: 'Paket Silver',
      subtitle: 'Hemat untuk Acara Intim & Sederhana',
      popular: false,
      price: '49.000',
      originalPrice: '99.000',
      accentColor: 'border-slate-200 bg-white hover:border-slate-300',
      badge: 'Paling Hemat',
      badgeStyle: 'bg-slate-100 text-slate-700',
      features: [
        'Masa Aktif 6 Bulan',
        '1 Sesi Acara (Akad atau Resepsi)',
        'Maksimal 5 Foto Galeri',
        'Background Musik (Pilihan Tema)',
        'Navigasi Google Maps Presisi',
        'Amplop Digital (1 No. Rekening)',
        'RSVP & Buku Tamu Standar',
        'Sebar Tamu Tanpa Batas (Unlimited)',
      ],
      ctaText: 'Pilih Paket Silver',
      ctaStyle: 'bg-slate-900 hover:bg-slate-800 text-white',
      waMsg: 'Halo%20Admin%20i%20say%20yes,%20saya%20tertarik%20pesan%20Paket%20Silver%20(Rp%2049.000)',
    },
    {
      id: 'gold' as const,
      name: 'Paket Gold',
      subtitle: 'Fitur Lengkap Pilihan Favorit 90% Calon Pengantin',
      popular: true,
      price: '89.000',
      originalPrice: '179.000',
      accentColor: 'border-emerald-500/80 bg-gradient-to-b from-white to-emerald-50/30 shadow-[0_20px_50px_rgba(22,91,57,0.15)] ring-2 ring-emerald-600',
      badge: 'BEST SELLER 🔥',
      badgeStyle: 'bg-[#165b39] text-white shadow-sm',
      features: [
        'Masa Aktif SELAMANYA (Lifetime)',
        'Multi Acara (Akad, Resepsi, & Syukuran)',
        'Galeri 15 Foto HD + 1 Video YouTube',
        'Custom Musik Sendiri (Upload MP3 Bebas)',
        'Amplop Digital Multi Rekening & QRIS',
        'RSVP Realtime + Notifikasi WhatsApp',
        'Countdown Timer & Add to Google Calendar',
        'Generator Nama Tamu Otomatis Tanpa Batas',
        'Kolom Doa & Ucapan Tamu Interaktif',
        'Bebas Revisi Data Kapan Saja',
      ],
      ctaText: 'Pilih Paket Gold (Rekomendasi)',
      ctaStyle: 'bg-gradient-to-r from-[#175b39] via-[#1f6e47] to-[#b38b38] hover:brightness-105 text-white shadow-md',
      waMsg: 'Halo%20Admin%20i%20say%20yes,%20saya%20mau%20pesan%20Paket%20Gold%20Best%20Seller%20(Rp%2089.000)',
    },
    {
      id: 'platinum' as const,
      name: 'Paket Platinum VIP',
      subtitle: 'Eksklusif Domain Custom & Layanan Siap Terima Beres',
      popular: false,
      price: '149.000',
      originalPrice: '299.000',
      accentColor: 'border-amber-300 bg-white hover:border-amber-400 shadow-lg shadow-amber-950/5',
      badge: 'Full VIP & Domain',
      badgeStyle: 'bg-amber-100 text-amber-900 border border-amber-300',
      features: [
        'Semua Fitur di Paket Gold',
        'Custom Domain Pribadi (namakamu.com)',
        'Input Data Dibantu Tim Desainer (Terima Beres)',
        'Fitur Cerita Cinta (Love Story Timeline)',
        'Integrasi Live Streaming YouTube / Zoom',
        'QR Code Presensi Meja Resepsi (Buku Tamu QR)',
        'Filter Instagram Wedding Custom (Opsional)',
        'Prioritas Bantuan Teknis 24 Jam Nonstop',
      ],
      ctaText: 'Pilih Paket Platinum',
      ctaStyle: 'bg-[#113a25] hover:bg-[#0c2a1a] text-white',
      waMsg: 'Halo%20Admin%20i%20say%20yes,%20saya%20tertarik%20pesan%20Paket%20Platinum%20VIP%20(Rp%20149.000)',
    },
  ];

  // Mobile slider state (starts with index 1: Paket Gold Best Seller!)
  const [activeIndex, setActiveIndex] = useState(1);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Auto-play slider for mobile view (continuous every 3.2s)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % plans.length);
    }, 3200);

    return () => clearInterval(timer);
  }, [activeIndex, plans.length]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % plans.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + plans.length) % plans.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const distance = touchStartX.current - touchEndX.current;
      if (distance > 40) {
        handleNext();
      } else if (distance < -40) {
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section id="harga" className="py-24 bg-white relative overflow-hidden border-t border-slate-200/60">
      
      {/* Background Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-50/60 rounded-full blur-[140px] pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold tracking-wide uppercase shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Biaya Transparan &amp; Terjangkau</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Pilihan Paket Undangan Digital <br className="hidden sm:inline" />
            <span className="font-display-luxury italic font-bold text-[#165b39]">
              Hemat Sekali Bayar
            </span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Tanpa biaya tersembunyi, tanpa langganan bulanan. Bayar sekali, bagikan undangan ke ribuan kerabat tanpa batas kuota!
          </p>
        </div>

        {/* Mobile View: Auto-sliding Carousel (Center Card Normal, Left & Right Tapered & Blurred) */}
        <div 
          className="block lg:hidden relative"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Slider Viewport with peek sides */}
          <div className="relative w-full overflow-hidden py-6">
            <div 
              className="flex transition-transform duration-600 ease-out will-change-transform"
              style={{ transform: `translateX(calc(6.5% - ${activeIndex * 89}%))` }}
            >
              {plans.map((plan, index) => {
                const isCenter = index === activeIndex;
                return (
                  <div
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className="w-[87%] shrink-0 px-1.5 transition-all duration-600 cursor-pointer"
                  >
                    <div
                      className={`relative rounded-[2rem] p-7 sm:p-8 flex flex-col justify-between transition-all duration-600 ${plan.accentColor} ${
                        isCenter
                          ? 'scale-100 opacity-100 blur-none shadow-2xl z-20'
                          : 'scale-[0.91] opacity-50 blur-[1.5px] shadow-xs z-10'
                      }`}
                    >
                      {/* Popular / Best Seller Flag */}
                      {plan.badge && (
                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30">
                          <span className={`text-[11px] font-black tracking-wider uppercase px-4 py-1.5 rounded-full whitespace-nowrap shadow-xs ${plan.badgeStyle}`}>
                            {plan.badge}
                          </span>
                        </div>
                      )}

                      <div>
                        {/* Plan Header */}
                        <div className="border-b border-slate-100 pb-5 mb-5">
                          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
                            {plan.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-500 min-h-[30px] leading-relaxed">
                            {plan.subtitle}
                          </p>

                          <div className="mt-4 flex items-baseline gap-2">
                            <span className="text-xs sm:text-sm font-semibold text-slate-400 line-through">
                              Rp {plan.originalPrice}
                            </span>
                            <div className="flex items-baseline gap-1">
                              <span className="text-sm font-bold text-slate-800">Rp</span>
                              <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                                {plan.price}
                              </span>
                            </div>
                          </div>
                          <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md inline-block mt-2.5">
                            ✓ Bayar 1x untuk seumur hidup acara
                          </span>
                        </div>

                        {/* Features List */}
                        <div className="space-y-3.5 mb-7">
                          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            Fitur yang didapatkan:
                          </p>
                          {plan.features.map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                              <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                                <Check className="w-2.5 h-2.5 stroke-[3]" />
                              </div>
                              <span className="font-normal leading-snug">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Order Button */}
                      <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            if (onSelectPlan) {
                              onSelectPlan(plan.id);
                            } else {
                              window.location.hash = `#/pilih-template`;
                            }
                          }}
                          className={`w-full py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 cursor-pointer shadow-md ${plan.ctaStyle}`}
                        >
                          <span>{plan.ctaText}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Controls: Dots & Navigation Arrows */}
          <div className="flex items-center justify-between px-3 pt-2">
            <button
              onClick={handlePrev}
              aria-label="Previous Package"
              className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-emerald-700 shadow-2xs flex items-center justify-center active:scale-95 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center gap-1.5">
              {plans.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setActiveIndex(dotIdx)}
                  aria-label={`Go to package ${dotIdx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    dotIdx === activeIndex
                      ? 'w-6 bg-[#165b39]'
                      : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              aria-label="Next Package"
              className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-emerald-700 shadow-2xs flex items-center justify-center active:scale-95 transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Desktop View (hidden lg:grid): 3-Column Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8 items-stretch pt-4">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-3xl p-8 sm:p-9 flex flex-col justify-between transition-all duration-300 ${plan.accentColor} ${
                plan.popular ? 'lg:-translate-y-3' : 'hover:-translate-y-1'
              }`}
            >
              {/* Popular / Best Seller Flag */}
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className={`text-[11px] font-black tracking-wider uppercase px-4 py-1 rounded-full ${plan.badgeStyle}`}>
                    {plan.badge}
                  </span>
                </div>
              )}

              <div>
                {/* Plan Header */}
                <div className="border-b border-slate-100 pb-6 mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1.5">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-slate-500 min-h-[32px] leading-relaxed">
                    {plan.subtitle}
                  </p>

                  <div className="mt-5 flex items-baseline gap-2">
                    <span className="text-xs font-semibold text-slate-400 line-through">
                      Rp {plan.originalPrice}
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xs sm:text-sm font-bold text-slate-800">Rp</span>
                      <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                        {plan.price}
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mt-2">
                    ✓ Bayar 1x untuk seumur hidup acara
                  </span>
                </div>

                {/* Features List */}
                <div className="space-y-3.5 mb-8">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Fitur yang didapatkan:
                  </p>
                  {plan.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="font-normal">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Button */}
              <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (onSelectPlan) {
                      onSelectPlan(plan.id);
                    } else {
                      window.location.hash = `#/pilih-template`;
                    }
                  }}
                  className={`w-full py-3.5 rounded-full text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 cursor-pointer shadow-md ${plan.ctaStyle}`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Payment Channels Strip via Midtrans */}
        <div className="mt-10 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <div className="text-xs text-slate-700">
              <span className="font-bold text-slate-900">Pembayaran Praktis via Midtrans:</span>{' '}
              Verifikasi otomatis 24 jam nonstop tanpa perlu kirim bukti transfer.
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold text-slate-600 justify-center">
            <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">QRIS</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">BCA VA</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">Mandiri VA</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">BRI VA</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">BNI VA</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">GoPay</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">ShopeePay</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">Visa / Mastercard</span>
          </div>
        </div>

        {/* Trust & Guarantee Banner */}
        <div className="mt-6 p-6 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-center justify-center gap-6 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">Garansi 100% Kepuasan &amp; Bebas Revisi</p>
              <p className="text-xs text-slate-500">Jika ada salah ketik nama, tanggal, atau foto kurang pas, tim kami bantu revisi gratis sampai siap sebar.</p>
            </div>
          </div>
          <div className="h-8 w-[1px] bg-slate-200 hidden sm:block" />
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Aktif Instan dalam 10 Menit</span>
          </div>
        </div>

      </div>
    </section>
  );
};
