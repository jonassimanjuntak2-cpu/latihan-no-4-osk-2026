import test from 'node:test';
import assert from 'node:assert/strict';
import { ALL_PROBLEMS } from '../data/problems';
import { checkNumericAnswer, summarizeProgress } from './answerChecker';
import { sanitizeForIndonesianSpeech } from './speechUtils';

test('Comma decimal answers are accepted and dot decimals are rejected with clear message', () => {
  const soal1 = ALL_PROBLEMS[0];

  const dotAttempt = checkNumericAnswer('1.7', soal1);
  assert.equal(dotAttempt.status, 'invalid-dot');

  const emptyAttempt = checkNumericAnswer('   ', soal1);
  assert.equal(emptyAttempt.status, 'empty');

  const unitAttempt = checkNumericAnswer('1,7 m', soal1);
  assert.equal(unitAttempt.status, 'invalid-format');

  const noDecimalAttempt = checkNumericAnswer('3', ALL_PROBLEMS[1]);
  assert.equal(noDecimalAttempt.status, 'wrong');

  const validSoal1 = checkNumericAnswer('1,7', soal1);
  assert.equal(validSoal1.status, 'correct');

  const validSoal2 = checkNumericAnswer('3,0', ALL_PROBLEMS[1]);
  assert.equal(validSoal2.status, 'correct');
});

test('All 15 expectedFormatted strings pass checkNumericAnswer', () => {
  for (const problem of ALL_PROBLEMS) {
    const res = checkNumericAnswer(problem.expectedFormatted, problem);
    assert.equal(
      res.status,
      'correct',
      `Expected ${problem.expectedFormatted} to be marked correct for Soal ${problem.id}, got ${res.status}: ${res.message}`
    );
  }
});

test('summarizeProgress computes accurate statistics and weak topics', () => {
  const summary = summarizeProgress(ALL_PROBLEMS, {
    1: {
      problemId: 1,
      lastInput: '1,7',
      isCorrect: true,
      attemptsCount: 1,
      hintsUsed: 0,
      updatedAt: '2026-11-20T00:00:00Z',
    },
    2: {
      problemId: 2,
      lastInput: '9,0',
      isCorrect: false,
      attemptsCount: 2,
      hintsUsed: 1,
      updatedAt: '2026-11-20T00:00:00Z',
    },
  });

  assert.equal(summary.totalProblems, 15);
  assert.equal(summary.attemptedCount, 2);
  assert.equal(summary.correctCount, 1);
  assert.equal(summary.wrongCount, 1);
  assert.equal(summary.successRatePercent, 7);
  assert.deepEqual(summary.weakestTopics, [ALL_PROBLEMS[1].subtopic]);
});

test('sanitizeForIndonesianSpeech strips raw LaTeX and formats physics terms naturally', () => {
  const spoken = sanitizeForIndonesianSpeech(
    'Persamaan \\Sigma F = m a dengan \\Delta v dan \\sin(36°) menghasilkan 1,7'
  );
  assert.ok(!spoken.includes('\\'));
  assert.ok(spoken.includes('resultan gaya sigma F'));
  assert.ok(spoken.includes('1 koma 7'));
  assert.ok(spoken.includes('derajat'));
});
