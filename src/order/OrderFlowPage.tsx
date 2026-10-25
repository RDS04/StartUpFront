import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  Check, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Tag, 
  Heart, 
  ChevronRight, 
  Home,
  AlertCircle,
  Clock,
  LayoutDashboard
} from 'lucide-react';
import { createOrder, markOrderPaid } from '../services/orderService';
import { getPricingPlans } from '../services/pricingService';
import type { AuthUser } from '../services/authService';
import { BotanicalLeaves } from '../landingPage/DecorativeBackground';
import { triggerLoading } from '../components/common/LottieLoader';
import { getSavedDashboardData, saveDashboardData } from '../dashboard/initialData';
import { normalizeTemplateId } from '../dashboard/templateHelpers';
import templateSatuMockupImg from '../tempalte/satu/image.png';
import templateDuaMockupImg from '../tempalte/dua/image.png';
import templateTigaMockupImg from '../tempalte/tiga/image.png';
import templateEmpatMockupImg from '../tempalte/empat/image.png';
import wisudaMockupImg from '../tempalte/Wisuda/satu/image.png';
import wisudaDuaMockupImg from '../tempalte/Wisuda/dua/image.png';

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
  id: string;
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
  previewRoute: 'template-satu' | 'template-dua' | 'template-tiga' | 'template-empat' | 'wisuda-satu' | 'wisuda-dua' | 'card-atm' | string;
  image: string;
  desc: string;
  badgeText: string;
}

// Fallback aman jika koneksi offline saat pertama kali memuat halaman
export const DEFAULT_FALLBACK_PLAN: PlanOption = {
  id: 'gold',
  name: 'Paket Gold',
  badge: 'BEST SELLER 🔥',
  isPopular: true,
  price: 89000,
  originalPrice: 179000,
  subtitle: 'Fitur Lengkap Pilihan Favorit 90% Calon Pengantin',
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
};

// Ekspor array PLANS kosong untuk kompatibilitas impor eksternal (data live diambil dari backend)
export const PLANS: PlanOption[] = [];

export const TEMPLATES: TemplateOption[] = [
  {
    id: 'template-satu',
    name: 'Rustic Blossom (Template 1)',
    category: 'Undangan Wedding',
    tag: 'Burgundy & Gold',
    previewRoute: 'template-satu',
    image: templateSatuMockupImg,
    desc: 'Desain anggun dengan ornamen botani berkelas, perpaduan warna burgundy mewah dan sentuhan emas.',
    badgeText: 'FAVORIT',
  },
  {
    id: 'template-dua',
    name: 'Dusty Rose Lily (Template 2)',
    category: 'Undangan Wedding',
    tag: 'Soft Pastel Floral',
    previewRoute: 'template-dua',
    image: templateDuaMockupImg,
    desc: 'Nuansa bunga lily merah muda dan sentuhan modern minimalis yang memancarkan kehangatan cinta.',
    badgeText: 'ROMANTIS',
  },
  {
    id: 'template-tiga',
    name: 'Minang Maroon Gold (Template 3)',
    category: 'Undangan Wedding',
    tag: 'Adat Minang & Gold',
    previewRoute: 'template-tiga',
    image: templateTigaMockupImg,
    desc: 'Perpaduan megah nuansa adat Minang dengan sentuhan warna maroon mewah dan detail emas berkelas.',
    badgeText: 'GOLD',
  },
  {
    id: 'template-empat',
    name: 'Sage Garden Blossom (Template 4)',
    category: 'Undangan Wedding',
    tag: 'Sage Green & White',
    previewRoute: 'template-empat',
    image: templateEmpatMockupImg,
    desc: 'Nuansa alam botanical sage green yang asri, tenang, dan memikat untuk pernikahan impian.',
    badgeText: 'GOLD',
  },
  {
    id: 'wisuda-satu',
    name: 'Wisuda Karin (Template Wisuda 1)',
    category: 'Undangan Wisuda',
    tag: 'Wisuda & Kelulusan',
    previewRoute: 'wisuda-satu',
    image: wisudaMockupImg,
    desc: 'Perayaan kelulusan istimewa dengan desain modern, foto wisudawan dan detail acara.',
    badgeText: 'BRONZE',
  },
  {
    id: 'wisuda-dua',
    name: 'Wisuda Black Gold (Template Wisuda 2)',
    category: 'Undangan Wisuda',
    tag: 'Black Gold Luxury',
    previewRoute: 'wisuda-dua',
    image: wisudaDuaMockupImg,
    desc: 'Tema Black & Gold mewah dan prestisius dengan countdown, live stream, galeri dan amplop ucapan selamat.',
    badgeText: 'GOLD',
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
  onPreviewTemplate?: (route: any) => void;
  onNavigateDashboard?: () => void;
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
  onNavigateDashboard,
  selectedPlan: propSelectedPlan,
  onSelectPlan: onPropSelectPlan,
  selectedTemplate: propSelectedTemplate,
  onSelectTemplate: onPropSelectTemplate,
}) => {
  // Wizard step: 1 = Langkah Pertama, 2 = Langkah Kedua, 3 = Pembayaran & Checkout
  const [internalStep, setInternalStep] = useState<1 | 2 | 3>(activeStep || 3);

  // Flow mode: apakah user memilih Template lebih dulu ('template-first') atau Price lebih dulu ('plan-first')
  const [flowMode, setFlowMode] = useState<'template-first' | 'plan-first'>(() => {
    try {
      const saved = sessionStorage.getItem('ij_flow_mode');
      if (saved === 'plan-first' || saved === 'template-first') return saved;
      if (sessionStorage.getItem('ij_selected_plan') && !sessionStorage.getItem('ij_selected_template')) {
        return 'plan-first';
      }
    } catch {}
    return 'template-first';
  });

  useEffect(() => {
    const handleStorage = () => {
      try {
        const saved = sessionStorage.getItem('ij_flow_mode');
        if (saved === 'plan-first' || saved === 'template-first') {
          setFlowMode(saved);
        }
      } catch {}
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  useEffect(() => {
    if (activeStep && activeStep !== internalStep) {
      setInternalStep(activeStep);
    }
  }, [activeStep]);

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

  // Available pricing plans fetched from backend database (Master Pricing)
  const [availablePlans, setAvailablePlans] = useState<PlanOption[]>([]);
  const [isLoadingPlans, setIsLoadingPlans] = useState<boolean>(true);

  // Selections with sessionStorage persistence
  const [localPlan, setLocalPlan] = useState<PlanOption>(() => {
    try {
      const saved = sessionStorage.getItem('ij_selected_plan');
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_FALLBACK_PLAN;
  });

  // Fetch dynamic pricing plans from backend (/api/pricing-plans)
  useEffect(() => {
    let isMounted = true;
    getPricingPlans().then((serverPlans) => {
      if (!isMounted) return;
      if (serverPlans && serverPlans.length > 0) {
        const mapped: PlanOption[] = serverPlans.map((sp) => ({
          id: String(sp.id),
          name: sp.name,
          badge: sp.badge || '',
          price: Number(sp.price) || 0,
          originalPrice: Number(sp.originalPrice) || 0,
          subtitle: sp.subtitle || '',
          isPopular: Boolean(sp.isPopular),
          features: Array.isArray(sp.features) ? sp.features : [],
        }));
        setAvailablePlans(mapped);

        // Sinkronkan paket terpilih dengan data master terbaru dari database
        setLocalPlan((prev) => {
          const matched = mapped.find((p) => p.id === prev.id) || mapped.find((p) => p.isPopular) || mapped[0];
          if (matched) {
            const updated: PlanOption = {
              ...prev,
              ...matched,
            };
            try {
              sessionStorage.setItem('ij_selected_plan', JSON.stringify(updated));
            } catch {}
            return updated;
          }
          return prev;
        });
      }
      setIsLoadingPlans(false);
    });

    return () => {
      isMounted = false;
    };
  }, []);

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

  const selectedTemplate = propSelectedTemplate || localTemplate;
  const setSelectedTemplate = (tmpl: TemplateOption) => {
    setLocalTemplate(tmpl);
    try {
      sessionStorage.setItem('ij_selected_template', JSON.stringify(tmpl));
    } catch {}
    if (onPropSelectTemplate) onPropSelectTemplate(tmpl);
  };
  void onStepChange;
  void flowMode;
  void availablePlans;
  void isLoadingPlans;
  void setSelectedPlan;
  void setSelectedTemplate;

  // Order Details Form
  const [coupleNames, setCoupleNames] = useState(currentUser?.name || 'Andi & Rosna');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || '');
  const [promoCode, setPromoCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  useEffect(() => {
    if (currentUser?.phone && !customerPhone) {
      setCustomerPhone(currentUser.phone);
    }
    if (currentUser?.name && coupleNames === 'Andi & Rosna') {
      setCoupleNames(currentUser.name);
    }
  }, [currentUser]);

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
    const midtransOrderIdParam = urlParams.get('midtrans_order_id') || orderIdParam;

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
        markOrderPaid(targetOrderId, midtransOrderIdParam).catch(err => console.error(err));
      }

      const invoiceCode = orderIdParam ? (orderIdParam.startsWith('INV-') ? orderIdParam : `INV-${orderIdParam}`) : `INV-${Date.now()}`;
      setCreatedOrderNumber(invoiceCode);
      setIsSuccessModalOpen(true);
      triggerConfetti();

      // Pastikan state transaksi dibersihkan karena pesanan telah dibayar dan simpan template yang dibeli
      try {
        const rawTmpl = sessionStorage.getItem('ij_selected_template');
        const rawPlan = sessionStorage.getItem('ij_selected_plan');
        const dashObj = getSavedDashboardData();
        if (rawPlan) {
          try {
            const p = JSON.parse(rawPlan);
            if (p?.id) dashObj.tier = p.id;
          } catch {}
        }
        if (rawTmpl) {
          try {
            const t = JSON.parse(rawTmpl);
            const rawId = t?.id || t?.previewRoute;
            const tid = normalizeTemplateId(rawId);
            if (tid) {
              dashObj.activeTemplateId = tid;
              const currentPurchased = Array.isArray(dashObj.purchasedTemplateIds) ? dashObj.purchasedTemplateIds : [];
              if (!currentPurchased.includes(tid)) {
                dashObj.purchasedTemplateIds = [...currentPurchased, tid];
              }
            }
          } catch {}
        }
        saveDashboardData(dashObj);
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

  const handleMarkPaymentSuccess = async (orderId?: number | null, midtransOrderId?: string | null) => {
    triggerLoading(true, 'Memverifikasi Pembayaran...', 'Mengonfirmasi status transaksi & mengaktifkan pesanan...');
    const targetId = orderId || activeCreatedOrderId;
    if (targetId) {
      try {
        await markOrderPaid(targetId, midtransOrderId);
      } catch (err) {
        console.error('Mark paid err:', err);
      }
    }
    triggerLoading(false);
    setIsSuccessModalOpen(true);
    triggerConfetti();
    try {
      const dashObj = getSavedDashboardData();
      if (selectedPlan?.id) {
        dashObj.tier = selectedPlan.id as any;
      }
      const rawTplId = selectedTemplate?.id || selectedTemplate?.previewRoute;
      const tId = normalizeTemplateId(rawTplId);
      if (tId) {
        dashObj.activeTemplateId = tId;
        const currentPurchased = Array.isArray(dashObj.purchasedTemplateIds) ? dashObj.purchasedTemplateIds : [];
        if (!currentPurchased.includes(tId)) {
          dashObj.purchasedTemplateIds = [...currentPurchased, tId];
        }
      }
      saveDashboardData(dashObj);
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
      const canonicalTemplateId = normalizeTemplateId(selectedTemplate?.id || selectedTemplate?.previewRoute);
      const res = await createOrder({
        plan_name: selectedPlan.name,
        template_id: canonicalTemplateId,
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
          onSuccess: async (result: any) => {
            await handleMarkPaymentSuccess(orderId, result?.order_id);
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

      {/* Header Halaman Pembayaran */}
      <div className="max-w-3xl mx-auto mb-8 text-center relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100/90 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2.5 border border-emerald-200 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
          <span>Konfirmasi &amp; Selesaikan Pesanan</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-emerald-950 tracking-tight mb-2">
          Rincian Pesanan &amp; Pembayaran
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
          Periksa rincian template dan paket yang telah Anda pilih di beranda, lalu selesaikan pembayaran dengan cepat, aman, dan otomatis.
        </p>
      </div>


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
              
              {/* Frosted Glass Card: Desain Template & Paket yang Dipilih di Beranda */}
              <div className="bg-white/85 backdrop-blur-2xl border-2 border-white/90 rounded-3xl p-6 sm:p-7 shadow-[0_16px_40px_rgba(16,185,129,0.08)] relative overflow-hidden">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                  <h3 className="text-base font-black text-emerald-950 flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-xs">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span>Pilihan Anda di Beranda</span>
                  </h3>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Terpilih
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Desain Template */}
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-white to-emerald-50/50 border border-emerald-200/80 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold mb-2">
                        <span>Desain Template</span>
                        <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                          {selectedTemplate.badgeText || 'FAVORIT'}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mb-3">
                        <img 
                          src={selectedTemplate.image} 
                          alt={selectedTemplate.name}
                          className="w-14 h-14 rounded-xl object-cover border border-emerald-200 shrink-0 shadow-xs" 
                        />
                        <div className="min-w-0">
                          <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 truncate">
                            {selectedTemplate.name}
                          </h4>
                          <p className="text-[11px] text-emerald-700 font-medium truncate">
                            {selectedTemplate.category}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 pt-2.5 border-t border-slate-100">
                      {onPreviewTemplate && (
                        <button
                          type="button"
                          onClick={() => onPreviewTemplate(selectedTemplate.previewRoute)}
                          className="flex-1 py-1.5 px-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-[11px] font-bold transition-all text-center cursor-pointer"
                        >
                          Lihat Demo
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={handleChangeTemplate}
                        className="flex-1 py-1.5 px-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-bold transition-all text-center cursor-pointer shadow-xs"
                      >
                        Ganti Desain
                      </button>
                    </div>
                  </div>

                  {/* Paket Harga */}
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-white to-amber-50/40 border border-amber-200/80 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold mb-2">
                        <span>Paket Layanan</span>
                        <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-bold text-[10px]">
                          {selectedPlan.badge || 'TERBAIK'}
                        </span>
                      </div>
                      <div className="mb-3">
                        <h4 className="font-extrabold text-xs sm:text-sm text-slate-900">
                          {selectedPlan.name}
                        </h4>
                        <div className="flex items-baseline gap-1 mt-1">
                          <span className="text-xs font-bold text-slate-500">Rp</span>
                          <span className="text-xl font-black text-slate-900">
                            {selectedPlan.price.toLocaleString('id-ID')}
                          </span>
                          <span className="text-[10px] text-slate-500">/ selamanya</span>
                        </div>
                      </div>
                    </div>
                    <div className="pt-2.5 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={handleChangePlan}
                        className="w-full py-1.5 px-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold transition-all text-center cursor-pointer shadow-xs"
                      >
                        Ganti Paket
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
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
              <span>Ganti Paket Harga di Beranda</span>
            </button>
            <button
              onClick={handleChangeTemplate}
              className="px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm bg-white/80 hover:bg-white border border-emerald-200 text-emerald-950 flex items-center gap-2 cursor-pointer transition-all shadow-sm"
            >
              <span>Ganti Desain Template di Beranda</span>
              <ArrowRight className="w-4 h-4 text-emerald-700" />
            </button>
          </div>
        </motion.div>

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
                    try {
                      sessionStorage.removeItem('ij_transaction_active');
                      sessionStorage.removeItem('ij_selected_plan');
                      sessionStorage.removeItem('ij_selected_template');
                      sessionStorage.setItem('ij_order_paid', 'true');
                      // Simpan template dan paket yang baru saja dibeli ke dashboard
                      const dashObj = getSavedDashboardData();
                      dashObj.activeTemplateId = selectedTemplate.previewRoute || selectedTemplate.id;
                      if (selectedPlan?.id) {
                        dashObj.tier = selectedPlan.id as any;
                      }
                      saveDashboardData(dashObj);
                      window.dispatchEvent(new Event('storage'));
                      window.dispatchEvent(new CustomEvent('ij_order_state_change', { detail: { isPaid: true } }));
                    } catch {}
                    if (onNavigateDashboard) {
                      onNavigateDashboard();
                    } else {
                      window.location.hash = '#/dashboard';
                    }
                  }}
                  className="w-full py-3.5 rounded-xl font-black text-xs sm:text-sm bg-[#134e35] hover:bg-[#0c3926] text-white flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-all"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Akses Dashboard</span>
                </button>

                <button
                  onClick={() => {
                    setIsSuccessModalOpen(false);
                    try {
                      sessionStorage.removeItem('ij_transaction_active');
                      sessionStorage.removeItem('ij_selected_plan');
                      sessionStorage.removeItem('ij_selected_template');
                      sessionStorage.setItem('ij_order_paid', 'true');
                      // Simpan template dan paket yang baru saja dibeli ke dashboard
                      const dashObj = getSavedDashboardData();
                      dashObj.activeTemplateId = selectedTemplate.previewRoute || selectedTemplate.id;
                      if (selectedPlan?.id) {
                        dashObj.tier = selectedPlan.id as any;
                      }
                      saveDashboardData(dashObj);
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


