import React, { useState, useEffect, useRef } from "react";
import { 
  Tv, ChevronLeft, ChevronRight, Maximize, Minimize, Sparkles, 
  BookOpen, Award, CheckCircle2, ListTodo, GraduationCap, 
  Layers, Database, FileText, Compass, Layout, Copy, Check, Info, Settings
} from "lucide-react";
import { AcademicData } from "../types";

interface PresentationSlidesProps {
  data: AcademicData;
  selectedTema: string;
}

type ThemePreset = "royal_indigo" | "emerald_sage" | "academic_charcoal" | "cyber_dark";

export default function PresentationSlides({ data, selectedTema }: PresentationSlidesProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [theme, setTheme] = useState<ThemePreset>("royal_indigo");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation for presentation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "Space") {
        setCurrentSlide(prev => Math.min(6, prev + 1));
      } else if (e.key === "ArrowLeft") {
        setCurrentSlide(prev => Math.max(0, prev - 1));
      } else if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen]);

  // Fullscreen toggle helper
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  // Theme styling configurations
  const themeClasses: Record<ThemePreset, {
    bg: string;
    cardBg: string;
    textPrimary: string;
    textSecondary: string;
    border: string;
    accent: string;
    badge: string;
    highlight: string;
  }> = {
    royal_indigo: {
      bg: "bg-slate-900",
      cardBg: "bg-indigo-950/40 backdrop-blur-md",
      textPrimary: "text-white",
      textSecondary: "text-indigo-200/80",
      border: "border-indigo-500/20",
      accent: "text-indigo-400 bg-indigo-500/10",
      badge: "bg-indigo-600/30 text-indigo-200 border border-indigo-400/35",
      highlight: "from-indigo-400 via-sky-400 to-emerald-400"
    },
    emerald_sage: {
      bg: "bg-slate-900",
      cardBg: "bg-emerald-950/40 backdrop-blur-md",
      textPrimary: "text-white",
      textSecondary: "text-emerald-200/80",
      border: "border-emerald-500/20",
      accent: "text-emerald-400 bg-emerald-500/10",
      badge: "bg-emerald-600/30 text-emerald-200 border border-emerald-400/35",
      highlight: "from-emerald-400 via-teal-400 to-cyan-400"
    },
    academic_charcoal: {
      bg: "bg-slate-950",
      cardBg: "bg-slate-900/80 backdrop-blur-md",
      textPrimary: "text-slate-100",
      textSecondary: "text-slate-400",
      border: "border-slate-800",
      accent: "text-indigo-400 bg-indigo-500/10",
      badge: "bg-slate-800 text-slate-300 border border-slate-700",
      highlight: "from-slate-100 to-slate-400"
    },
    cyber_dark: {
      bg: "bg-zinc-950",
      cardBg: "bg-zinc-900/50 backdrop-blur-xs",
      textPrimary: "text-green-400",
      textSecondary: "text-zinc-400",
      border: "border-green-500/10",
      accent: "text-green-400 bg-green-500/5",
      badge: "bg-zinc-900 text-green-300 border border-green-500/30 font-mono",
      highlight: "from-green-400 to-emerald-400 font-mono"
    }
  };

  const currStyle = themeClasses[theme];

  // Helper selectors for safety
  const recommendedTitle = data.tema_analisis.judul_rekomendasi?.[0] || selectedTema || "Judul Skripsi Utama";
  const bulletsLatarBelakang = data.bab1.latar_belakang || [];
  const bulletsLandasanTeori = data.bab2?.landasan_teori || [];
  const bulletsTinjauanPustaka = data.bab2?.tinjauan_pustaka || [];
  const bulletsKerangkaBerpikir = data.bab2?.kerangka_berpikir || [];
  const docFlowchart = data.flowchart?.tahapan || [];

  // Slide content structure definition
  const slides = [
    // Slide 1: Cover / Judul Sidang
    {
      title: "SIDANG PERTANGGUNGJAWABAN SKRIPSI",
      subtitle: "Paparan Lengkap Hasil Penelitian Akademik Mandiri",
      icon: GraduationCap,
      render: () => (
        <div className="flex flex-col items-center justify-center text-center space-y-6 h-full p-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold uppercase tracking-widest text-slate-200 animate-pulse">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
            <span>Paparan Sidang Skripsi Terbuka</span>
          </div>
          
          <h1 className={`text-xl md:text-3xl font-extrabold tracking-tight leading-tight max-w-4xl bg-gradient-to-r ${currStyle.highlight} bg-clip-text text-transparent font-display select-all`}>
            {recommendedTitle}
          </h1>

          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-slate-400 to-transparent my-2" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-3xl text-left mt-4 text-xs font-medium">
            <div className={`p-4 rounded-xl border ${currStyle.border} ${currStyle.cardBg} space-y-1`}>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold">Variabel Penelitian</span>
              <p className={`${currStyle.textPrimary} font-bold font-sans truncate`}>TAM, UTAUT & Structural</p>
            </div>
            <div className={`p-4 rounded-xl border ${currStyle.border} ${currStyle.cardBg} space-y-1`}>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold">Sektor / Bidang Kajian</span>
              <p className={`${currStyle.textPrimary} font-bold font-sans truncate`}>Sistem Terintegrasi</p>
            </div>
            <div className={`p-4 rounded-xl border ${currStyle.border} ${currStyle.cardBg} space-y-1 sm:col-span-2 md:col-span-1`}>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold">Metode Riset Utama</span>
              <p className={`${currStyle.textPrimary} font-bold font-sans truncate`}>{data.bab3?.jenis_penelitian || "Kuantitatif R&D"}</p>
            </div>
          </div>

          <div className="pt-6 text-[11px] text-slate-400 uppercase tracking-wider select-none font-bold">
            Penyusun: Mahasiswa Terkait &bull; Universitas Terakreditasi Nasional
          </div>
        </div>
      )
    },
    // Slide 2: Latar Belakang & Urgensi
    {
      title: "BAB I: LATAR BELAKANG PENELITIAN",
      subtitle: "Kerangka Piramida Terbalik (Urgensi Makro s/d Solusi Mikro)",
      icon: Layers,
      render: () => (
        <div className="space-y-4 h-full p-2 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-4.5 rounded-2xl border ${currStyle.border} ${currStyle.cardBg} relative overflow-hidden h-full flex flex-col justify-between`}>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-widest mb-1.5">1. Sisi Makro (Teori/Hukum)</span>
                <p className={`${currStyle.textPrimary} text-xs md:text-[13px] leading-relaxed text-justify line-clamp-[9]`}>
                  {bulletsLatarBelakang[0] || "Menjabarkan landasan idealitas, regulasi hukum yang mendasari pentingnya topik, serta standardisasi makro secara ilmiah."}
                </p>
              </div>
              <div className="mt-3 text-[10px] font-bold text-slate-400">Deskripsi: Kondisi Ideal</div>
            </div>

            <div className={`p-4.5 rounded-2xl border ${currStyle.border} ${currStyle.cardBg} relative overflow-hidden h-full flex flex-col justify-between`}>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-widest mb-1.5">2. Sisi Meso (Masalah Riil/Gap)</span>
                <p className={`${currStyle.textPrimary} text-xs md:text-[13px] leading-relaxed text-justify line-clamp-[9]`}>
                  {bulletsLatarBelakang[1] || "Menjabarkan kesenjangan empiris, inefisiensi yang terjadi di lapangan, serta kegagalan sistem yang menuntut solusi cerdas akademik."}
                </p>
              </div>
              <div className="mt-3 text-[10px] font-bold text-slate-400">Deskripsi: Problem Statement</div>
            </div>

            <div className={`p-4.5 rounded-2xl border ${currStyle.border} ${currStyle.cardBg} relative overflow-hidden h-full flex flex-col justify-between`}>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-widest mb-1.5">3. Sisi Mikro (Solusi/Novelty)</span>
                <p className={`${currStyle.textPrimary} text-xs md:text-[13px] leading-relaxed text-justify line-clamp-[9]`}>
                  {bulletsLatarBelakang[2] || "Formulasi solusi operasional terukur, orisinalitas riset, serta signifikansi inovasi teknik yang diuji dalam bab selanjutnya."}
                </p>
              </div>
              <div className="mt-3 text-[10px] font-bold text-slate-400">Deskripsi: Tawaran Kontribusi</div>
            </div>
          </div>
        </div>
      )
    },
    // Slide 3: Rumusan Masalah, Batasan, Tujuan
    {
      title: "RUMUSAN MASALAH & TUJUAN PENELITIAN",
      subtitle: "Batas Koridor Riset Ilmiah dan Pembuktian Temuan",
      icon: ListTodo,
      render: () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full p-2 overflow-y-auto">
          <div className={`p-5 rounded-2xl border ${currStyle.border} ${currStyle.cardBg} space-y-3 flex flex-col justify-between`}>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-2">Rumusan Pertanyaan Penelitian:</span>
              <div className="space-y-3">
                {data.rumusan_masalah.slice(0, 3).map((q, idx) => (
                  <div key={idx} className="flex gap-3 items-center">
                    <span className="w-6 h-6 bg-white/10 rounded-lg flex items-center justify-center font-mono text-[10px] font-bold shrink-0 text-amber-300">Q{idx+1}</span>
                    <span className={`text-xs md:text-[13px] font-medium leading-relaxed ${currStyle.textPrimary}`}>{q}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-white/5 pt-2 text-[10px] text-slate-500 font-medium">Kalimat tanya formal berpedoman DIKTI.</div>
          </div>

          <div className="space-y-4">
            <div className={`p-4 rounded-xl border ${currStyle.border} ${currStyle.cardBg} space-y-1.5`}>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Batasan Ruang Lingkup:</span>
              <ul className="list-disc pl-4 text-xs space-y-1 text-slate-300">
                {data.bab1.batasan_masalah.slice(0, 2).map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>

            <div className={`p-4 rounded-xl border ${currStyle.border} ${currStyle.cardBg} space-y-1.5`}>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Tujuan Pokok Penelitian:</span>
              <ul className="list-disc pl-4 text-xs space-y-1 text-slate-300">
                {data.bab1.tujuan_penelitian.slice(0, 2).map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )
    },
    // Slide 4: Landasan Teori & Tinjauan Pustaka (BAB II)
    {
      title: "BAB II: TINJAUAN TEORITIS & STUDI KOMPARASI",
      subtitle: "Argumentasi Akademis Berdasarkan Grand Theory Terkemuka",
      icon: BookOpen,
      render: () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full p-2 overflow-y-auto">
          <div className={`p-5 rounded-2xl border ${currStyle.border} ${currStyle.cardBg} space-y-3.5`}>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest block">Landasan Teori Utama (Grand Theory):</span>
            <p className={`${currStyle.textPrimary} text-xs md:text-[13px] leading-relaxed text-justify line-clamp-[10]`}>
              {bulletsLandasanTeori[0] || "Menyusun peta kerangka berpikir yang kuat (Grand Theory, Middle Theory, dan Applied Theory) yang mendasari seluruh interkoneksi variabel penelitian lapangan."}
            </p>
          </div>

          <div className="space-y-4">
            <div className={`p-4.5 rounded-xl border ${currStyle.border} ${currStyle.cardBg} space-y-2`}>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Studi Terdahulu (Penelitian Sejenis):</span>
              <div className="space-y-2">
                {bulletsTinjauanPustaka.slice(0, 2).map((tp, i) => (
                  <div key={i} className="text-xs text-slate-200 leading-normal flex gap-2 items-start">
                    <span className="text-amber-400 shrink-0 mt-0.5 font-bold">&bull;</span>
                    <span className="line-clamp-2 italic">"{tp}"</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`p-4.5 rounded-xl border ${currStyle.border} ${currStyle.cardBg} space-y-1.5`}>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Asumsi Konseptual:</span>
              <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                {bulletsKerangkaBerpikir[0] || "Alur logika kausalitas pengaruh antar variabel independen, mediator, dan dependen."}
              </p>
            </div>
          </div>
        </div>
      )
    },
    // Slide 5: Metodologi Penelitian & Alur Tahapan (BAB III)
    {
      title: "BAB III: METODOLOGI PENELITIAN & FLOWCHART",
      subtitle: "Pendekatan Operasional, Teknik Analisis, dan Ukuran Sampel",
      icon: Compass,
      render: () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full p-2 overflow-y-auto">
          <div className={`p-5 rounded-2xl border ${currStyle.border} ${currStyle.cardBg} space-y-3.5 flex flex-col justify-between`}>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest block mb-2">Desain Rancangan Penelitian:</span>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="font-bold text-amber-300 font-sans uppercase block text-[9px]">Pendekatan:</span>
                  <p className="text-slate-200">{data.bab3?.jenis_penelitian || "Riset Kuantitatif Eksperimental"}</p>
                </div>
                <div>
                  <span className="font-bold text-amber-300 font-sans uppercase block text-[9px]">Populasi / Sampel:</span>
                  <p className="text-slate-200">{data.bab3?.sumber_data || "Ditentukan dengan teknik Purposive Sampling"}</p>
                </div>
                <div>
                  <span className="font-bold text-amber-300 font-sans uppercase block text-[9px]">Teknik Analisis:</span>
                  <p className="text-slate-200">{data.bab3?.teknik_analisis || "Uji Persamaan SEM & Reabilitas Cronbach Alpha"}</p>
                </div>
              </div>
            </div>
            <div className="p-3 bg-white/5 border border-white/5 rounded-xl text-[10px] text-slate-400 leading-relaxed italic">
              Metodologi terintegrasi formula matematis baku draf skripsi.
            </div>
          </div>

          <div className={`p-5 rounded-2xl border ${currStyle.border} ${currStyle.cardBg} space-y-3 overflow-y-auto`}>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Alur Kerja Penelitian (Flowchart):</span>
            <div className="space-y-2">
              {docFlowchart.slice(0, 4).map((t, i) => (
                <div key={i} className="flex gap-3 items-start bg-white/5 p-2.5 rounded-xl border border-white/5">
                  <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-mono text-[10px] mt-0.5 font-bold shrink-0">
                    S{t.id}
                  </span>
                  <div>
                    <h5 className="font-bold text-xs text-slate-200 leading-normal">{t.nama}</h5>
                    <p className="text-[10px] text-slate-400 line-clamp-1">{t.deskripsi}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    // Slide 6: Analisis Data & Pembahasan (BAB IV)
    {
      title: "BAB IV: ANALISIS DATA & PEMBAHASAN",
      subtitle: "Temuan Empiris Mutakhir dan Pembuktian Hipotesis Kerja (H1)",
      icon: Database,
      render: () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full p-2 overflow-y-auto">
          <div className={`p-5 rounded-2xl border ${currStyle.border} ${currStyle.cardBg} space-y-3.5`}>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest block">Analisis Data / Arsitektur Hasil:</span>
            <p className={`${currStyle.textPrimary} text-xs md:text-[13px] leading-relaxed text-justify line-clamp-[10]`}>
              {data.bab4?.analisis_sistem_data?.[0] || "Menyajikan hasil olahan data primer atau program fungsional sistem yang dibahas secara mendalam per sub-bab statistik."}
            </p>
          </div>

          <div className={`p-5 rounded-2xl border ${currStyle.border} ${currStyle.cardBg} space-y-3.5`}>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest block">Pembahasan Temuan & Korelasi Teoretis:</span>
            <p className={`${currStyle.textPrimary} text-xs md:text-[13px] leading-relaxed text-justify line-clamp-[10]`}>
              {data.bab4?.pembahasan_temuan?.[0] || "Membandingkan pembuktian hipotesis nyata di lapangan dengan rujukan literatur terdahulu, menarik orisinalitas riset."}
            </p>
          </div>
        </div>
      )
    },
    // Slide 7: Kesimpulan & Saran (BAB V)
    {
      title: "BAB V: KESIMPULAN & SARAN REKOMENDASI",
      subtitle: "Ringkasan Hasil Penelitian dan Usulan Tindak Lanjut",
      icon: Award,
      render: () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full p-2 overflow-y-auto">
          <div className={`p-5 rounded-2xl border ${currStyle.border} ${currStyle.cardBg} space-y-3 flex flex-col justify-between`}>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-2">Simpulan Akhir (Menjawab Rumusan Masalah):</span>
              <div className="space-y-2">
                {data.bab5?.kesimpulan.slice(0, 3).map((k, idx) => (
                  <div key={idx} className="flex gap-2.5 items-start text-xs md:text-[13px] text-slate-200">
                    <span className="text-emerald-400 font-bold shrink-0 mt-0.5">•</span>
                    <span className="line-clamp-2">{k}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-white/5 pt-2 text-[10px] text-slate-500 font-medium font-sans">
              Menjawab komparasi pertanyaan di proposal.
            </div>
          </div>

          <div className={`p-5 rounded-2xl border ${currStyle.border} ${currStyle.cardBg} space-y-3 flex flex-col justify-between`}>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-2">Saran & Rekomendasi Lapangan:</span>
              <div className="space-y-2">
                {data.bab5?.saran.slice(0, 3).map((s, idx) => (
                  <div key={idx} className="flex gap-2.5 items-start text-xs md:text-[13px] text-slate-200">
                    <span className="text-amber-400 font-bold shrink-0 mt-0.5">•</span>
                    <span className="line-clamp-2">{s}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-white/5 pt-2 text-[10px] text-slate-500 font-medium font-sans">
              Usulan operasional taktis berkelanjutan.
            </div>
          </div>
        </div>
      )
    }
  ];

  const currentSlideData = slides[currentSlide];
  const SlideIcon = currentSlideData.icon;

  const handleCopySlideContent = () => {
    let content = `=== SLIDE ${currentSlide + 1}: ${currentSlideData.title} ===\n`;
    content += `${currentSlideData.subtitle}\n\n`;
    
    if (currentSlide === 0) {
      content += `Judul Skripsi: ${recommendedTitle}\nJurusan: Program Studi Terkait\nMetode: ${data.bab3?.jenis_penelitian || "Kuantitatif"}`;
    } else if (currentSlide === 1) {
      content += bulletsLatarBelakang.map((para, i) => `Paragraf ${i + 1}:\n${para}`).join("\n\n");
    } else if (currentSlide === 2) {
      content += `Rumusan Masalah:\n` + data.rumusan_masalah.map((m, i) => `${i + 1}. ${m}`).join("\n");
      content += `\nTujuan Masalah:\n` + data.bab1.tujuan_penelitian.map((t, i) => `${i + 1}. ${t}`).join("\n");
    } else if (currentSlide === 3) {
      content += `Grand Theory:\n${bulletsLandasanTeori.join("\n\n")}`;
    } else if (currentSlide === 4) {
      content += `Metode riset: ${data.bab3?.jenis_penelitian}\nSampel: ${data.bab3?.sumber_data}\nTahapan: ` + docFlowchart.map(t => t.nama).join(", ");
    } else if (currentSlide === 5) {
      content += `Analisis:\n` + (data.bab4?.analisis_sistem_data || []).join("\n\n") + `\n\nPembahasan:\n` + (data.bab4?.pembahasan_temuan || []).join("\n\n");
    } else {
      content += `Kesimpulan:\n` + data.bab5.kesimpulan.join("\n") + `\n\nSaran:\n` + data.bab5.saran.join("\n");
    }

    navigator.clipboard.writeText(content);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Configuration bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-50 border border-indigo-150 text-indigo-600 rounded-xl">
            <Tv className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm md:text-base">Slide Presentasi Hasil Sidang</h4>
            <p className="text-xs text-slate-400">Siap dipresentasikan ke Dosen Penguji Sidang Skripsi (Navigasikan dengan Tombol Spasi / Panah).</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 self-stretch md:self-auto">
          {/* Theme selector */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
            <span className="text-[10px] font-bold text-slate-400 px-1 font-mono uppercase bg-white/5 border border-transparent rounded mr-1 flex items-center gap-1">
              <Settings className="w-3 h-3 text-slate-500" />
              <span>Tema:</span>
            </span>
            {(["royal_indigo", "emerald_sage", "academic_charcoal", "cyber_dark"] as ThemePreset[]).map((tPreset) => (
              <button
                key={tPreset}
                type="button"
                onClick={() => setTheme(tPreset)}
                className={`w-5 h-5 rounded-full cursor-pointer transition-transform border ${
                  theme === tPreset ? "scale-115 ring-2 ring-indigo-500 ring-offset-1 border-white" : "border-slate-300 opacity-60 hover:opacity-100"
                }`}
                style={{
                  backgroundColor: tPreset === "royal_indigo" ? "#1e1b4b" : tPreset === "emerald_sage" ? "#064e3b" : tPreset === "academic_charcoal" ? "#0f172a" : "#0f0"
                }}
                title={tPreset.split("_").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleCopySlideContent}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 border border-slate-200 cursor-pointer"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>Salin Isi Slide</span>
          </button>

          <button
            type="button"
            onClick={toggleFullscreen}
            className="flex-1 md:flex-initial px-4 py-1.5 bg-indigo-650 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            <span>{isFullscreen ? "Kecilkan" : "Main presentasi"}</span>
          </button>
        </div>
      </div>

      {/* Screen Frame presentation deck */}
      <div 
        ref={containerRef}
        className={`${currStyle.bg} border-4 border-slate-800 rounded-3xl overflow-hidden aspect-video relative flex flex-col justify-between transition-all group ${
          isFullscreen ? "fixed inset-0 z-50 rounded-none border-none p-8" : "p-6.5 md:p-8 shadow-lg shadow-indigo-950/5"
        }`}
      >
        {/* Top Header of slide */}
        <div className="flex border-b border-white/10 pb-4 select-none shrink-0 justify-between items-center text-left">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl bg-white/5 border border-white/10 ${currStyle.textPrimary}`}>
              <SlideIcon className="w-5 h-5" />
            </div>
            <div>
              <span className={`text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block font-display`}>
                BAGIAN {currentSlide + 1} DARI {slides.length}
              </span>
              <h2 className={`font-black tracking-tight ${currStyle.textPrimary} text-xs sm:text-base md:text-md font-display mt-0.5`}>
                {currentSlideData.title}
              </h2>
            </div>
          </div>
          <div className="hidden sm:block text-right">
            <span className={`text-[9px] font-bold ${currStyle.badge} px-2.5 py-0.5 rounded-full select-none font-sans`}>
              Metodologi Teruji
            </span>
            <p className="text-[10px] text-slate-500 font-medium font-sans mt-0.5">Sidang Skripsi 2026</p>
          </div>
        </div>

        {/* Dynamic center slide render viewport */}
        <div className="my-6 md:my-8 flex-1 min-h-0">
          {currentSlideData.render()}
        </div>

        {/* Bottom toolbar & pagination of slide */}
        <div className="border-t border-white/10 pt-4.5 flex select-none shrink-0 justify-between items-center text-xs text-slate-400">
          <span className="font-mono font-medium text-[10px]">
            SLIDE {currentSlide + 1} &bull; {currentSlideData.subtitle}
          </span>

          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={currentSlide === 0}
              onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-100 hover:bg-white/10 disabled:opacity-30 cursor-pointer active:scale-95 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono font-extrabold tracking-wide text-slate-200">
              {currentSlide + 1} / {slides.length}
            </span>
            <button
              type="button"
              disabled={currentSlide === slides.length - 1}
              onClick={() => setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1))}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-100 hover:bg-white/10 disabled:opacity-30 cursor-pointer active:scale-95 transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Slide Index thumbnails bar */}
      <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
        {slides.map((s, idx) => {
          const isActive = idx === currentSlide;
          const SIcon = s.icon;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                isActive 
                  ? "bg-indigo-50/80 border-indigo-300 text-indigo-700 shadow-xs" 
                  : "bg-white border-slate-200 hover:border-slate-800 text-slate-500 hover:text-slate-800"
              }`}
            >
              <div className="flex flex-col items-center gap-1.5">
                <SIcon className={`w-4 h-4 ${isActive ? "text-indigo-650 animate-pulse" : "text-slate-400"}`} />
                <span className="text-[10px] font-extrabold font-mono block">SLIDE {idx+1}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
