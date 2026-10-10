import React, { useState } from "react";
import { ArrowLeft, CreditCard, Sparkles, Check } from "lucide-react";
import { CardBsi } from "./bsi";
import { CardBni } from "./Bni";
import { CardNeo } from "./neo";
import { CardMuamalat } from "./muamalat";
import { CardNagari } from "./nagari";
import { CardBtn } from "./btn";
import { CardBtnGold } from "./btn-gold";
import { CardBtnPremium } from "./btn-premium";
import { CardCimbNiaga } from "./cmniaga";
import { CardDanamon } from "./danamon";
import { CardPermata } from "./permata";
import { CardMega } from "./mega";
import { CardOcbc } from "./ocbc";
import { CardSinarmas } from "./sinarmas";
import { CardMaybank } from "./maybank";
import { CardBtpn } from "./bptn";
import { CardBukopin } from "./bukopin";
import { CardChartered } from "./carthered";
import { CardBca } from "./Bca";
import { CardMandiri } from "./Mandiri";
import { AtmCard } from "./AtmCard";

interface CardAtmPreviewPageProps {
  onBack: () => void;
}

export const CardAtmPreviewPage: React.FC<CardAtmPreviewPageProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<"all" | "chartered" | "bukopin" | "bptn" | "maybank" | "sinarmas" | "ocbc" | "mega" | "permata" | "danamon" | "cmniaga" | "btn-premium" | "btn-gold" | "btn" | "nagari" | "muamalat" | "neo" | "bsi" | "bni" | "bca" | "mandiri" | "custom">("all");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setToastMessage(`${label} (${text}) berhasil disalin!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-16 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-[100] bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <Check className="w-4 h-4 text-white" />
          </div>
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 hover:text-white transition-all text-xs font-semibold cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Kembali ke Platform</span>
          </button>

          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <CreditCard className="w-5 h-5" />
            </div>
            <h1 className="text-base sm:text-lg font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Preview Kartu ATM 3D
            </h1>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>3D Interactive</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        {/* Banner Section */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            Desain Kartu Digital Parallax & 3D Tilt
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Gerakkan kursor atau sentuh kartu untuk melihat efek 3D tilt & glare. Klik kartu atau tombol <span className="text-slate-200 font-semibold">"Putar"</span> untuk melihat bagian belakang kartu amplop digital.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex justify-center items-center gap-2 mb-10 flex-wrap">
          {[
            { id: "all", label: "Semua Kartu" },
            { id: "chartered", label: "Standard Chartered" },
            { id: "bukopin", label: "Bank Bukopin" },
            { id: "bptn", label: "BTPN Sinaya" },
            { id: "maybank", label: "Maybank U" },
            { id: "sinarmas", label: "Bank Sinarmas" },
            { id: "ocbc", label: "OCBC Bank" },
            { id: "mega", label: "Bank Mega" },
            { id: "permata", label: "PermataBank" },
            { id: "danamon", label: "Bank Danamon" },
            { id: "cmniaga", label: "CIMB Niaga" },
            { id: "btn-premium", label: "BTN VISA Platinum" },
            { id: "btn-gold", label: "BTN VISA Gold" },
            { id: "btn", label: "BTN VISA Classic" },
            { id: "nagari", label: "Bank Nagari" },
            { id: "muamalat", label: "Bank Muamalat" },
            { id: "neo", label: "KoinWorks NEO" },
            { id: "bsi", label: "BSI Gold" },
            { id: "bni", label: "BNI Batik" },
            { id: "bca", label: "BCA" },
            { id: "mandiri", label: "Mandiri" },
            { id: "custom", label: "Custom Form" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20"
                  : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Cards Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {/* STANDARD CHARTERED CARD */}
          {(activeTab === "all" || activeTab === "chartered") && (
            <div className="bg-slate-900/60 rounded-3xl border border-slate-800/80 p-6 flex flex-col items-center backdrop-blur-xs hover:border-blue-500/30 transition-all shadow-xl">
              <div className="flex items-center justify-between w-full mb-4 px-2">
                <span className="text-xs font-bold tracking-wider text-blue-400 uppercase">
                  Standard Chartered
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
                  Premium Debit
                </span>
              </div>
              <CardChartered
                accountNumber="5399 2719 9999 9999"
                holderName="BAMBANG IRAWAN"
                expiry="10/30"
                refCode="5399"
                onCopy={handleCopy}
              />
            </div>
          )}

          {/* BANK BUKOPIN CARD */}
          {(activeTab === "all" || activeTab === "bukopin") && (
            <div className="bg-slate-900/60 rounded-3xl border border-slate-800/80 p-6 flex flex-col items-center backdrop-blur-xs hover:border-blue-500/30 transition-all shadow-xl">
              <div className="flex items-center justify-between w-full mb-4 px-2">
                <span className="text-xs font-bold tracking-wider text-blue-400 uppercase">
                  Bank Bukopin
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
                  GPN Debit
                </span>
              </div>
              <CardBukopin
                accountNumber="6013 7890 4603 5589"
                holderName="Guniswan Putra"
                expiry="06/24"
                refCode="6013"
                onCopy={handleCopy}
              />
            </div>
          )}

          {/* BANK BTPN SINAYA CARD */}
          {(activeTab === "all" || activeTab === "bptn") && (
            <div className="bg-slate-900/60 rounded-3xl border border-slate-800/80 p-6 flex flex-col items-center backdrop-blur-xs hover:border-amber-500/30 transition-all shadow-xl">
              <div className="flex items-center justify-between w-full mb-4 px-2">
                <span className="text-xs font-bold tracking-wider text-amber-400 uppercase">
                  Bank BTPN
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  Sinaya VISA Debit
                </span>
              </div>
              <CardBtpn
                accountNumber="4000 2261 0060 8899"
                holderName="DEBIT CARDHOLDER"
                expiry="10/28"
                refCode="2261"
                onCopy={handleCopy}
              />
            </div>
          )}

          {/* MAYBANK U CARD (VERTICAL CARD) */}
          {(activeTab === "all" || activeTab === "maybank") && (
            <div className="bg-slate-900/60 rounded-3xl border border-slate-800/80 p-6 flex flex-col items-center backdrop-blur-xs hover:border-teal-500/30 transition-all shadow-xl">
              <div className="flex items-center justify-between w-full mb-4 px-2">
                <span className="text-xs font-bold tracking-wider text-teal-400 uppercase">
                  Maybank
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20">
                  U Debit (Vertical)
                </span>
              </div>
              <CardMaybank
                accountNumber="5241 8900 1234 5678"
                holderName="DEBIT CARDHOLDER"
                expiry="10/28"
                onCopy={handleCopy}
              />
            </div>
          )}

          {/* BANK SINARMAS CARD */}
          {(activeTab === "all" || activeTab === "sinarmas") && (
            <div className="bg-slate-900/60 rounded-3xl border border-slate-800/80 p-6 flex flex-col items-center backdrop-blur-xs hover:border-rose-500/30 transition-all shadow-xl">
              <div className="flex items-center justify-between w-full mb-4 px-2">
                <span className="text-xs font-bold tracking-wider text-rose-400 uppercase">
                  Bank Sinarmas
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20">
                  GPN Debit
                </span>
              </div>
              <CardSinarmas
                accountNumber="6396 8700 0000 0000"
                holderName="DEBIT CARD"
                expiry="06/28"
                refCode="6396 87"
                onCopy={handleCopy}
              />
            </div>
          )}

          {/* OCBC BANK CARD */}
          {(activeTab === "all" || activeTab === "ocbc") && (
            <div className="bg-slate-900/60 rounded-3xl border border-slate-800/80 p-6 flex flex-col items-center backdrop-blur-xs hover:border-red-500/30 transition-all shadow-xl">
              <div className="flex items-center justify-between w-full mb-4 px-2">
                <span className="text-xs font-bold tracking-wider text-rose-400 uppercase">
                  OCBC Bank
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20">
                  Mastercard Debit
                </span>
              </div>
              <CardOcbc
                accountNumber="5379 4000 0000 0000"
                holderName="DEBIT CARDHOLDER"
                expiry="06/28"
                refCode="5379"
                onCopy={handleCopy}
              />
            </div>
          )}

          {/* BANK MEGA CARD */}
          {(activeTab === "all" || activeTab === "mega") && (
            <div className="bg-slate-900/60 rounded-3xl border border-slate-800/80 p-6 flex flex-col items-center backdrop-blur-xs hover:border-amber-500/30 transition-all shadow-xl">
              <div className="flex items-center justify-between w-full mb-4 px-2">
                <span className="text-xs font-bold tracking-wider text-amber-400 uppercase">
                  Bank Mega
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  VISA Debit Gold
                </span>
              </div>
              <CardMega
                accountNumber="4312 2678 9012 3456"
                holderName="ADI PRATAMA"
                expiry="12/26"
                memberSince="21"
                onCopy={handleCopy}
              />
            </div>
          )}

          {/* PERMATABANK CARD */}
          {(activeTab === "all" || activeTab === "permata") && (
            <div className="bg-slate-900/60 rounded-3xl border border-slate-800/80 p-6 flex flex-col items-center backdrop-blur-xs hover:border-emerald-500/30 transition-all shadow-xl">
              <div className="flex items-center justify-between w-full mb-4 px-2">
                <span className="text-xs font-bold tracking-wider text-emerald-400 uppercase">
                  PermataBank
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  VISA Debit
                </span>
              </div>
              <CardPermata
                accountNumber="4000 1234 5678 9010"
                holderName="ELECTRONIC USE ONLY"
                expiry="02/28"
                refCode="4640"
                onCopy={handleCopy}
              />
            </div>
          )}

          {/* BANK DANAMON WORLD BUSINESS CARD */}
          {(activeTab === "all" || activeTab === "danamon") && (
            <div className="bg-slate-900/60 rounded-3xl border border-slate-800/80 p-6 flex flex-col items-center backdrop-blur-xs hover:border-amber-500/30 transition-all shadow-xl">
              <div className="flex items-center justify-between w-full mb-4 px-2">
                <span className="text-xs font-bold tracking-wider text-amber-400 uppercase">
                  Bank Danamon
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  World Business
                </span>
              </div>
              <CardDanamon
                accountNumber="1234 5678 9012 3456"
                holderName="KEN ARTA"
                expiry="12/28"
                refCode="5592"
                onCopy={handleCopy}
              />
            </div>
          )}

          {/* CIMB NIAGA CARD */}
          {(activeTab === "all" || activeTab === "cmniaga") && (
            <div className="bg-slate-900/60 rounded-3xl border border-slate-800/80 p-6 flex flex-col items-center backdrop-blur-xs hover:border-red-500/30 transition-all shadow-xl">
              <div className="flex items-center justify-between w-full mb-4 px-2">
                <span className="text-xs font-bold tracking-wider text-rose-400 uppercase">
                  CIMB Niaga
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20">
                  Mastercard Debit
                </span>
              </div>
              <CardCimbNiaga
                accountNumber="5576 9201 2345 6789"
                holderName="HARYANTO WIBOWO"
                expiry="12/28"
                refCode="H123456"
                onCopy={handleCopy}
              />
            </div>
          )}

          {/* BANK BTN PLATINUM (VERTICAL CARD) */}
          {(activeTab === "all" || activeTab === "btn-premium") && (
            <div className="bg-slate-900/60 rounded-3xl border border-slate-800/80 p-6 flex flex-col items-center backdrop-blur-xs hover:border-sky-500/30 transition-all shadow-xl">
              <div className="flex items-center justify-between w-full mb-4 px-2">
                <span className="text-xs font-bold tracking-wider text-sky-400 uppercase">
                  Bank BTN
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/20">
                  VISA Platinum (Vertical)
                </span>
              </div>
              <CardBtnPremium
                accountNumber="4381 9028 9911 0044"
                holderName="PUTRA BATARA"
                expiry="12/28"
                onCopy={handleCopy}
              />
            </div>
          )}

          {/* BANK BTN GOLD (VERTICAL CARD) */}
          {(activeTab === "all" || activeTab === "btn-gold") && (
            <div className="bg-slate-900/60 rounded-3xl border border-slate-800/80 p-6 flex flex-col items-center backdrop-blur-xs hover:border-amber-500/30 transition-all shadow-xl">
              <div className="flex items-center justify-between w-full mb-4 px-2">
                <span className="text-xs font-bold tracking-wider text-amber-400 uppercase">
                  Bank BTN
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  VISA Gold (Vertical)
                </span>
              </div>
              <CardBtnGold
                accountNumber="4381 9028 8899 7722"
                holderName="PUTRA BATARA"
                expiry="12/28"
                onCopy={handleCopy}
              />
            </div>
          )}

          {/* BANK BTN CLASSIC (VERTICAL CARD) */}
          {(activeTab === "all" || activeTab === "btn") && (
            <div className="bg-slate-900/60 rounded-3xl border border-slate-800/80 p-6 flex flex-col items-center backdrop-blur-xs hover:border-red-500/30 transition-all shadow-xl">
              <div className="flex items-center justify-between w-full mb-4 px-2">
                <span className="text-xs font-bold tracking-wider text-red-400 uppercase">
                  Bank BTN
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/10 text-red-300 border border-red-500/20">
                  VISA Classic (Vertical)
                </span>
              </div>
              <CardBtn
                accountNumber="4381 9028 1742 8899"
                holderName="PUTRA BATARA"
                expiry="12/28"
                onCopy={handleCopy}
              />
            </div>
          )}

          {/* BANK NAGARI CARD */}
          {(activeTab === "all" || activeTab === "nagari") && (
            <div className="bg-slate-900/60 rounded-3xl border border-slate-800/80 p-6 flex flex-col items-center backdrop-blur-xs hover:border-blue-500/30 transition-all shadow-xl">
              <div className="flex items-center justify-between w-full mb-4 px-2">
                <span className="text-xs font-bold tracking-wider text-blue-400 uppercase">
                  Bank Nagari
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
                  Debit Songket
                </span>
              </div>
              <CardNagari
                accountNumber="5364 9701 9999 9999"
                holderName="CARD HOLDER NAME"
                expiry="10/22"
                memberSince="10/19"
                onCopy={handleCopy}
              />
            </div>
          )}

          {/* BANK MUAMALAT (VERTICAL CARD) */}
          {(activeTab === "all" || activeTab === "muamalat") && (
            <div className="bg-slate-900/60 rounded-3xl border border-slate-800/80 p-6 flex flex-col items-center backdrop-blur-xs hover:border-purple-500/30 transition-all shadow-xl">
              <div className="flex items-center justify-between w-full mb-4 px-2">
                <span className="text-xs font-bold tracking-wider text-purple-400 uppercase">
                  Bank Muamalat
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                  Shar-E Classic (Vertical)
                </span>
              </div>
              <CardMuamalat
                accountNumber="4988 6400 1234 5678"
                holderName="ADHI PRATAMA"
                expiry="12/28"
                cvv="387"
                onCopy={handleCopy}
              />
            </div>
          )}

          {/* KOINWORKS NEO CARD */}
          {(activeTab === "all" || activeTab === "neo") && (
            <div className="bg-slate-900/60 rounded-3xl border border-slate-800/80 p-6 flex flex-col items-center backdrop-blur-xs hover:border-red-500/30 transition-all shadow-xl">
              <div className="flex items-center justify-between w-full mb-4 px-2">
                <span className="text-xs font-bold tracking-wider text-red-400 uppercase">
                  KoinWorks NEO
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/10 text-red-300 border border-red-500/20">
                  Digital Card
                </span>
              </div>
              <CardNeo
                accountNumber="9876 4321 2733 1932"
                holderName="LUNA RIA"
                expiry="10/26"
                onCopy={handleCopy}
              />
            </div>
          )}

          {/* BSI CARD */}
          {(activeTab === "all" || activeTab === "bsi") && (
            <div className="bg-slate-900/60 rounded-3xl border border-slate-800/80 p-6 flex flex-col items-center backdrop-blur-xs hover:border-teal-500/30 transition-all shadow-xl">
              <div className="flex items-center justify-between w-full mb-4 px-2">
                <span className="text-xs font-bold tracking-wider text-teal-400 uppercase">
                  Bank Syariah Indonesia
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20">
                  Gold Debit
                </span>
              </div>
              <CardBsi
                accountNumber="6034 9400 0000 0000"
                holderName="CARD HOLDER NAME"
                expiry="12/24"
                onCopy={handleCopy}
              />
            </div>
          )}

          {/* BNI CARD */}
          {(activeTab === "all" || activeTab === "bni") && (
            <div className="bg-slate-900/60 rounded-3xl border border-slate-800/80 p-6 flex flex-col items-center backdrop-blur-xs hover:border-orange-500/30 transition-all shadow-xl">
              <div className="flex items-center justify-between w-full mb-4 px-2">
                <span className="text-xs font-bold tracking-wider text-orange-400 uppercase">
                  Bank Negara Indonesia
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-300 border border-orange-500/20">
                  Debit Batik
                </span>
              </div>
              <CardBni
                accountNumber="5371 7600 0012 3456"
                holderName="PUTRA NAGARA"
                expiry="12/22"
                memberSince="17"
                onCopy={handleCopy}
              />
            </div>
          )}

          {/* BCA CARD */}
          {(activeTab === "all" || activeTab === "bca") && (
            <div className="bg-slate-900/60 rounded-3xl border border-slate-800/80 p-6 flex flex-col items-center backdrop-blur-xs hover:border-blue-500/30 transition-all shadow-xl">
              <div className="flex items-center justify-between w-full mb-4 px-2">
                <span className="text-xs font-bold tracking-wider text-blue-400 uppercase">
                  Bank Central Asia
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
                  Paspor BCA
                </span>
              </div>
              <CardBca
                accountNumber="8730 4912 3000"
                holderName="ANDI IRAWAN"
                expiry="12/28"
                onCopy={handleCopy}
              />
            </div>
          )}

          {/* MANDIRI CARD */}
          {(activeTab === "all" || activeTab === "mandiri") && (
            <div className="bg-slate-900/60 rounded-3xl border border-slate-800/80 p-6 flex flex-col items-center backdrop-blur-xs hover:border-amber-500/30 transition-all shadow-xl">
              <div className="flex items-center justify-between w-full mb-4 px-2">
                <span className="text-xs font-bold tracking-wider text-amber-400 uppercase">
                  Bank Mandiri
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  Gold Card
                </span>
              </div>
              <CardMandiri
                accountNumber="1370 0192 8491 2"
                holderName="ROSNA LINNY"
                expiry="12/28"
                onCopy={handleCopy}
              />
            </div>
          )}
        </div>

        {/* CUSTOM INTERACTIVE CARD SECTION */}
        {(activeTab === "all" || activeTab === "custom") && (
          <div className="mt-12 bg-slate-900/80 rounded-3xl border border-slate-800 p-6 sm:p-8 max-w-2xl mx-auto shadow-2xl">
            <div className="text-center mb-6">
              <h3 className="text-lg font-bold text-white mb-1">
                Kustomisasi Kartu ATM (Interactive Form)
              </h3>
              <p className="text-xs text-slate-400">
                Ubah nama, nomor kartu, dan tanggal secara real-time.
              </p>
            </div>
            <AtmCard
              accountNumber="5576 9201 2345 6789"
              holderName="NAMA ANDA"
              bankName="CIMB NIAGA"
              cardTheme="cmniaga"
              showForm={true}
              onCopy={handleCopy}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default CardAtmPreviewPage;
