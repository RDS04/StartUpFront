import React from 'react';
import { Sparkles } from 'lucide-react';
import { STORIES } from '../data';

export const LoveStorySection: React.FC = () => {
  return (
    <section id="story-section" className="relative px-6 py-16 bg-[#fafbf7] text-[#2c3d2f] overflow-hidden">
      <div className="max-w-sm sm:max-w-md mx-auto space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-1.5">
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#718569] bg-[#8f9e7b]/15 px-3 py-1 rounded-full border border-[#8f9e7b]/25">
            Our Journey
          </span>
          <h2 className="font-sage-serif text-2xl sm:text-3xl font-bold text-[#233325]">
            Kisah Cinta Kami
          </h2>
          <div className="w-12 h-0.5 bg-[#c5a454] mx-auto rounded-full mt-2" />
        </div>

        {/* Timeline List */}
        <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:top-2 before:bottom-2 before:left-2 sm:before:left-3 before:w-0.5 before:bg-[#8f9e7b]/30">
          {STORIES.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline Pin Indicator */}
              <div className="absolute -left-6 sm:-left-8 top-1.5 w-5 h-5 rounded-full bg-[#5b6e55] border-2 border-white shadow-md flex items-center justify-center text-white">
                <Sparkles className="w-2.5 h-2.5 text-[#c5a454]" />
              </div>

              {/* Story Card */}
              <div className="p-5 rounded-2xl bg-white border border-[#8f9e7b]/30 shadow-sm hover:shadow-md transition-shadow space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-sage-serif font-bold text-xs px-2.5 py-0.5 rounded-full bg-[#8f9e7b]/15 text-[#3b4f3a]">
                    {item.year}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-[#8f9e7b] font-semibold">
                    Chapter 0{idx + 1}
                  </span>
                </div>

                <h3 className="font-sage-serif font-bold text-sm sm:text-base text-[#243626]">
                  {item.title}
                </h3>

                <p className="text-xs text-[#52664e] leading-relaxed font-light">
                  {item.story}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
