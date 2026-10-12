import React from 'react';

export const GoldenSparkles: React.FC = () => {
  const sparkles = [
    { top: '12%', left: '15%', size: 4, delay: '0s', duration: '5s' },
    { top: '22%', right: '18%', size: 6, delay: '1.2s', duration: '6s' },
    { top: '45%', left: '10%', size: 5, delay: '2.5s', duration: '4.5s' },
    { top: '65%', right: '12%', size: 5, delay: '0.8s', duration: '5.5s' },
    { top: '82%', left: '20%', size: 4, delay: '3s', duration: '6s' },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 select-none">
      {sparkles.map((s, idx) => (
        <span
          key={idx}
          className="absolute rounded-full bg-[#f3df95] opacity-40 shadow-[0_0_8px_#f3df95] animate-particle"
          style={{
            top: s.top,
            left: s.left,
            right: s.right,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: s.delay,
            animationDuration: s.duration,
          }}
        />
      ))}
    </div>
  );
};
