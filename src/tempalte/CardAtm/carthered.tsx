import React, { useState } from "react";
import Tilt from "react-parallax-tilt";
import { Copy, RefreshCw } from "lucide-react";
import "./AtmCard3D.css";

export interface CardCharteredProps {
  accountNumber?: string;
  holderName?: string;
  expiry?: string;
  refCode?: string;
  cvv?: string;
  onCopy?: (text: string, label: string) => void;
}

export const CardChartered: React.FC<CardCharteredProps> = ({
  accountNumber = "5399 2719 9999 9999",
  holderName = "BAMBANG IRAWAN",
  expiry = "10/30",
  refCode = "5399",
  cvv = "899",
  onCopy,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const cleanAccountNumber = accountNumber.replace(/\s+/g, "");

  return (
    <div className="card-container text-center">
      {/* 3D Parallax Tilt Card for Standard Chartered */}
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
          {/* SISI DEPAN (FRONT) - STANDARD CHARTERED THEME */}
          <div className="card-face card-front chartered-theme p-4 flex flex-col justify-between relative select-none">
            {/* Trustmark Watermark Giant Overlay */}
            <svg
              className="absolute top-1/2 left-1/2 -translate-x-1/3 -translate-y-1/2 w-4/5 h-4/5 opacity-20 pointer-events-none z-0"
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M30 20 C50 5, 80 5, 100 25 C115 40, 110 70, 85 90 C65 105, 35 105, 15 85 C0 70, 5 40, 30 20 Z"
                stroke="#60A5FA"
                strokeWidth="12"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M20 60 C35 45, 65 45, 85 65 C100 80, 95 110, 70 120 C50 130, 20 120, 5 100"
                stroke="#34D399"
                strokeWidth="12"
                strokeLinecap="round"
                fill="none"
              />
            </svg>

            {/* Content Layer */}
            <div className="relative z-10 flex flex-col justify-between h-full">
              {/* TOP ROW: STANDARD CHARTERED LOGO & TRUSTMARK ICON */}
              <div className="flex justify-between items-start">
                <div className="flex flex-col text-left">
                  <span className="font-sans font-medium text-sm tracking-tight text-white leading-tight">
                    standard
                  </span>
                  <span className="font-sans font-medium text-sm tracking-tight text-white leading-tight -mt-1">
                    chartered
                  </span>
                </div>

                {/* Standard Chartered Trustmark Emblem */}
                <svg className="w-10 h-10 drop-shadow-sm" viewBox="0 0 60 60" fill="none">
                  <path
                    d="M15 12 C25 2, 45 2, 55 15 C62 25, 58 42, 44 52 C32 60, 15 58 5 45"
                    stroke="#0264B3"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M8 32 C18 20, 38 20, 48 32 C56 42, 52 56, 38 62 C25 68, 10 60 2 45"
                    stroke="#78BE20"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* MIDDLE ROW: CHIP & PREMIUM DEBIT TEXT */}
              <div className="flex justify-start items-center gap-3 my-0.5">
                {/* Silver EMV Chip */}
                <div className="card-chip silver shrink-0 shadow-md">
                  <div className="chip-line"></div>
                  <div className="chip-line"></div>
                  <div className="chip-line"></div>
                </div>

                <span className="text-xs font-semibold tracking-wider text-white/90 font-sans">
                  premium debit
                </span>
              </div>

              {/* CARD NUMBER */}
              <div className="my-0.5 text-left">
                <div className="font-mono font-bold text-[17px] tracking-[2.5px] text-white drop-shadow-md">
                  {accountNumber}
                </div>
                <div className="font-mono text-[9px] text-blue-200/80 tracking-widest -mt-0.5">
                  {refCode}
                </div>
              </div>

              {/* BOTTOM ROW: EXPIRED, HOLDER NAME & MASTERCARD LOGO */}
              <div className="flex justify-between items-end">
                <div className="flex flex-col text-left">
                  {/* Valid Thru */}
                  <div className="flex items-center gap-1.5 text-white mb-0.5">
                    <div className="text-[5.5px] font-bold leading-none text-blue-100/70 uppercase">
                      VALID<br />THRU
                    </div>
                    <div className="font-mono font-bold text-xs tracking-wider">
                      {expiry}
                    </div>
                  </div>
                  {/* Card Holder Name */}
                  <div className="font-sans font-bold text-sm tracking-wider text-white uppercase drop-shadow-sm">
                    {holderName}
                  </div>
                </div>

                {/* MASTERCARD LOGO */}
                <div className="flex flex-col items-center">
                  <div className="card-network-logo shadow-md rounded-full bg-white/10 p-0.5">
                    <div className="circle red"></div>
                    <div className="circle orange"></div>
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
              Amplop Digital Standard Chartered Premium Debit. Terima kasih atas doa restu dan tanda kasih yang Anda berikan.
            </p>
            <div className="hologram-strip">
              <span className="hologram-seal">GENUINE STANDARD CHARTERED</span>
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
              onCopy(cleanAccountNumber, "No. Rekening Standard Chartered");
            }}
            className="flex-1 py-2.5 px-4 rounded-xl bg-[#0264b3] text-white hover:bg-[#004580] transition-all text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md cursor-pointer active:scale-95 border border-blue-400/30"
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
          className="py-2.5 px-3 rounded-xl bg-white border border-[#D8C7B2] text-[#0264b3] hover:bg-[#FAF7F2] transition-all text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
          title="Putar Kartu Standard Chartered"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#0264b3]" />
          <span>Putar</span>
        </button>
      </div>
    </div>
  );
};

export default CardChartered;
