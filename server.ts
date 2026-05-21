import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Initialize Gemini SDK lazily to avoid startup crash if key is missing
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON request parsing
  app.use(express.json());

  // API endpoint to generate skripsi structure
  app.post("/api/generate", async (req, res) => {
    try {
      const { tema, jurusan, metode } = req.body;

      if (!tema || !jurusan || !metode) {
        return res.status(400).json({ error: "Kolom Tema, Jurusan, dan Metode Penelitian harus diisi." });
      }

      const client = getGeminiClient();

      const responseSchema = {
        type: Type.OBJECT,
        properties: {
          tema_analisis: {
            type: Type.OBJECT,
            properties: {
              relevansi_akademis: {
                type: Type.STRING,
                description: "Analisis urgensi, aktualitas, dan kelayakan topik skripsi ini dalam dunia akademik modern saat ini."
              },
              judul_rekomendasi: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "3 variasi rekomendasi judul skripsi yang ideal, spesifik, formal, dan akademis berpedoman pada KBBI dan Ejaan Bahasa Indonesia yang Disempurnakan (EYD)."
              }
            },
            required: ["relevansi_akademis", "judul_rekomendasi"]
          },
          bab1: {
            type: Type.OBJECT,
            properties: {
              latar_belakang: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Minimal 3 paragraf latar belakang yang sangat panjang, komprehensif, spesifik, dan formal (minimal 300-400 kata per paragraf). Paragraf 1: Keadaan ideal/teori/dasar hukum makro. Paragraf 2: Masalah nyata/fenomena empiris/kesenjangan riset terdahulu sektor terkait. Paragraf 3: Solusi teknis konkret yang diajukan beserta kebaruan (novelty) riset."
              },
              identifikasi_masalah: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Daftar poin identifikasi masalah yang ditarik dari uraian latar belakang."
              },
              batasan_masalah: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Batasan penelitian / batasan masalah yang logis, agar ruang lingkup pengerjaan skripsi tetap terfokus."
              },
              tujuan_penelitian: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Poin-poin tujuan penelitian yang logis dan sejalan dengan masalah."
              },
              manfaat_penelitian: {
                type: Type.OBJECT,
                properties: {
                  manfaat_akademis: {
                    type: Type.STRING,
                    description: "Penjelasan kontribusi penelitian ini terhadap pengembangan keilmuan dibidang bersangkutan di universitas."
                  },
                  manfaat_praktis: {
                    type: Type.STRING,
                    description: "Penjelasan manfaat nyata bagi masyarakat, pelaku industri, instansi terkait, atau objek yang diteliti."
                  }
                },
                required: ["manfaat_akademis", "manfaat_praktis"]
              }
            },
            required: ["latar_belakang", "identifikasi_masalah", "batasan_masalah", "tujuan_penelitian", "manfaat_penelitian"]
          },
          bab2: {
            type: Type.OBJECT,
            properties: {
              landasan_teori: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Minimal 3 paragraf landasan teori konseptual, akademis, dan teoretis yang sangat panjang dan kaya detail (minimal 300-400 kata per paragraf) mengenai teori-teori utama (Grand, Middle, dan Applied Theory) yang mendasari variabel riset."
              },
              tinjauan_pustaka: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Ulasan minimal 3 publikasi atau penelitian terdahulu yang relevan sebagai studi komparatif empiris."
              },
              kerangka_berpikir: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Minimal 2 paragraf uraian tentang alur pemikiran logis hubungan antarvariabel atau tahapan pengembangan."
              }
            },
            required: ["landasan_teori", "tinjauan_pustaka", "kerangka_berpikir"]
          },
          bab3: {
            type: Type.OBJECT,
            properties: {
              jenis_penelitian: {
                type: Type.STRING,
                description: "Deskripsi jenis pendekatan penelitian (misal: eksperimen, korelasional, deskriptif, prototyping, R&D) yang sah akademik."
              },
              metode_pembahasan: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Langkah-langkah operasional terperinci dalam mengimplementasikan penelitian. Setiap deskripsi atau langkah operasional harus mencakup sub-langkah teknis yang spesifik, seperti 'melakukan uji validitas konten dengan metode Aiken V' atau 'menggunakan rumus Slovin atau Krejcie-Morgan untuk menentukan ukuran sampel', 'perhitungan koefisien korelasi pearson', 'uji kekuatan Black-Box Testing', atau 'evaluasi kegunaan ahli menggunakan instrument Gregory / SUS'."
              },
              sumber_data: {
                type: Type.STRING,
                description: "Deskripsi ringkas mengenai populasi, sampel (gaya sampling seperti Purposive atau Slovin), objek kajian, berkas data, atau subjek pengujian."
              },
              teknik_analisis: {
                type: Type.STRING,
                description: "Metodologi pengolahan hasil (uji SPSS, analisis kualitatif deskriptif, pengujian fungsionalitas sistem, dll)."
              }
            },
            required: ["jenis_penelitian", "metode_pembahasan", "sumber_data", "teknik_analisis"]
          },
          bab4: {
            type: Type.OBJECT,
            properties: {
              analisis_sistem_data: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Minimal 3 paragraf draf pemaparan analisis data, sistem, rancangan arsitektur, perhitungan matematis, atau deskripsi fungsional temuan yang mendalam, terperinci, dan spesifik (minimal 300-400 kata per paragraf), didukung data/parameter nyata."
              },
              pembahasan_temuan: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Minimal 3 paragraf analisis tajam, detail, dan ilmiah (minimal 350-400 kata per paragraf) yang menjawab setiap pertanyaan rumusan masalah dengan membandingkan temuan penelitian terhadap teori-teori dalam tinjauan pustaka."
              }
            },
            required: ["analisis_sistem_data", "pembahasan_temuan"]
          },
          bab5: {
            type: Type.OBJECT,
            properties: {
              kesimpulan: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Poin-poin kesimpulan mutakhir yang secara padat dan lugas memberikan jawaban atas pertanyaan riset."
              },
              saran: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Rekomendasi taktis berupa saran kelanjutan akademik untuk peneliti selanjutnya serta manfaat praktis pemakai lapangan."
              }
            },
            required: ["kesimpulan", "saran"]
          },
          rumusan_masalah: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Daftar kalimat tanya rumusan masalah formal, diawali kata tanya (Bagaimana, Mengapa, Apakah, Sejauh mana) yang menuntut pembuktian ilmiah."
          },
          hipotesis: {
            type: Type.OBJECT,
            properties: {
              ada_hipotesis: {
                type: Type.BOOLEAN,
                description: "Bernilai true jika metode penelitian kuantitatif/eksperimen/komparatif yang membutuhkan uji statistik. Bernilai false jika kualitatif/deskriptif/historis."
              },
              judul_seksi: {
                type: Type.STRING,
                description: "Isi dengan 'Hipotesis Penelitian' jika ada_hipotesis true, atau 'Asumsi & Fokus Penelitian' jika false."
              },
              pernyataan: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Daftar pernyataan hipotesis kerja (H1) dan hipotesis nol (H0) jika ada_hipotesis true, atau 2-3 poin asumsi penelitian teoritis / fokus kajian jika false."
              }
            },
            required: ["ada_hipotesis", "judul_seksi", "pernyataan"]
          },
          flowchart: {
            type: Type.OBJECT,
            properties: {
              tahapan: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.INTEGER, description: "Nomor urut tahapan (mulai dari 1)." },
                    nama: { type: Type.STRING, description: "Nama tahapan metodologi (misalnya: Studi Literatur, Desain Pengumpulan Data, Implementasi Sistem, Pengujian Reliabilitas, dsb)." },
                    deskripsi: { type: Type.STRING, description: "Penjelasan mendalam apa yang dilakukan di tahapan ini spesifik untuk tema skripsi. Wajib menyertakan pendekatan operasional yang sangat solid secara ilmiah." },
                    input: { type: Type.STRING, description: "Data masukan, kuesioner draf awal, skor ahli/validator, instrumen mentah, atau landasan teoretis konkret yang digunakan pada tahap ini." },
                    output: { type: Type.STRING, description: "Hasil luaran konkret atau bukti nyata dari tahapan kerja ini, seperti: Dokumen Instrumen Tervalidasi Aiken V, Nilai Reliabilitas Cronbach's Alpha > 0.60, Ukuran Sampel Mewakili Populasi (Formula Slovin), draf final, dsb." },
                    sub_langkah: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      description: "Langkah-langkah teknis rinci dalam tahapan bersangkutan, misalnya: 'pengukuran indeks Aiken V dengan panel validator ahli', 'aplikasi rumus Slovin dengan margin of error 5%', 'pengujian Black-Box', dsb."
                    }
                  },
                  required: ["id", "nama", "deskripsi", "input", "output", "sub_langkah"]
                }
              }
            },
            required: ["tahapan"]
          },
          panduan_akademik: {
            type: Type.OBJECT,
            properties: {
              langkah_lanjutan: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Panduan konkrit apa saja yang harus dilakukan mahasiswa setelah struktur ini terbentuk (Misalnya: menyusun kuesioner, membuat prototype, berkonsultasi ke dosen pembimbing, dll)."
              },
              metode_tips: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Tips khusus menyangkut penyusunan skripsi menggunakan metode yang dipilih agar lulus sidang skripsi."
              }
            },
            required: ["langkah_lanjutan", "metode_tips"]
          }
        },
        required: [
          "tema_analisis",
          "bab1",
          "bab2",
          "bab3",
          "bab4",
          "bab5",
          "rumusan_masalah",
          "hipotesis",
          "flowchart",
          "panduan_akademik"
        ]
      };

      const systemPrompt = `Anda adalah Asisten Akademik AI Terpercaya dan profesional tingkat tinggi yang berspesialisasi dalam membantu mahasiswa menyusun struktur lengkap, draf naskah bab per bab (BAB I PENDAHULUAN, BAB II TINJAUAN PUSTAKA, BAB III METODOLOGI PENELITIAN, BAB IV ANALISIS DAN PEMBAHASAN, BAB V KESIMPULAN DAN SARAN), kerangka metodologi, serta visualisasi flowchart skripsi berdasarkan standar akademik universitas nasional di Indonesia.

Pedoman penulisan wajib mengikuti tata bahasa Indonesia formal ilmiah, objektif, logis, serta bernilai akademik tinggi, tanpa kesalahan ejaan atau pengetikan (typo) sama sekali. Pastikan kepatuhan penuh terhadap Ejaan Bahasa Indonesia yang Disempurnakan (EYD) dan Kamus Besar Bahasa Indonesia (KBBI).

PADA SETIAP BAB, HASILKAN PARAGRAF YANG SANGAT PANJANG, RINCI, DAN SPESIFIK:
- Setiap item teks draf dalam 'latar_belakang', 'landasan_teori', 'analisis_sistem_data', dan 'pembahasan_temuan' harus berisi tulisan draf yang sangat detail, kaya teori, dan panjang (minimal 300-400 kata per item/paragraf). Hindari kalimat penjelas ringkas atau normatif.
- Gunakan data hipotetis konkret, formula matematika, referensi, nama standard, terminologi teknis, dan rancangan nyata spesifik untuk Jurusan "${jurusan}" dan Metode "${metode}".

PANDUAN GENERASI BAB-BY-BAB:
1. BAB I PENDAHULUAN: Berisi latar belakang yang deduktif (pola piramida terbalik), identifikasi masalah, batasan masalah, tujuan penelitian, serta manfaat penelitian teoritis/praktis. Masing-masing paragraf latar belakang menjabarkan data/hukum/masalah secara utuh (min 300-400 kata).
2. BAB II TINJAUAN PUSTAKA: Berisi landasan teori konseptual yang sangat lengkap membahas variabel utama secara ilmiah, tinjauan pustaka empiris (ulasan mendalam dari minimal 3 publikasi terdahulu), dan kerangka berpikir yang logis (paragraf panjang, min 300 kata).
3. BAB III METODOLOGI PENELITIAN: Berisi jenis pendekatan riset, langkah-langkah pembahasan (tahapan operasional), sumber/objek data (populasi & sampel), dan teknik analisis interpretasi hasil. Setiap tahapan operasional dan sub-langkah dalam penelitian wajib diperkaya dengan detail metodologis yang operasional dan baku (misalnya menuliskan secara spesifik: 'melakukan uji validitas konten dengan metode Aiken V menggunakan panel ahli', 'menghitung ukuran sampel minimum dari populasi menggunakan rumus Slovin dengan margin of error sebesar 5%', 'mengukur reliabilitas kuesioner dengan metode koefisien Cronbach Alpha', dsb.). Setiap tahapan operasional harus memiliki rincian input (instrumen masuk) dan output (bukti hasil nyata) yang jelas dan realistis.
4. BAB IV ANALISIS DAN PEMBAHASAN: Berisi analisis sistem/data/statistik (misalnya pengujian program, perancangan diagram, hitungan numerik teruji, dsb.) yang dijabarkan dalam minimal 3 paragraf panjang terperinci (min 300-400 kata), diikuti pembahasan temuan mendalam untuk menjawab rumusan masalah dengan membandingkan temuan empiris terhadap tinjauan pustaka (min 350-400 kata per paragraf/item).
5. BAB V KESIMPULAN DAN SARAN: Berisi kesimpulan logis penjawab jitu rumusan masalah, dan saran rekomendasi operasional taktis untuk penelitian mendatang.
6. MANDAT UTAMA JUDUL (judul_rekomendasi): Hasilkan 3 rekomendasi judul spesifik, sangat formal, mematuhi EYD (hindari kapitalisasi kata hubung/depan seperti 'di', 'ke', 'dari', 'pada', 'dan', 'yang', 'untuk' kecuali di awal kata) dan KBBI. All terminology must be extremely formal and academic.

PANDUAN LANJUTAN METODOLOGI (BAB III & FLOWCHART):
- Sediakan data teknis terukur pada input dan output untuk representasi visual.
- Input harus terperinci (misal: draf kuesioner berskala likert, matriks kriteria responden, dataset sintetik uji coba).
- Output harus terperinci dan aplikatif sesuai metode pilihan (misal: hasil kuesioner tervalidasi Aiken's V ≥ 0.78, ukuran sampel terhitung N=XX dengan rumus Slovin, perangkat purwarupa teruji fungsional penuh).
- Rinci sub_langkah di flowchart.tahapan agar sesuai dengan pendekatan ilmiah draf skripsi.

Patuhi properti responseSchema dengan seksama. Lakukan generasi struktur skripsi terbaik secara eksplisit dan sesuaikan isinya dengan input:
- Tema/Topik: "${tema}"
- Jurusan: "${jurusan}"
- Metode Penelitian: "${metode}"

Pastikan flowchart yang dihasilkan memiliki urutan langkah yang realistis dari persiapan, pengumpulan data, perancangan/analisis, evaluasi/pengujian, hingga interpretasi hasil sesuai metode yang dipilih.`;

      // Generate content with gemini-3.5-flash as default basic text/reasoning model
      const resp = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: "Buatkan struktur akademik skripsi yang komprehensif, logis, dan formal.",
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: "application/json",
          responseSchema: responseSchema,
        },
      });

      const responseText = resp.text;
      if (!responseText) {
        throw new Error("Gemini API returned an empty response.");
      }

      const academicData = JSON.parse(responseText.trim());
      res.json(academicData);
    } catch (error: any) {
      console.error("Generation error:", error);
      res.status(500).json({ error: error.message || "Gagal membuat struktur skripsi otomatis." });
    }
  });

  // Serve static files in production or use Vite dev server in development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
