import { useState, useEffect } from 'react';
import { LandingPage } from './landingPage';
import { AuthPage } from './auth';
import { RusticBlossomTemplate } from './tempalte/satu/main';
import { DustyRoseTemplate } from './tempalte/dua/main';
import { CardAtmPreviewPage } from './tempalte/CardAtm/CardAtmPreviewPage';
import { ArrowLeft, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getSavedAuthUser, fetchCurrentUser, logoutAuth, type AuthUser } from './services/authService';

type PageRoute = 'landing' | 'login' | 'register' | 'template-satu' | 'template-dua' | 'card-atm';

export function App() {
  const [route, setRoute] = useState<PageRoute>(() => {
    const hash = window.location.hash.toLowerCase();
    if (hash.includes('card-atm')) return 'card-atm';
    if (hash.includes('login')) return 'login';
    if (hash.includes('register')) return 'register';
    if (hash.includes('template-dua') || hash.includes('template/dua')) return 'template-dua';
    if (hash.includes('template-satu') || hash.includes('undangan') || hash.includes('template/satu')) return 'template-satu';
    return 'landing';
  });

  const [loggedInUser, setLoggedInUser] = useState<AuthUser | null>(() => getSavedAuthUser());
  const [showToast, setShowToast] = useState(false);

  // Hanya sinkronkan data profil dari backend tanpa memunculkan toast notifikasi
  useEffect(() => {
    fetchCurrentUser().then((user) => {
      if (user) setLoggedInUser(user);
    });
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('card-atm')) {
        setRoute('card-atm');
      } else if (hash.includes('login')) {
        setRoute('login');
      } else if (hash.includes('register')) {
        setRoute('register');
      } else if (hash.includes('template-dua') || hash.includes('template/dua')) {
        setRoute('template-dua');
      } else if (hash.includes('template-satu') || hash.includes('undangan') || hash.includes('template/satu')) {
        setRoute('template-satu');
      } else if (hash === '' || hash === '#' || hash.startsWith('#/') || hash.startsWith('#')) {
        if (!hash.includes('login') && !hash.includes('register') && !hash.includes('template-') && !hash.includes('card-atm')) {
          setRoute('landing');
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (newRoute: PageRoute) => {
    setRoute(newRoute);
    if (newRoute === 'landing') {
      window.location.hash = '#/';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.hash = `#/${newRoute}`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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
        <DustyRoseTemplate />
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
        <RusticBlossomTemplate />
      </div>
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
          navigateTo('landing');
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
        onNavigateAuth={(mode) => navigateTo(mode)} 
        onNavigateCardAtm={() => navigateTo('card-atm')}
      />
    </>
  );
}

export default App;

