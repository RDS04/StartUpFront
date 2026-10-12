import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CalendarCheck } from 'lucide-react';
import { SongketBorder } from '../components/SongketBorder';
import { GoldenSparkles } from '../components/GoldenSparkles';
import { ASSETS, WEDDING_INFO } from '../data';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const HeroSection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(WEDDING_INFO.targetDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="undangan" className="relative w-full bg-[#4a0910] text-[#f0e6d2] overflow-hidden flex flex-col justify-between items-center text-center px-4 py-2">
      <GoldenSparkles />

      {/* Ornamen Songket Atas */}
      <SongketBorder position="top" />

      {/* Konten Hero dengan Animasi */}
      <div className="w-full max-w-sm mx-auto flex flex-col items-center py-6 z-20">
        {/* Frame Foto Arch Pasangan */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="relative w-64 sm:w-72 h-80 sm:h-96 rounded-t-full rounded-b-full border-2 border-[#cfa84a] p-1.5 shadow-[0_10px_35px_rgba(0,0,0,0.6)] mb-6 overflow-hidden animate-gold-pulse"
        >
          <div className="w-full h-full rounded-t-full rounded-b-full overflow-hidden">
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
              src={ASSETS.coupleCover}
              alt="Yusron & Putri"
              className="w-full h-full object-cover object-center filter saturate-105 cursor-pointer"
              loading="eager"
            />
          </div>
          <div className="absolute inset-2 rounded-t-full rounded-b-full border border-[#f3df95]/30 pointer-events-none" />
        </motion.div>

        {/* The Wedding Of */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 0.9, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#f0e6d2] text-xs sm:text-sm tracking-[0.2em] uppercase font-serif-royal mb-1"
        >
          The Wedding Of
        </motion.p>

        {/* Kaligrafi Nama */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-script-wedding text-5xl sm:text-6xl text-[#f5df9a] leading-tight my-2 drop-shadow-md"
        >
          {WEDDING_INFO.groomNickname} &amp; {WEDDING_INFO.brideNickname}
        </motion.h2>

        {/* Pesan Manis */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-xs sm:text-sm text-[#ded0b4] font-serif-royal max-w-xs mx-auto leading-relaxed my-3 px-2"
        >
          Kami akan menikah, kami ingin anda menjadi bagian dari hari bahagia kami
        </motion.p>

        {/* Countdown Timer (4 Kotak Cream dengan Staggered Animasi) */}
        <div className="grid grid-cols-4 gap-2.5 sm:gap-3 w-full max-w-xs my-4">
          {[
            { label: 'Hari', value: timeLeft.days },
            { label: 'Jam', value: timeLeft.hours },
            { label: 'Menit', value: timeLeft.minutes },
            { label: 'Detik', value: timeLeft.seconds },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -3, scale: 1.05 }}
              className="bg-[#ded0b4] rounded-lg py-2.5 px-1 shadow-[0_4px_12px_rgba(0,0,0,0.35)] border border-[#cfa84a]/50 flex flex-col items-center justify-center cursor-default"
            >
              <span className="text-xl sm:text-2xl font-bold text-[#4a0910] font-serif-royal leading-none">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold text-[#4a0910] mt-1 font-serif-royal">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Tanggal Pernikahan */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="text-[#f3df95] font-serif-royal text-xs sm:text-sm font-semibold tracking-wide my-2"
        >
          {WEDDING_INFO.weddingDateDisplay}
        </motion.p>

        {/* Tombol Simpan Tanggal */}
        <motion.a
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.9 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href={WEDDING_INFO.googleCalendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 px-6 py-2 rounded-lg bg-[#ded0b4] hover:bg-[#ebdcc0] text-[#4a0910] font-serif-royal font-semibold text-xs sm:text-sm shadow-[0_4px_15px_rgba(0,0,0,0.35)] border border-[#cfa84a] flex items-center gap-2 cursor-pointer group"
        >
          <CalendarCheck className="w-4 h-4 text-[#4a0910] group-hover:scale-110 transition-transform" />
          <span>Simpan tanggal</span>
        </motion.a>
      </div>

      {/* Ornamen Songket Bawah */}
      <SongketBorder position="bottom" />
    </section>
  );
};

export default HeroSection;
