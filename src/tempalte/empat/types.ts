export interface CoupleBio {
  name: string;
  fullName: string;
  childOrder: string;
  father: string;
  mother: string;
  photoUrl: string;
  instagram?: string;
}

export interface EventDetail {
  id: string;
  title: string;
  dayName: string;
  dayNumber: string;
  monthName: string;
  year: string;
  time: string;
  locationName: string;
  address: string;
  mapUrl: string;
}

export interface TimelineStory {
  year: string;
  title: string;
  story: string;
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  logoUrl?: string;
  type: 'bank' | 'wallet';
  cardTheme?: string;
}

export interface GuestBookMessage {
  id: string;
  name: string;
  attendance: 'Hadir' | 'Tidak hadir' | 'Masih Ragu';
  message: string;
  timeAgo: string;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  thumbnail: string;
  caption?: string;
  orientation?: 'landscape' | 'portrait';
}
