import React, { createContext, useContext } from 'react';
import { getSavedDashboardData } from '../../dashboard/initialData';
import { ASSETS, BANK_ACCOUNTS, GALLERY_PHOTOS } from './data';
import type { CoupleBio, EventDetail, BankAccount, GalleryPhoto } from './types';
import { getBankCardDetails } from '../CardAtm/bankCardCatalog';

export const SAMPLE_EMPAT_DATA = {
  groom: {
    name: 'Ilham',
    fullName: 'Ilham Pratama, S.Kom',
    childOrder: 'Mempelai Pria :',
    father: 'Putra pertama dari Bpk. Bambang & Ibu Sri',
    mother: '',
    photoUrl: 'https://undangandigitalhbkomp.com/wp-content/uploads/2023/11/WhatsApp-Image-2023-11-14-at-09.11.56.jpeg',
    instagram: 'https://instagram.com',
  },
  bride: {
    name: 'Annisa',
    fullName: 'Annisa Larasati, S.Pd',
    childOrder: 'Mempelai Wanita :',
    father: 'Putri kedua dari Bpk. Suryanto & Ibu Rahma',
    mother: '',
    photoUrl: 'https://undangandigitalhbkomp.com/wp-content/uploads/2023/11/WhatsApp-Image-2023-11-14-at-09.11.56-1.jpeg',
    instagram: 'https://instagram.com',
  },
  weddingInfo: {
    groomNickname: 'Ilham',
    brideNickname: 'Annisa',
    coupleDisplay: 'Ilham & Annisa',
    weddingDateDisplay: 'Sabtu, 24 Oktober 2026',
    targetDate: '2026-10-24T08:00:00',
    googleCalendarUrl:
      'https://www.google.com/calendar/render?action=TEMPLATE&text=The+Wedding+Of+Ilham+%26+Annisa',
    physicalGiftAddress: 'Jl. Jondul Rawang Blok C/20, Padang Selatan',
    whatsappRsvpNumber: '6281234567890',
  },
  assets: {
    ...ASSETS,
    coupleCover: 'https://undangandigitalhbkomp.com/wp-content/uploads/2023/11/WhatsApp-Image-2023-11-14-at-09.11.57.jpeg',
    groomPhoto: 'https://undangandigitalhbkomp.com/wp-content/uploads/2023/11/WhatsApp-Image-2023-11-14-at-09.11.56.jpeg',
    bridePhoto: 'https://undangandigitalhbkomp.com/wp-content/uploads/2023/11/WhatsApp-Image-2023-11-14-at-09.11.56-1.jpeg',
    coupleHero: 'https://undangandigitalhbkomp.com/wp-content/uploads/2023/11/WhatsApp-Image-2023-11-14-at-09.11.57-1.jpeg',
    coupleClosing: 'https://undangandigitalhbkomp.com/wp-content/uploads/2023/11/WhatsApp-Image-2023-11-14-at-09.11.58.jpeg',
  },
  events: [
    {
      id: 'akad',
      title: 'Akad Nikah',
      dayName: 'Sabtu',
      dayNumber: '24',
      monthName: 'Oktober',
      year: '2026',
      time: 'Pukul 08.00 - 10.00 WIB',
      locationName: 'Masjid Agung & Kediaman Mempelai',
      address: 'Jl. Jondul Rawang Blok C/20, Padang Selatan',
      mapUrl: 'https://maps.google.com',
    },
    {
      id: 'resepsi',
      title: 'Resepsi Pernikahan',
      dayName: 'Sabtu',
      dayNumber: '24',
      monthName: 'Oktober',
      year: '2026',
      time: 'Pukul 11.00 - 17.00 WIB',
      locationName: 'Grand Ballroom & Kediaman',
      address: 'Jl. Jondul Rawang Blok C/20, Padang Selatan',
      mapUrl: 'https://maps.google.com',
    },
  ],
  bankAccounts: BANK_ACCOUNTS,
};

export interface TemplateEmpatData {
  isPreview: boolean;
  groom: CoupleBio;
  bride: CoupleBio;
  weddingInfo: typeof SAMPLE_EMPAT_DATA.weddingInfo;
  assets: typeof SAMPLE_EMPAT_DATA.assets;
  events: EventDetail[];
  bankAccounts: BankAccount[];
  galleryPhotos: GalleryPhoto[];
}

const defaultContext: TemplateEmpatData = {
  isPreview: true,
  groom: SAMPLE_EMPAT_DATA.groom,
  bride: SAMPLE_EMPAT_DATA.bride,
  weddingInfo: SAMPLE_EMPAT_DATA.weddingInfo,
  assets: SAMPLE_EMPAT_DATA.assets,
  events: SAMPLE_EMPAT_DATA.events,
  bankAccounts: SAMPLE_EMPAT_DATA.bankAccounts,
  galleryPhotos: GALLERY_PHOTOS,
};

const TemplateEmpatContext = createContext<TemplateEmpatData>(defaultContext);

export const TemplateEmpatProvider: React.FC<{
  isPreview?: boolean;
  children: React.ReactNode;
}> = ({ isPreview = true, children }) => {
  let value: TemplateEmpatData = defaultContext;

  if (!isPreview) {
    const dash = getSavedDashboardData();
    const groomPhoto = dash.groom.avatar || SAMPLE_EMPAT_DATA.groom.photoUrl;
    const bridePhoto = dash.bride.avatar || SAMPLE_EMPAT_DATA.bride.photoUrl;
    const coupleCover = dash.bride.avatar || dash.groom.avatar || SAMPLE_EMPAT_DATA.assets.coupleCover;

    value = {
      isPreview: false,
      groom: {
        name: dash.groom.nickName || 'Andi',
        fullName: dash.groom.fullName || 'Andi Irawan, S.H., M.H.',
        childOrder: 'Mempelai Pria :',
        father: dash.groom.parents || 'Putra dari Bpk. Irianto & Ibu Nurleli',
        mother: '',
        photoUrl: groomPhoto,
        instagram: dash.groom.instagram || 'https://instagram.com',
      },
      bride: {
        name: dash.bride.nickName || 'Rosna',
        fullName: dash.bride.fullName || 'Adv. Rosna Linny, S.H., Gr.',
        childOrder: 'Mempelai Wanita :',
        father: dash.bride.parents || 'Putri dari Bpk. Adiswan & Ibu Emi',
        mother: '',
        photoUrl: bridePhoto,
        instagram: dash.bride.instagram || 'https://instagram.com',
      },
      weddingInfo: {
        groomNickname: dash.groom.nickName || 'Andi',
        brideNickname: dash.bride.nickName || 'Rosna',
        coupleDisplay: `${dash.groom.nickName || 'Andi'} & ${dash.bride.nickName || 'Rosna'}`,
        weddingDateDisplay: dash.event.dateDisplay || 'Sabtu, 24 Oktober 2026',
        targetDate: dash.event.date ? `${dash.event.date}T08:00:00` : '2026-10-24T08:00:00',
        googleCalendarUrl: `https://www.google.com/calendar/render?action=TEMPLATE&text=The+Wedding+Of+${encodeURIComponent(
          (dash.groom.nickName || 'Andi') + ' & ' + (dash.bride.nickName || 'Rosna')
        )}`,
        physicalGiftAddress: dash.giftAddress?.address || 'Padang, Sumatera Barat',
        whatsappRsvpNumber: '6281234567890',
      },
      assets: {
        ...ASSETS,
        coupleCover: coupleCover,
        groomPhoto: groomPhoto,
        bridePhoto: bridePhoto,
        coupleHero: groomPhoto,
        coupleClosing: bridePhoto,
      },
      events: [
        {
          id: 'akad',
          title: 'Akad Nikah',
          dayName: 'Sabtu',
          dayNumber: '24',
          monthName: 'Oktober',
          year: '2026',
          time: dash.event.akadTime ? `Pukul ${dash.event.akadTime}` : 'Pukul 08.00 - 10.00 WIB',
          locationName: dash.event.akadPlace || 'Masjid Agung & Kediaman Mempelai',
          address: dash.event.akadAddress || 'Jl. Jondul Rawang Blok C/20, Padang Selatan',
          mapUrl: dash.event.akadMapsUrl || dash.event.mapsUrl || 'https://maps.google.com',
        },
        {
          id: 'resepsi',
          title: 'Resepsi Pernikahan',
          dayName: 'Sabtu',
          dayNumber: '24',
          monthName: 'Oktober',
          year: '2026',
          time: dash.event.resepsiTime ? `Pukul ${dash.event.resepsiTime}` : 'Pukul 11.00 - 17.00 WIB',
          locationName: dash.event.resepsiPlace || 'Grand Ballroom & Kediaman',
          address: dash.event.resepsiAddress || 'Jl. Jondul Rawang Blok C/20, Padang Selatan',
          mapUrl: dash.event.resepsiMapsUrl || dash.event.mapsUrl || 'https://maps.google.com',
        },
      ],
      bankAccounts: dash.bankAccounts?.length
        ? dash.bankAccounts.map((b, i) => {
            const cardInfo = getBankCardDetails(b.bank, b.cardTheme);
            return {
              id: `acc-${i}`,
              bankName: b.bank || cardInfo.bankName,
              accountNumber: b.number,
              accountHolder: b.holder,
              logoUrl: b.logoUrl || cardInfo.logoUrl || ASSETS.bankNagariLogo,
              type: (b.type || cardInfo.type) as 'bank' | 'wallet',
              cardTheme: b.cardTheme || cardInfo.cardTheme,
            };
          })
        : BANK_ACCOUNTS,
      galleryPhotos: dash.gallery?.length
        ? dash.gallery.map((g, idx) => ({
            id: String(g.id || idx),
            url: g.url,
            thumbnail: g.thumbnail || g.url,
            caption: g.caption || '',
            orientation: g.orientation || (idx === 4 ? 'landscape' : 'portrait'),
          }))
        : GALLERY_PHOTOS,
    };
  }

  return (
    <TemplateEmpatContext.Provider value={value}>
      {children}
    </TemplateEmpatContext.Provider>
  );
};

export const useTemplateEmpatData = () => useContext(TemplateEmpatContext);
