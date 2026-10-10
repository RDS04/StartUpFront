import React, { useState } from "react";
import Tilt from "react-parallax-tilt";
import { Copy, RefreshCw } from "lucide-react";
import "./AtmCard3D.css";

export interface CardPermataProps {
  accountNumber?: string;
  holderName?: string;
  expiry?: string;
  cvv?: string;
  refCode?: string;
  onCopy?: (text: string, label: string) => void;
}

export const CardPermata: React.FC<CardPermataProps> = ({
  accountNumber = "4000 1234 5678 9010",
  holderName = "ELECTRONIC USE ONLY",
  expiry = "02/28",
  cvv = "640",
  refCode = "4640",
  onCopy,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const cleanAccountNumber = accountNumber.replace(/\s+/g, "");

  return (
    <div className="card-container text-center">
      {/* 3D Parallax Tilt Card for PermataBank */}
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
          {/* SISI DEPAN (FRONT) - PERMATABANK THEME */}
          <div className="card-face card-front permata-theme p-4 flex flex-col justify-between relative select-none">
            {/* Faceted Emerald Crystal Polygon & Bokeh Pattern */}
            <svg
              className="absolute top-0 right-0 w-3/5 h-full opacity-40 pointer-events-none z-0"
              viewBox="0 0 200 210"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.85">
                <polygon points="120,0 200,0 160,70" fill="#00FF87" opacity="0.3" />
                <polygon points="160,70 200,0 200,110" fill="#00E676" opacity="0.4" />
                <polygon points="160,70 200,110 130,140" fill="#00C853" opacity="0.5" />
                <polygon points="130,140 200,110 200,210" fill="#00A142" opacity="0.6" />
                <polygon points="70,180 130,140 200,210" fill="#007934" opacity="0.7" />
                <polygon points="70,180 130,140 40,210" fill="#004D21" opacity="0.5" />
                <polygon points="160,70 130,140 80,80" fill="#69F0AE" opacity="0.25" />
                <polygon points="120,0 160,70 80,80" fill="#B9F6CA" opacity="0.2" />
                <polygon points="200,0 200,50 160,70" fill="#00E676" opacity="0.3" />
              </g>
              {/* Soft Glowing Light Orbs */}
              <circle cx="160" cy="30" r="18" fill="#FFFFFF" opacity="0.15" />
              <circle cx="120" cy="110" r="12" fill="#69F0AE" opacity="0.2" />
              <circle cx="180" cy="160" r="22" fill="#00FF87" opacity="0.15" />
            </svg>

            {/* Content Layer */}
            <div className="relative z-10 flex flex-col justify-between h-full">
              {/* TOP ROW: PERMATABANK LOGO */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {/* Permata Leaf Gem Emblem */}
                  <svg className="w-6 h-6 text-white" viewBox="0 0 32 32" fill="none">
                    <path
                      d="M16 3C10 3 5 9 5 16C5 23 10 29 16 29C22 29 27 23 27 16C27 9 22 3 16 3Z"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      fill="none"
                    />
                    <path
                      d="M16 8V24M16 16L10 10M16 16L22 10"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="font-bold text-lg tracking-tight text-white drop-shadow-sm font-sans">
                    Permata Bank
                  </span>
                </div>
              </div>

              {/* MIDDLE ROW: CHIP & CONTACTLESS ICON */}
              <div className="flex justify-start items-center gap-2.5 my-0.5">
                {/* Silver EMV Chip */}
                <div className="card-chip silver shrink-0 shadow-md">
                  <div className="chip-line"></div>
                  <div className="chip-line"></div>
                  <div className="chip-line"></div>
                </div>
                {/* White Contactless Wave */}
                <svg className="w-5 h-5 text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M8.5 16.5a5 5 0 0 1 0-7" strokeLinecap="round" />
                  <path d="M12 19a8.5 8.5 0 0 0 0-14" strokeLinecap="round" />
                  <path d="M15.5 21.5a12 12 0 0 0 0-21" strokeLinecap="round" />
                </svg>
              </div>

              {/* CARD NUMBER */}
              <div className="my-0.5 text-left">
                <div className="font-mono font-bold text-[17px] tracking-[2.5px] text-white drop-shadow-md">
                  {accountNumber}
                </div>
                <div className="font-mono text-[9px] text-emerald-200/80 tracking-widest -mt-0.5">
                  {refCode}
                </div>
              </div>

              {/* BOTTOM ROW: EXPIRED, HOLDER NAME & VISA LOGO */}
              <div className="flex justify-between items-end">
                <div className="flex flex-col text-left">
                  {/* Valid Thru */}
                  <div className="flex items-center gap-1.5 text-white mb-1">
                    <div className="text-[5.5px] font-bold leading-tight text-emerald-100/70 uppercase">
                      VALID<br />THRU
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[5px] font-semibold text-emerald-100/70 tracking-tighter uppercase -mb-0.5">MONTH/YEAR</span>
                      <span className="font-mono font-bold text-xs tracking-wider">{expiry}</span>
                    </div>
                  </div>
                  {/* Electronic Use Only / Holder Name */}
                  <div className="font-sans font-semibold text-[9px] tracking-wider text-white/90 uppercase italic">
                    {holderName}
                  </div>
                </div>

                {/* VISA LOGO BADGE */}
                <div className="bg-white px-2.5 py-1 rounded shadow-md flex items-center justify-center">
                  <span className="font-extrabold text-base tracking-tighter text-[#1A1F71] italic font-sans leading-none">
                    VISA
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
              Amplop Digital PermataBank Debit. Terima kasih atas doa restu dan tanda kasih yang Anda berikan.
            </p>
            <div className="hologram-strip">
              <span className="hologram-seal">GENUINE PERMATABANK</span>
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
              onCopy(cleanAccountNumber, "No. Rekening PermataBank");
            }}
            className="flex-1 py-2.5 px-4 rounded-xl bg-[#056839] text-white hover:bg-[#024a27] transition-all text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md cursor-pointer active:scale-95 border border-emerald-400/30"
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
          className="py-2.5 px-3 rounded-xl bg-white border border-[#D8C7B2] text-[#056839] hover:bg-[#FAF7F2] transition-all text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
          title="Putar Kartu PermataBank"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#056839]" />
          <span>Putar</span>
        </button>
      </div>
    </div>
  );
};

export default CardPermata;
