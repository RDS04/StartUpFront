import React, { createContext, useContext, useState, useEffect } from 'react';
import { getSavedDashboardData } from '../../dashboard/initialData';
import type { SatuGalleryPhoto } from './types';

export const SAMPLE_DATA_SATU = {
  groom: {
    nickName: 'Andi',
    fullName: 'Andi Irawan, S.H., M.H.',
    parents: 'Putra ke-4 dari Bpk. Irianto & Ibu Nurleli',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
    instagram: '@andi.irawan',
  },
  bride: {
    nickName: 'Rosna',
    fullName: 'Adv. Rosna Linny, S.H., Gr.',
    parents: 'Putri ke-2 dari Bpk. Adiswan & Ibu Emi',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    instagram: '@rosna.linny',
  },
  event: {
    startDate: '2026-11-23',
    startTime: '08:00',
    endDate: '2026-11-23',
    date: '2026-11-23',
    countdownTime: '08:00',
    countdownTarget: 'end',
    hasCountdown: true,
    dateDisplay: 'Sabtu, 24 Oktober 2026',
    akadDate: 'Sabtu, 24 Oktober 2026',
    akadTime: '08.00 - 10.00 WIB',
    akadPlace: 'Masjid Agung Al-Azhar',
    akadAddress: 'Jl. Sisingamangaraja, Kebayoran Baru, Jakarta Selatan',
    resepsiDate: 'Sabtu, 24 Oktober 2026',
    resepsiTime: '11.00 - 17.00 WIB',
    resepsiPlace: 'Grand Ballroom Hotel Santika',
    resepsiAddress: 'Jl. Hayam Wuruk No. 127, Jakarta Barat',
    akadMapsUrl: 'https://maps.google.com/?q=Masjid+Agung+Al-Azhar+Kebayoran+Baru',
    resepsiMapsUrl: 'https://maps.google.com/?q=Hotel+Santika+Premiere+Hayam+Wuruk+Jakarta',
    mapsUrl: 'https://maps.google.com',
  },
  bankAccounts: [
    { id: 1, bank: 'Bank Central Asia (BCA)', number: '8730 4912 3000', holder: 'ANDI IRAWAN', cardTheme: 'bca' },
    { id: 2, bank: 'Bank Mandiri', number: '1370 0192 8491 2', holder: 'ROSNA LINNY', cardTheme: 'mandiri' },
  ],
  giftAddress: {
    recipient: 'Andi & Rosna',
    phone: '',
    address: 'Jl. Kemang Raya No. 45B, Mampang Prapatan, Jakarta Selatan, 12730',
    notes: 'Mohon konfirmasi penerima sebelum mengirimkan paket kado fisik',
  },
  gallery: [
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      caption: 'Momen Bahagia Bersama',
      orientation: 'portrait' as 'portrait' | 'landscape',
    },
    {
      id: '2',
      url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
      caption: 'Senyum Penuh Kasih',
      orientation: 'portrait' as 'portrait' | 'landscape',
    },
    {
      id: '3',
      url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80',
      caption: 'Langkah Awal Menuju Abadi',
      orientation: 'portrait' as 'portrait' | 'landscape',
    },
    {
      id: '4',
      url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80',
      caption: 'Genggaman Tangan Penuh Keyakinan',
      orientation: 'portrait' as 'portrait' | 'landscape',
    },
    {
      id: '5',
      url: 'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=800&q=80',
      caption: 'Dalam Naungan Kasih Sayang',
      orientation: 'portrait' as 'portrait' | 'landscape',
    },
    {
      id: '6',
      url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80',
      caption: 'Menatap Masa Depan Berdua',
      orientation: 'portrait' as 'portrait' | 'landscape',
    },
  ] as SatuGalleryPhoto[],
};

export interface TemplateSatuData {
  isPreview: boolean;
  data: typeof SAMPLE_DATA_SATU;
}

const TemplateSatuContext = createContext<TemplateSatuData>({
  isPreview: true,
  data: SAMPLE_DATA_SATU,
});

export const TemplateSatuProvider: React.FC<{
  isPreview?: boolean;
  children: React.ReactNode;
}> = ({ isPreview = true, children }) => {
  const [, setTick] = useState(0);

  useEffect(() => {
    const handleUpdate = () => {
      setTick((t) => t + 1);
    };
    window.addEventListener('storage', handleUpdate);
    window.addEventListener('ij_dashboard_update', handleUpdate);
    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('ij_dashboard_update', handleUpdate);
    };
  }, []);

  let effectiveData = SAMPLE_DATA_SATU;

  if (!isPreview) {
    const dash = getSavedDashboardData();

    // Rekening hanya diikutsertakan jika user benar-benar mengisinya di dashboard
    const userBankAccounts = Array.isArray(dash.bankAccounts)
      ? dash.bankAccounts
          .filter((b) => b && (b.number?.trim() || b.bank?.trim()))
          .map((b) => ({
            id: b.id || Math.random(),
            bank: b.bank || 'Bank',
            number: b.number || '',
            holder: b.holder || '',
            cardTheme: b.cardTheme || '',
          }))
      : [];

    // Foto galeri: ambil dari database / dashboard jika ada, fallback ke contoh default jika belum diunggah
    const userGallery = Array.isArray(dash.gallery) && dash.gallery.length > 0
      ? dash.gallery
          .map((g: any, idx: number) => {
            const rawUrl = typeof g === 'string' ? g : (g.url || g.thumbnail || '');
            const rawThumb = typeof g === 'string' ? g : (g.thumbnail || g.url || '');
            const rawCaption = typeof g === 'string' ? '' : (g.caption || '');
            const rawOrient = typeof g === 'object' && g.orientation ? g.orientation : 'portrait';
            return {
              id: String(typeof g === 'object' && g.id ? g.id : idx),
              url: rawUrl,
              thumbnail: rawThumb,
              caption: rawCaption || 'Momen Bahagia Kami',
              orientation: (rawOrient as 'portrait' | 'landscape') || 'portrait',
            };
          })
          .filter((item) => Boolean(item.url))
      : SAMPLE_DATA_SATU.gallery;

    effectiveData = {
      groom: {
        nickName: dash.groom.nickName || SAMPLE_DATA_SATU.groom.nickName,
        fullName: dash.groom.fullName || SAMPLE_DATA_SATU.groom.fullName,
        parents: dash.groom.parents || SAMPLE_DATA_SATU.groom.parents,
        avatar: dash.groom.avatar || SAMPLE_DATA_SATU.groom.avatar,
        instagram: dash.groom.instagram || SAMPLE_DATA_SATU.groom.instagram,
      },
      bride: {
        nickName: dash.bride.nickName || SAMPLE_DATA_SATU.bride.nickName,
        fullName: dash.bride.fullName || SAMPLE_DATA_SATU.bride.fullName,
        parents: dash.bride.parents || SAMPLE_DATA_SATU.bride.parents,
        avatar: dash.bride.avatar || SAMPLE_DATA_SATU.bride.avatar,
        instagram: dash.bride.instagram || SAMPLE_DATA_SATU.bride.instagram,
      },
      event: {
        startDate: dash.event.startDate || '',
        startTime: dash.event.startTime || '08:00',
        endDate: dash.event.endDate || '',
        date: dash.event.endDate || dash.event.startDate || '',
        countdownTime: dash.event.countdownTime || '08:00',
        countdownTarget: dash.event.countdownTarget || 'end',
        hasCountdown: true,
        dateDisplay: dash.event.dateDisplay || SAMPLE_DATA_SATU.event.dateDisplay,
        akadDate: dash.event.dateDisplay || SAMPLE_DATA_SATU.event.akadDate,
        akadTime: dash.event.akadTime || SAMPLE_DATA_SATU.event.akadTime,
        akadPlace: dash.event.akadPlace || SAMPLE_DATA_SATU.event.akadPlace,
        akadAddress: dash.event.akadAddress || SAMPLE_DATA_SATU.event.akadAddress,
        resepsiDate: dash.event.dateDisplay || SAMPLE_DATA_SATU.event.resepsiDate,
        resepsiTime: dash.event.resepsiTime || SAMPLE_DATA_SATU.event.resepsiTime,
        resepsiPlace: dash.event.resepsiPlace || SAMPLE_DATA_SATU.event.resepsiPlace,
        resepsiAddress: dash.event.resepsiAddress || SAMPLE_DATA_SATU.event.resepsiAddress,
        akadMapsUrl: dash.event.akadMapsUrl || dash.event.mapsUrl || SAMPLE_DATA_SATU.event.akadMapsUrl,
        resepsiMapsUrl: dash.event.resepsiMapsUrl || dash.event.mapsUrl || SAMPLE_DATA_SATU.event.resepsiMapsUrl,
        mapsUrl: dash.event.mapsUrl || SAMPLE_DATA_SATU.event.mapsUrl,
      },
      // Ketika user sudah beli template: default kosong ([]), hanya muncul jika user input di dashboard!
      bankAccounts: userBankAccounts,
      // Default alamat kado kosong sampai diinputkan user di dashboard
      giftAddress: {
        recipient: dash.giftAddress?.recipient || '',
        phone: dash.giftAddress?.phone || '',
        address: dash.giftAddress?.address || '',
        notes: dash.giftAddress?.notes || '',
      },
      gallery: userGallery.length > 0 ? userGallery : SAMPLE_DATA_SATU.gallery,
    };
  }

  return (
    <TemplateSatuContext.Provider value={{ isPreview, data: effectiveData }}>
      {children}
    </TemplateSatuContext.Provider>
  );
};

export const useTemplateSatuData = () => useContext(TemplateSatuContext);
