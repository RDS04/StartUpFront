import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Navigation, MousePointer, Calendar, MapPin, Music, Sparkles } from 'lucide-react';
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
    names: 'Andi & Rosna',
    date: '24.10.2026',
    themeStyle: 'rustic',
  },
  {
    id: 't2',
    title: 'Modern Elegant',
    badge: 'BRONZE',
    category: 'Pernikahan',
    names: 'Dimas & Maya',
    date: '15.11.2026',
    themeStyle: 'navy-gold',
  },
  {
    id: 't3',
    title: 'Traditional Java',
    badge: 'GOLD',
    category: 'Pernikahan',
    names: 'Raden & Sekar',
    date: '08.12.2026',
    themeStyle: 'java-batik',
  },
  {
    id: 't4',
    title: 'Geometric Blush',
    badge: 'GRATIS',
    category: 'Pernikahan',
    names: 'Wardani & Nisa Hana',
    date: '14.02.2026',
    themeStyle: 'geometric-blush',
  },
  {
    id: 't5',
    title: 'Emerald Luxury',
    badge: 'GOLD',
    category: 'Premium (Gold)',
    names: 'Deniih & Dalam',
    date: '28.11.2026',
    themeStyle: 'emerald-luxury',
  },
  {
    id: 't6',
    title: 'Burgundy Arch',
    badge: 'GOLD',
    category: 'Premium (Gold)',
    names: 'Walidhan & Thaininda',
    date: '15.07.2026',
    themeStyle: 'burgundy-arch',
  },
];

interface TemplateSectionProps {
  onPreview: (template: TemplateItem) => void;
  onUseTemplate: (template: TemplateItem) => void;
}

// Single Scrollable Invitation Content component for the iPhone screen mockup
const InvitationTemplateContent: React.FC<{ item: TemplateItem }> = ({ item }) => {
  switch (item.themeStyle) {
    case 'rustic':
      return (
        <div className="w-full bg-[#F9F6F0] text-[#392E21] p-4 text-center space-y-5 border-b border-[#E9DFD0]">
          {/* Cover Header */}
          <div className="pt-6 space-y-1.5">
            <p className="text-[10px] font-serif text-[#82694D]" dir="rtl">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
            <p className="text-[7px] uppercase tracking-[0.25em] font-semibold text-[#82694D]">
              UNDANGAN PERNIKAHAN
            </p>
          </div>

          {/* Couple Photo & Names */}
          <div className="flex flex-col items-center space-y-2">
            <div className="w-16 h-16 rounded-full p-1 border-2 border-[#82694D]/60 shadow-md overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80"
                alt="Andi & Rosna"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <h4 className="font-script-calligraphy text-2xl text-[#392E21] leading-tight pt-1">
              {item.names}
            </h4>
            <span className="text-[9px] font-serif tracking-widest text-[#82694D] bg-[#82694D]/10 px-3 py-0.5 rounded-full border border-[#82694D]/20">
              {item.date || '24 • 10 • 2026'}
            </span>
          </div>

          {/* Quote Section */}
          <div className="bg-white/80 p-3 rounded-xl border border-[#E9DFD0] shadow-2xs space-y-1">
            <p className="text-[8px] text-[#786653] italic leading-relaxed">
              "Dan di antara tanda-tanda (kebesaran-Nya) ialah Dia menciptakan pasangan-pasangan untukmu..."
            </p>
            <p className="text-[7px] font-bold text-[#82694D]">(QS. Ar-Rum: 21)</p>
          </div>

          {/* Event Details Card */}
          <div className="bg-[#82694D]/10 p-3 rounded-xl border border-[#82694D]/20 space-y-2 text-[8px]">
            <div className="flex items-center justify-center gap-1 font-bold text-[#392E21]">
              <Calendar className="w-3 h-3 text-[#82694D]" />
              <span>AKAD &amp; RESEPSI</span>
            </div>
            <p className="text-[#65523d]">Sabtu, 24 Oktober 2026</p>
            <p className="text-[#65523d] flex items-center justify-center gap-1">
              <MapPin className="w-2.5 h-2.5 text-[#82694D]" />
              <span>Ballroom Grand Sahid, Jakarta</span>
            </p>
          </div>

          {/* Countdown Preview */}
          <div className="grid grid-cols-4 gap-1 pt-1">
            {['120', '14', '35', '50'].map((val, idx) => (
              <div key={idx} className="bg-white p-1.5 rounded-lg border border-[#E9DFD0] text-center">
                <span className="block text-[10px] font-bold text-[#392E21]">{val}</span>
                <span className="text-[6px] text-[#82694D] uppercase font-semibold">
                  {['Hari', 'Jam', 'Min', 'Det'][idx]}
                </span>
              </div>
            ))}
          </div>

          {/* Music player badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#82694D] text-white text-[8px] font-semibold shadow-xs">
            <Music className="w-2.5 h-2.5 animate-spin" />
            <span>A Thousand Years - Christina Perri</span>
          </div>
        </div>
      );

    case 'navy-gold':
      return (
        <div className="w-full bg-[#0b1329] text-white p-4 text-center space-y-5 border-b border-amber-500/20">
          <div className="pt-6 space-y-1">
            <span className="text-[8px] uppercase tracking-widest text-amber-300 font-serif-wedding">
              The Wedding Of
            </span>
            <h4 className="font-serif-wedding text-2xl font-bold text-amber-100 tracking-wide">
              {item.names}
            </h4>
            <p className="text-[8px] text-amber-200/70 font-mono">15.11.2026</p>
          </div>

          {/* Photo Showcase */}
          <div className="w-20 h-24 mx-auto rounded-xl p-0.5 bg-gradient-to-tr from-amber-500 to-amber-200 shadow-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=400&q=80"
              alt="Dimas & Maya"
              className="w-full h-full object-cover rounded-[10px]"
            />
          </div>

          {/* Gold Divider Line */}
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto" />

          {/* Schedule Card */}
          <div className="bg-slate-900/90 p-3 rounded-xl border border-amber-400/30 text-[8px] space-y-1.5">
            <p className="text-amber-300 font-bold uppercase tracking-wider">Acara Pernikahan</p>
            <p className="text-slate-300">Resepsi: 11:00 - 15:00 WIB</p>
            <p className="text-amber-200/80">Hotel Indonesia Kempinski</p>
          </div>

          {/* Digital Envelope QRIS */}
          <div className="bg-gradient-to-r from-amber-500/20 to-amber-700/20 p-2.5 rounded-xl border border-amber-400/40 text-[8px] flex items-center justify-between">
            <span className="font-bold text-amber-200">🎁 Amplop Digital / QRIS</span>
            <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-black text-[7px]">AKTIF</span>
          </div>
        </div>
      );

    case 'java-batik':
      return (
        <div className="w-full bg-[#2d190d] text-amber-100 p-4 text-center space-y-5 border-b border-amber-600/30">
          <div className="pt-6 space-y-1">
            <div className="text-amber-400 text-xs">❖ ⚜️ ❖</div>
            <p className="text-[7px] tracking-widest uppercase text-amber-300/80">PAWIWAHAN AGENG</p>
            <h4 className="font-serif-wedding text-2xl font-bold text-amber-200 leading-tight">
              {item.names}
            </h4>
          </div>

          {/* Couple Photo Frame Java */}
          <div className="w-16 h-16 mx-auto rounded-full border-2 border-amber-500/60 p-1 bg-[#1a0c05] shadow-md">
            <img
              src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=400&q=80"
              alt="Raden & Sekar"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          <div className="bg-[#1a0c05]/90 p-3 rounded-xl border border-amber-500/40 text-[8px] space-y-1">
            <p className="font-bold text-amber-300">Nyuwun Pangestu</p>
            <p className="text-amber-100/80">Minggu Kliwon, 08 Desember 2026</p>
            <p className="text-amber-200/60">Gedung Kesenian Yogyakarta</p>
          </div>

          <div className="bg-amber-500/10 p-2 rounded-lg border border-amber-500/20 text-[7px] text-amber-300">
            🎶 Gendhing Jawa Ladrang Pengantin
          </div>
        </div>
      );

    case 'geometric-blush':
      return (
        <div className="w-full bg-[#fff5f6] text-slate-800 p-4 text-center space-y-5 border-b border-rose-200">
          <div className="pt-6 space-y-1">
            <span className="text-rose-400 text-xs">🌸</span>
            <p className="text-[7px] tracking-widest uppercase text-rose-600 font-bold">WE ARE GETTING MARRIED</p>
            <h4 className="font-script-calligraphy text-2xl text-slate-900">
              {item.names}
            </h4>
          </div>

          <div className="w-16 h-16 mx-auto rounded-full p-1 border-2 border-rose-300 bg-white shadow-sm overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80"
              alt="Wardani & Nisa Hana"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          <div className="bg-white p-3 rounded-xl border border-rose-200 shadow-2xs text-[8px] space-y-1">
            <p className="font-bold text-rose-800">Save The Date</p>
            <p className="text-slate-600">14 Februari 2026</p>
          </div>
        </div>
      );

    case 'emerald-luxury':
      return (
        <div className="w-full bg-[#063b27] text-white p-4 text-center space-y-5 border-b border-emerald-500/30">
          <div className="pt-6 space-y-1">
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-200 text-[7px] font-bold border border-emerald-400/30">
              <Sparkles className="w-2 h-2 text-amber-300" /> LUXURY EDITION
            </div>
            <h4 className="font-serif-wedding text-2xl font-bold text-amber-200 pt-1">
              {item.names}
            </h4>
            <p className="text-[8px] text-emerald-200/80">28 November 2026</p>
          </div>

          <div className="w-20 h-24 mx-auto rounded-xl border border-amber-400/50 p-0.5 bg-[#032417] shadow-xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=400&q=80"
              alt="Deniih & Dalam"
              className="w-full h-full object-cover rounded-[10px]"
            />
          </div>

          <div className="bg-[#032417] p-3 rounded-xl border border-emerald-400/30 text-[8px] space-y-1">
            <p className="font-bold text-amber-300">RSVP Realtime WhatsApp</p>
            <p className="text-emerald-100/80">Konfirmasi Kehadiran Tamu</p>
          </div>
        </div>
      );

    case 'burgundy-arch':
    default:
      return (
        <div className="w-full bg-[#3b0712] text-rose-100 p-4 text-center space-y-5 border-b border-rose-800/40">
          <div className="pt-6 space-y-1">
            <span className="text-amber-400 text-xs">🌹</span>
            <p className="text-[7px] tracking-widest uppercase text-rose-300 font-bold">THE WEDDING OF</p>
            <h4 className="font-script-calligraphy text-2xl text-amber-200">
              {item.names}
            </h4>
          </div>

          <div className="w-16 h-20 mx-auto rounded-t-full border border-amber-400/50 p-0.5 bg-[#260309] shadow-md overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=400&q=80"
              alt="Walidhan & Thaininda"
              className="w-full h-full object-cover rounded-t-full"
            />
          </div>

          <div className="bg-[#260309] p-3 rounded-xl border border-rose-800/50 text-[8px] space-y-1">
            <p className="font-bold text-amber-300">Sabtu, 15 Juli 2026</p>
            <p className="text-rose-200/80">The Ritz-Carlton, Jakarta</p>
          </div>
        </div>
      );
  }
};

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
      
      {/* Floating cursors decor */}
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
            Pilih tema yang sesuai dengan konsep acaramu. Tampilan realistik iPhone dengan animasi otomatis saat dilihat.
          </p>
        </div>

        {/* Search and Filter Bar */}
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

          {/* Filter Pills */}
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

        {/* Templates Grid with iPhone Frame Mockups */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredTemplates.map((item) => (
            <div
              key={item.id}
              className="group rounded-3xl bg-white/90 backdrop-blur-sm border border-slate-200/80 shadow-[0_12px_30px_-5px_rgba(0,0,0,0.06)] hover:shadow-[0_25px_60px_-10px_rgba(20,77,49,0.15)] hover:-translate-y-2 transition-all duration-300 p-5 flex flex-col justify-between relative overflow-hidden"
            >
              
              {/* REALISTIC IPHONE FRAME MOCKUP CONTAINER */}
              <div className="relative w-full py-2 flex items-center justify-center">
                
                <div className="relative w-[240px] sm:w-[250px] h-[430px] sm:h-[450px] bg-slate-950 rounded-[42px] p-2.5 shadow-2xl border-[5px] border-slate-800 ring-1 ring-slate-900/60 flex flex-col items-center select-none group/phone hover:scale-[1.02] transition-transform duration-300">
                  
                  {/* Side Buttons (Volume & Power Button Accents) */}
                  <div className="absolute -left-[7px] top-20 w-[3px] h-6 bg-slate-700 rounded-l-sm" />
                  <div className="absolute -left-[7px] top-30 w-[3px] h-9 bg-slate-700 rounded-l-sm" />
                  <div className="absolute -left-[7px] top-42 w-[3px] h-9 bg-slate-700 rounded-l-sm" />
                  <div className="absolute -right-[7px] top-28 w-[3px] h-12 bg-slate-700 rounded-r-sm" />

                  {/* Inner iPhone Screen Viewport */}
                  <div className="w-full h-full rounded-[34px] overflow-hidden bg-white relative flex flex-col shadow-inner border border-slate-900/40">
                    
                    {/* Dynamic Island / iPhone Notch */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-950 rounded-full z-30 flex items-center justify-between px-2 shadow-sm pointer-events-none">
                      <div className="w-2 h-2 rounded-full bg-slate-800" />
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-900/90 ring-1 ring-blue-500/40" />
                    </div>

                    {/* Badge Overlay (Top Right inside Phone Screen) */}
                    <div className="absolute top-7 right-2.5 z-30 pointer-events-none">
                      {item.badge === 'GRATIS' && (
                        <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold text-white bg-[#168a44] shadow-md tracking-wide">
                          GRATIS
                        </span>
                      )}
                      {item.badge === 'BRONZE' && (
                        <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold text-white bg-[#a35e2e] shadow-md tracking-wide">
                          BRONZE
                        </span>
                      )}
                      {item.badge === 'GOLD' && (
                        <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold text-white bg-[#c98e29] shadow-md tracking-wide">
                          GOLD
                        </span>
                      )}
                    </div>

                    {/* Auto-Scrolling Digital Invitation Canvas */}
                    <div className="w-full h-full overflow-hidden relative">
                      <motion.div
                        animate={{ y: ['0%', '-50%'] }}
                        transition={{
                          duration: 15,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                        className="w-full flex flex-col"
                      >
                        {/* Repeated 2 times for seamless infinite vertical scroll */}
                        <InvitationTemplateContent item={item} />
                        <InvitationTemplateContent item={item} />
                      </motion.div>
                    </div>

                    {/* Bottom Home Indicator Bar */}
                    <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-20 h-1 bg-slate-400/80 rounded-full z-30 pointer-events-none" />

                  </div>

                </div>

              </div>

              {/* Card Footer: Title & Action Buttons */}
              <div className="space-y-3 pt-4">
                <div className="text-center">
                  <h3 className="font-bold text-slate-900 text-base">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {item.names}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onPreview(item)}
                    className="py-2.5 sm:py-2 px-2 rounded-full text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 active:scale-95 transition-all cursor-pointer text-center flex items-center justify-center gap-1 shadow-xs"
                  >
                    <span>Pratinjau</span>
                  </button>
                  <button
                    onClick={() => onUseTemplate(item)}
                    className="py-2.5 sm:py-2 px-2 rounded-full text-xs font-bold text-white bg-[#195b3d] hover:bg-[#134930] active:scale-95 transition-all cursor-pointer text-center flex items-center justify-center shadow-md shadow-emerald-950/20"
                  >
                    <span>Gunakan</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Section: 50,000+ Pasangan */}
        <div className="mt-20 pt-8 relative flex flex-col items-center justify-center text-center">
          
          <div className="absolute left-1/4 top-0 text-slate-400">
            <Navigation className="w-5 h-5 -rotate-45" />
          </div>

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

          <BotanicalLeaves.BottomRight />

        </div>

      </div>

    </section>
  );
};

