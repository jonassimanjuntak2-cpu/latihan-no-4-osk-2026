import { ProblemAttemptRecord, ProblemItem } from '../types/physics';

export interface AnswerCheckResult {
  status: 'empty' | 'invalid-dot' | 'invalid-format' | 'correct' | 'wrong';
  parsedValue: number | null;
  message: string;
}

/**
 * Formats a number to exactly 1 decimal place using comma separator (Indonesian format).
 */
export function formatCommaOneDecimal(value: number): string {
  const rounded = Math.round((value + Number.EPSILON) * 10) / 10;
  return rounded.toFixed(1).replace('.', ',');
}

/**
 * Validates and checks a student's numeric short-answer input.
 * Rules from prompt:
 * - Must use comma as decimal separator (e.g., "12,5"), NEVER dot ("12.5").
 * - No units inside the input box.
 * - Result rounded to 1 decimal place.
 */
export function checkNumericAnswer(
  rawInput: string,
  problem: ProblemItem
): AnswerCheckResult {
  const trimmed = rawInput.trim();
  if (!trimmed) {
    return {
      status: 'empty',
      parsedValue: null,
      message:
        'Masukkan jawaban numerik Anda terlebih dahulu (contoh format: 12,5).',
    };
  }

  if (trimmed.includes('.')) {
    return {
      status: 'invalid-dot',
      parsedValue: null,
      message:
        'Format desimal tidak valid: gunakan tanda KOMA (,) sebagai pemisah desimal, bukan titik (.). Contoh benar: ' +
        (trimmed.replace('.', ',') || '12,5') +
        '.',
    };
  }

  // Allow optional leading minus/plus, digits, and optional single comma with digits
  const validCommaRegex = /^[+-]?\d+(,\d+)?$/;
  if (!validCommaRegex.test(trimmed)) {
    return {
      status: 'invalid-format',
      parsedValue: null,
      message:
        'Masukkan hanya angka dengan satu angka desimal bertanda koma (contoh: 1,7 atau 12,0) tanpa menuliskan satuan di dalam kotak jawaban.',
    };
  }

  const normalized = trimmed.replace(',', '.');
  const numericVal = Number(normalized);
  if (!Number.isFinite(numericVal)) {
    return {
      status: 'invalid-format',
      parsedValue: null,
      message: 'Nilai angka tidak dapat dikenali. Periksa kembali penulisan Anda.',
    };
  }

  // Must match either exact rounded 1-decimal string OR be within rational tolerance
  const roundedExpected =
    Math.round((problem.exactValue + Number.EPSILON) * 10) / 10;
  const diffFromRounded = Math.abs(numericVal - roundedExpected);
  const diffFromExact = Math.abs(numericVal - problem.exactValue);

  // Check if user entered exactly 1 decimal place matching the target
  const hasOneDecimal = /^[+-]?\d+,\d$/.test(trimmed);

  if (
    diffFromRounded <= problem.tolerance ||
    diffFromExact <= problem.tolerance
  ) {
    if (!hasOneDecimal) {
      return {
        status: 'wrong',
        parsedValue: numericVal,
        message: `Nilai numerik Anda sudah mendekati, namun aturan penulisan mewajibkan TEPAT satu angka di belakang koma (contoh: ${problem.expectedFormatted.replace(/\d/g, 'X').slice(0, 1)}..., gunakan format X,Y).`,
      };
    }
    return {
      status: 'correct',
      parsedValue: numericVal,
      message: problem.conceptualFeedbackOnRight,
    };
  }

  return {
    status: 'wrong',
    parsedValue: numericVal,
    message: problem.conceptualFeedbackOnWrong,
  };
}

export interface ProgressSummary {
  totalProblems: number;
  attemptedCount: number;
  correctCount: number;
  wrongCount: number;
  successRatePercent: number;
  masteryLabel: string;
  weakestTopics: string[];
}

export function summarizeProgress(
  problems: ProblemItem[],
  attempts: Record<number, ProblemAttemptRecord>
): ProgressSummary {
  const totalProblems = problems.length;
  const records = Object.values(attempts);
  const attemptedCount = records.length;
  const correctCount = records.filter((r) => r.isCorrect).length;
  const wrongCount = records.filter((r) => !r.isCorrect).length;
  const successRatePercent =
    totalProblems > 0 ? Math.round((correctCount / totalProblems) * 100) : 0;

  let masteryLabel = 'Pemula — Mulai Eksplorasi';
  if (correctCount >= 13) {
    masteryLabel = 'Siap Olimpiade (Mastery)';
  } else if (correctCount >= 9) {
    masteryLabel = 'Mahir — Pemodelan Lanjut';
  } else if (correctCount >= 5) {
    masteryLabel = 'Menengah — Berkembang Baik';
  } else if (attemptedCount >= 1) {
    masteryLabel = 'Dasar — Bangun Fondasi Konsep';
  }

  const weakTopicSet = new Set<string>();
  for (const p of problems) {
    const rec = attempts[p.id];
    if (rec && !rec.isCorrect) {
      weakTopicSet.add(p.subtopic);
    }
  }

  return {
    totalProblems,
    attemptedCount,
    correctCount,
    wrongCount,
    successRatePercent,
    masteryLabel,
    weakestTopics: Array.from(weakTopicSet),
  };
}
