import type { DashboardData, GuestItem, WishItem } from './types';

export const INITIAL_DATA: DashboardData = {
  tier: 'premium',
  slug: 'andi-rosna',
  isPublished: true,
  themeColor: '#82694D',
  activeTemplateId: 'template-empat',
  groom: {
    nickName: 'Andi',
    fullName: 'Andi Irawan, S.H., M.H.',
    parents: 'Putra ke-4 dari Bpk. Irianto & Ibu Nurleli (Alm)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    instagram: '@andi.irawan',
  },
  bride: {
    nickName: 'Rosna',
    fullName: 'Adv. Rosna Linny, S.H., Gr.',
    parents: 'Putri ke-2 dari Bpk. Adiswan & Ibu Emi',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    instagram: '@rosna.linny',
  },
  event: {
    date: '2026-10-24',
    dateDisplay: 'Sabtu, 24 Oktober 2026',
    akadTime: '08:00 - 10:00 WIB',
    akadPlace: 'Masjid Agung & Kediaman Mempelai',
    akadAddress: 'Jl. Jondul Rawang Blok C/20, Padang Selatan',
    resepsiTime: '11:00 - 17:00 WIB',
    resepsiPlace: 'Grand Ballroom & Kediaman',
    resepsiAddress: 'Jl. Jondul Rawang Blok C/20, Padang Selatan (Patokan: Depan Pos Ronda)',
    mapsUrl: 'https://maps.google.com/?q=Padang+Selatan',
  },
  musicTitle: 'Kahitna - Menikahimu (Acoustic Instrumental)',
  bankAccounts: [
    { id: 1, bank: 'Bank Mandiri', number: '111-00-1234567-8', holder: 'Andi Irawan' },
    { id: 2, bank: 'Bank BCA', number: '7182002890', holder: 'Rosna Linny' },
  ],
  giftAddress: {
    recipient: 'Andi Irawan & Rosna Linny',
    phone: '0812-3456-7890',
    address: 'Jl. Jondul Rawang Blok C/20, Padang Selatan, Kota Padang, Sumatera Barat 25215',
    notes: 'Mohon konfirmasi ke nomor penerima sebelum mengirimkan paket kado fisik.',
  },
};

export const INITIAL_GUESTS: GuestItem[] = [
  { id: 1, name: 'Bpk. Hendra & Ibu', phone: '6281234567890', category: 'Keluarga', sent: true, rsvp: 'hadir', pax: 2 },
  { id: 2, name: 'dr. Dimas Prasetyo', phone: '6281398765432', category: 'VIP', sent: true, rsvp: 'hadir', pax: 1 },
  { id: 3, name: 'Rina Oktaviani, S.Kom', phone: '6285712345678', category: 'Teman', sent: false, rsvp: 'ragu', pax: 1 },
  { id: 4, name: 'Om Surya & Tante Maya', phone: '6281987654321', category: 'Keluarga', sent: true, rsvp: 'hadir', pax: 3 },
  { id: 5, name: 'Fajar Nugraha', phone: '6282133445566', category: 'Teman', sent: false, rsvp: 'tidak', pax: 0 },
];

export const INITIAL_WISHES: WishItem[] = [
  { 
    id: 1, 
    name: 'dr. Dimas Prasetyo', 
    text: 'Barakallahu lakum wa baraka alaikum. Selamat menempuh hidup baru sahabatku Andi & Rosna! Semoga sakinah mawaddah warahmah selamanya.', 
    time: '10 menit yang lalu', 
    status: 'hadir' 
  },
  { 
    id: 2, 
    name: 'Bpk. Hendra & Ibu', 
    text: 'Selamat berbahagia untuk kedua mempelai dan keluarga besar. InsyaAllah kami sekeluarga hadir mendoakan langsung hari istimewa ini.', 
    time: '2 jam yang lalu', 
    status: 'hadir' 
  },
  { 
    id: 3, 
    name: 'Fajar Nugraha', 
    text: 'Mohon maaf sahabatku Andi belum bisa hadir karena dinas di luar kota. Doa terbaik untuk pernikahan kalian berdua, langgeng bahagia!', 
    time: '1 hari yang lalu', 
    status: 'tidak' 
  },
];
