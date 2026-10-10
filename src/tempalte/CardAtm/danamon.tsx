import React, { useState } from "react";
import Tilt from "react-parallax-tilt";
import { Copy, RefreshCw } from "lucide-react";
import "./AtmCard3D.css";

export interface CardDanamonProps {
  accountNumber?: string;
  holderName?: string;
  expiry?: string;
  cvv?: string;
  refCode?: string;
  onCopy?: (text: string, label: string) => void;
}

export const CardDanamon: React.FC<CardDanamonProps> = ({
  accountNumber = "1234 5678 9012 3456",
  holderName = "KEN ARTA",
  expiry = "12/28",
  cvv = "592",
  refCode = "5592",
  onCopy,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const cleanAccountNumber = accountNumber.replace(/\s+/g, "");

  return (
    <div className="card-container text-center">
      {/* 3D Parallax Tilt Card for Bank Danamon */}
      <Tilt
        perspective={1000}
        glareEnable={true}
        glareMaxOpacity={0.35}
        glareColor="#ffd700"
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
          {/* SISI DEPAN (FRONT) - DANAMON WORLD BUSINESS THEME */}
          <div className="card-face card-front danamon-theme p-4 flex flex-col justify-between relative select-none">
            {/* Dragon Scale Pattern Overlay */}
            <svg
              className="absolute top-2 left-0 w-full h-36 opacity-35 pointer-events-none z-0"
              viewBox="0 0 340 140"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g stroke="#F59E0B" strokeWidth="1" fill="none">
                <path d="M 20 40 Q 35 25 50 40 Q 65 25 80 40 Q 95 25 110 40 Q 125 25 140 40 Q 155 25 170 40 Q 185 25 200 40 Q 215 25 230 40 Q 245 25 260 40 Q 275 25 290 40 Q 305 25 320 40" />
                <path d="M 35 55 Q 50 40 65 55 Q 80 40 95 55 Q 110 40 125 55 Q 140 40 155 55 Q 170 40 185 55 Q 200 40 215 55 Q 230 40 245 55 Q 260 40 275 55 Q 290 40 305 55" />
                <path d="M 50 70 Q 65 55 80 70 Q 95 55 110 70 Q 125 55 140 70 Q 155 55 170 70 Q 185 55 200 70 Q 215 55 230 70 Q 245 55 260 70 Q 275 55 290 70" />
                <path d="M 65 85 Q 80 70 95 85 Q 110 70 125 85 Q 140 70 155 85 Q 170 70 185 85 Q 200 70 215 85 Q 230 70 245 85 Q 260 70 275 85" />
                <path d="M 80 100 Q 95 85 110 100 Q 125 85 140 100 Q 155 85 170 100 Q 185 85 200 100 Q 215 85 230 100 Q 245 85 260 100" />
              </g>
            </svg>

            {/* Gold Arc / Curved Golden Swoosh Separator */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-0"
              viewBox="0 0 340 210"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Golden Arc Shadow & Thick Swoosh */}
              <path
                d="M -10 115 C 80 155, 230 150, 350 75"
                stroke="url(#goldGradient)"
                strokeWidth="5"
                fill="none"
              />
              <path
                d="M -10 120 C 80 160, 230 155, 350 80"
                stroke="rgba(0,0,0,0.5)"
                strokeWidth="3"
                fill="none"
              />
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FCD34D" />
                  <stop offset="50%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#D97706" />
                </linearGradient>
              </defs>
            </svg>

            {/* Content Layer */}
            <div className="relative z-10 flex flex-col justify-between h-full">
              {/* TOP ROW: DANAMON LOGO & WORLD BUSINESS */}
              <div className="flex justify-between items-start">
                {/* DANAMON GOLD LOGO */}
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-1.5">
                    {/* Danamon Graphic Mark */}
                    <svg className="w-12 h-5" viewBox="0 0 100 35" fill="none">
                      <polygon points="0,0 80,0 60,15 100,15 20,35" fill="url(#danamonGold)" />
                      <defs>
                        <linearGradient id="danamonGold" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#FDE68A" />
                          <stop offset="100%" stopColor="#D97706" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <span className="font-bold text-xl tracking-tight text-[#FCD34D] drop-shadow-sm font-sans -mt-1">
                    Danamon
                  </span>
                </div>

                {/* WORLD BUSINESS & CONTACTLESS WAVE */}
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm tracking-wide text-[#FCD34D] drop-shadow-xs font-sans">
                    world business
                  </span>
                  {/* Gold Contactless Waves */}
                  <svg className="w-5 h-5 text-[#FCD34D]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 6a9 9 0 0 1 0 12" strokeLinecap="round" />
                    <path d="M15.5 3.5a14 14 0 0 1 0 17" strokeLinecap="round" />
                    <path d="M8.5 8.5a5 5 0 0 1 0 7" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              {/* MIDDLE ROW: EMV CHIP */}
              <div className="flex justify-start items-center my-0.5">
                <div className="card-chip shrink-0 shadow-md">
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
                <div className="font-mono text-[9px] text-amber-200/80 tracking-widest -mt-0.5">
                  {refCode}
                </div>
              </div>

              {/* BOTTOM ROW: EXPIRED, HOLDER NAME & MASTERCARD LOGO */}
              <div className="flex justify-between items-end">
                <div className="flex flex-col text-left">
                  {/* Valid Thru */}
                  <div className="flex items-center gap-1.5 text-white mb-0.5">
                    <div className="text-[6px] font-bold leading-none text-amber-200/70">
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
              Amplop Digital Bank Danamon World Business. Terima kasih atas doa restu dan tanda kasih yang Anda berikan.
            </p>
            <div className="hologram-strip">
              <span className="hologram-seal">GENUINE DANAMON</span>
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
              onCopy(cleanAccountNumber, "No. Rekening Bank Danamon");
            }}
            className="flex-1 py-2.5 px-4 rounded-xl bg-[#70101c] border border-[#FCD34D]/40 text-[#FCD34D] hover:bg-[#4a0912] transition-all text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md cursor-pointer active:scale-95"
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
          className="py-2.5 px-3 rounded-xl bg-white border border-[#D8C7B2] text-[#70101c] hover:bg-[#FAF7F2] transition-all text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
          title="Putar Kartu Bank Danamon"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#70101c]" />
          <span>Putar</span>
        </button>
      </div>
    </div>
  );
};

export default CardDanamon;
