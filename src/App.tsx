import { useState, useEffect } from 'react';
import { LandingPage } from './landingPage';
import { AuthPage } from './auth';
import { RusticBlossomTemplate } from './tempalte/satu/main';
import { DustyRoseTemplate } from './tempalte/dua/main';
import { CardAtmPreviewPage } from './tempalte/CardAtm/CardAtmPreviewPage';
import { ArrowLeft } from 'lucide-react';

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

  const [loggedInUser, setLoggedInUser] = useState<{ name?: string; email: string } | null>(null);

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
          navigateTo('landing');
        }}
      />
    );
  }

  return (
    <>
      {loggedInUser && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-emerald-700/50 flex items-center gap-3 animate-in slide-in-from-bottom duration-300">
          <div className="w-8 h-8 rounded-full bg-emerald-700 flex items-center justify-center font-bold text-xs uppercase">
            {(loggedInUser.name || loggedInUser.email)[0]}
          </div>
          <div>
            <div className="text-xs font-semibold text-emerald-200">Sedang login sebagai:</div>
            <div className="text-sm font-bold">{loggedInUser.name || loggedInUser.email}</div>
          </div>
          <button
            onClick={() => setLoggedInUser(null)}
            className="ml-3 text-xs text-emerald-300 hover:text-white underline cursor-pointer"
          >
            Keluar
          </button>
        </div>
      )}
      <LandingPage 
        onNavigateAuth={(mode) => navigateTo(mode)} 
        onNavigateCardAtm={() => navigateTo('card-atm')}
      />
    </>
  );
}

export default App;

