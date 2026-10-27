import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, Check, Sparkles, AlertCircle, X, UserPlus, UserX } from 'lucide-react';
import { authenticateWithGoogle, loginUser, type AuthUser } from '../services/authService';
import { triggerGoogleSignInPrompt, renderGoogleIdentityButton, disableGoogleAutoSelect } from '../services/googleAuth';
import { triggerLoading } from '../components/common/LottieLoader';

interface LoginProps {
  initialAlert?: string;
  onSwitchToRegister: () => void;
  onSuccessLogin?: (user: AuthUser, authType?: 'login' | 'register') => void;
}

export const Login: React.FC<LoginProps> = ({ initialAlert, onSwitchToRegister, onSuccessLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  // State untuk peringatan akun telah dihapus oleh Master
  const [accountDeletedData, setAccountDeletedData] = useState<{ email?: string; message?: string } | null>(null);
  const [showDeletedModal, setShowDeletedModal] = useState(false);

  // Cek apakah ada notifikasi akun terhapus dari sessionStorage (misal: sesi tertolak karena dihapus)
  useEffect(() => {
    try {
      const noticeRaw = sessionStorage.getItem('ij_account_deleted_notice');
      if (noticeRaw) {
        const parsed = JSON.parse(noticeRaw);
        setAccountDeletedData(parsed);
        setShowDeletedModal(true);
        sessionStorage.removeItem('ij_account_deleted_notice');
      }
    } catch {
      // ignore
    }
  }, []);

  // State untuk peringatan akun Google belum terdaftar
  const [showNotRegisteredModal, setShowNotRegisteredModal] = useState(false);
  const [unregisteredEmail, setUnregisteredEmail] = useState('');
  const [lastGoogleIdToken, setLastGoogleIdToken] = useState<string | null>(null);

  // Ref kontainer tombol resmi Google GIS
  const googleBtnWrapperRef = useRef<HTMLDivElement>(null);

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

  // Inisialisasi tombol resmi Google GIS overlay
  useEffect(() => {
    if (googleBtnWrapperRef.current) {
      renderGoogleIdentityButton(
        googleBtnWrapperRef.current,
        (credential) => {
          handleGoogleCredentialResponse(credential);
        },
        'signin_with'
      );
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setShowNotRegisteredModal(false);

    if (!email || !password) {
      setErrorMessage('Mohon lengkapi email dan password Anda.');
      return;
    }

    setIsLoading(true);
    triggerLoading(true, 'Memverifikasi Akun...', 'Mengecek email dan kata sandi Anda...');
    try {
      const res = await loginUser({ email, password });
      setLoginSuccess(true);
      triggerConfetti();

      if (onSuccessLogin) {
        setTimeout(() => onSuccessLogin(res.user), 1200);
      }
    } catch (err: any) {
      if (err.account_deleted || (err.message && err.message.toLowerCase().includes('dihapus oleh master'))) {
        setAccountDeletedData({
          email: err.email || email,
          message: err.message || 'Akun tidak ditemukan. Akun Anda telah dihapus oleh Master Administrator.'
        });
        setShowDeletedModal(true);
        setErrorMessage('');
      } else if (err.account_not_found || (err.message && err.message.toLowerCase().includes('belum terdaftar'))) {
        setErrorMessage(err.message || 'Akun tidak ditemukan. Email ini belum terdaftar di platform kami.');
      } else {
        setErrorMessage(err.message || 'Email atau kata sandi tidak cocok. Silakan coba lagi.');
      }
    } finally {
      setIsLoading(false);
      triggerLoading(false);
    }
  };

  // Memproses respon credential dari Google (baik dari GIS button overlay atau prompt fallback)
  const handleGoogleCredentialResponse = async (idToken: string) => {
    setErrorMessage('');
    setShowNotRegisteredModal(false);
    setIsLoading(true);
    triggerLoading(true, 'Menghubungkan Akun Google...', 'Memverifikasi profil Google Anda...');

    try {
      const res = await authenticateWithGoogle(idToken, 'login');
      setLoginSuccess(true);
      triggerConfetti();

      if (onSuccessLogin) {
        setTimeout(() => onSuccessLogin(res.user), 1200);
      }
    } catch (err: any) {
      console.warn('Google Login caught error:', err);
      const isAccountDeleted = err.account_deleted || (err.message && err.message.toLowerCase().includes('dihapus oleh master'));
      const isNotRegistered = err.not_registered || (err.message && err.message.toLowerCase().includes('belum terdaftar'));
      
      if (isAccountDeleted) {
        setAccountDeletedData({
          email: err.email || '',
          message: err.message || 'Akun tidak ditemukan. Akun Google Anda telah dihapus oleh Master Administrator.'
        });
        setShowDeletedModal(true);
        setErrorMessage('');
      } else if (isNotRegistered) {
        setUnregisteredEmail(err.email || '');
        setLastGoogleIdToken(idToken);
        setShowNotRegisteredModal(true);
        setErrorMessage('');
      } else {
        const rawMsg = err.message || '';
        if (/curl|timed?\s*out|connection|failed to fetch|network|load failed|server error|tokeninfo|http/i.test(rawMsg)) {
          setErrorMessage('Maaf, coba ulangi lagi.');
        } else {
          setErrorMessage(rawMsg || 'Maaf, coba ulangi lagi.');
        }
      }
    } finally {
      setIsLoading(false);
      triggerLoading(false);
    }
  };

  // Tombol fallback jika klik manual pada tombol kustom
  const handleGoogleLoginClick = async () => {
    setErrorMessage('');
    setShowNotRegisteredModal(false);
    setIsLoading(true);
    triggerLoading(true, 'Menghubungkan Akun Google...', 'Membuka dialog Google Sign-In...');

    try {
      const idToken = await triggerGoogleSignInPrompt();
      await handleGoogleCredentialResponse(idToken);
    } catch (err: any) {
      setIsLoading(false);
      triggerLoading(false);
      const msg = err.message || '';
      if (err.account_deleted || msg.toLowerCase().includes('dihapus oleh master')) {
        setAccountDeletedData({
          email: err.email || '',
          message: msg || 'Akun tidak ditemukan. Akun Google Anda telah dihapus oleh Master Administrator.'
        });
        setShowDeletedModal(true);
      } else if (msg.toLowerCase().includes('belum terdaftar')) {
        setShowNotRegisteredModal(true);
      } else if (/curl|timed?\s*out|connection|failed to fetch|network|load failed|server error|tokeninfo|http/i.test(msg)) {
        setErrorMessage('Maaf, coba ulangi lagi.');
      } else {
        setErrorMessage(msg || 'Maaf, coba ulangi lagi.');
      }
    }
  };

  // 1-Klik Mendaftar langsung dengan kredensial Google yang baru saja dipilih
  const handleQuickRegisterWithGoogle = async () => {
    if (!lastGoogleIdToken) {
      setShowNotRegisteredModal(false);
      onSwitchToRegister();
      return;
    }

    setIsLoading(true);
    triggerLoading(true, 'Mendaftarkan Akun Google...', 'Menyiapkan akun & paket studio Anda...');

    try {
      const res = await authenticateWithGoogle(lastGoogleIdToken, 'register');
      setShowNotRegisteredModal(false);
      setLoginSuccess(true);
      triggerConfetti();

      if (onSuccessLogin) {
        setTimeout(() => onSuccessLogin(res.user, 'register'), 1200);
      }
    } catch (err: any) {
      setShowNotRegisteredModal(false);
      const rawMsg = err.message || '';
      if (/curl|timed?\s*out|connection|failed to fetch|network|load failed|server error|tokeninfo|http/i.test(rawMsg)) {
        setErrorMessage('Maaf, coba ulangi lagi.');
      } else {
        setErrorMessage(rawMsg || 'Maaf, coba ulangi lagi.');
      }
    } finally {
      setIsLoading(false);
      triggerLoading(false);
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
      {/* Modal Dialog: Akun Google Belum Terdaftar */}
      <AnimatePresence>
        {showNotRegisteredModal && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-rose-100 text-slate-800 relative overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute -top-12 -right-12 w-36 h-36 bg-rose-100/70 rounded-full blur-2xl pointer-events-none" />

              {/* Close X button */}
              <button
                type="button"
                onClick={() => {
                  setShowNotRegisteredModal(false);
                  disableGoogleAutoSelect();
                }}
                className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Tutup"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center mb-4 shadow-xs">
                <AlertCircle className="w-8 h-8 stroke-[2.2]" />
              </div>

              <h3 className="text-xl font-black text-slate-900 tracking-tight mb-2">
                Akun Google Belum Terdaftar!
              </h3>
              
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                Akun Google {unregisteredEmail ? <span className="font-bold text-slate-900 underline">{unregisteredEmail}</span> : 'Anda'} belum terdaftar di platform kami. Anda <span className="text-rose-600 font-bold">tidak dapat masuk ke Dashboard Pengguna</span> tanpa mendaftar terlebih dahulu.
              </p>

              <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 mb-6 text-left space-y-1">
                <p className="text-[11px] font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  Solusi Cepat
                </p>
                <p className="text-xs text-amber-800 leading-snug">
                  Daftarkan akun sekarang menggunakan akun Google ini dalam 1-klik, atau gunakan form pendaftaran.
                </p>
              </div>

              <div className="flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={handleQuickRegisterWithGoogle}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#165b39] via-[#1b6b43] to-[#228453] hover:brightness-105 text-white font-bold text-xs sm:text-sm shadow-md hover:scale-[1.01] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <UserPlus className="w-4 h-4 text-emerald-200" />
                  <span>Daftarkan Akun Google Ini Sekarang</span>
                </button>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowNotRegisteredModal(false);
                      onSwitchToRegister();
                    }}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all cursor-pointer"
                  >
                    Form Registrasi
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowNotRegisteredModal(false);
                      disableGoogleAutoSelect();
                    }}
                    className="py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-500 hover:text-slate-700 font-medium text-xs transition-all cursor-pointer"
                  >
                    Batal / Ganti Akun
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal Dialog: Akun Telah Dihapus Oleh Master */}
      <AnimatePresence>
        {showDeletedModal && accountDeletedData && (
          <div className="fixed inset-0 z-[160] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 25 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border-2 border-rose-300 text-slate-800 relative overflow-hidden"
            >
              {/* Decorative background glow */}
              <div className="absolute -top-16 -right-16 w-44 h-44 bg-rose-200/50 rounded-full blur-3xl pointer-events-none" />

              {/* Close button */}
              <button
                type="button"
                onClick={() => {
                  setShowDeletedModal(false);
                  disableGoogleAutoSelect();
                }}
                className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Tutup"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-600 border border-rose-300 flex items-center justify-center mb-4 shadow-sm">
                <UserX className="w-9 h-9 stroke-[2.2]" />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-[11px] font-black uppercase tracking-wider mb-2">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Akun Tidak Ditemukan</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-2">
                Akun Telah Dihapus
              </h3>
              
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                Akun dengan email {accountDeletedData.email ? <strong className="text-rose-700 font-bold underline">{accountDeletedData.email}</strong> : 'Anda'} tidak ditemukan di sistem karena <strong className="text-rose-700 font-bold">telah dihapus secara permanen oleh Master Administrator</strong>.
              </p>

              <div className="p-3.5 rounded-2xl bg-rose-50/80 border border-rose-200 mb-6 text-left space-y-1">
                <p className="text-[11px] font-bold text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-rose-600" />
                  Informasi Status Akun
                </p>
                <p className="text-xs text-rose-800 leading-snug">
                  Seluruh data proyek undangan, riwayat pesanan, dan token akses terkait akun ini telah dibersihkan oleh pengelola platform.
                </p>
              </div>

              <div className="flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setShowDeletedModal(false);
                    disableGoogleAutoSelect();
                    onSwitchToRegister();
                  }}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-700 via-emerald-800 to-teal-800 hover:brightness-105 text-white font-bold text-xs sm:text-sm shadow-md hover:scale-[1.01] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <UserPlus className="w-4 h-4 text-emerald-200" />
                  <span>Daftar Akun Baru</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowDeletedModal(false);
                    disableGoogleAutoSelect();
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all cursor-pointer"
                >
                  Tutup Peringatan
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
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 backdrop-blur-md border border-emerald-500/25 text-emerald-900 text-[11px] font-black uppercase tracking-wider mb-2.5 shadow-[0_2px_10px_rgba(22,91,57,0.06),inset_0_1px_1px_rgba(255,255,255,0.8)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
          <span>Selamat Datang Kembali</span>
        </motion.div>
        
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Masuk ke Akun Anda
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed font-medium">
          Kelola &amp; pantau undangan pernikahan Anda bersama <span className="font-serif-wedding font-bold text-[#165b39]">i say yes</span>.
        </p>
      </div>

      {/* Banner Khusus: Akun Telah Dihapus Oleh Master */}
      <AnimatePresence>
        {accountDeletedData && (
          <motion.div 
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8 }}
            className="mb-5 p-4 rounded-2xl bg-rose-50/90 backdrop-blur-xl border-2 border-rose-300/90 text-rose-900 shadow-md relative overflow-hidden"
          >
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <UserX className="w-5 h-5 stroke-[2.3]" />
              </div>
              <div className="flex-1 pr-6">
                <p className="font-black text-sm text-rose-950 flex items-center gap-1.5 flex-wrap">
                  <span>Akun Tidak Ditemukan!</span>
                  <span className="text-[10px] bg-rose-200 text-rose-900 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                    Dihapus oleh Master
                  </span>
                </p>
                <p className="text-xs text-rose-800 mt-1 leading-relaxed">
                  {accountDeletedData.message || 'Akun Anda tidak ditemukan karena telah dihapus secara permanen oleh Master Administrator.'}
                </p>
                {accountDeletedData.email && (
                  <p className="text-[11px] text-rose-700 font-mono mt-1 font-semibold">
                    Email: {accountDeletedData.email}
                  </p>
                )}
                <div className="mt-2.5 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setAccountDeletedData(null);
                      onSwitchToRegister();
                    }}
                    className="text-xs font-bold text-rose-700 underline hover:text-rose-900 cursor-pointer"
                  >
                    Daftar Ulang Akun Baru →
                  </button>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setAccountDeletedData(null)}
                className="absolute top-3 right-3 text-rose-400 hover:text-rose-700 p-1 rounded-lg hover:bg-rose-100 transition-colors cursor-pointer"
                title="Tutup Pesan"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Initial Alert (misal: redirect dari route dashboard karena belum login) */}
      {initialAlert && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5 p-3.5 rounded-2xl bg-amber-50/85 backdrop-blur-md border border-amber-300 text-amber-900 text-xs flex items-start gap-2.5 shadow-xs"
        >
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
          <span className="leading-relaxed font-semibold">{initialAlert}</span>
        </motion.div>
      )}

      {/* Success Notification */}
      <AnimatePresence>
        {loginSuccess && (
          <motion.div 
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-4 rounded-2xl bg-emerald-50/90 backdrop-blur-md border border-emerald-300 text-emerald-900 text-xs font-semibold flex items-center gap-3 shadow-md shadow-emerald-900/5"
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
            className="mb-5 px-3.5 py-2.5 rounded-2xl bg-rose-50/90 backdrop-blur-md border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2 shadow-xs"
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
              className="w-full pl-10 pr-4 py-3 rounded-2xl border border-white/80 bg-white/45 hover:bg-white/65 focus:bg-white/85 backdrop-blur-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600/80 focus:ring-4 focus:ring-emerald-600/15 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.03),0_2px_8px_rgba(255,255,255,0.7)]"
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
              onClick={() => alert('Fitur reset password: Hubungi admin atau gunakan login Google.')}
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
              className="w-full pl-10 pr-11 py-3 rounded-2xl border border-white/80 bg-white/45 hover:bg-white/65 focus:bg-white/85 backdrop-blur-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600/80 focus:ring-4 focus:ring-emerald-600/15 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.03),0_2px_8px_rgba(255,255,255,0.7)]"
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
          <label className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-white/40 backdrop-blur-md border border-white/70 cursor-pointer select-none group hover:bg-white/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_2px_6px_rgba(0,0,0,0.02)] transition-all">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded-md border-white/80 bg-white/70 text-emerald-700 focus:ring-emerald-600 cursor-pointer accent-[#165b39]"
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
            className="w-full py-3.5 rounded-2xl font-black text-xs sm:text-sm text-white bg-gradient-to-r from-[#14532d] via-[#165b39] to-[#15803d] hover:brightness-105 shadow-[0_14px_30px_-6px_rgba(22,91,57,0.45),inset_0_1.5px_2px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.2)] border border-emerald-400/35 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 group overflow-hidden relative"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                <span>Memverifikasi Akun...</span>
              </div>
            ) : (
              <>
                <span>Masuk Sekarang</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </motion.button>
        </motion.div>

      </form>

      {/* Divider */}
      <div className="my-6 relative flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-300/40" />
        </div>
        <span className="relative px-3.5 py-1 rounded-full bg-white/50 backdrop-blur-md border border-white/80 text-[10px] font-black text-slate-500 uppercase tracking-widest shadow-[0_2px_8px_rgba(0,0,0,0.03),inset_0_1px_1px_rgba(255,255,255,0.9)]">
          atau masuk dengan
        </span>
      </div>

      {/* Google OAuth Button with GIS Official Overlay */}
      <div className="relative overflow-hidden rounded-2xl group w-full">
        <motion.button
          type="button"
          onClick={handleGoogleLoginClick}
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.985 }}
          className="w-full py-3 px-4 rounded-2xl border border-white/85 bg-white/55 hover:bg-white/80 backdrop-blur-xl text-xs sm:text-sm font-bold text-slate-700 flex items-center justify-center gap-2.5 shadow-[0_4px_16px_rgba(0,0,0,0.03),inset_0_1.5px_2px_rgba(255,255,255,0.95)] hover:shadow-md transition-all cursor-pointer"
        >
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          <span>Masuk Cepat dengan Google</span>
        </motion.button>

        {/* Overlay invisible resmi Google Identity Services yang merender Account Chooser popup asli */}
        <div
          ref={googleBtnWrapperRef}
          className="absolute inset-0 opacity-[0.001] z-20 overflow-hidden cursor-pointer flex items-center justify-center"
          title="Masuk dengan Akun Google"
        />
      </div>

      {/* Switch to Register link */}
      <div className="mt-7 text-center pt-1">
        <p className="text-xs sm:text-sm text-slate-600 font-medium">
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

      {/* Trust & Security footnote with Frosted Glass Pill */}
      <div className="mt-7 pt-4 border-t border-white/60 flex items-center justify-center">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/45 backdrop-blur-md border border-white/75 text-[11px] font-semibold text-slate-500 shadow-[0_2px_8px_rgba(0,0,0,0.02),inset_0_1px_1px_rgba(255,255,255,0.9)]">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Keamanan akun terenkripsi 256-bit SSL</span>
        </div>
      </div>

    </motion.div>
  );
};
