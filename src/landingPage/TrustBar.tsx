import { BotanicalLeaves } from './DecorativeBackground';

export const TrustBar = () => {
  return (
    <div className="relative my-6 sm:my-8 max-w-5xl mx-auto px-4 sm:px-6">
      
      {/* Botanical leaves accents on the outer edges */}
      <BotanicalLeaves.BottomLeft />
      <BotanicalLeaves.BottomRight />

      {/* Pill-shaped Trust Card with High-End Ambient Shadows */}
      <div className="relative z-10 bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-full shadow-[0_20px_50px_-10px_rgba(0,0,0,0.09),0_10px_20px_-5px_rgba(0,0,0,0.04)] border border-slate-200/90 px-5 sm:px-10 py-3.5 sm:py-4 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 transition-all duration-300 hover:shadow-[0_25px_60px_-10px_rgba(0,0,0,0.12)]">
        
        {/* Left: Overlapping Avatars & Text */}
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2.5 sm:-space-x-3 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
              alt="Couple 1"
              className="inline-block h-8 w-8 sm:h-9 sm:w-9 rounded-full ring-2 ring-white object-cover shadow-sm"
            />
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
              alt="Couple 2"
              className="inline-block h-8 w-8 sm:h-9 sm:w-9 rounded-full ring-2 ring-white object-cover shadow-sm"
            />
            <img
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80"
              alt="Couple 3"
              className="inline-block h-8 w-8 sm:h-9 sm:w-9 rounded-full ring-2 ring-white object-cover shadow-sm"
            />
          </div>
          <p className="text-xs sm:text-sm text-slate-700">
            Telah dipercaya oleh <strong className="font-black text-slate-900">50,000+ pasangan</strong>
          </p>
        </div>

        {/* Right: Typography Showcase styles with smooth horizontal scroll on small mobile screens */}
        <div className="w-full md:w-auto overflow-x-auto no-scrollbar py-1">
          <div className="flex items-center justify-center sm:justify-start gap-5 sm:gap-8 text-slate-700 select-none min-w-max px-2">
            <span className="font-script-calligraphy text-2xl text-slate-900 hover:text-emerald-700 transition-colors">
              Cipta
            </span>
            <span className="font-sans font-semibold text-xs sm:text-sm text-slate-600 hover:text-slate-900 transition-colors">
              Modern
            </span>
            <span className="font-serif-wedding italic text-base sm:text-lg text-slate-900 hover:text-emerald-800 transition-colors">
              Elegant
            </span>
            <span className="font-serif text-xs sm:text-sm tracking-wide text-slate-600 hover:text-slate-900 transition-colors">
              Tradisional
            </span>
            <span className="font-script-calligraphy text-2xl text-slate-900 hover:text-emerald-700 transition-colors">
              Custom
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};
