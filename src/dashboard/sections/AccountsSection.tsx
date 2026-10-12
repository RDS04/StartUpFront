import React from 'react';
import { Gift, Plus, Trash2, Copy, Save, CreditCard } from 'lucide-react';
import type { DashboardData, TierConfig, BankAccount } from '../types';

interface AccountsSectionProps {
  data: DashboardData;
  setData: React.Dispatch<React.SetStateAction<DashboardData>>;
  tierConfig: TierConfig;
  onCopyText: (text: string, label?: string) => void;
  onShowToast: (msg: string) => void;
}

export const AccountsSection: React.FC<AccountsSectionProps> = ({
  data,
  setData,
  tierConfig,
  onCopyText,
  onShowToast,
}) => {
  const handleAddAccount = () => {
    if (data.bankAccounts.length >= tierConfig.maxBank) {
      onShowToast(`Batas rekening untuk paket ${tierConfig.name} sudah maksimal (${tierConfig.maxBank})!`);
      return;
    }
    const newAcc: BankAccount = {
      id: Date.now(),
      bank: 'Bank BCA',
      number: '1234567890',
      holder: data.groom.nickName || 'Pengantin',
    };
    setData({
      ...data,
      bankAccounts: [...data.bankAccounts, newAcc],
    });
    onShowToast('Rekening baru berhasil ditambahkan');
  };

  const handleDeleteAccount = (id: number) => {
    setData({
      ...data,
      bankAccounts: data.bankAccounts.filter((a) => a.id !== id),
    });
    onShowToast('Rekening berhasil dihapus');
  };

  const handleSaveAll = () => {
    onShowToast('Pengaturan amplop digital & alamat kado berhasil disimpan!');
  };

  return (
    <div className="space-y-6 max-w-3xl animate-in fade-in">
      <div>
        <h1 className="text-xl font-bold text-stone-900 font-serif">Amplop Digital & Kirim Kado</h1>
        <p className="text-xs text-stone-500 mt-0.5">
          Nomor rekening bank atau e-wallet serta alamat kado untuk tamu yang ingin memberikan tanda kasih secara cashless.
        </p>
      </div>

      {/* Rekening Bank & E-Wallet */}
      <div className="space-y-4">
        <h2 className="font-bold text-stone-800 text-sm flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-[#2D6A4F]" /> Rekening Amplop Digital
        </h2>

        {data.bankAccounts.map((acc, index) => (
          <div
            key={acc.id}
            className="p-5 rounded-3xl border border-stone-200 bg-[#FAF7F2] space-y-3.5 shadow-xs"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                Rekening #{index + 1}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onCopyText(acc.number, `Nomor rekening ${acc.bank} disalin`)}
                  className="text-stone-500 hover:text-stone-800 text-xs font-medium flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" /> Uji Salin
                </button>
                {data.bankAccounts.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleDeleteAccount(acc.id)}
                    className="text-rose-500 hover:text-rose-700 text-xs font-medium ml-2 flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Hapus
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                  Nama Bank / E-Wallet
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Bank BCA, Mandiri, Dana"
                  value={acc.bank}
                  onChange={(e) => {
                    const updated = data.bankAccounts.map((a) =>
                      a.id === acc.id ? { ...a, bank: e.target.value } : a
                    );
                    setData({ ...data, bankAccounts: updated });
                  }}
                  className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                  Nomor Rekening
                </label>
                <input
                  type="text"
                  placeholder="Nomor rekening tanpa spasi"
                  value={acc.number}
                  onChange={(e) => {
                    const updated = data.bankAccounts.map((a) =>
                      a.id === acc.id ? { ...a, number: e.target.value } : a
                    );
                    setData({ ...data, bankAccounts: updated });
                  }}
                  className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2 font-mono focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                  Atas Nama (Pemilik)
                </label>
                <input
                  type="text"
                  placeholder="Nama pemilik rekening"
                  value={acc.holder}
                  onChange={(e) => {
                    const updated = data.bankAccounts.map((a) =>
                      a.id === acc.id ? { ...a, holder: e.target.value } : a
                    );
                    setData({ ...data, bankAccounts: updated });
                  }}
                  className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                />
              </div>
            </div>
          </div>
        ))}

        {data.bankAccounts.length < tierConfig.maxBank ? (
          <button
            onClick={handleAddAccount}
            className="w-full py-3 border-2 border-dashed border-stone-300 hover:border-emerald-600 rounded-2xl text-xs font-semibold text-stone-600 hover:text-[#2D6A4F] transition flex items-center justify-center gap-1.5 cursor-pointer bg-white"
          >
            <Plus className="w-4 h-4" /> Tambah Rekening Lainnya
          </button>
        ) : (
          <p className="text-[11px] text-stone-400 italic text-center py-1">
            Batas maksimum rekening untuk paket {tierConfig.name} tercapai ({tierConfig.maxBank} rekening).
          </p>
        )}
      </div>

      {/* Alamat Pengiriman Kado Fisik */}
      <div className="p-6 rounded-3xl border border-stone-200 bg-white space-y-4 shadow-xs">
        <h2 className="font-bold text-stone-800 text-sm flex items-center gap-2">
          <Gift className="w-4 h-4 text-[#2D6A4F]" /> Alamat Pengiriman Kado Fisik
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="text-[11px] font-semibold text-stone-600 block mb-1">
              Nama Penerima Kado
            </label>
            <input
              type="text"
              value={data.giftAddress?.recipient || ''}
              onChange={(e) =>
                setData({
                  ...data,
                  giftAddress: {
                    recipient: e.target.value,
                    phone: data.giftAddress?.phone || '',
                    address: data.giftAddress?.address || '',
                    notes: data.giftAddress?.notes || '',
                  },
                })
              }
              className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-stone-600 block mb-1">
              Nomor Telepon Penerima
            </label>
            <input
              type="text"
              value={data.giftAddress?.phone || ''}
              onChange={(e) =>
                setData({
                  ...data,
                  giftAddress: {
                    recipient: data.giftAddress?.recipient || '',
                    phone: e.target.value,
                    address: data.giftAddress?.address || '',
                    notes: data.giftAddress?.notes || '',
                  },
                })
              }
              className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
            />
          </div>
        </div>

        <div>
          <label className="text-[11px] font-semibold text-stone-600 block mb-1">
            Alamat Lengkap Rumah / Kantor
          </label>
          <textarea
            rows={2}
            value={data.giftAddress?.address || ''}
            onChange={(e) =>
              setData({
                ...data,
                giftAddress: {
                  recipient: data.giftAddress?.recipient || '',
                  phone: data.giftAddress?.phone || '',
                  address: e.target.value,
                  notes: data.giftAddress?.notes || '',
                },
              })
            }
            className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
          />
        </div>

        <div>
          <label className="text-[11px] font-semibold text-stone-600 block mb-1">
            Catatan Tambahan untuk Tamu / Kurir
          </label>
          <input
            type="text"
            value={data.giftAddress?.notes || ''}
            onChange={(e) =>
              setData({
                ...data,
                giftAddress: {
                  recipient: data.giftAddress?.recipient || '',
                  phone: data.giftAddress?.phone || '',
                  address: data.giftAddress?.address || '',
                  notes: e.target.value,
                },
              })
            }
            className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="pt-2">
        <button
          onClick={handleSaveAll}
          className="w-full sm:w-auto px-7 py-3 bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-semibold text-xs rounded-xl shadow-sm transition active:scale-95 cursor-pointer flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4" /> Simpan Amplop & Kado
        </button>
      </div>
    </div>
  );
};
