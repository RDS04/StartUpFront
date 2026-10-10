import React, { useState } from "react";
import Tilt from "react-parallax-tilt";
import { Copy, RefreshCw } from "lucide-react";
import "./AtmCard3D.css";

export interface CardBukopinProps {
  accountNumber?: string;
  holderName?: string;
  expiry?: string;
  refCode?: string;
  cvv?: string;
  onCopy?: (text: string, label: string) => void;
}

export const CardBukopin: React.FC<CardBukopinProps> = ({
  accountNumber = "6013 7890 4603 5589",
  holderName = "Guniswan Putra",
  expiry = "06/24",
  refCode = "6013",
  cvv = "460",
  onCopy,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const cleanAccountNumber = accountNumber.replace(/\s+/g, "");

  return (
    <div className="card-container text-center">
      {/* 3D Parallax Tilt Card for Bank Bukopin */}
      <Tilt
        perspective={1000}
        glareEnable={true}
        glareMaxOpacity={0.35}
        glareColor="#ffffff"
        glarePosition="all"
        tiltMaxAngleX={12}
        tiltMaxAngleY={12}
        className="card-perspective mx-auto"
      >
        <div
          className={`atm-card ${isFlipped ? "flipped" : ""}`}
          onClick={toggleFlip}
          title="Klik kartu untuk membalik"
        >
          {/* SISI DEPAN (FRONT) - BANK BUKOPIN THEME */}
          <div className="card-face card-front bukopin-theme p-4 flex flex-col justify-between relative select-none">
            {/* Diagonal Swoosh Wave Bands Pattern Overlay */}
            <svg
              className="absolute inset-0 w-full h-full opacity-40 pointer-events-none z-0"
              viewBox="0 0 340 210"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 100 -20 L 360 140 L 360 220 L -20 220 Z"
                fill="url(#bukopinBlueGrad)"
                opacity="0.6"
              />
              <path
                d="M 180 -20 L 360 80 L 360 220 L 50 220 Z"
                fill="url(#bukopinCyanGrad)"
                opacity="0.35"
              />
              <defs>
                <linearGradient id="bukopinBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1E3A8A" />
                  <stop offset="100%" stopColor="#0F172A" />
                </linearGradient>
                <linearGradient id="bukopinCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38BDF8" />
                  <stop offset="100%" stopColor="#0284C7" />
                </linearGradient>
              </defs>
            </svg>

            {/* Content Layer */}
            <div className="relative z-10 flex flex-col justify-between h-full">
              {/* TOP ROW: BANK BUKOPIN LOGO */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {/* Bank Bukopin Banyan Tree / Sun Globe Emblem */}
                  <svg className="w-6 h-6 text-white" viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" />
                    <path
                      d="M8 16 C8 10, 24 10, 24 16 C24 22, 8 22, 8 16 Z"
                      fill="currentColor"
                      opacity="0.8"
                    />
                    <line x1="4" y1="16" x2="28" y2="16" stroke="currentColor" strokeWidth="1.5" />
                    <line x1="16" y1="4" x2="16" y2="28" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                  <span className="font-extrabold text-base tracking-wide text-white drop-shadow-sm font-sans uppercase">
                    BANK BUKOPIN
                  </span>
                </div>
              </div>

              {/* MIDDLE ROW: GOLD EMV CHIP */}
              <div className="flex justify-start items-center my-0.5">
                <div className="card-chip shrink-0 shadow-md">
                  <div className="chip-line"></div>
                  <div className="chip-line"></div>
                  <div className="chip-line"></div>
                </div>
              </div>

              {/* CARD NUMBER */}
              <div className="my-0.5 text-left">
                <div className="font-mono font-bold text-[17px] tracking-[2.5px] text-white drop-shadow-md">
                  {accountNumber}
                </div>
                <div className="font-mono text-[9px] text-sky-200/80 tracking-widest -mt-0.5">
                  {refCode}
                </div>
              </div>

              {/* BOTTOM ROW: EXPIRED, HOLDER NAME & GPN LOGO */}
              <div className="flex justify-between items-end">
                <div className="flex flex-col text-left">
                  {/* Valid Thru */}
                  <div className="flex items-center gap-1.5 text-white mb-0.5">
                    <div className="text-[5.5px] font-bold leading-tight text-sky-100/70 uppercase">
                      VALID<br />THRU
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[5px] font-semibold text-sky-100/70 tracking-tighter uppercase -mb-0.5">MONTH/YEAR</span>
                      <span className="font-mono font-bold text-xs tracking-wider">{expiry}</span>
                    </div>
                  </div>
                  {/* Card Holder Name */}
                  <div className="font-sans font-semibold text-xs tracking-wider text-white drop-shadow-sm">
                    {holderName}
                  </div>
                </div>

                {/* GPN LOGO */}
                <div className="flex flex-col items-center">
                  <svg className="w-8 h-8 text-white drop-shadow-xs" viewBox="0 0 60 50" fill="currentColor">
                    <path d="M10 35 C15 25, 25 10, 45 5 C35 15, 30 22, 25 28 Z" />
                    <path d="M15 38 C20 30, 30 18, 50 12 C40 20, 35 28, 30 35 Z" />
                    <path d="M22 42 C28 35, 38 25, 55 20 C46 28, 40 34, 35 40 Z" />
                  </svg>
                  <span className="font-black text-xs tracking-tighter text-white font-sans -mt-1">
                    GPN
                  </span>
                </div>
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
            <p className="card-disclaimer">
              Amplop Digital Bank Bukopin Debit GPN. Terima kasih atas doa restu dan tanda kasih yang Anda berikan.
            </p>
            <div className="hologram-strip">
              <span className="hologram-seal">GENUINE BANK BUKOPIN</span>
            </div>
          </div>
        </div>
      </Tilt>

      {/* Action Controls */}
      <div className="flex items-center justify-center gap-2 mt-3 w-full max-w-[340px] mx-auto">
        {onCopy && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCopy(cleanAccountNumber, "No. Rekening Bank Bukopin");
            }}
            className="flex-1 py-2.5 px-4 rounded-xl bg-[#1d4ed8] text-white hover:bg-[#1e40af] transition-all text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md cursor-pointer active:scale-95 border border-blue-400/30"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Salin Rekening</span>
          </button>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFlip();
          }}
          className="py-2.5 px-3 rounded-xl bg-white border border-[#D8C7B2] text-[#1d4ed8] hover:bg-[#FAF7F2] transition-all text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
          title="Putar Kartu Bank Bukopin"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#1d4ed8]" />
          <span>Putar</span>
        </button>
      </div>
    </div>
  );
};

export default CardBukopin;
