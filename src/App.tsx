/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  GraduationCap, Sparkles, BookOpen, Layers, CheckCircle2, AlertCircle, 
  History, Trash2, Send, Plus, ArrowRight, Loader2, HelpCircle, BookMarked,
  Smartphone, Terminal, Settings as SettingsIcon, Code, Activity
} from "lucide-react";
import Header from "./components/Header";
import PreviewSection from "./components/PreviewSection";
import DiktiGuideModal from "./components/DiktiGuideModal";
import MethodologyExplorerModal from "./components/MethodologyExplorerModal";
import { 
  AcademicData, LIST_JURUSAN, LIST_METODE, PRESETS_TEMA, PresesTema 
} from "./types";

interface SavedDraft {
  id: string;
  timestamp: string;
  tema: string;
  jurusan: string;
  metode: string;
  data: AcademicData;
}

interface AppError {
  message: string;
  detail?: string;
  suggestion?: string;
  type?: "validation" | "server" | "api_key" | "quota" | "network" | "unknown";
}

export default function App() {
  // Input states
  const [tema, setTema] = useState("");
  const [jurusan, setJurusan] = useState(LIST_JURUSAN[0]);
  const [customJurusan, setCustomJurusan] = useState("");
  const [metode, setMetode] = useState(LIST_METODE[0].id);

  // Splash intro animation states
  const [showSplash, setShowSplash] = useState(true);
  const [splashProgress, setSplashProgress] = useState(0);
  const [splashText, setSplashText] = useState("Menyiapkan Ruang Rancang Akademik...");

  // Modal display states
  const [isDiktiOpen, setIsDiktiOpen] = useState(false);
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);

  // Status states
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<AppError | null>(null);
  const [showErrorDetail, setShowErrorDetail] = useState(false);

  // Result and persistence
  const [currentResult, setCurrentResult] = useState<AcademicData | null>(null);
  const [historyDrafts, setHistoryDrafts] = useState<SavedDraft[]>([]);
  const [selectedHistoryId, setSelectedHistoryId] = useState<string | null>(null);
  const [isZenMode, setIsZenMode] = useState(false);

  // Loading indicator helper cycles
  const loadingMessages = [
    "Menganalisis urgensi riset & menyusun formulasi Judul sesuai KBBI/EYD...",
    "Menyusun BAB I: PENDAHULUAN (Latar Belakang, Identifikasi & Batasan)...",
    "Mensintesis BAB II: TINJAUAN PUSTAKA (Landasan Teori & Riset Empiris)...",
    "Merancang BAB III: METODOLOGI PENELITIAN (Prosedur & Teknik Analisis)...",
    "Mengonstruksi BAB IV: ANALISIS & PEMBAHASAN (Pemaparan Hasil Temuan)...",
    "Merumuskan BAB V: KESIMPULAN & SARAN (Poin Jawaban & Saran Taktis)...",
    "Meresolusi visualisasi Flowchart Metodologis & Panduan Sukses Sidang..."
  ];

  // Splash Screen progress timer
  useEffect(() => {
    const textSteps = [
      "Mengonfigurasi Aturan DIKTI 2026...",
      "Menghidupkan Mesin Sintesis Algoritma...",
      "Mengoptimalkan Kecepatan Draf Pola Deduktif...",
      "Sistem Siap! Membuka Portal Skripsi..."
    ];
    let stepIdx = 0;
    const progressInterval = setInterval(() => {
      setSplashProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        const nextVal = prev + Math.floor(Math.random() * 8) + 4;
        if (nextVal >= 25 && stepIdx === 0) { setSplashText(textSteps[0]); stepIdx++; }
        if (nextVal >= 55 && stepIdx === 1) { setSplashText(textSteps[1]); stepIdx++; }
        if (nextVal >= 80 && stepIdx === 2) { setSplashText(textSteps[2]); stepIdx++; }
        if (nextVal >= 95 && stepIdx === 3) { setSplashText(textSteps[3]); stepIdx++; }
        return Math.min(100, nextVal);
      });
    }, 100);

    const splashTimeout = setTimeout(() => {
      setShowSplash(false);
    }, 3200);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(splashTimeout);
    };
  }, []);

  // Load history on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("skripsi_generator_drafts");
      if (saved) {
        setHistoryDrafts(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Gagal membaca riwayat lokal", e);
    }
  }, []);

  // Sync loading step interval
  useEffect(() => {
    let interval: any;
    if (isLoading) {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev < loadingMessages.length - 1 ? prev + 1 : prev));
      }, 3500);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  // Apply a preset
  const handleApplyPreset = (preset: PresesTema) => {
    setTema(preset.judul);
    setJurusan(preset.jurusan);
    setCustomJurusan("");
    setMetode(preset.metode);
    setError(null);
    setShowErrorDetail(false);
  };

  // Submit generator
  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const selectedJurusan = jurusan === "Lainnya" ? customJurusan.trim() : jurusan;
    if (!tema.trim()) {
      setError({ message: "Tema atau draf judul skripsi wajib diisi.", type: "validation" });
      setShowErrorDetail(false);
      return;
    }
    if (jurusan === "Lainnya" && !customJurusan.trim()) {
      setError({ message: "Silakan ketik nama jurusan kustom Anda.", type: "validation" });
      setShowErrorDetail(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    setShowErrorDetail(false);
    setCurrentResult(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tema: tema.trim(),
          jurusan: selectedJurusan,
          metode: metode
        })
      });

      if (!response.ok) {
        let errorMsg = "Gagal menghubungi server generator skripsi.";
        let errDetail = "";
        let errSuggestion = "Pastikan koneksi internet stabil dan coba sesaat lagi.";
        let errType: "server" | "api_key" | "quota" | "validation" | "unknown" = "server";

        try {
          const errorData = await response.json();
          errorMsg = errorData.error || errorMsg;
          errDetail = typeof errorData === "object" ? JSON.stringify(errorData, null, 2) : String(errorData);
          
          if (errorMsg.includes("GEMINI_API_KEY") || errorMsg.includes("Kunci API")) {
            errType = "api_key";
            errSuggestion = "Atur variabel GEMINI_API_KEY di menu pengaturan (Settings) di kanan atas skrin aplikasi Anda agar model AI dapat berjalan.";
          } else if (response.status === 429 || errorMsg.toLowerCase().includes("quota") || errorMsg.toLowerCase().includes("rate limit") || errorMsg.toLowerCase().includes("resource exhausted")) {
            errType = "quota";
            errSuggestion = "Batas kuota pelayanan API terlampaui. Silakan tunggu 1-2 menit sebelum meluncurkan generasi ulang.";
          }
        } catch (e) {
          try {
            const rawText = await response.text();
            errDetail = rawText.slice(0, 500);
          } catch (_) {
            errDetail = `HTTP status: ${response.status} ${response.statusText}`;
          }
        }

        throw {
          message: errorMsg,
          detail: errDetail,
          suggestion: errSuggestion,
          type: errType
        };
      }

      const generatedData: AcademicData = await response.json();
      setCurrentResult(generatedData);

      // Save to localStorage history
      const newDraft: SavedDraft = {
        id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
        timestamp: new Date().toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        }),
        tema: tema.trim(),
        jurusan: selectedJurusan,
        metode: metode,
        data: generatedData
      };

      const updatedHistory = [newDraft, ...historyDrafts].slice(0, 8); // Keep last 8 drafts
      setHistoryDrafts(updatedHistory);
      localStorage.setItem("skripsi_generator_drafts", JSON.stringify(updatedHistory));
      setSelectedHistoryId(newDraft.id);

    } catch (err: any) {
      console.error(err);
      
      if (err.message && err.detail) {
        setError({
          message: err.message,
          detail: err.detail,
          suggestion: err.suggestion,
          type: err.type
        });
      } else {
        const isNetwork = err instanceof TypeError || String(err).includes("fetch") || !navigator.onLine;
        setError({
          message: isNetwork ? "Gagal melakukan koneksi dengan server" : (err.message || "Terjadi kesalahan sistem yang tidak diketahui"),
          detail: err.stack || String(err),
          suggestion: isNetwork 
            ? "Server backend tidak merespons atau sambungan internet Anda terputus. Silakan periksa koneksi internet Anda." 
            : "Terjadi kesalahan saat memproses data masukan. Silakan periksa kebenaran isian Anda atau muat ulang halaman.",
          type: isNetwork ? "network" : "unknown"
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Select item from history
  const handleLoadHistory = (draft: SavedDraft) => {
    setTema(draft.tema);
    setMetode(draft.metode);
    if (LIST_JURUSAN.includes(draft.jurusan)) {
      setJurusan(draft.jurusan);
      setCustomJurusan("");
    } else {
      setJurusan("Lainnya");
      setCustomJurusan(draft.jurusan);
    }
    setCurrentResult(draft.data);
    setSelectedHistoryId(draft.id);
    setError(null);
    setShowErrorDetail(false);
  };

  // Delete draft from history
  const handleDeleteHistory = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const filtered = historyDrafts.filter(d => d.id !== id);
    setHistoryDrafts(filtered);
    localStorage.setItem("skripsi_generator_drafts", JSON.stringify(filtered));
    if (selectedHistoryId === id) {
      setSelectedHistoryId(null);
      setCurrentResult(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-slate-900 selection:text-white">
      {/* Animated Splash Screen Overlay */}
      {showSplash && (
        <div className="fixed inset-0 bg-slate-950 z-50 flex flex-col items-center justify-center p-6 text-white select-none transition-all duration-500 overflow-hidden">
          {/* Symmetrical glowing orbs in background */}
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>

          <div className="relative max-w-sm w-full flex flex-col items-center text-center space-y-7 z-10 animate-scaleUp">
            {/* Pulsing visual container with the high fidelity SVG Logo inside */}
            <div className="relative shrink-0 w-24 h-24 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center p-1.5 shadow-2xl shadow-indigo-500/20">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 120 120" 
                className="w-20 h-20"
                aria-label="Skripsi Generator Animated Splash Logo"
              >
                <defs>
                  <linearGradient id="splashPageGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#f8fafc" />
                  </linearGradient>
                  <linearGradient id="splashFoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#1d4ed8" />
                  </linearGradient>
                  <linearGradient id="splashStarGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#2563eb" />
                  </linearGradient>
                  <linearGradient id="splashStarGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#0284c7" />
                  </linearGradient>
                </defs>

                {/* Symmetrical cover background wings */}
                <path 
                  d="M 33,45 
                     C 33,42.5 34,41 36.5,41 
                     L 41,41 
                     C 43,41 44.5,42.5 44.5,44.5 
                     L 44.5,69 
                     C 44.5,71.5 46,73.5 48.5,73.5 
                     L 59,73.5 
                     C 59,73.5 60.5,75 60.5,75.5 
                     L 60.5,75.5 
                     C 60.5,75 62,73.5 62,73.5 
                     L 73.5,73.5 
                     C 76,73.5 78.5,71.5 78.5,69 
                     C 78.5,69 79,74 74,77 
                     C 69,79.5 62,84.5 60.5,84.5 
                     C 59,84.5 52,79.5 47,77 
                     C 40,73.5 33,67.5 33,59.5 
                     Z" 
                  fill="#ffffff" 
                  stroke="#ffffff"
                  strokeWidth="0.8"
                />

                {/* Main White document sheet */}
                <path 
                  d="M 44.5,29 C 44.5,27.5 45.5,26.5 47,26.5 L 63.5,26.5 L 72.5,35.5 L 72.5,69 C 72.5,70.5 71.5,71.5 70,71.5 L 47,71.5 C 45.5,71.5 44.5,70.5 44.5,69 Z" 
                  fill="url(#splashPageGradient)" 
                  stroke="#0a1d37" 
                  strokeWidth="1.8" 
                  strokeLinejoin="round"
                />

                {/* Page Fold */}
                <path 
                  d="M 63.5,26.5 L 63.5,35.5 L 72.5,35.5 Z" 
                  fill="url(#splashFoldGradient)" 
                  stroke="#0a1d37" 
                  strokeWidth="1.25" 
                  strokeLinejoin="round"
                />

                {/* Text lines */}
                <line x1="49" y1="35.5" x2="59" y2="35.5" stroke="#0a1d37" strokeWidth="2.2" strokeLinecap="round" />
                <line x1="49" y1="41" x2="65.5" y2="41" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" />
                <line x1="49" y1="46.5" x2="59.5" y2="46.5" stroke="#3b82f6" strokeWidth="2.2" strokeLinecap="round" />

                {/* Symmetrical Fountain Pen Nib */}
                <path 
                  d="M 60.5,45.5 C 61.2,48.5 64,53.5 65.5,58.5 L 60.5,61.5 L 55.5,58.5 C 57,53.5 59.8,48.5 60.5,45.5 Z" 
                  fill="#0a1d37" 
                />

                {/* Dynamic sparkles / stars */}
                <path 
                  d="M 82,13.5 Q 82,21.5 90,21.5 Q 82,21.5 82,29.5 Q 82,21.5 74,21.5 Q 82,21.5 82,13.5 Z" 
                  fill="url(#splashStarGradient1)" 
                />
              </svg>
              {/* Perimeter Ring */}
              <span className="absolute -inset-1 rounded-3xl border border-indigo-400/20"></span>
            </div>

            {/* Typography brand names */}
            <div className="space-y-2 select-none">
              <div className="flex items-center justify-center gap-1.5">
                <span className="text-3xl font-black tracking-tight text-white uppercase font-display">Skripsi</span>
                <span className="text-3xl font-black tracking-wide text-indigo-400 uppercase font-display">Generator</span>
              </div>
              <div className="flex items-center justify-center gap-2 select-none">
                <div className="h-[1px] w-5 bg-white/20"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-400 font-sans">
                  Ide Menjadi Skripsi
                </span>
                <div className="h-[1px] w-5 bg-white/20"></div>
              </div>
            </div>

            {/* Progress indicators and messaging */}
            <div className="w-full max-w-xs space-y-3 pt-3">
              <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden border border-white/5">
                <div 
                  className="h-full bg-indigo-500 rounded-full transition-all duration-150 ease-out"
                  style={{ width: `${splashProgress}%` }}
                ></div>
              </div>
              <div className="space-y-1 select-none">
                <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-slate-300">
                  <span className="inline-block w-2.5 h-2.5 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin"></span>
                  <span>{splashText}</span>
                </div>
                <span className="font-mono text-[10px] font-black text-indigo-400/90 block">
                  {splashProgress}%
                </span>
              </div>
            </div>

            {/* Skip Option */}
            <button
              onClick={() => setShowSplash(false)}
              className="px-4 py-1.5 text-[9px] font-extrabold uppercase tracking-widest text-slate-500 hover:text-white border border-white/5 hover:border-white/15 rounded-full transition-all duration-300 cursor-pointer select-none hover:bg-white/5 hover:-translate-y-0.5"
            >
              Lewati Intro
            </button>
          </div>
        </div>
      )}

      {/* Header component */}
      <Header 
        onShowDiktiModal={() => setIsDiktiOpen(true)}
        onShowMethodologyModal={() => setIsMethodologyOpen(true)}
      />

      {/* Main Grid Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
        {/* Left Side: Parameters Form and History of Outputs (5 Columns) */}
        <div className={`${isZenMode ? "hidden" : "lg:col-span-5"} flex flex-col gap-6 overflow-y-auto transition-all duration-300`}>
          
          {/* Form Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 md:p-6 shadow-sm/5 space-y-5">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3.5">
              <Sparkles className="w-5 h-5 text-slate-800" />
              <div>
                <h2 className="font-bold text-slate-800 text-base">Atur Parameter Skripsi</h2>
                <p className="text-xs text-slate-500">Tentukan jurusan, metode, dan tema riset utama</p>
              </div>
            </div>

            <form onSubmit={handleGenerate} className="space-y-4">
              {/* Program Studi / Jurusan Selection */}
              <div className="space-y-1.5 animate-fadeIn">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide flex justify-between">
                  <span>Jurusan / Program Studi</span>
                  <span className="text-slate-400 font-normal">Wajib isi</span>
                </label>
                <select
                  value={jurusan}
                  onChange={(e) => setJurusan(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 font-medium focus:bg-white focus:border-slate-800 focus:outline-none transition-all cursor-pointer"
                >
                  {LIST_JURUSAN.map((j) => (
                    <option key={j} value={j}>{j}</option>
                  ))}
                  <option value="Lainnya">Lainnya (Ketik Manual)</option>
                </select>

                {jurusan === "Lainnya" && (
                  <input
                    type="text"
                    required
                    maxLength={70}
                    placeholder="Contoh: Teknik Elektro, Sastra Jepang..."
                    value={customJurusan}
                    onChange={(e) => setCustomJurusan(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-800 mt-2 focus:bg-white focus:border-slate-800 focus:outline-none transition-all"
                  />
                )}
              </div>

              {/* Metode Penelitian Card list selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide flex justify-between">
                  <span>Metode Penelitian</span>
                  <span className="text-slate-400 font-normal">Karakteristik Khas</span>
                </label>
                
                <div className="grid grid-cols-1 gap-2.5">
                  {LIST_METODE.map((m) => {
                    const isSelected = metode === m.id;
                    return (
                      <div
                        key={m.id}
                        onClick={() => setMetode(m.id)}
                        className={`border rounded-xl p-3 text-left transition-all cursor-pointer ${
                          isSelected
                            ? "border-slate-900 bg-slate-900 text-white shadow-sm shadow-slate-900/10"
                            : "border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold tracking-tight">{m.nama}</span>
                          <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                            isSelected ? "border-white bg-white" : "border-slate-300"
                          }`}>
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span>}
                          </span>
                        </div>
                        <p className={`text-[10px] mt-1 leading-relaxed ${
                          isSelected ? "text-slate-300" : "text-slate-500"
                        }`}>
                          {m.deskripsi}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Tema / Kerangka Judul */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide flex justify-between">
                  <span>Tema Utama atau Ide Kasar Judul</span>
                  <span className="text-slate-400 font-normal">Min. 5 kata</span>
                </label>
                <textarea
                  value={tema}
                  onChange={(e) => setTema(e.target.value)}
                  placeholder="Ketik topik minat Anda atau draf judul kasar (Contoh: Dampak artificial intelligence bagi produktivitas akuntan milenial)"
                  rows={3}
                  maxLength={250}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:border-slate-800 focus:outline-none transition-all resize-none"
                />
                <p className="text-[10px] text-slate-400 leading-normal">
                  Semakin spesifik tema kasar Anda, semakin presisi AI memformulasikan latar belakang, rumusan masalah, dan alur flowchart.
                </p>
              </div>

              {/* Error Callout */}
              {error && (
                <div className="bg-rose-50/70 border border-rose-100 p-4 rounded-2xl flex flex-col gap-3 mt-2 animate-fadeIn select-all">
                  <div className="flex gap-2.5 items-start">
                    {/* Dynamic Icon Indicator */}
                    {typeof error !== "string" && error.type === "api_key" ? (
                      <div className="p-1.5 bg-amber-105 text-amber-700 bg-amber-100 rounded-lg shrink-0">
                        <SettingsIcon className="w-4.5 h-4.5 animate-pulse" />
                      </div>
                    ) : typeof error !== "string" && error.type === "quota" ? (
                      <div className="p-1.5 bg-orange-105 text-orange-700 bg-orange-100 rounded-lg shrink-0">
                        <Activity className="w-4.5 h-4.5" />
                      </div>
                    ) : (
                      <div className="p-1.5 bg-rose-105 text-rose-700 bg-rose-100 rounded-lg shrink-0">
                        <AlertCircle className="w-4.5 h-4.5" />
                      </div>
                    )}
                    
                    <div className="space-y-1 flex-1 min-w-0">
                      <h4 className="text-[10px] font-bold text-rose-950 uppercase tracking-wider font-display">
                        {typeof error === "string" 
                          ? "Gagal Memproses Data" 
                          : error.type === "api_key" 
                            ? "Kunci API Tidak Ditemukan"
                            : error.type === "quota"
                              ? "Kuota Terlampaui"
                              : error.type === "validation"
                                ? "Kesalahan Validasi"
                                : error.type === "network"
                                  ? "Terputus dari Jaringan"
                                  : "Terjadi Kendala Sistem"}
                      </h4>
                      <p className="text-xs text-rose-900 leading-relaxed font-semibold">
                        {typeof error === "string" ? error : error.message}
                      </p>
                    </div>
                  </div>

                  {/* Fix Suggestion card */}
                  {typeof error !== "string" && error.suggestion && (
                    <div className="bg-white/80 border border-rose-100 p-3 rounded-xl space-y-1 select-all">
                      <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase text-indigo-700 tracking-wider font-display">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Saran Perbaikan / Petunjuk:</span>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed font-medium">
                        {error.suggestion}
                      </p>
                    </div>
                  )}

                  {/* Dev / Technical Detail folding section */}
                  {typeof error !== "string" && error.detail && (
                    <div className="border border-rose-100/60 rounded-xl overflow-hidden bg-white/40">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowErrorDetail(!showErrorDetail);
                        }}
                        className="w-full flex items-center justify-between px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-500 hover:text-slate-800 transition-all bg-rose-50/20 active:bg-rose-50/40 select-none cursor-pointer"
                      >
                        <span className="flex items-center gap-1">
                          <Terminal className="w-3.5 h-3.5 text-slate-400" />
                          Detail Log Sistem {showErrorDetail ? "(Sembunyikan)" : "(Tampilkan)"}
                        </span>
                        <span className="font-mono text-[9px] bg-rose-100/60 text-rose-700 px-1.5 py-0.2 rounded font-extrabold">
                          RAW LOG
                        </span>
                      </button>
                      
                      {showErrorDetail && (
                        <div className="p-3 border-t border-rose-100/40 bg-slate-900 font-mono text-[10px] text-emerald-400 leading-relaxed overflow-x-auto max-h-[140px] whitespace-pre-wrap select-all selection:bg-slate-700">
                          {error.detail}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Action Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-slate-950 hover:bg-slate-900 font-sans text-sm font-bold tracking-tight text-white rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-slate-950/10 disabled:opacity-50 transition-all active:scale-[0.98]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Memproses Struktur...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Uji & Generasi Otomatis</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Quick Idea Presets Loader */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 md:p-6 shadow-sm/5 space-y-4">
            <div>
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                <BookMarked className="w-4.5 h-4.5 text-slate-700" />
                <span>Ide Inspirasi Cepat (Preset)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Klik salah satu contoh untuk memuat parameter secara instan
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {PRESETS_TEMA.map((preset, index) => (
                <div
                  key={index}
                  onClick={() => handleApplyPreset(preset)}
                  className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-100 hover:border-slate-300 rounded-xl transition-all cursor-pointer text-left group"
                >
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-full uppercase">
                      {preset.jurusan}
                    </span>
                    <span className="text-[9px] font-semibold text-slate-400 group-hover:text-slate-800 transition-colors">
                      {preset.metode}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-800 mt-2 line-clamp-1 group-hover:text-slate-950">
                    {preset.judul}
                  </h4>
                  <p className="text-[10px] text-slate-500 mt-1 line-clamp-1">
                    {preset.deskripsi}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Local Persistence & History List */}
          {historyDrafts.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-3xl p-5 md:p-6 shadow-sm/5 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                  <History className="w-4.5 h-4.5 text-slate-700" />
                  <span>Riwayat Draf Anda</span>
                </h3>
                <span className="text-[10px] text-slate-400 font-medium">Batas 8 Penyimpanan</span>
              </div>

              <div className="space-y-2 max-h-56 overflow-y-auto">
                {historyDrafts.map((draft) => {
                  const isSelected = selectedHistoryId === draft.id;
                  return (
                    <div
                      key={draft.id}
                      onClick={() => handleLoadHistory(draft)}
                      className={`flex gap-2.5 items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? "bg-slate-50 border-slate-900 ring-1 ring-slate-900"
                          : "bg-white border-slate-100 hover:bg-slate-50"
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex gap-1.5 items-center">
                          <span className="text-[9px] font-semibold text-slate-400 bg-slate-100 rounded px-1.5 py-0.2 shrink-0">
                            {draft.metode}
                          </span>
                          <span className="text-[9px] text-slate-400 truncate">
                            {draft.timestamp}
                          </span>
                        </div>
                        <h4 className="text-xs font-semibold text-slate-700 truncate mt-1">
                          {draft.tema}
                        </h4>
                      </div>

                      <button
                        onClick={(e) => handleDeleteHistory(draft.id, e)}
                        className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-all cursor-pointer shrink-0"
                        title="Hapus dari riwayat"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}



        </div>

        {/* Right Side: Preview Section (Dynamic Columns) */}
        <div className={`${isZenMode ? "lg:col-span-12" : "lg:col-span-7"} flex flex-col h-full min-h-[450px] transition-all duration-300`}>
          {isLoading ? (
            /* Custom Premium Academic Loading Screen with Dynamic Checklist and Interactive Indicators */
            <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 flex-1 flex flex-col justify-between space-y-6 animate-fadeIn">
              
              {/* Spinning mortarboard and progress percent heading */}
              <div className="flex flex-col items-center justify-center text-center pt-2 space-y-4">
                <div className="relative flex items-center justify-center">
                  {/* Rotating Gradient Ring */}
                  <div className="w-16 h-16 rounded-full border-4 border-slate-100 border-t-indigo-600 border-r-slate-300 animate-spin"></div>
                  {/* Hovering Cap */}
                  <div className="absolute w-10 h-10 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center text-slate-800 shadow-xs animate-pulse">
                    <GraduationCap className="w-5 h-5 text-indigo-600" />
                  </div>
                </div>

                <div className="max-w-md space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full animate-pulse">
                    Proses Generasi AI Aktif
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-lg md:text-xl">
                    Merumuskan Struktur Skripsi
                  </h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed px-4">
                    Mohon tunggu sejenak, kecerdasan buatan akademis sedang merangkai metodologi & draf tulisan Anda:
                    <br />
                    <span className="font-semibold text-slate-800 italic">&ldquo;{loadingMessages[loadingStep]}&rdquo;</span>
                  </p>
                </div>
              </div>

              {/* Dynamic Progress Bar */}
              <div className="w-full max-w-sm mx-auto space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-700">Kemajuan Formulasi</span>
                  <span className="font-mono font-extrabold text-indigo-600 text-sm">
                    {Math.min(99, Math.round(((loadingStep + 1) / loadingMessages.length) * 100))}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                  <div 
                    className="h-full bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-600 transition-all duration-1000 rounded-full"
                    style={{ width: `${Math.min(99, Math.round(((loadingStep + 1) / loadingMessages.length) * 100))}%` }}
                  />
                </div>
              </div>

              {/* Checklist containing steps */}
              <div className="w-full max-w-sm mx-auto bg-slate-50/70 border border-slate-200/60 p-4 md:p-5 rounded-2xl space-y-3 text-left text-xs text-slate-600">
                <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">Tahapan Pengembangan:</h4>
                
                {/* Step 1 */}
                <div className="flex items-start gap-3">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] font-bold shrink-0 mt-0.5 transition-all ${
                    loadingStep > 0 
                      ? "bg-indigo-600 text-white" 
                      : loadingStep === 0 
                      ? "bg-slate-900 text-white animate-pulse border border-slate-900" 
                      : "border border-slate-300 text-slate-400 bg-slate-100"
                  }`}>
                    {loadingStep > 0 ? "✓" : "1"}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className={`block font-bold leading-normal ${loadingStep === 0 ? "text-slate-900" : loadingStep > 0 ? "text-slate-400" : "text-slate-400"}`}>
                      Analisis Kelayakan Tema & Relevansi
                    </span>
                    {loadingStep === 0 && (
                      <p className="text-[10px] text-slate-500 italic mt-0.5 animate-pulse">
                        Menimbang urgensi judul riset terhadap kontribusi akademis riil...
                      </p>
                    )}
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-3">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] font-bold shrink-0 mt-0.5 transition-all ${
                    loadingStep > 1 
                      ? "bg-indigo-600 text-white" 
                      : loadingStep === 1 
                      ? "bg-slate-900 text-white animate-pulse border border-slate-900" 
                      : "border border-slate-300 text-slate-400 bg-slate-100"
                  }`}>
                    {loadingStep > 1 ? "✓" : "2"}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className={`block font-bold leading-normal ${loadingStep === 1 ? "text-slate-900" : loadingStep > 1 ? "text-slate-400" : "text-slate-400"}`}>
                      Pemetaan Dasar Hukum & Latar Belakang (BAB 1)
                    </span>
                    {loadingStep === 1 && (
                      <p className="text-[10px] text-slate-500 italic mt-0.5 animate-pulse">
                        Menyusun draf paragraf bertingkat dengan pendekatan deduktif...
                      </p>
                    )}
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-3">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] font-bold shrink-0 mt-0.5 transition-all ${
                    loadingStep > 2 
                      ? "bg-indigo-600 text-white" 
                      : loadingStep === 2 
                      ? "bg-slate-900 text-white animate-pulse border border-slate-900" 
                      : "border border-slate-300 text-slate-400 bg-slate-100"
                  }`}>
                    {loadingStep > 2 ? "✓" : "3"}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className={`block font-bold leading-normal ${loadingStep === 2 ? "text-slate-900" : loadingStep > 2 ? "text-slate-400" : "text-slate-400"}`}>
                      Identifikasi Masalah & Batasan Ruang Lingkup
                    </span>
                    {loadingStep === 2 && (
                      <p className="text-[10px] text-slate-500 italic mt-0.5 animate-pulse">
                        Mengisolasi variabel riset agar batasan tidak merembet ke ruang lingkup tak terukur...
                      </p>
                    )}
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex items-start gap-3">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] font-bold shrink-0 mt-0.5 transition-all ${
                    loadingStep > 3 
                      ? "bg-indigo-600 text-white" 
                      : loadingStep === 3 
                      ? "bg-slate-900 text-white animate-pulse border border-slate-900" 
                      : "border border-slate-300 text-slate-400 bg-slate-100"
                  }`}>
                    {loadingStep > 3 ? "✓" : "4"}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className={`block font-bold leading-normal ${loadingStep === 3 ? "text-slate-900" : loadingStep > 3 ? "text-slate-400" : "text-slate-400"}`}>
                      Rumusan Masalah (Pertanyaan Formal Skenario)
                    </span>
                    {loadingStep === 3 && (
                      <p className="text-[10px] text-slate-500 italic mt-0.5 animate-pulse">
                        Merancang kalimat tanya deskriptif & asosiatif sesuai kaidah ilmiah...
                      </p>
                    )}
                  </div>
                </div>

                {/* Step 5 */}
                <div className="flex items-start gap-3">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] font-bold shrink-0 mt-0.5 transition-all ${
                    loadingStep > 4 
                      ? "bg-indigo-600 text-white" 
                      : loadingStep === 4 
                      ? "bg-slate-900 text-white animate-pulse border border-slate-900" 
                      : "border border-slate-300 text-slate-400 bg-slate-100"
                  }`}>
                    {loadingStep > 4 ? "✓" : "5"}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className={`block font-bold leading-normal ${loadingStep === 4 ? "text-slate-900" : loadingStep > 4 ? "text-slate-400" : "text-slate-400"}`}>
                      Penyusunan Metodologi Dan Ruang Hipotesis
                    </span>
                    {loadingStep === 4 && (
                      <p className="text-[10px] text-slate-500 italic mt-0.5 animate-pulse">
                        Memetakan alur flowchart operasional riset bersistem terstruktur...
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Educative Tip Box based on loadingStep */}
              <div className="w-full max-w-sm mx-auto bg-amber-50/80 border border-amber-200/50 p-4 rounded-2xl flex gap-3 items-start text-xs text-amber-805">
                <Sparkles className="w-5 h-5 text-amber-500 shrink-0 mt-0.5 animate-bounce" />
                <div>
                  <h5 className="font-extrabold text-amber-950">Tips Sidang Pertahanan:</h5>
                  <p className="text-[11px] text-amber-900 leading-relaxed mt-0.5 font-medium">
                    {loadingStep === 0 
                      ? "Latar Belakang yang kuat selalu menerapkan pola Piramida Terbalik (mengalir dari ulasan general/global ke kondisi wilayah lokal yang spesifik)."
                      : loadingStep === 1
                      ? "Gunakan data statistik terbaru & acuan hukum resmi di paragraf pembuka untuk mengunci kelayakan argumen awal skripsi Anda."
                      : loadingStep === 2
                      ? "Batasan Masalah berfungsi melindungi Anda saat ujian agar dosen penguji tidak melempar pertanyaan di luar koridor penelitian."
                      : loadingStep === 3
                      ? "Rumusan Masalah yang ideal wajib operasional, langsung menggunakan kata tanya seperti 'Bagaimana' untuk menggali data dalam."
                      : "Kesesuaian antara metodologi riset dan hipotesis membuktikan pemahaman logika berpikir yang padu di depan tim penguji sidang skripsi."
                    }
                  </p>
                </div>
              </div>

            </div>
          ) : currentResult ? (
            /* Main preview and layout visual representation of AI-generated academic content */
            <PreviewSection 
              data={currentResult} 
              isLoading={isLoading} 
              onRegenerate={() => handleGenerate()}
              selectedTema={tema || "Hasil Struktur Akademik"}
              isZenMode={isZenMode}
              onToggleZen={() => setIsZenMode(!isZenMode)}
            />
          ) : (
            /* Beautiful empty default landing state with core guidance vectors */
            <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-12 flex-grow flex flex-col items-center justify-center text-center h-full">
              <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-700 shadow-sm mb-5">
                <BookOpen className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-slate-800 text-base md:text-lg">
                Belum Ada Keberlangsungan Struktur
              </h3>
              <p className="text-xs md:text-sm text-slate-500 max-w-sm mt-1 mb-6 leading-relaxed">
                Tentukan jurusan, metode, dan ketik tema usulan skripsi Anda pada panel parameter di samping kiri atau pilih salah satu preset inspirasi instan kami untuk memformulasikan struktur akademik.
              </p>

              <div className="max-w-md w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-left divide-y divide-slate-200/50">
                <div className="flex gap-3 py-2.5 items-start">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-slate-800">Generator Draf Skripsi Utuh (BAB I - BAB V)</h5>
                    <p className="text-[10px] text-slate-500 mt-0.5 leading-normal">
                      Sistem menghasilkan draf terstruktur dari BAB I (Pendahuluan), BAB II (Tinjauan Pustaka), BAB III (Metodologi), BAB IV (Hasil &amp; Pembahasan), hingga BAB V (Penutup) yang diselaraskan dengan rujukan ilmiah terpercaya.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 py-2.5 items-start">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-slate-800">Visualisasi Logika Metodologi</h5>
                    <p className="text-[10px] text-slate-500 mt-0.5 leading-normal">
                      Menghasilkan flowchart interaktif langkah-demi-langkah pekerjaan tesis disesuaikan dengan jenis pengolahan riset Anda secara detail.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 py-2.5 items-start">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-slate-800">Kaidah Akademik Nasional Indonesia</h5>
                    <p className="text-[10px] text-slate-500 mt-0.5 leading-normal">
                      Draf dan rumus kalimat tanya disesuaikan tuntas dengan pola piramida terbalik dan regulasi kurikulum perguruan tinggi nasional terpercaya.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Modal overlays */}
      <DiktiGuideModal isOpen={isDiktiOpen} onClose={() => setIsDiktiOpen(false)} />
      <MethodologyExplorerModal isOpen={isMethodologyOpen} onClose={() => setIsMethodologyOpen(false)} />
    </div>
  );
}
