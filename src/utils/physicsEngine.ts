import {
  LinearPursuitConfig,
  PolygonPursuitConfig,
  SimulationConfig,
} from '../types/physics';

export interface ParticleState {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  ax: number;
  ay: number;
}

export interface SimulationSnapshot {
  t: number;
  duration: number;
  progress: number; // 0..1
  particles: ParticleState[];
  centerX: number;
  centerY: number;
  R: number; // current radius or separation (m)
  sideLength: number; // current neighbor side length (m)
  pathLength: number; // distance traveled by particle 0 in ground/water frame (m)
  speed: number; // current speed (m/s)
  radialSpeed: number; // inward radial speed (m/s)
  tangentialSpeed: number; // tangential speed (m/s)
  omega: number; // angular speed (rad/s)
  centripetalAccel: number; // normal acceleration (m/s^2)
  forceMagnitude: number; // m * a_n (N) if mass provided
  deltaThetaRad: number; // rotation angle accumulated (rad)
  displacementFromStart: number; // straight-line displacement of particle 0 (m)
  stageLabel: string;
}

const DEG2RAD = Math.PI / 180;

export function getPolygonInwardAngleRad(cfg: PolygonPursuitConfig): number {
  const baseAngle = Math.PI / 2 - (cfg.stepSkip * Math.PI) / cfg.n;
  return baseAngle - cfg.tiltDeg * DEG2RAD;
}

export function computePolygonDuration(cfg: PolygonPursuitConfig): number {
  const alpha = getPolygonInwardAngleRad(cfg);
  const cosAlpha = Math.cos(alpha);
  const targetR =
    cfg.stopSideLength !== undefined
      ? cfg.stopSideLength / (2 * Math.sin(Math.PI / cfg.n))
      : 0;
  const deltaR = Math.max(0, cfg.R0 - targetR);

  if (cfg.tangentialAccel && cfg.tangentialAccel > 0) {
    return Math.sqrt((2 * deltaR) / (cfg.tangentialAccel * cosAlpha));
  }
  return deltaR / (cfg.v0 * cosAlpha);
}

export function computeLinearPursuitDuration(cfg: LinearPursuitConfig): number {
  return (cfg.v * cfg.L) / (cfg.v * cfg.v - cfg.u * cfg.u);
}

export function getSimulationDuration(config: SimulationConfig): number {
  if (config.kind === 'polygon-pursuit') {
    return computePolygonDuration(config);
  }
  return computeLinearPursuitDuration(config);
}

/**
 * Exact analytical trajectory for linear pursuit:
 * B starts at (0,0) moving +x at speed u. A starts at (0, L) moving at speed v toward B.
 */
function solveLinearPursuitAtTime(
  cfg: LinearPursuitConfig,
  tClamped: number,
  duration: number
): SimulationSnapshot {
  const { L, u, v } = cfg;
  const k = u / v;

  if (tClamped <= 0) {
    return {
      t: 0,
      duration,
      progress: 0,
      particles: [
        { id: 0, x: 0, y: L, vx: 0, vy: -v, ax: (v * u) / L, ay: 0 },
        { id: 1, x: 0, y: 0, vx: u, vy: 0, ax: 0, ay: 0 },
      ],
      centerX: 0,
      centerY: L / 2,
      R: L,
      sideLength: L,
      pathLength: 0,
      speed: v,
      radialSpeed: v,
      tangentialSpeed: 0,
      omega: u / L,
      centripetalAccel: (v * u) / L,
      forceMagnitude: 0,
      deltaThetaRad: 0,
      displacementFromStart: 0,
      stageLabel: 'Kondisi Awal: A di (0, L) mulai mengejar B di (0, 0)',
    };
  }

  if (tClamped >= duration) {
    const xf = u * duration;
    return {
      t: duration,
      duration,
      progress: 1,
      particles: [
        { id: 0, x: xf, y: 0, vx: v, vy: 0, ax: 0, ay: 0 },
        { id: 1, x: xf, y: 0, vx: u, vy: 0, ax: 0, ay: 0 },
      ],
      centerX: xf,
      centerY: 0,
      R: 0,
      sideLength: 0,
      pathLength: v * duration,
      speed: v,
      radialSpeed: v - u,
      tangentialSpeed: 0,
      omega: 0,
      centripetalAccel: 0,
      forceMagnitude: 0,
      deltaThetaRad: Math.PI / 2,
      displacementFromStart: Math.hypot(xf, L),
      stageLabel: 'Titik Tangkap: Partikel A berhasil menyusul B pada sumbu-x',
    };
  }

  // Invert monotonic t(y) via bisection for y in [0, L]
  let lo = 0;
  let hi = L;
  for (let iter = 0; iter < 40; iter++) {
    const mid = 0.5 * (lo + hi);
    const ratio = mid / L;
    const tMid =
      duration -
      (L / (2 * v)) *
        (Math.pow(ratio, 1 - k) / (1 - k) + Math.pow(ratio, 1 + k) / (1 + k));
    if (tMid > tClamped) {
      lo = mid;
    } else {
      hi = mid;
    }
  }
  const yA = 0.5 * (lo + hi);
  const ratio = yA / L;
  const xA =
    (L / 2) *
    ((1 - Math.pow(ratio, 1 - k)) / (1 - k) -
      (1 - Math.pow(ratio, 1 + k)) / (1 + k));
  const xB = u * tClamped;
  const dx = xB - xA;
  const dy = -yA;
  const dist = Math.hypot(dx, dy);
  const vxA = dist > 1e-9 ? (v * dx) / dist : v;
  const vyA = dist > 1e-9 ? (v * dy) / dist : 0;

  // Normal acceleration of A: a_n = v * d(angle)/dt = v * (u * yA / dist^2)
  const omega = dist > 1e-6 ? (u * yA) / (dist * dist) : 0;
  const centripetalAccel = v * omega;
  const axA = -centripetalAccel * (vyA / v);
  const ayA = centripetalAccel * (vxA / v);

  const progress = tClamped / duration;
  const stageLabel =
    progress < 0.35
      ? 'Fase Awal: A membelok tajam mengejar B yang bergerak ke kanan'
      : progress < 0.8
        ? 'Fase Pengejaran: Jarak r menyusut dengan laju dr/dt = u cos(alpha) - v'
        : 'Fase Akhir: A sejajar mendekati B tepat sebelum penangkapan';

  return {
    t: tClamped,
    duration,
    progress,
    particles: [
      { id: 0, x: xA, y: yA, vx: vxA, vy: vyA, ax: axA, ay: ayA },
      { id: 1, x: xB, y: 0, vx: u, vy: 0, ax: 0, ay: 0 },
    ],
    centerX: 0.5 * (xA + xB),
    centerY: 0.5 * yA,
    R: dist,
    sideLength: dist,
    pathLength: v * tClamped,
    speed: v,
    radialSpeed: dist > 1e-9 ? v - (u * dx) / dist : v - u,
    tangentialSpeed: dist > 1e-9 ? (u * yA) / dist : 0,
    omega,
    centripetalAccel,
    forceMagnitude: 0,
    deltaThetaRad: Math.atan2(dx, yA),
    displacementFromStart: Math.hypot(xA, L - yA),
    stageLabel,
  };
}

export function evaluateSimulation(
  config: SimulationConfig,
  t: number
): SimulationSnapshot {
  const duration = getSimulationDuration(config);
  const tClamped = Math.max(0, Math.min(t, duration));

  if (config.kind === 'linear-pursuit') {
    return solveLinearPursuitAtTime(config, tClamped, duration);
  }

  const alpha = getPolygonInwardAngleRad(config);
  const cosAlpha = Math.cos(alpha);
  const sinAlpha = Math.sin(alpha);
  const tanAlpha = Math.tan(alpha);

  const isAccel = Boolean(config.tangentialAccel && config.tangentialAccel > 0);
  const at = config.tangentialAccel ?? 0;
  const speed = isAccel ? at * tClamped : config.v0;
  const pathLength = isAccel
    ? 0.5 * at * tClamped * tClamped
    : config.v0 * tClamped;

  const Rraw = config.R0 - pathLength * cosAlpha;
  const minR =
    config.stopSideLength !== undefined
      ? config.stopSideLength / (2 * Math.sin(Math.PI / config.n))
      : 0;
  const R = Math.max(minR, Rraw);

  // Cap spiral winding near singularity R->0 for clean visual rendering
  const safeRForAngle = Math.max(R, config.R0 * 0.004);
  const dirSign = config.clockwise ? -1 : 1;
  const deltaThetaRad = tanAlpha * Math.log(config.R0 / safeRForAngle);

  const driftX = (config.currentVx ?? 0) * tClamped;
  // Particle 0 starts at top (pi/2) for crisp symmetric presentation
  const baseStartAngle = Math.PI / 2;

  const particles: ParticleState[] = [];
  for (let i = 0; i < config.n; i++) {
    const theta_i =
      baseStartAngle +
      dirSign * ((i * 2 * Math.PI) / config.n + deltaThetaRad);
    const x = driftX + R * Math.cos(theta_i);
    const y = R * Math.sin(theta_i);

    // Velocity direction in local frame: inward radial angle is theta_i + pi,
    // tilted toward rotation direction dirSign by alpha
    const velAngle = theta_i + Math.PI - dirSign * alpha;
    const vx = (config.currentVx ?? 0) + speed * Math.cos(velAngle);
    const vy = speed * Math.sin(velAngle);

    const omega = R > 1e-4 ? (speed * sinAlpha) / R : 0;
    const centripetalAccel = speed * omega;
    // Normal acceleration points 90 deg from velAngle in dirSign rotation sense
    const normalAngle = velAngle + dirSign * (Math.PI / 2);
    const ax =
      at * Math.cos(velAngle) + centripetalAccel * Math.cos(normalAngle);
    const ay =
      at * Math.sin(velAngle) + centripetalAccel * Math.sin(normalAngle);

    particles.push({ id: i, x, y, vx, vy, ax, ay });
  }

  const radialSpeed = speed * cosAlpha;
  const tangentialSpeed = speed * sinAlpha;
  const omega = R > 1e-4 ? tangentialSpeed / R : 0;
  const centripetalAccel = speed * omega;
  const forceMagnitude = (config.massKg ?? 0) * centripetalAccel;
  const sideLength = 2 * R * Math.sin(Math.PI / config.n);

  // Straight-line displacement of particle 0 from initial position (0, R0)
  const p0 = particles[0];
  const displacementFromStart = Math.hypot(p0.x - 0, p0.y - config.R0);

  const progress = duration > 0 ? tClamped / duration : 1;
  let stageLabel = 'Kondisi Awal: Partikel menempati titik sudut poligon beraturan';
  if (progress > 0.02 && progress < 0.35) {
    stageLabel =
      'Fase Awal: Vektor kecepatan mengarah ke tetangga, membentuk komponen radial & tangensial';
  } else if (progress >= 0.35 && progress < 0.85) {
    stageLabel =
      'Fase Penyusutan Simetris: Poligon menyusut seragam sambil berotasi membentuk spiral logaritmik';
  } else if (progress >= 0.85 && progress < 0.995) {
    stageLabel =
      'Fase Konvergensi: Kelengkungan lintasan membesar tajam saat partikel mendekati titik temu';
  } else if (progress >= 0.995) {
    stageLabel =
      config.stopSideLength !== undefined
        ? `Target Tercapai: Jarak antar partikel mencapai s_f = ${config.stopSideLength.toFixed(1).replace('.', ',')} m`
        : 'Titik Temu: Seluruh partikel bertemu di pusat simetri';
  }

  return {
    t: tClamped,
    duration,
    progress,
    particles,
    centerX: driftX,
    centerY: 0,
    R,
    sideLength,
    pathLength,
    speed,
    radialSpeed,
    tangentialSpeed,
    omega,
    centripetalAccel,
    forceMagnitude,
    deltaThetaRad,
    displacementFromStart,
    stageLabel,
  };
}

/**
 * Generates trajectory trails up to current time t for smooth canvas rendering.
 */
export function sampleTrajectories(
  config: SimulationConfig,
  tEnd: number,
  steps = 90
): { x: number; y: number }[][] {
  const count = config.kind === 'polygon-pursuit' ? config.n : 2;
  const trails: { x: number; y: number }[][] = Array.from(
    { length: count },
    () => []
  );
  if (tEnd <= 0) {
    const snap0 = evaluateSimulation(config, 0);
    snap0.particles.forEach((p, idx) => trails[idx].push({ x: p.x, y: p.y }));
    return trails;
  }

  for (let s = 0; s <= steps; s++) {
    const ts = (tEnd * s) / steps;
    const snap = evaluateSimulation(config, ts);
    snap.particles.forEach((p, idx) => {
      trails[idx].push({ x: p.x, y: p.y });
    });
  }
  return trails;
}
