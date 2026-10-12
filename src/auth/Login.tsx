import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, Check, Sparkles, AlertCircle, X } from 'lucide-react';
import { authenticateWithGoogle, loginUser } from '../services/authService';
import { triggerGoogleSignInPrompt } from '../services/googleAuth';

interface LoginProps {
  onSwitchToRegister: () => void;
  onSuccessLogin?: (user: { name?: string; email: string; avatar?: string }) => void;
}

export const Login: React.FC<LoginProps> = ({ onSwitchToRegister, onSuccessLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [showNotRegisteredPopup, setShowNotRegisteredPopup] = useState(false);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#165b39', '#d4a359', '#10462b', '#edd087', '#f43f5e'],
      });
    } catch {
      // fallback silent
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Mohon lengkapi email dan password Anda.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await loginUser({ email, password });
      setLoginSuccess(true);
      triggerConfetti();

      if (onSuccessLogin) {
        setTimeout(() => onSuccessLogin({ name: res.user.name, email: res.user.email, avatar: res.user.avatar }), 1200);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Email atau kata sandi tidak cocok. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (showNotRegisteredPopup) {
      const timer = setTimeout(() => {
        setShowNotRegisteredPopup(false);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [showNotRegisteredPopup]);

  const handleGoogleLogin = async () => {
    setErrorMessage('');
    setShowNotRegisteredPopup(false);
    setIsLoading(true);
    try {
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
      if (!clientId) {
        setErrorMessage(
          'VITE_GOOGLE_CLIENT_ID belum diatur di file .env frontend. Tambahkan Client ID Google OAuth Anda.'
        );
        setIsLoading(false);
        return;
      }

      const idToken = await triggerGoogleSignInPrompt();
      const res = await authenticateWithGoogle(idToken, 'login');

      setLoginSuccess(true);
      triggerConfetti();
      if (onSuccessLogin) {
        setTimeout(() => onSuccessLogin({ name: res.user.name, email: res.user.email, avatar: res.user.avatar }), 1200);
      }
    } catch (err: any) {
      const msg = err.message || '';
      if (msg.toLowerCase().includes('belum terdaftar')) {
        setShowNotRegisteredPopup(true);
        setErrorMessage('');
      } else {
        setErrorMessage(msg || 'Gagal masuk dengan Google.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="w-full max-w-md mx-auto relative"
    >
      {/* Small Popup Alert: Anda Belum Terdaftar */}
      <AnimatePresence>
        {showNotRegisteredPopup && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-sm pointer-events-auto">
            <motion.div
              initial={{ opacity: 0, y: -25, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="bg-slate-900/95 text-white backdrop-blur-md px-4 py-3 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.45)] border border-rose-500/40 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/40 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-4 h-4" />
                </div>
                <div className="min-w-0 text-left">
                  <p className="text-xs font-bold text-white leading-tight">Anda Belum Terdaftar</p>
                  <p className="text-[11px] text-slate-300 truncate">Silakan daftar akun terlebih dahulu</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setShowNotRegisteredPopup(false);
                    onSwitchToRegister();
                  }}
                  className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white text-[11px] font-bold shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
                >
                  Daftar
                </button>
                <button
                  type="button"
                  onClick={() => setShowNotRegisteredPopup(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Tutup"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* Header Form */}
      <div className="mb-7 text-center sm:text-left">
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-[11px] font-bold uppercase tracking-wider mb-2.5 shadow-2xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
          <span>Selamat Datang Kembali</span>
        </motion.div>
        
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Masuk ke Akun Anda
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
          Kelola &amp; pantau undangan pernikahan Anda bersama <span className="font-serif-wedding font-bold text-[#165b39]">i say yes</span>.
        </p>
      </div>

      {/* Success Notification */}
      <AnimatePresence>
        {loginSuccess && (
          <motion.div 
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-semibold flex items-center gap-3 shadow-md shadow-emerald-900/5"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Check className="w-4 h-4 stroke-[3]" />
            </div>
            <div>
              <p className="font-bold text-sm text-emerald-950">Masuk Berhasil! 🎉</p>
              <p className="text-[11px] text-emerald-700">Mengalihkan ke dashboard undangan Anda...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Message Biasa */}
      <AnimatePresence>
        {errorMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="mb-5 px-3.5 py-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2 shadow-xs"
          >
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span className="leading-snug">{errorMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Email or WhatsApp input */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Email / Nomor WhatsApp
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#165b39] transition-colors">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com atau 0812xxxx"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 transition-all shadow-xs"
              required
            />
          </div>
        </motion.div>

        {/* Password input */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Kata Sandi (Password)
            </label>
            <button
              type="button"
              onClick={() => alert('Fitur reset password: Tautan pemulihan akan dikirimkan ke email terdaftar Anda.')}
              className="text-xs font-semibold text-[#165b39] hover:text-emerald-700 hover:underline cursor-pointer"
            >
              Lupa Password?
            </button>
          </div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#165b39] transition-colors">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password Anda"
              className="w-full pl-10 pr-11 py-3 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 transition-all shadow-xs"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </motion.div>

        {/* Remember Me */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="flex items-center justify-between pt-1"
        >
          <label className="flex items-center gap-2.5 cursor-pointer select-none group">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-emerald-700 focus:ring-emerald-600 cursor-pointer accent-[#165b39]"
            />
            <span className="text-xs text-slate-600 font-medium group-hover:text-slate-900 transition-colors">
              Ingat saya di perangkat ini
            </span>
          </label>
        </motion.div>

        {/* Submit Button */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="pt-2"
        >
          <motion.button
            type="submit"
            disabled={isLoading || loginSuccess}
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            className="w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#165b39] via-[#1f6e47] to-[#b38b38] hover:brightness-105 shadow-lg shadow-emerald-950/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                <span>Memverifikasi Akun...</span>
              </div>
            ) : (
              <>
                <span>Masuk Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </motion.div>

      </form>

      {/* Divider */}
      <div className="my-6 relative flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200/80" />
        </div>
        <span className="relative px-3 bg-white text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          atau masuk dengan
        </span>
      </div>

      {/* Google OAuth Button */}
      <motion.button
        type="button"
        onClick={handleGoogleLogin}
        whileHover={{ scale: 1.015, backgroundColor: '#f8fafc' }}
        whileTap={{ scale: 0.985 }}
        className="w-full py-3 px-4 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-700 flex items-center justify-center gap-2.5 shadow-xs hover:shadow-md transition-all cursor-pointer"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path
            fill="#EA4335"
            d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.3 8.8 5 12 5z"
          />
          <path
            fill="#4285F4"
            d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5.1 3.7-8.8z"
          />
          <path
            fill="#FBBC05"
            d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.3s.1-1.6.4-2.3L1.6 7.2C.6 9.2 0 11.5 0 14s.6 4.8 1.6 6.8l3.7-2.9z"
          />
          <path
            fill="#34A853"
            d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.2 0-5.8-2.3-6.7-5.3L1.6 16C3.5 19.8 7.4 23 12 23z"
          />
        </svg>
        <span>Masuk Cepat dengan Google</span>
      </motion.button>

      {/* Switch to Register link */}
      <div className="mt-7 text-center pt-1">
        <p className="text-xs sm:text-sm text-slate-600">
          Belum memiliki akun?{' '}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="font-extrabold text-[#165b39] hover:underline cursor-pointer"
          >
            Daftar Akun Baru Gratis
          </button>
        </p>
      </div>

      {/* Trust & Security footnote */}
      <div className="mt-7 pt-4 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
        <span>Keamanan akun terenkripsi 256-bit SSL</span>
      </div>

    </motion.div>
  );
};

