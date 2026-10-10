import React, { useState } from "react";
import Tilt from "react-parallax-tilt";
import { Copy, RefreshCw } from "lucide-react";
import "./AtmCard3D.css";

export interface AtmCardProps {
  accountNumber: string;
  holderName: string;
  bankName: string;
  expiry?: string;
  cvv?: string;
  cardTheme?: "bca" | "mandiri" | "bsi" | "bni" | "neo" | "muamalat" | "nagari" | "btn" | "btn-gold" | "btn-premium" | "cmniaga" | "danamon" | "permata" | "mega" | "ocbc" | "sinarmas" | "maybank" | "bptn" | "bukopin" | "chartered" | "default";
  onCopy?: (text: string, label: string) => void;
  showForm?: boolean;
}

export const AtmCard: React.FC<AtmCardProps> = ({
  accountNumber,
  holderName,
  bankName,
  expiry = "12/28",
  cvv = "892",
  cardTheme = "default",
  onCopy,
  showForm = false,
}) => {
  const [cardNumber, setCardNumber] = useState(accountNumber);
  const [cardHolder, setCardHolder] = useState(holderName);
  const [cardExpiry, setCardExpiry] = useState(expiry);
  const [cardCvv, setCardCvv] = useState(cvv);
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const getThemeClass = () => {
    if (cardTheme === "bca") return "bca-theme";
    if (cardTheme === "mandiri") return "mandiri-theme";
    if (cardTheme === "bsi") return "bsi-theme";
    if (cardTheme === "bni") return "bni-theme";
    if (cardTheme === "neo") return "neo-theme";
    if (cardTheme === "muamalat") return "muamalat-theme";
    if (cardTheme === "nagari") return "nagari-theme";
    if (cardTheme === "btn") return "btn-theme";
    if (cardTheme === "btn-gold") return "btn-gold-theme";
    if (cardTheme === "btn-premium") return "btn-premium-theme";
    if (cardTheme === "cmniaga") return "cimb-theme";
    if (cardTheme === "danamon") return "danamon-theme";
    if (cardTheme === "permata") return "permata-theme";
    if (cardTheme === "mega") return "mega-theme";
    if (cardTheme === "ocbc") return "ocbc-theme";
    if (cardTheme === "sinarmas") return "sinarmas-theme";
    if (cardTheme === "maybank") return "maybank-theme";
    if (cardTheme === "bptn") return "btpn-theme";
    if (cardTheme === "bukopin") return "bukopin-theme";
    if (cardTheme === "chartered") return "chartered-theme";
    return "";
  };

  return (
    <div className="card-container text-center">
      {/* 3D Parallax Tilt Card */}
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
          {/* SISI DEPAN (FRONT) */}
          <div className={`card-face card-front ${getThemeClass()}`}>
            <div className="card-top">
              <span className="bank-name">{bankName}</span>
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

            {/* Nomor Kartu */}
            <div className="card-number">{cardNumber || "•••• •••• •••• ••••"}</div>

            {/* Informasi Pemilik & Expired */}
            <div className="card-bottom">
              <div className="text-left">
                <div className="card-label">CARD HOLDER</div>
                <div className="card-value">{cardHolder || "YOUR NAME"}</div>
              </div>
              <div className="text-left">
                <div className="card-label">EXPIRES</div>
                <div className="card-value">{cardExpiry || "MM/YY"}</div>
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
              <div className="cvv-box">{cardCvv || "•••"}</div>
            </div>
            <p className="card-disclaimer">
              Amplop Digital {bankName}. Terima kasih atas doa restu dan tanda kasih yang Anda berikan.
            </p>
            <div className="hologram-strip">
              <span className="hologram-seal">GENUINE</span>
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
              onCopy(cardNumber.replace(/\s+/g, ""), `No. Rekening ${bankName}`);
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
          title="Putar Kartu"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#8B263E]" />
          <span>Putar</span>
        </button>
      </div>

      {showForm && (
        <div className="card-form mt-4">
          <div className="form-group">
            <label>Nomor Kartu</label>
            <input
              type="text"
              maxLength={19}
              value={cardNumber}
              placeholder="5412 7534 8901 2345"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCardNumber(e.target.value)}
              onFocus={() => setIsFlipped(false)}
            />
          </div>
          <div className="form-group">
            <label>Nama Pemegang</label>
            <input
              type="text"
              value={cardHolder}
              placeholder="NAMA LENGKAP"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCardHolder(e.target.value.toUpperCase())}
              onFocus={() => setIsFlipped(false)}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Masa Berlaku</label>
              <input
                type="text"
                maxLength={5}
                value={cardExpiry}
                placeholder="MM/YY"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCardExpiry(e.target.value)}
                onFocus={() => setIsFlipped(false)}
              />
            </div>
            <div className="form-group">
              <label>CVV</label>
              <input
                type="text"
                maxLength={3}
                value={cardCvv}
                placeholder="123"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCardCvv(e.target.value)}
                onFocus={() => setIsFlipped(true)}
                onBlur={() => setIsFlipped(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AtmCard;