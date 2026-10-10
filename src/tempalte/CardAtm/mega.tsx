import React, { useState } from "react";
import Tilt from "react-parallax-tilt";
import { Copy, RefreshCw } from "lucide-react";
import "./AtmCard3D.css";

export interface CardMegaProps {
  accountNumber?: string;
  holderName?: string;
  expiry?: string;
  memberSince?: string;
  cvv?: string;
  onCopy?: (text: string, label: string) => void;
}

export const CardMega: React.FC<CardMegaProps> = ({
  accountNumber = "4312 2678 9012 3456",
  holderName = "ADI PRATAMA",
  expiry = "12/26",
  memberSince = "21",
  cvv = "345",
  onCopy,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const cleanAccountNumber = accountNumber.replace(/\s+/g, "");

  return (
    <div className="card-container text-center">
      {/* 3D Parallax Tilt Card for Bank Mega */}
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
          {/* SISI DEPAN (FRONT) - BANK MEGA THEME */}
          <div className="card-face card-front mega-theme p-4 flex flex-col justify-between relative select-none">
            {/* Flowing Ribbon Wave 'M' Motif Pattern Overlay */}
            <svg
              className="absolute inset-0 w-full h-full opacity-35 pointer-events-none z-0"
              viewBox="0 0 340 210"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1" fill="none">
                {/* Ribbon Mesh 1 */}
                <path d="M -20 180 C 60 100, 70 20, 140 100 C 200 180, 230 40, 360 160" strokeWidth="1.5" />
                <path d="M -15 185 C 65 105, 75 25, 145 105 C 205 185, 235 45, 365 165" opacity="0.8" />
                <path d="M -10 190 C 70 110, 80 30, 150 110 C 210 190, 240 50, 370 170" opacity="0.6" />
                <path d="M -5 195 C 75 115, 85 35, 155 115 C 215 195, 245 55, 375 175" opacity="0.4" />

                {/* Secondary Wave Ribbon Mesh */}
                <path d="M -30 160 C 50 80, 80 10, 150 80 C 210 150, 250 20, 350 140" strokeWidth="1.2" />
                <path d="M -25 165 C 55 85, 85 15, 155 85 C 215 155, 255 25, 355 145" opacity="0.7" />
                <path d="M -20 170 C 60 90, 90 20, 160 90 C 220 160, 260 30, 360 150" opacity="0.5" />
              </g>
            </svg>

            {/* Content Layer */}
            <div className="relative z-10 flex flex-col justify-between h-full">
              {/* TOP ROW: BANK MEGA LOGO ON RIGHT */}
              <div className="flex justify-end items-center">
                <div className="flex items-center gap-2">
                  {/* Bank Mega 'M' Ribbon Logo */}
                  <svg className="w-8 h-8 drop-shadow-sm" viewBox="0 0 100 90" fill="none">
                    {/* Left Yellow Bar */}
                    <polygon points="10,85 35,10 50,38 25,85" fill="#FFD100" />
                    {/* Middle Orange Bar */}
                    <polygon points="40,85 55,38 70,85" fill="#F37021" />
                    {/* Right Grey Bar */}
                    <polygon points="60,85 75,38 90,10 75,85" fill="#4D535A" />
                  </svg>
                  <div className="flex flex-col text-left">
                    <div className="font-sans text-xs tracking-wider text-white uppercase font-light leading-none">
                      BANK
                    </div>
                    <div className="font-sans font-black text-sm tracking-widest text-white uppercase leading-tight -mt-0.5">
                      MEGA
                    </div>
                  </div>
                </div>
              </div>

              {/* MIDDLE ROW: GOLD CHIP & CONTACTLESS ICON */}
              <div className="flex justify-start items-center gap-2.5 -mt-2">
                {/* Gold EMV Chip */}
                <div className="card-chip shrink-0 shadow-md">
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
              </div>

              {/* BOTTOM ROW: MEMBER SINCE, EXPIRED, HOLDER NAME & VISA */}
              <div className="flex justify-between items-end">
                <div className="flex flex-col text-left">
                  {/* Member Since & Valid Thru Row */}
                  <div className="flex items-center gap-4 text-white mb-0.5">
                    {/* Member Since */}
                    <div className="flex items-center gap-1">
                      <div className="text-[5.5px] font-bold leading-tight text-white/80 uppercase">
                        MEMBER<br />SINCE
                      </div>
                      <div className="font-mono font-bold text-xs tracking-wider">
                        {memberSince}
                      </div>
                    </div>
                    {/* Valid Thru */}
                    <div className="flex items-center gap-1">
                      <div className="text-[5.5px] font-bold leading-tight text-white/80 uppercase">
                        VALID<br />THRU
                      </div>
                      <div className="font-mono font-bold text-xs tracking-wider">
                        {expiry}
                      </div>
                    </div>
                  </div>

                  {/* Card Holder Name */}
                  <div className="font-sans font-bold text-sm tracking-wider text-white uppercase drop-shadow-sm">
                    {holderName}
                  </div>
                </div>

                {/* VISA LOGO */}
                <div className="font-extrabold text-2xl tracking-tighter text-white italic font-sans drop-shadow-md">
                  VISA
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
              Amplop Digital Bank Mega Debit Gold. Terima kasih atas doa restu dan tanda kasih yang Anda berikan.
            </p>
            <div className="hologram-strip">
              <span className="hologram-seal">GENUINE BANK MEGA</span>
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
              onCopy(cleanAccountNumber, "No. Rekening Bank Mega");
            }}
            className="flex-1 py-2.5 px-4 rounded-xl bg-[#ca8613] text-white hover:bg-[#9e6406] transition-all text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md cursor-pointer active:scale-95 border border-amber-300/30"
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
          className="py-2.5 px-3 rounded-xl bg-white border border-[#D8C7B2] text-[#ca8613] hover:bg-[#FAF7F2] transition-all text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
          title="Putar Kartu Bank Mega"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#ca8613]" />
          <span>Putar</span>
        </button>
      </div>
    </div>
  );
};

export default CardMega;
