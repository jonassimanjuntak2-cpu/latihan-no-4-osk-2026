import { ProblemItem } from '../types/physics';

const DEG = Math.PI / 180;

export const PROBLEMS_PART_2: ProblemItem[] = [
  // SOAL 9
  {
    id: 9,
    shortTitle: 'Kurva Kejar Asimetris Dua Partikel Saling Tegak Lurus',
    tier: 'Tingkat 3 · Variasi Konfigurasi',
    tierIndex: 3,
    subtopic: 'Kurva Kejar Klasik Dua Partikel (u ≠ v)',
    stimulusType: 'Diagram Koordinat Kartesius Pengejar A dan Target B',
    questionText:
      'Sebuah partikel pengejar A mula-mula berada pada koordinat (0, L) dengan L = 24,0 m, sedangkan partikel target B berada di titik asal (0, 0). Mulai t = 0, target B bergerak lurus searah sumbu-x positif dengan kecepatan konstan u = 3,0 m/s, sementara pengejar A bergerak dengan kelajuan konstan v = 5,0 m/s dengan arah vektor kecepatan selalu tertuju ke posisi sesaat B. Tentukan waktu yang diperlukan A untuk menangkap B (dalam sekon)!',
    knownData: [
      { symbol: 'L', label: 'Jarak awal vertikal A ke B', valueWithUnit: '24,0 m' },
      { symbol: 'u', label: 'Kecepatan target B (+x)', valueWithUnit: '3,0 m/s' },
      { symbol: 'v', label: 'Kelajuan pengejar A', valueWithUnit: '5,0 m/s' },
    ],
    askedQuantity: { symbol: 'T', label: 'Waktu penangkapan A terhadap B', unit: 's' },
    answerUnitLabel: 's',
    exactValue: (5.0 * 24.0) / (5.0 * 5.0 - 3.0 * 3.0),
    expectedFormatted: '7,5',
    tolerance: 0.05,
    hints: [
      'Meskipun sistem tidak simetris seperti segilima, metode proyeksi laju perubahan jarak r(t) tetap ampuh!',
      'Tuliskan dua persamaan: laju perubahan jarak dr/dt = u cos(α) - v, dan laju perubahan posisi horizontal d(x_B - x_A)/dt = u - v cos(α), dengan α adalah sudut garis AB terhadap sumbu-x positif.',
      'Integralkan kedua persamaan dari t = 0 hingga t = T lalu eliminasi integral ∫ cos(α) dt!',
    ],
    conceptualFeedbackOnWrong:
      'Ingat bahwa partikel A tidak bergerak lurus ke titik temu seperti lintasan segitiga siku-siku sederhana (itu hanya jika A langsung mencegat titik depan), melainkan arahnya selalu berubah mengikuti B! Gunakan dua persamaan integral dr/dt dan dx/dt.',
    conceptualFeedbackOnRight:
      'Luar biasa! Anda berhasil menaklukkan teknik integral eliminasi kurva kejar klasik: T = vL / (v² - u²) = (5×24)/(25 - 9) = 7,5 s.',
    simulation: {
      kind: 'linear-pursuit',
      L: 24.0,
      u: 3.0,
      v: 5.0,
    },
    fbd: {
      objectName: 'Partikel Pengejar A dan Target B',
      frameDescription: 'Penguraian vektor kecepatan pengejar A terhadap sumbu-x dan garis hubung AB.',
      hasRealForce: false,
      referenceAngleDeg: 90,
      vectors: [
        {
          id: 'axis-r',
          label: 'garis AB (sudut α)',
          spokenLabel: 'garis hubung dari A menuju B',
          color: '#64748B',
          angleDeg: 315,
          lengthRatio: 0.95,
          category: 'axis',
          explanation: 'Garis hubung sesaat antara pengejar A dan target B.',
        },
        {
          id: 'axis-t',
          label: 'arah +x (gerak B)',
          spokenLabel: 'arah sumbu x positif gerak partikel B',
          color: '#94A3B8',
          angleDeg: 0,
          lengthRatio: 0.85,
          category: 'axis',
          explanation: 'Sumbu lintasan lurus target B.',
        },
        {
          id: 'v-total',
          label: 'v_A (selalu menuju B)',
          spokenLabel: 'vektor kecepatan pengejar A selalu menuju B',
          color: '#7C3AED',
          angleDeg: 315,
          lengthRatio: 0.85,
          category: 'velocity',
          explanation: 'Arah v_A selalu berimpit dengan garis hubung AB.',
        },
        {
          id: 'v-theta',
          label: 'v_Ax = v cos(α)',
          spokenLabel: 'komponen horizontal kecepatan A',
          color: '#0284C7',
          angleDeg: 0,
          lengthRatio: 0.6,
          category: 'component',
          explanation: 'Komponen horizontal A yang mengejar pergeseran sumbu-x dari B.',
        },
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Kondisi Awal A(0, L) dan B(0, 0)',
          description: 'Jarak awal r(0) = L dan selisih absis awal x_B(0) - x_A(0) = 0.',
          visibleVectorIds: ['axis-t'],
        },
        {
          stepNumber: 2,
          title: 'Menentukan Sudut Sesaat α(t)',
          description: 'Misalkan α adalah sudut antara garis AB dan sumbu-x positif (di t=0, α = -90°).',
          visibleVectorIds: ['axis-r', 'axis-t', 'v-total'],
        },
        {
          stepNumber: 3,
          title: 'Dua Persamaan Laju Sesaat',
          description: 'Proyeksikan kecepatan pada garis AB dan pada sumbu-x.',
          visibleVectorIds: ['axis-r', 'axis-t', 'v-total', 'v-theta'],
          equationLatex: '\\frac{dr}{dt} = u\\cos\\alpha - v, \\qquad \\frac{d(x_B - x_A)}{dt} = u - v\\cos\\alpha',
        },
        {
          stepNumber: 4,
          title: 'Eliminasi Integral Kosinus',
          description: 'Integralkan dari t = 0 sampai t = T (saat r = 0 dan x_B = x_A).',
          visibleVectorIds: ['axis-r', 'v-total'],
          equationLatex: 'T = \\frac{v\\,L}{v^2 - u^2}',
        },
      ],
    },
    problemSpokenText:
      'Soal nomor 9. Partikel pengejar A berada pada koordinat nol koma dua puluh empat meter, sedangkan target B di titik asal nol koma nol. B bergerak lurus ke sumbu x positif dengan laju tiga meter per detik, dan A mengejar dengan laju konstan lima meter per detik selalu mengarah ke posisi sesaat B. Berapa detik waktu yang dibutuhkan A untuk menangkap B?',
    solutionSections: [
      {
        id: 's9-1',
        title: '1. Memahami Permasalahan',
        highlightType: 'none',
        paragraphs: [
          'Berbeda dari poligon simetris, di sini hanya terdapat dua partikel dengan kelajuan berbeda: B bergerak lurus dengan u = 3,0 m/s sepanjang sumbu-x, sementara A mengejar dari jarak tegak lurus L = 24,0 m dengan kelajuan konstan v = 5,0 m/s selalu mengarah ke B.',
        ],
        spokenText:
          'Partikel B bergerak lurus dengan laju tiga meter per detik, sementara A mengejar dari posisi tegak lurus dua puluh empat meter dengan laju lima meter per detik.',
      },
      {
        id: 's9-2',
        title: '2. Identifikasi Konsep Fisika',
        highlightType: 'prinsip',
        paragraphs: [
          'Konsep utama tetap berupa proyeksi kecepatan relatif sepanjang garis hubung (seperti Soal Nomor 4!), digabungkan dengan proyeksi pada sumbu-x agar integral suku kosinus sudut yang berubah terhadap waktu dapat dieliminasi tanpa mencari bentuk kurvanya.',
        ],
        spokenText:
          'Kita menerapkan proyeksi kecepatan relatif sepanjang garis hubung serta sepanjang sumbu x untuk mengeliminasi sudut yang berubah.',
      },
      {
        id: 's9-3',
        title: '3. Visualisasi Fenomena',
        highlightType: 'none',
        paragraphs: [
          'Dalam animasi terlihat A membelok melengkung tajam dari arah vertikal menuju kanan hingga akhirnya sejajar dengan arah gerak B di titik tangkap x = 22,5 m.',
        ],
        spokenText: 'Simulasi memperlihatkan lintasan melengkung A hingga menyusul B di sumbu x.',
      },
      {
        id: 's9-4',
        title: '4. Diagram Vektor Kinematika',
        highlightType: 'none',
        paragraphs: [
          'Misalkan sudut antara garis AB (arah v_A) dan sumbu-x positif adalah α(t) (bernilai negatif karena A di atas B, atau cukup tuliskan cos α sebagai kosinus sudut lancip antara arah gerak B dan arah v_A).',
        ],
        spokenText: 'Sudut antara arah kecepatan A dan arah gerak B kita nyatakan dengan alfa.',
      },
      {
        id: 's9-5',
        title: '5. Menentukan Persamaan Dasar',
        highlightType: 'rumus',
        paragraphs: ['Tinjau jarak pisah r(t) dan selisih absis Δx(t) = x_B(t) - x_A(t):'],
        equations: [
          '\\frac{dr}{dt} = u\\cos\\alpha - v',
          '\\frac{d(x_B - x_A)}{dt} = u - v\\cos\\alpha',
        ],
        spokenText:
          'Laju perubahan jarak r adalah u kosinus alfa dikurangi v, dan laju perubahan selisih posisi x adalah u dikurangi v kosinus alfa.',
      },
      {
        id: 's9-6',
        title: '6. Penurunan Persamaan',
        highlightType: 'kritis',
        paragraphs: [
          'Integrasikan kedua persamaan dari t = 0 (r = L, x_B - x_A = 0) hingga saat tertangkap t = T (r = 0, x_B - x_A = 0):',
        ],
        equations: [
          '\\int_0^T (u - v\\cos\\alpha)\\,dt = 0 \\implies \\int_0^T \\cos\\alpha\\,dt = \\frac{u\\,T}{v}',
          '0 - L = u\\int_0^T \\cos\\alpha\\,dt - v\\,T \\implies -L = \\frac{u^2 T}{v} - v\\,T \\implies T = \\frac{v\\,L}{v^2 - u^2}',
        ],
        spokenText:
          'Dari integral posisi x diperoleh integral kosinus alfa sama dengan u T per v. Disubstitusikan ke persamaan jarak r menghasilkan T sama dengan v L dibagi v kuadrat minus u kuadrat.',
      },
      {
        id: 's9-7',
        title: '7. Substitusi Angka',
        highlightType: 'none',
        paragraphs: ['Masukkan L = 24,0 m, v = 5,0 m/s, dan u = 3,0 m/s:'],
        equations: ['T = \\frac{5{,}0 \\times 24{,}0}{5{,}0^2 - 3{,}0^2}'],
        spokenText: 'Substitusikan v lima, L dua puluh empat, dan u tiga.',
      },
      {
        id: 's9-8',
        title: '8. Perhitungan Matematis',
        highlightType: 'none',
        paragraphs: ['Hitung pembilang dan penyebut:'],
        equations: ['T = \\frac{120{,}0}{25{,}0 - 9{,}0} = \\frac{120{,}0}{16{,}0} = 7{,}5\\text{ s}'],
        spokenText: 'Seratus dua puluh dibagi enam belas sama dengan tujuh koma lima sekon.',
      },
      {
        id: 's9-9',
        title: '9. Hasil Akhir',
        highlightType: 'hasil',
        paragraphs: ['Waktu penangkapan tepat sebesar:'],
        equations: ['T = 7{,}5\\text{ s}'],
        spokenText: 'Hasil akhirnya tujuh koma lima sekon.',
      },
      {
        id: 's9-10',
        title: '10. Interpretasi Fisis',
        highlightType: 'none',
        paragraphs: [
          'Syarat agar A dapat menangkap B adalah v > u; jika v ≤ u penyebut nol atau negatif dan A tidak pernah tertangkap. Pada t = 7,5 s, A menempuh jarak spiral 37,5 m sedangkan B menempuh garis lurus 22,5 m.',
        ],
        spokenText:
          'Karena v lima lebih besar dari u tiga, A menempuh tiga puluh tujuh koma lima meter untuk menyusul B yang sudah bergerak sejauh dua puluh dua koma lima meter.',
      },
      {
        id: 's9-11',
        title: '11. Strategi Cepat Olimpiade',
        highlightType: 'none',
        paragraphs: [
          'Bandingkan dengan lintasan lurus pencegatan (interception): T_lurus = L / √(v² - u²) = 24 / 4 = 6,0 s. Selalu ingat bahwa kurva kejar murni selalu lebih lama dengan faktor v / √(v² - u²) dibanding pencegatan lurus!',
        ],
        spokenText:
          'Strategi cepat: waktu kurva kejar selalu v L dibagi v kuadrat minus u kuadrat, lebih lama dibanding memotong jalan lurus.',
      },
      {
        id: 's9-12',
        title: '12. Kesalahan yang Harus Dihindari',
        highlightType: 'none',
        paragraphs: [
          'Kesalahan paling fatal adalah menganggap lintasan A berupa garis lurus membentuk segitiga Pythagoras (vt)² = L² + (ut)² yang menghasilkan 6,0 s. Itu hanya benar jika A tahu ke mana B pergi dan memotong jalan, bukan mengarah ke posisi sesaat B.',
        ],
        spokenText:
          'Jangan memakai teorema Pythagoras garis lurus yang memberi jawaban enam detik, karena lintasan A melengkung mengikuti posisi sesaat B.',
      },
    ],
  },

  // SOAL 10
  {
    id: 10,
    shortTitle: 'Percepatan Sentripetal Sesaat pada Segilima Menyusut',
    tier: 'Tingkat 4 · Kombinasi Konsep',
    tierIndex: 4,
    subtopic: 'Kinematika Melingkar & Kelengkungan Spiral',
    stimulusType: 'Diagram Segilima pada Jari-Jari Sesaat R = 4,0 m',
    questionText:
      'Lima partikel pada titik sudut segilima beraturan berjari-jari luar awal R₀ = 10,0 m bergerak saling mengejar dengan kelajuan konstan v = 4,0 m/s. Pada saat jarak masing-masing partikel ke pusat segilima tinggal R = 4,0 m, tentukan besar percepatan sesaat yang dialami oleh salah satu partikel (dalam m/s²)!',
    knownData: [
      { symbol: 'N', label: 'Jumlah partikel (segilima)', valueWithUnit: '5 partikel' },
      { symbol: 'R₀', label: 'Jari-jari awal', valueWithUnit: '10,0 m' },
      { symbol: 'v', label: 'Kelajuan konstan', valueWithUnit: '4,0 m/s' },
      { symbol: 'R', label: 'Jari-jari sesaat', valueWithUnit: '4,0 m' },
    ],
    askedQuantity: { symbol: 'a_n', label: 'Besar percepatan sesaat', unit: 'm/s²' },
    answerUnitLabel: 'm/s²',
    exactValue: (4.0 * 4.0 * Math.cos(36 * DEG)) / 4.0,
    expectedFormatted: '3,2',
    tolerance: 0.05,
    hints: [
      'Karena kelajuan v = 4,0 m/s konstan, percepatan tangensial a_t = dv/dt = 0. Seluruh percepatan berupa percepatan normal/sentripetal akibat perubahan arah kecepatan!',
      'Kecepatan sudut rotasi segilima pada jari-jari R adalah ω = v_θ / R = v cos(36°) / R.',
      'Karena sudut antara vektor v dan garis jari-jari konstan, laju putar arah vektor kecepatan sama dengan ω, sehingga a_n = v ω = v² cos(36°) / R!',
    ],
    conceptualFeedbackOnWrong:
      'Hati-hati: percepatan bukan v²/R saja! Lintasan bukan lingkaran melainkan spiral logaritmik dengan jari-jari kelengkungan ρ = R / cos(36°), sehingga a_n = v² / ρ = v² cos(36°) / R.',
    conceptualFeedbackOnRight:
      'Sangat presisi! Karena v konstan, a_t = 0 dan laju rotasi vektor kecepatan sama dengan kecepatan sudut segilima ω = v cos(36°)/R, menghasilkan a_n = 3,2 m/s².',
    simulation: {
      kind: 'polygon-pursuit',
      n: 5,
      R0: 10.0,
      v0: 4.0,
      stepSkip: 1,
      tiltDeg: 0,
      clockwise: false,
      highlightTargetFraction: 0.4,
    },
    fbd: {
      objectName: 'Partikel Segilima saat R = 4,0 m',
      frameDescription:
        'Diagram vektor kecepatan v dan vektor percepatan normal a_n (tegak lurus v ke arah pusat kelengkungan).',
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
          explanation: 'Sumbu radial saat jarak ke pusat R = 4,0 m.',
        },
        {
          id: 'v-total',
          label: 'v (4,0 m/s)',
          spokenLabel: 'vektor kecepatan konstan v',
          color: '#7C3AED',
          angleDeg: 216,
          lengthRatio: 0.9,
          category: 'velocity',
          explanation: 'Kecepatan konstan sepanjang lintasan spiral.',
        },
        {
          id: 'v-theta',
          label: 'v_θ = v cos(36°)',
          spokenLabel: 'komponen tangensial yang menentukan omega',
          color: '#0284C7',
          angleDeg: 180,
          lengthRatio: 0.72,
          category: 'component',
          explanation: 'Menentukan kecepatan sudut rotasi sistem ω = v_θ / R.',
        },
        {
          id: 'a-normal',
          label: 'a_n (tegak lurus v)',
          spokenLabel: 'vektor percepatan sentripetal a n tegak lurus kecepatan',
          color: '#DC2626',
          angleDeg: 306,
          lengthRatio: 0.78,
          category: 'acceleration',
          explanation: 'Karena v konstan, percepatan total tegak lurus v sebesar a_n = v ω = v² cos(36°)/R.',
        },
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Identifikasi Sifat Percepatan',
          description: 'Laju v konstan berarti a_tangensial = dv/dt = 0; percepatan total = percepatan normal a_n.',
          visibleVectorIds: ['axis-r', 'v-total'],
        },
        {
          stepNumber: 2,
          title: 'Menentukan Kecepatan Sudut Sistem ω',
          description: 'Dari komponen tangensial v_θ = v cos(36°), diperoleh ω = v cos(36°) / R.',
          visibleVectorIds: ['axis-r', 'v-total', 'v-theta'],
          equationLatex: '\\omega = \\frac{v_\\theta}{R} = \\frac{v\\cos 36^\\circ}{R}',
        },
        {
          stepNumber: 3,
          title: 'Hubungan Laju Putar Arah Kecepatan',
          description: 'Karena v selalu bersudut tetap 54° terhadap garis radial, laju putar v sama dengan ω, dan arah a_n tegak lurus v.',
          visibleVectorIds: ['axis-r', 'v-total', 'a-normal'],
          equationLatex: 'a_n = v\\left|\\frac{d\\theta_v}{dt}\\right| = v\\,\\omega',
        },
        {
          stepNumber: 4,
          title: 'Persamaan Akhir Percepatan Sesaat',
          description: 'Substitusi ω menghasilkan a_n = v² cos(36°) / R = 3,2 m/s².',
          visibleVectorIds: ['v-total', 'a-normal'],
          equationLatex: 'a_n = \\frac{v^2\\cos 36^\\circ}{R} = 3{,}2\\text{ m/s}^2',
        },
      ],
    },
    problemSpokenText:
      'Soal nomor 10. Lima partikel di sudut segilima beraturan berjari-jari awal sepuluh meter bergerak saling mengejar dengan laju konstan empat meter per detik. Ketika jarak partikel ke pusat segilima tinggal empat meter, tentukan besar percepatan sesaat salah satu partikel dalam meter per detik kuadrat.',
    solutionSections: [
      {
        id: 's10-1',
        title: '1. Memahami Permasalahan',
        highlightType: 'none',
        paragraphs: [
          'Meskipun laju partikel konstan v = 4,0 m/s, partikel bergerak pada lintasan spiral yang terus membelok sehingga memiliki percepatan akibat perubahan arah kecepatan.',
          'Kita diminta menghitung besar percepatan sesaat ketika R = 4,0 m.',
        ],
        spokenText:
          'Walaupun kelajuan partikel konstan empat meter per detik, arah kecepatannya terus berputar sehingga timbul percepatan normal.',
      },
      {
        id: 's10-2',
        title: '2. Identifikasi Konsep Fisika',
        highlightType: 'prinsip',
        paragraphs: [
          'Dalam kinematika kurvilinear, vektor percepatan total terurai menjadi percepatan tangensial (a_t = dv/dt) dan percepatan normal/sentripetal (a_n = v dθ_v/dt = v²/ρ). Karena v konstan, a_t = 0.',
        ],
        spokenText:
          'Karena kelajuan konstan, percepatan tangensial sama dengan nol, sehingga seluruh percepatan adalah percepatan normal atau sentripetal.',
      },
      {
        id: 's10-3',
        title: '3. Visualisasi Fenomena',
        highlightType: 'none',
        paragraphs: [
          'Amati pada simulasi: makin kecil R, segilima berputar makin cepat (ω meningkat berbanding terbalik dengan R), sehingga pembelokan arah v semakin tajam.',
        ],
        spokenText:
          'Pada simulasi, saat jari-jari menyusut menjadi empat meter, rotasi segilima berlangsung lebih cepat.',
      },
      {
        id: 's10-4',
        title: '4. Diagram Vektor Kinematika',
        highlightType: 'none',
        paragraphs: [
          'Vektor percepatan a_n tegak lurus terhadap vektor kecepatan v (membentuk sudut 36° terhadap arah radial menuju pusat, bukan mengarah tepat ke O!).',
        ],
        spokenText:
          'Perhatikan bahwa vektor percepatan sentripetal tegak lurus terhadap vektor kecepatan v, bukan menuju tepat ke titik pusat O.',
      },
      {
        id: 's10-5',
        title: '5. Menentukan Persamaan Dasar',
        highlightType: 'rumus',
        paragraphs: ['Kecepatan sudut garis jari-jari θ(t) dan besar percepatan normal:'],
        equations: ['\\omega = \\frac{d\\theta}{dt} = \\frac{v_\\theta}{R}, \\qquad a_n = v\\left|\\frac{d\\theta_v}{dt}\\right|'],
        spokenText: 'Kecepatan sudut omega adalah v tangensial dibagi R, dan percepatan normal adalah v dikali laju putar vektor kecepatan.',
      },
      {
        id: 's10-6',
        title: '6. Penurunan Persamaan',
        highlightType: 'kritis',
        paragraphs: [
          'Sudut arah kecepatan θ_v selalu berselisih konstanta tetap terhadap sudut posisi θ (θ_v = θ + π - 54°), sehingga dθ_v/dt = dθ/dt = ω! Dari segilima, v_θ = v sin(54°) = v cos(36°), maka:',
        ],
        equations: [
          '\\omega = \\frac{v\\cos 36^\\circ}{R} \\implies a_n = v\\,\\omega = \\frac{v^2\\cos 36^\\circ}{R}',
        ],
        spokenText:
          'Karena sudut antara vektor kecepatan dan jari-jari selalu konstan, laju putar vektor kecepatan tepat sama dengan omega, menghasilkan a n sama dengan v kuadrat kosinus tiga puluh enam derajat dibagi R.',
      },
      {
        id: 's10-7',
        title: '7. Substitusi Angka',
        highlightType: 'none',
        paragraphs: ['Masukkan v = 4,0 m/s, R = 4,0 m, dan cos(36°) = (1+√5)/4 ≈ 0,809017:'],
        equations: ['a_n = \\frac{4{,}0^2 \\times 0{,}809017}{4{,}0}'],
        spokenText: 'Masukkan v empat, R empat, dan kosinus tiga puluh enam derajat nol koma delapan nol sembilan.',
      },
      {
        id: 's10-8',
        title: '8. Perhitungan Matematis',
        highlightType: 'none',
        paragraphs: ['Sederhanakan 4,0² / 4,0 = 4,0:'],
        equations: ['a_n = 4{,}0 \\times 0{,}809017 = 3{,}236068...\\text{ m/s}^2'],
        spokenText: 'Empat dikali nol koma delapan nol sembilan menghasilkan tiga koma dua tiga enam meter per detik kuadrat.',
      },
      {
        id: 's10-9',
        title: '9. Hasil Akhir',
        highlightType: 'hasil',
        paragraphs: ['Dibulatkan satu angka desimal:'],
        equations: ['a_n = 3{,}2\\text{ m/s}^2'],
        spokenText: 'Hasil akhirnya tiga koma dua meter per detik kuadrat.',
      },
      {
        id: 's10-10',
        title: '10. Interpretasi Fisis',
        highlightType: 'none',
        paragraphs: [
          'Jari-jari kelengkungan lintasan spiral pada saat R = 4,0 m adalah ρ = R / cos(36°) ≈ 4,94 m (lebih besar dari R karena lintasan spiral lebih landai daripada lingkaran berjari-jari R).',
        ],
        spokenText:
          'Jari-jari kelengkungan spiral lebih besar daripada R karena partikel bergerak menyerong ke dalam.',
      },
      {
        id: 's10-11',
        title: '11. Strategi Cepat Olimpiade',
        highlightType: 'none',
        paragraphs: [
          'Untuk segala kurva spiral logaritmik berkecepatan konstan dengan sudut radial β (di sini 54°), percepatan total selalu v² sin(β)/R dan jari-jari kelengkungannya ρ = R / sin(β).',
        ],
        spokenText:
          'Rumus cepat percepatan spiral logaritmik adalah v kuadrat sinus sudut radial dibagi R.',
      },
      {
        id: 's10-12',
        title: '12. Kesalahan yang Harus Dihindari',
        highlightType: 'none',
        paragraphs: [
          'Jangan langsung memakai rumus gerak melingkar beraturan a = v²/R = 4,0 m/s²! Itu hanya benar bila partikel bergerak di lingkaran (v tegak lurus R).',
        ],
        spokenText:
          'Jangan langsung memakai v kuadrat per R tanpa faktor kosinus tiga puluh enam derajat.',
      },
    ],
  },

  // SOAL 11
  {
    id: 11,
    shortTitle: 'Resultan Gaya Saat Luas Segitiga Menyusut Seperempatnya',
    tier: 'Tingkat 4 · Kombinasi Konsep',
    tierIndex: 4,
    subtopic: 'Dinamika Hukum II Newton & Skala Geometri',
    stimulusType: 'Diagram Segitiga Sama Sisi & Free Body Diagram Gaya Total',
    questionText:
      'Tiga partikel identik masing-masing bermassa m = 1,0 kg diletakkan pada titik-titik sudut segitiga sama sisi dengan panjang sisi awal s₀ = 8,0 m di atas bidang horizontal licin. Setiap partikel bergerak dengan kelajuan konstan v = 4,0 m/s selalu menuju partikel berikutnya secara siklik. Tentukan besar gaya total horizontal (resultan gaya) yang bekerja pada salah satu partikel tepat ketika luas segitiga yang dibentuk ketiga partikel menyusut menjadi 1/4 luas awalnya (dalam Newton)!',
    knownData: [
      { symbol: 'N', label: 'Jumlah partikel (segitiga)', valueWithUnit: '3 partikel' },
      { symbol: 'm', label: 'Massa tiap partikel', valueWithUnit: '1,0 kg' },
      { symbol: 's₀', label: 'Panjang sisi awal', valueWithUnit: '8,0 m' },
      { symbol: 'v', label: 'Kelajuan konstan', valueWithUnit: '4,0 m/s' },
      { symbol: 'A/A₀', label: 'Perbandingan luas akhir/awal', valueWithUnit: '1/4' },
    ],
    askedQuantity: { symbol: 'F', label: 'Resultan gaya horizontal pada partikel', unit: 'N' },
    answerUnitLabel: 'N',
    exactValue: (1.0 * 16.0 * Math.cos(60 * DEG)) / (4.0 / Math.sqrt(3)),
    expectedFormatted: '3,5',
    tolerance: 0.05,
    hints: [
      'Luas segitiga sama sisi sebanding dengan kuadrat sisinya (A ∝ s²). Jika luas menjadi 1/4 luas awal, maka panjang sisi s menjadi 1/2 s₀ = 4,0 m.',
      'Untuk segitiga sama sisi bersisi s = 4,0 m, jarak ke pusat adalah R = s / √3 = 4,0 / √3 m.',
      'Gunakan Hukum II Newton ΣF = m a_n, dengan percepatan sentripetal spiral a_n = v² cos(60°) / R (karena untuk N = 3, sudut π/3 = 60°).',
    ],
    conceptualFeedbackOnWrong:
      'Periksa hubungan luas dan sisi: jika luas turun menjadi 1/4, panjang sisi turun menjadi √(1/4) = 1/2 kali semula, BUKAN 1/4 kali semula! Cek juga hubungan R = s / √3 untuk segitiga sama sisi.',
    conceptualFeedbackOnRight:
      'Brilian! Anda menggabungkan skala luas geometri (s = ½ s₀), kinematika percepatan spiral a_n = v² cos(60°)/R, dan Hukum II Newton ΣF = ma menjadi 2√3 ≈ 3,5 N.',
    simulation: {
      kind: 'polygon-pursuit',
      n: 3,
      R0: 8.0 / Math.sqrt(3),
      v0: 4.0,
      stepSkip: 1,
      tiltDeg: 0,
      clockwise: false,
      massKg: 1.0,
      highlightTargetFraction: 0.5,
    },
    fbd: {
      objectName: 'Partikel Bermassa m = 1,0 kg di Bidang Horizontal Licin',
      frameDescription:
        'Free Body Diagram (FBD) tampak atas pada bidang horizontal: resultan gaya riil F_total harus tegak lurus v agar laju tetap konstan.',
      hasRealForce: true,
      referenceAngleDeg: 90,
      vectors: [
        {
          id: 'axis-r',
          label: 'e_r (radial ke O)',
          spokenLabel: 'garis radial menuju pusat segitiga',
          color: '#64748B',
          angleDeg: 270,
          lengthRatio: 0.85,
          category: 'axis',
          explanation: 'Sumbu radial saat R = 4/√3 m.',
        },
        {
          id: 'v-total',
          label: 'v (4,0 m/s)',
          spokenLabel: 'vektor kecepatan konstan 4 meter per detik',
          color: '#7C3AED',
          angleDeg: 240,
          lengthRatio: 0.9,
          category: 'velocity',
          explanation: 'Arah gerak sesaat membentuk sudut 30° terhadap radial.',
        },
        {
          id: 'f-net',
          label: 'ΣF = m a_n (3,5 N)',
          spokenLabel: 'gaya total horizontal sebesar 3,5 Newton tegak lurus kecepatan',
          color: '#DC2626',
          angleDeg: 330,
          lengthRatio: 0.88,
          category: 'force',
          explanation: 'Karena kelajuan konstan (F_tangensial = 0), gaya total murni tegak lurus v sebesar m v² cos(60°)/R.',
        },
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Objek Analisis (Tampak Atas Bidang Licin)',
          description: 'Gaya berat mg dan gaya normal lantai saling meniadakan pada arah vertikal; kita analisis bidang horizontal.',
          visibleVectorIds: [],
        },
        {
          stepNumber: 2,
          title: 'Sumbu Radial & Arah Kecepatan',
          description: 'Kecepatan v membentuk sudut 30° terhadap arah ke pusat pada saat R = 4/√3 m.',
          visibleVectorIds: ['axis-r', 'v-total'],
        },
        {
          stepNumber: 3,
          title: 'Gaya Total Riil pada Bidang Horizontal',
          description: 'Agar laju v konstan, tidak ada gaya tangensial; gaya total harus tegak lurus terhadap v!',
          visibleVectorIds: ['axis-r', 'v-total', 'f-net'],
          equationLatex: '\\Sigma F_t = 0, \\qquad \\Sigma F_n = m\\,a_n = m\\frac{v^2\\cos 60^\\circ}{R}',
        },
        {
          stepNumber: 4,
          title: 'Evaluasi Gaya dari Hukum II Newton',
          description: 'Dengan R = 4/√3 m, diperoleh ΣF = 2√3 N ≈ 3,5 N.',
          visibleVectorIds: ['v-total', 'f-net'],
          equationLatex: '\\Sigma F = 1{,}0 \\times \\frac{16{,}0 \\times 0{,}5}{4{,}0/\\sqrt{3}} = 2\\sqrt{3}\\text{ N} \\approx 3{,}5\\text{ N}',
        },
      ],
    },
    problemSpokenText:
      'Soal nomor 11. Tiga partikel bermassa satu kilogram di sudut segitiga sama sisi bersisi awal delapan meter bergerak saling mengejar dengan laju konstan empat meter per detik di atas bidang datar licin. Tentukan besar gaya total yang bekerja pada salah satu partikel tepat ketika luas segitiga menyusut menjadi seperempat luas awalnya dalam satuan Newton.',
    solutionSections: [
      {
        id: 's11-1',
        title: '1. Memahami Permasalahan',
        highlightType: 'none',
        paragraphs: [
          'Tiga partikel bermassa m = 1,0 kg bergerak di bidang datar licin membentuk segitiga sama sisi yang luasnya menyusut dari A₀ menjadi A = A₀/4.',
          'Kita harus menentukan resultan gaya horizontal pada saat tersebut.',
        ],
        spokenText:
          'Kita mencari gaya total pada satu partikel saat luas segitiga menyusut menjadi seperempat luas awal.',
      },
      {
        id: 's11-2',
        title: '2. Identifikasi Konsep Fisika',
        highlightType: 'prinsip',
        paragraphs: [
          'Gabungan tiga prinsip: (1) Kesebangunan luas A ∝ s², (2) Kinematika percepatan normal spiral a_n = v² cos(π/N) / R, dan (3) Hukum II Newton ΣF = m a.',
        ],
        spokenText:
          'Soal ini memadukan kesebangunan luas, percepatan spiral, dan Hukum Kedua Newton.',
      },
      {
        id: 's11-3',
        title: '3. Visualisasi Fenomena',
        highlightType: 'none',
        paragraphs: [
          'Simulasi memperlihatkan segitiga mengecil hingga setengah ukuran panjang sisi awalnya (luas seperempat), dan gaya sentripetal terus mengarah tegak lurus lintasan.',
        ],
        spokenText: 'Saat panjang sisi menjadi setengahnya, luas segitiga tepat seperempat luas awal.',
      },
      {
        id: 's11-4',
        title: '4. Free Body Diagram (FBD)',
        highlightType: 'none',
        paragraphs: [
          'Pada arah vertikal, gaya berat dan gaya normal lantai seimbang. Pada bidang horizontal licin, satu-satunya gaya total bekerja tegak lurus terhadap vektor kecepatan v untuk membelokkan lintasan tanpa mengubah kelajuan.',
        ],
        spokenText:
          'Pada bidang horizontal, gaya total tegak lurus terhadap kecepatan sehingga kelajuan partikel tetap konstan.',
      },
      {
        id: 's11-5',
        title: '5. Menentukan Persamaan Dasar',
        highlightType: 'rumus',
        paragraphs: ['Hubungan luas, jari-jari luar segitiga sama sisi, dan Hukum II Newton:'],
        equations: [
          'A = \\frac{\\sqrt{3}}{4}s^2, \\qquad R = \\frac{s}{2\\sin 60^\\circ} = \\frac{s}{\\sqrt{3}}, \\qquad \\Sigma F = m\\frac{v^2\\cos(\\pi/3)}{R}',
        ],
        spokenText: 'Luas sebanding s kuadrat, R sama dengan s per akar tiga, dan resultan gaya adalah m v kuadrat kosinus enam puluh derajat per R.',
      },
      {
        id: 's11-6',
        title: '6. Penurunan Persamaan',
        highlightType: 'kritis',
        paragraphs: ['Dari A = ¼ A₀ diperoleh s = ½ s₀, sehingga:'],
        equations: [
          'R = \\frac{s_0}{2\\sqrt{3}} \\implies \\Sigma F = m\\frac{v^2(1/2)}{s_0/(2\\sqrt{3})} = \\frac{\\sqrt{3}\\,m v^2}{s_0}',
        ],
        spokenText: 'Karena luas seperempatnya, sisi menjadi setengahnya, menghasilkan gaya total akar tiga m v kuadrat dibagi s nol.',
      },
      {
        id: 's11-7',
        title: '7. Substitusi Angka',
        highlightType: 'none',
        paragraphs: ['Masukkan m = 1,0 kg, v = 4,0 m/s, dan s₀ = 8,0 m:'],
        equations: ['\\Sigma F = \\frac{\\sqrt{3} \\times 1{,}0 \\times 4{,}0^2}{8{,}0}'],
        spokenText: 'Substitusikan m satu, v empat, dan s nol delapan.',
      },
      {
        id: 's11-8',
        title: '8. Perhitungan Matematis',
        highlightType: 'none',
        paragraphs: ['Sederhanakan 16,0 / 8,0 = 2,0:'],
        equations: ['\\Sigma F = 2\\sqrt{3} = 2 \\times 1{,}7320508 = 3{,}46410...\\text{ N}'],
        spokenText: 'Dua kali akar tiga sama dengan tiga koma empat enam empat Newton.',
      },
      {
        id: 's11-9',
        title: '9. Hasil Akhir',
        highlightType: 'hasil',
        paragraphs: ['Dibulatkan satu angka desimal:'],
        equations: ['\\Sigma F = 3{,}5\\text{ N}'],
        spokenText: 'Hasil akhirnya adalah tiga koma lima Newton.',
      },
      {
        id: 's11-10',
        title: '10. Interpretasi Fisis',
        highlightType: 'none',
        paragraphs: [
          'Gaya 3,5 N ini dua kali lebih besar daripada gaya awal saat s = 8,0 m (yang hanya 1,73 N), karena jari-jari kelengkungan menyusut separuhnya.',
        ],
        spokenText: 'Gaya yang dibutuhkan meningkat dua kali lipat karena jari-jari menyusut setengahnya.',
      },
      {
        id: 's11-11',
        title: '11. Strategi Cepat Olimpiade',
        highlightType: 'none',
        paragraphs: [
          'Untuk segitiga sama sisi, cos(60°) = 1/2 dan R = s/√3, jadi langsung hafal relasi ΣF = (√3/2) m v² / s.',
        ],
        spokenText: 'Untuk segitiga sama sisi, gaya berbanding terbalik dengan panjang sisi s.',
      },
      {
        id: 's11-12',
        title: '12. Kesalahan yang Harus Dihindari',
        highlightType: 'none',
        paragraphs: [
          'Jangan membagi panjang sisi dengan 4 ketika luas menjadi 1/4! Luas berdimensi panjang kuadrat sehingga s menyusut sebesar √(1/4) = 1/2.',
        ],
        spokenText: 'Kesalahan umum adalah mengecilkan sisi menjadi seperempatnya padahal seharusnya setengahnya.',
      },
    ],
  },

  // SOAL 12
  {
    id: 12,
    shortTitle: 'Sudut Putar Total Spiral Logaritmik pada Segilima',
    tier: 'Tingkat 4 · Kombinasi Konsep',
    tierIndex: 4,
    subtopic: 'Persamaan Polar Spiral & Kalkulus Kinematika',
    stimulusType: 'Grafik & Lintasan Polar Segilima Menyusut 10 Kali Lipat',
    questionText:
      'Lima partikel berada pada titik sudut segilima beraturan dengan jari-jari lingkaran luar awal R₀ = 20,0 m. Setiap partikel bergerak saling mengejar dengan kelajuan konstan v. Hitunglah sudut putar total Δθ (dalam radian) yang telah ditempuh garis radial pusat–partikel tepat ketika jarak masing-masing partikel ke pusat menyusut menjadi R = 2,0 m (sepersepuluh jari-jari awal)!',
    knownData: [
      { symbol: 'N', label: 'Jumlah partikel (segilima)', valueWithUnit: '5 partikel' },
      { symbol: 'R₀', label: 'Jari-jari awal', valueWithUnit: '20,0 m' },
      { symbol: 'R', label: 'Jari-jari akhir', valueWithUnit: '2,0 m' },
    ],
    askedQuantity: { symbol: 'Δθ', label: 'Sudut putar total', unit: 'rad' },
    answerUnitLabel: 'rad',
    exactValue: (Math.cos(36 * DEG) / Math.sin(36 * DEG)) * Math.log(10),
    expectedFormatted: '3,2',
    tolerance: 0.05,
    hints: [
      'Gunakan dua persamaan komponen polar: dR/dt = -v sin(36°) dan R (dθ/dt) = v cos(36°).',
      'Bagikan kedua persamaan untuk mengeliminasi waktu dt dan kelajuan v: dθ / dR = -cot(36°) / R.',
      'Integralkan dari R = R₀ sampai R = 2,0 m untuk mendapatkan Δθ = cot(36°) ln(R₀ / R).',
    ],
    conceptualFeedbackOnWrong:
      'Periksa hasil integrasi 1/R yang menghasilkan logaritma natural ln(R₀/R), bukan rasio linear R₀/R atau logaritma basis 10 (log₁₀)!',
    conceptualFeedbackOnRight:
      'Luar biasa! Anda menurunkan persamaan spiral logaritmik dengan sempurna: Δθ = cot(36°) × ln(10) = 1,3764 × 2,3026 ≈ 3,2 rad.',
    simulation: {
      kind: 'polygon-pursuit',
      n: 5,
      R0: 20.0,
      v0: 4.0,
      stepSkip: 1,
      tiltDeg: 0,
      stopSideLength: 2 * 2.0 * Math.sin(36 * DEG),
      clockwise: false,
    },
    fbd: {
      objectName: 'Koordinat Polar (R, θ) Partikel Segilima',
      frameDescription: 'Hubungan diferensial antara perubahan sudut dθ dan penyusutan jari-jari dR.',
      hasRealForce: false,
      referenceAngleDeg: 90,
      vectors: [
        {
          id: 'axis-r',
          label: 'e_r (radial)',
          spokenLabel: 'sumbu radial R',
          color: '#64748B',
          angleDeg: 270,
          lengthRatio: 0.85,
          category: 'axis',
          explanation: 'Jari-jari R menyusut dari 20,0 m ke 2,0 m.',
        },
        {
          id: 'axis-t',
          label: 'e_θ (sudut)',
          spokenLabel: 'sumbu tangensial untuk perubahan sudut teta',
          color: '#94A3B8',
          angleDeg: 180,
          lengthRatio: 0.8,
          category: 'axis',
          explanation: 'Arah pertambahan sudut θ.',
        },
        {
          id: 'v-r',
          label: 'dR/dt = -v sin(36°)',
          spokenLabel: 'laju penyusutan radial',
          color: '#059669',
          angleDeg: 270,
          lengthRatio: 0.56,
          category: 'component',
          explanation: 'Menentukan perubahan jari-jari dR.',
        },
        {
          id: 'v-theta',
          label: 'R dθ/dt = v cos(36°)',
          spokenLabel: 'komponen tangensial R d teta per d t',
          color: '#0284C7',
          angleDeg: 180,
          lengthRatio: 0.77,
          category: 'component',
          explanation: 'Menentukan laju putar sudut dθ/dt.',
        },
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Koordinat Polar Sistem',
          description: 'Nyatakan posisi partikel dengan jarak pusat R(t) dan sudut polar θ(t).',
          visibleVectorIds: ['axis-r', 'axis-t'],
        },
        {
          stepNumber: 2,
          title: 'Dua Persamaan Diferensial Kinematika',
          description: 'Komponen radial dan tangensial saling terhubung oleh kelajuan konstan v.',
          visibleVectorIds: ['axis-r', 'axis-t', 'v-r', 'v-theta'],
          equationLatex: '\\frac{dR}{dt} = -v\\sin 36^\\circ, \\qquad R\\frac{d\\theta}{dt} = v\\cos 36^\\circ',
        },
        {
          stepNumber: 3,
          title: 'Eliminasi Waktu dan Kelajuan',
          description: 'Bagi persamaan tangensial dengan persamaan radial.',
          visibleVectorIds: ['v-r', 'v-theta'],
          equationLatex: '\\frac{d\\theta}{dR} = -\\frac{\\cot 36^\\circ}{R}',
        },
        {
          stepNumber: 4,
          title: 'Integrasi Menghasilkan Spiral Logaritmik',
          description: 'Integralkan dari R₀ = 20,0 m hingga R = 2,0 m.',
          visibleVectorIds: ['axis-r', 'v-r', 'v-theta'],
          equationLatex: '\\Delta\\theta = \\cot(36^\\circ)\\ln\\left(\\frac{R_0}{R}\\right) \\approx 3{,}2\\text{ rad}',
        },
      ],
    },
    problemSpokenText:
      'Soal nomor 12. Lima partikel pada titik sudut segilima beraturan berjari-jari awal dua puluh meter bergerak saling mengejar dengan kelajuan konstan. Hitunglah sudut putar total dalam radian saat jarak ke pusat menyusut menjadi dua meter.',
    solutionSections: [
      {
        id: 's12-1',
        title: '1. Memahami Permasalahan',
        highlightType: 'none',
        paragraphs: [
          'Ketika segilima menyusut sepuluh kali lipat dari R₀ = 20,0 m ke R = 2,0 m, seluruh sistem sekaligus berotasi sebesar sudut Δθ. Soal menanyakan besar sudut Δθ dalam satuan radian.',
        ],
        spokenText: 'Kita mencari sudut putar total dalam radian saat jari-jari menyusut dari dua puluh meter menjadi dua meter.',
      },
      {
        id: 's12-2',
        title: '2. Identifikasi Konsep Fisika',
        highlightType: 'prinsip',
        paragraphs: [
          'Persamaan lintasan dalam koordinat polar (R, θ) diperoleh dengan mengeliminasi parameter waktu t dari laju radial dan laju tangensial, yang menghasilkan persamaan spiral logaritmik.',
        ],
        spokenText:
          'Dengan menggabungkan komponen radial dan tangensial, kita menurunkan persamaan lintasan spiral logaritmik.',
      },
      {
        id: 's12-3',
        title: '3. Visualisasi Fenomena',
        highlightType: 'none',
        paragraphs: [
          'Pada simulasi terlihat segilima berotasi sedikit lebih dari setengah putaran penuh (π ≈ 3,14 rad) untuk menyusut hingga sepersepuluh ukuran awalnya.',
        ],
        spokenText:
          'Simulasi menunjukkan segilima berputar sedikit lebih dari setengah putaran ketika ukurannya mengecil sepuluh kali.',
      },
      {
        id: 's12-4',
        title: '4. Diagram Vektor Kinematika',
        highlightType: 'none',
        paragraphs: [
          'Perbandingan v_θ / |v_r| = cot(36°) bernilai konstan sepanjang gerak, berarti setiap penyusutan fraksional jari-jari dR/R menghasilkan tambahan sudut dθ yang konstan.',
        ],
        spokenText: 'Perbandingan komponen tangensial terhadap radial selalu tetap sebesar kotangen tiga puluh enam derajat.',
      },
      {
        id: 's12-5',
        title: '5. Menentukan Persamaan Dasar',
        highlightType: 'rumus',
        paragraphs: ['Persamaan koordinat polar untuk segi-N beraturan:'],
        equations: ['\\frac{dR}{dt} = -v\\sin\\left(\\frac{\\pi}{N}\\right), \\qquad R\\frac{d\\theta}{dt} = v\\cos\\left(\\frac{\\pi}{N}\\right)'],
        spokenText: 'Persamaan polar adalah d R per d t sama dengan minus v sinus pi per N, dan R d teta per d t sama dengan v kosinus pi per N.',
      },
      {
        id: 's12-6',
        title: '6. Penurunan Persamaan',
        highlightType: 'kritis',
        paragraphs: ['Bagi kedua persamaan lalu integralkan terhadap R:'],
        equations: [
          'd\\theta = -\\cot\\left(\\frac{\\pi}{N}\\right)\\frac{dR}{R} \\implies \\Delta\\theta = \\int_{R_0}^{R} -\\cot(36^\\circ)\\frac{dR}{R} = \\cot(36^\\circ)\\ln\\left(\\frac{R_0}{R}\\right)',
        ],
        spokenText: 'Integrasi d R per R menghasilkan logaritma natural R nol per R dikali kotangen tiga puluh enam derajat.',
      },
      {
        id: 's12-7',
        title: '7. Substitusi Angka',
        highlightType: 'none',
        paragraphs: ['Gunakan cot(36°) = cos(36°)/sin(36°) ≈ 1,376382 dan ln(20,0/2,0) = ln(10) ≈ 2,302585:'],
        equations: ['\\Delta\\theta = 1{,}376382 \\times 2{,}302585'],
        spokenText: 'Kalikan satu koma tiga tujuh enam empat dengan logaritma natural sepuluh yaitu dua koma tiga nol dua enam.',
      },
      {
        id: 's12-8',
        title: '8. Perhitungan Matematis',
        highlightType: 'none',
        paragraphs: ['Hasil perkalian:'],
        equations: ['\\Delta\\theta = 3{,}169236...\\text{ rad}'],
        spokenText: 'Hasilnya tiga koma satu enam sembilan radian.',
      },
      {
        id: 's12-9',
        title: '9. Hasil Akhir',
        highlightType: 'hasil',
        paragraphs: ['Dibulatkan satu angka desimal:'],
        equations: ['\\Delta\\theta = 3{,}2\\text{ rad}'],
        spokenText: 'Hasil akhir adalah tiga koma dua radian.',
      },
      {
        id: 's12-10',
        title: '10. Interpretasi Fisis',
        highlightType: 'none',
        paragraphs: [
          'Menariknya, saat R → 0, ln(R₀/R) → ∞! Artinya partikel sebenarnya berputar tak terhingga kali mengelilingi titik pusat tepat sebelum bertemu, meskipun panjang lintasan total a dan waktu temu T bernilai berhingga.',
        ],
        spokenText:
          'Secara matematis partikel berputar tak berhingga kali saat mendekati nol, meskipun waktu dan panjang lintasannya tetap berhingga.',
      },
      {
        id: 's12-11',
        title: '11. Strategi Cepat Olimpiade',
        highlightType: 'none',
        paragraphs: [
          'Ingat ln(10) ≈ 2,3026 dan untuk spiral logaritmik sudut putar hanya bergantung pada rasio R₀/R, tidak bergantung pada kelajuan v.',
        ],
        spokenText: 'Sudut putar total tidak bergantung pada kelajuan v, hanya pada rasio jari-jari awal dan akhir.',
      },
      {
        id: 's12-12',
        title: '12. Kesalahan yang Harus Dihindari',
        highlightType: 'none',
        paragraphs: [
          'Jangan menggunakan logaritma basis 10 (log₁₀(10) = 1)! Integral dari 1/R selalu menghasilkan logaritma natural ln(10) ≈ 2,3026.',
        ],
        spokenText: 'Jangan salah memakai logaritma basis sepuluh, gunakan logaritma natural ln sepuluh.',
      },
    ],
  },

  // SOAL 13
  {
    id: 13,
    shortTitle: 'Pengejaran Segilima dengan Percepatan Tangensial Konstan',
    tier: 'Tingkat 5 · Olimpiade Kompleks',
    tierIndex: 5,
    subtopic: 'Gerak Dipercepat Beraturan pada Lintasan Spiral',
    stimulusType: 'Grafik v(t) = a_t t dan Simulasi Segilima Terakselerasi',
    questionText:
      'Lima partikel diletakkan di titik sudut sebuah segilima beraturan berjari-jari luar awal R₀ = 25,0 m. Mulai t = 0 dari keadaan diam (v₀ = 0), setiap partikel bergerak dengan percepatan tangensial konstan sepanjang lintasannya sebesar a_t = 2,0 m/s², sementara arah vektor kecepatannya selalu mengarah ke partikel tetangga secara siklik. Tentukan waktu total yang diperlukan hingga kelima partikel bertemu di pusat segilima (dalam sekon)!',
    knownData: [
      { symbol: 'N', label: 'Jumlah partikel (segilima)', valueWithUnit: '5 partikel' },
      { symbol: 'R₀', label: 'Jari-jari awal', valueWithUnit: '25,0 m' },
      { symbol: 'v₀', label: 'Kecepatan awal', valueWithUnit: '0 m/s' },
      { symbol: 'a_t', label: 'Percepatan tangensial konstan', valueWithUnit: '2,0 m/s²' },
    ],
    askedQuantity: { symbol: 'T', label: 'Waktu total pertemuan', unit: 's' },
    answerUnitLabel: 's',
    exactValue: Math.sqrt((2 * 25.0) / (2.0 * Math.sin(36 * DEG))),
    expectedFormatted: '6,5',
    tolerance: 0.05,
    hints: [
      'Meskipun arah berubah, besar kecepatan ditentukan oleh percepatan tangensial: dv/dt = a_t, sehingga v(t) = a_t t.',
      'Karena kelima partikel mengalami percepatan tangensial yang identik, pada setiap saat t kelajuan mereka sama dan simetri segilima beraturan tetap terjaga!',
      'Substitusikan v(t) = a_t t ke persamaan radial -dR/dt = v(t) sin(36°), lalu integralkan dari t = 0 hingga t = T.',
    ],
    conceptualFeedbackOnWrong:
      'Periksa hubungan antara jarak tempuh spiral a dan jari-jari R₀: jarak tempuh tetap a = R₀ / sin(36°), tetapi karena partikel dipercepat dari diam, a = ½ a_t T² (bukan vT)!',
    conceptualFeedbackOnRight:
      'Hebat! Anda berhasil membuktikan bahwa bentuk lintasan spiral tidak bergantung pada profil kecepatan v(t), sehingga ½ a_t T² = R₀ / sin(36°) menghasilkan T ≈ 6,5 s.',
    simulation: {
      kind: 'polygon-pursuit',
      n: 5,
      R0: 25.0,
      v0: 0,
      stepSkip: 1,
      tiltDeg: 0,
      tangentialAccel: 2.0,
      clockwise: false,
    },
    fbd: {
      objectName: 'Partikel Segilima yang Dipercepat Tangensial',
      frameDescription: 'Percepatan total kini merupakan kombinasi komponen tangensial a_t dan normal a_n.',
      hasRealForce: false,
      referenceAngleDeg: 90,
      vectors: [
        {
          id: 'axis-r',
          label: 'e_r (radial ke O)',
          spokenLabel: 'arah radial menuju pusat',
          color: '#64748B',
          angleDeg: 270,
          lengthRatio: 0.85,
          category: 'axis',
          explanation: 'Sumbu radial menuju pusat O.',
        },
        {
          id: 'v-total',
          label: 'v(t) = a_t t',
          spokenLabel: 'kecepatan sesaat yang bertambah secara linear terhadap waktu',
          color: '#7C3AED',
          angleDeg: 216,
          lengthRatio: 0.88,
          category: 'velocity',
          explanation: 'Besarnya meningkat linear: v(t) = 2,0 t.',
        },
        {
          id: 'a-tangential',
          label: 'a_t = 2,0 m/s²',
          spokenLabel: 'percepatan tangensial searah kecepatan',
          color: '#D97706',
          angleDeg: 216,
          lengthRatio: 0.6,
          category: 'acceleration',
          explanation: 'Memperbesar kelajuan sepanjang lintasan.',
        },
        {
          id: 'a-normal',
          label: 'a_n = v(t)² cos(36°)/R',
          spokenLabel: 'percepatan normal tegak lurus kecepatan',
          color: '#DC2626',
          angleDeg: 306,
          lengthRatio: 0.72,
          category: 'acceleration',
          explanation: 'Membelokkan arah kecepatan mengikuti tetangga.',
        },
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Keberlakuan Simetri saat Dipercepat',
          description: 'Karena dv/dt = a_t identik bagi kelima partikel, kelajuan sesaat v(t) selalu seragam.',
          visibleVectorIds: ['axis-r', 'v-total'],
        },
        {
          stepNumber: 2,
          title: 'Dua Komponen Percepatan',
          description: 'a_t searah v (mengubah laju), sedangkan a_n tegak lurus v (mengubah arah).',
          visibleVectorIds: ['v-total', 'a-tangential', 'a-normal'],
          equationLatex: '\\frac{dv}{dt} = a_t \\implies v(t) = a_t\\,t',
        },
        {
          stepNumber: 3,
          title: 'Persamaan Diferensial Radial Berubah Waktu',
          description: 'Masukkan v(t) ke dalam laju penyusutan jari-jari.',
          visibleVectorIds: ['axis-r', 'v-total'],
          equationLatex: '-\\frac{dR}{dt} = a_t\\,t\\sin(36^\\circ)',
        },
        {
          stepNumber: 4,
          title: 'Integrasi terhadap Waktu',
          description: 'Diperoleh R₀ = ½ a_t T² sin(36°), atau setara dengan a = ½ a_t T².',
          visibleVectorIds: ['axis-r', 'v-total', 'a-tangential'],
          equationLatex: 'T = \\sqrt{\\frac{2 R_0}{a_t\\sin(36^\\circ)}} \\approx 6{,}5\\text{ s}',
        },
      ],
    },
    problemSpokenText:
      'Soal nomor 13. Lima partikel di sudut segilima beraturan berjari-jari dua puluh lima meter mulai bergerak dari diam dengan percepatan tangensial konstan dua meter per detik kuadrat, arahnya selalu mengarah ke partikel tetangga. Tentukan waktu total hingga kelima partikel bertemu.',
    solutionSections: [
      {
        id: 's13-1',
        title: '1. Memahami Permasalahan',
        highlightType: 'none',
        paragraphs: [
          'Kelajuan partikel tidak lagi konstan, melainkan dimulai dari v₀ = 0 dengan percepatan tangensial konstan a_t = 2,0 m/s².',
          'Kita mencari waktu pertemuan T dari jarak awal ke pusat R₀ = 25,0 m.',
        ],
        spokenText: 'Partikel bergerak dari keadaan diam dengan percepatan tangensial dua meter per detik kuadrat.',
      },
      {
        id: 's13-2',
        title: '2. Identifikasi Konsep Fisika',
        highlightType: 'prinsip',
        paragraphs: [
          'Prinsip kunci: laju perubahan besar kecepatan ditentukan oleh percepatan tangensial (dv/dt = a_t), terlepas dari lengkungan lintasan. Selama kelima partikel punya a_t sama, simetri segilima tetap utuh setiap saat!',
        ],
        spokenText:
          'Selama percepatan tangensial kelima partikel sama, simetri segilima tetap terjaga pada setiap detik.',
      },
      {
        id: 's13-3',
        title: '3. Visualisasi Fenomena',
        highlightType: 'none',
        paragraphs: [
          'Pada simulasi tampak partikel bergerak pelan di awal, lalu melesat semakin cepat seiring waktu mendekati titik pusat.',
        ],
        spokenText: 'Simulasi menunjukkan gerakan bermula lambat lalu makin cepat menuju pusat.',
      },
      {
        id: 's13-4',
        title: '4. Diagram Vektor Kinematika',
        highlightType: 'none',
        paragraphs: [
          'Terdapat percepatan tangensial a_t searah v dan percepatan normal a_n tegak lurus v. Hanya v(t) yang menentukan komponen kecepatan radial.',
        ],
        spokenText: 'Percepatan tangensial memperbesar laju, sementara percepatan normal membelokkan lintasan.',
      },
      {
        id: 's13-5',
        title: '5. Menentukan Persamaan Dasar',
        highlightType: 'rumus',
        paragraphs: ['Persamaan GLBB sepanjang lintasan lengkung dan laju radial:'],
        equations: ['v(t) = a_t\\,t, \\qquad -\\frac{dR}{dt} = v(t)\\sin(36^\\circ)'],
        spokenText: 'V sebagai fungsi waktu adalah a tangensial kali t, dan minus d R per d t sama dengan v t sinus tiga puluh enam derajat.',
      },
      {
        id: 's13-6',
        title: '6. Penurunan Persamaan',
        highlightType: 'kritis',
        paragraphs: ['Integrasikan dari t = 0 (R = R₀) hingga t = T (R = 0):'],
        equations: [
          '\\int_{R_0}^{0} dR = -a_t\\sin(36^\\circ)\\int_{0}^{T} t\\,dt \\implies R_0 = \\frac{1}{2}a_t T^2\\sin(36^\\circ)',
          'T = \\sqrt{\\frac{2 R_0}{a_t\\sin(36^\\circ)}}',
        ],
        spokenText: 'Integrasi t menghasilkan setengah a tangensial T kuadrat sinus tiga puluh enam derajat sama dengan R nol.',
      },
      {
        id: 's13-7',
        title: '7. Substitusi Angka',
        highlightType: 'none',
        paragraphs: ['Masukkan R₀ = 25,0 m, a_t = 2,0 m/s², dan sin(36°) ≈ 0,587785:'],
        equations: ['T = \\sqrt{\\frac{2 \\times 25{,}0}{2{,}0 \\times 0{,}587785}} = \\sqrt{\\frac{25{,}0}{0{,}587785}}'],
        spokenText: 'Substitusikan R nol dua puluh lima meter dan a tangensial dua meter per detik kuadrat.',
      },
      {
        id: 's13-8',
        title: '8. Perhitungan Matematis',
        highlightType: 'none',
        paragraphs: ['Hitung nilai di dalam akar:'],
        equations: ['T = \\sqrt{42{,}53254...} = 6{,}52169...\\text{ s}'],
        spokenText: 'Akar dari empat puluh dua koma lima tiga dua adalah enam koma lima dua satu sekon.',
      },
      {
        id: 's13-9',
        title: '9. Hasil Akhir',
        highlightType: 'hasil',
        paragraphs: ['Dibulatkan satu angka desimal:'],
        equations: ['T = 6{,}5\\text{ s}'],
        spokenText: 'Hasil akhirnya adalah enam koma lima sekon.',
      },
      {
        id: 's13-10',
        title: '10. Interpretasi Fisis',
        highlightType: 'none',
        paragraphs: [
          'Panjang lintasan spiral tetap bernilai a = R₀ / sin(36°) ≈ 42,53 m! Karena gerak dipercepat beraturan sepanjang lintasan melengkung tersebut, berlaku tepat rumus GLBB a = ½ a_t T².',
        ],
        spokenText:
          'Panjang lintasan spiral tetap empat puluh dua koma lima meter, ditempuh dalam enam koma lima detik dengan percepatan konstan.',
      },
      {
        id: 's13-11',
        title: '11. Strategi Cepat Olimpiade',
        highlightType: 'none',
        paragraphs: [
          'Invariansi geometris: sepanjang tidak ada perubahan aturan arah, panjang kurva spiral selalu a = R₀ / sin(π/N)! Setelah tahu a, langsung pakai kinematika 1D sepanjang busur: a = v₀T + ½ a_t T².',
        ],
        spokenText:
          'Trik super cepat: hitung dulu panjang lintasan spiral a sama dengan R nol per sinus tiga puluh enam derajat, lalu gunakan rumus GLBB satu dimensi.',
      },
      {
        id: 's13-12',
        title: '12. Kesalahan yang Harus Dihindari',
        highlightType: 'none',
        paragraphs: [
          'Jangan menggunakan a_t untuk percepatan radial murni (R₀ = ½ a_t T² tanpa sin 36°). Jarak yang ditempuh partikel adalah panjang spiral a, bukan jari-jari R₀.',
        ],
        spokenText:
          'Jangan lupa menyertakan faktor sinus tiga puluh enam derajat karena partikel menempuh lintasan spiral, bukan garis lurus.',
      },
    ],
  },

  // SOAL 14
  {
    id: 14,
    shortTitle: 'Pengejaran Segilima di Sungai Berarus (Relativitas Galilean)',
    tier: 'Tingkat 5 · Olimpiade Kompleks',
    tierIndex: 5,
    subtopic: 'Transformasi Kerangka Acuan & Penjumlahan Vektor',
    stimulusType: 'Skema Lima Perahu di Sungai Berarus Timur V_c',
    questionText:
      'Lima perahu otonom berada pada titik-titik sudut sebuah segilima beraturan berjari-jari lingkaran luar R₀ = 10,0 m di atas sungai luas yang mengalir seragam ke arah timur dengan kecepatan arus V_c = 4,0 m/s. Perahu 1 berada tepat di titik sudut paling utara dari pusat segilima awal. Semua perahu bergerak dengan kelajuan konstan v = 5,0 m/s relatif terhadap air sambil selalu mengarahkan haluannya ke perahu tetangga secara siklik hingga kelimanya bertemu. Tentukan besar perpindahan total Perahu 1 relatif terhadap tepi sungai (tanah) hingga saat pertemuan (dalam meter)!',
    knownData: [
      { symbol: 'N', label: 'Jumlah perahu (segilima)', valueWithUnit: '5 perahu' },
      { symbol: 'R₀', label: 'Jari-jari segilima awal', valueWithUnit: '10,0 m' },
      { symbol: 'v', label: 'Kelajuan relatif terhadap air', valueWithUnit: '5,0 m/s' },
      { symbol: 'V_c', label: 'Kecepatan arus ke timur (+x)', valueWithUnit: '4,0 m/s' },
    ],
    askedQuantity: { symbol: 'b_tanah', label: 'Besar perpindahan Perahu 1 terhadap tanah', unit: 'm' },
    answerUnitLabel: 'm',
    exactValue: Math.hypot(
      10.0,
      4.0 * (10.0 / (5.0 * Math.sin(36 * DEG)))
    ),
    expectedFormatted: '16,9',
    tolerance: 0.05,
    hints: [
      'Pindahkan pengamatan ke kerangka acuan yang ikut hanyut bersama air sungai! Dalam kerangka air, tidak ada arus.',
      'Di dalam kerangka air, waktu temu T persis sama seperti segilima diam: T = R₀ / (v sin 36°).',
      'Selama waktu T, pusat segilima hanyut ke timur sejauh D = V_c T. Perahu 1 bergerak dari utara sejauh R₀ ke selatan sekaligus hanyut sejauh D ke timur: gunakan Pythagoras √(R₀² + D²)!',
    ],
    conceptualFeedbackOnWrong:
      'Jangan menjumlahkan skalar R₀ + V_c T secara langsung! Perahu 1 memulai dari titik paling utara sehingga perpindahannya dalam kerangka air mengarah ke selatan (tegak lurus terhadap aliran arus ke timur).',
    conceptualFeedbackOnRight:
      'Luar biasa! Anda memisahkan gerak dalam kerangka air (menghasilkan T = 3,40 s dan perpindahan selatan 10,0 m) dengan hanyutan timur 13,61 m, lalu menjumlahkannya secara vektor menjadi 16,9 m!',
    simulation: {
      kind: 'polygon-pursuit',
      n: 5,
      R0: 10.0,
      v0: 5.0,
      stepSkip: 1,
      tiltDeg: 0,
      currentVx: 4.0,
      clockwise: false,
    },
    fbd: {
      objectName: 'Vektor Perpindahan Perahu 1 dalam Kerangka Tanah',
      frameDescription: 'Penjumlahan vektor perpindahan relatif air (ke selatan) dan hanyutan arus (ke timur).',
      hasRealForce: false,
      referenceAngleDeg: 90,
      vectors: [
        {
          id: 'axis-r',
          label: 'Δr_air (10,0 m ke selatan)',
          spokenLabel: 'perpindahan relatif terhadap air sepuluh meter ke selatan',
          color: '#059669',
          angleDeg: 270,
          lengthRatio: 0.65,
          category: 'component',
          explanation: 'Perpindahan Perahu 1 menuju pusat segilima dalam kerangka air.',
        },
        {
          id: 'v-theta',
          label: 'V_c T (13,6 m ke timur)',
          spokenLabel: 'hanyutan arus tiga belas koma enam meter ke timur',
          color: '#0284C7',
          angleDeg: 0,
          lengthRatio: 0.85,
          category: 'component',
          explanation: 'Pergeseran pusat segilima terbawa arus selama waktu T.',
        },
        {
          id: 'v-total',
          label: 'Δr_tanah (16,9 m)',
          spokenLabel: 'perpindahan resultan terhadap tanah enam belas koma sembilan meter',
          color: '#7C3AED',
          angleDeg: 324,
          lengthRatio: 0.98,
          category: 'velocity',
          explanation: 'Resultan vektor Δr_tanah = Δr_air + V_c T.',
        },
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Transformasi Galilean ke Kerangka Air',
          description: 'Semua perahu mengalami hanyutan V_c yang sama sehingga kecepatan relatif antar perahu tidak berubah.',
          visibleVectorIds: ['axis-r'],
        },
        {
          stepNumber: 2,
          title: 'Hitung Waktu Pertemuan di Kerangka Air',
          description: 'Waktu temu T = R₀ / (v sin 36°) = 3,4026 s.',
          visibleVectorIds: ['axis-r'],
          equationLatex: 'T = \\frac{10{,}0}{5{,}0\\sin 36^\\circ} \\approx 3{,}4026\\text{ s}',
        },
        {
          stepNumber: 3,
          title: 'Hanyutan Pusat Segilima oleh Arus Sungai',
          description: 'Pusat pertemuan bergeser ke timur (+x) sejauh D = V_c T.',
          visibleVectorIds: ['axis-r', 'v-theta'],
          equationLatex: 'D = V_c T = 4{,}0 \\times 3{,}4026 \\approx 13{,}6104\\text{ m}',
        },
        {
          stepNumber: 4,
          title: 'Resultan Perpindahan Vektor terhadap Tanah',
          description: 'Perpindahan ke selatan dan ke timur saling tegak lurus.',
          visibleVectorIds: ['axis-r', 'v-theta', 'v-total'],
          equationLatex: 'b_{\\text{tanah}} = \\sqrt{R_0^2 + (V_c T)^2} \\approx 16{,}9\\text{ m}',
        },
      ],
    },
    problemSpokenText:
      'Soal nomor 14. Lima perahu berada pada segilima beraturan berjari-jari sepuluh meter di sungai berarus ke timur empat meter per detik. Perahu satu berada di titik paling utara. Semua perahu bergerak dengan kelajuan lima meter per detik relatif terhadap air saling mengejar hingga bertemu. Berapakah besar perpindahan total Perahu satu terhadap tanah dalam meter?',
    solutionSections: [
      {
        id: 's14-1',
        title: '1. Memahami Permasalahan',
        highlightType: 'none',
        paragraphs: [
          'Kelima perahu saling mengejar di atas air yang mengalir ke timur dengan kecepatan V_c = 4,0 m/s. Perahu 1 berawal di utara pusat segilima awal (0, +R₀).',
          'Ditanyakan besar perpindahan netto Perahu 1 diukur terhadap tepi sungai (tanah).',
        ],
        spokenText:
          'Kita mencari besar perpindahan total perahu pertama relatif terhadap tepi sungai yang diam.',
      },
      {
        id: 's14-2',
        title: '2. Identifikasi Konsep Fisika',
        highlightType: 'prinsip',
        paragraphs: [
          'Menurut Transformasi Galilean, karena arus memberikan vektor kecepatan tambahan V_c yang seragam pada kelima perahu, kecepatan relatif antar perahu tidak berubah! Akibatnya, di dalam kerangka air mereka tetap membentuk segilima beraturan dan bertemu di pusat massa air dalam waktu T yang sama persis seperti di air tenang.',
        ],
        spokenText:
          'Berdasarkan prinsip relativitas Galilean, arus yang seragam tidak mengubah gerak relatif antar perahu maupun waktu bertemunya.',
      },
      {
        id: 's14-3',
        title: '3. Visualisasi Fenomena',
        highlightType: 'none',
        paragraphs: [
          'Dalam animasi tampak seluruh segilima menyusut dan berotasi sambil meluncur ke kanan (arah timur) terbawa aliran sungai hingga kelimanya bertemu di titik yang bergeser ke kanan.',
        ],
        spokenText:
          'Simulasi memperlihatkan segilima menyusut sekaligus hanyut ke kanan mengikuti arus sungai.',
      },
      {
        id: 's14-4',
        title: '4. Diagram Vektor Perpindahan',
        highlightType: 'none',
        paragraphs: [
          'Relatif terhadap air, Perahu 1 berpindah dari (0, +R₀) ke pusat (0, 0), yakni R₀ ke arah selatan. Relatif terhadap tanah, pusat tersebut bergerak D = V_c T ke arah timur.',
        ],
        spokenText:
          'Komponen perpindahan terdiri atas sepuluh meter ke selatan terhadap air dan hanyutan ke timur oleh arus.',
      },
      {
        id: 's14-5',
        title: '5. Menentukan Persamaan Dasar',
        highlightType: 'rumus',
        paragraphs: ['Persamaan waktu temu di kerangka air dan penjumlahan vektor perpindahan:'],
        equations: [
          'T = \\frac{R_0}{v\\sin(36^\\circ)}, \\qquad \\Delta\\vec{r}_{\\text{tanah}} = V_c T\\,\\hat{i} - R_0\\,\\hat{j}',
        ],
        spokenText: 'Waktu temu di air adalah R nol dibagi v sinus tiga puluh enam derajat, lalu perpindahan dijumlahkan secara vektor.',
      },
      {
        id: 's14-6',
        title: '6. Penurunan Persamaan',
        highlightType: 'kritis',
        paragraphs: ['Besar vektor perpindahan terhadap tanah memenuhi teorema Pythagoras:'],
        equations: ['b_{\\text{tanah}} = \\sqrt{R_0^2 + \\left(\\frac{V_c R_0}{v\\sin 36^\\circ}\\right)^2}'],
        spokenText: 'Besar perpindahan adalah akar dari R nol kuadrat ditambah kuadrat jarak hanyut V c kali T.',
      },
      {
        id: 's14-7',
        title: '7. Substitusi Angka',
        highlightType: 'none',
        paragraphs: ['Hitung dulu T dan V_c T:'],
        equations: [
          'T = \\frac{10{,}0}{5{,}0 \\times 0{,}587785} = 3{,}402603\\text{ s}',
          'V_c T = 4{,}0 \\times 3{,}402603 = 13{,}610413\\text{ m}',
        ],
        spokenText: 'Diperoleh waktu tiga koma empat nol detik dan hanyutan ke timur tiga belas koma enam satu meter.',
      },
      {
        id: 's14-8',
        title: '8. Perhitungan Matematis',
        highlightType: 'none',
        paragraphs: ['Masukkan ke dalam akar Pythagoras:'],
        equations: ['b_{\\text{tanah}} = \\sqrt{10{,}0^2 + 13{,}610413^2} = \\sqrt{100 + 185{,}24334} = \\sqrt{285{,}24334} = 16{,}8891...\\text{ m}'],
        spokenText: 'Akar dari dua ratus delapan puluh lima koma dua empat adalah enam belas koma delapan sembilan meter.',
      },
      {
        id: 's14-9',
        title: '9. Hasil Akhir',
        highlightType: 'hasil',
        paragraphs: ['Dibulatkan satu angka desimal:'],
        equations: ['b_{\\text{tanah}} = 16{,}9\\text{ m}'],
        spokenText: 'Hasil akhirnya adalah enam belas koma sembilan meter.',
      },
      {
        id: 's14-10',
        title: '10. Interpretasi Fisis',
        highlightType: 'none',
        paragraphs: [
          'Meski lima perahu menempuh jarak spiral rumit terhadap tanah, perpindahan netto Perahu 1 ternyata sangat mudah dihitung berkat pemilihan kerangka acuan bergerak (kerangka sungai).',
        ],
        spokenText:
          'Pemilihan kerangka acuan yang bergerak bersama air membuat persoalan lintasan rumit menjadi sederhana.',
      },
      {
        id: 's14-11',
        title: '11. Strategi Cepat Olimpiade',
        highlightType: 'none',
        paragraphs: [
          'Setiap kali ada medan kecepatan konstan seragam (arus atau angin), selalu pindah ke kerangka medium dulu untuk mencari T, baru tambahkan vektor hanyutan V_c T di akhir!',
        ],
        spokenText: 'Selalu selesaikan waktu pertemuan di kerangka medium terlebih dahulu.',
      },
      {
        id: 's14-12',
        title: '12. Kesalahan yang Harus Dihindari',
        highlightType: 'none',
        paragraphs: [
          'Jangan mengira arus mendistorsi bentuk segilima atau mengubah waktu bertemu. Juga jangan menjumlahkan jarak hanyut secara skalar tanpa memperhatikan arah utara-selatan dan timur-barat.',
        ],
        spokenText:
          'Jangan menjumlahkan secara skalar, karena perpindahan terhadap air mengarah ke selatan sementara hanyutan ke timur.',
      },
    ],
  },

  // SOAL 15
  {
    id: 15,
    shortTitle: 'Pengejaran Diagonal Pentagram & Percepatan Sentripetal',
    tier: 'Tingkat 5 · Olimpiade Kompleks',
    tierIndex: 5,
    subtopic: 'Simetri Pentagram (i → i+2) & Percepatan Spiral',
    stimulusType: 'Diagram Bintang Segilima (Pentagram) & Vektor Diagonal',
    questionText:
      'Lima partikel identik berada pada titik-titik sudut sebuah segilima beraturan dengan jari-jari lingkaran luar R₀ = 10,0 m. Berbeda dengan kasus standar, setiap partikel bergerak dengan laju konstan v = 6,0 m/s dengan arah vektor kecepatan selalu menuju partikel kedua di sebelahnya (melompati satu partikel, searah lintasan diagonal segilima secara siklik) hingga kelimanya bertemu di pusat. Tepat ketika jarak tempuh masing-masing partikel telah mencapai setengah dari jarak tempuh totalnya, berapakah besar percepatan sentripetal partikel pada saat tersebut (dalam m/s²)?',
    knownData: [
      { symbol: 'N', label: 'Jumlah partikel (segilima)', valueWithUnit: '5 partikel' },
      { symbol: 'k', label: 'Indeks kejar diagonal', valueWithUnit: 'partikel i+2 (lompat 1)' },
      { symbol: 'R₀', label: 'Jari-jari luar awal', valueWithUnit: '10,0 m' },
      { symbol: 'v', label: 'Kelajuan konstan', valueWithUnit: '6,0 m/s' },
      { symbol: 's_path/a', label: 'Fraksi jarak tempuh', valueWithUnit: '1/2 jarak total' },
    ],
    askedQuantity: { symbol: 'a_n', label: 'Besar percepatan sentripetal saat itu', unit: 'm/s²' },
    answerUnitLabel: 'm/s²',
    exactValue: (6.0 * 6.0 * Math.sin(18 * DEG)) / 5.0,
    expectedFormatted: '2,2',
    tolerance: 0.05,
    hints: [
      'Meskipun melompati satu partikel (i mengejar i+2), simetri putar orde-5 tetap berlaku! Kelima partikel tetap membentuk segilima beraturan setiap saat.',
      'Sudut pusat antara partikel i dan i+2 adalah 2 × 72° = 144°. Jadi sudut antara diagonal P_i P_{i+2} dengan garis radial menuju pusat adalah γ = (180° - 144°)/2 = 18°.',
      'Karena v_r = v cos(18°) konstan, ketika jarak tempuh mencapai 1/2 dari total, jari-jari R tepat menjadi R₀/2 = 5,0 m. Kemudian hitung a_n = v² sin(18°) / R!',
    ],
    conceptualFeedbackOnWrong:
      'Cek kembali sudut diagonal pentagram: sudut pusat untuk lompat satu titik adalah 144°, sehingga sudut antara arah kecepatan dan garis radial menuju pusat adalah 18° (bukan 54°!). Komponen tangensialnya v sin(18°) dan radialnya v cos(18°).',
    conceptualFeedbackOnRight:
      'Luar biasa! Anda menaklukkan soal puncak Olimpiade ini dengan sempurna: sudut pentagram 18°, R = R₀/2 = 5,0 m pada setengah jarak tempuh, dan percepatan sentripetal a_n = v² sin(18°)/R ≈ 2,2 m/s².',
    simulation: {
      kind: 'polygon-pursuit',
      n: 5,
      R0: 10.0,
      v0: 6.0,
      stepSkip: 2,
      tiltDeg: 0,
      clockwise: false,
      highlightTargetFraction: 0.5,
    },
    fbd: {
      objectName: 'Partikel pada Lintasan Diagonal Pentagram (i → i+2)',
      frameDescription: 'Penguraian vektor kecepatan di sepanjang diagonal (18° dari garis radial) dan percepatan sentripetal.',
      hasRealForce: false,
      referenceAngleDeg: 90,
      vectors: [
        {
          id: 'axis-r',
          label: 'e_r (radial ke O)',
          spokenLabel: 'arah radial menuju pusat',
          color: '#64748B',
          angleDeg: 270,
          lengthRatio: 0.85,
          category: 'axis',
          explanation: 'Sumbu radial saat R = 5,0 m.',
        },
        {
          id: 'v-total',
          label: 'v (sepanjang diagonal, 18°)',
          spokenLabel: 'vektor kecepatan sepanjang diagonal pentagram bersudut 18 derajat dari radial',
          color: '#7C3AED',
          angleDeg: 252,
          lengthRatio: 0.92,
          category: 'velocity',
          explanation: 'Mengikuti partikel i+2 membuat vektor sangat tajam ke arah pusat (18° dari radial).',
        },
        {
          id: 'v-r',
          label: 'v_r = v cos(18°)',
          spokenLabel: 'komponen radial sangat besar v kosinus 18 derajat',
          color: '#059669',
          angleDeg: 270,
          lengthRatio: 0.87,
          category: 'component',
          explanation: '95,1% laju mengarah ke pusat sehingga penyusutan R berlangsung sangat cepat.',
        },
        {
          id: 'v-theta',
          label: 'v_θ = v sin(18°)',
          spokenLabel: 'komponen tangensial kecil v sinus 18 derajat',
          color: '#0284C7',
          angleDeg: 180,
          lengthRatio: 0.32,
          category: 'component',
          explanation: 'Menentukan kecepatan sudut ω = v sin(18°)/R.',
        },
        {
          id: 'a-normal',
          label: 'a_n = v² sin(18°)/R',
          spokenLabel: 'vektor percepatan sentripetal tegak lurus vektor kecepatan',
          color: '#DC2626',
          angleDeg: 342,
          lengthRatio: 0.65,
          category: 'acceleration',
          explanation: 'Tegak lurus v dengan besar 2,2 m/s² pada R = 5,0 m.',
        },
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Geometri Bintang Segilima (Pentagram)',
          description: 'Sudut pusat ke partikel i+2 adalah 144°, sehingga sudut diagonal ke pusat adalah γ = 18°.',
          visibleVectorIds: ['axis-r'],
          equationLatex: '\\gamma = \\frac{180^\\circ - 2(72^\\circ)}{2} = 18^\\circ',
        },
        {
          stepNumber: 2,
          title: 'Komponen Radial & Tangensial Pentagram',
          description: 'v_r = v cos(18°) konstan, sehingga pada setengah jarak tempuh total berlaku R = R₀/2 = 5,0 m.',
          visibleVectorIds: ['axis-r', 'v-total', 'v-r', 'v-theta'],
          equationLatex: 'v_r = v\\cos 18^\\circ, \\quad v_\\theta = v\\sin 18^\\circ \\implies R = 5{,}0\\text{ m}',
        },
        {
          stepNumber: 3,
          title: 'Kecepatan Sudut & Percepatan Sentripetal',
          description: 'Laju rotasi segilima ω = v_θ / R menyebabkan arah v berputar dengan laju yang sama.',
          visibleVectorIds: ['v-total', 'v-theta', 'a-normal'],
          equationLatex: '\\omega = \\frac{v\\sin 18^\\circ}{R}, \\qquad a_n = v\\,\\omega = \\frac{v^2\\sin 18^\\circ}{R}',
        },
        {
          stepNumber: 4,
          title: 'Perhitungan Akhir pada R = 5,0 m',
          description: 'Dengan v = 6,0 m/s dan sin(18°) = (√5 - 1)/4, diperoleh a_n = 2,2 m/s².',
          visibleVectorIds: ['v-total', 'a-normal'],
          equationLatex: 'a_n = \\frac{36{,}0 \\times 0{,}309017}{5{,}0} \\approx 2{,}2\\text{ m/s}^2',
        },
      ],
    },
    problemSpokenText:
      'Soal nomor 15. Lima partikel pada sudut segilima beraturan berjari-jari sepuluh meter bergerak dengan laju konstan enam meter per detik, selalu mengarah ke partikel kedua di sebelahnya melompati satu partikel. Saat jarak tempuh mencapai setengah jarak tempuh totalnya, berapakah percepatan sentripetal partikel dalam meter per detik kuadrat?',
    solutionSections: [
      {
        id: 's15-1',
        title: '1. Memahami Permasalahan',
        highlightType: 'none',
        paragraphs: [
          'Kelima partikel memulai di sudut segilima R₀ = 10,0 m, tetapi partikel i selalu mengejar partikel i+2 (sepanjang diagonal bintang/pentagram) dengan laju konstan v = 6,0 m/s.',
          'Kita harus menentukan percepatan sentripetal pada momen ketika jarak tempuh partikel mencapai ½ jarak tempuh total menuju pusat.',
        ],
        spokenText:
          'Partikel saling mengejar di sepanjang diagonal pentagram. Kita mencari percepatan sentripetal pada setengah jarak tempuh total.',
      },
      {
        id: 's15-2',
        title: '2. Identifikasi Konsep Fisika',
        highlightType: 'prinsip',
        paragraphs: [
          'Pemetaan i → i+2 pada N = 5 tetap mempertahankan simetri putar orde-5! Kedua, karena v dan sudut radial γ konstan, R(t) berkurang secara linear terhadap jarak tempuh s_path(t) = v t.',
        ],
        spokenText:
          'Pengejaran melompati satu partikel tetap mempertahankan simetri segilima beraturan dan kelinieran penyusutan jari-jari terhadap jarak tempuh.',
      },
      {
        id: 's15-3',
        title: '3. Visualisasi Fenomena',
        highlightType: 'none',
        paragraphs: [
          'Pada simulasi terlihat lintasan pentagram melesat jauh lebih lurus dan cepat ke pusat dibandingkan pengejaran sisi standar, dengan kelengkungan yang jauh lebih kecil.',
        ],
        spokenText:
          'Simulasi memperlihatkan partikel menukik lebih tajam ke arah pusat dengan putaran yang lebih sedikit.',
      },
      {
        id: 's15-4',
        title: '4. Diagram Vektor Kinematika',
        highlightType: 'none',
        paragraphs: [
          'Dalam segitiga sama kaki OP_i P_{i+2}, sudut pusatnya adalah 2 × 72° = 144°, maka sudut di titik sudut adalah γ = (180° - 144°)/2 = 18°.',
        ],
        spokenText: 'Sudut antara vektor kecepatan di diagonal dan garis radial adalah delapan belas derajat.',
      },
      {
        id: 's15-5',
        title: '5. Menentukan Persamaan Dasar',
        highlightType: 'rumus',
        paragraphs: ['Komponen kecepatan radial, tangensial, dan percepatan sentripetal:'],
        equations: [
          'v_r = -\\frac{dR}{dt} = v\\cos(18^\\circ), \\qquad v_\\theta = v\\sin(18^\\circ), \\qquad a_n = \\frac{v^2\\sin(18^\\circ)}{R}',
        ],
        spokenText: 'V radial adalah v kosinus delapan belas derajat, dan percepatan sentripetal adalah v kuadrat sinus delapan belas derajat dibagi R.',
      },
      {
        id: 's15-6',
        title: '6. Penurunan Persamaan',
        highlightType: 'kritis',
        paragraphs: [
          'Dari -dR/d(s_path) = -(dR/dt)/(v) = cos(18°) yang konstan, jarak tempuh penuh a = R₀ / cos(18°). Maka saat s_path = a/2, jari-jari R adalah:',
        ],
        equations: [
          'R = R_0 - \\frac{a}{2}\\cos(18^\\circ) = R_0 - \\frac{R_0}{2} = \\frac{R_0}{2}',
          'a_n = \\frac{v^2\\sin(18^\\circ)}{R_0 / 2} = \\frac{2 v^2 \\sin(18^\\circ)}{R_0}',
        ],
        spokenText: 'Pada setengah jarak tempuh, jari-jari R tepat menjadi setengah R nol, yaitu lima meter.',
      },
      {
        id: 's15-7',
        title: '7. Substitusi Angka',
        highlightType: 'none',
        paragraphs: ['Masukkan R₀ = 10,0 m (R = 5,0 m), v = 6,0 m/s, dan sin(18°) = (√5 - 1)/4 ≈ 0,309017:'],
        equations: ['a_n = \\frac{6{,}0^2 \\times 0{,}309017}{5{,}0}'],
        spokenText: 'Substitusikan v enam, R lima, dan sinus delapan belas derajat nol koma tiga nol sembilan.',
      },
      {
        id: 's15-8',
        title: '8. Perhitungan Matematis',
        highlightType: 'none',
        paragraphs: ['Hitung 36 / 5 = 7,2 lalu kalikan dengan sin(18°):'],
        equations: ['a_n = 7{,}2 \\times 0{,}30901699 = 2{,}22492...\\text{ m/s}^2'],
        spokenText: 'Tujuh koma dua dikali nol koma tiga nol sembilan sama dengan dua koma dua dua lima meter per detik kuadrat.',
      },
      {
        id: 's15-9',
        title: '9. Hasil Akhir',
        highlightType: 'hasil',
        paragraphs: ['Dibulatkan satu angka desimal:'],
        equations: ['a_n = 2{,}2\\text{ m/s}^2'],
        spokenText: 'Hasil akhirnya adalah dua koma dua meter per detik kuadrat.',
      },
      {
        id: 's15-10',
        title: '10. Interpretasi Fisis',
        highlightType: 'none',
        paragraphs: [
          'Karena lintasan pentagram hanya berbelok tipis (γ = 18°), percepatan sentripetalnya jauh lebih kecil dibandingkan kasus standar pada R = 5,0 m dan v = 6,0 m/s yang mencapai 5,8 m/s².',
        ],
        spokenText:
          'Lintasan pentagram lebih mendekati garis lurus ke pusat sehingga percepatan sentripetalnya relatif kecil.',
      },
      {
        id: 's15-11',
        title: '11. Strategi Cepat Olimpiade',
        highlightType: 'none',
        paragraphs: [
          'Untuk pengejaran lompat-k pada segi-N (i → i+k), rumus umum sudut ke pusat langsung γ = π/2 - kπ/N. Untuk N=5, k=2: γ = 90° - 72° = 18°. Lalu R selalu sebanding terbalik linear dengan jarak tempuh!',
        ],
        spokenText:
          'Untuk pengejaran lompat k pada segi N, sudut ke pusat adalah sembilan puluh derajat dikurangi k kali seratus delapan puluh per N.',
      },
      {
        id: 's15-12',
        title: '12. Kesalahan yang Harus Dihindari',
        highlightType: 'none',
        paragraphs: [
          'Jangan tertukar antara sin(18°) untuk komponen tangensial (yang masuk ke ω dan a_n) dengan cos(18°) untuk komponen radial! Selain itu, pastikan memahami bahwa setengah jarak tempuh = setengah R₀.',
        ],
        spokenText:
          'Pastikan tidak menukar sinus delapan belas derajat untuk komponen tangensial dengan kosinus delapan belas derajat untuk komponen radial.',
      },
    ],
  },
];
