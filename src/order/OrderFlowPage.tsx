import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  Check, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  Eye, 
  CheckCircle2, 
  Tag, 
  Heart, 
  ChevronRight, 
  Home,
  AlertCircle,
  Clock
} from 'lucide-react';
import { createOrder, markOrderPaid } from '../services/orderService';
import { getPricingPlans } from '../services/pricingService';
import type { AuthUser } from '../services/authService';
import { BotanicalLeaves } from '../landingPage/DecorativeBackground';
import { triggerLoading } from '../components/common/LottieLoader';

declare global {
  interface Window {
    snap?: {
      pay: (
        token: string,
        callbacks: {
          onSuccess?: (result: any) => void;
          onPending?: (result: any) => void;
          onError?: (result: any) => void;
          onClose?: () => void;
        }
      ) => void;
      embed?: (token: string, options: any) => void;
    };
  }
}

export interface PlanOption {
  id: 'silver' | 'gold' | 'platinum';
  name: string;
  badge: string;
  price: number;
  originalPrice: number;
  subtitle: string;
  isPopular?: boolean;
  features: string[];
}

export interface TemplateOption {
  id: string;
  name: string;
  category: string;
  tag: string;
  previewRoute: 'template-satu' | 'template-dua' | 'card-atm';
  image: string;
  desc: string;
  badgeText: string;
}

export const PLANS: PlanOption[] = [
  {
    id: 'silver',
    name: 'Paket Silver',
    badge: 'Paling Hemat',
    price: 49000,
    originalPrice: 99000,
    subtitle: 'Hemat untuk Acara Intim & Sederhana',
    features: [
      'Masa Aktif 6 Bulan',
      '1 Sesi Acara (Akad atau Resepsi)',
      'Maksimal 5 Foto Galeri',
      'Background Musik Pilihan Tema',
      'Navigasi Google Maps Presisi',
      'Amplop Digital 1 No. Rekening',
      'Sebar Tamu Tanpa Batas (Unlimited)',
    ],
  },
  {
    id: 'gold',
    name: 'Paket Gold',
    badge: 'BEST SELLER 🔥',
    isPopular: true,
    price: 89000,
    originalPrice: 179000,
    subtitle: 'Fitur Lengkap Pilihan Favorit 90% Pengantin',
    features: [
      'Masa Aktif SELAMANYA (Lifetime)',
      'Multi Acara (Akad, Resepsi, Syukuran)',
      'Galeri 15 Foto HD + 1 Video YouTube',
      'Bebas Upload Musik MP3 Sendiri',
      'Amplop Digital Multi Rekening & QRIS',
      'RSVP Realtime + WhatsApp Notifikasi',
      'Generator Nama Tamu Otomatis',
      'Bebas Revisi Data Kapan Saja',
    ],
  },
  {
    id: 'platinum',
    name: 'Paket Platinum VIP',
    badge: 'Full VIP & Domain',
    price: 149000,
    originalPrice: 299000,
    subtitle: 'Eksklusif Custom Domain & Siap Terima Beres',
    features: [
      'Semua Fitur di Paket Gold',
      'Custom Domain Pribadi (.com)',
      'Input Data Dibantu Tim Desainer (Terima Beres)',
      'Fitur Cerita Cinta (Love Story Timeline)',
      'Integrasi Live Streaming YouTube / Zoom',
      'QR Code Presensi Meja Resepsi',
      'Prioritas Bantuan Teknis 24 Jam Nonstop',
    ],
  },
];

export const TEMPLATES: TemplateOption[] = [
  {
    id: 'rustic-blossom',
    name: 'Rustic Blossom (Template 1)',
    category: 'Elegan & Mewah',
    tag: 'Burgundy & Gold',
    previewRoute: 'template-satu',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
    desc: 'Desain anggun dengan ornamen botani berkelas, perpaduan warna burgundy mewah dan sentuhan emas.',
    badgeText: 'FAVORIT',
  },
  {
    id: 'dusty-rose',
    name: 'Dusty Rose Lily (Template 2)',
    category: 'Romantis & Manis',
    tag: 'Soft Pastel Floral',
    previewRoute: 'template-dua',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80',
    desc: 'Nuansa bunga lily merah muda dan sentuhan modern minimalis yang memancarkan kehangatan cinta.',
    badgeText: 'ROMANTIS',
  },
  {
    id: 'card-atm',
    name: 'Royal ATM Card Invitation',
    category: 'Modern & Eksklusif',
    tag: '3D ATM Card & Amplop',
    previewRoute: 'card-atm',
    image: 'https://images.unsplash.com/photo-1589758438368-0ad531db3366?auto=format&fit=crop&w=600&q=80',
    desc: 'Konsep kartu ATM pernikahan dengan efek 3D fisik dan amplop dompet virtual berkelas tinggi.',
    badgeText: 'PREMIUM',
  },
];

export interface OrderFlowPageProps {
  currentUser: AuthUser | null;
  activeStep?: 1 | 2 | 3;
  onStepChange?: (step: 1 | 2 | 3) => void;
  onChangePlan?: () => void;
  onChangeTemplate?: () => void;
  onBackToHome: () => void;
  onPreviewTemplate: (route: 'template-satu' | 'template-dua' | 'card-atm') => void;
  selectedPlan?: PlanOption;
  onSelectPlan?: (plan: PlanOption) => void;
  selectedTemplate?: TemplateOption;
  onSelectTemplate?: (template: TemplateOption) => void;
}

export const OrderFlowPage: React.FC<OrderFlowPageProps> = ({
  currentUser,
  activeStep,
  onStepChange,
  onChangePlan,
  onChangeTemplate,
  onBackToHome,
  onPreviewTemplate,
  selectedPlan: propSelectedPlan,
  onSelectPlan: onPropSelectPlan,
  selectedTemplate: propSelectedTemplate,
  onSelectTemplate: onPropSelectTemplate,
}) => {
  // Wizard step: 3 = Rincian Biaya & Pembayaran (Paket & Template dipilih di Landing Page)
  const [internalStep, setInternalStep] = useState<1 | 2 | 3>(activeStep || 3);

  useEffect(() => {
    if (activeStep && activeStep !== internalStep) {
      setInternalStep(activeStep);
    }
  }, [activeStep, internalStep]);

  const step = activeStep || internalStep;

  const handleChangePlan = () => {
    if (onChangePlan) {
      onChangePlan();
    } else {
      window.location.hash = '#harga';
      onBackToHome();
      setTimeout(() => {
        const el = document.getElementById('harga');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleChangeTemplate = () => {
    if (onChangeTemplate) {
      onChangeTemplate();
    } else {
      window.location.hash = '#template';
      onBackToHome();
      setTimeout(() => {
        const el = document.getElementById('template');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  // Jika step 1 atau 2 diakses, arahkan ke landing page section yang sesuai (1: Template, 2: Paket Harga)
  useEffect(() => {
    if (step === 1) {
      handleChangeTemplate();
    } else if (step === 2) {
      handleChangePlan();
    }
  }, [step]);

  const goToStep = (newStep: 1 | 2 | 3) => {
    if (newStep === 1) {
      handleChangeTemplate();
      return;
    }
    if (newStep === 2) {
      handleChangePlan();
      return;
    }
    setInternalStep(newStep);
    if (onStepChange) {
      onStepChange(newStep);
    }
  };
  void goToStep;

  // Selections with sessionStorage persistence
  const [localPlan, setLocalPlan] = useState<PlanOption>(() => {
    try {
      const saved = sessionStorage.getItem('ij_selected_plan');
      if (saved) return JSON.parse(saved);
    } catch {}
    return PLANS[1]; // Default Gold
  });

  // Sync selected plan price & features with backend Master changes
  useEffect(() => {
    getPricingPlans().then((serverPlans) => {
      if (!serverPlans || serverPlans.length === 0) return;
      const matched = serverPlans.find((sp) => sp.id === localPlan.id);
      if (matched && (matched.price !== localPlan.price || matched.name !== localPlan.name)) {
        setLocalPlan((prev) => ({
          ...prev,
          name: matched.name,
          price: matched.price,
          originalPrice: matched.originalPrice || prev.originalPrice,
          badge: matched.badge || prev.badge,
          features: matched.features && matched.features.length > 0 ? matched.features : prev.features,
        }));
      }
    });
  }, [localPlan.id]);

  const [localTemplate, setLocalTemplate] = useState<TemplateOption>(() => {
    try {
      const saved = sessionStorage.getItem('ij_selected_template');
      if (saved) return JSON.parse(saved);
    } catch {}
    return TEMPLATES[0]; // Default Rustic
  });

  const selectedPlan = propSelectedPlan || localPlan;
  const setSelectedPlan = (plan: PlanOption) => {
    setLocalPlan(plan);
    try {
      sessionStorage.setItem('ij_selected_plan', JSON.stringify(plan));
    } catch {}
    if (onPropSelectPlan) onPropSelectPlan(plan);
  };
  void setSelectedPlan;

  const selectedTemplate = propSelectedTemplate || localTemplate;
  const setSelectedTemplate = (tmpl: TemplateOption) => {
    setLocalTemplate(tmpl);
    try {
      sessionStorage.setItem('ij_selected_template', JSON.stringify(tmpl));
    } catch {}
    if (onPropSelectTemplate) onPropSelectTemplate(tmpl);
  };
  void setSelectedTemplate;

  // Order Details Form
  const [coupleNames, setCoupleNames] = useState('Andi & Rosna');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || '081234567890');
  const [promoCode, setPromoCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  // Payment Method & Status
  const [paymentMethod] = useState<'midtrans' | 'qris' | 'bca_va' | 'mandiri_va' | 'gopay'>('midtrans');
  const [paymentNotice, setPaymentNotice] = useState<{ type: 'pending' | 'error' | 'info'; message: string } | null>(null);

  // Load Midtrans Snap JS Script Dinamis jika belum ada
  useEffect(() => {
    const clientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY || 'Mid-client-tgqp2N9YL_Uneu70';
    const scriptId = 'midtrans-snap-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
      script.setAttribute('data-client-key', clientKey);
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Deteksi Callback Redirect dari Midtrans jika user kembali dari payment gateway
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const orderIdParam = urlParams.get('order_id');
    const finishParam = urlParams.get('payment_finish');
    const statusCode = urlParams.get('status_code');
    const txStatus = urlParams.get('transaction_status');

    if (finishParam || (orderIdParam && (statusCode === '200' || statusCode === '201' || txStatus === 'settlement' || txStatus === 'capture' || txStatus === 'pending'))) {
      let targetOrderId: number | null = null;
      if (orderIdParam) {
        if (orderIdParam.includes('INV-')) {
          const matches = orderIdParam.match(/INV-\d+-(\d+)-\d+/);
          if (matches && matches[1]) {
            targetOrderId = Number(matches[1]);
          }
        } else if (!isNaN(Number(orderIdParam))) {
          targetOrderId = Number(orderIdParam);
        }
      }

      if (targetOrderId) {
        markOrderPaid(targetOrderId).catch(err => console.error(err));
      }

      const invoiceCode = orderIdParam ? (orderIdParam.startsWith('INV-') ? orderIdParam : `INV-${orderIdParam}`) : `INV-${Date.now()}`;
      setCreatedOrderNumber(invoiceCode);
      setIsSuccessModalOpen(true);
      triggerConfetti();

      // Pastikan state transaksi dibersihkan karena pesanan telah dibayar
      try {
        sessionStorage.removeItem('ij_transaction_active');
        sessionStorage.removeItem('ij_selected_plan');
        sessionStorage.removeItem('ij_selected_template');
        sessionStorage.setItem('ij_order_paid', 'true');
        window.dispatchEvent(new Event('storage'));
        window.dispatchEvent(new CustomEvent('ij_order_state_change', { detail: { isPaid: true } }));
      } catch {}

      // Bersihkan search params agar URL kembali bersih
      try {
        const cleanUrl = window.location.pathname + window.location.hash;
        window.history.replaceState({}, document.title, cleanUrl);
      } catch {}
    }
  }, []);

  // Payment Order State
  const [activeCreatedOrderId, setActiveCreatedOrderId] = useState<number | null>(null);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [createdOrderNumber, setCreatedOrderNumber] = useState('');

  const adminFee = 1000;
  const uniqueCode = 245;
  const totalAmount = Math.max(0, selectedPlan.price + adminFee + uniqueCode - discountAmount);

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (!promoCode.trim()) return;

    if (promoCode.trim().toUpperCase() === 'ISAYYES' || promoCode.trim().toUpperCase() === 'YESIKRAB') {
      setDiscountAmount(15000);
      setPromoApplied(true);
    } else {
      setPromoError('Kode promo tidak valid atau telah berakhir.');
      setDiscountAmount(0);
      setPromoApplied(false);
    }
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#165b39', '#d4a359', '#10462b', '#edd087', '#22c55e'],
      });
    } catch {
      // silent
    }
  };

  const handleMarkPaymentSuccess = async (orderId?: number | null) => {
    triggerLoading(true, 'Memverifikasi Pembayaran...', 'Mengonfirmasi status transaksi & mengaktifkan pesanan...');
    const targetId = orderId || activeCreatedOrderId;
    if (targetId) {
      try {
        await markOrderPaid(targetId);
      } catch (err) {
        console.error('Mark paid err:', err);
      }
    }
    triggerLoading(false);
    setIsSuccessModalOpen(true);
    triggerConfetti();
    try {
      sessionStorage.removeItem('ij_transaction_active');
      sessionStorage.removeItem('ij_selected_plan');
      sessionStorage.removeItem('ij_selected_template');
      sessionStorage.setItem('ij_order_paid', 'true');
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new CustomEvent('ij_order_state_change', { detail: { isPaid: true } }));
    } catch {}
  };

  const handleConfirmPayment = async () => {
    setIsSubmitting(true);
    setPaymentNotice(null);
    triggerLoading(true, 'Menyiapkan Pembayaran...', 'Menghubungkan ke gerbang pembayaran Midtrans QRIS...');

    try {
      const res = await createOrder({
        plan_name: selectedPlan.name,
        template_id: selectedTemplate.id,
        template_name: selectedTemplate.name,
        plan_price: selectedPlan.price,
        admin_fee: adminFee,
        discount: discountAmount,
        unique_code: uniqueCode,
        total_amount: totalAmount,
        payment_method: paymentMethod,
        customer_name: currentUser?.name || 'Pelanggan',
        customer_email: currentUser?.email,
        customer_phone: customerPhone,
        couple_names: coupleNames,
      });

      const orderId = res.order?.id || null;
      const invCode = `INV-${orderId || Math.floor(100000 + Math.random() * 900000)}`;
      setCreatedOrderNumber(invCode);
      setActiveCreatedOrderId(orderId);

      // LANGSUNG MEMUNCULKAN POPUP RESMI MIDTRANS SNAP
      if (res.snap_token && typeof window !== 'undefined' && window.snap) {
        triggerLoading(false);
        window.snap.pay(res.snap_token, {
          onSuccess: async () => {
            await handleMarkPaymentSuccess(orderId);
          },
          onPending: () => {
            triggerLoading(false);
            setPaymentNotice({
              type: 'pending',
              message: 'Transaksi sedang menunggu penyelesaian pembayaran di Midtrans.'
            });
          },
          onError: () => {
            triggerLoading(false);
            setPaymentNotice({
              type: 'error',
              message: 'Pembayaran Midtrans dibatalkan atau terjadi kesalahan.'
            });
          },
          onClose: () => {
            triggerLoading(false);
            setPaymentNotice({
              type: 'info',
              message: 'Jendela pembayaran Midtrans ditutup. Silakan tekan tombol "Bayar Sekarang" kembali jika ingin melanjutkan.'
            });
          }
        });
      } else if (res.redirect_url) {
        triggerLoading(true, 'Mengalihkan ke Pembayaran...', 'Membuka portal pembayaran Midtrans...');
        window.location.href = res.redirect_url;
      } else {
        triggerLoading(false);
        alert('Gagal mendapatkan token pembayaran Midtrans. Silakan periksa koneksi atau coba beberapa saat lagi.');
      }
    } catch (err: any) {
      triggerLoading(false);
      alert(err.message || 'Gagal memproses pembayaran. Silakan coba kembali.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ebf5ee] via-[#f5fbf7] to-[#e4f1e9] text-slate-800 pt-5 pb-24 px-3 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Outer Luxury Curved Frame (Sesuai Gambar) */}
      <div className="absolute inset-2 sm:inset-4 border-2 border-emerald-600/20 rounded-[32px] sm:rounded-[44px] pointer-events-none z-0" />

      {/* Signature Botanical Leaves Corner from Main Theme */}
      <BotanicalLeaves.TopRight />
      <BotanicalLeaves.BottomLeft />

      {/* Background Ambient Glows */}
      <div className="absolute -top-24 left-1/4 w-[600px] h-[600px] bg-emerald-400/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-6 w-[500px] h-[500px] bg-amber-300/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Navigation Bar with Glass Pills */}
      <div className="max-w-6xl mx-auto flex items-center justify-between mb-8 pb-4 relative z-10">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/80 hover:bg-white border border-white/95 text-xs font-bold text-slate-700 hover:text-emerald-900 shadow-sm backdrop-blur-xl transition-all cursor-pointer group"
        >
          <Home className="w-4 h-4 text-emerald-700 group-hover:-translate-x-0.5 transition-transform" />
          <span>Kembali ke Beranda</span>
        </button>

        {/* Badge Persis Gambar: Verifikasi 100% Otomatis */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/85 backdrop-blur-xl border border-white/95 shadow-[0_4px_20px_rgba(16,185,129,0.12)] text-xs font-black text-emerald-950">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 ring-4 ring-emerald-400/25 animate-pulse" />
          <span>Verifikasi 100% Otomatis</span>
        </div>
      </div>

      {/* Stepper Header Bar */}
      <div className="max-w-3xl mx-auto mb-8 text-center relative z-10">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-emerald-950 tracking-tight mb-2">
          {step === 3 ? 'Langkah Terakhir: Rincian Biaya & Pembayaran' : 'Pemesanan Undangan Digital'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
          Periksa rincian pesanan dan selesaikan transaksi dengan aman melalui sistem pembayaran instan.
        </p>

        {/* Stepper Capsule Persis Sesuai Gambar Referensi (Step 1: Desain Template -> Step 2: Paket Harga -> Step 3: Pembayaran) */}
        <div className="flex items-center justify-center gap-3 sm:gap-5 mt-6 max-w-xl mx-auto px-5 py-2.5 rounded-full bg-[#072418]/90 border border-emerald-500/40 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.18)]">
          {/* STEP 1: DESAIN TEMPLATE (HIJAU CENTANG DENGAN TEKS 2 BARIS) */}
          <div 
            onClick={handleChangeTemplate}
            className="flex items-center gap-2 cursor-pointer group"
            title="Klik untuk ubah pilihan Desain Template di Landing Page"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#00c078] flex items-center justify-center text-white shadow-md shadow-emerald-950/30 group-hover:scale-110 transition-transform shrink-0">
              <Check className="w-4 h-4 stroke-[3]" />
            </div>
            <div className="text-[11px] sm:text-xs font-bold text-[#00d68f] leading-tight text-left">
              <div>Desain</div>
              <div>Template</div>
            </div>
          </div>

          {/* CONNECTOR LINE 1 */}
          <div className="h-[2px] w-8 sm:w-14 bg-[#00d68f] rounded-full shrink-0" />

          {/* STEP 2: PAKET HARGA (HIJAU CENTANG DENGAN TEKS 2 BARIS) */}
          <div 
            onClick={handleChangePlan}
            className="flex items-center gap-2 cursor-pointer group"
            title="Klik untuk ubah pilihan Paket Harga di Landing Page"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#00c078] flex items-center justify-center text-white shadow-md shadow-emerald-950/30 group-hover:scale-110 transition-transform shrink-0">
              <Check className="w-4 h-4 stroke-[3]" />
            </div>
            <div className="text-[11px] sm:text-xs font-bold text-[#00d68f] leading-tight text-left">
              <div>Paket</div>
              <div>Harga</div>
            </div>
          </div>

          {/* CONNECTOR LINE 2 */}
          <div className="h-[2px] w-8 sm:w-14 bg-[#00d68f] rounded-full shrink-0" />

          {/* STEP 3: PEMBAYARAN (AKTIF AMBER ANGKA 3 DENGAN HALO RING) */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#ffb800] ring-4 ring-amber-400/25 flex items-center justify-center text-slate-950 font-black text-xs sm:text-sm shadow-md shadow-amber-950/30">
              3
            </div>
            <div className="text-[11px] sm:text-xs font-bold text-[#ffb800] leading-tight text-left">
              <div>Pembayaran</div>
            </div>
          </div>
        </div>
      </div>

      {/* STEP 1: JIKA TERBUKA, REDIRECT KE LANDING PAGE SECTION #TEMPLATE */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto text-center py-16 bg-white/80 rounded-3xl border border-white/95 p-8 relative z-10 shadow-2xl backdrop-blur-2xl"
        >
          <div className="w-12 h-12 rounded-full border-4 border-amber-500 border-t-transparent animate-spin mx-auto mb-4" />
          <h3 className="text-lg font-black text-emerald-950 mb-2">Mengarahkan ke Pilihan Desain Template...</h3>
          <p className="text-xs text-slate-600 mb-6">Pilihan desain template tersedia interaktif pada beranda landing page kami.</p>
          <button
            onClick={handleChangeTemplate}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:brightness-105 text-slate-950 text-xs font-black cursor-pointer shadow-lg inline-flex items-center gap-2"
          >
            <span>Buka Pilihan Desain di Beranda</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}

      {/* STEP 2: JIKA TERBUKA, REDIRECT KE LANDING PAGE SECTION #HARGA */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto text-center py-16 bg-white/80 rounded-3xl border border-white/95 p-8 relative z-10 shadow-2xl backdrop-blur-2xl"
        >
          <div className="w-12 h-12 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin mx-auto mb-4" />
          <h3 className="text-lg font-black text-emerald-950 mb-2">Mengarahkan ke Pilihan Paket Harga...</h3>
          <p className="text-xs text-slate-600 mb-6">Pilihan paket harga tersedia lengkap pada beranda landing page kami.</p>
          <button
            onClick={handleChangePlan}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:brightness-105 text-white text-xs font-black cursor-pointer shadow-lg inline-flex items-center gap-2"
          >
            <span>Buka Pilihan Paket di Beranda</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}

      {/* STEP 3: RINCIAN BIAYA & PEMBAYARAN DENGAN 3D GLASSMOCKUP & FROSTED GLASS CARDS */}
      {step === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.35 }}
          className="max-w-6xl mx-auto relative z-10 space-y-10"
        >
          {/* ========================================================================= */}
          {/* GRID FORMULIR PEMBAYARAN & RINCIAN BIAYA TRANSAKSI (FROSTED GLASS THEME) */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Detail Pesanan & Pembayaran (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Frosted Glass Card 1: Data Calon Pengantin & Kontak */}
              <div className="bg-white/80 backdrop-blur-2xl border-2 border-white/90 rounded-3xl p-6 sm:p-7 shadow-[0_16px_40px_rgba(16,185,129,0.08)] relative overflow-hidden">
                <h3 className="text-base font-black text-emerald-950 mb-4 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shadow-xs">
                    <Heart className="w-4 h-4 fill-rose-500/20" />
                  </div>
                  <span>Data Pasangan &amp; Kontak WhatsApp</span>
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Nama Kedua Calon Pengantin (Contoh: Andi &amp; Rosna)
                    </label>
                    <input
                      type="text"
                      value={coupleNames}
                      onChange={(e) => setCoupleNames(e.target.value)}
                      placeholder="Contoh: Rian & Nabila"
                      className="w-full px-4 py-3 rounded-2xl bg-white/90 border border-emerald-200/90 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/15 text-slate-900 placeholder-slate-400 text-xs sm:text-sm font-medium transition-all shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Nomor WhatsApp Aktif (Untuk Pengiriman Link &amp; Notifikasi)
                    </label>
                    <input
                      type="text"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="Contoh: 081234567890"
                      className="w-full px-4 py-3 rounded-2xl bg-white/90 border border-emerald-200/90 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/15 text-slate-900 placeholder-slate-400 text-xs sm:text-sm font-medium transition-all shadow-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Notice Banner jika ada status pending / notice dari Midtrans */}
              <AnimatePresence>
                {paymentNotice && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                    className={`p-4 rounded-2xl border backdrop-blur-xl flex items-start gap-3 shadow-lg ${
                      paymentNotice.type === 'error'
                        ? 'bg-rose-50/90 border-rose-300 text-rose-900 shadow-rose-500/10'
                        : paymentNotice.type === 'pending'
                        ? 'bg-amber-50/90 border-amber-300 text-amber-900 shadow-amber-500/10'
                        : 'bg-emerald-50/90 border-emerald-300 text-emerald-900 shadow-emerald-500/10'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {paymentNotice.type === 'error' ? (
                        <AlertCircle className="w-5 h-5 text-rose-600" />
                      ) : paymentNotice.type === 'pending' ? (
                        <Clock className="w-5 h-5 text-amber-600 animate-pulse" />
                      ) : (
                        <ShieldCheck className="w-5 h-5 text-emerald-600" />
                      )}
                    </div>
                    <div className="flex-1 text-xs sm:text-sm">
                      <div className="font-extrabold mb-0.5">
                        {paymentNotice.type === 'error'
                          ? 'Perhatian Transaksi'
                          : paymentNotice.type === 'pending'
                          ? 'Menunggu Pembayaran'
                          : 'Informasi Transaksi'}
                      </div>
                      <div className="leading-relaxed font-medium">{paymentNotice.message}</div>
                    </div>
                    <button
                      onClick={() => setPaymentNotice(null)}
                      className="text-slate-400 hover:text-slate-700 text-xs font-bold px-2 py-1 cursor-pointer"
                    >
                      ✕
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>



            </div>

            {/* Right Column: Ringkasan Rincian Biaya (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white/85 backdrop-blur-2xl border-2 border-white/95 rounded-3xl p-6 sm:p-7 shadow-[0_20px_50px_rgba(16,185,129,0.12)] sticky top-6 text-slate-800">
                
                {/* Top Accent Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-5">
                  <h3 className="text-base font-black text-emerald-950 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Rincian Biaya Transaksi</span>
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Sesi Aman
                  </span>
                </div>

                {/* Selected Package & Template Overview */}
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/60 space-y-3 mb-5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600">Paket Layanan:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-emerald-900">{selectedPlan.name}</span>
                      <button
                        type="button"
                        onClick={handleChangePlan}
                        className="text-[11px] text-amber-700 hover:text-amber-900 underline cursor-pointer font-bold"
                      >
                        Ubah
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600">Desain Template:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-emerald-900">{selectedTemplate.name}</span>
                      <button
                        type="button"
                        onClick={handleChangeTemplate}
                        className="text-[11px] text-amber-700 hover:text-amber-900 underline cursor-pointer font-bold"
                      >
                        Ubah
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-emerald-200/60">
                    <span className="text-slate-600">Akun Pengguna:</span>
                    <span className="font-semibold text-slate-800">{currentUser?.name || currentUser?.email || 'User'}</span>
                  </div>
                </div>

                {/* Pricing Breakdown */}
                <div className="space-y-3 text-xs mb-6">
                  <div className="flex justify-between text-slate-600">
                    <span>Harga Paket:</span>
                    <span className="font-bold text-slate-900">{formatRupiah(selectedPlan.price)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Biaya Layanan Sistem:</span>
                    <span className="font-bold text-slate-900">{formatRupiah(adminFee)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Kode Unik Transaksi:</span>
                    <span className="font-bold text-emerald-700">+{formatRupiah(uniqueCode)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-800 font-bold bg-emerald-100 p-2.5 rounded-xl border border-emerald-200">
                      <span>Potongan Diskon Promo:</span>
                      <span>-{formatRupiah(discountAmount)}</span>
                    </div>
                  )}
                  
                  <div className="pt-4 border-t border-slate-200 flex justify-between items-baseline">
                    <span className="text-sm font-black text-slate-900">Total Tagihan:</span>
                    <span className="text-2xl sm:text-3xl font-black text-[#134e35]">
                      {formatRupiah(totalAmount)}
                    </span>
                  </div>
                </div>

                {/* Promo Code Input */}
                <form onSubmit={handleApplyPromo} className="mb-6">
                  <label className="block text-[11px] font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-amber-600" />
                    <span>Punya Kode Promo / Kupon? (Coba: ISAYYES)</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="MASUKKAN KODE PROMO"
                      disabled={promoApplied}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-emerald-200 text-xs text-slate-900 placeholder-slate-400 uppercase font-semibold focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    />
                    <button
                      type="submit"
                      disabled={promoApplied}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 text-xs font-black cursor-pointer shadow-sm active:scale-95 transition-all disabled:opacity-50"
                    >
                      {promoApplied ? 'Terpasang' : 'Terapkan'}
                    </button>
                  </div>
                  {promoApplied && (
                    <p className="text-[11px] text-emerald-700 font-bold mt-1.5 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Berhasil mendapatkan diskon Rp 15.000!</span>
                    </p>
                  )}
                  {promoError && (
                    <p className="text-[11px] text-rose-600 font-bold mt-1.5">{promoError}</p>
                  )}
                </form>

                {/* Confirm & Pay Button */}
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleConfirmPayment}
                  className="w-full py-4 rounded-2xl font-black text-sm sm:text-base bg-[#134e35] hover:bg-[#0c3926] text-white flex items-center justify-center gap-2.5 shadow-[0_10px_25px_rgba(19,78,53,0.35)] hover:scale-[1.01] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      <span>Memproses Pembayaran...</span>
                    </div>
                  ) : (
                    <>
                      <span>Bayar Sekarang ({formatRupiah(totalAmount)})</span>
                      <ChevronRight className="w-5 h-5 stroke-[3]" />
                    </>
                  )}
                </button>

                <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-slate-500 text-center font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Transaksi Terenkripsi &amp; Konfirmasi Instan Otomatis</span>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={handleChangePlan}
              className="px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm bg-white/80 hover:bg-white border border-emerald-200 text-emerald-950 flex items-center gap-2 cursor-pointer transition-all shadow-sm"
            >
              <ArrowLeft className="w-4 h-4 text-emerald-700" />
              <span>Kembali ke Langkah 2: Paket Harga</span>
            </button>
            <button
              onClick={handleChangeTemplate}
              className="px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm bg-white/80 hover:bg-white border border-emerald-200 text-emerald-950 flex items-center gap-2 cursor-pointer transition-all shadow-sm"
            >
              <span>Ubah Desain Template (Langkah 1)</span>
              <ArrowRight className="w-4 h-4 text-emerald-700" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Success Modal dengan Glass Luxury Effect */}
      <AnimatePresence>
        {isSuccessModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/95 border border-white/95 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-center relative overflow-hidden backdrop-blur-2xl"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-sm">
                <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
              </div>

              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block mb-2">
                PEMBAYARAN TERKONFIRMASI
              </span>

              <h3 className="text-xl sm:text-2xl font-black text-emerald-950 mb-2">
                Selamat! Pesanan Anda Sukses 🎉
              </h3>
              
              <p className="text-xs text-slate-600 leading-relaxed mb-5">
                Paket <strong>{selectedPlan.name}</strong> dengan <strong>{selectedTemplate.name}</strong> telah berhasil diproses. No. Invoice: <span className="font-mono text-emerald-700 font-bold">{createdOrderNumber}</span>.
              </p>

              <div className="bg-emerald-50/80 p-4 rounded-2xl border border-emerald-200/70 text-xs text-left mb-6 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-600">Total Dibayar:</span>
                  <span className="font-bold text-emerald-950">{formatRupiah(totalAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Metode:</span>
                  <span className="font-semibold text-slate-900 uppercase">{paymentMethod.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Status Undangan:</span>
                  <span className="font-bold text-emerald-700">Aktif &amp; Siap Dipakai</span>
                </div>
              </div>

              <div className="space-y-2.5">
                <button
                  onClick={() => {
                    setIsSuccessModalOpen(false);
                    onPreviewTemplate(selectedTemplate.previewRoute);
                  }}
                  className="w-full py-3.5 rounded-xl font-black text-xs sm:text-sm bg-[#134e35] hover:bg-[#0c3926] text-white flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <Eye className="w-4 h-4" />
                  <span>Buka Preview Hasil Undangan</span>
                </button>

                <button
                  onClick={() => {
                    setIsSuccessModalOpen(false);
                    try {
                      sessionStorage.removeItem('ij_transaction_active');
                      sessionStorage.removeItem('ij_selected_plan');
                      sessionStorage.removeItem('ij_selected_template');
                      sessionStorage.setItem('ij_order_paid', 'true');
                      // Simpan template yang baru saja dibeli sebagai activeTemplateId
                      const rawDash = localStorage.getItem('ij_dashboard_data');
                      const dashObj = rawDash ? JSON.parse(rawDash) : {};
                      dashObj.activeTemplateId = selectedTemplate.previewRoute || selectedTemplate.id;
                      localStorage.setItem('ij_dashboard_data', JSON.stringify(dashObj));
                      window.dispatchEvent(new Event('storage'));
                      window.dispatchEvent(new CustomEvent('ij_order_state_change', { detail: { isPaid: true } }));
                    } catch {}
                    onBackToHome();
                  }}
                  className="w-full py-3 rounded-xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer transition-colors"
                >
                  Kembali ke Beranda Utama
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};


