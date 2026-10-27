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

/**
 * Mengambil daftar template dari database backend Laravel via REST API
 */
export async function fetchTemplatesFromDatabase(): Promise<MasterTemplate[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/templates`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch templates: ${res.status}`);
    }

    const data = await res.json();
    if (data.status && Array.isArray(data.templates) && data.templates.length > 0) {
      const mapped: MasterTemplate[] = data.templates.map((t: DatabaseTemplate) => ({
        id: t.id,
        name: t.name,
        shortName: t.short_name || t.name,
        category: t.category,
        badge: t.badge || undefined,
        desc: t.description || undefined,
        image: t.image || undefined,
      }));
      cachedTemplates = mapped;
      return mapped;
    }
  } catch (err) {
    console.warn('Gagal memuat template dari database, menggunakan fallback lokal:', err);
  }

  return [];
}

export function getCachedTemplates(): MasterTemplate[] | null {
  return cachedTemplates;
}
