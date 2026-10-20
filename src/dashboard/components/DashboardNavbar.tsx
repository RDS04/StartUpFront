import React, { useState, useRef, useEffect } from 'react';
import { Smartphone, Home, LogOut, Crown, ChevronDown } from 'lucide-react';
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
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpen]);

  // Tier short label for mobile to avoid text overflow
  const tierShortName =
    data.tier === 'silver'
      ? 'Silver'
      : data.tier === 'gold'
      ? 'Gold'
      : data.tier === 'platinum'
      ? 'Platinum'
      : 'Premium';

  const tierFullName =
    tierConfig?.name ||
    (data.tier === 'silver'
      ? 'Silver (Hemat)'
      : data.tier === 'gold'
      ? 'Gold (VIP)'
      : data.tier === 'platinum'
      ? 'Platinum (VIP)'
      : 'Premium (Best)');

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-stone-200 sticky top-0 z-30 px-3 sm:px-6 md:px-8 py-2.5 sm:py-3 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Brand & Client Info */}
        <div className="flex items-center space-x-2 sm:space-x-3.5 min-w-0 shrink">
          {/* Logo Wedding Rings */}
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-[#1B4332] to-[#2D6A4F] flex items-center justify-center shadow-md shadow-emerald-900/15 border border-emerald-700/30 shrink-0">
            <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 text-[#FAF7F2] stroke-current fill-none stroke-2">
              <circle cx="9" cy="12" r="5" stroke="#FAF7F2" strokeWidth="2" />
              <circle cx="15" cy="12" r="5" stroke="#E8D5B5" strokeWidth="2" />
            </svg>
          </div>

          <div className="min-w-0">
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <span className="font-serif text-base sm:text-xl tracking-tight text-stone-900 font-bold whitespace-nowrap">
                i say yes
              </span>
              <span className="hidden md:inline-block text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 whitespace-nowrap">
                Studio Pengantin
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-stone-500 truncate max-w-[120px] xs:max-w-[170px] sm:max-w-[240px] md:max-w-none">
              <span className="hidden sm:inline text-stone-400">Mempelai: </span>
              <span className="font-semibold text-stone-800">
                {data.groom.nickName || 'Pengantin'} & {data.bride.nickName || 'Pengantin'}
              </span>
            </p>
          </div>
        </div>

        {/* Action Controls & User Menu */}
        <div className="flex items-center space-x-1.5 sm:space-x-2.5 md:space-x-3 shrink-0">
          {/* Paket Tier Badge */}
          <div className="flex items-center bg-stone-100/90 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1 sm:py-1.5 border border-stone-200 text-xs shadow-xs shrink-0">
            <span className="font-medium text-stone-500 hidden sm:flex items-center gap-1.5 mr-1.5 sm:mr-2">
              <Crown className="w-3.5 h-3.5 text-amber-600 shrink-0" /> Paket:
            </span>
            <Crown className="w-3.5 h-3.5 text-amber-600 sm:hidden mr-1 shrink-0" />
            <span
              className={`capitalize px-1.5 sm:px-2.5 py-0.5 rounded-md sm:rounded-lg font-bold text-[11px] sm:text-xs border shadow-xs inline-flex items-center gap-1 whitespace-nowrap ${
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
              <span className="sm:hidden">{tierShortName}</span>
              <span className="hidden sm:inline">{tierFullName}</span>
            </span>

            {/* Opsi khusus Master Administrator jika ingin simulasi / ganti paket */}
            {currentUser?.role === 'master' && onTierChange && (
              <select
                value={data.tier}
                onChange={(e) => onTierChange(e.target.value as any)}
                className="ml-1 sm:ml-2 bg-white border border-stone-300 text-stone-700 font-semibold rounded-md px-1 sm:px-1.5 py-0.5 text-[10px] sm:text-[11px] cursor-pointer focus:outline-none focus:ring-1 focus:ring-amber-500"
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
            className="flex items-center space-x-1 sm:space-x-2 bg-gradient-to-r from-[#2D6A4F] to-[#1B4332] hover:from-[#1B4332] hover:to-[#132a20] text-white px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold shadow-xs sm:shadow-sm transition active:scale-95 cursor-pointer border border-emerald-700/40 shrink-0"
          >
            <Smartphone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-200 animate-pulse shrink-0" />
            <span className="hidden md:inline">Pratinjau Undangan</span>
            <span className="md:hidden text-[11px] sm:text-xs">Preview</span>
          </button>

          {/* Back to Platform Home (Visible on md+ screens) */}
          {onBackToHome && (
            <button
              onClick={onBackToHome}
              title="Kembali ke Beranda"
              className="hidden md:flex items-center gap-1 px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl transition cursor-pointer shrink-0"
            >
              <Home className="w-4 h-4 text-stone-600" />
              <span>Beranda</span>
            </button>
          )}

          {/* User Profile & Menu Dropdown */}
          {currentUser && (
            <div className="relative shrink-0" ref={userMenuRef}>
              {/* Trigger Button */}
              <button
                onClick={() => setIsUserMenuOpen((prev) => !prev)}
                className="flex items-center gap-1.5 p-1 sm:px-2 sm:py-1.5 rounded-xl hover:bg-stone-100 border border-transparent hover:border-stone-200 transition cursor-pointer"
                aria-label="Menu Pengguna"
                aria-expanded={isUserMenuOpen}
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-100 text-[#1B4332] font-bold text-xs flex items-center justify-center border border-emerald-300 overflow-hidden shadow-xs shrink-0">
                  {currentUser.avatar ? (
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name || 'User'}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span>{currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}</span>
                  )}
                </div>
                <div className="hidden xl:block text-left max-w-[130px]">
                  <p className="text-xs font-bold text-stone-800 truncate leading-tight">
                    {currentUser.name || 'Pengguna'}
                  </p>
                  <p className="text-[10px] text-stone-400 truncate">{currentUser.email || ''}</p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400 transition-transform duration-200" style={{ transform: isUserMenuOpen ? 'rotate(180deg)' : 'none' }} />
              </button>

              {/* Responsive Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 sm:w-64 bg-white rounded-2xl shadow-xl border border-stone-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  {/* User Header Info */}
                  <div className="px-4 py-2.5 border-b border-stone-100">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#1B4332] font-bold text-xs flex items-center justify-center border border-emerald-300 overflow-hidden shrink-0">
                        {currentUser.avatar ? (
                          <img
                            src={currentUser.avatar}
                            alt={currentUser.name || 'User'}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <span>{currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}</span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-stone-800 truncate leading-tight">
                          {currentUser.name || 'Pengguna'}
                        </p>
                        <span
                          className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-md inline-block ${
                            currentUser.role === 'master'
                              ? 'bg-purple-100 text-purple-700 border border-purple-200'
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          }`}
                        >
                          {currentUser.role || 'user'}
                        </span>
                      </div>
                    </div>
                    <p className="text-[10px] text-stone-400 truncate mt-1">{currentUser.email || ''}</p>
                  </div>

                  {/* Menu Items */}
                  <div className="p-1 space-y-0.5 text-xs">
                    {onBackToHome && (
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          onBackToHome();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-stone-700 hover:bg-stone-100 rounded-xl transition cursor-pointer font-medium"
                      >
                        <Home className="w-4 h-4 text-stone-500" />
                        <span>Kembali ke Beranda</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onOpenPreview();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-stone-700 hover:bg-stone-100 rounded-xl transition cursor-pointer font-medium"
                    >
                      <Smartphone className="w-4 h-4 text-emerald-600" />
                      <span>Pratinjau Undangan</span>
                    </button>
                  </div>

                  {/* Logout Row */}
                  {onLogout && (
                    <div className="pt-1 mt-1 border-t border-stone-100 px-1">
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          onLogout();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-rose-600 hover:bg-rose-50 rounded-xl transition cursor-pointer font-semibold text-xs"
                      >
                        <LogOut className="w-4 h-4 text-rose-500" />
                        <span>Keluar (Logout)</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

