import React, { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { ScriptTitle, Section } from '../components/Shared';
import { GALLERY } from '../data';

const GallerySection: React.FC = () => {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (dir: number) => setActive((i) => (i === null ? i : (i + dir + GALLERY.length) % GALLERY.length)),
    []
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, close, step]);

  return (
    <Section innerClassName="flex min-h-[100svh] flex-col items-center justify-center px-5 py-20">
      <ScriptTitle className="text-[2.6rem]">Our Moment</ScriptTitle>

      <div className="mt-8 grid w-full grid-cols-3 gap-2">
        {GALLERY.map((src, i) => (
          <Reveal key={src} anim="zoom" delay={(i % 3) * 120 + Math.floor(i / 3) * 80}>
            <button
              onClick={() => setActive(i)}
              className="group relative block h-40 w-full cursor-zoom-in overflow-hidden rounded-sm shadow-[0_8px_20px_rgba(60,40,42,.25)]"
              aria-label={`Lihat foto ${i + 1}`}
            >
              <img
                src={src}
                alt={`Momen ${i + 1}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <span className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/15" />
            </button>
          </Reveal>
        ))}
      </div>

      {active !== null && createPortal(
        <div
          className="dr-modal-backdrop fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <button
            onClick={close}
            className="absolute right-4 top-4 cursor-pointer rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Tutup"
          >
            <X className="h-6 w-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            className="absolute left-3 cursor-pointer rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Sebelumnya"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <img
            key={active}
            src={GALLERY[active]}
            alt={`Momen ${active + 1}`}
            onClick={(e) => e.stopPropagation()}
            className="dr-modal-panel max-h-[85vh] max-w-full rounded-lg object-contain shadow-2xl"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            className="absolute right-3 cursor-pointer rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Berikutnya"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <p className="absolute bottom-5 text-xs tracking-widest text-white/70">
            {active + 1} / {GALLERY.length}
          </p>
        </div>,
        document.body
      )}
    </Section>
  );
};

export default GallerySection;
