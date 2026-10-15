import { MailOpen, Sparkles } from 'lucide-react';
import { RoseFloralDivider } from '../components/RoseFloralDivider';
import cardBgImage from '../../../assets/templateSatu/bacgraund.jpg';
import { useTemplateSatuData } from '../context';

interface CoverSectionProps {
  guestName: string;
  isOpening: boolean;
  isEmbedded: boolean;
  onOpen: () => void;
}

const CoverSection: React.FC<CoverSectionProps> = ({
  guestName,
  isOpening,
  isEmbedded,
  onOpen,
}) => {
  const { data: dashData } = useTemplateSatuData();

  return (
    <section
      className={`w-full ${isEmbedded ? 'h-full min-h-[600px]' : 'min-h-screen min-h-[100dvh]'
        } flex items-center justify-center relative overflow-hidden select-none bg-cover bg-center bg-no-repeat`}
      style={{ backgroundImage: `url(${cardBgImage})` }}
    >
      {/* Golden Shimmer Flash Overlay on Open */}
      {isOpening && (
        <div className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden">
          <div className="w-80 h-80 rounded-full bg-gradient-to-r from-[#D4AF37]/35 via-[#FFF8ED]/60 to-[#D4AF37]/35 blur-2xl animate-shimmer-flash" />
        </div>
      )}

      {/* Ambient blurred backdrop for large screens */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-lg scale-105 opacity-30 pointer-events-none hidden sm:block"
        style={{ backgroundImage: `url(${cardBgImage})` }}
      />
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      {/* Card container */}
      <div
        className={`w-full max-w-md ${isEmbedded ? 'h-full min-h-[600px] py-6' : 'min-h-screen min-h-[100dvh] py-10 sm:py-12'
          } px-6 sm:px-8 flex flex-col justify-between text-center relative z-10 overflow-hidden bg-cover bg-center bg-no-repeat sm:border-x sm:border-[#D4AF37]/30 shadow-2xl transition-all`}
        style={{ backgroundImage: `url(${cardBgImage})` }}
      >
        {/* Soft gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/55 pointer-events-none" />

        {/* Top Area */}
        <div className="pt-16 sm:pt-20 space-y-3 relative z-10">
          <div className="flex justify-center items-center gap-2">
            <div className="w-8 h-[1px] bg-[#E5C583]/60" />
            <span className="text-[10px] uppercase tracking-[0.35em] font-semibold text-[#F3E5AB] drop-shadow-sm">
              UNDANGAN PERNIKAHAN
            </span>
            <div className="w-8 h-[1px] bg-[#E5C583]/60" />
          </div>

          {/* Nama Mempelai */}
          <div className="py-1">
            <h1 className="font-script-calligraphy text-6xl sm:text-7xl text-[#FFF8ED] leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] tracking-wide">
              {dashData.groom.nickName} <span className="text-[#F3E5AB] text-5xl font-serif">&</span> {dashData.bride.nickName}
            </h1>
            <p className="text-xs uppercase font-serif tracking-[0.25em] text-[#E5D0B1] mt-2 font-medium drop-shadow-sm">
              {dashData.event.dateDisplay}
            </p>
          </div>

          {/* Botanical Divider */}
          <div className="flex justify-center">
            <RoseFloralDivider className="w-24 h-5" color="#D4AF37" />
          </div>
        </div>

        {/* Bottom Area */}
        <div className="space-y-4 pb-2 relative z-10">
          {/* Penerima Undangan */}
          <div className="p-4 rounded-2xl bg-black/45 backdrop-blur-md border border-[#D4AF37]/35 space-y-1.5 shadow-lg">
            <p className="text-[11px] text-[#E5D0B1] font-sans">
              Kepada Yth. Bapak/Ibu/Saudara/i:
            </p>
            <p className="text-lg font-serif font-bold text-[#FFF8ED] tracking-wide drop-shadow-sm">
              {guestName}
            </p>
            <p className="text-[11px] text-[#F3E5AB]/90 italic leading-relaxed pt-1">
              "Tanpa Mengurangi Rasa Hormat, Kami Mengundang Anda Untuk Hadir Di Acara Pernikahan Kami."
            </p>
          </div>

          {/* Tombol Buka Undangan */}
          <div>
            <button
              onClick={onOpen}
              disabled={isOpening}
              className={`w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#C5A059] via-[#F3E5AB] to-[#C5A059] hover:from-[#D4AF37] hover:via-[#FFF8ED] hover:to-[#D4AF37] active:scale-95 text-[#2D1606] text-xs sm:text-sm font-bold tracking-wider shadow-[0_4px_20px_rgba(197,160,89,0.35)] hover:shadow-[0_4px_25px_rgba(243,229,171,0.55)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group ${isOpening ? 'scale-105 shadow-[0_0_30px_rgba(243,229,171,0.9)]' : ''
                }`}
            >
              {isOpening ? (
                <>
                  <Sparkles className="w-4 h-4 text-[#2D1606] animate-spin" />
                  <span>Membuka Undangan...</span>
                </>
              ) : (
                <>
                  <MailOpen className="w-4 h-4 text-[#2D1606] transition-transform group-hover:scale-110" />
                  <span>Buka Undangan</span>
                </>
              )}
            </button>
            <p className="text-[10px] text-[#E5D0B1]/85 mt-2.5 flex items-center justify-center gap-1 drop-shadow-sm">
              <span>🎵</span> Musik otomatis diputar saat dibuka
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoverSection;
