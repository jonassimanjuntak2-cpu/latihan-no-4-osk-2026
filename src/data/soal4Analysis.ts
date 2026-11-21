export interface AnalysisPoint {
  number: number;
  title: string;
  summary: string;
  details: string[];
  equationLatex?: string;
}

export const SOAL_4_ORIGINAL_TEXT =
  'Lima partikel kecil diletakkan masing-masing pada titik sudut sebuah segilima beraturan. Setiap partikel bergerak dengan besar kecepatan konstan, namun arahnya selalu mengikuti partikel lain di sebelahnya. Gerakan tersebut terus berlangsung hingga semua partikel bertemu. Jarak tempuh dan perpindahan salah satu partikel hingga bertemu yang lainnya masing-masing adalah a dan b. Nilai perbandingan a dan b adalah ...';

export const SOAL_4_TEN_POINT_ANALYSIS: AnalysisPoint[] = [
  {
    number: 1,
    title: 'Materi Pokok yang Diujikan',
    summary: 'Kinematika Dua Dimensi & Gerak Relatif Simetris (Kurva Kejar-Kejaran / Mutual Pursuit).',
    details: [
      'Soal nomor 4 berada di bawah bab Kinematika pada naskah Soal OSK Fisika SMA 2026.',
      'Inti fisika yang diuji adalah bagaimana mendeskripsikan lintasan lengkung kontinu tanpa mengetahui persamaan parametrik spiral secara langsung, melainkan melalui proyeksi vektor kecepatan pada arah simetri.',
    ],
  },
  {
    number: 2,
    title: 'Submateri dan Konsep Fisika yang Terlibat',
    summary: 'Jarak tempuh vs perpindahan, komponen vektor kecepatan (radial & tangensial), kecepatan relatif pendekatan, dan simetri rotasional.',
    details: [
      'Jarak tempuh (a): panjang lintasan lengkung (arc length) yang ditempuh partikel sepanjang spiral logaritmik.',
      'Perpindahan (b): jarak garis lurus dari titik sudut awal segilima menuju titik temu (pusat simetri segilima), yaitu jari-jari lingkaran luar R₀.',
      'Penguraian vektor kecepatan sesaat ke dalam arah radial menuju pusat simetri (v_r) dan arah tangensial (v_θ).',
    ],
  },
  {
    number: 3,
    title: 'Prinsip, Hukum, dan Teori Fisika Dasar',
    summary: 'Prinsip Invariansi Simetri Rotasi (Order-5) dan Definisi Kinematika Kecepatan Sesaat.',
    details: [
      'Karena kondisi awal simetris (segilima beraturan) dan aturan gerak identik untuk kelima partikel, maka pada setiap saat t kelima partikel selalu membentuk segilima beraturan yang menyusut dan berotasi.',
      'Akibat simetri tersebut, titik pusat segilima diam di tempat dan menjadi titik pertemuan kelima partikel.',
      'Integrasi laju konstan memberikan a = ∫ v dt = v T, sementara integrasi laju radial memberikan b = ∫ (-dR/dt) dt = R₀.',
    ],
  },
  {
    number: 4,
    title: 'Besaran Fisika yang Diketahui dan Ditanyakan',
    summary: 'Diketahui konfigurasi geometris (N = 5) dan sifat laju konstan (v); ditanyakan rasio tak berdimensi a/b.',
    details: [
      'Diketahui: Jumlah partikel N = 5 pada titik sudut segilima beraturan, kelajuan |v| = v konstan, arah v selalu menuju partikel tetangga siklik.',
      'Didefinisikan: a = jarak tempuh total satu partikel, b = besar perpindahan total satu partikel (jarak awal ke pusat segilima).',
      'Ditanyakan: Perbandingan a / b (tak berdimensi).',
    ],
  },
  {
    number: 5,
    title: 'Hubungan Matematis Antarbesaran',
    summary: 'Hubungan trigonometri poligon beraturan mengaitkan komponen kecepatan radial dengan laju total.',
    details: [
      'Sudut pusat per sisi pada segi-N beraturan adalah 2π/N (= 72° untuk N = 5).',
      'Segitiga OP₁P₂ bersifat sama kaki sehingga sudut antara sisi P₁P₂ dan garis radial P₁O adalah α = π/2 - π/N (= 54° untuk N = 5).',
      'Komponen kecepatan menuju pusat adalah v_r = v cos(π/2 - π/N) = v sin(π/N).',
    ],
    equationLatex:
      'v_r = -\\frac{dR}{dt} = v\\sin\\left(\\frac{\\pi}{N}\\right) \\implies \\frac{a}{b} = \\frac{v T}{R_0} = \\frac{1}{\\sin(36^\\circ)} \\approx 1{,}7',
  },
  {
    number: 6,
    title: 'Asumsi dan Kondisi Fisis yang Digunakan',
    summary: 'Partikel titik tanpa dimensi, ruang bebas hambatan, arah berubah kontinu, dan tidak bertumbukan sebelum mencapai pusat.',
    details: [
      'Partikel dianggap berupa titik matematis (ukuran partikel << ukuran lintasan awal).',
      'Kelima partikel mulai bergerak serentak pada t = 0 dengan besar kecepatan yang sama persis.',
      'Reaksi perubahan arah berlangsung seketika dan kontinu sepanjang lintasan tanpa selip atau inersia tunda.',
    ],
  },
  {
    number: 7,
    title: 'Tingkat Kesulitan dan Karakteristik Penalaran',
    summary: 'Menengah–Tinggi (OSK): menguji kemampuan berpikir geometris-kinematis untuk menghindari kalkulus spiral yang rumit.',
    details: [
      'Jika siswa mencoba mencari persamaan r(θ) terlebih dahulu baru menghitung panjang busur integral √(r² + (dr/dθ)²), pengerjaan menjadi sangat panjang.',
      'Penalaran kunci olimpiade adalah menggunakan kerangka simetri pusat atau kecepatan pendekatan antar partikel tetangga.',
    ],
  },
  {
    number: 8,
    title: 'Model Matematis dan Strategi Penyelesaian',
    summary: 'Dua rute pembuktian cepat yang saling mengonfirmasi: Metode Kecepatan Radial Pusat dan Metode Kecepatan Relatif Sisi.',
    details: [
      'Strategi A (Radial Pusat): Hitung laju berkurangnya jari-jari luar -dR/dt = v sin(36°). Karena konstan, a = v T = b / sin(36°).',
      'Strategi B (Relatif Sisi): Laju memendeknya sisi adalah -ds/dt = v(1 - cos 72°) = 2v sin²(36°), dan karena s₀ = 2b sin(36°), diperoleh T = b / (v sin 36°).',
    ],
    equationLatex:
      '-\\frac{ds}{dt} = v(1 - \\cos 72^\\circ) = 2v\\sin^2(36^\\circ), \\quad s_0 = 2b\\sin(36^\\circ) \\implies \\frac{a}{b} = \\frac{1}{\\sin 36^\\circ}',
  },
  {
    number: 9,
    title: 'Konsep Prasyarat yang Harus Dikuasai',
    summary: 'Geometri poligon beraturan, proyeksi vektor, perbedaan jarak dan perpindahan, serta konsep kecepatan relatif.',
    details: [
      'Perbedaan mendasar antara jarak tempuh (skalar panjang lintasan) dan perpindahan (besar vektor selisih posisi akhir dan awal).',
      'Trigonometri dasar dan sudut istimewa/sudut segilima (36°, 54°, 72°, 108°).',
      'Penguraian vektor pada koordinat polar lokal (komponen radial dan tangensial).',
    ],
  },
  {
    number: 10,
    title: 'Potensi Pengembangan Menjadi 15 Soal Variatif',
    summary: 'Spektrum pengembangan dari N-gon dasar hingga percepatan tangensial, dinamika gaya sentripetal, gerak relatif arus, dan lintasan pentagram.',
    details: [
      'Kelompok 1 (Soal 1–3): Penguatan dasar pada N = 5 (rasio a/b), N = 3 (waktu bertemu), dan N = 4 (jarak tempuh dari R₀).',
      'Kelompok 2 (Soal 4–6): Variasi N = 6 (kecepatan radial), N = 5 dengan s₀ & v diketahui (waktu bertemu), dan N = 8 (rasio a/b).',
      'Kelompok 3 (Soal 7–9): Variasi batas jarak aman s_f, sudut kejar menyimpang φ dari sisi, dan kurva kejar asimetris 2 partikel.',
      'Kelompok 4 (Soal 10–12): Kombinasi dengan percepatan sentripetal sesaat a_n, resultan gaya sentripetal F_n saat luas menyusut, dan sudut putar spiral Δθ.',
      'Kelompok 5 (Soal 13–15): Pemodelan tingkat lanjut dengan percepatan tangensial konstan a_t, kerangka acuan sungai mengalir V_c, serta pengejaran diagonal pentagram (melompati 1 partikel).',
    ],
  },
];
