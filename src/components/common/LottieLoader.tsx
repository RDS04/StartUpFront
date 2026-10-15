import React, { useEffect, useRef, useState } from 'react';
import lottie, { type AnimationItem } from 'lottie-web';
import animationData from '../../assets/loading-animation.json';

export interface LottieLoaderProps {
  size?: number;
  className?: string;
  text?: string;
  subtext?: string;
  loop?: boolean;
  autoplay?: boolean;
}

/**
 * Reusable Lottie Loading Animation Component
 * Animasi morphing liquid circle/teardrop dengan gradasi Cyan-Blue-Indigo-Magenta
 */
export const LottieLoader: React.FC<LottieLoaderProps> = ({
  size = 90,
  className = '',
  text,
  subtext,
  loop = true,
  autoplay = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<AnimationItem | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Destroy existing instance if any
    if (animRef.current) {
      animRef.current.destroy();
    }

    animRef.current = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop,
      autoplay,
      animationData,
    });

    return () => {
      if (animRef.current) {
        animRef.current.destroy();
        animRef.current = null;
      }
    };
  }, [loop, autoplay]);

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div 
        ref={containerRef} 
        style={{ width: size, height: size }}
        className="relative flex items-center justify-center shrink-0 drop-shadow-[0_8px_24px_rgba(114,9,183,0.35)]"
      />
      {text && (
        <p className="mt-3 text-sm font-bold text-white tracking-wide text-center animate-pulse">
          {text}
        </p>
      )}
      {subtext && (
        <p className="mt-1 text-xs text-slate-400 text-center max-w-xs leading-relaxed">
          {subtext}
        </p>
      )}
    </div>
  );
};

export interface GlobalLoadingOverlayProps {
  isVisible?: boolean;
  text?: string;
  subtext?: string;
}

/**
 * Fullscreen Global Loading Overlay
 * Bisa dipicu via props atau via event global:
 * triggerLoading(true, "Memproses Pembayaran...")
 */
export const GlobalLoadingOverlay: React.FC<GlobalLoadingOverlayProps> = ({
  isVisible: propVisible,
  text: propText,
  subtext: propSubtext,
}) => {
  const [internalVisible, setInternalVisible] = useState(false);
  const [internalText, setInternalText] = useState('Memproses...');
  const [internalSubtext, setInternalSubtext] = useState('Mohon tunggu sebentar, sistem sedang memverifikasi data Anda');

  useEffect(() => {
    const handleLoadingEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ show: boolean; text?: string; subtext?: string }>;
      if (customEvent.detail) {
        setInternalVisible(!!customEvent.detail.show);
        if (customEvent.detail.text) setInternalText(customEvent.detail.text);
        if (customEvent.detail.subtext) setInternalSubtext(customEvent.detail.subtext);
      }
    };

    window.addEventListener('app:loading', handleLoadingEvent);
    return () => {
      window.removeEventListener('app:loading', handleLoadingEvent);
    };
  }, []);

  const visible = propVisible !== undefined ? propVisible : internalVisible;
  const displayText = propText || internalText;
  const displaySubtext = propSubtext || internalSubtext;

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-300 animate-in fade-in">
      <LottieLoader size={60} />
    </div>
  );
};

/**
 * Helper function untuk memicu global loading dari mana saja
 */
export function triggerLoading(show: boolean, text?: string, subtext?: string) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('app:loading', {
        detail: { show, text, subtext },
      })
    );
  }
}
