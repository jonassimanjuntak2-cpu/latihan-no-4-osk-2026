import { ProblemItem } from '../types/physics';

const DEG = Math.PI / 180;

export const PROBLEMS_PART_1: ProblemItem[] = [
  // SOAL 1
  {
    id: 1,
    shortTitle: 'Rasio Jarak & Perpindahan pada Segilima Beraturan',
    tier: 'Tingkat 1 · Penguatan Dasar',
    tierIndex: 1,
    subtopic: 'Simetri Segilima & Proyeksi Radial',
    stimulusType: 'Diagram Sistem Segilima Beraturan & Vektor Kecepatan Siklik',
    questionText:
      'Lima partikel kecil diletakkan masing-masing pada titik sudut sebuah segilima beraturan. Setiap partikel bergerak dengan besar kecepatan konstan v, namun arahnya selalu mengikuti partikel lain di sebelahnya secara berurutan hingga semua partikel bertemu. Jika jarak tempuh total dan besar perpindahan salah satu partikel hingga bertemu adalah a dan b, tentukan nilai perbandingan a/b!',
    knownData: [
      { symbol: 'N', label: 'Jumlah partikel (segilima)', valueWithUnit: '5 partikel' },
      { symbol: 'v', label: 'Kelajuan tiap partikel', valueWithUnit: 'konstan' },
      { symbol: 'a', label: 'Jarak tempuh satu partikel', valueWithUnit: 'a (panjang lintasan)' },
      { symbol: 'b', label: 'Besar perpindahan', valueWithUnit: 'b = R₀' },
    ],
    askedQuantity: { symbol: 'a/b', label: 'Nilai perbandingan a dan b', unit: 'tanpa satuan' },
    answerUnitLabel: 'tanpa satuan',
    exactValue: 1 / Math.sin(36 * DEG),
    expectedFormatted: '1,7',
    tolerance: 0.05,
    hints: [
      'Perhatikan simetri segilima: setiap saat kelima partikel selalu membentuk segilima beraturan yang menyusut dan berotasi terhadap titik pusat tetap O.',
      'Besar perpindahan b sama dengan jarak dari titik sudut awal ke titik pusat O (jari-jari lingkaran luar R₀).',
      'Sudut antara sisi segilima dan garis radial menuju pusat O adalah 54°. Gunakan komponen kecepatan menuju pusat v_r = v cos(54°) = v sin(36°).',
    ],
    conceptualFeedbackOnWrong:
      'Periksa kembali perbedaan jarak tempuh (panjang lintasan spiral a = vT) dan besar perpindahan (jari-jari luar b = R₀). Pastikan sudut antara arah kecepatan di sisi segilima dengan garis menuju pusat adalah 54° (bukan 108° atau 72°).',
    conceptualFeedbackOnRight:
      'Tepat sekali! Anda menerapkan prinsip simetri rotasional dan proyeksi komponen kecepatan radial v_r = v sin(36°) dengan akurat sehingga rasio a/b = 1 / sin(36°) ≈ 1,7.',
    simulation: {
      kind: 'polygon-pursuit',
      n: 5,
      R0: 10,
      v0: 2.5,
      stepSkip: 1,
      tiltDeg: 0,
      clockwise: false,
    },
    fbd: {
      objectName: 'Partikel P₁ pada Titik Sudut Segilima',
      frameDescription:
        'Diagram vektor kinematika dalam kerangka acuan diam pusat segilima O (murni analisis kecepatan, tidak ada gaya fiktif).',
      hasRealForce: false,
      referenceAngleDeg: 90,
      vectors: [
        {
          id: 'axis-r',
          label: 'e_r (radial ke O)',
          spokenLabel: 'sumbu radial menuju pusat O',
          color: '#64748B',
          angleDeg: 270,
          lengthRatio: 0.9,
          category: 'axis',
          explanation: 'Sumbu radial mengarah langsung dari partikel ke pusat simetri O.',
        },
        {
          id: 'axis-t',
          label: 'e_θ (tangensial)',
          spokenLabel: 'sumbu tangensial tegak lurus radial',
          color: '#94A3B8',
          angleDeg: 180,
          lengthRatio: 0.75,
          category: 'axis',
          explanation: 'Sumbu tangensial tegak lurus terhadap garis radial pada bidang segilima.',
        },
        {
          id: 'v-total',
          label: 'v (sepanjang sisi)',
          spokenLabel: 'vektor kecepatan total v menuju partikel tetangga',
          color: '#7C3AED',
          angleDeg: 216,
          lengthRatio: 0.95,
          category: 'velocity',
          explanation: 'Vektor kecepatan total selalu mengarah ke partikel tetangga (sudut 54° dari garis radial menuju O).',
        },
        {
          id: 'v-r',
          label: 'v_r = v sin(36°)',
          spokenLabel: 'komponen kecepatan radial menuju pusat',
          color: '#059669',
          angleDeg: 270,
          lengthRatio: 0.56,
          category: 'component',
          explanation: 'Komponen radial inilah yang memperkecil jarak R ke pusat O secara konstan.',
        },
        {
          id: 'v-theta',
          label: 'v_θ = v cos(36°)',
          spokenLabel: 'komponen kecepatan tangensial',
          color: '#0284C7',
          angleDeg: 180,
          lengthRatio: 0.77,
          category: 'component',
          explanation: 'Komponen tangensial memutar segilima mengelilingi pusat O.',
        },
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Identifikasi Partikel & Posisi Sudut',
          description: 'Tinjau satu partikel P₁ di puncak segilima beraturan pada jarak R dari pusat simetri O.',
          visibleVectorIds: [],
        },
        {
          stepNumber: 2,
          title: 'Penentuan Sumbu Koordinat Polar Lokal',
          description: 'Tetapkan sumbu radial menuju pusat O dan sumbu tangensial yang tegak lurus padanya.',
          visibleVectorIds: ['axis-r', 'axis-t'],
        },
        {
          stepNumber: 3,
          title: 'Vektor Kecepatan Sesaat & Penguraian Komponen',
          description: 'Vektor v mengarah sepanjang sisi segilima membentuk sudut 54° terhadap arah radial menuju pusat, lalu diuraikan menjadi v_r dan v_θ.',
          visibleVectorIds: ['axis-r', 'axis-t', 'v-total', 'v-r', 'v-theta'],
          equationLatex: 'v_r = v\\cos 54^\\circ = v\\sin 36^\\circ, \\qquad v_\\theta = v\\sin 54^\\circ = v\\cos 36^\\circ',
        },
        {
          stepNumber: 4,
          title: 'Persamaan Kinematika Pertemuan',
          description: 'Laju perubahan jari-jari hanya ditentukan oleh v_r sehingga integrasi langsung menghasilkan a/b = 1/sin(36°).',
          visibleVectorIds: ['axis-r', 'v-total', 'v-r'],
          equationLatex: '-\\frac{dR}{dt} = v\\sin 36^\\circ \\implies \\frac{a}{b} = \\frac{v T}{R_0} = \\frac{1}{\\sin 36^\\circ}',
        },
      ],
    },
    problemSpokenText:
      'Soal nomor 1. Lima partikel kecil diletakkan pada titik sudut segilima beraturan. Setiap partikel bergerak dengan laju konstan v dan arahnya selalu mengikuti partikel di sebelahnya hingga semuanya bertemu. Jika jarak tempuh adalah a dan besar perpindahan adalah b, berapakah nilai perbandingan a dibagi b?',
    solutionSections: [
      {
        id: 's1-1',
        title: '1. Memahami Permasalahan',
        highlightType: 'none',
        paragraphs: [
          'Lima partikel identik dimulai pada titik sudut sebuah segilima beraturan. Karena arah kecepatan tiap partikel selalu tertuju ke partikel tetangga yang juga bergerak, lintasan masing-masing partikel melengkung membentuk spiral ke arah dalam.',
          'Diketahui N = 5 dan laju konstan v. Ditanyakan perbandingan antara panjang lintasan spiral (jarak tempuh a) dengan jarak garis lurus awal-ke-akhir (perpindahan b).',
        ],
        spokenText:
          'Langkah pertama, memahami permasalahan. Kelima partikel bergerak dengan laju konstan sambil saling mengejar hingga bertemu di pusat. Kita diminta mencari perbandingan jarak tempuh a terhadap besar perpindahan b.',
      },
      {
        id: 's1-2',
        title: '2. Identifikasi Konsep Fisika',
        highlightType: 'prinsip',
        paragraphs: [
          'Konsep utama yang berlaku adalah Prinsip Simetri Rotasional dan Kinematika Kecepatan Sesaat. Karena kondisi awal dan aturan gerak identik pada setiap sudut 72°, kelima partikel selalu membentuk segilima beraturan sepanjang gerak hingga menyusut menjadi satu titik di pusat simetri O.',
          'Oleh karena itu, posisi akhir semua partikel adalah pusat O, sehingga besar perpindahan setiap partikel sama dengan jari-jari lingkaran luar awal segilima (b = R₀).',
        ],
        spokenText:
          'Langkah kedua, prinsip fisika yang berlaku adalah simetri rotasional. Sepanjang waktu, kelima partikel selalu membentuk segilima beraturan yang menyusut menuju titik pusat O yang diam. Jadi perpindahan b sama dengan jari-jari lingkaran luar R nol.',
      },
      {
        id: 's1-3',
        title: '3. Visualisasi Fenomena',
        highlightType: 'none',
        paragraphs: [
          'Perhatikan animasi di atas: setiap kali partikel bergerak maju, tetangganya ikut bergeser memutar sehingga segilima tampak menyusut sekaligus berotasi searah lintasan kejar.',
        ],
        spokenText:
          'Pada visualisasi simulasi, tampak bahwa segilima tidak mengalami distorsi bentuk, melainkan hanya menyusut dan berotasi membentuk lintasan spiral logaritmik menuju pusat.',
      },
      {
        id: 's1-4',
        title: '4. Diagram Vektor Kinematika',
        highlightType: 'none',
        paragraphs: [
          'Dalam analisis kinematika ini, kita meninjau satu partikel representatif P₁ pada jarak R dari pusat O. Tidak ada gaya fiktif yang digambarkan; kita memproyeksikan vektor kecepatan sesaat v sepanjang sisi P₁P₂ ke arah sumbu radial (menuju O) dan tangensial.',
        ],
        spokenText:
          'Pada diagram vektor, vektor kecepatan sesaat v mengarah sepanjang sisi menuju tetangganya, membentuk sudut lima puluh empat derajat terhadap garis radial menuju pusat O.',
      },
      {
        id: 's1-5',
        title: '5. Menentukan Persamaan Dasar',
        highlightType: 'rumus',
        paragraphs: [
          'Pada segilima beraturan, sudut pusat antara dua titik sudut berdekatan adalah 360° / 5 = 72°. Dalam segitiga sama kaki OP₁P₂, sudut di titik sudut adalah β = (180° - 72°) / 2 = 54°.',
        ],
        equations: [
          'v_r = -\\frac{dR}{dt} = v\\cos(54^\\circ) = v\\sin(36^\\circ)',
          'a = \\int_0^T v\\,dt = v\\,T, \\qquad b = R_0',
        ],
        spokenText:
          'Persamaan dasarnya adalah laju pengurangan jari-jari minus d R per d t sama dengan v kosinus lima puluh empat derajat, atau sama dengan v sinus tiga puluh enam derajat.',
      },
      {
        id: 's1-6',
        title: '6. Penurunan Persamaan',
        highlightType: 'kritis',
        paragraphs: [
          'Karena v dan sin(36°) bernilai konstan sepanjang waktu, kita dapat langsung mengintegrasikan persamaan laju radial dari t = 0 (saat R = R₀ = b) sampai t = T (saat R = 0):',
        ],
        equations: [
          '\\int_{b}^{0} dR = -v\\sin(36^\\circ)\\int_{0}^{T} dt \\implies b = v\\,T\\sin(36^\\circ) = a\\sin(36^\\circ)',
          '\\frac{a}{b} = \\frac{1}{\\sin(36^\\circ)}',
        ],
        spokenText:
          'Dengan mengintegralkan dari R sama dengan b hingga nol, diperoleh b sama dengan v dikali T dikali sinus tiga puluh enam derajat. Karena a sama dengan v dikali T, maka perbandingan a per b sama dengan satu dibagi sinus tiga puluh enam derajat.',
      },
      {
        id: 's1-7',
        title: '7. Substitusi Angka',
        highlightType: 'none',
        paragraphs: [
          'Gunakan nilai eksak trigonometri sudut 36° = π/5 radian:',
        ],
        equations: ['\\sin(36^\\circ) = \\frac{\\sqrt{10 - 2\\sqrt{5}}}{4} \\approx 0{,}587785'],
        spokenText:
          'Substitusikan nilai eksak sinus tiga puluh enam derajat yaitu sekitar nol koma lima delapan tujuh tujuh delapan lima.',
      },
      {
        id: 's1-8',
        title: '8. Perhitungan Matematis',
        highlightType: 'none',
        paragraphs: [
          'Hitung kebalikan dari sin(36°) tanpa pembulatan dini:',
        ],
        equations: ['\\frac{a}{b} = \\frac{1}{0{,}58778525} = 1{,}7013016...'],
        spokenText:
          'Satu dibagi nol koma lima delapan tujuh tujuh delapan lima menghasilkan satu koma tujuh nol satu tiga.',
      },
      {
        id: 's1-9',
        title: '9. Hasil Akhir',
        highlightType: 'hasil',
        paragraphs: ['Dibulatkan hingga satu angka di belakang koma menggunakan tanda koma:'],
        equations: ['\\frac{a}{b} = 1{,}7'],
        spokenText: 'Hasil akhirnya adalah satu koma tujuh.',
      },
      {
        id: 's1-10',
        title: '10. Interpretasi Fisis',
        highlightType: 'none',
        paragraphs: [
          'Nilai 1,7 berarti panjang lintasan spiral yang ditempuh tiap partikel sekitar 70% lebih panjang daripada jarak garis lurus dari posisi awal menuju pusat segilima, akibat pembelokan lintasan secara kontinu.',
        ],
        spokenText:
          'Secara fisis, lintasan spiral yang ditempuh partikel tujuh puluh persen lebih panjang daripada jarak lurus menuju pusat.',
      },
      {
        id: 's1-11',
        title: '11. Strategi Cepat Olimpiade',
        highlightType: 'none',
        paragraphs: [
          'Ingat rumus umum untuk segi-N beraturan: a/b = 1 / sin(π/N). Untuk N = 5, langsung hitung 1 / sin(36°) ≈ 1,701 dalam hitungan detik tanpa perlu menyusun persamaan diferensial spiral.',
        ],
        spokenText:
          'Strategi cepat olimpiade: hafalkan prinsip umumnya bahwa untuk segi N beraturan, rasio jarak terhadap perpindahan selalu satu per sinus pi per N.',
      },
      {
        id: 's1-12',
        title: '12. Kesalahan yang Harus Dihindari',
        highlightType: 'none',
        paragraphs: [
          'Jangan menganggap perpindahan b sama dengan panjang sisi segilima s₀! Panjang sisi adalah s₀ = 2b sin(36°), berbeda dengan b. Jangan pula memakai sudut dalam 108° secara langsung tanpa membaginya dua menjadi 54°.',
        ],
        spokenText:
          'Kesalahan yang harus dihindari adalah mengira perpindahan b sama dengan panjang sisi segilima, atau keliru memakai sudut dalam seratus delapan derajat tanpa membaginya dua.',
      },
    ],
  },

  // SOAL 2
  {
    id: 2,
    shortTitle: 'Waktu Pertemuan pada Segitiga Sama Sisi',
    tier: 'Tingkat 1 · Penguatan Dasar',
    tierIndex: 1,
    subtopic: 'Kecepatan Relatif Sisi & Segitiga Sama Sisi',
    stimulusType: 'Diagram Segitiga Sama Sisi & Vektor Kecepatan Relatif',
    questionText:
      'Tiga partikel kecil ditempatkan pada titik-titik sudut sebuah segitiga sama sisi dengan panjang sisi awal s₀ = 18,0 m. Masing-masing partikel bergerak dengan kelajuan konstan v = 4,0 m/s dan arahnya selalu menuju partikel lain di sebelahnya secara siklik. Tentukan waktu yang dibutuhkan hingga ketiga partikel bertemu di pusat segitiga (dalam sekon)!',
    knownData: [
      { symbol: 'N', label: 'Jumlah partikel (segitiga)', valueWithUnit: '3 partikel' },
      { symbol: 's₀', label: 'Panjang sisi awal', valueWithUnit: '18,0 m' },
      { symbol: 'v', label: 'Kelajuan konstan', valueWithUnit: '4,0 m/s' },
    ],
    askedQuantity: { symbol: 'T', label: 'Waktu hingga bertemu', unit: 's' },
    answerUnitLabel: 's',
    exactValue: 18.0 / (4.0 * (1 - Math.cos(120 * DEG))),
    expectedFormatted: '3,0',
    tolerance: 0.05,
    hints: [
      'Perhatikan garis hubung antara partikel 1 dan partikel 2 yang panjang awalnya s₀ = 18,0 m.',
      'Partikel 1 bergerak langsung menuju partikel 2 dengan laju v, sementara partikel 2 bergerak menjauhi atau mendekati garis P₁P₂ membentuk sudut 120° terhadap arah P₁P₂.',
      'Laju memendeknya sisi adalah -ds/dt = v - v cos(120°) = v(1 - (-0,5)) = 1,5 v.',
    ],
    conceptualFeedbackOnWrong:
      'Hati-hati dengan tanda kosinus sudut luar 120°! Karena cos(120°) = -0,5, partikel di depan sebenarnya punya komponen kecepatan berbalik mendekati pengejarnya, sehingga laju pendekatan adalah v - v(-0,5) = 1,5v, bukan 0,5v.',
    conceptualFeedbackOnRight:
      'Benar! Pada segitiga sama sisi, sudut luar 120° membuat laju pemendekan jarak antar partikel menjadi 1,5v = 6,0 m/s, sehingga waktu tempuh T = 18,0 / 6,0 = 3,0 s.',
    simulation: {
      kind: 'polygon-pursuit',
      n: 3,
      R0: 18.0 / Math.sqrt(3),
      v0: 4.0,
      stepSkip: 1,
      tiltDeg: 0,
      clockwise: false,
    },
    fbd: {
      objectName: 'Pasangan Partikel P₁ dan P₂ pada Sisi Segitiga',
      frameDescription:
        'Diagram vektor kecepatan sepanjang garis hubung P₁P₂ dan ke arah pusat O.',
      hasRealForce: false,
      referenceAngleDeg: 90,
      vectors: [
        {
          id: 'axis-r',
          label: 'e_r (ke pusat O)',
          spokenLabel: 'arah radial ke pusat O',
          color: '#64748B',
          angleDeg: 270,
          lengthRatio: 0.9,
          category: 'axis',
          explanation: 'Garis berat sekaligus garis radial dari sudut puncak menuju pusat segitiga O.',
        },
        {
          id: 'v-total',
          label: 'v₁ (menuju P₂)',
          spokenLabel: 'vektor kecepatan partikel satu menuju partikel dua',
          color: '#7C3AED',
          angleDeg: 240,
          lengthRatio: 0.95,
          category: 'velocity',
          explanation: 'Sudut antara sisi segitiga dan garis menuju pusat adalah 30°.',
        },
        {
          id: 'v-r',
          label: 'v_r = v cos(30°)',
          spokenLabel: 'komponen radial ke pusat',
          color: '#059669',
          angleDeg: 270,
          lengthRatio: 0.82,
          category: 'component',
          explanation: 'Pada N = 3, sudut terhadap garis pusat adalah 30°, sehingga v_r = v sin(60°).',
        },
        {
          id: 'v-theta',
          label: 'v_θ = v sin(30°)',
          spokenLabel: 'komponen tangensial',
          color: '#0284C7',
          angleDeg: 180,
          lengthRatio: 0.48,
          category: 'component',
          explanation: 'Komponen tangensial sebesar setengah dari laju total v.',
        },
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Objek Analisis: Partikel di Sudut Segitiga',
          description: 'Tinjau satu partikel di titik sudut segitiga sama sisi dengan sudut dalam 60°.',
          visibleVectorIds: [],
        },
        {
          stepNumber: 2,
          title: 'Sumbu Radial Menuju Pusat Massa',
          description: 'Garis bagi sudut membagi 60° menjadi dua bagian sama besar: 30° terhadap arah ke pusat.',
          visibleVectorIds: ['axis-r'],
        },
        {
          stepNumber: 3,
          title: 'Penguraian Kecepatan pada Sudut 30°',
          description: 'Vektor v diuraikan ke arah pusat (v cos 30°) dan arah tegak lurus (v sin 30°).',
          visibleVectorIds: ['axis-r', 'v-total', 'v-r', 'v-theta'],
          equationLatex: 'v_r = v\\cos(30^\\circ) = v\\sin(60^\\circ) = \\frac{\\sqrt{3}}{2}v',
        },
        {
          stepNumber: 4,
          title: 'Konsistensi dengan Laju Penyusutan Sisi',
          description: 'Dengan R₀ = s₀/√3, diperoleh T = R₀ / v_r = 2s₀ / (3v).',
          visibleVectorIds: ['axis-r', 'v-total', 'v-r'],
          equationLatex: 'T = \\frac{s_0 / \\sqrt{3}}{v\\sqrt{3}/2} = \\frac{2s_0}{3v}',
        },
      ],
    },
    problemSpokenText:
      'Soal nomor 2. Tiga partikel kecil ditempatkan pada titik sudut segitiga sama sisi dengan panjang sisi awal delapan belas meter. Setiap partikel bergerak dengan laju konstan empat meter per detik menuju partikel di sebelahnya. Tentukan waktu hingga ketiga partikel bertemu dalam satuan detik.',
    solutionSections: [
      {
        id: 's2-1',
        title: '1. Memahami Permasalahan',
        highlightType: 'none',
        paragraphs: [
          'Tiga partikel membentuk segitiga sama sisi awal bersisi s₀ = 18,0 m dan bergerak dengan kelajuan konstan v = 4,0 m/s saling mengejar secara siklik.',
          'Kita diminta menentukan waktu T hingga panjang sisi segitiga menyusut menjadi nol (semua partikel bertemu).',
        ],
        spokenText:
          'Kita memiliki tiga partikel di sudut segitiga sama sisi sepanjang delapan belas meter yang saling mengejar dengan kelajuan empat meter per detik.',
      },
      {
        id: 's2-2',
        title: '2. Identifikasi Konsep Fisika',
        highlightType: 'prinsip',
        paragraphs: [
          'Prinsip yang digunakan adalah Kecepatan Relatif Pendekatan Sepanjang Garis Hubung dan Simetri Segitiga Sama Sisi.',
          'Setiap saat ketiga partikel tetap membentuk segitiga sama sisi dengan sudut dalam 60° dan sudut luar 120°.',
        ],
        spokenText:
          'Konsep utamanya adalah kecepatan relatif pendekatan antar dua partikel bertetangga sepanjang sisi segitiga yang selalu bersudut enam puluh derajat.',
      },
      {
        id: 's2-3',
        title: '3. Visualisasi Fenomena',
        highlightType: 'none',
        paragraphs: [
          'Pada simulasi, terlihat bahwa dibanding segilima, segitiga sama sisi menyusut jauh lebih cepat menuju pusat karena arah kecepatan partikel lebih mengarah ke dalam.',
        ],
        spokenText:
          'Simulasi memperlihatkan segitiga menyusut cepat sambil berotasi hingga ketiganya bertemu tepat di titik berat segitiga.',
      },
      {
        id: 's2-4',
        title: '4. Diagram Vektor Kinematika',
        highlightType: 'none',
        paragraphs: [
          'Vektor kecepatan partikel 1 mengarah sepanjang sisi P₁P₂ (laju penuh v menuju P₂), sedangkan vektor kecepatan partikel 2 mengarah sepanjang sisi P₂P₃ yang membentuk sudut 60° berbalik ke arah P₁ (sudut 120° terhadap arah P₁→P₂).',
        ],
        spokenText:
          'Vektor kecepatan partikel pertama mengarah penuh ke partikel kedua, sedangkan vektor partikel kedua memiliki komponen sebesar setengah v yang justru mendekati partikel pertama.',
      },
      {
        id: 's2-5',
        title: '5. Menentukan Persamaan Dasar',
        highlightType: 'rumus',
        paragraphs: [
          'Laju berkurangnya jarak sisi s antara partikel 1 dan partikel 2 adalah selisih proyeksi kecepatan pada garis hubung P₁P₂:',
        ],
        equations: ['-\\frac{ds}{dt} = v - v\\cos(120^\\circ) = v\\left(1 + \\cos 60^\\circ\\right)'],
        spokenText:
          'Persamaan dasarnya adalah minus d s per d t sama dengan v dikurangi v kosinus seratus dua puluh derajat.',
      },
      {
        id: 's2-6',
        title: '6. Penurunan Persamaan',
        highlightType: 'kritis',
        paragraphs: [
          'Karena cos(120°) = -1/2, laju penyusutan sisi bernilai konstan sebesar 3v/2. Integrasikan dari s = s₀ ke s = 0:',
        ],
        equations: [
          '-\\frac{ds}{dt} = v\\left(1 - \\left(-\\frac{1}{2}\\right)\\right) = \\frac{3}{2}v \\implies T = \\frac{s_0}{\\frac{3}{2}v} = \\frac{2s_0}{3v}',
        ],
        spokenText:
          'Karena kosinus seratus dua puluh derajat bernilai minus setengah, laju penyusutan sisi adalah satu koma lima v. Jadi waktu bertemu adalah dua s nol dibagi tiga v.',
      },
      {
        id: 's2-7',
        title: '7. Substitusi Angka',
        highlightType: 'none',
        paragraphs: ['Masukkan s₀ = 18,0 m dan v = 4,0 m/s:'],
        equations: ['T = \\frac{2 \\times 18{,}0\\text{ m}}{3 \\times 4{,}0\\text{ m/s}}'],
        spokenText: 'Substitusikan s nol delapan belas meter dan v empat meter per detik.',
      },
      {
        id: 's2-8',
        title: '8. Perhitungan Matematis',
        highlightType: 'none',
        paragraphs: ['Hitung pembilang dan penyebut secara langsung:'],
        equations: ['T = \\frac{36{,}0}{12{,}0} = 3{,}0\\text{ s}'],
        spokenText: 'Tiga puluh enam dibagi dua belas sama dengan tiga koma nol detik.',
      },
      {
        id: 's2-9',
        title: '9. Hasil Akhir',
        highlightType: 'hasil',
        paragraphs: ['Waktu pertemuan ketiga partikel adalah:'],
        equations: ['T = 3{,}0\\text{ s}'],
        spokenText: 'Hasil akhir adalah tiga koma nol sekon.',
      },
      {
        id: 's2-10',
        title: '10. Interpretasi Fisis',
        highlightType: 'none',
        paragraphs: [
          'Jarak tempuh tiap partikel adalah a = v T = 12,0 m, sementara perpindahannya b = R₀ = 18/√3 ≈ 10,4 m. Karena sudut segitiga cukup lancip, partikel hanya menempuh sekitar 15,5% lebih jauh dari garis lurus ke pusat.',
        ],
        spokenText:
          'Dalam tiga detik, tiap partikel menempuh jarak dua belas meter, hanya sedikit lebih jauh dari perpindahannya ke pusat.',
      },
      {
        id: 's2-11',
        title: '11. Strategi Cepat Olimpiade',
        highlightType: 'none',
        paragraphs: [
          'Untuk segitiga sama sisi, selalu ingat faktor pengali pendekatan 1,5v! Maka T langsung diperoleh dari T = s₀ / (1,5 v).',
        ],
        spokenText:
          'Trik cepat untuk segitiga sama sisi adalah laju pendekatan selalu satu koma lima kali kelajuan partikel.',
      },
      {
        id: 's2-12',
        title: '12. Kesalahan yang Harus Dihindari',
        highlightType: 'none',
        paragraphs: [
          'Kesalahan paling umum adalah menuliskan laju pendekatan v(1 - cos 60°) = 0,5v sehingga mendapat T = 9,0 s. Ingat bahwa partikel di depan berbelok 120° terhadap arah sisi saat ini, sehingga komponen kecepatannya justru melawan arah sisi (mempercepat pertemuan).',
        ],
        spokenText:
          'Jangan keliru memakai kosinus enam puluh derajat bertanda positif yang akan menghasilkan sembilan detik. Partikel di depan justru mendekat sehingga sudutnya seratus dua puluh derajat.',
      },
    ],
  },

  // SOAL 3
  {
    id: 3,
    shortTitle: 'Jarak Tempuh pada Persegi dari Jari-Jari Luar',
    tier: 'Tingkat 1 · Penguatan Dasar',
    tierIndex: 1,
    subtopic: 'Jarak Tempuh Poligon & Simetri Persegi',
    stimulusType: 'Diagram Persegi Berjari-jari Luar R₀',
    questionText:
      'Empat partikel ditempatkan pada titik-titik sudut sebuah persegi yang jarak masing-masing titik sudutnya ke pusat persegi (jari-jari luar) adalah R₀ = 8,5 m. Setiap partikel bergerak dengan laju konstan v = 3,0 m/s selalu mengarah ke partikel berikutnya secara berurutan hingga bertemu di pusat. Hitunglah jarak tempuh total salah satu partikel (dalam meter)!',
    knownData: [
      { symbol: 'N', label: 'Jumlah partikel (persegi)', valueWithUnit: '4 partikel' },
      { symbol: 'R₀', label: 'Jari-jari luar awal', valueWithUnit: '8,5 m' },
      { symbol: 'v', label: 'Kelajuan konstan', valueWithUnit: '3,0 m/s' },
    ],
    askedQuantity: { symbol: 'a', label: 'Jarak tempuh total partikel', unit: 'm' },
    answerUnitLabel: 'm',
    exactValue: 8.5 * Math.SQRT2,
    expectedFormatted: '12,0',
    tolerance: 0.05,
    hints: [
      'Pada persegi, arah sisi membentuk sudut 45° terhadap garis diagonal menuju pusat persegi.',
      'Laju pendekatan ke pusat v_r = v cos(45°) = v / √2.',
      'Apakah jarak tempuh total a = v T bergantung pada nilai kelajuan v = 3,0 m/s?',
    ],
    conceptualFeedbackOnWrong:
      'Periksa sudut antara sisi persegi dan garis diagonal menuju pusat (yaitu 45°), serta ingat bahwa jarak tempuh a = v T = R₀ / sin(45°) = R₀√2 tidak bergantung pada besarnya v selama v konstan!',
    conceptualFeedbackOnRight:
      'Luar biasa! Anda menyadari bahwa jarak tempuh a = R₀√2 = 8,5 × 1,4142 ≈ 12,0 m, dan besar laju v = 3,0 m/s saling meniadakan dalam perhitungan panjang lintasan.',
    simulation: {
      kind: 'polygon-pursuit',
      n: 4,
      R0: 8.5,
      v0: 3.0,
      stepSkip: 1,
      tiltDeg: 0,
      clockwise: false,
    },
    fbd: {
      objectName: 'Partikel pada Titik Sudut Persegi',
      frameDescription: 'Penguraian kecepatan partikel pada sudut 45° terhadap diagonal persegi.',
      hasRealForce: false,
      referenceAngleDeg: 90,
      vectors: [
        {
          id: 'axis-r',
          label: 'e_r (arah diagonal ke O)',
          spokenLabel: 'sumbu radial sepanjang diagonal ke pusat O',
          color: '#64748B',
          angleDeg: 270,
          lengthRatio: 0.9,
          category: 'axis',
          explanation: 'Diagonal persegi menghubungkan titik sudut dengan pusat simetri O.',
        },
        {
          id: 'v-total',
          label: 'v (sepanjang sisi)',
          spokenLabel: 'vektor kecepatan sepanjang sisi persegi',
          color: '#7C3AED',
          angleDeg: 225,
          lengthRatio: 0.95,
          category: 'velocity',
          explanation: 'Sisi persegi membentuk sudut tepat 45° terhadap diagonal menuju pusat.',
        },
        {
          id: 'v-r',
          label: 'v_r = v/√2',
          spokenLabel: 'komponen radial sebesar v dibagi akar dua',
          color: '#059669',
          angleDeg: 270,
          lengthRatio: 0.67,
          category: 'component',
          explanation: 'Komponen radial sama besar dengan komponen tangensial karena sudutnya 45°.',
        },
        {
          id: 'v-theta',
          label: 'v_θ = v/√2',
          spokenLabel: 'komponen tangensial sebesar v dibagi akar dua',
          color: '#0284C7',
          angleDeg: 180,
          lengthRatio: 0.67,
          category: 'component',
          explanation: 'Komponen tangensial memutar persegi secara kontinu.',
        },
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Posisi Awal di Titik Sudut Persegi',
          description: 'Jarak awal ke pusat adalah R₀ = 8,5 m.',
          visibleVectorIds: [],
        },
        {
          stepNumber: 2,
          title: 'Sumbu Diagonal Menuju Pusat',
          description: 'Diagonal menjadi sumbu radial.',
          visibleVectorIds: ['axis-r'],
        },
        {
          stepNumber: 3,
          title: 'Komponen Simetris 45°',
          description: 'Komponen radial dan tangensial bernilai sama persis: v / √2.',
          visibleVectorIds: ['axis-r', 'v-total', 'v-r', 'v-theta'],
          equationLatex: 'v_r = v\\cos(45^\\circ) = \\frac{v}{\\sqrt{2}}',
        },
        {
          stepNumber: 4,
          title: 'Invariansi Jarak Tempuh Terhadap Kelajuan',
          description: 'Jarak tempuh a = v T = R₀√2 tidak bergantung pada nilai v.',
          visibleVectorIds: ['axis-r', 'v-total', 'v-r'],
          equationLatex: 'a = v\\left(\\frac{R_0}{v/\\sqrt{2}}\\right) = R_0\\sqrt{2}',
        },
      ],
    },
    problemSpokenText:
      'Soal nomor 3. Empat partikel pada titik sudut persegi berjari-jari luar delapan koma lima meter bergerak saling mengejar dengan laju konstan tiga meter per detik hingga bertemu di pusat. Hitunglah jarak tempuh total salah satu partikel dalam meter.',
    solutionSections: [
      {
        id: 's3-1',
        title: '1. Memahami Permasalahan',
        highlightType: 'none',
        paragraphs: [
          'Empat partikel berada di sudut persegi dengan jarak ke pusat R₀ = 8,5 m dan bergerak dengan kelajuan konstan v = 3,0 m/s menuju partikel tetangganya.',
          'Yang ditanyakan adalah jarak tempuh total a (panjang lintasan spiral) hingga bertemu di pusat.',
        ],
        spokenText:
          'Empat partikel di sudut persegi berjarak awal delapan koma lima meter ke pusat saling mengejar dengan laju tiga meter per detik.',
      },
      {
        id: 's3-2',
        title: '2. Identifikasi Konsep Fisika',
        highlightType: 'prinsip',
        paragraphs: [
          'Pada persegi (N = 4), simetri rotasional 90° menjamin keempat partikel selalu membentuk persegi yang menyusut. Jarak perpindahan tiap partikel sama dengan R₀ = 8,5 m.',
        ],
        spokenText:
          'Simetri persegi menjaga bentuknya tetap persegi sempurna sepanjang penyusutan menuju pusat.',
      },
      {
        id: 's3-3',
        title: '3. Visualisasi Fenomena',
        highlightType: 'none',
        paragraphs: [
          'Menariknya, pada N = 4 kecepatan partikel kedua selalu tegak lurus terhadap kecepatan partikel pertama! Karena v₂ tegak lurus garis hubung P₁P₂, laju pendekatan sepanjang sisi persis sama dengan v (yaitu panjang sisi awal s₀ = R₀√2 dibagi v)!',
        ],
        spokenText:
          'Pada persegi, kecepatan partikel di depan tepat tegak lurus terhadap sisi penghubung, sehingga jarak tempuh langsung sama dengan panjang sisi awal persegi.',
      },
      {
        id: 's3-4',
        title: '4. Diagram Vektor Kinematika',
        highlightType: 'none',
        paragraphs: [
          'Diagonal persegi membagi sudut siku-siku 90° menjadi dua sudut 45°. Dengan demikian, v terurai menjadi dua komponen yang sama besar sepanjang diagonal dan tegak lurus diagonal.',
        ],
        spokenText:
          'Diagonal membagi sudut sembilan puluh derajat menjadi empat puluh lima derajat, menghasilkan komponen radial dan tangensial yang sama besar.',
      },
      {
        id: 's3-5',
        title: '5. Menentukan Persamaan Dasar',
        highlightType: 'rumus',
        paragraphs: ['Persamaan laju penyusutan jari-jari luar R adalah:'],
        equations: ['-\\frac{dR}{dt} = v\\sin\\left(\\frac{\\pi}{4}\\right) = \\frac{v}{\\sqrt{2}}'],
        spokenText: 'Minus d R per d t sama dengan v dibagi akar dua.',
      },
      {
        id: 's3-6',
        title: '6. Penurunan Persamaan',
        highlightType: 'kritis',
        paragraphs: [
          'Integrasikan untuk memperoleh waktu temu T, lalu kalikan dengan v untuk mendapatkan jarak tempuh a:',
        ],
        equations: [
          'T = \\frac{R_0}{v/\\sqrt{2}} = \\frac{R_0\\sqrt{2}}{v} \\implies a = v\\,T = R_0\\sqrt{2}',
        ],
        spokenText:
          'Waktu temu T adalah R nol akar dua dibagi v, sehingga jarak tempuh a sama dengan v dikali T yaitu R nol dikali akar dua.',
      },
      {
        id: 's3-7',
        title: '7. Substitusi Angka',
        highlightType: 'none',
        paragraphs: ['Masukkan nilai R₀ = 8,5 m:'],
        equations: ['a = 8{,}5 \\times \\sqrt{2}\\text{ m}'],
        spokenText: 'Substitusikan R nol delapan koma lima meter dikali akar dua.',
      },
      {
        id: 's3-8',
        title: '8. Perhitungan Matematis',
        highlightType: 'none',
        paragraphs: ['Gunakan √2 ≈ 1,41421356:'],
        equations: ['a = 8{,}5 \\times 1{,}41421356 = 12{,}020815...\\text{ m}'],
        spokenText: 'Delapan koma lima dikali satu koma empat satu empat dua menghasilkan dua belas koma nol dua meter.',
      },
      {
        id: 's3-9',
        title: '9. Hasil Akhir',
        highlightType: 'hasil',
        paragraphs: ['Dibulatkan satu angka desimal:'],
        equations: ['a = 12{,}0\\text{ m}'],
        spokenText: 'Hasil akhirnya adalah dua belas koma nol meter.',
      },
      {
        id: 's3-10',
        title: '10. Interpretasi Fisis',
        highlightType: 'none',
        paragraphs: [
          'Fakta indah pada persegi adalah panjang lintasan spiral setiap partikel tepat sama dengan panjang sisi awal persegi s₀ = R₀√2 ≈ 12,0 m, sebab kecepatan partikel yang dikejar selalu tegak lurus terhadap garis hubung sehingga tidak memengaruhi laju pendekatan sepanjang sisi!',
        ],
        spokenText:
          'Panjang lintasan spiral pada persegi tepat sama dengan panjang sisi awal persegi, yaitu dua belas koma nol meter.',
      },
      {
        id: 's3-11',
        title: '11. Strategi Cepat Olimpiade',
        highlightType: 'none',
        paragraphs: [
          'Khusus persegi (N = 4), jarak tempuh = panjang sisi awal s₀ = R₀√2. Anda bahkan tidak memerlukan nilai kelajuan v untuk menjawab jarak tempuh!',
        ],
        spokenText:
          'Strategi cepat untuk persegi: jarak tempuh selalu sama dengan panjang sisi awal persegi.',
      },
      {
        id: 's3-12',
        title: '12. Kesalahan yang Harus Dihindari',
        highlightType: 'none',
        paragraphs: [
          'Jangan mengira R₀ = 8,5 m adalah panjang sisi persegi! Soal menyatakan R₀ sebagai jarak ke pusat (jari-jari luar), sehingga sisi persegi s₀ = 8,5√2 m.',
        ],
        spokenText:
          'Pastikan Anda membaca teliti bahwa delapan koma lima meter adalah jarak ke pusat, bukan panjang sisi persegi.',
      },
    ],
  },

  // SOAL 4
  {
    id: 4,
    shortTitle: 'Komponen Kecepatan Radial pada Segienam Beraturan',
    tier: 'Tingkat 2 · Variasi Parameter',
    tierIndex: 2,
    subtopic: 'Penguraian Vektor pada Segienam (N = 6)',
    stimulusType: 'Diagram Segienam Beraturan & Vektor Komponen',
    questionText:
      'Enam partikel identik diletakkan di titik-titik sudut sebuah segienam beraturan dengan panjang sisi s₀ = 12,0 m. Setiap partikel bergerak dengan kelajuan konstan v = 3,0 m/s selalu menuju partikel tetangganya secara siklik. Tentukan besar komponen kecepatan setiap partikel yang mengarah langsung ke pusat segienam (dalam m/s)!',
    knownData: [
      { symbol: 'N', label: 'Jumlah partikel (segienam)', valueWithUnit: '6 partikel' },
      { symbol: 's₀', label: 'Panjang sisi awal', valueWithUnit: '12,0 m' },
      { symbol: 'v', label: 'Kelajuan konstan', valueWithUnit: '3,0 m/s' },
    ],
    askedQuantity: { symbol: 'v_r', label: 'Komponen kecepatan menuju pusat', unit: 'm/s' },
    answerUnitLabel: 'm/s',
    exactValue: 3.0 * Math.sin(30 * DEG),
    expectedFormatted: '1,5',
    tolerance: 0.05,
    hints: [
      'Pada segienam beraturan, pusat O dan dua titik sudut bersebelahan membentuk segitiga sama sisi!',
      'Berapakah besar sudut antara sisi segienam dan garis jari-jari dari titik sudut ke pusat O?',
      'Sudut tersebut adalah 60°. Komponen kecepatan ke pusat adalah v cos(60°) = v sin(30°).',
    ],
    conceptualFeedbackOnWrong:
      'Pada segienam beraturan, sudut dalam di titik sudut adalah 120°, sehingga garis radial ke pusat membagi sudut tersebut menjadi 60°. Komponen menuju pusat adalah v cos(60°), bukan v sin(60°).',
    conceptualFeedbackOnRight:
      'Tepat! Pada segienam beraturan, segitiga OP₁P₂ adalah segitiga sama sisi sehingga sudut terhadap radial adalah 60°, dan v_r = 3,0 × cos(60°) = 1,5 m/s.',
    simulation: {
      kind: 'polygon-pursuit',
      n: 6,
      R0: 12.0,
      v0: 3.0,
      stepSkip: 1,
      tiltDeg: 0,
      clockwise: false,
    },
    fbd: {
      objectName: 'Partikel pada Titik Sudut Segienam',
      frameDescription: 'Penguraian vektor kecepatan v pada sudut 60° terhadap garis radial.',
      hasRealForce: false,
      referenceAngleDeg: 90,
      vectors: [
        {
          id: 'axis-r',
          label: 'e_r (menuju O)',
          spokenLabel: 'arah radial menuju pusat O',
          color: '#64748B',
          angleDeg: 270,
          lengthRatio: 0.9,
          category: 'axis',
          explanation: 'Garis jari-jari menghubungkan titik sudut ke pusat segienam.',
        },
        {
          id: 'v-total',
          label: 'v (3,0 m/s)',
          spokenLabel: 'vektor kecepatan 3 meter per detik sepanjang sisi',
          color: '#7C3AED',
          angleDeg: 210,
          lengthRatio: 0.95,
          category: 'velocity',
          explanation: 'Membentuk sudut 60° terhadap sumbu radial menuju pusat.',
        },
        {
          id: 'v-r',
          label: 'v_r = 1,5 m/s',
          spokenLabel: 'komponen radial 1,5 meter per detik',
          color: '#059669',
          angleDeg: 270,
          lengthRatio: 0.48,
          category: 'component',
          explanation: 'v_r = v cos(60°) = 1,5 m/s.',
        },
        {
          id: 'v-theta',
          label: 'v_θ = 2,6 m/s',
          spokenLabel: 'komponen tangensial 2,6 meter per detik',
          color: '#0284C7',
          angleDeg: 180,
          lengthRatio: 0.82,
          category: 'component',
          explanation: 'v_θ = v sin(60°) ≈ 2,6 m/s mendominasi gerak putar.',
        },
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Geometri Segienam Beraturan',
          description: 'Panjang jari-jari luar R₀ sama dengan panjang sisi s₀ = 12,0 m.',
          visibleVectorIds: [],
        },
        {
          stepNumber: 2,
          title: 'Menentukan Arah Radial',
          description: 'Sudut pusat tiap sektor segienam adalah 360°/6 = 60°.',
          visibleVectorIds: ['axis-r'],
        },
        {
          stepNumber: 3,
          title: 'Proyeksi Kecepatan ke Pusat',
          description: 'Proyeksikan v pada arah e_r menggunakan kosinus sudut apit 60°.',
          visibleVectorIds: ['axis-r', 'v-total', 'v-r', 'v-theta'],
          equationLatex: 'v_r = v\\cos(60^\\circ) = v\\sin(30^\\circ)',
        },
        {
          stepNumber: 4,
          title: 'Konfirmasi Independen dari Nilai s₀',
          description: 'Komponen radial konstan sepanjang gerak dan tidak bergantung pada s₀.',
          visibleVectorIds: ['axis-r', 'v-total', 'v-r'],
          equationLatex: 'v_r = 3{,}0 \\times 0{,}5 = 1{,}5\\text{ m/s}',
        },
      ],
    },
    problemSpokenText:
      'Soal nomor 4. Enam partikel identik berada di titik sudut segienam beraturan bersisi dua belas meter. Setiap partikel bergerak dengan laju konstan tiga meter per detik menuju partikel di sebelahnya. Tentukan besar komponen kecepatan yang mengarah langsung ke pusat segienam dalam meter per detik.',
    solutionSections: [
      {
        id: 's4-1',
        title: '1. Memahami Permasalahan',
        highlightType: 'none',
        paragraphs: [
          'Enam partikel bergerak saling mengejar dari titik sudut segienam beraturan bersisi s₀ = 12,0 m dengan laju konstan v = 3,0 m/s.',
          'Pertanyaan meminta besar komponen kecepatan radial v_r yang mengarah langsung ke pusat segienam.',
        ],
        spokenText:
          'Kita diminta mencari besar komponen kecepatan radial menuju pusat pada segienam beraturan ketika laju tiap partikel tiga meter per detik.',
      },
      {
        id: 's4-2',
        title: '2. Identifikasi Konsep Fisika',
        highlightType: 'prinsip',
        paragraphs: [
          'Segienam beraturan memiliki 6 segitiga sama sisi penyusun dari pusat O ke setiap sisinya. Oleh karena itu, sepanjang gerakan, sudut antara sisi segienam (arah v) dan jari-jari ke pusat selalu tepat 60°.',
        ],
        spokenText:
          'Segienam beraturan tersusun dari enam segitiga sama sisi, sehingga sudut antara sisi dan garis jari-jari selalu enam puluh derajat.',
      },
      {
        id: 's4-3',
        title: '3. Visualisasi Fenomena',
        highlightType: 'none',
        paragraphs: [
          'Pada simulasi, segienam berputar lebih banyak sebelum mencapai pusat dibandingkan segitiga atau persegi karena komponen tangensialnya (v sin 60°) jauh lebih besar daripada komponen radialnya (v cos 60°).',
        ],
        spokenText:
          'Animasi memperlihatkan komponen tangensial lebih dominan sehingga segienam berotasi cukup banyak sambil menyusut.',
      },
      {
        id: 's4-4',
        title: '4. Diagram Vektor Kinematika',
        highlightType: 'none',
        paragraphs: [
          'Vektor kecepatan v sepanjang sisi membentuk sudut 60° terhadap sumbu radial menuju pusat O. Proyeksi ke arah sumbu radial memberikan v_r.',
        ],
        spokenText: 'Proyeksi vektor v pada sumbu radial menggunakan kosinus enam puluh derajat.',
      },
      {
        id: 's4-5',
        title: '5. Menentukan Persamaan Dasar',
        highlightType: 'rumus',
        paragraphs: ['Untuk segi-N beraturan secara umum:'],
        equations: ['v_r = v\\sin\\left(\\frac{\\pi}{N}\\right) = v\\cos\\left(\\frac{\\pi}{2} - \\frac{\\pi}{N}\\right)'],
        spokenText: 'Rumus dasarnya v radial sama dengan v sinus pi per N.',
      },
      {
        id: 's4-6',
        title: '6. Penurunan Persamaan',
        highlightType: 'kritis',
        paragraphs: ['Untuk N = 6, π/6 = 30°, sehingga:'],
        equations: ['v_r = v\\sin(30^\\circ) = v\\cos(60^\\circ) = \\frac{1}{2}v'],
        spokenText: 'Untuk N sama dengan enam, sinus tiga puluh derajat adalah setengah, sehingga v radial tepat setengah dari v.',
      },
      {
        id: 's4-7',
        title: '7. Substitusi Angka',
        highlightType: 'none',
        paragraphs: ['Masukkan v = 3,0 m/s (nilai s₀ = 12,0 m merupakan data konteks ukuran sistem):'],
        equations: ['v_r = 3{,}0 \\times 0{,}5'],
        spokenText: 'Substitusikan v tiga koma nol dikali nol koma lima.',
      },
      {
        id: 's4-8',
        title: '8. Perhitungan Matematis',
        highlightType: 'none',
        paragraphs: ['Kalikan langsung:'],
        equations: ['v_r = 1{,}5\\text{ m/s}'],
        spokenText: 'Tiga dikali setengah sama dengan satu koma lima meter per detik.',
      },
      {
        id: 's4-9',
        title: '9. Hasil Akhir',
        highlightType: 'hasil',
        paragraphs: ['Besar komponen kecepatan menuju pusat adalah:'],
        equations: ['v_r = 1{,}5\\text{ m/s}'],
        spokenText: 'Hasil akhirnya satu koma lima meter per detik.',
      },
      {
        id: 's4-10',
        title: '10. Interpretasi Fisis',
        highlightType: 'none',
        paragraphs: [
          'Karena v_r = 1,5 m/s dan R₀ = s₀ = 12,0 m, maka jarak tempuh total adalah a = 2 R₀ = 24,0 m (dua kali perpindahannya), dan waktu pertemuannya T = 12,0 / 1,5 = 8,0 s.',
        ],
        spokenText:
          'Dengan komponen radial satu koma lima meter per detik, segienam memerlukan delapan detik untuk bertemu di pusat.',
      },
      {
        id: 's4-11',
        title: '11. Strategi Cepat Olimpiade',
        highlightType: 'none',
        paragraphs: [
          'Pada segienam beraturan, a/b = 1/sin(30°) = 2 tepat! Komponen radial ke pusat selalu setengah dari kelajuan partikel.',
        ],
        spokenText:
          'Fakta penting untuk segienam beraturan: komponen kecepatan menuju pusat selalu tepat setengah dari kelajuan gerak.',
      },
      {
        id: 's4-12',
        title: '12. Kesalahan yang Harus Dihindari',
        highlightType: 'none',
        paragraphs: [
          'Jangan terkecoh menggunakan data s₀ = 12,0 m secara paksa ke dalam rumus v_r. Panjang sisi menentukan waktu bertemu, tetapi tidak mengubah besar komponen kecepatan sesaat.',
        ],
        spokenText:
          'Hindari kesalahan memaksa angka panjang sisi dua belas meter masuk ke rumus komponen kecepatan.',
      },
    ],
  },

  // SOAL 5
  {
    id: 5,
    shortTitle: 'Waktu Pertemuan Segilima dengan Panjang Sisi Diketahui',
    tier: 'Tingkat 2 · Variasi Parameter',
    tierIndex: 2,
    subtopic: 'Waktu Tempuh & Geometri Sisi Segilima',
    stimulusType: 'Diagram Robot pada Segilima Beraturan',
    questionText:
      'Lima robot mini berada pada titik-titik sudut sebuah segilima beraturan dengan panjang sisi awal s₀ = 15,0 m. Setiap robot bergerak dengan laju konstan v = 2,5 m/s dan arahnya selalu menuju robot di sebelahnya secara berurutan. Tentukan waktu total yang diperlukan hingga kelima robot bertemu (dalam sekon)!',
    knownData: [
      { symbol: 'N', label: 'Jumlah robot (segilima)', valueWithUnit: '5 robot' },
      { symbol: 's₀', label: 'Panjang sisi awal', valueWithUnit: '15,0 m' },
      { symbol: 'v', label: 'Kelajuan konstan', valueWithUnit: '2,5 m/s' },
    ],
    askedQuantity: { symbol: 'T', label: 'Waktu total pertemuan', unit: 's' },
    answerUnitLabel: 's',
    exactValue: 15.0 / (2.5 * (1 - Math.cos(72 * DEG))),
    expectedFormatted: '8,7',
    tolerance: 0.05,
    hints: [
      'Di soal ini yang diketahui adalah panjang sisi s₀ = 15,0 m, BUKAN jari-jari luar R₀.',
      'Gunakan metode laju pemendekan sisi: -ds/dt = v - v cos(72°), karena vektor kecepatan robot di depan berbelok 72° dari sisi saat ini.',
      'Atau ubah dulu s₀ ke jari-jari luar R₀ = s₀ / (2 sin 36°), lalu hitung T = R₀ / (v sin 36°).',
    ],
    conceptualFeedbackOnWrong:
      'Periksa apakah Anda mengira s₀ = 15,0 m adalah jari-jari luar R₀! Panjang sisi s₀ berkaitan dengan R₀ melalui s₀ = 2 R₀ sin(36°).',
    conceptualFeedbackOnRight:
      'Sempurna! Menggunakan laju pemendekan sisi v(1 - cos 72°) = 2,5 × 0,69098 = 1,7275 m/s menghasilkan waktu pertemuan T = 15,0 / 1,7275 = 8,68 s → 8,7 s.',
    simulation: {
      kind: 'polygon-pursuit',
      n: 5,
      R0: 15.0 / (2 * Math.sin(36 * DEG)),
      v0: 2.5,
      stepSkip: 1,
      tiltDeg: 0,
      clockwise: false,
    },
    fbd: {
      objectName: 'Dua Robot Bertetangga R₁ dan R₂',
      frameDescription: 'Perbandingan vektor kecepatan sepanjang dua sisi berurutan segilima (sudut belok 72°).',
      hasRealForce: false,
      referenceAngleDeg: 90,
      vectors: [
        {
          id: 'axis-r',
          label: 'e_r (radial ke O)',
          spokenLabel: 'garis radial menuju pusat O',
          color: '#64748B',
          angleDeg: 270,
          lengthRatio: 0.85,
          category: 'axis',
          explanation: 'Arah menuju pusat segilima O.',
        },
        {
          id: 'v-total',
          label: 'v₁ (2,5 m/s)',
          spokenLabel: 'kecepatan robot satu menuju robot dua',
          color: '#7C3AED',
          angleDeg: 216,
          lengthRatio: 0.95,
          category: 'velocity',
          explanation: 'Robot 1 mengejar sepanjang sisi dengan kecepatan penuh 2,5 m/s.',
        },
        {
          id: 'v-r',
          label: 'v_r = v sin(36°)',
          spokenLabel: 'komponen radial ke pusat',
          color: '#059669',
          angleDeg: 270,
          lengthRatio: 0.56,
          category: 'component',
          explanation: 'v_r = 2,5 sin(36°) ≈ 1,47 m/s.',
        },
        {
          id: 'v-theta',
          label: 'v_θ = v cos(36°)',
          spokenLabel: 'komponen tangensial',
          color: '#0284C7',
          angleDeg: 180,
          lengthRatio: 0.77,
          category: 'component',
          explanation: 'v_θ = 2,5 cos(36°) ≈ 2,02 m/s.',
        },
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Konversi Panjang Sisi ke Jari-Jari Luar',
          description: 'Hubungan geometri segilima memberikan R₀ = s₀ / (2 sin 36°).',
          visibleVectorIds: [],
          equationLatex: 'R_0 = \\frac{15{,}0}{2\\sin(36^\\circ)} \\approx 12{,}76\\text{ m}',
        },
        {
          stepNumber: 2,
          title: 'Menentukan Arah Radial',
          description: 'Tetapkan sumbu radial menuju pusat segilima O.',
          visibleVectorIds: ['axis-r'],
        },
        {
          stepNumber: 3,
          title: 'Urai Kecepatan Robot',
          description: 'Kecepatan 2,5 m/s terurai menjadi komponen radial dan tangensial.',
          visibleVectorIds: ['axis-r', 'v-total', 'v-r', 'v-theta'],
        },
        {
          stepNumber: 4,
          title: 'Persamaan Waktu Pertemuan',
          description: 'T = R₀ / (v sin 36°) = s₀ / [2v sin²(36°)] = s₀ / [v(1 - cos 72°)].',
          visibleVectorIds: ['axis-r', 'v-total', 'v-r'],
          equationLatex: 'T = \\frac{s_0}{v(1 - \\cos 72^\\circ)}',
        },
      ],
    },
    problemSpokenText:
      'Soal nomor 5. Lima robot mini berada di sudut segilima beraturan dengan panjang sisi awal lima belas meter. Setiap robot bergerak dengan laju konstan dua koma lima meter per detik selalu menuju robot di sebelahnya. Tentukan waktu total hingga kelima robot bertemu dalam sekon.',
    solutionSections: [
      {
        id: 's5-1',
        title: '1. Memahami Permasalahan',
        highlightType: 'none',
        paragraphs: [
          'Diketahui panjang sisi segilima beraturan awal s₀ = 15,0 m dan kelajuan tiap robot v = 2,5 m/s. Ditanyakan waktu T hingga kelima robot berkumpul di pusat.',
        ],
        spokenText: 'Diketahui panjang sisi awal lima belas meter dan laju dua koma lima meter per detik.',
      },
      {
        id: 's5-2',
        title: '2. Identifikasi Konsep Fisika',
        highlightType: 'prinsip',
        paragraphs: [
          'Kita dapat menggunakan Metode Kecepatan Pendekatan Sisi: laju berkurangnya panjang sisi s antara dua robot berurutan sama dengan selisih proyeksi kecepatan keduanya pada garis sisi penghubung.',
        ],
        spokenText:
          'Kita gunakan laju pemendekan sisi yang merupakan kecepatan relatif antara dua robot bertetangga.',
      },
      {
        id: 's5-3',
        title: '3. Visualisasi Fenomena',
        highlightType: 'none',
        paragraphs: [
          'Sepanjang simulasi, sisi segilima memendek secara linear terhadap waktu: s(t) = s₀ - v(1 - cos 72°) t hingga menjadi nol tepat pada t = T.',
        ],
        spokenText: 'Panjang sisi segilima menyusut secara linear terhadap waktu hingga mencapai nol.',
      },
      {
        id: 's5-4',
        title: '4. Diagram Vektor Kinematika',
        highlightType: 'none',
        paragraphs: [
          'Robot 1 bergerak searah sisi menuju Robot 2 dengan laju penuh v, sedangkan Robot 2 bergerak sepanjang sisi berikutnya yang miring sebesar sudut luar 72° menjauhi arah sisi pertama.',
        ],
        spokenText:
          'Robot kedua bergerak menyimpang tujuh puluh dua derajat dari arah sisi pertama.',
      },
      {
        id: 's5-5',
        title: '5. Menentukan Persamaan Dasar',
        highlightType: 'rumus',
        paragraphs: ['Persamaan laju pemendekan panjang sisi s(t) adalah:'],
        equations: ['-\\frac{ds}{dt} = v - v\\cos(72^\\circ) = v(1 - \\cos 72^\\circ)'],
        spokenText: 'Minus d s per d t sama dengan v dikali satu minus kosinus tujuh puluh dua derajat.',
      },
      {
        id: 's5-6',
        title: '6. Penurunan Persamaan',
        highlightType: 'kritis',
        paragraphs: [
          'Karena 1 - cos(72°) = 2 sin²(36°), persamaan ini setara dengan konversi R₀ = s₀ / (2 sin 36°). Integrasi dari s = s₀ ke s = 0 menghasilkan:',
        ],
        equations: ['T = \\frac{s_0}{v(1 - \\cos 72^\\circ)}'],
        spokenText: 'Integrasi langsung memberikan T sama dengan s nol dibagi v kali satu minus kosinus tujuh puluh dua derajat.',
      },
      {
        id: 's5-7',
        title: '7. Substitusi Angka',
        highlightType: 'none',
        paragraphs: ['Dengan cos(72°) = (√5 - 1)/4 ≈ 0,309017:'],
        equations: ['T = \\frac{15{,}0}{2{,}5 \\times (1 - 0{,}309017)}'],
        spokenText: 'Masukkan s nol lima belas, v dua koma lima, dan kosinus tujuh puluh dua derajat nol koma tiga nol sembilan.',
      },
      {
        id: 's5-8',
        title: '8. Perhitungan Matematis',
        highlightType: 'none',
        paragraphs: ['Hitung secara presisi:'],
        equations: ['T = \\frac{15{,}0}{2{,}5 \\times 0{,}690983} = \\frac{15{,}0}{1{,}7274575} = 8{,}68328...\\text{ s}'],
        spokenText: 'Lima belas dibagi satu koma tujuh dua tujuh empat menghasilkan delapan koma enam delapan tiga sekon.',
      },
      {
        id: 's5-9',
        title: '9. Hasil Akhir',
        highlightType: 'hasil',
        paragraphs: ['Dibulatkan satu angka di belakang koma:'],
        equations: ['T = 8{,}7\\text{ s}'],
        spokenText: 'Hasil akhirnya adalah delapan koma tujuh sekon.',
      },
      {
        id: 's5-10',
        title: '10. Interpretasi Fisis',
        highlightType: 'none',
        paragraphs: [
          'Setiap robot menempuh jarak a = 2,5 × 8,6833 = 21,7 m, padahal jarak garis lurus ke pusat hanya sekitar 12,8 m.',
        ],
        spokenText: 'Setiap robot menempuh lintasan dua puluh satu koma tujuh meter selama delapan koma tujuh detik.',
      },
      {
        id: 's5-11',
        title: '11. Strategi Cepat Olimpiade',
        highlightType: 'none',
        paragraphs: [
          'Apabila soal memberi panjang sisi s₀, langsung pakai T = s₀ / [v(1 - cos(2π/N))] tanpa perlu mencari R₀ terlebih dahulu.',
        ],
        spokenText: 'Jika panjang sisi diketahui, langsung pakai faktor satu minus kosinus dua pi per N.',
      },
      {
        id: 's5-12',
        title: '12. Kesalahan yang Harus Dihindari',
        highlightType: 'none',
        paragraphs: [
          'Jangan menggunakan rumus T = s₀ / (v sin 36°)! Rumus yang memakai sin(36°) di penyebut mensyaratkan jari-jari R₀ di pembilang, bukan sisi s₀.',
        ],
        spokenText:
          'Jangan mencampuradukkan panjang sisi s nol dengan jari-jari luar R nol dalam rumus sinus tiga puluh enam derajat.',
      },
    ],
  },

  // SOAL 6
  {
    id: 6,
    shortTitle: 'Perbandingan Jarak & Perpindahan pada Segidelapan',
    tier: 'Tingkat 2 · Variasi Parameter',
    tierIndex: 2,
    subtopic: 'Generalisasi Segi-N Beraturan (N = 8)',
    stimulusType: 'Diagram Segidelapan Beraturan (Oktagon)',
    questionText:
      'Delapan partikel ditempatkan pada titik-titik sudut sebuah segidelapan beraturan (oktagon) dan bergerak saling mengejar dengan kelajuan konstan v, arahnya selalu menuju partikel lain di sebelahnya hingga semua partikel bertemu di pusat. Jika jarak tempuh dan perpindahan salah satu partikel masing-masing adalah a dan b, tentukan nilai perbandingan a/b!',
    knownData: [
      { symbol: 'N', label: 'Jumlah partikel (oktagon)', valueWithUnit: '8 partikel' },
      { symbol: 'v', label: 'Kelajuan partikel', valueWithUnit: 'konstan' },
    ],
    askedQuantity: { symbol: 'a/b', label: 'Nilai perbandingan a dan b', unit: 'tanpa satuan' },
    answerUnitLabel: 'tanpa satuan',
    exactValue: 1 / Math.sin(22.5 * DEG),
    expectedFormatted: '2,6',
    tolerance: 0.05,
    hints: [
      'Gunakan rumus generalisasi poligon beraturan bersisi N: rasio a/b = 1 / sin(π/N).',
      'Untuk segidelapan (N = 8), sudut π/8 sama dengan 180°/8 = 22,5°.',
      'Anda bisa menghitung sin(22,5°) menggunakan identitas setengah sudut: sin(22,5°) = √[(1 - cos 45°)/2].',
    ],
    conceptualFeedbackOnWrong:
      'Periksa kembali sudut setengah pusatnya: untuk N = 8, sudut pusat antar partikel adalah 360°/8 = 45°, sehingga setengahnya adalah 22,5°. Nilai a/b = 1 / sin(22,5°).',
    conceptualFeedbackOnRight:
      'Brilian! Anda mampu menggeneralisasi pola Soal Nomor 4 ke segi-8 beraturan dengan sudut setengah pusat 22,5°, memperoleh a/b ≈ 2,6.',
    simulation: {
      kind: 'polygon-pursuit',
      n: 8,
      R0: 10,
      v0: 2.5,
      stepSkip: 1,
      tiltDeg: 0,
      clockwise: false,
    },
    fbd: {
      objectName: 'Partikel pada Titik Sudut Oktagon (N = 8)',
      frameDescription: 'Vektor kecepatan hampir tangensial dengan sudut 67,5° terhadap garis menuju pusat.',
      hasRealForce: false,
      referenceAngleDeg: 90,
      vectors: [
        {
          id: 'axis-r',
          label: 'e_r (ke pusat O)',
          spokenLabel: 'arah radial ke pusat O',
          color: '#64748B',
          angleDeg: 270,
          lengthRatio: 0.9,
          category: 'axis',
          explanation: 'Arah menuju pusat oktagon.',
        },
        {
          id: 'v-total',
          label: 'v (sudut 67,5°)',
          spokenLabel: 'vektor kecepatan membentuk 67,5 derajat terhadap radial',
          color: '#7C3AED',
          angleDeg: 202.5,
          lengthRatio: 0.95,
          category: 'velocity',
          explanation: 'Arah kecepatan semakin mendekati garis singgung lingkaran.',
        },
        {
          id: 'v-r',
          label: 'v_r = v sin(22,5°)',
          spokenLabel: 'komponen radial kecil',
          color: '#059669',
          angleDeg: 270,
          lengthRatio: 0.36,
          category: 'component',
          explanation: 'Hanya 38,3% laju yang mengarah ke pusat!',
        },
        {
          id: 'v-theta',
          label: 'v_θ = v cos(22,5°)',
          spokenLabel: 'komponen tangensial dominan',
          color: '#0284C7',
          angleDeg: 180,
          lengthRatio: 0.88,
          category: 'component',
          explanation: '92,4% laju dihabiskan untuk berputar mengelilingi pusat.',
        },
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Konfigurasi Oktagon Beraturan',
          description: 'Sudut pusat tiap sisi adalah 360°/8 = 45°.',
          visibleVectorIds: [],
        },
        {
          stepNumber: 2,
          title: 'Sumbu Koordinat Lokal',
          description: 'Garis radial ke pusat membentuk sudut 67,5° dengan sisi oktagon.',
          visibleVectorIds: ['axis-r'],
        },
        {
          stepNumber: 3,
          title: 'Dominasi Komponen Tangensial',
          description: 'v_r jauh lebih kecil daripada v_θ sehingga spiral melingkar lebih rapat.',
          visibleVectorIds: ['axis-r', 'v-total', 'v-r', 'v-theta'],
          equationLatex: 'v_r = v\\cos(67{,}5^\\circ) = v\\sin(22{,}5^\\circ)',
        },
        {
          stepNumber: 4,
          title: 'Rasio Jarak Tempuh dan Perpindahan',
          description: 'a/b = 1 / sin(22,5°) ≈ 2,6.',
          visibleVectorIds: ['axis-r', 'v-total', 'v-r'],
          equationLatex: '\\frac{a}{b} = \\frac{1}{\\sin(22{,}5^\\circ)}',
        },
      ],
    },
    problemSpokenText:
      'Soal nomor 6. Delapan partikel diletakkan di titik sudut segidelapan beraturan dan bergerak saling mengejar dengan kelajuan konstan hingga bertemu di pusat. Tentukan nilai perbandingan jarak tempuh a terhadap besar perpindahan b.',
    solutionSections: [
      {
        id: 's6-1',
        title: '1. Memahami Permasalahan',
        highlightType: 'none',
        paragraphs: [
          'Kasus serupa dengan Soal Nomor 4, tetapi jumlah partikel ditingkatkan menjadi N = 8 pada titik sudut segidelapan beraturan.',
        ],
        spokenText: 'Kita menganalisis segidelapan beraturan dengan delapan partikel yang saling mengejar.',
      },
      {
        id: 's6-2',
        title: '2. Identifikasi Konsep Fisika',
        highlightType: 'prinsip',
        paragraphs: [
          'Simetri rotasi orde-8 berlaku identik seperti orde-5: sepanjang gerak, delapan partikel selalu membentuk oktagon beraturan yang berotasi dan menyusut ke pusat tetap O.',
        ],
        spokenText: 'Simetri rotasi orde delapan menjamin oktagon menyusut secara seragam menuju pusat.',
      },
      {
        id: 's6-3',
        title: '3. Visualisasi Fenomena',
        highlightType: 'none',
        paragraphs: [
          'Bandingkan animasi oktagon dengan segitiga atau segilima: lintasan spiral oktagon berputar jauh lebih panjang sebelum sampai ke titik tengah.',
        ],
        spokenText: 'Pada simulasi terlihat lintasan spiral oktagon melingkar lebih panjang sebelum mencapai pusat.',
      },
      {
        id: 's6-4',
        title: '4. Diagram Vektor Kinematika',
        highlightType: 'none',
        paragraphs: [
          'Sudut dalam segidelapan adalah (8-2)×180°/8 = 135°, sehingga sudut terhadap garis radial ke pusat adalah 135°/2 = 67,5°.',
        ],
        spokenText: 'Sudut antara sisi oktagon dan garis radial adalah enam puluh tujuh koma lima derajat.',
      },
      {
        id: 's6-5',
        title: '5. Menentukan Persamaan Dasar',
        highlightType: 'rumus',
        paragraphs: ['Komponen kecepatan radial menuju pusat adalah:'],
        equations: ['v_r = -\\frac{dR}{dt} = v\\sin\\left(\\frac{180^\\circ}{8}\\right) = v\\sin(22{,}5^\\circ)'],
        spokenText: 'Komponen kecepatan radial adalah v dikali sinus dua puluh dua koma lima derajat.',
      },
      {
        id: 's6-6',
        title: '6. Penurunan Persamaan',
        highlightType: 'kritis',
        paragraphs: ['Integrasi laju radial dari R₀ = b hingga 0 memberikan:'],
        equations: [
          'T = \\frac{b}{v\\sin(22{,}5^\\circ)} \\implies \\frac{a}{b} = \\frac{v T}{b} = \\frac{1}{\\sin(22{,}5^\\circ)}',
        ],
        spokenText: 'Perbandingan a per b sama dengan satu dibagi sinus dua puluh dua koma lima derajat.',
      },
      {
        id: 's6-7',
        title: '7. Substitusi Angka',
        highlightType: 'none',
        paragraphs: ['Hitung sin(22,5°) secara analitik menggunakan rumus setengah sudut:'],
        equations: [
          '\\sin(22{,}5^\\circ) = \\sqrt{\\frac{1 - \\cos 45^\\circ}{2}} = \\sqrt{\\frac{1 - \\sqrt{2}/2}{2}} \\approx 0{,}3826834',
        ],
        spokenText: 'Nilai sinus dua puluh dua koma lima derajat adalah nol koma tiga delapan dua enam delapan.',
      },
      {
        id: 's6-8',
        title: '8. Perhitungan Matematis',
        highlightType: 'none',
        paragraphs: ['Hitung nilai rasio a/b:'],
        equations: ['\\frac{a}{b} = \\frac{1}{0{,}3826834} = 2{,}6131259...'],
        spokenText: 'Satu dibagi nol koma tiga delapan dua enam delapan sama dengan dua koma enam satu tiga.',
      },
      {
        id: 's6-9',
        title: '9. Hasil Akhir',
        highlightType: 'hasil',
        paragraphs: ['Dibulatkan satu angka desimal:'],
        equations: ['\\frac{a}{b} = 2{,}6'],
        spokenText: 'Hasil akhirnya adalah dua koma enam.',
      },
      {
        id: 's6-10',
        title: '10. Interpretasi Fisis',
        highlightType: 'none',
        paragraphs: [
          'Jarak tempuh menjadi 2,6 kali lipat perpindahannya! Ini mengonfirmasi hukum umum bahwa semakin besar N (mendekati lingkaran), jarak tempuh semakin panjang dibanding jarak ke pusat.',
        ],
        spokenText:
          'Semakin banyak jumlah partikel pada poligon, semakin panjang lintasan yang harus ditempuh relatif terhadap jari-jari.',
      },
      {
        id: 's6-11',
        title: '11. Strategi Cepat Olimpiade',
        highlightType: 'none',
        paragraphs: [
          'Untuk N besar, sin(π/N) ≈ π/N. Taksiran cepat untuk N = 8 adalah 8/π ≈ 2,55 — sangat dekat dengan nilai eksak 2,61!',
        ],
        spokenText:
          'Untuk memeriksa kewajaran hasil pada N besar, gunakan aproksimasi N dibagi pi.',
      },
      {
        id: 's6-12',
        title: '12. Kesalahan yang Harus Dihindari',
        highlightType: 'none',
        paragraphs: [
          'Jangan membagi 360° dengan 8 lalu langsung mengambil sin(45°)! Sudut yang masuk ke sin(π/N) adalah setengah dari sudut pusat, yaitu 180°/8 = 22,5°.',
        ],
        spokenText:
          'Jangan lupa membagi dua sudut pusat empat puluh lima derajat menjadi dua puluh dua koma lima derajat.',
      },
    ],
  },

  // SOAL 7
  {
    id: 7,
    shortTitle: 'Pengejaran Berhenti pada Jarak Aman Antar Drone',
    tier: 'Tingkat 3 · Variasi Konfigurasi',
    tierIndex: 3,
    subtopic: 'Kondisi Batas & Jarak Tempuh Parsial',
    stimulusType: 'Skema Lima Drone Berhenti pada Jarak Aman s_f',
    questionText:
      'Lima drone otonom ditempatkan di titik-titik sudut segilima beraturan dengan panjang sisi awal s₀ = 20,0 m. Masing-masing bergerak dengan kelajuan konstan v = 4,0 m/s selalu menuju drone di sebelahnya. Sistem anti-tabrakan menghentikan seluruh drone secara serentak tepat ketika jarak antar drone yang bertetangga menyusut menjadi s_f = 5,0 m. Berapakah jarak tempuh setiap drone selama proses tersebut (dalam meter)?',
    knownData: [
      { symbol: 'N', label: 'Jumlah drone (segilima)', valueWithUnit: '5 drone' },
      { symbol: 's₀', label: 'Panjang sisi awal', valueWithUnit: '20,0 m' },
      { symbol: 's_f', label: 'Panjang sisi akhir', valueWithUnit: '5,0 m' },
      { symbol: 'v', label: 'Kelajuan konstan', valueWithUnit: '4,0 m/s' },
    ],
    askedQuantity: { symbol: 'a', label: 'Jarak tempuh tiap drone', unit: 'm' },
    answerUnitLabel: 'm',
    exactValue: (20.0 - 5.0) / (1 - Math.cos(72 * DEG)),
    expectedFormatted: '21,7',
    tolerance: 0.05,
    hints: [
      'Karena laju penyusutan sisi -ds/dt = v(1 - cos 72°) konstan sepanjang waktu, pengurangan jarak sisi Δs = s₀ - s_f berbanding lurus dengan waktu tempuh.',
      'Waktu tempuh hingga s mencapai s_f adalah t = (s₀ - s_f) / [v(1 - cos 72°)].',
      'Jarak tempuh tiap drone adalah a = v × t, sehingga kelajuan v = 4,0 m/s saling meniadakan!',
    ],
    conceptualFeedbackOnWrong:
      'Ingat bahwa drone berhenti saat sisi mencapai 5,0 m (bukan saat bertemu di pusat!). Perubahan panjang sisi hanya sebesar Δs = 20,0 - 5,0 = 15,0 m.',
    conceptualFeedbackOnRight:
      'Tepat sekali! Dengan perubahan sisi Δs = 15,0 m dan laju pendekatan sisi konstan, diperoleh jarak tempuh a = 15,0 / (1 - cos 72°) ≈ 21,7 m.',
    simulation: {
      kind: 'polygon-pursuit',
      n: 5,
      R0: 20.0 / (2 * Math.sin(36 * DEG)),
      v0: 4.0,
      stepSkip: 1,
      tiltDeg: 0,
      stopSideLength: 5.0,
      clockwise: false,
    },
    fbd: {
      objectName: 'Drone pada Kondisi Batas s_f = 5,0 m',
      frameDescription: 'Analisis laju pendekatan sisi konstan dari s₀ = 20,0 m menuju s_f = 5,0 m.',
      hasRealForce: false,
      referenceAngleDeg: 90,
      vectors: [
        {
          id: 'axis-r',
          label: 'e_r (ke pusat O)',
          spokenLabel: 'arah radial menuju pusat',
          color: '#64748B',
          angleDeg: 270,
          lengthRatio: 0.85,
          category: 'axis',
          explanation: 'Arah menuju pusat formasi drone.',
        },
        {
          id: 'v-total',
          label: 'v (4,0 m/s)',
          spokenLabel: 'kecepatan drone 4 meter per detik',
          color: '#7C3AED',
          angleDeg: 216,
          lengthRatio: 0.95,
          category: 'velocity',
          explanation: 'Laju konstan 4,0 m/s hingga sistem berhenti pada s = 5,0 m.',
        },
        {
          id: 'v-r',
          label: 'v_r = v sin(36°)',
          spokenLabel: 'komponen kecepatan radial',
          color: '#059669',
          angleDeg: 270,
          lengthRatio: 0.56,
          category: 'component',
          explanation: 'Memperkecil jari-jari dari R₀ ke R_f.',
        },
        {
          id: 'v-theta',
          label: 'v_θ = v cos(36°)',
          spokenLabel: 'komponen kecepatan tangensial',
          color: '#0284C7',
          angleDeg: 180,
          lengthRatio: 0.77,
          category: 'component',
          explanation: 'Memutar formasi selama penyusutan.',
        },
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Kondisi Awal dan Kondisi Batas',
          description: 'Formasi dimulai dari s₀ = 20,0 m dan berhenti pada s_f = 5,0 m.',
          visibleVectorIds: [],
        },
        {
          stepNumber: 2,
          title: 'Sumbu Koordinat Lokal',
          description: 'Tetapkan sumbu radial menuju pusat.',
          visibleVectorIds: ['axis-r'],
        },
        {
          stepNumber: 3,
          title: 'Komponen Kecepatan Konstan',
          description: 'Selama proses berlangsung, sudut kejar dan komponen v_r tidak berubah.',
          visibleVectorIds: ['axis-r', 'v-total', 'v-r', 'v-theta'],
        },
        {
          stepNumber: 4,
          title: 'Integrasi Parsial Panjang Sisi',
          description: 'Integrasikan ds/dt dari s₀ hingga s_f untuk memperoleh a = (s₀ - s_f)/(1 - cos 72°).',
          visibleVectorIds: ['axis-r', 'v-total', 'v-r'],
          equationLatex: 'a = \\frac{s_0 - s_f}{1 - \\cos 72^\\circ}',
        },
      ],
    },
    problemSpokenText:
      'Soal nomor 7. Lima drone di titik sudut segilima beraturan bersisi awal dua puluh meter bergerak saling mengejar dengan laju konstan empat meter per detik. Sistem berhenti otomatis ketika jarak antar drone tetangga menjadi lima meter. Berapakah jarak tempuh tiap drone?',
    solutionSections: [
      {
        id: 's7-1',
        title: '1. Memahami Permasalahan',
        highlightType: 'none',
        paragraphs: [
          'Berbeda dengan kasus sampai bertemu di titik pusat (s_f = 0), di sini kelima drone berhenti saat sisi segilima menyusut dari s₀ = 20,0 m menjadi s_f = 5,0 m.',
        ],
        spokenText: 'Drone berhenti pada jarak aman lima meter, bukan pada pusat nol.',
      },
      {
        id: 's7-2',
        title: '2. Identifikasi Konsep Fisika',
        highlightType: 'prinsip',
        paragraphs: [
          'Hukum penyusutan sisi -ds/dt = v(1 - cos 72°) berlaku seragam di setiap titik lintasan sebelum bertemu. Oleh karena itu, panjang lintasan yang ditempuh hanya bergantung pada selisih ukuran Δs = s₀ - s_f.',
        ],
        spokenText:
          'Karena laju penyusutan sisi bersifat konstan, jarak tempuh hanya bergantung pada selisih panjang sisi awal dan akhir.',
      },
      {
        id: 's7-3',
        title: '3. Visualisasi Fenomena',
        highlightType: 'none',
        paragraphs: [
          'Perhatikan pada simulasi bahwa gerak berhenti tepat saat segilima kecil bersisi 5,0 m terbentuk di sekitar pusat.',
        ],
        spokenText:
          'Pada simulasi, gerakan berhenti ketika terbentuk segilima kecil berukuran lima meter.',
      },
      {
        id: 's7-4',
        title: '4. Diagram Vektor Kinematika',
        highlightType: 'none',
        paragraphs: [
          'Vektor kecepatan selalu membuat sudut tetap terhadap sisi dan garis pusat sampai sistem berhenti.',
        ],
        spokenText: 'Arah relatif vektor kecepatan tetap sepanjang seluruh fase penyusutan.',
      },
      {
        id: 's7-5',
        title: '5. Menentukan Persamaan Dasar',
        highlightType: 'rumus',
        paragraphs: ['Gunakan persamaan laju perubahan panjang sisi:'],
        equations: ['-\\frac{ds}{dt} = v(1 - \\cos 72^\\circ)'],
        spokenText: 'Minus d s per d t sama dengan v kali satu minus kosinus tujuh puluh dua derajat.',
      },
      {
        id: 's7-6',
        title: '6. Penurunan Persamaan',
        highlightType: 'kritis',
        paragraphs: [
          'Integrasikan dari s = s₀ pada t = 0 sampai s = s_f pada t = T_stop:',
        ],
        equations: [
          's_0 - s_f = v(1 - \\cos 72^\\circ) T_{\\text{stop}} \\implies a = v\\,T_{\\text{stop}} = \\frac{s_0 - s_f}{1 - \\cos 72^\\circ}',
        ],
        spokenText:
          'Integrasi menghasilkan jarak tempuh a sama dengan selisih sisi dibagi satu minus kosinus tujuh puluh dua derajat.',
      },
      {
        id: 's7-7',
        title: '7. Substitusi Angka',
        highlightType: 'none',
        paragraphs: ['Masukkan s₀ = 20,0 m, s_f = 5,0 m, dan cos 72° ≈ 0,309017:'],
        equations: ['a = \\frac{20{,}0 - 5{,}0}{1 - 0{,}309017} = \\frac{15{,}0}{0{,}690983}'],
        spokenText: 'Lima belas meter dibagi nol koma enam sembilan nol sembilan delapan.',
      },
      {
        id: 's7-8',
        title: '8. Perhitungan Matematis',
        highlightType: 'none',
        paragraphs: ['Hitung hasil pembagian:'],
        equations: ['a = 21{,}70820...\\text{ m}'],
        spokenText: 'Hasil pembagian adalah dua puluh satu koma tujuh nol delapan meter.',
      },
      {
        id: 's7-9',
        title: '9. Hasil Akhir',
        highlightType: 'hasil',
        paragraphs: ['Dibulatkan satu angka desimal:'],
        equations: ['a = 21{,}7\\text{ m}'],
        spokenText: 'Hasil akhir adalah dua puluh satu koma tujuh meter.',
      },
      {
        id: 's7-10',
        title: '10. Interpretasi Fisis',
        highlightType: 'none',
        paragraphs: [
          'Untuk mengurangi sisi sebesar 15,0 m (75% dari ukuran awal), tiap drone telah menempuh jarak 21,7 m dalam waktu T = 21,708 / 4,0 ≈ 5,43 s.',
        ],
        spokenText:
          'Untuk menyusut tujuh puluh lima persen, tiap drone sudah menempuh dua puluh satu koma tujuh meter dalam waktu lima koma empat detik.',
      },
      {
        id: 's7-11',
        title: '11. Strategi Cepat Olimpiade',
        highlightType: 'none',
        paragraphs: [
          'Karena linear terhadap s, cukup kalikan jarak tempuh penuh (jika ke pusat) dengan faktor (s₀ - s_f)/s₀ = 15/20 = 0,75!',
        ],
        spokenText:
          'Trik cepat: kalikan jarak tempuh total ke pusat dengan persentase penyusutan sisi, yaitu tujuh puluh lima persen.',
      },
      {
        id: 's7-12',
        title: '12. Kesalahan yang Harus Dihindari',
        highlightType: 'none',
        paragraphs: [
          'Jangan lupa mengurangkan s_f dari s₀. Kesalahan lain adalah mengira luas menyusut linear (padahal luas sebanding s², sedangkan jarak tempuh sebanding s).',
        ],
        spokenText:
          'Pastikan menggunakan selisih panjang sisi secara linear, bukan rasio luas.',
      },
    ],
  },

  // SOAL 8
  {
    id: 8,
    shortTitle: 'Arah Kecepatan Menyimpang Sudut φ ke Arah Dalam',
    tier: 'Tingkat 3 · Variasi Konfigurasi',
    tierIndex: 3,
    subtopic: 'Modifikasi Sudut Kejar pada Persegi',
    stimulusType: 'Diagram Vektor Kecepatan Menyimpang 15° ke Dalam',
    questionText:
      'Empat partikel diletakkan di titik-titik sudut sebuah persegi dengan jarak masing-masing partikel ke pusat persegi adalah R₀ = 10,0 m. Alih-alih mengarah tepat ke partikel tetangga, vektor kecepatan setiap partikel (dengan laju konstan v = 2,0 m/s) selalu diarahkan membentuk sudut φ = 15° ke arah dalam dari garis yang menghubungkannya dengan partikel berikutnya. Tentukan waktu yang dibutuhkan hingga keempat partikel bertemu di pusat persegi (dalam sekon)!',
    knownData: [
      { symbol: 'N', label: 'Jumlah partikel (persegi)', valueWithUnit: '4 partikel' },
      { symbol: 'R₀', label: 'Jari-jari luar awal', valueWithUnit: '10,0 m' },
      { symbol: 'v', label: 'Kelajuan konstan', valueWithUnit: '2,0 m/s' },
      { symbol: 'φ', label: 'Penyimpangan ke arah dalam', valueWithUnit: '15° dari sisi' },
    ],
    askedQuantity: { symbol: 'T', label: 'Waktu bertemu di pusat', unit: 's' },
    answerUnitLabel: 's',
    exactValue: 10.0 / (2.0 * Math.cos(30 * DEG)),
    expectedFormatted: '5,8',
    tolerance: 0.05,
    hints: [
      'Pada persegi normal (φ = 0°), sisi persegi membentuk sudut 45° terhadap garis radial menuju pusat O.',
      'Karena arah kecepatan dimiringkan φ = 15° ke arah dalam (lebih mengarah ke pusat O), sudut baru antara v dan garis menuju pusat menjadi θ = 45° - 15° = 30°.',
      'Hitung komponen kecepatan radial v_r = v cos(30°), lalu tentukan T = R₀ / v_r.',
    ],
    conceptualFeedbackOnWrong:
      'Perhatikan arah kemiringan φ = 15°: "ke arah dalam" berarti vektor kecepatan lebih dekat ke pusat O, sehingga sudut terhadap garis radial berkurang dari 45° menjadi 30° (bukan bertambah menjadi 60°!).',
    conceptualFeedbackOnRight:
      'Hebat! Anda memodelkan orientasi vektor baru dengan tepat: sudut ke pusat mengecil menjadi 30°, meningkatkan laju radial menjadi v cos(30°) = √3 m/s sehingga T = 10/√3 ≈ 5,8 s.',
    simulation: {
      kind: 'polygon-pursuit',
      n: 4,
      R0: 10.0,
      v0: 2.0,
      stepSkip: 1,
      tiltDeg: 15,
      clockwise: false,
    },
    fbd: {
      objectName: 'Partikel Persegi dengan Sudut Belok Tambahan φ = 15°',
      frameDescription: 'Perubahan sudut antara vektor kecepatan dan arah radial akibat kemiringan 15° ke dalam.',
      hasRealForce: false,
      referenceAngleDeg: 90,
      vectors: [
        {
          id: 'axis-r',
          label: 'e_r (radial ke O)',
          spokenLabel: 'garis radial menuju pusat O',
          color: '#64748B',
          angleDeg: 270,
          lengthRatio: 0.9,
          category: 'axis',
          explanation: 'Garis diagonal menuju pusat O.',
        },
        {
          id: 'axis-t',
          label: 'arah sisi (45°)',
          spokenLabel: 'garis arah sisi persegi awal pada sudut 45 derajat',
          color: '#94A3B8',
          angleDeg: 225,
          lengthRatio: 0.85,
          category: 'axis',
          explanation: 'Acuan arah sisi persegi menuju partikel tetangga (45° dari radial).',
        },
        {
          id: 'v-total',
          label: 'v (30° dari e_r)',
          spokenLabel: 'vektor kecepatan miring 15 derajat ke dalam sehingga bersudut 30 derajat dari radial',
          color: '#7C3AED',
          angleDeg: 240,
          lengthRatio: 0.95,
          category: 'velocity',
          explanation: 'Sudut terhadap garis menuju pusat menjadi 45° - 15° = 30°.',
        },
        {
          id: 'v-r',
          label: 'v_r = v cos(30°)',
          spokenLabel: 'komponen radial v kosinus 30 derajat',
          color: '#059669',
          angleDeg: 270,
          lengthRatio: 0.82,
          category: 'component',
          explanation: 'Komponen radial lebih besar daripada kasus standar (cos 30° > cos 45°).',
        },
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Orientasi Awal pada Persegi',
          description: 'Garis sisi menuju tetangga berada pada sudut 45° dari garis pusat.',
          visibleVectorIds: ['axis-r', 'axis-t'],
        },
        {
          stepNumber: 2,
          title: 'Pergeseran Sudut φ = 15° ke Dalam',
          description: 'Vektor v diputar 15° mendekati garis radial ke pusat.',
          visibleVectorIds: ['axis-r', 'axis-t', 'v-total'],
          equationLatex: '\\theta = 45^\\circ - 15^\\circ = 30^\\circ',
        },
        {
          stepNumber: 3,
          title: 'Komponen Radial yang Diperkuat',
          description: 'Komponen menuju pusat menjadi v cos(30°).',
          visibleVectorIds: ['axis-r', 'v-total', 'v-r'],
          equationLatex: 'v_r = v\\cos(30^\\circ) = 2{,}0 \\times \\frac{\\sqrt{3}}{2} = \\sqrt{3}\\text{ m/s}',
        },
        {
          stepNumber: 4,
          title: 'Menentukan Waktu Pertemuan',
          description: 'T = R₀ / v_r = 10,0 / √3 ≈ 5,8 s.',
          visibleVectorIds: ['axis-r', 'v-total', 'v-r'],
          equationLatex: 'T = \\frac{10{,}0}{\\sqrt{3}} \\approx 5{,}8\\text{ s}',
        },
      ],
    },
    problemSpokenText:
      'Soal nomor 8. Empat partikel di titik sudut persegi berjari-jari luar sepuluh meter bergerak dengan laju konstan dua meter per detik. Arah kecepatannya selalu dimiringkan lima belas derajat ke arah dalam dari garis sisi menuju partikel berikutnya. Tentukan waktu bertemu di pusat dalam sekon.',
    solutionSections: [
      {
        id: 's8-1',
        title: '1. Memahami Permasalahan',
        highlightType: 'none',
        paragraphs: [
          'Keempat partikel tidak mengarah tepat sepanjang sisi persegi, melainkan dimiringkan φ = 15° ke arah dalam (menuju pusat persegi) dari garis penghubung ke partikel tetangga.',
        ],
        spokenText:
          'Vektor kecepatan partikel dimiringkan lima belas derajat lebih ke dalam dibanding sisi persegi.',
      },
      {
        id: 's8-2',
        title: '2. Identifikasi Konsep Fisika',
        highlightType: 'prinsip',
        paragraphs: [
          'Meskipun arah kecepatan menyimpang sudut konstan φ dari sisi, simetri putar orde-4 tetap terjaga! Setiap partikel memiliki penyimpangan sudut identik sehingga bangun tetap berupa persegi yang menyusut ke pusat O.',
        ],
        spokenText:
          'Simetri persegi tetap berlaku karena keempat partikel mengalami penyimpangan sudut yang sama persis.',
      },
      {
        id: 's8-3',
        title: '3. Visualisasi Fenomena',
        highlightType: 'none',
        paragraphs: [
          'Pada simulasi terlihat lintasan spiral jauh lebih cepat menukik ke pusat dibandingkan persegi standar karena komponen radial meningkat.',
        ],
        spokenText:
          'Lintasan spiral pada animasi menukik lebih tajam ke arah pusat persegi.',
      },
      {
        id: 's8-4',
        title: '4. Diagram Vektor Kinematika',
        highlightType: 'none',
        paragraphs: [
          'Garis sisi berada 45° dari garis radial menuju O. Pergeseran 15° ke arah dalam memperkecil sudut apit terhadap sumbu radial menjadi 30°.',
        ],
        spokenText: 'Sudut antara vektor kecepatan dan arah ke pusat berkurang menjadi tiga puluh derajat.',
      },
      {
        id: 's8-5',
        title: '5. Menentukan Persamaan Dasar',
        highlightType: 'rumus',
        paragraphs: ['Untuk segi-N dengan sudut miring φ ke arah dalam:'],
        equations: ['v_r = -\\frac{dR}{dt} = v\\cos\\left(\\frac{\\pi}{2} - \\frac{\\pi}{N} - \\phi\\right) = v\\sin\\left(\\frac{\\pi}{N} + \\phi\\right)'],
        spokenText: 'Kecepatan radial menjadi v kosinus empat puluh lima dikurangi lima belas derajat.',
      },
      {
        id: 's8-6',
        title: '6. Penurunan Persamaan',
        highlightType: 'kritis',
        paragraphs: ['Substitusi N = 4 (π/4 = 45°) dan φ = 15°:'],
        equations: ['v_r = v\\cos(45^\\circ - 15^\\circ) = v\\cos(30^\\circ) = \\frac{\\sqrt{3}}{2}v \\implies T = \\frac{R_0}{v\\cos 30^\\circ}'],
        spokenText: 'Didapatkan waktu temu T sama dengan R nol dibagi v kosinus tiga puluh derajat.',
      },
      {
        id: 's8-7',
        title: '7. Substitusi Angka',
        highlightType: 'none',
        paragraphs: ['Masukkan R₀ = 10,0 m dan v = 2,0 m/s:'],
        equations: ['T = \\frac{10{,}0}{2{,}0 \\times (\\sqrt{3}/2)} = \\frac{10{,}0}{\\sqrt{3}}'],
        spokenText: 'Substitusikan R nol sepuluh meter dan v dua meter per detik.',
      },
      {
        id: 's8-8',
        title: '8. Perhitungan Matematis',
        highlightType: 'none',
        paragraphs: ['Hitung nilai 10 / 1,7320508:'],
        equations: ['T = 5{,}7735027...\\text{ s}'],
        spokenText: 'Sepuluh dibagi akar tiga menghasilkan lima koma tujuh tujuh tiga lima sekon.',
      },
      {
        id: 's8-9',
        title: '9. Hasil Akhir',
        highlightType: 'hasil',
        paragraphs: ['Dibulatkan satu angka desimal:'],
        equations: ['T = 5{,}8\\text{ s}'],
        spokenText: 'Hasil akhirnya adalah lima koma delapan sekon.',
      },
      {
        id: 's8-10',
        title: '10. Interpretasi Fisis',
        highlightType: 'none',
        paragraphs: [
          'Bandingkan dengan kasus standar φ = 0° yang membutuhkan T = 10 / (2 × 0,7071) = 7,07 s. Memiringkan arah gerak 15° ke dalam mempercepat pertemuan sekitar 18%.',
        ],
        spokenText:
          'Kemiringan lima belas derajat ke dalam mempercepat waktu temu dari tujuh koma satu menjadi lima koma delapan detik.',
      },
      {
        id: 's8-11',
        title: '11. Strategi Cepat Olimpiade',
        highlightType: 'none',
        paragraphs: [
          'Gunakan langsung sudut terhadap radial: θ_baru = θ_standar - φ_dalam, lalu v_r = v cos(θ_baru).',
        ],
        spokenText:
          'Strategi cepat: kurangi sudut radial standar dengan sudut belok ke dalam, lalu kalikan dengan kosinusnya.',
      },
      {
        id: 's8-12',
        title: '12. Kesalahan yang Harus Dihindari',
        highlightType: 'none',
        paragraphs: [
          'Jangan menambahkan sudut menjadi 45° + 15° = 60°! Menambah sudut menjauhkan vektor dari pusat (ke arah luar), bukan ke arah dalam.',
        ],
        spokenText:
          'Hati-hati, jangan menjumlahkan sudut menjadi enam puluh derajat karena arahnya justru menuju ke dalam.',
      },
    ],
  },
];
