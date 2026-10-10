import React, { useState } from "react";
import Tilt from "react-parallax-tilt";
import { Copy, RefreshCw } from "lucide-react";
import "./AtmCard3D.css";

export interface CardSinarmasProps {
  accountNumber?: string;
  holderName?: string;
  expiry?: string;
  refCode?: string;
  cvv?: string;
  onCopy?: (text: string, label: string) => void;
}

export const CardSinarmas: React.FC<CardSinarmasProps> = ({
  accountNumber = "6396 8700 0000 0000",
  holderName = "DEBIT CARD",
  expiry = "06/28",
  refCode = "6396 87",
  cvv = "912",
  onCopy,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const cleanAccountNumber = accountNumber.replace(/\s+/g, "");

  return (
    <div className="card-container text-center">
      {/* 3D Parallax Tilt Card for Bank Sinarmas */}
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
          {/* SISI DEPAN (FRONT) - BANK SINARMAS THEME */}
          <div className="card-face card-front sinarmas-theme p-4 flex flex-col justify-between relative select-none">
            {/* Faceted Low-Poly Polygon Triangle Overlay Pattern */}
            <svg
              className="absolute top-0 right-0 w-3/4 h-full opacity-30 pointer-events-none z-0"
              viewBox="0 0 250 210"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.5">
                <polygon points="150,0 250,0 200,60" fill="#E11D48" opacity="0.4" />
                <polygon points="200,60 250,0 250,100" fill="#BE123C" opacity="0.5" />
                <polygon points="200,60 250,100 170,120" fill="#9F1239" opacity="0.6" />
                <polygon points="170,120 250,100 250,210" fill="#881337" opacity="0.7" />
                <polygon points="100,180 170,120 250,210" fill="#4C0519" opacity="0.8" />
                <polygon points="100,180 170,120 70,210" fill="#9F1239" opacity="0.4" />
                <polygon points="120,0 150,0 200,60" fill="#FB7185" opacity="0.3" />
                <polygon points="80,50 150,0 200,60" fill="#F43F5E" opacity="0.25" />
                <polygon points="80,50 200,60 170,120" fill="#E11D48" opacity="0.35" />
              </g>
            </svg>

            {/* Content Layer */}
            <div className="relative z-10 flex flex-col justify-between h-full">
              {/* TOP ROW: BANK SINARMAS LOGO */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {/* Bank Sinarmas Rounded Red Icon Box */}
                  <div className="bg-[#E11D48] p-1.5 rounded-xl border border-white/40 shadow-xs flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" viewBox="0 0 32 32" fill="none">
                      <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2.5" />
                      <path d="M10 16C10 12.7 12.7 10 16 10C19.3 10 22 12.7 22 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M22 16C22 19.3 19.3 22 16 22C12.7 22 10 19.3 10 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-sans text-[10px] tracking-wide text-white/90 font-light leading-none">
                      bank
                    </span>
                    <span className="font-sans font-bold text-lg tracking-tight text-white drop-shadow-sm leading-tight -mt-0.5">
                      sinarmas
                    </span>
                  </div>
                </div>
              </div>

              {/* MIDDLE ROW: CHIP & DEBIT CARD TEXT */}
              <div className="flex justify-between items-center my-0.5">
                {/* Gold EMV Chip */}
                <div className="card-chip shrink-0 shadow-md">
                  <div className="chip-line"></div>
                  <div className="chip-line"></div>
                  <div className="chip-line"></div>
                </div>

                {/* DEBIT CARD TEXT */}
                <span className="text-sm font-semibold tracking-wider text-white/90 font-serif">
                  DEBIT CARD
                </span>
              </div>

              {/* CARD NUMBER */}
              <div className="my-0.5 text-left">
                <div className="font-mono font-bold text-[17px] tracking-[2.5px] text-white drop-shadow-md">
                  {accountNumber}
                </div>
                <div className="font-mono text-[9px] text-rose-200/80 tracking-widest -mt-0.5">
                  {refCode}
                </div>
              </div>

              {/* BOTTOM ROW: EXPIRED & GPN LOGO */}
              <div className="flex justify-between items-end">
                <div className="flex flex-col text-left">
                  {/* Valid Thru */}
                  <div className="flex items-center gap-1.5 text-white">
                    <div className="text-[6px] font-bold leading-none text-rose-100/70 uppercase">
                      VALID<br />THRU
                    </div>
                    <div className="font-mono font-bold text-xs tracking-wider">
                      {expiry}
                    </div>
                  </div>
                </div>

                {/* GPN (GERBANG PEMBAYARAN NASIONAL) LOGO */}
                <div className="flex flex-col items-center">
                  <svg className="w-8 h-8 text-white drop-shadow-xs" viewBox="0 0 60 50" fill="currentColor">
                    {/* Garuda Bird Wing Silhouette */}
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
              Amplop Digital Bank Sinarmas Debit GPN. Terima kasih atas doa restu dan tanda kasih yang Anda berikan.
            </p>
            <div className="hologram-strip">
              <span className="hologram-seal">GENUINE BANK SINARMAS</span>
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
              onCopy(cleanAccountNumber, "No. Rekening Bank Sinarmas");
            }}
            className="flex-1 py-2.5 px-4 rounded-xl bg-[#e11d48] text-white hover:bg-[#be123c] transition-all text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md cursor-pointer active:scale-95 border border-rose-400/30"
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
          className="py-2.5 px-3 rounded-xl bg-white border border-[#D8C7B2] text-[#e11d48] hover:bg-[#FAF7F2] transition-all text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
          title="Putar Kartu Bank Sinarmas"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#e11d48]" />
          <span>Putar</span>
        </button>
      </div>
    </div>
  );
};

export default CardSinarmas;
