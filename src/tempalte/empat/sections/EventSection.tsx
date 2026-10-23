import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Navigation, ExternalLink, CalendarPlus } from 'lucide-react';
import { useTemplateEmpatData } from '../context';

export const EventSection: React.FC = () => {
  const { events: EVENTS, weddingInfo: WEDDING_INFO } = useTemplateEmpatData();
  // Live Countdown Timer
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      // Hitung target date dari targetDate
      const target = new Date(WEDDING_INFO.targetDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        // Fallback angka cantik
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [WEDDING_INFO.targetDate]);

  return (
    <section id="event-section" className="relative px-6 py-16 bg-[#f3f6ee] text-[#2c3d2f] overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="max-w-sm sm:max-w-md mx-auto space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-2">
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#718569] bg-white px-3 py-1 rounded-full border border-[#8f9e7b]/30">
            Save The Date
          </span>
          <h2 className="font-sage-serif text-2xl sm:text-3xl font-bold text-[#233325]">
            Rangkaian Acara
          </h2>
          <p className="text-xs text-[#5e7259] font-light max-w-xs mx-auto">
            Dengan memohon doa restu, kami mengundang kehadiran Bapak/Ibu/Saudara/i
            pada hari bahagia kami:
          </p>
        </div>

        {/* Live Countdown Box (Tampilan Di Undangan) */}
        {WEDDING_INFO.hasCountdown && (
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-5 border border-[#8f9e7b]/30 shadow-lg text-center space-y-3">
            <div className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <p className="text-[11px] sm:text-xs font-sage-serif font-bold tracking-widest text-[#2f4031] uppercase">
                HITUNG MUNDUR ACARA
              </p>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {[
                { label: 'Hari', value: timeLeft.days },
                { label: 'Jam', value: timeLeft.hours },
                { label: 'Menit', value: timeLeft.minutes },
                { label: 'Detik', value: timeLeft.seconds },
              ].map((unit) => (
                <div
                  key={unit.label}
                  className="bg-[#2f4031] text-white rounded-xl p-2.5 flex flex-col items-center shadow-xs"
                >
                  <span className="font-mono text-lg sm:text-xl font-bold text-[#f5f8f1]">
                    {String(unit.value).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-[#cbd7c3] mt-0.5">
                    {unit.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <a
                href={WEDDING_INFO.googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#c5a454] hover:bg-[#d4b566] text-[#1f2b20] text-xs font-bold transition-all shadow-xs hover:scale-105"
              >
                <CalendarPlus className="w-3.5 h-3.5" />
                <span>Simpan ke Google Calendar</span>
              </a>
            </div>
          </div>
        )}

        {/* Event Cards (Akad & Resepsi) */}
        <div className="space-y-6">
          {EVENTS.map((event) => (
            <div
              key={event.id}
              className="relative overflow-hidden rounded-2xl bg-white border border-[#8f9e7b]/30 shadow-md p-6 hover:shadow-xl transition-shadow"
            >
              {/* Event Badge Header */}
              <div className="flex items-center justify-between border-b border-[#e2ebd9] pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#5b6e55]/15 text-[#3b4e3a] flex items-center justify-center font-bold">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <h3 className="font-sage-serif font-bold text-base sm:text-lg text-[#233325]">
                    {event.title}
                  </h3>
                </div>

                <div className="text-right">
                  <span className="text-2xl font-bold font-serif text-[#c5a454]">
                    {event.dayNumber}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-[#62775d] block leading-none">
                    {event.monthName}
                  </span>
                </div>
              </div>

              {/* Event Details */}
              <div className="space-y-3 text-xs sm:text-[13px] text-[#4d614a]">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#8f9e7b] shrink-0" />
                  <span className="font-semibold text-[#293a2a]">
                    {event.dayName}, {event.time}
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#8f9e7b] shrink-0 mt-0.5" />
                  <div className="leading-relaxed">
                    <strong className="block text-[#1e2e1f] font-semibold">
                      {event.locationName}
                    </strong>
                    <span className="text-[#596d55] text-xs">
                      {event.address}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-3 border-t border-[#e2ebd9]">
                <a
                  href={event.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#5b6e55] hover:bg-[#485943] text-white text-xs font-bold shadow-xs hover:shadow-md transition-all"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Telusuri Google Maps</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
