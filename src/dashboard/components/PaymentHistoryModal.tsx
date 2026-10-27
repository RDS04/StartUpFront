import React, { useState } from 'react';
import {
  X,
  Receipt,
  CheckCircle2,
  Clock,
  AlertTriangle,
  CreditCard,
  Copy,
  Check,
  Sparkles,
  Eye,
  ShieldCheck,
  Calendar,
  Loader2,
  Zap,
} from 'lucide-react';
import type { OrderItem } from '../../services/orderService';
import { payPendingOrder, markOrderPaid } from '../../services/orderService';
import {
  normalizeTemplateId,
  getTemplateById,
  inferTierFromPlanName,
  getTierDisplayName,
  getTierBadgeColor,
} from '../templateHelpers';

export interface PaymentHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: OrderItem[];
  activeTemplateId: string;
  onSelectTemplate: (
    templateId: string,
    tier: 'silver' | 'gold' | 'platinum' | 'premium',
    templateName: string,
    planName: string
  ) => void;
  onPreviewTemplate: (templateId: string) => void;
  onNavigateTemplates?: () => void;
  onNavigatePricing?: () => void;
  onCopyText?: (text: string, label?: string) => void;
  onPaymentSuccess?: (orderId: number, templateId: string) => void;
  isSwitching?: boolean;
}

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatTransactionDate(dateStr?: string): string {
  if (!dateStr) return '-';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    const day = String(d.getDate()).padStart(2, '0');
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${day} ${month} ${year}, ${hours}:${minutes} WIB`;
  } catch {
    return dateStr;
  }
}

export const PaymentHistoryModal: React.FC<PaymentHistoryModalProps> = ({
  isOpen,
  onClose,
  orders,
  activeTemplateId,
  onSelectTemplate,
  onPreviewTemplate,
  onNavigateTemplates,
  onNavigatePricing,
  onCopyText,
  onPaymentSuccess,
  isSwitching = false,
}) => {
  const [copiedInvoice, setCopiedInvoice] = useState<string | null>(null);
  const [payingOrderId, setPayingOrderId] = useState<number | null>(null);
  const [localOrdersState, setLocalOrdersState] = useState<OrderItem[]>(orders);

  React.useEffect(() => {
    setLocalOrdersState(orders);
  }, [orders]);

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    if (onCopyText) {
      onCopyText(text, 'Nomor invoice berhasil disalin!');
    } else {
      navigator.clipboard?.writeText(text);
    }
    setCopiedInvoice(id);
    setTimeout(() => setCopiedInvoice(null), 2500);
  };

  const handlePayNow = async (order: OrderItem, simulate = false) => {
    setPayingOrderId(order.id);
    try {
      if (simulate) {
        // Mode Simulasi Bayar Lunas (Testing/Sandbox)
        const res = await markOrderPaid(order.id, (order as any).midtrans_order_id, true);
        if (res.status) {
          setLocalOrdersState((prev) =>
            prev.map((o) => (o.id === order.id ? { ...o, status: 'paid' } : o))
          );
          if (onCopyText) {
            onCopyText('', 'Pembayaran berhasil dikonfirmasi lunas!');
          }
          if (onPaymentSuccess) {
            onPaymentSuccess(order.id, order.template_id || order.template_name);
          }
        } else {
          alert(res.message || 'Gagal memverifikasi pembayaran simulasi.');
        }
        setPayingOrderId(null);
        return;
      }

      // 1. Dapatkan Snap Token Midtrans untuk pending order ini
      const payRes = await payPendingOrder(order.id);
      const snapToken = payRes.snap_token || (order as any).snap_token;

      if (snapToken && typeof window !== 'undefined' && window.snap) {
        setPayingOrderId(null);
        window.snap.pay(snapToken, {
          onSuccess: async (result: any) => {
            setPayingOrderId(order.id);
            try {
              const verifyRes = await markOrderPaid(order.id, result?.order_id || payRes.order?.midtrans_order_id);
              if (verifyRes.status) {
                setLocalOrdersState((prev) =>
                  prev.map((o) => (o.id === order.id ? { ...o, status: 'paid' } : o))
                );
                if (onCopyText) {
                  onCopyText('', 'Pembayaran berhasil diverifikasi melalui Midtrans!');
                }
                if (onPaymentSuccess) {
                  onPaymentSuccess(order.id, order.template_id || order.template_name);
                }
              }
            } catch (err: any) {
              console.error('Verify error:', err);
            } finally {
              setPayingOrderId(null);
            }
          },
          onPending: () => {
            setPayingOrderId(null);
            if (onCopyText) {
              onCopyText('', 'Transaksi sedang menunggu pembayaran Anda di Midtrans.');
            }
          },
          onError: () => {
            setPayingOrderId(null);
            alert('Pembayaran Midtrans dibatalkan atau terjadi kesalahan.');
          },
          onClose: () => {
            setPayingOrderId(null);
          },
        });
      } else if (payRes.redirect_url) {
        window.location.href = payRes.redirect_url;
      } else {
        const confirmSimulate = window.confirm(
          'Portal Midtrans tidak merespons token. Apakah Anda ingin mengonfirmasi lunas via Sandbox Simulation?'
        );
        if (confirmSimulate) {
          await handlePayNow(order, true);
        } else {
          setPayingOrderId(null);
        }
      }
    } catch (err: any) {
      console.error('Payment error:', err);
      const confirmSimulate = window.confirm(
        `Gagal memulai pembayaran: ${err.message || 'Koneksi error'}.\n\nIngin konfirmasi lunas otomatis via Simulasi Sandbox?`
      );
      if (confirmSimulate) {
        await handlePayNow(order, true);
      } else {
        setPayingOrderId(null);
      }
    }
  };

  const normalizedActive = normalizeTemplateId(activeTemplateId);

  // Hitung ringkasan statistik pesanan
  const totalOrders = localOrdersState.length;
  const paidOrders = localOrdersState.filter((o) => o.status === 'paid');
  const pendingOrders = localOrdersState.filter((o) => o.status === 'pending');
  const totalSpent = paidOrders.reduce((sum, o) => sum + (Number(o.total_amount) || 0), 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/70 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200">
      <div id="payment-history-modal" className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100 bg-gradient-to-r from-stone-50 via-white to-amber-50/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 flex items-center justify-center font-bold shadow-xs">
              <Receipt className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900">
                  Riwayat Pembayaran
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  {totalOrders} Transaksi
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                Daftar invoice pembelian template undangan digital dan status pembayaran Anda
              </p>
            </div>
          </div>

          <button
            id="btn-close-payment-history"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-800 flex items-center justify-center transition cursor-pointer"
            title="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Stats Summary Bar */}
        <div className="px-6 py-3.5 bg-stone-50 border-b border-stone-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-white p-2.5 rounded-xl border border-stone-200/80 shadow-2xs">
            <p className="text-stone-400 font-medium text-[11px]">Total Transaksi</p>
            <p className="font-bold text-stone-900 text-sm mt-0.5">{totalOrders} Pesanan</p>
          </div>
          <div className="bg-white p-2.5 rounded-xl border border-stone-200/80 shadow-2xs">
            <p className="text-stone-400 font-medium text-[11px]">Lunas (Paid)</p>
            <p className="font-bold text-emerald-700 text-sm mt-0.5">{paidOrders.length} Berhasil</p>
          </div>
          <div className="bg-white p-2.5 rounded-xl border border-stone-200/80 shadow-2xs">
            <p className="text-stone-400 font-medium text-[11px]">Menunggu Bayar</p>
            <p className="font-bold text-amber-600 text-sm mt-0.5">{pendingOrders.length} Pending</p>
          </div>
          <div className="bg-white p-2.5 rounded-xl border border-stone-200/80 shadow-2xs">
            <p className="text-stone-400 font-medium text-[11px]">Total Pengeluaran</p>
            <p className="font-bold text-[#82694D] text-sm mt-0.5">{formatRupiah(totalSpent)}</p>
          </div>
        </div>

        {/* Content Body: Daftar Riwayat Pesanan */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {localOrdersState.length === 0 ? (
            /* Empty State */
            <div className="text-center py-12 px-4 max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-4 rounded-3xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-700">
                <Receipt className="w-8 h-8 text-amber-600" />
              </div>
              <h4 className="text-base font-bold text-stone-900 mb-1">
                Belum Ada Riwayat Pembayaran
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed mb-6">
                Anda belum melakukan pembelian template undangan. Pilih desain template dan paket harga untuk mulai membuat undangan pernikahan Anda.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {onNavigateTemplates && (
                  <button
                    onClick={() => {
                      onClose();
                      onNavigateTemplates();
                    }}
                    className="px-4 py-2.5 rounded-xl bg-[#82694D] hover:bg-[#6e5840] text-white text-xs font-bold transition shadow-sm cursor-pointer"
                  >
                    Pilih Desain Template
                  </button>
                )}
                {onNavigatePricing && (
                  <button
                    onClick={() => {
                      onClose();
                      onNavigatePricing();
                    }}
                    className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition cursor-pointer"
                  >
                    Lihat Pilihan Paket
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Order Cards List */
            localOrdersState.map((ord, idx) => {
              const rawTid = ord.template_id || ord.template_name;
              const normId = normalizeTemplateId(rawTid);
              const template = getTemplateById(normId);
              const tier = inferTierFromPlanName(ord.plan_name);
              const isCurrentActive = normId === normalizedActive;
              const isPaid = ord.status === 'paid';
              const isPending = ord.status === 'pending';

              const invoiceNum = (ord as any).midtrans_order_id || (ord as any).invoice_number || `INV-${new Date(ord.created_at || Date.now()).getFullYear()}${String(ord.id).padStart(4, '0')}`;

              return (
                <div
                  key={ord.id || idx}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isCurrentActive
                      ? 'border-emerald-400/80 bg-emerald-50/20 shadow-sm'
                      : 'border-stone-200/90 bg-white hover:border-stone-300 shadow-2xs'
                  }`}
                >
                  <div className="p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    {/* Left: Template Thumbnail & Information */}
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border border-stone-200 shadow-xs shrink-0 group">
                        <img
                          src={template.image}
                          alt={template.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded-md bg-stone-900/80 text-[9px] font-extrabold text-amber-300 backdrop-blur-xs">
                          {template.shortName}
                        </div>
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="font-serif font-bold text-sm sm:text-base text-stone-900 truncate">
                            {template.name}
                          </span>
                          {isCurrentActive && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                              <Sparkles className="w-3 h-3 text-emerald-700" />
                              Sedang Digunakan
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-stone-500 mb-2 truncate">
                          {template.category} • {template.desc}
                        </p>

                        {/* Invoice & Date Badges */}
                        <div className="flex flex-wrap items-center gap-2 text-[11px] text-stone-500">
                          <button
                            type="button"
                            onClick={() => handleCopy(invoiceNum, String(ord.id))}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-700 font-mono font-semibold transition cursor-pointer"
                            title="Klik untuk salin no invoice"
                          >
                            <span>{invoiceNum}</span>
                            {copiedInvoice === String(ord.id) ? (
                              <Check className="w-3 h-3 text-emerald-600" />
                            ) : (
                              <Copy className="w-3 h-3 text-stone-400" />
                            )}
                          </button>

                          <span>•</span>

                          <span className="inline-flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-stone-400" />
                            {formatTransactionDate(ord.created_at)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Middle: Paket & Price Information */}
                    <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-stone-100 gap-1.5 shrink-0">
                      <div className="text-left md:text-right">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${getTierBadgeColor(tier)}`}>
                          <ShieldCheck className="w-3.5 h-3.5" />
                          {ord.plan_name || getTierDisplayName(tier)}
                        </span>
                        <div className="mt-1">
                          <span className="text-base sm:text-lg font-black text-stone-900 tracking-tight">
                            {formatRupiah(ord.total_amount || ord.plan_price || 0)}
                          </span>
                        </div>
                        <p className="text-[10px] text-stone-400">
                          Metode: <strong className="text-stone-600 uppercase">{ord.payment_method || 'QRIS'}</strong>
                        </p>
                      </div>

                      {/* Status Pembayaran Badge */}
                      <div className="mt-1">
                        {isPaid ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Lunas (Paid)</span>
                          </span>
                        ) : isPending ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-300 animate-pulse">
                            <Clock className="w-3.5 h-3.5 text-amber-600" />
                            <span>Menunggu Bayar</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-300">
                            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                            <span className="uppercase">{ord.status}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Footer for Card */}
                  <div className="px-4 sm:px-5 py-3 bg-stone-50/80 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2.5">
                    <p className="text-[11px] text-stone-500">
                      {isPaid
                        ? '✓ Paket & template telah terverifikasi lunas dan siap aktif digunakan di dashboard.'
                        : 'Selesaikan pembayaran sebelum batas waktu agar template dan fitur paket langsung aktif.'}
                    </p>

                    <div className="flex items-center gap-2 ml-auto">
                      {/* Tombol Pratinjau Desain */}
                      <button
                        type="button"
                        onClick={() => {
                          onPreviewTemplate(normId);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-stone-100 border border-stone-200 text-stone-700 text-xs font-bold transition cursor-pointer shadow-2xs"
                      >
                        <Eye className="w-3.5 h-3.5 text-stone-500" />
                        <span>Pratinjau</span>
                      </button>

                      {/* Tombol Gunakan Template / Status */}
                      {isPaid && (
                        isCurrentActive ? (
                          <button
                            disabled
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-100/90 text-emerald-800 text-xs font-bold border border-emerald-300/80 cursor-default"
                          >
                            <Check className="w-3.5 h-3.5 text-emerald-700" />
                            <span>Aktif</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            disabled={isSwitching}
                            onClick={() => {
                              onSelectTemplate(normId, tier, template.name, ord.plan_name || getTierDisplayName(tier));
                            }}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition shadow-xs cursor-pointer disabled:opacity-50"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                            <span>Gunakan Template Ini</span>
                          </button>
                        )
                      )}

                      {isPending && (
                        <div className="flex items-center gap-2">
                          <button
                            id={`btn-pay-pending-${ord.id}`}
                            type="button"
                            disabled={payingOrderId === ord.id}
                            onClick={() => handlePayNow(ord, false)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition shadow-xs cursor-pointer disabled:opacity-50"
                            title="Bayar tagihan melalui Midtrans (QRIS, VA, E-Wallet, Kartu)"
                          >
                            {payingOrderId === ord.id ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <CreditCard className="w-3.5 h-3.5" />
                            )}
                            <span>Bayar Sekarang</span>
                          </button>

                          <button
                            id={`btn-simulate-pending-${ord.id}`}
                            type="button"
                            disabled={payingOrderId === ord.id}
                            onClick={() => handlePayNow(ord, true)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 text-[11px] font-bold transition cursor-pointer disabled:opacity-50"
                            title="Konfirmasi Lunas Langsung (Testing / Sandbox Simulation)"
                          >
                            <Zap className="w-3 h-3 text-emerald-600" />
                            <span>Simulasi Lunas</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-stone-100 bg-stone-50 flex items-center justify-between text-xs text-stone-500">
          <p className="hidden sm:block">
            Semua transaksi terintegrasi dengan Payment Gateway Midtrans & diverifikasi instan secara otomatis.
          </p>
          <div className="flex items-center gap-2 ml-auto">
            {onNavigateTemplates && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigateTemplates();
                }}
                className="text-stone-700 hover:text-stone-900 font-bold hover:underline cursor-pointer mr-3"
              >
                + Beli Template Lain
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold transition cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistoryModal;
