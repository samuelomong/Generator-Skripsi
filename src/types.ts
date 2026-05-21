export interface PresesTema {
  jurusan: string;
  metode: string;
  judul: string;
  deskripsi: string;
}

export interface TemaAnalisis {
  relevansi_akademis: string;
  judul_rekomendasi: string[];
}

export interface ManfaatPenelitian {
  manfaat_akademis: string;
  manfaat_praktis: string;
}

export interface Bab1 {
  latar_belakang: string[];
  identifikasi_masalah: string[];
  batasan_masalah: string[];
  tujuan_penelitian: string[];
  manfaat_penelitian: ManfaatPenelitian;
}

export interface Hipotesis {
  ada_hipotesis: boolean;
  judul_seksi: string;
  pernyataan: string[];
}

export interface Tahapan {
  id: number;
  nama: string;
  deskripsi: string;
  input: string;
  output: string;
  sub_langkah: string[];
}

export interface Flowchart {
  tahapan: Tahapan[];
}

export interface PanduanAkademik {
  langkah_lanjutan: string[];
  metode_tips: string[];
}

export interface Bab2 {
  landasan_teori: string[];
  tinjauan_pustaka: string[];
  kerangka_berpikir: string[];
}

export interface Bab3 {
  jenis_penelitian: string;
  metode_pembahasan: string[];
  sumber_data: string;
  teknik_analisis: string;
}

export interface Bab4 {
  analisis_sistem_data: string[];
  pembahasan_temuan: string[];
}

export interface Bab5 {
  kesimpulan: string[];
  saran: string[];
}

export interface AcademicData {
  tema_analisis: TemaAnalisis;
  bab1: Bab1;
  bab2: Bab2;
  bab3: Bab3;
  bab4: Bab4;
  bab5: Bab5;
  rumusan_masalah: string[];
  hipotesis: Hipotesis;
  flowchart: Flowchart;
  panduan_akademik: PanduanAkademik;
}

export const LIST_JURUSAN = [
  "Teknik Informatika",
  "Sistem Informasi",
  "Manajemen",
  "Akuntansi",
  "Psikologi",
  "Hukum",
  "Ilmu Komunikasi",
  "Teknik Industri",
  "Pendidikan Bahasa Inggris"
];

export const LIST_METODE = [
  {
    id: "Kuantitatif",
    nama: "Kuantitatif (Quantitative)",
    deskripsi: "Menguji hipotesis, data numerik, pengujian statistik, kuesioner terstruktur, eksperimental."
  },
  {
    id: "Kualitatif",
    nama: "Kualitatif (Qualitative)",
    deskripsi: "Memahami kedalaman fenomena, wawancara mendalam, studi kasus, analisis deskriptif eksplanatori."
  },
  {
    id: "R&D",
    nama: "R&D (Research & Development)",
    deskripsi: "Mengembangkan produk baru, sistem, atau aplikasi (Waterfall, Agile/Scrum, ADDIE, FAST dsb) berurutan uji coba."
  },
  {
    id: "Campuran",
    nama: "Metode Campuran (Mixed Methods)",
    deskripsi: "Gabungan analisis kuantitatif dan penggalian kualitatif demi kevalidan ganda yang kuat."
  }
];

export const PRESETS_TEMA: PresesTema[] = [
  {
    jurusan: "Teknik Informatika",
    metode: "R&D",
    judul: "Sistem Pakar Diagnosa Dini Penyakit Tanaman Padi Menggunakan Forward Chaining Berbasis Web",
    deskripsi: "Sistem cerdas pembantu petani memprediksi penyakit padi berdasarkan gejala klinis lapangan secara instan."
  },
  {
    jurusan: "Sistem Informasi",
    metode: "Kuantitatif",
    judul: "Analisis Penerimaan Mobile Academic System Menggunakan Metode TAM (Technology Acceptance Model)",
    deskripsi: "Riset kuantitatif mengukur kenyamanan, kemudahan, dan intensitas penggunaan portal akademik mahasiswa."
  },
  {
    jurusan: "Manajemen",
    metode: "Kuantitatif",
    judul: "Pengaruh Flexible Working Arrangement (FWA) Terhadap Produktivitas Kerja Karyawan Start-up",
    deskripsi: "Penelitian pengujian hipotesis pengaruh jam kerja fleksibel terhadap output kepuasan kerja generasi Z."
  },
  {
    jurusan: "Akuntansi",
    metode: "Kualitatif",
    judul: "Penerapan Akuntansi Tradisional 'Siri Na Pacce' pada Pengelolaan UMKM Keluarga Luar Jawa",
    deskripsi: "Studi kasus kualitatif mengeksplorasi nilai kearifan lokal dalam pencatatan keuangan internal non-formal."
  },
  {
    jurusan: "Psikologi",
    metode: "Kuantitatif",
    judul: "Hubungan Antara Fear of Missing Out (FOMO) dengan Impulsive Buying TikTok Shop pada Remaja",
    deskripsi: "Uji korelasi statistik membuktikan kecemasan ketinggalan tren sosial memicu belanja barang tidak penting."
  },
  {
    jurusan: "Hukum",
    metode: "Kualitatif",
    judul: " Perlindungan Hukum bagi Konsumen Terhadap Penyebaran Data Pribadi Oleh Pinjaman Online Ilegal",
    deskripsi: "Analisis yuridis normatif mengenai kekosongan regulasi sanksi berat atas penyebaran kontak darurat sepihak."
  }
];
