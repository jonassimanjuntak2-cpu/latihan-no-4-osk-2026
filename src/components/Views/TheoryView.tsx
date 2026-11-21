import { useState } from 'react';
import { CheckCircle2, Volume2 } from 'lucide-react';
import { THEORY_LEVELS } from '../../data/theoryLevels';
import { MathBlock } from '../MathBlock';
import { PhysicsCanvas } from '../PhysicsCanvas';
import { StimulusDiagram } from '../StimulusDiagram';
import { SpeechSegment } from '../../utils/speechUtils';

interface TheoryViewProps {
  completedLevels: number[];
  onToggleLevelComplete: (level: number) => void;
  onSpeakSegments: (title: string, segments: SpeechSegment[]) => void;
  activeSegmentId: string | null;
}

export function TheoryView({
  completedLevels,
  onToggleLevelComplete,
  onSpeakSegments,
  activeSegmentId,
}: TheoryViewProps) {
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const levelData =
    THEORY_LEVELS.find((l) => l.level === selectedLevel) ?? THEORY_LEVELS[0];
  const isCompleted = completedLevels.includes(levelData.level);

  const handleSpeakLevel = () => {
    const segments: SpeechSegment[] = [
      {
        id: `th-${levelData.level}-intro`,
        label: `${levelData.code}: ${levelData.title}`,
        text: levelData.spokenScript,
      },
      ...levelData.sections.map((sec, idx) => ({
        id: `th-${levelData.level}-sec-${idx}`,
        label: sec.heading,
        text: `${sec.heading}. ${sec.body.join(' ')}`,
      })),
      {
        id: `th-${levelData.level}-example`,
        label: levelData.numericExample.title,
        text: `${levelData.numericExample.title}. ${levelData.numericExample.given} ${levelData.numericExample.steps.join(' ')} Hasilnya: ${levelData.numericExample.result}.`,
      },
    ];
    onSpeakSegments(`${levelData.code} · Pusat Belajar Teori`, segments);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-[#6D28D9]">
            Kurikulum Bertahap · 5 Tingkatan Penguasaan Konsep
          </div>
          <h2 className="text-2xl font-bold text-[#1E1433] mt-1">
            Pusat Belajar Teori Fisika
          </h2>
          <p className="text-sm text-[#5B4D7A] mt-1">
            Pelajari teori dari pengetahuan paling dasar hingga pemodelan matematis tingkat olimpiade sebelum mengerjakan soal.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleSpeakLevel}
            className="inline-flex items-center gap-2 rounded-xl bg-[#6D28D9] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#5B21B6] transition-colors whitespace-nowrap cursor-pointer"
          >
            <Volume2 className="h-4 w-4" />
            Dengarkan Penjelasan {levelData.code}
          </button>

          <button
            type="button"
            onClick={() => onToggleLevelComplete(levelData.level)}
            className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-semibold border transition-colors whitespace-nowrap cursor-pointer ${
              isCompleted
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-white text-[#4C1D95] border-[#D8CEF4] hover:bg-[#F5F2FF]'
            }`}
          >
            <CheckCircle2 className="h-4 w-4" />
            {isCompleted ? 'Level Selesai Dipelajari' : 'Tandai Level Selesai'}
          </button>
        </div>
      </div>

      {/* 5 Level Selector Bar */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2"
        role="tablist"
        aria-label="Pilih Level Teori Fisika"
      >
        {THEORY_LEVELS.map((lv) => {
          const active = lv.level === selectedLevel;
          const done = completedLevels.includes(lv.level);
          return (
            <button
              key={lv.level}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setSelectedLevel(lv.level)}
              className={`text-left rounded-xl border p-3 transition-colors cursor-pointer ${
                active
                  ? 'bg-[#4C1D95] border-[#4C1D95] text-white'
                  : 'bg-white border-[#E4DDF7] text-[#1E1433] hover:border-[#7C3AED]'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-semibold">
                <span className={active ? 'text-violet-200' : 'text-[#6D28D9]'}>
                  {lv.code}
                </span>
                {done && (
                  <span className={active ? 'text-emerald-300' : 'text-emerald-700'}>
                    Selesai
                  </span>
                )}
              </div>
              <div className="mt-1 text-xs font-bold leading-snug line-clamp-2">
                {lv.title.replace(/^[^:]+:\s*/, '')}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Level Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 space-y-5">
          {/* Intro Card */}
          <div
            className={`rounded-xl border bg-white p-5 ${
              activeSegmentId === `th-${levelData.level}-intro`
                ? 'border-[#6D28D9] ring-2 ring-[#DDD6FE]'
                : 'border-[#E4DDF7]'
            }`}
          >
            <div className="text-xs font-semibold text-[#6D28D9]">
              {levelData.code} · {levelData.subtitle}
            </div>
            <h3 className="text-xl font-bold text-[#1E1433] mt-1">
              {levelData.title}
            </h3>
            <p className="text-sm leading-relaxed text-[#473B66] mt-2">
              {levelData.summary}
            </p>

            <div className="mt-4 rounded-xl bg-[#F5F2FF] border border-[#E4DDF7] p-4">
              <div className="text-xs font-bold text-[#4C1D95]">
                Poin Kunci Penguasaan Level Ini
              </div>
              <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-[#2E1065] list-disc pl-4">
                {levelData.keyTakeaways.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Theory Sections */}
          {levelData.sections.map((sec, idx) => {
            const isSecActive =
              activeSegmentId === `th-${levelData.level}-sec-${idx}`;
            return (
              <section
                key={idx}
                className={`rounded-xl border bg-white p-5 space-y-3 ${
                  isSecActive
                    ? 'border-[#6D28D9] ring-2 ring-[#DDD6FE]'
                    : 'border-[#E4DDF7]'
                }`}
              >
                <h4 className="text-base font-bold text-[#1E1433]">
                  {sec.heading}
                </h4>
                {sec.body.map((para, pIdx) => (
                  <p
                    key={pIdx}
                    className="text-sm leading-relaxed text-[#473B66]"
                  >
                    {para}
                  </p>
                ))}

                {sec.equations &&
                  sec.equations.map((eq, eIdx) => (
                    <div
                      key={eIdx}
                      className="rounded-xl border border-[#D8CEF4] bg-[#FAF9FF] p-3.5"
                    >
                      <MathBlock latex={eq.latex} />
                      <p className="text-xs text-[#5B4D7A] text-center mt-1">
                        {eq.caption}
                      </p>
                    </div>
                  ))}

                {sec.callout && (
                  <div className="rounded-xl border border-[#D8CEF4] bg-[#F5F2FF] p-3.5 text-xs leading-relaxed text-[#2E1065]">
                    <span className="font-bold text-[#4C1D95]">
                      {sec.callout.label}:{' '}
                    </span>
                    <span>{sec.callout.text}</span>
                  </div>
                )}
              </section>
            );
          })}

          {/* Numeric Example */}
          <section
            className={`rounded-xl border bg-white p-5 space-y-3 ${
              activeSegmentId === `th-${levelData.level}-example`
                ? 'border-[#6D28D9] ring-2 ring-[#DDD6FE]'
                : 'border-[#E4DDF7]'
            }`}
          >
            <div className="text-xs font-semibold text-[#6D28D9]">
              Contoh Penerapan Numerik
            </div>
            <h4 className="text-base font-bold text-[#1E1433]">
              {levelData.numericExample.title}
            </h4>
            <p className="text-sm text-[#473B66]">
              {levelData.numericExample.given}
            </p>
            <ol className="space-y-1.5 text-xs leading-relaxed text-[#2E1065] list-decimal pl-4">
              {levelData.numericExample.steps.map((st, sIdx) => (
                <li key={sIdx}>{st}</li>
              ))}
            </ol>
            <div className="rounded-lg bg-[#4C1D95] text-white px-4 py-2.5 text-xs font-semibold">
              Kesimpulan: {levelData.numericExample.result}
            </div>
          </section>
        </div>

        {/* Visual Diagram + Interactive Physics Canvas */}
        <div className="lg:col-span-5 space-y-5">
          <StimulusDiagram
            config={levelData.simulationPreset}
            title={`Ilustrasi Geometri & Vektor · ${levelData.code}`}
          />
          <PhysicsCanvas
            config={levelData.simulationPreset}
            title={`Simulasi Fenomena ${levelData.code}`}
            compact
          />
        </div>
      </div>
    </div>
  );
}
