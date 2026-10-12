import React from 'react';
import { Mail, Users, Calendar, Image as ImageIcon, MessageSquareHeart } from 'lucide-react';

interface BottomNavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection?: string;
}

export const BottomNavbar: React.FC<BottomNavbarProps> = ({ onNavigate, activeSection = 'cover' }) => {
  const navItems = [
    { id: 'cover', label: 'Undangan', icon: Mail },
    { id: 'mempelai', label: 'Mempelai', icon: Users },
    { id: 'acara', label: 'Acara', icon: Calendar },
    { id: 'galeri', label: 'Galeri', icon: ImageIcon },
    { id: 'ucapan', label: 'Ucapan', icon: MessageSquareHeart },
  ];

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-sm sm:max-w-md">
      <nav className="bg-[#2a0408]/90 backdrop-blur-md border border-[#cfa84a]/40 rounded-full px-2 py-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.65)] flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'text-[#f5ece0] bg-[#540c14] shadow-[0_2px_10px_rgba(207,168,74,0.3)] scale-105'
                  : 'text-[#ded0b4]/70 hover:text-[#f3df95] hover:bg-[#3a060d]/60'
              }`}
            >
              <Icon className="w-4 h-4 mb-0.5" />
              <span className="text-[10px] font-medium tracking-tight font-serif-royal">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
