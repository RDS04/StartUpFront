import { getAuthToken } from './authService';
import type { DashboardData } from '../dashboard/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

/**
 * Mengambil data undangan & mempelai dari database backend Laravel
 */
export async function getMyInvitation(): Promise<DashboardData | null> {
  const token = getAuthToken();
  if (!token) return null;

  try {
    const response = await fetch(`${API_BASE_URL}/my-invitation`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) return null;

    const res = await response.json();
    if (res.status && res.invitation) {
      const inv = res.invitation;
      return {
        tier: inv.tier || 'premium',
        slug: inv.slug || '',
        isPublished: inv.is_published !== undefined ? Boolean(inv.is_published) : true,
        themeColor: inv.theme_color || '#82694D',
        activeTemplateId: inv.template_id || 'template-dua',
        purchasedTemplateIds: Array.isArray(inv.purchased_template_ids) ? inv.purchased_template_ids : [inv.template_id || 'template-dua'],
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
          date: inv.event?.date || '',
          dateDisplay: inv.event?.dateDisplay || '',
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
      };
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
    template_id: data.activeTemplateId,
    tier: data.tier,
    is_published: data.isPublished,
    theme_color: data.themeColor,
    music_title: data.musicTitle,
    groom: data.groom,
    bride: data.bride,
    event: data.event,
    bank_accounts: data.bankAccounts,
    gift_address: data.giftAddress,
    gallery: data.gallery || [],
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
 * Upload file foto galeri ke backend Laravel storage
 */
export async function uploadGalleryImage(file: File): Promise<{ status: boolean; url: string; filename?: string; message?: string }> {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Sesi Anda telah berakhir. Silakan login kembali.');
  }

  const formData = new FormData();
  formData.append('photo', file);

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
