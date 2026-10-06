import { Clock } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { RoseFloralDivider } from '../components/RoseFloralDivider';
import bungaKiri from '../../../assets/templateSatu/bungaKiri.png';
import bungaKanan from '../../../assets/templateSatu/bungaKanan.png';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface HeroSectionProps {
  timeLeft: TimeLeft;
}

const HeroSection: React.FC<HeroSectionProps> = ({ timeLeft }) => {
  return (
    <section className="relative pt-6 pb-14 px-6 text-center z-10 space-y-8">
      {/* Corner Floral Ornaments */}
      <div className="absolute -top-6 -left-6 z-20 pointer-events-none animate-flower-enter-left">
        <img
          src={bungaKiri}
          alt="Floral Accent Left"
          className="w-28 sm:w-36 animate-flower-sway-left drop-shadow-md"
        />
      </div>
      <div className="absolute -top-6 -right-6 z-20 pointer-events-none animate-flower-enter-right">
        <img
          src={bungaKanan}
          alt="Floral Accent Right"
          className="w-28 sm:w-36 animate-flower-sway-right drop-shadow-md"
        />
      </div>

      {/* Header Tag */}
      <ScrollReveal variant="down">
        <div className="space-y-2 pt-2 relative z-10">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#8B263E] font-bold block">
            WALIMATUL 'URS
          </span>
          <h2 className="font-[#58111A] font-script-calligraphy text-6xl sm:text-7xl leading-tight drop-shadow-sm">
            Andi <span className="text-[#8B263E] text-5xl font-serif">&</span> Rosna
          </h2>
          <p className="text-xs uppercase font-serif tracking-[0.2em] text-[#6E5E4F] font-medium">
            Sabtu, 24 Oktober 2026
          </p>
        </div>
      </ScrollReveal>

      {/* Realtime Countdown Timer Card */}
      <ScrollReveal variant="flip" delay={120}>
        <div className="rounded-3xl p-6 sm:p-7 border border-[#E0D5C4] shadow-md space-y-4 text-center bg-white/85 backdrop-blur-md transition-all">
          <div className="flex items-center justify-center gap-2 text-[#8B263E]">
            <Clock className="w-4 h-4" />
            <span className="text-xs uppercase tracking-widest font-semibold">Menghitung Hari Bahagia</span>
          </div>

          <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
            {[
              { label: 'HARI', value: timeLeft.days },
              { label: 'JAM', value: timeLeft.hours },
              { label: 'MENIT', value: timeLeft.minutes },
              { label: 'DETIK', value: timeLeft.seconds }
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-[#FAF7F2]/90 backdrop-blur-xs rounded-2xl py-3 px-1 border border-[#EFE8DC] flex flex-col items-center shadow-xs"
              >
                <span className="font-serif-wedding text-xl sm:text-2xl font-bold text-[#4A1521]">
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="text-[9px] font-bold text-[#8C7A65] tracking-wider mt-0.5">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-[#7A6D5E] italic">
            Jakarta, Indonesia
          </p>
        </div>
      </ScrollReveal>

      {/* Ayat Suci QS. Ar-Rum: 21 Card */}
      <ScrollReveal variant="zoom" delay={150}>
        <div className="rounded-3xl p-6 sm:p-7 border border-[#E0D5C4] shadow-md space-y-4 text-center bg-white/85 backdrop-blur-md transition-all">
          <div className="flex justify-center">
            <RoseFloralDivider className="w-20 h-5" color="#8B263E" />
          </div>

          <p
            className="text-base sm:text-lg font-serif text-[#392E21] leading-loose tracking-wide pt-1"
            dir="rtl"
          >
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ
          </p>

          <div className="w-12 h-[1px] bg-[#8B263E]/35 mx-auto my-2" />

          <p className="text-xs text-[#5D5245] leading-relaxed italic font-serif">
            "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir."
          </p>

          <span className="text-[11px] font-bold text-[#8B263E] tracking-wider block font-serif uppercase pt-1">
            (QS. Ar-Rum: 21)
          </span>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default HeroSection;
