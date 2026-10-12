import React from 'react';
import { Calendar, Music, MapPin, Lock, Save } from 'lucide-react';
import type { DashboardData, TierConfig } from '../types';

interface BrideEventSectionProps {
  data: DashboardData;
  setData: React.Dispatch<React.SetStateAction<DashboardData>>;
  tierConfig: TierConfig;
  onShowToast: (msg: string) => void;
}

export const BrideEventSection: React.FC<BrideEventSectionProps> = ({
  data,
  setData,
  tierConfig,
  onShowToast,
}) => {
  const handleSave = () => {
    onShowToast('Perubahan data mempelai & acara berhasil disimpan!');
  };

  return (
    <div className="space-y-6 max-w-4xl animate-in fade-in">
      <div>
        <h1 className="text-xl font-bold text-stone-900 font-serif">Pengaturan Data Mempelai & Acara</h1>
        <p className="text-xs text-stone-500 mt-1">
          Data ini akan langsung diperbarui secara realtime pada halaman undangan digital tamu Anda.
        </p>
      </div>

      {/* Profil Mempelai Pria & Wanita */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mempelai Pria */}
        <div className="p-5 rounded-3xl border border-stone-200 bg-[#FAF7F2]/70 space-y-3.5 shadow-xs">
          <div className="flex items-center space-x-3.5 pb-2.5 border-b border-stone-200/80">
            <img
              src={data.groom.avatar}
              alt="Groom avatar"
              className="w-13 h-13 rounded-2xl object-cover border-2 border-stone-300 shadow-xs"
            />
            <div>
              <h2 className="font-bold text-sm text-stone-900">Mempelai Pria</h2>
              <p className="text-[11px] text-stone-500 font-medium">Profil Pengantin Pria</p>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">Nama Panggilan</label>
            <input
              type="text"
              value={data.groom.nickName}
              onChange={(e) =>
                setData({
                  ...data,
                  groom: { ...data.groom, nickName: e.target.value },
                })
              }
              className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">Nama Lengkap & Gelar</label>
            <input
              type="text"
              value={data.groom.fullName}
              onChange={(e) =>
                setData({
                  ...data,
                  groom: { ...data.groom, fullName: e.target.value },
                })
              }
              className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">Keterangan Orang Tua</label>
            <textarea
              rows={2}
              value={data.groom.parents}
              onChange={(e) =>
                setData({
                  ...data,
                  groom: { ...data.groom, parents: e.target.value },
                })
              }
              className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
            />
          </div>
        </div>

        {/* Mempelai Wanita */}
        <div className="p-5 rounded-3xl border border-stone-200 bg-[#FAF7F2]/70 space-y-3.5 shadow-xs">
          <div className="flex items-center space-x-3.5 pb-2.5 border-b border-stone-200/80">
            <img
              src={data.bride.avatar}
              alt="Bride avatar"
              className="w-13 h-13 rounded-2xl object-cover border-2 border-stone-300 shadow-xs"
            />
            <div>
              <h2 className="font-bold text-sm text-stone-900">Mempelai Wanita</h2>
              <p className="text-[11px] text-stone-500 font-medium">Profil Pengantin Wanita</p>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">Nama Panggilan</label>
            <input
              type="text"
              value={data.bride.nickName}
              onChange={(e) =>
                setData({
                  ...data,
                  bride: { ...data.bride, nickName: e.target.value },
                })
              }
              className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">Nama Lengkap & Gelar</label>
            <input
              type="text"
              value={data.bride.fullName}
              onChange={(e) =>
                setData({
                  ...data,
                  bride: { ...data.bride, fullName: e.target.value },
                })
              }
              className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">Keterangan Orang Tua</label>
            <textarea
              rows={2}
              value={data.bride.parents}
              onChange={(e) =>
                setData({
                  ...data,
                  bride: { ...data.bride, parents: e.target.value },
                })
              }
              className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
            />
          </div>
        </div>
      </div>

      {/* Detail Waktu & Tempat Acara */}
      <div className="p-6 rounded-3xl border border-stone-200 bg-white space-y-5 shadow-xs">
        <h2 className="font-bold text-stone-900 text-sm flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#2D6A4F]" /> Waktu & Tempat Pelaksanaan
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">Tanggal Acara</label>
            <input
              type="date"
              value={data.event.date}
              onChange={(e) =>
                setData({
                  ...data,
                  event: { ...data.event, date: e.target.value },
                })
              }
              className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">Teks Format Tanggal</label>
            <input
              type="text"
              value={data.event.dateDisplay}
              onChange={(e) =>
                setData({
                  ...data,
                  event: { ...data.event, dateDisplay: e.target.value },
                })
              }
              className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
            />
          </div>
        </div>

        {/* Sesi Akad & Resepsi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="p-4 rounded-2xl bg-stone-50/80 border border-stone-200 space-y-2.5">
            <span className="font-bold text-xs text-stone-800 block">Sesi Akad Nikah</span>
            <input
              type="text"
              placeholder="Waktu (contoh: 08:00 - 10:00 WIB)"
              value={data.event.akadTime}
              onChange={(e) =>
                setData({
                  ...data,
                  event: { ...data.event, akadTime: e.target.value },
                })
              }
              className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2"
            />
            <input
              type="text"
              placeholder="Nama Lokasi / Tempat"
              value={data.event.akadPlace}
              onChange={(e) =>
                setData({
                  ...data,
                  event: { ...data.event, akadPlace: e.target.value },
                })
              }
              className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2"
            />
            <textarea
              placeholder="Alamat Lengkap"
              rows={2}
              value={data.event.akadAddress}
              onChange={(e) =>
                setData({
                  ...data,
                  event: { ...data.event, akadAddress: e.target.value },
                })
              }
              className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2"
            />
          </div>

          <div className="p-4 rounded-2xl bg-stone-50/80 border border-stone-200 space-y-2.5">
            <span className="font-bold text-xs text-stone-800 block">Sesi Resepsi Pernikahan</span>
            <input
              type="text"
              placeholder="Waktu (contoh: 11:00 - Selesai)"
              value={data.event.resepsiTime}
              onChange={(e) =>
                setData({
                  ...data,
                  event: { ...data.event, resepsiTime: e.target.value },
                })
              }
              className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2"
            />
            <input
              type="text"
              placeholder="Nama Lokasi / Tempat"
              value={data.event.resepsiPlace}
              onChange={(e) =>
                setData({
                  ...data,
                  event: { ...data.event, resepsiPlace: e.target.value },
                })
              }
              className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2"
            />
            <textarea
              placeholder="Alamat Lengkap & Patokan Rumah"
              rows={2}
              value={data.event.resepsiAddress}
              onChange={(e) =>
                setData({
                  ...data,
                  event: { ...data.event, resepsiAddress: e.target.value },
                })
              }
              className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2"
            />
          </div>
        </div>

        {/* Google Maps URL */}
        <div>
          <label className="text-xs font-semibold text-stone-700 block mb-1">
            Tautan Google Maps / Share Location
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              value={data.event.mapsUrl}
              onChange={(e) =>
                setData({
                  ...data,
                  event: { ...data.event, mapsUrl: e.target.value },
                })
              }
              className="flex-1 text-xs bg-white border border-stone-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
            />
            <a
              href={data.event.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-stone-600" /> Uji Pin
            </a>
          </div>
        </div>
      </div>

      {/* Musik Latar Backsound */}
      <div className="p-6 rounded-3xl border border-stone-200 bg-white space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-stone-900 text-sm flex items-center gap-2">
            <Music className="w-4 h-4 text-[#2D6A4F]" /> Musik Latar (Backsound)
          </h2>
          {!tierConfig.canCustomMusic && (
            <span className="text-[11px] text-amber-800 font-semibold bg-amber-50 px-2.5 py-1 rounded-full flex items-center gap-1 border border-amber-200">
              <Lock className="w-3 h-3 text-amber-700" /> Paket Silver Terbatas
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            value={data.musicTitle}
            disabled={!tierConfig.canCustomMusic}
            onChange={(e) => setData({ ...data, musicTitle: e.target.value })}
            className={`flex-1 text-xs border rounded-xl px-3 py-2.5 ${
              tierConfig.canCustomMusic
                ? 'bg-white border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]'
                : 'bg-stone-100 border-stone-200 text-stone-400 cursor-not-allowed'
            }`}
          />
          <button
            disabled={!tierConfig.canCustomMusic}
            onClick={() => onShowToast('Audio MP3 berhasil diperbarui!')}
            className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 disabled:opacity-40 text-white rounded-xl text-xs font-semibold transition cursor-pointer"
          >
            Ganti Lagu
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="pt-1">
        <button
          onClick={handleSave}
          className="w-full sm:w-auto px-7 py-3 bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-semibold text-xs rounded-xl shadow-sm transition active:scale-95 cursor-pointer flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4" /> Simpan Perubahan Acara
        </button>
      </div>
    </div>
  );
};
