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

export const getStorageKey = (userId?: string | number): string => {
  if (userId) return `ij_dashboard_data_${userId}`;
  try {
    const rawUser = localStorage.getItem('auth_user');
    if (rawUser) {
      const parsed = JSON.parse(rawUser);
      if (parsed?.id) return `ij_dashboard_data_${parsed.id}`;
      if (parsed?.email) return `ij_dashboard_data_${parsed.email}`;
    }
  } catch {}
  return 'ij_dashboard_data_guest';
};

export const getSavedDashboardData = (userId?: string | number): DashboardData => {
  if (typeof window === 'undefined') return INITIAL_DATA;
  try {
    const key = getStorageKey(userId);
    const raw = localStorage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw);
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

export const saveDashboardData = (data: DashboardData, userId?: string | number): void => {
  if (typeof window === 'undefined') return;
  try {
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
