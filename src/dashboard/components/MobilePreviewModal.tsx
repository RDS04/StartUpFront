import React, { useState } from 'react';
import {
  X,
  Volume2,
  VolumeX,
  Heart,
  Clock,
} from 'lucide-react';
import type { DashboardData } from '../types';

interface MobilePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: DashboardData;
  guestName: string;
  onCopyText: (text: string, label?: string) => void;
}

export const MobilePreviewModal: React.FC<MobilePreviewModalProps> = ({
  isOpen,
  onClose,
  data,
  guestName,
  onCopyText,
}) => {
  const [coverOpen, setCoverOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in">
      <div className="relative w-full max-w-[390px] h-[92vh] max-h-[820px] bg-stone-900 rounded-[50px] p-3 shadow-2xl border-4 border-stone-800 flex flex-col">
        {/* Dynamic Notch / Sensor Pill */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-stone-800 rounded-full z-30"></div>

        {/* Close Button on Top Right */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 z-40 bg-white text-stone-900 p-2 rounded-full shadow-lg hover:scale-105 transition cursor-pointer border border-stone-200"
          title="Tutup Pratinjau"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Phone Screen Container */}
        <div className="relative flex-1 bg-[#FAF7F2] rounded-[38px] overflow-y-auto overflow-x-hidden text-stone-800 select-none text-center">
          {/* Floating Audio Play/Pause Button */}
          {coverOpen && (
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className="fixed bottom-8 right-8 z-30 w-10 h-10 rounded-full bg-stone-900/90 text-white flex items-center justify-center shadow-lg border border-stone-700 hover:scale-105 transition cursor-pointer"
            >
              {isPlayingAudio ? (
                <Volume2 className="w-4 h-4 animate-pulse text-[#D4AF37]" />
              ) : (
                <VolumeX className="w-4 h-4 text-stone-400" />
              )}
            </button>
          )}

          {/* COVER SCREEN SIMULATOR */}
          {!coverOpen ? (
            <div className="absolute inset-0 bg-[#FAF7F2] z-20 flex flex-col items-center justify-center p-6 space-y-4 text-center">
              <span className="text-[10px] tracking-widest text-[#82694D] uppercase font-serif font-semibold">
                UNDANGAN PERNIKAHAN
              </span>

              <h1 className="font-serif text-3xl font-bold text-stone-900 leading-tight">
                {data.groom.nickName} & {data.bride.nickName}
              </h1>

              <div className="w-12 h-0.5 bg-[#82694D]/30 my-1"></div>

              <p className="text-xs text-stone-500 font-medium">{data.event.dateDisplay}</p>

              <div className="pt-4 pb-2 space-y-1 w-full max-w-[240px]">
                <p className="text-[11px] text-stone-400">Kepada Yth. Tamu Undangan:</p>
                <div className="px-4 py-2 bg-white rounded-xl shadow-xs border border-stone-200 font-serif font-bold text-stone-800 text-sm truncate">
                  {guestName || 'Tamu Terhormat'}
                </div>
              </div>

              <button
                onClick={() => {
                  setCoverOpen(true);
                  setIsPlayingAudio(true);
                }}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#82694D] hover:bg-[#6c553d] text-white rounded-full text-xs font-semibold shadow-md transition transform active:scale-95 cursor-pointer"
              >
                <span>Buka Undangan</span>
                <Heart className="w-3.5 h-3.5 fill-current" />
              </button>

              <p className="text-[10px] text-stone-400 italic">Sentuh tombol untuk membuka musik & detail acara</p>
            </div>
          ) : (
            /* INVITATION CONTENT BODY */
            <div className="p-4 space-y-6 pt-8 pb-16">
              {/* Header Title */}
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-stone-500 font-serif font-semibold">
                  Maha Suci Allah Yang Mempersatukan
                </p>
                <h2 className="font-serif text-2xl font-bold text-stone-900">
                  {data.groom.nickName} & {data.bride.nickName}
                </h2>
                <p className="text-xs text-[#82694D] font-medium">{data.event.dateDisplay}</p>
              </div>

              {/* Countdown Simulator */}
              <div className="grid grid-cols-4 gap-2 px-2">
                {[
                  { val: '24', lbl: 'Hari' },
                  { val: '08', lbl: 'Jam' },
                  { val: '15', lbl: 'Menit' },
                  { val: '40', lbl: 'Detik' },
                ].map((item, idx) => (
                  <div key={idx} className="bg-white p-2 rounded-xl shadow-xs border border-stone-200">
                    <span className="font-bold text-sm text-stone-800 block">{item.val}</span>
                    <span className="text-[9px] text-stone-400 uppercase font-medium">{item.lbl}</span>
                  </div>
                ))}
              </div>

              {/* Groom & Bride Profiles */}
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <img
                    src={data.groom.avatar}
                    alt="Groom"
                    className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-stone-300 shadow-sm"
                  />
                  <h3 className="font-serif font-bold text-stone-900 text-sm">{data.groom.fullName}</h3>
                  <p className="text-[10px] text-stone-500 max-w-[240px] mx-auto leading-relaxed">
                    {data.groom.parents}
                  </p>
                </div>

                <div className="font-serif text-lg text-[#82694D] font-bold">&</div>

                <div className="space-y-2">
                  <img
                    src={data.bride.avatar}
                    alt="Bride"
                    className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-stone-300 shadow-sm"
                  />
                  <h3 className="font-serif font-bold text-stone-900 text-sm">{data.bride.fullName}</h3>
                  <p className="text-[10px] text-stone-500 max-w-[240px] mx-auto leading-relaxed">
                    {data.bride.parents}
                  </p>
                </div>
              </div>

              {/* Event Cards */}
              <div className="space-y-3 pt-2">
                <div className="bg-white p-4 rounded-2xl shadow-xs border border-stone-200 space-y-1.5 text-left">
                  <span className="text-xs font-bold text-[#82694D] uppercase font-serif">Akad Nikah</span>
                  <p className="text-xs font-semibold text-stone-800 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-stone-400" /> {data.event.akadTime}
                  </p>
                  <p className="text-[11px] text-stone-600 font-medium">{data.event.akadPlace}</p>
                  <p className="text-[10px] text-stone-400">{data.event.akadAddress}</p>
                </div>

                <div className="bg-white p-4 rounded-2xl shadow-xs border border-stone-200 space-y-1.5 text-left">
                  <span className="text-xs font-bold text-[#82694D] uppercase font-serif">Resepsi Pernikahan</span>
                  <p className="text-xs font-semibold text-stone-800 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-stone-400" /> {data.event.resepsiTime}
                  </p>
                  <p className="text-[11px] text-stone-600 font-medium">{data.event.resepsiPlace}</p>
                  <p className="text-[10px] text-stone-400">{data.event.resepsiAddress}</p>
                </div>
              </div>

              {/* Digital Envelopes Preview */}
              <div className="bg-white p-4 rounded-2xl shadow-xs border border-stone-200 space-y-3 text-left">
                <span className="text-xs font-bold text-[#82694D] uppercase font-serif block text-center">
                  Amplop Digital Cashless
                </span>
                {data.bankAccounts.map((acc) => (
                  <div
                    key={acc.id}
                    className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-xs font-bold text-stone-800">{acc.bank}</p>
                      <p className="text-[11px] font-mono text-stone-600">{acc.number}</p>
                      <p className="text-[10px] text-stone-400">a.n {acc.holder}</p>
                    </div>
                    <button
                      onClick={() => onCopyText(acc.number, `Nomor rekening ${acc.bank} disalin`)}
                      className="px-2.5 py-1 bg-stone-200 hover:bg-stone-300 text-stone-800 text-[10px] font-semibold rounded-lg cursor-pointer"
                    >
                      Salin
                    </button>
                  </div>
                ))}
              </div>

              {/* Re-lock Cover Button */}
              <div className="pt-2">
                <button
                  onClick={() => setCoverOpen(false)}
                  className="text-xs text-stone-500 hover:text-stone-800 underline cursor-pointer"
                >
                  Kembali ke Tampilan Sampul (Cover)
                </button>
              </div>

              {/* Watermark */}
              <div className="pt-4 text-center">
                <p className="text-[10px] text-stone-400">
                  Powered by <span className="font-bold text-stone-600">i say yes</span> Digital Invitation
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
