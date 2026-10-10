import React, { useState } from "react";
import Tilt from "react-parallax-tilt";
import { Copy, RefreshCw } from "lucide-react";
import "./AtmCard3D.css";

export interface CardNagariProps {
  accountNumber?: string;
  holderName?: string;
  expiry?: string;
  memberSince?: string;
  cvv?: string;
  onCopy?: (text: string, label: string) => void;
}

export const CardNagari: React.FC<CardNagariProps> = ({
  accountNumber = "5364 9701 9999 9999",
  holderName = "CARD HOLDER NAME",
  expiry = "10/22",
  memberSince = "10/19",
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
      {/* 3D Parallax Tilt Card for Bank Nagari */}
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
          {/* SISI DEPAN (FRONT) - BANK NAGARI SONGKET THEME */}
          <div className="card-face card-front nagari-theme p-4 flex flex-col justify-between relative select-none">
            {/* Right Side Songket Accent */}
            <div className="nagari-songket-right">
              {/* Songket / Minangkabau Diamond Pattern SVG Overlay */}
              <svg
                className="w-full h-full opacity-35"
                viewBox="0 0 200 210"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <pattern
                  id="songketPattern"
                  x="0"
                  y="0"
                  width="30"
                  height="30"
                  patternUnits="userSpaceOnUse"
                >
                  <path d="M15 0 L30 15 L15 30 L0 15 Z" fill="none" stroke="#1E40AF" strokeWidth="1" />
                  <path d="M15 5 L25 15 L15 25 L5 15 Z" fill="none" stroke="#DC2626" strokeWidth="0.8" />
                  <rect x="12" y="12" width="6" height="6" fill="#D97706" transform="rotate(45 15 15)" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#songketPattern)" />
              </svg>

              {/* GPN Logo on bottom right over songket */}
              <div className="absolute bottom-3 right-3 flex flex-col items-center z-20">
                <svg className="w-8 h-7 text-[#E52330]" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M10,80 Q30,20 85,10 Q60,35 45,45 Q75,30 95,25 Q70,50 50,60 Q80,50 90,52 Q65,70 35,75 Z" />
                  <path d="M25,85 Q45,55 75,45 Q55,65 40,75 Z" fill="#C4161C" />
                </svg>
                <span className="font-extrabold text-[12px] tracking-tight text-[#0D2C62] -mt-1 font-sans">
                  GPN
                </span>
              </div>
            </div>

            {/* Content Layer */}
            <div className="relative z-10 flex flex-col justify-between h-full">
              {/* TOP ROW: BANK NAGARI LOGO */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="flex flex-col text-left leading-tight">
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-base tracking-wide text-white drop-shadow-sm font-sans">
                        Bank
                      </span>
                      {/* Swirl Logo Icon */}
                      <svg className="w-5 h-5 text-sky-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="12" cy="12" r="9" strokeOpacity="0.4" />
                        <path d="M12 3a9 9 0 0 1 9 9 9 9 0 0 1-9 9" strokeLinecap="round" />
                        <circle cx="12" cy="12" r="4" fill="currentColor" />
                      </svg>
                      <span className="font-extrabold text-base tracking-wide text-white drop-shadow-sm font-sans">
                        Nagari
                      </span>
                    </div>
                  </div>
                </div>

                {/* Contactless / ATM Bersama Icon */}
                <div className="pr-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-600 opacity-70">
                    <path d="M8.5 16.5a5 5 0 0 1 0-7" />
                    <path d="M12 19a8.5 8.5 0 0 0 0-14" />
                    <path d="M15.5 21.5a12 12 0 0 0 0-21" />
                  </svg>
                </div>
              </div>

              {/* EMV CHIP */}
              <div className="mt-1">
                <div className="card-chip shrink-0">
                  <div className="chip-line"></div>
                  <div className="chip-line"></div>
                  <div className="chip-line"></div>
                </div>
              </div>

              {/* CARD NUMBER */}
              <div className="my-1 text-left">
                <div className="font-mono font-bold text-[17px] tracking-[2px] text-white drop-shadow-md">
                  {accountNumber}
                </div>
              </div>

              {/* BOTTOM ROW: MEMBER SINCE, EXPIRED & HOLDER NAME */}
              <div className="flex justify-between items-end">
                <div className="flex flex-col text-left">
                  {/* Dates */}
                  <div className="flex items-center gap-3 text-[10px] text-slate-100 font-mono mb-1">
                    <div className="flex items-center gap-1">
                      <span className="text-[6.5px] font-bold text-slate-200 leading-none">
                        MEMBER<br />SINCE
                      </span>
                      <span className="font-bold">{memberSince}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-[6.5px] font-bold text-slate-200 leading-none">
                        VALID<br />THRU
                      </span>
                      <span className="font-bold">{expiry}</span>
                    </div>
                  </div>
                  {/* Card Holder Name */}
                  <div className="font-mono font-bold text-sm tracking-wider text-white uppercase drop-shadow-md">
                    {holderName}
                  </div>
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
              Amplop Digital Bank Nagari (Sumbar). Terima kasih atas doa restu dan tanda kasih yang Anda berikan.
            </p>
            <div className="hologram-strip">
              <span className="hologram-seal">GENUINE NAGARI</span>
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
              onCopy(cleanAccountNumber, "No. Rekening Bank Nagari");
            }}
            className="flex-1 py-2.5 px-4 rounded-xl bg-[#1D4ED8] text-white hover:bg-[#1E40AF] transition-all text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md cursor-pointer active:scale-95"
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
          className="py-2.5 px-3 rounded-xl bg-white border border-[#D8C7B2] text-[#1D4ED8] hover:bg-[#FAF7F2] transition-all text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
          title="Putar Kartu Nagari"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#1D4ED8]" />
          <span>Putar</span>
        </button>
      </div>
    </div>
  );
};

export default CardNagari;
