import { Calendar, Clock, MapPin, Sparkles } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { RoseFloralDivider } from '../components/RoseFloralDivider';
import bungaKiri from '../../../assets/templateSatu/bungaKiri.png';
import bungaKanan from '../../../assets/templateSatu/bungaKanan.png';
import { useTemplateSatuData } from '../context';

const AcaraSection: React.FC = () => {
  const { data: dashData } = useTemplateSatuData();
  const gcalAkadUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Akad+Nikah+${encodeURIComponent(dashData.groom.nickName + ' & ' + dashData.bride.nickName)}&details=Pernikahan+Suci+${encodeURIComponent(dashData.groom.fullName + ' & ' + dashData.bride.fullName)}&location=${encodeURIComponent(dashData.event.akadPlace)}`;
  const gcalResepsiUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Resepsi+Pernikahan+${encodeURIComponent(dashData.groom.nickName + ' & ' + dashData.bride.nickName)}&details=Resepsi+Pernikahan+${encodeURIComponent(dashData.groom.fullName + ' & ' + dashData.bride.fullName)}&location=${encodeURIComponent(dashData.event.resepsiPlace)}`;
  return (
    <section className="relative py-12 px-6 z-10 space-y-8 bg-[#F5EFEB]/60">
      <ScrollReveal variant="up">
        <div className="text-center space-y-2 relative">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#8B263E] font-bold block">
            AGENDA &amp; WAKTU
          </span>
          <h3 className="font-serif-wedding text-2xl sm:text-3xl font-bold text-[#4A1521]">
            Detail Acara
          </h3>
          <p className="text-xs text-[#706456]">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.
          </p>
          <div className="flex justify-center pt-1">
            <RoseFloralDivider className="w-24 h-5" color="#8B263E" />
          </div>
        </div>
      </ScrollReveal>

      {/* Card Akad Nikah */}
      <ScrollReveal variant="left">
        <div className="bg-white/95 rounded-3xl p-6 sm:p-7 border border-[#E9DFD0] shadow-sm space-y-4 text-center relative overflow-hidden">
          <div className="absolute -top-6 -left-6 z-10 pointer-events-none opacity-90 animate-flower-enter-left">
            <img
              src={bungaKiri}
              alt="Floral Accent"
              className="w-24 sm:w-28 animate-flower-sway-left drop-shadow-md"
            />
          </div>

          <div className="w-12 h-12 rounded-full bg-[#FBF7F0] border border-[#E7DCCF] flex items-center justify-center text-[#8B263E] mx-auto shadow-xs relative z-10">
            <Calendar className="w-6 h-6" />
          </div>

          <h4 className="font-serif-wedding text-xl font-bold text-[#4A1521] relative z-10">
            Akad Nikah
          </h4>

          <div className="space-y-1 text-xs text-[#6B5F52] relative z-10">
            <p className="font-bold text-[#3E3326] text-sm">
              {dashData.event.akadDate || dashData.event.dateDisplay}
            </p>
            <p className="flex items-center justify-center gap-1.5 font-medium text-[#8B263E]">
              <Clock className="w-3.5 h-3.5" />
              <span>{dashData.event.akadTime}</span>
            </p>
          </div>

          <div className="w-10 h-[1px] bg-[#8B263E]/25 mx-auto relative z-10" />

          <div className="space-y-1 text-xs relative z-10">
            <p className="font-bold text-[#352B20]">
              {dashData.event.akadPlace}
            </p>
            <p className="text-[#756A5E] leading-relaxed">
              {dashData.event.akadAddress}
            </p>
          </div>

          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5 relative z-10">
            <a
              href={gcalAkadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-xl border border-[#8B263E] text-[#8B263E] hover:bg-[#8B263E] hover:text-white transition-all text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Simpan Kalender</span>
            </a>

            <a
              href="https://maps.google.com/?q=Masjid+Agung+Al-Azhar+Kebayoran+Baru"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-xl bg-[#8B263E] text-white hover:bg-[#6F1D30] transition-all text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Google Maps</span>
            </a>
          </div>
        </div>
      </ScrollReveal>

      {/* Card Resepsi Pernikahan */}
      <ScrollReveal variant="right">
        <div className="bg-white/95 rounded-3xl p-6 sm:p-7 border border-[#E9DFD0] shadow-sm space-y-4 text-center relative overflow-hidden">
          <div className="absolute -top-6 -right-6 z-10 pointer-events-none opacity-90 animate-flower-enter-right">
            <img
              src={bungaKanan}
              alt="Floral Accent"
              className="w-24 sm:w-28 animate-flower-sway-right drop-shadow-md"
            />
          </div>

          <div className="w-12 h-12 rounded-full bg-[#FBF7F0] border border-[#E7DCCF] flex items-center justify-center text-[#8B263E] mx-auto shadow-xs relative z-10">
            <Sparkles className="w-6 h-6" />
          </div>

          <h4 className="font-serif-wedding text-xl font-bold text-[#4A1521] relative z-10">
            Resepsi Pernikahan
          </h4>

          <div className="space-y-1 text-xs text-[#6B5F52] relative z-10">
            <p className="font-bold text-[#3E3326] text-sm">
              {dashData.event.resepsiDate || dashData.event.dateDisplay}
            </p>
            <p className="flex items-center justify-center gap-1.5 font-medium text-[#8B263E]">
              <Clock className="w-3.5 h-3.5" />
              <span>{dashData.event.resepsiTime}</span>
            </p>
          </div>

          <div className="w-10 h-[1px] bg-[#8B263E]/25 mx-auto relative z-10" />

          <div className="space-y-1 text-xs relative z-10">
            <p className="font-bold text-[#352B20]">
              {dashData.event.resepsiPlace}
            </p>
            <p className="text-[#756A5E] leading-relaxed">
              {dashData.event.resepsiAddress}
            </p>
          </div>

          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5 relative z-10">
            <a
              href={gcalResepsiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-xl border border-[#8B263E] text-[#8B263E] hover:bg-[#8B263E] hover:text-white transition-all text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Simpan Kalender</span>
            </a>

            <a
              href="https://maps.google.com/?q=Hotel+Santika+Premiere+Hayam+Wuruk+Jakarta"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-xl bg-[#8B263E] text-white hover:bg-[#6F1D30] transition-all text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Google Maps</span>
            </a>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default AcaraSection;
