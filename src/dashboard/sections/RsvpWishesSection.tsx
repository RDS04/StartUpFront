import React, { useState } from 'react';
import { MessageSquare, Check, X, HelpCircle, Trash2 } from 'lucide-react';
import type { WishItem } from '../types';
import { deleteWish } from '../../services/rsvpService';

interface RsvpWishesSectionProps {
  wishes: WishItem[];
  setWishes: React.Dispatch<React.SetStateAction<WishItem[]>>;
  stats: {
    hadir: number;
    tidak: number;
    menunggu: number;
    totalWishes: number;
  };
  onShowToast: (msg: string) => void;
}

export const RsvpWishesSection: React.FC<RsvpWishesSectionProps> = ({
  wishes,
  setWishes,
  stats,
  onShowToast,
}) => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'hadir' | 'tidak' | 'ragu'>('all');

  const handleDeleteWish = async (id: number) => {
    setWishes((prev) => prev.filter((w) => w.id !== id));
    await deleteWish(id);
    onShowToast('Ucapan berhasil dihapus dari buku tamu');
  };

  const filteredWishes = wishes.filter((w) => {
    if (filterStatus === 'all') return true;
    return w.status === filterStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in">
      <div>
        <h1 className="text-xl font-bold text-stone-900 font-serif">Buku Tamu & Konfirmasi Kehadiran</h1>
        <p className="text-xs text-stone-500 mt-0.5">
          Rekapitulasi ucapan doa dan konfirmasi kehadiran tamu undangan yang masuk secara realtime.
        </p>
      </div>

      {/* Kehadiran Summary Pills */}
      <div className="flex flex-wrap gap-2.5">
        <button
          onClick={() => setFilterStatus('all')}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer border ${
            filterStatus === 'all'
              ? 'bg-stone-900 text-white border-stone-900'
              : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" /> Semua Ucapan ({wishes.length})
        </button>

        <button
          onClick={() => setFilterStatus('hadir')}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer border ${
            filterStatus === 'hadir'
              ? 'bg-emerald-700 text-white border-emerald-700'
              : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100/60'
          }`}
        >
          <Check className="w-3.5 h-3.5" /> Pasti Hadir ({stats.hadir} pax)
        </button>

        <button
          onClick={() => setFilterStatus('tidak')}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer border ${
            filterStatus === 'tidak'
              ? 'bg-rose-700 text-white border-rose-700'
              : 'bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100/60'
          }`}
        >
          <X className="w-3.5 h-3.5" /> Berhalangan ({stats.tidak})
        </button>

        <button
          onClick={() => setFilterStatus('ragu')}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer border ${
            filterStatus === 'ragu'
              ? 'bg-amber-700 text-white border-amber-700'
              : 'bg-stone-100 text-stone-700 border-stone-200 hover:bg-stone-200'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" /> Belum Pasti ({stats.menunggu})
        </button>
      </div>

      {/* Wishes List Cards */}
      <div className="space-y-3">
        {filteredWishes.length === 0 ? (
          <div className="p-12 text-center bg-stone-50 rounded-3xl border border-dashed border-stone-200 text-stone-400 space-y-2">
            <MessageSquare className="w-8 h-8 mx-auto text-stone-300" />
            <p className="text-xs">Belum ada ucapan doa untuk kategori ini.</p>
          </div>
        ) : (
          filteredWishes.map((w) => (
            <div
              key={w.id}
              className="p-4.5 rounded-2xl border border-stone-200 bg-white hover:border-stone-300 transition flex flex-col sm:flex-row items-start justify-between gap-3 shadow-xs"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-stone-900 text-sm">{w.name}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      w.status === 'hadir'
                        ? 'bg-emerald-100 text-emerald-800'
                        : w.status === 'tidak'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {w.status === 'hadir'
                      ? 'Pasti Hadir'
                      : w.status === 'tidak'
                      ? 'Tidak Hadir'
                      : 'Masih Ragu'}
                  </span>
                  <span className="text-[11px] text-stone-400">• {w.time}</span>
                </div>
                <p className="text-stone-700 text-xs leading-relaxed italic">"{w.text}"</p>
              </div>

              <button
                onClick={() => handleDeleteWish(w.id)}
                className="text-stone-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition cursor-pointer self-end sm:self-center"
                title="Hapus Ucapan"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
