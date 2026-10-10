import React, { useState } from "react";
import Tilt from "react-parallax-tilt";
import { Copy, RefreshCw } from "lucide-react";
import "./AtmCard3D.css";

export interface CardCimbNiagaProps {
  accountNumber?: string;
  holderName?: string;
  expiry?: string;
  cvv?: string;
  refCode?: string;
  onCopy?: (text: string, label: string) => void;
}

export const CardCimbNiaga: React.FC<CardCimbNiagaProps> = ({
  accountNumber = "5576 9201 2345 6789",
  holderName = "HARYANTO WIBOWO",
  expiry = "12/28",
  cvv = "892",
  refCode = "H123456",
  onCopy,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const cleanAccountNumber = accountNumber.replace(/\s+/g, "");

  return (
    <div className="card-container text-center">
      {/* 3D Parallax Tilt Card for CIMB Niaga */}
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
          {/* SISI DEPAN (FRONT) - CIMB NIAGA THEME */}
          <div className="card-face card-front cimb-theme p-4 flex flex-col justify-between relative select-none">
            {/* Geometric Chevron Arrow Pattern Overlay */}
            <svg
              className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
              viewBox="0 0 340 210"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="#FFFFFF">
                <path d="M20 70 L45 95 L20 120 L35 120 L60 95 L35 70 Z" />
                <path d="M70 50 L105 85 L70 120 L90 120 L125 85 L90 50 Z" />
                <path d="M140 40 L185 85 L140 130 L165 130 L210 85 L165 40 Z" />
                <path d="M220 30 L275 85 L220 140 L245 140 L300 85 L245 30 Z" />
                <path d="M290 50 L320 80 L290 110 L305 110 L335 80 L305 50 Z" />
              </g>
            </svg>

            {/* Content Layer */}
            <div className="relative z-10 flex flex-col justify-between h-full">
              {/* TOP ROW: CIMB NIAGA LOGO */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {/* White Box Logo Icon */}
                  <div className="bg-white px-2 py-1 rounded shadow-xs flex items-center gap-1">
                    <div className="w-3.5 h-3.5 bg-[#C41230] flex items-center justify-center rounded-xs">
                      {/* Red Parallelogram/Chevron mark */}
                      <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4 4h10l6 8-6 8H4l6-8-6-8z" />
                      </svg>
                    </div>
                  </div>
                  <span className="font-extrabold text-lg tracking-wider text-white drop-shadow-sm font-sans">
                    CIMB NIAGA
                  </span>
                </div>
              </div>

              {/* MIDDLE ROW: CHIP & DEBIT TEXT */}
              <div className="flex justify-between items-center -mt-2">
                <div className="flex items-center gap-2">
                  {/* Vertical Left Label */}
                  <span className="text-[6.5px] font-semibold text-white/80 uppercase tracking-widest rotate-90 origin-left translate-y-3 -ml-2">
                    ELECTRONIC USE ONLY
                  </span>
                  {/* Gold Chip */}
                  <div className="card-chip shrink-0">
                    <div className="chip-line"></div>
                    <div className="chip-line"></div>
                    <div className="chip-line"></div>
                  </div>
                </div>

                <span className="text-xs font-bold tracking-[2px] text-white/90">
                  DEBIT
                </span>
              </div>

              {/* CARD NUMBER */}
              <div className="my-0.5 text-left">
                <div className="font-mono font-bold text-[17px] tracking-[2.5px] text-white drop-shadow-md">
                  {accountNumber}
                </div>
                <div className="font-mono text-[9px] text-white/70 tracking-widest -mt-0.5">
                  5196
                </div>
              </div>

              {/* BOTTOM ROW: EXPIRED, HOLDER NAME & MASTERCARD LOGO */}
              <div className="flex justify-between items-end">
                <div className="flex flex-col text-left">
                  {/* Valid Thru */}
                  <div className="flex items-center gap-1.5 text-white mb-0.5">
                    <div className="text-[6px] font-bold leading-none text-white/80">
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
                  {/* Ref Code */}
                  <div className="font-mono text-[9px] text-white/80 tracking-wider">
                    {refCode}
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
              Amplop Digital Bank CIMB Niaga Debit. Terima kasih atas doa restu dan tanda kasih yang Anda berikan.
            </p>
            <div className="hologram-strip">
              <span className="hologram-seal">GENUINE CIMB NIAGA</span>
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
              onCopy(cleanAccountNumber, "No. Rekening CIMB Niaga");
            }}
            className="flex-1 py-2.5 px-4 rounded-xl bg-[#C41230] text-white hover:bg-[#9E0D25] transition-all text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md cursor-pointer active:scale-95"
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
          className="py-2.5 px-3 rounded-xl bg-white border border-[#D8C7B2] text-[#C41230] hover:bg-[#FAF7F2] transition-all text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
          title="Putar Kartu CIMB Niaga"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#C41230]" />
          <span>Putar</span>
        </button>
      </div>
    </div>
  );
};

export default CardCimbNiaga;
