import React, { useState } from "react";
import Tilt from "react-parallax-tilt";
import { Copy, RefreshCw } from "lucide-react";
import "./AtmCard3D.css";

export interface CardMuamalatProps {
  accountNumber?: string;
  holderName?: string;
  expiry?: string;
  cvv?: string;
  onCopy?: (text: string, label: string) => void;
}

export const CardMuamalat: React.FC<CardMuamalatProps> = ({
  accountNumber = "4988 6400 1234 5678",
  holderName = "ADHI PRATAMA",
  expiry = "12/28",
  cvv = "387",
  onCopy,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const cleanAccountNumber = accountNumber.replace(/\s+/g, "");

  // Split account number into 4 blocks of 4 digits for vertical display
  const numClean = cleanAccountNumber.padEnd(16, "0");
  const block1 = numClean.slice(0, 4);
  const block2 = numClean.slice(4, 8);
  const block3 = numClean.slice(8, 12);
  const block4 = numClean.slice(12, 16);

  return (
    <div className="card-container text-center">
      {/* Vertical 3D Parallax Tilt Card for Bank Muamalat */}
      <Tilt
        perspective={1000}
        glareEnable={true}
        glareMaxOpacity={0.35}
        glareColor="#ffffff"
        glarePosition="all"
        tiltMaxAngleX={12}
        tiltMaxAngleY={12}
        className="card-perspective vertical mx-auto"
      >
        <div
          className={`atm-card ${isFlipped ? "flipped" : ""}`}
          onClick={toggleFlip}
          title="Klik kartu untuk membalik"
        >
          {/* SISI DEPAN (FRONT) - BANK MUAMALAT VERTICAL THEME */}
          <div className="card-face card-front muamalat-theme p-4 flex flex-col justify-between relative select-none">
            {/* Background Texture & Brushed Lines */}
            <div className="absolute inset-0 opacity-15 bg-[repeating-linear-gradient(90deg,#fff,#fff_1px,transparent_1px,transparent_3px)] pointer-events-none"></div>

            {/* Left Margin Arabic Geometric Pattern Strip */}
            <div className="absolute top-16 left-3 flex flex-col gap-3 opacity-20 pointer-events-none">
              {[1, 2, 3, 4].map((i) => (
                <svg key={i} className="w-12 h-12 text-white" viewBox="0 0 40 40" fill="currentColor">
                  <path d="M20 0 L40 20 L20 40 L0 20 Z" fill="none" stroke="currentColor" strokeWidth="2" />
                  <rect x="10" y="10" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="20" cy="20" r="3" />
                  <circle cx="10" cy="10" r="1.5" />
                  <circle cx="30" cy="10" r="1.5" />
                  <circle cx="10" cy="30" r="1.5" />
                  <circle cx="30" cy="30" r="1.5" />
                </svg>
              ))}
            </div>

            {/* Layer Content */}
            <div className="relative z-10 flex flex-col justify-between h-full">
              {/* TOP ROW: LOGO MUAMALAT & VISA */}
              <div className="flex justify-between items-start">
                {/* Bank Muamalat Logo */}
                <div className="flex items-center gap-2">
                  {/* Lime Green Calligraphy Logo */}
                  <div className="w-8 h-8 rounded-full bg-[#72C130] flex items-center justify-center shadow-sm p-1">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5c-2.49 0-4.5-2.01-4.5-4.5S8.51 7.5 11 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5z" />
                      <circle cx="11" cy="12" r="2" fill="#72C130" />
                    </svg>
                  </div>
                  <div className="flex flex-col text-left leading-tight">
                    <span className="text-xs font-semibold text-white tracking-tight">Bank</span>
                    <span className="text-sm font-bold text-white tracking-wide -mt-0.5">Muamalat</span>
                  </div>
                </div>

                {/* VISA Logo */}
                <div className="font-extrabold italic text-2xl tracking-tighter text-white font-sans drop-shadow-sm">
                  VISA
                </div>
              </div>

              {/* MIDDLE RIGHT: VERTICAL STACKED CARD NUMBER BLOCKS */}
              <div className="flex flex-col items-end my-auto space-y-1.5 pr-1">
                {[block1, block2, block3, block4].map((numBlock, idx) => (
                  <div
                    key={idx}
                    className="border border-white/40 px-2.5 py-0.5 rounded-sm bg-white/5 backdrop-blur-xs font-mono font-bold text-lg tracking-[4px] text-white text-right drop-shadow-sm"
                  >
                    {numBlock}
                  </div>
                ))}

                {/* GOOD THRU & SECURITY CODE */}
                <div className="flex justify-end items-center gap-3 pt-2 text-right">
                  <div className="flex flex-col text-[7px] font-bold text-white/80 leading-tight">
                    <span>GOOD</span>
                    <span>THRU</span>
                  </div>
                  <span className="font-mono font-bold text-sm tracking-wider text-white">
                    {expiry}
                  </span>
                </div>

                <div className="flex justify-end items-center gap-2 pt-0.5 text-right">
                  <div className="flex flex-col text-[6.5px] font-bold text-white/80 leading-tight">
                    <span>SECURITY</span>
                    <span>CODE</span>
                  </div>
                  <span className="font-mono font-bold text-xs tracking-wider text-white">
                    {cvv}
                  </span>
                </div>
              </div>

              {/* CARD HOLDER NAME */}
              <div className="text-right pr-1 mb-2">
                <div className="font-sans font-extrabold text-sm sm:text-base tracking-wider text-white uppercase drop-shadow-md">
                  {holderName}
                </div>
              </div>

              {/* BOTTOM ROW: SILVER CHIP & SHAR-E LOGO */}
              <div className="flex justify-between items-end">
                {/* Silver EMV Chip */}
                <div className="card-chip silver shrink-0 mb-1">
                  <div className="chip-line"></div>
                  <div className="chip-line"></div>
                  <div className="chip-line"></div>
                </div>

                {/* Shar-E Logo */}
                <div className="flex flex-col items-end text-right">
                  <div className="flex items-center gap-0.5">
                    <span className="font-serif italic text-lg text-purple-200">Shar-</span>
                    <span className="font-bold text-lg text-[#72C130] font-sans">e</span>
                  </div>
                  <span className="text-[7.5px] font-extrabold tracking-widest text-white/90 uppercase font-sans">
                    CLASSIC DEBIT
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
              Amplop Digital Bank Muamalat Shar-E Debit. Terima kasih atas doa restu dan tanda kasih yang Anda berikan.
            </p>
            <div className="hologram-strip">
              <span className="hologram-seal">GENUINE MUAMALAT</span>
            </div>
          </div>
        </div>
      </Tilt>

      {/* Action Controls */}
      <div className="flex items-center justify-center gap-2 mt-3 w-full max-w-[220px] mx-auto">
        {onCopy && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCopy(cleanAccountNumber, "No. Rekening Bank Muamalat");
            }}
            className="flex-1 py-2.5 px-3 rounded-xl bg-[#6C2B8E] text-white hover:bg-[#521C72] transition-all text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md cursor-pointer active:scale-95"
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
          className="py-2.5 px-3 rounded-xl bg-white border border-[#D8C7B2] text-[#6C2B8E] hover:bg-[#FAF7F2] transition-all text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
          title="Putar Kartu Muamalat"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#6C2B8E]" />
          <span>Putar</span>
        </button>
      </div>
    </div>
  );
};

export default CardMuamalat;
