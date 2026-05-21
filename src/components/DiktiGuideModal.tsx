import React, { useState } from "react";
import { 
  X, BookOpen, Layers, CheckCircle2, AlertCircle, FileText, Bookmark, 
  Sparkles, Award, Scale, FileSpreadsheet, Percent, ExternalLink
} from "lucide-react";

interface DiktiGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DiktiGuideModal({ isOpen, onClose }: DiktiGuideModalProps) {
  const [activeTab, setActiveTab] = useState<"format" | "struktur" | "sitasi" | "sinta">("format");

  if (!isOpen) return null;

  const tabs = [
    { id: "format", label: "Format Standar", icon: FileText },
    { id: "struktur", label: "Struktur Bab", icon: Layers },
    { id: "sitasi", label: "Sitasi & Turnitin", icon: Bookmark },
    { id: "sinta", label: "Jurnal & SINTA", icon: Award },
  ] as const;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop overlay with modern dense blur */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-3xl bg-white border border-slate-100 rounded-3xl shadow-2xl flex flex-col max-h-[88vh] overflow-hidden animate-scaleIn select-none">
        
        {/* Header */}
        <div className="p-5 md:px-7 border-b border-slate-100 flex items-center justify-between bg-slate-50/80 backdrop-blur-md">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 bg-indigo-650 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-650/10">
              <BookOpen className="w-5.5 h-5.5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-extrabold text-slate-900 text-base md:text-lg tracking-tight font-display">
                  Panduan Penulisan Skripsi & Karya Ilmiah
                </h3>
                <span className="text-[10px] font-bold px-2.5 py-0.5 bg-indigo-100 text-indigo-700 rounded-full font-sans uppercase tracking-wider">
                  Standar DIKTI
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                Kompatibilitas formal & regulasi pengarsipan RAMA Repositori Pendidikan Tinggi RI
              </p>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-805 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
            title="Tutup (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons Navigation - Polished Segmented Control look */}
        <div className="flex border-b border-slate-100 overflow-x-auto whitespace-nowrap p-2 bg-slate-50/40 gap-1.5 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-semibold transition-all relative cursor-pointer rounded-xl border ${
                  isActive 
                    ? "bg-white text-indigo-650 font-bold shadow-sm border-slate-200/60 ring-1 ring-indigo-500/5" 
                    : "border-transparent text-slate-500 hover:text-slate-900 hover:bg-white/40"
                }`}
              >
                <Icon className={`w-4 h-4 transition-colors ${isActive ? "text-indigo-600" : "text-slate-400"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6 bg-slate-50/[0.15]">

          {/* ACTIVE TAB: FORMAT STANDARD */}
          {activeTab === "format" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-4.5 flex gap-3.5 items-start">
                <div className="p-2 bg-indigo-100/80 rounded-xl text-indigo-705 shrink-0 mt-0.5 animate-pulse">
                  <Sparkles className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-indigo-955 uppercase tracking-wider font-display">Tingkat Kelulusan Validasi Tata Letak</h4>
                  <p className="text-xs text-indigo-900 leading-relaxed mt-1 font-medium">
                    DIKTI mewajibkan standarisasi format agar berkas PDF skripsi Anda lolos analisis kecocokan sistem repositori RAMA DIKTI secara nasional.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="border border-slate-200/80 bg-white rounded-2xl p-5 space-y-3.5 shadow-xs">
                  <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider font-display border-b border-slate-100 pb-2.5 flex items-center gap-2">
                    <Scale className="w-4 h-4 text-emerald-600" />
                    Batas Margin & Ukuran Kertas
                  </h5>
                  <ul className="space-y-2.5 text-xs text-slate-700">
                    <li className="flex justify-between py-1 border-b border-dashed border-slate-200/60 items-center">
                      <span className="font-medium text-slate-600">Ukuran Kertas</span>
                      <span className="font-mono font-bold bg-slate-50 px-2 py-0.5 rounded border border-slate-200">A4 (80/100 gram)</span>
                    </li>
                    <li className="flex justify-between py-1 border-b border-dashed border-slate-200/60 items-center">
                      <span className="font-medium text-slate-605">Margin Kiri (Pemberatan)</span>
                      <span className="font-mono font-extrabold text-indigo-650 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">4.0 cm</span>
                    </li>
                    <li className="flex justify-between py-1 border-b border-dashed border-slate-200/60 items-center">
                      <span className="font-medium text-slate-605">Margin Atas (Top)</span>
                      <span className="font-mono font-bold">4.0 cm</span>
                    </li>
                    <li className="flex justify-between py-1 border-b border-dashed border-slate-200/60 items-center">
                      <span className="font-medium text-slate-605">Margin Kanan (Right)</span>
                      <span className="font-mono font-bold">3.0 cm</span>
                    </li>
                    <li className="flex justify-between py-1 items-center">
                      <span className="font-medium text-slate-605">Margin Bawah (Bottom)</span>
                      <span className="font-mono font-bold">3.0 cm</span>
                    </li>
                  </ul>
                  <p className="text-[10px] text-slate-450 leading-normal italic mt-3 bg-slate-50 p-2.5 rounded-lg border border-slate-150">
                    *Margin kiri berukuran 4cm disiapkan khusus sebagai kompensasi penjilidan bersampul tebal (hard cover) agar teks tidak tertutup.
                  </p>
                </div>

                <div className="border border-slate-200/80 bg-white rounded-2xl p-5 space-y-3.5 shadow-xs">
                  <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider font-display border-b border-slate-100 pb-2.5 flex items-center gap-2">
                    <FileSpreadsheet className="w-4 h-4 text-indigo-655" />
                    Karakter Tipografi & Halaman
                  </h5>
                  <ul className="space-y-2.5 text-xs text-slate-700">
                    <li className="flex justify-between py-1 border-b border-dashed border-slate-200/60 items-center">
                      <span className="font-medium text-slate-605">Font Utama Tubuh</span>
                      <span className="font-mono font-bold bg-slate-50 px-2 py-0.5 rounded border border-slate-200">Times New Roman 12 pt</span>
                    </li>
                    <li className="flex justify-between py-1 border-b border-dashed border-slate-200/60 items-center">
                      <span className="font-medium text-slate-605">Judul BAB Formal</span>
                      <span className="font-mono font-bold">TNR 14 pt (Tebal & KAPITAL)</span>
                    </li>
                    <li className="flex justify-between py-1 border-b border-dashed border-slate-200/60 items-center">
                      <span className="font-medium text-slate-605">Jarak Spasi Baris</span>
                      <span className="font-mono font-bold bg-slate-50 px-2 py-0.5 rounded border border-slate-200">2.0pt (Double Spacing)</span>
                    </li>
                    <li className="flex justify-between py-1 border-b border-dashed border-slate-200/60 items-center">
                      <span className="font-medium text-slate-605">Halaman Awal Naskah</span>
                      <span className="font-mono font-bold text-slate-600">Romawi Kecil (i, ii, iii, dst)</span>
                    </li>
                    <li className="flex justify-between py-1 items-center">
                      <span className="font-medium text-slate-605">Halaman Isi Naskah</span>
                      <span className="font-mono font-bold text-slate-800">Angka Arab (1, 2, 3, dst)</span>
                    </li>
                  </ul>
                  <p className="text-[10px] text-slate-450 leading-normal italic mt-3 bg-slate-50 p-2.5 rounded-lg border border-slate-150">
                    *Halaman baru wajib meletakkan nomor di tengah bawah halaman, dilanjutkan ke pojok kanan atas untuk halaman seterusnya.
                  </p>
                </div>
              </div>

              <div className="bg-white border border-slate-200/70 rounded-2xl p-5 space-y-3.5 shadow-xs">
                <h5 className="font-bold text-slate-905 text-xs uppercase tracking-wider font-display flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-605" />
                  Struktur Anatomi Naskah Wajib
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-705">
                  <div className="flex gap-2.5 items-center p-2.5 bg-slate-50/70 rounded-xl border border-slate-150">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-medium text-slate-800">Halaman Sampul & Logo Universitas</span>
                  </div>
                  <div className="flex gap-2.5 items-center p-2.5 bg-slate-50/70 rounded-xl border border-slate-150">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-medium text-slate-800">Persetujuan Dosen Pembimbing</span>
                  </div>
                  <div className="flex gap-2.5 items-center p-2.5 bg-slate-50/70 rounded-xl border border-slate-150">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-medium text-slate-800">Pernyataan Pakta Keaslian (Bermeterai)</span>
                  </div>
                  <div className="flex gap-2.5 items-center p-2.5 bg-slate-50/70 rounded-xl border border-slate-150">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-medium text-slate-800">Abstrak Dwibahasa (Indo & English)</span>
                  </div>
                  <div className="flex gap-2.5 items-center p-2.5 bg-slate-50/70 rounded-xl border border-slate-150">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-medium text-slate-800">Bagan Daftar Isi, Daftar Tabel & Gambar</span>
                  </div>
                  <div className="flex gap-2.5 items-center p-2.5 bg-slate-50/70 rounded-xl border border-slate-150">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-medium text-slate-800">Daftar Pustaka & Berkas Lampiran Lab</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ACTIVE TAB: STRUKTUR BAB */}
          {activeTab === "struktur" && (
            <div className="space-y-4 animate-fadeIn">
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                <div className="bg-slate-900 text-white p-4.5">
                  <h4 className="font-extrabold font-display text-sm tracking-wide">Sistematika Struktur Bab I s/d Bab V</h4>
                  <p className="text-[11px] text-slate-300 mt-0.5">Komponen esensial yang menjadi parameter penilaian utama tim penguji</p>
                </div>
                <div className="divide-y divide-slate-100 bg-white">
                  
                  {/* BAB 1 */}
                  <div className="p-4.5 flex gap-4.5 items-start hover:bg-slate-50/60 transition-all">
                    <span className="w-16 text-center font-mono text-[10px] font-extrabold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-1.5 rounded-lg shrink-0">
                      BAB I
                    </span>
                    <div className="flex-grow space-y-1">
                      <h5 className="font-bold text-slate-900 text-xs md:text-sm">PENDAHULUAN (Landasan Isu Utama)</h5>
                      <p className="text-xs text-slate-650 leading-relaxed font-sans font-medium">
                        Ulasan latar belakang harus berpola deduktif (top-down), memuat bukti empiris awal (preliminary study) berupa data numerik/fakta lapangan, disusul rumusan masalah terperinci, batasan riset, dan manfaat akademik yang jelas.
                      </p>
                    </div>
                  </div>

                  {/* BAB 2 */}
                  <div className="p-4.5 flex gap-4.5 items-start hover:bg-slate-50/60 transition-all">
                    <span className="w-16 text-center font-mono text-[10px] font-extrabold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-1.5 rounded-lg shrink-0">
                      BAB II
                    </span>
                    <div className="flex-grow space-y-1">
                      <h5 className="font-bold text-slate-900 text-xs md:text-sm">TINJAUAN PUSTAKA (Sintesis Teoretis)</h5>
                      <p className="text-xs text-slate-650 leading-relaxed font-sans font-medium">
                        Menguraikan teori primer (grand theories) pendukung variabel, disusul matriks literatur empiris (minimal 10 jurnal referensi terakreditasi bersila 5 tahun terakhir), kerangka konseptual visual, dan hipotesis operasional.
                      </p>
                    </div>
                  </div>

                  {/* BAB 3 */}
                  <div className="p-4.5 flex gap-4.5 items-start hover:bg-slate-50/60 transition-all">
                    <span className="w-16 text-center font-mono text-[10px] font-extrabold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-1.5 rounded-lg shrink-0">
                      BAB III
                    </span>
                    <div className="flex-grow space-y-1">
                      <h5 className="font-bold text-slate-900 text-xs md:text-sm">METODOLOGI PENELITIAN (Arsitektur Riset)</h5>
                      <p className="text-xs text-slate-650 leading-relaxed font-sans font-medium">
                        Penetapan kerangka kerja logis: instrumen riset (skala/kuesioner), teknik sampling (slovin/purposive), skema reliabilitas (cronbach's alpha), langkah pengolahan data statistik, serta alur prapelaksanaan eksperimen lapangan.
                      </p>
                    </div>
                  </div>

                  {/* BAB 4 */}
                  <div className="p-4.5 flex gap-4.5 items-start hover:bg-slate-50/60 transition-all">
                    <span className="w-16 text-center font-mono text-[10px] font-extrabold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-1.5 rounded-lg shrink-0">
                      BAB IV
                    </span>
                    <div className="flex-grow space-y-1">
                      <h5 className="font-bold text-slate-900 text-xs md:text-sm">HASIL & PEMBAHASAN (Katalisator Temuan)</h5>
                      <p className="text-xs text-slate-650 leading-relaxed font-sans font-medium">
                        Bukan sekadar memindah diagram tabel SPSS, naskah wajib menyajikan sintesis intelektual mandiri: mengomparasikan draf temuan dengan teori-teori Bab II serta memberikan argumentasi logis atas anomali data riset yang didapat.
                      </p>
                    </div>
                  </div>

                  {/* BAB 5 */}
                  <div className="p-4.5 flex gap-4.5 items-start hover:bg-slate-50/60 transition-all">
                    <span className="w-16 text-center font-mono text-[10px] font-extrabold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-1.5 rounded-lg shrink-0">
                      BAB V
                    </span>
                    <div className="flex-grow space-y-1">
                      <h5 className="font-bold text-slate-900 text-xs md:text-sm">PENUTUP (simpulan Berorientasi Solusi)</h5>
                      <p className="text-xs text-slate-650 leading-relaxed font-sans font-medium">
                        Menjawab tepat semua pertanyaan penelitian di Bab I secara lugas, didukung oleh usulan saran aplikatif (saran kebijakan bagi instansi riset dan batasan riset bagi peneliti selanjutnya).
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* ACTIVE TAB: SITASI & TURNITIN */}
          {activeTab === "sitasi" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-amber-50/70 border border-amber-200/50 rounded-2xl p-4.5 flex gap-3.5 items-start text-amber-900 shadow-xs">
                <AlertCircle className="w-5.5 h-5.5 text-amber-600 shrink-0 mt-0.5 animate-pulse" />
                <div>
                  <h4 className="text-xs font-bold font-display uppercase tracking-wider text-amber-955">Aturan Plagiarisme Ketat (Turnitin)</h4>
                  <p className="text-xs leading-relaxed mt-1 font-medium text-amber-955">
                    DIKTI mensyaratkan tingkat kesamaan (similarity index) pada naskah skripsi komprehensif adalah <strong>maksimal 20% s/d 25%</strong>. Angka kecocokan melebihi ini digolongkan kegagalan validasi naskah orisinal.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3.5 shadow-xs">
                  <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider font-display flex items-center gap-1.5">
                    <Bookmark className="w-4.5 h-4.5 text-indigo-600" />
                    Manajemen Referensi (MANDATORY)
                  </h5>
                  <p className="text-xs text-slate-550 leading-relaxed font-medium">
                    Ketua sidang melarang pengetikan daftar pustaka secara manual karena rentan cacat susun. Gunakan perangkat lunak sitasi terintegrasi:
                  </p>
                  <ul className="space-y-2 text-xs font-semibold text-slate-700">
                    <li className="flex items-center gap-2.5 p-2 bg-slate-50 rounded-lg border border-slate-100">
                      <div className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" />
                      <span>Mendeley Desktop / Reference Manager</span>
                    </li>
                    <li className="flex items-center gap-2.5 p-2 bg-slate-50 rounded-lg border border-slate-100">
                      <div className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                      <span>Zotero Connector (Open Source)</span>
                    </li>
                    <li className="flex items-center gap-2.5 p-2 bg-slate-50 rounded-lg border border-slate-100">
                      <div className="w-2 h-2 rounded-full bg-amber-605 shrink-0" />
                      <span>EndNote (Fasilitas Berbayar Kampus)</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3.5 shadow-xs">
                  <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider font-display flex items-center gap-1.5">
                    <FileText className="w-4.5 h-4.5 text-indigo-600" />
                    Standardisasi Gaya Sitasi
                  </h5>
                  <p className="text-xs text-slate-550 leading-relaxed font-medium">
                    Format penulisan ditentukan oleh konsorsium keilmuan fakultas masing-masing. Panduan umum merujuk ke:
                  </p>
                  <ul className="space-y-2.5 text-xs">
                    <li className="py-2 border-b border-slate-100 flex justify-between items-center bg-slate-50/30 px-2 rounded-lg">
                      <span className="font-bold text-slate-800">APA 7th Edition</span>
                      <span className="font-mono text-[10px] text-indigo-700 bg-indigo-50 border border-indigo-100 px-1.5 py-0.5 rounded font-extrabold">Sosial, Bisnis, Humaniora</span>
                    </li>
                    <li className="py-2 border-b border-slate-100 flex justify-between items-center bg-slate-50/30 px-2 rounded-lg">
                      <span className="font-bold text-slate-800">IEEE Style</span>
                      <span className="font-mono text-[10px] text-teal-700 bg-teal-50 border border-teal-100 px-1.5 py-0.5 rounded font-extrabold">Teknik, IT, Informatika</span>
                    </li>
                    <li className="py-2 flex justify-between items-center bg-slate-50/30 px-2 rounded-lg">
                      <span className="font-bold text-slate-800">Harvard Style</span>
                      <span className="font-mono text-[10px] text-amber-700 bg-amber-50 border border-amber-100 px-1.5 py-0.5 rounded font-extrabold">Ekonomi, Biologi, Kedokteran</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* ACTIVE TAB: JURNAL & SINTA */}
          {activeTab === "sinta" && (
            <div className="space-y-5 animate-fadeIn">
              <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl p-5.5 shadow-md space-y-2.5 relative overflow-hidden">
                <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 opacity-5">
                  <Award className="w-36 h-36" />
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5.5 h-5.5 text-amber-400 shrink-0" />
                  <h4 className="font-extrabold font-display text-xs uppercase tracking-widest text-amber-305">Bebas Sidang dengan Rekognisi Jurnal SINTA</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans font-medium">
                  Berdasarkan imbauan akselerasi lulusan mahasiswa, DIKTI membolehkan program **rekognisi tugas akhir** di mana mahasiswa dibebaskan dari ujian sidang skripsi asalkan karya ilmiah terakreditasi minimal SINTA 2 telah dipublikasikan.
                </p>
              </div>

              <div className="space-y-4">
                <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider font-display">Tingkatan Akreditasi Jurnal Nasional (SINTA)</h5>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  <div className="border border-indigo-150 bg-indigo-50/20 p-4 rounded-xl text-center space-y-1.5 shadow-xs">
                    <span className="text-[10px] font-extrabold text-indigo-755 bg-indigo-100 rounded-md px-2 py-0.5 font-mono">SINTA 1 & 2</span>
                    <h6 className="font-extrabold text-slate-805 text-xs pt-1">Internasional / Reputasi Tinggi</h6>
                    <p className="text-[10px] text-slate-500 leading-relaxed">
                      Sesuai standar indeks SCOPUS. Memberikan predikat lulus otomatis di perguruan tinggi terkemuka.
                    </p>
                  </div>

                  <div className="border border-slate-200 bg-white p-4 rounded-xl text-center space-y-1.5 shadow-xs">
                    <span className="text-[10px] font-extrabold text-slate-700 bg-slate-100 rounded-md px-2 py-0.5 font-mono">SINTA 3 & 4</span>
                    <h6 className="font-extrabold text-slate-805 text-xs pt-1">Nasional Unggulan</h6>
                    <p className="text-[10px] text-slate-500 leading-relaxed">
                      Wajib menyertakan pembaharuan ilmiah (novelty). Biasa dijadikan prasyarat kelulusan predikat Cumlaude.
                    </p>
                  </div>

                  <div className="border border-slate-205 bg-white p-4 rounded-xl text-center space-y-1.5 shadow-xs">
                    <span className="text-[10px] font-extrabold text-teal-700 bg-teal-50 rounded-md px-2 py-0.5 font-mono">SINTA 5 & 6</span>
                    <h6 className="font-extrabold text-slate-805 text-xs pt-1">Nasional Rintisan</h6>
                    <p className="text-[10px] text-slate-500 leading-relaxed">
                      Target paling realistis bagi lulusan sarjana pemula (skripsi survei deskriptif / pengujian terapan biasa).
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-xs text-slate-700 space-y-3 shadow-xs">
                  <h5 className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-indigo-650" />
                    Asas Konversi Skripsi Menjadi Naskah Jurnal Ringkas:
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    <div className="p-3 bg-white rounded-xl border border-slate-200/60 shadow-xxs">
                      <span className="text-indigo-650 font-bold font-mono text-xs block mb-1">01. Rapor Ringkasan</span>
                      <p className="text-[10px] text-slate-500 leading-normal">Menciutkan draf 120 halaman menjadi file docx padat sepanjang 8-15 halaman saja.</p>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200/60 shadow-xxs">
                      <span className="text-emerald-650 font-bold font-mono text-xs block mb-1">02. Template OJS</span>
                      <p className="text-[10px] text-slate-500 leading-normal">Unduh draf layout "gaya selingkung" langsung di Open Journal System portal riset tujuan.</p>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200/60 shadow-xxs">
                      <span className="text-amber-655 font-bold font-mono text-xs block mb-1">03. Tekan Bahasan</span>
                      <p className="text-[10px] text-slate-505 leading-normal">Pangkas ulasan kajian teori usang, tonjolkan novelty riset & komparasi temuan riil Anda.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 px-6 border-t border-slate-100 bg-slate-50/80 backdrop-blur-md flex items-center justify-between text-[11px] text-slate-400">
          <span className="font-medium">Kementerian Pendidikan Tinggi, Riset, dan Teknologi RI • Direktorat Jenderal Pendidikan Tinggi</span>
          <button 
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all cursor-pointer text-xs shadow-md shadow-slate-900/10 active:scale-98"
          >
            Mengerti, Tutup
          </button>
        </div>

      </div>
    </div>
  );
}
