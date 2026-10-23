import React, { createContext, useContext } from 'react';
import { getSavedDashboardData } from '../../dashboard/initialData';
import { COUPLE, PHOTOS, AKAD, RESEPSI, GIFT, GALLERY, type ResepsiItem } from './data';

export interface TemplateDuaData {
  isPreview: boolean;
  couple: typeof COUPLE;
  photos: typeof PHOTOS;
  akad: typeof AKAD;
  resepsi: ResepsiItem[];
  gift: typeof GIFT;
  gallery: string[];
}

const defaultContext: TemplateDuaData = {
  isPreview: true,
  couple: COUPLE,
  photos: PHOTOS,
  akad: AKAD,
  resepsi: RESEPSI,
  gift: GIFT,
  gallery: GALLERY,
};

const TemplateDuaContext = createContext<TemplateDuaData>(defaultContext);

export const TemplateDuaProvider: React.FC<{
  isPreview?: boolean;
  children: React.ReactNode;
}> = ({ isPreview = true, children }) => {
  let value: TemplateDuaData = defaultContext;

  if (!isPreview) {
    const dash = getSavedDashboardData();
    const groomPhoto = dash.groom.avatar || PHOTOS.groom;
    const bridePhoto = dash.bride.avatar || PHOTOS.bride;
    const coverPhoto = dash.groom.avatar || dash.bride.avatar || PHOTOS.cover;

    const startDateStr = dash.event.startDate || dash.event.date || '';
    const endDateStr = dash.event.endDate || dash.event.date || '';
    const startTimeStr = dash.event.startTime || '08:00';
    const endTimeStr = dash.event.countdownTime || '11:00';
    const targetType = dash.event.countdownTarget || 'end';

    let resolvedTarget = COUPLE.targetDate;
    if (startDateStr || endDateStr) {
      if (targetType === 'start' && startDateStr) {
        resolvedTarget = `${startDateStr}T${startTimeStr}:00+07:00`;
      } else if (targetType === 'end' && endDateStr) {
        resolvedTarget = `${endDateStr}T${endTimeStr}:00+07:00`;
      } else if (targetType === 'auto') {
        const now = Date.now();
        const startMs = startDateStr ? new Date(`${startDateStr}T${startTimeStr}:00+07:00`).getTime() : 0;
        const endMs = endDateStr ? new Date(`${endDateStr}T${endTimeStr}:00+07:00`).getTime() : 0;
        if (startMs > now) {
          resolvedTarget = `${startDateStr}T${startTimeStr}:00+07:00`;
        } else if (endMs > 0) {
          resolvedTarget = `${endDateStr}T${endTimeStr}:00+07:00`;
        } else if (startMs > 0) {
          resolvedTarget = `${startDateStr}T${startTimeStr}:00+07:00`;
        }
      } else if (endDateStr) {
        resolvedTarget = `${endDateStr}T${endTimeStr}:00+07:00`;
      } else if (startDateStr) {
        resolvedTarget = `${startDateStr}T${startTimeStr}:00+07:00`;
      }
    }

    value = {
      isPreview: false,
      couple: {
        shortBride: dash.bride.nickName || COUPLE.shortBride,
        shortGroom: dash.groom.nickName || COUPLE.shortGroom,
        dateShort: dash.event.dateDisplay ? (dash.event.dateDisplay.split(',')[1]?.trim() || COUPLE.dateShort) : COUPLE.dateShort,
        targetDate: resolvedTarget || '2026-11-23T11:00:00+07:00',
        hasCountdown: true,
        bride: {
          name: dash.bride.fullName || COUPLE.bride.name,
          parents: 'Putri dari',
          parentNames: dash.bride.parents || COUPLE.bride.parentNames,
          instagram: dash.bride.instagram ? dash.bride.instagram.replace('@', '') : COUPLE.bride.instagram,
        },
        groom: {
          name: dash.groom.fullName || COUPLE.groom.name,
          parents: 'Putra dari',
          parentNames: dash.groom.parents || COUPLE.groom.parentNames,
          instagram: dash.groom.instagram ? dash.groom.instagram.replace('@', '') : COUPLE.groom.instagram,
        },
      },
      photos: {
        ...PHOTOS,
        groom: groomPhoto,
        bride: bridePhoto,
        cover: coverPhoto,
        quoteArch: bridePhoto || PHOTOS.quoteArch,
        closing: groomPhoto || PHOTOS.closing,
      },
      akad: {
        ...AKAD,
        time: dash.event.akadTime ? `Pukul ${dash.event.akadTime}` : AKAD.time,
        venue: dash.event.akadPlace || AKAD.venue,
        monthYear: dash.event.dateDisplay || AKAD.monthYear,
        address: dash.event.akadAddress || AKAD.address,
        mapsUrl: dash.event.akadMapsUrl || dash.event.mapsUrl || AKAD.mapsUrl,
      },
      resepsi: RESEPSI.map((item, idx) => {
        if (idx === 0) {
          return {
            ...item,
            date: dash.event.dateDisplay || item.date,
            time: dash.event.resepsiTime || item.time,
            place: dash.event.resepsiPlace || item.place,
            address: dash.event.resepsiAddress || item.address,
            mapsUrl: dash.event.resepsiMapsUrl || dash.event.mapsUrl || item.mapsUrl,
            photo: groomPhoto || item.photo,
          };
        }
        return {
          ...item,
          mapsUrl: dash.event.resepsiMapsUrl || dash.event.mapsUrl || item.mapsUrl,
        };
      }),
      gift: {
        ...GIFT,
        accounts: dash.bankAccounts?.length
          ? dash.bankAccounts.map((b) => ({ bank: b.bank, number: b.number, holder: b.holder }))
          : GIFT.accounts,
        address: dash.giftAddress?.address || GIFT.address,
      },
      gallery: dash.gallery?.length
        ? dash.gallery.map((g) => (typeof g === 'string' ? g : (g.url || g.thumbnail || ''))).filter(Boolean)
        : GALLERY,
    };
  }

  return (
    <TemplateDuaContext.Provider value={value}>
      {children}
    </TemplateDuaContext.Provider>
  );
};

export const useTemplateDuaData = () => useContext(TemplateDuaContext);
