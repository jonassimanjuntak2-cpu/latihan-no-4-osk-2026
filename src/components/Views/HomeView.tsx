import {
  ArrowRight,
  BookOpen,
  Compass,
  Layers,
  PlayCircle,
  Target,
  Volume2,
} from 'lucide-react';
import { MenuViewId, UserProgressState } from '../../types/physics';
import { ALL_PROBLEMS } from '../../data/problems';
import { summarizeProgress } from '../../utils/answerChecker';
import { StimulusDiagram } from '../StimulusDiagram';

interface HomeViewProps {
  progress: UserProgressState;
  onNavigate: (view: MenuViewId, problemId?: number) => void;
  onSpeakIntro: () => void;
}

export function HomeView({
  progress,
  onNavigate,
  onSpeakIntro,
}: HomeViewProps) {
  const summary = summarizeProgress(ALL_PROBLEMS, progress.attempts);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="rounded-2xl border border-[#E4DDF7] bg-white p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#6D28D9] font-semibold">
                <span>OSN Fisika SMA Tingkat Kabupaten/Kota</span>
                <span aria-hidden="true">·</span>
                <span>Pengembangan Khusus Soal Nomor 4</span>
                <span aria-hidden="true">·</span>
                <span>Pengajar: Mister Jo</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#1E1433] text-balance leading-tight">
                OLYMPIAD PHYSICS LAB
              </h1>
              <p className="text-base md:text-lg font-medium text-[#5B21B6]">
                Master the Concept. Understand the Physics. Conquer the Olympiad.
              </p>
              <p className="text-sm md:text-[15px] leading-relaxed text-[#473B66] max-w-2xl">
                Platform pembelajaran interaktif untuk menguasai kinematika kurva kejar-kejaran
                simetris (Soal Nomor 4 OSK Fisika 2026) secara bertahap — mulai dari intuisi
                vektor paling dasar, penurunan persamaan eksak, animasi pembuktian fisika real-time,
                Free Body Diagram bertahap, hingga 15 soal isian numerik berjenjang.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => onNavigate('latihan', progress.lastVisitedProblemId || 1)}
                className="inline-flex items-center gap-2 rounded-xl bg-[#6D28D9] px-5 py-3 text-sm font-semibold text-white hover:bg-[#5B21B6] transition-colors whitespace-nowrap cursor-pointer"
              >
                <span>Mulai Latihan 15 Soal</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('teori')}
                className="inline-flex items-center gap-2 rounded-xl border border-[#D8CEF4] bg-[#F5F2FF] px-4 py-3 text-sm font-semibold text-[#4C1D95] hover:bg-[#EBE5FF] transition-colors whitespace-nowrap cursor-pointer"
              >
                <BookOpen className="h-4 w-4" />
                <span>Pelajari Teori 5 Level</span>
              </button>

              <button
                type="button"
                onClick={onSpeakIntro}
                className="inline-flex items-center gap-2 rounded-xl border border-[#E4DDF7] bg-white px-4 py-3 text-sm font-semibold text-[#4C1D95] hover:bg-[#FAF9FF] transition-colors whitespace-nowrap cursor-pointer"
              >
                <Volume2 className="h-4 w-4 text-[#6D28D9]" />
                <span>Dengarkan Mister Jo</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-center">
            <StimulusDiagram
              config={ALL_PROBLEMS[0].simulation}
              title="Fenomena Acuan: 5 Partikel Saling Mengejar pada Segilima Beraturan"
            />
          </div>
        </div>
      </section>

      {/* Progress KPI Strip */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-[#E4DDF7] bg-white p-4">
          <div className="text-xs text-[#6B5B95]">Progres Latihan</div>
          <div className="mt-1 text-2xl font-bold font-mono text-[#1E1433] tabular-nums">
            {summary.attemptedCount} / {summary.totalProblems}
          </div>
          <div className="mt-1 text-xs text-[#5B4D7A]">Soal telah dikerjakan</div>
        </div>

        <div className="rounded-xl border border-[#E4DDF7] bg-white p-4">
          <div className="text-xs text-[#6B5B95]">Akurasi Jawaban</div>
          <div className="mt-1 text-2xl font-bold font-mono text-[#6D28D9] tabular-nums">
            {summary.successRatePercent}%
          </div>
          <div className="mt-1 text-xs text-[#5B4D7A]">
            {summary.correctCount} jawaban benar
          </div>
        </div>

        <div className="rounded-xl border border-[#E4DDF7] bg-white p-4">
          <div className="text-xs text-[#6B5B95]">Penguasaan Teori</div>
          <div className="mt-1 text-2xl font-bold font-mono text-[#1E1433] tabular-nums">
            {progress.completedTheoryLevels.length} / 5
          </div>
          <div className="mt-1 text-xs text-[#5B4D7A]">Level teori diselesaikan</div>
        </div>

        <div className="rounded-xl border border-[#E4DDF7] bg-white p-4">
          <div className="text-xs text-[#6B5B95]">Status Penguasaan</div>
          <div className="mt-1 text-sm font-bold text-[#4C1D95] leading-snug">
            {summary.masteryLabel}
          </div>
          <div className="mt-1 text-xs text-[#5B4D7A]">
            Format numerik: koma desimal
          </div>
        </div>
      </section>

      {/* Structured Learning Pathway */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-[#1E1433]">
            Alur Belajar Sistematis Olympiad Physics Lab
          </h2>
          <p className="text-sm text-[#5B4D7A] mt-0.5">
            Dirancang agar murid yang belum mengenal konsep dasar dapat membangun penalaran hingga siap menghadapi soal olimpiade kompleks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            type="button"
            onClick={() => onNavigate('analisis')}
            className="text-left rounded-xl border border-[#E4DDF7] bg-white p-5 hover:border-[#7C3AED] transition-colors cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-[#6D28D9]">
                <span>01. Bedah Soal Sumber</span>
                <Compass className="h-4 w-4" />
              </div>
              <h3 className="mt-2 text-base font-bold text-[#1E1433]">
                Analisis Soal Nomor 4
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-[#5B4D7A]">
                Identifikasi 10 aspek fisis &amp; matematis dari soal segilima beraturan OSK 2026 sebelum berlatih.
              </p>
            </div>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#6D28D9]">
              Buka Analisis <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('teori')}
            className="text-left rounded-xl border border-[#E4DDF7] bg-white p-5 hover:border-[#7C3AED] transition-colors cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-[#6D28D9]">
                <span>02. Kurikulum Mini</span>
                <BookOpen className="h-4 w-4" />
              </div>
              <h3 className="mt-2 text-base font-bold text-[#1E1433]">
                Pusat Belajar Teori
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-[#5B4D7A]">
                5 level materi bertahap dari pengertian awal, penurunan rumus, analisis dimensi, hingga pemodelan mahir.
              </p>
            </div>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#6D28D9]">
              Pelajari 5 Level <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('galeri')}
            className="text-left rounded-xl border border-[#E4DDF7] bg-white p-5 hover:border-[#7C3AED] transition-colors cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-[#6D28D9]">
                <span>03. Eksperimen Virtual</span>
                <PlayCircle className="h-4 w-4" />
              </div>
              <h3 className="mt-2 text-base font-bold text-[#1E1433]">
                Galeri Animasi &amp; FBD Lab
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-[#5B4D7A]">
                Uji variasi jumlah partikel N, sudut kejar, percepatan tangensial, serta penguraian gaya bertahap.
              </p>
            </div>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#6D28D9]">
              Eksplorasi Simulasi <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('latihan', 1)}
            className="text-left rounded-xl border border-[#E4DDF7] bg-white p-5 hover:border-[#7C3AED] transition-colors cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-[#6D28D9]">
                <span>04. Evaluasi Mandiri</span>
                <Target className="h-4 w-4" />
              </div>
              <h3 className="mt-2 text-base font-bold text-[#1E1433]">
                Latihan 15 Soal
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-[#5B4D7A]">
                15 soal isian numerik 1 desimal koma, lengkap dengan petunjuk, animasi pembuktian, dan pembahasan 12 langkah.
              </p>
            </div>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#6D28D9]">
              Buka 15 Soal <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </button>
        </div>
      </section>

      {/* Quick jump to FBD Lab */}
      <section className="rounded-xl border border-[#E4DDF7] bg-[#F5F2FF] p-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-[#4C1D95] p-2.5 text-white shrink-0">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#1E1433]">
              Butuh Memahami Arah Vektor Sebelum Menghitung?
            </h3>
            <p className="text-xs text-[#473B66] mt-0.5 max-w-2xl">
              Buka Free Body Diagram Lab untuk melihat kemunculan vektor kecepatan, komponen radial-tangensial, dan resultan gaya sentripetal satu per satu bersama narasi Mister Jo.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('fbd-lab')}
          className="rounded-lg bg-white border border-[#D8CEF4] px-4 py-2 text-xs font-semibold text-[#4C1D95] hover:bg-[#EBE5FF] transition-colors whitespace-nowrap cursor-pointer"
        >
          Buka Free Body Diagram Lab
        </button>
      </section>
    </div>
  );
}
