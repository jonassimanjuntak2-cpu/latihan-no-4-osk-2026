import { ProblemItem, SimulationConfig } from '../types/physics';

interface StimulusDiagramProps {
  config: SimulationConfig;
  problem?: ProblemItem;
  title?: string;
}

export function StimulusDiagram({ config, problem, title }: StimulusDiagramProps) {
  const width = 380;
  const height = 270;
  const cx = width / 2;
  const cy = height / 2 + 4;

  if (config.kind === 'linear-pursuit') {
    const startX = 95;
    const targetY = 210;
    const pursuerY = 55;
    return (
      <figure className="rounded-xl border border-[#E4DDF7] bg-white p-3">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto max-h-[260px]"
          role="img"
          aria-label={title || 'Diagram Stimulus Kurva Kejar Kartesius'}
        >
          <defs>
            <marker
              id="arrow-purple"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#6D28D9" />
            </marker>
            <marker
              id="arrow-emerald"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#059669" />
            </marker>
          </defs>

          {/* Axes */}
          <line x1="50" y1={targetY} x2="345" y2={targetY} stroke="#CBD5E1" strokeWidth="1.5" />
          <line x1={startX} y1="235" x2={startX} y2="25" stroke="#CBD5E1" strokeWidth="1.5" />
          <text x="348" y={targetY + 4} fontSize="11" fill="#475569" fontFamily="IBM Plex Mono">
            x
          </text>
          <text x={startX - 4} y="18" fontSize="11" fill="#475569" fontFamily="IBM Plex Mono">
            y
          </text>

          {/* Curved pursuit preview (illustrative dashed) */}
          <path
            d={`M ${startX} ${pursuerY} Q ${startX + 35} ${targetY - 25}, 280 ${targetY}`}
            fill="none"
            stroke="#A78BFA"
            strokeWidth="2"
            strokeDasharray="5 4"
          />

          {/* Distance L dimension */}
          <line x1={startX - 24} y1={pursuerY} x2={startX - 24} y2={targetY} stroke="#64748B" strokeWidth="1.2" />
          <line x1={startX - 29} y1={pursuerY} x2={startX - 19} y2={pursuerY} stroke="#64748B" strokeWidth="1.2" />
          <line x1={startX - 29} y1={targetY} x2={startX - 19} y2={targetY} stroke="#64748B" strokeWidth="1.2" />
          <text x={startX - 32} y={(pursuerY + targetY) / 2 + 4} textAnchor="end" fontSize="11" fill="#1E1433" fontFamily="IBM Plex Mono">
            L = {config.L} m
          </text>

          {/* Velocity vectors */}
          <line
            x1={startX}
            y1={pursuerY}
            x2={startX}
            y2={pursuerY + 52}
            stroke="#6D28D9"
            strokeWidth="2.4"
            markerEnd="url(#arrow-purple)"
          />
          <text x={startX + 10} y={pursuerY + 34} fontSize="11" fill="#5B21B6" fontWeight="600">
            v = {config.v} m/s
          </text>

          <line
            x1={startX}
            y1={targetY}
            x2={startX + 74}
            y2={targetY}
            stroke="#059669"
            strokeWidth="2.4"
            markerEnd="url(#arrow-emerald)"
          />
          <text x={startX + 18} y={targetY + 18} fontSize="11" fill="#047857" fontWeight="600">
            u = {config.u} m/s
          </text>

          {/* Particles */}
          <circle cx={startX} cy={pursuerY} r="7" fill="#6D28D9" stroke="#FFFFFF" strokeWidth="2" />
          <text x={startX + 12} y={pursuerY - 4} fontSize="12" fontWeight="700" fill="#1E1433">
            A (0, L)
          </text>

          <circle cx={startX} cy={targetY} r="7" fill="#059669" stroke="#FFFFFF" strokeWidth="2" />
          <text x={startX - 42} y={targetY + 18} fontSize="12" fontWeight="700" fill="#1E1433">
            B (0, 0)
          </text>
        </svg>
        <figcaption className="mt-2 text-xs text-[#5B4D7A] text-center">
          {title || problem?.stimulusType || 'Diagram Stimulus Pengejaran Koordinat Kartesius'}
        </figcaption>
      </figure>
    );
  }

  // Polygon Pursuit SVG Stimulus
  const Rvis = 86;
  const n = config.n;
  const dirSign = config.clockwise ? -1 : 1;
  const points = Array.from({ length: n }, (_, i) => {
    const angle = Math.PI / 2 + dirSign * ((i * 2 * Math.PI) / n);
    // SVG y points downward, so negate sin(angle)
    return {
      x: cx + Rvis * Math.cos(angle),
      y: cy - Rvis * Math.sin(angle),
      angle,
    };
  });

  const polygonPath =
    points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ') + ' Z';

  return (
    <figure className="rounded-xl border border-[#E4DDF7] bg-white p-3">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto max-h-[260px]"
        role="img"
        aria-label={title || `Diagram Stimulus Segi-${n} Beraturan`}
      >
        <defs>
          <marker
            id="stim-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="5.5"
            markerHeight="5.5"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#7C3AED" />
          </marker>
          <marker
            id="river-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#0284C7" />
          </marker>
        </defs>

        {/* River flow field if currentVx present */}
        {config.currentVx && config.currentVx > 0 && (
          <g opacity="0.75">
            {[46, 135, 224].map((ry) => (
              <line
                key={ry}
                x1="28"
                y1={ry}
                x2="86"
                y2={ry}
                stroke="#0284C7"
                strokeWidth="1.8"
                strokeDasharray="4 3"
                markerEnd="url(#river-arrow)"
              />
            ))}
            <text x="24" y="34" fontSize="10.5" fill="#0369A1" fontWeight="600">
              Arus V_c = {config.currentVx.toFixed(1).replace('.', ',')} m/s →
            </text>
          </g>
        )}

        {/* Circumcircle guide */}
        <circle
          cx={cx}
          cy={cy}
          r={Rvis}
          fill="none"
          stroke="#EDE9FE"
          strokeWidth="1.2"
          strokeDasharray="4 4"
        />

        {/* Polygon perimeter */}
        <path
          d={polygonPath}
          fill="#FAF8FF"
          stroke="#94A3B8"
          strokeWidth="1.5"
        />

        {/* Center point O & radial line */}
        <line
          x1={cx}
          y1={cy}
          x2={points[0].x}
          y2={points[0].y}
          stroke="#CBD5E1"
          strokeWidth="1.2"
          strokeDasharray="3 3"
        />
        <circle cx={cx} cy={cy} r="3" fill="#475569" />
        <text x={cx + 6} y={cy + 4} fontSize="11" fill="#475569" fontWeight="600">
          O
        </text>
        <text x={cx + 6} y={(cy + points[0].y) / 2 + 4} fontSize="10.5" fill="#64748B" fontFamily="IBM Plex Mono">
          R₀
        </text>

        {/* Target lines & velocity vectors */}
        {points.map((p, idx) => {
          const targetIdx = (idx + config.stepSkip) % n;
          const target = points[targetIdx];
          const dx = target.x - p.x;
          const dy = target.y - p.y;
          const len = Math.hypot(dx, dy) || 1;
          const baseAngle = Math.atan2(dy, dx);
          // Rotate inward by tiltDeg if any (dirSign determines inside direction)
          const tiltRad = (config.tiltDeg * Math.PI) / 180;
          const vxAngle = baseAngle - dirSign * tiltRad;
          const vecLen = 36;
          const ex = p.x + vecLen * Math.cos(vxAngle);
          const ey = p.y + vecLen * Math.sin(vxAngle);

          return (
            <g key={idx}>
              {config.stepSkip > 1 && (
                <line
                  x1={p.x}
                  y1={p.y}
                  x2={target.x}
                  y2={target.y}
                  stroke="#DDD6FE"
                  strokeWidth="1.2"
                  strokeDasharray="4 3"
                />
              )}
              <line
                x1={p.x}
                y1={p.y}
                x2={ex}
                y2={ey}
                stroke="#7C3AED"
                strokeWidth="2.3"
                markerEnd="url(#stim-arrow)"
              />
              <circle
                cx={p.x}
                cy={p.y}
                r="5.5"
                fill={idx === 0 ? '#4C1D95' : '#6D28D9'}
                stroke="#FFFFFF"
                strokeWidth="1.8"
              />
            </g>
          );
        })}

        {/* Label P1 at top particle */}
        <text
          x={points[0].x + 9}
          y={points[0].y - 6}
          fontSize="11"
          fontWeight="700"
          fill="#4C1D95"
        >
          P₁
        </text>

        {/* Side length annotation when helpful */}
        {n >= 3 && (
          <text
            x={width - 12}
            y={height - 12}
            textAnchor="end"
            fontSize="10.5"
            fill="#5B4D7A"
            fontFamily="IBM Plex Mono"
          >
            {config.stepSkip === 2
              ? 'P_i -> P_(i+2) (Pentagram)'
              : config.tiltDeg > 0
                ? `φ = ${config.tiltDeg}° ke dalam`
                : `Segi-${n} beraturan`}
          </text>
        )}
      </svg>
      <figcaption className="mt-2 text-xs text-[#5B4D7A] text-center">
        {title || problem?.stimulusType || `Skema Konfigurasi Awal Segi-${n} Beraturan`}
      </figcaption>
    </figure>
  );
}
