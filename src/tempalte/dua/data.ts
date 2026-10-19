// =====================================================================
// DATA UNDANGAN — TEMPLATE DUA ("Dusty Rose Lily")
// Ubah semua konten undangan cukup dari file ini.
// Catatan: URL foto di bawah masih mengarah ke aset undangan referensi.
// Untuk produksi, simpan foto di /src/assets/templateDua lalu import di sini.
// =====================================================================

const CDN = 'https://assets.satumomen.com/images';

export const PHOTOS = {
  cover: `${CDN}/invitation/bg-section-101089281789112220.jpg`,
  quoteArch: `${CDN}/galleries/907791-gallery-TqU6H1FAAs.jpg`,
  bride: `${CDN}/invitation/bg-section-101089291789008890.jpg`,
  groom: `${CDN}/invitation/bg-section-101089301788958811.jpg`,
  akad: `${CDN}/invitation/bg-section-101089311788958870.jpg`,
  resepsi1: `${CDN}/invitation/bg-section-101090721789112101.jpg`,
  resepsi2: `${CDN}/invitation/bg-section-101254791789194745.jpg`,
  doa: `${CDN}/invitation/bg-section-101091081788959395.jpg`,
  closing: `${CDN}/invitation/bg-section-101089351788959349.jpg`,
};

export const GALLERY: string[] = [
  'duXNBO9cDL',
  'MHXODbcCmd',
  'ekI9OQP65Z',
  'nbECRFp23e',
  '2RrYc3hGzA',
  '6A5gfnjnwM',
  'TqU6H1FAAs',
  '8SaFXznyIe',
  'b08ZuP0fMe',
].map((id) => `${CDN}/galleries/907791-gallery-${id}.jpg`);

export const MUSIC_URL =
  'https://assets.satumomen.com/musics/d84b193f68cca8caf587b656766f31d8-1.mp3';

export const COUPLE = {
  shortBride: 'Vani',
  shortGroom: 'Rahmat',
  dateShort: '10.10.26',
  // Dipakai untuk countdown (Resepsi I)
  targetDate: '2026-10-10T11:00:00+07:00',
  bride: {
    name: 'Listia Rivani, S.Pd',
    parents: 'Putri pertama dari',
    parentNames: 'Bapak S. Datuak Rajo Sinaro & Ibu Ernawilis',
    instagram: 'listiarivany_28',
  },
  groom: {
    name: 'Rahmat Putra, A.Md.T',
    parents: 'Putra kedua dari',
    parentNames: 'Bapak Osman & Ibu Warlis',
    instagram: 'rahmadputra28',
  },
};

export const QUOTE = {
  text: 'Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.',
  source: 'Surah Ar-Rum : 21',
};

export const AKAD = {
  title: 'Akad Nikah',
  day: 'Jumat',
  date: '09',
  monthYear: 'Oktober 2026',
  time: 'Pukul 08.00 WIB s/d Selesai',
  venue: 'Masjid Raya Ampalu',
  address: 'Jorong Guguak, Nagari Ampalu',
  mapsUrl: 'https://maps.app.goo.gl/FPBejhMU7zuZFPw59',
};

export interface ResepsiItem {
  numeral: string;
  date: string;
  time: string;
  place: string;
  address: string;
  mapsLabel: string;
  mapsUrl: string;
  photo: string;
}

export const RESEPSI: ResepsiItem[] = [
  {
    numeral: 'I',
    date: 'Sabtu, 10 Oktober 2026',
    time: '11.00 WIB - Selesai',
    place: 'Kediaman Mempelai Pria',
    address: 'Jorong Guguak, Nagari Ampalu',
    mapsLabel: 'Maps 1',
    mapsUrl: 'https://maps.app.goo.gl/FPBejhMU7zuZFPw59',
    photo: PHOTOS.resepsi1,
  },
  {
    numeral: 'II',
    date: 'Senin, 12 Oktober 2026',
    time: '11.00 WIB - Selesai',
    place: 'Kediaman Mempelai Wanita',
    address: 'Jorong Padang Aur, Nagari Ampalu',
    mapsLabel: 'Maps 2',
    mapsUrl: 'https://maps.app.goo.gl/TMHJLRVq2mcvFPbe6',
    photo: PHOTOS.resepsi2,
  },
];

export const GIFT = {
  intro:
    'Terima kasih telah menambah semangat kegembiraan pernikahan kami dengan kehadiran dan hadiah indah Anda.',
  accounts: [
    { bank: 'BNI', number: '1889814364', holder: 'Listia Rivani' },
    { bank: 'BNI', number: '1859311285', holder: 'Rahmat Putra' },
  ],
  address:
    'Jorong Padang Aur, Nagari Ampalu, Kecamatan Lareh Sago Halaban, Kabupaten Lima Puluh Kota',
};

export const DOA = {
  text: '"Semoga Allah memberkahimu di waktu bahagia dan memberkahimu di waktu susah, dan mengumpulkan kalian berdua dalam kebaikan"',
  source: '[HR. Abu Daud]',
};

export const LOVE_STORY = [
  {
    title: 'First Chapter : Encounter',
    text: 'Cinta kami adalah cerita tentang dua jiwa yang bertemu tanpa disengaja. Tidak ada yang menyangka, sebuah pertemuan biasa justru menjadi awal dari kisah luar biasa.',
  },
  {
    title: 'Second Chapter : Destiny',
    text: 'Dari obrolan ringan hingga diskusi mendalam, kami menemukan bahwa kami saling melengkapi. Setiap langkah dalam perjalanan takdir ini, telah membawa kami lebih dekat satu sama lain.',
  },
  {
    title: 'Final Chapter : Forever Starts Here',
    text: 'Dengan penuh rasa syukur, kami ingin merayakan cinta kami di hari yang istimewa. Cinta yang sakral, cinta yang bermuara pada cinta-Nya.',
  },
];

export const CLOSING = {
  text: 'Merupakan suatu kebahagiaan dan kehormatan bagi kami, apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan do’a restu kepada kedua mempelai.',
  thanks: 'Kami yang berbahagia',
};
