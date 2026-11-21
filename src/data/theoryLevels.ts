import { TheoryLevel } from '../types/physics';

export const THEORY_LEVELS: TheoryLevel[] = [
  {
    level: 1,
    code: 'LEVEL 1',
    title: 'Pengetahuan Awal: Jarak, Perpindahan & Vektor Gerak',
    subtitle: 'Memahami fenomena saling mengejar dalam kehidupan nyata dan besaran dasar kinematika.',
    summary:
      'Sebelum menganalisis segilima beraturan, murid harus membedakan dengan tegas antara jarak tempuh (panjang lintasan melengkung) dan perpindahan (jarak garis lurus dari posisi awal ke posisi akhir), serta memahami makna arah vektor kecepatan.',
    keyTakeaways: [
      'Jarak tempuh (a) adalah besaran skalar berupa panjang total lintasan melengkung yang benar-benar dilalui partikel.',
      'Perpindahan (b) adalah besar vektor perubahan posisi lurus dari titik awal ke titik pertemuan akhir (b = R₀).',
      'Kelajuan konstan berarti besar vektor kecepatan tetap, tetapi arah vektor kecepatan dapat terus berubah sehingga timbul lintasan melengkung.',
    ],
    sections: [
      {
        heading: 'Fenomena Fisis dalam Kehidupan Nyata',
        body: [
          'Bayangkan lima ekor kunang-kunang atau lima drone otonom berada di sudut lapangan berbentuk segilima beraturan. Setiap drone diprogram untuk terbang dengan laju konstan sambil selalu mengarahkan hidungnya tepat ke drone di sebelahnya.',
          'Karena drone tetangga juga ikut berpindah posisi, arah terbang masing-masing drone terus berbelok ke arah dalam. Akibatnya, alih-alih bergerak lurus di sepanjang sisi segilima, kelima drone menempuh lintasan spiral yang melengkung menuju titik tengah lapangan dan akhirnya bertemu tepat di pusat.',
        ],
        callout: {
          label: 'Intuisi Kunci',
          text: 'Walaupun laju gerak tetap (misalnya 3 meter per detik), karena arah geraknya terus berubah mengikuti target yang bergerak, lintasan yang terbentuk bukan garis lurus melainkan kurva spiral.',
        },
      },
      {
        heading: 'Besaran, Simbol, dan Satuan SI yang Digunakan',
        body: [
          'Dalam persoalan gerak kejar-kejaran poligon, besaran-besaran pokok yang perlu dipahami meliputi: panjang sisi awal poligon s₀ (satuan meter, m), jari-jari lingkaran luar R₀ (satuan meter, m), laju konstan partikel v (satuan m/s), waktu bertemu T (satuan sekon, s), jarak tempuh total a (satuan meter, m), dan besar perpindahan b (satuan meter, m).',
          'Perbandingan a/b adalah besaran tak berdimensi (tidak memiliki satuan) karena merupakan hasil bagi dua besaran panjang.',
        ],
        equations: [
          {
            latex: 'a = \\int_0^T |\\vec{v}|\\,dt = v\\,T \\quad [\\text{m}], \\qquad b = |\\vec{r}_{\\text{akhir}} - \\vec{r}_{\\text{awal}}| = R_0 \\quad [\\text{m}]',
            caption: 'Hubungan dasar jarak tempuh a dan besar perpindahan b untuk laju konstan.',
          },
        ],
      },
    ],
    numericExample: {
      title: 'Contoh Pemula: Membandingkan Lintasan Persegi vs Garis Lurus',
      given: 'Empat semut berada di sudut sebuah persegi berjari-jari luar R₀ = 5,0 m (panjang sisi s₀ = 5√2 m ≈ 7,07 m). Jika semua semut menuju pusat secara lurus versus saling mengejar dengan laju v = 2,0 m/s:',
      steps: [
        'Jika semut berjalan lurus langsung ke pusat, jarak tempuhnya sama dengan perpindahannya, yaitu b = R₀ = 5,0 m.',
        'Namun jika semut saling mengejar menyusuri sisi yang ikut berputar, arah kecepatannya selalu miring 45° terhadap garis menuju pusat.',
        'Karena lintasan melengkung lebih panjang dari garis lurus, jarak tempuh a = R₀ / sin(45°) = 5,0 × √2 ≈ 7,1 m, lebih besar daripada b = 5,0 m.',
      ],
      result: 'a ≈ 7,1 m dan b = 5,0 m (rasio a/b ≈ 1,4)',
    },
    simulationPreset: {
      kind: 'polygon-pursuit',
      n: 4,
      R0: 8,
      v0: 2.0,
      stepSkip: 1,
      tiltDeg: 0,
      clockwise: false,
    },
    spokenScript:
      'Selamat datang di Level 1 bersama Mister Jo. Mari kita pahami perbedaan mendasar antara jarak tempuh dan perpindahan. Ketika lima partikel diletakkan pada sudut segilima dan saling mengejar, setiap partikel selalu membelok mengikuti tetangganya. Akibatnya lintasan partikel berupa spiral menuju pusat. Panjang spiral itulah yang disebut jarak tempuh a, sedangkan jarak lurus dari titik sudut awal ke pusat segilima disebut besar perpindahan b.',
  },
  {
    level: 2,
    code: 'LEVEL 2',
    title: 'Pemahaman Konseptual: Simetri & Proyeksi Kecepatan',
    subtitle: 'Mengapa segilima tetap berbentuk segilima beraturan dan bagaimana kecepatan diuraikan.',
    summary:
      'Kunci menaklukkan soal olimpiade ini terletak pada prinsip simetri rotasional dan penguraian vektor kecepatan ke arah radial (menuju pusat) serta tangensial (memutar).',
    keyTakeaways: [
      'Prinsip Simetri Rotasi: setiap partikel mengalami kondisi awal dan aturan gerak yang identik sehingga pada setiap saat t, bentuk poligon tetap beraturan.',
      'Titik pusat massa sistem (pusat poligon O) diam stasioner dan menjadi titik temu semua partikel.',
      'Hanya komponen kecepatan radial v_r yang bertugas memperpendek jarak partikel ke pusat O.',
    ],
    sections: [
      {
        heading: 'Prinsip Simetri dan Invariansi Bentuk',
        body: [
          'Jika seluruh konfigurasi segilima diputar sebesar 72° (seperlima putaran penuh) mengelilingi pusat O, susunan partikel dan arah vektor kecepatannya kembali persis sama seperti semula.',
          'Karena hukum kinematika tidak berubah oleh rotasi tersebut, selama gerakan berlangsung tidak ada satu partikel pun yang boleh mendahului atau tertinggal secara bentuk. Poligon hanya mengalami dua hal secara serentak: menyusut ukurannya (skala R mengecil) dan berputar mengelilingi pusat O.',
        ],
      },
      {
        heading: 'Asumsi, Batasan Model, dan Hubungan Sebab-Akibat',
        body: [
          'Persamaan simetri ini berlaku dengan syarat: (1) ukuran partikel diabaikan sebagai titik, (2) besar kecepatan semua partikel sama persis pada setiap saat, (3) perubahan arah terjadi seketika tanpa hambatan medium.',
          'Secara sebab-akibat: semakin banyak jumlah sisi poligon N, sudut antara arah gerak dan garis pusat semakin mendekati 90°. Akibatnya komponen kecepatan menuju pusat semakin kecil, sehingga partikel harus berputar lebih banyak kali dan jarak tempuh a menjadi jauh lebih besar daripada perpindahan b.',
        ],
        equations: [
          {
            latex: '\\alpha = \\frac{\\pi}{2} - \\frac{\\pi}{N}, \\qquad v_r = v\\cos\\alpha = v\\sin\\left(\\frac{\\pi}{N}\\right)',
            caption: 'Sudut antara sisi poligon dan jari-jari pusat serta komponen laju radial menuju pusat.',
          },
        ],
      },
    ],
    numericExample: {
      title: 'Contoh Konseptual: Pengaruh Jumlah Sisi N terhadap Laju Mendekat ke Pusat',
      given: 'Bandingkan segitiga sama sisi (N = 3) dan segienam beraturan (N = 6) dengan kelajuan partikel sama-sama v = 4,0 m/s.',
      steps: [
        'Untuk N = 3: sudut π/3 = 60°, sehingga v_r = 4,0 × sin(60°) = 2√3 ≈ 3,46 m/s.',
        'Untuk N = 6: sudut π/6 = 30°, sehingga v_r = 4,0 × sin(30°) = 2,0 m/s.',
        'Terlihat bahwa pada segienam, komponen kecepatan menuju pusat jauh lebih kecil karena lintasan awalnya hampir tegak lurus garis jari-jari.',
      ],
      result: 'v_r(N=3) ≈ 3,5 m/s lebih cepat daripada v_r(N=6) = 2,0 m/s',
    },
    simulationPreset: {
      kind: 'polygon-pursuit',
      n: 5,
      R0: 10,
      v0: 2.5,
      stepSkip: 1,
      tiltDeg: 0,
      clockwise: false,
    },
    spokenScript:
      'Pada Level 2 ini, Mister Jo mengajak Anda melihat kekuatan simetri dalam Fisika. Karena kelima partikel memiliki kelajuan dan aturan yang identik pada segilima beraturan, bangun yang dibentuk partikel selalu tetap berupa segilima beraturan yang menyusut sambil berputar. Oleh sebab itu, vektor kecepatan dapat diuraikan menjadi komponen radial yang memperkecil jari-jari R dan komponen tangensial yang memutar sistem.',
  },
  {
    level: 3,
    code: 'LEVEL 3',
    title: 'Persamaan Matematis: Penurunan Eksak & Analisis Dimensi',
    subtitle: 'Penurunan sistematis melalui dua metode independen: Metode Radial dan Metode Sisi Relatif.',
    summary:
      'Menurunkan rumus waktu tempuh T, jarak tempuh a, rasio a/b, serta persamaan kurva spiral logaritmik r(θ) secara runtut beserta pemeriksaan dimensi SI.',
    keyTakeaways: [
      'Metode Radial Pusat: -dR/dt = v sin(π/N) langsung menghasilkan T = R₀ / [v sin(π/N)].',
      'Metode Kecepatan Relatif Sisi: -ds/dt = v(1 - cos(2π/N)) = 2v sin²(π/N) mengonfirmasi hasil yang identik.',
      'Persamaan lintasan berbentuk spiral logaritmik r(θ) = R₀ exp(-θ tan(π/N) / ... ) tepatnya r(θ) = R₀ exp(-θ tan(π/N))? Hati-hati: dr/(r dθ) = -tan(π/N)!',
    ],
    sections: [
      {
        heading: 'Penurunan Sistematis dari Prinsip Dasar',
        body: [
          'Tinjau segitiga sama kaki OP₁P₂ dengan pusat O dan dua titik sudut bersebelahan P₁ dan P₂. Sudut pusat ∠P₁OP₂ = 2π/N. Jumlah sudut segitiga adalah π, maka sudut di titik sudut P₁ adalah β = (π - 2π/N)/2 = π/2 - π/N.',
          'Karena vektor kecepatan v₁ selalu mengarah sepanjang garis P₁P₂, komponennya yang searah dengan garis radial menuju pusat P₁O adalah -dR/dt = v cos(β) = v sin(π/N).',
          'Karena v dan sin(π/N) konstan terhadap waktu, integrasi dari t = 0 (R = R₀ = b) hingga t = T (R = 0) menghasilkan T = b / [v sin(π/N)], sehingga jarak tempuh a = v T = b / sin(π/N).',
        ],
        equations: [
          {
            latex: '-\\frac{dR}{dt} = v\\sin\\left(\\frac{\\pi}{N}\\right) \\implies \\int_{R_0}^0 dR = -v\\sin\\left(\\frac{\\pi}{N}\\right)\\int_0^T dt \\implies \\frac{a}{b} = \\frac{1}{\\sin(\\pi/N)}',
            caption: 'Penurunan eksak perbandingan jarak tempuh a dan perpindahan b.',
          },
          {
            latex: 'r\\frac{d\\theta}{dt} = v\\cos\\left(\\frac{\\pi}{N}\\right), \\quad \\frac{dr}{dt} = -v\\sin\\left(\\frac{\\pi}{N}\\right) \\implies r(\\theta) = R_0\\,e^{-\\theta\\tan(\\pi/N)}',
            caption: 'Persamaan polar spiral logaritmik lintasan partikel.',
          },
        ],
      },
      {
        heading: 'Analisis Dimensi dan Konsistensi Satuan SI',
        body: [
          'Periksa dimensi persamaan waktu temu T = s₀ / [v (1 - cos(2π/N))]: pembilang s₀ berdimensi panjang [L] (meter), penyebut v berdimensi kecepatan [L][T]⁻¹ (m/s), dan faktor trigonometri tak berdimensi [1]. Maka [L] / ([L][T]⁻¹) = [T] (sekon).',
          'Untuk persamaan percepatan sentripetal sesaat a_n = v² cos(π/N) / R: pembilang v² berdimensi [L]²[T]⁻², penyebut R berdimensi [L], menghasilkan dimensi [L][T]⁻² (m/s²), konsisten secara fisika.',
        ],
        callout: {
          label: 'Verifikasi Dimensi',
          text: 'Selalu uji rasio tak berdimensi seperti a/b = 1 / sin(π/N). Kedua ruas tidak memiliki satuan, dan untuk kasus batas N → ∞ (lingkaran), sin(π/N) → 0 sehingga a/b → ∞ (partikel terus berputar mengelilingi lingkaran tanpa pernah masuk ke pusat).',
        },
      },
    ],
    numericExample: {
      title: 'Contoh Penurunan: Membuktikan Kesetaraan Metode Radial dan Metode Sisi untuk N = 5',
      given: 'Segilima beraturan memiliki R₀ = 10,0 m dan v = 2,0 m/s.',
      steps: [
        'Dari geometri segilima, panjang sisi s₀ = 2 R₀ sin(36°) = 20,0 × 0,587785 = 11,7557 m.',
        'Metode Radial: T = R₀ / (v sin 36°) = 10,0 / (2,0 × 0,587785) = 8,5065 s.',
        'Metode Sisi Relatif: laju pemendekan sisi adalah v(1 - cos 72°) = 2,0 × (1 - 0,309017) = 1,381966 m/s. Maka T = s₀ / 1,381966 = 11,7557 / 1,381966 = 8,5065 s.',
      ],
      result: 'Kedua metode menghasilkan T ≈ 8,5 s dan a/b ≈ 1,7 secara identik.',
    },
    simulationPreset: {
      kind: 'polygon-pursuit',
      n: 5,
      R0: 10,
      v0: 2.0,
      stepSkip: 1,
      tiltDeg: 0,
      clockwise: false,
    },
    spokenScript:
      'Di Level 3, kita menurunkan persamaan matematis secara eksak. Dari segitiga sama kaki antara pusat dan dua titik sudut bertetangga, laju berkurangnya jari-jari R terhadap waktu bernilai konstan, yaitu v dikali sinus pi per N. Akibatnya, perbandingan jarak tempuh a terhadap perpindahan b sama dengan satu dibagi sinus pi per N. Untuk segilima, sudutnya tiga puluh enam derajat, menghasilkan rasio sekitar satu koma tujuh.',
  },
  {
    level: 4,
    code: 'LEVEL 4',
    title: 'Penerapan Bertahap & Strategi Cepat Olimpiade',
    subtitle: 'Dari soal dasar hingga olimpiade, lengkap dengan trik proyeksi cepat dan jebakan umum.',
    summary:
      'Menerapkan konsep kejar-kejaran pada berbagai bentuk poligon, jarak henti tertentu, sudut kejar miring, serta mengenali kesalahan konseptual yang paling sering menjebak peserta OSK.',
    keyTakeaways: [
      'Strategi Cepat: Jangan pernah mengintegralkan panjang busur spiral! Selalu cari komponen kecepatan sepanjang arah radial atau sepanjang garis pisah antar partikel.',
      'Jebakan Umum 1: Mengira perpindahan b sama dengan panjang sisi poligon s₀. Ingat, b adalah jarak dari titik sudut awal ke titik pusat O (jari-jari luar R₀)!',
      'Jebakan Umum 2: Keliru memakai sudut dalam 108° sebagai sudut terhadap jari-jari; sudut terhadap garis ke pusat adalah setengah dari sudut dalam, yaitu 54° (atau komplemen 36°).',
    ],
    sections: [
      {
        heading: 'Tiga Tingkat Penerapan (Sederhana, Menengah, Olimpiade)',
        body: [
          'Tingkat Sederhana: Menghitung waktu temu pada segitiga sama sisi (N = 3) di mana laju pendekatan antar partikel adalah v - v cos(120°) = 1,5 v.',
          'Tingkat Menengah: Menghitung jarak tempuh ketika sistem berhenti sebelum mencapai pusat, misalnya saat jarak antar partikel tinggal s_f. Karena laju penyusutan sisi konstan, jarak tempuh cukup dihitung dari selisih s₀ - s_f dibagi (1 - cos(2π/N)).',
          'Tingkat Olimpiade: Menentukan percepatan sentripetal sesaat a_n = v² cos(π/N)/R saat ukuran poligon menyusut, atau menentukan waktu tangkap pada kurva kejar dua partikel dengan kelajuan berbeda (T = vL / (v² - u²)).',
        ],
      },
      {
        heading: 'Kesalahan Umum yang Harus Dihindari',
        body: [
          '1. Kesalahan Memahami Perpindahan: Pada segilima beraturan, panjang sisi s₀ = 2 b sin(36°) ≈ 1,176 b, bukan sama dengan b.',
          '2. Kesalahan Tanda Kosinus Sudut Luar: Pada segitiga sama sisi, sudut belok luar adalah 120°, dan cos(120°) = -0,5. Mengabaikan tanda negatif menyebabkan laju pendekatan salah dihitung menjadi 0,5 v padahal seharusnya 1,5 v.',
          '3. Kesalahan Pembulatan Dini: Membulatkan sin(36°) menjadi 0,59 di awal hitungan dapat menggeser hasil akhir. Simpan minimal 4–5 angka signifikan hingga langkah akhir.',
        ],
      },
    ],
    numericExample: {
      title: 'Contoh Olimpiade: Arah Kecepatan Membentuk Sudut Tambahan φ ke Dalam',
      given: 'Pada persegi berjari-jari luar R₀ = 10,0 m, setiap partikel bergerak dengan laju v = 2,0 m/s membentuk sudut 15° lebih condong ke pusat dibanding arah sisi persegi.',
      steps: [
        'Sudut normal sisi persegi terhadap garis menuju pusat adalah 45°.',
        'Karena condong 15° ke arah dalam, sudut antara vektor kecepatan dan garis menuju pusat menjadi α = 45° - 15° = 30°.',
        'Komponen radial menjadi v_r = v cos(30°) = 2,0 × (√3/2) = √3 m/s, sehingga waktu temu T = 10,0 / √3 ≈ 5,77 s → 5,8 s.',
      ],
      result: 'T = 5,8 s',
    },
    simulationPreset: {
      kind: 'polygon-pursuit',
      n: 4,
      R0: 10,
      v0: 2.0,
      stepSkip: 1,
      tiltDeg: 15,
      clockwise: false,
    },
    spokenScript:
      'Memasuki Level 4, Mister Jo akan membagikan strategi cepat olimpiade. Trik utamanya adalah jangan pernah mencoba menghitung panjang spiral secara langsung dengan integral. Cukup proyeksikan vektor kecepatan ke arah garis hubung pusat atau arah antar partikel. Hati-hati pula terhadap jebakan klasik: perpindahan b adalah jari-jari lingkaran luar R nol, bukan panjang sisi poligon.',
  },
  {
    level: 5,
    code: 'LEVEL 5',
    title: 'Pendalaman Tingkat Mahir: Dinamika, Akselerasi & Relativitas',
    subtitle: 'Pemodelan kompleks: percepatan tangensial, gaya sentripetal, gerak relatif arus, dan pentagram.',
    summary:
      'Menggabungkan kinematika kejar-kejaran dengan dinamika gaya sentral (Hukum II Newton), gerak dipercepat beraturan, transformasi Galilean pada kerangka bergerak, serta simetri diagonal bintang segilima (pentagram).',
    keyTakeaways: [
      'Percepatan sesaat pada laju konstan murni normal (sentripetal): a_n = v ω = v² cos(π/N) / R, membesar menuju tak hingga saat R → 0.',
      'Jika partikel dipercepat tangensial dv/dt = a_t dari diam, simetri bentuk poligon tetap terjaga dan R(t) = R₀ - ½ a_t t² sin(π/N).',
      'Jika seluruh sistem berada dalam arus seragam V_c, gerak relatif antar partikel tidak terganggu (waktu temu T tetap), namun perpindahan total di kerangka tanah merupakan penjumlahan vektor.',
    ],
    sections: [
      {
        heading: 'Dinamika Lintasan Melengkung dan Percepatan Tangensial',
        body: [
          'Meskipun laju partikel v konstan, arah kecepatannya terus berputar dengan laju sudut ω = v_θ / R = v cos(π/N) / R. Karena itu, partikel harus mengalami percepatan normal (sentripetal) sebesar a_n = v ω = v² cos(π/N) / R.',
          'Jika terdapat tali atau interaksi mekanis yang membelokkan partikel bermassa m, resultan gaya total yang bekerja adalah F = m a_n. Saat jari-jari R menyusut menjadi seperempatnya, gaya yang diperlukan meningkat empat kali lipat.',
        ],
        equations: [
          {
            latex: '\\omega(R) = \\frac{v\\cos(\\pi/N)}{R}, \\qquad a_n(R) = \\frac{v^2\\cos(\\pi/N)}{R}, \\qquad \\Delta\\theta = \\cot\\left(\\frac{\\pi}{N}\\right)\\ln\\left(\\frac{R_0}{R}\\right)',
            caption: 'Kecepatan sudut sesaat, percepatan sentripetal, dan total sudut putar spiral logaritmik.',
          },
        ],
      },
      {
        heading: 'Kasus Khusus Pentagram (Melompati Satu Tetangga) & Kerangka Arus',
        body: [
          'Pada segilima beraturan, jika partikel i tidak mengejar partikel i+1 melainkan mengejar partikel i+2 (sepanjang diagonal bintang segilima/pentagram), simetri putar orde-5 tetap berlaku! Sudut antara garis diagonal dan garis menuju pusat jauh lebih tajam, yaitu γ = 18°, sehingga partikel melesat lebih langsung ke pusat dengan v_r = v cos(18°).',
          'Sementara itu, jika lima perahu saling mengejar di sungai berarus seragam V_c, transformasi Galilean memastikan bahwa posisi relatif antar perahu hanya bergantung pada kecepatan terhadap air. Waktu temu T tetap sama, sedangkan posisi temu bergeser sejauh V_c T searah arus.',
        ],
      },
    ],
    numericExample: {
      title: 'Contoh Tingkat Mahir: Percepatan Sentripetal pada Pengejaran Diagonal Pentagram',
      given: 'Lima partikel di segilima R₀ = 10,0 m saling mengejar menuju partikel kedua di sebelahnya (i+2) dengan laju konstan v = 6,0 m/s.',
      steps: [
        'Sudut pusat antara partikel i dan i+2 adalah 2 × 72° = 144°, sehingga sudut diagonal terhadap garis jari-jari adalah γ = (180° - 144°)/2 = 18°.',
        'Saat jarak tempuh mencapai setengah dari jarak tempuh total, karena v_r = v cos(18°) konstan, jari-jari juga menyusut tepat setengahnya: R = 5,0 m.',
        'Percepatan sentripetal sesaat: a_n = v² sin(18°) / R = (36,0 × 0,309017) / 5,0 ≈ 2,22 m/s² → 2,2 m/s².',
      ],
      result: 'a_n = 2,2 m/s²',
    },
    simulationPreset: {
      kind: 'polygon-pursuit',
      n: 5,
      R0: 10,
      v0: 4.0,
      stepSkip: 2,
      tiltDeg: 0,
      clockwise: false,
    },
    spokenScript:
      'Selamat datang di Level 5, tahap pendalaman tingkat mahir bersama Mister Jo. Di sini kita memadukan kinematika kurva kejar dengan percepatan sentripetal, gaya dinamika, transformasi kerangka acuan arus sungai, hingga simetri pentagram ketika partikel mengejar partikel kedua di sebelahnya. Kuasai level ini, dan Anda siap menaklukkan seluruh lima belas soal latihan olimpiade.',
  },
];
