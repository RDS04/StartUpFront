import React, { useState } from "react";
import Tilt from "react-parallax-tilt";
import { Copy, RefreshCw } from "lucide-react";
import "./AtmCard3D.css";

export interface CardBtpnProps {
  accountNumber?: string;
  holderName?: string;
  expiry?: string;
  refCode?: string;
  cvv?: string;
  onCopy?: (text: string, label: string) => void;
}

export const CardBtpn: React.FC<CardBtpnProps> = ({
  accountNumber = "4000 2261 0060 8899",
  holderName = "DEBIT CARDHOLDER",
  expiry = "10/28",
  refCode = "2261",
  cvv = "376",
  onCopy,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const cleanAccountNumber = accountNumber.replace(/\s+/g, "");

  return (
    <div className="card-container text-center">
      {/* 3D Parallax Tilt Card for Bank BTPN */}
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
          {/* SISI DEPAN (FRONT) - BANK BTPN SINAYA THEME */}
          <div className="card-face card-front btpn-theme p-4 flex flex-col justify-between relative select-none">
            {/* Swirling Orange/Gold Loops Motif Overlay */}
            <svg
              className="absolute -top-6 -right-6 w-4/5 h-full opacity-70 pointer-events-none z-0"
              viewBox="0 0 240 180"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g stroke="#F59E0B" strokeWidth="2.5" fill="none">
                {/* Loop Circles around logo */}
                <ellipse cx="150" cy="70" rx="75" ry="50" stroke="#FFB800" transform="rotate(-10 150 70)" />
                <ellipse cx="145" cy="75" rx="80" ry="45" stroke="#F59E0B" opacity="0.8" transform="rotate(5 145 75)" />
                <path d="M -30 20 C 40 10, 80 40, 150 20 C 200 5, 230 40, 260 80" stroke="#FF9100" strokeWidth="3" />
              </g>
              {/* Glowing Dot Accent */}
              <circle cx="190" cy="45" r="10" fill="#FFFFFF" opacity="0.8" />
              <circle cx="190" cy="45" r="22" fill="#FFC107" opacity="0.3" />
            </svg>

            {/* Content Layer */}
            <div className="relative z-10 flex flex-col justify-between h-full">
              {/* TOP ROW: BTPN SINAYA LOGO */}
              <div className="flex justify-end items-center">
                <div className="flex flex-col items-end text-right">
                  <span className="font-serif italic text-[11px] text-amber-200 tracking-wider font-light leading-none -mb-0.5">
                    sinaya
                  </span>
                  <span className="font-serif font-extrabold text-xl tracking-tight text-white drop-shadow-sm leading-tight">
                    btpn
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
                <div className="font-mono text-[9px] text-amber-100/70 tracking-widest -mt-0.5">
                  {refCode}
                </div>
              </div>

              {/* BOTTOM ROW: EXPIRED & VISA LOGO */}
              <div className="flex justify-between items-end">
                <div className="flex flex-col text-left">
                  {/* Valid Thru */}
                  <div className="flex items-center gap-1.5 text-white">
                    <div className="text-[6px] font-bold leading-none text-amber-100/70 uppercase">
                      VALID<br />THRU
                    </div>
                    <div className="font-mono font-bold text-xs tracking-wider">
                      {expiry}
                    </div>
                  </div>
                  {/* Card Holder Name */}
                  <div className="font-sans font-semibold text-[9px] tracking-wider text-white/90 uppercase mt-0.5">
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
              Amplop Digital Bank BTPN Sinaya Debit. Terima kasih atas doa restu dan tanda kasih yang Anda berikan.
            </p>
            <div className="hologram-strip">
              <span className="hologram-seal">GENUINE BANK BTPN</span>
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
              onCopy(cleanAccountNumber, "No. Rekening Bank BTPN");
            }}
            className="flex-1 py-2.5 px-4 rounded-xl bg-[#7c6957] text-white hover:bg-[#5c4c3e] transition-all text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md cursor-pointer active:scale-95 border border-amber-300/30"
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
          className="py-2.5 px-3 rounded-xl bg-white border border-[#D8C7B2] text-[#7c6957] hover:bg-[#FAF7F2] transition-all text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
          title="Putar Kartu Bank BTPN"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#7c6957]" />
          <span>Putar</span>
        </button>
      </div>
    </div>
  );
};

export default CardBtpn;
