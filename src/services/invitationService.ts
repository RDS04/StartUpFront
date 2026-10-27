import { getAuthToken } from './authService';
import type { DashboardData, GalleryPhotoItem, StoryItem } from '../dashboard/types';
import { normalizeTemplateId } from '../dashboard/templateHelpers';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

/**
 * Mengambil data undangan & mempelai dari database backend Laravel
 */
export function parseServerInvitation(inv: any): DashboardData {
  const normalizedTemplate = normalizeTemplateId(inv.template_id);
  const purchasedTemplates = Array.isArray(inv.purchased_template_ids)
    ? inv.purchased_template_ids.map((id: string) => normalizeTemplateId(id)).filter(Boolean)
    : [];

  const isServerActive = inv.is_active !== undefined
    ? Boolean(inv.is_active)
    : purchasedTemplates.includes(normalizedTemplate);

  return {
    tier: inv.tier || 'premium',
    slug: inv.slug || '',
    isPublished: inv.is_published !== undefined ? Boolean(inv.is_published) : isServerActive,
    isActive: isServerActive,
    requiresPayment: inv.requires_payment !== undefined ? Boolean(inv.requires_payment) : !isServerActive,
    themeColor: inv.theme_color || '#82694D',
    activeTemplateId: normalizedTemplate,
    purchasedTemplateIds: purchasedTemplates,
    groom: {
      nickName: inv.groom?.nickName || '',
      fullName: inv.groom?.fullName || '',
      parents: inv.groom?.parents || '',
      avatar: inv.groom?.avatar || '',
      instagram: inv.groom?.instagram || '',
    },
    bride: {
      nickName: inv.bride?.nickName || '',
      fullName: inv.bride?.fullName || '',
      parents: inv.bride?.parents || '',
      avatar: inv.bride?.avatar || '',
      instagram: inv.bride?.instagram || '',
    },
    event: {
      startDate: inv.event?.startDate || '',
      startTime: inv.event?.startTime || '08:00',
      endDate: inv.event?.endDate || '',
      date: inv.event?.endDate || inv.event?.startDate || '',
      dateDisplay: inv.event?.dateDisplay || '',
      countdownTime: inv.event?.countdownTime || '08:00',
      countdownTarget: inv.event?.countdownTarget || 'end',
      akadTime: inv.event?.akadTime || '',
      akadPlace: inv.event?.akadPlace || '',
      akadAddress: inv.event?.akadAddress || '',
      akadMapsUrl: inv.event?.akadMapsUrl || '',
      resepsiTime: inv.event?.resepsiTime || '',
      resepsiPlace: inv.event?.resepsiPlace || '',
      resepsiAddress: inv.event?.resepsiAddress || '',
      resepsiMapsUrl: inv.event?.resepsiMapsUrl || '',
      mapsUrl: inv.event?.mapsUrl || '',
    },
    musicTitle: inv.music_title || '',
    bankAccounts: Array.isArray(inv.bank_accounts) ? inv.bank_accounts : [],
    giftAddress: {
      recipient: inv.gift_address?.recipient || '',
      phone: inv.gift_address?.phone || '',
      address: inv.gift_address?.address || '',
      notes: inv.gift_address?.notes || '',
    },
    gallery: Array.isArray(inv.gallery) ? inv.gallery : [],
    stories: Array.isArray(inv.stories) ? inv.stories : [],
  };
}

/**
 * Mengambil data undangan & mempelai dari database backend Laravel
 * Mendukung parameter templateId opsional untuk mengambil data template spesifik
 */
export async function getMyInvitation(templateId?: string): Promise<DashboardData | null> {
  const token = getAuthToken();
  if (!token) return null;

  try {
    const url = templateId
      ? `${API_BASE_URL}/my-invitation?template_id=${encodeURIComponent(normalizeTemplateId(templateId))}`
      : `${API_BASE_URL}/my-invitation`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) return null;

    const res = await response.json();
    if (res.status && res.invitation) {
      return parseServerInvitation(res.invitation);
    }
    return null;
  } catch (error) {
    console.warn('Gagal memuat data undangan dari backend:', error);
    return null;
  }
}

/**
 * Menyimpan data form mempelai & acara ke database backend Laravel
 */
export async function saveMyInvitation(data: DashboardData): Promise<{ status: boolean; message: string; invitation?: any }> {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Sesi Anda telah berakhir. Silakan login kembali.');
  }

  const payload = {
    slug: data.slug,
    template_id: normalizeTemplateId(data.activeTemplateId),
    tier: data.tier,
    is_published: data.isPublished,
    theme_color: data.themeColor,
    music_title: data.musicTitle,
    groom: data.groom,
    bride: data.bride,
    event: {
      ...data.event,
      startDate: data.event.startDate || '',
      startTime: data.event.startTime || '08:00',
      endDate: data.event.endDate || '',
      date: data.event.endDate || data.event.startDate || '',
      countdownTime: data.event.countdownTime || '08:00',
      countdownTarget: data.event.countdownTarget || 'end',
    },
    bank_accounts: data.bankAccounts,
    gift_address: data.giftAddress,
    gallery: data.gallery || [],
    stories: data.stories || [],
  };

  const response = await fetch(`${API_BASE_URL}/my-invitation`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const res = await response.json();
  if (!response.ok || !res.status) {
    throw new Error(res.message || 'Gagal menyimpan perubahan ke database backend.');
  }

  return res;
}

/**
 * Mengganti template aktif dan memigrasikan paket dashboard tier di backend Laravel
 */
export async function switchActiveTemplateApi(
  templateId: string,
  tier?: string
): Promise<{ status: boolean; message: string; invitation?: any }> {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Sesi Anda telah berakhir. Silakan login kembali.');
  }

  const response = await fetch(`${API_BASE_URL}/my-invitation/switch-template`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      template_id: normalizeTemplateId(templateId),
      tier: tier,
    }),
  });

  const res = await response.json();
  if (!response.ok || !res.status) {
    throw new Error(res.message || 'Gagal mengubah template aktif di backend.');
  }

  return res;
}

/**
 * Upload file foto galeri ke backend Laravel storage & otomatis simpan ke database
 */
export async function uploadGalleryImage(
  file: File,
  caption?: string,
  orientation?: string,
  templateId?: string
): Promise<{
  status: boolean;
  url: string;
  photo?: GalleryPhotoItem;
  gallery?: GalleryPhotoItem[];
  filename?: string;
  message?: string;
}> {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Sesi Anda telah berakhir. Silakan login kembali.');
  }

  const formData = new FormData();
  formData.append('photo', file);
  if (caption) formData.append('caption', caption);
  if (orientation) formData.append('orientation', orientation);
  if (templateId) formData.append('template_id', normalizeTemplateId(templateId));

  const response = await fetch(`${API_BASE_URL}/gallery/upload`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });

  const res = await response.json();
  if (!response.ok || !res.status) {
    throw new Error(res.message || 'Gagal mengunggah foto ke server backend.');
  }

  return res;
}

/**
 * Tambahkan foto via tautan URL langsung ke database backend Laravel
 */
export async function addGalleryPhotoByUrl(
  url: string,
  caption?: string,
  orientation?: string,
  templateId?: string
): Promise<{
  status: boolean;
  photo?: GalleryPhotoItem;
  gallery?: GalleryPhotoItem[];
  message?: string;
}> {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Sesi Anda telah berakhir. Silakan login kembali.');
  }

  const response = await fetch(`${API_BASE_URL}/gallery/add-url`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      url,
      caption,
      orientation,
      template_id: templateId ? normalizeTemplateId(templateId) : undefined,
    }),
  });

  const res = await response.json();
  if (!response.ok || !res.status) {
    throw new Error(res.message || 'Gagal menambahkan tautan foto ke backend.');
  }

  return res;
}

/**
 * Hapus foto dari galeri database backend
 */
export async function deleteGalleryPhoto(id: string | number, templateId?: string): Promise<{
  status: boolean;
  gallery?: GalleryPhotoItem[];
  message?: string;
}> {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Sesi Anda telah berakhir. Silakan login kembali.');
  }

  const url = templateId
    ? `${API_BASE_URL}/gallery/${encodeURIComponent(id)}?template_id=${encodeURIComponent(normalizeTemplateId(templateId))}`
    : `${API_BASE_URL}/gallery/${encodeURIComponent(id)}`;

  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  const res = await response.json();
  if (!response.ok || !res.status) {
    throw new Error(res.message || 'Gagal menghapus foto dari backend.');
  }

  return res;
}

/**
 * Simpan keseluruhan susunan urutan galeri ke database backend
 */
export async function saveGalleryList(gallery: GalleryPhotoItem[], templateId?: string): Promise<{
  status: boolean;
  gallery?: GalleryPhotoItem[];
  message?: string;
}> {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Sesi Anda telah berakhir. Silakan login kembali.');
  }

  const response = await fetch(`${API_BASE_URL}/gallery`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      gallery,
      template_id: templateId ? normalizeTemplateId(templateId) : undefined,
    }),
  });

  const res = await response.json();
  if (!response.ok || !res.status) {
    throw new Error(res.message || 'Gagal menyimpan susunan galeri ke backend.');
  }

  return res;
}

/**
 * Menyimpan daftar cerita kisah cinta langsung ke database backend Laravel
 */
export async function saveStories(stories: StoryItem[], templateId?: string): Promise<{ status: boolean; message: string; stories?: StoryItem[] }> {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Sesi Anda telah berakhir. Silakan login kembali.');
  }

  const response = await fetch(`${API_BASE_URL}/stories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      stories,
      template_id: templateId ? normalizeTemplateId(templateId) : undefined,
    }),
  });

  const res = await response.json();
  if (!response.ok || !res.status) {
    throw new Error(res.message || 'Gagal menyimpan kisah cinta ke backend.');
  }

  return res;
}

/**
 * Mengambil data undangan publik berdasarkan slug (untuk tamu yang membuka link)
 */
export async function getInvitationBySlug(slug: string): Promise<any | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/invitations/${encodeURIComponent(slug)}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (response.status === 402) {
      const res = await response.json().catch(() => null);
      return {
        is_active: false,
        requires_payment: true,
        message: res?.message || 'Undangan ini belum aktif karena menunggu penyelesaian pembayaran.',
        ...(res?.invitation || {}),
      };
    }

    if (!response.ok) return null;

    const res = await response.json();
    if (res.status && res.invitation) {
      return res.invitation;
    }
    return null;
  } catch (error) {
    console.warn('Gagal memuat undangan publik:', error);
    return null;
  }
}
