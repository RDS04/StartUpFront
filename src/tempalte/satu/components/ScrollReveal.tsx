import React, { useRef, useEffect } from 'react';

export type ScrollRevealVariant = 'up' | 'down' | 'zoom' | 'left' | 'right' | 'flip';

export interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: ScrollRevealVariant;
  delay?: number;
  className?: string;
}

// --- Scroll Reveal Animation Component (IntersectionObserver) ---
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  variant = 'up',
  delay = 0,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('reveal-active');
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  const variantClass =
    variant === 'zoom'
      ? 'reveal-zoom'
      : variant === 'left'
        ? 'reveal-left'
        : variant === 'right'
          ? 'reveal-right'
          : variant === 'down'
            ? 'reveal-down'
            : variant === 'flip'
              ? 'reveal-flip'
              : 'reveal-init';

  return (
    <div
      ref={ref}
      className={`${variantClass} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
