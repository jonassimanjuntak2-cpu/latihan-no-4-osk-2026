import { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertCircle, RotateCcw } from 'lucide-react';
import { ALL_PROBLEMS } from '../../data/problems';
import { THEORY_LEVELS } from '../../data/theoryLevels';
import { UserProgressState } from '../../types/physics';
import { summarizeProgress } from '../../utils/answerChecker';

interface ProgressViewProps {
  progress: UserProgressState;
  onOpenProblem: (id: number) => void;
  onResetProgress: () => void;
}

export function ProgressView({
  progress,
  onOpenProblem,
  onResetProgress,
}: ProgressViewProps) {
  const [confirmReset, setConfirmReset] = useState(false);
  const summary = summarizeProgress(ALL_PROBLEMS, progress.attempts);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-[#6D28D9]">
            Rekap Hasil Belajar Tersimpan Lokal
          </div>
          <h2 className="text-2xl font-bold text-[#1E1433] mt-1">
            Progres Belajar &amp; Penguasaan Konsep
          </h2>
          <p className="text-sm text-[#5B4D7A] mt-1">
            Seluruh pencapaian Anda disimpan otomatis di perangkat melalui localStorage.
          </p>
        </div>

        {!confirmReset ? (
          <button
            type="button"
            onClick={() => setConfirmReset(true)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#E4DDF7] bg-white px-4 py-2 text-xs font-semibold text-[#5B4D7A] hover:text-[#1E1433] cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset Progres
          </button>
        ) : (
          <div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs">
            <span className="font-semibold text-amber-900">
              Hapus semua riwayat?
            </span>
            <button
              type="button"
              onClick={() => {
                onResetProgress();
                setConfirmReset(false);
              }}
              className="rounded-lg bg-red-600 px-2.5 py-1 font-semibold text-white hover:bg-red-700 cursor-pointer"
            >
              Ya, Reset
            </button>
            <button
              type="button"
              onClick={() => setConfirmReset(false)}
              className="rounded-lg bg-white border border-slate-200 px-2.5 py-1 font-semibold text-slate-700 cursor-pointer"
            >
              Batal
            </button>
          </div>
        )}
      </div>

      {/* Main Metric Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="rounded-xl border border-[#E4DDF7] bg-white p-4">
          <div className="text-xs text-[#6B5B95]">Soal Dikerjakan</div>
          <div className="mt-1 text-2xl font-bold font-mono text-[#1E1433] tabular-nums">
            {summary.attemptedCount} / {summary.totalProblems}
          </div>
        </div>
        <div className="rounded-xl border border-[#E4DDF7] bg-white p-4">
          <div className="text-xs text-[#6B5B95]">Jawaban Benar</div>
          <div className="mt-1 text-2xl font-bold font-mono text-emerald-700 tabular-nums">
            {summary.correctCount}
          </div>
        </div>
        <div className="rounded-xl border border-[#E4DDF7] bg-white p-4">
          <div className="text-xs text-[#6B5B95]">Jawaban Salah</div>
          <div className="mt-1 text-2xl font-bold font-mono text-amber-700 tabular-nums">
            {summary.wrongCount}
          </div>
        </div>
        <div className="rounded-xl border border-[#E4DDF7] bg-white p-4">
          <div className="text-xs text-[#6B5B95]">Persentase Berhasil</div>
          <div className="mt-1 text-2xl font-bold font-mono text-[#6D28D9] tabular-nums">
            {summary.successRatePercent}%
          </div>
        </div>
        <div className="col-span-2 lg:col-span-1 rounded-xl border border-[#E4DDF7] bg-[#F5F2FF] p-4">
          <div className="text-xs text-[#4C1D95] font-semibold">
            Tingkat Penguasaan
          </div>
          <div className="mt-1 text-sm font-bold text-[#1E1433]">
            {summary.masteryLabel}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="rounded-xl border border-[#E4DDF7] bg-white p-5 space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-[#1E1433]">
            Capaian Penguasaan 15 Soal Olimpiade
          </span>
          <span className="font-mono text-[#6D28D9] tabular-nums">
            {summary.correctCount} dari 15 selesai benar ({summary.successRatePercent}%)
          </span>
        </div>
        <div className="h-3 w-full rounded-full bg-[#F3F0FF] overflow-hidden">
          <div
            className="h-full bg-[#6D28D9] transition-all duration-300"
            style={{ width: `${summary.successRatePercent}%` }}
          />
        </div>
      </div>

      {/* Recommendations & Theory Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-[#E4DDF7] bg-white p-5 space-y-3">
          <h3 className="text-sm font-bold text-[#1E1433]">
            Materi yang Perlu Dipelajari Kembali
          </h3>
          {summary.weakestTopics.length === 0 ? (
            <p className="text-xs leading-relaxed text-[#5B4D7A]">
              {summary.attemptedCount === 0
                ? 'Belum ada soal yang dikerjakan. Mulai dari Soal 1 atau pelajari Pusat Belajar Teori terlebih dahulu.'
                : 'Tidak ada topik yang tertinggal salah saat ini! Pertahankan ketelitian perhitungan Anda.'}
            </p>
          ) : (
            <ul className="space-y-2 text-xs text-[#2E1065] list-disc pl-4">
              {summary.weakestTopics.map((topic, idx) => (
                <li key={idx}>{topic}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-xl border border-[#E4DDF7] bg-white p-5 space-y-3">
          <h3 className="text-sm font-bold text-[#1E1433]">
            Progres Pusat Belajar Teori (5 Level)
          </h3>
          <div className="space-y-2">
            {THEORY_LEVELS.map((lv) => {
              const done = progress.completedTheoryLevels.includes(lv.level);
              return (
                <div
                  key={lv.level}
                  className="flex items-center justify-between text-xs py-1.5 border-b border-[#F3F0FF] last:border-0"
                >
                  <span className="text-[#1E1433] font-medium">
                    {lv.code}: {lv.title.replace(/^[^:]+:\s*/, '')}
                  </span>
                  <span
                    className={`font-semibold ${
                      done ? 'text-emerald-700' : 'text-slate-400'
                    }`}
                  >
                    {done ? 'Selesai' : 'Belum'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detailed 15-Problem Status Table */}
      <div className="rounded-xl border border-[#E4DDF7] bg-white overflow-hidden">
        <div className="px-5 py-4 border-b border-[#E4DDF7]">
          <h3 className="text-sm font-bold text-[#1E1433]">
            Rincian Status 15 Soal Latihan
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF9FF] text-[#5B4D7A] border-b border-[#E4DDF7]">
              <tr>
                <th className="py-2.5 px-4 font-semibold">No</th>
                <th className="py-2.5 px-4 font-semibold">Judul &amp; Submateri</th>
                <th className="py-2.5 px-4 font-semibold">Jawaban Terakhir</th>
                <th className="py-2.5 px-4 font-semibold">Status</th>
                <th className="py-2.5 px-4 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3F0FF]">
              {ALL_PROBLEMS.map((p) => {
                const rec = progress.attempts[p.id];
                return (
                  <tr key={p.id} className="hover:bg-[#FAF9FF]">
                    <td className="py-2.5 px-4 font-mono font-bold text-[#4C1D95] tabular-nums">
                      {String(p.id).padStart(2, '0')}
                    </td>
                    <td className="py-2.5 px-4">
                      <div className="font-semibold text-[#1E1433]">
                        {p.shortTitle}
                      </div>
                      <div className="text-[11px] text-[#6B5B95]">{p.tier}</div>
                    </td>
                    <td className="py-2.5 px-4 font-mono tabular-nums text-[#1E1433]">
                      {rec ? rec.lastInput : '—'}
                    </td>
                    <td className="py-2.5 px-4">
                      {!rec ? (
                        <span className="text-slate-500">Belum Dikerjakan</span>
                      ) : rec.isCorrect ? (
                        <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Benar
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 font-semibold text-amber-700">
                          <AlertCircle className="h-3.5 w-3.5" />
                          Perlu Diperbaiki
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => onOpenProblem(p.id)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#6D28D9] hover:underline cursor-pointer"
                      >
                        Buka <ArrowRight className="h-3 w-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
