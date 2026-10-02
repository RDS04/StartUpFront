import { ScrollReveal } from '../components/ScrollReveal';
import { RoseFloralDivider } from '../components/RoseFloralDivider';
import InstagramIcon from '../components/InstagramIcon';
import bungaKiri from '../../../assets/templateSatu/bungaKiri.png';
import bungaKanan from '../../../assets/templateSatu/bungaKanan.png';
import bungaAtas from '../../../assets/templateSatu/atas.png';

const MempelaiSection: React.FC = () => {
  return (
    <section className="relative py-12 px-6 z-10 space-y-8">
      {/* Side Hanging Floral Vine Decor */}
      <img
        src={bungaAtas}
        alt="Floral Vine Decor"
        className="absolute -right-8 top-12 w-28 sm:w-36 pointer-events-none opacity-80 z-0 animate-flower-float drop-shadow-md hidden sm:block"
      />

      <ScrollReveal variant="up">
        <div className="text-center space-y-2 relative">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#8B263E] font-bold block">
            KAMI YANG BERBAHAGIA
          </span>
          <h3 className="font-serif-wedding text-2xl sm:text-3xl font-bold text-[#4A1521]">
            Mempelai Pernikahan
          </h3>
          <p className="text-xs text-[#6B5A50] max-w-xs mx-auto leading-relaxed">
            Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan pernikahan:
          </p>
          <div className="flex justify-center pt-1">
            <RoseFloralDivider className="w-28 h-5" color="#8B263E" />
          </div>
        </div>
      </ScrollReveal>

      {/* Mempelai Pria */}
      <ScrollReveal variant="left">
        <div className="bg-white/92 rounded-3xl p-6 border border-[#ECE4D8] shadow-sm text-center space-y-4 relative overflow-hidden">
          <img
            src={bungaKiri}
            alt="Floral Corner"
            className="absolute -top-5 -left-5 w-24 sm:w-28 pointer-events-none z-20 animate-flower-sway-left drop-shadow-md"
          />

          <div className="relative mx-auto w-36 h-36">
            <div className="absolute inset-0 rounded-full border-2 border-[#D8C7B2] animate-pulse-gentle" />
            <div className="absolute inset-1.5 rounded-full border border-[#8B263E]/40" />
            <img
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80"
              alt="Andi Irawan, S.H., M.H."
              className="w-full h-full object-cover rounded-full p-2.5"
            />
          </div>

          <div className="space-y-1">
            <h4 className="font-serif-wedding text-2xl font-bold text-[#4A1521]">
              Andi Irawan, S.H., M.H.
            </h4>
            <p className="text-xs font-semibold text-[#8B263E] tracking-wider uppercase">
              Mempelai Pria
            </p>
          </div>

          <p className="text-xs text-[#6B5F52] leading-relaxed">
            Putra pertama dari pasangan<br />
            <strong className="text-[#3E3326]">Bapak H. Bambang Irawan</strong><br />
            &amp; <strong className="text-[#3E3326]">Ibu Hj. Siti Aminah</strong>
          </p>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#F6F1EA] text-[#8B263E] hover:bg-[#8B263E] hover:text-white transition-all text-xs font-medium cursor-pointer"
          >
            <InstagramIcon className="w-3.5 h-3.5" />
            <span>@andirawan_</span>
          </a>
        </div>
      </ScrollReveal>

      {/* Ampersand Estetik */}
      <ScrollReveal variant="zoom">
        <div className="flex items-center justify-center gap-4 py-2 relative">
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#8B263E]/40" />
          <span className="font-script-calligraphy text-5xl text-[#8B263E] font-bold">
            &amp;
          </span>
          <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#8B263E]/40" />
        </div>
      </ScrollReveal>

      {/* Mempelai Wanita */}
      <ScrollReveal variant="right">
        <div className="bg-white/92 rounded-3xl p-6 border border-[#ECE4D8] shadow-sm text-center space-y-4 relative overflow-hidden">
          <img
            src={bungaKanan}
            alt="Floral Corner"
            className="absolute -top-5 -right-5 w-24 sm:w-28 pointer-events-none z-20 animate-flower-sway-right drop-shadow-md"
          />

          <div className="relative mx-auto w-36 h-36">
            <div className="absolute inset-0 rounded-full border-2 border-[#D8C7B2] animate-pulse-gentle" />
            <div className="absolute inset-1.5 rounded-full border border-[#8B263E]/40" />
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
              alt="Adv. Rosna Linny, S.H., Gr."
              className="w-full h-full object-cover rounded-full p-2.5"
            />
          </div>

          <div className="space-y-1">
            <h4 className="font-serif-wedding text-2xl font-bold text-[#4A1521]">
              Adv. Rosna Linny, S.H., Gr.
            </h4>
            <p className="text-xs font-semibold text-[#8B263E] tracking-wider uppercase">
              Mempelai Wanita
            </p>
          </div>

          <p className="text-xs text-[#6B5F52] leading-relaxed">
            Putri kedua dari pasangan<br />
            <strong className="text-[#3E3326]">Bapak Dr. H. Rahman Hakim</strong><br />
            &amp; <strong className="text-[#3E3326]">Ibu Hj. Nurhayati</strong>
          </p>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#F6F1EA] text-[#8B263E] hover:bg-[#8B263E] hover:text-white transition-all text-xs font-medium cursor-pointer"
          >
            <InstagramIcon className="w-3.5 h-3.5" />
            <span>@rosnalinny_</span>
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default MempelaiSection;
