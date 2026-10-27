import type { DashboardData, GuestItem, WishItem, StoryItem } from './types';

export const INITIAL_STORIES: StoryItem[] = [
  {
    id: 'story-1',
    year: '2019',
    chapter: 'CHAPTER 01',
    title: 'AWAL PERTEMUAN',
    story: 'Berawal dari perkenalan yang sederhana di bangku perkuliahan, kami mulai saling bertukar cerita dan menyadari adanya kesamaan mimpi serta visi kehidupan.',
    image: '',
  },
  {
    id: 'story-2',
    year: '2021',
    chapter: 'CHAPTER 02',
    title: 'MASA PENDEWASAAN & KOMITMEN',
    story: 'Waktu demi waktu menguji kesabaran dan ketulusan hati. Kami bertekad untuk saling menjaga, saling mendukung dalam meraih cita-cita, dan mempererat komitmen bersama.',
    image: '',
  },
  {
    id: 'story-3',
    year: '2023',
    chapter: 'CHAPTER 03',
    title: 'MENUJU IKATAN SUCI',
    story: 'Dengan restu kedua orang tua dan keyakinan hati atas izin Allah SWT, kami melangkah menuju hari bahagia pernikahan untuk menyempurnakan separuh agama.',
    image: '',
  },
];

export const INITIAL_DATA: DashboardData = {
  tier: 'premium',
  slug: '',
  isPublished: true,
  themeColor: '#82694D',
  activeTemplateId: 'template-satu',
  purchasedTemplateIds: [],
  groom: {
    nickName: '',
    fullName: '',
    parents: '',
    avatar: '',
    instagram: '',
  },
  bride: {
    nickName: '',
    fullName: '',
    parents: '',
    avatar: '',
    instagram: '',
  },
  event: {
    startDate: '',
    startTime: '08:00',
    date: '',
    endDate: '',
    countdownTime: '08:00',
    countdownTarget: 'end',
    dateDisplay: '',
    akadTime: '',
    akadPlace: '',
    akadAddress: '',
    akadMapsUrl: '',
    resepsiTime: '',
    resepsiPlace: '',
    resepsiAddress: '',
    resepsiMapsUrl: '',
    mapsUrl: '',
  },
  musicTitle: '',
  bankAccounts: [],
  giftAddress: {
    recipient: '',
    phone: '',
    address: '',
    notes: '',
  },
  gallery: [],
  stories: INITIAL_STORIES,
};

export const getStorageKey = (userId?: string | number, templateId?: string): string => {
  let userPart = 'guest';
  if (userId) {
    userPart = String(userId);
  } else {
    try {
      const rawUser = localStorage.getItem('auth_user');
      if (rawUser) {
        const parsed = JSON.parse(rawUser);
        if (parsed?.id) userPart = String(parsed.id);
        else if (parsed?.email) userPart = String(parsed.email);
      }
    } catch {}
  }

  if (templateId) {
    return `ij_dashboard_data_${userPart}_${templateId}`;
  }
  return `ij_dashboard_data_${userPart}`;
};

export const getDefaultDashboardDataForTemplate = (
  templateId: string,
  tier: 'silver' | 'gold' | 'platinum' | 'premium' = 'premium'
): DashboardData => {
  return {
    ...INITIAL_DATA,
    activeTemplateId: templateId,
    tier: tier,
    slug: '',
    groom: {
      nickName: '',
      fullName: '',
      parents: '',
      avatar: '',
      instagram: '',
    },
    bride: {
      nickName: '',
      fullName: '',
      parents: '',
      avatar: '',
      instagram: '',
    },
    event: {
      startDate: '',
      startTime: '08:00',
      date: '',
      endDate: '',
      countdownTime: '08:00',
      countdownTarget: 'end',
      dateDisplay: '',
      akadTime: '',
      akadPlace: '',
      akadAddress: '',
      akadMapsUrl: '',
      resepsiTime: '',
      resepsiPlace: '',
      resepsiAddress: '',
      resepsiMapsUrl: '',
      mapsUrl: '',
    },
    musicTitle: '',
    bankAccounts: [],
    giftAddress: {
      recipient: '',
      phone: '',
      address: '',
      notes: '',
    },
    gallery: [],
    stories: INITIAL_STORIES,
  };
};

export const getSavedDashboardData = (userId?: string | number, templateId?: string): DashboardData => {
  if (typeof window === 'undefined') return INITIAL_DATA;
  try {
    // 1. Jika ada templateId tertentu, prioritaskan membaca key template tersebut
    if (templateId) {
      const templateKey = getStorageKey(userId, templateId);
      const rawTmpl = localStorage.getItem(templateKey);
      if (rawTmpl) {
        const parsed = JSON.parse(rawTmpl);
        return {
          ...INITIAL_DATA,
          ...parsed,
          activeTemplateId: templateId,
          purchasedTemplateIds: Array.isArray(parsed.purchasedTemplateIds) ? parsed.purchasedTemplateIds : [],
          groom: { ...INITIAL_DATA.groom, ...(parsed.groom || {}) },
          bride: { ...INITIAL_DATA.bride, ...(parsed.bride || {}) },
          event: { ...INITIAL_DATA.event, ...(parsed.event || {}) },
          bankAccounts: Array.isArray(parsed.bankAccounts) ? parsed.bankAccounts : [],
          giftAddress: { ...INITIAL_DATA.giftAddress, ...(parsed.giftAddress || {}) },
          gallery: Array.isArray(parsed.gallery) ? parsed.gallery : [],
          stories: Array.isArray(parsed.stories) ? parsed.stories : INITIAL_STORIES,
        };
      }
      return getDefaultDashboardDataForTemplate(templateId);
    }

    // 2. Jika tidak ada templateId, baca key user aktif
    const key = getStorageKey(userId);
    const raw = localStorage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw);
      const currentTid = parsed.activeTemplateId;
      
      // Jika ada data spesifik template yang tersimpan, gabungkan
      if (currentTid) {
        const tmplRaw = localStorage.getItem(getStorageKey(userId, currentTid));
        if (tmplRaw) {
          const tmplParsed = JSON.parse(tmplRaw);
          return {
            ...INITIAL_DATA,
            ...parsed,
            ...tmplParsed,
            activeTemplateId: currentTid,
            purchasedTemplateIds: Array.isArray(parsed.purchasedTemplateIds) ? parsed.purchasedTemplateIds : [],
            groom: { ...INITIAL_DATA.groom, ...(tmplParsed.groom || {}) },
            bride: { ...INITIAL_DATA.bride, ...(tmplParsed.bride || {}) },
            event: { ...INITIAL_DATA.event, ...(tmplParsed.event || {}) },
            bankAccounts: Array.isArray(tmplParsed.bankAccounts) ? tmplParsed.bankAccounts : [],
            giftAddress: { ...INITIAL_DATA.giftAddress, ...(tmplParsed.giftAddress || {}) },
            gallery: Array.isArray(tmplParsed.gallery) ? tmplParsed.gallery : [],
            stories: Array.isArray(tmplParsed.stories) ? tmplParsed.stories : INITIAL_STORIES,
          };
        }
      }

      return {
        ...INITIAL_DATA,
        ...parsed,
        purchasedTemplateIds: Array.isArray(parsed.purchasedTemplateIds) ? parsed.purchasedTemplateIds : [],
        groom: { ...INITIAL_DATA.groom, ...(parsed.groom || {}) },
        bride: { ...INITIAL_DATA.bride, ...(parsed.bride || {}) },
        event: { ...INITIAL_DATA.event, ...(parsed.event || {}) },
        bankAccounts: Array.isArray(parsed.bankAccounts) ? parsed.bankAccounts : [],
        giftAddress: { ...INITIAL_DATA.giftAddress, ...(parsed.giftAddress || {}) },
        gallery: Array.isArray(parsed.gallery) ? parsed.gallery : [],
        stories: Array.isArray(parsed.stories) ? parsed.stories : INITIAL_STORIES,
      };
    }
  } catch {}
  return INITIAL_DATA;
};

export const saveDashboardData = (data: DashboardData, userId?: string | number, templateId?: string): void => {
  if (typeof window === 'undefined') return;
  try {
    const tid = templateId || data.activeTemplateId;
    // Simpan ke key spesifik template
    if (tid) {
      const templateKey = getStorageKey(userId, tid);
      localStorage.setItem(templateKey, JSON.stringify(data));
    }
    // Simpan juga ke key umum user
    const key = getStorageKey(userId);
    localStorage.setItem(key, JSON.stringify(data));
  } catch {}
};

export const clearAllDashboardData = (): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem('ij_dashboard_data');
    localStorage.removeItem('ij_dashboard_data_guest');
    const toRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith('ij_dashboard_data') || key.startsWith('ij_guests') || key.startsWith('ij_wishes'))) {
        toRemove.push(key);
      }
    }
    toRemove.forEach((k) => localStorage.removeItem(k));
  } catch {}
};

export const INITIAL_GUESTS: GuestItem[] = [];

export const getSavedGuests = (userId?: string | number): GuestItem[] => {
  if (typeof window === 'undefined') return INITIAL_GUESTS;
  try {
    const key = userId ? `ij_guests_${userId}` : 'ij_guests_guest';
    const raw = localStorage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {}
  return INITIAL_GUESTS;
};

export const saveGuests = (guests: GuestItem[], userId?: string | number): void => {
  if (typeof window === 'undefined') return;
  try {
    const key = userId ? `ij_guests_${userId}` : 'ij_guests_guest';
    localStorage.setItem(key, JSON.stringify(guests));
  } catch {}
};

export const INITIAL_WISHES: WishItem[] = [];

export const getSavedWishes = (userId?: string | number): WishItem[] => {
  if (typeof window === 'undefined') return INITIAL_WISHES;
  try {
    const key = userId ? `ij_wishes_${userId}` : 'ij_wishes_guest';
    const raw = localStorage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {}
  return INITIAL_WISHES;
};

export const saveWishes = (wishes: WishItem[], userId?: string | number): void => {
  if (typeof window === 'undefined') return;
  try {
    const key = userId ? `ij_wishes_${userId}` : 'ij_wishes_guest';
    localStorage.setItem(key, JSON.stringify(wishes));
  } catch {}
};
