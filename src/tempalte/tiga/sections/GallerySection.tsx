import React from 'react';
import { motion } from 'framer-motion';
import { SongketBorder } from '../components/SongketBorder';
import { GoldenSparkles } from '../components/GoldenSparkles';
import { useTemplateTigaData } from '../context';
import { GALLERY_PHOTOS } from '../data';

interface GallerySectionProps {
  onOpenPhoto: (index: number) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onOpenPhoto }) => {
  const { gallery } = useTemplateTigaData();
  const photos = gallery && gallery.length > 0 ? gallery : GALLERY_PHOTOS;
  return (
    <section id="galeri" className="relative w-full bg-[#4a0910] text-[#3a060d] overflow-hidden flex flex-col justify-between items-center text-center px-4 py-4">
      <GoldenSparkles />

      {/* Songket Border Atas */}
      <SongketBorder position="top" />

      {/* Konten Galeri */}
      <div className="w-full max-w-sm mx-auto my-6 px-2 z-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="bg-[#ded0b4] rounded-[60px] border border-[#cfa84a] shadow-[0_12px_40px_rgba(0,0,0,0.5)] p-5 sm:p-7 flex flex-col items-center"
        >
          <motion.h3
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif-royal italic text-2xl sm:text-3xl font-bold text-[#4a0910] mb-6"
          >
            Our Gallery
          </motion.h3>

          {/* Grid Foto 2 Kolom dengan Staggered Animasi */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 w-full">
            {photos.map((url, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (idx % 4) * 0.1 }}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => onOpenPhoto(idx)}
                className="group relative overflow-hidden rounded-xl border border-[#cfa84a]/60 shadow-sm aspect-[3/4] cursor-pointer bg-[#3a060d]/10 transition-shadow hover:shadow-lg"
              >
                <img
                  src={url}
                  alt={`Galeri Prewedding ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#4a0910]/0 group-hover:bg-[#4a0910]/40 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 text-[#f3df95] text-xs bg-[#4a0910]/80 border border-[#cfa84a] px-3 py-1 rounded-full font-serif-royal shadow-md">
                    Lihat Foto
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Songket Border Bawah */}
      <SongketBorder position="bottom" />
    </section>
  );
};

export default GallerySection;
