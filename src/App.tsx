import { useState, useEffect } from 'react';
import { LandingPage } from './landingPage';
import { AuthPage } from './auth';
import { RusticBlossomTemplate } from './tempalte/satu/main';
import { DustyRoseTemplate } from './tempalte/dua/main';
import { MinangMaroonTemplate } from './tempalte/tiga/main';
import { SageBlossomTemplate } from './tempalte/empat/main';
import { WisudaSatuTemplate, WisudaDuaTemplate } from './tempalte/Wisuda';
import { CardAtmPreviewPage } from './tempalte/CardAtm/CardAtmPreviewPage';
import { OrderFlowPage } from './order/OrderFlowPage';
import { DashboardPage } from './dashboard/DashboardPage';
import { ArrowLeft, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getSavedAuthUser, getAuthToken, fetchCurrentUser, logoutAuth, type AuthUser } from './services/authService';
import { GlobalLoadingOverlay } from './components/common/LottieLoader';
import { getSavedDashboardData } from './dashboard/initialData';

type PageRoute = 
  | 'landing' 
  | 'login' 
  | 'register' 
  | 'dashboard'
  | 'pilih-paket' 
  | 'pilih-template' 
  | 'pembayaran' 
  | 'order-flow' 
  | 'template-satu' 
  | 'template-dua' 
  | 'template-tiga' 
  | 'template-empat' 
  | 'card-atm'
  | 'wisuda-satu'
  | 'wisuda-dua'
  | 'invitation';

function resolveCurrentRoute(): PageRoute {
  const hash = window.location.hash.toLowerCase();
  const search = window.location.search.toLowerCase();
  const pathname = window.location.pathname.toLowerCase();

  if (search.includes('order_id') || search.includes('payment_finish') || search.includes('transaction_status')) return 'pembayaran';
  if (hash.includes('dashboard')) return 'dashboard';
  if (hash.includes('pembayaran') || hash.includes('bayar') || hash.includes('checkout') || hash.includes('rincian-biaya')) return 'pembayaran';
  if (hash.includes('card-atm')) return 'card-atm';
  if (hash.includes('wisuda-dua') || hash.includes('wisuda-2') || hash.includes('yolanda')) return 'wisuda-dua';
  if (hash.includes('wisuda') || hash.includes('template-wisuda')) return 'wisuda-satu';
  if (hash.includes('login')) return 'login';
  if (hash.includes('register')) return 'register';
  if (hash.includes('template-empat') || hash.includes('template/empat') || hash.includes('sage')) return 'template-empat';
  if (hash.includes('template-tiga') || hash.includes('template/tiga')) return 'template-tiga';
  if (hash.includes('template-dua') || hash.includes('template/dua')) return 'template-dua';
  if (hash.includes('template-satu') || hash.includes('undangan') || hash.includes('template/satu')) return 'template-satu';

  // Landing page scroll sections
  if (hash.includes('pilih-template') || hash.includes('template-select') || hash.includes('pilihan-template') || hash.includes('desain-template') || hash === '#template') return 'landing';
  if (hash.includes('pilih-paket') || hash.includes('harga') || hash.includes('pricing') || hash.includes('order-flow') || hash === '#harga') return 'landing';

  // Check if hash is an invitation slug (e.g. #/andi-rosna or #/andi-rosna?to=Budi)
  const cleanHash = hash.replace(/^#\/?/, '').split('?')[0].trim();
  if (cleanHash && !['', '/', 'landing'].includes(cleanHash)) {
    return 'invitation';
  }

  // Check if pathname is an invitation slug (e.g. /andi-rosna)
  const cleanPath = pathname.replace(/^\//, '').split('?')[0].trim();
  if (cleanPath && !['', 'landing', 'index.html'].includes(cleanPath)) {
    return 'invitation';
  }

  return 'landing';
}

export function App() {
  const [route, setRoute] = useState<PageRoute>(() => resolveCurrentRoute());

  const [loggedInUser, setLoggedInUser] = useState<AuthUser | null>(() => getSavedAuthUser());
  const [showToast, setShowToast] = useState(false);

  // Sinkronkan data profil dari backend dan perbarui state autentikasi
  useEffect(() => {
    fetchCurrentUser().then((user) => {
      setLoggedInUser(user);
    }).catch(() => {
      setLoggedInUser(null);
    });
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const detected = resolveCurrentRoute();
      setRoute(detected);

      const hash = window.location.hash.toLowerCase();
      if (hash.includes('pilih-template') || hash.includes('template-select') || hash.includes('pilihan-template') || hash.includes('desain-template')) {
        setTimeout(() => {
          const el = document.getElementById('template');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else if (hash.includes('pilih-paket') || hash.includes('harga') || hash.includes('pricing') || hash.includes('order-flow')) {
        setTimeout(() => {
          const el = document.getElementById('harga');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  // Sinkronkan hash awal jika mengarah ke harga atau template
  useEffect(() => {
    const hash = window.location.hash.toLowerCase();
    if (hash.includes('pilih-paket') || hash.includes('harga') || hash.includes('pricing') || hash.includes('order-flow')) {
      setTimeout(() => {
        const el = document.getElementById('harga');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 250);
    } else if (hash.includes('pilih-template') || hash.includes('template-select') || hash.includes('pilihan-template') || hash.includes('desain-template')) {
      setTimeout(() => {
        const el = document.getElementById('template');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 250);
    }
  }, []);

  const navigateTo = (newRoute: PageRoute) => {
    if (newRoute === 'pilih-paket' || newRoute === 'order-flow') {
      setRoute('landing');
      window.location.hash = '#harga';
      setTimeout(() => {
        const el = document.getElementById('harga');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    if (newRoute === 'pilih-template') {
      setRoute('landing');
      window.location.hash = '#template';
      setTimeout(() => {
        const el = document.getElementById('template');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    setRoute(newRoute);
    if (newRoute === 'landing') {
      window.location.hash = '#/';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (newRoute === 'invitation') {
      const dashData = getSavedDashboardData();
      window.location.hash = `#/${dashData.slug}`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.hash = `#/${newRoute}`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // RENDER DYNAMIC INVITATION TEMPLATE (Localhost domain: /#/:slug)
  if (route === 'invitation') {
    const dashData = getSavedDashboardData();
    const activeTemplate = dashData.activeTemplateId || 'template-empat';

    const backButton = (
      <div className="fixed top-4 left-4 z-[70]">
        <button
          onClick={() => navigateTo('dashboard')}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900/85 text-white border border-white/20 shadow-xl hover:bg-stone-900 hover:scale-105 transition-all text-xs font-semibold backdrop-blur-md cursor-pointer group"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#D4AF37] group-hover:-translate-x-1 transition-transform" />
          <span>Dashboard Mempelai</span>
        </button>
      </div>
    );

    if (activeTemplate === 'template-satu') {
      return (
        <div className="relative min-h-screen bg-[#180407]">
          {backButton}
          <RusticBlossomTemplate isPreview={false} />
        </div>
      );
    }
    if (activeTemplate === 'template-dua') {
      return (
        <div className="relative min-h-screen bg-[#7e5f62]">
          {backButton}
          <DustyRoseTemplate isPreview={false} />
        </div>
      );
    }
    if (activeTemplate === 'template-tiga') {
      return (
        <div className="relative min-h-screen bg-[#200306]">
          {backButton}
          <MinangMaroonTemplate isPreview={false} />
        </div>
      );
    }
    if (activeTemplate === 'card-atm') {
      return (
        <div className="relative min-h-screen">
          {backButton}
          <CardAtmPreviewPage onBack={() => navigateTo('dashboard')} />
        </div>
      );
    }
    if (activeTemplate === 'wisuda-satu') {
      return (
        <div className="relative min-h-screen">
          {backButton}
          <WisudaSatuTemplate onBack={() => navigateTo('dashboard')} />
        </div>
      );
    }
    if (activeTemplate === 'wisuda-dua') {
      return (
        <div className="relative min-h-screen">
          {backButton}
          <WisudaDuaTemplate onBack={() => navigateTo('dashboard')} />
        </div>
      );
    }

    // Default template-empat (Sage Blossom)
    return (
      <div className="relative min-h-screen bg-[#1e2a20]">
        {backButton}
        <SageBlossomTemplate isPreview={false} />
      </div>
    );
  }

  if (route === 'dashboard') {
    const savedUser = getSavedAuthUser();
    const token = getAuthToken();

    // AUTH GUARD: Jika belum login atau token tidak ada, wajib login terlebih dahulu
    if (!token || (!loggedInUser && !savedUser)) {
      return (
        <AuthPage
          initialMode="login"
          initialAlert="Akses Terbatas: Silakan masuk ke akun Anda terlebih dahulu untuk mengakses Dashboard Pengguna. Jika belum memiliki akun atau akun Google belum terdaftar, silakan daftar terlebih dahulu."
          onBackToHome={() => navigateTo('landing')}
          onAuthSuccess={(user) => {
            setLoggedInUser(user);
            setShowToast(true);
            setTimeout(() => {
              setShowToast(false);
            }, 4000);
            navigateTo('dashboard');
          }}
        />
      );
    }

    return (
      <DashboardPage
        currentUser={loggedInUser || savedUser}
        onLogout={async () => {
          await logoutAuth();
          setLoggedInUser(null);
          navigateTo('login');
        }}
        onBackToHome={() => navigateTo('landing')}
        onNavigatePricing={() => navigateTo('pilih-paket')}
        onNavigateTemplates={() => navigateTo('pilih-template')}
        onNavigatePayment={() => navigateTo('pembayaran')}
        onPreviewTemplate={(previewRoute) => navigateTo(previewRoute as PageRoute)}
      />
    );
  }

  if (route === 'card-atm') {
    return <CardAtmPreviewPage onBack={() => navigateTo('landing')} />;
  }

  if (route === 'template-dua') {
    return (
      <div className="relative min-h-screen bg-[#7e5f62]">
        <div className="fixed top-4 left-4 z-[60]">
          <button
            onClick={() => navigateTo('landing')}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#57514f]/90 text-white border border-white/30 shadow-[0_4px_25px_rgba(0,0,0,0.4)] hover:bg-[#3f3a38] hover:scale-105 transition-all text-xs font-semibold backdrop-blur-md cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Kembali ke Platform</span>
          </button>
        </div>
        <DustyRoseTemplate isPreview={true} />
      </div>
    );
  }

  if (route === 'template-tiga') {
    return (
      <div className="relative min-h-screen bg-[#200306]">
        {/* Floating Top Back Banner */}
        <div className="fixed top-4 left-4 z-[60]">
          <button
            onClick={() => navigateTo('landing')}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#4a0910]/90 text-[#f5ecd2] border border-[#cfa84a]/50 shadow-[0_4px_25px_rgba(0,0,0,0.6)] hover:bg-[#36050b] hover:scale-105 transition-all text-xs font-semibold backdrop-blur-md cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 text-[#cfa84a] group-hover:-translate-x-1 transition-transform" />
            <span>Kembali ke Platform</span>
          </button>
        </div>
        <MinangMaroonTemplate isPreview={true} />
      </div>
    );
  }

  if (route === 'template-empat') {
    return (
      <div className="relative min-h-screen bg-[#1e2a20]">
        {/* Floating Top Back Banner */}
        <div className="fixed top-4 left-4 z-[60]">
          <button
            onClick={() => navigateTo('landing')}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#2f4031]/90 text-[#f5f8f1] border border-[#8f9e7b]/50 shadow-[0_4px_25px_rgba(0,0,0,0.6)] hover:bg-[#243326] hover:scale-105 transition-all text-xs font-semibold backdrop-blur-md cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 text-[#c5a454] group-hover:-translate-x-1 transition-transform" />
            <span>Kembali ke Platform</span>
          </button>
        </div>
        <SageBlossomTemplate isPreview={true} />
      </div>
    );
  }

  if (route === 'template-satu') {
    return (
      <div className="relative min-h-screen bg-[#180407]">
        {/* Floating Top Back Banner */}
        <div className="fixed top-4 left-4 z-50">
          <button
            onClick={() => navigateTo('landing')}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#2E0B12]/90 text-[#F3E5AB] border border-[#D4AF37]/50 shadow-[0_4px_25px_rgba(0,0,0,0.6)] hover:bg-[#48121E] hover:scale-105 transition-all text-xs font-semibold backdrop-blur-md cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 text-[#D4AF37] group-hover:-translate-x-1 transition-transform" />
            <span>Kembali ke Platform</span>
          </button>
        </div>
        <RusticBlossomTemplate isPreview={true} />
      </div>
    );
  }

  if (route === 'wisuda-satu') {
    return (
      <WisudaSatuTemplate onBack={() => navigateTo('landing')} />
    );
  }

  if (route === 'wisuda-dua') {
    return (
      <WisudaDuaTemplate onBack={() => navigateTo('landing')} />
    );
  }

  if (route === 'pembayaran') {
    return (
      <OrderFlowPage
        currentUser={loggedInUser}
        activeStep={3}
        onStepChange={(newStep) => {
          if (newStep === 1) navigateTo('pilih-template');
          else if (newStep === 2) navigateTo('pilih-paket');
          else if (newStep === 3) navigateTo('pembayaran');
        }}
        onChangePlan={() => navigateTo('pilih-paket')}
        onChangeTemplate={() => navigateTo('pilih-template')}
        onBackToHome={() => navigateTo('landing')}
        onPreviewTemplate={(previewRoute) => navigateTo(previewRoute)}
      />
    );
  }

  if (route === 'login' || route === 'register') {
    return (
      <AuthPage
        initialMode={route}
        onBackToHome={() => navigateTo('landing')}
        onAuthSuccess={(user) => {
          setLoggedInUser(user);
          setShowToast(true);
          setTimeout(() => {
            setShowToast(false);
          }, 4000);

          // Jika user login biasa, arahkan langsung ke Dashboard
          const isTransaction = sessionStorage.getItem('ij_transaction_active') === 'true';
          if (route === 'login' || !isTransaction) {
            navigateTo('dashboard');
          } else {
            navigateTo('landing');
            setTimeout(() => {
              const el = document.getElementById('template');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              } else {
                window.location.hash = '#template';
              }
            }, 150);
          }
        }}
      />
    );
  }

  return (
    <>
      <AnimatePresence>
        {loggedInUser && showToast && (
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.95, transition: { duration: 0.3 } }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="fixed bottom-6 right-6 z-50 bg-emerald-900/95 backdrop-blur-md text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-emerald-600/40 flex items-center gap-3.5"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-700/80 border-2 border-emerald-400/40 flex items-center justify-center font-bold text-sm uppercase overflow-hidden shrink-0 shadow-inner">
              {loggedInUser.avatar ? (
                <img
                  src={loggedInUser.avatar}
                  alt={loggedInUser.name || loggedInUser.email}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span>{(loggedInUser.name || loggedInUser.email)[0]}</span>
              )}
            </div>
            <div className="max-w-[220px]">
              <div className="text-[11px] font-semibold text-emerald-300/90 leading-tight">Sedang login sebagai:</div>
              <div className="text-sm font-extrabold text-white truncate">
                {loggedInUser.name || loggedInUser.email}
              </div>
              {loggedInUser.name && loggedInUser.email && (
                <div className="text-[11px] text-emerald-200/70 truncate">
                  {loggedInUser.email}
                </div>
              )}
            </div>
            <button
              onClick={async () => {
                await logoutAuth();
                setLoggedInUser(null);
                setShowToast(false);
                try {
                  sessionStorage.removeItem('ij_transaction_active');
                  sessionStorage.removeItem('ij_selected_plan');
                  sessionStorage.removeItem('ij_selected_template');
                } catch {}
              }}
              className="ml-2 px-2.5 py-1 rounded-lg bg-emerald-800/80 hover:bg-rose-600 text-xs text-emerald-100 hover:text-white transition-colors cursor-pointer border border-emerald-700/60 font-semibold"
            >
              Keluar
            </button>
            <button
              onClick={() => setShowToast(false)}
              className="p-1 rounded-md text-emerald-300/80 hover:text-white hover:bg-emerald-800/60 transition-colors cursor-pointer"
              title="Tutup notifikasi"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <LandingPage 
        currentUser={loggedInUser}
        onLogout={async () => {
          await logoutAuth();
          setLoggedInUser(null);
          try {
            sessionStorage.removeItem('ij_transaction_active');
            sessionStorage.removeItem('ij_selected_plan');
            sessionStorage.removeItem('ij_selected_template');
          } catch {}
        }}
        onNavigateDashboard={() => {
          // Ketika user membuka dashboard, mode wizard transaksi dinonaktifkan
          try {
            sessionStorage.removeItem('ij_transaction_active');
          } catch {}
          navigateTo('dashboard');
        }}
        onNavigateAuth={(mode) => navigateTo(mode)} 
        onNavigateCardAtm={() => navigateTo('card-atm')}
        onSelectPlan={(_planId) => {
          try {
            sessionStorage.setItem('ij_transaction_active', 'true');
          } catch {}
          const rawTmpl = sessionStorage.getItem('ij_selected_template');
          if (rawTmpl) {
            navigateTo('pembayaran');
          } else {
            const el = document.getElementById('template');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
            else window.location.hash = '#template';
          }
        }}
        onSelectTemplate={(_templateId) => {
          try {
            sessionStorage.setItem('ij_transaction_active', 'true');
          } catch {}
          const rawPlan = sessionStorage.getItem('ij_selected_plan');
          if (rawPlan) {
            navigateTo('pembayaran');
          } else {
            const el = document.getElementById('harga');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
            else window.location.hash = '#harga';
          }
        }}
      />

      {/* Global Lottie Loading Animation Overlay */}
      <GlobalLoadingOverlay />
    </>
  );
}

export default App;


