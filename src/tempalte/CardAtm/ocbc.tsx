import React, { useState } from "react";
import Tilt from "react-parallax-tilt";
import { Copy, RefreshCw } from "lucide-react";
import "./AtmCard3D.css";

export interface CardOcbcProps {
  accountNumber?: string;
  holderName?: string;
  expiry?: string;
  refCode?: string;
  cvv?: string;
  onCopy?: (text: string, label: string) => void;
}

export const CardOcbc: React.FC<CardOcbcProps> = ({
  accountNumber = "5379 4000 0000 0000",
  holderName = "DEBIT CARDHOLDER",
  expiry = "06/28",
  refCode = "5379",
  cvv = "789",
  onCopy,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const cleanAccountNumber = accountNumber.replace(/\s+/g, "");

  return (
    <div className="card-container text-center">
      {/* 3D Parallax Tilt Card for OCBC Bank */}
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
          {/* SISI DEPAN (FRONT) - OCBC BANK THEME */}
          <div className="card-face card-front ocbc-theme p-4 flex flex-col justify-between relative select-none">
            {/* OCBC Sail Fan 3D Geometric Overlay Pattern */}
            <svg
              className="absolute top-0 right-0 w-3/5 h-full opacity-40 pointer-events-none z-0"
              viewBox="0 0 200 210"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g stroke="rgba(0, 0, 0, 0.4)" strokeWidth="1.5">
                {/* Segmented Radial Fan Blades */}
                <path d="M 200 105 L 80 40 L 90 20 Z" fill="#7F1D1D" />
                <path d="M 200 105 L 60 70 L 80 40 Z" fill="#991B1B" />
                <path d="M 200 105 L 50 105 L 60 70 Z" fill="#B91C1C" />
                <path d="M 200 105 L 60 140 L 50 105 Z" fill="#991B1B" />
                <path d="M 200 105 L 80 170 L 60 140 Z" fill="#7F1D1D" />
                <path d="M 200 105 L 110 195 L 80 170 Z" fill="#450A0A" />

                {/* Overlapping Curved Aperture Circle */}
                <circle cx="160" cy="105" r="70" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="3" fill="none" />
              </g>
            </svg>

            {/* Content Layer */}
            <div className="relative z-10 flex flex-col justify-between h-full">
              {/* TOP ROW: OCBC BANK LOGO */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {/* White Circle Junk Ship Emblem */}
                  <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center p-1 shadow-sm">
                    {/* Chinese Sailing Ship Silhouette */}
                    <svg className="w-5 h-5 text-[#DC2626]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 17c3 2 9 2 12 0l6-2v-2l-6 2c-3 1-9 1-12 0L3 17z" />
                      <path d="M12 3v11l5-3.5L12 3z" />
                      <path d="M10 5v9L5 11l5-6z" />
                    </svg>
                  </div>
                  <span className="font-extrabold text-lg tracking-tight text-white drop-shadow-sm font-sans">
                    OCBC Bank
                  </span>
                </div>
              </div>

              {/* MIDDLE ROW: SILVER CHIP */}
              <div className="flex justify-start items-center my-0.5">
                {/* Silver EMV Chip */}
                <div className="card-chip silver shrink-0 shadow-md">
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
                <div className="font-mono text-[9px] text-red-200/80 tracking-widest -mt-0.5">
                  {refCode}
                </div>
              </div>

              {/* BOTTOM ROW: EXPIRED, HOLDER NAME & MASTERCARD LOGO */}
              <div className="flex justify-between items-end">
                <div className="flex flex-col text-left">
                  {/* Valid Thru */}
                  <div className="flex items-center gap-1.5 text-white mb-0.5">
                    <div className="text-[5.5px] font-bold leading-tight text-red-100/70 uppercase">
                      VALID<br />THRU
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[5px] font-semibold text-red-100/70 tracking-tighter uppercase -mb-0.5">MONTH/YEAR</span>
                      <span className="font-mono font-bold text-xs tracking-wider">{expiry}</span>
                    </div>
                  </div>
                  {/* Card Holder Name */}
                  <div className="font-sans font-bold text-xs tracking-wider text-white uppercase drop-shadow-sm">
                    {holderName}
                  </div>
                </div>

                {/* MASTERCARD LOGO */}
                <div className="flex flex-col items-center">
                  <div className="card-network-logo shadow-md rounded-full bg-white/10 p-0.5">
                    <div className="circle red"></div>
                    <div className="circle orange"></div>
                  </div>
                  <span className="text-[8px] font-bold text-white tracking-tight -mt-0.5 lowercase font-sans">
                    mastercard.
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
              Amplop Digital OCBC Bank Debit Mastercard. Terima kasih atas doa restu dan tanda kasih yang Anda berikan.
            </p>
            <div className="hologram-strip">
              <span className="hologram-seal">GENUINE OCBC BANK</span>
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
              onCopy(cleanAccountNumber, "No. Rekening OCBC Bank");
            }}
            className="flex-1 py-2.5 px-4 rounded-xl bg-[#dc2626] text-white hover:bg-[#991b1b] transition-all text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md cursor-pointer active:scale-95 border border-red-400/30"
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
          className="py-2.5 px-3 rounded-xl bg-white border border-[#D8C7B2] text-[#dc2626] hover:bg-[#FAF7F2] transition-all text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
          title="Putar Kartu OCBC Bank"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#dc2626]" />
          <span>Putar</span>
        </button>
      </div>
    </div>
  );
};

export default CardOcbc;
