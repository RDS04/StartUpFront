import React, { useState } from 'react';
import {
  X,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import type { DashboardData } from '../types';
import { normalizeTemplateId, getTemplateDisplayName } from '../templateHelpers';
import { RusticBlossomTemplate } from '../../tempalte/satu/main';
import { DustyRoseTemplate } from '../../tempalte/dua/main';
import { MinangMaroonTemplate } from '../../tempalte/tiga/main';
import { SageBlossomTemplate } from '../../tempalte/empat/main';
import { WisudaSatuTemplate, WisudaDuaTemplate } from '../../tempalte/Wisuda';
import { CardAtmPreviewPage } from '../../tempalte/CardAtm/CardAtmPreviewPage';

interface MobilePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: DashboardData;
  guestName: string;
  onCopyText?: (text: string, label?: string) => void;
  overrideTemplateId?: string;
}

export const MobilePreviewModal: React.FC<MobilePreviewModalProps> = ({
  isOpen,
  onClose,
  data,
  guestName,
  overrideTemplateId,
}) => {
  const [activeTab, setActiveTab] = useState<'cover' | 'content'>('cover');
  const activeTemplate = normalizeTemplateId(overrideTemplateId || data.activeTemplateId);
  const invitationUrl = `/#/${data.slug}`;

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-md flex flex-col items-center justify-center p-2 sm:p-4 animate-in fade-in"
      onClick={onClose}
    >
      {/* Top Floating Control Bar */}
      <div
        className="w-full max-w-[420px] mb-2 px-3 py-2 rounded-2xl bg-stone-900/90 border border-stone-700/80 shadow-xl flex items-center justify-between gap-2 text-white z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center shrink-0 text-emerald-300">
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <div className="min-w-0">
            <div className="text-[11px] font-bold text-white truncate flex items-center gap-1.5">
              <span>{getTemplateDisplayName(activeTemplate)}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <p className="text-[10px] text-emerald-300/90 truncate">
              Undangan Hasil Edit Dashboard
            </p>
          </div>
        </div>

        {/* Tab & Action Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="flex items-center bg-stone-800 p-0.5 rounded-xl border border-stone-700 text-[10px] font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab('cover')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                activeTab === 'cover'
                  ? 'bg-[#2D6A4F] text-white shadow-xs font-bold'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Sampul
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('content')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                activeTab === 'content'
                  ? 'bg-[#2D6A4F] text-white shadow-xs font-bold'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Isi Acara
            </button>
          </div>

          <a
            href={invitationUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#D4AF37] hover:bg-[#c49f2e] text-stone-950 text-[11px] font-bold shadow-xs transition cursor-pointer"
            title="Buka tampilan penuh di tab baru"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Layar Penuh</span>
          </a>

          <button
            onClick={onClose}
            className="p-1 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white transition cursor-pointer border border-stone-700"
            title="Tutup Pratinjau"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Smartphone Simulator Frame */}
      <div
        className="relative w-full max-w-[400px] h-[86vh] max-h-[820px] bg-stone-900 rounded-[48px] p-2.5 sm:p-3 shadow-[0_25px_60px_rgba(0,0,0,0.8)] border-4 border-stone-700/80 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Dynamic Notch Sensor Pill */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-stone-800 rounded-full z-40 pointer-events-none shadow-inner border border-stone-700/50 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-stone-900/90 ml-auto mr-3 border border-stone-700/40"></div>
        </div>

        {/* Screen Bezel Container */}
        <div className="relative flex-1 rounded-[38px] overflow-y-auto overflow-x-hidden select-none no-scrollbar shadow-inner bg-black">
          {activeTemplate === 'template-satu' && (
            <div className="min-h-full bg-[#180407]">
              <RusticBlossomTemplate
                key={`${activeTab}-${activeTemplate}`}
                isEmbedded={true}
                defaultOpen={activeTab === 'content'}
                isPreview={false}
                guestName={guestName || 'Tamu Terhormat'}
              />
            </div>
          )}

          {activeTemplate === 'template-dua' && (
            <div className="min-h-full bg-[#7e5f62]">
              <DustyRoseTemplate
                key={`${activeTab}-${activeTemplate}`}
                isEmbedded={true}
                defaultOpen={activeTab === 'content'}
                isPreview={false}
                guestName={guestName || 'Tamu Terhormat'}
              />
            </div>
          )}

          {activeTemplate === 'template-tiga' && (
            <div className="min-h-full bg-[#200306]">
              <MinangMaroonTemplate
                key={`${activeTab}-${activeTemplate}`}
                isEmbedded={true}
                defaultOpen={activeTab === 'content'}
                isPreview={false}
                guestName={guestName || 'Tamu Terhormat'}
              />
            </div>
          )}

          {activeTemplate === 'template-empat' && (
            <div className="min-h-full bg-[#1e2a20]">
              <SageBlossomTemplate
                key={`${activeTab}-${activeTemplate}`}
                isEmbedded={true}
                defaultOpen={activeTab === 'content'}
                isPreview={false}
                guestName={guestName || 'Tamu Terhormat'}
              />
            </div>
          )}

          {activeTemplate === 'card-atm' && (
            <div className="min-h-full bg-stone-950">
              <CardAtmPreviewPage onBack={onClose} />
            </div>
          )}

          {activeTemplate === 'wisuda-satu' && (
            <div className="min-h-full bg-[#332e2b]">
              <WisudaSatuTemplate isEmbedded={true} onBack={onClose} />
            </div>
          )}

          {activeTemplate === 'wisuda-dua' && (
            <div className="min-h-full bg-[#070709]">
              <WisudaDuaTemplate isEmbedded={true} onBack={onClose} />
            </div>
          )}
        </div>

        {/* Bottom Home Indicator Bar */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/35 rounded-full pointer-events-none z-40"></div>
      </div>
    </div>
  );
};

export default MobilePreviewModal;
