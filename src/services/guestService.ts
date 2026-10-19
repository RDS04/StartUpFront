import { getAuthToken } from './authService';
import type { GuestItem } from '../dashboard/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

/**
 * Mengambil seluruh daftar tamu undangan dari database backend Laravel
 */
export async function getGuests(): Promise<GuestItem[]> {
  const token = getAuthToken();
  if (!token) return [];

  try {
    const res = await fetch(`${API_BASE_URL}/guests`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!res.ok) return [];

    const json = await res.json();
    if (json.status && Array.isArray(json.guests)) {
      return json.guests.map((g: any) => ({
        id: Number(g.id),
        name: g.name || '',
        phone: g.phone || '',
        category: g.category || 'Teman',
        sent: Boolean(g.sent),
        rsvp: g.rsvp || 'menunggu',
        pax: Number(g.pax) || 0,
      }));
    }
    return [];
  } catch (error) {
    console.error('Gagal mengambil daftar tamu dari database:', error);
    return [];
  }
}

/**
 * Menyimpan tamu baru ke database backend
 */
export async function createGuest(guestData: {
  name: string;
  phone?: string;
  category?: string;
}): Promise<GuestItem | null> {
  const token = getAuthToken();
  if (!token) return null;

  try {
    const res = await fetch(`${API_BASE_URL}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(guestData),
    });

    const json = await res.json();
    if (res.ok && json.status && json.guest) {
      const g = json.guest;
      return {
        id: Number(g.id),
        name: g.name || '',
        phone: g.phone || '',
        category: g.category || 'Teman',
        sent: Boolean(g.sent),
        rsvp: g.rsvp || 'menunggu',
        pax: Number(g.pax) || 0,
      };
    }
    return null;
  } catch (error) {
    console.error('Gagal menyimpan tamu ke database:', error);
    return null;
  }
}

/**
 * Memperbarui status atau data tamu di database backend
 */
export async function updateGuest(
  id: number,
  data: Partial<GuestItem>
): Promise<boolean> {
  const token = getAuthToken();
  if (!token) return false;

  try {
    const res = await fetch(`${API_BASE_URL}/guests/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const json = await res.json();
    return Boolean(res.ok && json.status);
  } catch (error) {
    console.error('Gagal memperbarui tamu di database:', error);
    return false;
  }
}

/**
 * Menghapus tamu dari database backend
 */
export async function deleteGuest(id: number): Promise<boolean> {
  const token = getAuthToken();
  if (!token) return false;

  try {
    const res = await fetch(`${API_BASE_URL}/guests/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const json = await res.json();
    return Boolean(res.ok && json.status);
  } catch (error) {
    console.error('Gagal menghapus tamu dari database:', error);
    return false;
  }
}
