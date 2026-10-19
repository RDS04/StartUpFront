import React, { useEffect, useState } from 'react';
import { CalendarHeart, MapPin } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { NameBadge, Pill, Section } from '../components/Shared';
import { type ResepsiItem } from '../data';
import { useTemplateDuaData } from '../context';

/* ------------------------------ Countdown ------------------------------ */
const useCountdown = (iso: string) => {
  const target = new Date(iso).getTime();
  const calc = () => {
    const d = Math.max(0, target - Date.now());
    return {
      Hari: Math.floor(d / 86400000),
      Jam: Math.floor((d / 3600000) % 24),
      Menit: Math.floor((d / 60000) % 60),
      Detik: Math.floor((d / 1000) % 60),
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);
  return t;
};

/* ------------------------------ Akad ------------------------------ */
export const AkadSection: React.FC = () => {
  const { akad, couple, photos } = useTemplateDuaData();
  const t = useCountdown(couple.targetDate);

  const buildCalendarUrl = () => {
    const p = new URLSearchParams({
      action: 'TEMPLATE',
      text: `Pernikahan ${couple.shortBride} & ${couple.shortGroom}`,
      dates: '20261009T010000Z/20261012T090000Z',
      details: 'Akad Nikah & Resepsi',
      location: akad.venue,
    });
    return `https://calendar.google.com/calendar/render?${p.toString()}`;
  };

  return (
    <Section
      photo={photos.akad}
      overlay="bg-gradient-to-b from-[#967678]/70 via-[#967678]/55 to-[#5e4648]/80"
      innerClassName="flex min-h-[100svh] flex-col items-center justify-center px-8 py-20 text-center"
    >
      <Reveal anim="zoom">
        <NameBadge />
      </Reveal>

      <Reveal anim="down" delay={120} className="mt-10">
        <h2 className="dr-display text-[2rem] font-semibold tracking-wide">{akad.title}</h2>
      </Reveal>

      <Reveal anim="zoom" delay={220} className="my-4 flex items-center justify-center">
        <span className="w-20 text-right text-sm uppercase tracking-[0.25em]">{akad.day}</span>
        <span className="dr-display mx-4 border-x-2 border-white/80 px-4 text-[3.4rem] font-semibold leading-none">
          {akad.date}
        </span>
        <span className="w-20 text-left text-sm uppercase tracking-[0.25em]">{akad.monthYear}</span>
      </Reveal>

      <Reveal anim="up" delay={320}>
        <p className="text-[15px] font-medium text-white/95">{akad.time}</p>
        <p className="mt-1 text-[13px] text-white/80">Bertempat di</p>
        <p className="text-base font-semibold text-white">{akad.venue}</p>
        {akad.address && (
          <p className="mx-auto mt-1 max-w-[260px] text-xs text-white/85">{akad.address}</p>
        )}
        {akad.mapsUrl && (
          <div className="mt-4 flex justify-center">
            <Pill href={akad.mapsUrl} variant="glass" className="px-4 py-1.5 text-[12px] bg-white/20 border-white/40 text-white hover:bg-white/30">
              <MapPin className="h-3.5 w-3.5" /> Buka Google Maps
            </Pill>
          </div>
        )}
      </Reveal>

      {/* Countdown */}
      <Reveal anim="up" delay={420} className="mt-10 w-full">
        <p className="mb-3 text-[11px] uppercase tracking-[0.4em] text-white/80">Menuju Hari Bahagia</p>
        <div className="mx-auto grid max-w-[320px] grid-cols-4 gap-2.5">
          {Object.entries(t).map(([label, val]) => (
            <div
              key={label}
              className="rounded-2xl border border-white/30 bg-white/15 py-3 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,.12)]"
            >
              <div className="dr-display text-2xl font-semibold tabular-nums">{String(val).padStart(2, '0')}</div>
              <div className="text-[10px] uppercase tracking-widest text-white/80">{label}</div>
            </div>
          ))}
        </div>
        <Pill href={buildCalendarUrl()} variant="glass" className="mt-6">
          <CalendarHeart className="h-4 w-4" /> Simpan ke Kalender
        </Pill>
      </Reveal>
    </Section>
  );
};

/* ------------------------------ Resepsi ------------------------------ */
const ResepsiCard: React.FC<{ item: ResepsiItem }> = ({ item }) => (
  <Section
    photo={item.photo}
    overlay="bg-black/15"
    innerClassName="flex min-h-[100svh] items-center justify-center px-6 py-16"
  >
    <Reveal anim="zoom" className="w-full max-w-[330px]">
      <div className="relative rounded-[20rem] bg-white/75 px-5 py-20 text-center text-[var(--dr-ink)] shadow-[0_25px_60px_rgba(0,0,0,.25)] backdrop-blur-[3px]">
        <div className="pointer-events-none absolute inset-2 rounded-[20rem] border border-[var(--dr-bg)]/40" />

        <Reveal anim="down" delay={150}>
          <h2 className="dr-script text-[2.9rem] text-[var(--dr-accent)]">Resepsi</h2>
          <p className="-mt-3 ml-12 text-lg font-bold tracking-[0.2em] text-black">{item.numeral}</p>
        </Reveal>

        <Reveal anim="left" delay={260} className="mt-5 space-y-1">
          <p className="text-lg font-semibold text-[var(--dr-accent)]">{item.date}</p>
          <p className="pt-1 text-[15px] font-bold tracking-widest text-black">PUKUL</p>
          <p className="text-[15px] text-black">{item.time}</p>
          <p className="pt-2 text-[15px] font-bold text-black">{item.place}</p>
          <p className="mx-auto max-w-[220px] text-[15px] text-black/80">{item.address}</p>
        </Reveal>

        <Reveal anim="up" delay={360} className="mt-5">
          <Pill href={item.mapsUrl} variant="dark" className="px-4 py-1.5 text-[12px]">
            <MapPin className="h-3.5 w-3.5" /> {item.mapsLabel}
          </Pill>
        </Reveal>

        <div className="-mx-5 mt-7 h-px bg-[var(--dr-bg)]" />
      </div>
    </Reveal>
  </Section>
);

export const ResepsiSection: React.FC = () => {
  const { resepsi } = useTemplateDuaData();
  return (
    <>
      {resepsi.map((r) => (
        <ResepsiCard key={r.numeral} item={r} />
      ))}
    </>
  );
};
