import React from 'react';
import { WeddingRingsIcon, BotanicalLeaves } from '../landingPage/DecorativeBackground';
import { ArrowLeft, Sparkles, CheckCircle2, Heart } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  activeMode: 'login' | 'register';
  onSwitchMode: (mode: 'login' | 'register') => void;
  onBackToHome: () => void;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  activeMode,
  onSwitchMode,
  onBackToHome,
}) => {
  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-800 flex flex-col justify-between selection:bg-emerald-700 selection:text-white relative overflow-hidden font-sans">
      
      {/* Top Botanical Leaves Background */}
      <BotanicalLeaves.TopRight />

      {/* Top Navbar Header */}
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between relative z-30">
        
        {/* Brand Logo */}
        <div 
          onClick={onBackToHome}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <WeddingRingsIcon className="w-9 h-9 group-hover:scale-105 transition-transform duration-200 shadow-sm" />
          <span className="font-serif-wedding text-2xl font-bold tracking-normal text-slate-900 lowercase">
            i say yes
          </span>
        </div>

        {/* Back to Home Button */}
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-slate-700 hover:text-[#165b39] bg-white/90 hover:bg-white border border-slate-200 shadow-2xs hover:shadow-xs transition-all cursor-pointer active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </button>

      </header>

      {/* Main Split Screen Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 flex items-center justify-center relative z-20">
        
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Form Card with Mode Switcher */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            
            <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200/90 shadow-[0_20px_50px_rgba(20,77,49,0.08)] p-6 sm:p-9 relative">
              
              {/* Mode Switcher Tabs */}
              <div className="flex rounded-2xl bg-slate-100 p-1 mb-6 select-none">
                <button
                  type="button"
                  onClick={() => onSwitchMode('login')}
                  className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    activeMode === 'login'
                      ? 'bg-white text-[#165b39] shadow-sm font-black'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Masuk ke Akun
                </button>
                <button
                  type="button"
                  onClick={() => onSwitchMode('register')}
                  className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    activeMode === 'register'
                      ? 'bg-white text-[#165b39] shadow-sm font-black'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Daftar Akun Baru
                </button>
              </div>

              {/* Form Content */}
              {children}

            </div>

          </div>

          {/* Right Column: Luxury Wedding Inspiration & Customer Proof */}
          <div className="hidden lg:flex lg:col-span-6 flex-col items-center justify-center">
            
            <div className="relative w-full max-w-lg rounded-3xl overflow-hidden bg-gradient-to-br from-[#144e32] via-[#165b39] to-[#0f3d26] text-white p-8 sm:p-10 shadow-2xl shadow-emerald-950/30 border border-emerald-500/30 flex flex-col justify-between min-h-[580px]">
              
              {/* Background ambient lighting */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

              {/* Top Card Header */}
              <div className="relative z-10 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-200 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Platform Undangan Digital #1 di Indonesia</span>
                </div>

                <h3 className="font-serif-wedding text-3xl font-bold tracking-tight text-white leading-tight">
                  Mewujudkan Momen Sakral <br />
                  <span className="italic font-display-luxury text-amber-200">
                    Yang Elegan &amp; Berkesan
                  </span>
                </h3>

                <p className="text-xs text-emerald-100/80 leading-relaxed font-normal">
                  Satu akun untuk membuat, mengelola, dan membagikan undangan pernikahan ke ribuan tamu dalam hitungan menit.
                </p>
              </div>

              {/* Center Couple Photo Mockup Card */}
              <div className="relative z-10 my-6">
                <div className="relative rounded-2xl overflow-hidden border border-white/25 shadow-2xl group">
                  <img
                    src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=700&q=80"
                    alt="Wedding Couple Showcase"
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  
                  {/* Floating badges on photo */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-serif-wedding text-white font-bold text-sm">Dimas &amp; Anindya</p>
                      <p className="text-[10px] text-amber-200">Pernikahan 14 Februari 2026</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-600/90 text-white text-[10px] font-bold shadow-xs">
                      Tema Emerald Gold
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Testimonial Quote & Benefits */}
              <div className="relative z-10 space-y-4 pt-2 border-t border-white/15">
                <div className="grid grid-cols-2 gap-3 text-xs text-emerald-100/90 font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
                    <span>RSVP Realtime WhatsApp</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
                    <span>Amplop Digital &amp; QRIS</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
                    <span>Musik Romantis Otomatis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
                    <span>Aktif Selamanya (Lifetime)</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-emerald-200/80 pt-1">
                  <span>Telah dipercaya oleh <strong className="text-white">50.000+</strong> pasangan</span>
                  <div className="flex items-center gap-1 text-amber-300">
                    <span>★★★★★</span>
                    <span className="text-white font-bold ml-1">4.9/5</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </main>

      {/* Footer Minimal */}
      <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-xs text-slate-400 relative z-20">
        <p>© 2026 <strong className="text-slate-600 font-semibold">i say yes</strong>. Dibuat dengan <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 inline mx-0.5" /> untuk kebahagiaan calon pengantin Indonesia.</p>
      </footer>

    </div>
  );
};
