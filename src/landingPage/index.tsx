
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
import { Check, AlertCircle } from 'lucide-react';
import type { AuthUser } from '../services/authService';

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
  const [isTransactionActive, setIsTransactionActive] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('ij_transaction_active') === 'true';
    } catch {
      return false;
    }
  });

  // Sinkronkan pilihan paket dan template dari sessionStorage
  const [currentPlan, setCurrentPlan] = useState<any>(() => {
    try {
      const raw = sessionStorage.getItem('ij_selected_plan');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const [currentTemplate, setCurrentTemplate] = useState<any>(() => {
    try {
      const raw = sessionStorage.getItem('ij_selected_template');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const rawPlan = sessionStorage.getItem('ij_selected_plan');
        setCurrentPlan(rawPlan ? JSON.parse(rawPlan) : null);
        const rawTmpl = sessionStorage.getItem('ij_selected_template');
        setCurrentTemplate(rawTmpl ? JSON.parse(rawTmpl) : null);
        setIsTransactionActive(sessionStorage.getItem('ij_transaction_active') === 'true');
      } catch {}
    };
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('hashchange', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('hashchange', handleStorageChange);
    };
  }, []);

  const orderState: OrderState = {
    isTransacting: Boolean(isTransactionActive || currentPlan || currentTemplate),
    hasPlan: Boolean(currentPlan),
    planName: currentPlan?.name,
    hasTemplate: Boolean(currentTemplate),
    templateName: currentTemplate?.name,
    step: (currentPlan && currentTemplate) ? 3 : currentPlan ? 2 : 1,
  };

  const handleNavigateStep = (step: 1 | 2 | 3) => {
    if (step === 1) {
      const el = document.getElementById('harga');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else window.location.hash = '#harga';
    } else if (step === 2) {
      const el = document.getElementById('template');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else window.location.hash = '#template';
    } else if (step === 3) {
      if (currentPlan && currentTemplate) {
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
    try {
      sessionStorage.setItem('ij_selected_plan', JSON.stringify(selectedObj));
      sessionStorage.setItem('ij_transaction_active', 'true');
    } catch {}
    setCurrentPlan(selectedObj);
    setIsTransactionActive(true);

    // Jika template sudah dipilih sebelumnya, langsung lanjutkan ke pembayaran
    if (currentTemplate) {
      setSelectedTemplateNotice({
        message: `${selectedObj.name} dipilih! Menuju formulir rincian pembayaran...`,
        type: 'success',
      });
      setTimeout(() => {
        setSelectedTemplateNotice(null);
        if (onSelectTemplate) {
          onSelectTemplate(currentTemplate.id);
        } else {
          window.location.hash = '#/pembayaran';
        }
      }, 700);
    } else {
      // Jika template belum dipilih, arahkan ke section template di Landing Page
      setSelectedTemplateNotice({
        message: `${selectedObj.name} berhasil dipilih! Silakan pilih desain template undangan di bawah ini.`,
        type: 'success',
      });
      setTimeout(() => {
        setSelectedTemplateNotice(null);
        if (onSelectPlan) {
          onSelectPlan(planId);
        } else {
          const el = document.getElementById('template');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
          else window.location.hash = '#template';
        }
      }, 800);
    }
  };

  const handleUseTemplate = (template: TemplateItem) => {
    // ATURAN WAJIB: User harus memilih paket harga terlebih dahulu
    const hasPlan = sessionStorage.getItem('ij_selected_plan');
    if (!hasPlan) {
      setSelectedTemplateNotice({
        message: 'Silakan pilih Paket Harga terlebih dahulu sebelum menentukan template!',
        type: 'warning',
      });
      setTimeout(() => {
        setSelectedTemplateNotice(null);
        const el = document.getElementById('harga');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.location.hash = '#harga';
        }
      }, 900);
      return;
    }

    const targetTmplId = template.id === 't1' ? 'rustic-blossom' : 'dusty-rose';
    const tmplObj = targetTmplId === 'rustic-blossom'
      ? {
          id: 'rustic-blossom',
          name: 'Rustic Blossom (Template 1)',
          category: 'Elegan & Mewah',
          tag: 'Burgundy & Gold',
          previewRoute: 'template-satu',
          image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
          desc: 'Desain anggun dengan ornamen botani berkelas, perpaduan warna burgundy mewah dan sentuhan emas.',
          badgeText: 'FAVORIT',
        }
      : {
          id: 'dusty-rose',
          name: 'Dusty Rose Lily (Template 2)',
          category: 'Romantis & Manis',
          tag: 'Soft Pastel Floral',
          previewRoute: 'template-dua',
          image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80',
          desc: 'Nuansa bunga lily merah muda dan sentuhan modern minimalis yang memancarkan kehangatan cinta.',
          badgeText: 'ROMANTIS',
        };

    try {
      sessionStorage.setItem('ij_selected_template', JSON.stringify(tmplObj));
      sessionStorage.setItem('ij_transaction_active', 'true');
    } catch {}
    setCurrentTemplate(tmplObj);
    setIsTransactionActive(true);

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
  };

  const handleUseAtmCard = () => {
    // ATURAN WAJIB: User harus memilih paket harga terlebih dahulu
    const hasPlan = sessionStorage.getItem('ij_selected_plan');
    if (!hasPlan) {
      setSelectedTemplateNotice({
        message: 'Silakan pilih Paket Harga terlebih dahulu sebelum menentukan template!',
        type: 'warning',
      });
      setTimeout(() => {
        setSelectedTemplateNotice(null);
        const el = document.getElementById('harga');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.location.hash = '#harga';
        }
      }, 900);
      return;
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

    try {
      sessionStorage.setItem('ij_selected_template', JSON.stringify(atmObj));
      sessionStorage.setItem('ij_transaction_active', 'true');
    } catch {}
    setCurrentTemplate(atmObj);
    setIsTransactionActive(true);

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
