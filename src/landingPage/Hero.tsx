import { Music, Mail, MapPin, Sparkles } from 'lucide-react';
import { GoldBrushStroke, SaveTheDateBadge } from './DecorativeBackground';

export const Hero = () => {
  return (
    <section id="beranda" className="relative pt-4 pb-14 sm:pt-8 sm:pb-20 lg:pt-12 lg:pb-24 overflow-hidden">

      {/* Real Window Pane Shadow Overlay specifically over the Hero Left Content */}
      <div
        className="absolute top-0 left-0 w-full lg:w-[55%] h-full pointer-events-none z-10 opacity-25 sm:opacity-30 mix-blend-multiply select-none"
        style={{ transform: 'rotate(-26deg)' }}
      >
        <div className="absolute -top-32 left-[15%] w-20 sm:w-28 h-[160%] bg-slate-900/40 blur-[36px]" />
        <div className="absolute -top-32 left-[55%] w-24 sm:w-36 h-[160%] bg-slate-900/35 blur-[42px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

          {/* Left Column: Text & CTAs (Responsive & Mobile-optimized) */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6 text-center lg:text-left">

            {/* Hero Section Label */}
            <div className="inline-flex items-center gap-2 justify-center lg:justify-start">
              <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-[#216a49]">
                HERO SECTION
              </span>
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            </div>

            {/* Headline with Gold Brush Underline */}
            <div className="relative">
              <h1 className="text-3xl sm:text-5xl lg:text-[58px] font-black text-slate-900 tracking-tight leading-[1.16] sm:leading-[1.12]">
                Buat Undangan<br />
                <span className="font-display-luxury italic font-bold text-slate-800">Digital Cantik</span> &amp;<br />
                Cepat
              </h1>
              <div className="absolute -bottom-4 sm:-bottom-5 left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 w-56 sm:w-80 opacity-70 -z-10 pointer-events-none">
                <GoldBrushStroke />
              </div>
            </div>

            {/* Subtitle */}
            <p className="text-slate-600 text-xs sm:text-base leading-relaxed max-w-lg mx-auto lg:mx-0 pt-1 font-normal">
              Bersama "i say yes", bagikan momen bahagia Anda dengan undangan online yang modern, interaktif, dan hemat biaya. Kirim ke ribuan tamu dalam hitungan menit!
            </p>

            {/* Action Buttons: Full width on mobile for easy finger tapping */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 pt-2 justify-center lg:justify-start">
              <a
                href="#pilihan-template"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#175b39] via-[#22714a] to-[#b88f36] hover:brightness-105 active:scale-[0.98] shadow-[0_10px_25px_-5px_rgba(23,91,57,0.4)] transition-all duration-200 cursor-pointer text-center"
              >
                Buat Undangan Sekarang
              </a>
              <a
                href="#pilihan-template"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 shadow-[0_4px_14px_0_rgba(0,0,0,0.06)] active:scale-[0.98] transition-all duration-200 cursor-pointer text-center"
              >
                Lihat Template
              </a>
            </div>

          </div>

          {/* Right Column: Devices Mockup & Floating Badges (Responsive scaling for mobile) */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end mt-4 lg:mt-0">

            <div className="relative w-full max-w-[340px] sm:max-w-[480px] lg:max-w-[540px] h-[360px] sm:h-[440px] lg:h-[470px]">

              {/* Diffuse Ground Shadow under both devices */}
              <div className="absolute bottom-2 left-6 right-6 h-10 bg-slate-900/25 blur-3xl rounded-full pointer-events-none" />

              {/* Floating Badge 1: Music Background */}
              <div className="absolute -top-2 sm:-top-3 left-1 sm:left-10 z-30 flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#fef9c3] border border-[#fef08a] shadow-[0_8px_20px_rgba(202,138,4,0.18)] text-[10px] sm:text-xs font-semibold text-[#854d0e] animate-float-slow">
                <Music className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#ca8a04]" />
                <span>Music Background</span>
              </div>

              {/* Floating Badge 2: RSVP Realtime */}
              <div className="absolute top-1 sm:top-2 right-12 sm:right-32 z-30 flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white shadow-[0_8px_25px_rgba(0,0,0,0.1)] border border-slate-100 text-[10px] sm:text-xs font-bold text-slate-800 animate-float-reverse">
                <span>RSVP Realtime</span>
              </div>

              {/* Floating Badge 3: Amplop Digital */}
              <div className="absolute top-9 sm:top-10 right-0 sm:right-6 z-30 flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white shadow-[0_8px_25px_rgba(0,0,0,0.1)] border border-slate-100 text-[10px] sm:text-xs font-semibold text-slate-800 animate-float-slow">
                <div className="w-3.5 sm:w-4 h-3.5 sm:h-4 rounded bg-amber-100 flex items-center justify-center">
                  <Mail className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-amber-600" />
                </div>
                <span>Amplop Digital</span>
              </div>

              {/* Floating Badge 4: Save the Date (from asset sheet!) */}
              <div className="absolute bottom-6 sm:bottom-8 -left-2 sm:left-0 z-30 -rotate-6 scale-75 sm:scale-100 origin-bottom-left animate-float-reverse">
                <SaveTheDateBadge />
              </div>

              {/* Floating Badge 5: Peta Lokasi & Navigasi (bottom laptop) */}
              <div className="absolute bottom-4 sm:bottom-6 right-1 sm:right-10 z-30 flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white shadow-[0_10px_30px_rgba(0,0,0,0.12)] border border-slate-100 text-[10px] sm:text-xs font-semibold text-slate-800 animate-float-slow">
                <div className="w-3.5 sm:w-4 h-3.5 sm:h-4 rounded-full bg-amber-100 flex items-center justify-center">
                  <MapPin className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-amber-600" />
                </div>
                <span>Peta Lokasi &amp; Navigasi</span>
              </div>

              {/* Middle Tablet / Standing Invitation Mockup (Center Behind Phone) */}
              <div className="absolute top-3 sm:top-4 left-24 sm:left-32 lg:left-36 w-[150px] sm:w-[210px] lg:w-[230px] h-[240px] sm:h-[310px] lg:h-[340px] z-15 rounded-[18px] sm:rounded-[22px] p-1.5 sm:p-2 bg-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.35)] border border-slate-700/80">
                <div className="relative w-full h-full rounded-[14px] sm:rounded-[18px] overflow-hidden bg-[#faf8f5] flex flex-col justify-between p-2.5 sm:p-3 text-center border border-amber-100">
                  {/* Top Geometric Emerald & Gold Banner */}
                  <div className="w-full h-14 sm:h-18 rounded-lg bg-gradient-to-br from-[#12492d] to-[#0a2c1b] p-1.5 flex flex-col items-center justify-center relative overflow-hidden border border-amber-400/30">
                    <div className="absolute -top-4 -right-4 w-12 h-12 border border-amber-300/30 rotate-45 pointer-events-none" />
                    <div className="absolute -bottom-4 -left-4 w-12 h-12 border border-amber-300/30 rotate-45 pointer-events-none" />
                    <span className="text-[7px] sm:text-[9px] tracking-widest uppercase font-semibold text-amber-300">
                      The Wedding
                    </span>
                    <span className="font-serif-wedding text-white text-[10px] sm:text-xs italic font-bold">
                      Modern &amp; Elegant
                    </span>
                  </div>

                  {/* Middle Invitation Text */}
                  <div className="space-y-0.5 py-1">
                    <p className="text-[7px] sm:text-[8px] text-slate-500 uppercase tracking-wider">Kepada Yth:</p>
                    <p className="text-[8px] sm:text-[10px] font-bold text-slate-800 font-serif-wedding">Bpk. Hendro &amp; Kel.</p>
                    <div className="w-10 h-[0.5px] bg-amber-300 mx-auto my-0.5" />
                    <p className="text-[6px] sm:text-[7px] text-slate-400">Di Tempat</p>
                  </div>

                  {/* Bottom CTA */}
                  <div className="pt-0.5">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#165b39] text-white text-[7px] sm:text-[8px] font-semibold shadow-xs">
                      Buka Undangan
                    </span>
                  </div>
                </div>
              </div>

              {/* Laptop Mockup (Right & Behind) with Deep Shadow */}
              <div className="absolute top-10 sm:top-12 right-0 w-[240px] sm:w-[360px] lg:w-[420px] z-10 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.35)] rounded-lg sm:rounded-xl overflow-hidden border border-slate-700 bg-slate-900 transition-transform duration-500">
                {/* Laptop Camera dot */}
                <div className="bg-slate-900 h-3 sm:h-4 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                </div>

                {/* Laptop Screen Content (Builder Dashboard) */}
                <div className="bg-slate-50 h-[160px] sm:h-[220px] lg:h-[245px] p-1.5 sm:p-2 flex text-[8px] sm:text-[9px]">
                  {/* Left Sidebar */}
                  <div className="w-16 sm:w-24 bg-white border-r border-slate-200 p-1.5 sm:p-2 space-y-1">
                    <div className="font-serif-wedding text-[9px] sm:text-[10px] font-bold text-emerald-800 mb-1 sm:mb-2">
                      i say yes
                    </div>
                    <div className="px-1.5 py-0.5 sm:py-1 rounded bg-emerald-50 text-emerald-800 font-semibold border-l-2 border-emerald-700 text-[7px] sm:text-[9px]">
                      Tema
                    </div>
                    <div className="px-1.5 py-0.5 text-slate-500 text-[7px] sm:text-[9px]">Info</div>
                    <div className="px-1.5 py-0.5 text-slate-500 text-[7px] sm:text-[9px]">Foto</div>
                    <div className="px-1.5 py-0.5 text-slate-500 text-[7px] sm:text-[9px]">Musik</div>
                  </div>

                  {/* Main Builder Canvas */}
                  <div className="flex-1 bg-[#fbf9f5] flex items-center justify-center p-2 relative overflow-hidden">
                    <div className="w-[120px] sm:w-[160px] bg-white rounded-lg shadow-sm border border-amber-100 p-2 text-center space-y-0.5 relative">
                      <div className="w-8 h-8 sm:w-11 sm:h-11 mx-auto rounded-full border border-pink-200 flex items-center justify-center bg-pink-50/50">
                        <span className="text-[10px] sm:text-xs">🌿</span>
                      </div>
                      <p className="font-serif-wedding text-[9px] sm:text-xs font-semibold text-slate-800">
                        Wedding &amp; Siiing
                      </p>
                      <div className="w-8 h-[0.5px] bg-amber-300 mx-auto" />
                      <p className="text-[7px] sm:text-[8px] text-slate-400">Sabtu, 25 Des 2026</p>
                      <div className="inline-block px-1.5 py-0.5 rounded-full bg-[#1b5e3d] text-white text-[6px] sm:text-[7px] font-semibold mt-0.5">
                        Buka Undangan
                      </div>
                    </div>
                  </div>
                </div>

                {/* Laptop Bottom Strip */}
                <div className="h-2.5 sm:h-3 bg-slate-800 flex items-center justify-center border-t border-slate-700">
                  <div className="w-12 sm:w-16 h-0.5 sm:h-1 rounded-full bg-slate-600" />
                </div>
              </div>

              {/* Smartphone Mockup (Left & Forefront) */}
              <div className="absolute top-8 sm:top-10 left-1 sm:left-6 w-[130px] sm:w-[180px] lg:w-[195px] h-[270px] sm:h-[340px] lg:h-[370px] z-20 rounded-[26px] sm:rounded-[34px] p-1.5 sm:p-2 bg-slate-900 shadow-[0_25px_60px_-10px_rgba(0,0,0,0.5)] border-2 border-slate-800 ring-1 ring-slate-700/60">

                <div className="relative w-full h-full rounded-[20px] sm:rounded-[28px] overflow-hidden bg-slate-950 flex flex-col justify-between">
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-10 sm:w-14 h-2.5 sm:h-3.5 bg-slate-900 rounded-full z-30" />

                  <img
                    src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80"
                    alt="Wedding Couple"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/20" />

                  <div className="relative z-10 p-2 pt-3 text-center">
                    <span className="text-[7px] sm:text-[9px] tracking-widest uppercase font-semibold text-amber-200/90">
                      The Wedding Of
                    </span>
                  </div>

                  <div className="relative z-10 p-2 sm:p-3 text-center space-y-0.5">
                    <p className="font-serif-wedding text-white text-xs sm:text-base font-bold italic tracking-wide">
                      Wedding &amp; Siiing
                    </p>
                    <div className="flex items-center justify-center gap-1.5">
                      <div className="h-[0.5px] w-4 bg-amber-400/60" />
                      <span className="font-serif-wedding text-amber-300 font-bold text-[10px] sm:text-xs">20</span>
                      <div className="h-[0.5px] w-4 bg-amber-400/60" />
                    </div>
                    <div className="pt-1">
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-700/90 text-white text-[7px] sm:text-[9px] font-semibold shadow">
                        Buka Undangan
                      </span>
                    </div>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
