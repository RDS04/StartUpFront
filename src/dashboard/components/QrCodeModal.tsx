import React from 'react';
import { X, Copy, QrCode } from 'lucide-react';

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  slug: string;
  onCopyLink: (text: string) => void;
}

export const QrCodeModal: React.FC<QrCodeModalProps> = ({ isOpen, onClose, slug, onCopyLink }) => {
  if (!isOpen) return null;

  const origin = typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.host}` : 'http://localhost:5173';
  const fullUrl = `${origin}/#/${slug}`;

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-xs w-full p-6 text-center space-y-4 shadow-2xl border border-stone-100">
        <div className="flex items-center justify-between pb-2 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <QrCode className="w-4 h-4 text-[#2D6A4F]" />
            <h2 className="font-bold text-sm text-stone-900">QR Code Undangan</h2>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-700 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex justify-center">
          {/* Stylized QR Code SVG */}
          <div className="w-44 h-44 bg-white p-3 rounded-2xl shadow-inner flex flex-col items-center justify-center border border-stone-200">
            <div className="grid grid-cols-6 gap-1 w-full h-full p-2 bg-stone-900 rounded-xl">
              <div className="bg-white col-span-2 row-span-2 rounded-xs"></div>
              <div className="bg-stone-900"></div>
              <div className="bg-white"></div>
              <div className="bg-white col-span-2 row-span-2 rounded-xs"></div>

              <div className="bg-white"></div>
              <div className="bg-stone-900"></div>

              <div className="bg-white"></div>
              <div className="bg-stone-900"></div>
              <div className="bg-white col-span-2 row-span-2 rounded-xs"></div>
              <div className="bg-stone-900"></div>
              <div className="bg-white"></div>

              <div className="bg-white col-span-2 row-span-2 rounded-xs"></div>
              <div className="bg-stone-900"></div>
              <div className="bg-white"></div>
              <div className="bg-white"></div>
              <div className="bg-stone-900"></div>

              <div className="bg-white"></div>
              <div className="bg-stone-900"></div>
              <div className="bg-white col-span-2 row-span-2 rounded-xs"></div>
            </div>
          </div>
        </div>

        <div>
          <p className="text-[11px] text-stone-400 font-mono select-all truncate">{fullUrl}</p>
          <p className="text-[10px] text-stone-500 mt-0.5">Tamu dapat memindai QR code ini di venue acara</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onCopyLink(fullUrl)}
            className="flex-1 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-[#1B4332] rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" /> Salin Link
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold transition cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
