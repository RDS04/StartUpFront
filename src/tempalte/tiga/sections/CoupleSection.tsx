import React from 'react';
import { motion } from 'framer-motion';
import { SongketBorder } from '../components/SongketBorder';
import { GoldenSparkles } from '../components/GoldenSparkles';
import { useTemplateTigaData } from '../context';

export const CoupleSection: React.FC = () => {
  const { groom: GROOM_DATA, bride: BRIDE_DATA } = useTemplateTigaData();
  return (
    <section id="mempelai" className="relative w-full bg-[#4a0910] text-[#3a060d] overflow-hidden flex flex-col justify-between items-center text-center px-4 py-4">
      <GoldenSparkles />

      {/* Songket Border Atas */}
      <SongketBorder position="top" />

      {/* Kartu Lengkung Parchment Mempelai dengan Animasi */}
      <div className="w-full max-w-sm mx-auto my-6 px-2 z-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="bg-[#ded0b4] rounded-t-full rounded-b-[80px] border border-[#cfa84a] shadow-[0_12px_40px_rgba(0,0,0,0.5)] px-6 py-10 sm:px-8 sm:py-12 flex flex-col items-center"
        >
          {/* Salam Pembuka */}
          <motion.h3
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-serif-royal italic text-2xl sm:text-3xl font-semibold text-[#4a0910] mb-3"
          >
            Assalamu&rsquo;alaikum Wr. Wb.
          </motion.h3>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xs sm:text-[13px] text-[#4a0910]/90 leading-relaxed font-serif-royal max-w-xs mb-8"
          >
            Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta&rsquo;ala, insyaaAllah kami akan menyelenggarakan acara pernikahan kami :
          </motion.p>

          {/* Profil Mempelai Pria (Animasi Slide dari Kiri) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col items-center w-full mb-8"
          >
            <div className="relative w-44 sm:w-52 h-60 sm:h-68 rounded-t-full rounded-b-full overflow-hidden border-2 border-[#4a0910] shadow-[0_6px_20px_rgba(0,0,0,0.3)] mb-4 group cursor-pointer">
              <motion.img
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.5 }}
                src={GROOM_DATA.photoUrl}
                alt={GROOM_DATA.fullName}
                className="w-full h-full object-cover object-top filter saturate-105"
                loading="lazy"
              />
            </div>

            <h4 className="font-serif-royal italic text-xl sm:text-2xl font-bold text-[#4a0910] my-1">
              {GROOM_DATA.fullName}
            </h4>
            <p className="text-xs sm:text-[13px] text-[#3a060d] font-serif-royal mt-1 font-medium">
              {GROOM_DATA.childOrder}
            </p>
            <p className="text-xs sm:text-[13px] text-[#3a060d] font-serif-royal font-medium">
              {GROOM_DATA.father} &amp; {GROOM_DATA.mother}
            </p>
          </motion.div>

          {/* Divider Simbol & Berdenyut */}
          <div className="flex items-center justify-center w-full my-3">
            <span className="font-script-wedding text-4xl sm:text-5xl text-[#4a0910] px-4 font-bold animate-heartbeat">
              &amp;
            </span>
          </div>

          {/* Profil Mempelai Wanita (Animasi Slide dari Kanan) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col items-center w-full mt-2"
          >
            <div className="relative w-44 sm:w-52 h-60 sm:h-68 rounded-t-full rounded-b-full overflow-hidden border-2 border-[#4a0910] shadow-[0_6px_20px_rgba(0,0,0,0.3)] mb-4 group cursor-pointer">
              <motion.img
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.5 }}
                src={BRIDE_DATA.photoUrl}
                alt={BRIDE_DATA.fullName}
                className="w-full h-full object-cover object-top filter saturate-105"
                loading="lazy"
              />
            </div>

            <h4 className="font-serif-royal italic text-xl sm:text-2xl font-bold text-[#4a0910] my-1">
              {BRIDE_DATA.fullName}
            </h4>
            <p className="text-xs sm:text-[13px] text-[#3a060d] font-serif-royal mt-1 font-medium">
              {BRIDE_DATA.childOrder}
            </p>
            <p className="text-xs sm:text-[13px] text-[#3a060d] font-serif-royal font-medium">
              {BRIDE_DATA.father} &amp; {BRIDE_DATA.mother}
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Songket Border Bawah */}
      <SongketBorder position="bottom" />
    </section>
  );
};

export default CoupleSection;
