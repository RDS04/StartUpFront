import React from 'react';
import {
  Heart,
  Users,
  Calendar,
  MessageSquare,
  Share2,
  Copy,
  Check,
  X,
  QrCode,
  ArrowRight,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import type { DashboardData, GuestItem, WishItem, TierConfig, DashboardTab } from '../types';
import { getTemplateDisplayName } from '../templateHelpers';

interface OverviewSectionProps {
  data: DashboardData;
  guests: GuestItem[];
  wishes: WishItem[];
  tierConfig: TierConfig;
  stats: {
    hadir: number;
    tidak: number;
    menunggu: number;
    totalWishes: number;
  };
  onCopyLink: (text: string, label?: string) => void;
  onOpenQrModal: () => void;
  onNavigateTab: (tab: DashboardTab) => void;
  onOpenActiveTemplates?: () => void;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({
  data,
  guests,
  wishes,
  tierConfig,
  stats,
  onCopyLink,
  onOpenQrModal,
  onNavigateTab,
  onOpenActiveTemplates,
}) => {
  const origin = typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.host}` : 'http://localhost:5173';
  const effectiveSlug = data.slug || (data.groom.nickName && data.bride.nickName ? `${data.groom.nickName}-${data.bride.nickName}`.toLowerCase().replace(/[^a-z0-9-]/g, '') : '') || 'nama-pasangan';
  const publicLink = `${origin}/#/${effectiveSlug}`;
  const displayHost = typeof window !== 'undefined' ? `${window.location.host}/#/${effectiveSlug}` : `localhost:5173/#/${effectiveSlug}`;

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header Banner Publikasi Live */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-[#1B4332] text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-lg border border-stone-800">
        <div className="relative z-10 max-w-xl">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Undangan Telah Dipublikasikan (Live Localhost)
            </span>
            {onOpenActiveTemplates ? (
              <button
                type="button"
                onClick={onOpenActiveTemplates}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#D4AF37]/20 hover:bg-[#D4AF37]/35 text-[#F3E5AB] border border-[#D4AF37]/30 transition cursor-pointer"
                title="Klik untuk melihat koleksi template & beralih template aktif"
              >
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                <span>{getTemplateDisplayName(data.activeTemplateId)}</span>
                <span className="text-[9px] underline ml-1 opacity-75">Ubah</span>
              </button>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#D4AF37]/20 text-[#F3E5AB] border border-[#D4AF37]/30">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                {getTemplateDisplayName(data.activeTemplateId)}
              </span>
            )}
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
            {data.groom.nickName && data.bride.nickName
              ? `${data.groom.nickName} & ${data.bride.nickName}`
              : (data.groom.nickName || data.bride.nickName || 'Nama Pengantin (Belum Diisi)')}
          </h1>

          <p className="text-stone-300 text-xs sm:text-sm mb-5 leading-relaxed">
            Tautan undangan localhost Anda siap diuji dan dibuka di browser. Tampilan undangan otomatis mengikuti template yang dipilih.
          </p>

          {/* Public Link Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-stone-800/90 p-2 rounded-2xl border border-stone-700">
            <div className="flex items-center px-3 text-xs text-stone-200 font-mono flex-1 overflow-x-auto select-all">
              {displayHost}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onCopyLink(publicLink, 'Tautan undangan localhost berhasil disalin!')}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 bg-[#D4AF37] hover:bg-[#c49f2e] text-stone-950 rounded-xl text-xs font-bold transition cursor-pointer shadow-xs"
              >
                <Copy className="w-3.5 h-3.5" /> Salin Link
              </button>
              <a
                href={publicLink}
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition cursor-pointer shadow-xs"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Buka Undangan
              </a>
              <button
                onClick={onOpenQrModal}
                className="px-3.5 py-2 bg-stone-700/80 hover:bg-stone-600 text-white rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 border border-stone-600"
              >
                <QrCode className="w-3.5 h-3.5 text-stone-300" /> QR
              </button>
            </div>
          </div>
        </div>

        {/* Decorative Background Heart */}
        <div className="absolute -right-6 -bottom-10 opacity-10 pointer-events-none">
          <Heart className="w-80 h-80 text-white" />
        </div>
      </div>

      {/* Statistics Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Tamu */}
        <div className="bg-[#FAF7F2] p-4.5 rounded-2xl border border-stone-200 shadow-xs hover:border-stone-300 transition">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-medium">Total Tamu</span>
            <Users className="w-4 h-4 text-stone-400" />
          </div>
          <p className="text-2xl font-bold text-stone-900">{guests.length}</p>
          <p className="text-[11px] text-stone-500 mt-1">
            Batas kuota: {tierConfig.maxGuests === 9999 ? 'Unlimited' : `${tierConfig.maxGuests} tamu`}
          </p>
        </div>

        {/* Hadir */}
        <div className="bg-emerald-50/70 p-4.5 rounded-2xl border border-emerald-200/70 shadow-xs hover:border-emerald-300 transition">
          <div className="flex items-center justify-between text-emerald-700 mb-2">
            <span className="text-xs font-medium">Konfirmasi Hadir</span>
            <Check className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-emerald-950">
            {stats.hadir} <span className="text-xs font-normal text-emerald-700">pax kursi</span>
          </p>
          <p className="text-[11px] text-emerald-700 mt-1 font-medium">Estimasi katering aktif</p>
        </div>

        {/* Berhalangan */}
        <div className="bg-rose-50/70 p-4.5 rounded-2xl border border-rose-200/70 shadow-xs hover:border-rose-300 transition">
          <div className="flex items-center justify-between text-rose-700 mb-2">
            <span className="text-xs font-medium">Berhalangan</span>
            <X className="w-4 h-4 text-rose-500" />
          </div>
          <p className="text-2xl font-bold text-rose-950">{stats.tidak}</p>
          <p className="text-[11px] text-rose-700 mt-1">Telah konfirmasi izin</p>
        </div>

        {/* Ucapan & Doa */}
        <div className="bg-amber-50/70 p-4.5 rounded-2xl border border-amber-200/70 shadow-xs hover:border-amber-300 transition">
          <div className="flex items-center justify-between text-amber-700 mb-2">
            <span className="text-xs font-medium">Buku Tamu / Doa</span>
            <MessageSquare className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-bold text-amber-950">{stats.totalWishes}</p>
          <p className="text-[11px] text-amber-700 mt-1">Ucapan & doa restu</p>
        </div>
      </div>

      {/* Quick Actions & Recent Wishes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        {/* Quick Action Buttons */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500">Aksi Cepat Undangan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <button
              onClick={() => onNavigateTab('guests')}
              className="p-4.5 rounded-2xl border border-stone-200 hover:border-emerald-600 bg-stone-50/50 hover:bg-emerald-50/30 text-left transition group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#2D6A4F] flex items-center justify-center mb-2.5 group-hover:scale-110 transition">
                <Share2 className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-stone-900 text-sm flex items-center justify-between">
                <span>Sebar Undangan WhatsApp</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-700" />
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">Kirim pesan personal otomatis kepada tamu terdaftar</p>
            </button>

            <button
              onClick={() => onNavigateTab('bride_event')}
              className="p-4.5 rounded-2xl border border-stone-200 hover:border-stone-400 bg-stone-50/50 hover:bg-white text-left transition group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center mb-2.5 group-hover:scale-110 transition">
                <Calendar className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-stone-900 text-sm flex items-center justify-between">
                <span>Perbarui Jadwal Acara</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-stone-600" />
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">Edit jam akad, resepsi, atau link Google Maps</p>
            </button>
          </div>

          {/* Schedule Mini Card */}
          <div className="p-4.5 rounded-2xl border border-stone-200 bg-[#FAF7F2] flex items-center justify-between shadow-xs">
            <div className="flex items-center space-x-3.5">
              <div className="w-11 h-11 rounded-2xl bg-white border border-stone-200 flex flex-col items-center justify-center text-stone-800 shadow-xs">
                <span className="text-[10px] uppercase font-bold text-stone-400 leading-none">OKT</span>
                <span className="text-base font-bold leading-tight">24</span>
              </div>
              <div>
                <p className="text-[11px] text-stone-500 font-medium">Hari Pelaksanaan:</p>
                <p className="font-bold text-stone-900 text-sm">{data.event.dateDisplay}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs px-3 py-1.5 bg-white border border-stone-200 rounded-xl text-stone-700 font-semibold shadow-xs">
                Akad: {data.event.akadTime}
              </span>
            </div>
          </div>
        </div>

        {/* Latest Wishes */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500">Doa Terbaru Masuk</h2>
            <button
              onClick={() => onNavigateTab('rsvps')}
              className="text-xs text-[#2D6A4F] font-bold hover:underline cursor-pointer"
            >
              Lihat Semua
            </button>
          </div>
          <div className="space-y-2.5">
            {wishes.slice(0, 3).map((w) => (
              <div
                key={w.id}
                className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200/80 text-xs space-y-1.5 hover:bg-stone-100/60 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-900">{w.name}</span>
                  <span className="text-[10px] text-stone-400">{w.time}</span>
                </div>
                <p className="text-stone-600 line-clamp-2 italic leading-relaxed">"{w.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
