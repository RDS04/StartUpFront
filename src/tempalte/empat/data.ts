import type { CoupleBio, EventDetail, TimelineStory, BankAccount, GuestBookMessage, GalleryPhoto } from './types';
import { getSavedDashboardData } from '../../dashboard/initialData';

export const ASSETS = {
  // Ornamen Floral Daun Watercolor Khas Sage Garden
  leafCorner: 'https://undangandigitalhbkomp.com/wp-content/uploads/2023/09/WhatsApp_Image_2023-09-12_at_15.09.15-removebg-preview-1.png',
  bgTexture: 'https://undangandigitalhbkomp.com/wp-content/uploads/2023/09/Cover-Greenl.png',
  
  // Foto Mempelai (Dinamis dari Upload Dashboard)
  get coupleCover() {
    const d = getSavedDashboardData();
    return d.bride.avatar || d.groom.avatar || 'https://undangandigitalhbkomp.com/wp-content/uploads/2023/11/WhatsApp-Image-2023-11-14-at-09.11.57.jpeg';
  },
  get groomPhoto() {
    const d = getSavedDashboardData();
    return d.groom.avatar || 'https://undangandigitalhbkomp.com/wp-content/uploads/2023/11/WhatsApp-Image-2023-11-14-at-09.11.56.jpeg';
  },
  get bridePhoto() {
    const d = getSavedDashboardData();
    return d.bride.avatar || 'https://undangandigitalhbkomp.com/wp-content/uploads/2023/11/WhatsApp-Image-2023-11-14-at-09.11.56-1.jpeg';
  },
  get coupleHero() {
    const d = getSavedDashboardData();
    return d.groom.avatar || 'https://undangandigitalhbkomp.com/wp-content/uploads/2023/11/WhatsApp-Image-2023-11-14-at-09.11.57-1.jpeg';
  },
  get coupleClosing() {
    const d = getSavedDashboardData();
    return d.bride.avatar || 'https://undangandigitalhbkomp.com/wp-content/uploads/2023/11/WhatsApp-Image-2023-11-14-at-09.11.58.jpeg';
  },
  
  // Musik Latar
  bgMusic: 'https://undangandigitalhbkomp.com/wp-content/uploads/2023/05/Marry-Your-Daughter-Brian-Mcknight-Lyrics-video-dan-terjemahan.mp3',
  
  // Bank & E-Wallet Logos
  bankNagariLogo: 'https://undangandigitalhbkomp.com/wp-content/uploads/2023/05/bank_nagari-removebg-preview.png',
  danaLogo: 'https://undangandigitalhbkomp.com/wp-content/uploads/2023/04/download__1_-removebg-preview.png',
  chipAtm: 'https://undangandigitalhbkomp.com/wp-content/uploads/elementor/thumbs/chip-atm-qce6y97lky0u1ttwdh4v7jl5tsrqpebvszct0429v8.png',
};

export const WEDDING_INFO = {
  get groomNickname() {
    return getSavedDashboardData().groom.nickName || 'Andi';
  },
  get brideNickname() {
    return getSavedDashboardData().bride.nickName || 'Rosna';
  },
  get coupleDisplay() {
    const d = getSavedDashboardData();
    return `${d.groom.nickName} & ${d.bride.nickName}`;
  },
  get weddingDateDisplay() {
    return getSavedDashboardData().event.dateDisplay || 'Sabtu, 24 Oktober 2026';
  },
  get targetDate() {
    const d = getSavedDashboardData();
    return `${d.event.date || '2026-10-24'}T08:00:00`;
  },
  googleCalendarUrl:
    'https://www.google.com/calendar/render?action=TEMPLATE&text=The+Wedding+Of+Andi+%26+Rosna',
  get physicalGiftAddress() {
    return getSavedDashboardData().giftAddress?.address || 'Padang, Sumatera Barat';
  },
  whatsappRsvpNumber: '6281234567890',
};

export const BRIDE_DATA: CoupleBio = {
  get name() {
    return getSavedDashboardData().bride.nickName || 'Rosna';
  },
  get fullName() {
    return getSavedDashboardData().bride.fullName || 'Adv. Rosna Linny, S.H., Gr.';
  },
  childOrder: 'Mempelai Wanita :',
  get father() {
    return getSavedDashboardData().bride.parents || 'Putri dari Bpk. Adiswan & Ibu Emi';
  },
  mother: '',
  get photoUrl() {
    return getSavedDashboardData().bride.avatar || 'https://undangandigitalhbkomp.com/wp-content/uploads/2023/11/WhatsApp-Image-2023-11-14-at-09.11.56-1.jpeg';
  },
  get instagram() {
    return getSavedDashboardData().bride.instagram || 'https://instagram.com';
  },
};

export const GROOM_DATA: CoupleBio = {
  get name() {
    return getSavedDashboardData().groom.nickName || 'Andi';
  },
  get fullName() {
    return getSavedDashboardData().groom.fullName || 'Andi Irawan, S.H., M.H.';
  },
  childOrder: 'Mempelai Pria :',
  get father() {
    return getSavedDashboardData().groom.parents || 'Putra dari Bpk. Irianto & Ibu Nurleli';
  },
  mother: '',
  get photoUrl() {
    return getSavedDashboardData().groom.avatar || 'https://undangandigitalhbkomp.com/wp-content/uploads/2023/11/WhatsApp-Image-2023-11-14-at-09.11.56.jpeg';
  },
  get instagram() {
    return getSavedDashboardData().groom.instagram || 'https://instagram.com';
  },
};

export const EVENTS: EventDetail[] = [
  {
    id: 'akad',
    title: 'Akad Nikah',
    dayName: 'Sabtu',
    dayNumber: '24',
    monthName: 'Oktober',
    year: '2026',
    get time() {
      return getSavedDashboardData().event.akadTime || 'Pukul 08.00 - 10.00 WIB';
    },
    get locationName() {
      return getSavedDashboardData().event.akadPlace || 'Masjid Agung & Kediaman Mempelai';
    },
    get address() {
      return getSavedDashboardData().event.akadAddress || 'Jl. Jondul Rawang Blok C/20, Padang Selatan';
    },
    get mapUrl() {
      return getSavedDashboardData().event.mapsUrl || 'https://maps.google.com';
    },
  },
  {
    id: 'resepsi',
    title: 'Resepsi Pernikahan',
    dayName: 'Sabtu',
    dayNumber: '24',
    monthName: 'Oktober',
    year: '2026',
    get time() {
      return getSavedDashboardData().event.resepsiTime || 'Pukul 11.00 - 17.00 WIB';
    },
    get locationName() {
      return getSavedDashboardData().event.resepsiPlace || 'Grand Ballroom & Kediaman';
    },
    get address() {
      return getSavedDashboardData().event.resepsiAddress || 'Jl. Jondul Rawang Blok C/20, Padang Selatan';
    },
    get mapUrl() {
      return getSavedDashboardData().event.mapsUrl || 'https://maps.google.com';
    },
  },
];

export const STORIES: TimelineStory[] = [
  {
    year: '2019',
    title: 'Awal Pertemuan',
    story: 'Berawal dari perkenalan yang sederhana di bangku perkuliahan, kami mulai saling bertukar cerita dan menyadari adanya kesamaan mimpi serta visi kehidupan.',
  },
  {
    year: '2021',
    title: 'Masa Pendewasaan & Komitmen',
    story: 'Waktu demi waktu menguji kesabaran dan ketulusan hati. Kami bertekad untuk saling menjaga, saling mendukung dalam meraih cita-cita, dan mempererat komitmen bersama.',
  },
  {
    year: '2023',
    title: 'Menuju Ikatan Suci',
    story: 'Dengan restu kedua orang tua dan keyakinan hati atas izin Allah SWT, kami melangkah menuju hari bahagia pernikahan untuk menyempurnakan separuh agama.',
  },
];

export const BANK_ACCOUNTS: BankAccount[] = [
  {
    id: 'bank-nagari',
    bankName: 'Bank Nagari',
    accountNumber: '10050213051101',
    accountHolder: 'Silvana Reza Anggraini',
    logoUrl: ASSETS.bankNagariLogo,
    type: 'bank',
  },
  {
    id: 'dana-ewallet',
    bankName: 'DANA / E-Wallet',
    accountNumber: '082391680946',
    accountHolder: 'Silvana Reza Anggraini',
    logoUrl: ASSETS.danaLogo,
    type: 'wallet',
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'p1',
    url: 'https://undangandigitalhbkomp.com/wp-content/uploads/2023/11/WhatsApp-Image-2023-11-14-at-09.11.56.jpeg',
    thumbnail: 'https://undangandigitalhbkomp.com/wp-content/uploads/2023/11/WhatsApp-Image-2023-11-14-at-09.11.56.jpeg',
    caption: 'Momen penuh kebahagiaan Eza & Islammy',
    orientation: 'portrait',
  },
  {
    id: 'p2',
    url: 'https://undangandigitalhbkomp.com/wp-content/uploads/2023/11/WhatsApp-Image-2023-11-14-at-09.11.56-1.jpeg',
    thumbnail: 'https://undangandigitalhbkomp.com/wp-content/uploads/2023/11/WhatsApp-Image-2023-11-14-at-09.11.56-1.jpeg',
    caption: 'Senyuman hangat dalam balutan busana adat',
    orientation: 'portrait',
  },
  {
    id: 'p3',
    url: 'https://undangandigitalhbkomp.com/wp-content/uploads/2023/11/WhatsApp-Image-2023-11-14-at-09.11.57.jpeg',
    thumbnail: 'https://undangandigitalhbkomp.com/wp-content/uploads/2023/11/WhatsApp-Image-2023-11-14-at-09.11.57.jpeg',
    caption: 'Langkah awal menyongsong masa depan berdua',
    orientation: 'portrait',
  },
  {
    id: 'p4',
    url: 'https://undangandigitalhbkomp.com/wp-content/uploads/2023/11/WhatsApp-Image-2023-11-14-at-09.11.57-1.jpeg',
    thumbnail: 'https://undangandigitalhbkomp.com/wp-content/uploads/2023/11/WhatsApp-Image-2023-11-14-at-09.11.57-1.jpeg',
    caption: 'Kebersamaan yang penuh cinta dan ketenangan',
    orientation: 'portrait',
  },
  {
    id: 'p5',
    url: 'https://undangandigitalhbkomp.com/wp-content/uploads/2023/11/WhatsApp-Image-2023-11-14-at-09.11.57-2.jpeg',
    thumbnail: 'https://undangandigitalhbkomp.com/wp-content/uploads/2023/11/WhatsApp-Image-2023-11-14-at-09.11.57-2.jpeg',
    caption: 'Tatap penuh ketulusan',
    orientation: 'landscape',
  },
  {
    id: 'p6',
    url: 'https://undangandigitalhbkomp.com/wp-content/uploads/2023/11/WhatsApp-Image-2023-11-14-at-09.11.58.jpeg',
    thumbnail: 'https://undangandigitalhbkomp.com/wp-content/uploads/2023/11/WhatsApp-Image-2023-11-14-at-09.11.58.jpeg',
    caption: 'Kasih sayang yang abadi hingga akhir hayat',
    orientation: 'portrait',
  },
  {
    id: 'p7',
    url: 'https://undangandigitalhbkomp.com/wp-content/uploads/2023/11/WhatsApp-Image-2023-11-14-at-09.11.58-1.jpeg',
    thumbnail: 'https://undangandigitalhbkomp.com/wp-content/uploads/2023/11/WhatsApp-Image-2023-11-14-at-09.11.58-1.jpeg',
    caption: 'Janji suci untuk saling melengkapi selamanya',
    orientation: 'portrait',
  },
];

export const INITIAL_GUEST_BOOK: GuestBookMessage[] = [
  {
    id: 'gb-1',
    name: 'Reyhan & Partner',
    attendance: 'Hadir',
    message: 'Barakallahu lakum wa baraka alaikum! Selamat menempuh hidup baru Eza & Islammy, semoga menjadi keluarga sakinah, mawaddah, warahmah sampai ke surga-Nya. Aamiin ya rabbal alamin.',
    timeAgo: '2 jam yang lalu',
  },
  {
    id: 'gb-2',
    name: 'Dinda Rahmadani',
    attendance: 'Hadir',
    message: 'Selamat ya Kak Eza dan Bang Islammy! Cantik dan ganteng banget, lancar sampai hari H dan bahagia selalu! 💐✨',
    timeAgo: '4 jam yang lalu',
  },
  {
    id: 'gb-3',
    name: 'Keluarga Besar Bpk. Hendri',
    attendance: 'Hadir',
    message: 'Selamat untuk kedua mempelai dan keluarga besar. Semoga pernikahan ini senantiasa diberkahi rahmat dan rezeki berlimpah.',
    timeAgo: '1 hari yang lalu',
  },
  {
    id: 'gb-4',
    name: 'Fajar Nugraha',
    attendance: 'Tidak hadir',
    message: 'Mohon maaf belum bisa hadir langsung karena dinas di luar kota. Doa terbaik selalu menyertai kalian berdua, samawa selalu ya brader!',
    timeAgo: '1 hari yang lalu',
  },
];
