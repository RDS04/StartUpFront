import { WeddingRingsIcon } from './DecorativeBackground';
import { MessageCircle, Heart, ShieldCheck, Mail, Phone, Globe, Share2 } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#0f2e1e] text-slate-300 pt-16 pb-12 border-t border-emerald-900/60 relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-700/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <WeddingRingsIcon className="w-9 h-9" />
              <span className="font-serif-wedding text-2xl font-bold text-white tracking-normal lowercase">
                i say yes
              </span>
            </div>

            <p className="text-sm text-emerald-100/75 leading-relaxed max-w-sm">
              Platform undangan pernikahan digital modern nomor 1 di Indonesia. Bagikan momen paling bahagia dalam hidup Anda dengan elegan, praktis, dan hemat biaya.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-emerald-900/80 border border-emerald-700 flex items-center justify-center text-emerald-300 hover:text-white hover:bg-emerald-800 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://isayyes.id"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-emerald-900/80 border border-emerald-700 flex items-center justify-center text-emerald-300 hover:text-white hover:bg-emerald-800 transition-colors"
                aria-label="Website"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="mailto:support@isayyes.id"
                className="w-9 h-9 rounded-full bg-emerald-900/80 border border-emerald-700 flex items-center justify-center text-emerald-300 hover:text-white hover:bg-emerald-800 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="#beranda"
                className="w-9 h-9 rounded-full bg-emerald-900/80 border border-emerald-700 flex items-center justify-center text-emerald-300 hover:text-white hover:bg-emerald-800 transition-colors"
                aria-label="Share"
              >
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4 border-b border-emerald-800/80 pb-2">
              Navigasi Cepat
            </h4>
            <ul className="space-y-2.5 text-xs text-emerald-100/70">
              <li><a href="#beranda" className="hover:text-white transition-colors">Beranda</a></li>
              <li><a href="#fitur" className="hover:text-white transition-colors">Fitur Lengkap</a></li>
              <li><a href="#pilihan-template" className="hover:text-white transition-colors">Koleksi Template</a></li>
              <li><a href="#cara-buat" className="hover:text-white transition-colors">Cara Buat Undangan</a></li>
              <li><a href="#harga" className="hover:text-white transition-colors">Paket &amp; Harga</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Tanya Jawab (FAQ)</a></li>
            </ul>
          </div>

          {/* Template Categories */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4 border-b border-emerald-800/80 pb-2">
              Tema Populer
            </h4>
            <ul className="space-y-2.5 text-xs text-emerald-100/70">
              <li><a href="#pilihan-template" className="hover:text-white transition-colors">Royal Gold Luxury</a></li>
              <li><a href="#pilihan-template" className="hover:text-white transition-colors">Emerald Botanical Garden</a></li>
              <li><a href="#pilihan-template" className="hover:text-white transition-colors">Soft Blush Floral</a></li>
              <li><a href="#pilihan-template" className="hover:text-white transition-colors">Traditional Javanese Gold</a></li>
              <li><a href="#pilihan-template" className="hover:text-white transition-colors">Minimalist Modern Monochrome</a></li>
              <li><a href="#pilihan-template" className="hover:text-white transition-colors">Rustic Bohemian Earthy</a></li>
            </ul>
          </div>

          {/* Guarantee & Help */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4 border-b border-emerald-800/80 pb-2">
              Jaminan &amp; Kontak
            </h4>
            <div className="space-y-3 text-xs text-emerald-100/70">
              <div className="flex items-center gap-2 text-emerald-300 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Garansi 100% Kepuasan</span>
              </div>
              <p className="leading-relaxed">
                Butuh bantuan mendadak sebelum sebar undangan? Hubungi customer service kami melalui WhatsApp:
              </p>
              <div className="pt-1">
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-emerald-900 border border-emerald-700 text-white font-bold text-[11px] hover:bg-emerald-800 transition-colors"
                >
                  <Phone className="w-3 h-3 text-amber-400" />
                  <span>+62 812-3456-7890</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Midtrans Payment Gateway Partner Strip */}
        <div className="py-6 my-6 border-y border-emerald-900/60 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2.5 text-emerald-200/80">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-semibold text-white">Metode Pembayaran Resmi via Midtrans:</span>
            <span className="text-emerald-300/80 hidden sm:inline">• Konfirmasi Instan Otomatis 24 Jam</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-emerald-200/90 font-medium">
            <span className="px-2.5 py-1 rounded bg-emerald-950 border border-emerald-800/80 text-emerald-300 font-bold">QRIS</span>
            <span className="px-2 py-1 rounded bg-emerald-950/80 border border-emerald-800/60">BCA</span>
            <span className="px-2 py-1 rounded bg-emerald-950/80 border border-emerald-800/60">Mandiri</span>
            <span className="px-2 py-1 rounded bg-emerald-950/80 border border-emerald-800/60">BNI</span>
            <span className="px-2 py-1 rounded bg-emerald-950/80 border border-emerald-800/60">BRI</span>
            <span className="px-2 py-1 rounded bg-emerald-950/80 border border-emerald-800/60">Permata</span>
            <span className="px-2 py-1 rounded bg-emerald-950/80 border border-emerald-800/60">GoPay</span>
            <span className="px-2 py-1 rounded bg-emerald-950/80 border border-emerald-800/60">ShopeePay</span>
            <span className="px-2 py-1 rounded bg-emerald-950/80 border border-emerald-800/60">Visa / Mastercard</span>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-200/60">
          <p>© 2026 <strong className="text-white">i say yes</strong>. Seluruh hak cipta dilindungi.</p>
          <div className="flex items-center gap-1">
            <span>Dibuat dengan</span>
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 inline mx-0.5" />
            <span>untuk kebahagiaan calon pengantin Indonesia</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
