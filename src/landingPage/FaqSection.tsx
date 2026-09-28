import { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';

export const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Berapa lama proses pembuatan undangan digital di "i say yes"?',
      a: 'Sangat cepat! Anda bisa mengisi data secara mandiri dan undangan langsung aktif dalam waktu 5-10 menit. Jika Anda memilih paket yang dibantu oleh tim desainer kami, pengerjaan selesai maksimal dalam 1x24 jam.',
    },
    {
      q: 'Apakah saya bisa mengganti foto, lagu, atau tanggal jika ada perubahan jadwal?',
      a: 'Tentu saja! Anda memiliki akses dashboard penuh untuk mengedit teks nama, tanggal acara, lokasi Google Maps, susunan acara, maupun mengganti foto dan lagu kesukaan kapan saja tanpa biaya tambahan.',
    },
    {
      q: 'Bagaimana cara membagikan undangan dengan nama tamu yang berbeda-beda?',
      a: 'Kami menyediakan fitur Generator Nama Tamu Otomatis. Anda cukup memasukkan daftar nama tamu (bisa ketik atau copy-paste dari Excel), lalu sistem kami akan membuatkan link unik berserta format pesan WhatsApp ramah dan sopan untuk masing-masing tamu dalam 1 kali klik.',
    },
    {
      q: 'Apakah ada potongan untuk amplop digital atau kado transfer dari tamu?',
      a: 'Sama sekali TIDAK ADA potongan (0% fee). Uang amplop digital dan transfer kado dari tamu akan masuk 100% langsung ke nomor rekening bank pribadi atau QRIS dompet digital (GoPay, OVO, Dana) milik mempelai.',
    },
    {
      q: 'Berapa lama masa aktif undangan digital saya?',
      a: 'Untuk Paket Gold dan Platinum VIP, masa aktif undangan adalah SELAMANYA (Lifetime). Link undangan akan tetap bisa diakses sebagai kenang-kenangan digital abadi perjalanan cinta Anda dan pasangan.',
    },
    {
      q: 'Apakah undangan digital nyaman dibuka di semua jenis HP?',
      a: 'Ya, seluruh template "i say yes" telah dioptimasi dengan teknologi mobile-first responsif. Tampilannya sangat mulus dan ringan di iPhone (iOS), HP Android, tablet, hingga layar laptop/PC tanpa lag.',
    },
  ];

  return (
    <section id="faq" className="py-24 bg-white relative overflow-hidden border-t border-slate-200/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold tracking-wide uppercase shadow-xs">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Pertanyaan yang Sering Diajukan</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            FAQ Undangan Digital <br />
            <span className="font-display-luxury italic font-bold text-[#165b39]">
              "i say yes"
            </span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Punya pertanyaan seputar cara pemesanan atau fitur? Temukan jawabannya di bawah ini.
          </p>
        </div>

        {/* Accordion FAQ */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-slate-200/90 overflow-hidden bg-white shadow-xs transition-all duration-200 hover:border-emerald-300"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-slate-900">
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen ? 'bg-emerald-100 text-emerald-800 rotate-180' : 'bg-slate-100 text-slate-500'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="text-sm font-bold text-slate-900">Masih punya pertanyaan lain?</h4>
            <p className="text-xs text-slate-600">Tim customer service kami standby untuk membantu Anda kapan saja.</p>
          </div>
          <a
            href="https://wa.me/6281234567890?text=Halo%20Admin%20i%20say%20yes,%20saya%20mau%20tanya%20seputar%20undangan%20digital"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full text-xs font-bold text-white bg-[#165b39] hover:bg-[#124a2e] flex items-center gap-2 shadow-sm transition-all"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Chat CS via WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
