// --- Types & Interfaces for Template Satu ---

export interface RSVPItem {
  id: string;
  name: string;
  attendance: 'hadir' | 'tidak_hadir' | 'ragu';
  guestsCount: number;
  message: string;
  timestamp: string;
}

export interface StoryTimelineItem {
  id: number;
  date: string;
  badge: string;
  title: string;
  description: string;
  image: string;
}

export interface BankAccountItem {
  bank: string;
  accountNumber: string;
  holderName: string;
  badgeColor: string;
}

export interface SatuGalleryPhoto {
  id?: string | number;
  url: string;
  thumbnail?: string;
  caption?: string;
  orientation?: 'portrait' | 'landscape';
}
