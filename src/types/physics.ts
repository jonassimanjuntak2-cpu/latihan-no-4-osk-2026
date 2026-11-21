export type MenuViewId =
  | 'beranda'
  | 'analisis'
  | 'teori'
  | 'galeri'
  | 'latihan'
  | 'fbd-lab'
  | 'progres'
  | 'tentang';

export type DifficultyTier =
  | 'Tingkat 1 · Penguatan Dasar'
  | 'Tingkat 2 · Variasi Parameter'
  | 'Tingkat 3 · Variasi Konfigurasi'
  | 'Tingkat 4 · Kombinasi Konsep'
  | 'Tingkat 5 · Olimpiade Kompleks';

export interface PolygonPursuitConfig {
  kind: 'polygon-pursuit';
  n: number;
  R0: number; // initial circumradius (m)
  v0: number; // constant speed (m/s), or 0 if tangentialAccel > 0
  stepSkip: number; // 1 = adjacent, 2 = skip one (pentagram)
  tiltDeg: number; // inward tilt angle from side/chord toward center (deg)
  clockwise: boolean;
  stopSideLength?: number; // optional target side length s_f (m)
  tangentialAccel?: number; // optional constant tangential acceleration a_t (m/s^2)
  currentVx?: number; // optional uniform drift velocity along +x (m/s)
  massKg?: number; // optional particle mass for force display (kg)
  highlightTargetFraction?: number; // e.g., 0.5 for half path or R target
  labelPrefix?: string;
}

export interface LinearPursuitConfig {
  kind: 'linear-pursuit';
  L: number; // initial y-separation (m)
  u: number; // target x-speed (m/s)
  v: number; // pursuer speed (m/s)
}

export type SimulationConfig = PolygonPursuitConfig | LinearPursuitConfig;

export interface FbdVectorItem {
  id: string;
  label: string;
  spokenLabel: string;
  color: string;
  /** Direction angle in degrees (standard math angle CCW from +x, applied at reference particle) */
  angleDeg: number;
  lengthRatio: number; // 0.3..1.0 visual scale
  category: 'axis' | 'velocity' | 'component' | 'force' | 'acceleration';
  explanation: string;
}

export interface FbdStep {
  stepNumber: number;
  title: string;
  description: string;
  visibleVectorIds: string[];
  equationLatex?: string;
}

export interface FbdSpec {
  objectName: string;
  frameDescription: string;
  hasRealForce: boolean; // true when net centripetal/normal force is analyzed, false for pure kinematics velocity diagram
  referenceAngleDeg: number; // position angle of analyzed particle from center
  vectors: FbdVectorItem[];
  steps: FbdStep[];
}

export interface SolutionSection {
  id: string;
  title: string;
  highlightType?: 'rumus' | 'prinsip' | 'kritis' | 'hasil' | 'none';
  paragraphs: string[];
  equations?: string[];
  spokenText: string;
}

export interface ProblemItem {
  id: number;
  shortTitle: string;
  tier: DifficultyTier;
  tierIndex: 1 | 2 | 3 | 4 | 5;
  subtopic: string;
  stimulusType: string;
  questionText: string;
  knownData: { symbol: string; label: string; valueWithUnit: string }[];
  askedQuantity: { symbol: string; label: string; unit: string };
  answerUnitLabel: string;
  exactValue: number;
  expectedFormatted: string; // e.g. "1,7"
  tolerance: number;
  hints: string[];
  conceptualFeedbackOnWrong: string;
  conceptualFeedbackOnRight: string;
  simulation: SimulationConfig;
  fbd: FbdSpec;
  solutionSections: SolutionSection[];
  problemSpokenText: string;
}

export interface TheoryLevel {
  level: 1 | 2 | 3 | 4 | 5;
  code: string;
  title: string;
  subtitle: string;
  summary: string;
  keyTakeaways: string[];
  sections: {
    heading: string;
    body: string[];
    equations?: { latex: string; caption: string }[];
    callout?: { label: string; text: string };
  }[];
  numericExample: {
    title: string;
    given: string;
    steps: string[];
    result: string;
  };
  simulationPreset: SimulationConfig;
  spokenScript: string;
}

export interface ProblemAttemptRecord {
  problemId: number;
  lastInput: string;
  isCorrect: boolean;
  attemptsCount: number;
  hintsUsed: number;
  updatedAt: string;
}

export interface UserProgressState {
  attempts: Record<number, ProblemAttemptRecord>;
  completedTheoryLevels: number[];
  lastVisitedProblemId: number;
}
