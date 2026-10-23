import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { SongketBorder } from '../components/SongketBorder';
import { GoldenSparkles } from '../components/GoldenSparkles';
import { TIMELINE_STORIES } from '../data';
import { getSavedDashboardData } from '../../../dashboard/initialData';

export const LoveStorySection: React.FC = () => {
  const dashData = getSavedDashboardData();
  const storiesList = (dashData.stories && dashData.stories.length > 0)
    ? dashData.stories.map((s, idx) => ({
        id: s.id,
        period: s.year || `Tahun ${idx + 1}`,
        title: s.title || '',
        description: s.story || '',
      }))
    : TIMELINE_STORIES;

  return (
    <section className="relative w-full bg-[#4a0910] text-[#3a060d] overflow-hidden flex flex-col justify-between items-center text-center px-4 py-4">
      <GoldenSparkles />

      {/* Songket Border Atas */}
      <SongketBorder position="top" />

      {/* Konten Love Story */}
      <div className="w-full max-w-sm mx-auto my-6 px-2 z-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="bg-[#ded0b4] rounded-[60px] border border-[#cfa84a] shadow-[0_12px_40px_rgba(0,0,0,0.5)] px-5 py-8 sm:px-7 sm:py-10 flex flex-col items-center"
        >
          <motion.h3
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif-royal italic text-2xl sm:text-3xl font-bold text-[#4a0910] mb-8"
          >
            Love Story
          </motion.h3>

          <div className="relative w-full space-y-6 before:absolute before:inset-0 before:left-1/2 before:-translate-x-1/2 before:w-0.5 before:bg-[#4a0910]/30 before:top-4 before:bottom-4">
            {storiesList.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                className="relative z-10 flex flex-col items-center"
              >
                {/* Badge Icon Hati Berdenyut */}
                <div className="w-10 h-10 rounded-full bg-[#4a0910] text-[#f3df95] border-2 border-[#cfa84a] flex items-center justify-center shadow-md mb-2 animate-heartbeat">
                  <Heart className="w-4 h-4 fill-current" />
                </div>

                {/* Card Story dengan Hover Motion */}
                <motion.div
                  whileHover={{ y: -3, scale: 1.02 }}
                  className={`w-full bg-[#f7efe1]/95 rounded-2xl p-4 shadow-sm border border-[#cfa84a]/40 text-center transition-all ${
                    index % 2 === 0 ? 'rotate-[-0.5deg]' : 'rotate-[0.5deg]'
                  }`}
                >
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-[#cfa84a] bg-[#4a0910] px-2.5 py-0.5 rounded-full inline-block font-serif-royal mb-1.5 shadow-xs">
                    {story.period}
                  </span>
                  <h4 className="text-base font-bold text-[#4a0910] font-serif-royal mb-1">
                    {story.title}
                  </h4>
                  <p className="text-xs text-[#3a060d] font-serif-royal leading-relaxed">
                    {story.description}
                  </p>
                </motion.div>
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

export default LoveStorySection;
