import React, { useState, useMemo, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import type { DashboardTab, DashboardData, GuestItem, WishItem, TierConfig, DashboardPageProps } from './types';
import { getSavedDashboardData, saveDashboardData, getDefaultDashboardDataForTemplate, getSavedGuests, saveGuests, getSavedWishes, saveWishes } from './initialData';
import type { OrderItem } from '../services/orderService';
import { getMyOrders } from '../services/orderService';
import { getMyInvitation, switchActiveTemplateApi, saveMyInvitation, parseServerInvitation } from '../services/invitationService';
import { getGuests, createGuest } from '../services/guestService';
import { getMyWishes } from '../services/rsvpService';
import {
  normalizeTemplateId,
  getTemplateById,
  inferTierFromPlanName,
  getTierDisplayName,
} from './templateHelpers';

// Sub Components
import { DashboardNavbar } from './components/DashboardNavbar';
import { DashboardSidebar } from './components/DashboardSidebar';
import { AddGuestModal } from './components/AddGuestModal';
import { QrCodeModal } from './components/QrCodeModal';
import { MobilePreviewModal } from './components/MobilePreviewModal';
import { ActiveTemplatesModal, type PurchasedTemplateCardItem } from './components/ActiveTemplatesModal';
import { PaymentHistoryModal } from './components/PaymentHistoryModal';
import { TemplateTransitionLoading } from './components/TemplateTransitionLoading';

// Tab Sections
import { OverviewSection } from './sections/OverviewSection';
import { BrideEventSection } from './sections/BrideEventSection';
import { GuestsSection } from './sections/GuestsSection';
import { RsvpWishesSection } from './sections/RsvpWishesSection';
import { AccountsSection } from './sections/AccountsSection';
import { GallerySection } from './sections/GallerySection';
import { StoriesSection } from './sections/StoriesSection';

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

  // Main Dashboard State (disimpan dan dibaca dari localStorage berdasar akun user dan template aktif)
  const [data, setData] = useState<DashboardData>(() => getSavedDashboardData(userKey));
  const [guests, setGuests] = useState<GuestItem[]>(() => getSavedGuests(userKey));
  const [isSavingGuest, setIsSavingGuest] = useState(false);
  const [wishes, setWishes] = useState<WishItem[]>(() => getSavedWishes(userKey));
  const [userOrders, setUserOrders] = useState<OrderItem[]>([]);
  const [showActiveTemplatesModal, setShowActiveTemplatesModal] = useState(false);
  const [showPaymentHistoryModal, setShowPaymentHistoryModal] = useState(false);
  const [previewOverrideTemplate, setPreviewOverrideTemplate] = useState<string | undefined>(undefined);
  const [isSwitchingTemplate, setIsSwitchingTemplate] = useState(false);
  const [switchingInfo, setSwitchingInfo] = useState<{
    templateName: string;
    templateId: string;
    tier: 'silver' | 'gold' | 'platinum' | 'premium';
    image?: string;
    planName?: string;
  } | null>(null);

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
        const activeTid = serverData.activeTemplateId || 'template-satu';
        const localTmplData = getSavedDashboardData(userKey, activeTid);

        setData((prev) => {
          const merged: DashboardData = {
            ...localTmplData,
            ...serverData,
            activeTemplateId: activeTid,
            tier: serverData.tier || localTmplData.tier || 'premium',
            purchasedTemplateIds: Array.from(
              new Set([
                ...(prev.purchasedTemplateIds || []),
                ...(serverData.purchasedTemplateIds || []),
                ...(localTmplData.purchasedTemplateIds || []),
                activeTid,
              ])
            ),
            groom: {
              nickName: serverData.groom?.nickName || localTmplData.groom?.nickName || '',
              fullName: serverData.groom?.fullName || localTmplData.groom?.fullName || '',
              parents: serverData.groom?.parents || localTmplData.groom?.parents || '',
              avatar: serverData.groom?.avatar || localTmplData.groom?.avatar || '',
              instagram: serverData.groom?.instagram || localTmplData.groom?.instagram || '',
            },
            bride: {
              nickName: serverData.bride?.nickName || localTmplData.bride?.nickName || '',
              fullName: serverData.bride?.fullName || localTmplData.bride?.fullName || '',
              parents: serverData.bride?.parents || localTmplData.bride?.parents || '',
              avatar: serverData.bride?.avatar || localTmplData.bride?.avatar || '',
              instagram: serverData.bride?.instagram || localTmplData.bride?.instagram || '',
            },
            event: {
              ...localTmplData.event,
              ...serverData.event,
            },
            bankAccounts: serverData.bankAccounts?.length ? serverData.bankAccounts : (localTmplData.bankAccounts || []),
            giftAddress: {
              recipient: serverData.giftAddress?.recipient ?? localTmplData.giftAddress?.recipient ?? '',
              phone: serverData.giftAddress?.phone ?? localTmplData.giftAddress?.phone ?? '',
              address: serverData.giftAddress?.address ?? localTmplData.giftAddress?.address ?? '',
              notes: serverData.giftAddress?.notes ?? localTmplData.giftAddress?.notes ?? '',
            },
            gallery: Array.isArray(serverData.gallery) && serverData.gallery.length > 0 ? serverData.gallery : (localTmplData.gallery || []),
            stories: Array.isArray(serverData.stories) && serverData.stories.length > 0 ? serverData.stories : (localTmplData.stories || []),
          };
          saveDashboardData(merged, userKey, activeTid);
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
          setUserOrders(orders);

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

          const isCurrentActiveValid =
            updated.activeTemplateId &&
            uniquePurchased.includes(normalizeTemplateId(updated.activeTemplateId));

          if (!isCurrentActiveValid) {
            const fallbackTpl = chosenTemplateId || (uniquePurchased.length > 0 ? uniquePurchased[0] : 'template-satu');
            updated.activeTemplateId = fallbackTpl;
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

  // List template yang telah dibeli oleh user (dari Orders backend + purchasedTemplateIds di invitation)
  const purchasedTemplatesList: PurchasedTemplateCardItem[] = useMemo(() => {
    const result: PurchasedTemplateCardItem[] = [];
    const addedTemplateIds = new Set<string>();

    // 1. Ambil dari riwayat pesanan (orders backend)
    const paidOrders = userOrders.filter((o) => o.status === 'paid');
    const orderPool = paidOrders.length > 0 ? paidOrders : userOrders;

    orderPool.forEach((ord) => {
      const rawTid = ord.template_id || ord.template_name;
      if (!rawTid) return;
      const normId = normalizeTemplateId(rawTid);
      if (addedTemplateIds.has(normId)) return;
      addedTemplateIds.add(normId);

      const tpl = getTemplateById(normId);
      const tier = inferTierFromPlanName(ord.plan_name);

      result.push({
        templateId: normId,
        templateName: tpl.name,
        shortName: tpl.shortName,
        category: tpl.category,
        badge: tpl.badge,
        desc: tpl.desc,
        image: tpl.image,
        planName: ord.plan_name || getTierDisplayName(tier),
        tier: tier,
        status: ord.status,
        orderId: ord.id,
        totalAmount: ord.total_amount,
        createdAt: ord.created_at,
        isActive: normId === normalizeTemplateId(data.activeTemplateId),
      });
    });

    // 2. Gabungkan dengan data.purchasedTemplateIds jika ada template yang belum tercatat di orders
    const currentPurchased = Array.isArray(data.purchasedTemplateIds) ? data.purchasedTemplateIds : [];
    currentPurchased.forEach((pid) => {
      const normId = normalizeTemplateId(pid);
      if (addedTemplateIds.has(normId)) return;
      addedTemplateIds.add(normId);

      const tpl = getTemplateById(normId);
      const matchedOrder = userOrders.find((o) => normalizeTemplateId(o.template_id || o.template_name) === normId);
      const tier = matchedOrder ? inferTierFromPlanName(matchedOrder.plan_name) : data.tier;

      result.push({
        templateId: normId,
        templateName: tpl.name,
        shortName: tpl.shortName,
        category: tpl.category,
        badge: tpl.badge,
        desc: tpl.desc,
        image: tpl.image,
        planName: matchedOrder?.plan_name || getTierDisplayName(tier),
        tier: tier,
        status: matchedOrder?.status || 'active',
        orderId: matchedOrder?.id,
        totalAmount: matchedOrder?.total_amount,
        createdAt: matchedOrder?.created_at,
        isActive: normId === normalizeTemplateId(data.activeTemplateId),
      });
    });

    // 3. Pastikan template yang sedang aktif saat ini selalu ada dalam list
    const activeNorm = normalizeTemplateId(data.activeTemplateId);
    if (!addedTemplateIds.has(activeNorm)) {
      const tpl = getTemplateById(activeNorm);
      result.push({
        templateId: activeNorm,
        templateName: tpl.name,
        shortName: tpl.shortName,
        category: tpl.category,
        badge: tpl.badge,
        desc: tpl.desc,
        image: tpl.image,
        planName: getTierDisplayName(data.tier),
        tier: data.tier,
        status: 'active',
        isActive: true,
      });
    }

    return result;
  }, [userOrders, data.purchasedTemplateIds, data.activeTemplateId, data.tier]);

  // Riwayat pembayaran lengkap: Utamakan orders dari database backend. Jika user belum login / orders kosong di sesi ini, buat invoice dari template yang dimiliki / aktif
  const effectivePaymentHistoryOrders: OrderItem[] = useMemo(() => {
    if (userOrders && userOrders.length > 0) {
      return userOrders;
    }

    // Fallback invoice otomatis dari template yang dibeli / aktif
    const list = purchasedTemplatesList.length > 0 ? purchasedTemplatesList : [
      {
        templateId: normalizeTemplateId(data.activeTemplateId || 'template-satu'),
        templateName: getTemplateById(normalizeTemplateId(data.activeTemplateId || 'template-satu')).name,
        planName: `Paket ${getTierDisplayName(data.tier || 'premium')}`,
        tier: data.tier || 'premium',
        status: 'paid',
        orderId: 1,
        totalAmount: 99000,
        createdAt: new Date().toISOString(),
      } as PurchasedTemplateCardItem
    ];

    return list.map((item, idx) => {
      const tier = item.tier || 'premium';
      const basePrice = tier === 'silver' ? 49000 : tier === 'gold' ? 89000 : tier === 'platinum' ? 149000 : 99000;
      const total = item.totalAmount || (basePrice + 2500 + 245);

      return {
        id: item.orderId || (idx + 1),
        midtrans_order_id: (item as any).midtrans_order_id || `INV-20261026-000${idx + 1}`,
        plan_name: item.planName || `Paket ${getTierDisplayName(tier)}`,
        template_id: item.templateId,
        template_name: item.templateName,
        customer_name: data.groom?.nickName && data.bride?.nickName ? `${data.groom.nickName} & ${data.bride.nickName}` : 'Mempelai Bahagia',
        customer_email: currentUser?.email || 'mempelai@example.com',
        customer_phone: '',
        couple_names: `${data.groom?.nickName || 'Romeo'} & ${data.bride?.nickName || 'Juliet'}`,
        plan_price: basePrice,
        admin_fee: 2500,
        discount: 0,
        unique_code: 245,
        total_amount: total,
        payment_method: 'QRIS',
        status: item.status === 'pending' ? 'pending' : 'paid',
        created_at: item.createdAt || new Date(Date.now() - idx * 86400000).toISOString(),
      };
    });
  }, [userOrders, purchasedTemplatesList, data.activeTemplateId, data.tier, data.groom, data.bride, currentUser]);

  // Handler: Mengganti template aktif dan memigrasikan dashboard paket (disimpan ke backend Laravel & localStorage secara independen)
  const handleSelectAndMigrateTemplate = async (
    templateId: string,
    associatedTier: 'silver' | 'gold' | 'platinum' | 'premium',
    templateName: string,
    planName: string
  ) => {
    const normId = normalizeTemplateId(templateId);
    const targetTemplate = getTemplateById(normId);

    // 1. Simpan data template aktif saat ini ke database backend & localStorage agar aman dan tidak tertimpa
    if (data.activeTemplateId) {
      saveDashboardData(data, userKey, data.activeTemplateId);
      saveMyInvitation(data).catch(() => {});
    }

    // 2. Aktifkan overlay animasi loading transisi mewah
    setSwitchingInfo({
      templateName: templateName || targetTemplate.name,
      templateId: normId,
      tier: associatedTier,
      image: targetTemplate.image,
      planName: planName,
    });
    setIsSwitchingTemplate(true);

    let targetData: DashboardData | null = null;

    try {
      // 3. Panggil API switch-template di backend (backend mengembalikan data invitation KHUSUS template ini)
      const res = await switchActiveTemplateApi(normId, associatedTier);
      if (res?.invitation) {
        targetData = parseServerInvitation(res.invitation);
      }
    } catch (err: any) {
      console.warn('Backend switch notice (menggunakan data lokal template):', err);
    }

    // 4. Jika backend tidak mengembalikan data (misal offline/baru), baca dari localStorage khusus template ini
    if (!targetData) {
      targetData = getSavedDashboardData(userKey, normId) || getDefaultDashboardDataForTemplate(normId, associatedTier);
    }

    // Gabungkan list template yang dibeli
    const allPurchased = Array.from(new Set([
      ...(data.purchasedTemplateIds || []),
      ...(targetData.purchasedTemplateIds || []),
      normId,
    ]));

    targetData = {
      ...targetData,
      activeTemplateId: normId,
      tier: associatedTier,
      purchasedTemplateIds: allPurchased,
    };

    // 5. Simpan ke local storage khusus template ini dan perbarui state data
    saveDashboardData(targetData, userKey, normId);
    setData(targetData);

    // 6. Trigger event sinkronisasi antar komponen
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('ij_dashboard_update'));

    // 7. Berikan waktu jeda transisi animasi yang memukau (~850ms)
    await new Promise((resolve) => setTimeout(resolve, 850));

    // 8. Tutup modal & overlay
    setShowActiveTemplatesModal(false);
    setShowPaymentHistoryModal(false);
    setIsSwitchingTemplate(false);
    setSwitchingInfo(null);

    // 9. Tampilkan notifikasi toast sukses
    showToast(`✓ Berhasil beralih ke ${templateName}! Data formulir dan paket ${planName} aktif.`);
  };

  // Handler: Pratinjau salah satu template yang dibeli tanpa langsung mengaktifkannya
  const handlePreviewPurchasedTemplate = (templateId: string) => {
    setPreviewOverrideTemplate(normalizeTemplateId(templateId));
    setPreviewGuestName('Tamu Terhormat');
    setShowMobilePreview(true);
  };

  // Handler: Saat pembayaran pesanan berhasil (baik via Midtrans maupun simulasi)
  const handlePaymentSuccess = async (_orderId: number, templateId: string) => {
    let freshOrders: OrderItem[] = [];
    try {
      freshOrders = (await getMyOrders()) || [];
      if (freshOrders && freshOrders.length > 0) {
        setUserOrders(freshOrders);
      }
    } catch {}

    const normId = normalizeTemplateId(templateId);

    // Cari pesanan yang baru saja dibayar untuk menentukan paket tier dan nama template
    const matchedOrder =
      freshOrders.find((o) => o.id === _orderId) ||
      freshOrders.find((o) => normalizeTemplateId(o.template_id || o.template_name) === normId) ||
      userOrders.find((o) => o.id === _orderId);

    const associatedTier = matchedOrder ? inferTierFromPlanName(matchedOrder.plan_name) : 'gold';
    const targetTemplate = getTemplateById(normId);
    const planName = matchedOrder?.plan_name || `Paket ${getTierDisplayName(associatedTier)}`;

    // Tutup modal riwayat pembayaran & koleksi template
    setShowPaymentHistoryModal(false);
    setShowActiveTemplatesModal(false);

    // Otomatis aktifkan dan migrasikan template serta dashboard ke template yang baru dibayar ini!
    await handleSelectAndMigrateTemplate(normId, associatedTier, targetTemplate.name, planName);
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
        onOpenPreview={() => {
          setPreviewGuestName('Tamu Terhormat');
          setShowMobilePreview(true);
        }}
        onBackToHome={onBackToHome}
        onLogout={onLogout}
      />

      {/* Main Content Layout Container */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto p-4 sm:p-6 gap-6 items-start">
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
            setPreviewOverrideTemplate(undefined);
            setPreviewGuestName('Tamu Terhormat');
            setShowMobilePreview(true);
          }}
          onOpenActiveTemplates={() => setShowActiveTemplatesModal(true)}
          onOpenPaymentHistory={() => setShowPaymentHistoryModal(true)}
          purchasedTemplatesCount={purchasedTemplatesList.length}
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
              onOpenActiveTemplates={() => setShowActiveTemplatesModal(true)}
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
              onOpenActiveTemplates={() => setShowActiveTemplatesModal(true)}
              onSelectTemplate={(templateId, associatedTier, templateName, planName) => {
                handleSelectAndMigrateTemplate(templateId, associatedTier, templateName, planName);
              }}
            />
          )}

          {activeTab === 'stories' && (
            <StoriesSection
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

      {/* Active Templates & Dashboard Migration Modal */}
      <ActiveTemplatesModal
        isOpen={showActiveTemplatesModal}
        onClose={() => setShowActiveTemplatesModal(false)}
        currentActiveTemplateId={data.activeTemplateId || 'template-satu'}
        currentTier={data.tier}
        purchasedTemplates={purchasedTemplatesList}
        onSelectTemplate={handleSelectAndMigrateTemplate}
        onPreviewTemplate={handlePreviewPurchasedTemplate}
        onNavigateTemplates={onNavigateTemplates}
        isSwitching={isSwitchingTemplate}
      />

      {/* Payment History & Invoices Modal */}
      <PaymentHistoryModal
        isOpen={showPaymentHistoryModal}
        onClose={() => setShowPaymentHistoryModal(false)}
        orders={effectivePaymentHistoryOrders}
        activeTemplateId={data.activeTemplateId || 'template-satu'}
        onSelectTemplate={handleSelectAndMigrateTemplate}
        onPreviewTemplate={handlePreviewPurchasedTemplate}
        onNavigateTemplates={onNavigateTemplates}
        onNavigatePricing={onNavigatePricing}
        onCopyText={copyToClipboard}
        onPaymentSuccess={handlePaymentSuccess}
        isSwitching={isSwitchingTemplate}
      />

      {/* Luxury Animated Transition Loading Overlay */}
      <TemplateTransitionLoading
        isOpen={isSwitchingTemplate && switchingInfo !== null}
        targetTemplateName={switchingInfo?.templateName || ''}
        targetTemplateId={switchingInfo?.templateId || ''}
        targetTier={switchingInfo?.tier || 'premium'}
        targetImage={switchingInfo?.image}
        planName={switchingInfo?.planName}
      />

      {/* Interactive Mobile Smartphone Simulator */}
      <MobilePreviewModal
        isOpen={showMobilePreview}
        onClose={() => {
          setShowMobilePreview(false);
          setPreviewOverrideTemplate(undefined);
        }}
        data={data}
        guestName={previewGuestName}
        overrideTemplateId={previewOverrideTemplate}
        onCopyText={copyToClipboard}
      />
    </div>
  );
};

export default DashboardPage;