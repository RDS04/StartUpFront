import React, { useState } from 'react';
import { Gift, Plus, Trash2, Copy, Save, CreditCard, Sparkles, Loader2, Check } from 'lucide-react';
import type { DashboardData, TierConfig, BankAccount } from '../types';
import { InteractiveAtmCard3D } from '../../tempalte/CardAtm/InteractiveAtmCard3D';
import { Card3DSelectorModal } from '../components/Card3DSelectorModal';
import { getBankCardDetails, BANK_CARD_CATALOG, type BankCardOption } from '../../tempalte/CardAtm/bankCardCatalog';
import { saveMyInvitation } from '../../services/invitationService';
import { saveDashboardData } from '../initialData';

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
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAccId, setSelectedAccId] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleAddAccount = (preset?: Partial<BankAccount>) => {
    if (data.bankAccounts.length >= tierConfig.maxBank) {
      onShowToast(`Batas rekening untuk paket ${tierConfig.name} sudah maksimal (${tierConfig.maxBank})!`);
      return;
    }

    const defaultBank = preset?.bank || (data.bankAccounts.length === 0 ? 'Bank Nagari' : 'DANA / E-Wallet');
    const details = getBankCardDetails(defaultBank);

    const newAcc: BankAccount = {
      id: Date.now(),
      bank: defaultBank,
      number: preset?.number || (defaultBank.includes('Nagari') ? '10050213051101' : '082391680946'),
      holder: preset?.holder || data.bride.fullName || data.groom.fullName || 'SILVANA REZA ANGGRAINI',
      cardTheme: details.cardTheme,
      type: details.type,
      logoUrl: details.logoUrl,
    };

    setData((prev) => ({
      ...prev,
      bankAccounts: [...prev.bankAccounts, newAcc],
    }));
    onShowToast(`Rekening ${defaultBank} berhasil ditambahkan`);
  };

  const handleDeleteAccount = (id: number) => {
    setData((prev) => ({
      ...prev,
      bankAccounts: prev.bankAccounts.filter((a) => a.id !== id),
    }));
    onShowToast('Rekening berhasil dihapus');
  };

  const handleOpenCardModal = (accId: number) => {
    setSelectedAccId(accId);
    setModalOpen(true);
  };

  const handleSelectCardForAccount = (card: BankCardOption) => {
    if (selectedAccId === null) return;
    setData((prev) => ({
      ...prev,
      bankAccounts: prev.bankAccounts.map((a) =>
        a.id === selectedAccId
          ? {
              ...a,
              bank: card.bankName,
              cardTheme: card.cardTheme,
              type: card.type,
              logoUrl: card.logoUrl,
            }
          : a
      ),
    }));
    onShowToast(`Desain kartu ${card.bankName} berhasil dipilih!`);
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    try {
      saveDashboardData(data);
      await saveMyInvitation(data);
      onShowToast('Pengaturan amplop digital & kartu ATM 3D berhasil disimpan ke database!');
    } catch (err: any) {
      console.warn('Gagal menyimpan amplop ke backend:', err);
      onShowToast('Tersimpan di perangkat lokal. Pastikan server terhubung.');
    } finally {
      setIsSaving(false);
    }
  };

  // Quick preset options for one-click card switching
  const quickOptions = BANK_CARD_CATALOG.slice(0, 8);

  const activeAccountForModal = data.bankAccounts.find((a) => a.id === selectedAccId);

  return (
    <div className="space-y-6 max-w-4xl animate-in fade-in pb-12">
      {/* Title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif">
          Amplop Digital &amp; Kirim Kado
        </h1>
        <p className="text-xs text-stone-500 mt-0.5">
          Pilih desain kartu ATM / E-Wallet 3D interaktif dan atur nomor rekening untuk tanda kasih tamu undangan.
        </p>
      </div>

      {/* Rekening Bank & E-Wallet */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-stone-800 text-sm flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-[#2D6A4F]" /> Rekening Amplop Digital ({data.bankAccounts.length}/{tierConfig.maxBank})
          </h2>

          {data.bankAccounts.length === 0 && (
            <button
              type="button"
              onClick={() => handleAddAccount()}
              className="text-xs font-bold text-[#2D6A4F] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Pasang Contoh Kartu (Nagari &amp; DANA)
            </button>
          )}
        </div>

        {data.bankAccounts.length === 0 ? (
          <div className="p-8 rounded-3xl border-2 border-dashed border-stone-200 bg-white text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#2D6A4F] flex items-center justify-center mx-auto shadow-xs">
              <CreditCard className="w-7 h-7" />
            </div>
            <div className="max-w-md mx-auto">
              <h3 className="font-bold text-sm text-stone-800">Belum Ada Rekening Amplop Digital</h3>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                Tambahkan nomor rekening atau dompet digital Anda. Anda dapat memilih desain kartu ATM 3D (Bank Nagari, DANA, BCA, Mandiri, BNI, dll).
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleAddAccount()}
              className="px-6 py-2.5 rounded-xl bg-[#2D6A4F] hover:bg-[#1B4332] text-white text-xs font-bold transition shadow-sm cursor-pointer inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Tambah Rekening Pertama
            </button>
          </div>
        ) : (
          data.bankAccounts.map((acc, index) => {
            return (
              <div
                key={acc.id}
                className="p-5 sm:p-6 rounded-3xl border border-stone-200 bg-white space-y-5 shadow-xs transition-all hover:border-stone-300"
              >
                {/* Header bar of each account card */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-[#2D6A4F] text-xs font-bold flex items-center justify-center">
                      {index + 1}
                    </span>
                    <span className="text-xs font-bold text-stone-800">
                      {acc.bank || 'Rekening Baru'}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 uppercase">
                      {acc.type === 'wallet' ? 'E-Wallet' : 'Debit Card'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenCardModal(acc.id)}
                      className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#2D6A4F] border border-emerald-200 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#2D6A4F]" />
                      <span>Ganti Desain Kartu 3D</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onCopyText(acc.number, `Nomor rekening ${acc.bank} disalin`)}
                      className="text-stone-500 hover:text-stone-800 text-xs font-medium px-2 py-1 flex items-center gap-1 cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" /> Uji Salin
                    </button>

                    {data.bankAccounts.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleDeleteAccount(acc.id)}
                        className="text-rose-500 hover:text-rose-700 text-xs font-medium px-2 py-1 flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Hapus
                      </button>
                    )}
                  </div>
                </div>

                {/* 3D ATM Card Live Interactive Preview & Form Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  {/* Left Column: Live 3D ATM Card Preview */}
                  <div className="lg:col-span-6 flex flex-col items-center justify-center p-3 rounded-2xl bg-stone-50/80 border border-stone-100">
                    <div className="text-[11px] font-semibold text-stone-400 mb-2 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      <span>Live 3D Card Preview (Sentuh / Putar)</span>
                    </div>

                    <InteractiveAtmCard3D
                      bankName={acc.bank}
                      accountNumber={acc.number}
                      holderName={acc.holder}
                      cardTheme={acc.cardTheme}
                      type={acc.type}
                      logoUrl={acc.logoUrl}
                      onCopy={onCopyText}
                      compact={true}
                      interactive={true}
                    />
                  </div>

                  {/* Right Column: Input Form Fields */}
                  <div className="lg:col-span-6 space-y-3.5">
                    {/* Quick Selection Buttons */}
                    <div>
                      <label className="text-[11px] font-semibold text-stone-600 block mb-1.5">
                        Pilihan Cepat Desain Kartu:
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {quickOptions.map((opt) => {
                          const isActive =
                            acc.cardTheme?.toLowerCase() === opt.cardTheme.toLowerCase() ||
                            acc.bank.toLowerCase().includes(opt.shortName.toLowerCase());

                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => {
                                const updated = data.bankAccounts.map((a) =>
                                  a.id === acc.id
                                    ? {
                                        ...a,
                                        bank: opt.bankName,
                                        cardTheme: opt.cardTheme,
                                        type: opt.type,
                                        logoUrl: opt.logoUrl,
                                      }
                                    : a
                                );
                                setData({ ...data, bankAccounts: updated });
                              }}
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer flex items-center gap-1 border ${
                                isActive
                                  ? 'bg-[#2D6A4F] text-white border-[#2D6A4F] shadow-xs'
                                  : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400 hover:bg-stone-50'
                              }`}
                            >
                              <span>{opt.shortName}</span>
                              {isActive && <Check className="w-3 h-3 stroke-[3]" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                        Nama Bank / E-Wallet *
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: Bank Nagari, Bank BCA, DANA"
                        value={acc.bank}
                        onChange={(e) => {
                          const val = e.target.value;
                          const details = getBankCardDetails(val, acc.cardTheme);
                          const updated = data.bankAccounts.map((a) =>
                            a.id === acc.id
                              ? {
                                  ...a,
                                  bank: val,
                                  cardTheme: details.cardTheme,
                                  type: details.type,
                                  logoUrl: details.logoUrl,
                                }
                              : a
                          );
                          setData({ ...data, bankAccounts: updated });
                        }}
                        className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                        Nomor Rekening / No. Akun HP *
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: 10050213051101 atau 082391680946"
                        value={acc.number}
                        onChange={(e) => {
                          const updated = data.bankAccounts.map((a) =>
                            a.id === acc.id ? { ...a, number: e.target.value } : a
                          );
                          setData({ ...data, bankAccounts: updated });
                        }}
                        className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2.5 font-mono font-bold tracking-wider focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                        Atas Nama (A.N Pemilik) *
                      </label>
                      <input
                        type="text"
                        placeholder="Nama lengkap pemilik rekening"
                        value={acc.holder}
                        onChange={(e) => {
                          const updated = data.bankAccounts.map((a) =>
                            a.id === acc.id ? { ...a, holder: e.target.value } : a
                          );
                          setData({ ...data, bankAccounts: updated });
                        }}
                        className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2.5 uppercase font-medium focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}

        {data.bankAccounts.length < tierConfig.maxBank ? (
          <button
            onClick={() => handleAddAccount()}
            className="w-full py-3.5 border-2 border-dashed border-stone-300 hover:border-emerald-600 rounded-2xl text-xs font-bold text-stone-600 hover:text-[#2D6A4F] transition flex items-center justify-center gap-2 cursor-pointer bg-white shadow-xs"
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
              placeholder="Contoh: Reyhan & Yanti"
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
              placeholder="Contoh: 0812-3456-7890"
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
            placeholder="Contoh: Jl. Sudirman No. 10, RT 01 / RW 02, Jakarta Selatan"
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
            placeholder="Contoh: Mohon konfirmasi penerima sebelum mengirimkan paket kado fisik"
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
          disabled={isSaving}
          className="w-full sm:w-auto px-8 py-3.5 bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-bold text-xs rounded-xl shadow-md transition active:scale-95 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Menyimpan ke Database...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Simpan Amplop &amp; Kado</span>
            </>
          )}
        </button>
      </div>

      {/* Modal Selection for 3D Cards */}
      <Card3DSelectorModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSelectCard={handleSelectCardForAccount}
        currentTheme={activeAccountForModal?.cardTheme}
        sampleNumber={activeAccountForModal?.number || '10050213051101'}
        sampleHolder={activeAccountForModal?.holder || 'SILVANA REZA ANGGRAINI'}
      />
    </div>
  );
};
