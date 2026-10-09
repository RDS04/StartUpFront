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
    <div className="min-h-screen bg-[#fafbfc] text-slate-800 flex flex-col justify-between selection:bg-emerald-700 selection:text-white relative overflow-hidden font-sans">
      
      {/* Animated Floating Particles Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
        {FLOATING_PARTICLES.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-tr from-amber-300/40 to-emerald-400/40 blur-[1px]"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -35, 0],
              x: [0, 15, 0],
              opacity: [0.2, 0.7, 0.2],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: particle.delay,
            }}
          />
        ))}

        {/* Dynamic Light Orbs */}
        <motion.div
          className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-40 right-0 w-[500px] h-[500px] bg-amber-100/40 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Top Botanical Leaves Background */}
      <BotanicalLeaves.TopRight />
      <GoldFoilSplash className="absolute top-12 left-8 w-28 h-28 opacity-20 pointer-events-none" />

      {/* Top Navbar Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between relative z-30"
      >
        {/* Brand Logo */}
        <motion.div 
          onClick={onBackToHome}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <WeddingRingsIcon className="w-9 h-9 group-hover:rotate-6 transition-transform duration-300 drop-shadow-sm" />
          <span className="font-serif-wedding text-2xl font-bold tracking-normal text-slate-900 lowercase">
            i say yes
          </span>
        </motion.div>

        {/* Back to Home Button */}
        <motion.button
          onClick={onBackToHome}
          whileHover={{ scale: 1.05, x: -2 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-slate-700 hover:text-[#165b39] bg-white/90 hover:bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer"
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
          <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl border border-slate-200/90 shadow-[0_20px_60px_rgba(20,77,49,0.09)] p-6 sm:p-9 relative overflow-hidden">
            
            {/* Gold gradient top border highlight */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#165b39] via-[#d4a359] to-[#165b39]" />

            {/* Animated Mode Switcher Tabs */}
            <div className="flex rounded-2xl bg-slate-100/90 p-1.5 mb-7 select-none relative shadow-inner">
              <button
                type="button"
                onClick={() => onSwitchMode('login')}
                className={`relative flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer z-10 ${
                  activeMode === 'login' ? 'text-[#165b39]' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {activeMode === 'login' && (
                  <motion.div
                    layoutId="activeAuthTab"
                    className="absolute inset-0 bg-white rounded-xl shadow-md"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 font-extrabold">Masuk ke Akun</span>
              </button>

              <button
                type="button"
                onClick={() => onSwitchMode('register')}
                className={`relative flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer z-10 ${
                  activeMode === 'register' ? 'text-[#165b39]' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {activeMode === 'register' && (
                  <motion.div
                    layoutId="activeAuthTab"
                    className="absolute inset-0 bg-white rounded-xl shadow-md"
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


