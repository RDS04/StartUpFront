import { ScrollReveal } from '../components/ScrollReveal';
import { RoseFloralDivider } from '../components/RoseFloralDivider';
import bungaBawah from '../../../assets/templateSatu/bungaBawah.png';

const FooterSection: React.FC = () => {
  return (
    <ScrollReveal variant="up">
      <footer className="relative pt-10 pb-16 px-6 text-center space-y-5 z-10 border-t border-[#EAE1D3]/80 bg-white/40 backdrop-blur-xs overflow-hidden">
        {/* Grand Footer Floral Garland (rotate-180) */}
        <div className="relative -mt-2 pb-2 flex justify-center rotate-180">
          <img
            src={bungaBawah}
            alt="Grand Floral Garland"
            className="w-full max-w-sm sm:max-w-md pointer-events-none drop-shadow-lg animate-garland-pulse"
          />
        </div>

        <div className="flex justify-center">
          <RoseFloralDivider className="w-24 h-5" color="#8B263E" />
        </div>

        <div className="space-y-1 relative z-10">
          <p className="text-xs text-[#706456]">
            Ungkapan terima kasih yang tulus dari kami,
          </p>
          <h4 className="font-script-calligraphy text-5xl sm:text-6xl text-[#58111A] leading-tight drop-shadow-sm">
            Andi <span className="text-[#8B263E] text-4xl font-serif">&amp;</span> Rosna
          </h4>
          <p className="text-[10px] text-[#8B263E] uppercase tracking-widest font-semibold pt-1">
            Beserta Seluruh Keluarga Besar
          </p>
        </div>

        <div className="pt-6 border-t border-[#ECE3D5]/80">
          <p className="text-[10px] text-[#9E9386]">
            Dibuat dengan cinta menggunakan{' '}
            <span className="font-serif-wedding font-bold text-[#8B263E]">
              i say yes
            </span>{' '}
            — Digital Wedding Invitation Platform
          </p>
        </div>
      </footer>
    </ScrollReveal>
  );
};

export default FooterSection;
