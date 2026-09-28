import { useState, useEffect, useRef } from 'react';
import { Star, Heart, Quote, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

export const Testimonials = () => {
  const reviews = [
    {
      couple: 'Dimas & Anindya',
      location: 'Jakarta Selatan',
      date: 'Pernikahan, 14 Februari 2026',
      avatar: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=200&q=80',
      stars: 5,
      comment: 'Beneran penyelamat banget! Undangan fisik kami mepet cetak, untung pakai "i say yes". Desainnya super mewah kayak undangan jutaan rupiah. Tamu-tamu pada puji lagunya dan amplop digitalnya kepakai banget!',
      template: 'Emerald Botanical Gold',
    },
    {
      couple: 'Bagus & Clarissa',
      location: 'Surabaya',
      date: 'Pernikahan, 18 Januari 2026',
      avatar: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=200&q=80',
      stars: 5,
      comment: 'Fitur RSVP realtime-nya ngebantu banget hitung porsi catering gedung. Generator nama tamu juga otomatis, gak perlu ketik satu-satu lagi pas kirim WhatsApp ke temen kantor. Puas 1000%!',
      template: 'Royal Gold Luxury',
    },
    {
      couple: 'Reza & Nadia',
      location: 'Bandung',
      date: 'Pernikahan, 5 Maret 2026',
      avatar: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=200&q=80',
      stars: 5,
      comment: 'Pelayanan admin ramah banget waktu saya minta tolong ganti foto dan jam akad di H-3. Respon cepat, desain elegan, dan navigasi Google Maps-nya akurat bikin tamu gak ada yang nyasar.',
      template: 'Soft Blush Floral',
    },
    {
      couple: 'Fajar & Salsabila',
      location: 'Yogyakarta',
      date: 'Pernikahan, 20 April 2026',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      stars: 5,
      comment: 'Tamu kami banyak yang lansia dan gaptek, tapi mereka gampang banget buka undangannya tanpa loading lama. Musik latarnya syahdu dan animasinya halus banget!',
      template: 'Rustic Minimalist Flora',
    },
    {
      couple: 'Kevin & Michelle',
      location: 'Semarang',
      date: 'Pernikahan, 12 Mei 2026',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      stars: 5,
      comment: 'Bener-bener worth it dibanding cetak ratusan kertas. Bisa update rundown dan live streaming link secara instan saat hari H. Sangat kami rekomendasikan!',
      template: 'Modern Classic Elegance',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Auto-play slider for mobile view (always slides continuously every 2.8 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 2800);

    return () => clearInterval(timer);
  }, [activeIndex, reviews.length]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const distance = touchStartX.current - touchEndX.current;
      if (distance > 40) {
        handleNext();
      } else if (distance < -40) {
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section id="testimoni" className="py-24 bg-[#fafbfc] relative overflow-hidden border-t border-slate-200/60">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold tracking-wide uppercase shadow-xs">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>Kisah Bahagia Pasangan Pengantin</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Dipercaya Lebih Dari <br className="hidden sm:inline" />
            <span className="font-display-luxury italic font-bold text-[#165b39]">
              50,000+ Pasangan di Indonesia
            </span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Inilah cerita nyata dari mereka yang telah mempercayakan momen sakral pernikahannya bersama "i say yes".
          </p>
        </div>

        {/* Mobile View: Auto-sliding Carousel (Center Card Normal, Left & Right Tapered & Blurred) */}
        <div 
          className="block md:hidden relative"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Slider Viewport with peek sides */}
          <div className="relative w-full overflow-hidden py-4">
            <div 
              className="flex transition-transform duration-600 ease-out will-change-transform"
              style={{ transform: `translateX(calc(11% - ${activeIndex * 82}%))` }}
            >
              {reviews.map((rev, index) => {
                const isCenter = index === activeIndex;
                return (
                  <div
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className="w-[78%] shrink-0 px-1.5 transition-all duration-500 cursor-pointer"
                  >
                    <div
                      className={`p-6 rounded-3xl bg-white border transition-all duration-500 flex flex-col justify-between relative min-h-[310px] ${
                        isCenter
                          ? 'scale-100 opacity-100 blur-none border-emerald-300 shadow-[0_15px_35px_rgba(20,77,49,0.12)] ring-1 ring-emerald-500/20 z-20'
                          : 'scale-[0.88] opacity-50 blur-[1.5px] border-slate-200 shadow-xs z-10'
                      }`}
                    >
                      <Quote className="w-8 h-8 text-emerald-100 absolute top-5 right-5 -z-0" />

                      <div className="space-y-3.5 relative z-10">
                        {/* 5 Stars Rating */}
                        <div className="flex items-center gap-1">
                          {[...Array(rev.stars)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                          <span className="text-xs font-bold text-slate-700 ml-1.5">5.0</span>
                        </div>

                        {/* Comment Text */}
                        <p className="text-slate-700 text-xs sm:text-sm leading-relaxed italic line-clamp-5">
                          "{rev.comment}"
                        </p>
                      </div>

                      {/* Author Profile */}
                      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-3 relative z-10">
                        <img
                          src={rev.avatar}
                          alt={rev.couple}
                          className="w-10 h-10 rounded-full object-cover border-2 border-emerald-600 shrink-0 shadow-xs"
                        />
                        <div className="space-y-0.5 min-w-0">
                          <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1 truncate">
                            <span className="truncate">{rev.couple}</span>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          </h4>
                          <p className="text-[10px] text-slate-500 truncate">{rev.location}</p>
                          <p className="text-[9px] font-semibold text-[#165b39] bg-emerald-50 px-2 py-0.5 rounded-full inline-block truncate max-w-full">
                            {rev.template}
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Controls: Dots & Navigation Arrows */}
          <div className="flex items-center justify-between px-3 pt-3">
            <button
              onClick={handlePrev}
              aria-label="Previous Testimonial"
              className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-emerald-700 shadow-2xs flex items-center justify-center active:scale-95 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center gap-1.5">
              {reviews.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setActiveIndex(dotIdx)}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    dotIdx === activeIndex
                      ? 'w-6 bg-[#165b39]'
                      : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              aria-label="Next Testimonial"
              className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-emerald-700 shadow-2xs flex items-center justify-center active:scale-95 transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Desktop View (md:grid): 3-Column Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {reviews.slice(0, 3).map((rev, index) => (
            <div
              key={index}
              className="p-8 rounded-3xl bg-white border border-slate-200/80 hover:border-emerald-300 shadow-sm hover:shadow-[0_15px_35px_rgba(20,77,49,0.08)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between relative group"
            >
              <Quote className="w-10 h-10 text-emerald-100 absolute top-6 right-6 -z-0 group-hover:text-emerald-200/60 transition-colors" />

              <div className="space-y-4 relative z-10">
                {/* 5 Stars Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(rev.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs font-bold text-slate-700 ml-1.5">5.0</span>
                </div>

                {/* Comment Text */}
                <p className="text-slate-700 text-sm leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author Profile */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-3.5 relative z-10">
                <img
                  src={rev.avatar}
                  alt={rev.couple}
                  className="w-12 h-12 rounded-full object-cover border-2 border-emerald-600 shadow-sm"
                />
                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <span>{rev.couple}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </h4>
                  <p className="text-[11px] text-slate-500">{rev.location} • {rev.date}</p>
                  <p className="text-[10px] font-semibold text-[#165b39] bg-emerald-50 px-2 py-0.5 rounded-full inline-block">
                    Tema: {rev.template}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
export default Testimonials;
