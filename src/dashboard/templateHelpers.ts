import templateSatuMockupImg from '../tempalte/satu/image.png';
import templateDuaMockupImg from '../tempalte/dua/image.png';
import templateTigaMockupImg from '../tempalte/tiga/image.png';
import templateEmpatMockupImg from '../tempalte/empat/image.png';
import wisudaMockupImg from '../tempalte/Wisuda/satu/image.png';
import wisudaDuaMockupImg from '../tempalte/Wisuda/dua/image.png';

export interface MasterTemplate {
  id: string;
  name: string;
  shortName: string;
  category: string;
  badge?: string;
  desc?: string;
  image?: string;
}

export const MASTER_TEMPLATES: MasterTemplate[] = [
  {
    id: 'template-satu',
    name: 'Template 1 - Rustic Blossom (Floral Rose)',
    shortName: 'Rustic Blossom (T1)',
    category: 'Wedding',
    badge: 'Favorit Calon Pengantin',
    desc: 'Desain anggun nuansa burgundy rose dan aksen emas mewah.',
    image: templateSatuMockupImg,
  },
  {
    id: 'template-dua',
    name: 'Template 2 - Dusty Rose (Modern Minimalist)',
    shortName: 'Dusty Rose (T2)',
    category: 'Wedding',
    badge: 'Romantis & Minimalis',
    desc: 'Nuansa floral lily pastel yang hangat, elegan, dan estetik.',
    image: templateDuaMockupImg,
  },
  {
    id: 'template-tiga',
    name: 'Template 3 - Minang Maroon (Adat Tradisional)',
    shortName: 'Minang Maroon (T3)',
    category: 'Wedding Adat',
    badge: 'Megah & Budaya',
    desc: 'Pesona adat Minangkabau dengan warna merah marun dan keemasan agung.',
    image: templateTigaMockupImg,
  },
  {
    id: 'template-empat',
    name: 'Template 4 - Sage Blossom (Green Botanical)',
    shortName: 'Sage Blossom (T4)',
    category: 'Wedding',
    badge: 'Botanical & Natural',
    desc: 'Nuansa alam dedaunan sage green yang asri, sejuk, dan memikat.',
    image: templateEmpatMockupImg,
  },
  {
    id: 'card-atm',
    name: 'Template Card ATM - Amplop Digital Eksklusif',
    shortName: 'Card ATM',
    category: 'Amplop Digital',
    badge: 'Eksklusif 3D',
    desc: 'Konsep kartu fisik ATM digital dan amplop virtual modern.',
    image: 'https://images.unsplash.com/photo-1589758438368-0ad531db3366?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'wisuda-satu',
    name: 'Template Wisuda 1 - Modern Graduation',
    shortName: 'Wisuda 1',
    category: 'Wisuda',
    badge: 'Kelulusan Modern',
    desc: 'Undangan perayaan wisuda berkonsep modern dan dinamis.',
    image: wisudaMockupImg,
  },
  {
    id: 'wisuda-dua',
    name: 'Template Wisuda 2 - Elegant Graduation',
    shortName: 'Wisuda 2',
    category: 'Wisuda',
    badge: 'Kelulusan Elegan',
    desc: 'Undangan wisuda mewah dengan detail foto toga dan jadwal acara.',
    image: wisudaDuaMockupImg,
  },
];

/**
 * Normalisasi berbagai format ID/nama template dari order backend, sessionStorage, atau slug
 * ke dalam ID rute kanonikal template (e.g. 'template-satu', 'template-dua', dst).
 */
export function normalizeTemplateId(rawIdOrName?: string | null): string {
  if (!rawIdOrName) return 'template-satu';
  const val = String(rawIdOrName).trim().toLowerCase();

  // 1. Direct match dengan MASTER_TEMPLATES
  const directMatch = MASTER_TEMPLATES.find((t) => t.id === val);
  if (directMatch) return directMatch.id;

  // 2. Card ATM
  if (val.includes('card-atm') || val.includes('kartu-atm') || val.includes('atm')) {
    return 'card-atm';
  }

  // 3. Wisuda 2 (Yolanda / Black Gold)
  if (val.includes('wisuda-dua') || val.includes('wisuda-2') || val.includes('yolanda') || val.includes('t-wisuda-2')) {
    return 'wisuda-dua';
  }

  // 4. Wisuda 1 (Karin / Modern)
  if (val.includes('wisuda-satu') || val.includes('wisuda-1') || val.includes('karin') || val.includes('t-wisuda-1') || val.includes('wisuda')) {
    return 'wisuda-satu';
  }

  // 5. Template 4 (Sage Garden / Botanical)
  if (val === '4' || val === 't4' || val.includes('template-empat') || val.includes('sage') || val.includes('template 4') || val.includes('template-4') || val.includes('sage-garden')) {
    return 'template-empat';
  }

  // 6. Template 3 (Minang Maroon / Adat)
  if (val === '3' || val === 't3' || val.includes('template-tiga') || val.includes('minang') || val.includes('template 3') || val.includes('template-3') || val.includes('minang-maroon') || val.includes('maroon')) {
    return 'template-tiga';
  }

  // 7. Template 2 (Dusty Rose / Modern Minimalist)
  if (val === '2' || val === 't2' || val.includes('template-dua') || val.includes('dusty') || val.includes('template 2') || val.includes('template-2') || val.includes('dusty-rose')) {
    return 'template-dua';
  }

  // 8. Template 1 (Rustic Blossom / Floral Burgundy)
  if (val === '1' || val === 't1' || val.includes('template-satu') || val.includes('rustic') || val.includes('template 1') || val.includes('template-1') || val.includes('rustic-blossom') || val.includes('blossom') || val.includes('satu')) {
    return 'template-satu';
  }

  return 'template-satu';
}

export function getTemplateById(id?: string | null): MasterTemplate {
  const normalized = normalizeTemplateId(id);
  const found = MASTER_TEMPLATES.find((t) => t.id === normalized);
  return found || MASTER_TEMPLATES[0];
}

export function getTemplateDisplayName(rawIdOrName?: string | null): string {
  const tmpl = getTemplateById(rawIdOrName);
  return tmpl ? tmpl.name : 'Template 1 - Rustic Blossom (Floral Rose)';
}

export function getTemplateShortName(rawIdOrName?: string | null): string {
  const tmpl = getTemplateById(rawIdOrName);
  return tmpl ? tmpl.shortName : 'Rustic Blossom (T1)';
}

export function getTemplateImage(rawIdOrName?: string | null): string {
  const tmpl = getTemplateById(rawIdOrName);
  return tmpl?.image || '';
}

export function inferTierFromPlanName(planName?: string | null): 'silver' | 'gold' | 'platinum' | 'premium' {
  if (!planName) return 'premium';
  const lower = planName.toLowerCase();
  if (lower.includes('silver')) return 'silver';
  if (lower.includes('platinum')) return 'platinum';
  if (lower.includes('gold')) return 'gold';
  return 'premium';
}

export function getTierDisplayName(tier?: string | null): string {
  switch (tier) {
    case 'silver':
      return 'Paket Silver (Hemat)';
    case 'gold':
      return 'Paket Gold (VIP)';
    case 'platinum':
      return 'Paket Platinum (Full VIP)';
    case 'premium':
    default:
      return 'Paket Premium (Best Value)';
  }
}

export function getTierBadgeColor(tier?: string | null): string {
  switch (tier) {
    case 'silver':
      return 'bg-stone-800/80 text-stone-300 border-stone-600';
    case 'gold':
      return 'bg-amber-950/60 text-amber-300 border-amber-500/40';
    case 'platinum':
      return 'bg-purple-950/60 text-purple-300 border-purple-500/40';
    case 'premium':
    default:
      return 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40';
  }
}

