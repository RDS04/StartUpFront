import React from 'react';
import { Copy, Gift, MapPin, Sparkles } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { RoseFloralDivider } from '../components/RoseFloralDivider';
import { CardBca } from '../../CardAtm/Bca';
import { CardMandiri } from '../../CardAtm/Mandiri';
import { InteractiveAtmCard3D } from '../../CardAtm/InteractiveAtmCard3D';
import { useTemplateSatuData } from '../context';
import type { SatuGalleryPhoto } from '../types';

const galleryPhotos: SatuGalleryPhoto[] = [
  {
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    caption: 'Momen Bahagia Bersama',
    orientation: 'portrait',
  },
  {
    url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
    caption: 'Senyum Penuh Kasih',
    orientation: 'portrait',
  },
  {
    url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80',
    caption: 'Langkah Awal Menuju Abadi',
    orientation: 'portrait',
  },
  {
    url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80',
    caption: 'Genggaman Tangan Penuh Keyakinan',
    orientation: 'portrait',
  },
  {
    url: 'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=800&q=80',
    caption: 'Dalam Naungan Kasih Sayang',
    orientation: 'portrait',
  },
  {
    url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80',
    caption: 'Menatap Masa Depan Berdua',
    orientation: 'portrait',
  }
];

interface GaleriSectionProps {
  onOpenLightbox: (url: string) => void;
  onCopy: (text: string, label: string) => void;
}

const GaleriSection: React.FC<GaleriSectionProps> = ({ onOpenLightbox, onCopy }) => {
  const { data: tplData, isPreview } = useTemplateSatuData();

  // Evaluasi rekening bank & kado fisik yang diisi user
  const userBankAccounts = tplData.bankAccounts || [];
  const hasBankAccounts = userBankAccounts.length > 0;
  const hasGiftAddress = Boolean(tplData.giftAddress?.address && tplData.giftAddress.address.trim() !== '');
  
  // Di preview landing page (isPreview === true), amplop digital tetap tampil demo showcase lengkap.
  // Jika user sudah beli template (!isPreview), defaultnya KOSONG dan hanya muncul jika user sudah input data!
  const showAmplopSection = isPreview || hasBankAccounts || hasGiftAddress;

  // Foto galeri: ambil dari database (tplData.gallery) jika ada, fallback ke contoh default jika kosong
  const photosList = tplData.gallery && tplData.gallery.length > 0 ? tplData.gallery : galleryPhotos;

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
        {photosList.map((photo, idx) => {
          const isLandscape = photo.orientation === 'landscape';
          return (
            <ScrollReveal
              key={(photo as any).id || idx}
              variant="zoom"
              delay={(idx % 6) * 90}
              className={isLandscape ? 'col-span-2' : ''}
            >
              <div
                onClick={() => onOpenLightbox(photo.url)}
                className={`relative rounded-2xl overflow-hidden shadow-xs hover:shadow-lg border border-[#ECE3D5] cursor-pointer group transition-all duration-300 ${
                  isLandscape ? 'h-48 sm:h-56' : idx === 0 || idx === 3 ? 'h-52' : 'h-40'
                }`}
              >
                <img
                  src={photo.url}
                  alt={photo.caption || 'Foto Galeri'}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-2 rounded-full bg-white/80 text-[#352B20] shadow-md">
                    <Sparkles className="w-4 h-4" />
                  </span>
                </div>
                {photo.caption && photo.caption.trim() !== '' && (
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent p-2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-[11px] font-medium text-white/95 truncate px-1">
                      {photo.caption}
                    </p>
                  </div>
                )}
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      {/* Amplop Digital (Tanda Kasih / Kado) - Default kosong untuk template terbeli, baru muncul saat diinputkan */}
      {showAmplopSection && (
        <>
          <div className="pt-6">
            <div className="w-16 h-[1px] bg-[#82694D]/30 mx-auto" />
          </div>

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

            {/* 3D Bank ATM Cards & Gift Section */}
            <div className="space-y-5">
              {/* TAMPILAN PREVIEW LANDING PAGE: Tetap tampil demo showcase asli (tidak ikut terubah) */}
              {isPreview ? (
                <>
                  {/* Card BCA Demo */}
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

                  {/* Card Mandiri Demo */}
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

                  {/* Kirim Hadiah Fisik Card Demo */}
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
                </>
              ) : (
                /* TAMPILAN USER SETELAH MEMBELI TEMPLATE (!isPreview): DYNAMIC BERDASARKAN INPUT USER */
                <>
                  {/* Rekening yang diinputkan user */}
                  {userBankAccounts.map((acc, idx) => {
                    const variant = idx % 2 === 0 ? 'left' : 'right';
                    return (
                      <ScrollReveal key={acc.id || idx} variant={variant}>
                        <div className="bg-white/95 rounded-3xl p-4 sm:p-5 border border-[#EBE3D6] shadow-sm space-y-2 relative overflow-hidden">
                          <div className="flex items-center justify-between px-1">
                            <span className="text-xs font-bold text-[#4A1521] font-serif">
                              {acc.bank || 'Rekening Digital'}
                            </span>
                            <Gift className="w-4 h-4 text-[#8B263E]" />
                          </div>

                          <InteractiveAtmCard3D
                            accountNumber={acc.number}
                            holderName={acc.holder}
                            bankName={acc.bank}
                            cardTheme={acc.cardTheme}
                            onCopy={(text, label) => onCopy(text, label || 'No. Rekening')}
                          />
                        </div>
                      </ScrollReveal>
                    );
                  })}

                  {/* Kado Fisik yang diinputkan user */}
                  {hasGiftAddress && (
                    <ScrollReveal variant="zoom">
                      <div className="bg-white/95 rounded-3xl p-5 border border-[#EBE3D6] shadow-sm space-y-3">
                        <div className="flex items-center gap-2 text-[#8B263E]">
                          <MapPin className="w-4 h-4" />
                          <span className="text-xs font-bold font-serif">Kirim Kado Fisik</span>
                        </div>
                        <p className="text-xs text-[#6B6053] leading-relaxed">
                          {tplData.giftAddress?.recipient && (
                            <>
                              Penerima:{' '}
                              <strong className="text-[#4A1521]">{tplData.giftAddress.recipient}</strong>
                              {tplData.giftAddress.phone && ` (${tplData.giftAddress.phone})`}
                              <br />
                            </>
                          )}
                          <span>{tplData.giftAddress?.address}</span>
                          {tplData.giftAddress?.notes && (
                            <>
                              <br />
                              <span className="text-[11px] text-[#8C7D6B] italic mt-1 block">
                                Catatan: {tplData.giftAddress.notes}
                              </span>
                            </>
                          )}
                        </p>
                        <button
                          onClick={() => {
                            const recipientPart = tplData.giftAddress?.recipient
                              ? ` (${tplData.giftAddress.recipient}${
                                  tplData.giftAddress.phone ? ' - ' + tplData.giftAddress.phone : ''
                                })`
                              : '';
                            const fullAddr = `${tplData.giftAddress?.address || ''}${recipientPart}`.trim();
                            onCopy(fullAddr, 'Alamat kado fisik');
                          }}
                          className="w-full py-2 px-3 rounded-xl border border-[#8B263E] text-[#8B263E] hover:bg-[#8B263E] hover:text-white transition-all text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>Salin Alamat Lengkap</span>
                        </button>
                      </div>
                    </ScrollReveal>
                  )}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default GaleriSection;
