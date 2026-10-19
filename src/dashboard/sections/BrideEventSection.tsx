import React, { useRef, useMemo, useEffect } from 'react';
import { Calendar, Music, MapPin, Lock, Save, Camera, Globe, Copy, ExternalLink, Sparkles, RefreshCw, User, CheckCircle2 } from 'lucide-react';
import type { DashboardData, TierConfig } from '../types';
import { normalizeTemplateId, MASTER_TEMPLATES } from '../templateHelpers';

interface BrideEventSectionProps {
  data: DashboardData;
  setData: React.Dispatch<React.SetStateAction<DashboardData>>;
  tierConfig: TierConfig;
  onShowToast: (msg: string) => void;
  purchasedTemplateIds?: string[];
  onNavigateTemplates?: () => void;
}

export function createSlugFromNames(groom: string, bride: string): string {
  const cleanGroom = (groom || '').trim().toLowerCase().replace(/[^a-z0-9]/g, '');
  const cleanBride = (bride || '').trim().toLowerCase().replace(/[^a-z0-9]/g, '');
  if (cleanGroom && cleanBride) {
    return `${cleanGroom}-${cleanBride}`;
  }
  return cleanGroom || cleanBride || '';
}

export const TEMPLATE_OPTIONS = MASTER_TEMPLATES.map((t) => ({ id: t.id, name: t.name }));

export const BrideEventSection: React.FC<BrideEventSectionProps> = ({
  data,
  setData,
  tierConfig,
  onShowToast,
  purchasedTemplateIds,
  onNavigateTemplates,
}) => {
  const groomFileRef = useRef<HTMLInputElement | null>(null);
  const brideFileRef = useRef<HTMLInputElement | null>(null);

  // Kumpulan ID template yang valid dan telah dibeli/dipilih oleh user
  const purchasedIds = useMemo(() => {
    const list: string[] = [];

    // 1. Dari data.purchasedTemplateIds di database/localStorage dashboard
    if (Array.isArray(data.purchasedTemplateIds) && data.purchasedTemplateIds.length > 0) {
      data.purchasedTemplateIds.forEach((id) => {
        if (id) list.push(normalizeTemplateId(id));
      });
    }

    // 2. Dari props purchasedTemplateIds (riwayat pesanan live dari getMyOrders backend)
    if (Array.isArray(purchasedTemplateIds) && purchasedTemplateIds.length > 0) {
      purchasedTemplateIds.forEach((id) => {
        if (id) list.push(normalizeTemplateId(id));
      });
    }

    // 3. Dari data.activeTemplateId yang aktif saat ini
    if (data.activeTemplateId) {
      list.push(normalizeTemplateId(data.activeTemplateId));
    }

    // 4. Dari sessionStorage ij_selected_template jika baru saja memilih di landing/order flow
    try {
      const raw = sessionStorage.getItem('ij_selected_template');
      if (raw) {
        const parsed = JSON.parse(raw);
        const tid = parsed?.previewRoute || parsed?.id;
        if (tid) list.push(normalizeTemplateId(tid));
      }
    } catch {}

    const unique = Array.from(new Set(list));
    return unique.length > 0 ? unique : ['template-satu'];
  }, [purchasedTemplateIds, data.purchasedTemplateIds, data.activeTemplateId]);

  // Hanya template yang benar-benar dibeli/dipilih oleh user
  const availableTemplates = useMemo(() => {
    const matched = MASTER_TEMPLATES.filter((tpl) => purchasedIds.includes(tpl.id));
    if (matched.length > 0) return matched;
    const current = MASTER_TEMPLATES.find((tpl) => tpl.id === normalizeTemplateId(data.activeTemplateId));
    return [current || MASTER_TEMPLATES[0]];
  }, [purchasedIds, data.activeTemplateId]);

  // Otomatis sinkronkan activeTemplateId jika template saat ini tidak ada di daftar yang dibeli
  useEffect(() => {
    const normActive = normalizeTemplateId(data.activeTemplateId);
    const exists = availableTemplates.some((t) => t.id === normActive);
    if (!exists && availableTemplates.length > 0) {
      const fallbackId = availableTemplates[0].id;
      setData((prev) => ({
        ...prev,
        activeTemplateId: fallbackId,
        purchasedTemplateIds: Array.from(new Set([...(prev.purchasedTemplateIds || []), fallbackId])),
      }));
    }
  }, [availableTemplates, data.activeTemplateId, setData]);

  const baseUrl = typeof window !== 'undefined' 
    ? `${window.location.protocol}//${window.location.host}` 
    : 'http://localhost:5173';
  const displaySlug = data.slug || createSlugFromNames(data.groom.nickName, data.bride.nickName) || 'nama-pasangan';
  const invitationLocalUrl = `${baseUrl}/#/${displaySlug}`;

  // Reset Photo to Empty Placeholder
  const handleResetPhoto = (role: 'groom' | 'bride') => {
    setData((prev) => ({
      ...prev,
      [role]: { ...prev[role], avatar: '' },
    }));
    onShowToast(`Foto mempelai ${role === 'groom' ? 'pria' : 'wanita'} dikosongkan (kembali ke placeholder).`);
  };

  // Handle Photo Upload via FileReader (Base64)
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, role: 'groom' | 'bride') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      onShowToast('Mohon pilih file gambar (JPG, PNG, atau WebP)!');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      onShowToast('Ukuran foto terlalu besar. Maksimal 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        setData((prev) => ({
          ...prev,
          [role]: { ...prev[role], avatar: base64 },
        }));
        onShowToast(`Foto mempelai ${role === 'groom' ? 'pria' : 'wanita'} berhasil diunggah!`);
      }
    };
    reader.readAsDataURL(file);
    // Reset file input agar bisa upload file yang sama jika diinginkan
    e.target.value = '';
  };

  // Auto update slug when groom or bride nickname changes
  const handleGroomNickChange = (val: string) => {
    const newSlug = createSlugFromNames(val, data.bride.nickName);
    setData((prev) => ({
      ...prev,
      slug: newSlug,
      groom: { ...prev.groom, nickName: val },
    }));
  };

  const handleBrideNickChange = (val: string) => {
    const newSlug = createSlugFromNames(data.groom.nickName, val);
    setData((prev) => ({
      ...prev,
      slug: newSlug,
      bride: { ...prev.bride, nickName: val },
    }));
  };

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

      {/* Banner Domain Tautan Undangan (Localhost) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950 via-[#133e2b] to-[#1b4332] text-white shadow-md border border-emerald-700/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center shrink-0 text-emerald-300">
            <Globe className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-emerald-300 tracking-wide uppercase">
                Tautan Domain Undangan (Localhost)
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                data.slug 
                  ? 'bg-emerald-400/20 border border-emerald-400/30 text-emerald-200' 
                  : 'bg-amber-400/20 border border-amber-400/30 text-amber-200'
              }`}>
                {data.slug ? 'Auto-Slug Aktif' : 'Placeholder Slug'}
              </span>
            </div>
            <div className="text-xs sm:text-sm font-mono font-bold text-white mt-0.5 truncate select-all">
              {invitationLocalUrl}
            </div>
            <p className="text-[11px] text-emerald-200/80 mt-0.5">
              {data.slug ? (
                <>Slug <strong className="text-white font-mono">"{data.slug}"</strong> otomatis terisi dari Nama Panggilan Mempelai Pria &amp; Wanita.</>
              ) : (
                'Isi Nama Panggilan Mempelai Pria & Wanita di bawah ini untuk membuat slug otomatis.'
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
          <button
            type="button"
            onClick={() => {
              navigator.clipboard?.writeText(invitationLocalUrl);
              onShowToast('Tautan localhost berhasil disalin!');
            }}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold border border-white/20 transition cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5 text-emerald-300" /> Salin Link
          </button>
          <a
            href={invitationLocalUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 bg-[#D4AF37] hover:bg-[#c49f2e] text-stone-950 rounded-xl text-xs font-bold transition cursor-pointer shadow-xs"
          >
            <ExternalLink className="w-3.5 h-3.5" /> Buka Undangan
          </a>
        </div>
      </div>

      {/* Info Template Undangan Yang Digunakan (Hanya yang Dipilih & Dibeli) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-700">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold text-amber-900 tracking-wide uppercase">
                Template Undangan Aktif
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold border border-emerald-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Tersinkronisasi Otomatis
              </span>
            </div>
            <p className="text-xs text-stone-600 mt-1">
              Foto mempelai pria &amp; wanita serta seluruh data yang Anda simpan di bawah ini akan <strong>otomatis diterapkan</strong> pada template yang aktif di tautan undangan tamu Anda.
            </p>
            <p className="text-[11px] text-stone-400 italic mt-0.5">
              *Hanya memunculkan desain template yang telah Anda pilih dan beli.
            </p>
          </div>
        </div>

        {/* Tampilkan Hanya Template Yang Dipilih & Dibeli */}
        {availableTemplates.length <= 1 ? (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0 self-start md:self-auto">
            <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-emerald-50 border border-emerald-200 rounded-xl shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-emerald-950">
                  {availableTemplates[0]?.name || 'Template 1 - Rustic Blossom (Floral Rose)'}
                </span>
                <span className="text-[10px] font-semibold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                  Template Terpilih &amp; Dibeli
                </span>
              </div>
            </div>
            {onNavigateTemplates && (
              <button
                type="button"
                onClick={onNavigateTemplates}
                className="text-[11px] font-semibold text-stone-600 hover:text-emerald-800 bg-stone-100 hover:bg-stone-200/80 px-2.5 py-2 rounded-xl transition cursor-pointer flex items-center justify-center gap-1 border border-stone-200"
                title="Beli atau tambah template baru dari katalog"
              >
                + Beli Desain Lain
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0 self-start md:self-auto">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1 text-[11px] font-semibold text-stone-600">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>Template Anda ({availableTemplates.length} Dibeli):</span>
              </div>
              <select
                value={normalizeTemplateId(data.activeTemplateId)}
                onChange={(e) => {
                  const newTpl = e.target.value;
                  setData((prev) => ({ ...prev, activeTemplateId: newTpl }));
                  const tplObj = availableTemplates.find((t) => t.id === newTpl);
                  onShowToast(`Template aktif beralih ke: ${tplObj?.name || newTpl}`);
                }}
                aria-label="Pilih Template Aktif"
                className="text-xs font-semibold bg-emerald-50/60 hover:bg-emerald-50 border border-emerald-300 rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] cursor-pointer shadow-xs"
              >
                {availableTemplates.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    ✓ {opt.name}
                  </option>
                ))}
              </select>
            </div>
            {onNavigateTemplates && (
              <button
                type="button"
                onClick={onNavigateTemplates}
                className="text-[11px] font-semibold text-stone-600 hover:text-emerald-800 bg-stone-100 hover:bg-stone-200/80 px-2.5 py-2 rounded-xl transition cursor-pointer flex items-center justify-center gap-1 border border-stone-200 self-end sm:self-auto mt-auto"
                title="Beli atau tambah template baru dari katalog"
              >
                + Beli Desain Lain
              </button>
            )}
          </div>
        )}
      </div>

      {/* Profil Mempelai Pria & Wanita */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ================= MEMPELAI PRIA ================= */}
        <div className="p-5 rounded-3xl border border-stone-200 bg-[#FAF7F2]/70 space-y-4 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-200/80">
            <div className="flex items-center space-x-3.5">
              <div className="relative group w-16 h-16 rounded-2xl overflow-hidden border-2 border-emerald-700/30 bg-stone-100 shadow-sm shrink-0 flex items-center justify-center">
                {data.groom.avatar ? (
                  <img
                    src={data.groom.avatar}
                    alt="Groom avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-stone-100 flex flex-col items-center justify-center text-stone-400">
                    <User className="w-6 h-6 text-stone-400" />
                    <span className="text-[8px] font-bold text-stone-400 uppercase tracking-wider mt-0.5">Pria</span>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => groomFileRef.current?.click()}
                  className="absolute inset-0 bg-black/55 text-white flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-[10px] font-semibold"
                  title={data.groom.avatar ? "Ganti Foto Mempelai Pria" : "Unggah Foto Mempelai Pria"}
                >
                  <Camera className="w-4 h-4 mb-0.5" />
                  <span>{data.groom.avatar ? "Ubah" : "Unggah"}</span>
                </button>
              </div>
              <div>
                <h2 className="font-bold text-sm text-stone-900">Mempelai Pria</h2>
                <p className="text-[11px] text-stone-500 font-medium">Foto &amp; Profil Pengantin Pria</p>
                <span className={`inline-block mt-0.5 text-[10px] font-medium px-2 py-0.5 rounded-md border ${
                  data.groom.avatar
                    ? 'text-emerald-800 bg-emerald-50 border-emerald-200/60'
                    : 'text-stone-500 bg-stone-100 border-stone-200'
                }`}>
                  {data.groom.avatar ? 'Foto Kustom Aktif' : 'Belum Ada Foto (Placeholder)'}
                </span>
              </div>
            </div>

            {/* Hidden Input File Groom */}
            <input
              ref={groomFileRef}
              type="file"
              accept="image/*"
              onChange={(e) => handlePhotoUpload(e, 'groom')}
              className="hidden"
            />

            <div className="flex items-center gap-1.5 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => groomFileRef.current?.click()}
                className="px-3 py-1.5 bg-[#2D6A4F] hover:bg-[#1B4332] text-white rounded-xl text-xs font-semibold transition cursor-pointer flex items-center justify-center gap-1.5 shadow-xs shrink-0"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Unggah Foto</span>
              </button>
              <button
                type="button"
                onClick={() => handleResetPhoto('groom')}
                title="Hapus / kosongkan foto mempelai pria"
                className="p-1.5 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-xl transition cursor-pointer border border-stone-200 shadow-xs"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-700 flex items-center justify-between mb-1">
              <span>Nama Panggilan (Groom)</span>
              <span className="text-[10px] text-emerald-700 font-normal">Mempengaruhi slug URL</span>
            </label>
            <input
              type="text"
              value={data.groom.nickName}
              onChange={(e) => handleGroomNickChange(e.target.value)}
              placeholder="Contoh: Reyhan"
              className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">Nama Lengkap &amp; Gelar</label>
            <input
              type="text"
              value={data.groom.fullName}
              onChange={(e) =>
                setData({
                  ...data,
                  groom: { ...data.groom, fullName: e.target.value },
                })
              }
              placeholder="Contoh: Reyhan Pratama, S.Kom."
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
              placeholder="Contoh: Putra pertama dari Bpk. Bambang & Ibu Sri"
              className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
            />
          </div>
        </div>

        {/* ================= MEMPELAI WANITA ================= */}
        <div className="p-5 rounded-3xl border border-stone-200 bg-[#FAF7F2]/70 space-y-4 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-200/80">
            <div className="flex items-center space-x-3.5">
              <div className="relative group w-16 h-16 rounded-2xl overflow-hidden border-2 border-emerald-700/30 bg-stone-100 shadow-sm shrink-0 flex items-center justify-center">
                {data.bride.avatar ? (
                  <img
                    src={data.bride.avatar}
                    alt="Bride avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-stone-100 flex flex-col items-center justify-center text-stone-400">
                    <User className="w-6 h-6 text-stone-400" />
                    <span className="text-[8px] font-bold text-stone-400 uppercase tracking-wider mt-0.5">Wanita</span>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => brideFileRef.current?.click()}
                  className="absolute inset-0 bg-black/55 text-white flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-[10px] font-semibold"
                  title={data.bride.avatar ? "Ganti Foto Mempelai Wanita" : "Unggah Foto Mempelai Wanita"}
                >
                  <Camera className="w-4 h-4 mb-0.5" />
                  <span>{data.bride.avatar ? "Ubah" : "Unggah"}</span>
                </button>
              </div>
              <div>
                <h2 className="font-bold text-sm text-stone-900">Mempelai Wanita</h2>
                <p className="text-[11px] text-stone-500 font-medium">Foto &amp; Profil Pengantin Wanita</p>
                <span className={`inline-block mt-0.5 text-[10px] font-medium px-2 py-0.5 rounded-md border ${
                  data.bride.avatar
                    ? 'text-emerald-800 bg-emerald-50 border-emerald-200/60'
                    : 'text-stone-500 bg-stone-100 border-stone-200'
                }`}>
                  {data.bride.avatar ? 'Foto Kustom Aktif' : 'Belum Ada Foto (Placeholder)'}
                </span>
              </div>
            </div>

            {/* Hidden Input File Bride */}
            <input
              ref={brideFileRef}
              type="file"
              accept="image/*"
              onChange={(e) => handlePhotoUpload(e, 'bride')}
              className="hidden"
            />

            <div className="flex items-center gap-1.5 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => brideFileRef.current?.click()}
                className="px-3 py-1.5 bg-[#2D6A4F] hover:bg-[#1B4332] text-white rounded-xl text-xs font-semibold transition cursor-pointer flex items-center justify-center gap-1.5 shadow-xs shrink-0"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Unggah Foto</span>
              </button>
              <button
                type="button"
                onClick={() => handleResetPhoto('bride')}
                title="Hapus / kosongkan foto mempelai wanita"
                className="p-1.5 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-xl transition cursor-pointer border border-stone-200 shadow-xs"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-700 flex items-center justify-between mb-1">
              <span>Nama Panggilan (Bride)</span>
              <span className="text-[10px] text-emerald-700 font-normal">Mempengaruhi slug URL</span>
            </label>
            <input
              type="text"
              value={data.bride.nickName}
              onChange={(e) => handleBrideNickChange(e.target.value)}
              placeholder="Contoh: Yanti"
              className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">Nama Lengkap &amp; Gelar</label>
            <input
              type="text"
              value={data.bride.fullName}
              onChange={(e) =>
                setData({
                  ...data,
                  bride: { ...data.bride, fullName: e.target.value },
                })
              }
              placeholder="Contoh: Yanti Oktaviani, S.Pd."
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
              placeholder="Contoh: Putri kedua dari Bpk. Surya & Ibu Maya"
              className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
            />
          </div>
        </div>
      </div>

      {/* Manual Slug Override (Jika user ingin mengedit slug secara manual) */}
      <div className="p-4 rounded-2xl border border-stone-200 bg-white shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex-1">
          <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Kustomisasi Slug Tautan Undangan</span>
          </label>
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-400 font-mono select-none">http://localhost:5173/#/</span>
            <input
              type="text"
              value={data.slug}
              onChange={(e) => {
                const clean = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
                setData((prev) => ({ ...prev, slug: clean }));
              }}
              className="text-xs font-mono font-bold text-stone-900 bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
              placeholder="reyhan-yanti"
            />
            <button
              type="button"
              onClick={() => {
                const auto = createSlugFromNames(data.groom.nickName, data.bride.nickName);
                setData((prev) => ({ ...prev, slug: auto }));
                onShowToast(`Slug disinkronkan: ${auto}`);
              }}
              className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-100 text-stone-600 text-xs font-semibold flex items-center gap-1 cursor-pointer"
              title="Reset ke auto-slug nama mempelai"
            >
              <RefreshCw className="w-3.5 h-3.5 text-stone-500" />
              <span className="hidden sm:inline">Reset Auto</span>
            </button>
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
              placeholder="Contoh: Sabtu, 24 Oktober 2026"
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
              className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
            />
            <input
              type="text"
              placeholder="Nama Lokasi / Tempat (contoh: Masjid Agung)"
              value={data.event.akadPlace}
              onChange={(e) =>
                setData({
                  ...data,
                  event: { ...data.event, akadPlace: e.target.value },
                })
              }
              className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
            />
            <textarea
              placeholder="Alamat Lengkap (contoh: Jl. Sudirman No. 10, Jakarta Selatan)"
              rows={2}
              value={data.event.akadAddress}
              onChange={(e) =>
                setData({
                  ...data,
                  event: { ...data.event, akadAddress: e.target.value },
                })
              }
              className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
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
              className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
            />
            <input
              type="text"
              placeholder="Nama Lokasi / Tempat (contoh: Grand Ballroom & Kediaman)"
              value={data.event.resepsiPlace}
              onChange={(e) =>
                setData({
                  ...data,
                  event: { ...data.event, resepsiPlace: e.target.value },
                })
              }
              className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
            />
            <textarea
              placeholder="Alamat Lengkap & Patokan Rumah (contoh: Jl. Sudirman No. 10, Depan Pos Ronda)"
              rows={2}
              value={data.event.resepsiAddress}
              onChange={(e) =>
                setData({
                  ...data,
                  event: { ...data.event, resepsiAddress: e.target.value },
                })
              }
              className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
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
              placeholder="Contoh: https://maps.google.com/?q=Jakarta"
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
              href={data.event.mapsUrl || 'https://maps.google.com'}
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
            placeholder="Contoh: Kahitna - Menikahimu (Acoustic Instrumental)"
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

