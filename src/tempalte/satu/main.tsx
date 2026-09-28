import React, { useState, useEffect, useRef } from 'react';
import {
  Heart,
  Calendar,
  MapPin,
  Send,
  Check,
  Copy,
  Clock,
  Volume2,
  VolumeX,
  ChevronUp,
  Gift,
  Mail,
  MailOpen,
  Sparkles,
  X,
} from 'lucide-react';

import cardBgImage from '../../assets/templateSatu/bacgraund.jpg';
import backraundTemplate from '../../assets/templateSatu/backraundTemplate.png';
import bungaKiri from '../../assets/templateSatu/bungaKiri.png';
import bungaKanan from '../../assets/templateSatu/bungaKanan.png';
import bungaAtas from '../../assets/templateSatu/atas.png';
import bungaBawah from '../../assets/templateSatu/bungaBawah.png';

// Dedicated SVG for Instagram icon (brand icons are not part of lucide-react core)
const InstagramIcon = ({ className = 'w-3.5 h-3.5' }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

// --- Types & Interfaces ---
export interface RSVPItem {
  id: string;
  name: string;
  attendance: 'hadir' | 'tidak_hadir' | 'ragu';
  guestsCount: number;
  message: string;
  timestamp: string;
}

export interface StoryTimelineItem {
  id: number;
  date: string;
  badge: string;
  title: string;
  description: string;
  image: string;
}

export interface BankAccountItem {
  bank: string;
  accountNumber: string;
  holderName: string;
  badgeColor: string;
}


// --- Luxury Rose Floral Divider SVG (Harmonized with white roses background) ---
export const RoseFloralDivider = ({
  className = 'w-44 h-8',
  color = '#82694D',
}: {
  className?: string;
  color?: string;
}) => (
  <svg
    className={className}
    viewBox="0 0 320 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Center Rose Blossom */}
    <g transform="translate(160, 30)">
      {/* Rose Center Petal Spiral Core */}
      <path
        d="M-2,-3 C0,-6 4,-5 5,-3 C6,-1 4,3 1,4 C-3,5 -6,2 -6,-2 C-6,-7 2,-8 7,-6 C12,-3 12,6 7,10 C1,14 -8,13 -12,7 C-16,1 -14,-10 -6,-14 C3,-18 15,-15 19,-7 C23,2 19,16 11,20 C3,24 -11,23 -17,15"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
        opacity="0.9"
      />
      {/* Outer Layering Petals */}
      <path
        d="M-12,-5 C-19,-12 -6,-20 4,-19 C15,-18 20,-8 15,3"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
      />
      <path
        d="M14,3 C20,11 11,22 0,22 C-11,22 -22,14 -16,3"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
      />
      <path
        d="M-16,0 C-24,3 -23,-11 -13,-16"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
      />
      {/* Rose Sepals / Calyx Base */}
      <path
        d="M-5,18 C-8,24 -14,25 -18,22 C-14,20 -10,18 -5,18 Z"
        fill={color}
        opacity="0.7"
      />
      <path
        d="M5,18 C8,24 14,25 18,22 C14,20 10,18 5,18 Z"
        fill={color}
        opacity="0.7"
      />
      <path
        d="M0,20 C0,27 3,31 0,34 C-3,31 0,27 0,20 Z"
        fill={color}
        opacity="0.75"
      />
    </g>

    {/* Left Flourish Arm */}
    <g>
      {/* Main horizontal flowing scroll line */}
      <path
        d="M136,30 C118,30 108,21 92,23 C76,25 62,35 44,32 C28,29 14,30 2,30"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.75"
      />
      {/* Counter-swirl flourish */}
      <path
        d="M92,23 C84,17 75,18 69,22 C63,26 54,28 44,32"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.55"
      />
      {/* Left Rose Leaf 1 */}
      <path
        d="M122,29 C115,19 104,18 100,24 C108,28 116,29 122,29 Z"
        fill={color}
        opacity="0.65"
      />
      {/* Left Rose Leaf 2 */}
      <path
        d="M82,24 C75,33 64,34 60,28 C67,23 75,23 82,24 Z"
        fill={color}
        opacity="0.6"
      />
      {/* Left Rosebud */}
      <g transform="translate(68, 20) scale(0.75)">
        <path
          d="M0,0 C-4,-8 4,-10 6,-5 C8,0 4,6 0,8 C-4,6 -6,1 0,0 Z"
          fill={color}
          opacity="0.75"
        />
        <path
          d="M-3,8 C-5,13 -1,16 0,18 C1,16 5,13 3,8"
          stroke={color}
          strokeWidth="1.3"
          fill="none"
          opacity="0.65"
        />
      </g>
      {/* Left Terminal Scroll & Pearl Dots */}
      <circle cx="2" cy="30" r="2.2" fill={color} opacity="0.8" />
      <circle cx="36" cy="30" r="1.5" fill={color} opacity="0.55" />
    </g>

    {/* Right Flourish Arm (Symmetrical Mirror) */}
    <g transform="translate(320, 0) scale(-1, 1)">
      {/* Main horizontal flowing scroll line */}
      <path
        d="M136,30 C118,30 108,21 92,23 C76,25 62,35 44,32 C28,29 14,30 2,30"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.75"
      />
      {/* Counter-swirl flourish */}
      <path
        d="M92,23 C84,17 75,18 69,22 C63,26 54,28 44,32"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.55"
      />
      {/* Right Rose Leaf 1 */}
      <path
        d="M122,29 C115,19 104,18 100,24 C108,28 116,29 122,29 Z"
        fill={color}
        opacity="0.65"
      />
      {/* Right Rose Leaf 2 */}
      <path
        d="M82,24 C75,33 64,34 60,28 C67,23 75,23 82,24 Z"
        fill={color}
        opacity="0.6"
      />
      {/* Right Rosebud */}
      <g transform="translate(68, 20) scale(0.75)">
        <path
          d="M0,0 C-4,-8 4,-10 6,-5 C8,0 4,6 0,8 C-4,6 -6,1 0,0 Z"
          fill={color}
          opacity="0.75"
        />
        <path
          d="M-3,8 C-5,13 -1,16 0,18 C1,16 5,13 3,8"
          stroke={color}
          strokeWidth="1.3"
          fill="none"
          opacity="0.65"
        />
      </g>
      {/* Right Terminal Scroll & Pearl Dots */}
      <circle cx="2" cy="30" r="2.2" fill={color} opacity="0.8" />
      <circle cx="36" cy="30" r="1.5" fill={color} opacity="0.55" />
    </g>
  </svg>
);

// --- Scroll Reveal Animation Component (IntersectionObserver) ---
export const ScrollReveal: React.FC<{
  children: React.ReactNode;
  variant?: 'up' | 'zoom' | 'left' | 'right';
  delay?: number;
  className?: string;
}> = ({ children, variant = 'up', delay = 0, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('reveal-active');
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  const variantClass =
    variant === 'zoom'
      ? 'reveal-zoom'
      : variant === 'left'
      ? 'reveal-left'
      : variant === 'right'
      ? 'reveal-right'
      : 'reveal-init';

  return (
    <div
      ref={ref}
      className={`${variantClass} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- Luxury Rose Corner Ornament SVG ---
export const RoseCornerOrnament = ({
  className = 'w-12 h-12',
  color = '#82694D',
}: {
  className?: string;
  color?: string;
}) => (
  <svg
    className={className}
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Rose Corner Core */}
    <g transform="translate(24, 24)">
      <path
        d="M-2,-2 C-1,-4 3,-4 4,-2 C5,0 3,3 0,4 C-3,4 -5,1 -5,-2 C-5,-6 2,-7 5,-4 C9,-2 9,4 5,7 C1,9 -4,9 -7,5"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />
      <path
        d="M-7,-3 C-12,-8 -3,-13 3,-12 C10,-11 13,-5 10,2"
        stroke={color}
        strokeWidth="1.1"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M9,2 C13,8 8,15 1,15 C-6,15 -13,10 -9,2"
        stroke={color}
        strokeWidth="1.1"
        fill="none"
        opacity="0.7"
      />
      {/* Corner Leaves */}
      <path
        d="M-5,-11 C-13,-13 -15,-7 -11,-4 C-7,-5 -6,-9 -5,-11 Z"
        fill={color}
        opacity="0.65"
      />
      <path
        d="M11,2 C16,1 18,8 14,10 C11,8 10,5 11,2 Z"
        fill={color}
        opacity="0.65"
      />
    </g>
    {/* Delicate Border Bracket */}
    <path
      d="M6,6 L6,50 C6,38 12,26 20,18 C28,10 40,6 52,6 L6,6 Z"
      stroke={color}
      strokeWidth="1"
      strokeLinecap="round"
      opacity="0.45"
    />
    <circle cx="6" cy="6" r="2.2" fill={color} opacity="0.8" />
  </svg>
);

// Alias BotanicalBranch to RoseFloralDivider for backwards compatibility
export const BotanicalBranch = RoseFloralDivider;

export interface RusticBlossomTemplateProps {
  isEmbedded?: boolean;
  defaultOpen?: boolean;
}

export const RusticBlossomTemplate: React.FC<RusticBlossomTemplateProps> = ({
  isEmbedded = false,
  defaultOpen = false,
}) => {
  // --- States ---
  const [isCoverOpen, setIsCoverOpen] = useState(defaultOpen);
  const [isOpening, setIsOpening] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [guestName] = useState<string>(() => {
    if (typeof window === 'undefined') return 'Tamu Undangan';
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const toParam = urlParams.get('to');
      if (toParam && toParam.trim() !== '') {
        return decodeURIComponent(toParam.replace(/\+/g, ' '));
      }
    } catch {
      // Fallback
    }
    return 'Tamu Undangan';
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeLightboxImg, setActiveLightboxImg] = useState<string | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Audio Reference
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // RSVP Form States
  const [rsvpName, setRsvpName] = useState<string>(() => {
    if (typeof window === 'undefined') return '';
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const toParam = urlParams.get('to');
      if (toParam && toParam.trim() !== '') {
        return decodeURIComponent(toParam.replace(/\+/g, ' '));
      }
    } catch {
      // Fallback
    }
    return '';
  });
  const [attendance, setAttendance] = useState<'hadir' | 'tidak_hadir' | 'ragu'>('hadir');
  const [guestsCount, setGuestsCount] = useState<number>(1);
  const [wishesMessage, setWishesMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);

  // Mock initial RSVPs
  const [wishesList, setWishesList] = useState<RSVPItem[]>([
    {
      id: '1',
      name: 'Dr. Hendra Gunawan & Keluarga',
      attendance: 'hadir',
      guestsCount: 2,
      message: 'Barakallahu lakuma wa baraka alaikuma wa jamaa bainakuma fii khoir. Selamat menempuh hidup baru untuk Mas Andi dan Mbak Rosna. Semoga senantiasa sakinah mawaddah warahmah.',
      timestamp: '2 jam yang lalu'
    },
    {
      id: '2',
      name: 'Dinda Ayuningtyas, S.H.',
      attendance: 'hadir',
      guestsCount: 1,
      message: 'MasyaAllah Tabarakallah cantiknya Mbak Rosna! Lancar sampai hari H yaa sahabatku. Ga sabar datang ke acaranya! 🌸🤍',
      timestamp: '5 jam yang lalu'
    },
    {
      id: '3',
      name: 'Rian Pratama & Partner',
      attendance: 'hadir',
      guestsCount: 2,
      message: 'Selamat bro Andi! Akhirnya berlabuh di pelabuhan terakhir. Semoga langgeng sampai kakek nenek dan berkah selalu keluarganya!',
      timestamp: 'Kemarin'
    },
    {
      id: '4',
      name: 'Fauzan Fadilah',
      attendance: 'ragu',
      guestsCount: 1,
      message: 'Selamat Mas Andi & Mba Rosna! Semoga acaranya berkah dan lancar tanpa kendala. Mohon doanya saya usahakan hadir karena ada dinas luar kota.',
      timestamp: 'Kemarin'
    }
  ]);

  // Realtime Countdown State
  const targetDate = new Date('2026-10-24T08:00:00+07:00').getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });



  // Countdown timer logic
  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  // Scroll listener for back to top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Audio Play/Pause helper
  const togglePlayMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Fallback if browser blocks
          setIsPlaying(false);
        });
    }
  };

  // Open Invitation Handler with Smooth Transition Animation
  const handleOpenInvitation = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Auto-play audio upon explicit user interaction
    if (audioRef.current) {
      audioRef.current.volume = 0.6;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          setIsPlaying(false);
        });
    }

    // Allow exit animation to play smoothly before showing main invitation
    setTimeout(() => {
      setIsCoverOpen(true);
      setIsOpening(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
  };

  // Copy to clipboard with toast
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setToastMessage(`${label} berhasil disalin!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Handle RSVP Submit
  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim() || !wishesMessage.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newEntry: RSVPItem = {
        id: Date.now().toString(),
        name: rsvpName.trim(),
        attendance,
        guestsCount,
        message: wishesMessage.trim(),
        timestamp: 'Baru saja'
      };

      setWishesList([newEntry, ...wishesList]);
      setIsSubmitting(false);
      setRsvpSuccess(true);
      setWishesMessage('');
      setToastMessage('Terima kasih atas konfirmasi & doa restu Anda!');
      setTimeout(() => setToastMessage(null), 3500);
    }, 600);
  };

  // Love Story Data
  const storyList: StoryTimelineItem[] = [
    {
      id: 1,
      date: '12 Mei 2022',
      badge: 'Awal Sebuah Pertemuan',
      title: 'Tatap Mata Pertama',
      description:
        'Pertemuan yang tak disengaja di sebuah simposium hukum nasional di Jakarta. Obrolan singkat mengenai riset akademis perlahan bertransformasi menjadi diskusi hangat yang selalu dirindukan setiap harinya.',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=700&q=80'
    },
    {
      id: 2,
      date: '18 April 2023',
      badge: 'Bulan Ramadhan',
      title: 'Menjalin Komitmen Suci',
      description:
        'Setelah melewati proses perkenalan ta\'aruf dan saling mengenal nilai-nilai keluarga masing-masing, di malam ke-27 bulan suci Ramadhan, kami sepakat untuk melangkah ke jenjang yang lebih serius dan terarah.',
      image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=700&q=80'
    },
    {
      id: 3,
      date: '10 Januari 2026',
      badge: 'Hari Lamaran',
      title: 'Ikrar Janji Pertunangan',
      description:
        'Di hadapan kedua orang tua serta sanak keluarga besar, ikatan suci ini diresmikan dalam balutan acara lamaran penuh haru dan doa restu, memantapkan langkah menuju hari mahligai pernikahan.',
      image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=700&q=80'
    }
  ];

  // Gallery Photos
  const galleryPhotos = [
    {
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      caption: 'Momen Bahagia Bersama'
    },
    {
      url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
      caption: 'Senyum Penuh Kasih'
    },
    {
      url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80',
      caption: 'Langkah Awal Menuju Abadi'
    },
    {
      url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80',
      caption: 'Genggaman Tangan Penuh Keyakinan'
    },
    {
      url: 'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=800&q=80',
      caption: 'Dalam Naungan Kasih Sayang'
    },
    {
      url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80',
      caption: 'Menatap Masa Depan Berdua'
    }
  ];

  // Bank Accounts for Digital Gifts
  const bankAccounts: BankAccountItem[] = [
    {
      bank: 'Bank Central Asia (BCA)',
      accountNumber: '8730491230',
      holderName: 'Andi Irawan',
      badgeColor: 'bg-[#005B9C]'
    },
    {
      bank: 'Bank Mandiri',
      accountNumber: '1370019284912',
      holderName: 'Rosna Linny',
      badgeColor: 'bg-[#003B70]'
    }
  ];

  // Google Calendar generator URLs
  const gcalAkadUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Akad+Nikah+Andi+%26+Rosna&dates=20261024T010000Z/20261024T030000Z&details=Pernikahan+Suci+Andi+Irawan+%26+Rosna+Linny&location=Masjid+Agung+Al-Azhar,+Jakarta+Selatan`;
  const gcalResepsiUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Resepsi+Pernikahan+Andi+%26+Rosna&dates=20261024T040000Z/20261024T090000Z&details=Resepsi+Pernikahan+Andi+Irawan+%26+Rosna+Linny&location=Grand+Ballroom+Hotel+Santika+Premiere+Jakarta`;

  return (
    <div
      className={`min-h-screen relative overflow-x-hidden text-[#423C36] font-sans flex justify-center selection:bg-[#8B263E] selection:text-white ${
        isEmbedded ? 'w-full' : ''
      }`}
      style={{
        backgroundColor: '#181414',
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.45)), url(${cardBgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* ========================================================
          OUTER AMBIENT BACKGROUND (Desktop & Tablet Atmosphere)
      ======================================================== */}
      {/* 1. Ambient Lighting Glow Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 -left-28 w-96 h-96 bg-[#8B263E]/8 rounded-full blur-[110px] animate-pulse-gentle" />
        <div className="absolute top-2/3 -right-28 w-96 h-96 bg-[#D4AF37]/12 rounded-full blur-[120px] animate-pulse-gentle" />
        <div className="absolute -bottom-10 left-1/4 w-80 h-80 bg-[#C5A880]/15 rounded-full blur-[100px]" />
      </div>

      {/* 2. Floating Animated Sparkles & Icons */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 hidden sm:block">
        {/* Sparkle 1 Top Left */}
        <div className="absolute top-[12%] left-[7%] animate-twinkle-gentle text-[#C5A880]/75">
          <Sparkles className="w-5 h-5 drop-shadow-[0_0_10px_rgba(197,168,128,0.5)]" />
        </div>
        {/* Sparkle 2 Top Right */}
        <div
          className="absolute top-[26%] right-[8%] animate-twinkle-gentle text-[#D4AF37]/65"
          style={{ animationDelay: '1.5s' }}
        >
          <Sparkles className="w-6 h-6 drop-shadow-[0_0_12px_rgba(212,175,55,0.4)]" />
        </div>
        {/* Sparkle 3 Bottom Left */}
        <div
          className="absolute bottom-[20%] left-[8%] animate-twinkle-gentle text-[#C5A880]/60"
          style={{ animationDelay: '2.5s' }}
        >
          <Sparkles className="w-4 h-4 drop-shadow-[0_0_8px_rgba(197,168,128,0.4)]" />
        </div>
        {/* Sparkle 4 Bottom Right */}
        <div
          className="absolute bottom-[32%] right-[10%] animate-twinkle-gentle text-[#D4AF37]/60"
          style={{ animationDelay: '3s' }}
        >
          <Sparkles className="w-5 h-5 drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]" />
        </div>
        {/* Floating Heart Icon 1 */}
        <div className="absolute top-[46%] left-[6%] animate-petal-drift text-[#8B263E]/20">
          <Heart className="w-6 h-6 fill-current drop-shadow-[0_0_8px_rgba(139,38,62,0.2)]" />
        </div>
        {/* Floating Heart Icon 2 */}
        <div
          className="absolute top-[62%] right-[7%] animate-petal-drift text-[#8B263E]/18"
          style={{ animationDelay: '4s' }}
        >
          <Heart className="w-5 h-5 fill-current drop-shadow-[0_0_8px_rgba(139,38,62,0.18)]" />
        </div>
      </div>

      {/* 3. Desktop Left Side Companion Panel */}
      <aside className="fixed left-6 2xl:left-14 top-1/2 -translate-y-1/2 z-10 hidden xl:flex flex-col items-center text-center max-w-[240px] pointer-events-none select-none">
        <div className="relative">
          {/* Pojok Kiri Bawah Card Floral Ornament */}
          <img
            src={bungaKiri}
            alt="Floral Corner Decor"
            className="absolute -bottom-7 -left-7 w-28 opacity-95 animate-flower-sway-left drop-shadow-lg z-20 pointer-events-none"
          />

          <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-md border border-[#E8DEC8] shadow-[0_12px_40px_rgba(139,38,62,0.08)] space-y-4 relative overflow-hidden">
            <div className="absolute -top-10 -left-10 w-28 h-28 bg-[#8B263E]/10 rounded-full blur-xl" />

            <div className="w-20 h-20 mx-auto rounded-full border-2 border-[#D4AF37]/60 bg-gradient-to-br from-[#FFFDF9] to-[#F5ECE0] flex items-center justify-center shadow-md">
              <span className="font-script-calligraphy text-4xl text-[#8B263E]">A &amp; R</span>
            </div>

            <div className="space-y-1">
              <span className="text-[9px] uppercase tracking-[0.35em] text-[#8B263E] font-bold block">
                WALIMATUL 'URS
              </span>
              <h3 className="font-serif-wedding text-xl font-bold text-[#4A1521]">
                Andi &amp; Rosna
              </h3>
              <p className="text-[11px] text-[#7A6A5E] font-serif">
                Sabtu, 24 Oktober 2026
              </p>
            </div>

            <div className="w-12 h-[1px] bg-[#D4AF37]/45 mx-auto" />

            <p className="text-[11px] text-[#6B5A50] italic leading-relaxed font-serif">
              "Menciptakan kebahagiaan abadi dalam ikatan suci pernikahan."
            </p>

            <div className="flex justify-center pt-1">
              <RoseFloralDivider className="w-28 h-5" color="#8B263E" />
            </div>
          </div>
        </div>
      </aside>

      {/* 4. Desktop Right Side Companion Panel */}
      <aside className="fixed right-6 2xl:right-14 top-1/2 -translate-y-1/2 z-10 hidden xl:flex flex-col items-center text-center max-w-[240px] pointer-events-none select-none">
        <div className="relative">
          {/* Pojok Kanan Card Floral Ornament */}
          <img
            src={bungaKanan}
            alt="Floral Corner Decor"
            className="absolute -top-7 -right-7 w-28 opacity-95 animate-flower-sway-right drop-shadow-lg z-20 pointer-events-none"
          />

          <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-md border border-[#E8DEC8] shadow-[0_12px_40px_rgba(139,38,62,0.08)] space-y-3.5 relative overflow-hidden">
            <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-[#D4AF37]/15 rounded-full blur-xl" />

            <div className="flex items-center justify-center gap-1.5 text-[#8B263E]">
              <Sparkles className="w-4 h-4 animate-pulse text-[#D4AF37]" />
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold">
                SAVE THE DATE
              </span>
            </div>

            <div className="py-1">
              <p className="font-serif-wedding text-2xl font-bold text-[#4A1521]">
                24 • 10 • 2026
              </p>
              <p className="text-[11px] text-[#7A6A5E] font-medium mt-0.5">
                Jakarta, Indonesia
              </p>
            </div>

            <div className="w-12 h-[1px] bg-[#D4AF37]/45 mx-auto" />

            <div className="flex items-center justify-center gap-2 text-[#7A6A5E] text-[10px]">
              <Volume2 className="w-3.5 h-3.5 text-[#8B263E] animate-pulse" />
              <span>Digital Wedding Invitation</span>
            </div>

            <div className="flex justify-center pt-0.5">
              <RoseFloralDivider className="w-28 h-5" color="#8B263E" />
            </div>
          </div>
        </div>
      </aside>

      {/* Background Audio Player */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3"
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className={`${isEmbedded ? 'absolute' : 'fixed'} top-6 left-1/2 -translate-x-1/2 z-50 bg-[#352B20]/95 backdrop-blur-md text-white px-5 py-3 rounded-2xl shadow-xl text-xs sm:text-sm font-medium flex items-center gap-2 border border-[#82694D]/40 transition-all animate-bounce-gentle`}>
          <Sparkles className="w-4 h-4 text-[#D8B486]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Lightbox Modal for Photo Gallery */}
      {activeLightboxImg && (
        <div
          className={`${isEmbedded ? 'absolute' : 'fixed'} inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4`}
          onClick={() => setActiveLightboxImg(null)}
        >
          <div className="relative max-w-2xl max-h-[85vh] w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setActiveLightboxImg(null)}
              className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white bg-white/10 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={activeLightboxImg}
              alt="Galeri Prewedding"
              className="w-full h-auto max-h-[80vh] object-contain rounded-2xl shadow-2xl border border-white/20"
            />
          </div>
        </div>
      )}

      {/* Floating Controls (Music Toggle & Back to Top) */}
      {isCoverOpen && (
        <div className={`${isEmbedded ? 'absolute bottom-4 right-4' : 'fixed bottom-6 right-5'} z-40 flex flex-col items-center gap-3`}>
          {/* Back to Top */}
          {showBackToTop && (
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-[#D9CEBF] shadow-lg flex items-center justify-center text-[#82694D] hover:bg-white hover:scale-105 transition-all cursor-pointer"
              title="Kembali ke atas"
            >
              <ChevronUp className="w-5 h-5" />
            </button>
          )}

          {/* Floating Vinyl Music Button */}
          <button
            onClick={togglePlayMusic}
            className="group relative w-12 h-12 rounded-full bg-[#82694D] border-2 border-white shadow-xl flex items-center justify-center text-white hover:scale-105 transition-all cursor-pointer overflow-hidden"
            title={isPlaying ? 'Jeda Musik' : 'Putar Musik'}
          >
            {/* Spinning Disc Record Indicator */}
            <div
              className={`absolute inset-0 rounded-full border border-white/30 ${isPlaying ? 'animate-spin-slow' : ''
                }`}
            />
            {isPlaying ? (
              <Volume2 className="w-5 h-5 relative z-10 animate-pulse text-[#F4ECE1]" />
            ) : (
              <VolumeX className="w-5 h-5 relative z-10 text-white/80" />
            )}
          </button>
        </div>
      )}

      {/* ========================================================
          1. COVER SCREEN (Gerbang Masuk) or MAIN INVITATION
      ======================================================== */}
      {!isCoverOpen ? (
        <section
          className={`w-full ${isEmbedded ? 'h-full min-h-[600px]' : 'min-h-screen min-h-[100dvh]'
            } flex items-center justify-center relative overflow-hidden select-none bg-cover bg-center bg-no-repeat ${
              isOpening ? 'animate-cover-exit pointer-events-none' : ''
            }`}
          style={{
            backgroundImage: `url(${cardBgImage})`,
          }}
        >
          {/* Golden Shimmer Flash Overlay on Open */}
          {isOpening && (
            <div className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden">
              <div className="w-80 h-80 rounded-full bg-gradient-to-r from-[#D4AF37]/35 via-[#FFF8ED]/60 to-[#D4AF37]/35 blur-2xl animate-shimmer-flash" />
            </div>
          )}

          {/* Ambient blurred backdrop for large screens */}
          <div
            className="absolute inset-0 bg-cover bg-center filter blur-lg scale-105 opacity-30 pointer-events-none hidden sm:block"
            style={{ backgroundImage: `url(${cardBgImage})` }}
          />
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />

          {/* Full Screen / Mobile Card container stretching full height top to bottom */}
          <div
            className={`w-full max-w-md ${isEmbedded ? 'h-full min-h-[600px] py-6' : 'min-h-screen min-h-[100dvh] py-10 sm:py-12'
              } px-6 sm:px-8 flex flex-col justify-between text-center relative z-10 overflow-hidden bg-cover bg-center bg-no-repeat sm:border-x sm:border-[#D4AF37]/30 shadow-2xl transition-all`}
            style={{
              backgroundImage: `url(${cardBgImage})`,
            }}
          >
            {/* Subtle soft gradient overlay so text remains ultra-legible while keeping corners and velvet visible */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/55 pointer-events-none" />


            {/* Top Area: Spacing for the printed gold Basmalah calligraphy + Invitation Badge */}
            <div className="pt-16 sm:pt-20 space-y-3 relative z-10">
              <div className="flex justify-center items-center gap-2">
                <div className="w-8 h-[1px] bg-[#E5C583]/60" />
                <span className="text-[10px] uppercase tracking-[0.35em] font-semibold text-[#F3E5AB] drop-shadow-sm">
                  UNDANGAN PERNIKAHAN
                </span>
                <div className="w-8 h-[1px] bg-[#E5C583]/60" />
              </div>

              {/* Nama Mempelai Cursive with Stylish Calligraphy */}
              <div className="py-1">
                <h1 className="font-script-calligraphy text-6xl sm:text-7xl text-[#FFF8ED] leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] tracking-wide">
                  Andi <span className="text-[#F3E5AB] text-5xl font-serif">&amp;</span> Rosna
                </h1>
                <p className="text-xs uppercase font-serif tracking-[0.25em] text-[#E5D0B1] mt-2 font-medium drop-shadow-sm">
                  Sabtu, 24 • 10 • 2026
                </p>
              </div>

              {/* Botanical Divider */}
              <div className="flex justify-center">
                <RoseFloralDivider className="w-24 h-5" color="#D4AF37" />
              </div>
            </div>

            {/* Middle / Bottom Area: Guest Receiver + Button */}
            <div className="space-y-4 pb-2 relative z-10">
              {/* Penerima Undangan Dinamis - Frosted Dark Glass Luxury */}
              <div className="p-4 rounded-2xl bg-black/45 backdrop-blur-md border border-[#D4AF37]/35 space-y-1.5 shadow-lg">
                <p className="text-[11px] text-[#E5D0B1] font-sans">
                  Kepada Yth. Bapak/Ibu/Saudara/i:
                </p>
                <p className="text-lg font-serif font-bold text-[#FFF8ED] tracking-wide drop-shadow-sm">
                  {guestName}
                </p>
                <p className="text-[11px] text-[#F3E5AB]/90 italic leading-relaxed pt-1">
                  "Tanpa Mengurangi Rasa Hormat, Kami Mengundang Anda Untuk Hadir Di Acara Pernikahan Kami."
                </p>
              </div>

              {/* Tombol Interaktif Buka Undangan */}
              <div>
                <button
                  onClick={handleOpenInvitation}
                  disabled={isOpening}
                  className={`w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#C5A059] via-[#F3E5AB] to-[#C5A059] hover:from-[#D4AF37] hover:via-[#FFF8ED] hover:to-[#D4AF37] active:scale-95 text-[#2D1606] text-xs sm:text-sm font-bold tracking-wider shadow-[0_4px_20px_rgba(197,160,89,0.35)] hover:shadow-[0_4px_25px_rgba(243,229,171,0.55)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group ${
                    isOpening ? 'scale-105 shadow-[0_0_30px_rgba(243,229,171,0.9)]' : ''
                  }`}
                >
                  {isOpening ? (
                    <>
                      <Sparkles className="w-4 h-4 text-[#2D1606] animate-spin" />
                      <span>Membuka Undangan...</span>
                    </>
                  ) : (
                    <>
                      <MailOpen className="w-4 h-4 text-[#2D1606] transition-transform group-hover:scale-110" />
                      <span>Buka Undangan</span>
                    </>
                  )}
                </button>
                <p className="text-[10px] text-[#E5D0B1]/85 mt-2.5 flex items-center justify-center gap-1 drop-shadow-sm">
                  <span>🎵</span> Musik otomatis diputar saat dibuka
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* MAIN INVITATION CONTAINER (Max-w-md Mobile-First) - FULL BACKGROUND FROM TOP TO BOTTOM */
        <main
          className="w-full max-w-md min-h-screen relative shadow-2xl border-x border-[#E9DFD0] overflow-hidden flex flex-col animate-main-enter"
          style={{
            backgroundImage: `url(${backraundTemplate})`,
            backgroundSize: '100% auto',
            backgroundRepeat: 'repeat-y',
            backgroundPosition: 'top center',
          }}
        >
          {/* Global gentle light overlay to preserve readability across all sections */}
          <div className="absolute inset-0 bg-white/30 pointer-events-none z-0" />

          {/* Quick Return to Cover Button */}
          <div className="pt-4 px-6 flex justify-start relative z-20">
            <button
              onClick={() => setIsCoverOpen(false)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-semibold text-[#82694D] bg-white/90 backdrop-blur-xs border border-[#82694D]/30 hover:bg-[#82694D] hover:text-white transition-all shadow-xs cursor-pointer"
            >
              <Mail className="w-3 h-3" />
              <span>Kembali ke Sampul Depan</span>
            </button>
          </div>

          {/* --------------------------------------------------------
            2. HERO & COUNTDOWN TIMER & AYAT SUCI
        -------------------------------------------------------- */}
          <section className="relative pt-6 pb-14 px-6 text-center z-10 space-y-8">
            {/* Corner Floral Ornaments */}
            <img
              src={bungaKiri}
              alt="Floral Accent Left"
              className="absolute -top-6 -left-6 w-28 sm:w-36 pointer-events-none z-20 animate-flower-sway-left drop-shadow-md"
            />
            <img
              src={bungaKanan}
              alt="Floral Accent Right"
              className="absolute -top-6 -right-6 w-28 sm:w-36 pointer-events-none z-20 animate-flower-sway-right drop-shadow-md"
            />

            {/* Header Tag */}
            <div className="space-y-2 pt-2 relative z-10">
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#8B263E] font-bold block">
                WALIMATUL 'URS
              </span>
              <h2 className="font-script-calligraphy text-6xl sm:text-7xl text-[#58111A] leading-tight drop-shadow-sm">
                Andi <span className="text-[#8B263E] text-5xl font-serif">&amp;</span> Rosna
              </h2>
              <p className="text-xs uppercase font-serif tracking-[0.2em] text-[#6E5E4F] font-medium">
                Sabtu, 24 Oktober 2026
              </p>
            </div>

            {/* Realtime Countdown Timer Card */}
            <ScrollReveal variant="up" delay={100}>
              <div className="rounded-3xl p-6 sm:p-7 border border-[#E0D5C4] shadow-md space-y-4 text-center bg-white/85 backdrop-blur-md transition-all">
                <div className="flex items-center justify-center gap-2 text-[#8B263E]">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs uppercase tracking-widest font-semibold">Menghitung Hari Bahagia</span>
                </div>

                <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
                  {[
                    { label: 'HARI', value: timeLeft.days },
                    { label: 'JAM', value: timeLeft.hours },
                    { label: 'MENIT', value: timeLeft.minutes },
                    { label: 'DETIK', value: timeLeft.seconds }
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-[#FAF7F2]/90 backdrop-blur-xs rounded-2xl py-3 px-1 border border-[#EFE8DC] flex flex-col items-center shadow-xs"
                    >
                      <span className="font-serif-wedding text-xl sm:text-2xl font-bold text-[#4A1521]">
                        {String(item.value).padStart(2, '0')}
                      </span>
                      <span className="text-[9px] font-bold text-[#8C7A65] tracking-wider mt-0.5">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="text-[11px] text-[#7A6D5E] italic">
                  Jakarta, Indonesia
                </p>
              </div>
            </ScrollReveal>

            {/* Ayat Suci QS. Ar-Rum: 21 Card */}
            <ScrollReveal variant="zoom" delay={150}>
              <div className="rounded-3xl p-6 sm:p-7 border border-[#E0D5C4] shadow-md space-y-4 text-center bg-white/85 backdrop-blur-md transition-all">
                <div className="flex justify-center">
                  <RoseFloralDivider className="w-20 h-5" color="#8B263E" />
                </div>

                <p
                  className="text-base sm:text-lg font-serif text-[#392E21] leading-loose tracking-wide pt-1"
                  dir="rtl"
                >
                  وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ
                </p>

                <div className="w-12 h-[1px] bg-[#8B263E]/35 mx-auto my-2" />

                <p className="text-xs text-[#5D5245] leading-relaxed italic font-serif">
                  "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir."
                </p>

                <span className="text-[11px] font-bold text-[#8B263E] tracking-wider block font-serif uppercase pt-1">
                  (QS. Ar-Rum: 21)
                </span>
              </div>
            </ScrollReveal>
          </section>

          {/* --------------------------------------------------------
            3. PROFIL MEMPELAI PRIA & WANITA
        -------------------------------------------------------- */}
          <section className="relative py-12 px-6 z-10 space-y-8">
            {/* Side Hanging Floral Vine Decor */}
            <img
              src={bungaAtas}
              alt="Floral Vine Decor"
              className="absolute -right-8 top-12 w-28 sm:w-36 pointer-events-none opacity-80 z-0 animate-flower-float drop-shadow-md hidden sm:block"
            />

            <ScrollReveal variant="up">
              <div className="text-center space-y-2 relative">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#8B263E] font-bold block">
                KAMI YANG BERBAHAGIA
              </span>
              <h3 className="font-serif-wedding text-2xl sm:text-3xl font-bold text-[#4A1521]">
                Mempelai Pernikahan
              </h3>
              <p className="text-xs text-[#6B5A50] max-w-xs mx-auto leading-relaxed">
                Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan pernikahan:
              </p>
              <div className="flex justify-center pt-1">
                <RoseFloralDivider className="w-28 h-5" color="#8B263E" />
              </div>
            </div>
          </ScrollReveal>

            {/* Mempelai Pria */}
            <ScrollReveal variant="left">
              <div className="bg-white/92 rounded-3xl p-6 border border-[#ECE4D8] shadow-sm text-center space-y-4 relative overflow-hidden">
                {/* Corner Floral Ornament */}
                <img
                  src={bungaKiri}
                  alt="Floral Corner"
                  className="absolute -top-5 -left-5 w-24 sm:w-28 pointer-events-none z-20 animate-flower-sway-left drop-shadow-md"
                />

                {/* Foto Lingkaran Border Ganda Emas Tipis */}
                <div className="relative mx-auto w-36 h-36">
                  <div className="absolute inset-0 rounded-full border-2 border-[#D8C7B2] animate-pulse-gentle" />
                  <div className="absolute inset-1.5 rounded-full border border-[#8B263E]/40" />
                  <img
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80"
                    alt="Andi Irawan, S.H., M.H."
                    className="w-full h-full object-cover rounded-full p-2.5"
                  />
                </div>

                <div className="space-y-1">
                  <h4 className="font-serif-wedding text-2xl font-bold text-[#4A1521]">
                    Andi Irawan, S.H., M.H.
                  </h4>
                  <p className="text-xs font-semibold text-[#8B263E] tracking-wider uppercase">
                    Mempelai Pria
                  </p>
                </div>

                <p className="text-xs text-[#6B5F52] leading-relaxed">
                  Putra pertama dari pasangan<br />
                  <strong className="text-[#3E3326]">Bapak H. Bambang Irawan</strong><br />
                  &amp; <strong className="text-[#3E3326]">Ibu Hj. Siti Aminah</strong>
                </p>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#F6F1EA] text-[#8B263E] hover:bg-[#8B263E] hover:text-white transition-all text-xs font-medium cursor-pointer"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                  <span>@andirawan_</span>
                </a>
              </div>
            </ScrollReveal>

            {/* Ampersand & Estetik */}
            <ScrollReveal variant="zoom">
              <div className="flex items-center justify-center gap-4 py-2 relative">
                <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#8B263E]/40" />
                <span className="font-script-calligraphy text-5xl text-[#8B263E] font-bold">
                  &amp;
                </span>
                <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#8B263E]/40" />
              </div>
            </ScrollReveal>

            {/* Mempelai Wanita */}
            <ScrollReveal variant="right">
              <div className="bg-white/92 rounded-3xl p-6 border border-[#ECE4D8] shadow-sm text-center space-y-4 relative overflow-hidden">
                {/* Corner Floral Ornament */}
                <img
                  src={bungaKanan}
                  alt="Floral Corner"
                  className="absolute -top-5 -right-5 w-24 sm:w-28 pointer-events-none z-20 animate-flower-sway-right drop-shadow-md"
                />

                {/* Foto Lingkaran Border Ganda Emas Tipis */}
                <div className="relative mx-auto w-36 h-36">
                  <div className="absolute inset-0 rounded-full border-2 border-[#D8C7B2] animate-pulse-gentle" />
                  <div className="absolute inset-1.5 rounded-full border border-[#8B263E]/40" />
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
                    alt="Adv. Rosna Linny, S.H., Gr."
                    className="w-full h-full object-cover rounded-full p-2.5"
                  />
                </div>

                <div className="space-y-1">
                  <h4 className="font-serif-wedding text-2xl font-bold text-[#4A1521]">
                    Adv. Rosna Linny, S.H., Gr.
                  </h4>
                  <p className="text-xs font-semibold text-[#8B263E] tracking-wider uppercase">
                    Mempelai Wanita
                  </p>
                </div>

                <p className="text-xs text-[#6B5F52] leading-relaxed">
                  Putri kedua dari pasangan<br />
                  <strong className="text-[#3E3326]">Bapak Dr. H. Rahman Hakim</strong><br />
                  &amp; <strong className="text-[#3E3326]">Ibu Hj. Nurhayati</strong>
                </p>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#F6F1EA] text-[#8B263E] hover:bg-[#8B263E] hover:text-white transition-all text-xs font-medium cursor-pointer"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                  <span>@rosnalinny_</span>
                </a>
              </div>
            </ScrollReveal>
          </section>

          {/* --------------------------------------------------------
            4. DETAIL ACARA (AKAD & RESEPSI)
        -------------------------------------------------------- */}
          <section className="relative py-12 px-6 z-10 space-y-8 bg-[#F5EFEB]/60">
            <ScrollReveal variant="up">
              <div className="text-center space-y-2 relative">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#8B263E] font-bold block">
                  AGENDA &amp; WAKTU
                </span>
                <h3 className="font-serif-wedding text-2xl sm:text-3xl font-bold text-[#4A1521]">
                  Detail Acara
                </h3>
                <p className="text-xs text-[#706456]">
                  Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.
                </p>
                <div className="flex justify-center pt-1">
                  <RoseFloralDivider className="w-24 h-5" color="#8B263E" />
                </div>
              </div>
            </ScrollReveal>

            {/* Card Akad Nikah */}
            <ScrollReveal variant="left">
              <div className="bg-white/95 rounded-3xl p-6 sm:p-7 border border-[#E9DFD0] shadow-sm space-y-4 text-center relative overflow-hidden">
                {/* Corner Floral Accent */}
                <img
                  src={bungaKiri}
                  alt="Floral Accent"
                  className="absolute -top-6 -left-6 w-24 sm:w-28 pointer-events-none opacity-85 animate-flower-sway-left z-10"
                />

                <div className="w-12 h-12 rounded-full bg-[#FBF7F0] border border-[#E7DCCF] flex items-center justify-center text-[#8B263E] mx-auto shadow-xs relative z-10">
                  <Calendar className="w-6 h-6" />
                </div>

                <h4 className="font-serif-wedding text-xl font-bold text-[#4A1521] relative z-10">
                  Akad Nikah
                </h4>

                <div className="space-y-1 text-xs text-[#6B5F52] relative z-10">
                  <p className="font-bold text-[#3E3326] text-sm">
                    Sabtu, 24 Oktober 2026
                  </p>
                  <p className="flex items-center justify-center gap-1.5 font-medium text-[#8B263E]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Pukul 08.00 - 10.00 WIB</span>
                  </p>
                </div>

                <div className="w-10 h-[1px] bg-[#8B263E]/25 mx-auto relative z-10" />

                <div className="space-y-1 text-xs relative z-10">
                  <p className="font-bold text-[#352B20]">
                    Masjid Agung Al-Azhar
                  </p>
                  <p className="text-[#756A5E] leading-relaxed">
                    Jl. Sisingamangaraja No. 1, RT.2/RW.1, Selong, Kebayoran Baru, Jakarta Selatan
                  </p>
                </div>

                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5 relative z-10">
                  <a
                    href={gcalAkadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl border border-[#8B263E] text-[#8B263E] hover:bg-[#8B263E] hover:text-white transition-all text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Simpan Kalender</span>
                  </a>

                  <a
                    href="https://maps.google.com/?q=Masjid+Agung+Al-Azhar+Kebayoran+Baru"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-[#8B263E] text-white hover:bg-[#6F1D30] transition-all text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Google Maps</span>
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* Card Resepsi Pernikahan */}
            <ScrollReveal variant="right">
              <div className="bg-white/95 rounded-3xl p-6 sm:p-7 border border-[#E9DFD0] shadow-sm space-y-4 text-center relative overflow-hidden">
                {/* Corner Floral Accent */}
                <img
                  src={bungaKanan}
                  alt="Floral Accent"
                  className="absolute -top-6 -right-6 w-24 sm:w-28 pointer-events-none opacity-85 animate-flower-sway-right z-10"
                />

                <div className="w-12 h-12 rounded-full bg-[#FBF7F0] border border-[#E7DCCF] flex items-center justify-center text-[#8B263E] mx-auto shadow-xs relative z-10">
                  <Sparkles className="w-6 h-6" />
                </div>

                <h4 className="font-serif-wedding text-xl font-bold text-[#4A1521] relative z-10">
                  Resepsi Pernikahan
                </h4>

                <div className="space-y-1 text-xs text-[#6B5F52] relative z-10">
                  <p className="font-bold text-[#3E3326] text-sm">
                    Sabtu, 24 Oktober 2026
                  </p>
                  <p className="flex items-center justify-center gap-1.5 font-medium text-[#8B263E]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Pukul 11.00 - 16.00 WIB</span>
                  </p>
                </div>

                <div className="w-10 h-[1px] bg-[#8B263E]/25 mx-auto relative z-10" />

                <div className="space-y-1 text-xs relative z-10">
                  <p className="font-bold text-[#352B20]">
                    Grand Ballroom Hotel Santika Premiere
                  </p>
                  <p className="text-[#756A5E] leading-relaxed">
                    Jl. Hayam Wuruk No. 28, RT.6/RW.2, Gambir, Jakarta Pusat
                  </p>
                </div>

                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5 relative z-10">
                  <a
                    href={gcalResepsiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl border border-[#8B263E] text-[#8B263E] hover:bg-[#8B263E] hover:text-white transition-all text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Simpan Kalender</span>
                  </a>

                  <a
                    href="https://maps.google.com/?q=Hotel+Santika+Premiere+Hayam+Wuruk+Jakarta"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-[#8B263E] text-white hover:bg-[#6F1D30] transition-all text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Google Maps</span>
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </section>

          {/* --------------------------------------------------------
            5. KISAH CINTA (LOVE STORY TIMELINE)
        -------------------------------------------------------- */}
          <section className="relative py-12 px-6 z-10 space-y-8">
            <ScrollReveal variant="up">
              <div className="text-center space-y-2 relative">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#8B263E] font-bold block">
                  OUR JOURNEY
                </span>
                <h3 className="font-serif-wedding text-2xl sm:text-3xl font-bold text-[#4A1521]">
                  Kisah Cinta
                </h3>
                <p className="text-xs text-[#706456]">
                  Setiap kisah memiliki awal, dan ini adalah lembaran perjalanan kami.
                </p>
                <div className="flex justify-center pt-1">
                  <RoseFloralDivider className="w-24 h-5" color="#8B263E" />
                </div>
              </div>
            </ScrollReveal>

            <div className="relative pl-6 sm:pl-8 space-y-8 before:content-[''] before:absolute before:left-3 before:top-3 before:bottom-3 before:w-[1.5px] before:bg-gradient-to-b before:from-[#8B263E] before:via-[#CBB8A1] before:to-[#8B263E]">
              {storyList.map((story, index) => (
                <ScrollReveal key={story.id} variant="zoom" delay={index * 120}>
                  <div className="relative group">
                    {/* Timeline Circle Bullet */}
                    <div className="absolute -left-[23px] sm:-left-[31px] top-1.5 w-6 h-6 rounded-full bg-[#8B263E] text-white flex items-center justify-center shadow-md">
                      <Heart className="w-3 h-3 fill-current" />
                    </div>

                    {/* Card Story */}
                    <div className="bg-white/95 rounded-3xl p-5 border border-[#ECE3D5] shadow-xs hover:shadow-md transition-shadow space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-[#8B263E] bg-[#FBF7F0] px-2.5 py-1 rounded-full border border-[#EFE8DC]">
                          {story.badge}
                        </span>
                        <span className="text-[11px] text-[#8A7E72] font-medium font-serif">
                          {story.date}
                        </span>
                      </div>

                      <div className="overflow-hidden rounded-2xl h-40">
                        <img
                          src={story.image}
                          alt={story.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      <h4 className="font-serif-wedding text-base font-bold text-[#4A1521]">
                        {story.title}
                      </h4>

                      <p className="text-xs text-[#6B6053] leading-relaxed">
                        {story.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </section>

          {/* --------------------------------------------------------
            6. GALERI FOTO & AMPLOP DIGITAL (KADO)
        -------------------------------------------------------- */}
          <section className="relative py-12 px-6 z-10 space-y-8 bg-[#F5EFEB]/60">
            {/* Gallery Header */}
            <ScrollReveal variant="up">
              <div className="text-center space-y-2 relative">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#8B263E] font-bold block">
                  MOMEN TERINDAH
                </span>
                <h3 className="font-serif-wedding text-2xl sm:text-3xl font-bold text-[#4A1521]">
                  Galeri Prewedding
                </h3>
                <p className="text-xs text-[#706456]">
                  Sentuhan rasa dalam rangkaian bingkai kenangan kami.
                </p>
                <div className="flex justify-center pt-1">
                  <RoseFloralDivider className="w-24 h-5" color="#8B263E" />
                </div>
              </div>
            </ScrollReveal>

            {/* Photo Grid */}
            <ScrollReveal variant="zoom">
              <div className="grid grid-cols-2 gap-3">
                {galleryPhotos.map((photo, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveLightboxImg(photo.url)}
                    className={`relative rounded-2xl overflow-hidden shadow-xs border border-[#ECE3D5] cursor-pointer group ${idx === 0 || idx === 3 ? 'h-52' : 'h-40'
                      }`}
                  >
                    <img
                      src={photo.url}
                      alt={photo.caption}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="p-2 rounded-full bg-white/80 text-[#352B20]">
                        <Sparkles className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <div className="pt-6">
              <div className="w-16 h-[1px] bg-[#82694D]/30 mx-auto" />
            </div>

            {/* Amplop Digital (Tanda Kasih / Kado) */}
            <div className="space-y-6">
              <ScrollReveal variant="up">
                <div className="text-center space-y-2 relative">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#8B263E] font-bold block">
                    WEDDING GIFT
                  </span>
                  <h3 className="font-serif-wedding text-2xl sm:text-3xl font-bold text-[#4A1521]">
                    Amplop Digital
                  </h3>
                  <p className="text-xs text-[#706456] leading-relaxed max-w-xs mx-auto">
                    Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika memberi adalah tanda kasih Anda, kami menyediakan amplop digital di bawah ini:
                  </p>
                  <div className="flex justify-center pt-1">
                    <RoseFloralDivider className="w-24 h-5" color="#8B263E" />
                  </div>
                </div>
              </ScrollReveal>

              {/* Bank Cards */}
              <div className="space-y-3.5">
                {bankAccounts.map((acc, index) => (
                  <ScrollReveal key={index} variant={index % 2 === 0 ? 'left' : 'right'}>
                    <div className="bg-white/95 rounded-3xl p-5 border border-[#EBE3D6] shadow-sm space-y-3 relative overflow-hidden">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#4A1521] font-serif">
                          {acc.bank}
                        </span>
                        <Gift className="w-4 h-4 text-[#8B263E]" />
                      </div>

                      <div className="p-3.5 rounded-2xl bg-[#FBF9F5] border border-[#ECE3D5] flex items-center justify-between">
                        <div>
                          <p className="text-[10px] text-[#877A6C] uppercase tracking-wider font-semibold">
                            Nomor Rekening:
                          </p>
                          <p className="font-mono text-base font-bold text-[#4A1521] tracking-wider">
                            {acc.accountNumber}
                          </p>
                          <p className="text-[11px] text-[#695F54] font-medium mt-0.5">
                            a.n {acc.holderName}
                          </p>
                        </div>

                        <button
                          onClick={() => handleCopy(acc.accountNumber, `No. Rekening ${acc.bank}`)}
                          className="p-2.5 rounded-xl bg-[#8B263E] text-white hover:bg-[#6F1D30] transition-all shadow-xs cursor-pointer"
                          title="Salin No. Rekening"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}

                {/* Kirim Hadiah Fisik Card */}
                <ScrollReveal variant="zoom">
                  <div className="bg-white/95 rounded-3xl p-5 border border-[#EBE3D6] shadow-sm space-y-3">
                    <div className="flex items-center gap-2 text-[#8B263E]">
                      <MapPin className="w-4 h-4" />
                      <span className="text-xs font-bold font-serif">Kirim Kado Fisik</span>
                    </div>
                    <p className="text-xs text-[#6B6053] leading-relaxed">
                      Penerima: <strong className="text-[#4A1521]">Andi &amp; Rosna</strong><br />
                      Jl. Kemang Raya No. 45B, Mampang Prapatan, Jakarta Selatan, 12730
                    </p>
                    <button
                      onClick={() =>
                        handleCopy(
                          'Jl. Kemang Raya No. 45B, Mampang Prapatan, Jakarta Selatan, 12730 (Andi & Rosna)',
                          'Alamat kado fisik'
                        )
                      }
                      className="w-full py-2 px-3 rounded-xl border border-[#8B263E] text-[#8B263E] hover:bg-[#8B263E] hover:text-white transition-all text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin Alamat Lengkap</span>
                    </button>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* --------------------------------------------------------
            7. BUKU TAMU & FORM RSVP (UCAPAN & DOA)
        -------------------------------------------------------- */}
          <section className="relative py-12 px-6 z-10 space-y-8">
            <ScrollReveal variant="up">
              <div className="text-center space-y-2 relative">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#8B263E] font-bold block">
                  RSVP &amp; WISHES
                </span>
                <h3 className="font-serif-wedding text-2xl sm:text-3xl font-bold text-[#4A1521]">
                  Buku Tamu &amp; Doa Restu
                </h3>
                <p className="text-xs text-[#706456]">
                  Kehadiran dan doa tulus Anda adalah kebahagiaan tak terhingga bagi kami.
                </p>
                <div className="flex justify-center pt-1">
                  <RoseFloralDivider className="w-24 h-5" color="#8B263E" />
                </div>
              </div>
            </ScrollReveal>

            {/* Form Card */}
            <ScrollReveal variant="zoom">
              <div className="bg-white rounded-3xl p-6 border border-[#ECE3D5] shadow-sm space-y-4">
                {rsvpSuccess && (
                  <div className="p-3.5 rounded-2xl bg-[#F0F7F2] border border-[#CCE5D4] text-[#246237] text-xs font-semibold flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#246237]" />
                    <span>Konfirmasi dan doa restu Anda telah berhasil dikirim!</span>
                  </div>
                )}

                <form onSubmit={handleRsvpSubmit} className="space-y-4">
                  {/* Nama */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-[#54493D] uppercase tracking-wider block">
                      Nama Anda
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Masukkan nama lengkap Anda"
                      value={rsvpName}
                      onChange={(e) => setRsvpName(e.target.value)}
                      className="w-full text-xs px-4 py-3 rounded-2xl border border-[#DFD6C9] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#82694D] transition-colors"
                    />
                  </div>

                  {/* Konfirmasi Kehadiran */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-[#54493D] uppercase tracking-wider block">
                      Konfirmasi Kehadiran
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { key: 'hadir', label: 'Ya, Hadir' },
                        { key: 'tidak_hadir', label: 'Tidak Hadir' },
                        { key: 'ragu', label: 'Ragu' }
                      ].map((opt) => (
                        <button
                          key={opt.key}
                          type="button"
                          onClick={() => setAttendance(opt.key as any)}
                          className={`py-2 px-2 rounded-xl text-[11px] font-semibold transition-all border cursor-pointer ${attendance === opt.key
                            ? 'bg-[#82694D] text-white border-[#82694D] shadow-xs'
                            : 'bg-[#FAF8F5] text-[#695D50] border-[#E2D9CC] hover:bg-white'
                            }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Jumlah Tamu */}
                  {attendance === 'hadir' && (
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-[#54493D] uppercase tracking-wider block">
                        Jumlah Tamu Hadir
                      </label>
                      <select
                        value={guestsCount}
                        onChange={(e) => setGuestsCount(Number(e.target.value))}
                        className="w-full text-xs px-4 py-3 rounded-2xl border border-[#DFD6C9] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#82694D]"
                      >
                        <option value={1}>1 Orang</option>
                        <option value={2}>2 Orang</option>
                        <option value={3}>3 Orang</option>
                      </select>
                    </div>
                  )}

                  {/* Ucapan & Doa */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-[#54493D] uppercase tracking-wider block">
                      Ucapan &amp; Doa Restu
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Tuliskan doa tulus dan harapan baik Anda untuk kedua mempelai..."
                      value={wishesMessage}
                      onChange={(e) => setWishesMessage(e.target.value)}
                      className="w-full text-xs px-4 py-3 rounded-2xl border border-[#DFD6C9] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#82694D] transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-6 rounded-2xl bg-[#82694D] hover:bg-[#6E573C] text-white text-xs font-semibold tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span>Mengirimkan Ucapan...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Kirim Ucapan &amp; Doa</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </ScrollReveal>

            {/* Realtime Wishes List */}
            <ScrollReveal variant="up">
              <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                  <span className="font-serif-wedding text-sm font-bold text-[#352B20]">
                    Ucapan Doa Terkini ({wishesList.length})
                  </span>
                  <span className="text-[10px] text-[#8C7E70] font-medium">
                    Realtime Updates
                  </span>
                </div>

                <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                  {wishesList.map((wish) => (
                    <div
                      key={wish.id}
                      className="bg-white rounded-2xl p-4 border border-[#ECE3D5] shadow-xs space-y-2 text-left"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-[#82694D]/15 text-[#82694D] flex items-center justify-center font-bold text-xs">
                            {wish.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-[#352B20]">
                              {wish.name}
                            </p>
                            <p className="text-[10px] text-[#8A7E72]">
                              {wish.timestamp}
                            </p>
                          </div>
                        </div>

                        <span
                          className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${wish.attendance === 'hadir'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : wish.attendance === 'tidak_hadir'
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}
                        >
                          {wish.attendance === 'hadir'
                            ? 'Hadir'
                            : wish.attendance === 'tidak_hadir'
                              ? 'Berhalangan'
                              : 'Belum Pasti'}
                        </span>
                      </div>

                      <p className="text-xs text-[#5D5245] leading-relaxed pl-9">
                        {wish.message}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </section>

          {/* --------------------------------------------------------
            FOOTER & CLOSING
        -------------------------------------------------------- */}
          <ScrollReveal variant="up">
            <footer className="relative pt-10 pb-16 px-6 text-center space-y-5 z-10 border-t border-[#EAE1D3]/80 bg-white/40 backdrop-blur-xs overflow-hidden">
              {/* Grand Footer Floral Garland (Diputar balik / rotate-180) */}
              <div className="relative -mt-2 pb-2 flex justify-center rotate-180">
                <img
                  src={bungaBawah}
                  alt="Grand Floral Garland"
                  className="w-full max-w-sm sm:max-w-md pointer-events-none drop-shadow-lg animate-garland-pulse"
                />
              </div>

              <div className="flex justify-center">
                <RoseFloralDivider className="w-24 h-5" color="#8B263E" />
              </div>

              <div className="space-y-1 relative z-10">
                <p className="text-xs text-[#706456]">
                  Ungkapan terima kasih yang tulus dari kami,
                </p>
                <h4 className="font-script-calligraphy text-5xl sm:text-6xl text-[#58111A] leading-tight drop-shadow-sm">
                  Andi <span className="text-[#8B263E] text-4xl font-serif">&amp;</span> Rosna
                </h4>
                <p className="text-[10px] text-[#8B263E] uppercase tracking-widest font-semibold pt-1">
                  Beserta Seluruh Keluarga Besar
                </p>
              </div>

              <div className="pt-6 border-t border-[#ECE3D5]/80">
                <p className="text-[10px] text-[#9E9386]">
                  Dibuat dengan cinta menggunakan{' '}
                  <span className="font-serif-wedding font-bold text-[#8B263E]">
                    i say yes
                  </span>{' '}
                  — Digital Wedding Invitation Platform
                </p>
              </div>
            </footer>
          </ScrollReveal>
        </main>
      )}
    </div>
  );
};

export default RusticBlossomTemplate;
