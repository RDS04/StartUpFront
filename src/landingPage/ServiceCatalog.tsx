import { useState } from 'react';
import { Star, Flame, ArrowUpRight } from 'lucide-react';
import type { GameService } from '../types';

interface ServiceCatalogProps {
  onSelectGame: (gameName: string) => void;
}

const servicesData: GameService[] = [
  {
    id: 'mlbb',
    name: 'Mobile Legends: Bang Bang',
    category: 'MOBA',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    ordersCompleted: 8420,
    startingPrice: 5000,
    popular: true,
  },
  {
    id: 'val',
    name: 'Valorant',
    category: 'FPS',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    ordersCompleted: 5120,
    startingPrice: 15000,
    popular: true,
  },
  {
    id: 'genshin',
    name: 'Genshin Impact',
    category: 'RPG',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    ordersCompleted: 2310,
    startingPrice: 10000,
    popular: false,
  },
  {
    id: 'hok',
    name: 'Honor of Kings',
    category: 'MOBA',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    ordersCompleted: 1890,
    startingPrice: 6000,
    popular: true,
  },
  {
    id: 'pubgm',
    name: 'PUBG Mobile',
    category: 'Battle Royale',
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    ordersCompleted: 3410,
    startingPrice: 8000,
    popular: false,
  },
  {
    id: 'ff',
    name: 'Free Fire',
    category: 'Battle Royale',
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    ordersCompleted: 4200,
    startingPrice: 4000,
    popular: false,
  },
];

export const ServiceCatalog = ({ onSelectGame }: ServiceCatalogProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  const categories = ['Semua', 'MOBA', 'FPS', 'RPG', 'Battle Royale'];

  const filteredServices = selectedCategory === 'Semua' 
    ? servicesData 
    : servicesData.filter(s => s.category === selectedCategory);

  return (
    <section id="services" className="py-16 bg-slate-900/30 border-y border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">
              <Flame className="w-4 h-4 text-amber-400" />
              Katalog Layanan Game
            </div>
            <h2 className="text-3xl font-extrabold text-white">
              Pilih Game Pilihan Anda
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Dikerjakan oleh joki handal dengan winrate tinggi dan keamanan akun terverifikasi.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Game Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((game) => (
            <div
              key={game.id}
              className="group relative rounded-2xl bg-slate-900/80 border border-slate-800/80 hover:border-indigo-500/50 p-4 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col justify-between overflow-hidden"
            >
              {/* Image banner */}
              <div className="relative h-44 rounded-xl overflow-hidden mb-4">
                <img
                  src={game.image}
                  alt={game.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-950/80 text-cyan-300 backdrop-blur-md border border-cyan-500/20">
                    {game.category}
                  </span>
                  {game.popular && (
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-500/90 text-slate-950 backdrop-blur-md flex items-center gap-1">
                      <Flame className="w-3 h-3 fill-current" />
                      Populer
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-amber-300 font-semibold bg-slate-950/80 px-2 py-0.5 rounded-md backdrop-blur-md">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{game.rating}</span>
                  <span className="text-slate-400 text-[10px]">({game.ordersCompleted}+ order)</span>
                </div>
              </div>

              {/* Game Info */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {game.name}
                </h3>
                
                <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-3">
                  <div>
                    <span className="block text-[10px] text-slate-500">Mulai dari</span>
                    <span className="font-bold text-emerald-400 text-sm">
                      Rp {game.startingPrice.toLocaleString('id-ID')}
                      <span className="text-[10px] font-normal text-slate-400">/bintang atau rank</span>
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      onSelectGame(game.name);
                      const el = document.getElementById('calculator');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-indigo-600/10 hover:bg-indigo-600 text-indigo-300 hover:text-white text-xs font-semibold border border-indigo-500/20 hover:border-indigo-600 transition-all duration-200"
                  >
                    <span>Order</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
