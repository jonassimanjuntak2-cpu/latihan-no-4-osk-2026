import { Volume2 } from 'lucide-react';
import {
  SOAL_4_ORIGINAL_TEXT,
  SOAL_4_TEN_POINT_ANALYSIS,
} from '../../data/soal4Analysis';
import { ALL_PROBLEMS } from '../../data/problems';
import { MathBlock } from '../MathBlock';
import { StimulusDiagram } from '../StimulusDiagram';
import { PhysicsCanvas } from '../PhysicsCanvas';
import { SpeechSegment } from '../../utils/speechUtils';

interface AnalysisViewProps {
  onSpeakSegments: (title: string, segments: SpeechSegment[]) => void;
  activeSegmentId: string | null;
}

export function AnalysisView({
  onSpeakSegments,
  activeSegmentId,
}: AnalysisViewProps) {
  const handleListenAnalysis = () => {
    const segments: SpeechSegment[] = [
      {
        id: 'soal4-orig',
        label: 'Naskah Asli Soal Nomor 4',
        text: `Berikut adalah naskah asli Soal Nomor 4 OSK Fisika SMA 2026. ${SOAL_4_ORIGINAL_TEXT}`,
      },
      ...SOAL_4_TEN_POINT_ANALYSIS.map((pt) => ({
        id: `analysis-pt-${pt.number}`,
        label: `${pt.number}. ${pt.title}`,
        text: `Poin ${pt.number}, ${pt.title}. ${pt.summary}. ${pt.details.join(' ')}`,
      })),
    ];
    onSpeakSegments('Analisis Mendalam Soal Nomor 4', segments);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-[#6D28D9]">
            Dokumen Sumber · OSK Fisika SMA 2026 · Bab Kinematika
          </div>
          <h2 className="text-2xl font-bold text-[#1E1433] mt-1">
            Analisis Mendalam Soal Nomor 4
          </h2>
          <p className="text-sm text-[#5B4D7A] mt-1 max-w-2xl">
            Seluruh 15 soal latihan dan kurikulum 5 level di aplikasi ini dikembangkan secara khusus dari satu soal acuan berikut.
          </p>
        </div>

        <button
          type="button"
          onClick={handleListenAnalysis}
          className="inline-flex items-center gap-2 rounded-xl bg-[#6D28D9] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#5B21B6] transition-colors whitespace-nowrap cursor-pointer"
        >
          <Volume2 className="h-4 w-4" />
          Dengarkan Analisis Mister Jo
        </button>
      </div>

      {/* Original Question Card + Simulation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div
          className={`lg:col-span-5 rounded-xl border bg-white p-5 space-y-4 ${
            activeSegmentId === 'soal4-orig'
              ? 'border-[#6D28D9] ring-2 ring-[#DDD6FE]'
              : 'border-[#E4DDF7]'
          }`}
        >
          <div>
            <div className="text-xs font-semibold text-[#4C1D95]">
              Naskah Sumber Soal Nomor 4
            </div>
            <blockquote className="mt-2 rounded-xl bg-[#F5F2FF] border border-[#E4DDF7] p-4 text-sm leading-relaxed text-[#1E1433]">
              “{SOAL_4_ORIGINAL_TEXT}”
            </blockquote>
          </div>

          <StimulusDiagram
            config={ALL_PROBLEMS[0].simulation}
            title="Diagram Segilima Beraturan & Arah Kecepatan Siklik (Sesuai Naskah OSK 2026)"
          />
        </div>

        <div className="lg:col-span-7">
          <PhysicsCanvas
            config={ALL_PROBLEMS[0].simulation}
            title="Pembuktian Visual Soal Nomor 4: Segilima Beraturan Menyusut Simetris"
          />
        </div>
      </div>

      {/* 10 Point Analysis Grid */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-[#1E1433]">
          10 Pilar Identifikasi Ilmiah Soal Nomor 4
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SOAL_4_TEN_POINT_ANALYSIS.map((pt) => {
            const isActive = activeSegmentId === `analysis-pt-${pt.number}`;
            return (
              <article
                key={pt.number}
                className={`rounded-xl border bg-white p-5 transition-colors ${
                  isActive
                    ? 'border-[#6D28D9] bg-[#FAF8FF] ring-2 ring-[#DDD6FE]'
                    : 'border-[#E4DDF7]'
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-[#6D28D9]">
                  <span className="font-mono">
                    {String(pt.number).padStart(2, '0')}.
                  </span>
                  <span>{pt.title}</span>
                </div>
                <p className="mt-1.5 text-sm font-semibold text-[#1E1433]">
                  {pt.summary}
                </p>
                <ul className="mt-2.5 space-y-1.5 text-xs leading-relaxed text-[#473B66] list-disc pl-4">
                  {pt.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
                {pt.equationLatex && (
                  <div className="mt-3 rounded-lg border border-[#E4DDF7] bg-[#FAF9FF] px-3 py-2">
                    <MathBlock latex={pt.equationLatex} />
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
