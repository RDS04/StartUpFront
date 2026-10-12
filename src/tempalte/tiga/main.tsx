import React, { useState, useEffect, useRef } from 'react';
import './tiga.css';

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
import { ASSETS, GALLERY_PHOTOS } from './data';

export interface MinangMaroonTemplateProps {
  isEmbedded?: boolean;
  defaultOpen?: boolean;
}

const getGuestNameFromUrl = (): string => {
  if (typeof window === 'undefined') return 'Auli Dan Partner';
  try {
    const search = window.location.search || window.location.hash.split('?')[1] || '';
    const to = new URLSearchParams(search.startsWith('?') ? search : `?${search}`).get('to');
    if (to && to.trim()) {
      return decodeURIComponent(to.replace(/\+/g, ' '));
    }
  } catch {
    // Fallback
  }
  return 'Auli Dan Partner';
};

export const MinangMaroonTemplate: React.FC<MinangMaroonTemplateProps> = ({
  isEmbedded = false,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isPlaying, setIsPlaying] = useState(false);
  const [guestName] = useState(getGuestNameFromUrl);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
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
          // Autoplay dicegah browser, user dapat klik tombol vinyl
          setIsPlaying(false);
        });
    }

    setTimeout(() => {
      const el = document.getElementById('undangan');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#200306] flex justify-center text-[#f0e6d2] font-body-wedding selection:bg-[#cfa84a] selection:text-[#3a060d]">
      {/* Background Audio Hidden */}
      <audio ref={audioRef} src={ASSETS.bgMusic} loop preload="auto" />

      {/* Mobile Frame Container (Maksimal Lebar Layar Smartphone / Phablet seperti di referensi) */}
      <div className="relative w-full max-w-md bg-[#4a0910] min-h-screen shadow-[0_0_60px_rgba(0,0,0,0.8)] flex flex-col">
        {!isOpen ? (
          // Layar Cover Pembuka
          <CoverSection guestName={guestName} onOpenInvitation={handleOpenInvitation} />
        ) : (
          // Seluruh Konten Undangan
          <main className="w-full flex flex-col animate-in fade-in duration-700">
            <HeroSection />
            <QuoteSection />
            <CoupleSection />
            <EventSection />
            <LoveStorySection />
            <GallerySection
              onOpenPhoto={(idx) => setActivePhotoIndex(idx)}
            />
            <GiftSection onShowToast={showToast} />
            <GuestBookSection defaultGuestName={guestName} />
            <ClosingSection />
          </main>
        )}

        {/* Floating Controls (Hanya muncul jika undangan telah dibuka) */}
        {isOpen && (
          <>
            <MusicPlayer isPlaying={isPlaying} onToggle={toggleMusic} />
            <BottomNavbar onNavigate={handleScrollToSection} />
          </>
        )}

        {/* Toast Notifikasi Feedback */}
        {toastMessage && (
          <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-[#2a0408]/95 border border-[#cfa84a] text-[#f3df95] px-5 py-2.5 rounded-full text-xs font-serif-royal shadow-2xl animate-in fade-in slide-in-from-top-4 backdrop-blur-md">
            {toastMessage}
          </div>
        )}

        {/* Lightbox Modal Foto */}
        {activePhotoIndex !== null && (
          <LightboxModal
            photoUrl={GALLERY_PHOTOS[activePhotoIndex]}
            photos={GALLERY_PHOTOS}
            currentIndex={activePhotoIndex}
            onClose={() => setActivePhotoIndex(null)}
            onPrev={() =>
              setActivePhotoIndex((prev) =>
                prev !== null && prev > 0 ? prev - 1 : GALLERY_PHOTOS.length - 1
              )
            }
            onNext={() =>
              setActivePhotoIndex((prev) =>
                prev !== null && prev < GALLERY_PHOTOS.length - 1 ? prev + 1 : 0
              )
            }
          />
        )}
      </div>
    </div>
  );
};

export default MinangMaroonTemplate;
