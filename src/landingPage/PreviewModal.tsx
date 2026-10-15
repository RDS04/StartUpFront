import { useState } from 'react';
import { X, Play, Pause, MapPin, Mail, Calendar, Heart, Send, Check, ExternalLink } from 'lucide-react';
import type { TemplateItem } from './TemplateSection';
import { RusticBlossomTemplate } from '../tempalte/satu/main';
import { DustyRoseTemplate } from '../tempalte/dua/main';
import { MinangMaroonTemplate } from '../tempalte/tiga/main';
import { SageBlossomTemplate } from '../tempalte/empat/main';
import { WisudaSatuTemplate, WisudaDuaTemplate } from '../tempalte/Wisuda';

interface PreviewModalProps {
  template: TemplateItem | null;
  onClose: () => void;
  onSelect: (template: TemplateItem) => void;
}

export const PreviewModal = ({
  template,
  onClose,
  onSelect,
}: PreviewModalProps) => {
  const [isPlayingMusic, setIsPlayingMusic] = useState(true);
  const [rsvpSent, setRsvpSent] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestAttendance, setGuestAttendance] = useState('Hadir');
  const [activeTab, setActiveTab] = useState<'cover' | 'content'>('cover');

  if (!template) return null;

  const isWisudaDua =
    template.id === 't-wisuda-2' ||
    template.themeStyle === 'wisuda-yolanda' ||
    template.title.toLowerCase().includes('yolanda') ||
    template.title.toLowerCase().includes('black gold');
  const isWisudaSatu =
    (template.id === 't-wisuda-1' ||
    template.themeStyle === 'wisuda-karin' ||
    template.category === 'Undangan Wisuda' ||
    template.category === 'Wisuda') && !isWisudaDua;
  const isWisuda = isWisudaSatu || isWisudaDua;
  const isRusticTpl =
    template.id === 't1' ||
    template.themeStyle === 'rustic' ||
    template.title.toLowerCase().includes('rustic');
  const isDustyRose = template.id === 't2' || template.themeStyle === 'dusty-rose';
  const isMinangMaroon = template.id === 't3' || template.themeStyle === 'minang-maroon';
  const isSageGarden = template.id === 't4' || template.themeStyle === 'sage-garden';
  // "isRustic" = template punya pratinjau asli multi-section (dipakai untuk tab Sampul/Isi Acara)
  const isRustic = (isRusticTpl || isDustyRose || isMinangMaroon || isSageGarden) && !isWisuda;
  const fullHref = isWisudaDua
    ? '#/wisuda-dua'
    : isWisudaSatu
    ? '#/wisuda'
    : isSageGarden
    ? '#/template-empat'
    : isMinangMaroon
    ? '#/template-tiga'
    : isDustyRose
    ? '#/template-dua'
    : '#/template-satu';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[94vh] border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between px-5 py-3 border-b border-slate-100 bg-[#fafbfc] gap-2">
          <div className="flex items-center gap-2">
            <span className="font-serif-wedding text-base font-semibold text-slate-800">
              Pratinjau: {template.title}
            </span>
            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold text-white ${
              template.badge === 'GRATIS' ? 'bg-emerald-600' :
              template.badge === 'BRONZE' ? 'bg-amber-700' : 'bg-amber-500'
            }`}>
              {template.badge}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isRustic && (
              <div className="flex items-center bg-slate-100 p-0.5 rounded-full text-[10px] font-semibold border border-slate-200">
                <button
                  type="button"
                  onClick={() => setActiveTab('cover')}
                  className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                    activeTab === 'cover' ? 'bg-white text-[#82694D] shadow-xs' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Sampul
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('content')}
                  className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                    activeTab === 'content' ? 'bg-white text-[#82694D] shadow-xs' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Isi Acara
                </button>
              </div>
            )}

            {(isRustic || isWisuda) && (
              <a
                href={fullHref}
                onClick={onClose}
                className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold text-[#82694D] bg-[#F7F3EC] border border-[#82694D]/30 hover:bg-[#82694D] hover:text-white transition-all cursor-pointer"
                title="Buka dalam mode layar penuh"
              >
                <ExternalLink className="w-3 h-3" />
                <span>Layar Penuh</span>
              </a>
            )}

            <button
              onClick={onClose}
              className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content: REAL TEMPLATE PREVIEW */}
        {isWisudaDua ? (
          <div className="flex-1 overflow-y-auto relative bg-[#070709] min-h-[580px] max-h-[78vh] no-scrollbar">
            <WisudaDuaTemplate isEmbedded={true} onBack={onClose} />
          </div>
        ) : isWisudaSatu ? (
          <div className="flex-1 overflow-y-auto relative bg-[#332e2b] min-h-[580px] max-h-[78vh] no-scrollbar">
            <WisudaSatuTemplate isEmbedded={true} onBack={onClose} />
          </div>
        ) : isSageGarden ? (
          <div className="flex-1 overflow-y-auto relative bg-[#1e2a20] min-h-[580px] max-h-[78vh] no-scrollbar">
            <SageBlossomTemplate key={activeTab} isEmbedded={true} defaultOpen={activeTab === 'content'} isPreview={true} />
          </div>
        ) : isMinangMaroon ? (
          <div className="flex-1 overflow-y-auto relative bg-[#200306] min-h-[580px] max-h-[78vh] no-scrollbar">
            <MinangMaroonTemplate key={activeTab} isEmbedded={true} defaultOpen={activeTab === 'content'} isPreview={true} />
          </div>
        ) : isDustyRose ? (
          <div className="flex-1 overflow-y-auto relative bg-[#967678] min-h-[580px] max-h-[78vh] no-scrollbar">
            <DustyRoseTemplate key={activeTab} isEmbedded={true} defaultOpen={activeTab === 'content'} isPreview={true} />
          </div>
        ) : isRustic ? (
          <div className="flex-1 overflow-y-auto relative bg-[#F9F6F0] min-h-[580px] max-h-[78vh] no-scrollbar">
            <RusticBlossomTemplate key={activeTab} isEmbedded={true} defaultOpen={activeTab === 'content'} isPreview={true} />
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#fcfdfa] text-center">
            {/* Audio Floating Controller */}
            <div className="flex justify-end">
              <button
                onClick={() => setIsPlayingMusic(!isPlayingMusic)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold shadow-xs hover:bg-amber-100 transition-colors"
              >
                {isPlayingMusic ? <Pause className="w-3.5 h-3.5 text-amber-700" /> : <Play className="w-3.5 h-3.5 text-amber-700" />}
                <span>{isPlayingMusic ? 'Musik Aktif' : 'Putar Musik'}</span>
              </button>
            </div>

          {/* Invitation Cover Card */}
          <div className="p-8 rounded-2xl bg-white border border-amber-200/80 shadow-sm relative overflow-hidden">
            <div className="text-xs uppercase tracking-widest text-amber-700/80 font-medium mb-2">
              Undangan Pernikahan
            </div>
            
            <h2 className="font-serif-wedding text-3xl font-bold text-slate-800 my-3">
              {template.names}
            </h2>

            <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed mb-4">
              Dengan penuh rasa syukur dan memohon rahmat Allah SWT, kami bermaksud menyelenggarakan pernikahan kami.
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-700">
              <Calendar className="w-3.5 h-3.5 text-emerald-700" />
              <span>Sabtu, {template.date || '20'} Desember 2026</span>
            </div>
          </div>

          {/* Features in Invitation Demo */}
          <div className="grid grid-cols-2 gap-3 text-left">
            <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-emerald-700" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">Peta &amp; Navigasi</h4>
                <p className="text-[10px] text-slate-500">Integrasi Google Maps ke lokasi gedung</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-amber-700" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">Amplop Digital</h4>
                <p className="text-[10px] text-slate-500">Transfer kado via BCA, Mandiri &amp; QRIS</p>
              </div>
            </div>
          </div>

          {/* Quick RSVP Form Demo */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 text-left space-y-3">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                Konfirmasi Kehadiran (RSVP)
              </h4>
            </div>

            {rsvpSent ? (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Terima kasih! Konfirmasi kehadiran Anda berhasil dikirim.</span>
              </div>
            ) : (
              <div className="space-y-2.5">
                <input
                  type="text"
                  placeholder="Nama Lengkap Tamu"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-600"
                />
                <select
                  value={guestAttendance}
                  onChange={(e) => setGuestAttendance(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none"
                >
                  <option value="Hadir">Akan Hadir</option>
                  <option value="Ragu-ragu">Masih Ragu-ragu</option>
                  <option value="Tidak Hadir">Maaf Tidak Bisa Hadir</option>
                </select>
                <button
                  type="button"
                  onClick={() => setRsvpSent(true)}
                  className="w-full py-2 rounded-lg text-xs font-semibold text-white bg-slate-800 hover:bg-slate-900 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim RSVP Realtime</span>
                </button>
              </div>
            )}
          </div>

        </div>
        )}

        {/* Modal Bottom CTA */}
        <div className="p-4 border-t border-slate-100 bg-[#fafbfc] flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Tutup
            </button>
            {isRustic && (
              <a
                href={fullHref}
                onClick={onClose}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold text-[#82694D] bg-[#F7F3EC] border border-[#82694D]/30 hover:bg-[#82694D] hover:text-white transition-all cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Buka Undangan Penuh</span>
              </a>
            )}
          </div>
          <button
            onClick={() => {
              onSelect(template);
              onClose();
            }}
            className="px-5 py-2 rounded-full text-xs font-bold text-white bg-[#2b6547] hover:bg-[#204d35] shadow-md transition-all cursor-pointer"
          >
            Gunakan Template Ini
          </button>
        </div>

      </div>
    </div>
  );
};
