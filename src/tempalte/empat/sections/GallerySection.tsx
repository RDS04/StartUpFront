import React from 'react';
import { Image as ImageIcon, ZoomIn, Heart } from 'lucide-react';
import { useTemplateEmpatData } from '../context';
import { GALLERY_PHOTOS } from '../data';

interface GallerySectionProps {
  onPhotoClick: (index: number) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onPhotoClick }) => {
  const { galleryPhotos } = useTemplateEmpatData();
  const photos = galleryPhotos && galleryPhotos.length > 0 ? galleryPhotos : GALLERY_PHOTOS;

  return (
    <section id="gallery-section" className="relative px-6 py-16 bg-[#f3f6ee] text-[#2c3d2f] overflow-hidden">
      <div className="max-w-sm sm:max-w-md mx-auto space-y-8">
        {/* Section Header */}
        <div className="text-center space-y-1.5">
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#718569] bg-white px-3 py-1 rounded-full border border-[#8f9e7b]/30">
            Our Gallery
          </span>
          <h2 className="font-sage-serif text-2xl sm:text-3xl font-bold text-[#233325]">
            Momen Bahagia Kami
          </h2>
          <div className="w-12 h-0.5 bg-[#c5a454] mx-auto rounded-full mt-2" />
        </div>

        {/* Romantice Quote */}
        <div className="text-center px-4">
          <p className="text-xs sm:text-sm text-[#50644d] italic font-light leading-relaxed">
            &ldquo;Menikah bukan perlombaan, bukan soal cepat atau lambat.
            Tetapi, siapa yang siap mengemban amanah yang besar.&rdquo;
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {photos.map((photo, index) => {
            const isWide = photo.orientation === 'landscape' || (photos.length === 5 && index === 4);
            return (
              <div
                key={photo.id}
                onClick={() => onPhotoClick(index)}
                className={`relative group rounded-2xl overflow-hidden bg-slate-200 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 ${
                  isWide ? 'col-span-2 aspect-video' : 'aspect-[3/4]'
                }`}
              >
                <img
                  src={photo.thumbnail}
                  alt={photo.caption || `Foto ${index + 1}`}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Dark Hover Overlay with Zoom Icon */}
                <div className="absolute inset-0 bg-[#1c291d]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[1px]">
                  <div className="w-10 h-10 rounded-full bg-white/90 text-[#2c3d2f] flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <ZoomIn className="w-5 h-5 text-[#5b6e55]" />
                  </div>
                </div>

                {/* Corner Mini Heart */}
                <div className="absolute bottom-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="p-1 rounded-full bg-white/70 backdrop-blur-xs text-[#c5a454]">
                    <Heart className="w-3 h-3 fill-current" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center pt-2">
          <p className="text-[11px] text-[#788c74] font-medium flex items-center justify-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5 text-[#8f9e7b]" />
            <span>Ketuk salah satu foto untuk memperbesar</span>
          </p>
        </div>
      </div>
    </section>
  );
};
