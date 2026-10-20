export interface BankCardOption {
  id: string;
  bankName: string;
  shortName: string;
  type: 'bank' | 'wallet';
  badge: string;
  cardTheme: string;
  logoUrl?: string;
  gradient?: string;
  chipColor?: 'gold' | 'silver';
  textColor?: string;
  isVertical?: boolean;
}

export const BANK_CARD_CATALOG: BankCardOption[] = [
  {
    id: 'chartered',
    bankName: 'Standard Chartered',
    shortName: 'Chartered',
    type: 'bank',
    badge: 'Premium Debit',
    cardTheme: 'chartered',
    gradient: 'from-[#0369a1] via-[#0284c7] to-[#0c4a6e]',
    textColor: '#ffffff',
  },
  {
    id: 'bukopin',
    bankName: 'Bank Bukopin',
    shortName: 'Bukopin',
    type: 'bank',
    badge: 'GPN Debit',
    cardTheme: 'bukopin',
    gradient: 'from-[#1e3a8a] via-[#2563eb] to-[#172554]',
    textColor: '#ffffff',
  },
  {
    id: 'bptn',
    bankName: 'Bank BTPN',
    shortName: 'BTPN',
    type: 'bank',
    badge: 'Sinaya VISA Debit',
    cardTheme: 'bptn',
    gradient: 'from-[#78350f] via-[#b45309] to-[#451a03]',
    textColor: '#ffffff',
  },
  {
    id: 'maybank',
    bankName: 'Maybank',
    shortName: 'Maybank',
    type: 'bank',
    badge: 'U Debit (Vertical)',
    cardTheme: 'maybank',
    gradient: 'from-[#0f766e] via-[#14b8a6] to-[#134e4a]',
    textColor: '#ffffff',
    isVertical: true,
  },
  {
    id: 'sinarmas',
    bankName: 'Bank Sinarmas',
    shortName: 'Sinarmas',
    type: 'bank',
    badge: 'GPN Debit',
    cardTheme: 'sinarmas',
    gradient: 'from-[#831843] via-[#be123c] to-[#4c0519]',
    textColor: '#ffffff',
  },
  {
    id: 'ocbc',
    bankName: 'OCBC Bank',
    shortName: 'OCBC',
    type: 'bank',
    badge: 'Mastercard Debit',
    cardTheme: 'ocbc',
    gradient: 'from-[#991b1b] via-[#dc2626] to-[#450a0a]',
    textColor: '#ffffff',
  },
  {
    id: 'mega',
    bankName: 'Bank Mega',
    shortName: 'Mega',
    type: 'bank',
    badge: 'VISA Debit Gold',
    cardTheme: 'mega',
    gradient: 'from-[#78350f] via-[#d97706] to-[#451a03]',
    textColor: '#ffffff',
  },
  {
    id: 'permata',
    bankName: 'PermataBank',
    shortName: 'Permata',
    type: 'bank',
    badge: 'VISA Debit',
    cardTheme: 'permata',
    gradient: 'from-[#064e3b] via-[#047857] to-[#022c22]',
    textColor: '#ffffff',
  },
  {
    id: 'danamon',
    bankName: 'Bank Danamon',
    shortName: 'Danamon',
    type: 'bank',
    badge: 'World Business',
    cardTheme: 'danamon',
    gradient: 'from-[#7c2d12] via-[#c2410c] to-[#431407]',
    textColor: '#ffffff',
  },
  {
    id: 'cmniaga',
    bankName: 'CIMB Niaga',
    shortName: 'CIMB',
    type: 'bank',
    badge: 'Mastercard Debit',
    cardTheme: 'cmniaga',
    gradient: 'from-[#7f1d1d] via-[#991b1b] to-[#450a0a]',
    textColor: '#ffffff',
  },
  {
    id: 'btn-premium',
    bankName: 'Bank BTN',
    shortName: 'BTN Plat',
    type: 'bank',
    badge: 'VISA Platinum',
    cardTheme: 'btn-premium',
    gradient: 'from-[#0f172a] via-[#1e293b] to-[#020617]',
    textColor: '#ffffff',
    isVertical: true,
  },
  {
    id: 'btn-gold',
    bankName: 'Bank BTN',
    shortName: 'BTN Gold',
    type: 'bank',
    badge: 'VISA Gold',
    cardTheme: 'btn-gold',
    gradient: 'from-[#eab308] via-[#ca8a04] to-[#a16207]',
    textColor: '#ffffff',
    isVertical: true,
  },
  {
    id: 'btn',
    bankName: 'Bank BTN',
    shortName: 'BTN Classic',
    type: 'bank',
    badge: 'VISA Classic',
    cardTheme: 'btn',
    gradient: 'from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]',
    textColor: '#0f172a',
    isVertical: true,
  },
  {
    id: 'nagari',
    bankName: 'Bank Nagari',
    shortName: 'Nagari',
    type: 'bank',
    badge: 'Debit Songket',
    cardTheme: 'nagari',
    gradient: 'from-[#1e3a8a] via-[#1d4ed8] to-[#0f172a]',
    textColor: '#ffffff',
  },
  {
    id: 'muamalat',
    bankName: 'Bank Muamalat',
    shortName: 'Muamalat',
    type: 'bank',
    badge: 'Shar-E Classic',
    cardTheme: 'muamalat',
    gradient: 'from-[#3e1258] via-[#6c2b8e] to-[#260b36]',
    textColor: '#ffffff',
    isVertical: true,
  },
  {
    id: 'neo',
    bankName: 'KoinWorks NEO',
    shortName: 'NEO',
    type: 'bank',
    badge: 'Digital Card',
    cardTheme: 'neo',
    gradient: 'from-[#101c2e] via-[#172554] to-[#0f172a]',
    textColor: '#ffffff',
  },
  {
    id: 'bsi',
    bankName: 'Bank Syariah Indonesia (BSI)',
    shortName: 'BSI',
    type: 'bank',
    badge: 'Gold Debit',
    cardTheme: 'bsi',
    gradient: 'from-[#0b998c] via-[#13b5a6] to-[#f1a329]',
    textColor: '#ffffff',
  },
  {
    id: 'bni',
    bankName: 'Bank Negara Indonesia (BNI)',
    shortName: 'BNI',
    type: 'bank',
    badge: 'Debit Batik',
    cardTheme: 'bni',
    gradient: 'from-[#d49b4b] via-[#eab868] to-[#c88c3a]',
    textColor: '#0f172a',
  },
  {
    id: 'bca',
    bankName: 'Bank Central Asia (BCA)',
    shortName: 'BCA',
    type: 'bank',
    badge: 'Paspor BCA',
    cardTheme: 'bca',
    gradient: 'from-[#002d5c] via-[#00529b] to-[#001a38]',
    textColor: '#ffffff',
  },
  {
    id: 'mandiri',
    bankName: 'Bank Mandiri',
    shortName: 'Mandiri',
    type: 'bank',
    badge: 'Mandiri Debit',
    cardTheme: 'mandiri',
    gradient: 'from-[#091a30] via-[#1a365d] to-[#b38f38]',
    textColor: '#ffffff',
  },
  {
    id: 'bri',
    bankName: 'Bank BRI',
    shortName: 'BRI',
    type: 'bank',
    badge: 'BritAma Debit',
    cardTheme: 'bri',
    gradient: 'from-[#00529c] via-[#003366] to-[#081d38]',
    textColor: '#ffffff',
  },
  {
    id: 'dana',
    bankName: 'DANA / E-Wallet',
    shortName: 'DANA',
    type: 'wallet',
    badge: 'E-WALLET',
    cardTheme: 'dana',
    gradient: 'from-[#118eea] via-[#0c68ab] to-[#084d80]',
    textColor: '#ffffff',
  },
  {
    id: 'gopay',
    bankName: 'GoPay / E-Wallet',
    shortName: 'GoPay',
    type: 'wallet',
    badge: 'E-WALLET',
    cardTheme: 'gopay',
    gradient: 'from-[#00a5cf] via-[#007799] to-[#004e64]',
    textColor: '#ffffff',
  },
];

export function getBankCardDetails(bankName: string = '', cardTheme?: string): BankCardOption {
  if (cardTheme) {
    const matchTheme = BANK_CARD_CATALOG.find(
      (c) => c.cardTheme.toLowerCase() === cardTheme.toLowerCase() || c.id.toLowerCase() === cardTheme.toLowerCase()
    );
    if (matchTheme) return matchTheme;
  }

  const clean = (bankName || '').toLowerCase().trim();

  if (clean.includes('chartered')) return BANK_CARD_CATALOG.find((c) => c.id === 'chartered')!;
  if (clean.includes('bukopin')) return BANK_CARD_CATALOG.find((c) => c.id === 'bukopin')!;
  if (clean.includes('btpn') || clean.includes('bptn')) return BANK_CARD_CATALOG.find((c) => c.id === 'bptn')!;
  if (clean.includes('maybank')) return BANK_CARD_CATALOG.find((c) => c.id === 'maybank')!;
  if (clean.includes('sinarmas')) return BANK_CARD_CATALOG.find((c) => c.id === 'sinarmas')!;
  if (clean.includes('ocbc')) return BANK_CARD_CATALOG.find((c) => c.id === 'ocbc')!;
  if (clean.includes('mega')) return BANK_CARD_CATALOG.find((c) => c.id === 'mega')!;
  if (clean.includes('permata')) return BANK_CARD_CATALOG.find((c) => c.id === 'permata')!;
  if (clean.includes('danamon')) return BANK_CARD_CATALOG.find((c) => c.id === 'danamon')!;
  if (clean.includes('cimb') || clean.includes('niaga') || clean.includes('cmniaga')) return BANK_CARD_CATALOG.find((c) => c.id === 'cmniaga')!;
  if (clean.includes('btn') && clean.includes('plat')) return BANK_CARD_CATALOG.find((c) => c.id === 'btn-premium')!;
  if (clean.includes('btn') && clean.includes('gold')) return BANK_CARD_CATALOG.find((c) => c.id === 'btn-gold')!;
  if (clean.includes('btn')) return BANK_CARD_CATALOG.find((c) => c.id === 'btn')!;
  if (clean.includes('nagari')) return BANK_CARD_CATALOG.find((c) => c.id === 'nagari')!;
  if (clean.includes('muamalat')) return BANK_CARD_CATALOG.find((c) => c.id === 'muamalat')!;
  if (clean.includes('neo')) return BANK_CARD_CATALOG.find((c) => c.id === 'neo')!;
  if (clean.includes('bsi') || clean.includes('syariah')) return BANK_CARD_CATALOG.find((c) => c.id === 'bsi')!;
  if (clean.includes('bni')) return BANK_CARD_CATALOG.find((c) => c.id === 'bni')!;
  if (clean.includes('bca')) return BANK_CARD_CATALOG.find((c) => c.id === 'bca')!;
  if (clean.includes('mandiri')) return BANK_CARD_CATALOG.find((c) => c.id === 'mandiri')!;
  if (clean.includes('bri')) return BANK_CARD_CATALOG.find((c) => c.id === 'bri')!;
  if (clean.includes('dana')) return BANK_CARD_CATALOG.find((c) => c.id === 'dana')!;
  if (clean.includes('gopay')) return BANK_CARD_CATALOG.find((c) => c.id === 'gopay')!;

  // Default fallback
  return BANK_CARD_CATALOG.find((c) => c.id === 'bri') || BANK_CARD_CATALOG[0];
}
