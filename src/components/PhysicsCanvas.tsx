import { useEffect, useRef, useState } from 'react';
import {
  Gauge,
  Pause,
  Play,
  RotateCcw,
  SkipBack,
} from 'lucide-react';
import { SimulationConfig } from '../types/physics';
import {
  evaluateSimulation,
  getSimulationDuration,
  sampleTrajectories,
} from '../utils/physicsEngine';

interface PhysicsCanvasProps {
  config: SimulationConfig;
  title?: string;
  compact?: boolean;
  externalPlayingSignal?: number;
}

function fmt(n: number, decimals = 2): string {
  return n.toFixed(decimals).replace('.', ',');
}

function drawArrow(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color: string,
  width = 2.2
) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  if (len < 3) return;
  const angle = Math.atan2(dy, dx);
  const head = Math.min(9, len * 0.35);

  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(
    x2 - head * Math.cos(angle - Math.PI / 6),
    y2 - head * Math.sin(angle - Math.PI / 6)
  );
  ctx.lineTo(
    x2 - head * Math.cos(angle + Math.PI / 6),
    y2 - head * Math.sin(angle + Math.PI / 6)
  );
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

export function PhysicsCanvas({
  config,
  title = 'Simulasi Pembuktian Fenomena Fisika',
  compact = false,
  externalPlayingSignal,
}: PhysicsCanvasProps) {
  const duration = getSimulationDuration(config);
  const [simTime, setSimTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(1.0);
  const [slowMotion, setSlowMotion] = useState(false);
  const [showComponents, setShowComponents] = useState(true);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const simTimeRef = useRef(0);
  const lastFrameRef = useRef<number | null>(null);

  // Reset when problem/config changes
  useEffect(() => {
    simTimeRef.current = 0;
    setSimTime(0);
    setIsPlaying(false);
  }, [config]);

  // Allow parent narration sync to trigger play
  useEffect(() => {
    if (externalPlayingSignal && externalPlayingSignal > 0) {
      simTimeRef.current = 0;
      setSimTime(0);
      setIsPlaying(true);
    }
  }, [externalPlayingSignal]);

  const effectiveSpeed = slowMotion ? 0.25 : speedMultiplier;

  useEffect(() => {
    if (!isPlaying) {
      lastFrameRef.current = null;
      return;
    }

    let rafId = 0;
    const step = (now: number) => {
      if (lastFrameRef.current === null) {
        lastFrameRef.current = now;
      }
      const dtReal = Math.min(0.05, (now - lastFrameRef.current) / 1000);
      lastFrameRef.current = now;

      const simScale = Math.max(0.6, duration / 5.5);
      const next = simTimeRef.current + dtReal * effectiveSpeed * simScale;
      if (next >= duration) {
        simTimeRef.current = duration;
        setSimTime(duration);
        setIsPlaying(false);
        return;
      }
      simTimeRef.current = next;
      setSimTime(next);
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [isPlaying, effectiveSpeed, duration]);

  const snapshot = evaluateSimulation(config, simTime);

  // Render canvas whenever simTime or config changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const cssW = canvas.clientWidth || 640;
    const cssH = canvas.clientHeight || 360;
    if (canvas.width !== Math.round(cssW * dpr) || canvas.height !== Math.round(cssH * dpr)) {
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.save();
    ctx.scale(dpr, dpr);

    // Background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, cssW, cssH);

    // Coordinate mapping
    let worldMinX = -12;
    let worldMaxX = 12;
    let worldMinY = -12;
    let worldMaxY = 12;

    if (config.kind === 'polygon-pursuit') {
      const driftMax = (config.currentVx ?? 0) * duration;
      const pad = config.R0 * 1.25;
      worldMinX = -pad;
      worldMaxX = Math.max(pad, driftMax + pad);
      worldMinY = -pad;
      worldMaxY = pad;
    } else {
      const xf = config.u * duration;
      const pad = Math.max(config.L, xf) * 0.22;
      worldMinX = -pad;
      worldMaxX = xf + pad;
      worldMinY = -pad * 0.7;
      worldMaxY = config.L + pad * 0.6;
    }

    const worldW = worldMaxX - worldMinX;
    const worldH = worldMaxY - worldMinY;
    const scale = Math.min((cssW - 36) / worldW, (cssH - 36) / worldH);
    const offsetX = (cssW - worldW * scale) / 2;
    const offsetY = (cssH - worldH * scale) / 2;

    const toPx = (wx: number, wy: number) => ({
      x: offsetX + (wx - worldMinX) * scale,
      y: cssH - (offsetY + (wy - worldMinY) * scale),
    });

    // Subtle scientific grid
    ctx.strokeStyle = '#F3F0FF';
    ctx.lineWidth = 1;
    const gridStep = Math.pow(10, Math.floor(Math.log10(Math.max(worldW, worldH) / 4)));
    for (
      let gx = Math.ceil(worldMinX / gridStep) * gridStep;
      gx <= worldMaxX;
      gx += gridStep
    ) {
      const p1 = toPx(gx, worldMinY);
      const p2 = toPx(gx, worldMaxY);
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    }
    for (
      let gy = Math.ceil(worldMinY / gridStep) * gridStep;
      gy <= worldMaxY;
      gy += gridStep
    ) {
      const p1 = toPx(worldMinX, gy);
      const p2 = toPx(worldMaxX, gy);
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    }

    // River current indicators if currentVx > 0
    if (config.kind === 'polygon-pursuit' && config.currentVx && config.currentVx > 0) {
      ctx.save();
      ctx.strokeStyle = '#BAE6FD';
      ctx.fillStyle = '#0284C7';
      ctx.font = '600 11px "IBM Plex Mono", monospace';
      for (let row = 0; row < 4; row++) {
        const yPx = 36 + row * ((cssH - 72) / 3);
        const shift = (simTime * 35) % 80;
        for (let xPx = shift - 40; xPx < cssW; xPx += 80) {
          drawArrow(ctx, xPx, yPx, xPx + 36, yPx, '#BAE6FD', 1.6);
        }
      }
      ctx.fillText(`Arus V_c = ${fmt(config.currentVx, 1)} m/s →`, 14, 22);
      ctx.restore();
    }

    // Initial polygon outline & circumcircle for polygon-pursuit
    if (config.kind === 'polygon-pursuit') {
      const initialSnap = evaluateSimulation(config, 0);
      const c0 = toPx(0, 0);
      ctx.save();
      ctx.strokeStyle = '#E4DDF7';
      ctx.setLineDash([4, 4]);
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(c0.x, c0.y, config.R0 * scale, 0, Math.PI * 2);
      ctx.stroke();

      // Initial polygon ghost
      ctx.beginPath();
      initialSnap.particles.forEach((p, idx) => {
        const pt = toPx(p.x, p.y);
        if (idx === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      });
      ctx.closePath();
      ctx.strokeStyle = '#DDD6FE';
      ctx.stroke();
      ctx.restore();
    } else {
      // Linear axes for Cartesian pursuit
      const oPx = toPx(0, 0);
      const xEnd = toPx(worldMaxX, 0);
      const yEnd = toPx(0, worldMaxY);
      ctx.save();
      ctx.strokeStyle = '#CBD5E1';
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(20, oPx.y);
      ctx.lineTo(xEnd.x, oPx.y);
      ctx.moveTo(oPx.x, cssH - 16);
      ctx.lineTo(oPx.x, yEnd.y);
      ctx.stroke();
      ctx.restore();
    }

    // Trajectory trails
    const trails = sampleTrajectories(config, simTime, 85);
    const trailColors = [
      '#6D28D9',
      '#0284C7',
      '#059669',
      '#D97706',
      '#DB2777',
      '#4F46E5',
      '#0D9488',
      '#9333EA',
    ];
    trails.forEach((pts, idx) => {
      if (pts.length < 2) return;
      ctx.save();
      ctx.strokeStyle = trailColors[idx % trailColors.length];
      ctx.lineWidth = idx === 0 ? 2.4 : 1.7;
      ctx.globalAlpha = idx === 0 ? 0.9 : 0.55;
      ctx.beginPath();
      pts.forEach((w, k) => {
        const p = toPx(w.x, w.y);
        if (k === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.stroke();
      ctx.restore();
    });

    // Current instantaneous connecting lines
    const currCenter = toPx(snapshot.centerX, snapshot.centerY);
    if (config.kind === 'polygon-pursuit' && snapshot.R > 1e-4) {
      ctx.save();
      ctx.strokeStyle = '#7C3AED';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      snapshot.particles.forEach((p, idx) => {
        const pt = toPx(p.x, p.y);
        if (idx === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      });
      ctx.closePath();
      ctx.stroke();

      // If pentagram i -> i+2, draw chord pursuit line for P0 -> P2
      if (config.stepSkip > 1) {
        const p0 = toPx(snapshot.particles[0].x, snapshot.particles[0].y);
        const pTarget = toPx(
          snapshot.particles[config.stepSkip % config.n].x,
          snapshot.particles[config.stepSkip % config.n].y
        );
        ctx.setLineDash([4, 3]);
        ctx.strokeStyle = '#9333EA';
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(pTarget.x, pTarget.y);
        ctx.stroke();
      }
      ctx.restore();

      // Instantaneous center O
      ctx.fillStyle = '#475569';
      ctx.beginPath();
      ctx.arc(currCenter.x, currCenter.y, 3.5, 0, Math.PI * 2);
      ctx.fill();
    } else if (config.kind === 'linear-pursuit') {
      const pA = toPx(snapshot.particles[0].x, snapshot.particles[0].y);
      const pB = toPx(snapshot.particles[1].x, snapshot.particles[1].y);
      ctx.save();
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = '#94A3B8';
      ctx.beginPath();
      ctx.moveTo(pA.x, pA.y);
      ctx.lineTo(pB.x, pB.y);
      ctx.stroke();
      ctx.restore();
    }

    // Draw particles & vectors
    const velScale = Math.min(44, Math.max(22, cssW * 0.06));
    snapshot.particles.forEach((p, idx) => {
      const pt = toPx(p.x, p.y);
      const speedMag = Math.hypot(p.vx, p.vy);

      // Velocity arrow
      if (speedMag > 1e-4 && snapshot.progress < 0.998) {
        const ux = p.vx / speedMag;
        const uy = -p.vy / speedMag; // canvas y inverted
        drawArrow(
          ctx,
          pt.x,
          pt.y,
          pt.x + ux * velScale,
          pt.y + uy * velScale,
          idx === 0 ? '#4C1D95' : '#8B5CF6',
          idx === 0 ? 2.6 : 1.8
        );
      }

      // Radial/tangential component decomposition on Particle 0
      if (
        showComponents &&
        idx === 0 &&
        config.kind === 'polygon-pursuit' &&
        snapshot.R > 0.1 &&
        snapshot.progress < 0.995
      ) {
        const dxCenter = currCenter.x - pt.x;
        const dyCenter = currCenter.y - pt.y;
        const distPx = Math.hypot(dxCenter, dyCenter) || 1;
        const rUx = dxCenter / distPx;
        const rUy = dyCenter / distPx;

        // Radial guide line
        ctx.save();
        ctx.setLineDash([3, 3]);
        ctx.strokeStyle = '#94A3B8';
        ctx.beginPath();
        ctx.moveTo(pt.x, pt.y);
        ctx.lineTo(currCenter.x, currCenter.y);
        ctx.stroke();
        ctx.restore();

        if (snapshot.speed > 1e-4) {
          const radLen = (snapshot.radialSpeed / snapshot.speed) * velScale;
          drawArrow(
            ctx,
            pt.x,
            pt.y,
            pt.x + rUx * radLen,
            pt.y + rUy * radLen,
            '#059669',
            2.2
          );
        }

        // Normal acceleration arrow if significant
        const accMag = Math.hypot(p.ax, p.ay);
        if (accMag > 0.05) {
          const aux = p.ax / accMag;
          const auy = -p.ay / accMag;
          drawArrow(
            ctx,
            pt.x,
            pt.y,
            pt.x + aux * 28,
            pt.y + auy * 28,
            '#DC2626',
            2.0
          );
        }
      }

      // Particle circle
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, idx === 0 ? 6.5 : 5, 0, Math.PI * 2);
      ctx.fillStyle = trailColors[idx % trailColors.length];
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#FFFFFF';
      ctx.stroke();

      // Label P1 or A/B
      ctx.fillStyle = '#1E1433';
      ctx.font = '700 11px "Plus Jakarta Sans", sans-serif';
      if (config.kind === 'linear-pursuit') {
        ctx.fillText(idx === 0 ? 'A' : 'B', pt.x + 9, pt.y - 6);
      } else if (idx === 0) {
        ctx.fillText('P₁', pt.x + 9, pt.y - 6);
      }
    });

    ctx.restore();
  }, [config, duration, simTime, snapshot, showComponents]);

  const handlePlay = () => {
    if (simTime >= duration - 1e-4) {
      simTimeRef.current = 0;
      setSimTime(0);
    }
    setIsPlaying(true);
  };

  const handlePause = () => setIsPlaying(false);

  const handleReplay = () => {
    simTimeRef.current = 0;
    setSimTime(0);
    setIsPlaying(true);
  };

  const handleReset = () => {
    setIsPlaying(false);
    simTimeRef.current = 0;
    setSimTime(0);
  };

  const handleScrub = (val: number) => {
    setIsPlaying(false);
    simTimeRef.current = val;
    setSimTime(val);
  };

  return (
    <div
      className="rounded-xl border border-[#E4DDF7] bg-white p-4"
      data-testid="physics-simulation-box"
      data-sim-time={simTime.toFixed(3)}
      data-sim-playing={String(isPlaying)}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#F1ECFA]">
        <div>
          <h4 className="text-sm font-bold text-[#1E1433]">{title}</h4>
          <p className="text-xs text-[#5B4D7A] mt-0.5">{snapshot.stageLabel}</p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <label className="inline-flex items-center gap-1.5 text-[#4C1D95] cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showComponents}
              onChange={(e) => setShowComponents(e.target.checked)}
              className="accent-[#6D28D9] rounded"
            />
            <span>Tampilkan v_r &amp; a_n</span>
          </label>
        </div>
      </div>

      {/* Canvas Stage */}
      <div className="relative mt-3 rounded-lg border border-[#EDE9FE] bg-white overflow-hidden">
        <canvas
          ref={canvasRef}
          data-testid="physics-canvas"
          className={`w-full block ${compact ? 'h-[260px]' : 'h-[340px]'}`}
        />
        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 px-3 py-2 bg-[#FAF9FF] border-t border-[#F1ECFA] text-[11px] text-[#4C1D95]">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-4 rounded-sm bg-[#4C1D95]" />
            <span>Vektor Kecepatan (v)</span>
          </span>
          {config.kind === 'polygon-pursuit' && (
            <>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-4 rounded-sm bg-[#059669]" />
                <span>Komponen Radial (v_r)</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-4 rounded-sm bg-[#DC2626]" />
                <span>Percepatan Normal (a_n)</span>
              </span>
            </>
          )}
        </div>
      </div>

      {/* Controls Bar */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          {!isPlaying ? (
            <button
              type="button"
              onClick={handlePlay}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#6D28D9] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#5B21B6] transition-colors whitespace-nowrap cursor-pointer"
            >
              <Play className="h-3.5 w-3.5" />
              PLAY
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePause}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#4C1D95] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#3B0764] transition-colors whitespace-nowrap cursor-pointer"
            >
              <Pause className="h-3.5 w-3.5" />
              PAUSE
            </button>
          )}
          <button
            type="button"
            onClick={handleReplay}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#D8CEF4] bg-[#F5F2FF] px-3 py-1.5 text-xs font-semibold text-[#4C1D95] hover:bg-[#EBE5FF] transition-colors whitespace-nowrap cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            REPLAY
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors whitespace-nowrap cursor-pointer"
          >
            <SkipBack className="h-3.5 w-3.5" />
            RESET
          </button>
          <button
            type="button"
            onClick={() => setSlowMotion((prev) => !prev)}
            aria-pressed={slowMotion}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
              slowMotion
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Gauge className="h-3.5 w-3.5" />
            SLOW MOTION {slowMotion ? 'AKTIF' : ''}
          </button>
        </div>

        {/* Speed Selector */}
        <div className="flex items-center gap-1 rounded-lg border border-[#E4DDF7] bg-[#FAF9FF] p-0.5">
          {[0.5, 1.0, 1.5, 2.0].map((sp) => (
            <button
              key={sp}
              type="button"
              onClick={() => {
                setSlowMotion(false);
                setSpeedMultiplier(sp);
              }}
              className={`px-2 py-1 text-xs font-mono rounded-md transition-colors cursor-pointer ${
                !slowMotion && Math.abs(speedMultiplier - sp) < 0.05
                  ? 'bg-[#6D28D9] text-white font-semibold'
                  : 'text-[#5B4D7A] hover:text-[#1E1433]'
              }`}
            >
              {sp.toFixed(1).replace('.', ',')}x
            </button>
          ))}
        </div>
      </div>

      {/* Time Slider */}
      <div className="mt-3 flex items-center gap-3">
        <label
          htmlFor={`slider-${title}`}
          className="text-xs font-mono text-[#4C1D95] whitespace-nowrap tabular-nums"
        >
          t = {fmt(simTime, 2)} / {fmt(duration, 2)} s
        </label>
        <input
          id={`slider-${title}`}
          type="range"
          min={0}
          max={duration}
          step={Math.max(0.01, duration / 200)}
          value={simTime}
          onChange={(e) => handleScrub(Number(e.target.value))}
          className="w-full accent-[#6D28D9] cursor-pointer"
        />
      </div>

      {/* Live Dynamic Physics Readouts */}
      <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        <div className="rounded-lg bg-[#FAF9FF] border border-[#EDE9FE] px-2.5 py-2">
          <div className="text-[11px] text-[#6B5B95]">Jarak Pusat (R)</div>
          <div className="text-sm font-mono font-semibold text-[#1E1433] tabular-nums">
            {fmt(snapshot.R, 2)} m
          </div>
        </div>
        <div className="rounded-lg bg-[#FAF9FF] border border-[#EDE9FE] px-2.5 py-2">
          <div className="text-[11px] text-[#6B5B95]">Jarak Tempuh (a)</div>
          <div className="text-sm font-mono font-semibold text-[#4C1D95] tabular-nums">
            {fmt(snapshot.pathLength, 2)} m
          </div>
        </div>
        <div className="rounded-lg bg-[#FAF9FF] border border-[#EDE9FE] px-2.5 py-2">
          <div className="text-[11px] text-[#6B5B95]">Perpindahan (b)</div>
          <div className="text-sm font-mono font-semibold text-[#1E1433] tabular-nums">
            {fmt(snapshot.displacementFromStart, 2)} m
          </div>
        </div>
        <div className="rounded-lg bg-[#FAF9FF] border border-[#EDE9FE] px-2.5 py-2">
          <div className="text-[11px] text-[#6B5B95]">Laju Radial (v_r)</div>
          <div className="text-sm font-mono font-semibold text-[#047857] tabular-nums">
            {fmt(snapshot.radialSpeed, 2)} m/s
          </div>
        </div>
        <div className="rounded-lg bg-[#FAF9FF] border border-[#EDE9FE] px-2.5 py-2">
          <div className="text-[11px] text-[#6B5B95]">Laju Sesaat (v)</div>
          <div className="text-sm font-mono font-semibold text-[#1E1433] tabular-nums">
            {fmt(snapshot.speed, 2)} m/s
          </div>
        </div>
        <div className="rounded-lg bg-[#FAF9FF] border border-[#EDE9FE] px-2.5 py-2">
          <div className="text-[11px] text-[#6B5B95]">Percepatan (a_n)</div>
          <div className="text-sm font-mono font-semibold text-[#B91C1C] tabular-nums">
            {fmt(snapshot.centripetalAccel, 2)} m/s²
          </div>
        </div>
      </div>
    </div>
  );
}
