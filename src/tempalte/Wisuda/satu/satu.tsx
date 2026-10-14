import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  MapPin,
  MessageCircle,
  Sparkles,
  Volume2,
  VolumeX,
  ArrowLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';
import karinWisudaImg from '../../../assets/templateWisuda/karin-wisuda.jpg';

// ============================================================================
// VECTOR ORNAMENTS (SVGs accurately matching the uploaded design)
// ============================================================================

/** Four-petal rounded clover blossom */
export const FourPetalFlower: React.FC<{
  color?: string;
  size?: number;
  className?: string;
}> = ({ color = '#C5A059', size = 30, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.06)] ${className}`}
  >
    <g fill={color}>
      <circle cx="20" cy="13" r="6.8" />
      <circle cx="20" cy="27" r="6.8" />
      <circle cx="13" cy="20" r="6.8" />
      <circle cx="27" cy="20" r="6.8" />
      <circle cx="20" cy="20" r="6" />
    </g>
  </svg>
);

/** Four-pointed sparkle diamond star */
export const SparkleStar: React.FC<{
  color?: string;
  size?: number;
  className?: string;
}> = ({ color = '#C5A059', size = 26, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.06)] ${className}`}
  >
    <path
      d="M20 4 Q20 20 4 20 Q20 20 20 36 Q20 20 36 20 Q20 20 20 4 Z"
      fill={color}
    />
  </svg>
);

/** Academic graduation cap (mortarboard with dangling tassel) */
export const GraduationCap: React.FC<{
  size?: number;
  className?: string;
}> = ({ size = 34, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none pointer-events-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.18)] ${className}`}
  >
    {/* Base skullcap */}
    <path
      d="M13 18.5V25.5C13 29.5 18 32.5 24 32.5C30 32.5 35 29.5 35 25.5V18.5"
      fill="#1A1A1A"
    />
    <path
      d="M13 18.5C13 21.5 18 24 24 24C30 24 35 21.5 35 18.5"
      stroke="#0D0D0D"
      strokeWidth="1.2"
    />
    {/* Rhombus top board */}
    <polygon
      points="24,6 44,15.5 24,24.5 4,15.5"
      fill="#181818"
      stroke="#0D0D0D"
      strokeWidth="1.2"
    />
    {/* Button */}
    <ellipse cx="24" cy="15.5" rx="2.2" ry="1.6" fill="#2E2E2E" />
    {/* Tassel cord */}
    <path
      d="M24 15.5 Q32 18 36 22 Q38 25 39 28"
      stroke="#181818"
      strokeWidth="1.6"
      strokeLinecap="round"
      fill="none"
    />
    {/* Tassel brush */}
    <path d="M37 28 H41 L40 35 H38 L37 28 Z" fill="#181818" />
    <circle cx="39" cy="28" r="1.5" fill="#2E2E2E" />
  </svg>
);

// ============================================================================
// DATA & INTERFACES
// ============================================================================

export interface WisudaTemplateData {
  invitationHeading: string;
  subTitleScript: string;
  graduateName: string;
  dateDay: string;
  dateMonth: string;
  dateYear: string;
  timeSlot: string;
  addressLine1: string;
  addressLine2: string;
  rsvpNumber: string;
  photoUrl: string;
  googleMapsUrl: string;
}

export const DEFAULT_WISUDA_DATA: WisudaTemplateData = {
  invitationHeading: 'KAMU DIUNDANG KE ACARA',
  subTitleScript: 'Pesta Kelulusan',
  graduateName: 'Karin Wijaya, S.E',
  dateDay: '6',
  dateMonth: 'JUNI',
  dateYear: '2029',
  timeSlot: 'PKL 11.00 – 13.00 WIB',
  addressLine1: 'JL. HANG MERAH 79',
  addressLine2: 'BANTUL, YOGYAKARTA',
  rsvpNumber: '0819-9977-3020',
  photoUrl: karinWisudaImg,
  googleMapsUrl: 'https://maps.google.com/?q=Bantul,+Yogyakarta'
};

export interface WisudaSatuProps {
  data?: Partial<WisudaTemplateData>;
  onBack?: () => void;
  isEmbedded?: boolean;
}

// ============================================================================
// PURE WISUDA INVITATION CARD COMPONENT (1-Section Card Replica)
// ============================================================================

export const WisudaInvitationCard: React.FC<{
  data: WisudaTemplateData;
  className?: string;
}> = ({ data, className = '' }) => {
  return (
    <div
      className={`relative w-full aspect-[1/1.42] bg-[#EDE8E1] rounded-[24px] sm:rounded-[28px] border-[4px] border-white shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4),0_10px_20px_rgba(0,0,0,0.15)] overflow-hidden p-6 sm:p-8 flex flex-col justify-between select-none ${className}`}
      style={{
        background:
          'radial-gradient(circle at 50% 25%, #F5F1EB 0%, #EDE8E1 55%, #E4DDD5 100%)'
      }}
    >
      {/* 1. Top-Left: White Sparkle Star */}
      <div className="absolute top-[4.5%] left-[13%]">
        <SparkleStar color="#FFFFFF" size={26} />
      </div>

      {/* 2. Top-Right: Gold Sparkle Star */}
      <div className="absolute top-[4.8%] right-[28%]">
        <SparkleStar color="#C5A059" size={24} />
      </div>

      {/* 3. Top-Right Corner: Gold 4-Petal Flower + Black Cap */}
      <div className="absolute top-[6.5%] right-[7%]">
        <FourPetalFlower color="#C5A059" size={30} />
      </div>
      <div className="absolute top-[8.2%] right-[11%] -rotate-12">
        <GraduationCap size={32} />
      </div>

      {/* 4. Upper-Left: Gold 4-Petal Flower */}
      <div className="absolute top-[18%] left-[7.5%] rotate-12">
        <FourPetalFlower color="#C5A059" size={29} />
      </div>

      {/* 5. Middle-Left: White 4-Petal Flower */}
      <div className="absolute top-[43%] left-[4%]">
        <FourPetalFlower color="#FFFFFF" size={30} />
      </div>

      {/* 6. Middle-Right: White 4-Petal Flower */}
      <div className="absolute top-[32%] right-[4.5%]">
        <FourPetalFlower color="#FFFFFF" size={28} />
      </div>

      {/* 7. Center-Right: Black Graduation Cap */}
      <div className="absolute top-[52.5%] right-[10%] rotate-12">
        <GraduationCap size={28} />
      </div>

      {/* 8. Center-Left: Gold Sparkle Star */}
      <div className="absolute top-[60%] left-[19%]">
        <SparkleStar color="#C5A059" size={25} />
      </div>

      {/* 9. Lower-Left: Black Graduation Cap */}
      <div className="absolute top-[76.5%] left-[9.5%] -rotate-[22deg]">
        <GraduationCap size={32} />
      </div>

      {/* 10. Bottom-Left: White Sparkle Star */}
      <div className="absolute top-[85.5%] left-[4%]">
        <SparkleStar color="#FFFFFF" size={26} />
      </div>

      {/* 11. Bottom-Left (near edge): Gold 4-Petal Flower */}
      <div className="absolute bottom-[2.5%] left-[18%]">
        <FourPetalFlower color="#C5A059" size={30} />
      </div>

      {/* 12. Lower-Right: Gold Sparkle Star */}
      <div className="absolute top-[75%] right-[7.5%]">
        <SparkleStar color="#C5A059" size={26} />
      </div>

      {/* 13. Bottom-Right: White 4-Petal Flower */}
      <div className="absolute bottom-[3%] right-[22%]">
        <FourPetalFlower color="#FFFFFF" size={29} />
      </div>

      {/* Top Header Section */}
      <div className="relative z-10 text-center pt-2 sm:pt-4">
        {/* KAMU DIUNDANG KE ACARA */}
        <p className="font-sans text-[11px] sm:text-[13px] tracking-[0.26em] text-[#4F4F4F] font-medium uppercase leading-relaxed">
          {data.invitationHeading}
        </p>

        {/* Pesta Kelulusan (Cursive script) */}
        <h2
          className="text-4xl sm:text-5xl md:text-[54px] text-[#A97943] font-normal leading-tight mt-1 mb-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
          style={{ fontFamily: "'Pinyon Script', 'Alex Brush', cursive" }}
        >
          {data.subTitleScript}
        </h2>

        {/* Karin Wijaya, S.E (Refined serif) */}
        <h1 className="font-serif text-[26px] sm:text-[32px] md:text-[36px] text-[#1E1E1E] font-normal tracking-[0.03em] leading-tight mt-0.5">
          {data.graduateName}
        </h1>
      </div>

      {/* Center Framed Photograph (Polaroid style) */}
      <div className="relative z-10 flex items-center justify-center my-auto py-2">
        <div className="relative p-2 sm:p-2.5 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.18)] rounded-[2px] border border-stone-200/80 max-w-[270px] sm:max-w-[310px] w-full transition-transform hover:scale-[1.02] duration-300">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-[1px] bg-stone-200">
            <img
              src={data.photoUrl}
              alt={data.graduateName}
              className="w-full h-full object-cover object-top select-none"
            />
          </div>
        </div>
      </div>

      {/* Bottom Details Section */}
      <div className="relative z-10 text-center pb-2 sm:pb-4 space-y-4">
        {/* 3-Column Date Divider: JUNI | 6 | 2029 */}
        <div className="flex items-center justify-center gap-5 sm:gap-7">
          <span className="font-serif tracking-[0.24em] text-xs sm:text-sm font-semibold text-[#A97943] uppercase">
            {data.dateMonth}
          </span>
          <div className="w-[1.2px] h-7 sm:h-9 bg-[#A97943]/85" />
          <span className="font-serif text-3xl sm:text-4xl font-normal text-[#A97943] leading-none pt-0.5">
            {data.dateDay}
          </span>
          <div className="w-[1.2px] h-7 sm:h-9 bg-[#A97943]/85" />
          <span className="font-serif tracking-[0.24em] text-xs sm:text-sm font-semibold text-[#A97943]">
            {data.dateYear}
          </span>
        </div>

        {/* Event Schedule & Venue */}
        <div className="space-y-1.5 text-[#2A2A2A]">
          <p className="font-sans text-[11px] sm:text-[13px] tracking-[0.22em] font-medium uppercase">
            {data.timeSlot}
          </p>
          <p className="font-sans text-[11px] sm:text-[13px] tracking-[0.22em] font-medium uppercase">
            {data.addressLine1}
          </p>
          <p className="font-sans text-[11px] sm:text-[13px] tracking-[0.22em] font-medium uppercase">
            {data.addressLine2}
          </p>
        </div>

        {/* RSVP Contact */}
        <div className="pt-1">
          <p className="font-sans text-[11px] sm:text-[12.5px] tracking-[0.18em] font-medium text-[#555555] uppercase">
            RSVP: {data.rsvpNumber}
          </p>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN TEMPLATE: 1-SECTION PURE INVITATION CARD VIEW
// ============================================================================

export const WisudaSatuTemplate: React.FC<WisudaSatuProps> = ({
  data: initialData,
  onBack,
  isEmbedded = false
}) => {
  const data: WisudaTemplateData = {
    ...DEFAULT_WISUDA_DATA,
    ...initialData
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Celebratory confetti trigger
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C5A059', '#1A1A1A', '#EFECE6', '#E2BA65', '#8C6D37']
      });
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#C5A059', '#FFFFFF', '#1A1A1A']
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#C5A059', '#FFFFFF', '#1A1A1A']
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
      `Halo ${data.graduateName}, selamat atas kelulusannya! 🎓\n\nSaya ingin konfirmasi kehadiran untuk acara ${data.subTitleScript} pada:\n📅 Tanggal: ${data.dateDay} ${data.dateMonth} ${data.dateYear}\n⏰ Waktu: ${data.timeSlot}\n📍 Lokasi: ${data.addressLine1}, ${data.addressLine2}\n\nTerima kasih banyak!`
    );
    return `https://wa.me/${intlPhone}?text=${msg}`;
  };

  // Google Calendar URL
  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent(`${data.subTitleScript} - ${data.graduateName}`);
    const details = encodeURIComponent(
      `Perayaan Pesta Kelulusan ${data.graduateName}.\nInfo RSVP: ${data.rsvpNumber}`
    );
    const location = encodeURIComponent(`${data.addressLine1}, ${data.addressLine2}`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20290606T040000Z/20290606T060000Z&details=${details}&location=${location}`;
  };

  return (
    <div className={`min-h-screen ${isEmbedded ? 'bg-transparent py-4' : 'bg-[#211d1b] py-8 sm:py-12'} px-3 sm:px-6 flex flex-col items-center justify-center relative overflow-x-hidden`}>
      {/* Background Audio */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src="https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3"
      />

      {/* Top Floating Bar (Only if not embedded) */}
      {!isEmbedded && (
        <div className="fixed top-4 left-4 right-4 z-40 flex items-center justify-between pointer-events-none">
          {onBack ? (
            <button
              onClick={onBack}
              className="pointer-events-auto px-4 py-2 rounded-full bg-stone-900/90 text-stone-200 hover:text-white border border-stone-700/80 shadow-xl backdrop-blur-md text-xs font-semibold flex items-center gap-2 hover:scale-105 transition-all cursor-pointer"
            >
              <ArrowLeft size={14} />
              <span>Kembali</span>
            </button>
          ) : <div />}

          <div className="pointer-events-auto flex items-center gap-2">
            <button
              onClick={toggleMusic}
              title={isPlaying ? 'Jeda Musik' : 'Putar Musik'}
              className="w-9 h-9 rounded-full bg-stone-900/90 hover:bg-[#C5A059] text-stone-200 hover:text-stone-950 border border-stone-700/80 shadow-xl backdrop-blur-md flex items-center justify-center transition-all cursor-pointer"
            >
              {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>

            <button
              onClick={triggerConfetti}
              title="Rayakan dengan Konfeti"
              className="w-9 h-9 rounded-full bg-stone-900/90 hover:bg-[#C5A059] text-stone-200 hover:text-stone-950 border border-stone-700/80 shadow-xl backdrop-blur-md flex items-center justify-center transition-all cursor-pointer"
            >
              <Sparkles size={16} />
            </button>
          </div>
        </div>
      )}

      {/* The Single Section Invitation Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-[440px] sm:max-w-[470px] flex flex-col items-center"
      >
        <WisudaInvitationCard data={data} />

        {/* Clean Interactive Action Buttons Below the Card */}
        <div className="w-full mt-6 grid grid-cols-3 gap-2.5 sm:gap-3">
          <a
            href={getWhatsAppRsvpUrl()}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-1.5 py-3 px-2 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold shadow-lg transition-all hover:scale-[1.02] cursor-pointer text-center"
          >
            <MessageCircle size={15} />
            <span>RSVP WA</span>
          </a>

          <a
            href={data.googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-1.5 py-3 px-2 rounded-2xl bg-stone-900/95 hover:bg-stone-800 text-[#EAE6DF] border border-stone-700 text-xs font-semibold shadow-lg transition-all hover:scale-[1.02] cursor-pointer text-center"
          >
            <MapPin size={15} className="text-[#C5A059]" />
            <span>Lokasi</span>
          </a>

          <a
            href={getGoogleCalendarUrl()}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-1.5 py-3 px-2 rounded-2xl bg-stone-900/95 hover:bg-stone-800 text-[#EAE6DF] border border-stone-700 text-xs font-semibold shadow-lg transition-all hover:scale-[1.02] cursor-pointer text-center"
          >
            <Calendar size={15} className="text-[#C5A059]" />
            <span>Kalender</span>
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default WisudaSatuTemplate;
