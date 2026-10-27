import React, { useEffect, useState } from 'react';
import { Sparkles, Layers, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { getTierDisplayName, getTierBadgeColor } from '../templateHelpers';

interface TemplateTransitionLoadingProps {
  isOpen: boolean;
  targetTemplateName: string;
  targetTemplateId: string;
  targetTier: 'silver' | 'gold' | 'platinum' | 'premium';
  targetImage?: string;
  planName?: string;
}

export const TemplateTransitionLoading: React.FC<TemplateTransitionLoadingProps> = ({
  isOpen,
  targetTemplateName,
  targetTier,
  targetImage,
  planName,
}) => {
  const [progress, setProgress] = useState(15);
  const [stepIndex, setStepIndex] = useState(0);

  const steps = [
    'Menyimpan data template sebelumnya...',
    'Memuat data formulir & mempelai khusus template ini...',
    `Menyesuaikan fitur & kuota ${planName || getTierDisplayName(targetTier)}...`,
    'Menyiapkan dashboard undangan...',
  ];

  useEffect(() => {
    if (!isOpen) {
      setProgress(15);
      setStepIndex(0);
      return;
    }

    const t1 = setTimeout(() => {
      setProgress(45);
      setStepIndex(1);
    }, 200);

    const t2 = setTimeout(() => {
      setProgress(75);
      setStepIndex(2);
    }, 450);

    const t3 = setTimeout(() => {
      setProgress(100);
      setStepIndex(3);
    }, 700);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isOpen, planName, targetTier]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-stone-950/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
      {/* Ambient background glow */}
      <div className="absolute w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -translate-x-24 translate-y-24" />

      {/* Luxury Modal Card */}
      <div className="relative w-full max-w-md bg-stone-900/95 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(217,119,6,0.25)] text-center text-white overflow-hidden">
        {/* Subtle top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500" />

        {/* Animated Double Ring Spinner */}
        <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          {/* Outer spinning ring */}
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-amber-400 border-r-amber-500 animate-spin" />
          {/* Inner reverse spinning ring */}
          <div
            className="absolute inset-2 rounded-full border-2 border-transparent border-b-amber-300 border-l-amber-200 animate-spin"
            style={{ animationDirection: 'reverse', animationDuration: '1.2s' }}
          />
          {/* Center glowing circle */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500/30 to-amber-600/10 flex items-center justify-center border border-amber-400/40 shadow-[0_0_20px_rgba(217,119,6,0.4)]">
            <Sparkles className="w-6 h-6 text-amber-300 animate-pulse" />
          </div>
        </div>

        {/* Title & Subtitle */}
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-100 mb-1 tracking-tight">
          Beralih Template & Paket
        </h3>
        <p className="text-xs sm:text-sm text-stone-400 mb-6">
          Memuat data terpisah dan memigrasikan paket dashboard
        </p>

        {/* Target Template & Plan Card Preview */}
        <div className="bg-stone-950/70 border border-stone-800 rounded-2xl p-3.5 mb-5 flex items-center gap-3.5 text-left">
          {targetImage ? (
            <img
              src={targetImage}
              alt={targetTemplateName}
              className="w-14 h-14 rounded-xl object-cover border border-amber-500/30 shadow-md shrink-0"
            />
          ) : (
            <div className="w-14 h-14 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
              <Layers className="w-7 h-7 text-amber-400" />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-400 uppercase tracking-wider mb-0.5">
              <span>Template Tujuan</span>
              <ArrowRight className="w-3 h-3 text-amber-400" />
            </div>
            <h4 className="text-sm font-bold text-white truncate">
              {targetTemplateName}
            </h4>
            <div className="mt-1 flex items-center gap-2">
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${getTierBadgeColor(targetTier)}`}>
                <ShieldCheck className="w-3 h-3" />
                {planName || getTierDisplayName(targetTier)}
              </span>
            </div>
          </div>
        </div>

        {/* Animated Progress Bar */}
        <div className="w-full bg-stone-800/80 rounded-full h-2 mb-3 overflow-hidden p-0.5 border border-stone-700/60">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500 rounded-full transition-all duration-300 ease-out shadow-[0_0_12px_rgba(251,191,36,0.6)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Dynamic Step Status */}
        <div className="flex items-center justify-center gap-2 text-xs font-medium text-amber-200/90 min-h-[22px]">
          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 animate-pulse" />
          <span className="truncate">{steps[stepIndex]}</span>
        </div>

        {/* Footnote guarantee */}
        <p className="mt-5 text-[11px] text-stone-500">
          Data formulir, harga paket, dan galeri tersimpan secara independen di database.
        </p>
      </div>
    </div>
  );
};

export default TemplateTransitionLoading;
