import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Copy, Check, MessageCircle } from 'lucide-react';
import { SongketBorder } from '../components/SongketBorder';
import { GoldenSparkles } from '../components/GoldenSparkles';
import { BANK_ACCOUNTS, WEDDING_INFO, ASSETS } from '../data';

interface GiftSectionProps {
  onShowToast: (msg: string) => void;
}

export const GiftSection: React.FC<GiftSectionProps> = ({ onShowToast }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    onShowToast(`${label} berhasil disalin!`);
    setTimeout(() => {
      setCopiedId(null);
    }, 2500);
  };

  return (
    <section className="relative w-full bg-[#4a0910] text-[#3a060d] overflow-hidden flex flex-col justify-between items-center text-center px-4 py-4">
      <GoldenSparkles />

      {/* Songket Border Atas */}
      <SongketBorder position="top" />

      {/* Konten Hadiah */}
      <div className="w-full max-w-sm mx-auto my-6 px-2 z-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="bg-[#ded0b4] rounded-[60px] border border-[#cfa84a] shadow-[0_12px_40px_rgba(0,0,0,0.5)] p-6 sm:p-8 flex flex-col items-center"
        >
          {/* Foto Mempelai dalam Oval Frame */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-36 h-48 rounded-full overflow-hidden border-2 border-[#4a0910] shadow-md mb-4"
          >
            <img
              src={ASSETS.bridePhoto}
              alt="Mempelai"
              className="w-full h-full object-cover object-top"
              loading="lazy"
            />
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif-royal italic text-2xl sm:text-3xl font-bold text-[#4a0910] mb-2"
          >
            Kirim Hadiah
          </motion.h3>

          <p className="text-xs sm:text-[13px] text-[#4a0910] font-serif-royal leading-relaxed max-w-xs mb-6">
            Doa Restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika memberi adalah ungkapan tanda kasih Anda, Anda dapat memberi kado secara cashless.
          </p>

          {/* Tombol Toggle Buka Kartu Rekening */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="px-6 py-2.5 rounded-lg bg-[#4a0910] hover:bg-[#36050b] text-[#f5ecd2] font-serif-royal font-semibold text-xs sm:text-sm shadow-md border border-[#cfa84a] flex items-center gap-2 cursor-pointer group mb-4 transition-colors"
          >
            <Gift className="w-4 h-4 text-[#cfa84a] group-hover:rotate-12 transition-transform" />
            <span>{isOpen ? 'Tutup Amplop' : 'Kirim Amplop'}</span>
          </motion.button>

          {/* Bagian Rekening (Accordion dengan AnimatePresence) */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full space-y-4 pt-4 border-t border-[#4a0910]/20 overflow-hidden"
              >
                {BANK_ACCOUNTS.map((acc, idx) => (
                  <motion.div
                    key={acc.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-[#f7efe1] rounded-2xl p-4 border border-[#cfa84a]/60 shadow-sm flex flex-col items-center"
                  >
                    {acc.logoUrl && (
                      <img
                        src={acc.logoUrl}
                        alt={acc.bankName}
                        className="h-7 sm:h-8 object-contain mb-2"
                        loading="lazy"
                      />
                    )}
                    <p className="text-xs font-semibold text-[#4a0910] font-serif-royal">
                      {acc.accountHolder}
                    </p>
                    <p className="text-base sm:text-lg font-bold text-[#4a0910] font-mono my-1 tracking-wider">
                      {acc.accountNumber}
                    </p>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => copyToClipboard(acc.accountNumber, acc.id, `No Rekening ${acc.bankName}`)}
                      className="mt-2 px-4 py-1.5 rounded-full bg-[#ded0b4] hover:bg-[#cfa84a] text-[#4a0910] font-serif-royal font-semibold text-xs border border-[#cfa84a] flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      {copiedId === acc.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#4a0910]" />
                          <span>Copy No.Rek</span>
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                ))}

                {/* Alamat Pengiriman Kado Fisik */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-[#f7efe1] rounded-2xl p-4 border border-[#cfa84a]/60 shadow-sm flex flex-col items-center"
                >
                  <p className="text-xs font-bold text-[#4a0910] font-serif-royal mb-1">
                    Alamat Pengiriman Kado :
                  </p>
                  <p className="text-xs text-[#3a060d] font-serif-royal text-center leading-relaxed mb-3">
                    {WEDDING_INFO.physicalGiftAddress}
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => copyToClipboard(WEDDING_INFO.physicalGiftAddress, 'alamat', 'Alamat Kado')}
                    className="px-4 py-1.5 rounded-full bg-[#ded0b4] hover:bg-[#cfa84a] text-[#4a0910] font-serif-royal font-semibold text-xs border border-[#cfa84a] flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    {copiedId === 'alamat' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Alamat Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#4a0910]" />
                        <span>Copy Alamat</span>
                      </>
                    )}
                  </motion.button>
                </motion.div>

                {/* Tombol Konfirmasi WA */}
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  href={WEDDING_INFO.whatsappConfirmUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-serif-royal font-semibold text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Konfirmasi Mempelai</span>
                </motion.a>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Songket Border Bawah */}
      <SongketBorder position="bottom" />
    </section>
  );
};

export default GiftSection;
