import React, { useState } from 'react';
import {
  X,
  Sparkles,
  CheckCircle2,
  Crown,
  ShieldCheck,
  Check,
  Gem,
  Users,
  CreditCard,
  Music,
  Download,
  ArrowRight,
  Layers,
  Palette,
  Eye,
  Loader2,
} from 'lucide-react';
import { normalizeTemplateId } from '../templateHelpers';

export interface PurchasedTemplateCardItem {
  templateId: string;
  templateName: string;
  shortName: string;
  category: string;
  badge?: string;
  desc?: string;
  image?: string;
  planName: string;
  tier: 'silver' | 'gold' | 'platinum' | 'premium';
  status: string;
  orderId?: number;
  totalAmount?: number;
  createdAt?: string;
  isActive: boolean;
}

interface ActiveTemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentActiveTemplateId: string;
  currentTier: 'silver' | 'gold' | 'platinum' | 'premium';
  purchasedTemplates: PurchasedTemplateCardItem[];
  onSelectTemplate: (
    templateId: string,
    associatedTier: 'silver' | 'gold' | 'platinum' | 'premium',
    templateName: string,
    planName: string
  ) => Promise<void> | void;
  onPreviewTemplate: (templateId: string) => void;
  onNavigateTemplates?: () => void;
  onNavigatePricing?: () => void;
  onOpenPayment?: (templateId: string) => void;
  isSwitching?: boolean;
}

export const ActiveTemplatesModal: React.FC<ActiveTemplatesModalProps> = ({
  isOpen,
  onClose,
  currentActiveTemplateId,
  purchasedTemplates,
  onSelectTemplate,
  onPreviewTemplate,
  onNavigateTemplates,
  onNavigatePricing,
  onOpenPayment,
  isSwitching = false,
}) => {
  const [switchingId, setSwitchingId] = useState<string | null>(null);

  if (!isOpen) return null;

  const normalizedActiveId = normalizeTemplateId(currentActiveTemplateId);

  const handleApply = async (item: PurchasedTemplateCardItem) => {
    if (item.isActive || isSwitching || switchingId) return;
    setSwitchingId(item.templateId);
    try {
      await onSelectTemplate(item.templateId, item.tier, item.templateName, item.planName);
    } finally {
      setSwitchingId(null);
    }
  };

  const getTierBadgeInfo = (tier: string) => {
    switch (tier) {
      case 'gold':
        return {
          label: 'Paket Gold (VIP)',
          icon: Crown,
          containerClass: 'bg-amber-50 border-amber-300/80 text-amber-900',
          badgeClass: 'bg-amber-500 text-white',
          accentColor: '#D4AF37',
          maxGuests: 'Unlimited Tamu',
          maxBank: '5 Rekening Amplop',
          features: ['Custom Musik Sendiri', 'Export Tamu Excel', 'Buku Tamu VIP'],
        };
      case 'platinum':
        return {
          label: 'Paket Platinum (Full VIP)',
          icon: Gem,
          containerClass: 'bg-purple-50 border-purple-300/80 text-purple-900',
          badgeClass: 'bg-purple-600 text-white',
          accentColor: '#9333EA',
          maxGuests: 'Unlimited Tamu',
          maxBank: '5 Rekening Amplop',
          features: ['Custom Musik Sendiri', 'Export Tamu Excel', 'Layanan Prioritas'],
        };
      case 'silver':
        return {
          label: 'Paket Silver (Hemat)',
          icon: ShieldCheck,
          containerClass: 'bg-stone-50 border-stone-300 text-stone-800',
          badgeClass: 'bg-stone-600 text-white',
          accentColor: '#57534E',
          maxGuests: 'Maks. 50 Tamu',
          maxBank: '1 Rekening Amplop',
          features: ['Audio Musik Standar', 'Fitur QR & RSVP'],
        };
      case 'premium':
      default:
        return {
          label: 'Paket Premium (Best Value)',
          icon: Sparkles,
          containerClass: 'bg-emerald-50 border-emerald-300/80 text-emerald-950',
          badgeClass: 'bg-emerald-600 text-white',
          accentColor: '#2D6A4F',
          maxGuests: 'Maks. 250 Tamu',
          maxBank: '2 Rekening Amplop',
          features: ['Custom Musik Sendiri', 'Fitur QR & RSVP'],
        };
    }
  };

  const paidTemplates = purchasedTemplates.filter((t) => t.status === 'paid');
  const paidTemplatesCount = paidTemplates.length;

  return (
    <div
      className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="px-6 py-5 border-b border-stone-200 bg-gradient-to-r from-stone-50 via-white to-amber-50/30 flex items-start justify-between gap-4 sticky top-0 z-10">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500/20 to-emerald-500/20 border border-amber-300/60 flex items-center justify-center shrink-0 shadow-xs">
              <Layers className="w-5 h-5 text-emerald-800" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-stone-900 font-serif">
                  Koleksi Template Undangan Anda
                </h3>
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                  paidTemplatesCount > 0
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : 'bg-amber-100 text-amber-800 border-amber-300'
                }`}>
                  {paidTemplatesCount} Template Dimiliki (Lunas)
                </span>
              </div>
              <p className="text-xs text-stone-600 mt-0.5 line-clamp-1 sm:line-clamp-none">
                Pilih template undangan untuk langsung digunakan. Template yang telah lunas dapat langsung dibagikan dan diakses tamu.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-800 flex items-center justify-center transition-colors cursor-pointer shrink-0"
            title="Tutup dialog"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info Banner when user has multiple paid templates */}
        {paidTemplatesCount > 1 && (
          <div className="px-6 py-2.5 bg-emerald-50/90 border-b border-emerald-200/80 flex items-center gap-2 text-xs text-emerald-900 font-medium">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Anda memiliki <strong>{paidTemplatesCount} template yang telah lunas</strong>. Klik <strong>"Gunakan Template Ini"</strong> untuk mengaktifkan desain dan menyesuaikan kuota paket dashboard secara otomatis.
            </span>
          </div>
        )}

        {/* Scrollable Template Cards Grid */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {paidTemplates.length === 0 ? (
            <div className="py-14 text-center flex flex-col items-center justify-center px-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mb-4 shadow-xs">
                <Palette className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-stone-800">
                Belum Ada Template yang Aktif / Dibeli
              </h4>
              <p className="text-xs text-stone-500 max-w-md mt-2 leading-relaxed">
                Anda belum memiliki atau membeli template undangan. Silakan pilih paket dan selesaikan pembayaran untuk mengaktifkan template pilihan Anda.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    if (onOpenPayment) {
                      onOpenPayment();
                    } else if (onNavigatePricing) {
                      onNavigatePricing();
                    }
                  }}
                  className="px-5 py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-xl text-xs font-bold transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Pilih Paket &amp; Bayar Sekarang</span>
                </button>

                {onNavigateTemplates && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onNavigateTemplates();
                    }}
                    className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-bold transition cursor-pointer border border-stone-200"
                  >
                    Lihat Katalog Template
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {paidTemplates.map((item) => {
                const isPaid = item.status === 'paid';
                const isPending = item.status === 'pending';
                const isActive = isPaid && (item.isActive || normalizeTemplateId(item.templateId) === normalizedActiveId);
                const tierInfo = getTierBadgeInfo(item.tier);
                const TierIcon = tierInfo.icon;
                const isCurrentlySwitching = switchingId === item.templateId;

                return (
                  <div
                    key={item.templateId}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden flex flex-col ${
                      isActive
                        ? 'border-emerald-500 bg-emerald-50/20 ring-2 ring-emerald-500/20 shadow-md'
                        : isPending
                        ? 'border-amber-400 bg-amber-50/20 shadow-sm'
                        : !isPaid
                        ? 'border-stone-300 bg-stone-50/40 shadow-xs'
                        : 'border-stone-200 bg-white hover:border-emerald-300 hover:shadow-md'
                    }`}
                  >
                    {/* Thumbnail Image Section */}
                    <div className="relative aspect-[16/9] w-full bg-stone-100 overflow-hidden group">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.templateName}
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-stone-200 text-stone-400">
                          <Palette className="w-8 h-8" />
                        </div>
                      )}

                      {/* Top Overlay Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-stone-900/80 text-white backdrop-blur-md border border-white/20 shadow-sm uppercase tracking-wide">
                          {item.category || 'Wedding'}
                        </span>

                        {isActive ? (
                          <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-600 text-white shadow-md flex items-center gap-1.5 border border-emerald-400">
                            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                            Sedang Digunakan
                          </span>
                        ) : isPaid ? (
                          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/90 text-stone-800 shadow-sm backdrop-blur-md border border-stone-200 flex items-center gap-1">
                            <Check className="w-3 h-3 text-emerald-600" /> Tersedia (Lunas)
                          </span>
                        ) : isPending ? (
                          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-500 text-white shadow-md border border-amber-300 flex items-center gap-1">
                            <CreditCard className="w-3 h-3" /> Menunggu Pembayaran
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-rose-600 text-white shadow-md border border-rose-400 flex items-center gap-1">
                            Belum Lunas
                          </span>
                        )}
                      </div>

                      {/* Quick Preview Hover Button */}
                      <button
                        type="button"
                        onClick={() => onPreviewTemplate(item.templateId)}
                        className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-bold cursor-pointer backdrop-blur-[2px]"
                      >
                        <Eye className="w-4 h-4 text-[#D4AF37]" />
                        <span>Klik untuk Pratinjau Undangan</span>
                      </button>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Title & Badge */}
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-bold text-stone-900 font-serif leading-snug">
                            {item.templateName}
                          </h4>
                          {item.badge && (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 shrink-0">
                              {item.badge}
                            </span>
                          )}
                        </div>

                        {item.desc && (
                          <p className="text-xs text-stone-500 mt-1.5 line-clamp-2 leading-relaxed">
                            {item.desc}
                          </p>
                        )}

                        {/* Migration Target / Purchased Plan Details */}
                        <div className={`mt-3.5 p-3 rounded-xl border ${tierInfo.containerClass}`}>
                          <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-black/5">
                            <div className="flex items-center gap-1.5">
                              <TierIcon className="w-4 h-4" />
                              <span className="text-xs font-bold">
                                {item.planName || tierInfo.label}
                              </span>
                            </div>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase ${
                              isPaid 
                                ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                                : isPending
                                ? 'bg-amber-100 text-amber-800 border-amber-300'
                                : 'bg-stone-100 text-stone-700 border-stone-300'
                            }`}>
                              {isPaid ? 'Lunas / Terverifikasi' : isPending ? 'Menunggu Pembayaran' : 'Belum Memilih Paket'}
                            </span>
                          </div>

                          {/* Plan Capability Highlights */}
                          <div className="grid grid-cols-2 gap-2 text-[11px] font-medium text-stone-700">
                            <div className="flex items-center gap-1.5">
                              <Users className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                              <span>{tierInfo.maxGuests}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <CreditCard className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                              <span>{tierInfo.maxBank}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Music className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                              <span>{item.tier === 'silver' ? 'Audio Standar' : 'Musik Kustom Bebas'}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Download className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                              <span>{item.tier === 'gold' || item.tier === 'platinum' ? 'Export Data Tamu' : 'RSVP Real-time'}</span>
                            </div>
                          </div>

                          {item.orderId && (
                            <div className="mt-2 text-[10px] text-stone-500 pt-1 border-t border-black/5 flex items-center justify-between">
                              <span>ID Pesanan: #{item.orderId}</span>
                              {item.totalAmount ? (
                                <span className="font-semibold text-stone-700">
                                  Rp {item.totalAmount.toLocaleString('id-ID')}
                                </span>
                              ) : null}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Card Action Buttons */}
                      <div className="mt-4 pt-3 border-t border-stone-100 flex flex-col sm:flex-row gap-2">
                        {isActive ? (
                          <button
                            type="button"
                            disabled
                            className="flex-1 py-2.5 px-3.5 rounded-xl bg-emerald-50 text-emerald-800 font-bold text-xs flex items-center justify-center gap-1.5 border border-emerald-200 cursor-default shadow-xs"
                          >
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>Sedang Aktif di Dashboard</span>
                          </button>
                        ) : isPaid ? (
                          <button
                            type="button"
                            disabled={isCurrentlySwitching || isSwitching}
                            onClick={() => handleApply(item)}
                            className="flex-1 py-2.5 px-3.5 rounded-xl bg-[#2D6A4F] hover:bg-[#23533e] active:scale-[0.98] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm hover:shadow-md transition-all cursor-pointer disabled:opacity-50"
                          >
                            {isCurrentlySwitching ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Memigrasikan Dashboard...</span>
                              </>
                            ) : (
                              <>
                                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                                <span>Gunakan Template Ini</span>
                              </>
                            )}
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              onClose();
                              if (onOpenPayment) {
                                onOpenPayment(item.templateId);
                              } else if (onNavigatePricing) {
                                onNavigatePricing();
                              }
                            }}
                            className="flex-1 py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 active:scale-[0.98] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg transition-all cursor-pointer"
                          >
                            <CreditCard className="w-4 h-4" />
                            <span>{isPending ? 'Selesaikan Pembayaran Sekarang' : 'Pilih Paket & Bayar Sekarang'}</span>
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => onPreviewTemplate(item.templateId)}
                          className="sm:w-auto py-2.5 px-3.5 rounded-xl bg-stone-100 hover:bg-stone-200/90 text-stone-700 hover:text-stone-900 font-semibold text-xs flex items-center justify-center gap-1.5 border border-stone-200 transition-colors cursor-pointer"
                          title="Pratinjau tampilan template ini"
                        >
                          <Eye className="w-3.5 h-3.5 text-stone-600" />
                          <span>Pratinjau</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="px-6 py-4 border-t border-stone-200 bg-stone-50/90 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-600 sticky bottom-0">
          <div className="flex items-center gap-2 text-[11px] text-stone-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Semua data mempelai, jadwal acara &amp; foto galeri otomatis tersimpan aman di database saat berpindah template.
            </span>
          </div>

          {onNavigateTemplates && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onNavigateTemplates();
              }}
              className="text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1 shrink-0 cursor-pointer hover:underline"
            >
              <span>+ Beli / Tambah Desain Baru</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
