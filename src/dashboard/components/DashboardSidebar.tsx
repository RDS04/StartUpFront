import React from 'react';
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
} from 'lucide-react';
import type { DashboardTab, TierConfig } from '../types';

interface DashboardSidebarProps {
  activeTab: DashboardTab;
  setActiveTab: (tab: DashboardTab) => void;
  tierConfig: TierConfig;
  guestCount: number;
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
  onNavigateTemplates,
  onNavigatePricing,
  onNavigatePayment,
  onPreviewTemplate,
}) => {
  const navItems = [
    { id: 'overview' as DashboardTab, label: 'Ringkasan', icon: Sparkles, desc: 'Statistik & Status' },
    { id: 'bride_event' as DashboardTab, label: 'Data Acara', icon: Heart, desc: 'Mempelai & Lokasi' },
    { id: 'guests' as DashboardTab, label: 'Daftar Tamu', icon: Users, desc: 'Generate Link & WA' },
    { id: 'rsvps' as DashboardTab, label: 'Buku Tamu / RSVP', icon: MessageSquare, desc: 'Doa & Kehadiran' },
    { id: 'accounts' as DashboardTab, label: 'Amplop Digital', icon: Gift, desc: 'Rekening & Kado' },
  ];

  const quotaPercent = Math.min((guestCount / tierConfig.maxGuests) * 100, 100);

  return (
    <aside className="w-full md:w-64 flex-shrink-0 flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
      {/* Tab Navigation Buttons */}
      <div className="flex md:flex-col gap-1.5 w-full">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center space-x-3 px-3.5 py-3 rounded-2xl text-left transition-all whitespace-nowrap md:whitespace-normal w-full border cursor-pointer ${
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
                <p className="hidden md:block text-[11px] text-stone-400 mt-0.5 truncate">{item.desc}</p>
              </div>
              {active && <ChevronRight className="hidden md:block w-3.5 h-3.5 text-emerald-600 ml-auto" />}
            </button>
          );
        })}
      </div>

      {/* Quick Links (Ganti Template & Upgrade Paket) */}
      <div className="hidden md:flex flex-col gap-1.5 pt-2">
        {onNavigateTemplates && (
          <button
            onClick={onNavigateTemplates}
            className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100/80 text-amber-900 border border-amber-200/80 text-xs font-semibold transition cursor-pointer"
          >
            <Palette className="w-4 h-4 text-amber-700" />
            <span>Ganti Desain Template</span>
          </button>
        )}
        {onPreviewTemplate && (
          <button
            onClick={() => onPreviewTemplate('template-empat')}
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
        <a
          href="http://localhost:8000/master/login"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100/80 text-purple-900 border border-purple-200/80 text-xs font-semibold transition cursor-pointer"
          title="Buka Panel Master Administrator"
        >
          <ShieldCheck className="w-4 h-4 text-purple-700" />
          <span>Portal Master Admin</span>
        </a>
      </div>

      {/* Subscription Status Card */}
      <div className="hidden md:block mt-auto p-4 bg-white rounded-2xl border border-stone-200 shadow-xs">
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
  );
};
