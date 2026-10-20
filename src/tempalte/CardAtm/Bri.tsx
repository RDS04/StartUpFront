import React, { useState } from "react";
import Tilt from "react-parallax-tilt";
import { Copy, RefreshCw } from "lucide-react";
import "./AtmCard3D.css";

export interface CardBriProps {
  accountNumber?: string;
  holderName?: string;
  expiry?: string;
  cvv?: string;
  onCopy?: (text: string, label: string) => void;
}

export const CardBri: React.FC<CardBriProps> = ({
  accountNumber = "0012 0109 8821 501",
  holderName = "YANTI S.PD",
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
      {/* 3D Parallax Tilt Card for Bank BRI */}
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
          {/* SISI DEPAN (FRONT) - BRI BRITAMA THEME */}
          <div className="card-face card-front bri-theme relative overflow-hidden">
            {/* Authentic BRI Curved Wave Overlay */}
            <svg
              className="absolute -right-6 top-0 w-3/4 h-full opacity-20 pointer-events-none z-0"
              viewBox="0 0 160 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M40 0 C70 40, 110 80, 160 120"
                stroke="#60A5FA"
                strokeWidth="24"
                strokeLinecap="round"
              />
              <path
                d="M70 0 C100 40, 135 75, 175 110"
                stroke="#F97316"
                strokeWidth="10"
                strokeLinecap="round"
              />
            </svg>

            <div className="card-top relative z-10">
              <div className="flex items-center gap-2">
                <span className="bank-name font-bold tracking-wider">BANK BRI</span>
                <span className="text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-200 border border-blue-400/30 font-semibold">
                  BritAma
                </span>
              </div>
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
              Amplop Digital Bank Rakyat Indonesia (BRI). Terima kasih atas doa restu dan tanda kasih yang Anda berikan.
            </p>
            <div className="hologram-strip">
              <span className="hologram-seal">GENUINE BRI</span>
            </div>
          </div>
        </div>
      </Tilt>

      {/* Button Salin Rekening & Flip Hint */}
      <div className="card-actions mt-3 flex justify-center gap-2">
        <button
          type="button"
          onClick={() => onCopy && onCopy(cleanAccountNumber, "Nomor Rekening Bank BRI")}
          className="btn-copy cursor-pointer"
        >
          <Copy className="h-4 w-4" />
          <span>Salin Rekening</span>
        </button>
        <button
          type="button"
          onClick={toggleFlip}
          className="btn-flip cursor-pointer"
        >
          <RefreshCw className="h-4 w-4" />
          <span>{isFlipped ? "Depan" : "Putar"}</span>
        </button>
      </div>
    </div>
  );
};
export default CardBri;
