import { 
  Music, 
  Mail, 
  MapPin, 
  Image as ImageIcon, 
  MessageSquareHeart, 
  Clock, 
  ShieldCheck, 
  Smartphone,
  Sparkles,
  QrCode,
  CalendarCheck,
  Send
} from 'lucide-react';

export const Features = () => {
  const mainFeatures = [
    {
      icon: Music,
      tag: 'Audio Romantis',
      title: 'Background Music Otomatis',
      desc: 'Putar lagu romantis favorit secara otomatis saat tamu membuka undangan dengan kontrol play/pause yang nyaman.',
      accent: 'from-emerald-500/20 to-teal-500/10',
      iconColor: 'text-emerald-700 bg-emerald-100',
    },
    {
      icon: Mail,
      tag: 'Cashless & Aman',
      title: 'Amplop Digital & QRIS',
      desc: 'Terima kado pernikahan dan amplop digital langsung ke rekening bank atau dompet digital Anda tanpa potongan sepeser pun.',
      accent: 'from-amber-500/20 to-yellow-500/10',
      iconColor: 'text-amber-700 bg-amber-100',
    },
    {
      icon: CalendarCheck,
      tag: 'Tamu Terdata Rapi',
      title: 'Buku Tamu & RSVP Realtime',
      desc: 'Ketahui kepastian jumlah kehadiran tamu secara instan melalui sistem konfirmasi RSVP langsung ke WhatsApp & dashboard.',
      accent: 'from-blue-500/20 to-indigo-500/10',
      iconColor: 'text-blue-700 bg-blue-100',
    },
    {
      icon: MapPin,
      tag: 'Navigasi Presisi',
      title: 'Petunjuk Google Maps',
      desc: 'Tamu dapat dengan mudah menemukan lokasi gedung/rumah acara dengan navigasi satu klik ke Google Maps atau Waze.',
      accent: 'from-rose-500/20 to-pink-500/10',
      iconColor: 'text-rose-700 bg-rose-100',
    },
    {
      icon: ImageIcon,
      tag: 'Koleksi Memori',
      title: 'Galeri Foto & Video Sinematik',
      desc: 'Tampilkan foto prewedding dan video kenangan terbaik dalam layout galeri interaktif dengan lightbox layar penuh yang mewah.',
      accent: 'from-purple-500/20 to-violet-500/10',
      iconColor: 'text-purple-700 bg-purple-100',
    },
    {
      icon: MessageSquareHeart,
      tag: 'Doa Hangat',
      title: 'Ucapan & Doa Restu',
      desc: 'Keluarga, sahabat, dan rekan dapat menyampaikan ucapan doa restu yang langsung tampil estetik pada halaman undangan Anda.',
      accent: 'from-pink-500/20 to-rose-500/10',
      iconColor: 'text-pink-700 bg-pink-100',
    },
    {
      icon: Clock,
      tag: 'Hitung Mundur',
      title: 'Countdown Timer & Add to Calendar',
      desc: 'Pengingat otomatis hari bahagia dengan tombol pengingat langsung tersinkronisasi ke Google Calendar tamu undangan.',
      accent: 'from-emerald-500/20 to-cyan-500/10',
      iconColor: 'text-emerald-700 bg-emerald-100',
    },
    {
      icon: Send,
      tag: 'Personal & Elegan',
      title: 'Kustom Nama Tamu Tanpa Batas',
      desc: 'Generate nama tamu otomatis dalam tautan undangan ("Kepada Yth. Bpk/Ibu...") untuk pesan WhatsApp yang hangat dan sopan.',
      accent: 'from-amber-500/20 to-orange-500/10',
      iconColor: 'text-amber-700 bg-amber-100',
    },
    {
      icon: Smartphone,
      tag: 'Multi-Device',
      title: 'Responsif & Cepat Diakses',
      desc: 'Dioptimalkan agar undangan terbuka secepat kilat dan tampil mempesona di semua ukuran layar smartphone, tablet, maupun laptop.',
      accent: 'from-teal-500/20 to-emerald-500/10',
      iconColor: 'text-teal-700 bg-teal-100',
    },
  ];

  return (
    <section id="fitur" className="py-24 bg-[#fafbfc] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-100/40 rounded-full blur-[120px] pointer-events-none -z-0" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-bold tracking-wide uppercase shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Fitur Terlengkap &amp; Terpercaya</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Semua yang Anda Butuhkan untuk <br className="hidden sm:inline" />
            <span className="font-display-luxury italic font-bold text-[#165b39]">
              Undangan Digital Impian
            </span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Didesain khusus untuk memberikan pengalaman terbaik bagi Anda dan seluruh tamu undangan. Elegan, interaktif, dan bebas ribet.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {mainFeatures.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div
                key={index}
                className="group relative p-7 rounded-3xl bg-white border border-slate-200/80 hover:border-emerald-300 shadow-sm hover:shadow-[0_15px_35px_rgba(20,77,49,0.08)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar with Icon and Pill Tag */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-2xl ${feat.iconColor} flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform duration-200`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                      {feat.tag}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-slate-900 mb-2.5 group-hover:text-[#165b39] transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {feat.desc}
                  </p>
                </div>

                {/* Subtle Bottom Accent Line */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-800 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span>Termasuk di semua paket</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner Note */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#144d31] via-[#19613e] to-[#12422a] text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg sm:text-xl font-bold flex items-center gap-2 justify-center sm:justify-start">
              <span>Ingin fitur tambahan atau request khusus?</span>
              <QrCode className="w-5 h-5 text-amber-300" />
            </h4>
            <p className="text-emerald-100 text-xs sm:text-sm">
              Tim kami siap membantu integrasi barcode presensi, streaming Youtube/Zoom, hingga domain custom .com.
            </p>
          </div>
          <a
            href="https://wa.me/6281234567890?text=Halo%20Admin%20i%20say%20yes,%20saya%20mau%20tanya%20fitur%20undangan%20digital"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-slate-900 bg-amber-300 hover:bg-amber-200 active:scale-95 shadow-md transition-all cursor-pointer"
          >
            Konsultasi Gratis via WA
          </a>
        </div>

      </div>
    </section>
  );
};
