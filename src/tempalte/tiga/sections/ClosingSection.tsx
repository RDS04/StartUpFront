import React from 'react';
import { motion } from 'framer-motion';
import { SongketBorder } from '../components/SongketBorder';
import { GoldenSparkles } from '../components/GoldenSparkles';
import { WEDDING_INFO } from '../data';

export const ClosingSection: React.FC = () => {
  return (
    <section className="relative w-full bg-[#4a0910] text-[#f0e6d2] overflow-hidden flex flex-col justify-between items-center text-center px-4 py-6 pb-28">
      <GoldenSparkles />

      {/* Songket Border Atas */}
      <SongketBorder position="top" />

      {/* Konten Penutup dengan Animasi */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="w-full max-w-sm mx-auto my-8 px-4 z-20 flex flex-col items-center space-y-4"
      >
        <p className="text-xs sm:text-sm tracking-[0.2em] uppercase font-serif-royal opacity-90">
          Kami Yang Berbahagia
        </p>

        <motion.h3
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-script-wedding text-5xl sm:text-6xl text-[#f5df9a] my-2 leading-tight"
        >
          {WEDDING_INFO.groomNickname} &amp; {WEDDING_INFO.brideNickname}
        </motion.h3>

        <p className="text-xs sm:text-sm text-[#ded0b4] font-serif-royal max-w-xs leading-relaxed">
          Atas kehadiran dan doa restunya kami ucapkan terima kasih
        </p>

        <motion.h4
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-serif-royal italic text-lg sm:text-xl font-bold text-[#f5df9a] pt-2"
        >
          Wassalamu&rsquo;alaikum Wr. Wb.
        </motion.h4>
      </motion.div>

      {/* Songket Border Bawah */}
      <SongketBorder position="bottom" />
    </section>
  );
};

export default ClosingSection;
