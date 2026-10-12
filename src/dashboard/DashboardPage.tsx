import React, { useState, useMemo } from 'react';
import { Sparkles } from 'lucide-react';
import type { DashboardTab, DashboardData, GuestItem, WishItem, TierConfig, DashboardPageProps } from './types';
import { INITIAL_DATA, INITIAL_GUESTS, INITIAL_WISHES } from './initialData';

// Sub Components
import { DashboardNavbar } from './components/DashboardNavbar';
import { DashboardSidebar } from './components/DashboardSidebar';
import { AddGuestModal } from './components/AddGuestModal';
import { QrCodeModal } from './components/QrCodeModal';
import { MobilePreviewModal } from './components/MobilePreviewModal';

// Tab Sections
import { OverviewSection } from './sections/OverviewSection';
import { BrideEventSection } from './sections/BrideEventSection';
import { GuestsSection } from './sections/GuestsSection';
import { RsvpWishesSection } from './sections/RsvpWishesSection';
import { AccountsSection } from './sections/AccountsSection';

export const DashboardPage: React.FC<DashboardPageProps> = ({
  currentUser,
  onLogout,
  onBackToHome,
  onNavigatePricing,
  onNavigateTemplates,
  onNavigatePayment,
  onPreviewTemplate,
}) => {
  // Main Navigation & Active Tab
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');

  // Main Dashboard State
  const [data, setData] = useState<DashboardData>(INITIAL_DATA);
  const [guests, setGuests] = useState<GuestItem[]>(INITIAL_GUESTS);
  const [wishes, setWishes] = useState<WishItem[]>(INITIAL_WISHES);

  // Modal Dialogs & Simulator State
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [showAddGuestModal, setShowAddGuestModal] = useState(false);
  const [previewGuestName, setPreviewGuestName] = useState('Tamu Terhormat');

  // Toast Notification Message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const copyToClipboard = (text: string, label = 'Tautan berhasil disalin!') => {
    navigator.clipboard?.writeText(text);
    showToast(label);
  };

  // Tier Limits & Features Calculation
  const tierConfig: TierConfig = useMemo(() => {
    switch (data.tier) {
      case 'silver':
        return {
          name: 'Silver (Hemat)',
          tierId: 'silver',
          maxGuests: 50,
          canCustomMusic: false,
          canExport: false,
          maxBank: 1,
          badge: 'bg-stone-100 text-stone-700 border-stone-300',
          badgeColor: 'text-stone-700',
        };
      case 'gold':
        return {
          name: 'Gold (VIP)',
          tierId: 'gold',
          maxGuests: 9999,
          canCustomMusic: true,
          canExport: true,
          maxBank: 5,
          badge: 'bg-amber-100 text-amber-800 border-amber-300',
          badgeColor: 'text-amber-800',
        };
      case 'premium':
      default:
        return {
          name: 'Premium (Best Value)',
          tierId: 'premium',
          maxGuests: 250,
          canCustomMusic: true,
          canExport: false,
          maxBank: 2,
          badge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          badgeColor: 'text-emerald-800',
        };
    }
  }, [data.tier]);

  // Statistics Calculation
  const stats = useMemo(() => {
    const hadir = guests
      .filter((g) => g.rsvp === 'hadir')
      .reduce((acc, curr) => acc + (curr.pax || 1), 0);
    const tidak = guests.filter((g) => g.rsvp === 'tidak').length;
    const menunggu = guests.filter((g) => g.rsvp === 'menunggu' || g.rsvp === 'ragu').length;
    return { hadir, tidak, menunggu, totalWishes: wishes.length };
  }, [guests, wishes]);

  // Add Guest Handler
  const handleAddGuest = ({
    name,
    phone,
    category,
  }: {
    name: string;
    phone: string;
    category: string;
  }) => {
    if (guests.length >= tierConfig.maxGuests) {
      showToast(`Batas kuota tamu untuk paket ${tierConfig.name} sudah tercapai!`);
      return;
    }
    const newGuest: GuestItem = {
      id: Date.now(),
      name,
      phone,
      category,
      sent: false,
      rsvp: 'menunggu',
      pax: 0,
    };
    setGuests([newGuest, ...guests]);
    setShowAddGuestModal(false);
    showToast(`Tamu "${newGuest.name}" berhasil ditambahkan!`);
  };

  const handlePreviewAsGuest = (guestName: string) => {
    setPreviewGuestName(guestName);
    setShowMobilePreview(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-stone-800 flex flex-col font-sans selection:bg-[#D4AF37]/20 selection:text-stone-900">
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center space-x-3 text-xs sm:text-sm font-semibold border border-stone-700 animate-in fade-in slide-in-from-bottom-3">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation Bar */}
      <DashboardNavbar
        data={data}
        currentUser={currentUser}
        onTierChange={(newTier) => {
          setData({ ...data, tier: newTier });
          showToast(`Paket beralih ke: ${newTier.toUpperCase()}`);
        }}
        onOpenPreview={() => {
          setPreviewGuestName('Tamu Terhormat');
          setShowMobilePreview(true);
        }}
        onBackToHome={onBackToHome}
        onLogout={onLogout}
      />

      {/* Main Content Layout Container */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto p-4 sm:p-6 gap-6">
        {/* Sidebar Nav & Status Quota */}
        <DashboardSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tierConfig={tierConfig}
          guestCount={guests.length}
          onNavigateTemplates={onNavigateTemplates}
          onNavigatePricing={onNavigatePricing}
          onNavigatePayment={onNavigatePayment}
          onPreviewTemplate={onPreviewTemplate}
        />

        {/* Dynamic Section Canvas */}
        <main className="flex-1 bg-white rounded-3xl border border-stone-200 shadow-xs p-4 sm:p-7 min-w-0">
          {activeTab === 'overview' && (
            <OverviewSection
              data={data}
              guests={guests}
              wishes={wishes}
              tierConfig={tierConfig}
              stats={stats}
              onCopyLink={copyToClipboard}
              onOpenQrModal={() => setShowQrModal(true)}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'bride_event' && (
            <BrideEventSection
              data={data}
              setData={setData}
              tierConfig={tierConfig}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'guests' && (
            <GuestsSection
              data={data}
              guests={guests}
              setGuests={setGuests}
              tierConfig={tierConfig}
              onOpenAddGuestModal={() => setShowAddGuestModal(true)}
              onPreviewAsGuest={handlePreviewAsGuest}
              onCopyLink={copyToClipboard}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'rsvps' && (
            <RsvpWishesSection
              wishes={wishes}
              setWishes={setWishes}
              stats={stats}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'accounts' && (
            <AccountsSection
              data={data}
              setData={setData}
              tierConfig={tierConfig}
              onCopyText={copyToClipboard}
              onShowToast={showToast}
            />
          )}
        </main>
      </div>

      {/* Add Guest Modal */}
      <AddGuestModal
        isOpen={showAddGuestModal}
        onClose={() => setShowAddGuestModal(false)}
        onAddGuest={handleAddGuest}
      />

      {/* QR Code Quick Modal */}
      <QrCodeModal
        isOpen={showQrModal}
        onClose={() => setShowQrModal(false)}
        slug={data.slug}
        onCopyLink={copyToClipboard}
      />

      {/* Interactive Mobile Smartphone Simulator */}
      <MobilePreviewModal
        isOpen={showMobilePreview}
        onClose={() => setShowMobilePreview(false)}
        data={data}
        guestName={previewGuestName}
        onCopyText={copyToClipboard}
      />
    </div>
  );
};

export default DashboardPage;