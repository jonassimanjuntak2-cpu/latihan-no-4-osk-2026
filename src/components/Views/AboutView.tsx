export function AboutView() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <div className="text-xs font-semibold text-[#6D28D9]">
          Arsitektur Pedagogis &amp; Ketelitian Ilmiah
        </div>
        <h2 className="text-2xl font-bold text-[#1E1433] mt-1">
          Tentang Olympiad Physics Lab
        </h2>
        <p className="text-sm text-[#5B4D7A] mt-1">
          Master the Concept. Understand the Physics. Conquer the Olympiad.
        </p>
      </div>

      <div className="rounded-2xl border border-[#E4DDF7] bg-white p-6 space-y-4">
        <h3 className="text-base font-bold text-[#1E1433]">
          Fokus Pengembangan Khusus: Soal Nomor 4 OSK Fisika SMA 2026
        </h3>
        <p className="text-sm leading-relaxed text-[#473B66]">
          Aplikasi ini dirancang secara khusus untuk membedah satu topik kunci olimpiade yang berasal dari Soal Nomor 4 naskah OSK Fisika SMA 2026 — yaitu kinematika gerak saling mengejar pada poligon beraturan (mutual pursuit kinematics). Seluruh 15 soal latihan dikembangkan bertingkat dari penguatan konsep dasar, variasi jumlah sisi dan parameter, variasi sudut kejar &amp; kurva dua partikel, kombinasi percepatan sentripetal dan Hukum II Newton, hingga pemodelan tingkat mahir seperti gerak dipercepat tangensial, transformasi kerangka acuan sungai berarus, dan simetri diagonal pentagram.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-[#E4DDF7] bg-white p-5 space-y-2">
          <h4 className="text-sm font-bold text-[#1E1433]">
            Aturan Penulisan Jawaban Numerik
          </h4>
          <ul className="text-xs leading-relaxed text-[#473B66] space-y-1.5 list-disc pl-4">
            <li>Seluruh 15 soal berbentuk isian singkat numerik objektif.</li>
            <li>Hasil akhir wajib ditulis dengan tepat satu angka di belakang koma menggunakan tanda koma (contoh: 1,7 atau 12,0).</li>
            <li>Jangan gunakan tanda titik sebagai pemisah desimal dan jangan menuliskan satuan di dalam kolom input.</li>
            <li>Perhitungan internal menggunakan presisi penuh dan hanya dibulatkan pada tahap akhir.</li>
          </ul>
        </div>

        <div className="rounded-xl border border-[#E4DDF7] bg-white p-5 space-y-2">
          <h4 className="text-sm font-bold text-[#1E1433]">
            Bimbingan Audio oleh Mister Jo (Web Speech API)
          </h4>
          <ul className="text-xs leading-relaxed text-[#473B66] space-y-1.5 list-disc pl-4">
            <li>Mister Jo membacakan teori, soal, diagram vektor/FBD, dan 12 tahap pembahasan buku teks dengan intonasi pengajar olimpiade.</li>
            <li>Simbol matematika diterjemahkan ke pelafalan fisika yang benar (misalnya ΣF dibaca resultan gaya sigma F, Δv dibaca perubahan kecepatan delta v).</li>
            <li>Teks dan bagian yang sedang dijelaskan disorot secara sinkron selama pemutaran berlangsung.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
