import React, { useState } from "react";
import Tilt from "react-parallax-tilt";
import { Copy, RefreshCw } from "lucide-react";
import "./AtmCard3D.css";

export interface CardBniProps {
  accountNumber?: string;
  holderName?: string;
  expiry?: string;
  cvv?: string;
  memberSince?: string;
  onCopy?: (text: string, label: string) => void;
}

export const CardBni: React.FC<CardBniProps> = ({
  accountNumber = "5371 7600 0012 3456",
  holderName = "PUTRA NAGARA",
  expiry = "12/22",
  memberSince = "17",
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
      {/* 3D Parallax Tilt Card for BNI */}
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
          {/* SISI DEPAN (FRONT) - BNI BATIK THEME */}
          <div className="card-face card-front bni-theme p-4 flex flex-col justify-between relative select-none">
            {/* Background Batik Motif Overlay */}
            <svg
              className="absolute inset-0 w-full h-full opacity-35 pointer-events-none"
              viewBox="0 0 340 210"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <pattern
                id="batikPattern"
                x="0"
                y="0"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M20 0C30 10 30 30 20 40C10 30 10 10 20 0Z"
                  stroke="#5A3A0F"
                  strokeWidth="0.8"
                  fill="none"
                />
                <path
                  d="M0 20C10 10 30 10 40 20C30 30 10 30 0 20Z"
                  stroke="#5A3A0F"
                  strokeWidth="0.8"
                  fill="none"
                />
                <circle cx="20" cy="20" r="3" fill="#5A3A0F" opacity="0.6" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#batikPattern)" />

              {/* Colorful Batik Floral Ornament on Bottom Right */}
              <g transform="translate(180, 100) scale(1.1)">
                <path
                  d="M 100 80 Q 60 20 0 80 Q 40 40 100 80 Z"
                  fill="#D9534F"
                  opacity="0.85"
                />
                <path
                  d="M 120 70 Q 70 10 20 90 Q 60 50 120 70 Z"
                  fill="#337AB7"
                  opacity="0.75"
                />
                <path
                  d="M 80 90 Q 40 30 -10 100 Q 30 60 80 90 Z"
                  fill="#F0AD4E"
                  opacity="0.85"
                />
                <circle cx="50" cy="60" r="4" fill="#FFFFFF" />
                <circle cx="70" cy="45" r="3.5" fill="#FFFFFF" />
                <circle cx="90" cy="35" r="3" fill="#FFFFFF" />
              </g>
            </svg>

            {/* Layer Content */}
            <div className="relative z-10 flex flex-col justify-between h-full">
              {/* TOP ROW: BNI LOGO & ELECTRONIC USE ONLY */}
              <div className="flex justify-between items-start">
                <div></div>
                <div className="flex items-center gap-3">
                  {/* Vertical Electronic Use Only */}
                  <span className="text-[6.5px] font-semibold text-slate-800 uppercase tracking-widest rotate-90 origin-right translate-y-3 -mr-2 opacity-80">
                    ELECTRONIC USE ONLY
                  </span>
                  {/* BNI Box Logo */}
                  <div className="flex items-center gap-1.5 bg-white/90 px-2 py-1 rounded-md shadow-xs border border-orange-500/20">
                    <div className="bg-[#EF4825] px-1.5 py-0.5 rounded flex items-center justify-center font-bold text-white text-xs">
                      {/* BNI 46 Wave motif */}
                      <span className="tracking-tighter">46</span>
                    </div>
                    <span className="font-extrabold text-lg tracking-wider text-[#1B365D] font-serif">
                      BNI
                    </span>
                  </div>
                </div>
              </div>

              {/* EMV CHIP & DEBIT TEXT */}
              <div className="flex items-center gap-3 -mt-2">
                {/* Silver Chip */}
                <div className="card-chip silver shrink-0">
                  <div className="chip-line"></div>
                  <div className="chip-line"></div>
                  <div className="chip-line"></div>
                </div>
                <span className="text-xs font-extrabold tracking-[3px] text-[#1e293b]">
                  DEBIT
                </span>
              </div>

              {/* CARD NUMBER */}
              <div className="my-0.5 text-left">
                <div className="font-mono font-extrabold text-[17px] tracking-[2.5px] text-[#0f172a] drop-shadow-xs">
                  {accountNumber}
                </div>
              </div>

              {/* BOTTOM ROW: MEMBER SINCE, EXPIRED, HOLDER NAME & MASTERCARD */}
              <div className="flex justify-between items-end">
                <div className="flex flex-col text-left">
                  {/* Member Since & Valid Thru */}
                  <div className="flex items-center gap-3 text-[10px] text-[#0f172a] font-mono mb-0.5">
                    <span className="font-bold">{accountNumber.slice(0, 4)}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-[6px] font-bold leading-none text-[#334155]">
                        MEMBER<br />SINCE
                      </span>
                      <span className="font-bold">{memberSince}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-[6px] font-bold leading-none text-[#334155]">
                        VALID<br />THRU
                      </span>
                      <span className="font-bold">{expiry}</span>
                    </div>
                  </div>
                  {/* Card Holder Name */}
                  <div className="font-mono font-bold text-sm tracking-wider text-[#0f172a] uppercase">
                    {holderName}
                  </div>
                </div>

                {/* MASTERCARD LOGO */}
                <div className="flex flex-col items-center">
                  <div className="card-network-logo">
                    <div className="circle red"></div>
                    <div className="circle orange"></div>
                  </div>
                  <span className="text-[8px] font-bold text-[#1e293b] tracking-tight -mt-0.5 lowercase font-sans">
                    mastercard
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
              Amplop Digital Bank Negara Indonesia (BNI). Terima kasih atas doa restu dan tanda kasih yang Anda berikan.
            </p>
            <div className="hologram-strip">
              <span className="hologram-seal">GENUINE BNI</span>
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
              onCopy(cleanAccountNumber, "No. Rekening BNI");
            }}
            className="flex-1 py-2.5 px-4 rounded-xl bg-[#EF4825] text-white hover:bg-[#D33D1E] transition-all text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md cursor-pointer active:scale-95"
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
          className="py-2.5 px-3 rounded-xl bg-white border border-[#D8C7B2] text-[#EF4825] hover:bg-[#FAF7F2] transition-all text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
          title="Putar Kartu BNI"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#EF4825]" />
          <span>Putar</span>
        </button>
      </div>
    </div>
  );
};

export default CardBni;
