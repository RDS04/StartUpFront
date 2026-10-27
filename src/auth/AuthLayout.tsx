import React from 'react';
import { motion } from 'framer-motion';
import { WeddingRingsIcon, BotanicalLeaves, GoldFoilSplash } from '../landingPage/DecorativeBackground';
import { ArrowLeft, Heart } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  activeMode: 'login' | 'register';
  onSwitchMode: (mode: 'login' | 'register') => void;
  onBackToHome: () => void;
}

// Background Floating Particles
const FLOATING_PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  size: Math.random() * 8 + 4,
  x: Math.random() * 100,
  y: Math.random() * 100,
  duration: Math.random() * 6 + 6,
  delay: Math.random() * 3,
}));

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  activeMode,
  onSwitchMode,
  onBackToHome,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8faf7] via-[#f1f6ee] to-[#ebe5da] text-slate-800 flex flex-col justify-between selection:bg-emerald-700 selection:text-white relative overflow-hidden font-sans">
      
      {/* Background Animated Atmosphere & Aura Orbs for True Glassmorphism Refraction */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
        
        {/* Subtle Luxury Pattern Mesh */}
        <div 
          className="absolute inset-0 opacity-[0.22] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(22, 91, 57, 0.25) 1px, transparent 0)`,
            backgroundSize: '28px 28px',
          }}
        />

        {/* Ambient Center Aura Orbs Directly Behind the Glass Card */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-emerald-400/30 via-amber-300/25 to-teal-200/25 rounded-full blur-[110px]"
          animate={{
            scale: [1, 1.15, 0.95, 1],
            rotate: [0, 90, 180, 360],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        />

        {/* Emerald Glow Orb moving across behind card */}
        <motion.div
          className="absolute top-[40%] left-[30%] -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-gradient-to-br from-emerald-500/35 to-teal-400/20 rounded-full blur-[90px]"
          animate={{
            x: [-40, 40, -40],
            y: [-30, 30, -30],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Warm Champagne Gold Aura Orb moving behind card */}
        <motion.div
          className="absolute top-[60%] left-[70%] -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-gradient-to-bl from-amber-400/35 via-yellow-300/25 to-orange-200/20 rounded-full blur-[100px]"
          animate={{
            x: [30, -30, 30],
            y: [30, -30, 30],
            scale: [1.1, 0.95, 1.1],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Top-Left Emerald Aura */}
        <motion.div
          className="absolute -top-32 -left-20 w-[450px] h-[450px] bg-gradient-to-tr from-emerald-500/25 via-teal-400/20 to-emerald-300/15 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.12, 1],
            x: [0, 20, 0],
            y: [0, -15, 0],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Bottom-Right Rose Gold Accent */}
        <motion.div
          className="absolute -bottom-32 -right-20 w-[480px] h-[480px] bg-gradient-to-tl from-rose-300/25 via-amber-200/25 to-emerald-200/20 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.18, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Floating Shimmer Dust Particles */}
        {FLOATING_PARTICLES.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-tr from-amber-400/70 to-emerald-400/70 blur-[1px]"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, 20, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.35, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* Top Botanical Leaves Background */}
      <BotanicalLeaves.TopRight />
      <GoldFoilSplash className="absolute top-12 left-8 w-28 h-28 opacity-25 pointer-events-none" />

      {/* Top Navbar Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between relative z-30"
      >
        {/* Brand Logo with Frosted Glass Badge */}
        <motion.div 
          onClick={onBackToHome}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-11 h-11 rounded-2xl bg-white/65 backdrop-blur-xl p-1.5 border border-white/80 shadow-[0_4px_20px_rgba(22,91,57,0.06),inset_0_1px_1px_rgba(255,255,255,0.95)] flex items-center justify-center group-hover:border-amber-300 group-hover:shadow-md transition-all">
            <WeddingRingsIcon className="w-full h-full group-hover:rotate-6 transition-transform duration-300 drop-shadow-sm" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-serif-wedding text-2xl font-bold tracking-tight text-slate-900 lowercase leading-none">
                i say yes
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            </div>
            <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-amber-700/80 mt-1 font-sans leading-none">
              Wedding Invitation
            </span>
          </div>
        </motion.div>

        {/* Back to Home Button with Frosted Glass Pill */}
        <motion.button
          onClick={onBackToHome}
          whileHover={{ scale: 1.05, x: -2 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-slate-700 hover:text-[#165b39] bg-white/65 hover:bg-white/90 backdrop-blur-xl border border-white/80 shadow-[0_4px_16px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,0.9)] hover:shadow-md transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </motion.button>
      </motion.header>

      {/* Main Centered Form Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex items-center justify-center relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex flex-col items-center justify-center"
        >
          {/* THE MASTERPIECE FROSTED GLASS CARD */}
          <div className="w-full max-w-md bg-white/55 backdrop-blur-3xl backdrop-saturate-200 rounded-[2.5rem] border border-white/80 shadow-[0_30px_70px_-15px_rgba(22,91,57,0.18),0_15px_30px_-10px_rgba(0,0,0,0.06),inset_0_2px_3px_rgba(255,255,255,0.95),inset_0_-2px_3px_rgba(255,255,255,0.3)] p-6 sm:p-9 relative overflow-hidden">
            
            {/* Top Prismatic Hairline Highlight */}
            <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-emerald-500/50 via-amber-400/90 to-emerald-500/50" />

            {/* Corner Glass Glare & Reflection Effects */}
            <div className="absolute -top-24 -left-24 w-60 h-60 bg-gradient-to-br from-white/90 via-white/30 to-transparent rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-52 h-52 bg-gradient-to-tl from-emerald-100/50 via-amber-100/30 to-transparent rounded-full blur-2xl pointer-events-none" />
            
            {/* Diagonal Realistic Glass Sheen Reflection */}
            <div className="absolute -top-36 -left-36 w-[170%] h-48 bg-gradient-to-b from-white/35 to-transparent -rotate-25 pointer-events-none blur-xs" />

            {/* Animated Frosted Mode Switcher Tabs (Glass on Glass) */}
            <div className="flex rounded-2xl bg-white/35 backdrop-blur-xl border border-white/65 p-1.5 mb-7 select-none relative shadow-[inset_0_2px_5px_rgba(0,0,0,0.04),0_2px_8px_rgba(255,255,255,0.7)]">
              <button
                type="button"
                onClick={() => onSwitchMode('login')}
                className={`relative flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer z-10 ${
                  activeMode === 'login' ? 'text-[#165b39]' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {activeMode === 'login' && (
                  <motion.div
                    layoutId="activeAuthTab"
                    className="absolute inset-0 bg-white/85 backdrop-blur-2xl rounded-xl shadow-[0_6px_20px_rgba(22,91,57,0.14),inset_0_1.5px_2px_rgba(255,255,255,1)] border border-white/95"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 font-extrabold">Masuk ke Akun</span>
              </button>

              <button
                type="button"
                onClick={() => onSwitchMode('register')}
                className={`relative flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer z-10 ${
                  activeMode === 'register' ? 'text-[#165b39]' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {activeMode === 'register' && (
                  <motion.div
                    layoutId="activeAuthTab"
                    className="absolute inset-0 bg-white/85 backdrop-blur-2xl rounded-xl shadow-[0_6px_20px_rgba(22,91,57,0.14),inset_0_1.5px_2px_rgba(255,255,255,1)] border border-white/95"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 font-extrabold">Daftar Akun Baru</span>
              </button>
            </div>

            {/* Form Content */}
            {children}

          </div>
        </motion.div>
      </main>

      {/* Footer Minimal */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-xs text-slate-400 relative z-20"
      >
        <p>
          © 2026 <strong className="text-slate-600 font-semibold">i say yes</strong>. Dibuat dengan{' '}
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="inline-block"
          >
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 inline mx-0.5" />
          </motion.span>{' '}
          untuk kebahagiaan calon pengantin Indonesia.
        </p>
      </motion.footer>

    </div>
  );
};


