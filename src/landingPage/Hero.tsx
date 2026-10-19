import { MapPin } from 'lucide-react';
import { GoldBrushStroke, SaveTheDateBadge, HeroOliveBranches, HeroBottomLeftLeaves } from './DecorativeBackground';

export const Hero = () => {
  return (
    <section id="beranda" className="relative pt-6 pb-20 sm:pt-10 sm:pb-28 lg:pt-14 lg:pb-32 overflow-hidden bg-[#faf8f5]/60">

      {/* Real Window Pane Shadow Overlay specifically over the Hero Left Content */}
      <div
        className="absolute top-0 left-0 w-full lg:w-[55%] h-full pointer-events-none z-10 opacity-25 sm:opacity-30 mix-blend-multiply select-none"
        style={{ transform: 'rotate(-26deg)' }}
      >
        <div className="absolute -top-32 left-[15%] w-20 sm:w-28 h-[160%] bg-slate-900/40 blur-[36px]" />
        <div className="absolute -top-32 left-[55%] w-24 sm:w-36 h-[160%] bg-slate-900/35 blur-[42px]" />
      </div>

      {/* Warm Ambient Golden Spotlight Glow on Left */}
      <div className="absolute top-6 left-6 sm:left-16 w-80 sm:w-[480px] h-80 sm:h-[480px] rounded-full bg-amber-300/25 blur-[100px] pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

          {/* Left Column: Text & CTAs (Responsive & Mobile-optimized) */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6 text-center lg:text-left">

            {/* Hero Section Label with Golden Airplane */}
            <div className="relative inline-flex items-center gap-2 justify-center lg:justify-start">
              <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-[#154632] relative z-10">
                HERO SECTION
              </span>
              <span className="text-amber-500 text-xs sm:text-sm relative z-10 select-none">✈</span>
            </div>

            {/* Headline with Gold Brush Underline under Cepat */}
            <div className="relative">
              <h1 className="font-serif-wedding text-4xl sm:text-5xl lg:text-[58px] font-bold text-[#14181f] tracking-tight leading-[1.12]">
                Buat Undangan<br />
                Digital <span className="font-serif-wedding italic text-[#c29629]">Cantik &amp;</span><br />
                <span className="relative inline-block font-serif-wedding italic text-[#c29629]">
                  Cepat
                  {/* Gold Brush Underline under Cepat */}
                  <div className="absolute -bottom-2 sm:-bottom-3 left-0 w-[145%] h-5 sm:h-7 pointer-events-none">
                    <GoldBrushStroke />
                  </div>
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-slate-600 text-xs sm:text-sm lg:text-base leading-relaxed max-w-lg mx-auto lg:mx-0 pt-1 font-normal">
              Bersama &quot;i say yes&quot;, bagikan momen bahagia Anda dengan undangan online yang modern, interaktif, dan hemat biaya. Kirim ke ribuan tamu dalam hitungan menit!
            </p>

            {/* Action Buttons: Full width on mobile for easy finger tapping */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 pt-2 justify-center lg:justify-start">
              <a
                href="#template"
                className="w-full sm:w-auto px-7 sm:px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold text-white bg-[#154632] hover:bg-[#113a29] active:scale-[0.98] shadow-[0_10px_25px_-5px_rgba(21,70,50,0.5)] transition-all duration-200 cursor-pointer text-center"
              >
                Buat Undangan Sekarang
              </a>
              <a
                href="#template"
                className="w-full sm:w-auto px-7 sm:px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold text-stone-800 bg-[#faf8f5] hover:bg-stone-100 border-2 border-[#c29629]/70 shadow-xs active:scale-[0.98] transition-all duration-200 cursor-pointer text-center"
              >
                Lihat Template
              </a>
            </div>

          </div>

          {/* Right Column: 3 Overlapping Invitation Smartphones in 3D Staggered Layout */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end mt-4 lg:mt-0">

            <div className="relative w-full max-w-[350px] sm:max-w-[490px] lg:max-w-[540px] h-[380px] sm:h-[460px] lg:h-[510px]">

              {/* Diffuse Ground Shadow under devices */}
              <div className="absolute -bottom-3 left-6 right-6 h-12 bg-slate-900/35 blur-3xl rounded-full pointer-events-none" />

              {/* Floating Badge 1: RSVP Realtime (above middle card / Phone 2) */}
              <div className="absolute -top-2 sm:top-0 left-[140px] sm:left-[200px] lg:left-[235px] z-40 flex items-center gap-1.5 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#133e2b]/85 backdrop-blur-md shadow-[0_10px_25px_rgba(0,0,0,0.25)] border border-emerald-400/30 text-[10px] sm:text-xs font-semibold text-emerald-100 animate-float-reverse select-none">
                <span>RSVP Realtime</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>

              {/* Floating Badge 2: Save the Date Sticker (bottom-left of phone 1) */}
              <div className="absolute bottom-5 sm:bottom-7 -left-3 sm:-left-3 z-40 -rotate-6 scale-80 sm:scale-100 origin-bottom-left animate-float-reverse">
                <SaveTheDateBadge />
              </div>

              {/* Floating Badge 3: Peta Lokasi & Navigasi (bottom-right of phone 3) */}
              <div className="absolute bottom-5 sm:bottom-7 right-0 sm:right-2 lg:right-3 z-40 flex items-center gap-1.5 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#173a27]/85 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.25)] border border-emerald-400/25 text-[10px] sm:text-xs font-semibold text-emerald-100 animate-float-slow select-none">
                <div className="w-3.5 sm:w-4 h-3.5 sm:h-4 rounded-full bg-emerald-800/80 flex items-center justify-center">
                  <MapPin className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-amber-300" />
                </div>
                <span>Peta Lokasi &amp; Navigasi</span>
                <span className="text-amber-300 text-[10px]">✨</span>
              </div>

              {/* CARD 3: Back Phone (Event Details & Map Location) */}
              <div className="absolute top-1 sm:top-2 right-0 sm:right-2 lg:right-3 w-[150px] sm:w-[205px] lg:w-[230px] h-[310px] sm:h-[415px] lg:h-[465px] z-10 rounded-[28px] sm:rounded-[38px] p-1.5 sm:p-2 bg-[#1c1f24] border border-slate-700/80 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
                <div className="relative w-full h-full rounded-[22px] sm:rounded-[32px] overflow-hidden bg-[#faf8f5] flex flex-col justify-between border border-amber-100/60 select-none p-2 sm:p-3">
                  {/* Top Status */}
                  <div className="w-full flex items-center justify-between text-[7px] sm:text-[9px] text-stone-400 border-b border-stone-200/60 pb-1">
                    <span>an dan 30</span>
                    <span>100% 🔋</span>
                  </div>

                  {/* Akad & Resepsi Card */}
                  <div className="bg-white rounded-xl sm:rounded-2xl p-2 sm:p-3 border border-stone-200/80 shadow-xs space-y-1">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-xs">
                      🌿
                    </div>
                    <p className="font-serif-wedding text-[9px] sm:text-xs font-bold text-stone-900 leading-tight">
                      Akad &amp; Resepsi
                    </p>
                    <p className="text-[7px] sm:text-[8px] text-stone-500">
                      Minggu, 20 Des 2026
                    </p>
                    <div className="pt-0.5">
                      <span className="inline-block px-2 sm:px-2.5 py-0.5 rounded-full bg-[#154632] text-white text-[6px] sm:text-[8px] font-semibold">
                        Simpan Undangan
                      </span>
                    </div>
                  </div>

                  {/* Map Card */}
                  <div className="bg-white rounded-xl sm:rounded-2xl p-2 border border-stone-200/80 shadow-xs space-y-1 overflow-hidden">
                    <div className="w-full h-11 sm:h-14 rounded-lg bg-stone-100 relative overflow-hidden flex items-center justify-center">
                      {/* Mock Map roads */}
                      <div className="absolute inset-0 bg-[#e5e3df]">
                        <div className="absolute top-2 left-0 right-0 h-1.5 bg-white" />
                        <div className="absolute top-0 bottom-0 left-5 w-1.5 bg-white" />
                        <div className="absolute bottom-1 right-3 w-8 h-6 rounded-md bg-[#cde4cb]" />
                      </div>
                      {/* Red Location Pin */}
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="w-3.5 h-3.5 rounded-full bg-rose-500 text-white flex items-center justify-center text-[7px] shadow-sm">
                          📍
                        </div>
                      </div>
                    </div>
                    <p className="text-[7px] sm:text-[8px] font-bold text-stone-800 truncate">
                      Manshore &amp; Pocooking Hat...
                    </p>
                  </div>

                  <div className="pb-0.5" />
                </div>
              </div>

              {/* CARD 2: Middle Phone (Emerald & Gold Botanical Invitation) */}
              <div className="absolute top-2 sm:top-4 left-[75px] sm:left-[125px] lg:left-[150px] w-[155px] sm:w-[210px] lg:w-[235px] h-[325px] sm:h-[435px] lg:h-[485px] z-20 rounded-[30px] sm:rounded-[40px] p-1.5 sm:p-2 bg-[#171a1f] border border-slate-700/80 shadow-[0_25px_60px_-10px_rgba(0,0,0,0.45)]">
                <div className="relative w-full h-full rounded-[24px] sm:rounded-[34px] overflow-hidden bg-[#faf8f5] flex flex-col justify-between border border-amber-100/60 select-none">
                  {/* Top Emerald & Gold Botanical Banner */}
                  <div className="w-full h-[45%] bg-gradient-to-br from-[#0e3b24] via-[#13492e] to-[#0a2e1c] p-2 sm:p-3 flex flex-col items-center justify-center relative overflow-hidden border-b border-amber-400/30 text-center">
                    {/* Gold botanical leaf framing */}
                    <div className="absolute -top-3 -left-3 w-12 sm:w-16 h-12 sm:h-16 opacity-35 pointer-events-none">
                      <svg viewBox="0 0 100 100" fill="none">
                        <path d="M10 90C40 60 70 50 90 10" stroke="#f3d999" strokeWidth="2" />
                        <ellipse cx="30" cy="70" rx="15" ry="8" transform="rotate(-30 30 70)" fill="#f3d999" />
                        <ellipse cx="60" cy="40" rx="15" ry="8" transform="rotate(-30 60 40)" fill="#f3d999" />
                      </svg>
                    </div>
                    <div className="absolute -top-3 -right-3 w-12 sm:w-16 h-12 sm:h-16 opacity-35 pointer-events-none scale-x-[-1]">
                      <svg viewBox="0 0 100 100" fill="none">
                        <path d="M10 90C40 60 70 50 90 10" stroke="#f3d999" strokeWidth="2" />
                        <ellipse cx="30" cy="70" rx="15" ry="8" transform="rotate(-30 30 70)" fill="#f3d999" />
                        <ellipse cx="60" cy="40" rx="15" ry="8" transform="rotate(-30 60 40)" fill="#f3d999" />
                      </svg>
                    </div>

                    <span className="text-[7px] sm:text-[8px] tracking-[0.2em] uppercase font-bold text-[#e2be6d] font-sans">
                      THE WEDDING OF
                    </span>
                    <span className="font-serif-wedding italic text-[#f4dc9e] text-xs sm:text-base font-bold mt-1 drop-shadow-sm">
                      Adrian &amp; Siling
                    </span>
                  </div>

                  {/* Middle White Invitation Card with Gold Frame */}
                  <div className="mx-2 sm:mx-3 my-2 p-2 sm:p-2.5 bg-white rounded-xl sm:rounded-2xl border border-[#d4af37]/60 shadow-xs text-center space-y-0.5 sm:space-y-1">
                    <p className="text-[7px] sm:text-[8px] text-stone-400 uppercase tracking-widest font-semibold">
                      KEPADA YTH:
                    </p>
                    <p className="text-[9px] sm:text-xs font-bold text-stone-900 font-serif-wedding">
                      Bpk. Hendro &amp; Kel.
                    </p>
                    <div className="w-8 sm:w-12 h-[0.5px] bg-[#d4af37]/60 mx-auto my-0.5" />
                    <p className="text-[7px] sm:text-[8px] text-stone-400">
                      Di Tempat
                    </p>
                  </div>

                  {/* Bottom CTA */}
                  <div className="pb-3 sm:pb-4 text-center">
                    <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#154632] text-white text-[7px] sm:text-[9px] font-semibold shadow-xs">
                      Buka Undangan
                    </span>
                  </div>
                </div>
              </div>

              {/* CARD 1: Front iPhone (Dark Luxury Floral Cover with Dynamic Island) */}
              <div className="absolute top-4 sm:top-6 left-0 sm:left-2 lg:left-3 w-[165px] sm:w-[220px] lg:w-[245px] h-[335px] sm:h-[450px] lg:h-[505px] z-30 rounded-[32px] sm:rounded-[44px] p-1.5 sm:p-2 bg-[#101216] border border-slate-700/80 shadow-[0_30px_70px_-10px_rgba(0,0,0,0.6)] ring-1 ring-white/10">
                <div className="relative w-full h-full rounded-[26px] sm:rounded-[38px] overflow-hidden bg-slate-950 flex flex-col justify-between select-none">
                  {/* Dynamic Island Pill Cutout */}
                  <div className="absolute top-1.5 sm:top-2 left-1/2 -translate-x-1/2 w-11 sm:w-15 h-3 sm:h-4 bg-black rounded-full z-30 border border-white/5" />

                  {/* High Resolution Romantic Floral Image */}
                  <img
                    src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=85"
                    alt="The Wedding of Adrian & Siling"
                    className="absolute inset-0 w-full h-full object-cover scale-105"
                  />
                  {/* Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/30" />

                  {/* Top Wedding Label */}
                  <div className="relative z-10 p-2 pt-6 sm:pt-8 text-center">
                    <span className="text-[7px] sm:text-[9px] tracking-[0.25em] uppercase font-bold text-[#e2be6d] font-sans">
                      THE WEDDING OF
                    </span>
                  </div>

                  {/* Bottom Wedding Details */}
                  <div className="relative z-10 p-2 sm:p-3 text-center space-y-0.5 sm:space-y-1 pb-3 sm:pb-4">
                    <p className="font-serif-wedding text-white text-xs sm:text-base font-bold italic tracking-wide drop-shadow-md">
                      ding &amp; Siling
                    </p>
                    
                    {/* Date ornament: — 20 — */}
                    <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                      <div className="h-[0.5px] w-4 sm:w-5 bg-[#e2be6d]/80" />
                      <span className="font-serif-wedding text-[#f4dc9e] font-bold text-[10px] sm:text-xs">20</span>
                      <div className="h-[0.5px] w-4 sm:w-5 bg-[#e2be6d]/80" />
                    </div>

                    {/* Bottom CTA Button */}
                    <div className="pt-1">
                      <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#154632] hover:bg-[#1a573e] text-white text-[7px] sm:text-[9px] font-semibold shadow-md transition-colors cursor-pointer">
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

      {/* Signature Botanical Olive Leaves in Bottom Left Corner */}
      <HeroBottomLeftLeaves />

      {/* Signature Botanical Olive Branches with Olives along Bottom */}
      <HeroOliveBranches />

    </section>
  );
};

export default Hero;
