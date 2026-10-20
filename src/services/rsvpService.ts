import { getAuthToken } from './authService';
import type { WishItem } from '../dashboard/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

/**
 * PUBLIC: Mengirim ucapan doa & konfirmasi kehadiran RSVP dari formulir undangan ke database
 */
export async function submitRsvp(payload: {
  slug?: string;
  name: string;
  pax?: number | string;
  status: string;
  message: string;
}): Promise<{ status: boolean; message: string; rsvp?: any }> {
  const targetUrl = payload.slug
    ? `${API_BASE_URL}/invitations/${encodeURIComponent(payload.slug)}/rsvp`
    : `${API_BASE_URL}/rsvp`;

  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(targetUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    const json = await res.json();
    return json;
  } catch (error) {
    console.error('Gagal mengirim RSVP ke database:', error);
    return {
      status: false,
      message: 'Gagal menghubungi server. Silakan periksa koneksi Anda.',
    };
  }
}

/**
 * PUBLIC: Mengambil daftar ucapan doa publik & statistik untuk ditampilkan di template undangan
 */
export async function getPublicRsvps(slug: string): Promise<{
  status: boolean;
  stats?: {
    countHadir: number;
    countTidakHadir: number;
    countRagu: number;
    totalPaxHadir: number;
    total: number;
  };
  messages?: Array<{
    id: string;
    name: string;
    attendance: string;
    status: string;
    pax: number;
    message: string;
    timeAgo: string;
  }>;
}> {
  try {
    const res = await fetch(`${API_BASE_URL}/invitations/${encodeURIComponent(slug)}/rsvps`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!res.ok) return { status: false };
    return await res.json();
  } catch (error) {
    console.warn('Gagal memuat ucapan doa publik:', error);
    return { status: false };
  }
}

/**
 * PROTECTED (DASHBOARD): Mengambil ucapan doa & statistik rekapitulasi kehadiran milik akun user yang login
 */
export async function getMyWishes(): Promise<{
  wishes: WishItem[];
  stats: {
    hadir: number;
    tidak: number;
    menunggu: number;
    totalWishes: number;
  };
} | null> {
  const token = getAuthToken();
  if (!token) return null;

  try {
    const res = await fetch(`${API_BASE_URL}/my-wishes`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!res.ok) return null;

    const json = await res.json();
    if (json.status) {
      return {
        wishes: Array.isArray(json.wishes) ? json.wishes : [],
        stats: json.stats || { hadir: 0, tidak: 0, menunggu: 0, totalWishes: 0 },
      };
    }
    return null;
  } catch (error) {
    console.error('Gagal mengambil data buku tamu dashboard:', error);
    return null;
  }
}

/**
 * PROTECTED (DASHBOARD): Menghapus ucapan dari buku tamu
 */
export async function deleteWish(id: number): Promise<boolean> {
  const token = getAuthToken();
  if (!token) return false;

  try {
    const res = await fetch(`${API_BASE_URL}/my-wishes/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const json = await res.json();
    return Boolean(res.ok && json.status);
  } catch (error) {
    console.error('Gagal menghapus ucapan:', error);
    return false;
  }
}
