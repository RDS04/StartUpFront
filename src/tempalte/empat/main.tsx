import React, { useState, useEffect, useRef } from 'react';
import './empat.css';

// Components
import { MusicPlayer } from './components/MusicPlayer';
import { BottomNavbar } from './components/BottomNavbar';
import { LightboxModal } from './components/LightboxModal';

// Sections
import { CoverSection } from './sections/CoverSection';
import { HeroSection } from './sections/HeroSection';
import { QuoteSection } from './sections/QuoteSection';
import { CoupleSection } from './sections/CoupleSection';
import { EventSection } from './sections/EventSection';
import { LoveStorySection } from './sections/LoveStorySection';
import { GallerySection } from './sections/GallerySection';
import { GiftSection } from './sections/GiftSection';
import { GuestBookSection } from './sections/GuestBookSection';
import { ClosingSection } from './sections/ClosingSection';

// Data
import { ASSETS, GALLERY_PHOTOS, WEDDING_INFO } from './data';
import { TemplateEmpatProvider } from './context';

export interface SageBlossomTemplateProps {
  isEmbedded?: boolean;
  defaultOpen?: boolean;
  isPreview?: boolean;
  guestName?: string;
}

const getGuestNameFromUrl = (customName?: string): string => {
  if (customName) return customName;
  if (typeof window === 'undefined') return 'Reyhan & Partner';
  try {
    const search = window.location.search || window.location.hash.split('?')[1] || '';
    const params = new URLSearchParams(search.startsWith('?') ? search : `?${search}`);
    const to = params.get('to') || params.get('dear') || params.get('kepada');
    if (to && to.trim()) {
      return decodeURIComponent(to.replace(/\+/g, ' '));
    }
  } catch {
    // Fallback
  }
  return 'Reyhan & Partner';
};

export const SageBlossomTemplate: React.FC<SageBlossomTemplateProps> = ({
  isEmbedded = false,
  defaultOpen = false,
  isPreview = true,
  guestName,
}) => {
  return (
    <TemplateEmpatProvider isPreview={isPreview}>
      <SageBlossomTemplateInner isEmbedded={isEmbedded} defaultOpen={defaultOpen} guestNameProp={guestName} />
    </TemplateEmpatProvider>
  );
};

const SageBlossomTemplateInner: React.FC<{ isEmbedded?: boolean; defaultOpen?: boolean; guestNameProp?: string }> = ({
  isEmbedded = false,
  defaultOpen = false,
  guestNameProp,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isPlaying, setIsPlaying] = useState(false);
  const [guestName] = useState(() => getGuestNameFromUrl(guestNameProp));
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Lock body scroll saat cover terbuka (jika bukan embedded)
  useEffect(() => {
    if (isEmbedded) return;
    document.body.style.overflow = isOpen ? '' : 'hidden';
    if (!isOpen) window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, isEmbedded]);

  // Handle Play / Pause musik
  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  // Buka Undangan & Autoplay Musik
  const handleOpenInvitation = () => {
    setIsOpen(true);
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Browser autoplay policy fallback
          setIsPlaying(false);
        });
    }

    // Scroll halus ke hero section
    setTimeout(() => {
      const hero = document.getElementById('hero-section');
      if (hero) {
        hero.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full bg-[#1e2a20] text-[#2c3d2f] font-sage-body select-none">
      {/* Background Audio Player Element */}
      <audio ref={audioRef} src={ASSETS.bgMusic} loop preload="auto" />

      {/* Cover Modal (jika belum dibuka & bukan defaultOpen) */}
      {!isOpen && (
        <CoverSection guestName={guestName} onOpen={handleOpenInvitation} />
      )}

      {/* Lightbox Modal untuk Galeri Foto */}
      <LightboxModal
        photos={GALLERY_PHOTOS}
        currentIndex={activePhotoIndex}
        onClose={() => setActivePhotoIndex(null)}
        onNext={() => {
          if (activePhotoIndex !== null) {
            setActivePhotoIndex((activePhotoIndex + 1) % GALLERY_PHOTOS.length);
          }
        }}
        onPrev={() => {
          if (activePhotoIndex !== null) {
            setActivePhotoIndex(
              (activePhotoIndex - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length
            );
          }
        }}
      />

      {/* Floating Controls (Music Player & Bottom Navbar) */}
      {isOpen && (
        <>
          <MusicPlayer isPlaying={isPlaying} onToggle={toggleMusic} />
          {!isEmbedded && <BottomNavbar onNavigate={handleNavigate} />}
        </>
      )}

      {/* Layout Wrapper: Desktop Split & Mobile Container */}
      <div className={!isEmbedded ? 'empat-desktop-container' : 'w-full'}>
        {/* Desktop Fixed Left Cover (Hanya tampil di Desktop > 900px) */}
        {!isEmbedded && (
          <div className="empat-desktop-cover relative bg-[#1c271e] text-white">
            <img
              src={ASSETS.coupleCover}
              alt="Eza & Islammy Desktop Cover"
              className="w-full h-full object-cover object-center opacity-65 animate-ken-burns"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#172218]/90 via-[#213023]/70 to-[#1b261d]/90" />

            {/* Daun Goyang Desktop */}
            <div className="absolute top-0 left-0 w-64 origin-top-left animate-goyang-kiri opacity-90 pointer-events-none">
              <img src={ASSETS.leafCorner} alt="Daun" className="w-full h-auto" />
            </div>

            <div className="absolute inset-0 flex flex-col justify-between p-12 z-20">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-[0.3em] text-[#cbd7c2] font-semibold">
                  Official Wedding Invitation
                </span>
                <div className="w-16 h-0.5 bg-[#c5a454] rounded-full" />
              </div>

              <div className="space-y-3">
                <h2 className="font-sage-script text-6xl xl:text-7xl text-[#f4f7f0] leading-none drop-shadow-lg">
                  Eza &amp; Islammy
                </h2>
                <p className="font-sage-serif text-sm uppercase tracking-[0.25em] text-[#cad7c1]">
                  {WEDDING_INFO.weddingDateDisplay}
                </p>
                <p className="text-xs text-[#a4b59b] max-w-md font-light leading-relaxed">
                  Kami mengundang Anda untuk merayakan momen bahagia dan sakral penyatuan
                  dua insan dalam ikatan pernikahan suci.
                </p>
              </div>

              <div className="text-xs text-white/50 tracking-widest font-mono">
                &copy; {new Date().getFullYear()} Eza &amp; Islammy &bull; Sage Garden
              </div>
            </div>
          </div>
        )}

        {/* Invitation Content Column */}
        <main
          className={`${
            !isEmbedded ? 'empat-desktop-content' : 'w-full max-w-[480px] mx-auto'
          } bg-[#fafbf7] shadow-2xl relative z-20 pb-20`}
        >
          {/* 1. Hero / Header Section */}
          <HeroSection />

          {/* 2. Salam & Ayat Suci Ar-Rum */}
          <QuoteSection />

          {/* 3. Mempelai Eza & Islammy */}
          <CoupleSection />

          {/* 4. Rangkaian Acara & Countdown */}
          <EventSection />

          {/* 5. Love Story Timeline */}
          <LoveStorySection />

          {/* 6. Galeri Foto */}
          <GallerySection onPhotoClick={(idx) => setActivePhotoIndex(idx)} />

          {/* 7. Wedding Gift / Amplop Digital */}
          <GiftSection />

          {/* 8. Buku Tamu & RSVP */}
          <GuestBookSection />

          {/* 9. Penutup & Footer */}
          <ClosingSection />
        </main>
      </div>
    </div>
  );
};
