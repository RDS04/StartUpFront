export type DashboardTab = 'overview' | 'bride_event' | 'guests' | 'rsvps' | 'accounts' | 'gallery';

export interface GalleryPhotoItem {
  id: string | number;
  url: string;
  thumbnail?: string;
  caption?: string;
  orientation?: 'portrait' | 'landscape';
}

export interface GroomBrideInfo {
  nickName: string;
  fullName: string;
  parents: string;
  avatar: string;
  instagram?: string;
}

export interface EventInfo {
  date: string;
  dateDisplay: string;
  akadTime: string;
  akadPlace: string;
  akadAddress: string;
  akadMapsUrl?: string;
  resepsiTime: string;
  resepsiPlace: string;
  resepsiAddress: string;
  resepsiMapsUrl?: string;
  mapsUrl: string;
}

export interface BankAccount {
  id: number;
  bank: string;
  number: string;
  holder: string;
  qrCodeUrl?: string;
  cardTheme?: string;
  type?: 'bank' | 'wallet';
  logoUrl?: string;
}

export interface DashboardData {
  tier: 'silver' | 'premium' | 'gold' | 'platinum';
  slug: string;
  isPublished: boolean;
  themeColor: string;
  activeTemplateId?: string;
  purchasedTemplateIds?: string[];
  groom: GroomBrideInfo;
  bride: GroomBrideInfo;
  event: EventInfo;
  musicTitle: string;
  bankAccounts: BankAccount[];
  giftAddress?: {
    recipient: string;
    phone: string;
    address: string;
    notes?: string;
  };
  gallery?: GalleryPhotoItem[];
}

export interface GuestItem {
  id: number;
  name: string;
  phone: string;
  category: 'Keluarga' | 'Teman' | 'VIP' | string;
  sent: boolean;
  rsvp: 'hadir' | 'tidak' | 'ragu' | 'menunggu';
  pax: number;
}

export interface WishItem {
  id: number;
  name: string;
  text: string;
  time: string;
  status: 'hadir' | 'tidak' | 'ragu';
  pax?: number;
}

export interface TierConfig {
  name: string;
  tierId: 'silver' | 'premium' | 'gold' | 'platinum';
  maxGuests: number;
  canCustomMusic: boolean;
  canExport: boolean;
  maxBank: number;
  badge: string;
  badgeColor: string;
}

export interface DashboardPageProps {
  currentUser?: {
    id?: string | number;
    name?: string;
    email?: string;
    role?: string;
    avatar?: string;
  } | null;
  onLogout?: () => void;
  onBackToHome?: () => void;
  onNavigatePricing?: () => void;
  onNavigateTemplates?: () => void;
  onNavigatePayment?: () => void;
  onPreviewTemplate?: (previewRoute: string) => void;
}
