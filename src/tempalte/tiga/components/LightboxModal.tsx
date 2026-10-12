import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxModalProps {
  photoUrl: string | null;
  photos: string[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  photoUrl,
  photos,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}) => {
  if (!photoUrl) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-black/60 border border-white/20 text-white hover:bg-white/20 transition-all cursor-pointer"
        aria-label="Tutup foto"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Navigasi panah kiri/kanan */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 border border-white/20 text-white hover:bg-white/20 transition-all cursor-pointer"
        aria-label="Foto sebelumnya"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 border border-white/20 text-white hover:bg-white/20 transition-all cursor-pointer"
        aria-label="Foto selanjutnya"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Gambar */}
      <div
        className="relative max-w-2xl max-h-[85vh] overflow-hidden rounded-2xl border-2 border-[#cfa84a]/50 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={photoUrl}
          alt={`Galeri Prewedding ${currentIndex + 1}`}
          className="max-h-[85vh] w-auto object-contain mx-auto"
        />
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/70 px-3 py-1 rounded-full text-xs text-[#f3df95] font-serif-royal">
          {currentIndex + 1} / {photos.length}
        </div>
      </div>
    </div>
  );
};
