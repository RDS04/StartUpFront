import { Copy, Gift, MapPin, Sparkles } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { RoseFloralDivider } from '../components/RoseFloralDivider';
import type { BankAccountItem } from '../types';

const galleryPhotos = [
  {
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    caption: 'Momen Bahagia Bersama'
  },
  {
    url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
    caption: 'Senyum Penuh Kasih'
  },
  {
    url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80',
    caption: 'Langkah Awal Menuju Abadi'
  },
  {
    url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80',
    caption: 'Genggaman Tangan Penuh Keyakinan'
  },
  {
    url: 'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=800&q=80',
    caption: 'Dalam Naungan Kasih Sayang'
  },
  {
    url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80',
    caption: 'Menatap Masa Depan Berdua'
  }
];

const bankAccounts: BankAccountItem[] = [
  {
    bank: 'Bank Central Asia (BCA)',
    accountNumber: '8730491230',
    holderName: 'Andi Irawan',
    badgeColor: 'bg-[#005B9C]'
  },
  {
    bank: 'Bank Mandiri',
    accountNumber: '1370019284912',
    holderName: 'Rosna Linny',
    badgeColor: 'bg-[#003B70]'
  }
];

interface GaleriSectionProps {
  onOpenLightbox: (url: string) => void;
  onCopy: (text: string, label: string) => void;
}

const GaleriSection: React.FC<GaleriSectionProps> = ({ onOpenLightbox, onCopy }) => {
  return (
    <section className="relative py-12 px-6 z-10 space-y-8 bg-[#F5EFEB]/60">
      {/* Gallery Header */}
      <ScrollReveal variant="up">
        <div className="text-center space-y-2 relative">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#8B263E] font-bold block">
            MOMEN TERINDAH
          </span>
          <h3 className="font-serif-wedding text-2xl sm:text-3xl font-bold text-[#4A1521]">
            Galeri Prewedding
          </h3>
          <p className="text-xs text-[#706456]">
            Sentuhan rasa dalam rangkaian bingkai kenangan kami.
          </p>
          <div className="flex justify-center pt-1">
            <RoseFloralDivider className="w-24 h-5" color="#8B263E" />
          </div>
        </div>
      </ScrollReveal>

      {/* Photo Grid */}
      <ScrollReveal variant="zoom">
        <div className="grid grid-cols-2 gap-3">
          {galleryPhotos.map((photo, idx) => (
            <div
              key={idx}
              onClick={() => onOpenLightbox(photo.url)}
              className={`relative rounded-2xl overflow-hidden shadow-xs border border-[#ECE3D5] cursor-pointer group ${
                idx === 0 || idx === 3 ? 'h-52' : 'h-40'
              }`}
            >
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="p-2 rounded-full bg-white/80 text-[#352B20]">
                  <Sparkles className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>

      <div className="pt-6">
        <div className="w-16 h-[1px] bg-[#82694D]/30 mx-auto" />
      </div>

      {/* Amplop Digital (Tanda Kasih / Kado) */}
      <div className="space-y-6">
        <ScrollReveal variant="up">
          <div className="text-center space-y-2 relative">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#8B263E] font-bold block">
              WEDDING GIFT
            </span>
            <h3 className="font-serif-wedding text-2xl sm:text-3xl font-bold text-[#4A1521]">
              Amplop Digital
            </h3>
            <p className="text-xs text-[#706456] leading-relaxed max-w-xs mx-auto">
              Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika memberi adalah tanda kasih Anda, kami menyediakan amplop digital di bawah ini:
            </p>
            <div className="flex justify-center pt-1">
              <RoseFloralDivider className="w-24 h-5" color="#8B263E" />
            </div>
          </div>
        </ScrollReveal>

        {/* Bank Cards */}
        <div className="space-y-3.5">
          {bankAccounts.map((acc, index) => (
            <ScrollReveal key={index} variant={index % 2 === 0 ? 'left' : 'right'}>
              <div className="bg-white/95 rounded-3xl p-5 border border-[#EBE3D6] shadow-sm space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#4A1521] font-serif">
                    {acc.bank}
                  </span>
                  <Gift className="w-4 h-4 text-[#8B263E]" />
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FBF9F5] border border-[#ECE3D5] flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-[#877A6C] uppercase tracking-wider font-semibold">
                      Nomor Rekening:
                    </p>
                    <p className="font-mono text-base font-bold text-[#4A1521] tracking-wider">
                      {acc.accountNumber}
                    </p>
                    <p className="text-[11px] text-[#695F54] font-medium mt-0.5">
                      a.n {acc.holderName}
                    </p>
                  </div>

                  <button
                    onClick={() => onCopy(acc.accountNumber, `No. Rekening ${acc.bank}`)}
                    className="p-2.5 rounded-xl bg-[#8B263E] text-white hover:bg-[#6F1D30] transition-all shadow-xs cursor-pointer"
                    title="Salin No. Rekening"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}

          {/* Kirim Hadiah Fisik Card */}
          <ScrollReveal variant="zoom">
            <div className="bg-white/95 rounded-3xl p-5 border border-[#EBE3D6] shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-[#8B263E]">
                <MapPin className="w-4 h-4" />
                <span className="text-xs font-bold font-serif">Kirim Kado Fisik</span>
              </div>
              <p className="text-xs text-[#6B6053] leading-relaxed">
                Penerima: <strong className="text-[#4A1521]">Andi &amp; Rosna</strong><br />
                Jl. Kemang Raya No. 45B, Mampang Prapatan, Jakarta Selatan, 12730
              </p>
              <button
                onClick={() =>
                  onCopy(
                    'Jl. Kemang Raya No. 45B, Mampang Prapatan, Jakarta Selatan, 12730 (Andi & Rosna)',
                    'Alamat kado fisik'
                  )
                }
                className="w-full py-2 px-3 rounded-xl border border-[#8B263E] text-[#8B263E] hover:bg-[#8B263E] hover:text-white transition-all text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Salin Alamat Lengkap</span>
              </button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default GaleriSection;
