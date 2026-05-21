import { GraduationCap, BookOpen, GitFork, Sparkles, Award } from "lucide-react";
 
interface HeaderProps {
  onShowDiktiModal: () => void;
  onShowMethodologyModal: () => void;
}
 
export default function Header({ onShowDiktiModal, onShowMethodologyModal }: HeaderProps) {
  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 z-40 shadow-sm py-4 px-6 select-none transition-all duration-300">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Full Signature Logo Presentation (1:1 with the requested brand design) */}
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="relative shrink-0 w-16 h-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center p-0.5 shadow-md shadow-indigo-100/40 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-indigo-200/50 transition-all duration-500">
            {/* The Ultimate High Fidelity Vector Reproduction of the Uploaded Brand Icon */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 120 120" 
              className="w-14 h-14"
              aria-label="Skripsi Generator High-Fidelity Logo"
            >
              <defs>
                {/* Electric Vibrant Indigo/Blue Gradients matching the logo closely */}
                <linearGradient id="brandPageGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#f8fafc" />
                </linearGradient>
                <linearGradient id="brandFoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2563eb" /> {/* Vivid blue */}
                  <stop offset="100%" stopColor="#1d4ed8" /> {/* Indigo shadow */}
                </linearGradient>
                <linearGradient id="brandStarGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
                <linearGradient id="brandStarGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#0284c7" />
                </linearGradient>
              </defs>

              {/* SECTION 1: Thick Dark Navy Symmetrical Open Book Cover Base at the Bottom */}
              {/* This represents the dark navy stylized bottom wrap-around that houses the document */}
              <path 
                d="M 33,45 C 33,42.5 35,41 37.5,41 L 41.5,41 C 44,41 45,42.5 45,45 L 45,69 C 45,71.5 46.5,73.5 49,73.5 L 59,73.5 C 59.5,73.5 60,74 60,74.5 C 60,75 59.5,75.5 59,75.5 C 47,75.5 45,71.5 45,69 L 45,45 Z" 
                fill="#0b2146" 
              />
              {/* Symmetrical Book cover wings curving beautifully at the bottom */}
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
                fill="#0a1d37" 
                stroke="#0a1d37"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />

              {/* SECTION 2: Symmetrical Document/Sheet of Paper rising in background */}
              {/* Document Background with white fill and crisp dark blue outline */}
              <path 
                d="M 44.5,29 C 44.5,27.5 45.5,26.5 47,26.5 L 63.5,26.5 L 72.5,35.5 L 72.5,69 C 72.5,70.5 71.5,71.5 70,71.5 L 47,71.5 C 45.5,71.5 44.5,70.5 44.5,69 Z" 
                fill="url(#brandPageGradient)" 
                stroke="#0a1d37" 
                strokeWidth="1.8" 
                strokeLinejoin="round"
              />

              {/* Document Top Right Corner Page Fold */}
              <path 
                d="M 63.5,26.5 L 63.5,35.5 L 72.5,35.5 Z" 
                fill="url(#brandFoldGradient)" 
                stroke="#0a1d37" 
                strokeWidth="1.25" 
                strokeLinejoin="round"
              />

              {/* Document Text Lines inside the page */}
              <line x1="49" y1="35.5" x2="59" y2="35.5" stroke="#0a1d37" strokeWidth="2.2" strokeLinecap="round" />
              <line x1="49" y1="41" x2="65.5" y2="41" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" />
              <line x1="49" y1="46.5" x2="59.5" y2="46.5" stroke="#3b82f6" strokeWidth="2.2" strokeLinecap="round" />
              <line x1="49" y1="52" x2="56" y2="52" stroke="#94a3b8" strokeWidth="2.2" strokeLinecap="round" />

              {/* SECTION 3: Symmetrical Fountain Pen Nib pointing upright in front center */}
              <path 
                d="M 60.5,45.5 
                   C 61.2,48.5 64,53.5 65.5,58.5 
                   L 60.5,61.5 
                   L 55.5,58.5 
                   C 57,53.5 59.8,48.5 60.5,45.5 Z" 
                fill="#0a1d37" 
                stroke="#0a1d37" 
                strokeWidth="0.8" 
                strokeLinejoin="round" 
              />
              {/* Nib Split line */}
              <line x1="60.5" y1="48.5" x2="60.5" y2="54" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
              {/* Nib Breather Hole */}
              <circle cx="60.5" cy="55" r="1.1" fill="#ffffff" />

              {/* SECTION 4: Digital Generative Data Particles / Pixel blocks */}
              {/* Tiny square/rect pixels floating off on the right */}
              <rect x="68" y="44" width="4.2" height="4.2" rx="0.8" fill="#3b82f6" />
              <rect x="76.5" y="41.5" width="3.5" height="3.5" rx="0.6" fill="#00bcff" />
              <rect x="67.5" y="52" width="4" height="4" rx="0.8" fill="#1d4ed8" />
              <rect x="75" y="49.5" width="3" height="3" rx="0.6" fill="#60a5fa" />
              <rect x="71" y="56" width="3.4" height="3.4" rx="0.5" fill="#38bdf8" />
              <rect x="65" y="58" width="2.5" height="2.5" rx="0.5" fill="#93c5fd" />

              {/* SECTION 5: Dynamic Magical 4-Point Sparkles (Stars) on Upper-Right */}
              {/* Star 1 (Large Premium Sparkle) */}
              <path 
                d="M 82,13.5 Q 82,21.5 90,21.5 Q 82,21.5 82,29.5 Q 82,21.5 74,21.5 Q 82,21.5 82,13.5 Z" 
                fill="url(#brandStarGradient1)" 
              />
              {/* Star 2 (Secondary Supporting Sparkle) */}
              <path 
                d="M 91,26.5 Q 91,31 95,31 Q 91,31 91,35.5 Q 91,31 87,31 Q 91,31 91,26.5 Z" 
                fill="url(#brandStarGradient2)" 
              />
            </svg>
          </div>
 
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[22px] md:text-2xl font-black font-display tracking-tight text-slate-900 uppercase">
                Skripsi
              </span>
              <span className="text-[22px] md:text-2xl font-black font-display tracking-wide text-indigo-600 uppercase">
                Generator
              </span>
            </div>
            
            {/* Symmetrical elegant tagline from the logo spec card */}
            <div className="flex items-center gap-2 mt-0.5 select-none">
              <div className="h-[1px] w-6 bg-slate-300"></div>
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 font-sans">
                Ide Menjadi Skripsi
              </span>
              <div className="h-[1px] w-6 bg-slate-300"></div>
            </div>
          </div>
        </div>
 
        <div className="flex items-center gap-2 flex-wrap justify-center mt-2 lg:mt-0">
          <button 
            onClick={onShowDiktiModal}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:border-slate-800 rounded-2xl text-xs text-slate-700 hover:text-slate-900 hover:shadow-sm font-bold transition-all duration-300 cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
          >
            <BookOpen className="w-4 h-4 text-indigo-600" />
            <span>Kaidah Penulisan Dikti</span>
          </button>
          
          <button 
            onClick={onShowMethodologyModal}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:border-slate-800 rounded-2xl text-xs text-slate-700 hover:text-slate-900 hover:shadow-sm font-bold transition-all duration-300 cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
          >
            <GitFork className="w-4 h-4 text-indigo-600" />
            <span>Visualisasi Metodologis</span>
          </button>
 
          <div className="px-4 py-2 bg-gradient-to-r from-amber-50 to-amber-100/60 border border-amber-200/80 text-amber-850 font-extrabold rounded-2xl text-xs flex items-center gap-1.5 shadow-2xs select-none">
            <Award className="w-3.5 h-3.5 text-amber-600 animate-spin-slow" />
            <span>Edisi Cerdas Akademik 2026</span>
          </div>
        </div>
      </div>
    </header>
  );
}


