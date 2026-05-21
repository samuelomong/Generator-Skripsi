import React, { useState } from "react";
import { 
  X, GitFork, ArrowDown, HelpCircle, CheckCircle2, FileInput, FileOutput, 
  Sparkles, Activity, Layers, BarChart3, MessageSquare, Cpu, Compass, 
  ChevronRight, Check, Play, BookOpen
} from "lucide-react";

interface MethodologyExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TahapanRiset {
  id: number;
  nama: string;
  deskripsi: string;
  input: string;
  output: string;
  tags?: string[];
  estimasiWaktu?: string;
}

const METHODOLOGIES = {
  kuantitatif: {
    nama: "Pendekatan Kuantitatif",
    sub: "Pengujian Hipotesis & Analisis Regresi",
    deskripsi: "Mengukur variabel numerik secara objektif, menyebarkan sampel acak yang representatif, menguji syarat asumsi klasik, dan melaksanakan analisis statistik inferensial (t-test, ANOVA, regresi linear) untuk menerima/menolak hipotesis empiris.",
    warnaTheme: "indigo",
    icon: BarChart3,
    tahapan: [
      {
        id: 1,
        nama: "Formulasi Teoretis & Hipotesis (H1 & H0)",
        deskripsi: "Menentukan variabel bebas (X) dan variabel terikat (Y) berdasarkan kajian teoretis kuat, lalu menyusun hipotesis kerja yang dapat diuji secara empiris.",
        input: "Kompilasi Teori BAB II & Rumusan Masalah",
        output: "Matriks Definisi Operasional & Pernyataan Hipotesis Formal",
        tags: ["Grand Theory", "Uji Parameter"],
        estimasiWaktu: "1-2 Minggu"
      },
      {
        id: 2,
        nama: "Penyusunan & Pengujian Validitas Instrumen",
        deskripsi: "Merancang instrumen kuesioner dengan skala Likert, kemudian melakukan uji coba (pilot test) pada 30 responden di luar sampel utama guna menguji Validitas (Pearson) dan Reliabilitas (Cronbach's Alpha).",
        input: "Kisi-kisi kuesioner & draf kalimat angket",
        output: "Kuesioner Terstandar (Butir Gugur disisihkan)",
        tags: ["Pearson Correlation", "Alpha > 0.6"],
        estimasiWaktu: "1 Minggu"
      },
      {
        id: 3,
        nama: "Pengambilan Sampel (Probability Sampling)",
        deskripsi: "Menentukan ukuran sampel representatif dengan rumus Slovins atau Isaac-Michael, dilanjutkan pengumpulan data riil dari responden penelitian lapangan.",
        input: "Daftar Populasi Anggota & Teknik Sampling Acak",
        output: "Data Masukan Mentah (Tabulasi Excel siap olah)",
        tags: ["Rumus Slovin", "Random Sampling"],
        estimasiWaktu: "2-3 Minggu"
      },
      {
        id: 4,
        nama: "Uji Prasyarat Asumsi Klasik",
        deskripsi: "Memastikan data bersih dan laik digunakan untuk analisis regresi parametrik dengan menelaah Uji Normalitas, Linieritas, Multikolinieritas, dan Heteroskedastisitas.",
        input: "Skor akumulatif variabel X dan Y",
        output: "Laporan Lolos Uji Karakteristik Asumsi",
        tags: ["Kolmogorov-Smirnov", "VIF & Glejser"],
        estimasiWaktu: "1 Minggu"
      },
      {
        id: 5,
        nama: "Uji Linieritas Regresi & Koefisien Determinasi",
        deskripsi: "Merumuskan model Y = a + bX, mengukur efisiensi kontribusi pengaruh (R-Square), serta memverifikasi kelaikan pengaruh bersila lewat signifikansi uji statistik t (parsial) dan uji F (simultan).",
        input: "Data yang lolos seluruh asasi klasik",
        output: "Kesimpulan Penerimaan Hipotesis & Persentase Kontribusi Pengaruh",
        tags: ["R-Square", "Signifikansi p < 0.05"],
        estimasiWaktu: "1 Minggu"
      }
    ] as TahapanRiset[]
  },
  kualitatif: {
    nama: "Pendekatan Kualitatif",
    sub: "Eksplorasi Fenomenologi & Wawancara Mendalam",
    deskripsi: "Mempelajari latar alami subjek penelitian (naturalistic), mengutamakan kedalaman data dengan melakukan tanya jawab langsung kepada narasumber kunci, mereduksi transkrip verbatim, dan menjamin keabsahan data lewat triangulasi kredibel.",
    warnaTheme: "teal",
    icon: MessageSquare,
    tahapan: [
      {
        id: 1,
        nama: "Penentuan Informan (Purposive Sampling)",
        deskripsi: "Menentukan profil narasumber ahli atau pelaku fenomena berdasarkan kriteria inklusi spesifik yang menguasai ke dalaman masalah.",
        input: "Fokus Masalah & Kriteria Informan Kunci",
        output: "Daftar Informan & Draf Lembar Persetujuan (Informed Consent)",
        tags: ["Inklusi", "Purposive Sampling"],
        estimasiWaktu: "1 Minggu"
      },
      {
        id: 2,
        nama: "Wawancara Mendalam (In-depth Interview) & Observasi",
        deskripsi: "Melaksanakan wawancara interaktif semi-terstruktur, merekam percakapan, sekaligus mencatat deskripsi makro situasi lapangan melalui catatan lapangan (field notes).",
        input: "Pedoman Wawancara Mendalam & Logbook Observasi",
        output: "Dokumen Rekaman Suara & Transkrip Verbatim (Teks Utuh)",
        tags: ["Semi-terstruktur", "Catatan Lapangan"],
        estimasiWaktu: "2-3 Minggu"
      },
      {
        id: 3,
        nama: "Reduksi Data & Pembuatan Kode Kualitatif",
        deskripsi: "Menganalisis teks verbatim baris-per-baris untuk melakukan Open Coding (labelisasi awal), Axial Coding (pengkategorian), dan Selective Coding (penyatuan tema inti).",
        input: "Halaman transkrip teks verbatim",
        output: "Matriks Excel Pengkodean (Nodes & Sub-Themes)",
        tags: ["Open Coding", "Axial Coding"],
        estimasiWaktu: "1-2 Minggu"
      },
      {
        id: 4,
        nama: "Uji Keabsahan Data (Triangulasi Tradisional)",
        deskripsi: "Memvalidasi kebenaran temuan analisis kualitatif melalui Triangulasi Sumber (crosscheck antar informan berbeda) atau Triangulasi Teknik (membandingkan wawancara vs observasi).",
        input: "Draf kategorisasi temuan awal",
        output: "Sertifikat/Log Kredibilitas Validitas Temuan",
        tags: ["Triangulasi Sumber", "Member Checking"],
        estimasiWaktu: "1 Minggu"
      },
      {
        id: 5,
        nama: "Interpretasi Konseptual & Deskripsi Tebal",
        deskripsi: "Menyusun pembahasan dengan deskripsi mendalam (thick description), mengawinkan cuplikan verbatim narasumber dengan landasan teori di Bab II untuk menarik simpulan.",
        input: "Temuan terkategori yang telah sah",
        output: "Konstruksi Narasi Pembahasan Bab IV yang Kohesif",
        tags: ["Thick Description", "Proposisi Baru"],
        estimasiWaktu: "2 Minggu"
      }
    ] as TahapanRiset[]
  },
  rnd: {
    nama: "Research & Development (R&D)",
    sub: "Pengembangan Sistem Terapan & Model Pembiasan",
    deskripsi: "Memproduksi model, produk rekayasa perangkat lunak, maupun modul pembelajaran inovatif, divalidasi keandalannya oleh pakar materi/media, serta diukur kemanfaatannya lewat siklus pengujian berulang.",
    warnaTheme: "amber",
    icon: Cpu,
    tahapan: [
      {
        id: 1,
        nama: "Analisis Kebutuhan Sistem (Need Assessment)",
        deskripsi: "Menganalisis kelemahan sistem yang ada (gap analysis) di lapangan melalui angket pra-survei kualitatif/kuantitatif untuk memastikan perlunya pembuatan produk baru.",
        input: "Data permasalahan pengguna di lapangan",
        output: "Studi Kelayakan & Dokumen Spesifikasi Kebutuhan Pengguna (SRS)",
        tags: ["Gap Analysis", "User Needs"],
        estimasiWaktu: "2 Minggu"
      },
      {
        id: 2,
        nama: "Perancangan Cetak Biru (Desain Produk/Sistem)",
        deskripsi: "Merancang skema logis, storyboard, Unified Modeling Language (UML), desain database, sketsa rangkaian hardware, atau kawat rupa (wireframe) antarmuka software.",
        input: "Datar kebutuhan operasional yang telah dirinci",
        output: "Cetak Biru Desain Cetakan / Purwarupa Kasar",
        tags: ["UML Diagram", "Figma Mockup"],
        estimasiWaktu: "2 Minggu"
      },
      {
        id: 3,
        nama: "Pengembangan Produk & Validasi Ahli",
        deskripsi: "Merealisasikan produk fisik/aplikasi tuntas, dilanjutkan penilaian kelayakan (expert judgment) oleh Ahli Materi (konten) dan Ahli Media (fungsionalitas/estetika).",
        input: "Produk versi alpha (awal) & rubrik penilaian ahli",
        output: "Skor Validitas Ahli & Lembar Rekomendasi Revisi Produk",
        tags: ["Expert Judgment", "Aiken's V Index"],
        estimasiWaktu: "2-3 Minggu"
      },
      {
        id: 4,
        nama: "Uji Coba Lapangan Skala Kecil",
        deskripsi: "Mengaplikasikan versi produk hasil revisi ahli kepada 10-15 calon pengguna akhir sesungguhnya, dievaluasi menggunakan kuesioner tingkat kepraktisan.",
        input: "Produk hasil revisi awal & angket kepraktisan",
        output: "Skor Kepraktisan & Log Masalah Fungsional Pengguna",
        tags: ["Practicality Test", "Usability Testing"],
        estimasiWaktu: "1-2 Minggu"
      },
      {
        id: 5,
        nama: "Uji Keefektifan Lapangan Luas & Produk Akhir",
        deskripsi: "Melaksanakan uji keefektifan naskah/sistem menggunakan desain kuasi eksperimen (pre-test & post-test) pada kelas kontrol vs kelas eksperimen, dilanjutkan analisis statistik t-test.",
        input: "Produk final yang andal & nilai fungsional pengguna",
        output: "Angka t-hitung Keefektifan (Keberhasilan Produk) & Berkas Diseminasi",
        tags: ["Quasi Experiment", "Paired t-Test"],
        estimasiWaktu: "2 Minggu"
      }
    ] as TahapanRiset[]
  }
} as const;

export default function MethodologyExplorerModal({ isOpen, onClose }: MethodologyExplorerModalProps) {
  const [activeMethod, setActiveMethod] = useState<"kuantitatif" | "kualitatif" | "rnd">("kuantitatif");
  const [expandedStep, setExpandedStep] = useState<number | null>(1);

  if (!isOpen) return null;

  const currentMethodData = METHODOLOGIES[activeMethod];

  // Helper colors classes based on active methodology theme
  const getThemeClasses = () => {
    switch (activeMethod) {
      case "kualitatif":
        return {
          bgAccent: "bg-teal-50/70 text-teal-900 border-teal-100",
          ringColor: "ring-teal-700",
          nodeActive: "border-teal-500 bg-white ring-2 ring-teal-500/10 shadow-md shadow-teal-500/5",
          dotActive: "bg-teal-600",
          textAccent: "text-teal-650",
          bgBadge: "bg-teal-600 text-white",
          btnActive: "bg-teal-600 text-white hover:bg-teal-700 shadow-sm shadow-teal-600/12",
          lineColor: "from-teal-500 to-teal-200"
        };
      case "rnd":
        return {
          bgAccent: "bg-amber-50/70 text-amber-900 border-amber-100",
          ringColor: "ring-amber-700",
          nodeActive: "border-amber-500 bg-white ring-2 ring-amber-500/10 shadow-md shadow-amber-500/5",
          dotActive: "bg-amber-600",
          textAccent: "text-amber-655",
          bgBadge: "bg-amber-600 text-white",
          btnActive: "bg-amber-600 text-white hover:bg-amber-700 shadow-sm shadow-amber-600/12",
          lineColor: "from-amber-500 to-amber-200"
        };
      case "kuantitatif":
      default:
        return {
          bgAccent: "bg-indigo-50/70 text-indigo-900 border-indigo-100",
          ringColor: "ring-indigo-700",
          nodeActive: "border-indigo-500 bg-white ring-2 ring-indigo-500/10 shadow-md shadow-indigo-500/5",
          dotActive: "bg-indigo-600",
          textAccent: "text-indigo-650",
          bgBadge: "bg-indigo-600 text-white",
          btnActive: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm shadow-indigo-600/12",
          lineColor: "from-indigo-500 to-indigo-200"
        };
    }
  };

  const theme = getThemeClasses();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop overlay with modern dense blur */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-white border border-slate-100 rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-scaleIn select-none">
        
        {/* Header bar */}
        <div className="p-5 md:px-7 border-b border-slate-100 flex items-center justify-between bg-slate-50/80 backdrop-blur-md">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/10">
              <GitFork className="w-5.5 h-5.5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-extrabold text-slate-900 text-base md:text-lg tracking-tight font-display">
                  Eksplorer Alur Metodologi Penelitian
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full font-sans uppercase tracking-wider">
                  Interaktif • DIKTI
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                Komparasi studi metodologis ilmiah, prasyarat input, & luaran output BAB III Skripsi Anda
              </p>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
            title="Tutup (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection Row for Methodologies */}
        <div className="bg-slate-50 border-b border-slate-100 p-2 flex gap-1 overflow-x-auto whitespace-nowrap scrollbar-none">
          <button
            onClick={() => { setActiveMethod("kuantitatif"); setExpandedStep(1); }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all cursor-pointer border ${
              activeMethod === "kuantitatif"
                ? "bg-white border-slate-205 text-indigo-600 shadow-sm font-bold font-display ring-1 ring-indigo-500/10"
                : "bg-transparent border-transparent text-slate-500 hover:text-slate-900 hover:bg-white/40"
            }`}
          >
            <BarChart3 className={`w-4 h-4 ${activeMethod === "kuantitatif" ? "text-indigo-600" : "text-slate-400"}`} />
            <span>Pendekatan Kuantitatif</span>
          </button>
          
          <button
            onClick={() => { setActiveMethod("kualitatif"); setExpandedStep(1); }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all cursor-pointer border ${
              activeMethod === "kualitatif"
                ? "bg-white border-slate-205 text-teal-600 shadow-sm font-bold font-display ring-1 ring-teal-500/10"
                : "bg-transparent border-transparent text-slate-500 hover:text-slate-900 hover:bg-white/40"
            }`}
          >
            <MessageSquare className={`w-4 h-4 ${activeMethod === "kualitatif" ? "text-teal-600" : "text-slate-400"}`} />
            <span>Pendekatan Kualitatif</span>
          </button>

          <button
            onClick={() => { setActiveMethod("rnd"); setExpandedStep(1); }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all cursor-pointer border ${
              activeMethod === "rnd"
                ? "bg-white border-slate-205 text-amber-600 shadow-sm font-bold font-display ring-1 ring-amber-500/10"
                : "bg-transparent border-transparent text-slate-500 hover:text-slate-900 hover:bg-white/40"
            }`}
          >
            <Cpu className={`w-4 h-4 ${activeMethod === "rnd" ? "text-amber-600" : "text-slate-400"}`} />
            <span>Pendekatan R&D (Sistem)</span>
          </button>
        </div>

        {/* Modal Scrollable Content split into two columns (General Description & Interactive Flowchart) */}
        <div className="flex-1 p-5 md:p-6 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-50/[0.25]">
          
          {/* Column 1: Info Sidebar card (4 Columns) */}
          <div className="lg:col-span-4 h-fit space-y-4 lg:sticky lg:top-0">
            <div className={`p-5 rounded-2xl border ${theme.bgAccent} space-y-3.5 shadow-xs`}>
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                <Compass className="w-4 h-4 text-emerald-650" />
                <span>Karakteristik Utama</span>
              </div>
              
              <div className="space-y-1">
                <h4 className="font-extrabold text-slate-900 text-sm md:text-base leading-snug">
                  {currentMethodData.nama}
                </h4>
                <p className="text-[10px] text-slate-500 font-bold tracking-wide uppercase">{currentMethodData.sub}</p>
              </div>
              
              <p className="text-xs text-slate-700 leading-relaxed font-sans font-medium bg-white/40 p-3 rounded-xl border border-white/60">
                {currentMethodData.deskripsi}
              </p>
            </div>

            <div className="bg-white border border-slate-200/60 rounded-2xl p-4.5 space-y-3 shadow-xs">
              <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider font-display flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-550" />
                Saran Pembawaan (BAB III)
              </h5>
              <p className="text-[11px] text-slate-600 leading-relaxed font-sans font-medium">
                Gunakan visualisasi diagram di samping sebagai fondasi penyusunan prosedur pelaksanaan riset di <strong>BAB III (Metodologi Penelitian)</strong>. 
                Pastikan instrumen, teknik sampling, dan analisis data selaras dengan panduan ini untuk kelancaran persetujuan dosen pembimbing.
              </p>
            </div>

            <div className="bg-indigo-950 text-white rounded-2xl p-4.5 space-y-2.5 shadow-sm relative overflow-hidden">
              <div className="absolute right-0 bottom-0 translate-x-3 translate-y-3 opacity-10">
                <GitFork className="w-24 h-24 text-white" />
              </div>
              <h5 className="font-bold text-amber-300 text-xs uppercase tracking-wider font-display flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-amber-300" />
                Validasi Standar
              </h5>
              <p className="text-[11px] text-slate-350 leading-relaxed font-sans">
                Setiap output langkah kerja di samping diakui oleh penguji eksternal sebagai poin orisinalitas riset akademik mahasiwa.
              </p>
            </div>
          </div>

          {/* Column 2: Flowchart Visual (8 Columns) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-display">Aliran Pekerjaan Sistematis:</h4>
              <span className="text-[10px] text-slate-500 font-bold">Tekan baris untuk meluaskan draf</span>
            </div>
            
            <div className="flex flex-col items-center">
              {currentMethodData.tahapan.map((tahap, idx) => {
                const isOpen = expandedStep === tahap.id;
                
                return (
                  <div key={tahap.id} className="w-full flex flex-col items-center">
                    
                    {/* Node block with fine gradients & shadow elevations */}
                    <div
                      onClick={() => setExpandedStep(isOpen ? null : tahap.id)}
                      className={`w-full border rounded-2xl p-4 transition-all duration-300 cursor-pointer ${
                        isOpen
                          ? `${theme.nodeActive} translate-x-0.5`
                          : "border-slate-200 bg-white hover:bg-slate-50/50 hover:border-slate-300 shadow-xs hover:-translate-y-0.5"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3.5 min-w-0 flex-1">
                          {/* Circular Badge */}
                          <span className={`w-8.5 h-8.5 rounded-xl text-xs flex items-center justify-center font-mono font-extrabold shrink-0 transition-all ${
                            isOpen ? theme.bgBadge : "bg-slate-100 text-slate-600 border border-slate-200/50"
                          }`}>
                            0{tahap.id}
                          </span>
                          
                          <div className="min-w-0 flex-1">
                            <h5 className="font-extrabold text-slate-900 text-xs md:text-sm">
                              {tahap.nama}
                            </h5>
                            {!isOpen ? (
                              <p className="text-[11px] text-slate-500 truncate mt-0.5 font-sans font-medium">
                                {tahap.deskripsi}
                              </p>
                            ) : (
                              <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                                {tahap.tags?.map((tag, tIdx) => (
                                  <span key={tIdx} className="text-[9px] font-bold px-2 py-0.5 bg-slate-100 text-slate-600 rounded border border-slate-200/60 font-mono">
                                    {tag}
                                  </span>
                                ))}
                                {tahap.estimasiWaktu && (
                                  <span className="text-[9px] font-bold px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded border border-indigo-100/50 font-sans">
                                    ⏱️ {tahap.estimasiWaktu}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="shrink-0 flex items-center gap-1 select-none">
                          <span className={`text-[10px] font-bold transition-colors ${isOpen ? theme.textAccent : "text-slate-400"}`}>
                            {isOpen ? "Sembunyikan" : "Buka Detail"}
                          </span>
                          <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isOpen ? "rotate-90 " + theme.textAccent : "text-slate-400"}`} />
                        </div>
                      </div>

                      {/* Expanded Section Details */}
                      {isOpen && (
                        <div className="mt-4 pt-4 border-t border-slate-100 space-y-4 animate-fadeIn">
                          <p className="text-xs md:text-sm text-slate-650 leading-relaxed font-sans font-medium">
                            {tahap.deskripsi}
                          </p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                            {/* Input block */}
                            <div className="bg-slate-50 border border-slate-200/80 p-3.5 rounded-xl flex gap-3 items-start">
                              <div className="p-1.5 bg-slate-200 text-slate-700 rounded-lg shrink-0 mt-0.5">
                                <FileInput className="w-4 h-4 text-slate-600" />
                              </div>
                              <div>
                                <span className="block text-[9px] font-bold uppercase text-slate-500 tracking-wider font-display">Prasyarat Masuk (Input Data):</span>
                                <span className="font-sans text-xs text-slate-705 leading-relaxed font-semibold mt-1 block">{tahap.input}</span>
                              </div>
                            </div>
                            
                            {/* Output block */}
                            <div className="bg-emerald-50/60 border border-emerald-200 p-3.5 rounded-xl flex gap-3 items-start">
                              <div className="p-1.5 bg-emerald-100 text-emerald-705 rounded-lg shrink-0 mt-0.5">
                                <FileOutput className="w-4 h-4 text-emerald-600" />
                              </div>
                              <div>
                                <span className="block text-[9px] font-bold uppercase text-emerald-650 tracking-wider font-display">Hasil Validasi Nyata (Output):</span>
                                <span className="font-sans text-xs text-emerald-950 leading-relaxed font-bold mt-1 block">{tahap.output}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Node Connector Line with smooth pulse or gradient */}
                    {idx < currentMethodData.tahapan.length - 1 && (
                      <div className="py-2.5 flex flex-col items-center">
                        <div className={`w-[3px] h-7 bg-gradient-to-b ${theme.lineColor}`}></div>
                        <div className={`w-5 h-5 rounded-full border border-slate-250 flex items-center justify-center bg-white -mt-2 -mb-2 z-10 shadow-xxs`}>
                          <ArrowDown className={`w-3 h-3 ${theme.textAccent}`} />
                        </div>
                      </div>
                    )}

                  </div>
                );
              })}
            </div>
          </div>

          {/* Full Width Row: Comparative Analysis of Methodologies (lg:col-span-12) */}
          <div className="lg:col-span-12 mt-4 pt-6 border-t border-slate-200/60 space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-6 bg-indigo-600 rounded-full" />
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm md:text-base font-display">
                  Metriks Perbandingan Komparatif Metodologi Utama
                </h4>
                <p className="text-xs text-slate-500 font-medium">Analisis kelebihan, kekurangan, dan indikasi waktu pengadopsian setiap rumpun metode.</p>
              </div>
            </div>

            {/* Desktop Full-fledged Table & Mobile Cards */}
            <div className="hidden md:block overflow-hidden border border-slate-200 rounded-2xl bg-white shadow-xs">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50/75 border-b border-slate-200 text-slate-900 font-extrabold font-display">
                    <th className="p-4 w-3/12">Metode Penelitian</th>
                    <th className="p-4 w-4/12 text-emerald-800 bg-emerald-50/10">Kelebihan (Kekuatan Utama)</th>
                    <th className="p-4 w-3/12 text-rose-800 bg-rose-50/10">Kekurangan (Batasan Teknis)</th>
                    <th className="p-4 w-2/12">Kapan Tepat Digunakan?</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-150">
                  <tr className="hover:bg-slate-50/30 transition-colors">
                    <td className="p-4 align-top">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shrink-0" />
                        <div>
                          <strong className="text-[13px] text-slate-850 font-display block">Kuantitatif</strong>
                          <span className="text-[10px] text-indigo-600 font-mono font-bold block mt-0.5">UJI STATISTIK FORMAL</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 align-top text-slate-650 font-medium leading-relaxed bg-emerald-50/[0.04]">
                      <ul className="list-disc pl-4 space-y-1">
                        <li>Sangat <strong>objektif</strong> dan tingkat reliabilitas hasil tinggi.</li>
                        <li>Dapat dianalisis dengan instrumen regresi bervariabel majemuk.</li>
                        <li>Memiliki daya <strong>generalisasi kuat</strong> ke seluruh populasi induk.</li>
                        <li>Pembuktian hipotesis transparan melalui pengujian angka statistika.</li>
                      </ul>
                    </td>
                    <td className="p-4 align-top text-slate-650 font-medium leading-relaxed bg-rose-50/[0.04]">
                      <ul className="list-disc pl-4 space-y-1">
                        <li>Fokus angka seringkali <strong>mengabaikan konteks sosial mendalam</strong>.</li>
                        <li>Instrumen kuesioner kaku, tidak fleksibel terhadap kejutan baru.</li>
                        <li>Butuh ukuran <strong>sampel minimal</strong> yang besar (Slovins/Isaac).</li>
                      </ul>
                    </td>
                    <td className="p-4 align-top text-slate-700 font-bold leading-normal font-sans text-[11px]">
                      Ketika didukung teori mapan yang ingin <strong>diverifikasi</strong>, menguji efisiensi asosiasi pengaruh kausalitas variabel, atau mereduksi bias subjektif peneliti secara penuh.
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/30 transition-colors">
                    <td className="p-4 align-top">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-teal-500 shrink-0" />
                        <div>
                          <strong className="text-[13px] text-slate-850 font-display block">Kualitatif</strong>
                          <span className="text-[10px] text-teal-600 font-mono font-bold block mt-0.5">EKSPLORASI NATURALISTIK</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 align-top text-slate-650 font-medium leading-relaxed bg-emerald-50/[0.04]">
                      <ul className="list-disc pl-4 space-y-1">
                        <li>Menghasilkan pemahaman mendalam (<strong>Thick Description</strong>).</li>
                        <li>Penuh fleksibilitas operasional mengikuti respon informan di lapangan.</li>
                        <li>Unggul dalam <strong>menjelaskan alasan kualitatif</strong> di balik fenomena rumit.</li>
                      </ul>
                    </td>
                    <td className="p-4 align-top text-slate-650 font-medium leading-relaxed bg-rose-50/[0.04]">
                      <ul className="list-disc pl-4 space-y-1">
                        <li>Rentang risiko bias subjektivitas peneliti relatif tinggi.</li>
                        <li><strong>Tidak memiliki daya generalisasi</strong> luas (hanya interpretasi lokal).</li>
                        <li>Proses pengolahan kode verbatim teks sangat menguras waktu.</li>
                      </ul>
                    </td>
                    <td className="p-4 align-top text-slate-700 font-bold leading-normal font-sans text-[11px]">
                      Ketika meneliti <strong>fenomena sosial kontemporer baru</strong>, membutuhkan pemahaman mendalam individu (narasumber unik), atau membangun teori konstruktivis baru.
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/30 transition-colors">
                    <td className="p-4 align-top">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                        <div>
                          <strong className="text-[13px] text-slate-850 font-display block">R&D (Sistem)</strong>
                          <span className="text-[10px] text-amber-600 font-mono font-bold block mt-0.5">PURWARUPA SOLUTIF NYATA</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 align-top text-slate-650 font-medium leading-relaxed bg-emerald-50/[0.04]">
                      <ul className="list-disc pl-4 space-y-1">
                        <li>Menghasilkan <strong>produk fungsional nyata</strong> (software/hardware/modul).</li>
                        <li>Menjawab secara jitu kesenjangan fungsional (gap analisis) praktis.</li>
                        <li>Kombinasi teori dan penerapan instrumen desain yang solutif.</li>
                        <li>Didukung validasi ahli sehingga produk dijamin andal.</li>
                      </ul>
                    </td>
                    <td className="p-4 align-top text-slate-650 font-medium leading-relaxed bg-rose-50/[0.04]">
                      <ul className="list-disc pl-4 space-y-1">
                        <li>Membutuhkan <strong>siklus berulang</strong> yang memakan tempo lama.</li>
                        <li>Memerlukan keahlian ganda (pakar penilai materi & media fungsional).</li>
                        <li>Biaya dan kebutuhan sumber daya rekayasa sistem tergolong tinggi.</li>
                      </ul>
                    </td>
                    <td className="p-4 align-top text-slate-700 font-bold leading-normal font-sans text-[11px]">
                      Ketika hendak <strong>menciptakan, meredesain, atau menguji tingkat keandalan</strong> dari produk anyar, media instruksional, platform software terapan, maupun instrumen praktis.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Mobile Cards View fallback */}
            <div className="md:hidden space-y-4">
              {/* Kuantitatif mobile */}
              <div className="p-4.5 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shrink-0" />
                  <strong className="text-sm text-slate-900 font-display">Metode Kuantitatif</strong>
                </div>
                <div className="space-y-2.5 text-xs">
                  <div className="p-3 bg-emerald-50/20 border border-emerald-100 rounded-xl">
                    <span className="text-[10px] font-bold text-emerald-800 uppercase block mb-1 font-display">Kelebihan:</span>
                    <span className="text-slate-650 font-medium">Objektif, hasil andal secara empiris, dapat digeneralisasi luas secara transparan dengan uji statistik terkemuka.</span>
                  </div>
                  <div className="p-3 bg-rose-50/20 border border-rose-100 rounded-xl">
                    <span className="text-[10px] font-bold text-rose-800 uppercase block mb-1 font-display">Kekurangan:</span>
                    <span className="text-slate-650 font-medium font-sans">Kurang mendalam menangkap konteks sosial murni, kuesioner kaku, butuh volume responden minimal yang besar.</span>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                    <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1 font-display">Kapan Digunakan:</span>
                    <span className="text-slate-700 font-bold">Menguji teori teoretis, menghitung relasi kausal variabel terukur.</span>
                  </div>
                </div>
              </div>

              {/* Kualitatif mobile */}
              <div className="p-4.5 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-500 shrink-0" />
                  <strong className="text-sm text-slate-900 font-display">Metode Kualitatif</strong>
                </div>
                <div className="space-y-2.5 text-xs">
                  <div className="p-3 bg-emerald-50/20 border border-emerald-100 rounded-xl">
                    <span className="text-[10px] font-bold text-emerald-800 uppercase block mb-1 font-display">Kelebihan:</span>
                    <span className="text-slate-650 font-medium">Pemahaman mendalam, fleksibilitas tinggi terhadap latar riset alami, akurat mendeteksi transkrip verbatim.</span>
                  </div>
                  <div className="p-3 bg-rose-50/20 border border-rose-100 rounded-xl">
                    <span className="text-[10px] font-bold text-rose-800 uppercase block mb-1 font-display">Kekurangan:</span>
                    <span className="text-slate-650 font-medium">Risiko bias subjektivitas tinggi, tidak memiliki kekuatan representasi generalisasi populasi luas.</span>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                    <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1 font-display">Kapan Digunakan:</span>
                    <span className="text-slate-700 font-bold">Mengeksplorasi isu baru, menggali emosi/perspektif informan unik.</span>
                  </div>
                </div>
              </div>

              {/* R&D mobile */}
              <div className="p-4.5 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                  <strong className="text-sm text-slate-900 font-display">Research & Development (R&D)</strong>
                </div>
                <div className="space-y-2.5 text-xs">
                  <div className="p-3 bg-emerald-50/20 border border-emerald-100 rounded-xl">
                    <span className="text-[10px] font-bold text-emerald-800 uppercase block mb-1 font-display">Kelebihan:</span>
                    <span className="text-slate-650 font-medium">Solutif menghasilkan output sistem/aplikasi nyata, teruji oleh tim validator ahli sebelum uji coba lapangan.</span>
                  </div>
                  <div className="p-3 bg-rose-50/20 border border-rose-100 rounded-xl">
                    <span className="text-[10px] font-bold text-rose-800 uppercase block mb-1 font-display">Kekurangan:</span>
                    <span className="text-slate-650 font-medium font-sans">Proses uji lapang berulang memakan tempo lama dan biaya pemrosesan hardware/software tinggi.</span>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                    <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1 font-display">Kapan Digunakan:</span>
                    <span className="text-slate-700 font-bold">Menciptakan, merancang fungsional, atau menguji kelayakan sistem baru.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer bar */}
        <div className="p-4 px-6 border-t border-slate-100 bg-slate-50/80 backdrop-blur-md flex items-center justify-between text-[11px] text-slate-400">
          <span className="font-medium">Skripsi Generator • Sistem Analisis Prosedural Akademik</span>
          <button 
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all cursor-pointer text-xs shadow-md shadow-slate-900/10 active:scale-98"
          >
            Tutup Dialog
          </button>
        </div>

      </div>
    </div>
  );
}

