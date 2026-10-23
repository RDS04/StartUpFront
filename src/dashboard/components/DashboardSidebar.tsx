import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Heart,
  Users,
  MessageSquare,
  Gift,
  ShieldCheck,
  Palette,
  CreditCard,
  ChevronRight,
  ChevronDown,
  Zap,
  BookHeart,
} from 'lucide-react';
import type { DashboardTab, TierConfig } from '../types';

interface DashboardSidebarProps {
  activeTab: DashboardTab;
  setActiveTab: (tab: DashboardTab) => void;
  tierConfig: TierConfig;
  guestCount: number;
  activeTemplateId?: string;
  currentUser?: {
    role?: string;
    name?: string;
    email?: string;
  } | null;
  onNavigateTemplates?: () => void;
  onNavigatePricing?: () => void;
  onNavigatePayment?: () => void;
  onPreviewTemplate?: (previewRoute: string) => void;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  activeTab,
  setActiveTab,
  tierConfig,
  guestCount,
  activeTemplateId,
  currentUser: _currentUser,
  onNavigateTemplates: _onNavigateTemplates,
  onNavigatePricing,
  onNavigatePayment,
  onPreviewTemplate,
}) => {
  const [showMobileQuickHub, setShowMobileQuickHub] = useState(false);
  const activeTabRef = useRef<HTMLButtonElement>(null);

  const navItems = [
    { id: 'overview' as DashboardTab, label: 'Ringkasan', icon: Sparkles, desc: 'Statistik & Status' },
    { id: 'bride_event' as DashboardTab, label: 'Data Acara', icon: Heart, desc: 'Mempelai & Lokasi' },
    { id: 'stories' as DashboardTab, label: 'Kisah Cinta', icon: BookHeart, desc: 'Perjalanan & Cerita' },
    { id: 'gallery' as DashboardTab, label: 'Galeri Foto', icon: Palette, desc: 'Momen Bahagia Kami' },
    { id: 'guests' as DashboardTab, label: 'Daftar Tamu', icon: Users, desc: 'Generate Link & WA' },
    { id: 'rsvps' as DashboardTab, label: 'Buku Tamu', icon: MessageSquare, desc: 'Doa & Kehadiran' },
    { id: 'accounts' as DashboardTab, label: 'Amplop Digital', icon: Gift, desc: 'Rekening & Kado' },
  ];

  const quotaPercent = Math.min((guestCount / tierConfig.maxGuests) * 100, 100);

  // Auto-scroll active tab into view in mobile pill container
  useEffect(() => {
    if (activeTabRef.current) {
      activeTabRef.current.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [activeTab]);

  return (
    <>
      {/* ============================================================== */}
      {/* 📱 MOBILE VIEW NAVIGATION: Sleek Horizontal Pills + Quick Hub  */}
      {/* ============================================================== */}
      <div className="md:hidden w-full flex flex-col gap-2.5 mb-1">
        {/* Horizontal Scrollable Navigation Pills */}
        <div className="bg-stone-100/90 backdrop-blur-md p-1.5 rounded-2xl border border-stone-200/80 shadow-xs">
          <div className="flex items-center gap-1.5 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-0.5 px-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  ref={active ? activeTabRef : null}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0 cursor-pointer ${
                    active
                      ? 'bg-gradient-to-r from-[#1B4332] to-[#2D6A4F] text-white shadow-md shadow-emerald-950/20 scale-[1.02]'
                      : 'bg-white/80 hover:bg-white text-stone-700 border border-stone-200/60 active:scale-95'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                      active ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-500'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile Quick Hub Toggle Bar */}
        <div className="bg-white rounded-2xl border border-stone-200 p-2.5 shadow-2xs">
          <button
            onClick={() => setShowMobileQuickHub((prev) => !prev)}
            className="w-full flex items-center justify-between text-xs font-semibold text-stone-700 hover:text-stone-900 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-50 text-[#2D6A4F] flex items-center justify-center border border-emerald-200">
                <Zap className="w-3.5 h-3.5" />
              </span>
              <div className="text-left">
                <span className="font-bold text-stone-800">Menu Cepat & Kuota</span>
                <span className="text-[10px] text-stone-400 block font-normal">
                  Ganti Template, Status & Kuota Tamu
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${tierConfig.badge}`}>
                {tierConfig.name}
              </span>
              <ChevronDown
                className="w-4 h-4 text-stone-400 transition-transform duration-200"
                style={{ transform: showMobileQuickHub ? 'rotate(180deg)' : 'none' }}
              />
            </div>
          </button>

          {/* Expandable Quick Actions & Quota Meter */}
          {showMobileQuickHub && (
            <div className="mt-3 pt-3 border-t border-stone-100 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
              {/* Mini Quota Card */}
              <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200/80">
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="font-medium text-stone-600">Kuota Tamu Terpakai:</span>
                  <span className="font-bold text-stone-900">
                    {guestCount} / {tierConfig.maxGuests === 9999 ? 'Unlimited' : tierConfig.maxGuests} Tamu
                  </span>
                </div>
                <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      quotaPercent > 90 ? 'bg-rose-500' : 'bg-[#2D6A4F]'
                    }`}
                    style={{ width: `${quotaPercent}%` }}
                  />
                </div>
                <div className="mt-2 flex items-center justify-between text-[11px] text-stone-500">
                  <span>Masa Aktif:</span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> 90 Hari Aktif
                  </span>
                </div>
              </div>

              {/* Quick Actions Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                {onPreviewTemplate && (
                  <button
                    onClick={() => {
                      setShowMobileQuickHub(false);
                      onPreviewTemplate(activeTemplateId || 'template-empat');
                    }}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200 font-semibold text-left transition cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span className="truncate">Template Aktif</span>
                  </button>
                )}

                {onNavigatePayment && (
                  <button
                    onClick={() => {
                      setShowMobileQuickHub(false);
                      onNavigatePayment();
                    }}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 font-semibold text-left transition cursor-pointer"
                  >
                    <CreditCard className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span className="truncate">Status Pembayaran</span>
                  </button>
                )}

                {onNavigatePricing && !onNavigatePayment && (
                  <button
                    onClick={() => {
                      setShowMobileQuickHub(false);
                      onNavigatePricing();
                    }}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 font-semibold text-left transition cursor-pointer"
                  >
                    <CreditCard className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span className="truncate">Upgrade Paket</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 🖥️ DESKTOP VIEW SIDEBAR: Full Vertical Navigation Column       */}
      {/* ============================================================== */}
      <aside className="hidden md:flex w-64 flex-shrink-0 flex-col gap-2 md:sticky md:top-20 md:self-start md:max-h-[calc(100vh-6rem)] md:overflow-y-auto pr-1 pb-4 select-none [-ms-overflow-style:none] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-stone-300/80 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-stone-400 [&::-webkit-scrollbar-track]:bg-transparent">
        {/* Tab Navigation Buttons */}
        <div className="flex flex-col gap-1.5 w-full">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-3 px-3.5 py-3 rounded-2xl text-left transition-all w-full border cursor-pointer ${
                  active
                    ? 'bg-white shadow-sm border-emerald-300 text-[#1B4332] font-semibold'
                    : 'bg-white/60 hover:bg-white text-stone-600 border-transparent hover:border-stone-200'
                }`}
              >
                <div
                  className={`p-2 rounded-xl transition-colors ${
                    active ? 'bg-emerald-50 text-[#2D6A4F]' : 'bg-stone-100 text-stone-500'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm leading-tight ${active ? 'text-stone-900 font-bold' : 'text-stone-700'}`}>
                    {item.label}
                  </p>
                  <p className="text-[11px] text-stone-400 mt-0.5 truncate">{item.desc}</p>
                </div>
                {active && <ChevronRight className="w-3.5 h-3.5 text-emerald-600 ml-auto" />}
              </button>
            );
          })}
        </div>

        {/* Quick Links (Lihat Template Aktif & Status Pembayaran) */}
        <div className="flex flex-col gap-1.5 pt-2">
          {onPreviewTemplate && (
            <button
              onClick={() => onPreviewTemplate(activeTemplateId || 'template-empat')}
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200 text-xs font-semibold transition cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span>Lihat Template Aktif</span>
            </button>
          )}
          {onNavigatePayment && (
            <button
              onClick={onNavigatePayment}
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 text-emerald-900 border border-emerald-200/80 text-xs font-semibold transition cursor-pointer"
            >
              <CreditCard className="w-4 h-4 text-emerald-700" />
              <span>Status Pembayaran</span>
            </button>
          )}
          {onNavigatePricing && !onNavigatePayment && (
            <button
              onClick={onNavigatePricing}
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 text-emerald-900 border border-emerald-200/80 text-xs font-semibold transition cursor-pointer"
            >
              <CreditCard className="w-4 h-4 text-emerald-700" />
              <span>Upgrade / Perpanjang Paket</span>
            </button>
          )}
        </div>

        {/* Subscription Status Card */}
        <div className="mt-auto p-4 bg-white rounded-2xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs text-stone-400 font-medium">Paket Langganan</span>
            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${tierConfig.badge}`}>
              {tierConfig.name}
            </span>
          </div>

          <div className="space-y-1.5 text-xs text-stone-600">
            <div className="flex justify-between font-medium">
              <span>Kuota Tamu:</span>
              <span className="font-bold text-stone-900">
                {guestCount} / {tierConfig.maxGuests === 9999 ? 'Unlimited' : tierConfig.maxGuests}
              </span>
            </div>
            <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  quotaPercent > 90 ? 'bg-rose-500' : 'bg-[#2D6A4F]'
                }`}
                style={{ width: `${quotaPercent}%` }}
              />
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px]">
            <span className="text-stone-500">Masa Aktif</span>
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 90 Hari Lagi
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};

