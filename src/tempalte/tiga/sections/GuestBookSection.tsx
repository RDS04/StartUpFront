import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, XCircle, HelpCircle } from 'lucide-react';
import { SongketBorder } from '../components/SongketBorder';
import { GoldenSparkles } from '../components/GoldenSparkles';
import { INITIAL_GUEST_MESSAGES } from '../data';
import type { GuestBookMessage } from '../types';

interface GuestBookSectionProps {
  defaultGuestName?: string;
}

export const GuestBookSection: React.FC<GuestBookSectionProps> = ({ defaultGuestName = '' }) => {
  const [messages, setMessages] = useState<GuestBookMessage[]>(INITIAL_GUEST_MESSAGES);
  const [name, setName] = useState(defaultGuestName);
  const [status, setStatus] = useState<'hadir' | 'tidak_hadir' | 'masih_ragu'>('hadir');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const newMsg: GuestBookMessage = {
      id: Date.now().toString(),
      name: name.trim(),
      status,
      message: comment.trim(),
      createdAt: 'Baru saja',
    };

    setMessages([newMsg, ...messages]);
    setComment('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const counts = {
    hadir: messages.filter((m) => m.status === 'hadir').length,
    tidak_hadir: messages.filter((m) => m.status === 'tidak_hadir').length,
    masih_ragu: messages.filter((m) => m.status === 'masih_ragu').length,
  };

  return (
    <section id="ucapan" className="relative w-full bg-[#4a0910] text-[#3a060d] overflow-hidden flex flex-col justify-between items-center text-center px-4 py-4">
      <GoldenSparkles />

      {/* Songket Border Atas */}
      <SongketBorder position="top" />

      {/* Konten Buku Tamu */}
      <div className="w-full max-w-sm mx-auto my-6 px-2 z-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="bg-[#ded0b4] rounded-[60px] border border-[#cfa84a] shadow-[0_12px_40px_rgba(0,0,0,0.5)] p-5 sm:p-7 flex flex-col items-center"
        >
          <motion.h3
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif-royal italic text-2xl sm:text-3xl font-bold text-[#4a0910] mb-4"
          >
            Buku Tamu &amp; Doa Restu
          </motion.h3>

          {/* Kartu Ringkasan Kehadiran */}
          <div className="grid grid-cols-3 gap-2 w-full mb-6 text-white font-serif-royal text-xs">
            <motion.div
              whileHover={{ y: -2, scale: 1.03 }}
              className="bg-emerald-700/90 rounded-xl py-2 px-1 flex flex-col items-center shadow-sm"
            >
              <span className="text-base font-bold">{counts.hadir}</span>
              <span className="text-[10px]">Hadir</span>
            </motion.div>
            <motion.div
              whileHover={{ y: -2, scale: 1.03 }}
              className="bg-rose-700/90 rounded-xl py-2 px-1 flex flex-col items-center shadow-sm"
            >
              <span className="text-base font-bold">{counts.tidak_hadir}</span>
              <span className="text-[10px]">Tidak Hadir</span>
            </motion.div>
            <motion.div
              whileHover={{ y: -2, scale: 1.03 }}
              className="bg-amber-600/90 rounded-xl py-2 px-1 flex flex-col items-center shadow-sm"
            >
              <span className="text-base font-bold">{counts.masih_ragu}</span>
              <span className="text-[10px]">Masih Ragu</span>
            </motion.div>
          </div>

          {/* Form Input Ucapan */}
          <form onSubmit={handleSubmit} className="w-full space-y-3 mb-6 text-left">
            <div>
              <label className="block text-[11px] font-semibold text-[#4a0910] font-serif-royal mb-1">
                Nama Anda *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama lengkap"
                required
                className="w-full px-3 py-2 rounded-xl bg-[#f7efe1] border border-[#cfa84a] text-xs font-serif-royal text-[#4a0910] placeholder-[#4a0910]/50 focus:outline-none focus:ring-2 focus:ring-[#4a0910]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#4a0910] font-serif-royal mb-1">
                Konfirmasi Kehadiran *
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-[#f7efe1] border border-[#cfa84a] text-xs font-serif-royal text-[#4a0910] focus:outline-none focus:ring-2 focus:ring-[#4a0910]"
              >
                <option value="hadir">Hadir</option>
                <option value="tidak_hadir">Tidak Hadir</option>
                <option value="masih_ragu">Masih Ragu</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#4a0910] font-serif-royal mb-1">
                Ucapan &amp; Doa *
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                placeholder="Tuliskan doa & ucapan untuk kedua mempelai..."
                required
                className="w-full px-3 py-2 rounded-xl bg-[#f7efe1] border border-[#cfa84a] text-xs font-serif-royal text-[#4a0910] placeholder-[#4a0910]/50 focus:outline-none focus:ring-2 focus:ring-[#4a0910] resize-none"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#4a0910] hover:bg-[#36050b] text-[#f5ecd2] font-serif-royal font-semibold text-xs shadow-md border border-[#cfa84a] flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <Send className="w-3.5 h-3.5 text-[#cfa84a]" />
              <span>Kirim Ucapan</span>
            </motion.button>

            <AnimatePresence>
              {submitted && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-xs text-emerald-800 font-semibold font-serif-royal mt-1"
                >
                  Terima kasih! Ucapan Anda telah terkirim.
                </motion.p>
              )}
            </AnimatePresence>
          </form>

          {/* List Ucapan Masuk dengan Animasi */}
          <div className="w-full space-y-3 max-h-80 overflow-y-auto pr-1 template-tiga-scroll text-left">
            <AnimatePresence initial={false}>
              {messages.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="bg-[#f7efe1] rounded-2xl p-3.5 border border-[#cfa84a]/40 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <h5 className="text-xs font-bold text-[#4a0910] font-serif-royal">
                      {item.name}
                    </h5>
                    <span
                      className={`inline-flex items-center gap-1 text-[9px] font-semibold px-2 py-0.5 rounded-full ${
                        item.status === 'hadir'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : item.status === 'tidak_hadir'
                          ? 'bg-rose-100 text-rose-800 border border-rose-300'
                          : 'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}
                    >
                      {item.status === 'hadir' && <CheckCircle2 className="w-2.5 h-2.5" />}
                      {item.status === 'tidak_hadir' && <XCircle className="w-2.5 h-2.5" />}
                      {item.status === 'masih_ragu' && <HelpCircle className="w-2.5 h-2.5" />}
                      <span>
                        {item.status === 'hadir'
                          ? 'Hadir'
                          : item.status === 'tidak_hadir'
                          ? 'Tidak Hadir'
                          : 'Ragu'}
                      </span>
                    </span>
                  </div>
                  <p className="text-xs text-[#3a060d] font-serif-royal leading-relaxed">
                    {item.message}
                  </p>
                  <span className="text-[10px] text-[#4a0910]/60 font-serif-royal mt-1 block">
                    {item.createdAt}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Songket Border Bawah */}
      <SongketBorder position="bottom" />
    </section>
  );
};

export default GuestBookSection;
