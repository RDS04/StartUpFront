import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Calendar, Music, MapPin, Lock, Save, Camera, Globe, Copy, ExternalLink, Sparkles, RefreshCw, User, CheckCircle2, Loader2, Clipboard, Clock, AlertTriangle, CalendarRange, Hourglass, Flag, Play, ChevronDown } from 'lucide-react';
import type { DashboardData, TierConfig } from '../types';
import { normalizeTemplateId, MASTER_TEMPLATES } from '../templateHelpers';
import { saveMyInvitation } from '../../services/invitationService';
import { saveDashboardData } from '../initialData';

interface BrideEventSectionProps {
  data: DashboardData;
  setData: React.Dispatch<React.SetStateAction<DashboardData>>;
  tierConfig: TierConfig;
  onShowToast: (msg: string) => void;
  purchasedTemplateIds?: string[];
  onNavigateTemplates?: () => void;
  onOpenActiveTemplates?: () => void;
  onSelectTemplate?: (
    templateId: string,
    tier: 'silver' | 'gold' | 'platinum' | 'premium',
    templateName: string,
    planName: string
  ) => void;
}

export function createSlugFromNames(groom: string, bride: string): string {
  const cleanGroom = (groom || '').trim().toLowerCase().replace(/[^a-z0-9]/g, '');
  const cleanBride = (bride || '').trim().toLowerCase().replace(/[^a-z0-9]/g, '');
  if (cleanGroom && cleanBride) {
    return `${cleanGroom}-${cleanBride}`;
  }
  return cleanGroom || cleanBride || '';
}

export function formatIndonesianDate(dateString: string): string {
  if (!dateString) return '';
  try {
    const d = new Date(dateString + 'T00:00:00');
    if (isNaN(d.getTime())) return '';
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  } catch {
    return '';
  }
}

export function formatDateRange(start?: string, end?: string): string {
  if (!start && !end) return '';
  if (!start && end) return formatIndonesianDate(end);
  if (start && !end) return formatIndonesianDate(start);
  if (start === end) return formatIndonesianDate(start!);

  try {
    const dStart = new Date(start + 'T00:00:00');
    const dEnd = new Date(end + 'T00:00:00');
    if (isNaN(dStart.getTime()) || isNaN(dEnd.getTime())) return formatIndonesianDate(end || start || '');

    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

    if (dStart.getFullYear() === dEnd.getFullYear() && dStart.getMonth() === dEnd.getMonth()) {
      return `${days[dStart.getDay()]}, ${dStart.getDate()} - ${days[dEnd.getDay()]}, ${dEnd.getDate()} ${months[dStart.getMonth()]} ${dStart.getFullYear()}`;
    }
    if (dStart.getFullYear() === dEnd.getFullYear()) {
      return `${dStart.getDate()} ${months[dStart.getMonth()]} - ${dEnd.getDate()} ${months[dEnd.getMonth()]} ${dStart.getFullYear()}`;
    }
    return `${formatIndonesianDate(start!)} s/d ${formatIndonesianDate(end!)}`;
  } catch {
    return formatIndonesianDate(end || start || '');
  }
}

export function calculateDurationDays(start?: string, end?: string): number {
  if (!start || !end) return 1;
  const s = new Date(start + 'T00:00:00').getTime();
  const e = new Date(end + 'T00:00:00').getTime();
  if (isNaN(s) || isNaN(e) || e < s) return 1;
  return Math.round((e - s) / (1000 * 60 * 60 * 24)) + 1;
}

export const TEMPLATE_OPTIONS = MASTER_TEMPLATES.map((t) => ({ id: t.id, name: t.name }));

export const BrideEventSection: React.FC<BrideEventSectionProps> = ({
  data,
  setData,
  tierConfig,
  onShowToast,
  purchasedTemplateIds,
  onNavigateTemplates,
  onOpenActiveTemplates,
  onSelectTemplate,
}) => {
  const groomFileRef = useRef<HTMLInputElement | null>(null);
  const brideFileRef = useRef<HTMLInputElement | null>(null);

  // Kumpulan ID template yang valid dan telah dibeli oleh user
  const purchasedIds = useMemo(() => {
    const list: string[] = [];

    // Dari props purchasedTemplateIds atau data.purchasedTemplateIds (hanya yang sudah berstatus paid)
    const source = (Array.isArray(purchasedTemplateIds) && purchasedTemplateIds.length > 0)
      ? purchasedTemplateIds
      : (Array.isArray(data.purchasedTemplateIds) ? data.purchasedTemplateIds : []);

    source.forEach((id) => {
      if (id) list.push(normalizeTemplateId(id));
    });

    return Array.from(new Set(list));
  }, [purchasedTemplateIds, data.purchasedTemplateIds]);

  // Template yang tersedia untuk dipilih/desain
  const availableTemplates = useMemo(() => {
    if (purchasedIds.length > 0) {
      const matched = MASTER_TEMPLATES.filter((tpl) => purchasedIds.includes(tpl.id));
      if (matched.length > 0) return matched;
    }
    const current = MASTER_TEMPLATES.find((tpl) => tpl.id === normalizeTemplateId(data.activeTemplateId));
    return [current || MASTER_TEMPLATES[0]];
  }, [purchasedIds, data.activeTemplateId]);

  // Template object yang sedang aktif saat ini
  const currentTemplateObj = useMemo(() => {
    const normActive = normalizeTemplateId(data.activeTemplateId);
    return MASTER_TEMPLATES.find((tpl) => tpl.id === normActive) || availableTemplates[0] || MASTER_TEMPLATES[0];
  }, [data.activeTemplateId, availableTemplates]);

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

  const [isSaving, setIsSaving] = useState(false);
  const [savedDates, setSavedDates] = useState<{ startDate: string; endDate: string }>(() => ({
    startDate: data.event.startDate || '',
    endDate: data.event.endDate || '',
  }));

  // Jika data.event.startDate/endDate pertama kali dimuat dari backend, catat sebagai tersimpan
  useEffect(() => {
    if (data.event.startDate && data.event.endDate && !savedDates.startDate && !savedDates.endDate) {
      setSavedDates({
        startDate: data.event.startDate,
        endDate: data.event.endDate,
      });
    }
  }, [data.event.startDate, data.event.endDate]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await saveMyInvitation(data);
      if (res.invitation) {
        const inv = res.invitation;
        setData((prev) => {
          const next = {
            ...prev,
            slug: inv.slug || prev.slug,
            event: {
              ...prev.event,
              ...(inv.event || {}),
              startDate: inv.event?.startDate || prev.event.startDate || '',
              endDate: inv.event?.endDate || prev.event.endDate || '',
              countdownTime: inv.event?.countdownTime || prev.event.countdownTime || '08:00',
            },
          };
          saveDashboardData(next);
          return next;
        });
        setSavedDates({
          startDate: data.event.startDate || '',
          endDate: data.event.endDate || '',
        });
        window.dispatchEvent(new Event('storage'));
      }
      onShowToast('✓ Data tanggal, jam acara & mempelai berhasil disimpan ke database!');
    } catch (err: any) {
      onShowToast(err.message || 'Gagal menyimpan ke database backend.');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasteTo = async (fieldUpdater: (text: string) => void, fieldName: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text && text.trim()) {
          fieldUpdater(text.trim());
          onShowToast(`Teks berhasil ditempel ke ${fieldName}!`);
          return;
        }
      }
      onShowToast('Clipboard kosong atau browser tidak mengizinkan akses.');
    } catch {
      onShowToast('Tidak dapat membaca clipboard otomatis. Silakan paste manual (Ctrl+V).');
    }
  };

  // Live Countdown Simulator Preview State di Dashboard (Mendukung Custom Tanggal Mulai & Berakhir)
  const [countdownPreview, setCountdownPreview] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isPast: boolean;
    isLive: boolean;
    hasDate: boolean;
    targetLabel: string;
    targetDateStr: string;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
    isLive: false,
    hasDate: false,
    targetLabel: 'Puncak Acara',
    targetDateStr: '',
  });

  const hasBothDates = Boolean(data.event.startDate && data.event.endDate);
  const isDatesSaved = hasBothDates && savedDates.startDate === data.event.startDate && savedDates.endDate === data.event.endDate;

  useEffect(() => {
    const calc = () => {
      const startD = data.event.startDate;
      const startT = data.event.startTime || '08:00';
      const endD = data.event.endDate;
      const endT = data.event.countdownTime || '08:00';
      const targetMode = data.event.countdownTarget || 'end';

      if (!startD || !endD || !isDatesSaved) {
        setCountdownPreview({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isPast: false,
          isLive: false,
          hasDate: false,
          targetLabel: !startD || !endD ? 'Belum diisi' : 'Belum disimpan',
          targetDateStr: '',
        });
        return;
      }

      const now = new Date().getTime();
      const startMs = new Date(`${startD}T${startT}:00`).getTime();
      const endMs = new Date(`${endD}T${endT}:00`).getTime();

      let targetMs = endMs;
      let label = 'Puncak / Selesai Acara';
      let live = false;
      let targetDateStr = `${endD} ${endT} WIB`;

      if (targetMode === 'start') {
        targetMs = startMs;
        label = 'Pembukaan / Mulai Acara';
        targetDateStr = `${startD} ${startT} WIB`;
      } else if (targetMode === 'auto') {
        if (startMs && now < startMs) {
          targetMs = startMs;
          label = 'Mulai Acara (Pembukaan)';
          targetDateStr = `${startD} ${startT} WIB`;
        } else if (endMs && now <= endMs) {
          targetMs = endMs;
          label = 'Selesai Acara (Sedang Berlangsung)';
          targetDateStr = `${endD} ${endT} WIB`;
          live = true;
        } else {
          targetMs = endMs;
          label = 'Selesai Acara';
          targetDateStr = `${endD} ${endT} WIB`;
        }
      } else {
        // targetMode === 'end'
        if (startMs && now >= startMs && now <= endMs) {
          live = true;
        }
        targetMs = endMs;
        label = 'Puncak / Selesai Acara';
        targetDateStr = `${endD} ${endT} WIB`;
      }

      const diff = targetMs - now;

      if (diff > 0) {
        setCountdownPreview({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
          isPast: false,
          isLive: live,
          hasDate: true,
          targetLabel: label,
          targetDateStr,
        });
      } else {
        setCountdownPreview({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isPast: true,
          isLive: false,
          hasDate: true,
          targetLabel: label,
          targetDateStr,
        });
      }
    };

    calc();
    const interval = setInterval(calc, 1000);
    return () => clearInterval(interval);
  }, [
    data.event.startDate,
    data.event.startTime,
    data.event.endDate,
    data.event.countdownTime,
    data.event.countdownTarget,
    isDatesSaved,
  ]);

  const handleStartDateChange = (val: string) => {
    setData((prev) => {
      const currentEnd = prev.event.endDate;
      const formattedRange = val && currentEnd ? formatDateRange(val, currentEnd) : (val ? formatIndonesianDate(val) : '');
      return {
        ...prev,
        event: {
          ...prev.event,
          startDate: val,
          date: currentEnd || val,
          dateDisplay: formattedRange || prev.event.dateDisplay,
        },
      };
    });
  };

  const handleEndDateChange = (val: string) => {
    setData((prev) => {
      const currentStart = prev.event.startDate;
      const formattedRange = currentStart && val ? formatDateRange(currentStart, val) : (val ? formatIndonesianDate(val) : '');
      return {
        ...prev,
        event: {
          ...prev.event,
          endDate: val,
          date: val,
          dateDisplay: formattedRange || prev.event.dateDisplay,
        },
      };
    });
  };

  const handleClearDates = () => {
    setData((prev) => ({
      ...prev,
      event: {
        ...prev.event,
        startDate: '',
        endDate: '',
        date: '',
        dateDisplay: '',
      },
    }));
    setSavedDates({ startDate: '', endDate: '' });
    onShowToast('Tanggal acara dan hitung mundur telah dikosongkan.');
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

      {/* Info Template Undangan Yang Digunakan (Clean, Minimalist & Luxury Redesign) */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-stone-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 transition-all">
        {/* Left: Thumbnail & Active Template Info */}
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-stone-200 bg-stone-100 shrink-0 shadow-2xs group">
            {currentTemplateObj?.image ? (
              <img
                src={currentTemplateObj.image}
                alt={currentTemplateObj.name}
                className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-amber-700 bg-amber-50">
                <Sparkles className="w-5 h-5" />
              </div>
            )}
            <span className="absolute bottom-0 inset-x-0 bg-stone-950/70 text-[8px] font-bold text-white text-center py-0.5 backdrop-blur-xs uppercase tracking-tight">
              {currentTemplateObj?.category || 'Wedding'}
            </span>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                Template Aktif
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Aktif Digunakan
              </span>
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-stone-900 truncate mt-0.5">
              {currentTemplateObj?.name || 'Template Undangan'}
            </h3>
            <p className="text-[11px] text-stone-500 truncate hidden sm:block">
              Data formulir dan foto di bawah otomatis disinkronkan ke template ini.
            </p>
          </div>
        </div>

        {/* Right: Clean, Unified Controls */}
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto w-full sm:w-auto justify-end">
          {availableTemplates.length > 1 ? (
            <div className="flex items-center gap-2">
              {/* Quick Dropdown */}
              <div className="relative">
                <select
                  value={normalizeTemplateId(data.activeTemplateId)}
                  onChange={(e) => {
                    const newTpl = normalizeTemplateId(e.target.value);
                    if (newTpl === normalizeTemplateId(data.activeTemplateId)) return;
                    const tplObj = availableTemplates.find((t) => t.id === newTpl);
                    if (onSelectTemplate) {
                      onSelectTemplate(newTpl, data.tier, tplObj?.name || newTpl, `Paket ${tierConfig.name}`);
                    } else {
                      setData((prev) => ({ ...prev, activeTemplateId: newTpl }));
                      onShowToast(`Template aktif beralih ke: ${tplObj?.name || newTpl}`);
                    }
                  }}
                  aria-label="Pilih Template Aktif"
                  className="appearance-none pl-3 pr-8 py-2 bg-stone-50 hover:bg-stone-100 border border-stone-200 hover:border-stone-300 rounded-xl text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] cursor-pointer transition shadow-2xs"
                  title="Ganti template aktif secara langsung"
                >
                  {availableTemplates.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.shortName || opt.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Tombol Buka Koleksi Template */}
              {onOpenActiveTemplates && (
                <button
                  type="button"
                  onClick={onOpenActiveTemplates}
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-stone-700 hover:text-stone-900 bg-white hover:bg-stone-50 border border-stone-200 transition shadow-2xs flex items-center gap-1.5 cursor-pointer"
                  title="Lihat seluruh template yang Anda miliki beserta paketnya"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span className="hidden sm:inline">Koleksi</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-stone-100 text-[10px] font-bold text-stone-700">
                    {availableTemplates.length}
                  </span>
                </button>
              )}
            </div>
          ) : (
            onOpenActiveTemplates && (
              <button
                type="button"
                onClick={onOpenActiveTemplates}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-stone-700 hover:text-stone-900 bg-stone-50 hover:bg-stone-100 border border-stone-200 transition shadow-2xs flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Lihat Template</span>
              </button>
            )
          )}

          {onNavigateTemplates && (
            <button
              type="button"
              onClick={onNavigateTemplates}
              className="px-2.5 py-2 rounded-xl text-xs font-medium text-stone-500 hover:text-emerald-700 hover:bg-emerald-50/50 transition cursor-pointer"
              title="Beli template baru dari katalog"
            >
              + Beli Lain
            </button>
          )}
        </div>
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

      {/* Detail Waktu, Tanggal Mulai & Tanggal Berakhir Acara (Custom Countdown) */}
      <div className="p-6 rounded-3xl border border-stone-200 bg-white space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-stone-100">
          <div>
            <h2 className="font-bold text-stone-900 text-sm flex items-center gap-2">
              <CalendarRange className="w-4 h-4 text-[#2D6A4F]" /> Waktu, Tanggal Mulai &amp; Berakhir Acara (Custom Countdown)
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Atur tanggal mulai pembukaan acara hingga tanggal berakhir/puncak acara untuk mengaktifkan countdown timer kustom di undangan digital.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 w-fit flex items-center gap-1">
              <Hourglass className="w-3 h-3 text-emerald-600" />
              Durasi: {calculateDurationDays(data.event.startDate || data.event.date, data.event.endDate || data.event.date)} Hari
            </span>
          </div>
        </div>

        {/* Pilihan Patokan Target Hitung Mundur */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#2D6A4F]" />
            <span>Pilih Patokan Hitung Mundur (Mode Countdown):</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {[
              {
                id: 'end' as const,
                title: 'Tanggal Berakhir / Puncak',
                desc: 'Hitung mundur menuju puncak/selesai acara',
                icon: Flag,
              },
              {
                id: 'start' as const,
                title: 'Tanggal Mulai Acara',
                desc: 'Hitung mundur menuju hari pembukaan acara',
                icon: Play,
              },
              {
                id: 'auto' as const,
                title: 'Mode Otomatis Rentang',
                desc: 'Ke tanggal mulai, lalu Live s/d selesai',
                icon: Sparkles,
              },
            ].map((mode) => {
              const active = (data.event.countdownTarget || 'end') === mode.id;
              const IconComp = mode.icon;
              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() =>
                    setData((prev) => ({
                      ...prev,
                      event: { ...prev.event, countdownTarget: mode.id },
                    }))
                  }
                  className={`p-3 rounded-2xl border text-left transition cursor-pointer ${
                    active
                      ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                      : 'bg-white border-stone-200 hover:bg-stone-50 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <IconComp className={`w-3.5 h-3.5 ${active ? 'text-[#2D6A4F]' : 'text-stone-400'}`} />
                    <span className={`text-xs font-bold ${active ? 'text-emerald-950' : 'text-stone-800'}`}>
                      {mode.title}
                    </span>
                  </div>
                  <p className="text-[10px] text-stone-500 mt-0.5 leading-tight">{mode.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Input Fields: Dua Kolom Rentang Tanggal Mulai & Tanggal Berakhir */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Kolom 1: Tanggal & Jam Mulai Acara */}
          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-3 shadow-2xs">
            <div className="flex items-center justify-between pb-1.5 border-b border-emerald-200/60">
              <span className="font-bold text-xs text-emerald-900 flex items-center gap-1.5">
                <Play className="w-3.5 h-3.5 text-emerald-700" /> Tanggal &amp; Jam Mulai Acara
              </span>
              <span className="text-[10px] bg-emerald-200/60 text-emerald-900 font-semibold px-2 py-0.5 rounded-full">
                Pembukaan
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                  Tanggal Mulai <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={data.event.startDate || ''}
                  onChange={(e) => handleStartDateChange(e.target.value)}
                  className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] font-medium text-stone-900"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                  Jam Mulai (WIB)
                </label>
                <input
                  type="time"
                  value={data.event.startTime || '08:00'}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      event: { ...prev.event, startTime: e.target.value },
                    }))
                  }
                  className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] font-medium text-stone-900"
                />
              </div>
            </div>
          </div>

          {/* Kolom 2: Tanggal & Jam Berakhir / Puncak Acara */}
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-3 shadow-2xs">
            <div className="flex items-center justify-between pb-1.5 border-b border-amber-200/60">
              <span className="font-bold text-xs text-amber-950 flex items-center gap-1.5">
                <Flag className="w-3.5 h-3.5 text-amber-700" /> Tanggal &amp; Jam Berakhir Acara
              </span>
              <span className="text-[10px] bg-amber-200/60 text-amber-950 font-semibold px-2 py-0.5 rounded-full">
                Puncak / Selesai
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                  Tanggal Berakhir <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={data.event.endDate || ''}
                  onChange={(e) => handleEndDateChange(e.target.value)}
                  className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] font-medium text-stone-900"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                  Jam Selesai (WIB)
                </label>
                <input
                  type="time"
                  value={data.event.countdownTime || '08:00'}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      event: { ...prev.event, countdownTime: e.target.value },
                    }))
                  }
                  className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] font-medium text-stone-900"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Input Teks Format Tanggal Display di Undangan */}
        <div className="space-y-1">
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
              <span>Teks Tampilan Tanggal di Undangan Digital:</span>
            </label>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleClearDates}
                className="text-[10px] font-semibold text-rose-700 hover:text-rose-900 flex items-center gap-1 cursor-pointer transition active:scale-95 px-2 py-0.5 rounded-md hover:bg-rose-50 border border-rose-200"
                title="Kosongkan tanggal mulai, tanggal selesai, dan hitung mundur"
              >
                <RefreshCw className="w-3 h-3 text-rose-500" /> Kosongkan Tanggal
              </button>
              <button
                type="button"
                onClick={() => {
                  const s = data.event.startDate;
                  const e = data.event.endDate;
                  if (s && e) {
                    const formatted = formatDateRange(s, e);
                    setData((prev) => ({
                      ...prev,
                      event: { ...prev.event, dateDisplay: formatted },
                    }));
                    onShowToast(`Teks tanggal rentang diformat: ${formatted}`);
                  } else if (s || e) {
                    const formatted = formatIndonesianDate(s || e || '');
                    setData((prev) => ({
                      ...prev,
                      event: { ...prev.event, dateDisplay: formatted },
                    }));
                    onShowToast(`Teks tanggal diformat: ${formatted}`);
                  } else {
                    onShowToast('Pilih tanggal mulai atau berakhir terlebih dahulu!');
                  }
                }}
                className="text-[10px] font-semibold text-[#2D6A4F] hover:text-[#1B4332] flex items-center gap-1 cursor-pointer transition active:scale-95 px-2 py-0.5 rounded-md hover:bg-emerald-50 border border-emerald-200/60"
                title="Format otomatis rentang tanggal ke Bahasa Indonesia"
              >
                <Sparkles className="w-3 h-3 text-amber-600" /> Format Otomatis Rentang
              </button>
            </div>
          </div>
          <input
            type="text"
            value={data.event.dateDisplay}
            onChange={(e) =>
              setData({
                ...data,
                event: { ...data.event, dateDisplay: e.target.value },
              })
            }
            placeholder="Contoh: Jumat, 20 November 2026 s/d Senin, 23 November 2026"
            className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
          />
          <span className="text-[10px] text-stone-400 mt-1 block">
            Teks ini yang akan tertulis di kartu undangan (Cover, Hero, dan Kartu Acara)
          </span>
        </div>

        {/* Live Simulator Widget Hitung Mundur Acara (Preview Langsung) */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-[#1b4332] via-[#24523d] to-[#2d6a4f] text-white shadow-md border border-emerald-700/50 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-300 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Live Simulator
              </span>
              <h3 className="text-sm font-bold text-white tracking-wide">
                HITUNG MUNDUR ACARA (TAMPILAN DI UNDANGAN)
              </h3>
            </div>
            <div className="flex flex-col sm:items-end text-xs font-mono text-emerald-200">
              <span className="bg-white/10 px-2.5 py-1 rounded-lg border border-white/10 w-fit">
                Patokan: <strong>{countdownPreview.targetLabel}</strong> {isDatesSaved && countdownPreview.targetDateStr ? `(${countdownPreview.targetDateStr})` : ''}
              </span>
              <span className="text-[10px] text-emerald-300/80 mt-1">
                Rentang: {data.event.startDate || '-'} s/d {data.event.endDate || '-'}
              </span>
            </div>
          </div>

          {!hasBothDates ? (
            <div className="p-6 rounded-2xl bg-black/25 border border-white/10 text-center space-y-2.5">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mx-auto text-emerald-300">
                <Hourglass className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Hitung Mundur Belum Aktif (Kosong)</h4>
                <p className="text-xs text-emerald-100/90 max-w-sm mx-auto mt-1 leading-relaxed">
                  Hitung mundur (hari, jam, menit, detik) akan <strong>otomatis muncul</strong> setelah Anda memasukkan <strong>Tanggal Mulai</strong> dan <strong>Tanggal Selesai</strong> acara di atas, lalu mengklik <strong>Simpan Tanggal</strong>.
                </p>
              </div>
              <div className="pt-1 flex items-center justify-center gap-2 text-[11px] text-emerald-300/80">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>Status: Tanggal Mulai &amp; Tanggal Selesai belum diinput</span>
              </div>
            </div>
          ) : !isDatesSaved ? (
            <div className="p-6 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-amber-400/20 flex items-center justify-center mx-auto text-amber-300">
                <Save className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-amber-200">Tanggal Telah Diinput — Belum Disimpan</h4>
                <p className="text-xs text-amber-100/90 max-w-md mx-auto mt-1 leading-relaxed">
                  Rentang tanggal <strong>{data.event.startDate}</strong> s/d <strong>{data.event.endDate}</strong> telah Anda isi. Tekan tombol <strong>Simpan Tanggal</strong> di bawah untuk mengaktifkan dan memunculkan hitung mundur di undangan digital.
                </p>
              </div>
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#c49f2e] text-stone-950 font-bold text-xs shadow-md transition active:scale-95 cursor-pointer"
              >
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>Simpan Tanggal &amp; Aktifkan Hitung Mundur</span>
              </button>
            </div>
          ) : (
            <>
              {/* 4 Tile Countdown: Hari, Jam, Menit, Detik */}
              <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-md mx-auto text-center">
                {[
                  { label: 'HARI', value: countdownPreview.days },
                  { label: 'JAM', value: countdownPreview.hours },
                  { label: 'MENIT', value: countdownPreview.minutes },
                  { label: 'DETIK', value: countdownPreview.seconds },
                ].map((unit) => (
                  <div
                    key={unit.label}
                    className="bg-black/30 backdrop-blur-md border border-white/15 rounded-xl p-3 flex flex-col items-center shadow-inner"
                  >
                    <span className="font-mono text-2xl sm:text-3xl font-extrabold text-[#f5f8f1]">
                      {String(unit.value).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] tracking-wider text-emerald-200/90 font-semibold mt-0.5">
                      {unit.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Status Message Pill */}
              <div className="pt-1">
                {countdownPreview.isLive ? (
                  <div className="p-3 rounded-xl bg-emerald-500/30 border border-emerald-400 text-xs text-white flex items-center justify-between gap-2 shadow-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0"></span>
                      <span>
                        🎉 <strong>ACARA SEDANG BERLANGSUNG!</strong> Acara telah dimulai, hitung mundur menuju penutupan dalam <strong>{countdownPreview.days} Hari {countdownPreview.hours} Jam {countdownPreview.minutes} Menit</strong> lagi.
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleSave}
                      disabled={isSaving}
                      className="px-3.5 py-1.5 rounded-lg bg-[#D4AF37] hover:bg-[#c49f2e] text-stone-950 font-bold text-xs transition active:scale-95 cursor-pointer shrink-0 shadow-xs flex items-center gap-1.5"
                    >
                      {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                      <span>Simpan Tanggal</span>
                    </button>
                  </div>
                ) : countdownPreview.isPast ? (
                  <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-400/40 text-xs text-amber-100 flex items-start justify-between gap-2.5">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-amber-200">Perhatian: Tanggal acara telah terlewat dari hari ini!</strong>
                        <p className="mt-0.5 text-amber-100/90 text-[11px]">
                          Tanggal yang Anda pilih ({data.event.endDate}) berada di masa lampau. Silakan perbarui tanggal ke masa yang akan datang.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-xs text-emerald-100 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                      <span>
                        ✓ <strong>Hitung Mundur Aktif &amp; Tersimpan:</strong> Sisa <strong>{countdownPreview.days} Hari {countdownPreview.hours} Jam {countdownPreview.minutes} Menit</strong> lagi menuju {countdownPreview.targetLabel}.
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleClearDates}
                      className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs transition cursor-pointer shrink-0"
                    >
                      Reset
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Sesi Akad & Resepsi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {/* Form Sesi Akad Nikah */}
          <div className="p-4 sm:p-5 rounded-2xl bg-stone-50/90 border border-stone-200/90 space-y-3 shadow-2xs">
            <div className="flex items-center justify-between pb-1.5 border-b border-stone-200/70">
              <span className="font-bold text-xs sm:text-sm text-stone-900 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#2D6A4F]" /> Sesi Akad Nikah
              </span>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-stone-600 block mb-1">Waktu Akad Nikah</label>
              <input
                type="text"
                placeholder="Contoh: 08:00 - 10:00 WIB"
                value={data.event.akadTime}
                onChange={(e) =>
                  setData({
                    ...data,
                    event: { ...data.event, akadTime: e.target.value },
                  })
                }
                className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-stone-600 block mb-1">Nama Tempat / Masjid / Gedung</label>
              <input
                type="text"
                placeholder="Contoh: Masjid Agung Al-Hijrah"
                value={data.event.akadPlace}
                onChange={(e) =>
                  setData({
                    ...data,
                    event: { ...data.event, akadPlace: e.target.value },
                  })
                }
                className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
              />
            </div>

            {/* Form Paste Alamat Akad Nikah */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-semibold text-stone-600">Alamat Lengkap Akad Nikah</label>
                <button
                  type="button"
                  onClick={() =>
                    handlePasteTo(
                      (val) => setData((prev) => ({ ...prev, event: { ...prev.event, akadAddress: val } })),
                      'Alamat Akad Nikah'
                    )
                  }
                  className="text-[10px] font-semibold text-[#2D6A4F] hover:text-[#1B4332] flex items-center gap-1 px-2 py-0.5 rounded-md hover:bg-emerald-50 border border-emerald-200/60 cursor-pointer transition active:scale-95"
                  title="Tempel teks alamat dari clipboard"
                >
                  <Clipboard className="w-3 h-3" /> Tempel Alamat
                </button>
              </div>
              <textarea
                placeholder="Paste alamat lengkap: Jl. Kesehatan No. 41, RT 02 / RW 05, Padang Selatan..."
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

            {/* Form Paste Link Google Maps Akad Nikah */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-semibold text-stone-600">Tautan Google Maps Akad Nikah</label>
                <button
                  type="button"
                  onClick={() =>
                    handlePasteTo(
                      (val) =>
                        setData((prev) => ({
                          ...prev,
                          event: { ...prev.event, akadMapsUrl: val, mapsUrl: prev.event.mapsUrl || val },
                        })),
                      'Link Maps Akad'
                    )
                  }
                  className="text-[10px] font-semibold text-[#2D6A4F] hover:text-[#1B4332] flex items-center gap-1 px-2 py-0.5 rounded-md hover:bg-emerald-50 border border-emerald-200/60 cursor-pointer transition active:scale-95"
                  title="Tempel link Google Maps dari clipboard"
                >
                  <Clipboard className="w-3 h-3" /> Tempel Link Maps
                </button>
              </div>
              <div className="flex gap-1.5">
                <input
                  type="url"
                  placeholder="Paste link: https://maps.app.goo.gl/..."
                  value={data.event.akadMapsUrl || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      event: {
                        ...data.event,
                        akadMapsUrl: e.target.value,
                        mapsUrl: data.event.mapsUrl || e.target.value,
                      },
                    })
                  }
                  className="flex-1 text-xs bg-white border border-stone-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                />
                <a
                  href={data.event.akadMapsUrl || data.event.mapsUrl || 'https://maps.google.com'}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl flex items-center gap-1 transition shrink-0 cursor-pointer"
                  title="Buka lokasi Akad di Google Maps"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#2D6A4F]" />
                  <span>Uji Pin</span>
                </a>
              </div>
            </div>
          </div>

          {/* Form Sesi Resepsi Pernikahan */}
          <div className="p-4 sm:p-5 rounded-2xl bg-stone-50/90 border border-stone-200/90 space-y-3 shadow-2xs">
            <div className="flex items-center justify-between pb-1.5 border-b border-stone-200/70">
              <span className="font-bold text-xs sm:text-sm text-stone-900 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-amber-700" /> Sesi Resepsi Pernikahan
              </span>
              <button
                type="button"
                onClick={() => {
                  setData((prev) => ({
                    ...prev,
                    event: {
                      ...prev.event,
                      resepsiPlace: prev.event.akadPlace,
                      resepsiAddress: prev.event.akadAddress,
                      resepsiMapsUrl: prev.event.akadMapsUrl,
                    },
                  }));
                  onShowToast('Lokasi & alamat resepsi disamakan dengan akad nikah!');
                }}
                className="text-[10px] font-semibold text-stone-600 hover:text-stone-900 flex items-center gap-1 px-2 py-0.5 rounded-md hover:bg-stone-200/70 border border-stone-300 cursor-pointer transition active:scale-95"
                title="Salin tempat, alamat, dan maps dari sesi akad"
              >
                <Copy className="w-3 h-3 text-stone-500" /> Samakan dari Akad
              </button>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-stone-600 block mb-1">Waktu Resepsi Pernikahan</label>
              <input
                type="text"
                placeholder="Contoh: 11:00 - Selesai WIB"
                value={data.event.resepsiTime}
                onChange={(e) =>
                  setData({
                    ...data,
                    event: { ...data.event, resepsiTime: e.target.value },
                  })
                }
                className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-stone-600 block mb-1">Nama Tempat / Gedung / Kediaman</label>
              <input
                type="text"
                placeholder="Contoh: Grand Ballroom & Kediaman Mempelai"
                value={data.event.resepsiPlace}
                onChange={(e) =>
                  setData({
                    ...data,
                    event: { ...data.event, resepsiPlace: e.target.value },
                  })
                }
                className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
              />
            </div>

            {/* Form Paste Alamat Resepsi Acara */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-semibold text-stone-600">Alamat Lengkap Resepsi Acara</label>
                <button
                  type="button"
                  onClick={() =>
                    handlePasteTo(
                      (val) => setData((prev) => ({ ...prev, event: { ...prev.event, resepsiAddress: val } })),
                      'Alamat Resepsi Acara'
                    )
                  }
                  className="text-[10px] font-semibold text-[#2D6A4F] hover:text-[#1B4332] flex items-center gap-1 px-2 py-0.5 rounded-md hover:bg-emerald-50 border border-emerald-200/60 cursor-pointer transition active:scale-95"
                  title="Tempel teks alamat dari clipboard"
                >
                  <Clipboard className="w-3 h-3" /> Tempel Alamat
                </button>
              </div>
              <textarea
                placeholder="Paste alamat lengkap: Jl. Kesehatan No. 41, RT 02 / RW 05, Depan Pos Ronda..."
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

            {/* Form Paste Link Google Maps Resepsi Acara */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-semibold text-stone-600">Tautan Google Maps Resepsi Acara</label>
                <button
                  type="button"
                  onClick={() =>
                    handlePasteTo(
                      (val) =>
                        setData((prev) => ({
                          ...prev,
                          event: { ...prev.event, resepsiMapsUrl: val },
                        })),
                      'Link Maps Resepsi'
                    )
                  }
                  className="text-[10px] font-semibold text-[#2D6A4F] hover:text-[#1B4332] flex items-center gap-1 px-2 py-0.5 rounded-md hover:bg-emerald-50 border border-emerald-200/60 cursor-pointer transition active:scale-95"
                  title="Tempel link Google Maps dari clipboard"
                >
                  <Clipboard className="w-3 h-3" /> Tempel Link Maps
                </button>
              </div>
              <div className="flex gap-1.5">
                <input
                  type="url"
                  placeholder="Paste link: https://maps.app.goo.gl/..."
                  value={data.event.resepsiMapsUrl || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      event: { ...data.event, resepsiMapsUrl: e.target.value },
                    })
                  }
                  className="flex-1 text-xs bg-white border border-stone-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                />
                <a
                  href={data.event.resepsiMapsUrl || data.event.mapsUrl || 'https://maps.google.com'}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl flex items-center gap-1 transition shrink-0 cursor-pointer"
                  title="Buka lokasi Resepsi di Google Maps"
                >
                  <MapPin className="w-3.5 h-3.5 text-amber-700" />
                  <span>Uji Pin</span>
                </a>
              </div>
            </div>
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
          disabled={isSaving}
          className="w-full sm:w-auto px-7 py-3 bg-[#2D6A4F] hover:bg-[#1B4332] disabled:opacity-50 text-white font-semibold text-xs rounded-xl shadow-sm transition active:scale-95 cursor-pointer flex items-center justify-center gap-2"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Menyimpan ke Database...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" /> Simpan Perubahan Acara
            </>
          )}
        </button>
      </div>
    </div>
  );
};

