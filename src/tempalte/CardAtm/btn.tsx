import React, { useState } from "react";
import Tilt from "react-parallax-tilt";
import { Copy, RefreshCw } from "lucide-react";
import "./AtmCard3D.css";

export interface CardBtnProps {
  accountNumber?: string;
  holderName?: string;
  expiry?: string;
  cvv?: string;
  onCopy?: (text: string, label: string) => void;
}

export const CardBtn: React.FC<CardBtnProps> = ({
  accountNumber = "4381 9028 1742 8899",
  holderName = "PUTRA BATARA",
  expiry = "12/28",
  cvv = "892",
  onCopy,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const cleanAccountNumber = accountNumber.replace(/\s+/g, "");

  return (
    <div className="card-container text-center">
      {/* Vertical 3D Parallax Tilt Card for Bank BTN */}
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
          {/* SISI DEPAN (FRONT) - BANK BTN VERTICAL THEME */}
          <div className="card-face card-front btn-theme p-4 flex flex-col justify-between relative select-none">
            {/* Concentric Circle Line Art Overlay */}
            <svg
              className="absolute inset-0 w-full h-full opacity-25 pointer-events-none"
              viewBox="0 0 220 340"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="110" cy="80" r="40" stroke="#64748B" strokeWidth="0.8" />
              <circle cx="110" cy="80" r="70" stroke="#64748B" strokeWidth="0.8" />
              <circle cx="110" cy="80" r="100" stroke="#64748B" strokeWidth="0.8" />
              <circle cx="110" cy="80" r="130" stroke="#64748B" strokeWidth="0.8" />
              <circle cx="60" cy="180" r="50" stroke="#64748B" strokeWidth="0.8" />
              <circle cx="60" cy="180" r="80" stroke="#64748B" strokeWidth="0.8" />
              <circle cx="60" cy="180" r="110" stroke="#64748B" strokeWidth="0.8" />
            </svg>

            {/* Bottom Red & Orange Layered Petals Graphic Accent */}
            <svg
              className="absolute inset-0 w-full h-full z-0 pointer-events-none"
              viewBox="0 0 220 340"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Petal 1 - Red Main Base */}
              <path
                d="M -10 250 Q 50 240 120 350 L -10 350 Z"
                fill="#E5232A"
              />
              {/* Petal 2 - Orange Backing */}
              <path
                d="M 50 215 Q 110 200 230 310 L 230 350 L 50 350 Z"
                fill="#EA4335"
                opacity="0.9"
              />
              {/* Petal 3 - High Swoosh Red */}
              <path
                d="M 130 150 Q 200 180 230 350 L 230 180 Z"
                fill="#D92027"
              />
              {/* Petal 4 - Front Layer Bright Red */}
              <path
                d="M 0 265 Q 90 245 230 350 L -10 350 Z"
                fill="#E5232A"
              />
            </svg>

            {/* Content Layer */}
            <div className="relative z-10 flex flex-col justify-between h-full">
              {/* TOP ROW: BTN LOGO & EMV CHIP + CONTACTLESS */}
              <div className="flex justify-between items-start">
                {/* BTN Logo */}
                <div className="flex items-center gap-0.5">
                  <span className="font-extrabold text-2xl tracking-tighter text-slate-700 font-sans">
                    btn
                  </span>
                  {/* Red Accent Slash above 'n' */}
                  <span className="w-2.5 h-1.5 bg-[#E5232A] rounded-full -mt-4 -ml-1 rotate-12"></span>
                </div>

                {/* EMV Chip & Contactless Icon */}
                <div className="flex items-center gap-2">
                  <div className="card-chip silver shrink-0">
                    <div className="chip-line"></div>
                    <div className="chip-line"></div>
                    <div className="chip-line"></div>
                  </div>
                  {/* Contactless Wave */}
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-slate-600">
                    <path d="M8.5 16.5a5 5 0 0 1 0-7" />
                    <path d="M12 19a8.5 8.5 0 0 0 0-14" />
                    <path d="M15.5 21.5a12 12 0 0 0 0-21" />
                  </svg>
                </div>
              </div>

              {/* MIDDLE LEFT: HOLDER NAME */}
              <div className="my-auto text-left pt-6">
                <div className="font-sans font-bold text-base sm:text-lg tracking-wider text-slate-800 uppercase leading-snug w-32 drop-shadow-xs">
                  {holderName}
                </div>
                {/* Hidden/Subtle Account Number Display */}
                <div className="font-mono text-xs font-semibold text-slate-500 tracking-wider mt-1 opacity-80 flex items-center gap-2">
                  <span>{accountNumber}</span>
                  {expiry && <span className="text-[10px] text-slate-400">EXP {expiry}</span>}
                </div>
              </div>

              {/* BOTTOM ROW: VISA CLASSIC LOGO */}
              <div className="flex justify-between items-end pb-1 pr-1">
                <div></div>
                <div className="flex flex-col items-end text-white">
                  <span className="font-extrabold italic text-2xl tracking-tighter drop-shadow-sm font-sans">
                    VISA
                  </span>
                  <span className="text-[9px] font-semibold tracking-wider text-white/90 font-sans -mt-1">
                    Classic
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
              Amplop Digital Bank BTN (Bank Tabungan Negara). Terima kasih atas doa restu dan tanda kasih yang Anda berikan.
            </p>
            <div className="hologram-strip">
              <span className="hologram-seal">GENUINE BTN</span>
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
              onCopy(cleanAccountNumber, "No. Rekening Bank BTN");
            }}
            className="flex-1 py-2.5 px-3 rounded-xl bg-[#E5232A] text-white hover:bg-[#C41B21] transition-all text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md cursor-pointer active:scale-95"
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
          className="py-2.5 px-3 rounded-xl bg-white border border-[#D8C7B2] text-[#E5232A] hover:bg-[#FAF7F2] transition-all text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
          title="Putar Kartu BTN"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#E5232A]" />
          <span>Putar</span>
        </button>
      </div>
    </div>
  );
};

export default CardBtn;
