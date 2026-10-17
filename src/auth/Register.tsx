import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { User, Mail, Phone, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, Check, Sparkles, AlertCircle, X } from 'lucide-react';
import { authenticateWithGoogle, registerUser } from '../services/authService';
import { triggerGoogleSignInPrompt, renderGoogleIdentityButton } from '../services/googleAuth';
import { triggerLoading } from '../components/common/LottieLoader';

interface RegisterProps {
  onSwitchToLogin: () => void;
  onSuccessRegister?: (data: { name: string; email: string; avatar?: string }) => void;
}

export const Register: React.FC<RegisterProps> = ({ onSwitchToLogin, onSuccessRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [showAlreadyRegisteredPopup, setShowAlreadyRegisteredPopup] = useState(false);

  const googleBtnWrapperRef = useRef<HTMLDivElement>(null);

  // Compute password strength (0 to 4)
  const getPasswordStrength = (pass: string) => {
    if (!pass) return 0;
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 10) score += 1;
    if (/[A-Z]/.test(pass) || /[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return score;
  };

  const passStrength = getPasswordStrength(password);

  const getStrengthLabel = (score: number) => {
    switch (score) {
      case 1:
        return { label: 'Lemah', color: 'bg-rose-500', text: 'text-rose-600' };
      case 2:
        return { label: 'Sedang', color: 'bg-amber-500', text: 'text-amber-600' };
      case 3:
        return { label: 'Kuat', color: 'bg-emerald-500', text: 'text-emerald-600' };
      case 4:
        return { label: 'Sangat Kuat 🔒', color: 'bg-emerald-600', text: 'text-emerald-700 font-bold' };
      default:
        return { label: '', color: 'bg-slate-200', text: 'text-slate-400' };
    }
  };

  const strengthMeta = getStrengthLabel(passStrength);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#165b39', '#d4a359', '#22c55e', '#fbbf24', '#e11d48'],
      });
    } catch {
      // silent fallback
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name || !email || !phone || !password) {
      setErrorMessage('Mohon lengkapi seluruh formulir pendaftaran.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Kata sandi minimal harus 6 karakter.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Konfirmasi kata sandi tidak cocok.');
      return;
    }

    if (!agreeTerms) {
      setErrorMessage('Anda harus menyetujui Syarat & Ketentuan untuk melanjutkan.');
      return;
    }

    setIsLoading(true);
    triggerLoading(true, 'Mendaftarkan Akun...', 'Menyiapkan akun & paket layanan Anda...');
    try {
      const res = await registerUser({ name, email, phone, password });
      setRegisterSuccess(true);
      triggerConfetti();

      if (onSuccessRegister) {
        setTimeout(() => onSuccessRegister({ name: res.user.name || name, email: res.user.email, avatar: res.user.avatar }), 1200);
      }
    } catch (err: any) {
      const msg = err.message || 'Gagal mendaftar akun. Silakan coba lagi.';
      setErrorMessage(msg);
      if (msg.toLowerCase().includes('sudah terdaftar')) {
        setShowAlreadyRegisteredPopup(true);
      }
    } finally {
      setIsLoading(false);
      triggerLoading(false);
    }
  };

  useEffect(() => {
    if (googleBtnWrapperRef.current) {
      renderGoogleIdentityButton(
        googleBtnWrapperRef.current,
        (credential) => {
          handleGoogleCredentialRegister(credential);
        },
        'signup_with'
      );
    }
  }, []);

  const handleGoogleCredentialRegister = async (idToken: string) => {
    setErrorMessage('');
    setIsLoading(true);
    triggerLoading(true, 'Menghubungkan Akun Google...', 'Mendaftarkan profil Google Anda...');
    try {
      const res = await authenticateWithGoogle(idToken, 'register');

      setRegisterSuccess(true);
      triggerConfetti();
      if (onSuccessRegister) {
        setTimeout(() => onSuccessRegister({ name: res.user.name || 'Pengguna Google', email: res.user.email, avatar: res.user.avatar }), 1200);
      }
    } catch (err: any) {
      const msg = err.message || 'Gagal mendaftar dengan Google.';
      setErrorMessage(msg);
      if (msg.toLowerCase().includes('sudah terdaftar')) {
        setShowAlreadyRegisteredPopup(true);
      }
    } finally {
      setIsLoading(false);
      triggerLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setErrorMessage('');
    setIsLoading(true);
    triggerLoading(true, 'Menghubungkan Akun Google...', 'Mendaftarkan profil Google Anda...');
    try {
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
      if (!clientId) {
        setErrorMessage(
          'VITE_GOOGLE_CLIENT_ID belum diatur di file .env frontend. Tambahkan Client ID Google OAuth Anda.'
        );
        setIsLoading(false);
        triggerLoading(false);
        return;
      }

      const idToken = await triggerGoogleSignInPrompt();
      await handleGoogleCredentialRegister(idToken);
    } catch (err: any) {
      setIsLoading(false);
      triggerLoading(false);
      const msg = err.message || 'Gagal mendaftar dengan Google.';
      setErrorMessage(msg);
      if (msg.toLowerCase().includes('sudah terdaftar')) {
        setShowAlreadyRegisteredPopup(true);
      }
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
      {/* Small Popup Alert: Anda Sudah Terdaftar */}
      <AnimatePresence>
        {showAlreadyRegisteredPopup && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-sm pointer-events-auto">
            <motion.div
              initial={{ opacity: 0, y: -25, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="bg-slate-900/95 text-white backdrop-blur-md px-4 py-3 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.45)] border border-amber-500/40 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-4 h-4" />
                </div>
                <div className="min-w-0 text-left">
                  <p className="text-xs font-bold text-white leading-tight">Anda Sudah Terdaftar</p>
                  <p className="text-[11px] text-slate-300 truncate">Email / akun ini sudah memiliki akun</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setShowAlreadyRegisteredPopup(false);
                    onSwitchToLogin();
                  }}
                  className="px-2.5 py-1 rounded-lg bg-[#165b39] hover:bg-[#1a6e45] text-white text-[11px] font-bold transition-colors cursor-pointer"
                >
                  Masuk
                </button>
                <button
                  type="button"
                  onClick={() => setShowAlreadyRegisteredPopup(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* Header Form */}
      <div className="mb-6 text-center sm:text-left">
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-[11px] font-bold uppercase tracking-wider mb-2 shadow-2xs"
        >
          <Sparkles className="w-3 h-3 text-amber-500 animate-pulse" />
          <span>Daftar Gratis 1 Menit</span>
        </motion.div>
        
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Buat Akun Baru
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
          Mulai buat undangan pernikahan digital cantik Anda bersama <span className="font-serif-wedding font-bold text-[#165b39]">i say yes</span>.
        </p>
      </div>

      {/* Success Notification */}
      <AnimatePresence>
        {registerSuccess && (
          <motion.div 
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-5 p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-semibold flex items-center gap-3 shadow-md shadow-emerald-900/5"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Check className="w-4 h-4 stroke-[3]" />
            </div>
            <div>
              <p className="font-bold text-sm text-emerald-950">Pendaftaran Berhasil! 🎉</p>
              <p className="text-[11px] text-emerald-700">Akun Anda siap digunakan. Mengarahkan ke pemilihan template undangan...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Message */}
      <AnimatePresence>
        {errorMessage && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="mb-5 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex flex-col gap-2.5 shadow-sm"
          >
            <div className="flex items-start gap-2">
              <span className="shrink-0 mt-0.5 text-sm">⚠️</span>
              <span className="leading-relaxed font-semibold">{errorMessage}</span>
            </div>
            {errorMessage.toLowerCase().includes('sudah terdaftar') && (
              <div className="pt-2 border-t border-rose-200 flex items-center justify-between">
                <span className="text-[11px] text-rose-600">Sudah memiliki akun?</span>
                <button
                  type="button"
                  onClick={onSwitchToLogin}
                  className="px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-sm"
                >
                  Masuk Sekarang &rarr;
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-3.5">
        
        {/* Full Name */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Nama Lengkap Calon Pengantin / Pemesan
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#165b39] transition-colors">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Dimas & Anindya"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 transition-all shadow-xs"
              required
            />
          </div>
        </motion.div>

        {/* Email */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Alamat Email Aktif
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#165b39] transition-colors">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="emailkamu@gmail.com"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 transition-all shadow-xs"
              required
            />
          </div>
        </motion.div>

        {/* WhatsApp Phone */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Nomor WhatsApp (Aktif)
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#165b39] transition-colors">
              <Phone className="w-4 h-4" />
            </div>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0812xxxxxxxx (untuk notifikasi RSVP tamu)"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 transition-all shadow-xs"
              required
            />
          </div>
        </motion.div>

        {/* Password */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }}>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Kata Sandi (Minimal 6 karakter)
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#165b39] transition-colors">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Buat password yang kuat"
              className="w-full pl-10 pr-11 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 transition-all shadow-xs"
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

          {/* Interactive Password Strength Meter */}
          {password && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-2 space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-500 font-medium">Kekuatan Password:</span>
                <span className={`font-semibold ${strengthMeta.text}`}>{strengthMeta.label}</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex gap-1">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`h-full flex-1 rounded-full transition-all duration-300 ${
                      passStrength >= step ? strengthMeta.color : 'bg-slate-200'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Confirm Password */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Ulangi Kata Sandi
            </label>
            {confirmPassword && (
              <span className={`text-[11px] font-semibold flex items-center gap-1 ${password === confirmPassword ? 'text-emerald-600' : 'text-rose-500'}`}>
                {password === confirmPassword ? '✓ Cocok' : '✕ Tidak cocok'}
              </span>
            )}
          </div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#165b39] transition-colors">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Ketik ulang kata sandi Anda"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 transition-all shadow-xs"
              required
            />
          </div>
        </motion.div>

        {/* Terms agreement */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.32 }} className="pt-1">
          <label className="flex items-start gap-2.5 cursor-pointer select-none group">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="w-4 h-4 mt-0.5 rounded border-slate-300 text-emerald-700 focus:ring-emerald-600 cursor-pointer accent-[#165b39] shrink-0"
            />
            <span className="text-[11px] text-slate-600 leading-relaxed group-hover:text-slate-800 transition-colors">
              Saya menyetujui <span className="font-semibold text-slate-800">Syarat &amp; Ketentuan</span> dan <span className="font-semibold text-slate-800">Kebijakan Privasi</span> platform <strong className="text-emerald-800">i say yes</strong>.
            </span>
          </label>
        </motion.div>

        {/* Submit Button */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.36 }} className="pt-2">
          <motion.button
            type="submit"
            disabled={isLoading || registerSuccess}
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            className="w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#165b39] via-[#1f6e47] to-[#b38b38] hover:brightness-105 shadow-lg shadow-emerald-950/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                <span>Mendaftarkan Akun...</span>
              </div>
            ) : (
              <>
                <span>Daftar Akun Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </motion.div>

      </form>

      {/* Divider */}
      <div className="my-5 relative flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200/80" />
        </div>
        <span className="relative px-3 bg-white text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          atau daftar dengan
        </span>
      </div>

      {/* Google OAuth Button with GIS Official Overlay */}
      <div className="relative overflow-hidden rounded-xl group w-full">
        <motion.button
          type="button"
          onClick={handleGoogleRegister}
          whileHover={{ scale: 1.015, backgroundColor: '#f8fafc' }}
          whileTap={{ scale: 0.985 }}
          className="w-full py-2.5 px-4 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-700 flex items-center justify-center gap-2.5 shadow-xs hover:shadow-md transition-all cursor-pointer"
        >
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
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
          <span>Daftar Cepat dengan Google</span>
        </motion.button>

        {/* Overlay invisible resmi Google Identity Services */}
        <div
          ref={googleBtnWrapperRef}
          className="absolute inset-0 opacity-[0.001] z-20 overflow-hidden cursor-pointer flex items-center justify-center"
          title="Daftar dengan Akun Google"
        />
      </div>

      {/* Switch to Login link */}
      <div className="mt-5 text-center pt-1">
        <p className="text-xs sm:text-sm text-slate-600">
          Sudah memiliki akun?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="font-extrabold text-[#165b39] hover:underline cursor-pointer"
          >
            Masuk di Sini
          </button>
        </p>
      </div>

      {/* Trust & Security footnote */}
      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
        <span>Data privasi calon pengantin terlindungi 100%</span>
      </div>

    </motion.div>
  );
};
