import React, { useState } from "react";
import Tilt from "react-parallax-tilt";
import { Copy, RefreshCw } from "lucide-react";
import "./AtmCard3D.css";

export interface CardBsiProps {
  accountNumber?: string;
  holderName?: string;
  expiry?: string;
  cvv?: string;
  onCopy?: (text: string, label: string) => void;
}

export const CardBsi: React.FC<CardBsiProps> = ({
  accountNumber = "6034 9400 0000 0000",
  holderName = "CARD HOLDER NAME",
  expiry = "12/24",
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
      {/* 3D Parallax Tilt Card for BSI */}
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
          {/* SISI DEPAN (FRONT) - BSI GOLD DEBIT THEME */}
          <div className="card-face card-front bsi-theme p-4 flex flex-col justify-between relative select-none">
            {/* Vector Layers background matching BSI Debit Card */}
            <div className="bsi-teal-shape"></div>
            <div className="bsi-main-gold"></div>
            <div className="bsi-light-slice"></div>

            {/* Layer 4: Content Overlay */}
            <div className="relative z-10 flex flex-col justify-between h-full">
              {/* TOP ROW: BSI LOGO */}
              <div className="flex justify-end items-center">
                <div className="flex items-center gap-1">
                  <div className="relative flex items-center">
                    <span className="font-extrabold text-2xl tracking-wider text-white drop-shadow-sm font-sans">
                      BSI
                    </span>
                    {/* BSI Star Icon above letter I */}
                    <svg
                      className="w-4 h-4 text-white -mt-3 -ml-0.5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* EMV CHIP & GOLD DEBIT TEXT */}
              <div className="flex items-center gap-3 mt-1">
                {/* Chip Logam EMV */}
                <div className="card-chip shrink-0">
                  <div className="chip-line"></div>
                  <div className="chip-line"></div>
                  <div className="chip-line"></div>
                </div>
                <div className="flex flex-col text-left leading-none font-bold text-[#332211]">
                  <span className="text-[10px] tracking-wider">GOLD</span>
                  <span className="text-[10px] tracking-wider">DEBIT</span>
                </div>
              </div>

              {/* CARD NUMBER (EMBOSSED SILVER TEXT) */}
              <div className="my-1 text-left">
                <div className="bsi-embossed-text text-[17px] tracking-[2px] leading-tight drop-shadow-md">
                  {accountNumber}
                </div>
              </div>

              {/* BOTTOM ROW: EXPIRED, HOLDER NAME & GPN LOGO */}
              <div className="flex justify-between items-end">
                <div className="flex flex-col text-left">
                  {/* Valid Thru */}
                  <div className="flex items-center gap-1 mb-1">
                    <div className="text-[6.5px] font-bold text-[#3a2e1e] leading-[1.1] text-right">
                      VALID<br />THRU
                    </div>
                    <div className="bsi-embossed-text text-xs tracking-wider">
                      {expiry}
                    </div>
                  </div>
                  {/* Card Holder Name */}
                  <div className="bsi-embossed-text text-sm tracking-wider uppercase">
                    {holderName}
                  </div>
                </div>

                {/* GPN LOGO */}
                <div className="flex flex-col items-center leading-none">
                  {/* Eagle Wing Icon */}
                  <svg className="w-8 h-7 text-[#E52330]" viewBox="0 0 100 100" fill="currentColor">
                    <path d="M10,80 Q30,20 85,10 Q60,35 45,45 Q75,30 95,25 Q70,50 50,60 Q80,50 90,52 Q65,70 35,75 Z" />
                    <path d="M25,85 Q45,55 75,45 Q55,65 40,75 Z" fill="#C4161C" />
                  </svg>
                  {/* GPN Text */}
                  <span className="font-extrabold text-[13px] tracking-tight text-[#0D2C62] -mt-1 font-sans">
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
              Amplop Digital Bank Syariah Indonesia (BSI). Terima kasih atas doa restu dan tanda kasih yang Anda berikan.
            </p>
            <div className="hologram-strip">
              <span className="hologram-seal">GENUINE BSI</span>
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
              onCopy(cleanAccountNumber, "No. Rekening BSI");
            }}
            className="flex-1 py-2.5 px-4 rounded-xl bg-[#0B998C] text-white hover:bg-[#087B70] transition-all text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md cursor-pointer active:scale-95"
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
          className="py-2.5 px-3 rounded-xl bg-white border border-[#D8C7B2] text-[#0B998C] hover:bg-[#FAF7F2] transition-all text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
          title="Putar Kartu BSI"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#0B998C]" />
          <span>Putar</span>
        </button>
      </div>
    </div>
  );
};

export default CardBsi;
