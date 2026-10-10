import React from 'react';

/** Hand-drawn style lily line-art, drawn for the top-left corner. */
export const LilyCorner: React.FC<{ className?: string; opacity?: number }> = ({
  className = '',
  opacity = 0.75,
}) => {
  const petal = 'M100 128 C108 104 128 92 146 96 C136 112 120 124 100 128 Z';
  const petalInner = 'M100 128 C112 112 126 104 140 100';
  return (
    <svg
      viewBox="0 0 220 220"
      fill="none"
      stroke="#fff"
      strokeWidth={1.1}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* main stems */}
      <path d="M0 36 C42 46 74 78 100 128" />
      <path d="M0 70 C28 78 46 100 54 132" />
      <path d="M30 0 C40 30 62 52 96 66" />

      {/* long leaves */}
      <path d="M14 40 C30 14 58 4 92 8 C70 24 44 36 14 40 Z" />
      <path d="M14 40 C42 26 66 16 92 8" />
      <path d="M46 62 C34 92 38 124 58 152 C60 124 58 92 46 62 Z" />
      <path d="M46 62 C50 92 54 120 58 152" />
      <path d="M70 92 C96 84 124 90 150 112 C120 112 94 106 70 92 Z" />
      <path d="M70 92 C98 98 124 104 150 112" />
      <path d="M0 104 C18 108 30 124 34 148 C20 136 8 122 0 104 Z" />

      {/* lily flower */}
      <g>
        {[0, 60, 120, 180, 240, 300].map((r) => (
          <g key={r} transform={`rotate(${r} 100 128)`}>
            <path d={petal} />
            <path d={petalInner} strokeWidth={0.6} />
          </g>
        ))}
        {/* stamens */}
        {[-40, -10, 20, 50, 80].map((a) => {
          const rad = (a * Math.PI) / 180;
          const x = 100 + Math.cos(rad) * 26;
          const y = 128 + Math.sin(rad) * 26;
          return (
            <g key={a}>
              <path d={`M100 128 L${x.toFixed(1)} ${y.toFixed(1)}`} strokeWidth={0.7} />
              <ellipse cx={x} cy={y} rx={2.2} ry={1.3} fill="#fff" stroke="none" />
            </g>
          );
        })}
      </g>

      {/* buds */}
      <path d="M96 66 C110 52 128 50 140 56 C128 66 112 70 96 66 Z" />
      <path d="M96 66 C112 60 126 58 140 56" strokeWidth={0.6} />
      <path d="M54 132 C50 150 54 166 66 178 C70 162 66 146 54 132 Z" />

      {/* curls & small leaves */}
      <path d="M150 112 C166 118 176 132 172 146 C168 138 160 136 156 142" />
      <path d="M140 56 C156 50 170 54 178 66" />
      <path d="M6 150 C14 166 16 182 10 198" />
      <path d="M10 170 C20 168 26 174 26 182 C18 182 12 178 10 170 Z" />
      <circle cx="182" cy="74" r="1.6" fill="#fff" stroke="none" />
      <circle cx="176" cy="154" r="1.4" fill="#fff" stroke="none" />
      <circle cx="18" cy="206" r="1.3" fill="#fff" stroke="none" />
    </svg>
  );
};

interface FloralCornersProps {
  size?: string; // tailwind width class
  opacity?: number;
  only?: Array<'tl' | 'tr' | 'bl' | 'br'>;
}

/** Four mirrored lily corners framing a section. */
export const FloralCorners: React.FC<FloralCornersProps> = ({
  size = 'w-32',
  opacity = 0.75,
  only = ['tl', 'tr', 'bl', 'br'],
}) => {
  const pos: Record<string, string> = {
    tl: 'top-0 left-0',
    tr: 'top-0 right-0 -scale-x-100',
    bl: 'bottom-0 left-0 -scale-y-100',
    br: 'bottom-0 right-0 -scale-100',
  };
  return (
    <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden" aria-hidden="true">
      {only.map((c, i) => (
        <div key={c} className={`absolute ${pos[c]}`}>
          <div className={`dr-corner dr-corner-${c} ${size}`} style={{ animationDelay: `${i * 120}ms` }}>
            <LilyCorner opacity={opacity} className="w-full h-auto" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FloralCorners;
