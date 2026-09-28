import { Palette, Edit3, Send, CheckCircle2, ArrowRight, Clock, Share2 } from 'lucide-react';

export const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      icon: Palette,
      badge: 'Langkah Pertama',
      title: 'Pilih Desain Impian',
      desc: 'Eksplorasi puluhan template estetik mulai dari tema Modern Luxury, Floral Garden, Traditional Vintage, hingga Minimalist Elegant.',
      details: [
        'Pratinjau langsung di smartphone & desktop',
        'Cocok untuk Pernikahan, Khitanan, & Ulang Tahun',
        'Bisa ganti warna dasar dan font sesuai selera'
      ],
      tagColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    },
    {
      number: '02',
      icon: Edit3,
      badge: 'Langkah Kedua',
      title: 'Isi Data & Personalisasi',
      desc: 'Lengkapi identitas kedua mempelai, tanggal akad & resepsi, lokasi Google Maps, foto galeri, video, serta lagu pengiring favorit.',
      details: [
        'Formulir pengisian mudah dan intuitif',
        'Input nomor rekening & QRIS amplop digital',
        'Atur jadwal acara dan dresscode tamu'
      ],
      tagColor: 'text-amber-700 bg-amber-50 border-amber-200',
    },
    {
      number: '03',
      icon: Send,
      badge: 'Langkah Ketiga',
      title: 'Sebar Undangan Seketika',
      desc: 'Undangan digital langsung aktif! Buat daftar nama tamu dan kirimkan tautan eksklusif secara personal melalui WhatsApp dalam 1 klik.',
      details: [
        'Generator nama tamu otomatis tanpa batas',
        'Template teks pesan WhatsApp siap kirim',
        'Pantau konfirmasi RSVP tamu secara realtime'
      ],
      tagColor: 'text-teal-700 bg-teal-50 border-teal-200',
    },
  ];

  return (
    <section id="cara-buat" className="py-24 bg-gradient-to-b from-[#fafbfc] to-slate-50 relative overflow-hidden border-t border-slate-200/60">
      
      {/* Background Decorative Circles */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-amber-100/50 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold tracking-wide uppercase shadow-xs">
            <Clock className="w-3.5 h-3.5 text-emerald-600" />
            <span>Proses Cepat &amp; Praktis</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Cara Buat Undangan Digital <br className="hidden sm:inline" />
            <span className="font-display-luxury italic font-bold text-[#165b39]">
              Hanya dalam 3 Langkah Mudah
            </span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Tanpa perlu keahlian desain atau coding. Undangan digital pernikahan Anda selesai dan siap dibagikan dalam kurun waktu kurang dari 10 menit!
          </p>
        </div>

        {/* 3 Step Cards with Flow Connectors */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative p-8 rounded-3xl bg-white border border-slate-200/90 hover:border-emerald-300 shadow-sm hover:shadow-[0_20px_40px_rgba(20,77,49,0.09)] transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between group"
              >
                <div>
                  {/* Step Number Top Watermark & Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-4xl sm:text-5xl font-black text-slate-100 group-hover:text-emerald-50 transition-colors font-serif-wedding select-none">
                      {step.number}
                    </span>
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${step.tagColor}`}>
                      {step.badge}
                    </span>
                  </div>

                  {/* Icon Circle */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#165b39] to-[#0f3d26] text-white flex items-center justify-center mb-6 shadow-md shadow-emerald-950/15 group-hover:scale-105 transition-transform duration-200">
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#165b39] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                    {step.desc}
                  </p>

                  {/* Feature Checkpoints */}
                  <div className="space-y-2.5 pt-4 border-t border-slate-100">
                    {step.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Micro Action link */}
                <div className="mt-8 pt-4 flex items-center justify-between text-xs font-bold text-[#165b39]">
                  <span>Mulai langkah ini</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}

        </div>

        {/* Callout Strip: Bagikan ke Tamu */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-4 sm:px-8 rounded-full bg-white border border-slate-200 shadow-md">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800">
              <Share2 className="w-4 h-4 text-[#165b39]" />
              <span>Sudah punya daftar tamu? Coba sekarang gratis tanpa registrasi rumit</span>
            </div>
            <a
              href="#pilihan-template"
              className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-[#165b39] hover:bg-[#124b2f] transition-all shadow-sm active:scale-95"
            >
              Pilih Template Sekarang
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
