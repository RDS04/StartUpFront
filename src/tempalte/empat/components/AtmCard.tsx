import React, { useState } from 'react';
import type { BankAccount } from '../types';
import { InteractiveAtmCard3D } from '../../CardAtm/InteractiveAtmCard3D';

interface AtmCardProps {
  account: BankAccount;
}

export const AtmCard: React.FC<AtmCardProps> = ({ account }) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleCopy = (text: string, label?: string) => {
    navigator.clipboard.writeText(text);
    setToastMessage(`${label || 'Nomor rekening'} berhasil disalin!`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      <InteractiveAtmCard3D
        bankName={account.bankName}
        accountNumber={account.accountNumber}
        holderName={account.accountHolder}
        cardTheme={account.cardTheme}
        type={account.type}
        logoUrl={account.logoUrl}
        onCopy={handleCopy}
        compact={false}
        interactive={true}
      />
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-emerald-600 text-white text-xs font-semibold py-2 px-4 rounded-full shadow-2xl animate-in fade-in slide-in-from-bottom-2">
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default AtmCard;

