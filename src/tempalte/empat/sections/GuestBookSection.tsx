import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, MessageSquare, User, Users, Loader2 } from 'lucide-react';
import { INITIAL_GUEST_BOOK, WEDDING_INFO } from '../data';
import type { GuestBookMessage } from '../types';
import { submitRsvp, getPublicRsvps } from '../../../services/rsvpService';
import { getSavedDashboardData } from '../../../dashboard/initialData';

export const GuestBookSection: React.FC = () => {
  const [messages, setMessages] = useState<GuestBookMessage[]>(INITIAL_GUEST_BOOK);
  const [name, setName] = useState('');
  const [pax, setPax] = useState('1');
  const [attendance, setAttendance] = useState<'Hadir' | 'Tidak hadir' | 'Masih Ragu'>('Hadir');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getSlug = () => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace(/^#\/?/, '').split('?')[0].trim();
      const path = window.location.pathname.replace(/^\//, '').split('?')[0].trim();
      const s = hash || path;
      if (s && s !== 'invitation' && s !== 'dashboard') return s;
    }
    return getSavedDashboardData().slug || '';
  };

  useEffect(() => {
    const slug = getSlug();
    if (slug) {
      getPublicRsvps(slug).then((res) => {
        if (res.status && Array.isArray(res.messages) && res.messages.length > 0) {
          setMessages(res.messages as any);
        }
      }).catch(() => {});
    }
  }, []);

  // Hitung jumlah statistik
  const countHadir = messages.filter((m) => m.attendance === 'Hadir').length;
  const countTidakHadir = messages.filter((m) => m.attendance === 'Tidak hadir').length;
  const countRagu = messages.filter((m) => m.attendance === 'Masih Ragu').length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    const slug = getSlug();

    const newMessage: GuestBookMessage = {
      id: `gb-${Date.now()}`,
      name: name.trim(),
      attendance,
      message: comment.trim(),
      timeAgo: 'Baru saja',
    };

    setMessages([newMessage, ...messages]);
    setSubmitted(true);

    try {
      await submitRsvp({
        slug,
        name: name.trim(),
        pax: pax === '5+' ? 5 : parseInt(pax, 10),
        status: attendance,
        message: comment.trim(),
      });
    } catch (err) {
      console.warn('Gagal menyimpan rsvp ke server:', err);
    } finally {
      setIsSubmitting(false);
      setName('');
      setComment('');
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  const handleSendToWhatsApp = () => {
    if (!name.trim()) return;
    const slug = getSlug();
    submitRsvp({
      slug,
      name: name.trim(),
      pax: pax === '5+' ? 5 : parseInt(pax, 10),
      status: attendance,
      message: comment.trim() || 'Selamat berbahagia untuk kedua mempelai!',
    }).catch(() => {});

    const text = encodeURIComponent(
      `Hai, saya ${name} ingin konfirmasi kehadiran pada undangan pernikahan digital ${WEDDING_INFO.coupleDisplay} bahwa: ${attendance} bersama ${pax} orang. Ucapan: "${comment || 'Selamat berbahagia'}". Terima kasih!`
    );
    window.open(`https://api.whatsapp.com/send?phone=${WEDDING_INFO.whatsappRsvpNumber}&text=${text}`, '_blank');
  };

  return (
    <section id="guestbook-section" className="relative px-6 py-16 bg-[#f3f6ee] text-[#2c3d2f] overflow-hidden">
      <div className="max-w-sm sm:max-w-md mx-auto space-y-8">
        {/* Section Header */}
        <div className="text-center space-y-1.5">
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#718569] bg-white px-3 py-1 rounded-full border border-[#8f9e7b]/30">
            RSVP &amp; Wishes
          </span>
          <h2 className="font-sage-serif text-2xl sm:text-3xl font-bold text-[#233325]">
            Doa &amp; Ucapan
          </h2>
          <div className="w-12 h-0.5 bg-[#c5a454] mx-auto rounded-full mt-2" />
        </div>

        <p className="text-xs text-[#52664e] text-center leading-relaxed font-light">
          Tinggalkan doa dan ucapan terbaik Anda serta konfirmasi kehadiran untuk momen hari bahagia kami.
        </p>

        {/* Stats Summary Cards */}
        <div className="grid grid-cols-3 gap-2 text-center text-white">
          <div className="bg-[#3D9A62] p-2.5 rounded-xl shadow-xs">
            <span className="text-lg font-bold block leading-tight">{countHadir}</span>
            <span className="text-[10px] font-medium tracking-wide">Hadir</span>
          </div>
          <div className="bg-[#d90a11] p-2.5 rounded-xl shadow-xs">
            <span className="text-lg font-bold block leading-tight">{countTidakHadir}</span>
            <span className="text-[10px] font-medium tracking-wide">Tidak Hadir</span>
          </div>
          <div className="bg-[#d7a916] p-2.5 rounded-xl shadow-xs">
            <span className="text-lg font-bold block leading-tight">{countRagu}</span>
            <span className="text-[10px] font-medium tracking-wide">Masih Ragu</span>
          </div>
        </div>

        {/* RSVP Form Card */}
        <div className="bg-white rounded-2xl p-6 border border-[#8f9e7b]/30 shadow-md space-y-4">
          <h3 className="font-sage-serif font-bold text-sm text-[#243525] flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#8f9e7b]" />
            <span>Formulir Konfirmasi Kehadiran</span>
          </h3>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Nama */}
            <div>
              <label className="block text-[11px] font-semibold text-[#485b45] mb-1">
                Nama Lengkap
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#8f9e7b] absolute left-3 top-3 pointer-events-none" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama Anda"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#c4d1bc] bg-[#fafbf8] text-xs text-[#2c3d2f] focus:outline-none focus:border-[#5b6e55] focus:bg-white"
                  required
                />
              </div>
            </div>

            {/* Jumlah Pax */}
            <div>
              <label className="block text-[11px] font-semibold text-[#485b45] mb-1">
                Jumlah Hadir (Pax)
              </label>
              <div className="relative">
                <Users className="w-4 h-4 text-[#8f9e7b] absolute left-3 top-3 pointer-events-none" />
                <select
                  value={pax}
                  onChange={(e) => setPax(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#c4d1bc] bg-[#fafbf8] text-xs text-[#2c3d2f] focus:outline-none focus:border-[#5b6e55] focus:bg-white cursor-pointer"
                >
                  <option value="1">1 Orang</option>
                  <option value="2">2 Orang</option>
                  <option value="3">3 Orang</option>
                  <option value="4">4 Orang</option>
                  <option value="5+">Lebih dari 4 Orang</option>
                </select>
              </div>
            </div>

            {/* Konfirmasi Kehadiran (Radio Options) */}
            <div>
              <label className="block text-[11px] font-semibold text-[#485b45] mb-1.5">
                Konfirmasi Kehadiran
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'Hadir', label: 'Hadir', color: 'border-emerald-600 text-emerald-800 bg-emerald-50' },
                  { value: 'Tidak hadir', label: 'Berhalangan', color: 'border-rose-600 text-rose-800 bg-rose-50' },
                  { value: 'Masih Ragu', label: 'Ragu-ragu', color: 'border-amber-600 text-amber-800 bg-amber-50' },
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setAttendance(item.value as any)}
                    className={`py-2 px-1 text-[11px] font-bold rounded-xl border transition-all cursor-pointer ${
                      attendance === item.value
                        ? `${item.color} shadow-xs scale-102`
                        : 'border-[#d0dcc9] text-slate-600 bg-white hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Pesan / Doa */}
            <div>
              <label className="block text-[11px] font-semibold text-[#485b45] mb-1">
                Pesan Ucapan &amp; Doa Restu
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tuliskan doa restu untuk kedua mempelai..."
                rows={3}
                className="w-full p-3 rounded-xl border border-[#c4d1bc] bg-[#fafbf8] text-xs text-[#2c3d2f] focus:outline-none focus:border-[#5b6e55] focus:bg-white resize-none"
                required
              />
            </div>

            {/* Submit & WhatsApp Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#5b6e55] hover:bg-[#475742] disabled:opacity-60 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Mengirim...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirim Ucapan</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleSendToWhatsApp}
                className="py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Kirim via WA</span>
              </button>
            </div>

            {submitted && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Terima kasih! Doa dan konfirmasi kehadiran Anda berhasil dikirimkan.</span>
              </div>
            )}
          </form>
        </div>

        {/* Wishes List Comments */}
        <div className="space-y-3 pt-2">
          <h4 className="font-sage-serif font-bold text-xs uppercase tracking-wider text-[#546850]">
            Ucapan Terbaru ({messages.length})
          </h4>

          <div className="space-y-3 max-h-96 overflow-y-auto pr-1 sage-scroll">
            {messages.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-white border border-[#8f9e7b]/30 shadow-xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#8f9e7b]/20 text-[#3d503b] font-bold text-xs flex items-center justify-center">
                      {item.name[0]?.toUpperCase() || 'U'}
                    </div>
                    <div>
                      <span className="font-sage-serif font-bold text-xs text-[#203122] block">
                        {item.name}
                      </span>
                      <span className="text-[10px] text-[#7d9178]">
                        {item.timeAgo}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                      item.attendance === 'Hadir'
                        ? 'bg-emerald-100 text-emerald-800'
                        : item.attendance === 'Tidak hadir'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {item.attendance}
                  </span>
                </div>

                <p className="text-xs text-[#485b45] leading-relaxed font-light pl-9">
                  {item.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
