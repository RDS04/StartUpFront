export interface CoupleBio {
  name: string;
  fullName: string;
  title?: string;
  father: string;
  mother: string;
  childOrder: string;
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
  id: string;
  period: string;
  title: string;
  description: string;
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  logoUrl?: string;
}

export interface GuestBookMessage {
  id: string;
  name: string;
  status: 'hadir' | 'tidak_hadir' | 'masih_ragu';
  message: string;
  createdAt: string;
}
