import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronUp, Sparkles, Volume2, VolumeX } from 'lucide-react';
import './dua.css';

import { MUSIC_URL } from './data';
import RsvpModal from './components/RsvpModal';
import CoverSection from './sections/CoverSection';
import QuoteSection from './sections/QuoteSection';
import CoupleSection from './sections/CoupleSection';
import { AkadSection, ResepsiSection } from './sections/EventSection';
import GiftSection from './sections/GiftSection';
import DoaSection from './sections/DoaSection';
import LoveStorySection from './sections/LoveStorySection';
import GallerySection from './sections/GallerySection';
import ClosingSection from './sections/ClosingSection';

export interface DustyRoseTemplateProps {
  /** true saat dirender di dalam modal pratinjau (tidak mengunci scroll body) */
  isEmbedded?: boolean;
  /** langsung tampilkan isi undangan tanpa cover */
  defaultOpen?: boolean;
}

const readGuestName = () => {
  if (typeof window === 'undefined') return 'Tamu Undangan';
  try {
    // dukung ?to= di query maupun di dalam hash (#/template-dua?to=...)
    const search = window.location.search || window.location.hash.split('?')[1] || '';
    const to = new URLSearchParams(search.startsWith('?') ? search : `?${search}`).get('to');
    if (to && to.trim()) return decodeURIComponent(to.replace(/\+/g, ' '));
  } catch {
    /* fallback */
  }
  return 'Tamu Undangan';
};

export const DustyRoseTemplate: React.FC<DustyRoseTemplateProps> = ({ isEmbedded = false, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isPlaying, setIsPlaying] = useState(false);
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [showTop, setShowTop] = useState(false);
  const [guestName] = useState(readGuestName);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);

  /* Lock body scroll while cover is shown (full-page mode only) */
  useEffect(() => {
    if (isEmbedded) return;
    document.body.style.overflow = isOpen ? '' : 'hidden';
    if (!isOpen) window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, isEmbedded]);

  /* Back-to-top visibility */
  useEffect(() => {
    if (isEmbedded) return;
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isEmbedded]);

  /* Stop music on unmount */
  useEffect(() => () => audioRef.current?.pause(), []);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2600);
  }, []);

  const playMusic = () => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = 0.6;
    a.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
  };

  const toggleMusic = () => {
    const a = audioRef.current;
    if (!a) return;
    if (isPlaying) {
      a.pause();
      setIsPlaying(false);
    } else playMusic();
  };

  const handleOpen = () => {
    setIsOpen(true);
    playMusic();
  };

  const posClass = isEmbedded ? 'absolute' : 'fixed';

  return (
    <div
      ref={rootRef}
      className={`dr-root relative w-full ${isEmbedded ? '' : 'min-h-screen'} bg-[var(--dr-bg-deep)]`}
      style={{
        backgroundImage:
          'radial-gradient(circle at 15% 20%, rgba(255,255,255,.08), transparent 40%), radial-gradient(circle at 85% 80%, rgba(0,0,0,.12), transparent 45%)',
      }}
    >
      <audio ref={audioRef} src={MUSIC_URL} loop preload="none" />

      {/* Main column (mobile-first canvas) */}
      <main
        className={`relative mx-auto w-full max-w-[430px] overflow-hidden shadow-[0_0_80px_rgba(0,0,0,.35)] transition-opacity duration-1000 ${
          isOpen ? 'opacity-100' : 'h-[100svh] opacity-0'
        }`}
      >
        <QuoteSection />
        <CoupleSection />
        <AkadSection />
        <ResepsiSection />
        <GiftSection onToast={showToast} />
        <DoaSection onOpenRsvp={() => setRsvpOpen(true)} />
        <LoveStorySection />
        <GallerySection />
        <ClosingSection />
      </main>

      <CoverSection guestName={guestName} isOpen={isOpen} isEmbedded={isEmbedded} onOpen={handleOpen} />

      {/* Floating controls */}
      {isOpen && (
        <div className={`${isEmbedded ? 'sticky bottom-4 -mt-24 mr-4 ml-auto w-fit' : `${posClass} bottom-6 right-5`} z-40 flex flex-col items-center gap-3`}>
          {showTop && !isEmbedded && (
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-black/35 text-white backdrop-blur-md transition hover:bg-black/50"
              aria-label="Kembali ke atas"
            >
              <ChevronUp className="h-5 w-5" />
            </button>
          )}
          <button
            onClick={toggleMusic}
            className="relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 border-white/70 bg-[var(--dr-accent)] text-white shadow-xl transition hover:scale-105"
            aria-label={isPlaying ? 'Jeda musik' : 'Putar musik'}
          >
            <span className={`absolute inset-1 rounded-full border border-dashed border-white/40 ${isPlaying ? 'dr-spin' : ''}`} />
            {isPlaying ? <Volume2 className="relative h-5 w-5" /> : <VolumeX className="relative h-5 w-5 opacity-80" />}
          </button>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="dr-modal-panel fixed left-1/2 top-6 z-[95] flex -translate-x-1/2 items-center gap-2 rounded-full bg-[var(--dr-accent)]/95 px-5 py-2.5 text-[13px] text-white shadow-xl backdrop-blur">
          <Sparkles className="h-4 w-4" />
          {toast}
        </div>
      )}

      <RsvpModal open={rsvpOpen} onClose={() => setRsvpOpen(false)} defaultName={guestName} onToast={showToast} />
    </div>
  );
};

export default DustyRoseTemplate;