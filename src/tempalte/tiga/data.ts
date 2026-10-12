import type { CoupleBio, EventDetail, TimelineStory, BankAccount, GuestBookMessage } from './types';

export const ASSETS = {
  // Ornamen songket emas khas Minangkabau (atas & bawah)
  songketTop: 'https://digitalinviting.com/wp-content/uploads/2023/12/backg-png-1.png',
  songketBottom: 'https://digitalinviting.com/wp-content/uploads/2023/12/backg-png-1-e1670777116300-1.png',
  rumahGadang: 'https://digitalinviting.com/wp-content/uploads/2023/12/Makan-Khas-Nusantara-Padang-Minangkabau-e1670778860199-1.png',
  
  // Foto Pasangan
  coupleCover: 'https://digitalinviting.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-05-at-17.18.24.jpeg',
  groomPhoto: 'https://digitalinviting.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-05-at-17.18.25-2.jpeg',
  bridePhoto: 'https://digitalinviting.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-05-at-17.18.22-3.jpeg',
  
  // Musik latar saxophone cover "Sampai Jadi Debu" oleh Banda Neira
  bgMusic: 'https://digitalinviting.com/wp-content/uploads/2026/08/Sampai-Jadi-Debu-Banda-Neira-Saxophone-Cover-by-Dori-Wirawan-mp3cut.net_.mp3',
  
  // Bank Logos
  logoSeaBank: 'https://digitalinviting.com/wp-content/uploads/2025/05/SeaBank.svg.png',
  logoBNI: 'https://digitalinviting.com/wp-content/uploads/2026/04/PikPng.com_bni-logo-png_4896877-1.png',
  logoBRI: 'https://digitalinviting.com/wp-content/uploads/2026/04/1200px-BRI_2020.png',
};

export const WEDDING_INFO = {
  groomNickname: 'Yusron',
  brideNickname: 'Putri',
  weddingDateDisplay: 'Sabtu & Minggu - 19,20 September 2026',
  targetDate: '2026-09-19T10:00:00', // Untuk countdown timer
  googleCalendarUrl:
    'https://www.google.com/calendar/render?action=TEMPLATE&text=The+Wedding+Of+Yusron+%26+Putri&details=Terima+Kasih+telah+memberikan+doa+dan+restu+dalam+acara+pernikahan+kami&dates=20260919T030000Z/20260920T100000Z&ctz=Asia/Jakarta',
  physicalGiftAddress: 'Jl jati gaung no 142, Rt 005 Rw 008 Padang timur',
  whatsappConfirmUrl:
    'https://api.whatsapp.com/send?phone=6281276689829&text=Hai%20saya%20mau%20konfirmasi%20kado%20berupa',
};

export const GROOM_DATA: CoupleBio = {
  name: 'Yusron',
  fullName: 'Bripda Rahmat Yusron Ramadhan',
  childOrder: 'Anak Pertama dari :',
  father: 'Bapak Chaldra May Putra',
  mother: 'Ibu Tin Nova Riza',
  photoUrl: ASSETS.groomPhoto,
};

export const BRIDE_DATA: CoupleBio = {
  name: 'Putri',
  fullName: 'Desfitria Putri Efendi, Amd.M',
  childOrder: 'Anak Pertama dari :',
  father: 'Bapak Taufik Efendi',
  mother: 'Ibu Desi Fitriani',
  photoUrl: ASSETS.bridePhoto,
};

export const EVENTS: EventDetail[] = [
  {
    id: 'akad',
    title: 'Akad Nikah',
    dayName: 'Jumat',
    dayNumber: '18',
    monthName: 'September',
    year: '2026',
    time: 'Pukul : 13.00 WIB s/d selesai',
    locationName: 'Kediaman Mempelai Wanita',
    address: 'Jl Jati Gaung No. 142 Rt 005 Rw 008 Padang Timur',
    mapUrl: 'https://maps.app.goo.gl/mXVxEkrogox8YM5L6',
  },
  {
    id: 'resepsi-pria',
    title: 'Resepsi Mempelai Pria',
    dayName: 'Sabtu',
    dayNumber: '19',
    monthName: 'September',
    year: '2026',
    time: 'Pukul : 10.00 WIB s/d Selesai',
    locationName: 'Kediaman Mempelai Pria',
    address: 'Jl. Alang Laweh II No 10, Rt 011 Rw 003, Padang Selatan',
    mapUrl: 'https://maps.app.goo.gl/9JAxzzbazLAzQQM17',
  },
  {
    id: 'resepsi-wanita',
    title: 'Resepsi Mempelai Wanita',
    dayName: 'Minggu',
    dayNumber: '20',
    monthName: 'September',
    year: '2026',
    time: 'Pukul : 10.00 WIB s/d Selesai',
    locationName: 'Kediaman Mempelai Wanita',
    address: 'Jl. Jati Gaung No 142 Rt 005 Rw 008, Padang Timur',
    mapUrl: 'https://maps.app.goo.gl/yaLpaUhDX7w21xbV8',
  },
];

export const TIMELINE_STORIES: TimelineStory[] = [
  {
    id: '1',
    period: 'Maret 2023',
    title: 'Awal Bertemu',
    description:
      'Tak ada yang menyangka bahwa sebuah pertemuan singkat akan menjadi segalanya. Berawal dari sosial media, Yusron yang me-reply snapgram hingga kami menjalin sebuah hubungan asmara.',
  },
  {
    id: '2',
    period: 'April 2026',
    title: 'Komitmen',
    description:
      'Yusron datang ke rumah untuk melamar secara langsung kepada kedua orang tua, sebagai bukti niat tulus untuk serius ke jenjang yang lebih suci.',
  },
  {
    id: '3',
    period: 'September 2026',
    title: 'Pernikahan',
    description:
      'Atas restu keluarga dan ridho Allah SWT, kami memutuskan untuk mengikat janji suci pernikahan dan menyempurnakan ibadah seumur hidup.',
  },
];

export const BANK_ACCOUNTS: BankAccount[] = [
  {
    id: 'seabank',
    bankName: 'SeaBank',
    accountNumber: '901547500417',
    accountHolder: 'Desfitria Putri Efendi',
    logoUrl: ASSETS.logoSeaBank,
  },
  {
    id: 'bni',
    bankName: 'Bank BNI',
    accountNumber: '1793443985',
    accountHolder: 'Desfitria Putri Efendi',
    logoUrl: ASSETS.logoBNI,
  },
  {
    id: 'bri',
    bankName: 'Bank BRI',
    accountNumber: '204301024467505',
    accountHolder: 'Rahmat Yusron Ramadhan',
    logoUrl: ASSETS.logoBRI,
  },
];

export const GALLERY_PHOTOS: string[] = [
  'https://digitalinviting.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-05-at-17.18.27-1.jpeg',
  'https://digitalinviting.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-05-at-17.18.26.jpeg',
  'https://digitalinviting.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-05-at-17.18.26-3.jpeg',
  'https://digitalinviting.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-05-at-17.18.26-2.jpeg',
  'https://digitalinviting.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-05-at-17.18.26-1.jpeg',
  'https://digitalinviting.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-05-at-17.18.25.jpeg',
  'https://digitalinviting.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-05-at-17.18.25-1.jpeg',
  'https://digitalinviting.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-05-at-17.18.24.jpeg',
  'https://digitalinviting.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-05-at-17.18.24-2.jpeg',
  'https://digitalinviting.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-05-at-17.18.24-1.jpeg',
  'https://digitalinviting.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-05-at-17.18.23-2.jpeg',
  'https://digitalinviting.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-05-at-17.18.23-1.jpeg',
  'https://digitalinviting.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-05-at-17.18.22-2.jpeg',
  'https://digitalinviting.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-05-at-17.18.21.jpeg',
  'https://digitalinviting.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-05-at-17.18.21-1.jpeg',
  'https://digitalinviting.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-05-at-17.18.27.jpeg',
  'https://digitalinviting.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-10-at-02.45.03.jpeg',
  'https://digitalinviting.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-10-at-02.45.03-1.jpeg',
];

export const INITIAL_GUEST_MESSAGES: GuestBookMessage[] = [
  {
    id: '1',
    name: 'Auli dan Partner',
    status: 'hadir',
    message: 'Barakallahu lakum wa baraka alaikum wa jama\'a bainakuma fii khoir. Selamat menempuh hidup baru Yusron dan Putri, bahagia selalu dunia hingga akhirat!',
    createdAt: 'Baru saja',
  },
  {
    id: '2',
    name: 'Kompol Hendra & Keluarga',
    status: 'hadir',
    message: 'Selamat berbahagia untuk Bripda Yusron dan Nanda Putri. Semoga menjadi keluarga sakinah mawaddah warahmah.',
    createdAt: '1 jam yang lalu',
  },
  {
    id: '3',
    name: 'Dinda Rahmadani S.Pd',
    status: 'hadir',
    message: 'MasyaAllah tabarakallah lancar sampai hari H yaa Putri sayang! Cantik banget calon pengantin Minang!',
    createdAt: '3 jam yang lalu',
  },
  {
    id: '4',
    name: 'Rian & Istri',
    status: 'masih_ragu',
    message: 'InsyaAllah jika dinas tidak bentrok kami hadir bro Yusron. Sukses dan berkah acaranya!',
    createdAt: '5 jam yang lalu',
  },
];
