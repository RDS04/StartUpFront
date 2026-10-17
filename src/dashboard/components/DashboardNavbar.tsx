import React from 'react';
import { Smartphone, Home, LogOut, Crown } from 'lucide-react';
import type { DashboardData, TierConfig } from '../types';

interface DashboardNavbarProps {
  data: DashboardData;
  tierConfig?: TierConfig;
  currentUser?: {
    name?: string;
    email?: string;
    avatar?: string;
    role?: string;
  } | null;
  onTierChange?: (tier: 'silver' | 'premium' | 'gold' | 'platinum') => void;
  onOpenPreview: () => void;
  onBackToHome?: () => void;
  onLogout?: () => void;
}

export const DashboardNavbar: React.FC<DashboardNavbarProps> = ({
  data,
  tierConfig,
  currentUser,
  onTierChange,
  onOpenPreview,
  onBackToHome,
  onLogout,
}) => {
  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-stone-200 sticky top-0 z-30 px-4 sm:px-8 py-3 flex items-center justify-between shadow-xs transition-all">
      {/* Brand & Client Info */}
      <div className="flex items-center space-x-3.5">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#1B4332] to-[#2D6A4F] flex items-center justify-center shadow-md shadow-emerald-900/15 border border-emerald-700/30">
          {/* Logo Wedding Rings */}
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#FAF7F2] stroke-current fill-none stroke-2">
            <circle cx="9" cy="12" r="5" stroke="#FAF7F2" strokeWidth="2" />
            <circle cx="15" cy="12" r="5" stroke="#E8D5B5" strokeWidth="2" />
          </svg>
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-serif text-xl tracking-tight text-stone-900 font-bold">i say yes</span>
            <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              Studio Pengantin
            </span>
          </div>
          <p className="text-xs text-stone-500">
            Mempelai: <span className="font-semibold text-stone-800">{data.groom.nickName} & {data.bride.nickName}</span>
          </p>
        </div>
      </div>

      {/* Action Controls & Selected Package Display */}
      <div className="flex items-center space-x-2.5 sm:space-x-3">
        {/* Paket yang dipilih saja */}
        <div className="flex items-center bg-stone-100/90 rounded-xl px-2.5 sm:px-3 py-1.5 border border-stone-200 text-xs shadow-xs">
          <span className="font-medium text-stone-500 flex items-center gap-1.5 mr-1.5 sm:mr-2">
            <Crown className="w-3.5 h-3.5 text-amber-600" /> Paket:
          </span>
          <span
            className={`capitalize px-2.5 py-0.5 rounded-lg font-bold text-xs border shadow-xs inline-flex items-center gap-1 ${
              tierConfig?.badge ||
              (data.tier === 'silver'
                ? 'bg-stone-200/90 text-stone-800 border-stone-300'
                : data.tier === 'gold'
                ? 'bg-amber-100 text-amber-900 border-amber-300'
                : data.tier === 'platinum'
                ? 'bg-purple-100 text-purple-900 border-purple-300'
                : 'bg-emerald-100 text-emerald-900 border-emerald-300')
            }`}
          >
            {tierConfig?.name || (
              data.tier === 'silver'
                ? 'Silver (Hemat)'
                : data.tier === 'gold'
                ? 'Gold (VIP)'
                : data.tier === 'platinum'
                ? 'Platinum (Full VIP)'
                : 'Premium (Best Value)'
            )}
          </span>

          {/* Opsi khusus Master Administrator jika ingin simulasi / ganti paket */}
          {currentUser?.role === 'master' && onTierChange && (
            <select
              value={data.tier}
              onChange={(e) => onTierChange(e.target.value as any)}
              className="ml-2 bg-white border border-stone-300 text-stone-700 font-semibold rounded-md px-1.5 py-0.5 text-[11px] cursor-pointer focus:outline-none focus:ring-1 focus:ring-amber-500"
              title="Ganti Paket (Simulasi Khusus Master Admin)"
            >
              <option value="silver">Silver</option>
              <option value="gold">Gold</option>
              <option value="platinum">Platinum</option>
              <option value="premium">Premium</option>
            </select>
          )}
        </div>

        {/* Live Mobile Preview Trigger */}
        <button
          onClick={onOpenPreview}
          className="flex items-center space-x-2 bg-gradient-to-r from-[#2D6A4F] to-[#1B4332] hover:from-[#1B4332] hover:to-[#132a20] text-white px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold shadow-sm transition active:scale-95 cursor-pointer border border-emerald-700/40"
        >
          <Smartphone className="w-4 h-4 text-emerald-200 animate-pulse" />
          <span className="hidden sm:inline">Pratinjau Undangan</span>
          <span className="sm:hidden">Preview</span>
        </button>

        {/* Back to Platform Home */}
        {onBackToHome && (
          <button
            onClick={onBackToHome}
            title="Kembali ke Beranda"
            className="flex items-center gap-1 px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl transition cursor-pointer"
          >
            <Home className="w-4 h-4 text-stone-600" />
            <span className="hidden md:inline">Beranda</span>
          </button>
        )}

        {/* User Profile Avatar / Logout */}
        {currentUser && (
          <div className="flex items-center pl-1 sm:pl-3 border-l border-stone-200 gap-2.5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#1B4332] font-bold text-xs flex items-center justify-center border border-emerald-300 overflow-hidden shadow-xs">
                {currentUser.avatar ? (
                  <img src={currentUser.avatar} alt={currentUser.name || 'User'} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <span>{currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}</span>
                )}
              </div>
              <div className="hidden xl:block text-left max-w-[150px]">
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-bold text-stone-800 truncate leading-tight">{currentUser.name || 'Pengguna'}</p>
                  <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-md ${
                    currentUser.role === 'master'
                      ? 'bg-purple-100 text-purple-700 border border-purple-200'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}>
                    {currentUser.role || 'user'}
                  </span>
                </div>
                <p className="text-[10px] text-stone-400 truncate">{currentUser.email || ''}</p>
              </div>
            </div>
            {onLogout && (
              <button
                onClick={onLogout}
                title="Keluar / Ganti Akun (Logout)"
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-stone-500 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition cursor-pointer text-xs font-semibold border border-transparent hover:border-rose-200"
              >
                <LogOut className="w-4 h-4 text-rose-500" />
                <span className="hidden sm:inline text-[11px]">Keluar</span>
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
