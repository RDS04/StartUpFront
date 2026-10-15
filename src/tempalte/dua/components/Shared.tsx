import React from 'react';
import { FloralCorners } from './FloralCorners';
import { Reveal } from './Reveal';

/* ------------------------------------------------------------------ */
/* Section shell: full-height panel with optional photo background     */
/* ------------------------------------------------------------------ */
interface SectionProps {
  id?: string;
  photo?: string;
  overlay?: string; // tailwind classes for the photo overlay
  florals?: boolean;
  floralOpacity?: number;
  className?: string;
  innerClassName?: string;
  minScreen?: boolean;
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({
  id,
  photo,
  overlay = 'bg-gradient-to-b from-black/10 via-black/10 to-black/60',
  florals = true,
  floralOpacity = 0.7,
  className = '',
  innerClassName = '',
  minScreen = true,
  children,
}) => (
  <section
    id={id}
    className={`relative w-full overflow-hidden ${minScreen ? 'min-h-[100svh]' : ''} ${
      photo ? 'bg-[#4b3d3e]' : 'bg-[var(--dr-bg)]'
    } ${className}`}
  >
    {photo ? (
      <>
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={photo}
            alt=""
            loading="lazy"
            className="dr-kenburns h-full w-full object-cover"
          />
        </div>
        <div className={`absolute inset-0 ${overlay}`} />
      </>
    ) : (
      /* soft paper-like texture for plain sections */
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 10%, rgba(255,255,255,.18), transparent 45%), radial-gradient(circle at 85% 90%, rgba(255,255,255,.12), transparent 40%), radial-gradient(circle at 50% 50%, rgba(87,81,79,.15), transparent 70%)',
        }}
      />
    )}
    {florals && <FloralCorners opacity={floralOpacity} />}
    <div className={`relative z-[3] ${innerClassName}`}>{children}</div>
  </section>
);

import { useTemplateDuaData } from '../context';

/* ------------------------------------------------------------------ */
/* Couple name badge  "Vani  |  Rahmat"  + date                        */
/* ------------------------------------------------------------------ */
export const NameBadge: React.FC<{ size?: 'lg' | 'sm'; className?: string }> = ({
  size = 'sm',
  className = '',
}) => {
  const { couple } = useTemplateDuaData();
  const big = size === 'lg';
  return (
    <div className={`text-center ${className}`}>
      <div className="relative mx-auto flex items-center justify-center gap-3">
        <span className={`dr-display font-semibold tracking-wide ${big ? 'text-[2.6rem]' : 'text-xl'}`}>
          {couple.shortBride}
        </span>
        <span className="flex flex-col items-center">
          <span className={`block bg-white/70 ${big ? 'h-10' : 'h-6'} w-px`} />
          <span className={`dr-script ${big ? 'text-2xl -my-1' : 'text-base -my-0.5'} text-white/90`}>&amp;</span>
          <span className={`block bg-white/70 ${big ? 'h-10' : 'h-6'} w-px`} />
        </span>
        <span className={`dr-display font-semibold tracking-wide ${big ? 'text-[2.6rem]' : 'text-xl'}`}>
          {couple.shortGroom}
        </span>
      </div>
      <p className={`tracking-[0.4em] text-white/85 ${big ? 'mt-2 text-sm' : 'mt-1 text-[11px]'}`}>
        {couple.dateShort}
      </p>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Script heading                                                     */
/* ------------------------------------------------------------------ */
export const ScriptTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <Reveal anim="down">
    <h2 className={`dr-script text-center text-[2.4rem] text-white drop-shadow-sm ${className}`}>{children}</h2>
    <div className="mx-auto mt-1 flex items-center justify-center gap-2 text-white/70">
      <span className="h-px w-10 bg-white/50" />
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 21s-7-4.4-9.3-8.6C1 9.2 2.6 5.5 6 5.1c2-.2 3.4.9 4 2 .6-1.1 2-2.2 4-2 3.4.4 5 4.1 3.3 7.3C19 16.6 12 21 12 21z" />
      </svg>
      <span className="h-px w-10 bg-white/50" />
    </div>
  </Reveal>
);

/* ------------------------------------------------------------------ */
/* Pill button                                                        */
/* ------------------------------------------------------------------ */
interface PillProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'dark' | 'glass' | 'light';
  href?: string;
}

export const Pill: React.FC<PillProps> = ({ variant = 'dark', href, className = '', children, ...rest }) => {
  const styles = {
    dark: 'bg-[var(--dr-accent)] text-white hover:bg-[#3f3a38] shadow-[0_6px_20px_rgba(0,0,0,.25)]',
    glass: 'bg-white/15 text-white border border-white/40 backdrop-blur-md hover:bg-white/25',
    light: 'bg-white text-[var(--dr-accent)] hover:bg-[var(--dr-cream)] shadow-[0_6px_20px_rgba(0,0,0,.15)]',
  }[variant];
  const cls = `inline-flex items-center justify-center gap-2 rounded-full px-5 py-2 text-[13px] font-medium transition-all duration-300 hover:-translate-y-0.5 active:scale-95 cursor-pointer ${styles} ${className}`;
  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
};

/* ------------------------------------------------------------------ */
/* Falling petals                                                     */
/* ------------------------------------------------------------------ */
export const Petals: React.FC<{ count?: number }> = ({ count = 12 }) => {
  const petals = React.useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: `${(i * 97) % 100}%`,
        duration: 9 + ((i * 37) % 8),
        delay: (i * 1.3) % 10,
        scale: 0.6 + ((i * 13) % 6) / 10,
      })),
    [count]
  );
  return (
    <div className="pointer-events-none absolute inset-0 z-[4] overflow-hidden" aria-hidden="true">
      {petals.map((p, i) => (
        <span
          key={i}
          className="dr-petal"
          style={{
            left: p.left,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            transform: `scale(${p.scale})`,
          }}
        />
      ))}
    </div>
  );
};
