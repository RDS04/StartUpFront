import React, { useState } from 'react';
import { X, UserPlus, Phone, User, Users } from 'lucide-react';

interface AddGuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddGuest: (guestData: { name: string; phone: string; category: string }) => void;
}

export const AddGuestModal: React.FC<AddGuestModalProps> = ({ isOpen, onClose, onAddGuest }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('Teman');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAddGuest({
      name: name.trim(),
      phone: phone.trim().replace(/^0/, '62'),
      category,
    });
    setName('');
    setPhone('');
    setCategory('Teman');
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-100 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-50 text-[#2D6A4F] rounded-xl">
              <UserPlus className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-base text-stone-900">Tambah Tamu Undangan</h2>
              <p className="text-[11px] text-stone-400">Generate tautan personal otomatis</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 p-1 rounded-lg hover:bg-stone-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">
              Nama Tamu / Keluarga <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="Contoh: Bpk. Hendra & Keluarga"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">
              Nomor WhatsApp (Opsional)
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Contoh: 08123456789 atau 628123456789"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
              />
            </div>
            <span className="text-[10px] text-stone-400 mt-1 block">
              Nomor ini digunakan untuk fitur kirim undangan 1-klik via WhatsApp.
            </span>
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">Kategori Tamu</label>
            <div className="relative">
              <Users className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none cursor-pointer"
              >
                <option value="Teman">Teman / Rekan Kerja</option>
                <option value="Keluarga">Keluarga Besar</option>
                <option value="VIP">Tamu VIP / Penting</option>
              </select>
            </div>
          </div>

          <div className="pt-2 flex gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl text-xs transition cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-semibold rounded-xl text-xs shadow-sm transition active:scale-95 cursor-pointer"
            >
              Simpan Tamu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
