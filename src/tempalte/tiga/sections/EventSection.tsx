import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { SongketBorder } from '../components/SongketBorder';
import { GoldenSparkles } from '../components/GoldenSparkles';
import { EVENTS, ASSETS } from '../data';

export const EventSection: React.FC = () => {
  return (
    <section id="acara" className="relative w-full bg-[#4a0910] text-[#3a060d] overflow-hidden flex flex-col justify-between items-center text-center px-4 py-4">
      <GoldenSparkles />

      {/* Songket Border Atas */}
      <SongketBorder position="top" />

      {/* Konten Acara */}
      <div className="w-full max-w-sm mx-auto my-6 px-2 z-20 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center px-4"
        >
          <p className="text-xs sm:text-sm text-[#f0e6d2] font-serif-royal leading-relaxed">
            Dengan segala kerendahan hati kami berharap kehadiran Bapak/Ibu/Saudara/i dalam acara pernikahan kami yang akan diselenggarakan pada :
          </p>
        </motion.div>

        {/* List 3 Acara dengan Animasi */}
        {EVENTS.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: index * 0.15 }}
            whileHover={{ y: -4 }}
            className="bg-[#ded0b4] rounded-[50px] border border-[#cfa84a] shadow-[0_10px_35px_rgba(0,0,0,0.5)] p-6 sm:p-7 flex flex-col items-center transition-shadow hover:shadow-[0_15px_45px_rgba(207,168,74,0.3)]"
          >
            {/* Sketsa Rumah Gadang */}
            <div className="w-32 h-auto mb-3 animate-gadang-float">
              <img
                src={ASSETS.rumahGadang}
                alt="Rumah Gadang"
                className="w-full h-auto object-contain opacity-95"
                loading="lazy"
              />
            </div>

            {/* Judul Acara */}
            <h3 className="font-serif-royal text-xl sm:text-2xl font-bold text-[#4a0910] mb-4">
              {event.title}
            </h3>

            {/* Grid 3 Kolom: Hari - Tanggal - Bulan */}
            <div className="grid grid-cols-3 gap-2 w-full max-w-xs border-y border-[#4a0910]/30 py-3 my-2 items-center text-[#4a0910] font-serif-royal">
              <div className="text-sm sm:text-base font-semibold uppercase">{event.dayName}</div>
              <motion.div
                initial={{ scale: 0.7 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-2xl sm:text-3xl font-extrabold text-[#4a0910]"
              >
                {event.dayNumber}
              </motion.div>
              <div className="text-sm sm:text-base font-semibold uppercase">{event.monthName}</div>
            </div>

            {/* Tahun & Jam */}
            <p className="text-sm sm:text-base font-bold text-[#4a0910] font-serif-royal mt-1">
              {event.year}
            </p>
            <p className="text-xs sm:text-sm text-[#4a0910] font-serif-royal mt-1 font-semibold">
              {event.time}
            </p>

            {/* Lokasi */}
            <div className="mt-4 mb-5 space-y-1">
              <p className="text-xs uppercase tracking-wider font-bold text-[#4a0910] font-serif-royal">
                Lokasi
              </p>
              <p className="text-xs sm:text-[13px] text-[#3a060d] font-serif-royal leading-relaxed max-w-xs font-medium">
                Bertempat Di, <br />
                {event.address}
              </p>
            </div>

            {/* Tombol Lihat Lokasi dengan Animasi Hover */}
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={event.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-lg bg-[#4a0910] hover:bg-[#36050b] text-[#f5ecd2] font-serif-royal font-semibold text-xs shadow-md border border-[#cfa84a] flex items-center gap-2 cursor-pointer group"
            >
              <MapPin className="w-4 h-4 text-[#cfa84a] group-hover:scale-110 transition-transform" />
              <span>Lihat Lokasi</span>
            </motion.a>
          </motion.div>
        ))}
      </div>

      {/* Songket Border Bawah */}
      <SongketBorder position="bottom" />
    </section>
  );
};

export default EventSection;
