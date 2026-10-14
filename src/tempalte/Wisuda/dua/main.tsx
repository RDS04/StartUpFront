import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  MapPin,
  MessageCircle,
  Sparkles,
  Volume2,
  VolumeX,
  ArrowLeft,
  Navigation
} from 'lucide-react';
import confetti from 'canvas-confetti';
import yolandaWisudaImg from '../../../assets/templateWisuda/yolanda-wisuda.jpg';
import tossingCapsBgImg from '../../../assets/templateWisuda/tossing-caps-bw.jpg';

// ============================================================================
// VECTOR ACCENTS (Realistic Gold Confetti & Ribbons matching the design)
// ============================================================================

/** Metallic Gold Sparkle Star with multi-color radial gradient */
export const GoldGlitterStar: React.FC<{
  size?: number;
  className?: string;
  delay?: number;
}> = ({ size = 20, className = '', delay = 0 }) => (
  <motion.svg
    animate={{ opacity: [0.6, 1, 0.6], scale: [0.85, 1.15, 0.85] }}
    transition={{ duration: 2.2, repeat: Infinity, delay, ease: 'easeInOut' }}
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none pointer-events-none drop-shadow-[0_0_8px_rgba(255,215,0,0.6)] ${className}`}
  >
    <defs>
      <linearGradient id="goldStarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF2B2" />
        <stop offset="35%" stopColor="#E2BA65" />
        <stop offset="70%" stopColor="#C59B3F" />
        <stop offset="100%" stopColor="#8C651A" />
      </linearGradient>
    </defs>
    <path
      d="M20 2 Q20 20 2 20 Q20 20 20 38 Q20 20 38 20 Q20 20 20 2 Z"
      fill="url(#goldStarGrad)"
    />
  </motion.svg>
);

/** Curving Golden Metallic Streamer Ribbon */
export const GoldStreamerRibbon: React.FC<{
  side?: 'left' | 'right';
  className?: string;
}> = ({ side = 'left', className = '' }) => {
  const isLeft = side === 'left';
  return (
    <svg
      width={isLeft ? 80 : 90}
      height={320}
      viewBox={isLeft ? '0 0 80 320' : '0 0 90 320'}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none pointer-events-none drop-shadow-[0_6px_12px_rgba(0,0,0,0.5)] ${className}`}
    >
      <defs>
        <linearGradient id={`streamerGrad_${side}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FCF6BA" />
          <stop offset="25%" stopColor="#D4AF37" />
          <stop offset="50%" stopColor="#AA771C" />
          <stop offset="75%" stopColor="#E2BA65" />
          <stop offset="100%" stopColor="#8A5A12" />
        </linearGradient>
      </defs>
      {isLeft ? (
        <path
          d="M10 0 C40 40 5 80 35 120 C65 160 15 200 45 240 C75 280 20 300 10 320 C14 316 68 276 39 238 C10 198 58 158 29 118 C0 78 35 38 7 0 Z"
          fill={`url(#streamerGrad_${side})`}
          opacity="0.95"
        />
      ) : (
        <path
          d="M80 0 C50 45 80 85 50 125 C20 165 70 205 40 245 C10 285 65 305 75 320 C71 316 17 281 46 243 C75 203 27 163 56 123 C85 83 47 43 77 0 Z"
          fill={`url(#streamerGrad_${side})`}
          opacity="0.95"
        />
      )}
    </svg>
  );
};

// ============================================================================
// DATA & INTERFACES
// ============================================================================

export interface WisudaDuaTemplateData {
  invitationScript: string;
  graduateName: string;
  openingPrayerTitle: string;
  openingPrayerText: string;
  dateDayName: string;
  dateDayNumber: string;
  dateMonthName: string;
  dateYearNumber: string;
  timeSlot: string;
  addressLocation: string;
  rsvpNumber: string;
  photoUrl: string;
  tossingCapsBgUrl: string;
  googleMapsUrl: string;
}

export const DEFAULT_WISUDA_DUA_DATA: WisudaDuaTemplateData = {
  invitationScript: 'Graduation Party of',
  graduateName: 'YOLANDA PUTRI',
  openingPrayerTitle: 'Segala Puji Dan Syukur Terpanjat Kehadirat Ilahi Robbi',
  openingPrayerText:
    'Atas Segala Rahmat Dan Karunianya.\nBersama Ini Kami Mengundang Bapak/Ibu/Sdra/(I),\nUntuk Menghadiri Acara Jamuan Makan Siang\nAtas Wisuda Anak Kami Yolanda Putri.',
  dateDayName: 'RABU',
  dateDayNumber: '02',
  dateMonthName: 'J U L I',
  dateYearNumber: '2024',
  timeSlot: '12.00 Siang - 01.00 Siang',
  addressLocation: 'Kediaman yolanda putri, Jl.melati, gang metro, no 34',
  rsvpNumber: '0819-9977-3020',
  photoUrl: yolandaWisudaImg,
  tossingCapsBgUrl: tossingCapsBgImg,
  googleMapsUrl: 'https://maps.google.com/?q=Kediaman+Yolanda+Putri,+Jl.+Melati,+Gang+Metro'
};

export interface WisudaDuaProps {
  data?: Partial<WisudaDuaTemplateData>;
  onBack?: () => void;
  isEmbedded?: boolean;
}

// ============================================================================
// PURE INVITATION CARD COMPONENT (Replika Desain Sesuai Gambar Pengguna)
// ============================================================================

export const WisudaDuaInvitationCard: React.FC<{
  data: WisudaDuaTemplateData;
  className?: string;
}> = ({ data, className = '' }) => {
  return (
    <div
      className={`relative w-full aspect-[1/1.52] max-w-[440px] sm:max-w-[460px] bg-[#0A0A0C] rounded-[24px] sm:rounded-[28px] border border-amber-500/20 shadow-[0_30px_70px_-10px_rgba(0,0,0,0.9),0_0_40px_rgba(212,175,55,0.08)] overflow-hidden flex flex-col justify-between select-none text-white ${className}`}
      style={{
        background: 'radial-gradient(ellipse at 50% 65%, #16161C 0%, #0D0D10 45%, #070709 100%)'
      }}
    >
      {/* 1. TOP BACKGROUND IMAGE: Monochrome graduates throwing caps */}
      <div className="absolute top-0 inset-x-0 h-[42%] overflow-hidden pointer-events-none z-0">
        <img
          src={data.tossingCapsBgUrl}
          alt="Graduation Celebration"
          className="w-full h-full object-cover object-center opacity-65 grayscale contrast-125 select-none"
        />
        {/* Subtle dark gradient overlay to blend into black satin */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#0A0A0C]" />
        <div className="absolute inset-0 bg-radial at top from-transparent via-black/20 to-[#0A0A0C]/90" />
      </div>

      {/* 2. LUXURY DARK SATIN WAVY TEXTURES (Silky curves) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
        <svg
          viewBox="0 0 500 750"
          className="w-full h-full object-cover"
          preserveAspectRatio="none"
        >
          <path
            d="M-50,220 C150,290 320,180 550,250 L550,750 L-50,750 Z"
            fill="url(#satinGrad1)"
          />
          <path
            d="M-50,380 C200,460 300,320 550,420 L550,750 L-50,750 Z"
            fill="url(#satinGrad2)"
          />
          <defs>
            <linearGradient id="satinGrad1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#252530" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#121217" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#08080A" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="satinGrad2" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1C1C24" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#0A0A0D" stopOpacity="0.95" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* 3. GOLD STREAMERS & FLOATING CONFETTI (Left & Right sides) */}
      <div className="absolute top-[8%] -left-3 z-10 pointer-events-none">
        <GoldStreamerRibbon side="left" className="scale-90 opacity-90" />
      </div>
      <div className="absolute top-[18%] -right-3 z-10 pointer-events-none">
        <GoldStreamerRibbon side="right" className="scale-90 opacity-90" />
      </div>
      <div className="absolute bottom-[2%] -left-4 z-10 pointer-events-none">
        <GoldStreamerRibbon side="left" className="scale-75 opacity-70 rotate-12" />
      </div>

      {/* Floating Gold Confetti Flakes */}
      <div className="absolute top-[28%] left-[7%] w-2 h-3.5 bg-gradient-to-tr from-[#C59B3F] to-[#FFF2B2] rotate-45 rounded-[1px] shadow-sm pointer-events-none z-10 opacity-90" />
      <div className="absolute top-[34%] left-[13%] w-2.5 h-2.5 bg-gradient-to-tr from-[#D4AF37] to-[#FFF8D6] -rotate-12 rounded-[1px] shadow-sm pointer-events-none z-10 opacity-80" />
      <div className="absolute top-[48%] left-[4.5%] w-3 h-2 bg-gradient-to-tr from-[#AA771C] to-[#E2BA65] rotate-[30deg] rounded-[1px] pointer-events-none z-10 opacity-90" />
      <div className="absolute top-[75%] left-[8%] w-2 h-3.5 bg-gradient-to-tr from-[#D4AF37] to-[#FFE57F] -rotate-45 rounded-[1px] pointer-events-none z-10 opacity-85" />
      <div className="absolute bottom-[10%] left-[12%] w-2.5 h-2 bg-gradient-to-tr from-[#C59B3F] to-[#FCF6BA] rotate-12 rounded-[1px] pointer-events-none z-10 opacity-90" />

      <div className="absolute top-[26%] right-[8%] w-2.5 h-3 bg-gradient-to-tr from-[#E2BA65] to-[#FCF6BA] rotate-12 rounded-[1px] pointer-events-none z-10 opacity-90" />
      <div className="absolute top-[40%] right-[5%] w-2 h-2.5 bg-gradient-to-tr from-[#C59B3F] to-[#FFE57F] -rotate-45 rounded-[1px] pointer-events-none z-10 opacity-85" />
      <div className="absolute top-[49%] right-[9%] w-3 h-2 bg-gradient-to-tr from-[#D4AF37] to-[#FFF8D6] rotate-45 rounded-[1px] pointer-events-none z-10 opacity-80" />
      <div className="absolute top-[68%] right-[6%] w-2.5 h-3.5 bg-gradient-to-tr from-[#AA771C] to-[#E2BA65] -rotate-12 rounded-[1px] pointer-events-none z-10 opacity-90" />
      <div className="absolute bottom-[8%] right-[9%] w-2 h-2.5 bg-gradient-to-tr from-[#C59B3F] to-[#FFF2B2] rotate-[35deg] rounded-[1px] pointer-events-none z-10 opacity-85" />

      {/* Sparkling Stars */}
      <div className="absolute top-[22%] left-[16%] z-10">
        <GoldGlitterStar size={18} delay={0.2} />
      </div>
      <div className="absolute top-[24%] right-[16%] z-10">
        <GoldGlitterStar size={16} delay={0.8} />
      </div>
      <div className="absolute top-[39%] right-[22%] z-10">
        <GoldGlitterStar size={14} delay={1.4} />
      </div>
      <div className="absolute top-[42%] left-[20%] z-10">
        <GoldGlitterStar size={15} delay={1.8} />
      </div>

      {/* ================================================================= */}
      {/* 4. MAIN CONTENT LAYER */}
      {/* ================================================================= */}
      <div className="relative z-20 flex flex-col items-center justify-between h-full px-5 py-6 sm:px-7 sm:py-7">
        
        {/* UPPER PART: Circular Portrait in Golden Frame */}
        <div className="flex flex-col items-center pt-2 sm:pt-3">
          {/* Circular Frame with Glowing Gold Double Ring and Glitter */}
          <div className="relative group">
            {/* Outer Subtle Glow Halo */}
            <div className="absolute -inset-2.5 rounded-full bg-gradient-to-tr from-amber-600/30 via-yellow-400/40 to-amber-300/30 blur-md pointer-events-none animate-pulse" />

            {/* Orbiting Sparkles around the circular frame */}
            <div className="absolute -top-1 left-2 z-30">
              <GoldGlitterStar size={14} delay={0.4} />
            </div>
            <div className="absolute -bottom-1 right-2 z-30">
              <GoldGlitterStar size={16} delay={1.1} />
            </div>
            <div className="absolute top-1/2 -right-2.5 -translate-y-1/2 z-30">
              <GoldGlitterStar size={13} delay={1.6} />
            </div>
            <div className="absolute top-1/2 -left-2.5 -translate-y-1/2 z-30">
              <GoldGlitterStar size={13} delay={0.9} />
            </div>

            {/* Outer Gold Border Ring */}
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full p-[3px] bg-gradient-to-tr from-[#8C651A] via-[#FFF2B2] via-[#E2BA65] to-[#8C651A] shadow-[0_0_25px_rgba(226,186,101,0.5),0_10px_30px_rgba(0,0,0,0.8)] flex items-center justify-center">
              {/* Thin Inner Gap */}
              <div className="w-full h-full rounded-full p-[2px] bg-[#0E0E12] flex items-center justify-center">
                {/* Thin Golden Inner Ring */}
                <div className="w-full h-full rounded-full p-[1.5px] bg-gradient-to-br from-[#FFE799] to-[#996515] overflow-hidden">
                  {/* Photo inside */}
                  <img
                    src={data.photoUrl}
                    alt={data.graduateName}
                    className="w-full h-full object-cover object-top select-none transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MIDDLE PART: Typography & Invitation Text */}
        <div className="flex flex-col items-center text-center space-y-3.5 my-auto w-full pt-2">
          
          {/* "Graduation Party of" in signature cursive gold script */}
          <div className="relative">
            <h2
              className="text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#FFF5C0] via-[#E2BA65] to-[#C59B3F] leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              style={{
                fontFamily: "'Pinyon Script', 'Alex Brush', 'Great Vibes', cursive",
                letterSpacing: '0.04em'
              }}
            >
              {data.invitationScript}
            </h2>
          </div>

          {/* "YOLANDA PUTRI" in bold modern white sans-serif uppercase */}
          <h1 className="font-sans text-2xl sm:text-[28px] font-extrabold tracking-[0.14em] text-white leading-tight uppercase drop-shadow-[0_3px_8px_rgba(0,0,0,0.9)]">
            {data.graduateName}
          </h1>

          {/* Opening & Invitation Prayer Text */}
          <div className="max-w-[340px] sm:max-w-[370px] text-slate-200 text-[11px] sm:text-[12.5px] leading-[1.65] font-normal tracking-wide px-2 drop-shadow-sm">
            <p className="font-semibold text-white/95">
              {data.openingPrayerTitle}
            </p>
            <p className="whitespace-pre-line text-slate-300 pt-0.5">
              {data.openingPrayerText}
            </p>
          </div>

          {/* =============================================================== */}
          {/* 5. DISTINCTIVE GOLD DATE BLOCK (RABU | 02 JULI | 2024)         */}
          {/* =============================================================== */}
          <div className="pt-2 w-full max-w-[320px] sm:max-w-[350px]">
            <div className="flex items-center justify-center gap-3 sm:gap-4 select-none">
              
              {/* Left Column: Line / RABU / Line */}
              <div className="flex-1 flex flex-col items-center">
                <div className="w-full h-[1.5px] bg-[#E2BA65] shadow-[0_0_6px_rgba(226,186,101,0.5)]" />
                <span className="font-sans font-bold text-lg sm:text-2xl text-[#E2BA65] tracking-wider py-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                  {data.dateDayName}
                </span>
                <div className="w-full h-[1.5px] bg-[#E2BA65] shadow-[0_0_6px_rgba(226,186,101,0.5)]" />
              </div>

              {/* Center Column: Big 02 / J U L I */}
              <div className="flex flex-col items-center px-1 sm:px-2">
                <span className="font-sans font-extrabold text-3xl sm:text-4xl text-[#E2BA65] leading-none tracking-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
                  {data.dateDayNumber}
                </span>
                <span className="font-sans font-extrabold text-[11px] sm:text-[12.5px] text-[#E2BA65] tracking-[0.35em] pt-1">
                  {data.dateMonthName}
                </span>
              </div>

              {/* Right Column: Line / 2024 / Line */}
              <div className="flex-1 flex flex-col items-center">
                <div className="w-full h-[1.5px] bg-[#E2BA65] shadow-[0_0_6px_rgba(226,186,101,0.5)]" />
                <span className="font-sans font-bold text-lg sm:text-2xl text-[#E2BA65] tracking-wider py-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                  {data.dateYearNumber}
                </span>
                <div className="w-full h-[1.5px] bg-[#E2BA65] shadow-[0_0_6px_rgba(226,186,101,0.5)]" />
              </div>

            </div>
          </div>

          {/* Time Schedule */}
          <div className="pt-1">
            <p className="font-sans text-xs sm:text-sm font-bold text-white tracking-wide drop-shadow-md">
              {data.timeSlot}
            </p>
          </div>

        </div>

        {/* BOTTOM PART: Location Pin & Address */}
        <div className="flex flex-col items-center text-center space-y-1.5 pb-1 z-20">
          {/* Yellow / Golden Location Pin with White Center Dot */}
          <div className="relative flex items-center justify-center">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#C59B3F] to-[#FFE799] flex items-center justify-center shadow-[0_0_12px_rgba(226,186,101,0.6)] border border-amber-200">
              <MapPin className="w-4 h-4 text-slate-950 fill-slate-950" />
            </div>
          </div>

          {/* Address Location Text */}
          <p className="font-sans text-[10.5px] sm:text-xs text-slate-200 font-medium leading-relaxed max-w-[290px] sm:max-w-[320px] drop-shadow-sm">
            {data.addressLocation}
          </p>
        </div>

      </div>
    </div>
  );
};

// ============================================================================
// MAIN TEMPLATE: INTERACTIVE PAGE VIEW WITH CELEBRATION CONTROLS
// ============================================================================

export const WisudaDuaTemplate: React.FC<WisudaDuaProps> = ({
  data: initialData,
  onBack,
  isEmbedded = false
}) => {
  const data: WisudaDuaTemplateData = {
    ...DEFAULT_WISUDA_DUA_DATA,
    ...initialData
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Trigger festive golden confetti celebration
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#E2BA65', '#FFF5C0', '#D4AF37', '#1A1A1A', '#8C651A']
      });
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 60,
          origin: { x: 0 },
          colors: ['#E2BA65', '#FFFFFF', '#D4AF37', '#0A0A0C']
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 60,
          origin: { x: 1 },
          colors: ['#E2BA65', '#FFFFFF', '#D4AF37', '#0A0A0C']
        });
      }, 250);
    } catch {}
  };

  // Toggle background music
  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  // WhatsApp RSVP URL
  const getWhatsAppRsvpUrl = () => {
    const cleanPhone = data.rsvpNumber.replace(/[^0-9]/g, '');
    const intlPhone = cleanPhone.startsWith('0') ? '62' + cleanPhone.slice(1) : cleanPhone;
    const msg = encodeURIComponent(
      `Halo ${data.graduateName}, selamat atas kelulusan dan wisudanya! 🎓✨\n\nSaya ingin konfirmasi kehadiran untuk menghadiri acara syukuran wisuda pada:\n📅 Hari/Tanggal: ${data.dateDayName}, ${data.dateDayNumber} ${data.dateMonthName} ${data.dateYearNumber}\n⏰ Waktu: ${data.timeSlot}\n📍 Lokasi: ${data.addressLocation}\n\nTerima kasih atas undangannya!`
    );
    return `https://wa.me/${intlPhone}?text=${msg}`;
  };

  // Google Calendar URL
  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent(`Wisuda & Syukuran - ${data.graduateName}`);
    const details = encodeURIComponent(
      `Acara Jamuan Makan Siang Atas Wisuda ${data.graduateName}.\nKontak RSVP: ${data.rsvpNumber}`
    );
    const location = encodeURIComponent(data.addressLocation);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20240702T050000Z/20240702T060000Z&details=${details}&location=${location}`;
  };

  return (
    <div
      className={`min-h-screen ${
        isEmbedded ? 'bg-transparent py-4' : 'bg-[#060608] py-8 sm:py-12'
      } px-3 sm:px-6 flex flex-col items-center justify-center relative overflow-x-hidden`}
    >
      {/* Background Graduation Audio */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src="https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3"
      />

      {/* Top Floating Control Bar (Only if not embedded) */}
      {!isEmbedded && (
        <div className="fixed top-4 left-4 right-4 z-40 flex items-center justify-between pointer-events-none">
          {onBack ? (
            <button
              onClick={onBack}
              className="pointer-events-auto px-4 py-2 rounded-full bg-slate-950/90 text-slate-200 hover:text-white border border-amber-500/40 shadow-xl backdrop-blur-md text-xs font-semibold flex items-center gap-2 hover:scale-105 transition-all cursor-pointer"
            >
              <ArrowLeft size={14} className="text-[#E2BA65]" />
              <span>Kembali</span>
            </button>
          ) : (
            <div />
          )}

          <div className="pointer-events-auto flex items-center gap-2">
            <button
              onClick={toggleMusic}
              title={isPlaying ? 'Jeda Musik' : 'Putar Musik'}
              className="w-9 h-9 rounded-full bg-slate-950/90 hover:bg-[#E2BA65] text-slate-200 hover:text-slate-950 border border-amber-500/40 shadow-xl backdrop-blur-md flex items-center justify-center transition-all cursor-pointer"
            >
              {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>

            <button
              onClick={triggerConfetti}
              title="Rayakan dengan Konfeti Emas"
              className="w-9 h-9 rounded-full bg-slate-950/90 hover:bg-[#E2BA65] text-slate-200 hover:text-slate-950 border border-amber-500/40 shadow-xl backdrop-blur-md flex items-center justify-center transition-all cursor-pointer"
            >
              <Sparkles size={16} className="text-[#E2BA65]" />
            </button>
          </div>
        </div>
      )}

      {/* The Single Section Invitation Card */}
      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="w-full max-w-[440px] sm:max-w-[460px] flex flex-col items-center"
      >
        <WisudaDuaInvitationCard data={data} />

        {/* Clean Interactive Action Buttons Below the Card */}
        <div className="w-full mt-6 grid grid-cols-3 gap-2.5 sm:gap-3">
          <a
            href={getWhatsAppRsvpUrl()}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-1.5 py-3 px-2 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold shadow-lg shadow-emerald-950/40 transition-all hover:scale-[1.02] cursor-pointer text-center"
          >
            <MessageCircle size={15} />
            <span>RSVP WA</span>
          </a>

          <a
            href={data.googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-1.5 py-3 px-2 rounded-2xl bg-slate-900/95 hover:bg-slate-800 text-slate-100 border border-amber-500/30 text-xs font-semibold shadow-lg transition-all hover:scale-[1.02] cursor-pointer text-center"
          >
            <Navigation size={15} className="text-[#E2BA65]" />
            <span>Petunjuk</span>
          </a>

          <a
            href={getGoogleCalendarUrl()}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-1.5 py-3 px-2 rounded-2xl bg-slate-900/95 hover:bg-slate-800 text-slate-100 border border-amber-500/30 text-xs font-semibold shadow-lg transition-all hover:scale-[1.02] cursor-pointer text-center"
          >
            <Calendar size={15} className="text-[#E2BA65]" />
            <span>Kalender</span>
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default WisudaDuaTemplate;
