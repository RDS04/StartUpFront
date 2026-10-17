import React, { useState, useMemo, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import type { DashboardTab, DashboardData, GuestItem, WishItem, TierConfig, DashboardPageProps } from './types';
import { INITIAL_GUESTS, INITIAL_WISHES, getSavedDashboardData, saveDashboardData } from './initialData';
import { getMyOrders } from '../services/orderService';

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
  onPreviewTemplate: _onPreviewTemplate,
}) => {
  // Main Navigation & Active Tab
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');

  // User ID or Email scoping key
  const userKey = currentUser?.id || currentUser?.email;

  // Main Dashboard State (disimpan dan dibaca dari localStorage berdasar akun user)
  const [data, setData] = useState<DashboardData>(() => getSavedDashboardData(userKey));
  const [guests, setGuests] = useState<GuestItem[]>(INITIAL_GUESTS);
  const [wishes, setWishes] = useState<WishItem[]>(INITIAL_WISHES);

  // Sync data ke localStorage setiap ada perubahan
  useEffect(() => {
    saveDashboardData(data, userKey);
  }, [data, userKey]);

  // Reload data jika akun user berubah
  useEffect(() => {
    setData(getSavedDashboardData(userKey));
  }, [userKey]);

  // Deteksi dan sinkronkan paket yang dipilih dari sessionStorage atau pesanan user di backend
  useEffect(() => {
    let chosenTier: 'silver' | 'premium' | 'gold' | 'platinum' | null = null;

    // 1. Cek dari sessionStorage ij_selected_plan
    try {
      const rawPlan = sessionStorage.getItem('ij_selected_plan');
      if (rawPlan) {
        const parsed = JSON.parse(rawPlan);
        const planId = parsed?.id?.toLowerCase();
        if (planId === 'silver' || planId === 'gold' || planId === 'platinum' || planId === 'premium') {
          chosenTier = planId;
        }
      }
    } catch {}

    // 2. Cek juga dari riwayat pesanan (getMyOrders) jika user sudah pernah checkout
    getMyOrders().then((orders) => {
      if (orders && orders.length > 0) {
        const validOrder = orders.find((o) => o.status === 'paid') || orders[0];
        if (validOrder?.plan_name) {
          const lower = validOrder.plan_name.toLowerCase();
          if (lower.includes('silver')) chosenTier = 'silver';
          else if (lower.includes('platinum')) chosenTier = 'platinum';
          else if (lower.includes('premium')) chosenTier = 'premium';
          else if (lower.includes('gold')) chosenTier = 'gold';
        }
      }

      if (chosenTier) {
        setData((prev) => {
          if (prev.tier !== chosenTier) {
            const updated = { ...prev, tier: chosenTier! };
            saveDashboardData(updated, userKey);
            return updated;
          }
          return prev;
        });
      }
    }).catch(() => {
      if (chosenTier) {
        setData((prev) => {
          if (prev.tier !== chosenTier) {
            const updated = { ...prev, tier: chosenTier! };
            saveDashboardData(updated, userKey);
            return updated;
          }
          return prev;
        });
      }
    });
  }, [userKey]);

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
      case 'platinum':
        return {
          name: 'Platinum (Full VIP)',
          tierId: 'platinum',
          maxGuests: 9999,
          canCustomMusic: true,
          canExport: true,
          maxBank: 5,
          badge: 'bg-purple-100 text-purple-800 border-purple-300',
          badgeColor: 'text-purple-800',
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
        tierConfig={tierConfig}
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
          activeTemplateId={data.activeTemplateId}
          currentUser={currentUser}
          onNavigateTemplates={onNavigateTemplates}
          onNavigatePricing={onNavigatePricing}
          onNavigatePayment={onNavigatePayment}
          onPreviewTemplate={() => {
            setPreviewGuestName('Tamu Terhormat');
            setShowMobilePreview(true);
          }}
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