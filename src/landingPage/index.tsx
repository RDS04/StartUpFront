import { useState } from 'react';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { TrustBar } from './TrustBar';
import { Features } from './Features';
import { TemplateSection, type TemplateItem } from './TemplateSection';
import { HowItWorks } from './HowItWorks';
import { PricingSection } from './PricingSection';
import { PaymentInfoSection } from './PaymentInfoSection';
import { Testimonials } from './Testimonials';
import { FaqSection } from './FaqSection';
import { Footer } from './Footer';
import { DynamicConfettiAndShadows, BotanicalLeaves } from './DecorativeBackground';
import { PreviewModal } from './PreviewModal';
import { Check } from 'lucide-react';

interface LandingPageProps {
  onNavigateAuth?: (mode: 'login' | 'register') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigateAuth }) => {
  const [previewTemplate, setPreviewTemplate] = useState<TemplateItem | null>(null);
  const [selectedTemplateNotice, setSelectedTemplateNotice] = useState<string | null>(null);

  const handleUseTemplate = (template: TemplateItem) => {
    setSelectedTemplateNotice(`Anda memilih template "${template.title}" (${template.badge}). Mengalihkan ke editor undangan...`);
    setTimeout(() => {
      setSelectedTemplateNotice(null);
    }, 4000);
  };

  return (
    <div className="relative min-h-screen bg-[#fafbfc] text-slate-800 font-sans selection:bg-emerald-700 selection:text-white overflow-hidden">
      
      {/* Top right botanical leaves border */}
      <BotanicalLeaves.TopRight />

      {/* Dynamic Window Sunlight Shadows, Gold Foil Splashes & Confetti */}
      <DynamicConfettiAndShadows />

      {/* Toast Notification when selecting template */}
      {selectedTemplateNotice && (
        <div className="fixed top-24 right-6 z-50 p-4 rounded-2xl bg-emerald-800 text-white text-xs font-semibold shadow-2xl flex items-center gap-3 animate-in slide-in-from-top duration-300">
          <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 text-white" />
          </div>
          <span>{selectedTemplateNotice}</span>
        </div>
      )}

      {/* Main Landing Page Structure */}
      <div className="relative z-10">
        <Navbar onOpenAuth={onNavigateAuth} />
        <main className="pt-20">
          <Hero />
          <TrustBar />
          <Features />
          <TemplateSection
            onPreview={(item) => setPreviewTemplate(item)}
            onUseTemplate={handleUseTemplate}
          />
          <HowItWorks />
          <PricingSection />
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
