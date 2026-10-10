import React, { useState } from "react";
import Tilt from "react-parallax-tilt";
import { Copy, RefreshCw } from "lucide-react";
import "./AtmCard3D.css";

export interface CardNeoProps {
  accountNumber?: string;
  holderName?: string;
  expiry?: string;
  cvv?: string;
  onCopy?: (text: string, label: string) => void;
}

export const CardNeo: React.FC<CardNeoProps> = ({
  accountNumber = "9876 4321 2733 1932",
  holderName = "LUNA RIA",
  expiry = "10/26",
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
      {/* 3D Parallax Tilt Card for KoinWorks NEO */}
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
          {/* SISI DEPAN (FRONT) - KOINWORKS NEO THEME */}
          <div className="card-face card-front neo-theme p-4 flex flex-col justify-between relative select-none">
            {/* Background Arch Line Grid Vector */}
            <svg
              className="absolute inset-0 w-full h-full opacity-25 pointer-events-none"
              viewBox="0 0 340 210"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M-20 210 A 100 100 0 0 1 180 210" stroke="#E52E38" strokeWidth="1.2" />
              <path d="M80 210 A 100 100 0 0 1 280 210" stroke="#E52E38" strokeWidth="1.2" />
              <path d="M180 210 A 100 100 0 0 1 380 210" stroke="#E52E38" strokeWidth="1.2" />
              <path d="M-20 110 A 100 100 0 0 1 180 110" stroke="#E52E38" strokeWidth="1" />
              <path d="M80 110 A 100 100 0 0 1 280 110" stroke="#E52E38" strokeWidth="1" />
              <line x1="80" y1="0" x2="80" y2="210" stroke="#E52E38" strokeWidth="0.8" />
              <line x1="180" y1="0" x2="180" y2="210" stroke="#E52E38" strokeWidth="0.8" />
              <line x1="280" y1="0" x2="280" y2="210" stroke="#E52E38" strokeWidth="0.8" />
            </svg>

            {/* Red Swoosh Bottom Right Accent */}
            <div className="neo-red-swoosh"></div>

            {/* Pop Art Characters Illustration on Red Swoosh */}
            <svg
              className="absolute bottom-0 right-0 w-44 h-36 z-10 pointer-events-none"
              viewBox="0 0 200 160"
              fill="none"
            >
              {/* Sun Character */}
              <g transform="translate(40, 30)">
                {/* Sun rays / hair */}
                <path d="M30 10 L35 0 L40 10 L50 2 L52 14 L64 10 L60 22 L72 22 L65 32 L75 38 L65 46 L73 54 L62 58" stroke="#000" strokeWidth="2" fill="#F5A623" />
                {/* Face */}
                <circle cx="40" cy="35" r="20" fill="#F8C08A" stroke="#000" strokeWidth="2" />
                {/* Eyes & smile */}
                <circle cx="33" cy="32" r="2.5" fill="#000" />
                <circle cx="47" cy="32" r="2.5" fill="#000" />
                <path d="M34 42 Q40 47 46 42" stroke="#000" strokeWidth="2" fill="none" />
                <circle cx="28" cy="38" r="3" fill="#E52E38" opacity="0.6" />
                <circle cx="52" cy="38" r="3" fill="#E52E38" opacity="0.6" />
              </g>

              {/* Stacked Creature / Helmet Character */}
              <g transform="translate(110, 20)">
                <ellipse cx="35" cy="40" rx="22" ry="28" fill="#50A2D8" stroke="#000" strokeWidth="2" />
                <circle cx="35" cy="30" r="12" fill="#FFF" stroke="#000" strokeWidth="1.5" />
                <circle cx="35" cy="30" r="5" fill="#F5A623" />
                <circle cx="35" cy="30" r="2" fill="#000" />
                {/* Antenna */}
                <line x1="35" y1="12" x2="35" y2="2" stroke="#000" strokeWidth="2" />
                <circle cx="35" cy="2" r="3" fill="#E52E38" stroke="#000" strokeWidth="1" />
              </g>

              {/* Red Character Body */}
              <g transform="translate(100, 65)">
                <path d="M15 10 C15 -10 55 -10 55 10 C65 30 60 70 35 75 C10 70 5 30 15 10 Z" fill="#C42A2A" stroke="#000" strokeWidth="2" />
                <circle cx="27" cy="30" r="3" fill="#000" />
                <circle cx="43" cy="30" r="3" fill="#000" />
                <path d="M30 45 Q35 50 40 45" stroke="#000" strokeWidth="2" fill="none" />
              </g>

              {/* Heart Character */}
              <g transform="translate(20, 75)">
                <path d="M20 10 C15 0 0 0 0 15 C0 30 20 40 20 45 C20 40 40 30 40 15 C40 0 25 0 20 10 Z" fill="#EE5A60" stroke="#000" strokeWidth="2" />
                <circle cx="12" cy="18" r="2" fill="#000" />
                <circle cx="28" cy="18" r="2" fill="#000" />
              </g>

              {/* Small Caterpillar / Dots */}
              <g transform="translate(25, 125)">
                <circle cx="10" cy="10" r="6" fill="#F5A623" stroke="#000" strokeWidth="1.5" />
                <circle cx="20" cy="10" r="6" fill="#F5A623" stroke="#000" strokeWidth="1.5" />
                <circle cx="30" cy="10" r="6" fill="#F5A623" stroke="#000" strokeWidth="1.5" />
                <circle cx="8" cy="9" r="1" fill="#000" />
              </g>
            </svg>

            {/* Layer Content Overlay */}
            <div className="relative z-20 flex flex-col justify-between h-full">
              {/* TOP ROW: KOINWORKS NEO LOGO & MASTERCARD */}
              <div className="flex justify-between items-start">
                <div className="flex flex-col text-left">
                  <span className="text-[7.5px] font-bold tracking-[2px] text-slate-300 uppercase leading-none mb-0.5">
                    KOINWORKS
                  </span>
                  <span className="text-2xl font-black tracking-wider text-white leading-none font-sans">
                    NEO
                  </span>
                </div>

                {/* Mastercard Logo */}
                <div className="card-network-logo">
                  <div className="circle red"></div>
                  <div className="circle orange"></div>
                </div>
              </div>

              {/* MIDDLE / BOTTOM LEFT: CARD HOLDER & CARD NUMBER */}
              <div className="mt-auto mb-1 flex justify-between items-end">
                <div className="flex flex-col text-left">
                  {/* Cardholder Name */}
                  <div className="text-sm sm:text-base font-bold text-white tracking-wider uppercase drop-shadow-md mb-0.5">
                    {holderName}
                  </div>
                  {/* Card Number */}
                  <div className="font-sans font-extrabold text-base sm:text-[17px] tracking-[2px] text-white drop-shadow-md">
                    {accountNumber}
                  </div>
                </div>

                {/* BOTTOM RIGHT: EXPIRY DATE */}
                <div className="flex flex-col text-right text-white font-sans pr-1 pb-0.5">
                  <span className="text-[7.5px] font-bold tracking-wider text-white/80 leading-none">
                    Exp Date
                  </span>
                  <span className="text-xs font-bold tracking-wider leading-tight">
                    {expiry}
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
              Amplop Digital KoinWorks NEO. Terima kasih atas doa restu dan tanda kasih yang Anda berikan.
            </p>
            <div className="hologram-strip">
              <span className="hologram-seal">GENUINE NEO</span>
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
              onCopy(cleanAccountNumber, "No. Rekening KoinWorks NEO");
            }}
            className="flex-1 py-2.5 px-4 rounded-xl bg-[#E52E38] text-white hover:bg-[#C4242D] transition-all text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md cursor-pointer active:scale-95"
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
          className="py-2.5 px-3 rounded-xl bg-white border border-[#D8C7B2] text-[#E52E38] hover:bg-[#FAF7F2] transition-all text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
          title="Putar Kartu NEO"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#E52E38]" />
          <span>Putar</span>
        </button>
      </div>
    </div>
  );
};

export default CardNeo;
