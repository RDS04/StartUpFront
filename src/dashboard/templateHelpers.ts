export interface MasterTemplate {
  id: string;
  name: string;
  shortName: string;
  category: string;
  badge?: string;
  desc?: string;
}

export const MASTER_TEMPLATES: MasterTemplate[] = [
  {
    id: 'template-satu',
    name: 'Template 1 - Rustic Blossom (Floral Rose)',
    shortName: 'Rustic Blossom (T1)',
    category: 'Wedding',
    badge: 'Favorit Calon Pengantin',
    desc: 'Desain anggun nuansa burgundy rose dan aksen emas mewah.',
  },
  {
    id: 'template-dua',
    name: 'Template 2 - Dusty Rose (Modern Minimalist)',
    shortName: 'Dusty Rose (T2)',
    category: 'Wedding',
    badge: 'Romantis & Minimalis',
    desc: 'Nuansa floral lily pastel yang hangat, elegan, dan estetik.',
  },
  {
    id: 'template-tiga',
    name: 'Template 3 - Minang Maroon (Adat Tradisional)',
    shortName: 'Minang Maroon (T3)',
    category: 'Wedding Adat',
    badge: 'Megah & Budaya',
    desc: 'Pesona adat Minangkabau dengan warna merah marun dan keemasan agung.',
  },
  {
    id: 'template-empat',
    name: 'Template 4 - Sage Blossom (Green Botanical)',
    shortName: 'Sage Blossom (T4)',
    category: 'Wedding',
    badge: 'Botanical & Natural',
    desc: 'Nuansa alam dedaunan sage green yang asri, sejuk, dan memikat.',
  },
  {
    id: 'card-atm',
    name: 'Template Card ATM - Amplop Digital Eksklusif',
    shortName: 'Card ATM',
    category: 'Amplop Digital',
    badge: 'Eksklusif 3D',
    desc: 'Konsep kartu fisik ATM digital dan amplop virtual modern.',
  },
  {
    id: 'wisuda-satu',
    name: 'Template Wisuda 1 - Modern Graduation',
    shortName: 'Wisuda 1',
    category: 'Wisuda',
    badge: 'Kelulusan Modern',
    desc: 'Undangan perayaan wisuda berkonsep modern dan dinamis.',
  },
  {
    id: 'wisuda-dua',
    name: 'Template Wisuda 2 - Elegant Graduation',
    shortName: 'Wisuda 2',
    category: 'Wisuda',
    badge: 'Kelulusan Elegan',
    desc: 'Undangan wisuda mewah dengan detail foto toga dan jadwal acara.',
  },
];

/**
 * Normalisasi berbagai format ID/nama template dari order backend, sessionStorage, atau slug
 * ke dalam ID rute kanonikal template (e.g. 'template-satu', 'template-dua', dst).
 */
export function normalizeTemplateId(rawIdOrName?: string | null): string {
  if (!rawIdOrName) return 'template-satu';
  const val = String(rawIdOrName).trim().toLowerCase();

  if (val.includes('card-atm') || val.includes('kartu-atm') || val.includes('atm')) {
    return 'card-atm';
  }
  if (val.includes('wisuda-dua') || val.includes('wisuda-2') || val.includes('yolanda') || val.includes('t-wisuda-2')) {
    return 'wisuda-dua';
  }
  if (val.includes('wisuda-satu') || val.includes('wisuda-1') || val.includes('karin') || val.includes('t-wisuda-1') || val.includes('wisuda')) {
    return 'wisuda-satu';
  }
  if (val.includes('template-empat') || val.includes('empat') || val.includes('sage') || val === 't4' || val.includes('template 4') || val.includes('template-4')) {
    return 'template-empat';
  }
  if (val.includes('template-tiga') || val.includes('tiga') || val.includes('minang') || val === 't3' || val.includes('template 3') || val.includes('template-3')) {
    return 'template-tiga';
  }
  if (val.includes('template-dua') || val.includes('dua') || val.includes('dusty') || val === 't2' || val.includes('template 2') || val.includes('template-2')) {
    return 'template-dua';
  }
  if (val.includes('template-satu') || val.includes('satu') || val.includes('rustic') || val === 't1' || val.includes('template 1') || val.includes('template-1') || val.includes('rose')) {
    return 'template-satu';
  }

  // Jika sudah cocok dengan salah satu MASTER_TEMPLATES
  const directMatch = MASTER_TEMPLATES.find((t) => t.id === val);
  if (directMatch) return directMatch.id;

  return 'template-satu';
}

export function getTemplateById(id?: string | null): MasterTemplate {
  const normalized = normalizeTemplateId(id);
  const found = MASTER_TEMPLATES.find((t) => t.id === normalized);
  return found || MASTER_TEMPLATES[0];
}
