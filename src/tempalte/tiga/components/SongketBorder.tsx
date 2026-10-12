import React from 'react';
import { motion } from 'framer-motion';
import { ASSETS } from '../data';

interface SongketBorderProps {
  position: 'top' | 'bottom';
  className?: string;
}

export const SongketBorder: React.FC<SongketBorderProps> = ({ position, className = '' }) => {
  const isTop = position === 'top';
  const imgUrl = isTop ? ASSETS.songketTop : ASSETS.songketBottom;

  return (
    <motion.div
      initial={{ opacity: 0, y: isTop ? -20 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`w-full overflow-hidden select-none pointer-events-none relative z-10 ${
        isTop ? 'pt-0 pb-1' : 'pt-1 pb-0'
      } ${className}`}
    >
      <img
        src={imgUrl}
        alt="Ornamen Songket Minangkabau"
        className="w-full h-auto max-h-[85px] object-cover object-top opacity-95 animate-songket-shimmer"
        loading="lazy"
      />
    </motion.div>
  );
};
