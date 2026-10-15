import React, { createContext, useContext } from 'react';
import { getSavedDashboardData } from '../../dashboard/initialData';

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
    dateDisplay: 'Sabtu, 24 Oktober 2026',
    akadDate: 'Sabtu, 24 Oktober 2026',
    akadTime: '08.00 - 10.00 WIB',
    akadPlace: 'Masjid Agung Al-Azhar',
    akadAddress: 'Jl. Sisingamangaraja, Kebayoran Baru, Jakarta Selatan',
    resepsiDate: 'Sabtu, 24 Oktober 2026',
    resepsiTime: '11.00 - 17.00 WIB',
    resepsiPlace: 'Grand Ballroom Hotel Santika',
    resepsiAddress: 'Jl. Hayam Wuruk No. 127, Jakarta Barat',
    mapsUrl: 'https://maps.google.com',
  },
  bankAccounts: [
    { bank: 'BCA', number: '7182002890', holder: 'Andi Irawan' },
    { bank: 'Mandiri', number: '111-00-1234567-8', holder: 'Rosna Linny' },
  ],
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
  let effectiveData = SAMPLE_DATA_SATU;

  if (!isPreview) {
    const dash = getSavedDashboardData();
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
        dateDisplay: dash.event.dateDisplay || SAMPLE_DATA_SATU.event.dateDisplay,
        akadDate: dash.event.dateDisplay || SAMPLE_DATA_SATU.event.akadDate,
        akadTime: dash.event.akadTime || SAMPLE_DATA_SATU.event.akadTime,
        akadPlace: dash.event.akadPlace || SAMPLE_DATA_SATU.event.akadPlace,
        akadAddress: dash.event.akadAddress || SAMPLE_DATA_SATU.event.akadAddress,
        resepsiDate: dash.event.dateDisplay || SAMPLE_DATA_SATU.event.resepsiDate,
        resepsiTime: dash.event.resepsiTime || SAMPLE_DATA_SATU.event.resepsiTime,
        resepsiPlace: dash.event.resepsiPlace || SAMPLE_DATA_SATU.event.resepsiPlace,
        resepsiAddress: dash.event.resepsiAddress || SAMPLE_DATA_SATU.event.resepsiAddress,
        mapsUrl: dash.event.mapsUrl || SAMPLE_DATA_SATU.event.mapsUrl,
      },
      bankAccounts: dash.bankAccounts?.length
        ? dash.bankAccounts.map((b) => ({ bank: b.bank, number: b.number, holder: b.holder }))
        : SAMPLE_DATA_SATU.bankAccounts,
    };
  }

  return (
    <TemplateSatuContext.Provider value={{ isPreview, data: effectiveData }}>
      {children}
    </TemplateSatuContext.Provider>
  );
};

export const useTemplateSatuData = () => useContext(TemplateSatuContext);
