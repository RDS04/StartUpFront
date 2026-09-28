import { 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  Lock, 
  ArrowRight,
  Smartphone,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const PaymentInfoSection = () => {
  const highlights = [
    {
      icon: Zap,
      title: 'Verifikasi Otomatis Realtime',
      desc: 'Tak perlu kirim bukti transfer. Sistem webhook Midtrans mendeteksi pembayaran dalam hitungan detik.',
    },
    {
      icon: Lock,
      title: 'Lisensi Resmi Bank Indonesia',
      desc: 'Standar perbankan PCI-DSS Level 1 dan enkripsi 256-bit SSL menjamin kerahasiaan data transaksi Anda.',
    },
    {
      icon: Smartphone,
      title: 'Semua E-Wallet & Bank Siap Pakai',
      desc: 'Mulai dari scan QRIS sambil bersantai hingga transfer Virtual Account, semuanya tersedia dalam 1 popup praktis.',
    },
    {
      icon: CheckCircle2,
      title: 'Undangan Langsung Aktif Detik Itu Juga',
      desc: 'Akses link undangan pernikahan dan fitur dashboard langsung terbuka secara instan tanpa menunggu jam kerja admin.',
    },
  ];

  return (
    <section id="pembayaran" className="py-24 bg-gradient-to-b from-white via-slate-50/70 to-emerald-50/20 relative overflow-hidden border-t border-slate-200/70">
      
      {/* Background Soft Lighting Glows */}
      <div className="absolute top-1/4 -right-24 w-[500px] h-[500px] bg-emerald-100/50 rounded-full blur-[140px] pointer-events-none -z-0" />
      <div className="absolute bottom-1/4 -left-24 w-[500px] h-[500px] bg-amber-100/40 rounded-full blur-[140px] pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header Badge */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-300/80 text-emerald-900 text-xs font-bold tracking-wide uppercase shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>MIDTRANS PAYMENT GATEWAY RESMI</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Pembayaran Super Praktis &amp; Otomatis <br className="hidden sm:inline" />
            <span className="font-display-luxury italic font-bold text-[#165b39]">
              Sekali Scan, Undangan Langsung Aktif
            </span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Demi kenyamanan Anda, <strong>"i say yes"</strong> bekerjasama langsung dengan <strong>Midtrans (GoTo Financial)</strong>. Bayar dengan metode favorit Anda tanpa repot konfirmasi manual atau kirim bukti screenshot transfer!
          </p>
        </div>

        {/* Mobile View (lg:hidden): Midtrans Image in Center with Explanations Surrounding It */}
        <div className="block lg:hidden space-y-6">
          
          {/* Mobile Title & Intro */}
          <div className="text-center space-y-2 mb-2">
            <span className="text-xs font-black uppercase tracking-wider text-[#165b39]">
              PENGALAMAN CHECKOUT MODERN
            </span>
            <h3 className="text-2xl font-extrabold text-slate-900 leading-snug">
              Transaksi Cepat, Aman, dan Nyaman di Smartphone Anda
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed px-1">
              Tidak ada lagi drama transfer salah nominal. Teknologi Midtrans otomatis memproses pesanan Anda 24 jam nonstop.
            </p>
          </div>

          {/* Top Explanations (Surrounding Above) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {highlights.slice(0, 2).map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-start gap-3.5 hover:border-emerald-300 transition-all"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#165b39] flex items-center justify-center shrink-0 shadow-2xs">
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 mb-0.5">{item.title}</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Centerpiece: Midtrans 3D Mockup */}
          <div className="py-2">
            <div className="relative flex justify-center w-full">
              {/* Outer Glow Halo */}
              <div className="absolute -inset-3 bg-gradient-to-tr from-emerald-500/30 via-teal-400/25 to-amber-300/30 rounded-[2.5rem] blur-2xl -z-10" />

              {/* Showcase Image Frame */}
              <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden border-2 border-emerald-500/40 bg-slate-950/90 shadow-[0_20px_50px_-10px_rgba(20,77,49,0.35)] group">
                <img
                  src="/midtrans_payment_mockup_square.jpg"
                  alt="Midtrans QRIS & Digital Payment Checkout Showcase"
                  className="w-full h-full object-cover group-hover:scale-[1.025] transition-transform duration-500"
                />

                {/* Floating Glass Badge 1: Top Right */}
                <div className="absolute top-3.5 right-3.5 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-emerald-200 shadow-xl text-[10px] font-bold text-emerald-900 animate-float-slow">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>Verifikasi 100% Otomatis</span>
                </div>

                {/* Floating Glass Badge 2: Bottom Left */}
                <div className="absolute bottom-3.5 left-3.5 z-20 flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700 text-white shadow-2xl">
                  <div className="w-6 h-6 rounded-lg bg-emerald-600 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div>
                    <p className="text-[9px] text-slate-400 font-medium">Payment Gateway Resmi</p>
                    <p className="text-[11px] font-bold tracking-tight text-white">Midtrans • GoTo Financial</p>
                  </div>
                </div>

                {/* Floating Glass Badge 3: Bottom Right */}
                <div className="absolute bottom-3.5 right-3.5 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-400/95 text-slate-900 text-[10px] font-black tracking-wide uppercase shadow-xl animate-float-reverse">
                  <Sparkles className="w-3.5 h-3.5 text-slate-900" />
                  <span>QRIS Instan</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Explanations (Surrounding Below) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {highlights.slice(2, 4).map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-start gap-3.5 hover:border-emerald-300 transition-all"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#165b39] flex items-center justify-center shrink-0 shadow-2xs">
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 mb-0.5">{item.title}</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2.5 pt-2">
            <a
              href="#harga"
              className="w-full py-3.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#165b39] via-[#1f6e47] to-[#b38b38] active:scale-95 shadow-md shadow-emerald-950/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Pilih Paket &amp; Coba Pembayaran</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://midtrans.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-full text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-2xs active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              <span>Tentang Midtrans Gateway</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>

        </div>

        {/* Desktop View (hidden lg:grid): 2-Column Split Showcase */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Key Pillars & Quick CTA */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="space-y-2.5">
              <span className="text-xs font-black uppercase tracking-wider text-[#165b39]">
                PENGALAMAN CHECKOUT MODERN
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
                Transaksi Cepat, Aman, dan Nyaman di Smartphone Anda
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Tidak ada lagi drama transfer salah nominal atau menunggu admin bangun pagi untuk verifikasi. Teknologi Midtrans otomatis memproses pesanan Anda 24 jam nonstop.
              </p>
            </div>

            {/* 4 Feature Checklist Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              {highlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-300 shadow-2xs hover:shadow-md transition-all duration-200 group"
                  >
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#165b39] flex items-center justify-center mb-2.5 group-hover:bg-[#165b39] group-hover:text-white transition-colors duration-200">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 mb-1 group-hover:text-[#165b39] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <a
                href="#harga"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#165b39] via-[#1f6e47] to-[#b38b38] hover:brightness-105 active:scale-95 shadow-md shadow-emerald-950/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Pilih Paket &amp; Coba Pembayaran</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://midtrans.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-2xs active:scale-95 transition-all flex items-center justify-center gap-1.5"
              >
                <span>Tentang Midtrans Gateway</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>

          </div>

          {/* Right Column: 3D High-End Midtrans Graphic Showcase */}
          <div className="lg:col-span-7 relative flex justify-center w-full">
            
            {/* Outer Glow Halo */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-500/30 via-teal-400/25 to-amber-300/30 rounded-[3rem] blur-3xl -z-10" />

            {/* Showcase Image Frame (Square 1:1 format extending downwards) */}
            <div className="relative w-full aspect-square rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden border-2 border-emerald-500/40 bg-slate-950/90 shadow-[0_30px_70px_-10px_rgba(20,77,49,0.4)] group">
              
              <img
                src="/midtrans_payment_mockup_square.jpg"
                alt="Midtrans QRIS & Digital Payment Checkout Showcase"
                className="w-full h-full object-cover group-hover:scale-[1.025] transition-transform duration-500"
              />

              {/* Floating Glass Badge 1: Top Right */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex items-center gap-2 sm:gap-2.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/95 backdrop-blur-md border border-emerald-200 shadow-xl text-xs sm:text-sm font-bold text-emerald-900 animate-float-slow">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span>Verifikasi 100% Otomatis</span>
              </div>

              {/* Floating Glass Badge 2: Bottom Left */}
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-20 flex items-center gap-3 px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700 text-white shadow-2xl">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-emerald-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium">Payment Gateway Resmi</p>
                  <p className="text-xs sm:text-sm font-bold tracking-tight text-white">Midtrans • GoTo Financial</p>
                </div>
              </div>

              {/* Floating Glass Badge 3: Bottom Right */}
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-amber-400/95 text-slate-900 text-xs sm:text-sm font-black tracking-wide uppercase shadow-xl animate-float-reverse">
                <Sparkles className="w-4 h-4 text-slate-900" />
                <span>QRIS Instan</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
