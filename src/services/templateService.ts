import { API_BASE_URL } from './authService';
import type { MasterTemplate } from '../dashboard/templateHelpers';

export interface DatabaseTemplate {
  id: string;
  name: string;
  short_name: string;
  category: string;
  badge?: string | null;
  tag_subtitle?: string | null;
  description?: string | null;
  image?: string | null;
  preview_route?: string | null;
  price_tier?: 'silver' | 'gold' | 'platinum' | 'premium';
  theme_style?: string | null;
  sample_names?: string | null;
  sample_date?: string | null;
  is_active: boolean;
  sort_order: number;
  features?: string[] | null;
}

// In-memory cache
let cachedTemplates: MasterTemplate[] | null = null;
let cachedDatabaseTemplates: DatabaseTemplate[] | null = null;

export interface ActiveTemplatesResult {
  loaded: boolean;
  templates: DatabaseTemplate[];
}

/**
 * Mengambil daftar template AKTIF secara realtime dari database backend Laravel (/api/templates)
 * Template yang dinonaktifkan di Master Portal tidak akan dikembalikan oleh endpoint ini.
 */
export async function fetchActiveTemplates(): Promise<ActiveTemplatesResult> {
  try {
    const res = await fetch(`${API_BASE_URL}/templates?_t=${Date.now()}`, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch templates: ${res.status}`);
    }

    const data = await res.json();
    if (data.status && Array.isArray(data.templates)) {
      const list: DatabaseTemplate[] = data.templates.filter((t: DatabaseTemplate) => Boolean(t.is_active));
      cachedDatabaseTemplates = list;
      cachedTemplates = list.map((t: DatabaseTemplate) => ({
        id: t.id,
        name: t.name,
        shortName: t.short_name || t.name,
        category: t.category,
        badge: t.badge || undefined,
        desc: t.description || undefined,
        image: t.image || undefined,
      }));
      return { loaded: true, templates: list };
    }
  } catch (err) {
    console.warn('Gagal memuat template aktif dari database, menggunakan fallback lokal:', err);
  }

  return { loaded: false, templates: cachedDatabaseTemplates || [] };
}

/**
 * Mengambil daftar template dari database backend Laravel via REST API
 */
export async function fetchTemplatesFromDatabase(): Promise<MasterTemplate[]> {
  const result = await fetchActiveTemplates();
  if (result.loaded) {
    return cachedTemplates || [];
  }
  return [];
}

export function getCachedTemplates(): MasterTemplate[] | null {
  return cachedTemplates;
}

export function getCachedDatabaseTemplates(): DatabaseTemplate[] | null {
  return cachedDatabaseTemplates;
}
