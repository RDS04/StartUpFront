import React from 'react';
import { motion } from 'framer-motion';
import { SongketBorder } from '../components/SongketBorder';
import { GoldenSparkles } from '../components/GoldenSparkles';
import { ASSETS } from '../data';

export const QuoteSection: React.FC = () => {
  return (
    <section className="relative w-full bg-[#4a0910] text-[#3a060d] overflow-hidden flex flex-col justify-between items-center text-center px-4 py-4">
      <GoldenSparkles />

      {/* Songket Border Atas */}
      <SongketBorder position="top" />

      {/* Kartu Lengkung Parchment Ar-Rum 21 dengan Animasi */}
      <div className="w-full max-w-sm mx-auto my-6 px-2 z-20">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="bg-[#ded0b4] rounded-[100px] border border-[#cfa84a] shadow-[0_12px_40px_rgba(0,0,0,0.5)] p-6 sm:p-8 flex flex-col items-center"
        >
          {/* Ilustrasi Rumah Gadang Mengapung Halus */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-48 sm:w-56 h-auto mb-4 animate-gadang-float"
          >
            <img
              src={ASSETS.rumahGadang}
              alt="Rumah Gadang Minangkabau"
              className="w-full h-auto object-contain drop-shadow-sm"
              loading="lazy"
            />
          </motion.div>

          {/* Judul Ayat */}
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-serif-royal italic text-2xl sm:text-3xl font-semibold text-[#4a0910] mb-4"
          >
            Ar-Rum 21
          </motion.h3>

          {/* Ayat Arab */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            dir="rtl"
            className="text-sm sm:text-base leading-loose font-serif text-[#3a060d] mb-5 px-1 font-medium tracking-wide"
            style={{ fontFamily: "'Traditional Arabic', 'Amiri', serif" }}
          >
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُمْ مِنْ أَنْفُسِكُمْ أَزْوَاجًا لِتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَوَدَّةً وَرَحْمَةً إِنَّ فِي ذَلِكَ لَآيَاتٍ لِقَوْمٍ يَتَفَكَّرُونَ
          </motion.p>

          {/* Terjemahan Bahasa Indonesia */}
          <motion.blockquote
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xs sm:text-[13px] leading-relaxed text-[#4a0910] font-serif-royal italic px-1 text-center font-normal"
          >
            &ldquo;Dan Di Antara Tanda-Tanda (Kebesaran)-Nya Ialah Dia Menciptakan Pasangan-Pasangan Untukmu Dari Jenismu Sendiri, Agar Kamu Cenderung Dan Merasa Tenteram Kepadanya, Dan Dia Menjadikan Di Antaramu Rasa Kasih Dan Sayang. Sesungguhnya Pada Yang Demikian Itu Benar-Benar Terdapat Tanda-Tanda (Kebesaran Allah) Bagi Kaum Yang Berpikir.&rdquo;
          </motion.blockquote>
        </motion.div>
      </div>

      {/* Songket Border Bawah */}
      <SongketBorder position="bottom" />
    </section>
  );
};

export default QuoteSection;
