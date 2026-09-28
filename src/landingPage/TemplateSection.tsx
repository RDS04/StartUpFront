import { useState } from 'react';
import { Search, Navigation, MousePointer } from 'lucide-react';
import { BotanicalLeaves } from './DecorativeBackground';

export interface TemplateItem {
  id: string;
  title: string;
  badge: 'GRATIS' | 'BRONZE' | 'GOLD';
  category: 'Pernikahan' | 'Ulang Tahun' | 'Khitanan' | 'Premium (Gold)';
  names: string;
  date?: string;
  themeStyle: 'rustic' | 'navy-gold' | 'java-batik' | 'geometric-blush' | 'emerald-luxury' | 'burgundy-arch';
}

const templates: TemplateItem[] = [
  {
    id: 't1',
    title: 'Rustic Blossom',
    badge: 'GRATIS',
    category: 'Pernikahan',
    names: 'Rustic Blossom',
    date: '15',
    themeStyle: 'rustic',
  },
  {
    id: 't2',
    title: 'Modern Elegant',
    badge: 'BRONZE',
    category: 'Pernikahan',
    names: 'Modern Elegant',
    themeStyle: 'navy-gold',
  },
  {
    id: 't3',
    title: 'Traditional Java',
    badge: 'GOLD',
    category: 'Pernikahan',
    names: 'Traditional Java',
    themeStyle: 'java-batik',
  },
  {
    id: 't4',
    title: 'Rustic Blossom',
    badge: 'GRATIS',
    category: 'Pernikahan',
    names: 'Wardani & Nisa Hana',
    themeStyle: 'geometric-blush',
  },
  {
    id: 't5',
    title: 'Modern Elegant',
    badge: 'GOLD',
    category: 'Premium (Gold)',
    names: 'Deniih & Dalam',
    date: '28',
    themeStyle: 'emerald-luxury',
  },
  {
    id: 't6',
    title: 'Traditional Java',
    badge: 'GOLD',
    category: 'Premium (Gold)',
    names: 'Walidhan & Thaininda',
    date: '15',
    themeStyle: 'burgundy-arch',
  },
];

interface TemplateSectionProps {
  onPreview: (template: TemplateItem) => void;
  onUseTemplate: (template: TemplateItem) => void;
}

export const TemplateSection: React.FC<TemplateSectionProps> = ({
  onPreview,
  onUseTemplate,
}) => {
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const filterTabs = ['Semua', 'Pernikahan', 'Ulang Tahun', 'Khitanan', 'Premium (Gold)'];

  const filteredTemplates = templates.filter((item) => {
    const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.names.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeFilter === 'Semua') return matchSearch;
    if (activeFilter === 'Premium (Gold)') return matchSearch && item.badge === 'GOLD';
    return matchSearch && item.category === activeFilter;
  });

  return (
    <section id="template" className="relative pt-12 pb-24 scroll-mt-20">
      <span id="pilihan-template" className="absolute -top-24" />
      
      {/* Floating cursors as seen in screenshot */}
      <div className="hidden lg:block absolute left-8 top-1/2 -translate-y-12 z-20 pointer-events-none opacity-80">
        <MousePointer className="w-5 h-5 text-slate-800 fill-slate-800 -rotate-12" />
      </div>
      <div className="hidden lg:block absolute right-8 top-1/3 z-20 pointer-events-none opacity-80">
        <MousePointer className="w-5 h-5 text-slate-800 fill-slate-800 rotate-45" />
      </div>
      <div className="hidden lg:block absolute right-1/4 bottom-24 z-20 pointer-events-none opacity-80">
        <MousePointer className="w-5 h-5 text-slate-800 fill-slate-800 rotate-12" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#216a49]">
            PILIHAN TEMPLATE
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            Pilihan Template Desain Terbaik
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg mx-auto">
            Pilih tema yang sesuai dengan konsep acaramu. Tersedia ratusan desain modern, elegan, dan tradisional.
          </p>
        </div>

        {/* Search and Filter Bar: Optimized with mobile horizontal swipe */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 w-full max-w-3xl mx-auto">
          
          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari Tema..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-slate-300 bg-white text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-600 shadow-sm"
            />
          </div>

          {/* Filter Pills with smooth horizontal swipe on mobile */}
          <div className="w-full sm:w-auto overflow-x-auto no-scrollbar py-1">
            <div className="flex items-center gap-2 min-w-max px-1 justify-start sm:justify-center">
              {filterTabs.map((tab) => {
                const isActive = activeFilter === tab;
                const isGold = tab === 'Premium (Gold)';

                if (isGold) {
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveFilter(tab)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer border select-none active:scale-95 ${
                        isActive
                          ? 'bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-500/20'
                          : 'bg-white text-amber-700 border-amber-300 hover:bg-amber-50'
                      }`}
                    >
                      {tab}
                    </button>
                  );
                }

                return (
                  <button
                    key={tab}
                    onClick={() => setActiveFilter(tab)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer border select-none active:scale-95 ${
                      isActive
                        ? 'bg-[#195b3d] text-white border-[#195b3d] shadow-md shadow-emerald-950/20 font-bold'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Templates Grid (2 Rows x 3 Columns) with Elevated Ambient Shadows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl bg-white border border-slate-200/80 shadow-[0_12px_30px_-5px_rgba(0,0,0,0.06),0_4px_12px_-2px_rgba(0,0,0,0.03)] hover:shadow-[0_25px_50px_-10px_rgba(0,0,0,0.13)] hover:-translate-y-1.5 transition-all duration-300 p-4 flex flex-col justify-between relative overflow-hidden"
            >
              
              {/* Template Card Canvas Preview */}
              <div className="relative h-[290px] rounded-xl overflow-hidden mb-4 flex items-center justify-center p-3 select-none">
                
                {/* Badge Top Right */}
                <div className="absolute top-3 right-3 z-20">
                  {item.badge === 'GRATIS' && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white bg-[#168a44] shadow-sm tracking-wide">
                      GRATIS
                    </span>
                  )}
                  {item.badge === 'BRONZE' && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white bg-[#a35e2e] shadow-sm tracking-wide">
                      BRONZE
                    </span>
                  )}
                  {item.badge === 'GOLD' && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white bg-[#c98e29] shadow-sm tracking-wide">
                      GOLD
                    </span>
                  )}
                </div>

                {/* THEME STYLE PREVIEWS EXACTLY LIKE SCREENSHOT */}

                {/* 1. Rustic Blossom (Warm cream & earthy tone luxury invitation) */}
                {item.themeStyle === 'rustic' && (
                  <div className="w-full h-full bg-[#F9F6F0] border border-[#E9DFD0] rounded-xl flex flex-col items-center justify-between p-4 text-center relative overflow-hidden group/thumb shadow-inner">
                    {/* Corner ambient blur waves */}
                    <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-[#EADCC8]/50 blur-xl pointer-events-none" />
                    <div className="absolute -bottom-10 -left-10 w-28 h-28 rounded-full bg-[#D6C5AD]/40 blur-xl pointer-events-none" />

                    {/* Top Basmalah & Tag */}
                    <div className="relative z-10 space-y-0.5 pt-1">
                      <p className="text-[10px] font-serif text-[#82694D] tracking-wide" dir="rtl">
                        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                      </p>
                      <p className="text-[8px] uppercase tracking-[0.25em] font-semibold text-[#82694D]">
                        UNDANGAN PERNIKAHAN
                      </p>
                    </div>

                    {/* Couple Photo & Cursive Names */}
                    <div className="relative z-10 flex flex-col items-center my-auto space-y-1.5 py-1">
                      <div className="w-14 h-14 rounded-full p-0.5 border border-[#82694D]/50 shadow-sm overflow-hidden">
                        <img
                          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=300&q=80"
                          alt="Andi & Rosna"
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                      <h4 className="font-script-calligraphy text-2xl text-[#392E21] leading-tight">
                        Andi &amp; Rosna
                      </h4>
                      <p className="text-[9px] font-serif tracking-widest text-[#786653]">
                        24 • 10 • 2026
                      </p>
                    </div>

                    {/* Bottom Mini CTA */}
                    <div className="relative z-10 w-full">
                      <div className="w-full py-1.5 px-3 rounded-full bg-[#82694D]/10 text-[#82694D] text-[9px] font-bold tracking-wider uppercase border border-[#82694D]/25 flex items-center justify-center gap-1 group-hover/thumb:bg-[#82694D] group-hover/thumb:text-white transition-all shadow-xs">
                        <span>Pratinjau Live</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Modern Elegant (Deep navy with gold geometric lines) */}
                {item.themeStyle === 'navy-gold' && (
                  <div className="w-full h-full bg-[#121c2d] rounded-lg flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
                    {/* Gold geometric lines in background */}
                    <div className="absolute inset-2 border border-amber-400/30 rounded" />
                    <div className="absolute inset-4 border border-amber-400/20 rotate-1 rounded" />
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-400/20 to-transparent pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-amber-400/20 to-transparent pointer-events-none" />

                    <div className="relative z-10 space-y-1.5 px-3 py-4">
                      <span className="text-[10px] tracking-widest text-amber-200/80 font-serif-wedding">
                        i say yes
                      </span>
                      <h4 className="font-serif-wedding text-base font-bold text-white tracking-wide">
                        Modern<br />Elegant
                      </h4>
                      <p className="text-[8px] text-amber-100/70 max-w-[130px] mx-auto leading-relaxed pt-1">
                        Pernikahan impian dengan konsep modern dan penuh kemewahan
                      </p>
                      <div className="w-10 h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-2" />
                    </div>
                  </div>
                )}

                {/* 3. Traditional Java (Rich brown / batik motif with gold filigree) */}
                {item.themeStyle === 'java-batik' && (
                  <div className="w-full h-full bg-[#3b2314] rounded-lg flex flex-col items-center justify-center p-3 text-center relative overflow-hidden">
                    {/* Batik gunungan ornamental border */}
                    <div className="absolute inset-2 border-2 border-amber-500/40 rounded flex flex-col items-center justify-between p-2">
                      <div className="w-full h-6 border-b border-amber-500/20 flex justify-center items-center text-amber-400 text-xs">
                        ❖ ❖ ❖
                      </div>
                      <div className="w-full h-6 border-t border-amber-500/20 flex justify-center items-center text-amber-400 text-xs">
                        ❖ ❖ ❖
                      </div>
                    </div>

                    <div className="relative z-10 space-y-2 p-2 bg-[#2d190d]/60 rounded-lg border border-amber-500/30 w-full max-w-[170px]">
                      <span className="text-[9px] text-amber-300/80 uppercase tracking-widest">
                        i say yes
                      </span>
                      <h4 className="font-serif-wedding text-sm font-bold text-amber-100">
                        Traditional<br />Java
                      </h4>
                      <div className="w-8 h-8 mx-auto flex items-center justify-center text-amber-400 text-sm">
                        ⚜️
                      </div>
                      <p className="text-[8px] text-amber-200/60 leading-tight">
                        Adat Jawa Nuansa Klasik
                      </p>
                    </div>
                  </div>
                )}

                {/* 4. Geometric Blush Floral (Wardani & Nisa Hana) */}
                {item.themeStyle === 'geometric-blush' && (
                  <div className="w-full h-full bg-gradient-to-br from-[#fcf7f8] via-[#f9f1f2] to-[#f4e4e6] rounded-lg flex flex-col items-center justify-center p-3 text-center relative overflow-hidden">
                    {/* Geometric gold hexagon line */}
                    <div className="w-44 h-48 border border-amber-400/70 rounded-2xl flex flex-col items-center justify-center p-3 relative bg-white/60 shadow-sm backdrop-blur-xs">
                      {/* Floral leaves on corners */}
                      <span className="absolute -top-3 -left-3 text-lg">🌸</span>
                      <span className="absolute -bottom-3 -right-3 text-lg">🌿</span>
                      <span className="absolute -bottom-2 -left-2 text-base">🌺</span>

                      <span className="text-[9px] text-slate-400 font-serif-wedding">
                        i say yes
                      </span>
                      <h4 className="font-script-calligraphy text-2xl text-slate-800 leading-tight my-1">
                        Wardani<br />&amp;<br />Nisa Hana
                      </h4>
                      <p className="text-[8px] text-slate-500 leading-tight mt-1">
                        Bersama keluarga mengundang kehadiran Bapak/Ibu
                      </p>
                    </div>
                  </div>
                )}

                {/* 5. Emerald Luxury (Deniih & Dalam) */}
                {item.themeStyle === 'emerald-luxury' && (
                  <div className="w-full h-full bg-[#0d2a1d] rounded-lg flex flex-col items-center justify-center p-3 text-center relative overflow-hidden">
                    {/* Emerald gold frame */}
                    <div className="w-44 h-52 border border-amber-400/50 rounded-xl flex flex-col items-center justify-center p-3 relative bg-[#092217] shadow-inner">
                      <div className="absolute top-2 left-2 text-[9px] text-amber-400/50">✦</div>
                      <div className="absolute top-2 right-2 text-[9px] text-amber-400/50">✦</div>
                      <div className="absolute bottom-2 left-2 text-[9px] text-amber-400/50">✦</div>
                      <div className="absolute bottom-2 right-2 text-[9px] text-amber-400/50">✦</div>

                      <span className="text-[9px] text-amber-300 font-serif-wedding">
                        i say yes
                      </span>
                      <h4 className="font-serif-wedding text-lg font-bold text-amber-100 my-1 leading-tight">
                        Deniih<br />&amp;<br />Dalam
                      </h4>
                      <div className="w-8 h-[1px] bg-amber-400/60 my-1" />
                      <div className="inline-block px-2 py-0.5 border border-amber-400/40 rounded text-amber-300 font-bold text-xs mt-1">
                        28
                      </div>
                      <p className="text-[8px] text-amber-200/60 mt-1">Minggu, November 2026</p>
                    </div>
                  </div>
                )}

                {/* 6. Burgundy Arch (Walidhan & Thaininda) */}
                {item.themeStyle === 'burgundy-arch' && (
                  <div className="w-full h-full bg-[#fdfbf8] rounded-lg flex flex-col items-center justify-center p-3 text-center relative overflow-hidden">
                    {/* Arch shape frame */}
                    <div className="w-40 h-52 border-2 border-amber-300 rounded-t-full rounded-b-lg flex flex-col items-center justify-center p-3 relative bg-white shadow-sm">
                      {/* Dark burgundy floral cluster */}
                      <span className="absolute -top-3 -left-3 text-lg">🌹</span>
                      <span className="absolute -top-3 -right-3 text-lg">🌺</span>
                      <span className="absolute -bottom-3 -right-2 text-lg">🌸</span>

                      <span className="text-[9px] text-slate-400 font-serif-wedding">
                        i say yes
                      </span>
                      <h4 className="font-script-calligraphy text-xl text-slate-800 my-1 leading-tight">
                        Walidhan<br />&amp;<br />Thaininda
                      </h4>
                      <div className="w-6 h-[1px] bg-amber-300 my-1" />
                      <span className="text-xs font-bold text-amber-700 font-serif-wedding">
                        15
                      </span>
                      <p className="text-[8px] text-slate-400 mt-0.5">Sabtu, 15 Juli 2026</p>
                    </div>
                  </div>
                )}

              </div>

              {/* Card Footer: Title & Two Buttons */}
              <div className="space-y-3 pt-1">
                <h3 className="text-center font-bold text-slate-800 text-sm">
                  {item.title}
                </h3>
                
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onPreview(item)}
                    className="py-2.5 sm:py-1.5 px-2 rounded-full text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 active:scale-95 transition-all cursor-pointer text-center min-h-[40px] flex items-center justify-center shadow-xs"
                  >
                    Pratinjau (Preview)
                  </button>
                  <button
                    onClick={() => onUseTemplate(item)}
                    className="py-2.5 sm:py-1.5 px-2 rounded-full text-xs font-bold text-white bg-[#2b6547] hover:bg-[#204d35] active:scale-95 transition-all cursor-pointer text-center min-h-[40px] flex items-center justify-center shadow-md shadow-emerald-950/20"
                  >
                    Gunakan Template
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Section in Screenshot: Paper Airplane, 50,000+ Pasangan, and Leaf */}
        <div className="mt-20 pt-8 relative flex flex-col items-center justify-center text-center">
          
          {/* Paper airplane outline */}
          <div className="absolute left-1/4 top-0 text-slate-400">
            <Navigation className="w-5 h-5 -rotate-45" />
          </div>

          {/* 3 Avatars & Count */}
          <div className="flex -space-x-2.5 overflow-hidden mb-3">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
              alt="User"
              className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
              alt="User"
              className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80"
              alt="User"
              className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
            />
          </div>

          <p className="text-xs text-slate-500 font-medium">
            Telah dipercaya oleh
          </p>
          <p className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight my-0.5">
            50,000+
          </p>
          <p className="text-xs text-slate-500 font-medium">
            pasangan
          </p>

          {/* Bottom right leaf illustration */}
          <BotanicalLeaves.BottomRight />

        </div>

      </div>

    </section>
  );
};
