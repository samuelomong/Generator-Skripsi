import { useState } from "react";
import { ArrowDown, HelpCircle, Code, ChevronDown, ChevronUp, Layers, CheckCircle2, FileInput, FileOutput, Sparkles } from "lucide-react";
import { Flowchart, Tahapan } from "../types";

interface FlowchartVisualProps {
  flowchart: Flowchart;
}

export default function FlowchartVisual({ flowchart }: FlowchartVisualProps) {
  const [activeStepId, setActiveStepId] = useState<number | null>(1);

  if (!flowchart || !flowchart.tahapan || flowchart.tahapan.length === 0) {
    return (
      <div className="bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-8 text-center text-slate-500 animate-fadeIn">
        <p>Belum ada data flowchart penelitian untuk divisualisasikan.</p>
      </div>
    );
  }

  const toggleStep = (id: number) => {
    setActiveStepId(activeStepId === id ? null : id);
  };

  return (
    <div className="space-y-6 animate-scaleIn select-none">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-lg font-extrabold font-sans text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-600 animate-pulse" />
            Visualisasi Metodologi Penelitian
          </h3>
          <p className="text-xs text-slate-500">
            Berikut adalah alur pengerjaan penelitian teratur yang disesuaikan dengan metode pengujian pilihan Anda. Klik tahapan untuk membaca rincian.
          </p>
        </div>
      </div>

      {/* Grid container: Flowchart nodes list */}
      <div className="flex flex-col items-center max-w-3xl mx-auto py-2">
        {flowchart.tahapan.map((tahap, idx) => {
          const isOpen = activeStepId === tahap.id;
          return (
            <div key={tahap.id} className="w-full flex flex-col items-center">
              {/* Box Node container */}
              <div
                id={`flowchart-step-${tahap.id}`}
                className={`w-full border rounded-2xl transition-all duration-300 shadow-sm cursor-pointer hover:-translate-y-0.5 ${
                  isOpen
                    ? "border-slate-900 bg-white ring-1 ring-slate-900 shadow-md shadow-slate-900/5 translate-x-0.5"
                    : "border-slate-200 bg-slate-50/50 hover:border-slate-400 hover:bg-slate-50"
                }`}
                onClick={() => toggleStep(tahap.id)}
              >
                <div className="p-3 md:py-3 md:px-5 flex items-center gap-3 w-full justify-between">
                  {/* Step Code and Info */}
                  <div className="flex items-center gap-3.5 min-w-0 flex-1">
                    <span className={`w-8 h-8 text-xs rounded-xl flex items-center justify-center font-mono font-extrabold shrink-0 transition-all duration-300 ${
                      isOpen ? "bg-slate-900 text-white shadow-sm ring-2 ring-indigo-500/10 scale-105" : "bg-slate-200 text-slate-800"
                    }`}>
                      0{tahap.id}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-extrabold text-slate-900 text-xs md:text-sm truncate">
                        {tahap.nama}
                      </h4>
                      {!isOpen ? (
                        <p className="text-[11px] text-slate-500 truncate mt-0.5 max-w-full">
                          {tahap.deskripsi}
                        </p>
                      ) : (
                        <div className="flex items-center gap-1 mt-0.5">
                          <Sparkles className="w-3 h-3 text-indigo-600 animate-pulse" />
                          <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider">Sedang Ditinjau (Aktif)</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Expansion indicator */}
                  <button className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg shrink-0 transition-colors">
                    {isOpen ? <ChevronUp className="w-4 h-4 text-slate-900" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {/* Details Expanded Block with dynamic animations */}
                {isOpen && (
                  <div className="px-5 pb-5 pt-2 border-t border-slate-100 bg-white rounded-b-2xl space-y-4 animate-fadeIn">
                    <div className="text-xs md:text-sm text-slate-600 leading-relaxed font-medium">
                      {tahap.deskripsi}
                    </div>

                    {/* Inputs & Outputs columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                      <div className="bg-slate-50 border border-slate-200/60 p-3.5 rounded-xl">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          <FileInput className="w-4 h-4 text-indigo-500 shrink-0" />
                          <span>Input / Prasyarat Kunci</span>
                        </div>
                        <span className="text-xs text-slate-600 font-medium leading-relaxed">
                          {tahap.input || "Tidak ada persyaratan khusus"}
                        </span>
                      </div>

                      <div className="bg-emerald-50/50 border border-emerald-200/50 p-3.5 rounded-xl">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">
                          <FileOutput className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>Output / Bukti Hasil Nyata</span>
                        </div>
                        <span className="text-xs text-emerald-900 font-bold leading-relaxed">
                          {tahap.output || "Dokumen / modul evaluasi"}
                        </span>
                      </div>
                    </div>

                    {/* Sub steps list */}
                    {tahap.sub_langkah && tahap.sub_langkah.length > 0 && (
                      <div className="space-y-2.5 pt-3 border-t border-slate-100">
                        <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                          <span>Sub-Langkah Prosedural Riset:</span>
                        </h5>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {tahap.sub_langkah.map((sub, sIdx) => (
                            <li key={sIdx} className="flex items-start gap-2 text-slate-600 hover:text-slate-900 transition-colors">
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-2"></span>
                              <span className="font-medium">{sub}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Connecting line */}
              {idx < flowchart.tahapan.length - 1 && (
                <div className="py-2 flex flex-col items-center relative">
                  <div className="w-[3px] h-8 bg-gradient-to-b from-slate-900 via-slate-400 to-slate-200"></div>
                  <ArrowDown className="w-4 h-4 text-slate-500 -mt-2 animate-bounce" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

