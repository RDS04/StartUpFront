import React from 'react';
import { motion } from 'framer-motion';
import { MailOpen } from 'lucide-react';
import { SongketBorder } from '../components/SongketBorder';
import { GoldenSparkles } from '../components/GoldenSparkles';
import { useTemplateTigaData } from '../context';

interface CoverSectionProps {
  guestName: string;
  onOpenInvitation: () => void;
}

export const CoverSection: React.FC<CoverSectionProps> = ({ guestName, onOpenInvitation }) => {
  const { weddingInfo: WEDDING_INFO } = useTemplateTigaData();
  return (
    <section className="relative min-h-screen w-full bg-[#4a0910] flex flex-col justify-between items-center text-center overflow-hidden px-4 py-2 select-none">
      {/* Efek Bintang Kelip Emas */}
      <GoldenSparkles />

      {/* Ornamen Songket Atas */}
      <SongketBorder position="top" />

      {/* Konten Utama Cover dengan Animasi Framer Motion */}
      <div className="flex-1 flex flex-col justify-center items-center max-w-sm w-full my-auto z-20 py-8">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 0.9, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[#f0e6d2] text-xs sm:text-sm tracking-[0.25em] uppercase font-serif-royal mb-2"
        >
          The Wedding Of
        </motion.p>

        {/* Nama Mempelai Cursive Kaligrafi */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, type: 'spring', bounce: 0.4 }}
          className="font-script-wedding text-5xl sm:text-6xl text-[#f5df9a] drop-shadow-[0_4px_15px_rgba(0,0,0,0.7)] my-2 leading-tight"
        >
          {WEDDING_INFO.groomNickname} &amp; {WEDDING_INFO.brideNickname}
        </motion.h1>

        {/* Kotak Nama Tamu */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 mb-6 space-y-2"
        >
          <p className="text-[#e2d6be] text-xs sm:text-sm font-serif-royal tracking-wider opacity-90">
            Kepada Yth :
          </p>
          <div className="px-4 py-2">
            <h2 className="text-xl sm:text-2xl font-bold text-[#f5ecd2] font-serif-royal capitalize drop-shadow-sm">
              {guestName}
            </h2>
          </div>
          <p className="text-[#e2d6be] text-xs font-serif-royal tracking-wider opacity-90">
            Ditempat
          </p>
        </motion.div>

        {/* Tombol Buka Undangan dengan Animasi Berdenyut */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenInvitation}
            className="mt-4 px-6 py-2.5 rounded-lg bg-[#ded0b4] hover:bg-[#ebdcc0] text-[#4a0910] font-serif-royal font-semibold text-xs sm:text-sm border border-[#cfa84a] flex items-center gap-2 cursor-pointer group animate-gold-pulse transition-colors"
          >
            <MailOpen className="w-4 h-4 text-[#4a0910] group-hover:rotate-12 transition-transform" />
            <span>Buka Undangan</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Ornamen Songket Bawah */}
      <SongketBorder position="bottom" />
    </section>
  );
};

export default CoverSection;
