import React from 'react';
import { 
  Home, 
  LogOut, 
  Sparkles, 
  CreditCard, 
  ArrowRight, 
  Eye, 
  ShieldCheck,
  Mail,
  Calendar
} from 'lucide-react';
import { motion } from 'framer-motion';
import type { AuthUser } from '../services/authService';
import { BotanicalLeaves } from '../landingPage/DecorativeBackground';

interface DashboardPageProps {
  currentUser: AuthUser | null;
  onLogout: () => void;
  onBackToHome: () => void;
  onNavigatePricing: () => void;
  onNavigateTemplates: () => void;
  onNavigatePayment: () => void;
  onPreviewTemplate: (route: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  currentUser,
  onLogout,
  onBackToHome,
  onNavigatePricing,
  onNavigateTemplates,
  onNavigatePayment,
  onPreviewTemplate,
}) => {
  // Ambil state paket & template dari session storage jika ada
  const savedPlan = (() => {
    try {
      const raw = sessionStorage.getItem('ij_selected_plan');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  })();

  const savedTemplate = (() => {
    try {
      const raw = sessionStorage.getItem('ij_selected_template');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  })();

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ebf5ee] via-[#f5fbf7] to-[#e4f1e9] text-slate-800 pt-5 pb-24 px-3 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Outer Luxury Curved Frame */}
      <div className="absolute inset-2 sm:inset-4 border-2 border-emerald-600/20 rounded-[32px] sm:rounded-[44px] pointer-events-none z-0" />

      {/* Signature Botanical Leaves Corner */}
      <BotanicalLeaves.TopRight />
      <BotanicalLeaves.BottomLeft />

      {/* Ambient Lights */}
      <div className="absolute -top-24 left-1/4 w-[500px] h-[500px] bg-emerald-400/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-6 w-[450px] h-[450px] bg-amber-300/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Navigation Bar with Glass Pills */}
      <div className="max-w-6xl mx-auto flex items-center justify-between mb-8 pb-4 relative z-10">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/80 hover:bg-white border border-white/95 text-xs font-bold text-slate-700 hover:text-emerald-900 shadow-sm backdrop-blur-xl transition-all cursor-pointer group"
        >
          <Home className="w-4 h-4 text-emerald-700 group-hover:-translate-x-0.5 transition-transform" />
          <span>Kembali ke Beranda</span>
        </button>

        <div className="flex items-center gap-3">
          {/* Badge Terverifikasi */}
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-white/85 backdrop-blur-xl border border-white/95 shadow-[0_4px_20px_rgba(16,185,129,0.12)] text-xs font-black text-emerald-950">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 ring-4 ring-emerald-400/25 animate-pulse" />
            <span>Verifikasi 100% Otomatis</span>
          </div>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 hover:bg-rose-100 border border-rose-200 text-xs font-bold text-rose-700 shadow-sm transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10 space-y-8">
        
        {/* Welcome Glass Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 sm:p-8 rounded-[32px] bg-white/80 backdrop-blur-2xl border-2 border-white/95 shadow-[0_15px_40px_rgba(16,185,129,0.1)] relative overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#124d31] to-[#1c6e46] text-white flex items-center justify-center text-xl font-black border-2 border-emerald-400/50 shadow-lg overflow-hidden shrink-0">
                {currentUser?.avatar ? (
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.name || currentUser.email} 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span>{(currentUser?.name || currentUser?.email || 'U')[0].toUpperCase()}</span>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300/80 inline-flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    Member Terverifikasi
                  </span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    Sesi Aktif
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-emerald-950">
                  Selamat Datang, {currentUser?.name || currentUser?.email?.split('@')[0]}!
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  {currentUser?.email || 'Akun Pengguna'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={onNavigatePricing}
                className="flex-1 sm:flex-initial px-5 py-2.5 rounded-full text-xs font-black text-white bg-[#10432a] hover:bg-[#0c3521] border border-emerald-400/50 shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Pilih / Ubah Paket</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Status Pesanan & Undangan Aktif (3 Glass Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Card 1: Paket Terpilih */}
          <div className="p-5 rounded-3xl bg-white/75 backdrop-blur-xl border border-white/95 shadow-[0_10px_30px_rgba(0,0,0,0.04)] relative flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="text-[11px] font-black tracking-wider text-slate-400 uppercase">1. Paket Undangan</span>
                <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-xs">
                  💎
                </div>
              </div>
              <h3 className="text-base font-black text-slate-900 mb-1">
                {savedPlan ? savedPlan.name : 'Belum Memilih Paket'}
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                {savedPlan ? `Nominal: ${formatRupiah(savedPlan.price)}` : 'Pilih paket harga sesuai kebutuhan acara Anda.'}
              </p>
            </div>
            <button
              onClick={onNavigatePricing}
              className="w-full py-2 rounded-xl bg-slate-100 hover:bg-emerald-50 text-emerald-900 text-xs font-bold border border-slate-200/80 hover:border-emerald-300 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>{savedPlan ? 'Ganti Paket' : 'Pilih Paket Sekarang'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: Desain Template */}
          <div className="p-5 rounded-3xl bg-white/75 backdrop-blur-xl border border-white/95 shadow-[0_10px_30px_rgba(0,0,0,0.04)] relative flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="text-[11px] font-black tracking-wider text-slate-400 uppercase">2. Desain Template</span>
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-xs">
                  🎨
                </div>
              </div>
              <h3 className="text-base font-black text-slate-900 mb-1">
                {savedTemplate ? savedTemplate.name : 'Belum Memilih Desain'}
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                {savedTemplate ? savedTemplate.category || 'Desain Elegan' : 'Pilih dari katalog tema pernikahan eksklusif.'}
              </p>
            </div>
            <button
              onClick={onNavigateTemplates}
              className="w-full py-2 rounded-xl bg-slate-100 hover:bg-emerald-50 text-emerald-900 text-xs font-bold border border-slate-200/80 hover:border-emerald-300 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>{savedTemplate ? 'Ganti Desain' : 'Pilih Desain Template'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3: Status Transaksi */}
          <div className="p-5 rounded-3xl bg-white/75 backdrop-blur-xl border border-white/95 shadow-[0_10px_30px_rgba(0,0,0,0.04)] relative flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="text-[11px] font-black tracking-wider text-slate-400 uppercase">3. Pembayaran</span>
                <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold text-xs">
                  <CreditCard className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-base font-black text-slate-900 mb-1">
                {savedPlan && savedTemplate ? 'Siap Checkout' : 'Menunggu Pilihan'}
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                {savedPlan && savedTemplate 
                  ? 'Paket & Template siap diproses ke rincian pembayaran instan.' 
                  : 'Selesaikan langkah 1 & 2 untuk menuju pembayaran.'}
              </p>
            </div>
            <button
              onClick={onNavigatePayment}
              disabled={!savedPlan}
              className={`w-full py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                savedPlan 
                  ? 'bg-[#10432a] text-white hover:bg-[#0c3521] shadow-sm cursor-pointer' 
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>Buka Menu Pembayaran</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Template Showcase Quick Previews */}
        <div className="p-6 sm:p-8 rounded-[32px] bg-white/80 backdrop-blur-2xl border-2 border-white/95 shadow-[0_15px_40px_rgba(16,185,129,0.08)]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">Katalog Pilihan</span>
              <h2 className="text-lg sm:text-xl font-black text-emerald-950">Pratinjau Desain Undangan Digital</h2>
            </div>
            <button
              onClick={onNavigateTemplates}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 group cursor-pointer"
            >
              <span>Lihat Semua di Beranda</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Item 1 */}
            <div className="rounded-2xl p-4 bg-white/90 border border-slate-100 shadow-sm hover:shadow-md transition-all">
              <div className="h-32 rounded-xl overflow-hidden mb-3 relative group">
                <img 
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=500&q=80" 
                  alt="Rustic Blossom" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950">
                  FAVORIT
                </span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Rustic Blossom</h4>
              <p className="text-[11px] text-slate-500 mb-3">Elegan & Mewah Burgundy Gold</p>
              <button
                onClick={() => onPreviewTemplate('template-satu')}
                className="w-full py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1"
              >
                <Eye className="w-3 h-3" />
                <span>Lihat Live Demo</span>
              </button>
            </div>

            {/* Item 2 */}
            <div className="rounded-2xl p-4 bg-white/90 border border-slate-100 shadow-sm hover:shadow-md transition-all">
              <div className="h-32 rounded-xl overflow-hidden mb-3 relative group">
                <img 
                  src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=500&q=80" 
                  alt="Dusty Rose Lily" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white">
                  ROMANTIS
                </span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Dusty Rose Lily</h4>
              <p className="text-[11px] text-slate-500 mb-3">Soft Pastel Floral & Modern</p>
              <button
                onClick={() => onPreviewTemplate('template-dua')}
                className="w-full py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1"
              >
                <Eye className="w-3 h-3" />
                <span>Lihat Live Demo</span>
              </button>
            </div>

            {/* Item 3 */}
            <div className="rounded-2xl p-4 bg-white/90 border border-slate-100 shadow-sm hover:shadow-md transition-all">
              <div className="h-32 rounded-xl overflow-hidden mb-3 relative group">
                <img 
                  src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=500&q=80" 
                  alt="Royal ATM Card" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white">
                  3D KARTU ATM
                </span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Royal ATM Card</h4>
              <p className="text-[11px] text-slate-500 mb-3">Amplop Digital 3D Eksklusif</p>
              <button
                onClick={() => onPreviewTemplate('card-atm')}
                className="w-full py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1"
              >
                <Eye className="w-3 h-3" />
                <span>Buka Preview 3D</span>
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
