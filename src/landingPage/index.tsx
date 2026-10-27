import { useState, useEffect } from 'react';
import { Navbar, type OrderState } from './Navbar';
import { Hero } from './Hero';
import { TrustBar } from './TrustBar';
import { Features } from './Features';
import { TemplateSection, type TemplateItem } from './TemplateSection';
import { AtmCardShowcaseSection } from './AtmCardShowcaseSection';
import { HowItWorks } from './HowItWorks';
import { PricingSection } from './PricingSection';
import { PaymentInfoSection } from './PaymentInfoSection';
import { Testimonials } from './Testimonials';
import { FaqSection } from './FaqSection';
import { Footer } from './Footer';
import { DynamicConfettiAndShadows, BotanicalLeaves } from './DecorativeBackground';
import { PreviewModal } from './PreviewModal';
import { Check, AlertCircle, X, Sparkles } from 'lucide-react';
import { getSavedAuthUser, type AuthUser } from '../services/authService';
import { getMyOrders } from '../services/orderService';
import { getSavedDashboardData, saveDashboardData } from '../dashboard/initialData';
import { normalizeTemplateId } from '../dashboard/templateHelpers';
import templateSatuMockupImg from '../tempalte/satu/image.png';
import templateDuaMockupImg from '../tempalte/dua/image.png';
import templateTigaMockupImg from '../tempalte/tiga/image.png';
import templateEmpatMockupImg from '../tempalte/empat/image.png';
import wisudaMockupImg from '../tempalte/Wisuda/satu/image.png';
import wisudaDuaMockupImg from '../tempalte/Wisuda/dua/image.png';

interface LandingPageProps {
  currentUser?: AuthUser | null;
  onLogout?: () => void;
  onNavigateAuth?: (mode: 'login' | 'register') => void;
  onNavigateCardAtm?: () => void;
  onNavigateDashboard?: () => void;
  onSelectPlan?: (planId: 'silver' | 'gold' | 'platinum') => void;
  onSelectTemplate?: (templateId: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ 
  currentUser,
  onLogout,
  onNavigateAuth, 
  onNavigateCardAtm,
  onNavigateDashboard,
  onSelectPlan,
  onSelectTemplate,
}) => {
  const [previewTemplate, setPreviewTemplate] = useState<TemplateItem | null>(null);
  const [selectedTemplateNotice, setSelectedTemplateNotice] = useState<{ message: string; type?: 'success' | 'warning' } | null>(null);

  const [welcomeRegisterNotice, setWelcomeRegisterNotice] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('ij_welcome_register') === 'true';
    } catch {
      return false;
    }
  });

  // Status apakah pesanan sudah dibayar
  const [isOrderPaid, setIsOrderPaid] = useState<boolean>(() => {
    try {
      const user = getSavedAuthUser();
      if (user?.has_paid_orders) return true;
      return sessionStorage.getItem('ij_order_paid') === 'true';
    } catch {
      return false;
    }
  });

  const [isTransactionActive, setIsTransactionActive] = useState<boolean>(() => {
    try {
      const user = getSavedAuthUser();
      if (!user) return false;
      // Jika user sudah memiliki pesanan berbayar, stepper hanya aktif jika memulai order baru secara eksplisit
      if (user.has_paid_orders || sessionStorage.getItem('ij_order_paid') === 'true') {
        return sessionStorage.getItem('ij_new_order_intent') === 'true';
      }
      return sessionStorage.getItem('ij_transaction_active') === 'true';
    } catch {
      return false;
    }
  });

  // Sinkronkan pilihan paket dan template dari sessionStorage (hanya jika belum dibayar)
  const [currentPlan, setCurrentPlan] = useState<any>(() => {
    try {
      const user = getSavedAuthUser();
      const isPaid = Boolean(user?.has_paid_orders) || sessionStorage.getItem('ij_order_paid') === 'true';
      const isNewIntent = sessionStorage.getItem('ij_new_order_intent') === 'true';
      if (isPaid && !isNewIntent) return null;
      const raw = sessionStorage.getItem('ij_selected_plan');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const [currentTemplate, setCurrentTemplate] = useState<any>(() => {
    try {
      const user = getSavedAuthUser();
      const isPaid = Boolean(user?.has_paid_orders) || sessionStorage.getItem('ij_order_paid') === 'true';
      const isNewIntent = sessionStorage.getItem('ij_new_order_intent') === 'true';
      if (isPaid && !isNewIntent) return null;
      const raw = sessionStorage.getItem('ij_selected_template');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

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

  // Periksa apakah user yang sedang login sudah memiliki pesanan yang berhasil dibayar di backend
  useEffect(() => {
    if (!currentUser) {
      setIsTransactionActive(false);
      try {
        sessionStorage.removeItem('ij_transaction_active');
      } catch {}
      return;
    }

    const syncPaidUserStatus = (hasPaid: boolean) => {
      const isNewOrderIntent = sessionStorage.getItem('ij_new_order_intent') === 'true';
      if (hasPaid && !isNewOrderIntent) {
        setIsOrderPaid(true);
        setIsTransactionActive(false);
        setCurrentPlan(null);
        setCurrentTemplate(null);
        setWelcomeRegisterNotice(false);
        try {
          sessionStorage.setItem('ij_order_paid', 'true');
          sessionStorage.removeItem('ij_transaction_active');
          sessionStorage.removeItem('ij_selected_plan');
          sessionStorage.removeItem('ij_selected_template');
          sessionStorage.removeItem('ij_flow_mode');
          sessionStorage.removeItem('ij_welcome_register');
        } catch {}
      }
    };

    if (currentUser.has_paid_orders) {
      syncPaidUserStatus(true);
    }

    getMyOrders()
      .then((orders) => {
        const hasPaid = orders.some((o) => o.status === 'paid');
        syncPaidUserStatus(hasPaid);
      })
      .catch(() => {});
  }, [currentUser]);

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const user = getSavedAuthUser();
        const hasPaidInDb = Boolean(user?.has_paid_orders);
        const isPaid = hasPaidInDb || sessionStorage.getItem('ij_order_paid') === 'true';
        const isNewIntent = sessionStorage.getItem('ij_new_order_intent') === 'true';
        setIsOrderPaid(isPaid);
        if ((isPaid && !isNewIntent) || !user) {
          setIsTransactionActive(false);
          setCurrentPlan(null);
          setCurrentTemplate(null);
          setWelcomeRegisterNotice(false);
          return;
        }

        const active = sessionStorage.getItem('ij_transaction_active') === 'true';
        setIsTransactionActive(active);
        const rawPlan = sessionStorage.getItem('ij_selected_plan');
        setCurrentPlan(active && rawPlan ? JSON.parse(rawPlan) : null);
        const rawTmpl = sessionStorage.getItem('ij_selected_template');
        setCurrentTemplate(active && rawTmpl ? JSON.parse(rawTmpl) : null);
        
        const savedFlow = sessionStorage.getItem('ij_flow_mode');
        if (savedFlow === 'plan-first' || savedFlow === 'template-first') {
          setFlowMode(savedFlow);
        } else if (rawPlan && !rawTmpl) {
          setFlowMode('plan-first');
        } else if (rawTmpl && !rawPlan) {
          setFlowMode('template-first');
        }

        setWelcomeRegisterNotice(sessionStorage.getItem('ij_welcome_register') === 'true');
      } catch {}
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('hashchange', handleStorageChange);
    window.addEventListener('ij_order_state_change', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('hashchange', handleStorageChange);
      window.removeEventListener('ij_order_state_change', handleStorageChange);
    };
  }, []);

  const isPlanFirst = flowMode === 'plan-first';
  const orderState: OrderState = {
    // Stepper navbar HANYA aktif jika user login, belum dibayar, DAN sedang aktif bertransaksi
    isTransacting: Boolean(currentUser && !isOrderPaid && isTransactionActive),
    hasPlan: Boolean(currentPlan),
    planName: currentPlan?.name,
    hasTemplate: Boolean(currentTemplate),
    templateName: currentTemplate?.name,
    flowMode,
    step: (currentTemplate && currentPlan) 
      ? 3 
      : isPlanFirst 
        ? (currentPlan ? 2 : 1) 
        : (currentTemplate ? 2 : 1),
  };

  const handleNavigateStep = (step: 1 | 2 | 3) => {
    if (step === 1) {
      const targetId = isPlanFirst ? 'harga' : 'template';
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else window.location.hash = `#${targetId}`;
    } else if (step === 2) {
      const targetId = isPlanFirst ? 'template' : 'harga';
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else window.location.hash = `#${targetId}`;
    } else if (step === 3) {
      if (currentTemplate && currentPlan) {
        if (onSelectTemplate) {
          onSelectTemplate(currentTemplate.id);
        } else {
          window.location.hash = '#/pembayaran';
        }
      }
    }
  };

  const handleSelectPlan = (planId: 'silver' | 'gold' | 'platinum') => {
    const planMap = {
      silver: {
        id: 'silver',
        name: 'Paket Silver',
        badge: 'Paling Hemat',
        price: 49000,
        originalPrice: 99000,
        subtitle: 'Hemat untuk Acara Intim & Sederhana',
      },
      gold: {
        id: 'gold',
        name: 'Paket Gold',
        badge: 'BEST SELLER 🔥',
        price: 89000,
        originalPrice: 179000,
        subtitle: 'Pilihan Favorit 90% Calon Pengantin',
      },
      platinum: {
        id: 'platinum',
        name: 'Paket Platinum VIP',
        badge: 'Full VIP & Domain',
        price: 149000,
        originalPrice: 299000,
        subtitle: 'Eksklusif Custom Domain & Siap Terima Beres',
      },
    };

    const selectedObj = planMap[planId];

    // Jika template belum dipilih, berarti user memulai dari pemilihan paket harga (Langkah 1: Paket Harga)
    if (!currentTemplate) {
      try {
        sessionStorage.setItem('ij_flow_mode', 'plan-first');
      } catch {}
      setFlowMode('plan-first');
    }

    // JIKA USER BELUM DAFTAR ATAU LOGIN:
    // Simpan pilihan paket ke ij_intended_plan (TIDAK mengaktifkan stepper transaksi sampai user login)
    if (!currentUser) {
      try {
        sessionStorage.setItem('ij_intended_plan', JSON.stringify(selectedObj));
        sessionStorage.setItem('ij_flow_mode', 'plan-first');
        sessionStorage.removeItem('ij_transaction_active');
      } catch {}
      if (onNavigateAuth) {
        onNavigateAuth('register');
      } else {
        window.location.hash = '#/register';
      }
      return;
    }

    try {
      sessionStorage.removeItem('ij_order_paid');
      sessionStorage.setItem('ij_new_order_intent', 'true');
      sessionStorage.setItem('ij_selected_plan', JSON.stringify(selectedObj));
      sessionStorage.setItem('ij_transaction_active', 'true');
      const userKey = currentUser?.id || currentUser?.email;
      const dashData = getSavedDashboardData(userKey);
      dashData.tier = planId as any;
      saveDashboardData(dashData, userKey);
    } catch {}
    setIsOrderPaid(false);
    setCurrentPlan(selectedObj);
    setIsTransactionActive(true);

    // Jika template sudah dipilih sebelumnya, langsung lanjut ke Step 3: Pembayaran
    if (currentTemplate) {
      setSelectedTemplateNotice({
        message: `${selectedObj.name} dipilih! Menuju formulir rincian pembayaran...`,
        type: 'success',
      });
      setTimeout(() => {
        setSelectedTemplateNotice(null);
        if (onSelectPlan) {
          onSelectPlan(planId);
        } else {
          window.location.hash = '#/pembayaran';
        }
      }, 700);
    } else {
      // Alur Plan-First: Step 1 (Pilih Paket Harga) Selesai -> Lanjut ke Step 2 (Pilih Desain Template)
      setSelectedTemplateNotice({
        message: `Langkah 1 Selesai: ${selectedObj.name} dipilih! Silakan lanjutkan ke Langkah 2: Pilih Desain Template di atas.`,
        type: 'success',
      });
      setTimeout(() => {
        setSelectedTemplateNotice(null);
        const el = document.getElementById('template');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else window.location.hash = '#template';
      }, 800);
    }
  };

  const handleUseTemplate = (template: TemplateItem) => {
    // Jika paket belum dipilih, berarti user memulai dari pemilihan template (Langkah 1: Desain Template)
    if (!currentPlan) {
      try {
        sessionStorage.setItem('ij_flow_mode', 'template-first');
      } catch {}
      setFlowMode('template-first');
    }

    let targetTmplId = 'template-satu';
    let tmplObj = {
      id: 'template-satu',
      name: 'Rustic Blossom (Template 1)',
      category: 'Elegan & Mewah',
      tag: 'Burgundy & Gold',
      previewRoute: 'template-satu',
      image: templateSatuMockupImg,
      desc: 'Desain anggun dengan ornamen botani berkelas, perpaduan warna burgundy mewah dan sentuhan emas.',
      badgeText: 'FAVORIT',
    };

    if (template.id === 't2' || template.themeStyle === 'dusty-rose') {
      targetTmplId = 'template-dua';
      tmplObj = {
        id: 'template-dua',
        name: 'Dusty Rose Lily (Template 2)',
        category: 'Romantis & Manis',
        tag: 'Soft Pastel Floral',
        previewRoute: 'template-dua',
        image: templateDuaMockupImg,
        desc: 'Nuansa bunga lily merah muda dan sentuhan modern minimalis yang memancarkan kehangatan cinta.',
        badgeText: 'ROMANTIS',
      };
    } else if (template.id === 't3' || template.themeStyle === 'minang-maroon') {
      targetTmplId = 'template-tiga';
      tmplObj = {
        id: 'template-tiga',
        name: 'Minang Maroon Gold (Template 3)',
        category: 'Tradisional & Megah',
        tag: 'Adat Minang & Gold',
        previewRoute: 'template-tiga',
        image: templateTigaMockupImg,
        desc: 'Perpaduan megah nuansa adat Minang dengan sentuhan warna maroon mewah dan detail emas berkelas.',
        badgeText: 'GOLD',
      };
    } else if (template.id === 't4' || template.themeStyle === 'sage-garden') {
      targetTmplId = 'template-empat';
      tmplObj = {
        id: 'template-empat',
        name: 'Sage Garden Blossom (Template 4)',
        category: 'Botanical & Natural',
        tag: 'Sage Green & White',
        previewRoute: 'template-empat',
        image: templateEmpatMockupImg,
        desc: 'Nuansa alam botanical sage green yang asri, tenang, dan memikat untuk pernikahan impian.',
        badgeText: 'GOLD',
      };
    } else if (template.id === 't-wisuda-1' || template.themeStyle === 'wisuda-karin') {
      targetTmplId = 'wisuda-satu';
      tmplObj = {
        id: 'wisuda-satu',
        name: 'Wisuda Karin (Template Wisuda 1)',
        category: 'Undangan Wisuda',
        tag: 'Wisuda & Kelulusan',
        previewRoute: 'wisuda-satu',
        image: wisudaMockupImg,
        desc: 'Perayaan kelulusan istimewa dengan desain modern, foto wisudawan dan detail acara.',
        badgeText: 'BRONZE',
      };
    } else if (template.id === 't-wisuda-2' || template.themeStyle === 'wisuda-yolanda') {
      targetTmplId = 'wisuda-dua';
      tmplObj = {
        id: 'wisuda-dua',
        name: 'Wisuda Black Gold (Template Wisuda 2)',
        category: 'Undangan Wisuda',
        tag: 'Black Gold Luxury',
        previewRoute: 'wisuda-dua',
        image: wisudaDuaMockupImg,
        desc: 'Tema Black & Gold mewah dan prestisius dengan countdown, live stream, galeri dan amplop ucapan selamat.',
        badgeText: 'GOLD',
      };
    }

    targetTmplId = normalizeTemplateId(targetTmplId);
    tmplObj.id = targetTmplId;

    // JIKA USER BELUM DAFTAR ATAU LOGIN:
    // Simpan template yang diinginkan ke ij_intended_template (TIDAK mengaktifkan stepper transaksi sampai user login)
    if (!currentUser) {
      try {
        sessionStorage.setItem('ij_intended_template', JSON.stringify(tmplObj));
        sessionStorage.setItem('ij_flow_mode', 'template-first');
        sessionStorage.removeItem('ij_transaction_active');
      } catch {}
      if (onNavigateAuth) {
        onNavigateAuth('register');
      } else {
        window.location.hash = '#/register';
      }
      return;
    }

    try {
      sessionStorage.removeItem('ij_welcome_register');
      sessionStorage.removeItem('ij_order_paid');
      sessionStorage.setItem('ij_new_order_intent', 'true');
      sessionStorage.setItem('ij_selected_template', JSON.stringify(tmplObj));
      sessionStorage.setItem('ij_transaction_active', 'true');
      const userKey = currentUser?.id || currentUser?.email;
      const dashData = getSavedDashboardData(userKey);
      dashData.activeTemplateId = targetTmplId;
      // Jangan tambahkan ke purchasedTemplateIds sebelum lunas!
      saveDashboardData(dashData, userKey);
    } catch {}
    setWelcomeRegisterNotice(false);
    setIsOrderPaid(false);
    setCurrentTemplate(tmplObj);
    setIsTransactionActive(true);

    // Jika Paket Harga sudah dipilih sebelumnya, langsung lanjutkan ke pembayaran
    if (currentPlan) {
      setSelectedTemplateNotice({
        message: `Desain "${template.title}" dipilih! Menuju formulir rincian pembayaran...`,
        type: 'success',
      });
      setTimeout(() => {
        setSelectedTemplateNotice(null);
        if (onSelectTemplate) {
          onSelectTemplate(targetTmplId);
        } else {
          window.location.hash = '#/pembayaran';
        }
      }, 600);
    } else {
      // Alur Template-First: Step 1 (Pilih Desain) Selesai -> Lanjut ke Step 2 (Pilih Paket Harga)
      setSelectedTemplateNotice({
        message: `Langkah 1 Selesai: Desain "${template.title}" dipilih! Silakan lanjutkan ke Langkah 2: Tentukan Paket Harga di bawah ini.`,
        type: 'success',
      });
      setTimeout(() => {
        setSelectedTemplateNotice(null);
        const el = document.getElementById('harga');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.location.hash = '#harga';
        }
      }, 700);
    }
  };

  const handleUseAtmCard = () => {
    if (!currentPlan) {
      try {
        sessionStorage.setItem('ij_flow_mode', 'template-first');
      } catch {}
      setFlowMode('template-first');
    }

    const atmObj = {
      id: 'card-atm',
      name: 'Royal ATM Card Invitation',
      category: 'Modern & Eksklusif',
      tag: '3D ATM Card & Amplop',
      previewRoute: 'card-atm',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=600&q=80',
      desc: 'Konsep kartu ATM pernikahan dengan efek 3D fisik dan amplop dompet virtual berkelas tinggi.',
      badgeText: 'PREMIUM',
    };

    // JIKA USER BELUM DAFTAR ATAU LOGIN:
    // Simpan pilihan kartu ATM ke ij_intended_template (TIDAK mengaktifkan stepper transaksi sampai user login)
    if (!currentUser) {
      try {
        sessionStorage.setItem('ij_intended_template', JSON.stringify(atmObj));
        sessionStorage.setItem('ij_flow_mode', 'template-first');
        sessionStorage.removeItem('ij_transaction_active');
      } catch {}
      if (onNavigateAuth) {
        onNavigateAuth('register');
      } else {
        window.location.hash = '#/register';
      }
      return;
    }

    try {
      sessionStorage.removeItem('ij_welcome_register');
      sessionStorage.removeItem('ij_order_paid');
      sessionStorage.setItem('ij_new_order_intent', 'true');
      sessionStorage.setItem('ij_selected_template', JSON.stringify(atmObj));
      sessionStorage.setItem('ij_transaction_active', 'true');
    } catch {}
    setWelcomeRegisterNotice(false);
    setIsOrderPaid(false);
    setCurrentTemplate(atmObj);
    setIsTransactionActive(true);

    if (currentPlan) {
      setSelectedTemplateNotice({
        message: `Desain "${atmObj.name}" dipilih! Menuju formulir rincian pembayaran...`,
        type: 'success',
      });
      setTimeout(() => {
        setSelectedTemplateNotice(null);
        if (onSelectTemplate) {
          onSelectTemplate('card-atm');
        } else {
          window.location.hash = '#/pembayaran';
        }
      }, 600);
    } else {
      setSelectedTemplateNotice({
        message: `Langkah 1 Selesai: Desain "${atmObj.name}" dipilih! Silakan lanjutkan ke Langkah 2: Tentukan Paket Harga di bawah ini.`,
        type: 'success',
      });
      setTimeout(() => {
        setSelectedTemplateNotice(null);
        const el = document.getElementById('harga');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.location.hash = '#harga';
        }
      }, 700);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#fafbfc] text-slate-800 font-sans selection:bg-emerald-700 selection:text-white overflow-hidden">
      
      {/* Top right botanical leaves border */}
      <BotanicalLeaves.TopRight />

      {/* Dynamic Window Sunlight Shadows, Gold Foil Splashes & Confetti */}
      <DynamicConfettiAndShadows />

      {/* Toast Notification saat memilih template atau plan */}
      {selectedTemplateNotice && (
        <div className={`fixed top-24 right-6 z-50 p-4 rounded-2xl text-white text-xs font-semibold shadow-2xl flex items-center gap-3 animate-in slide-in-from-top duration-300 border backdrop-blur-md ${
          selectedTemplateNotice.type === 'warning'
            ? 'bg-amber-900/95 border-amber-500/50 text-amber-100'
            : 'bg-emerald-900/95 border-emerald-500/50 text-emerald-100'
        }`}>
          <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
            selectedTemplateNotice.type === 'warning' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-[#00c078] text-white'
          }`}>
            {selectedTemplateNotice.type === 'warning' ? (
              <AlertCircle className="w-4 h-4 text-slate-950" />
            ) : (
              <Check className="w-4 h-4 text-white stroke-[3]" />
            )}
          </div>
          <span className="max-w-xs">{selectedTemplateNotice.message}</span>
        </div>
      )}

      {/* Banner Khusus Pengguna Baru Selesai Registrasi */}
      {welcomeRegisterNotice && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-2xl p-4 sm:p-5 rounded-3xl bg-emerald-950/95 text-white shadow-[0_15px_50px_rgba(0,0,0,0.35)] border border-emerald-500/40 backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 shadow-md shadow-amber-950/20 font-black">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-xs sm:text-sm font-black text-white">
                    Pendaftaran Berhasil! Selamat Datang{currentUser?.name ? `, ${currentUser.name}` : ''} 🎉
                  </h4>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-800 text-[10px] font-bold text-emerald-200">
                    Langkah 1 dari 3
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-emerald-200/90 leading-relaxed">
                  Silakan <strong>pilih desain template undangan</strong> di bawah ini, lalu tentukan <strong>paket harga</strong>, dan lanjutkan ke <strong>pembayaran</strong>.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                try {
                  sessionStorage.removeItem('ij_welcome_register');
                } catch {}
                setWelcomeRegisterNotice(false);
              }}
              className="p-1 rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-900 transition-colors cursor-pointer shrink-0"
              title="Tutup pesan"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Landing Page Structure */}
      <div className="relative z-10">
        <Navbar 
          onOpenAuth={onNavigateAuth} 
          currentUser={currentUser}
          onLogout={onLogout}
          orderState={orderState}
          onNavigateStep={handleNavigateStep}
          onNavigateDashboard={onNavigateDashboard}
        />
        <main className="pt-20">
          <Hero />
          <TrustBar />
          <Features />
          <TemplateSection
            onPreview={(item) => setPreviewTemplate(item)}
            onUseTemplate={handleUseTemplate}
          />
          <AtmCardShowcaseSection 
            onOpenFullGallery={onNavigateCardAtm} 
            onUseAtmCard={handleUseAtmCard}
          />
          <HowItWorks />
          <PricingSection onSelectPlan={handleSelectPlan} />
          <PaymentInfoSection />
          <Testimonials />
          <FaqSection />
        </main>
        <Footer />
      </div>

      {/* Interactive Preview Modal */}
      <PreviewModal
        template={previewTemplate}
        onClose={() => setPreviewTemplate(null)}
        onSelect={handleUseTemplate}
      />

    </div>
  );
};
export default LandingPage;
