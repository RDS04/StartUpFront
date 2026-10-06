import { Send, Check } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { RoseFloralDivider } from '../components/RoseFloralDivider';
import type { RSVPItem } from '../types';

interface RSVPSectionProps {
  rsvpName: string;
  setRsvpName: (v: string) => void;
  attendance: 'hadir' | 'tidak_hadir' | 'ragu';
  setAttendance: (v: 'hadir' | 'tidak_hadir' | 'ragu') => void;
  guestsCount: number;
  setGuestsCount: (v: number) => void;
  wishesMessage: string;
  setWishesMessage: (v: string) => void;
  isSubmitting: boolean;
  rsvpSuccess: boolean;
  wishesList: RSVPItem[];
  onSubmit: (e: React.FormEvent) => void;
}

const RSVPSection: React.FC<RSVPSectionProps> = ({
  rsvpName,
  setRsvpName,
  attendance,
  setAttendance,
  guestsCount,
  setGuestsCount,
  wishesMessage,
  setWishesMessage,
  isSubmitting,
  rsvpSuccess,
  wishesList,
  onSubmit,
}) => {
  return (
    <section className="relative py-12 px-6 z-10 space-y-8">
      <ScrollReveal variant="up">
        <div className="text-center space-y-2 relative">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#8B263E] font-bold block">
            RSVP &amp; WISHES
          </span>
          <h3 className="font-serif-wedding text-2xl sm:text-3xl font-bold text-[#4A1521]">
            Buku Tamu &amp; Doa Restu
          </h3>
          <p className="text-xs text-[#706456]">
            Kehadiran dan doa tulus Anda adalah kebahagiaan tak terhingga bagi kami.
          </p>
          <div className="flex justify-center pt-1">
            <RoseFloralDivider className="w-24 h-5" color="#8B263E" />
          </div>
        </div>
      </ScrollReveal>

      {/* Form Card */}
      <ScrollReveal variant="zoom">
        <div className="bg-white rounded-3xl p-6 border border-[#ECE3D5] shadow-sm space-y-4">
          {rsvpSuccess && (
            <div className="p-3.5 rounded-2xl bg-[#F0F7F2] border border-[#CCE5D4] text-[#246237] text-xs font-semibold flex items-center gap-2">
              <Check className="w-4 h-4 text-[#246237]" />
              <span>Konfirmasi dan doa restu Anda telah berhasil dikirim!</span>
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            {/* Nama */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#54493D] uppercase tracking-wider block">
                Nama Anda
              </label>
              <input
                type="text"
                required
                placeholder="Masukkan nama lengkap Anda"
                value={rsvpName}
                onChange={(e) => setRsvpName(e.target.value)}
                className="w-full text-xs px-4 py-3 rounded-2xl border border-[#DFD6C9] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#82694D] transition-colors"
              />
            </div>

            {/* Konfirmasi Kehadiran */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#54493D] uppercase tracking-wider block">
                Konfirmasi Kehadiran
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: 'hadir', label: 'Ya, Hadir' },
                  { key: 'tidak_hadir', label: 'Tidak Hadir' },
                  { key: 'ragu', label: 'Ragu' }
                ].map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setAttendance(opt.key as 'hadir' | 'tidak_hadir' | 'ragu')}
                    className={`py-2 px-2 rounded-xl text-[11px] font-semibold transition-all border cursor-pointer ${
                      attendance === opt.key
                        ? 'bg-[#82694D] text-white border-[#82694D] shadow-xs'
                        : 'bg-[#FAF8F5] text-[#695D50] border-[#E2D9CC] hover:bg-white'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Jumlah Tamu */}
            {attendance === 'hadir' && (
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#54493D] uppercase tracking-wider block">
                  Jumlah Tamu Hadir
                </label>
                <select
                  value={guestsCount}
                  onChange={(e) => setGuestsCount(Number(e.target.value))}
                  className="w-full text-xs px-4 py-3 rounded-2xl border border-[#DFD6C9] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#82694D]"
                >
                  <option value={1}>1 Orang</option>
                  <option value={2}>2 Orang</option>
                  <option value={3}>3 Orang</option>
                </select>
              </div>
            )}

            {/* Ucapan & Doa */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#54493D] uppercase tracking-wider block">
                Ucapan &amp; Doa Restu
              </label>
              <textarea
                rows={3}
                required
                placeholder="Tuliskan doa tulus dan harapan baik Anda untuk kedua mempelai..."
                value={wishesMessage}
                onChange={(e) => setWishesMessage(e.target.value)}
                className="w-full text-xs px-4 py-3 rounded-2xl border border-[#DFD6C9] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#82694D] transition-colors resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-6 rounded-2xl bg-[#82694D] hover:bg-[#6E573C] text-white text-xs font-semibold tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {isSubmitting ? (
                <span>Mengirimkan Ucapan...</span>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim Ucapan &amp; Doa</span>
                </>
              )}
            </button>
          </form>
        </div>
      </ScrollReveal>

      {/* Realtime Wishes List */}
      <ScrollReveal variant="up">
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="font-serif-wedding text-sm font-bold text-[#352B20]">
              Ucapan Doa Terkini ({wishesList.length})
            </span>
            <span className="text-[10px] text-[#8C7E70] font-medium">
              Realtime Updates
            </span>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
            {wishesList.map((wish, idx) => (
              <ScrollReveal key={wish.id} variant="up" delay={idx * 80}>
                <div className="bg-white/95 rounded-2xl p-4 border border-[#ECE3D5] shadow-xs hover:shadow-md transition-shadow space-y-2 text-left">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-[#82694D]/15 text-[#82694D] flex items-center justify-center font-bold text-xs">
                        {wish.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#352B20]">
                          {wish.name}
                        </p>
                        <p className="text-[10px] text-[#8A7E72]">
                          {wish.timestamp}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        wish.attendance === 'hadir'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : wish.attendance === 'tidak_hadir'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {wish.attendance === 'hadir'
                        ? 'Hadir'
                        : wish.attendance === 'tidak_hadir'
                          ? 'Berhalangan'
                          : 'Belum Pasti'}
                    </span>
                  </div>

                  <p className="text-xs text-[#5D5245] leading-relaxed pl-9">
                    {wish.message}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default RSVPSection;
