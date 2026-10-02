import React, { useRef, useEffect } from 'react';

// --- Scroll Reveal Animation Component (IntersectionObserver) ---
export const ScrollReveal: React.FC<{
  children: React.ReactNode;
  variant?: 'up' | 'zoom' | 'left' | 'right';
  delay?: number;
  className?: string;
}> = ({ children, variant = 'up', delay = 0, className = '' }) => {
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
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
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
