import React, { useState, useMemo, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import type { DashboardTab, DashboardData, GuestItem, WishItem, TierConfig, DashboardPageProps } from './types';
import { getSavedDashboardData, saveDashboardData, getSavedGuests, saveGuests, getSavedWishes, saveWishes } from './initialData';
import { getMyOrders } from '../services/orderService';
import { getMyInvitation } from '../services/invitationService';
import { getGuests, createGuest } from '../services/guestService';
import { getMyWishes } from '../services/rsvpService';
import { normalizeTemplateId } from './templateHelpers';

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
import { GallerySection } from './sections/GallerySection';

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
  const [guests, setGuests] = useState<GuestItem[]>(() => getSavedGuests(userKey));
  const [isSavingGuest, setIsSavingGuest] = useState(false);
  const [wishes, setWishes] = useState<WishItem[]>(() => getSavedWishes(userKey));

  // Sync data ke localStorage setiap ada perubahan
  useEffect(() => {
    saveDashboardData(data, userKey);
  }, [data, userKey]);

  // Sync guests ke localStorage setiap ada perubahan
  useEffect(() => {
    saveGuests(guests, userKey);
  }, [guests, userKey]);

  // Sync wishes ke localStorage setiap ada perubahan
  useEffect(() => {
    saveWishes(wishes, userKey);
  }, [wishes, userKey]);

  // Reload data jika akun user berubah & sinkronkan dari database backend
  useEffect(() => {
    setData(getSavedDashboardData(userKey));

    getMyInvitation().then((serverData) => {
      if (serverData) {
        setData((prev) => {
          const merged: DashboardData = {
            ...prev,
            ...serverData,
            groom: { ...prev.groom, ...serverData.groom },
            bride: { ...prev.bride, ...serverData.bride },
            event: { ...prev.event, ...serverData.event },
            bankAccounts: serverData.bankAccounts?.length ? serverData.bankAccounts : prev.bankAccounts,
            giftAddress: {
              recipient: serverData.giftAddress?.recipient ?? prev.giftAddress?.recipient ?? '',
              phone: serverData.giftAddress?.phone ?? prev.giftAddress?.phone ?? '',
              address: serverData.giftAddress?.address ?? prev.giftAddress?.address ?? '',
              notes: serverData.giftAddress?.notes ?? prev.giftAddress?.notes ?? '',
            },
            gallery: Array.isArray(serverData.gallery) ? serverData.gallery : prev.gallery,
          };
          saveDashboardData(merged, userKey);
          return merged;
        });
      }
    }).catch(() => {});

    // Sinkronkan daftar tamu dari database backend
    getGuests().then((serverGuests) => {
      if (serverGuests && serverGuests.length > 0) {
        setGuests(serverGuests);
        saveGuests(serverGuests, userKey);
      }
    }).catch(() => {});

    // Sinkronkan ucapan doa & konfirmasi kehadiran buku tamu dari database backend
    getMyWishes().then((res) => {
      if (res && Array.isArray(res.wishes)) {
        setWishes(res.wishes);
        saveWishes(res.wishes, userKey);
      }
    }).catch(() => {});
  }, [userKey]);

  // Deteksi dan sinkronkan paket & template yang dipilih/dibeli dari sessionStorage atau pesanan user di backend
  useEffect(() => {
    let chosenTier: 'silver' | 'premium' | 'gold' | 'platinum' | null = null;
    let chosenTemplateId: string | null = null;

    // 1. Cek dari sessionStorage ij_selected_plan & ij_selected_template
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

    try {
      const rawTmpl = sessionStorage.getItem('ij_selected_template');
      if (rawTmpl) {
        const parsedTmpl = JSON.parse(rawTmpl);
        const tid = parsedTmpl?.previewRoute || parsedTmpl?.id;
        if (tid) {
          chosenTemplateId = normalizeTemplateId(tid);
        }
      }
    } catch {}

    // 2. Cek juga dari riwayat pesanan (getMyOrders) jika user sudah pernah checkout / bayar
    getMyOrders()
      .then((orders) => {
        let purchasedFromOrders: string[] = [];

        if (orders && orders.length > 0) {
          // Ambil pesanan yang berstatus 'paid', atau gunakan semua pesanan user
          const paidOrders = orders.filter((o) => o.status === 'paid');
          const orderPool = paidOrders.length > 0 ? paidOrders : orders;

          purchasedFromOrders = orderPool
            .map((o) => o.template_id || o.template_name)
            .filter(Boolean)
            .map((id) => normalizeTemplateId(id));

          const validOrder = orderPool[0];
          if (validOrder?.template_id || validOrder?.template_name) {
            const orderTpl = normalizeTemplateId(validOrder.template_id || validOrder.template_name);
            if (!chosenTemplateId) {
              chosenTemplateId = orderTpl;
            }
          }

          if (validOrder?.plan_name) {
            const lower = validOrder.plan_name.toLowerCase();
            if (lower.includes('silver')) chosenTier = 'silver';
            else if (lower.includes('platinum')) chosenTier = 'platinum';
            else if (lower.includes('premium')) chosenTier = 'premium';
            else if (lower.includes('gold')) chosenTier = 'gold';
          }
        }

        setData((prev) => {
          let hasChanges = false;
          const updated = { ...prev };

          if (chosenTier && updated.tier !== chosenTier) {
            updated.tier = chosenTier;
            hasChanges = true;
          }

          const currentPurchased = Array.isArray(prev.purchasedTemplateIds) ? prev.purchasedTemplateIds : [];
          const mergedList = [...currentPurchased, ...purchasedFromOrders];
          if (chosenTemplateId) mergedList.push(chosenTemplateId);
          const uniquePurchased = Array.from(new Set(mergedList.filter(Boolean)));

          if (uniquePurchased.length > currentPurchased.length) {
            updated.purchasedTemplateIds = uniquePurchased;
            hasChanges = true;
          }

          const effectiveTpl = chosenTemplateId || (uniquePurchased.length > 0 ? uniquePurchased[0] : null);
          if (
            effectiveTpl &&
            (!updated.activeTemplateId ||
              !uniquePurchased.includes(normalizeTemplateId(updated.activeTemplateId)) ||
              (chosenTemplateId && normalizeTemplateId(updated.activeTemplateId) !== chosenTemplateId))
          ) {
            updated.activeTemplateId = effectiveTpl;
            hasChanges = true;
          }

          if (hasChanges) {
            saveDashboardData(updated, userKey);
            return updated;
          }
          return prev;
        });
      })
      .catch(() => {
        setData((prev) => {
          let hasChanges = false;
          const updated = { ...prev };

          if (chosenTier && updated.tier !== chosenTier) {
            updated.tier = chosenTier;
            hasChanges = true;
          }

          if (chosenTemplateId) {
            const currentPurchased = Array.isArray(prev.purchasedTemplateIds) ? prev.purchasedTemplateIds : [];
            if (!currentPurchased.includes(chosenTemplateId)) {
              updated.purchasedTemplateIds = [...currentPurchased, chosenTemplateId];
              hasChanges = true;
            }
            if (normalizeTemplateId(updated.activeTemplateId) !== chosenTemplateId) {
              updated.activeTemplateId = chosenTemplateId;
              hasChanges = true;
            }
          }

          if (hasChanges) {
            saveDashboardData(updated, userKey);
            return updated;
          }
          return prev;
        });
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

  // Statistics Calculation (Gabungan konfirmasi dari Guests list & Buku Tamu RSVP)
  const stats = useMemo(() => {
    const wishHadirPax = wishes
      .filter((w) => w.status === 'hadir')
      .reduce((acc, curr) => acc + (curr.pax || 1), 0);
    const guestHadirPax = guests
      .filter((g) => g.rsvp === 'hadir')
      .reduce((acc, curr) => acc + (curr.pax || 1), 0);
    const hadir = wishHadirPax > 0 ? wishHadirPax : guestHadirPax;

    const wishTidak = wishes.filter((w) => w.status === 'tidak').length;
    const guestTidak = guests.filter((g) => g.rsvp === 'tidak').length;
    const tidak = wishTidak > 0 ? wishTidak : guestTidak;

    const wishRagu = wishes.filter((w) => w.status === 'ragu').length;
    const guestRagu = guests.filter((g) => g.rsvp === 'menunggu' || g.rsvp === 'ragu').length;
    const menunggu = wishRagu > 0 ? wishRagu : guestRagu;

    return { hadir, tidak, menunggu, totalWishes: wishes.length };
  }, [guests, wishes]);

  // Add Guest Handler
  const handleAddGuest = async ({
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

    setIsSavingGuest(true);
    try {
      const created = await createGuest({ name, phone, category });
      const newGuest: GuestItem = created || {
        id: Date.now(),
        name,
        phone,
        category,
        sent: false,
        rsvp: 'menunggu',
        pax: 0,
      };
      setGuests((prev) => [newGuest, ...prev]);
      setShowAddGuestModal(false);
      showToast(`Tamu "${newGuest.name}" berhasil disimpan ke database!`);
    } catch {
      showToast('Gagal menyimpan tamu ke database. Coba lagi.');
    } finally {
      setIsSavingGuest(false);
    }
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
              purchasedTemplateIds={data.purchasedTemplateIds}
              onNavigateTemplates={onNavigateTemplates}
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

          {activeTab === 'gallery' && (
            <GallerySection
              data={data}
              setData={setData}
              tierConfig={tierConfig}
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
        isSaving={isSavingGuest}
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