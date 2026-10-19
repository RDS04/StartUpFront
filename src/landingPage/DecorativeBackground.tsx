export const WindowSunlightShadows = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      
      {/* 1. Large Warm Sunlight Shafts (Diagonal Golden Ambient Rays) */}
      <div 
        className="absolute -top-40 -left-40 w-[140%] h-[850px] pointer-events-none opacity-40 animate-sun-drift"
        style={{
          background: 'linear-gradient(135deg, rgba(254, 249, 195, 0.45) 0%, rgba(255, 255, 255, 0.9) 25%, rgba(240, 244, 248, 0.2) 60%, transparent 80%)',
          filter: 'blur(50px)',
          transform: 'rotate(-26deg)'
        }}
      />

      {/* 2. Window Frame Shadow Casts (Diagonal Shadows of Window Panes cutting across Hero) */}
      <div 
        className="absolute -top-60 -left-20 w-[120%] h-[900px] pointer-events-none opacity-25 mix-blend-multiply animate-sun-drift"
        style={{ transform: 'rotate(-28deg)' }}
      >
        {/* Shadow Mullion Bar 1 */}
        <div className="absolute top-0 left-[15%] w-16 sm:w-24 h-full bg-slate-800/40 blur-[36px]" />
        
        {/* Light Shaft Between Panes */}
        <div className="absolute top-0 left-[26%] w-28 sm:w-40 h-full bg-transparent" />
        
        {/* Shadow Mullion Bar 2 (Cuts right through main text) */}
        <div className="absolute top-0 left-[42%] w-20 sm:w-32 h-full bg-slate-900/45 blur-[42px]" />
        
        {/* Horizontal Window Bar Cross shadow */}
        <div className="absolute top-[35%] left-0 w-full h-16 sm:h-24 bg-slate-800/35 blur-[38px]" />

        {/* Shadow Mullion Bar 3 */}
        <div className="absolute top-0 left-[68%] w-24 sm:w-36 h-full bg-slate-800/35 blur-[45px]" />
      </div>

      {/* 3. Soft Organic Tree / Monstera Leaf Shadows swaying in the breeze */}
      <div className="absolute top-0 left-0 w-96 h-96 pointer-events-none opacity-20 mix-blend-multiply blur-xl animate-leaf-sway">
        <svg viewBox="0 0 300 300" fill="none" className="w-full h-full text-slate-800">
          <ellipse cx="60" cy="80" rx="60" ry="25" transform="rotate(-30 60 80)" fill="currentColor" />
          <ellipse cx="110" cy="110" rx="70" ry="30" transform="rotate(-20 110 110)" fill="currentColor" />
          <ellipse cx="140" cy="160" rx="80" ry="32" transform="rotate(10 140 160)" fill="currentColor" />
          <ellipse cx="90" cy="190" rx="65" ry="28" transform="rotate(-40 90 190)" fill="currentColor" />
          <ellipse cx="50" cy="240" rx="55" ry="25" transform="rotate(-15 50 240)" fill="currentColor" />
        </svg>
      </div>

    </div>
  );
};

export const GoldBrushStroke = ({ className = "" }: { className?: string }) => (
  <div className={`relative inline-block pointer-events-none ${className}`}>
    <svg viewBox="0 0 260 45" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_2px_4px_rgba(180,130,40,0.3)]">
      <path 
        d="M 6 16 C 45 22, 100 24, 155 18 C 190 14, 230 8, 252 10 C 248 16, 210 27, 155 28 C 95 29, 40 23, 6 16 Z" 
        fill="url(#goldGradientBrush)" 
      />
      <path 
        d="M 20 17 C 60 22, 115 23, 168 18 C 198 15, 232 10, 246 12 C 235 16, 202 24, 160 25 C 105 26, 52 21, 20 17 Z" 
        fill="url(#goldFoilGlitter)" 
        opacity="0.9" 
      />
      <defs>
        <linearGradient id="goldGradientBrush" x1="0" y1="0" x2="260" y2="45" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#c59239" />
          <stop offset="25%" stopColor="#f9e29f" />
          <stop offset="50%" stopColor="#dca543" />
          <stop offset="80%" stopColor="#faecbe" />
          <stop offset="100%" stopColor="#aa7420" />
        </linearGradient>
        <linearGradient id="goldFoilGlitter" x1="260" y1="0" x2="0" y2="45" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fff8d6" />
          <stop offset="50%" stopColor="#e5b14c" />
          <stop offset="100%" stopColor="#fff3bf" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

export const GoldFoilSplash = ({ className = "" }: { className?: string }) => (
  <div className={`pointer-events-none ${className}`}>
    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-md">
      <path 
        d="M20 50C15 35 30 20 45 25C60 15 75 25 80 40C90 55 80 75 65 80C50 85 30 80 25 65C15 65 18 55 20 50Z" 
        fill="url(#goldFoilGrad)" 
      />
      <circle cx="28" cy="18" r="3" fill="#e8ba55" opacity="0.8" />
      <circle cx="85" cy="28" r="2.5" fill="#f5d688" opacity="0.9" />
      <circle cx="82" cy="78" r="3.5" fill="#c68f2c" opacity="0.8" />
      <circle cx="15" cy="72" r="2" fill="#dfad45" opacity="0.85" />
      <defs>
        <linearGradient id="goldFoilGrad" x1="15" y1="15" x2="85" y2="85" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#dca44e" />
          <stop offset="30%" stopColor="#fae7b5" />
          <stop offset="60%" stopColor="#bf8529" />
          <stop offset="100%" stopColor="#edd393" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

export const WeddingRingsIcon = ({ className = "w-9 h-9" }: { className?: string }) => (
  <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xs">
      {/* Dark background circle */}
      <circle cx="24" cy="24" r="22" fill="#111827" />
      {/* Left Ring */}
      <ellipse cx="18" cy="26" rx="8.5" ry="8.5" stroke="#ffffff" strokeWidth="2.8" strokeLinecap="round" />
      {/* Right Ring linked */}
      <ellipse cx="28" cy="26" rx="8.5" ry="8.5" stroke="#ffffff" strokeWidth="2.8" strokeLinecap="round" />
      {/* Diamond / Heart Accent */}
      <path 
        d="M28 11.5C26.5 9.5 24 10.5 24 12.5C24 15 28 17.5 28 17.5C28 17.5 32 15 32 12.5C32 10.5 29.5 9.5 28 11.5Z" 
        fill="#ffffff" 
      />
    </svg>
  </div>
);

export const SaveTheDateBadge = () => (
  <div className="flex flex-col items-center p-2 sm:p-2.5 rounded-2xl bg-white border border-rose-100 shadow-xl shadow-rose-950/10 text-center w-24 sm:w-28 select-none">
    {/* Calendar Header with Rings */}
    <div className="w-full bg-[#f87171] rounded-t-lg py-0.5 sm:py-1 px-2 flex justify-between items-center text-white">
      <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
      <span className="text-[8px] sm:text-[9px] font-bold tracking-wider uppercase">DEC</span>
      <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
    </div>
    {/* Hearts in Center */}
    <div className="py-1 flex items-center justify-center gap-1">
      <span className="text-xs">❤️</span>
      <span className="text-sm">💖</span>
      <span className="text-xs">💜</span>
    </div>
    <span className="font-script-calligraphy text-sm sm:text-base font-bold text-slate-800 leading-none">
      Save the Date
    </span>
  </div>
);

export const BotanicalLeaves = {
  TopRight: () => (
    <div className="absolute -top-4 -right-4 w-48 sm:w-56 h-48 sm:h-56 pointer-events-none z-10 opacity-95 drop-shadow-sm">
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Main curved branch */}
        <path d="M195 5C140 30 110 80 98 135C90 175 60 190 20 200" stroke="#165b39" strokeWidth="3" strokeLinecap="round" />
        {/* Elegant eucalyptus leaves */}
        <path d="M180 20C160 5 135 15 145 40C155 65 175 45 180 20Z" fill="#1b5e3d" />
        <path d="M155 45C135 32 110 42 120 67C130 87 150 67 155 45Z" fill="#2d7a54" />
        <path d="M130 72C110 62 90 72 100 97C110 117 125 92 130 72Z" fill="#165b39" />
        <path d="M110 108C90 98 75 113 85 133C95 153 110 128 110 108Z" fill="#236e47" />
        <path d="M80 142C65 132 50 147 60 167C70 182 85 157 80 142Z" fill="#1b5e3d" />
        <path d="M50 172C38 165 25 178 35 192C45 202 55 182 50 172Z" fill="#2d7a54" />
      </svg>
    </div>
  ),
  BottomLeft: () => (
    <div className="absolute -bottom-8 -left-8 w-52 h-52 pointer-events-none z-10 opacity-95 drop-shadow-sm">
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M10 195C60 170 90 120 102 65C110 25 140 10 180 0" stroke="#165b39" strokeWidth="3" strokeLinecap="round" />
        <path d="M20 180C40 195 65 185 55 160C45 135 25 155 20 180Z" fill="#1b5e3d" />
        <path d="M45 155C65 168 90 158 80 133C70 113 50 133 45 155Z" fill="#2d7a54" />
        <path d="M70 128C90 138 110 128 100 103C90 83 75 108 70 128Z" fill="#165b39" />
        <path d="M90 92C110 102 125 87 115 67C105 47 90 72 90 92Z" fill="#236e47" />
        <path d="M120 58C135 68 150 53 140 33C130 18 115 43 120 58Z" fill="#1b5e3d" />
      </svg>
    </div>
  ),
  BottomRight: () => (
    <div className="absolute -bottom-8 -right-8 w-52 h-52 pointer-events-none z-10 opacity-95 drop-shadow-sm">
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M190 195C140 170 110 120 98 65C90 25 60 10 20 0" stroke="#165b39" strokeWidth="3" strokeLinecap="round" />
        <path d="M180 180C160 195 135 185 145 160C155 135 175 155 180 180Z" fill="#1b5e3d" />
        <path d="M155 155C135 168 110 158 120 133C130 113 150 133 155 155Z" fill="#2d7a54" />
        <path d="M130 128C110 138 90 128 100 103C110 83 125 108 130 128Z" fill="#165b39" />
        <path d="M110 92C90 102 75 87 85 67C95 47 110 72 110 92Z" fill="#236e47" />
      </svg>
    </div>
  )
};

{/* Signature Botanical Olive Branches with Olives at Bottom of Hero */}
export const HeroOliveBranches = () => (
  <div className="absolute -bottom-2 sm:-bottom-4 left-0 right-0 w-full pointer-events-none z-10 overflow-hidden select-none flex justify-between items-end px-2 sm:px-10 lg:px-16">
    {/* Left Olive Branch with 2 Hanging Olives */}
    <div className="w-56 sm:w-80 lg:w-96 h-20 sm:h-28 opacity-90 drop-shadow-xs">
      <svg viewBox="0 0 320 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Main Stem curving upwards to right */}
        <path 
          d="M 10 110 C 70 100, 140 70, 200 35 C 240 12, 280 20, 310 45" 
          stroke="#205537" 
          strokeWidth="2.8" 
          strokeLinecap="round" 
        />
        
        {/* Leaves along stem */}
        <path d="M 40 102 C 30 85, 45 75, 65 88 C 75 98, 55 108, 40 102 Z" fill="#24603e" />
        <path d="M 75 90 C 70 70, 90 62, 105 78 C 115 90, 95 98, 75 90 Z" fill="#1b4d31" />
        <path d="M 110 75 C 100 55, 120 48, 138 65 C 148 78, 128 85, 110 75 Z" fill="#296c46" />
        <path d="M 145 60 C 140 40, 160 32, 178 50 C 188 62, 165 70, 145 60 Z" fill="#1e5436" />
        <path d="M 185 45 C 180 25, 205 18, 222 36 C 230 48, 208 55, 185 45 Z" fill="#24603e" />
        <path d="M 230 28 C 235 8, 260 12, 268 28 C 272 42, 250 42, 230 28 Z" fill="#1b4d31" />
        <path d="M 285 35 C 295 20, 315 25, 318 42 C 315 52, 298 48, 285 35 Z" fill="#296c46" />

        {/* Little pendant stem 1 for Olive 1 */}
        <path d="M 95 83 C 92 92, 90 98, 88 102" stroke="#205537" strokeWidth="1.5" strokeLinecap="round" />
        {/* Olive 1: Oval fruit with deep olive green */}
        <ellipse cx="87" cy="108" rx="6.5" ry="9.5" transform="rotate(-12 87 108)" fill="#18432a" />
        <ellipse cx="85" cy="106" rx="2" ry="4" transform="rotate(-12 85 106)" fill="#2f784f" opacity="0.6" />

        {/* Little pendant stem 2 for Olive 2 */}
        <path d="M 130 68 C 130 78, 132 86, 135 90" stroke="#205537" strokeWidth="1.5" strokeLinecap="round" />
        {/* Olive 2: Oval fruit */}
        <ellipse cx="136" cy="98" rx="6.5" ry="9.5" transform="rotate(15 136 98)" fill="#143c25" />
        <ellipse cx="134" cy="96" rx="2" ry="4" transform="rotate(15 134 96)" fill="#2a6d47" opacity="0.6" />
      </svg>
    </div>

    {/* Right Olive Branch Curving Upward along the Green Wave */}
    <div className="w-48 sm:w-64 lg:w-72 h-18 sm:h-24 opacity-90 drop-shadow-xs">
      <svg viewBox="0 0 260 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path 
          d="M 250 95 C 190 85, 130 60, 80 30 C 50 12, 20 20, 0 40" 
          stroke="#205537" 
          strokeWidth="2.8" 
          strokeLinecap="round" 
        />
        <path d="M 210 88 C 220 70, 200 62, 185 78 C 175 90, 195 98, 210 88 Z" fill="#24603e" />
        <path d="M 165 72 C 175 52, 155 45, 138 62 C 128 75, 150 82, 165 72 Z" fill="#1b4d31" />
        <path d="M 120 52 C 130 32, 110 25, 92 42 C 85 55, 105 62, 120 52 Z" fill="#296c46" />
        <path d="M 65 32 C 70 15, 50 12, 38 28 C 32 40, 52 45, 65 32 Z" fill="#1e5436" />
      </svg>
    </div>
  </div>
);

{/* Dedicated Lush Botanical Leaves in Bottom-Left Corner */}
export const HeroBottomLeftLeaves = () => (
  <div className="absolute -bottom-8 -left-8 sm:-bottom-12 sm:-left-12 w-64 sm:w-80 lg:w-96 h-64 sm:h-80 lg:h-96 pointer-events-none z-10 overflow-hidden select-none drop-shadow-md">
    <svg viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Main curvy branch */}
      <path d="M 0 320 C 50 260, 95 210, 135 150 C 165 105, 180 50, 190 0" stroke="#1d4d31" strokeWidth="4" strokeLinecap="round" />
      <path d="M 75 240 C 115 210, 165 180, 215 170" stroke="#1d4d31" strokeWidth="3" strokeLinecap="round" />
      <path d="M 125 165 C 155 140, 205 110, 255 95" stroke="#1d4d31" strokeWidth="2.5" strokeLinecap="round" />

      {/* Lush Leaves */}
      <path d="M 35 285 C 15 255, 30 225, 70 240 C 90 260, 65 290, 35 285 Z" fill="#2d6a4f" />
      <path d="M 35 285 Q 50 260 70 240" stroke="#1b4332" strokeWidth="1.5" />

      <path d="M 60 250 C 80 215, 115 225, 110 260 C 100 280, 70 275, 60 250 Z" fill="#1e5436" />
      <path d="M 60 250 Q 90 245 110 260" stroke="#143c25" strokeWidth="1.5" />

      <path d="M 90 220 C 75 185, 95 160, 130 180 C 145 200, 120 230, 90 220 Z" fill="#24603e" />
      <path d="M 90 220 Q 110 195 130 180" stroke="#1b4332" strokeWidth="1.5" />

      <path d="M 120 190 C 140 155, 175 165, 170 200 C 160 220, 130 215, 120 190 Z" fill="#347a59" />
      <path d="M 120 190 Q 150 185 170 200" stroke="#1e5436" strokeWidth="1.5" />

      <path d="M 150 145 C 135 110, 160 90, 190 110 C 200 130, 180 155, 150 145 Z" fill="#24603e" />
      <path d="M 150 145 Q 170 120 190 110" stroke="#1b4332" strokeWidth="1.5" />

      <path d="M 170 105 C 190 75, 225 85, 220 120 C 210 140, 180 130, 170 105 Z" fill="#2d6a4f" />
      <path d="M 170 105 Q 200 100 220 120" stroke="#1b4332" strokeWidth="1.5" />

      <path d="M 180 60 C 170 30, 190 15, 215 30 C 225 50, 205 70, 180 60 Z" fill="#3d8b66" />
      <path d="M 180 60 Q 200 40 215 30" stroke="#24603e" strokeWidth="1.5" />

      {/* Side Branch Leaves */}
      <path d="M 115 230 C 145 205, 180 220, 170 250 C 155 270, 125 255, 115 230 Z" fill="#1b4d31" />
      <path d="M 165 200 C 200 180, 235 195, 225 225 C 210 245, 180 225, 165 200 Z" fill="#296c46" />
      <path d="M 160 160 C 190 135, 225 150, 215 180 C 200 200, 175 185, 160 160 Z" fill="#23603d" />
      <path d="M 210 120 C 245 100, 280 115, 270 145 C 255 165, 225 145, 210 120 Z" fill="#2d6a4f" />

      {/* Hanging Olives */}
      <ellipse cx="80" cy="270" rx="7.5" ry="11" transform="rotate(-15 80 270)" fill="#163e26" />
      <ellipse cx="78" cy="268" rx="2.5" ry="5" transform="rotate(-15 78 268)" fill="#3a8459" opacity="0.6" />

      <ellipse cx="135" cy="210" rx="7.5" ry="11" transform="rotate(20 135 210)" fill="#133621" />
      <ellipse cx="133" cy="208" rx="2.5" ry="5" transform="rotate(20 133 208)" fill="#3a8459" opacity="0.6" />
    </svg>
  </div>
);

export const TopRightGreenWave = () => (
  <div className="absolute top-0 right-0 w-[62vw] min-w-[350px] sm:w-[56vw] sm:min-w-[500px] lg:w-[50vw] max-w-[850px] h-[560px] sm:h-[720px] lg:h-[840px] pointer-events-none z-0 overflow-hidden select-none">
    <svg 
      viewBox="0 0 800 780" 
      fill="none" 
      preserveAspectRatio="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className="w-full h-full drop-shadow-[0_20px_45px_rgba(10,40,24,0.38)]"
    >
      <defs>
        <linearGradient id="emeraldDeepGrad" x1="280" y1="0" x2="800" y2="720" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#18613d" />
          <stop offset="35%" stopColor="#145233" />
          <stop offset="70%" stopColor="#0f3f27" />
          <stop offset="100%" stopColor="#0a2e1c" />
        </linearGradient>

        <linearGradient id="emeraldHighlightGrad" x1="340" y1="0" x2="800" y2="680" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#258254" />
          <stop offset="50%" stopColor="#18643f" />
          <stop offset="100%" stopColor="#10462b" />
        </linearGradient>

        <linearGradient id="goldRimGrad" x1="200" y1="0" x2="800" y2="750" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#eedaa2" />
          <stop offset="30%" stopColor="#dca443" />
          <stop offset="60%" stopColor="#fff6d2" />
          <stop offset="85%" stopColor="#c59239" />
          <stop offset="100%" stopColor="#fae7b5" />
        </linearGradient>

        <filter id="waveSoftShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="-10" dy="16" stdDeviation="26" floodColor="#082315" floodOpacity="0.4" />
        </filter>

        <filter id="flareGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
        </filter>
      </defs>

      {/* Main Rich Emerald Wave Body with soft organic curve */}
      <path 
        d="M 340 0 C 270 60, 190 150, 160 250 C 130 360, 190 480, 330 570 C 470 655, 630 700, 800 730 V 0 H 340 Z" 
        fill="url(#emeraldDeepGrad)"
        filter="url(#waveSoftShadow)"
      />

      {/* Subtle Inner Highlight Layer for Silk-like Depth */}
      <path 
        d="M 390 0 C 325 65, 245 150, 215 250 C 185 350, 245 450, 380 540 C 500 620, 650 670, 800 700 V 0 H 390 Z" 
        fill="url(#emeraldHighlightGrad)" 
        opacity="0.35"
      />

      {/* Brilliant Metallic Gold Rim along the organic wave curve */}
      <path 
        d="M 340 0 C 270 60, 190 150, 160 250 C 130 360, 190 480, 330 570 C 470 655, 630 700, 800 730" 
        stroke="url(#goldRimGrad)" 
        strokeWidth="3.5" 
        strokeLinecap="round" 
        fill="none" 
      />

      {/* Luxury Concentric Gold Rings Radiating in Top Right */}
      <g opacity="0.9">
        <circle cx="770" cy="80" r="150" stroke="url(#goldRimGrad)" strokeWidth="2.5" fill="none" opacity="0.9" />
        <circle cx="770" cy="80" r="230" stroke="url(#goldRimGrad)" strokeWidth="2.5" fill="none" opacity="0.8" />
        <circle cx="770" cy="80" r="320" stroke="url(#goldRimGrad)" strokeWidth="2" strokeDasharray="6 8" fill="none" opacity="0.7" />
        <circle cx="770" cy="80" r="420" stroke="url(#goldRimGrad)" strokeWidth="1.5" fill="none" opacity="0.5" />
      </g>

      {/* Shining 4-Point Golden Star Lens Flares on the Gold Rings */}
      <g transform="translate(620, 120)">
        <path d="M 0 -22 Q 0 0 22 0 Q 0 0 0 22 Q 0 0 -22 0 Q 0 0 0 -22 Z" fill="#FFF9DF" filter="drop-shadow(0 0 8px #F5D77F)" />
        <circle cx="0" cy="0" r="4" fill="#FFFFFF" />
      </g>
      <g transform="translate(540, 220)">
        <path d="M 0 -16 Q 0 0 16 0 Q 0 0 0 16 Q 0 0 -16 0 Q 0 0 0 -16 Z" fill="#FFF9DF" filter="drop-shadow(0 0 6px #F5D77F)" />
        <circle cx="0" cy="0" r="3" fill="#FFFFFF" />
      </g>
      <g transform="translate(680, 310)">
        <path d="M 0 -14 Q 0 0 14 0 Q 0 0 0 14 Q 0 0 -14 0 Q 0 0 0 -14 Z" fill="#FFF9DF" filter="drop-shadow(0 0 5px #F5D77F)" />
        <circle cx="0" cy="0" r="2.5" fill="#FFFFFF" />
      </g>
    </svg>
  </div>
);

export const DynamicConfettiAndShadows = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      
      {/* Top Right Signature Emerald Wave */}
      <TopRightGreenWave />

      {/* Window Sunlight Shadow Layer */}
      <WindowSunlightShadows />

      {/* Scattered Gold Foil Splashes */}
      <GoldFoilSplash className="absolute top-28 left-[12%] w-24 h-24 opacity-30" />
      <GoldFoilSplash className="absolute top-[58%] right-[10%] w-32 h-32 opacity-25" />
      <GoldFoilSplash className="absolute top-[82%] left-[6%] w-28 h-28 opacity-25" />

      {/* Floating Confetti Items with Dynamic Animations */}
      {/* 1. Deep Emerald Diamonds */}
      <div className="absolute top-16 left-[19%] w-3 h-4 bg-[#14482f] rotate-45 rounded-[1px] opacity-85 shadow-sm animate-float-slow" />
      <div className="absolute top-32 right-[16%] w-3.5 h-2.5 bg-[#1b5e3d] -rotate-12 rounded-[1px] opacity-80 shadow-sm animate-float-reverse" />
      <div className="absolute top-1/3 left-[7%] w-2.5 h-4 bg-[#14482f] rotate-[35deg] rounded-[1px] opacity-75 animate-float-slow" />
      <div className="absolute top-2/4 right-[9%] w-3 h-3 bg-[#1b5e3d] rotate-12 rounded-[1px] opacity-80 animate-float-reverse" />
      <div className="absolute top-[65%] left-[22%] w-3.5 h-2.5 bg-[#14482f] -rotate-45 opacity-75 animate-float-slow" />
      <div className="absolute top-[82%] right-[14%] w-3 h-4 bg-[#1b5e3d] rotate-[25deg] opacity-80 animate-float-reverse" />

      {/* 2. Shimmering Gold Confetti & Flakes */}
      <div className="absolute top-24 left-[34%] w-3 h-3 bg-gradient-to-tr from-amber-500 to-yellow-300 rotate-12 rounded-[1px] opacity-90 shadow-sm animate-float-reverse" />
      <div className="absolute top-40 right-[29%] w-2.5 h-2.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-200 opacity-90 shadow-xs animate-float-slow" />
      <div className="absolute top-[48%] left-[5%] w-3.5 h-2.5 bg-amber-400 rotate-45 opacity-80 shadow-sm animate-float-slow" />
      <div className="absolute top-[56%] right-[23%] w-3 h-3 bg-amber-500 rotate-12 opacity-85 shadow-sm animate-float-reverse" />
      <div className="absolute top-[75%] left-[14%] w-2.5 h-2.5 rounded-full bg-amber-400 opacity-80 shadow-xs animate-float-slow" />
      <div className="absolute top-[90%] left-[32%] w-3 h-3 bg-amber-500 rotate-45 opacity-75 shadow-sm animate-float-reverse" />

      {/* 3. Teal & Emerald Circles */}
      <div className="absolute top-14 right-[37%] w-2.5 h-2.5 rounded-full bg-[#167049] opacity-80 animate-float-slow" />
      <div className="absolute top-[42%] left-[44%] w-2.5 h-2.5 rounded-full bg-[#1b5e3d] opacity-70 animate-float-reverse" />
      <div className="absolute top-[68%] right-[6%] w-3 h-3 rounded-full bg-[#125838] opacity-85 shadow-sm animate-float-slow" />
      <div className="absolute top-[88%] left-[9%] w-3.5 h-3.5 rounded-full bg-[#14482f] opacity-85 shadow-sm animate-float-reverse" />
      <div className="absolute top-[93%] right-[30%] w-2.5 h-2.5 rounded-full bg-[#167049] opacity-75 animate-float-slow" />
    </div>
  );
};
