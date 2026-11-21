import { useState } from 'react';
import { ALL_PROBLEMS } from '../../data/problems';
import { SpeechSegment } from '../../utils/speechUtils';
import { FbdVisualizer } from '../FbdVisualizer';

interface FbdLabViewProps {
  onSpeakSegments: (title: string, segments: SpeechSegment[]) => void;
  activeFbdStep?: number;
}

export function FbdLabView({ onSpeakSegments, activeFbdStep }: FbdLabViewProps) {
  const [selectedId, setSelectedId] = useState<number>(1);
  const problem =
    ALL_PROBLEMS.find((p) => p.id === selectedId) ?? ALL_PROBLEMS[0];

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-semibold text-[#6D28D9]">
          Analisis Gaya &amp; Penguraian Vektor Bertahap
        </div>
        <h2 className="text-2xl font-bold text-[#1E1433] mt-1">
          Free Body Diagram Lab
        </h2>
        <p className="text-sm text-[#5B4D7A] mt-1 max-w-2xl">
          Eksplorasi pemodelan vektor kecepatan kinematika dan gaya riil (tanpa gaya fiktif) pada seluruh 15 skenario secara bertahap bersama narasi Mister Jo.
        </p>
      </div>

      {/* Problem Selector Strip */}
      <div className="rounded-xl border border-[#E4DDF7] bg-white p-4">
        <div className="text-xs font-semibold text-[#4C1D95] mb-2.5">
          Pilih Skenario Soal (1–15):
        </div>
        <div className="flex flex-wrap gap-1.5">
          {ALL_PROBLEMS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setSelectedId(p.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors cursor-pointer ${
                p.id === selectedId
                  ? 'bg-[#6D28D9] text-white'
                  : 'bg-[#FAF9FF] text-[#4C1D95] border border-[#E4DDF7] hover:bg-[#F3F0FF]'
              }`}
            >
              Soal {p.id}
            </button>
          ))}
        </div>

        <div className="mt-3 pt-3 border-t border-[#F1ECFA] flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="font-bold text-[#1E1433]">
            Soal {problem.id}: {problem.shortTitle}
          </span>
          <span className="text-[#5B4D7A]">{problem.subtopic}</span>
        </div>
      </div>

      <FbdVisualizer
        fbd={problem.fbd}
        externalStep={activeFbdStep}
        onNarrateFbd={(stepsSegs) =>
          onSpeakSegments(
            `FBD Lab · Soal ${problem.id}`,
            stepsSegs.map((s) => ({
              ...s,
              syncTarget: 'fbd' as const,
            }))
          )
        }
      />

      {/* Scientific FBD Principles Box */}
      <div className="rounded-xl border border-[#E4DDF7] bg-white p-5 space-y-2">
        <h3 className="text-sm font-bold text-[#1E1433]">
          Prinsip Ketelitian FBD di Olympiad Physics Lab
        </h3>
        <ul className="text-xs leading-relaxed text-[#473B66] space-y-1.5 list-disc pl-4">
          <li>
            Pada analisis kinematika murni (seperti Soal 1–10 dan 12–15), diagram hanya menampilkan sumbu koordinat polar lokal, vektor kecepatan sesaat, komponen radial-tangensial, dan vektor percepatan sesaat tanpa mencampurkannya dengan gaya fiktif.
          </li>
          <li>
            Pada analisis dinamika gaya (Soal 11), Free Body Diagram tampak atas menampilkan resultan gaya riil horizontal yang bekerja tegak lurus terhadap vektor kecepatan agar kelajuan tetap konstan.
          </li>
          <li>
            Semua komponen vektor konsisten dengan persamaan matematis yang diturunkan di Pusat Belajar Teori dan Pembahasan Buku Teks.
          </li>
        </ul>
      </div>
    </div>
  );
}
