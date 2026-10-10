import React from 'react';
import { Reveal } from '../components/Reveal';
import { NameBadge, Pill, Section } from '../components/Shared';
import { COUPLE, PHOTOS } from '../data';

const InstagramIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

interface PersonProps {
  photo: string;
  name: string;
  parents: string;
  parentNames: string;
  instagram: string;
  label: string;
}

const PersonPanel: React.FC<PersonProps> = ({ photo, name, parents, parentNames, instagram, label }) => (
  <Section
    photo={photo}
    overlay="bg-gradient-to-b from-transparent via-black/10 to-black/80"
    innerClassName="flex min-h-[100svh] flex-col items-center justify-end px-7 pb-14 text-center"
  >
    <Reveal anim="fade">
      <span className="mb-3 inline-block rounded-full border border-white/40 px-3 py-0.5 text-[10px] uppercase tracking-[0.35em] text-white/85 backdrop-blur-sm">
        {label}
      </span>
    </Reveal>
    <Reveal anim="up" delay={100}>
      <h3 className="dr-display text-[2rem] font-semibold leading-tight drop-shadow-md">{name}</h3>
    </Reveal>
    <Reveal anim="up" delay={220}>
      <p className="mt-2 text-[13.5px] leading-relaxed text-white/90">
        {parents}
        <br />
        <span className="font-medium text-white">{parentNames}</span>
      </p>
    </Reveal>
    <Reveal anim="up" delay={340} className="my-5">
      <Pill href={`https://instagram.com/${instagram}`} variant="dark">
        <InstagramIcon />@{instagram}
      </Pill>
    </Reveal>
    <Reveal anim="zoom" delay={420}>
      <NameBadge />
    </Reveal>
  </Section>
);

const CoupleSection: React.FC = () => (
  <>
    <PersonPanel photo={PHOTOS.bride} label="The Bride" {...COUPLE.bride} />
    <PersonPanel photo={PHOTOS.groom} label="The Groom" {...COUPLE.groom} />
  </>
);

export default CoupleSection;
