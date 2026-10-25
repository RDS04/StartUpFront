import React, { useState, useRef } from 'react';
import {
  Search,
  Navigation,
  MousePointer,
  Calendar,
  MapPin,
  Music,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { BotanicalLeaves } from './DecorativeBackground';
import templateSatuMockupImg from '../tempalte/satu/image.png';
import templateDuaMockupImg from '../tempalte/dua/image.png';
import templateTigaMockupImg from '../tempalte/tiga/image.png';
import templateEmpatMockupImg from '../tempalte/empat/image.png';
import wisudaMockupImg from '../tempalte/Wisuda/satu/image.png';
import wisudaDuaMockupImg from '../tempalte/Wisuda/dua/image.png';
import karinWisudaImg from '../assets/templateWisuda/karin-wisuda.jpg';

export interface TemplateItem {
  id: string;
  title: string;
  badge: 'GRATIS' | 'BRONZE' | 'GOLD';
  category: 'Undangan Wedding' | 'Undangan Wisuda' | 'Pernikahan' | 'Wisuda' | 'Ulang Tahun' | 'Khitanan' | 'Premium (Gold)';
  names: string;
  date?: string;
  themeStyle: 'rustic' | 'dusty-rose' | 'minang-maroon' | 'sage-garden' | 'wisuda-karin' | 'wisuda-yolanda';
  mockupImg?: string;
  tagSubtitle?: string;
}

const templates: TemplateItem[] = [
  {
    id: 't1',
    title: 'Rustic Blossom (Template 1)',
    badge: 'GRATIS',
    category: 'Undangan Wedding',
    names: 'Andi & Rosna',
    date: '24.10.2026',
    themeStyle: 'rustic',
    mockupImg: templateSatuMockupImg,
    tagSubtitle: 'Floral Burgundy',
  },
  {
    id: 't2',
    title: 'Dusty Rose Lily (Template 2)',
    badge: 'BRONZE',
    category: 'Undangan Wedding',
    names: 'Vani & Rahmat',
    date: '10.10.2026',
    themeStyle: 'dusty-rose',
    mockupImg: templateDuaMockupImg,
    tagSubtitle: 'Soft Pastel Floral',
  },
  {
    id: 't3',
    title: 'Minang Maroon Gold (Template 3)',
    badge: 'GOLD',
    category: 'Undangan Wedding',
    names: 'Yusron & Putri',
    date: '19.09.2026',
    themeStyle: 'minang-maroon',
    mockupImg: templateTigaMockupImg,
    tagSubtitle: 'Adat Minang & Gold',
  },
  {
    id: 't4',
    title: 'Sage Garden Blossom (Template 4)',
    badge: 'GOLD',
    category: 'Undangan Wedding',
    names: 'Ilham & Annisa',
    date: '24.10.2026',
    themeStyle: 'sage-garden',
    mockupImg: templateEmpatMockupImg,
    tagSubtitle: 'Sage Green & White',
  },
  {
    id: 't-wisuda-1',
    title: 'Wisuda Karin (Template Wisuda 1)',
    badge: 'BRONZE',
    category: 'Undangan Wisuda',
    names: 'Karin Wijaya, S.E',
    date: '06.06.2029',
    themeStyle: 'wisuda-karin',
    mockupImg: wisudaMockupImg,
    tagSubtitle: 'Wisuda Modern',
  },
  {
    id: 't-wisuda-2',
    title: 'Wisuda Black Gold (Template Wisuda 2)',
    badge: 'GOLD',
    category: 'Undangan Wisuda',
    names: 'Yolanda Putri',
    date: '02.07.2024',
    themeStyle: 'wisuda-yolanda',
    mockupImg: wisudaDuaMockupImg,
    tagSubtitle: 'Black Gold Luxury',
  },
];

interface TemplateSectionProps {
  onPreview: (template: TemplateItem) => void;
  onUseTemplate: (template: TemplateItem) => void;
}

// Single Scrollable Invitation Content component for the iPhone screen mockup
export const InvitationTemplateContent: React.FC<{ item: TemplateItem }> = ({ item }) => {
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

    case 'dusty-rose':
      return (
        <div className="w-full bg-[#967678] text-white text-center border-b border-white/20" style={{ fontFamily: "'Onest', sans-serif" }}>
          {/* Cover */}
          <div className="relative h-[260px] overflow-hidden">
            <img
              src="https://assets.satumomen.com/images/invitation/bg-section-101089281789112220.jpg"
              alt="Vani & Rahmat"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/70" />
            <div className="absolute bottom-4 inset-x-0 space-y-1">
              <p className="text-[6px] uppercase tracking-[0.35em] text-white/80">The Wedding Of</p>
              <h4 className="font-serif-wedding text-xl font-semibold">{item.names}</h4>
              <p className="text-[7px] tracking-[0.3em]">10.10.26</p>
              <span className="inline-block mt-1 px-3 py-0.5 rounded-full bg-[#57514f] text-[7px]">Open Invitation</span>
            </div>
          </div>

          {/* Quote with arch */}
          <div className="p-4 space-y-2">
            <div className="w-16 h-20 mx-auto rounded-t-full border-2 border-white/60 p-0.5 overflow-hidden">
              <img
                src="https://assets.satumomen.com/images/galleries/907791-gallery-TqU6H1FAAs.jpg"
                alt="Arch"
                className="w-full h-full object-cover rounded-t-full"
              />
            </div>
            <p className="text-[7px] leading-relaxed text-white/90">
              "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu..."
            </p>
            <p className="text-[7px] italic">Surah Ar-Rum : 21</p>
          </div>

          {/* Resepsi capsule */}
          <div className="px-6 pb-5">
            <div className="bg-white/80 text-[#2f2a29] rounded-full py-6 px-3 space-y-0.5">
              <p className="text-xl text-[#57514f]" style={{ fontFamily: "'Pinyon Script', cursive" }}>Resepsi</p>
              <p className="text-[8px] font-bold text-[#57514f]">Sabtu, 10 Oktober 2026</p>
              <p className="text-[7px]">11.00 WIB - Selesai</p>
              <p className="text-[7px] font-bold">Kediaman Mempelai Pria</p>
              <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-[#57514f] text-white text-[6px]">Maps</span>
            </div>
          </div>

          {/* Gallery */}
          <div className="px-3 pb-4">
            <p className="text-lg mb-1.5" style={{ fontFamily: "'Pinyon Script', cursive" }}>Our Moment</p>
            <div className="grid grid-cols-3 gap-1">
              {['duXNBO9cDL', 'MHXODbcCmd', 'ekI9OQP65Z'].map((id) => (
                <img
                  key={id}
                  src={`https://assets.satumomen.com/images/galleries/907791-gallery-${id}.jpg`}
                  alt="Moment"
                  className="w-full h-12 object-cover"
                />
              ))}
            </div>
          </div>
        </div>
      );

    case 'minang-maroon':
      return (
        <div className="w-full bg-[#4a0910] text-[#f0e6d2] text-center border-b border-[#cfa84a]/30">
          {/* Songket Header Banner */}
          <div className="w-full overflow-hidden">
            <img
              src="https://digitalinviting.com/wp-content/uploads/2023/12/backg-png-1.png"
              alt="Songket"
              className="w-full h-8 object-cover"
            />
          </div>

          {/* Couple Photo Arch */}
          <div className="p-4 space-y-2 flex flex-col items-center">
            <div className="w-20 h-28 rounded-t-full rounded-b-full border-2 border-[#cfa84a] p-0.5 overflow-hidden shadow-md">
              <img
                src="https://digitalinviting.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-05-at-17.18.24.jpeg"
                alt="Yusron & Putri"
                className="w-full h-full object-cover rounded-t-full rounded-b-full"
              />
            </div>

            <p className="text-[7px] uppercase tracking-[0.25em] text-[#ded0b4]">The Wedding Of</p>
            <h4 className="text-2xl text-[#f5df9a]" style={{ fontFamily: "'Great Vibes', cursive" }}>
              {item.names}
            </h4>
            <p className="text-[7px] text-[#ded0b4] max-w-[180px] leading-tight">
              Kami akan menikah, kami ingin anda menjadi bagian dari hari bahagia kami
            </p>

            {/* Countdown mini */}
            <div className="grid grid-cols-4 gap-1 w-full max-w-[170px] pt-1">
              {['00', '00', '00', '00'].map((val, idx) => (
                <div key={idx} className="bg-[#ded0b4] text-[#4a0910] p-1 rounded font-bold text-[8px]">
                  {val}
                  <span className="block text-[5px] font-normal">{['Hari', 'Jam', 'Min', 'Det'][idx]}</span>
                </div>
              ))}
            </div>

            {/* Rumah Gadang Sketch Mini */}
            <div className="w-24 mx-auto pt-2">
              <img
                src="https://digitalinviting.com/wp-content/uploads/2023/12/Makan-Khas-Nusantara-Padang-Minangkabau-e1670778860199-1.png"
                alt="Rumah Gadang"
                className="w-full h-auto"
              />
            </div>
            <p className="text-[8px] font-serif italic text-[#f3df95]">Ar-Rum : 21</p>
          </div>

          {/* Songket Footer Banner */}
          <div className="w-full overflow-hidden">
            <img
              src="https://digitalinviting.com/wp-content/uploads/2023/12/backg-png-1-e1670777116300-1.png"
              alt="Songket Bottom"
              className="w-full h-8 object-cover"
            />
          </div>
        </div>
      );

    case 'sage-garden':
      return (
        <div className="w-full bg-[#fafbf7] text-[#2c3d2f] text-center border-b border-[#8f9e7b]/30">
          {/* Leaf Ornaments Header */}
          <div className="relative pt-4 pb-2 px-3 flex flex-col items-center">
            <div className="w-20 h-28 rounded-t-full rounded-b-xl border-2 border-[#8f9e7b] p-0.5 overflow-hidden shadow-md">
              <img
                src="https://undangandigitalhbkomp.com/wp-content/uploads/2023/11/WhatsApp-Image-2023-11-14-at-09.11.57.jpeg"
                alt="Eza & Islammy"
                className="w-full h-full object-cover rounded-t-full rounded-b-lg"
              />
            </div>

            <p className="text-[7px] uppercase tracking-[0.25em] text-[#718569] font-bold mt-2">The Wedding Of</p>
            <h4 className="text-2xl text-[#2b3b2d]" style={{ fontFamily: "'Alex Brush', cursive" }}>
              {item.names}
            </h4>
            <p className="text-[8px] font-serif text-[#60745b] font-medium tracking-wider">
              {item.date || '17.12.2023'}
            </p>

            {/* Countdown mini */}
            <div className="grid grid-cols-4 gap-1 w-full max-w-[170px] pt-2">
              {['00', '00', '00', '00'].map((val, idx) => (
                <div key={idx} className="bg-[#2f4031] text-[#f5f8f1] p-1 rounded font-bold text-[8px]">
                  {val}
                  <span className="block text-[5px] font-normal text-[#c4d2bc]">
                    {['Hari', 'Jam', 'Min', 'Det'][idx]}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-3 px-3 py-1 rounded-full bg-[#8f9e7b]/15 text-[#3b4e3a] text-[8px] font-serif font-bold">
              Akad &bull; 16 Des | Resepsi &bull; 17 Des
            </div>
          </div>
        </div>
      );

    case 'wisuda-karin':
      return (
        <div className="w-full bg-[#EDE8E1] text-stone-800 text-center p-3.5 space-y-3 relative overflow-hidden select-none border-b border-stone-300">
          {/* Floating mini ornaments matching the original design */}
          <div className="absolute top-2 left-3 opacity-60 text-xs">✦</div>
          <div className="absolute top-2 right-4 text-[#C5A059] text-xs">✦</div>
          <div className="absolute top-3.5 right-2 text-stone-900 text-sm -rotate-12">🎓</div>
          <div className="absolute top-1/2 left-2 text-[#C5A059] text-xs">✤</div>
          <div className="absolute top-1/2 right-2 text-stone-900 text-sm rotate-12">🎓</div>
          <div className="absolute bottom-7 left-2 text-stone-900 text-sm -rotate-12">🎓</div>
          <div className="absolute bottom-3 right-3 text-[#C5A059] text-xs">✦</div>

          {/* Header */}
          <div className="pt-3 space-y-0.5">
            <p className="text-[7.5px] uppercase tracking-[0.24em] font-semibold text-stone-600">
              KAMU DIUNDANG KE ACARA
            </p>
            <h4
              className="text-2xl text-[#A97943] leading-tight"
              style={{ fontFamily: "'Pinyon Script', 'Alex Brush', cursive" }}
            >
              Pesta Kelulusan
            </h4>
            <h3 className="font-serif text-sm font-semibold text-stone-900 tracking-wide">
              {item.names}
            </h3>
          </div>

          {/* Center Framed Polaroid Photo */}
          <div className="mx-auto w-24 p-1 bg-white shadow-md rounded-[2px] border border-stone-200">
            <div className="aspect-[4/3] w-full overflow-hidden bg-stone-200">
              <img
                src={karinWisudaImg}
                alt={item.names}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* 3-Column Date Divider */}
          <div className="flex items-center justify-center gap-2 text-[#A97943] font-serif text-[10px]">
            <span className="tracking-widest uppercase font-bold text-[8px]">JUNI</span>
            <span className="w-[1px] h-3 bg-[#A97943]/60" />
            <span className="text-base font-normal leading-none">6</span>
            <span className="w-[1px] h-3 bg-[#A97943]/60" />
            <span className="tracking-widest font-bold text-[8px]">2029</span>
          </div>

          {/* Schedule & Address */}
          <div className="text-[7px] text-stone-700 tracking-wider uppercase space-y-0.5 font-medium">
            <p>PKL 11.00 – 13.00 WIB</p>
            <p>JL. HANG MERAH 79, BANTUL</p>
          </div>

          {/* RSVP Contact */}
          <div className="pt-0.5">
            <span className="text-[7px] text-stone-500 tracking-widest uppercase bg-white/70 px-2 py-0.5 rounded-full border border-stone-200">
              RSVP: 0819-9977-3020
            </span>
          </div>
        </div>
      );

    default:
      return null;
  }
};

export const TemplateSection: React.FC<TemplateSectionProps> = ({
  onPreview,
  onUseTemplate,
}) => {
  const [activeFilter, setActiveFilter] = useState('Undangan Wedding');
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const gridContainerRef = useRef<HTMLDivElement>(null);

  const filterTabs = [
    { label: 'Undangan Wedding', icon: '💍', count: templates.filter(t => t.category === 'Undangan Wedding' || t.category === 'Pernikahan').length },
    { label: 'Undangan Wisuda', icon: '🎓', count: templates.filter(t => t.category === 'Undangan Wisuda' || t.category === 'Wisuda').length },
    { label: 'GRATIS', count: templates.filter(t => t.badge === 'GRATIS').length },
    { label: 'BRONZE', count: templates.filter(t => t.badge === 'BRONZE').length },
    { label: 'GOLD', count: templates.filter(t => t.badge === 'GOLD').length },
  ];

  const filteredTemplates = templates.filter((item) => {
    const matchSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.names.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeFilter === 'Undangan Wedding') {
      return matchSearch && (item.category === 'Undangan Wedding' || item.category === 'Pernikahan');
    }
    if (activeFilter === 'Undangan Wisuda') {
      return matchSearch && (item.category === 'Undangan Wisuda' || item.category === 'Wisuda');
    }
    return matchSearch && item.badge === activeFilter;
  });

  // Tampilkan 6 item di awal (3 ke kanan x 2 ke bawah = 6). Jika expand atau item <= 6, tampilkan semua
  const displayedTemplates = isExpanded ? filteredTemplates : filteredTemplates.slice(0, 6);

  return (
    <section id="template" className="relative pt-10 sm:pt-14 pb-24 scroll-mt-20 overflow-hidden">
      <span id="pilihan-template" className="absolute -top-24" />
      
      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Floating cursors decor */}
      <div className="hidden xl:block absolute left-4 top-1/3 z-20 pointer-events-none opacity-60">
        <MousePointer className="w-5 h-5 text-emerald-800 fill-emerald-800 -rotate-12" />
      </div>
      <div className="hidden xl:block absolute right-6 top-1/4 z-20 pointer-events-none opacity-60">
        <MousePointer className="w-5 h-5 text-amber-700 fill-amber-700 rotate-45" />
      </div>

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: Left Section (Copywriting & Filters) + Right Section (3 Columns Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* =============================================================== */}
          {/* SECTION BAGIAN KIRI (Kata-Kata Pilih Template Terbaikmu)       */}
          {/* =============================================================== */}
          <div className="lg:col-span-4 xl:col-span-4 flex flex-col justify-start space-y-6 lg:sticky lg:top-24">
            
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/90 text-emerald-900 w-fit shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
              <span className="text-[11px] font-bold tracking-wider uppercase">
                Koleksi Desain Terfavorit 2026
              </span>
            </div>

            {/* Main Heading with Eye-Catching Typography */}
            <div className="space-y-2">
              <p
                className="text-2xl sm:text-3xl text-emerald-800 leading-tight"
                style={{ fontFamily: "'Alex Brush', 'Pinyon Script', cursive" }}
              >
                Rayakan Momen Terindah
              </p>
              <h2 className="text-3xl sm:text-4xl xl:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
                Pilih Template <br />
                <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-teal-700 to-amber-700">
                  Terbaikmu
                </span>
              </h2>
            </div>

            {/* Engaging & Persuasive Copywriting */}
            <div className="space-y-3 text-slate-600 text-xs sm:text-sm leading-relaxed">
              <p className="font-semibold text-slate-800">
                Setiap janji suci dan kebanggaan kelulusan pantas dirayakan dengan sentuhan yang istimewa.
              </p>
              <p>
                Temukan desain undangan digital interaktif yang siap membuat para tamu terpesona sejak detik pertama. Dari kehangatan nuansa floral modern, kemegahan adat Nusantara, hingga kartu wisuda eksklusif—semuanya dirancang presisi untuk menyempurnakan hari bahagiamu.
              </p>
              <div className="flex items-center gap-2 text-emerald-900 font-semibold text-xs pt-1">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
                </span>
                <span>Siap pakai dalam 5 menit, bagikan instan ke seluruh tamu undangan!</span>
              </div>
            </div>

            {/* Selling Points & Trust Stats */}
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <div className="p-3.5 rounded-2xl bg-white/90 backdrop-blur-sm border border-slate-200/90 shadow-xs flex flex-col">
                <span className="text-xl sm:text-2xl font-black text-slate-900">50K+</span>
                <span className="text-[11px] text-slate-500 font-medium">Pasangan & Wisudawan</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/90 backdrop-blur-sm border border-slate-200/90 shadow-xs flex flex-col">
                <span className="text-xl sm:text-2xl font-black text-emerald-800">4.9 ★</span>
                <span className="text-[11px] text-slate-500 font-medium">Tingkat Kepuasan</span>
              </div>
            </div>

            {/* Search Input Bar */}
            <div className="relative w-full pt-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari tema, nama pasangan / wisuda..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 shadow-xs transition-all"
              />
            </div>

            {/* Custom Consultation CTA Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-900 to-[#123e28] text-white shadow-lg shadow-emerald-950/20 space-y-2 relative overflow-hidden">
              <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none text-6xl">
                💍
              </div>
              <p className="text-xs font-bold tracking-wide text-emerald-200 uppercase">
                Ingin Desain Kustom Khusus?
              </p>
              <p className="text-xs text-emerald-100/90 leading-relaxed">
                Konsultasikan konsep tema impianmu langsung dengan tim desainer kami.
              </p>
              <a
                href="https://wa.me/6281999773020?text=Halo%20Admin,%20saya%20ingin%20konsultasi%20desain%20undangan%20kustom"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-white/20 hover:bg-white/30 px-3.5 py-1.5 rounded-full transition-all border border-white/30"
              >
                <span>Konsultasi Desain WhatsApp</span>
                <span>→</span>
              </a>
            </div>

          </div>

          {/* =============================================================== */}
          {/* SECTION BAGIAN KANAN (Grid 3 ke Kanan & 3 ke Bawah, Scroll, Show More) */}
          {/* =============================================================== */}
          <div className="lg:col-span-8 xl:col-span-8 flex flex-col space-y-4">
            
            {/* Category Filter Pills / Selection (Dipindahkan ke bagian atas katalog) */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/90 backdrop-blur-sm border border-slate-200/90 shadow-xs space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Kategori Undangan:
                  </span>
                  <span className="text-xs font-bold text-slate-800">
                    Menampilkan {displayedTemplates.length} dari {filteredTemplates.length} Desain
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 hidden sm:inline-flex items-center gap-1">
                  <span>Scroll untuk melihat lebih banyak</span>
                  <span>↓</span>
                </span>
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {filterTabs.map((tab) => {
                  const isActive = activeFilter === tab.label;
                  const isWedding = tab.label === 'Undangan Wedding';
                  const isWisuda = tab.label === 'Undangan Wisuda';
                  const isGold = tab.label === 'GOLD';

                  if (isWedding) {
                    return (
                      <button
                        key={tab.label}
                        type="button"
                        onClick={() => setActiveFilter(tab.label)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border select-none active:scale-95 flex items-center gap-1.5 ${
                          isActive
                            ? 'bg-[#195b3d] text-white border-[#195b3d] shadow-md shadow-emerald-950/20 font-bold ring-2 ring-emerald-500/30'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <span>💍</span>
                        <span>Undangan Wedding</span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
                          {tab.count}
                        </span>
                      </button>
                    );
                  }

                  if (isWisuda) {
                    return (
                      <button
                        key={tab.label}
                        type="button"
                        onClick={() => setActiveFilter(tab.label)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border select-none active:scale-95 flex items-center gap-1.5 ${
                          isActive
                            ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white border-amber-600 shadow-md shadow-amber-600/25 ring-2 ring-amber-400/40 font-bold'
                            : 'bg-white text-amber-900 border-amber-300 hover:bg-amber-50 hover:border-amber-400'
                        }`}
                      >
                        <span>🎓</span>
                        <span>Undangan Wisuda</span>
                        <span className="text-[9px] px-1 py-0.2 rounded-full bg-amber-500/20 text-amber-900 font-extrabold">BARU</span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-800'}`}>
                          {tab.count}
                        </span>
                      </button>
                    );
                  }

                  if (isGold) {
                    return (
                      <button
                        key={tab.label}
                        type="button"
                        onClick={() => setActiveFilter(tab.label)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border select-none active:scale-95 flex items-center gap-1 ${
                          isActive
                            ? 'bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-500/20'
                            : 'bg-white text-amber-700 border-amber-300 hover:bg-amber-50'
                        }`}
                      >
                        <span>{tab.label}</span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-800'}`}>
                          {tab.count}
                        </span>
                      </button>
                    );
                  }

                  return (
                    <button
                      key={tab.label}
                      type="button"
                      onClick={() => setActiveFilter(tab.label)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border select-none active:scale-95 flex items-center gap-1 ${
                        isActive
                          ? 'bg-[#195b3d] text-white border-[#195b3d] shadow-md shadow-emerald-950/20 font-bold'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <span>{tab.label}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
                        {tab.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Scrollable Grid Container */}
            <div
              ref={gridContainerRef}
              className="overflow-y-auto max-h-[850px] pr-1 sm:pr-2.5 pb-2 scroll-smooth rounded-2xl"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#10b981 #f1f5f9'
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
                {displayedTemplates.map((item) => (
                  <div
                    key={item.id}
                    className="group rounded-3xl bg-white/90 backdrop-blur-sm border border-slate-200/80 shadow-[0_12px_30px_-5px_rgba(0,0,0,0.06)] hover:shadow-[0_25px_60px_-10px_rgba(20,77,49,0.15)] hover:-translate-y-2 transition-all duration-300 p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden"
                  >
                    
                    {/* 3D Showcase Card Mockup */}
                    <div className="relative w-full flex items-center justify-center py-1">
                      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.14)] border-[3px] border-white ring-1 ring-slate-900/10 flex items-center justify-center bg-slate-100 group/card select-none">
                        
                        {/* Badge Overlay */}
                        <div className="absolute top-2.5 right-2.5 z-20 pointer-events-none">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold text-white shadow-md tracking-wider ${
                              item.badge === 'GRATIS'
                                ? 'bg-[#168a44]'
                                : item.badge === 'BRONZE'
                                ? 'bg-[#a35e2e]'
                                : 'bg-[#c98e29]'
                            }`}
                          >
                            {item.badge}
                          </span>
                        </div>

                        {/* Mockup Image */}
                        <img
                          src={item.mockupImg || templateSatuMockupImg}
                          alt={item.title}
                          className="w-full h-full object-cover object-center group-hover/card:scale-105 transition-transform duration-500 select-none"
                          loading="lazy"
                        />

                        {/* Subtle Category Pill Overlay */}
                        <div className="absolute bottom-2 inset-x-2.5 z-20 pointer-events-none">
                          <div className="bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/20 shadow-xs flex items-center justify-between text-white">
                            <span className="text-[10px] font-semibold text-slate-100">
                              {item.category === 'Undangan Wisuda' || item.category === 'Wisuda'
                                ? 'Undangan Wisuda'
                                : 'Undangan Wedding'}
                            </span>
                            <span className="text-[9px] font-bold text-emerald-300">
                              {item.tagSubtitle || '3D Mockup'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer: Title & Action Buttons */}
                    <div className="space-y-3 pt-3">
                      <div className="text-center">
                        <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug line-clamp-1">
                          {item.title}
                        </h3>
                        <p className="text-[11px] text-slate-500 font-medium">
                          {item.names}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => onPreview(item)}
                          className="py-2 px-2 rounded-full text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 active:scale-95 transition-all cursor-pointer text-center flex items-center justify-center gap-1 shadow-xs"
                        >
                          <span>Pratinjau</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => onUseTemplate(item)}
                          className="py-2 px-2 rounded-full text-xs font-bold text-white bg-[#195b3d] hover:bg-[#134930] active:scale-95 transition-all cursor-pointer text-center flex items-center justify-center shadow-md shadow-emerald-950/20"
                        >
                          <span>Gunakan</span>
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* Show More / Show Less Toggle Button */}
            {filteredTemplates.length > 6 && (
              <div className="mt-6 pt-2 flex flex-col items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="px-6 py-2.5 rounded-full bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 active:scale-95 cursor-pointer"
                >
                  <span>
                    {isExpanded
                      ? 'Tampilkan Lebih Sedikit'
                      : `Tampilkan Lebih Banyak (${filteredTemplates.length - 6} Desain Lainnya)`}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-600 transform transition-transform duration-300 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <p className="text-[11px] text-slate-500 font-medium text-center">
                  {isExpanded
                    ? 'Semua template telah ditampilkan. Anda dapat scroll pada katalog.'
                    : `Menampilkan 6 desain awal (3 kolom x 2 baris). Klik tombol untuk melihat ${filteredTemplates.length - 6} desain lainnya.`}
                </p>
              </div>
            )}

          </div>

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
            pasangan & wisudawan bahagia
          </p>

          <BotanicalLeaves.BottomRight />

        </div>

      </div>

    </section>
  );
};

