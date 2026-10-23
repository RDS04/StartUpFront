import React, { createContext, useContext } from 'react';
import { getSavedDashboardData } from '../../dashboard/initialData';
import { ASSETS, GROOM_DATA, BRIDE_DATA, WEDDING_INFO, BANK_ACCOUNTS, EVENTS, GALLERY_PHOTOS } from './data';
import type { CoupleBio, EventDetail, BankAccount } from './types';

export interface TemplateTigaData {
  isPreview: boolean;
  groom: CoupleBio;
  bride: CoupleBio;
  weddingInfo: typeof WEDDING_INFO;
  assets: typeof ASSETS;
  bankAccounts: BankAccount[];
  events: EventDetail[];
  gallery: string[];
}

const defaultContext: TemplateTigaData = {
  isPreview: true,
  groom: GROOM_DATA,
  bride: BRIDE_DATA,
  weddingInfo: WEDDING_INFO,
  assets: ASSETS,
  bankAccounts: BANK_ACCOUNTS,
  events: EVENTS,
  gallery: GALLERY_PHOTOS,
};

const TemplateTigaContext = createContext<TemplateTigaData>(defaultContext);

export const TemplateTigaProvider: React.FC<{
  isPreview?: boolean;
  children: React.ReactNode;
}> = ({ isPreview = true, children }) => {
  let value: TemplateTigaData = defaultContext;

  if (!isPreview) {
    const dash = getSavedDashboardData();
    const groomPhoto = dash.groom.avatar || ASSETS.groomPhoto;
    const bridePhoto = dash.bride.avatar || ASSETS.bridePhoto;
    const coupleCover = dash.bride.avatar || dash.groom.avatar || ASSETS.coupleCover;

    const startDateStr = dash.event.startDate || dash.event.date || '';
    const endDateStr = dash.event.endDate || dash.event.date || '';
    const startTimeStr = dash.event.startTime || '08:00';
    const endTimeStr = dash.event.countdownTime || '10:00';
    const targetType = dash.event.countdownTarget || 'end';

    let resolvedTarget = WEDDING_INFO.targetDate;
    if (startDateStr || endDateStr) {
      if (targetType === 'start' && startDateStr) {
        resolvedTarget = `${startDateStr}T${startTimeStr}:00`;
      } else if (targetType === 'end' && endDateStr) {
        resolvedTarget = `${endDateStr}T${endTimeStr}:00`;
      } else if (targetType === 'auto') {
        const now = Date.now();
        const startMs = startDateStr ? new Date(`${startDateStr}T${startTimeStr}:00`).getTime() : 0;
        const endMs = endDateStr ? new Date(`${endDateStr}T${endTimeStr}:00`).getTime() : 0;
        if (startMs > now) {
          resolvedTarget = `${startDateStr}T${startTimeStr}:00`;
        } else if (endMs > 0) {
          resolvedTarget = `${endDateStr}T${endTimeStr}:00`;
        } else if (startMs > 0) {
          resolvedTarget = `${startDateStr}T${startTimeStr}:00`;
        }
      } else if (endDateStr) {
        resolvedTarget = `${endDateStr}T${endTimeStr}:00`;
      } else if (startDateStr) {
        resolvedTarget = `${startDateStr}T${startTimeStr}:00`;
      }
    }

    value = {
      isPreview: false,
      groom: {
        name: dash.groom.nickName || GROOM_DATA.name,
        fullName: dash.groom.fullName || GROOM_DATA.fullName,
        childOrder: 'Mempelai Pria :',
        father: dash.groom.parents || GROOM_DATA.father,
        mother: '',
        photoUrl: groomPhoto,
      },
      bride: {
        name: dash.bride.nickName || BRIDE_DATA.name,
        fullName: dash.bride.fullName || BRIDE_DATA.fullName,
        childOrder: 'Mempelai Wanita :',
        father: dash.bride.parents || BRIDE_DATA.father,
        mother: '',
        photoUrl: bridePhoto,
      },
      weddingInfo: {
        ...WEDDING_INFO,
        groomNickname: dash.groom.nickName || WEDDING_INFO.groomNickname,
        brideNickname: dash.bride.nickName || WEDDING_INFO.brideNickname,
        weddingDateDisplay: dash.event.dateDisplay || WEDDING_INFO.weddingDateDisplay,
        targetDate: resolvedTarget || '2026-11-23T10:00:00',
        hasCountdown: true,
        physicalGiftAddress: dash.giftAddress?.address || WEDDING_INFO.physicalGiftAddress,
      },
      assets: {
        ...ASSETS,
        groomPhoto: groomPhoto,
        bridePhoto: bridePhoto,
        coupleCover: coupleCover,
      },
      bankAccounts: dash.bankAccounts?.length
        ? dash.bankAccounts.map((b, i) => ({
            id: `bank-${i}`,
            bankName: b.bank,
            accountNumber: b.number,
            accountHolder: b.holder,
            logoUrl: ASSETS.logoBRI,
          }))
        : BANK_ACCOUNTS,
      events: EVENTS.map((ev, i) => {
        if (i === 0) {
          return {
            ...ev,
            time: dash.event.akadTime || ev.time,
            locationName: dash.event.akadPlace || ev.locationName,
            address: dash.event.akadAddress || ev.address,
            mapUrl: dash.event.akadMapsUrl || dash.event.mapsUrl || ev.mapUrl,
          };
        }
        if (i >= 1) {
          return {
            ...ev,
            time: dash.event.resepsiTime || ev.time,
            locationName: dash.event.resepsiPlace || ev.locationName,
            address: dash.event.resepsiAddress || ev.address,
            mapUrl: dash.event.resepsiMapsUrl || dash.event.mapsUrl || ev.mapUrl,
          };
        }
        return ev;
      }),
      gallery: dash.gallery?.length
        ? dash.gallery.map((g) => (typeof g === 'string' ? g : (g.url || g.thumbnail || ''))).filter(Boolean)
        : GALLERY_PHOTOS,
    };
  }

  return (
    <TemplateTigaContext.Provider value={value}>
      {children}
    </TemplateTigaContext.Provider>
  );
};

export const useTemplateTigaData = () => useContext(TemplateTigaContext);
