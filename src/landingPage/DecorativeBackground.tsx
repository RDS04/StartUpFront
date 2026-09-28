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
    <svg viewBox="0 0 200 45" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
      <path 
        d="M5 25C25 15 65 8 110 12C150 15 185 20 195 24C180 32 140 38 95 34C55 31 20 33 5 25Z" 
        fill="url(#goldGradientBrush)" 
      />
      <path 
        d="M15 22C40 14 85 10 130 14C165 17 190 22 185 27C160 30 110 32 65 29C35 27 20 28 15 22Z" 
        fill="url(#goldFoilGlitter)" 
        opacity="0.8" 
      />
      <defs>
        <linearGradient id="goldGradientBrush" x1="0" y1="0" x2="200" y2="45" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#d4a359" />
          <stop offset="25%" stopColor="#f7e1a0" />
          <stop offset="50%" stopColor="#c8923a" />
          <stop offset="75%" stopColor="#edd087" />
          <stop offset="100%" stopColor="#b37c26" />
        </linearGradient>
        <linearGradient id="goldFoilGlitter" x1="200" y1="0" x2="0" y2="45" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffe699" />
          <stop offset="50%" stopColor="#d19c3d" />
          <stop offset="100%" stopColor="#fff2be" />
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
  <div className={`relative flex items-center justify-center ${className}`}>
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Dark background circle */}
      <circle cx="24" cy="24" r="22" fill="#1e293b" />
      {/* Left Ring */}
      <ellipse cx="18" cy="27" rx="9" ry="9" stroke="#ffffff" strokeWidth="2.8" strokeLinecap="round" />
      {/* Right Ring */}
      <ellipse cx="28" cy="27" rx="9" ry="9" stroke="#ffffff" strokeWidth="2.8" strokeLinecap="round" />
      {/* Heart on top of right ring */}
      <path 
        d="M28 11.5C26.5 9.5 24 10.5 24 12.5C24 15 28 17.5 28 17.5C28 17.5 32 15 32 12.5C32 10.5 29.5 9.5 28 11.5Z" 
        fill="#ffffff" 
      />
    </svg>
  </div>
);

export const SaveTheDateBadge = () => (
  <div className="flex flex-col items-center p-2.5 rounded-2xl bg-white border border-rose-100 shadow-xl shadow-rose-950/5 text-center w-28 select-none">
    {/* Calendar Header with Rings */}
    <div className="w-full bg-[#f87171] rounded-t-lg py-1 px-2 flex justify-between items-center text-white">
      <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
      <span className="text-[9px] font-bold tracking-wider uppercase">DEC</span>
      <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
    </div>
    {/* Hearts in Center */}
    <div className="py-1 flex items-center justify-center gap-1">
      <span className="text-xs">❤️</span>
      <span className="text-sm">💖</span>
      <span className="text-xs">💜</span>
    </div>
    <span className="font-script-calligraphy text-base font-bold text-slate-800 leading-none">
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

export const TopRightGreenWave = () => (
  <div className="absolute top-0 right-0 w-[60vw] min-w-[320px] sm:w-[55vw] sm:min-w-[480px] lg:w-[47vw] max-w-[780px] h-[520px] sm:h-[680px] lg:h-[780px] pointer-events-none z-0 overflow-hidden select-none">
    <svg 
      viewBox="0 0 800 760" 
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

        <linearGradient id="emeraldSoftGlow" x1="200" y1="200" x2="450" y2="600" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2ea169" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#135233" stopOpacity="0" />
        </linearGradient>

        <filter id="waveSoftShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="-10" dy="16" stdDeviation="26" floodColor="#082315" floodOpacity="0.4" />
        </filter>
      </defs>

      {/* Main Rich Emerald Wave Body with soft organic curve */}
      <path 
        d="M 360 0 C 290 60, 210 150, 180 250 C 150 360, 200 470, 340 560 C 470 645, 630 690, 800 715 V 0 H 360 Z" 
        fill="url(#emeraldDeepGrad)"
        filter="url(#waveSoftShadow)"
      />

      {/* Subtle Inner Highlight Layer for Silk-like Depth */}
      <path 
        d="M 410 0 C 345 65, 265 150, 235 250 C 205 350, 255 450, 390 540 C 510 620, 660 665, 800 690 V 0 H 410 Z" 
        fill="url(#emeraldHighlightGrad)" 
        opacity="0.35"
      />

      {/* Soft Edge Glow Arc */}
      <path 
        d="M 362 0 C 292 60, 212 150, 182 250 C 152 360, 202 470, 342 560 C 472 645, 632 690, 800 715" 
        stroke="url(#emeraldSoftGlow)" 
        strokeWidth="3" 
        strokeLinecap="round" 
        fill="none" 
      />
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
