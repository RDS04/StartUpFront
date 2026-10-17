import { useState, useEffect, useRef } from 'react';
import { Menu, X, Check, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react';
import { WeddingRingsIcon } from './DecorativeBackground';
import type { AuthUser } from '../services/authService';

export interface OrderState {
  isTransacting?: boolean;
  hasPlan: boolean;
  planName?: string;
  hasTemplate: boolean;
  templateName?: string;
  step: 1 | 2 | 3;
}

interface NavbarProps {
  onOpenAuth?: (mode: 'login' | 'register') => void;
  currentUser?: AuthUser | null;
  onLogout?: () => void;
  orderState?: OrderState;
  onNavigateStep?: (step: 1 | 2 | 3) => void;
  onNavigateDashboard?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenAuth, 
  currentUser,
  onLogout,
  orderState,
  onNavigateStep,
  onNavigateDashboard 
}) => {
  const [activeTab, setActiveTab] = useState('Beranda');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Tutup dropdown ketika mengklik di luar area
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleAuthClick = (mode: 'login' | 'register' = 'login') => {
    setMobileMenuOpen(false);
    if (onOpenAuth) {
      onOpenAuth(mode);
    } else {
      window.location.hash = `#/${mode}`;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Beranda', 'Fitur', 'Template', 'Amplop Digital', 'Harga', 'Cara Buat'];

  // Sinkronkan activeTab dengan hash URL saat navigasi atau hash berubah
  useEffect(() => {
    const syncActiveTab = () => {
      const hash = window.location.hash.toLowerCase().replace(/^#\/?/, '').split('?')[0].trim();
      const matched = navLinks.find(
        (link) => link.toLowerCase().replace(/\s+/g, '-') === hash
      );
      if (matched) {
        setActiveTab(matched);
      } else if (!hash || hash === 'beranda' || hash === 'landing') {
        setActiveTab('Beranda');
      }
    };

    syncActiveTab();
    window.addEventListener('hashchange', syncActiveTab);
    return () => window.removeEventListener('hashchange', syncActiveTab);
  }, []);

  // Stepper Visual Component (Step 1: Desain Template -> Step 2: Paket Harga -> Step 3: Pembayaran)
  const renderStepper = (isMobile = false) => {
    // Stepper HANYA boleh tampil jika user telah login dan sedang aktif dalam alur pemesanan
    if (!currentUser || !orderState || !orderState.isTransacting) return null;

    return (
      <div className={`flex items-center justify-center ${isMobile ? 'py-2 px-3 w-full bg-[#072418]/95 rounded-2xl border border-emerald-500/30' : 'px-5 py-2 rounded-full bg-[#072418]/90 backdrop-blur-md border border-emerald-500/30 shadow-[0_4px_20px_rgba(0,0,0,0.3)]'}`}>
        <div className="flex items-center gap-2.5 sm:gap-4 md:gap-5">
          {/* STEP 1: DESAIN TEMPLATE */}
          <div 
            onClick={() => onNavigateStep?.(1)}
            className="flex items-center gap-2 cursor-pointer group"
            title="Langkah 1: Pilih Desain Template"
          >
            {orderState.hasTemplate ? (
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#00c078] flex items-center justify-center text-white shadow-md shadow-emerald-950/30 group-hover:scale-110 transition-transform shrink-0">
                <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" />
              </div>
            ) : (
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#ffb800] ring-4 ring-amber-400/25 flex items-center justify-center text-slate-950 font-black text-[11px] sm:text-xs shadow-md shadow-amber-950/20 group-hover:scale-110 transition-transform shrink-0 animate-pulse">
                1
              </div>
            )}
            <div className={`text-[10px] sm:text-xs font-bold leading-tight text-left ${
              orderState.hasTemplate ? 'text-[#00d68f]' : 'text-[#ffb800]'
            }`}>
              <div>Desain</div>
              <div>Template</div>
            </div>
          </div>

          {/* CONNECTOR LINE 1 */}
          <div className={`h-[2px] w-6 sm:w-9 md:w-12 rounded-full shrink-0 transition-colors ${
            orderState.hasTemplate ? 'bg-[#00d68f]' : 'bg-emerald-900/60'
          }`} />

          {/* STEP 2: PAKET HARGA */}
          <div 
            onClick={() => {
              if (orderState.hasTemplate) onNavigateStep?.(2);
            }}
            className={`flex items-center gap-2 ${orderState.hasTemplate ? 'cursor-pointer group' : 'opacity-65 cursor-not-allowed'}`}
            title={orderState.hasTemplate ? 'Langkah 2: Pilih Paket Harga' : 'Pilih desain template terlebih dahulu'}
          >
            {orderState.hasPlan ? (
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#00c078] flex items-center justify-center text-white shadow-md shadow-emerald-950/30 group-hover:scale-110 transition-transform shrink-0">
                <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" />
              </div>
            ) : orderState.hasTemplate ? (
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#ffb800] ring-4 ring-amber-400/25 flex items-center justify-center text-slate-950 font-black text-[11px] sm:text-xs shadow-md shadow-amber-950/20 group-hover:scale-110 transition-transform shrink-0 animate-pulse">
                2
              </div>
            ) : (
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-emerald-950 text-emerald-500/60 border border-emerald-800/80 flex items-center justify-center text-[10px] font-bold shrink-0">
                2
              </div>
            )}
            <div className={`text-[10px] sm:text-xs font-bold leading-tight text-left ${
              orderState.hasPlan ? 'text-[#00d68f]' : orderState.hasTemplate ? 'text-[#ffb800]' : 'text-emerald-500/60'
            }`}>
              <div>Paket</div>
              <div>Harga</div>
            </div>
          </div>

          {/* CONNECTOR LINE 2 */}
          <div className={`h-[2px] w-6 sm:w-9 md:w-12 rounded-full shrink-0 transition-colors ${
            orderState.hasPlan ? 'bg-[#00d68f]' : 'bg-emerald-900/60'
          }`} />

          {/* STEP 3: PEMBAYARAN */}
          <div 
            onClick={() => {
              if (orderState.hasTemplate && orderState.hasPlan) onNavigateStep?.(3);
            }}
            className={`flex items-center gap-2 ${(orderState.hasTemplate && orderState.hasPlan) ? 'cursor-pointer group' : 'opacity-65 cursor-not-allowed'}`}
            title={(orderState.hasTemplate && orderState.hasPlan) ? 'Langkah 3: Rincian Pembayaran' : 'Pilih template dan paket harga terlebih dahulu'}
          >
            <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center font-black text-[11px] sm:text-xs shadow-md transition-transform shrink-0 ${
              orderState.step === 3 || (orderState.hasTemplate && orderState.hasPlan)
                ? 'bg-[#ffb800] text-slate-950 ring-4 ring-amber-400/25 shadow-amber-950/30 group-hover:scale-110'
                : 'bg-emerald-950 text-emerald-500/60 border border-emerald-800/80'
            }`}>
              3
            </div>
            <div className={`text-[10px] sm:text-xs font-bold leading-tight text-left ${
              orderState.step === 3 || (orderState.hasTemplate && orderState.hasPlan) ? 'text-[#ffb800]' : 'text-emerald-500/60'
            }`}>
              <div>Pembayaran</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? 'bg-[#fafbfc]/95 backdrop-blur-md border-b border-slate-200/60 shadow-xs' 
          : 'bg-transparent border-b border-transparent shadow-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo with Wedding Rings Icon */}
          <div 
            onClick={() => {
              window.location.hash = '#/';
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
          >
            <WeddingRingsIcon className="w-9 h-9 group-hover:scale-105 transition-transform duration-200 shadow-sm" />
            <span className="font-serif-wedding text-2xl tracking-normal text-slate-900 font-bold lowercase">
              i say yes
            </span>
          </div>

          {/* Stepper jika sedang transaksi aktif dan user telah login, atau Normal Navigation Links jika tidak sedang transaksi */}
          {Boolean(currentUser && orderState && orderState.isTransacting) ? (
            <div className="hidden md:flex items-center justify-center flex-1 mx-4">
              {renderStepper()}
            </div>
          ) : (
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {navLinks.map((link) => {
                const isActive = activeTab === link;
                return (
                  <a
                    key={link}
                    href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => setActiveTab(link)}
                    className={`text-sm transition-colors relative py-1.5 inline-flex items-center gap-1.5 ${
                      isActive 
                        ? 'text-[#165b39] font-bold' 
                        : 'text-slate-600 hover:text-[#165b39] font-medium'
                    }`}
                  >
                    <span>{link}</span>
                    {link === 'Amplop Digital' && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full font-black bg-amber-500/20 text-amber-800 border border-amber-500/40 leading-none">
                        3D
                      </span>
                    )}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#165b39] rounded-full" />
                    )}
                  </a>
                );
              })}
            </nav>
          )}

          {/* Right Action: User Avatar Dropdown / Masuk & Daftar Button */}
          <div className="hidden md:flex items-center gap-2.5 relative z-20 shrink-0">
            {currentUser ? (
              <div className="relative" ref={dropdownRef}>
                {/* Profile Pill Trigger Button */}
                <button 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2.5 pl-2 pr-3.5 py-1.5 rounded-full bg-white/80 hover:bg-white border border-slate-200/90 hover:border-emerald-500/50 shadow-sm hover:shadow-md transition-all cursor-pointer group select-none"
                  aria-expanded={dropdownOpen}
                  title="Menu Akun"
                >
                  <div className="w-7 h-7 rounded-full bg-[#10432a] text-white flex items-center justify-center text-xs font-bold border border-emerald-400/40 overflow-hidden shadow-xs shrink-0">
                    {currentUser.avatar ? (
                      <img 
                        src={currentUser.avatar} 
                        alt={currentUser.name || currentUser.email} 
                        className="w-full h-full object-cover" 
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <span>{(currentUser.name || currentUser.email)[0].toUpperCase()}</span>
                    )}
                  </div>
                  <span className="text-xs font-bold text-slate-800 max-w-[120px] truncate group-hover:text-emerald-950">
                    {currentUser.name || currentUser.email.split('@')[0]}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-700 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu Glass Panel */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2.5 w-64 rounded-2xl bg-white/95 backdrop-blur-2xl border border-white/95 shadow-[0_18px_45px_rgba(0,0,0,0.14)] ring-1 ring-slate-900/5 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    
                    {/* User Identity Header */}
                    <div className="px-3 py-2.5 rounded-xl bg-slate-50/90 border border-slate-100 mb-1.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-[#10432a] text-white flex items-center justify-center text-xs font-bold border border-emerald-400/40 overflow-hidden shrink-0 shadow-xs">
                          {currentUser.avatar ? (
                            <img 
                              src={currentUser.avatar} 
                              alt={currentUser.name || currentUser.email} 
                              className="w-full h-full object-cover" 
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <span>{(currentUser.name || currentUser.email)[0].toUpperCase()}</span>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-black text-slate-900 truncate">
                            {currentUser.name || currentUser.email.split('@')[0]}
                          </div>
                          <div className="text-[10px] text-slate-500 truncate">
                            {currentUser.email}
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center gap-1.5 text-[10px] font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md w-fit">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>Akun Terverifikasi</span>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="space-y-1">
                      {/* 1. Dashboard Menu Button */}
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          onNavigateDashboard?.();
                        }}
                        className="w-full px-3 py-2 rounded-xl text-xs font-bold text-emerald-950 hover:bg-emerald-50 flex items-center gap-2.5 transition-colors cursor-pointer group"
                      >
                        <div className="w-7 h-7 rounded-lg bg-[#10432a] text-emerald-200 flex items-center justify-center shadow-xs">
                          <LayoutDashboard className="w-3.5 h-3.5" />
                        </div>
                        <div className="text-left flex-1">
                          <div className="font-black text-emerald-950">Dashboard</div>
                          <div className="text-[10px] text-slate-500 font-normal">Kelola undangan & pesanan</div>
                        </div>
                      </button>
                    </div>

                    <div className="my-1.5 border-t border-slate-100" />

                    {/* 3. Logout Menu Button */}
                    {onLogout && (
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          onLogout();
                        }}
                        className="w-full px-3 py-2 rounded-xl text-xs font-bold text-rose-700 hover:bg-rose-50 flex items-center gap-2.5 transition-colors cursor-pointer group"
                      >
                        <div className="w-7 h-7 rounded-lg bg-rose-100/80 text-rose-700 flex items-center justify-center">
                          <LogOut className="w-3.5 h-3.5" />
                        </div>
                        <div className="text-left flex-1">
                          <div>Logout</div>
                          <div className="text-[10px] text-rose-500/80 font-normal">Keluar dari sesi akun ini</div>
                        </div>
                      </button>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={() => handleAuthClick('login')}
                className="px-6 py-2 rounded-full text-sm font-bold text-white bg-[#10432a] hover:bg-[#0c3521] border border-emerald-400/50 hover:border-emerald-300 shadow-[0_4px_16px_rgba(0,0,0,0.25)] hover:shadow-[0_6px_22px_rgba(0,0,0,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                Masuk / Daftar
              </button>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center gap-2 relative z-20">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-white bg-[#144d31]/90 hover:bg-[#144d31] border border-emerald-400/30 shadow-sm focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Stepper Bar (hanya jika transaksi aktif dan user telah login) */}
        {Boolean(currentUser && orderState && orderState.isTransacting) && (
          <div className="md:hidden pb-3">
            {renderStepper(true)}
          </div>
        )}
      </div>

      {/* Mobile Drawer (Native App Style Floating Glass Card) */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200/80 px-6 pt-4 pb-7 shadow-2xl space-y-2 relative z-50 animate-in slide-in-from-top-3 duration-200">
          {currentUser && (
            <div className="flex items-center gap-3 p-3 mb-2 rounded-xl bg-emerald-50 border border-emerald-200/60">
              <div className="w-9 h-9 rounded-full bg-emerald-800 text-white flex items-center justify-center text-xs font-bold overflow-hidden">
                {currentUser.avatar ? (
                  <img src={currentUser.avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <span>{(currentUser.name || currentUser.email)[0].toUpperCase()}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-slate-900 truncate">{currentUser.name || currentUser.email}</div>
                <div className="text-[10px] text-emerald-700 truncate">{currentUser.email}</div>
              </div>
            </div>
          )}

          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = activeTab === link;
              return (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => {
                    setActiveTab(link);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive 
                      ? 'bg-emerald-50 text-[#165b39] border border-emerald-200/60 font-bold' 
                      : 'text-slate-700 hover:bg-slate-50 hover:text-[#165b39]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{link}</span>
                    {link === 'Amplop Digital' && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-100 text-amber-800 border border-amber-300">
                        3D Kartu ATM
                      </span>
                    )}
                  </span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-[#165b39]" />
                  )}
                </a>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            {currentUser ? (
              <>
                <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200/70 mb-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-800 text-white flex items-center justify-center text-xs font-bold border border-emerald-500/50 overflow-hidden shadow-xs">
                    {currentUser.avatar ? (
                      <img 
                        src={currentUser.avatar} 
                        alt={currentUser.name || currentUser.email} 
                        className="w-full h-full object-cover" 
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <span>{(currentUser.name || currentUser.email)[0].toUpperCase()}</span>
                    )}
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <div className="text-xs font-bold text-slate-900 truncate">
                      {currentUser.name || currentUser.email.split('@')[0]}
                    </div>
                    <div className="text-[10px] text-emerald-700 font-medium truncate">{currentUser.email}</div>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigateDashboard?.();
                  }}
                  className="w-full py-2.5 rounded-full text-sm font-bold text-white bg-[#10432a] hover:bg-[#0c3521] border border-emerald-400/50 shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <LayoutDashboard className="w-4 h-4 text-emerald-300" />
                  <span>Dashboard</span>
                </button>

                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout?.();
                  }}
                  className="w-full py-2.5 rounded-full text-sm font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-rose-600" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <button 
                onClick={() => handleAuthClick('login')}
                className="w-full py-3 rounded-full text-sm font-bold text-white bg-[#10432a] hover:bg-[#0c3521] border border-emerald-400/50 shadow-lg shadow-emerald-950/20 active:scale-[0.99] transition-all cursor-pointer"
              >
                Masuk / Daftar
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

