import { Pause, Play, RotateCcw, Square, Volume2 } from 'lucide-react';
import { SpeechSegment, TtsPlaybackStatus } from '../utils/speechUtils';

interface MisterJoPlayerProps {
  title: string;
  status: TtsPlaybackStatus;
  rate: number;
  activeSegment: SpeechSegment | null;
  onPlay: () => void;
  onPause: () => void;
  onResume: () => void;
  onReplay: () => void;
  onStop: () => void;
  onRateChange: (rate: number) => void;
  compact?: boolean;
}

export function MisterJoPlayer({
  title,
  status,
  rate,
  activeSegment,
  onPlay,
  onPause,
  onResume,
  onReplay,
  onStop,
  onRateChange,
  compact = false,
}: MisterJoPlayerProps) {
  const rates = [0.75, 1.0, 1.25];

  return (
    <div
      className={`rounded-xl border border-[#E4DDF7] bg-white ${
        compact ? 'p-3' : 'p-4'
      }`}
      aria-label="Panel Narator Suara Mister Jo"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#4C1D95] text-white font-display font-bold text-sm">
            MJ
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-xs text-[#6B5B95]">
              <Volume2 className="h-3.5 w-3.5 text-[#6D28D9] shrink-0" />
              <span className="font-semibold text-[#4C1D95] whitespace-nowrap">
                MISTER JO
              </span>
              <span aria-hidden="true">·</span>
              <span className="truncate">{title}</span>
            </div>
            <p className="text-xs text-[#5B4D7A] mt-0.5 truncate">
              {status === 'playing' && activeSegment
                ? `Sedang menjelaskan: ${activeSegment.label}`
                : status === 'paused' && activeSegment
                  ? `Dijeda pada: ${activeSegment.label}`
                  : 'Narator Fisika Olimpiade siap membimbing Anda'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {status === 'idle' && (
            <button
              type="button"
              onClick={onPlay}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#6D28D9] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#5B21B6] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Play className="h-3.5 w-3.5" />
              PUTAR SUARA
            </button>
          )}
          {status === 'playing' && (
            <button
              type="button"
              onClick={onPause}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#4C1D95] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#3B0764] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Pause className="h-3.5 w-3.5" />
              JEDA
            </button>
          )}
          {status === 'paused' && (
            <button
              type="button"
              onClick={onResume}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#6D28D9] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#5B21B6] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Play className="h-3.5 w-3.5" />
              LANJUTKAN
            </button>
          )}

          <button
            type="button"
            onClick={onReplay}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#D8CEF4] bg-[#F5F2FF] px-3 py-2 text-xs font-semibold text-[#4C1D95] hover:bg-[#EBE5FF] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            ULANGI
          </button>

          {status !== 'idle' && (
            <button
              type="button"
              onClick={onStop}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Square className="h-3.5 w-3.5" />
              HENTIKAN
            </button>
          )}

          <div
            className="flex items-center rounded-lg border border-[#E4DDF7] bg-[#FAF9FF] p-0.5"
            role="group"
            aria-label="Kecepatan suara Mister Jo"
          >
            {rates.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => onRateChange(r)}
                className={`px-2 py-1 text-xs font-mono rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  Math.abs(rate - r) < 0.05
                    ? 'bg-[#6D28D9] text-white font-semibold'
                    : 'text-[#5B4D7A] hover:text-[#1E1433]'
                }`}
              >
                {r.toFixed(2).replace('.00', '.0')}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {activeSegment && status !== 'idle' && (
        <div className="mt-3 rounded-lg bg-[#F5F2FF] px-3.5 py-2.5 text-xs leading-relaxed text-[#2E1065] border border-[#E4DDF7]">
          <span className="font-semibold text-[#5B21B6]">Transkrip Aktif: </span>
          <span>{activeSegment.text}</span>
        </div>
      )}
    </div>
  );
}
