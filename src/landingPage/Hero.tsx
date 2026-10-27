import { MapPin, CreditCard, CheckCircle2, Music2, Sparkles } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import { GoldBrushStroke, HeroOliveBranches, HeroBottomLeftLeaves } from './DecorativeBackground';

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

          {/* Right Column: Premium Luxury iPhone Showcase with Editorial Feature Cards (Compact & Proportional) */}
          <div className="lg:col-span-6 relative flex justify-center items-center mt-6 lg:mt-0 select-none">
            
            {/* Ambient Warm Golden & Emerald Halo Glow */}
            <div className="absolute w-[280px] sm:w-[380px] h-[280px] sm:h-[380px] rounded-full bg-gradient-to-tr from-amber-300/20 via-emerald-400/15 to-transparent blur-[70px] pointer-events-none -z-0" />

            <div className="relative w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[440px] flex justify-center items-center py-4">

              {/* CARD 1: Amplop Digital 3D (Top-Left, Static Glass Badge) */}
              <div className="hidden sm:flex absolute top-4 -left-6 lg:-left-12 z-40 items-center gap-2.5 p-2.5 sm:p-3 rounded-2xl bg-white/95 backdrop-blur-xl border border-amber-200/80 shadow-[0_12px_30px_-5px_rgba(180,83,9,0.12)] max-w-[180px] sm:max-w-[195px] transition-transform duration-300 hover:scale-105">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white shadow-md shadow-amber-900/20 shrink-0">
                  <CreditCard className="w-4 h-4 text-amber-100" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] sm:text-xs font-bold text-slate-900 leading-none">Amplop 3D</span>
                    <span className="text-[8px] px-1 py-0.2 rounded-full font-bold bg-amber-100 text-amber-800 border border-amber-300 leading-tight">
                      Gratis
                    </span>
                  </div>
                  <p className="text-[9px] text-slate-500 mt-0.5 leading-tight line-clamp-2">
                    Direct BCA &amp; QRIS tanpa potongan
                  </p>
                </div>
              </div>

              {/* CARD 2: RSVP Realtime Sync (Right Side, Static Glass Badge) */}
              <div className="hidden sm:flex absolute top-1/2 -translate-y-1/2 -right-6 lg:-right-12 z-40 items-center gap-2.5 p-2.5 sm:p-3 rounded-2xl bg-white/95 backdrop-blur-xl border border-emerald-200/80 shadow-[0_12px_30px_-5px_rgba(20,83,45,0.12)] max-w-[185px] sm:max-w-[205px] transition-transform duration-300 hover:scale-105">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-[#10432a] flex items-center justify-center text-white shadow-md shadow-emerald-950/20 shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] sm:text-xs font-bold text-slate-900 leading-none">RSVP Real-Time</span>
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-xs" />
                  </div>
                  <p className="text-[9px] text-emerald-800 font-semibold mt-0.5 leading-tight">
                    142 Tamu Terkonfirmasi
                  </p>
                  {/* Guest Avatar Stack */}
                  <div className="flex items-center -space-x-1 mt-1">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" alt="Guest" className="w-3.5 h-3.5 rounded-full border border-white object-cover" />
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80" alt="Guest" className="w-3.5 h-3.5 rounded-full border border-white object-cover" />
                    <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80" alt="Guest" className="w-3.5 h-3.5 rounded-full border border-white object-cover" />
                    <span className="text-[7px] font-bold text-emerald-700 pl-1.5">+139</span>
                  </div>
                </div>
              </div>

              {/* CARD 3: Navigasi Lokasi (Bottom-Left, Static Glass Badge) */}
              <div className="hidden sm:flex absolute bottom-4 -left-4 lg:-left-8 z-40 items-center gap-2.5 p-2 sm:p-2.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-[0_12px_30px_-5px_rgba(15,23,42,0.10)] max-w-[175px] sm:max-w-[190px] transition-transform duration-300 hover:scale-105">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-br from-rose-500 to-rose-700 flex items-center justify-center text-white shadow-md shadow-rose-900/20 shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-rose-100" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] sm:text-xs font-bold text-slate-900 leading-none">Peta Lokasi</span>
                    <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                  </div>
                  <p className="text-[9px] text-slate-500 mt-0.5 leading-tight truncate">
                    Hotel Mulia Senayan, Jakarta
                  </p>
                </div>
              </div>

              {/* Central Premium iPhone 16 Pro Device Mockup with 3D Parallax Tilt */}
              <Tilt
                perspective={1000}
                glareEnable={true}
                glareMaxOpacity={0.25}
                glareColor="#ffffff"
                glarePosition="all"
                glareBorderRadius="42px"
                tiltMaxAngleX={14}
                tiltMaxAngleY={14}
                scale={1.03}
                transitionSpeed={800}
                className="relative z-20 w-[220px] sm:w-[240px] lg:w-[255px] cursor-pointer"
              >
                <div 
                  style={{ transformStyle: 'preserve-3d' }}
                  className="relative w-full rounded-[42px] sm:rounded-[46px] p-2 sm:p-2.5 bg-gradient-to-b from-[#2b2f38] via-[#16181d] to-[#0c0d10] border border-slate-600/60 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.55),0_10px_25px_-5px_rgba(0,0,0,0.4)] ring-1 ring-white/15 transition-shadow duration-300 hover:shadow-[0_35px_80px_-15px_rgba(0,0,0,0.65)]"
                >
                  
                  {/* Diffused shadow underneath phone */}
                  <div className="absolute -bottom-4 left-6 right-6 h-6 bg-black/40 blur-xl rounded-full pointer-events-none" />

                  {/* iPhone Screen Container */}
                  <div className="relative w-full aspect-[9/18.8] rounded-[34px] sm:rounded-[38px] overflow-hidden bg-slate-950 flex flex-col justify-between border border-slate-800">
                    
                    {/* Dynamic Island */}
                    <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-16 h-4 bg-black rounded-full z-40 flex items-center justify-end pr-1.5 gap-1 border border-white/5">
                      <div className="w-2 h-2 rounded-full bg-slate-900/80 border border-emerald-500/40 flex items-center justify-center">
                        <div className="w-0.5 h-0.5 rounded-full bg-emerald-400" />
                      </div>
                    </div>

                    {/* High Quality Romantic Couple Hero Background */}
                    <img
                      src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=85"
                      alt="The Wedding of Adrian & Siling"
                      className="absolute inset-0 w-full h-full object-cover scale-105"
                    />

                    {/* Gradient Vignette for readable text */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/35 pointer-events-none" />

                    {/* Top Wedding Monogram & Header */}
                    <div className="relative z-10 pt-7 px-3 text-center">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-md border border-amber-300/30 shadow-xs mb-1">
                        <img src="/image-transparent.png" alt="Rings" className="w-3 h-3 object-contain" />
                        <span className="text-[7px] tracking-[0.25em] uppercase font-bold text-amber-200 font-sans">
                          THE WEDDING OF
                        </span>
                      </div>
                    </div>

                    {/* Middle / Bottom Wedding Details & Calligraphy */}
                    <div className="relative z-10 px-3 pb-3.5 text-center space-y-1.5">
                      
                      {/* Couple Names */}
                      <div className="space-y-0.5">
                        <h3 className="font-serif-wedding text-white text-xl sm:text-2xl font-bold italic tracking-wide drop-shadow-md">
                          Adrian &amp; Siling
                        </h3>
                        <p className="text-[8px] text-amber-200/90 font-serif tracking-widest uppercase">
                          Minggu, 20 Desember 2026
                        </p>
                      </div>

                      {/* Venue ornament */}
                      <div className="flex items-center justify-center gap-1 py-0.5">
                        <div className="h-[0.5px] w-4 bg-amber-300/60" />
                        <span className="text-[7px] text-stone-300 tracking-wider">HOTEL MULIA, JAKARTA</span>
                        <div className="h-[0.5px] w-4 bg-amber-300/60" />
                      </div>

                      {/* Live Music Widget inside screen */}
                      <div className="flex items-center justify-between px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[7px] text-white/90">
                        <div className="flex items-center gap-1 truncate">
                          <Music2 className="w-2.5 h-2.5 text-amber-300 shrink-0" />
                          <span className="truncate">Shane Filan - Beautiful In White</span>
                        </div>
                        <span className="text-amber-300 font-bold shrink-0 text-[6px]">♫ ON</span>
                      </div>

                      {/* Invitation Action CTA */}
                      <div className="pt-0.5">
                        <div className="w-full py-2 rounded-full bg-gradient-to-r from-[#1b5e3d] via-[#165b39] to-[#10432a] text-white text-[9px] font-bold tracking-wide uppercase shadow-lg shadow-emerald-950/50 border border-emerald-400/40 flex items-center justify-center gap-1">
                          <span>Buka Undangan</span>
                          <span className="text-[10px]">✉</span>
                        </div>
                      </div>

                    </div>

                  </div>

                </div>
              </Tilt>

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
