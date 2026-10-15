import React, { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  Filter,
  Download,
  Lock,
  Copy,
  Eye,
  Share2,
  Trash2,
  CheckCircle2,
} from 'lucide-react';
import type { DashboardData, GuestItem, TierConfig } from '../types';

interface GuestsSectionProps {
  data: DashboardData;
  guests: GuestItem[];
  setGuests: React.Dispatch<React.SetStateAction<GuestItem[]>>;
  tierConfig: TierConfig;
  onOpenAddGuestModal: () => void;
  onPreviewAsGuest: (guestName: string) => void;
  onCopyLink: (text: string, label?: string) => void;
  onShowToast: (msg: string) => void;
}

export const GuestsSection: React.FC<GuestsSectionProps> = ({
  data,
  guests,
  setGuests,
  tierConfig,
  onOpenAddGuestModal,
  onPreviewAsGuest,
  onCopyLink,
  onShowToast,
}) => {
  const [searchGuest, setSearchGuest] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const handleDeleteGuest = (id: number) => {
    setGuests(guests.filter((g) => g.id !== id));
    onShowToast('Tamu berhasil dihapus dari daftar');
  };

  const getWhatsAppShareUrl = (guest: GuestItem) => {
    const origin = typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.host}` : 'http://localhost:5173';
    const inviteLink = `${origin}/#/${data.slug}?to=${encodeURIComponent(guest.name)}`;
    const text = `Kepada Yth. Bpk/Ibu/Sdr/i *${guest.name}*,\n\nTanpa mengurangi rasa hormat, perkenankan kami mengundang Anda untuk hadir dan memberikan doa restu pada hari bahagia pernikahan kami:\n\n*${data.groom.nickName} & ${data.bride.nickName}*\n📅 ${data.event.dateDisplay}\n\nUntuk info lengkap acara, silakan klik tautan undangan digital resmi berikut:\n👉 ${inviteLink}\n\nMerupakan suatu kehormatan dan kebahagiaan bagi kami apabila Anda berkenan hadir.\n\nTerima kasih,\n*${data.groom.nickName} & ${data.bride.nickName}*`;

    const phone = guest.phone ? guest.phone.replace(/[^0-9]/g, '') : '';
    if (phone) {
      return `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(text)}`;
    }
    return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  };

  const filteredGuests = useMemo(() => {
    return guests.filter((g) => {
      const matchSearch =
        g.name.toLowerCase().includes(searchGuest.toLowerCase()) ||
        (g.phone && g.phone.includes(searchGuest));
      const matchCategory = filterCategory === 'all' || g.category === filterCategory;
      return matchSearch && matchCategory;
    });
  }, [guests, searchGuest, filterCategory]);

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-stone-900 font-serif">Manajemen Tamu & Sebar WhatsApp</h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Buat tautan personal unik dan kirim undangan via WhatsApp hanya dengan sekali klik.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {tierConfig.canExport ? (
            <button
              onClick={() => onShowToast('Daftar tamu berhasil diekspor ke Excel!')}
              className="px-3.5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" /> Export Excel
            </button>
          ) : (
            <button
              onClick={() => onShowToast('Fitur Export Excel hanya tersedia di Paket Gold (VIP)')}
              className="px-3.5 py-2.5 bg-stone-50 text-stone-400 text-xs font-medium rounded-xl flex items-center gap-1.5 border border-dashed border-stone-200 cursor-pointer"
              title="Upgrade ke Gold untuk mengunduh Excel"
            >
              <Lock className="w-3 h-3 text-stone-400" /> Export Excel (Gold)
            </button>
          )}

          <button
            onClick={onOpenAddGuestModal}
            className="px-4 py-2.5 bg-[#2D6A4F] hover:bg-[#1B4332] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-sm transition active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Tambah Tamu
          </button>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama atau nomor WhatsApp tamu..."
            value={searchGuest}
            onChange={(e) => setSearchGuest(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-stone-400" />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="text-xs bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-stone-700 focus:bg-white focus:outline-none cursor-pointer"
          >
            <option value="all">Semua Kategori</option>
            <option value="Keluarga">Keluarga</option>
            <option value="Teman">Teman</option>
            <option value="VIP">VIP</option>
          </select>
        </div>
      </div>

      {/* Guest Table Container */}
      <div className="border border-stone-200 rounded-2xl overflow-hidden shadow-xs bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF7F2] text-stone-600 font-semibold border-b border-stone-200">
              <tr>
                <th className="py-3 px-4">Nama Tamu Undangan</th>
                <th className="py-3 px-4">Nomor WhatsApp</th>
                <th className="py-3 px-4">Kategori</th>
                <th className="py-3 px-4">Tautan Personal (?to=)</th>
                <th className="py-3 px-4 text-center">Aksi Kirim</th>
                <th className="py-3 px-3 text-right">Opsi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 bg-white">
              {filteredGuests.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-stone-400">
                    Tidak ada data tamu yang cocok dengan pencarian Anda.
                  </td>
                </tr>
              ) : (
                filteredGuests.map((guest) => {
                  const origin = typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.host}` : 'http://localhost:5173';
                  const personalizedUrl = `${origin}/#/${data.slug}?to=${encodeURIComponent(guest.name)}`;
                  return (
                    <tr key={guest.id} className="hover:bg-stone-50/70 transition">
                      <td className="py-3.5 px-4 font-semibold text-stone-800">
                        <div className="flex items-center gap-2">
                          <span>{guest.name}</span>
                          {guest.sent && (
                            <span title="Telah dikirim">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-stone-500 font-mono">
                        {guest.phone || '-'}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                            guest.category === 'VIP'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : guest.category === 'Keluarga'
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : 'bg-stone-100 text-stone-600 border-stone-200'
                          }`}
                        >
                          {guest.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-[11px] text-stone-500 max-w-[150px] truncate">
                            ?to={guest.name}
                          </span>
                          <button
                            onClick={() =>
                              onCopyLink(personalizedUrl, `Tautan personal untuk ${guest.name} disalin!`)
                            }
                            className="p-1 hover:bg-stone-100 rounded text-stone-400 hover:text-stone-700 cursor-pointer"
                            title="Salin Link Personal"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onPreviewAsGuest(guest.name)}
                            className="p-1 hover:bg-stone-100 rounded text-stone-400 hover:text-stone-700 cursor-pointer"
                            title="Pratinjau dengan nama tamu ini"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <a
                          href={getWhatsAppShareUrl(guest)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => {
                            setGuests(
                              guests.map((g) => (g.id === guest.id ? { ...g, sent: true } : g))
                            );
                          }}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold text-[11px] transition cursor-pointer ${
                            guest.sent
                              ? 'bg-stone-100 text-stone-600 hover:bg-emerald-50 hover:text-[#2D6A4F]'
                              : 'bg-[#25D366] text-white hover:bg-[#1EBE5D] shadow-xs'
                          }`}
                        >
                          <Share2 className="w-3 h-3" />
                          <span>{guest.sent ? 'Kirim Ulang' : 'Kirim WA'}</span>
                        </a>
                      </td>
                      <td className="py-3.5 px-3 text-right">
                        <button
                          onClick={() => handleDeleteGuest(guest.id)}
                          className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition cursor-pointer"
                          title="Hapus Tamu"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Summary Footer */}
        <div className="bg-[#FAF7F2] px-4 py-2.5 text-xs text-stone-500 flex items-center justify-between border-t border-stone-200">
          <span>Menampilkan {filteredGuests.length} dari {guests.length} tamu</span>
          <span>
            Maksimum kuota paket:{' '}
            <strong className="text-stone-700">
              {tierConfig.maxGuests === 9999 ? 'Unlimited' : `${tierConfig.maxGuests} tamu`}
            </strong>
          </span>
        </div>
      </div>
    </div>
  );
};
