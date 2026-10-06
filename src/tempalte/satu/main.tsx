import React, { useState, useEffect, useRef } from 'react';
import {
  Heart,
  Volume2,
  VolumeX,
  ChevronUp,
  Mail,
  Sparkles,
  X,
} from 'lucide-react';

import cardBgImage from '../../assets/templateSatu/bacgraund.jpg';
import backraundTemplate from '../../assets/templateSatu/backraundTemplate.png';
import bungaKiri from '../../assets/templateSatu/bungaKiri.png';
import bungaKanan from '../../assets/templateSatu/bungaKanan.png';

// Components
import { RoseFloralDivider } from './components/RoseFloralDivider';

// Sections
import CoverSection from './sections/CoverSection';
import HeroSection from './sections/HeroSection';
import MempelaiSection from './sections/MempelaiSection';
import AcaraSection from './sections/AcaraSection';
import LoveStorySection from './sections/LoveStorySection';
import GaleriSection from './sections/GaleriSection';
import RSVPSection from './sections/RSVPSection';
import FooterSection from './sections/FooterSection';

// Types
import type { RSVPItem } from './types';

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
      setShowBackToTop(window.scrollY > 400);
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
          setIsPlaying(false);
        });
    }
  };

  // Ref for smooth scrolling to main content section
  const mainContentRef = useRef<HTMLDivElement | null>(null);

  // Disable automatic browser scroll restoration on refresh so it always starts at top
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
    }
  }, []);

  // Strict scroll lock when cover is active (before clicking Buka Undangan)
  useEffect(() => {
    const preventScroll = (e: Event) => {
      if (!isCoverOpen) {
        e.preventDefault();
      }
    };

    if (!isCoverOpen) {
      window.scrollTo(0, 0);
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      window.addEventListener('wheel', preventScroll, { passive: false });
      window.addEventListener('touchmove', preventScroll, { passive: false });
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
    };
  }, [isCoverOpen]);

  // Custom Ultra-Smooth Eased Scroll Function (easeInOutCubic over duration)
  const smoothScrollTo = (targetY: number, duration: number = 1200, onComplete?: () => void) => {
    const startY = window.scrollY || window.pageYOffset;
    const distance = targetY - startY;
    let startTime: number | null = null;

    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animationStep = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easeProgress = easeInOutCubic(progress);

      window.scrollTo(0, startY + distance * easeProgress);

      if (timeElapsed < duration) {
        requestAnimationFrame(animationStep);
      } else if (onComplete) {
        onComplete();
      }
    };

    requestAnimationFrame(animationStep);
  };

  // Open Invitation Handler with Ultra Smooth Slide-Down Scroll Animation
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

    // Unlock body scroll and enable main view
    document.body.style.overflow = '';
    setIsCoverOpen(true);

    // Calculate main content position and slide down smoothly
    const targetElem = mainContentRef.current || document.getElementById('main-content');
    const targetY = targetElem ? targetElem.offsetTop : window.innerHeight;

    // Small timeout to allow layout DOM paint before animating scroll
    setTimeout(() => {
      smoothScrollTo(targetY, 1200, () => {
        setIsOpening(false);
      });
    }, 50);
  };

  // Return to Cover Handler with Smooth Slide-Up Scroll
  const handleBackToCover = () => {
    const coverElem = document.getElementById('cover-section');
    const targetY = coverElem ? coverElem.offsetTop : 0;

    smoothScrollTo(targetY, 1000, () => {
      setIsCoverOpen(false);
    });
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

  return (
    <div
      className={`min-h-screen relative overflow-x-hidden text-[#423C36] font-sans flex justify-center selection:bg-[#8B263E] selection:text-white ${isEmbedded ? 'w-full' : ''}`}
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
        <div className="absolute top-[12%] left-[7%] animate-twinkle-gentle text-[#C5A880]/75">
          <Sparkles className="w-5 h-5 drop-shadow-[0_0_10px_rgba(197,168,128,0.5)]" />
        </div>
        <div
          className="absolute top-[26%] right-[8%] animate-twinkle-gentle text-[#D4AF37]/65"
          style={{ animationDelay: '1.5s' }}
        >
          <Sparkles className="w-6 h-6 drop-shadow-[0_0_12px_rgba(212,175,55,0.4)]" />
        </div>
        <div
          className="absolute bottom-[20%] left-[8%] animate-twinkle-gentle text-[#C5A880]/60"
          style={{ animationDelay: '2.5s' }}
        >
          <Sparkles className="w-4 h-4 drop-shadow-[0_0_8px_rgba(197,168,128,0.4)]" />
        </div>
        <div
          className="absolute bottom-[32%] right-[10%] animate-twinkle-gentle text-[#D4AF37]/60"
          style={{ animationDelay: '3s' }}
        >
          <Sparkles className="w-5 h-5 drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]" />
        </div>
        <div className="absolute top-[46%] left-[6%] animate-petal-drift text-[#8B263E]/20">
          <Heart className="w-6 h-6 fill-current drop-shadow-[0_0_8px_rgba(139,38,62,0.2)]" />
        </div>
        <div
          className="absolute top-[62%] right-[7%] animate-petal-drift text-[#8B263E]/18"
          style={{ animationDelay: '4s' }}
        >
          <Heart className="w-5 h-5 fill-current drop-shadow-[0_0_8px_rgba(139,38,62,0.18)]" />
        </div>
      </div>

      {/* 3. Desktop Left Side Companion Panel */}
      <aside className="fixed left-9 2xl:left-14 top-1/2 -translate-y-1/2 z-10 hidden xl:flex flex-col items-center text-center max-w-[240px] pointer-events-none select-none">
        <div className="relative">
          <div className="absolute -bottom-7 -left-7 z-20 pointer-events-none animate-flower-enter-left">
            <img
              src={bungaKiri}
              alt="Floral Corner Decor"
              className="w-28 opacity-95 animate-flower-sway-left drop-shadow-lg"
            />
          </div>
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
          <div className="absolute -top-7 -right-7 z-20 pointer-events-none animate-flower-enter-right">
            <img
              src={bungaKanan}
              alt="Floral Corner Decor"
              className="w-28 opacity-95 animate-flower-sway-right drop-shadow-lg"
            />
          </div>
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
            <div
              className={`absolute inset-0 rounded-full border border-white/30 ${isPlaying ? 'animate-spin-slow' : ''}`}
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
          UNIFIED CONTINUOUS DIGITAL INVITATION CANVAS
      ======================================================== */}
      <main
        className="w-full max-w-md min-h-screen relative shadow-2xl border-x border-[#D4AF37]/35 flex flex-col bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${cardBgImage})`,
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Global gentle light overlay matching cover ambience */}
        <div className="absolute inset-0 bg-[#FAF7F2]/88 backdrop-blur-[1px] pointer-events-none z-0" />

        {/* 1. COVER SECTION (Top Section of Continuous Layout) */}
        <section id="cover-section" className="relative z-10 w-full min-h-screen">
          <CoverSection
            guestName={guestName}
            isOpening={isOpening}
            isEmbedded={isEmbedded}
            onOpen={handleOpenInvitation}
          />
        </section>

        {/* 2. MAIN INVITATION CONTENT (Hero, Mempelai, Acara, Galeri, RSVP, Footer) */}
        <div id="main-content" ref={mainContentRef} className="relative z-10 w-full flex flex-col">
          {/* Quick Return to Cover Button */}
          <div className="pt-6 px-6 flex justify-start relative z-20">
            <button
              onClick={handleBackToCover}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-semibold text-[#82694D] bg-white/90 backdrop-blur-xs border border-[#82694D]/30 hover:bg-[#82694D] hover:text-white transition-all shadow-xs cursor-pointer"
            >
              <Mail className="w-3 h-3" />
              <span>Kembali ke Sampul Depan</span>
            </button>
          </div>

          {/* 2. Hero & Countdown & Ayat Suci */}
          <HeroSection timeLeft={timeLeft} />

          {/* 3. Profil Mempelai */}
          <MempelaiSection />

          {/* 4. Detail Acara */}
          <AcaraSection />

          {/* 5. Kisah Cinta */}
          <LoveStorySection />

          {/* 6. Galeri & Amplop Digital */}
          <GaleriSection
            onOpenLightbox={setActiveLightboxImg}
            onCopy={handleCopy}
          />

          {/* 7. RSVP & Buku Tamu */}
          <RSVPSection
            rsvpName={rsvpName}
            setRsvpName={setRsvpName}
            attendance={attendance}
            setAttendance={setAttendance}
            guestsCount={guestsCount}
            setGuestsCount={setGuestsCount}
            wishesMessage={wishesMessage}
            setWishesMessage={setWishesMessage}
            isSubmitting={isSubmitting}
            rsvpSuccess={rsvpSuccess}
            wishesList={wishesList}
            onSubmit={handleRsvpSubmit}
          />

          {/* Footer */}
          <FooterSection />
        </div>
      </main>
    </div>
  );
};

export default RusticBlossomTemplate;
