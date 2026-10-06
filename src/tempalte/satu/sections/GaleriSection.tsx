import { Copy, Gift, MapPin, Sparkles } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { RoseFloralDivider } from '../components/RoseFloralDivider';
import { CardBca } from '../../CardAtm/Bca';
import { CardMandiri } from '../../CardAtm/Mandiri';

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
      <div className="grid grid-cols-2 gap-3">
        {galleryPhotos.map((photo, idx) => (
          <ScrollReveal key={idx} variant="zoom" delay={idx * 90}>
            <div
              onClick={() => onOpenLightbox(photo.url)}
              className={`relative rounded-2xl overflow-hidden shadow-xs hover:shadow-lg border border-[#ECE3D5] cursor-pointer group transition-all duration-300 ${
                idx === 0 || idx === 3 ? 'h-52' : 'h-40'
              }`}
            >
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="p-2 rounded-full bg-white/80 text-[#352B20] shadow-md">
                  <Sparkles className="w-4 h-4" />
                </span>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

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

        {/* 3D Bank ATM Cards Separated Components */}
        <div className="space-y-5">
          {/* Card BCA */}
          <ScrollReveal variant="left">
            <div className="bg-white/95 rounded-3xl p-4 sm:p-5 border border-[#EBE3D6] shadow-sm space-y-2 relative overflow-hidden">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold text-[#4A1521] font-serif">
                  Bank Central Asia (BCA)
                </span>
                <Gift className="w-4 h-4 text-[#8B263E]" />
              </div>

              <CardBca
                accountNumber="8730 4912 3000"
                holderName="ANDI IRAWAN"
                onCopy={onCopy}
              />
            </div>
          </ScrollReveal>

          {/* Card Mandiri */}
          <ScrollReveal variant="right">
            <div className="bg-white/95 rounded-3xl p-4 sm:p-5 border border-[#EBE3D6] shadow-sm space-y-2 relative overflow-hidden">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold text-[#4A1521] font-serif">
                  Bank Mandiri
                </span>
                <Gift className="w-4 h-4 text-[#8B263E]" />
              </div>

              <CardMandiri
                accountNumber="1370 0192 8491 2"
                holderName="ROSNA LINNY"
                onCopy={onCopy}
              />
            </div>
          </ScrollReveal>

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
