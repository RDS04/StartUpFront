import React from 'react';
import { Heart, Calendar, Image, Gift, MessageSquare, BookOpen, Home } from 'lucide-react';

interface BottomNavbarProps {
  activeSection?: string;
  onNavigate: (sectionId: string) => void;
}

export const BottomNavbar: React.FC<BottomNavbarProps> = ({ activeSection, onNavigate }) => {
  const navItems = [
    { id: 'hero-section', label: 'Cover', icon: Home },
    { id: 'couple-section', label: 'Mempelai', icon: Heart },
    { id: 'event-section', label: 'Acara', icon: Calendar },
    { id: 'gallery-section', label: 'Galeri', icon: Image },
    { id: 'story-section', label: 'Cerita', icon: BookOpen },
    { id: 'gift-section', label: 'Kado', icon: Gift },
    { id: 'guestbook-section', label: 'Ucapan', icon: MessageSquare },
  ];

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-[420px] pointer-events-auto">
      <div className="bg-[#2c3d2f]/90 backdrop-blur-md border border-[#8f9e7b]/40 rounded-full px-3 py-2 shadow-[0_10px_35px_rgba(0,0,0,0.35)] flex items-center justify-between gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-full transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[#c5a454] text-[#1c291e] font-bold shadow-sm scale-105'
                  : 'text-[#d6decb] hover:text-white hover:bg-white/10'
              }`}
              title={item.label}
            >
              <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="text-[9px] tracking-tight mt-0.5 leading-none">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
