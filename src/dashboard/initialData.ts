import type { DashboardData, GuestItem, WishItem } from './types';

export const INITIAL_DATA: DashboardData = {
  tier: 'premium',
  slug: '',
  isPublished: true,
  themeColor: '#82694D',
  activeTemplateId: 'template-empat',
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
    date: '',
    dateDisplay: '',
    akadTime: '',
    akadPlace: '',
    akadAddress: '',
    resepsiTime: '',
    resepsiPlace: '',
    resepsiAddress: '',
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
        groom: { ...INITIAL_DATA.groom, ...(parsed.groom || {}) },
        bride: { ...INITIAL_DATA.bride, ...(parsed.bride || {}) },
        event: { ...INITIAL_DATA.event, ...(parsed.event || {}) },
        bankAccounts: Array.isArray(parsed.bankAccounts) ? parsed.bankAccounts : [],
        giftAddress: { ...INITIAL_DATA.giftAddress, ...(parsed.giftAddress || {}) },
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

export const INITIAL_WISHES: WishItem[] = [];
