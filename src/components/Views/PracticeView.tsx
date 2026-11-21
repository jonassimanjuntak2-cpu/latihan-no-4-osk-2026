import { useEffect, useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  HelpCircle,
  RotateCcw,
  Volume2,
} from 'lucide-react';
import { ALL_PROBLEMS } from '../../data/problems';
import { ProblemAttemptRecord, ProblemItem } from '../../types/physics';
import { AnswerCheckResult, checkNumericAnswer } from '../../utils/answerChecker';
import { SpeechSegment } from '../../utils/speechUtils';
import { FbdVisualizer } from '../FbdVisualizer';
import { MathBlock } from '../MathBlock';
import { PhysicsCanvas } from '../PhysicsCanvas';
import { StimulusDiagram } from '../StimulusDiagram';

interface PracticeViewProps {
  selectedProblemId: number | null;
  onSelectProblem: (id: number | null) => void;
  attempts: Record<number, ProblemAttemptRecord>;
  onRecordAttempt: (
    problemId: number,
    input: string,
    isCorrect: boolean,
    hintsUsed: number
  ) => void;
  onSpeakSegments: (title: string, segments: SpeechSegment[]) => void;
  onReplayNarration: () => void;
  activeSegmentId: string | null;
  activeFbdStep?: number;
}

export function PracticeView({
  selectedProblemId,
  onSelectProblem,
  attempts,
  onRecordAttempt,
  onSpeakSegments,
  onReplayNarration,
  activeSegmentId,
  activeFbdStep,
}: PracticeViewProps) {
  const [tierFilter, setTierFilter] = useState<number>(0); // 0 = all
  const [inputValue, setInputValue] = useState<string>('');
  const [checkResult, setCheckResult] = useState<AnswerCheckResult | null>(null);
  const [revealedHints, setRevealedHints] = useState<number>(0);
  const [isSolutionOpen, setIsSolutionOpen] = useState<boolean>(false);
  const [simPlaySignal, setSimPlaySignal] = useState<number>(0);

  const activeProblem: ProblemItem | undefined =
    selectedProblemId !== null
      ? ALL_PROBLEMS.find((p) => p.id === selectedProblemId)
      : undefined;

  // Reset per-problem UI state cleanly when switching problem (default collapsed solution!)
  useEffect(() => {
    if (!activeProblem) return;
    const prevAttempt = attempts[activeProblem.id];
    setInputValue(prevAttempt ? prevAttempt.lastInput : '');
    setCheckResult(null);
    setRevealedHints(prevAttempt ? prevAttempt.hintsUsed : 0);
    setIsSolutionOpen(false);
  }, [activeProblem?.id]);

  // If TTS is currently speaking a solution section, auto-open solution if needed
  useEffect(() => {
    if (
      activeProblem &&
      activeSegmentId &&
      activeSegmentId.startsWith(`s${activeProblem.id}-`)
    ) {
      setIsSolutionOpen(true);
    }
  }, [activeSegmentId, activeProblem]);

  if (!activeProblem) {
    const filtered =
      tierFilter === 0
        ? ALL_PROBLEMS
        : ALL_PROBLEMS.filter((p) => p.tierIndex === tierFilter);

    return (
      <div className="space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-[#6D28D9]">
              Pengembangan Khusus Soal Nomor 4 · Isian Singkat Numerik (1 Desimal Koma)
            </div>
            <h2 className="text-2xl font-bold text-[#1E1433] mt-1">
              Latihan 15 Soal Olimpiade Fisika
            </h2>
            <p className="text-sm text-[#5B4D7A] mt-1 max-w-2xl">
              Pilih kartu soal mana saja untuk dikerjakan secara mandiri. Seluruh soal memiliki jawaban numerik objektif dengan pembulatan satu angka di belakang koma (contoh: 12,5).
            </p>
          </div>
        </div>

        {/* Difficulty Tier Filter */}
        <div
          className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-[#F3F0FF] border border-[#E4DDF7] w-fit"
          role="group"
          aria-label="Filter Tingkat Kesulitan"
        >
          {[
            { idx: 0, label: 'Semua (15)' },
            { idx: 1, label: 'Tingkat 1 (1–3)' },
            { idx: 2, label: 'Tingkat 2 (4–6)' },
            { idx: 3, label: 'Tingkat 3 (7–9)' },
            { idx: 4, label: 'Tingkat 4 (10–12)' },
            { idx: 5, label: 'Tingkat 5 (13–15)' },
          ].map((tab) => (
            <button
              key={tab.idx}
              type="button"
              onClick={() => setTierFilter(tab.idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                tierFilter === tab.idx
                  ? 'bg-white text-[#4C1D95] shadow-sm'
                  : 'text-[#5B4D7A] hover:text-[#1E1433]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 15 Problem Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p) => {
            const rec = attempts[p.id];
            const statusLabel = !rec
              ? 'Belum Dikerjakan'
              : rec.isCorrect
                ? 'Benar'
                : 'Perlu Diperbaiki';
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => onSelectProblem(p.id)}
                className="text-left rounded-xl border border-[#E4DDF7] bg-white p-5 hover:border-[#6D28D9] transition-colors cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="font-mono font-bold text-[#4C1D95]">
                      SOAL {String(p.id).padStart(2, '0')}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 font-semibold ${
                        !rec
                          ? 'text-slate-500'
                          : rec.isCorrect
                            ? 'text-emerald-700'
                            : 'text-amber-700'
                      }`}
                    >
                      {rec?.isCorrect && <CheckCircle2 className="h-3.5 w-3.5" />}
                      {rec && !rec.isCorrect && (
                        <AlertCircle className="h-3.5 w-3.5" />
                      )}
                      <span>{statusLabel}</span>
                    </span>
                  </div>

                  <h3 className="mt-2 text-sm font-bold text-[#1E1433] leading-snug">
                    {p.shortTitle}
                  </h3>

                  <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs text-[#6B5B95]">
                    <span>{p.tier}</span>
                    <span aria-hidden="true">·</span>
                    <span>{p.subtopic}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F3F0FF] flex items-center justify-between text-xs font-semibold text-[#6D28D9]">
                  <span>Buka Soal &amp; Simulasi</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Individual Problem Workspace
  const rec = attempts[activeProblem.id];

  const handleSubmitAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    const res = checkNumericAnswer(inputValue, activeProblem);
    setCheckResult(res);
    if (res.status === 'correct' || res.status === 'wrong') {
      onRecordAttempt(
        activeProblem.id,
        inputValue.trim(),
        res.status === 'correct',
        revealedHints
      );
    }
  };

  const handleRevealNextHint = () => {
    const nextCount = Math.min(activeProblem.hints.length, revealedHints + 1);
    setRevealedHints(nextCount);
    if (rec) {
      onRecordAttempt(
        activeProblem.id,
        rec.lastInput,
        rec.isCorrect,
        Math.max(rec.hintsUsed, nextCount)
      );
    }
  };

  const handleResetProblem = () => {
    setInputValue('');
    setCheckResult(null);
    setRevealedHints(0);
    setIsSolutionOpen(false);
  };

  const handleSpeakQuestion = () => {
    const knownSpoken = activeProblem.knownData
      .map((k) => `${k.label} yaitu ${k.valueWithUnit}`)
      .join(', ');
    const segments: SpeechSegment[] = [
      {
        id: `q-${activeProblem.id}-stmt`,
        label: `Pernyataan Soal ${activeProblem.id}`,
        text: activeProblem.problemSpokenText,
        syncTarget: 'stimulus',
      },
      {
        id: `q-${activeProblem.id}-known`,
        label: 'Besaran Diketahui & Ditanyakan',
        text: `Besaran yang diketahui adalah ${knownSpoken}. Besaran yang ditanyakan adalah ${activeProblem.askedQuantity.label} dalam satuan ${activeProblem.askedQuantity.unit}.`,
        syncTarget: 'animation',
      },
    ];
    setSimPlaySignal((n) => n + 1);
    onSpeakSegments(`Soal ${activeProblem.id} · ${activeProblem.shortTitle}`, segments);
  };

  const handleSpeakSolution = () => {
    setIsSolutionOpen(true);
    const segments: SpeechSegment[] = activeProblem.solutionSections.map((sec) => ({
      id: sec.id,
      label: sec.title,
      text: sec.spokenText,
      syncTarget: sec.id.endsWith('-3')
        ? 'animation'
        : sec.id.endsWith('-4')
          ? 'fbd'
          : sec.id.endsWith('-5') || sec.id.endsWith('-6')
            ? 'formula'
            : 'solution',
    }));
    onSpeakSegments(`Pembahasan Soal ${activeProblem.id}`, segments);
  };

  const highlightBoxStyle = (
    type?: 'rumus' | 'prinsip' | 'kritis' | 'hasil' | 'none'
  ) => {
    switch (type) {
      case 'rumus':
        return 'bg-[#F5F2FF] border-[#C4B5FD]';
      case 'prinsip':
        return 'bg-[#FAF8FF] border-[#DDD6FE]';
      case 'kritis':
        return 'bg-amber-50/70 border-amber-200';
      case 'hasil':
        return 'bg-emerald-50/70 border-emerald-200';
      default:
        return 'bg-white border-[#E4DDF7]';
    }
  };

  const highlightTagLabel = (
    type?: 'rumus' | 'prinsip' | 'kritis' | 'hasil' | 'none'
  ) => {
    switch (type) {
      case 'rumus':
        return 'Rumus Utama';
      case 'prinsip':
        return 'Prinsip Fisika Penting';
      case 'kritis':
        return 'Langkah Matematis Kritis';
      case 'hasil':
        return 'Hasil Akhir';
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Problem Breadcrumb & Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onSelectProblem(null)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[#E4DDF7] bg-white px-3.5 py-2 text-xs font-semibold text-[#4C1D95] hover:bg-[#F5F2FF] transition-colors whitespace-nowrap cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Daftar 15 Soal
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={activeProblem.id <= 1}
            onClick={() => onSelectProblem(activeProblem.id - 1)}
            className="inline-flex items-center gap-1 rounded-lg border border-[#E4DDF7] bg-white px-3 py-2 text-xs font-semibold text-[#4C1D95] hover:bg-[#F5F2FF] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed whitespace-nowrap"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            Soal Sebelumnya
          </button>
          <span className="font-mono text-xs font-semibold text-[#4C1D95] px-2 tabular-nums">
            {activeProblem.id} / 15
          </span>
          <button
            type="button"
            disabled={activeProblem.id >= 15}
            onClick={() => onSelectProblem(activeProblem.id + 1)}
            className="inline-flex items-center gap-1 rounded-lg border border-[#E4DDF7] bg-white px-3 py-2 text-xs font-semibold text-[#4C1D95] hover:bg-[#F5F2FF] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed whitespace-nowrap"
          >
            Soal Berikutnya
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Problem Header & Text Stimulus */}
      <section className="rounded-2xl border border-[#E4DDF7] bg-white p-6 space-y-5">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#F1ECFA] pb-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#6D28D9] font-semibold">
              <span className="font-mono">SOAL NOMOR {activeProblem.id}</span>
              <span aria-hidden="true">·</span>
              <span>{activeProblem.tier}</span>
              <span aria-hidden="true">·</span>
              <span>{activeProblem.subtopic}</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-[#1E1433] mt-1">
              {activeProblem.shortTitle}
            </h2>
          </div>

          <button
            type="button"
            onClick={handleSpeakQuestion}
            className="inline-flex items-center gap-2 rounded-xl bg-[#6D28D9] px-4 py-2 text-xs font-semibold text-white hover:bg-[#5B21B6] transition-colors whitespace-nowrap cursor-pointer"
          >
            <Volume2 className="h-4 w-4" />
            Dengarkan Soal (Mister Jo)
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-4">
            <div
              className={`rounded-xl p-4 border ${
                activeSegmentId === `q-${activeProblem.id}-stmt`
                  ? 'border-[#6D28D9] bg-[#FAF8FF]'
                  : 'border-[#EDE9FE] bg-[#FAF9FF]'
              }`}
            >
              <p className="text-sm md:text-[15px] leading-relaxed text-[#1E1433]">
                {activeProblem.questionText}
              </p>
            </div>

            {/* Known Data & Asked Quantity */}
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-xl p-3 border ${
                activeSegmentId === `q-${activeProblem.id}-known`
                  ? 'border-[#6D28D9] bg-[#FAF8FF]'
                  : 'border-[#EDE9FE] bg-white'
              }`}
            >
              <div>
                <div className="text-xs font-bold text-[#4C1D95] mb-1.5">
                  Besaran Diketahui
                </div>
                <dl className="space-y-1 text-xs">
                  {activeProblem.knownData.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-2 py-1 border-b border-[#F3F0FF] last:border-0"
                    >
                      <dt className="text-[#5B4D7A]">
                        <span className="font-mono font-semibold text-[#1E1433]">
                          {item.symbol}
                        </span>{' '}
                        ({item.label})
                      </dt>
                      <dd className="font-mono font-semibold text-[#1E1433] tabular-nums">
                        {item.valueWithUnit}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="rounded-lg bg-[#F5F2FF] border border-[#E4DDF7] p-3 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold text-[#4C1D95]">
                    Besaran yang Ditanyakan
                  </div>
                  <div className="mt-2 text-sm font-bold text-[#1E1433]">
                    {activeProblem.askedQuantity.label}
                  </div>
                  <div className="mt-1 text-xs font-mono text-[#6D28D9]">
                    Simbol: {activeProblem.askedQuantity.symbol} · Satuan:{' '}
                    {activeProblem.askedQuantity.unit}
                  </div>
                </div>
                <div className="mt-3 text-[11px] text-[#5B4D7A]">
                  Aturan Jawaban: 1 angka di belakang koma memakai tanda koma (contoh: 12,5), tanpa menulis satuan di kolom input.
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <StimulusDiagram
              config={activeProblem.simulation}
              problem={activeProblem}
            />
          </div>
        </div>
      </section>

      {/* Physics Proof Animation */}
      <PhysicsCanvas
        config={activeProblem.simulation}
        title={`Animasi Pembuktian Fisika — Soal ${activeProblem.id}`}
        externalPlayingSignal={simPlaySignal}
      />

      {/* Interactive Answer Submission & Progressive Hints */}
      <section className="rounded-2xl border border-[#E4DDF7] bg-white p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-[#1E1433]">
              Kolom Jawaban Isian Singkat Numerik
            </h3>
            <p className="text-xs text-[#5B4D7A]">
              Tuliskan nilai numerik dengan tepat satu angka desimal bertanda koma (tanpa satuan).
            </p>
          </div>
          {rec && (
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                rec.isCorrect ? 'text-emerald-700' : 'text-amber-700'
              }`}
            >
              {rec.isCorrect ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              <span>
                Status Tersimpan: {rec.isCorrect ? 'Benar' : 'Perlu Diperbaiki'} ({rec.attemptsCount}x coba)
              </span>
            </span>
          )}
        </div>

        <form onSubmit={handleSubmitAnswer} className="flex flex-wrap items-end gap-3">
          <div className="w-full sm:w-64">
            <label
              htmlFor={`answer-input-${activeProblem.id}`}
              className="block text-xs font-semibold text-[#4C1D95] mb-1.5"
            >
              Nilai {activeProblem.askedQuantity.symbol} ({activeProblem.answerUnitLabel})
            </label>
            <div className="flex items-center gap-2">
              <input
                id={`answer-input-${activeProblem.id}`}
                type="text"
                inputMode="decimal"
                placeholder="Contoh: 12,5"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full rounded-xl border border-[#D8CEF4] bg-[#FAF9FF] px-3.5 py-2.5 text-sm font-mono font-semibold text-[#1E1433] focus:outline-none focus:border-[#6D28D9] focus:bg-white"
              />
              {activeProblem.answerUnitLabel !== 'tanpa satuan' && (
                <span className="text-xs font-mono font-semibold text-[#5B4D7A] whitespace-nowrap">
                  {activeProblem.answerUnitLabel}
                </span>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="rounded-xl bg-[#6D28D9] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#5B21B6] transition-colors whitespace-nowrap cursor-pointer"
          >
            Periksa Jawaban
          </button>

          <button
            type="button"
            onClick={handleRevealNextHint}
            disabled={revealedHints >= activeProblem.hints.length}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#D8CEF4] bg-[#F5F2FF] px-4 py-2.5 text-xs font-semibold text-[#4C1D95] hover:bg-[#EBE5FF] disabled:opacity-50 transition-colors whitespace-nowrap cursor-pointer disabled:cursor-not-allowed"
          >
            <HelpCircle className="h-3.5 w-3.5" />
            Petunjuk ({revealedHints}/{activeProblem.hints.length})
          </button>

          <button
            type="button"
            onClick={handleResetProblem}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors whitespace-nowrap cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Ulangi Soal
          </button>
        </form>

        {/* Feedback Banner */}
        {checkResult && (
          <div
            role="status"
            className={`rounded-xl border p-4 text-xs leading-relaxed flex items-start gap-2.5 ${
              checkResult.status === 'correct'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-amber-50 border-amber-200 text-amber-950'
            }`}
          >
            {checkResult.status === 'correct' ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
            )}
            <div>
              <div className="font-bold">
                {checkResult.status === 'correct'
                  ? 'Jawaban Benar!'
                  : checkResult.status === 'invalid-dot' ||
                      checkResult.status === 'invalid-format' ||
                      checkResult.status === 'empty'
                    ? 'Periksa Format Jawaban'
                    : 'Belum Tepat — Tinjau Konsep Berikut'}
              </div>
              <p className="mt-1">{checkResult.message}</p>
            </div>
          </div>
        )}

        {/* Progressive Hints */}
        {revealedHints > 0 && (
          <div className="space-y-2 pt-2">
            {activeProblem.hints.slice(0, revealedHints).map((hint, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-[#DDD6FE] bg-[#FAF8FF] px-4 py-3 text-xs leading-relaxed text-[#2E1065]"
              >
                <span className="font-bold text-[#6D28D9]">
                  Petunjuk {idx + 1}:{' '}
                </span>
                <span>{hint}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Interactive FBD / Vector Diagram */}
      <FbdVisualizer
        fbd={activeProblem.fbd}
        externalStep={activeFbdStep}
        onNarrateFbd={(stepsSegs) =>
          onSpeakSegments(
            `Diagram Vektor Soal ${activeProblem.id}`,
            stepsSegs.map((s) => ({
              ...s,
              syncTarget: 'fbd' as const,
            }))
          )
        }
      />

      {/* Collapsible 12-Section Textbook Solution (Default Closed!) */}
      <section className="rounded-2xl border border-[#E4DDF7] bg-white overflow-hidden">
        <div className="p-5 flex flex-wrap items-center justify-between gap-3 bg-[#FAF9FF] border-b border-[#E4DDF7]">
          <div>
            <h3 className="text-base font-bold text-[#1E1433]">
              Pembahasan Lengkap Standar Buku Teks Fisika (12 Tahap)
            </h3>
            <p className="text-xs text-[#5B4D7A] mt-0.5">
              Tertutup secara bawaan agar Anda dapat mencoba menyelesaikan soal secara mandiri terlebih dahulu.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              aria-expanded={isSolutionOpen}
              onClick={() => setIsSolutionOpen((prev) => !prev)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#4C1D95] px-4 py-2 text-xs font-semibold text-white hover:bg-[#3B0764] transition-colors whitespace-nowrap cursor-pointer"
            >
              {isSolutionOpen ? (
                <>
                  <ChevronUp className="h-4 w-4" />
                  TUTUP PEMBAHASAN
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4" />
                  LIHAT PEMBAHASAN
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleSpeakSolution}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#D8CEF4] bg-white px-4 py-2 text-xs font-semibold text-[#4C1D95] hover:bg-[#F5F2FF] transition-colors whitespace-nowrap cursor-pointer"
            >
              <Volume2 className="h-3.5 w-3.5 text-[#6D28D9]" />
              DENGARKAN PEMBAHASAN
            </button>

            <button
              type="button"
              onClick={() => {
                setIsSolutionOpen(true);
                onReplayNarration();
              }}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#E4DDF7] bg-white px-3.5 py-2 text-xs font-semibold text-[#5B4D7A] hover:text-[#1E1433] transition-colors whitespace-nowrap cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              ULANGI PENJELASAN
            </button>
          </div>
        </div>

        {isSolutionOpen && (
          <div className="p-6 space-y-4">
            {activeProblem.solutionSections.map((sec) => {
              const isSpokenActive = activeSegmentId === sec.id;
              const tag = highlightTagLabel(sec.highlightType);
              return (
                <article
                  key={sec.id}
                  className={`rounded-xl border p-4 space-y-2.5 transition-colors ${highlightBoxStyle(
                    sec.highlightType
                  )} ${
                    isSpokenActive ? 'ring-2 ring-[#6D28D9] border-[#6D28D9]' : ''
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-[#1E1433]">
                      {sec.title}
                    </h4>
                    {tag && (
                      <span className="text-[11px] font-semibold text-[#6D28D9]">
                        {tag}
                      </span>
                    )}
                  </div>

                  {sec.paragraphs.map((p, idx) => (
                    <p
                      key={idx}
                      className="text-sm leading-relaxed text-[#3B2E58]"
                    >
                      {p}
                    </p>
                  ))}

                  {sec.equations &&
                    sec.equations.map((eq, eIdx) => (
                      <div
                        key={eIdx}
                        className="rounded-lg bg-[#FAF9FF] px-3 py-2"
                      >
                        <MathBlock latex={eq} />
                      </div>
                    ))}
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
