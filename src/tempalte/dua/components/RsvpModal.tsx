import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Check, Send, Users, X } from 'lucide-react';
import { COUPLE } from '../data';
import { submitRsvp, getPublicRsvps } from '../../../services/rsvpService';
import { getSavedDashboardData } from '../../../dashboard/initialData';

export interface Wish {
  id: string;
  name: string;
  attendance: 'hadir' | 'tidak' | 'ragu';
  guests: number;
  message: string;
  time: number;
}

const STORAGE_KEY = 'dr-wishes-vani-rahmat';

const SEED: Wish[] = [
  {
    id: 's1',
    name: 'Keluarga Besar Ampalu',
    attendance: 'hadir',
    guests: 2,
    message: 'Barakallahu lakuma wa baraka alaikuma wa jama’a bainakuma fii khair. Selamat Vani & Rahmat!',
    time: Date.now() - 1000 * 60 * 60 * 5,
  },
];

const ATTEND_LABEL: Record<Wish['attendance'], string> = {
  hadir: 'Hadir',
  tidak: 'Tidak Hadir',
  ragu: 'Masih Ragu',
};

const timeAgo = (t: number) => {
  const m = Math.floor((Date.now() - t) / 60000);
  if (m < 1) return 'Baru saja';
  if (m < 60) return `${m} menit lalu`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} jam lalu`;
  return `${Math.floor(h / 24)} hari lalu`;
};

interface RsvpModalProps {
  open: boolean;
  onClose: () => void;
  defaultName: string;
  onToast: (msg: string) => void;
}

const RsvpModal: React.FC<RsvpModalProps> = ({ open, onClose, defaultName, onToast }) => {
  const [wishes, setWishes] = useState<Wish[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Wish[]) : SEED;
    } catch {
      return SEED;
    }
  });
  const [name, setName] = useState(defaultName === 'Tamu Undangan' ? '' : defaultName);
  const [attendance, setAttendance] = useState<Wish['attendance']>('hadir');
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
    } catch {
      /* ignore quota errors */
    }
  }, [wishes]);

  useEffect(() => {
    const getInvitationSlug = () => {
      const hash = window.location.hash || '';
      if (hash.startsWith('#/')) {
        const parts = hash.slice(2).split('?')[0].split('/');
        if (parts[0] && parts[0] !== 'dashboard' && parts[0] !== 'order' && parts[0] !== 'admin') {
          return parts[0];
        }
      }
      const saved = getSavedDashboardData();
      return saved?.slug || 'vani-rahmat';
    };

    getPublicRsvps(getInvitationSlug())
      .then((res) => {
        if (res.messages && Array.isArray(res.messages) && res.messages.length > 0) {
          const loaded: Wish[] = res.messages.map((r) => ({
            id: String(r.id),
            name: r.name,
            attendance: (r.status === 'hadir' ? 'hadir' : r.status === 'tidak' ? 'tidak' : 'ragu') as Wish['attendance'],
            guests: Number(r.pax) || 1,
            message: r.message || '',
            time: Date.now(),
          }));
          setWishes(loaded);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim() || sending) return;
    setSending(true);

    const getInvitationSlug = () => {
      const hash = window.location.hash || '';
      if (hash.startsWith('#/')) {
        const parts = hash.slice(2).split('?')[0].split('/');
        if (parts[0] && parts[0] !== 'dashboard' && parts[0] !== 'order' && parts[0] !== 'admin') {
          return parts[0];
        }
      }
      const saved = getSavedDashboardData();
      return saved?.slug || 'vani-rahmat';
    };

    const newWish: Wish = {
      id: String(Date.now()),
      name: name.trim(),
      attendance,
      guests,
      message: message.trim(),
      time: Date.now(),
    };

    setWishes((w) => [newWish, ...w]);
    setMessage('');

    try {
      await submitRsvp({
        slug: getInvitationSlug(),
        name: name.trim(),
        pax: attendance === 'hadir' ? guests : 1,
        status: attendance,
        message: message.trim(),
      });
    } catch (err) {
      console.warn('Gagal menyimpan rsvp ke server:', err);
    } finally {
      setSending(false);
      onToast('Terima kasih atas ucapan & konfirmasinya 🤍');
    }
  };

  const hadirCount = wishes.filter((w) => w.attendance === 'hadir').length;

  return createPortal(
    <div className="dr-root fixed inset-0 z-[90] flex items-end justify-center sm:items-center" role="dialog" aria-modal="true">
      <div className="dr-modal-backdrop absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="dr-modal-panel relative flex max-h-[92vh] w-full max-w-[430px] flex-col overflow-hidden rounded-t-3xl bg-[var(--dr-cream)] text-[var(--dr-ink)] shadow-2xl sm:rounded-3xl">
        {/* header */}
        <div className="relative bg-[var(--dr-bg)] px-6 pb-5 pt-6 text-center text-white">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 cursor-pointer rounded-full bg-white/15 p-1.5 hover:bg-white/25"
            aria-label="Tutup"
          >
            <X className="h-4 w-4" />
          </button>
          <h3 className="dr-script text-3xl">Ucapan &amp; Doa</h3>
          <p className="mt-1 text-[12px] text-white/85">
            untuk {COUPLE.shortBride} &amp; {COUPLE.shortGroom}
          </p>
          <div className="mt-3 flex justify-center gap-3 text-[11px]">
            <span className="rounded-full bg-white/15 px-3 py-1">{wishes.length} Ucapan</span>
            <span className="rounded-full bg-white/15 px-3 py-1">{hadirCount} Hadir</span>
          </div>
        </div>

        <div className="dr-scroll flex-1 overflow-y-auto px-5 py-5">
          {/* form */}
          <form onSubmit={submit} className="space-y-3">
            <input
              id="dr-rsvp-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama Anda"
              className="w-full rounded-xl border border-[var(--dr-bg)]/30 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[var(--dr-bg)] focus:ring-2 focus:ring-[var(--dr-bg)]/20"
              required
            />
            <div className="grid grid-cols-3 gap-2">
              {(Object.keys(ATTEND_LABEL) as Wish['attendance'][]).map((k) => (
                <button
                  type="button"
                  key={k}
                  onClick={() => setAttendance(k)}
                  className={`cursor-pointer rounded-xl border px-2 py-2 text-[12px] font-medium transition ${
                    attendance === k
                      ? 'border-[var(--dr-bg)] bg-[var(--dr-bg)] text-white shadow'
                      : 'border-[var(--dr-bg)]/30 bg-white text-[var(--dr-accent)] hover:border-[var(--dr-bg)]'
                  }`}
                >
                  {ATTEND_LABEL[k]}
                </button>
              ))}
            </div>
            {attendance === 'hadir' && (
              <div className="flex items-center justify-between rounded-xl border border-[var(--dr-bg)]/30 bg-white px-4 py-2">
                <span className="flex items-center gap-2 text-[13px] text-[var(--dr-accent)]">
                  <Users className="h-4 w-4" /> Jumlah tamu
                </span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setGuests((g) => Math.max(1, g - 1))}
                    className="h-7 w-7 cursor-pointer rounded-full bg-[var(--dr-bg)]/15 font-bold text-[var(--dr-accent)]"
                  >
                    −
                  </button>
                  <span className="w-4 text-center text-sm font-semibold">{guests}</span>
                  <button
                    type="button"
                    onClick={() => setGuests((g) => Math.min(5, g + 1))}
                    className="h-7 w-7 cursor-pointer rounded-full bg-[var(--dr-bg)]/15 font-bold text-[var(--dr-accent)]"
                  >
                    +
                  </button>
                </div>
              </div>
            )}
            <textarea
              id="dr-rsvp-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tulis ucapan & doa terbaik Anda..."
              rows={3}
              className="w-full resize-none rounded-xl border border-[var(--dr-bg)]/30 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[var(--dr-bg)] focus:ring-2 focus:ring-[var(--dr-bg)]/20"
              required
            />
            <button
              type="submit"
              disabled={sending}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[var(--dr-accent)] py-2.5 text-sm font-medium text-white transition hover:bg-[#3f3a38] disabled:opacity-60"
            >
              {sending ? 'Mengirim...' : (<><Send className="h-4 w-4" /> Kirim Ucapan</>)}
            </button>
          </form>

          {/* list */}
          <div className="mt-6 space-y-3">
            {wishes.map((w) => (
              <div key={w.id} className="rounded-2xl border border-[var(--dr-bg)]/15 bg-white p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--dr-bg)] text-sm font-semibold uppercase text-white">
                    {w.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <p className="truncate text-sm font-semibold">{w.name}</p>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] ${
                          w.attendance === 'hadir'
                            ? 'bg-emerald-50 text-emerald-700'
                            : w.attendance === 'ragu'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-rose-50 text-rose-700'
                        }`}
                      >
                        {w.attendance === 'hadir' && <Check className="h-3 w-3" />}
                        {ATTEND_LABEL[w.attendance]}
                      </span>
                    </div>
                    <p className="mt-1 text-[13px] leading-relaxed text-[var(--dr-ink)]/80">{w.message}</p>
                    <p className="mt-1.5 text-[10px] text-[var(--dr-ink)]/45">{timeAgo(w.time)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default RsvpModal;
