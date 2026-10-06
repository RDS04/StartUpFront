import React, { useState } from "react";
import Tilt from "react-parallax-tilt";
import { Copy, RefreshCw } from "lucide-react";
import "./AtmCard3D.css";

export interface CardMandiriProps {
  accountNumber?: string;
  holderName?: string;
  expiry?: string;
  cvv?: string;
  onCopy?: (text: string, label: string) => void;
}

export const CardMandiri: React.FC<CardMandiriProps> = ({
  accountNumber = "1370 0192 8491 2",
  holderName = "ROSNA LINNY",
  expiry = "12/28",
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
      {/* 3D Parallax Tilt Card for Mandiri */}
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
          {/* SISI DEPAN (FRONT) - MANDIRI THEME */}
          <div className="card-face card-front mandiri-theme">
            <div className="card-top">
              <span className="bank-name">BANK MANDIRI</span>
              <span className="contactless-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8.5 16.5a5 5 0 0 1 0-7" />
                  <path d="M12 19a8.5 8.5 0 0 0 0-14" />
                  <path d="M15.5 21.5a12 12 0 0 0 0-21" />
                </svg>
              </span>
            </div>

            {/* Chip Logam EMV */}
            <div className="card-chip">
              <div className="chip-line"></div>
              <div className="chip-line"></div>
              <div className="chip-line"></div>
            </div>

            {/* Nomor Rekening / Kartu */}
            <div className="card-number">{accountNumber}</div>

            {/* Informasi Pemilik & Expired */}
            <div className="card-bottom">
              <div className="text-left">
                <div className="card-label">CARD HOLDER</div>
                <div className="card-value">{holderName}</div>
              </div>
              <div className="text-left">
                <div className="card-label">EXPIRES</div>
                <div className="card-value">{expiry}</div>
              </div>
              {/* Logo Mastercard */}
              <div className="card-network-logo">
                <div className="circle red"></div>
                <div className="circle orange"></div>
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
              Amplop Digital Bank Mandiri. Terima kasih atas doa restu dan tanda kasih yang Anda berikan.
            </p>
            <div className="hologram-strip">
              <span className="hologram-seal">GENUINE MANDIRI</span>
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
              onCopy(cleanAccountNumber, "No. Rekening Bank Mandiri");
            }}
            className="flex-1 py-2.5 px-4 rounded-xl bg-[#8B263E] text-white hover:bg-[#6F1D30] transition-all text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md cursor-pointer active:scale-95"
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
          className="py-2.5 px-3 rounded-xl bg-white border border-[#D8C7B2] text-[#58111A] hover:bg-[#FAF7F2] transition-all text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
          title="Putar Kartu Mandiri"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#8B263E]" />
          <span>Putar</span>
        </button>
      </div>
    </div>
  );
};

export default CardMandiri;