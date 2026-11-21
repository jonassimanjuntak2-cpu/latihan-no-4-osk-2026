import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Layers, Play, Volume2 } from 'lucide-react';
import { FbdSpec } from '../types/physics';
import { MathBlock } from './MathBlock';

interface FbdVisualizerProps {
  fbd: FbdSpec;
  onNarrateFbd?: (stepsText: { id: string; label: string; text: string; fbdStep: number }[]) => void;
  externalStep?: number;
}

export function FbdVisualizer({
  fbd,
  onNarrateFbd,
  externalStep,
}: FbdVisualizerProps) {
  const [stepIdx, setStepIdx] = useState(fbd.steps.length - 1);
  const [isAutoAnimating, setIsAutoAnimating] = useState(false);

  useEffect(() => {
    setStepIdx(0);
    setIsAutoAnimating(false);
  }, [fbd]);

  useEffect(() => {
    if (externalStep !== undefined && externalStep >= 0 && externalStep < fbd.steps.length) {
      setStepIdx(externalStep);
    }
  }, [externalStep, fbd.steps.length]);

  useEffect(() => {
    if (!isAutoAnimating) return;
    const timer = window.setInterval(() => {
      setStepIdx((prev) => {
        if (prev >= fbd.steps.length - 1) {
          setIsAutoAnimating(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1800);
    return () => window.clearInterval(timer);
  }, [isAutoAnimating, fbd.steps.length]);

  const currentStep = fbd.steps[stepIdx] ?? fbd.steps[0];
  const visibleVectors = fbd.vectors.filter((v) =>
    currentStep.visibleVectorIds.includes(v.id)
  );

  const handleAnimateOneByOne = () => {
    setStepIdx(0);
    setIsAutoAnimating(true);
  };

  const handleSpeakFbd = () => {
    if (!onNarrateFbd) return;
    const segments = fbd.steps.map((st, idx) => {
      const vecNames = fbd.vectors
        .filter((v) => st.visibleVectorIds.includes(v.id))
        .map((v) => `${v.spokenLabel}: ${v.explanation}`)
        .join('. ');
      return {
        id: `fbd-step-${idx}`,
        label: `Langkah ${st.stepNumber}: ${st.title}`,
        text: `Langkah ${st.stepNumber}, ${st.title}. ${st.description}. ${vecNames}`,
        fbdStep: idx,
      };
    });
    onNarrateFbd(segments);
  };

  const cx = 175;
  const cy = 128;

  return (
    <div className="rounded-xl border border-[#E4DDF7] bg-white p-4">
      <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-[#F1ECFA]">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#6D28D9] font-semibold">
            <Layers className="h-3.5 w-3.5" />
            <span>
              {fbd.hasRealForce
                ? 'Free Body Diagram (FBD) Gaya Riil'
                : 'Diagram Vektor Kinematika Bertahap'}
            </span>
          </div>
          <h4 className="text-sm font-bold text-[#1E1433] mt-0.5">{fbd.objectName}</h4>
          <p className="text-xs text-[#5B4D7A] mt-0.5">{fbd.frameDescription}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleAnimateOneByOne}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#6D28D9] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#5B21B6] transition-colors whitespace-nowrap cursor-pointer"
          >
            <Play className="h-3.5 w-3.5" />
            Animasikan Vektor Bertahap
          </button>
          {onNarrateFbd && (
            <button
              type="button"
              onClick={handleSpeakFbd}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#D8CEF4] bg-[#F5F2FF] px-3 py-1.5 text-xs font-semibold text-[#4C1D95] hover:bg-[#EBE5FF] transition-colors whitespace-nowrap cursor-pointer"
            >
              <Volume2 className="h-3.5 w-3.5" />
              Narasi FBD Mister Jo
            </button>
          )}
        </div>
      </div>

      {/* Step selector tabs */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {fbd.steps.map((st, idx) => (
          <button
            key={st.stepNumber}
            type="button"
            onClick={() => {
              setIsAutoAnimating(false);
              setStepIdx(idx);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
              idx === stepIdx
                ? 'bg-[#4C1D95] text-white'
                : 'bg-[#FAF9FF] text-[#5B4D7A] border border-[#E4DDF7] hover:text-[#1E1433]'
            }`}
          >
            Tahap {st.stepNumber}
          </button>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        {/* SVG FBD Canvas */}
        <div className="lg:col-span-6 rounded-xl border border-[#EDE9FE] bg-[#FAF9FF] p-2">
          <svg
            viewBox="0 0 350 256"
            className="w-full h-auto max-h-[250px]"
            role="img"
            aria-label={`Diagram vektor tahap ${currentStep.stepNumber}`}
          >
            <defs>
              {fbd.vectors.map((v) => (
                <marker
                  key={`mk-${v.id}`}
                  id={`fbd-arrow-${v.id}`}
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill={v.color} />
                </marker>
              ))}
            </defs>

            {/* Reference Grid */}
            <circle cx={cx} cy={cy} r="88" fill="none" stroke="#E9E2FA" strokeWidth="1" strokeDasharray="3 3" />

            {/* Vectors */}
            {visibleVectors.map((vec, i) => {
              const rad = (vec.angleDeg * Math.PI) / 180;
              const len = 95 * vec.lengthRatio;
              // SVG y downward -> subtract sin(rad)
              const x2 = cx + len * Math.cos(rad);
              const y2 = cy - len * Math.sin(rad);
              const isAxis = vec.category === 'axis';

              // Label placement offset to prevent overlapping
              const labelDist = len + 16;
              const lx = cx + labelDist * Math.cos(rad);
              const ly = cy - labelDist * Math.sin(rad) + (i % 2 === 0 ? 4 : -2);

              return (
                <g key={vec.id}>
                  <line
                    x1={cx}
                    y1={cy}
                    x2={x2}
                    y2={y2}
                    stroke={vec.color}
                    strokeWidth={isAxis ? 1.5 : 2.8}
                    strokeDasharray={isAxis || vec.category === 'component' ? '5 3' : undefined}
                    markerEnd={`url(#fbd-arrow-${vec.id})`}
                  />
                  <text
                    x={Math.max(12, Math.min(250, lx - 20))}
                    y={Math.max(16, Math.min(244, ly))}
                    fontSize="10.5"
                    fontWeight={isAxis ? '500' : '700'}
                    fill={vec.color}
                    fontFamily="IBM Plex Mono, monospace"
                  >
                    {vec.label}
                  </text>
                </g>
              );
            })}

            {/* Analyzed Particle Object */}
            <circle
              cx={cx}
              cy={cy}
              r="11"
              fill="#4C1D95"
              stroke="#FFFFFF"
              strokeWidth="2.5"
            />
            <text
              x={cx}
              y={cy + 3.5}
              textAnchor="middle"
              fontSize="9.5"
              fontWeight="700"
              fill="#FFFFFF"
            >
              m
            </text>
          </svg>
        </div>

        {/* Step explanation & active vectors list */}
        <div className="lg:col-span-6 space-y-3">
          <div className="rounded-xl bg-[#F5F2FF] border border-[#E4DDF7] p-3.5">
            <div className="text-xs font-semibold text-[#6D28D9]">
              Tahap {currentStep.stepNumber} dari {fbd.steps.length}
            </div>
            <h5 className="text-sm font-bold text-[#1E1433] mt-0.5">
              {currentStep.title}
            </h5>
            <p className="text-xs leading-relaxed text-[#3B2E58] mt-1.5">
              {currentStep.description}
            </p>
            {currentStep.equationLatex && (
              <div className="mt-2.5 rounded-lg bg-white border border-[#E4DDF7] px-3 py-1.5">
                <MathBlock latex={currentStep.equationLatex} />
              </div>
            )}
          </div>

          {visibleVectors.length > 0 && (
            <div className="space-y-1.5">
              <div className="text-xs font-semibold text-[#4C1D95]">
                Vektor yang Bekerja pada Tahap Ini:
              </div>
              {visibleVectors.map((vec) => (
                <div
                  key={vec.id}
                  className="flex items-start gap-2 rounded-lg border border-[#F1ECFA] bg-[#FAF9FF] px-3 py-2 text-xs"
                >
                  <span
                    className="mt-1 h-2.5 w-2.5 rounded-sm shrink-0"
                    style={{ backgroundColor: vec.color }}
                  />
                  <div>
                    <span className="font-mono font-semibold text-[#1E1433]">
                      {vec.label}
                    </span>
                    <span className="text-[#5B4D7A]"> — {vec.explanation}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              disabled={stepIdx === 0}
              onClick={() => {
                setIsAutoAnimating(false);
                setStepIdx((i) => Math.max(0, i - 1));
              }}
              className="inline-flex items-center gap-1 rounded-lg border border-[#E4DDF7] bg-white px-3 py-1.5 text-xs font-semibold text-[#4C1D95] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              Sebelumnya
            </button>
            <button
              type="button"
              disabled={stepIdx >= fbd.steps.length - 1}
              onClick={() => {
                setIsAutoAnimating(false);
                setStepIdx((i) => Math.min(fbd.steps.length - 1, i + 1));
              }}
              className="inline-flex items-center gap-1 rounded-lg border border-[#E4DDF7] bg-white px-3 py-1.5 text-xs font-semibold text-[#4C1D95] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
            >
              Berikutnya
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
