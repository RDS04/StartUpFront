import React, { useState } from "react";
import Tilt from "react-parallax-tilt";
import { Copy, RefreshCw } from "lucide-react";
import "./AtmCard3D.css";

export interface CardMaybankProps {
  accountNumber?: string;
  holderName?: string;
  expiry?: string;
  cvv?: string;
  onCopy?: (text: string, label: string) => void;
}

export const CardMaybank: React.FC<CardMaybankProps> = ({
  accountNumber = "5241 8900 1234 5678",
  holderName = "DEBIT CARDHOLDER",
  expiry = "10/28",
  cvv = "582",
  onCopy,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const cleanAccountNumber = accountNumber.replace(/\s+/g, "");

  return (
    <div className="card-container text-center">
      {/* 3D Parallax Tilt Card for Maybank U (Vertical Card) */}
      <Tilt
        perspective={1000}
        glareEnable={true}
        glareMaxOpacity={0.35}
        glareColor="#ffffff"
        glarePosition="all"
        tiltMaxAngleX={12}
        tiltMaxAngleY={12}
        className="card-perspective vertical mx-auto"
      >
        <div
          className={`atm-card ${isFlipped ? "flipped" : ""}`}
          onClick={toggleFlip}
          title="Klik kartu untuk membalik"
        >
          {/* SISI DEPAN (FRONT) - MAYBANK U VERTICAL THEME */}
          <div className="card-face card-front maybank-theme p-5 flex flex-col justify-between relative select-none">
            {/* Top Row: EMV Silver Chip */}
            <div className="flex justify-end pt-3 pr-2">
              <div className="card-chip silver shrink-0 shadow-md">
                <div className="chip-line"></div>
                <div className="chip-line"></div>
                <div className="chip-line"></div>
              </div>
            </div>

            {/* Middle Section: Giant Minimalist 'U' Logo */}
            <div className="flex flex-col items-center justify-center my-auto">
              <span className="text-7xl font-light text-white tracking-tighter font-sans drop-shadow-sm leading-none">
                U
              </span>
            </div>

            {/* Lower Information Section: Account Number, Expiry, Name */}
            <div className="flex flex-col text-left space-y-1 mb-2 px-1">
              <div className="font-mono font-bold text-xs tracking-widest text-slate-800 drop-shadow-xs">
                {accountNumber}
              </div>
              <div className="flex items-center justify-between text-[8px] font-semibold text-slate-700">
                <span className="uppercase">{holderName}</span>
                <div className="flex items-center gap-1">
                  <span className="text-[6px] text-slate-600">VALID THRU</span>
                  <span className="font-mono font-bold text-[9px] text-slate-900">{expiry}</span>
                </div>
              </div>
            </div>

            {/* Bottom Row: Maybank Brand & Mastercard Logo */}
            <div className="flex justify-between items-center pt-2 border-t border-slate-900/10">
              {/* Maybank Tiger Head Logo */}
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full bg-slate-900 flex items-center justify-center p-0.5 shadow-xs">
                  {/* Tiger Head / Maybank Icon Silhouette */}
                  <svg className="w-3.5 h-3.5 text-[#FFCD00]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3.14.69 4.22 1.78L12 11.56 7.78 6.78C8.86 5.69 10.34 5 12 5zm-7 7c0-1.66.69-3.14 1.78-4.22L11.56 12l-4.78 4.22C5.69 15.14 5 13.66 5 12zm7 7c-1.66 0-3.14-.69-4.22-1.78L12 12.44l4.22 4.78C15.14 18.31 13.66 19 12 19zm7-7c0 1.66-.69 3.14-1.78 4.22L12.44 12l4.78-4.22C18.31 8.86 19 10.34 19 12z" />
                  </svg>
                </div>
                <span className="font-extrabold text-xs tracking-tight text-slate-900 font-sans">
                  Maybank
                </span>
              </div>

              {/* Mastercard Logo */}
              <div className="card-network-logo shadow-xs rounded-full bg-white/30 p-0.5">
                <div className="circle red"></div>
                <div className="circle orange"></div>
              </div>
            </div>
          </div>

          {/* SISI BELAKANG (BACK) */}
          <div className="card-face card-back">
            <div className="magnetic-bar"></div>
            <div className="cvv-section">
              <div className="signature-strip">Authorized Signature</div>
              <div className="cvv-box">{cvv}</div>
            </div>
            <p className="card-disclaimer text-[7px] leading-tight">
              Amplop Digital Maybank U Debit Mastercard. Terima kasih atas doa restu dan tanda kasih yang Anda berikan.
            </p>
            <div className="hologram-strip">
              <span className="hologram-seal">GENUINE MAYBANK</span>
            </div>
          </div>
        </div>
      </Tilt>

      {/* Action Controls */}
      <div className="flex items-center justify-center gap-2 mt-3 w-full max-w-[220px] mx-auto">
        {onCopy && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCopy(cleanAccountNumber, "No. Rekening Maybank");
            }}
            className="flex-1 py-2 px-3 rounded-xl bg-[#68beba] text-slate-950 hover:bg-[#4faea9] transition-all text-xs font-bold flex items-center justify-center gap-1.5 shadow-md cursor-pointer active:scale-95 border border-white/50"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Salin</span>
          </button>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFlip();
          }}
          className="py-2 px-3 rounded-xl bg-white border border-[#D8C7B2] text-slate-800 hover:bg-[#FAF7F2] transition-all text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
          title="Putar Kartu Maybank"
        >
          <RefreshCw className="w-3.5 h-3.5 text-slate-800" />
          <span>Putar</span>
        </button>
      </div>
    </div>
  );
};

export default CardMaybank;
