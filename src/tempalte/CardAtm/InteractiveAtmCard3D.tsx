import React from 'react';
import { CardChartered } from './carthered';
import { CardBukopin } from './bukopin';
import { CardBtpn } from './bptn';
import { CardMaybank } from './maybank';
import { CardSinarmas } from './sinarmas';
import { CardOcbc } from './ocbc';
import { CardMega } from './mega';
import { CardPermata } from './permata';
import { CardDanamon } from './danamon';
import { CardCimbNiaga } from './cmniaga';
import { CardBtnPremium } from './btn-premium';
import { CardBtnGold } from './btn-gold';
import { CardBtn } from './btn';
import { CardNagari } from './nagari';
import { CardMuamalat } from './muamalat';
import { CardNeo } from './neo';
import { CardBsi } from './bsi';
import { CardBni } from './Bni';
import { CardBca } from './Bca';
import { CardMandiri } from './Mandiri';
import { CardBri } from './Bri';
import { AtmCard } from './AtmCard';
import { getBankCardDetails } from './bankCardCatalog';
import './AtmCard3D.css';

export interface InteractiveAtmCard3DProps {
  accountNumber: string;
  holderName: string;
  bankName: string;
  cardTheme?: string;
  type?: 'bank' | 'wallet';
  logoUrl?: string;
  onCopy?: (text: string, label?: string) => void;
  compact?: boolean;
  interactive?: boolean;
  showFlipButton?: boolean;
}

export const InteractiveAtmCard3D: React.FC<InteractiveAtmCard3DProps> = ({
  accountNumber,
  holderName,
  bankName,
  cardTheme,
  onCopy,
}) => {
  const details = getBankCardDetails(bankName, cardTheme);
  const theme = (cardTheme || details.cardTheme || '').toLowerCase();
  const nameClean = (bankName || '').toLowerCase();

  const handleCopy = (text: string, label: string) => {
    if (onCopy) {
      onCopy(text, label);
    } else {
      navigator.clipboard.writeText(text);
    }
  };

  const accNum = accountNumber || '1005 0213 0511 01';
  const holder = holderName || 'YANTI S.PD';

  // 1. Standard Chartered
  if (theme === 'chartered' || nameClean.includes('chartered')) {
    return <CardChartered accountNumber={accNum} holderName={holder} onCopy={handleCopy} />;
  }

  // 2. Bank Bukopin
  if (theme === 'bukopin' || nameClean.includes('bukopin')) {
    return <CardBukopin accountNumber={accNum} holderName={holder} onCopy={handleCopy} />;
  }

  // 3. Bank BTPN
  if (theme === 'bptn' || nameClean.includes('btpn') || nameClean.includes('bptn')) {
    return <CardBtpn accountNumber={accNum} holderName={holder} onCopy={handleCopy} />;
  }

  // 4. Maybank U (Vertical)
  if (theme === 'maybank' || nameClean.includes('maybank')) {
    return <CardMaybank accountNumber={accNum} holderName={holder} onCopy={handleCopy} />;
  }

  // 5. Bank Sinarmas
  if (theme === 'sinarmas' || nameClean.includes('sinarmas')) {
    return <CardSinarmas accountNumber={accNum} holderName={holder} onCopy={handleCopy} />;
  }

  // 6. OCBC Bank
  if (theme === 'ocbc' || nameClean.includes('ocbc')) {
    return <CardOcbc accountNumber={accNum} holderName={holder} onCopy={handleCopy} />;
  }

  // 7. Bank Mega
  if (theme === 'mega' || nameClean.includes('mega')) {
    return <CardMega accountNumber={accNum} holderName={holder} onCopy={handleCopy} />;
  }

  // 8. PermataBank
  if (theme === 'permata' || nameClean.includes('permata')) {
    return <CardPermata accountNumber={accNum} holderName={holder} onCopy={handleCopy} />;
  }

  // 9. Bank Danamon
  if (theme === 'danamon' || nameClean.includes('danamon')) {
    return <CardDanamon accountNumber={accNum} holderName={holder} onCopy={handleCopy} />;
  }

  // 10. CIMB Niaga
  if (theme === 'cmniaga' || nameClean.includes('cimb') || nameClean.includes('niaga')) {
    return <CardCimbNiaga accountNumber={accNum} holderName={holder} onCopy={handleCopy} />;
  }

  // 11. Bank BTN Platinum (Vertical)
  if (theme === 'btn-premium') {
    return <CardBtnPremium accountNumber={accNum} holderName={holder} onCopy={handleCopy} />;
  }

  // 12. Bank BTN Gold (Vertical)
  if (theme === 'btn-gold') {
    return <CardBtnGold accountNumber={accNum} holderName={holder} onCopy={handleCopy} />;
  }

  // 13. Bank BTN Classic
  if (theme === 'btn' || nameClean.includes('btn')) {
    return <CardBtn accountNumber={accNum} holderName={holder} onCopy={handleCopy} />;
  }

  // 14. Bank Nagari (Debit Songket)
  if (theme === 'nagari' || nameClean.includes('nagari')) {
    return <CardNagari accountNumber={accNum} holderName={holder} onCopy={handleCopy} />;
  }

  // 15. Bank Muamalat (Vertical)
  if (theme === 'muamalat' || nameClean.includes('muamalat')) {
    return <CardMuamalat accountNumber={accNum} holderName={holder} onCopy={handleCopy} />;
  }

  // 16. KoinWorks NEO
  if (theme === 'neo' || nameClean.includes('neo')) {
    return <CardNeo accountNumber={accNum} holderName={holder} onCopy={handleCopy} />;
  }

  // 17. Bank Syariah Indonesia (BSI)
  if (theme === 'bsi' || nameClean.includes('bsi') || nameClean.includes('syariah')) {
    return <CardBsi accountNumber={accNum} holderName={holder} onCopy={handleCopy} />;
  }

  // 18. Bank BNI
  if (theme === 'bni' || nameClean.includes('bni')) {
    return <CardBni accountNumber={accNum} holderName={holder} onCopy={handleCopy} />;
  }

  // 19. Bank Central Asia (BCA)
  if (theme === 'bca' || nameClean.includes('bca')) {
    return <CardBca accountNumber={accNum} holderName={holder} onCopy={handleCopy} />;
  }

  // 20. Bank Mandiri
  if (theme === 'mandiri' || nameClean.includes('mandiri')) {
    return <CardMandiri accountNumber={accNum} holderName={holder} onCopy={handleCopy} />;
  }

  // 21. Bank BRI
  if (theme === 'bri' || nameClean.includes('bri')) {
    return <CardBri accountNumber={accNum} holderName={holder} onCopy={handleCopy} />;
  }

  // 22. DANA, GoPay & Default (Uses the 3D Parallax AtmCard component with theme)
  return (
    <AtmCard
      accountNumber={accNum}
      holderName={holder}
      bankName={bankName || details.bankName}
      cardTheme={theme as any}
      onCopy={handleCopy}
    />
  );
};
