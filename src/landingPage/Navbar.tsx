import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { WeddingRingsIcon } from './DecorativeBackground';

interface NavbarProps {
  onOpenAuth?: (mode: 'login' | 'register') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth }) => {
  const [activeTab, setActiveTab] = useState('Beranda');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
          
          {/* Logo with Wedding Rings Icon (from Asset sheet) */}
          <div className="flex items-center gap-2.5 cursor-pointer group">
            <WeddingRingsIcon className="w-9 h-9 group-hover:scale-105 transition-transform duration-200 shadow-sm" />
            <span className="font-serif-wedding text-2xl tracking-normal text-slate-900 font-bold lowercase">
              i say yes
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-7 lg:space-x-8">
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

          {/* Right Action: Masuk / Daftar Button inside the green wave */}
          <div className="hidden md:flex items-center relative z-20">
            <button 
              onClick={() => handleAuthClick('login')}
              className="px-7 py-2 rounded-full text-sm font-bold text-white bg-[#10432a]/90 hover:bg-[#0c3521] border border-emerald-400/50 hover:border-emerald-300 shadow-[0_4px_16px_rgba(0,0,0,0.25)] hover:shadow-[0_6px_22px_rgba(0,0,0,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              Masuk / Daftar
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center relative z-20">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-white bg-[#144d31]/90 hover:bg-[#144d31] border border-emerald-400/30 shadow-sm focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer (Native App Style Floating Glass Card) */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200/80 px-6 pt-4 pb-7 shadow-2xl space-y-2 relative z-50 animate-in slide-in-from-top-3 duration-200">
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

          <div className="pt-3 border-t border-slate-100">
            <button 
              onClick={() => handleAuthClick('login')}
              className="w-full py-3 rounded-full text-sm font-bold text-white bg-[#144d31] hover:bg-[#0e3a24] shadow-lg shadow-emerald-950/20 active:scale-[0.99] transition-all cursor-pointer"
            >
              Masuk / Daftar
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
