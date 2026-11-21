import { useState } from 'react';
import { SimulationConfig } from '../../types/physics';
import { PhysicsCanvas } from '../PhysicsCanvas';
import { StimulusDiagram } from '../StimulusDiagram';

interface PresetOption {
  id: string;
  label: string;
  description: string;
  config: SimulationConfig;
}

const PRESETS: PresetOption[] = [
  {
    id: 'pentagon',
    label: 'Segilima Beraturan (Soal No. 4)',
    description:
      'Konfigurasi asli Soal Nomor 4: 5 partikel saling mengejar dengan laju konstan membentuk spiral logaritmik dengan rasio a/b = 1,7.',
    config: {
      kind: 'polygon-pursuit',
      n: 5,
      R0: 10,
      v0: 2.5,
      stepSkip: 1,
      tiltDeg: 0,
      clockwise: false,
    },
  },
  {
    id: 'triangle',
    label: 'Segitiga Sama Sisi (N = 3)',
    description:
      'Laju pendekatan sisi 1,5v sehingga partikel bertemu sangat cepat dengan kelengkungan lintasan ringan.',
    config: {
      kind: 'polygon-pursuit',
      n: 3,
      R0: 10,
      v0: 3.0,
      stepSkip: 1,
      tiltDeg: 0,
      clockwise: false,
    },
  },
  {
    id: 'octagon',
    label: 'Segidelapan (N = 8)',
    description:
      'Komponen tangensial mendominasi (92,4% dari v), membuat partikel berputar lebih jauh sebelum bertemu di pusat (a/b = 2,6).',
    config: {
      kind: 'polygon-pursuit',
      n: 8,
      R0: 10,
      v0: 3.0,
      stepSkip: 1,
      tiltDeg: 0,
      clockwise: false,
    },
  },
  {
    id: 'pentagram',
    label: 'Pentagram Diagonal (i → i+2)',
    description:
      'Lima partikel mengejar partikel kedua di sebelahnya (melompati 1 sudut). Sudut ke radial hanya 18° sehingga menukik tajam ke pusat.',
    config: {
      kind: 'polygon-pursuit',
      n: 5,
      R0: 10,
      v0: 4.0,
      stepSkip: 2,
      tiltDeg: 0,
      clockwise: false,
    },
  },
  {
    id: 'tilted',
    label: 'Persegi Miring 15° ke Dalam',
    description:
      'Vektor kecepatan dimiringkan 15° lebih ke dalam dari sisi persegi, mempercepat pertemuan menjadi 5,8 detik.',
    config: {
      kind: 'polygon-pursuit',
      n: 4,
      R0: 10,
      v0: 2.0,
      stepSkip: 1,
      tiltDeg: 15,
      clockwise: false,
    },
  },
  {
    id: 'accel',
    label: 'Segilima Dipercepat (a_t = 2 m/s²)',
    description:
      'Partikel mulai dari diam dan dipercepat tangensial secara seragam. Lintasan spiral tetap identik meski kelajuan berubah.',
    config: {
      kind: 'polygon-pursuit',
      n: 5,
      R0: 25,
      v0: 0,
      stepSkip: 1,
      tiltDeg: 0,
      tangentialAccel: 2.0,
      clockwise: false,
    },
  },
  {
    id: 'river',
    label: 'Segilima di Sungai Berarus',
    description:
      'Transformasi Galilean: segilima tetap menyusut simetris terhadap air sambil hanyut ke timur oleh arus V_c = 4,0 m/s.',
    config: {
      kind: 'polygon-pursuit',
      n: 5,
      R0: 10,
      v0: 5.0,
      stepSkip: 1,
      tiltDeg: 0,
      currentVx: 4.0,
      clockwise: false,
    },
  },
  {
    id: 'linear',
    label: 'Kurva Kejar 2 Partikel (A kejar B)',
    description:
      'Partikel A mengejar B yang bergerak lurus ke kanan. Jalankan animasi untuk melihat pembelokan lintasan A hingga menyusul B.',
    config: {
      kind: 'linear-pursuit',
      L: 24,
      u: 3.0,
      v: 5.0,
    },
  },
];

export function GalleryView() {
  const [activeId, setActiveId] = useState<string>('pentagon');
  const [customN, setCustomN] = useState<number>(5);
  const [customV, setCustomV] = useState<number>(3.0);
  const [customTilt, setCustomTilt] = useState<number>(0);
  const [useCustom, setUseCustom] = useState<boolean>(false);

  const selectedPreset =
    PRESETS.find((p) => p.id === activeId) ?? PRESETS[0];

  const activeConfig: SimulationConfig = useCustom
    ? {
        kind: 'polygon-pursuit',
        n: customN,
        R0: 10,
        v0: customV,
        stepSkip: 1,
        tiltDeg: customTilt,
        clockwise: false,
      }
    : selectedPreset.config;

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-semibold text-[#6D28D9]">
          Laboratorium Eksperimen Virtual
        </div>
        <h2 className="text-2xl font-bold text-[#1E1433] mt-1">
          Galeri Animasi Fisika Interaktif
        </h2>
        <p className="text-sm text-[#5B4D7A] mt-1">
          Bandingkan seluruh variasi fenomena kejar-kejaran dari 15 soal atau ubah parameter secara bebas untuk mengamati perubahan lintasan spiral dan kecepatan radial.
        </p>
      </div>

      {/* Mode Switcher: Preset vs Custom Sandbox */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setUseCustom(false)}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            !useCustom
              ? 'bg-[#4C1D95] text-white'
              : 'bg-white border border-[#E4DDF7] text-[#4C1D95]'
          }`}
        >
          8 Skenario Terkurasi
        </button>
        <button
          type="button"
          onClick={() => setUseCustom(true)}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            useCustom
              ? 'bg-[#4C1D95] text-white'
              : 'bg-white border border-[#E4DDF7] text-[#4C1D95]'
          }`}
        >
          Eksperimen Parameter Bebas (Sandbox)
        </button>
      </div>

      {!useCustom ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActiveId(p.id)}
              className={`text-left rounded-xl border p-3 transition-colors cursor-pointer ${
                activeId === p.id
                  ? 'bg-[#F5F2FF] border-[#6D28D9] text-[#1E1433]'
                  : 'bg-white border-[#E4DDF7] text-[#473B66] hover:border-[#A78BFA]'
              }`}
            >
              <div className="text-xs font-bold">{p.label}</div>
            </button>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-[#E4DDF7] bg-white p-4 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label
              htmlFor="sandbox-n"
              className="flex justify-between text-xs font-semibold text-[#1E1433]"
            >
              <span>Jumlah Partikel (N)</span>
              <span className="font-mono text-[#6D28D9]">{customN} sisi</span>
            </label>
            <input
              id="sandbox-n"
              type="range"
              min={3}
              max={10}
              step={1}
              value={customN}
              onChange={(e) => setCustomN(Number(e.target.value))}
              className="mt-2 w-full accent-[#6D28D9]"
            />
          </div>

          <div>
            <label
              htmlFor="sandbox-v"
              className="flex justify-between text-xs font-semibold text-[#1E1433]"
            >
              <span>Kelajuan Konstan (v)</span>
              <span className="font-mono text-[#6D28D9]">
                {customV.toFixed(1).replace('.', ',')} m/s
              </span>
            </label>
            <input
              id="sandbox-v"
              type="range"
              min={1}
              max={8}
              step={0.5}
              value={customV}
              onChange={(e) => setCustomV(Number(e.target.value))}
              className="mt-2 w-full accent-[#6D28D9]"
            />
          </div>

          <div>
            <label
              htmlFor="sandbox-tilt"
              className="flex justify-between text-xs font-semibold text-[#1E1433]"
            >
              <span>Sudut Miring ke Dalam (φ)</span>
              <span className="font-mono text-[#6D28D9]">{customTilt}°</span>
            </label>
            <input
              id="sandbox-tilt"
              type="range"
              min={0}
              max={30}
              step={5}
              value={customTilt}
              onChange={(e) => setCustomTilt(Number(e.target.value))}
              className="mt-2 w-full accent-[#6D28D9]"
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8">
          <PhysicsCanvas
            config={activeConfig}
            title={
              useCustom
                ? `Simulasi Sandbox: Segi-${customN} (v = ${customV.toFixed(1).replace('.', ',')} m/s, φ = ${customTilt}°)`
                : selectedPreset.label
            }
          />
        </div>
        <div className="lg:col-span-4 space-y-4">
          <StimulusDiagram
            config={activeConfig}
            title={useCustom ? `Konfigurasi Segi-${customN}` : selectedPreset.label}
          />
          <div className="rounded-xl border border-[#E4DDF7] bg-white p-4">
            <h3 className="text-sm font-bold text-[#1E1433]">
              Catatan Fenomena Fisis
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-[#473B66]">
              {useCustom
                ? `Pada segi-${customN} dengan sudut miring tambahan ${customTilt}° ke dalam, laju pendekatan ke pusat menjadi lebih cepat saat N kecil atau φ besar. Jalankan simulasi untuk membuktikan nilai R(t) dan a(t)!`
                : selectedPreset.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
