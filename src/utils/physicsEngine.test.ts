import test from 'node:test';
import assert from 'node:assert/strict';
import { ALL_PROBLEMS } from '../data/problems';
import { evaluateSimulation, getSimulationDuration } from './physicsEngine';
import { formatCommaOneDecimal } from './answerChecker';

const DEG = Math.PI / 180;

test('All 15 problems exist, are sequentially numbered 1..15, and have 12 textbook sections', () => {
  assert.equal(ALL_PROBLEMS.length, 15);
  ALL_PROBLEMS.forEach((p, idx) => {
    assert.equal(p.id, idx + 1);
    assert.equal(p.solutionSections.length, 12);
    assert.ok(p.hints.length >= 2);
    assert.ok(/^\d+,\d$/.test(p.expectedFormatted), `Expected comma format for Soal ${p.id}, got ${p.expectedFormatted}`);
    assert.equal(formatCommaOneDecimal(p.exactValue), p.expectedFormatted, `Rounding mismatch on Soal ${p.id}`);
  });
});

test('Independent analytical checks match all 15 problem answers', () => {
  const expected: Record<number, string> = {
    1: '1,7',
    2: '3,0',
    3: '12,0',
    4: '1,5',
    5: '8,7',
    6: '2,6',
    7: '21,7',
    8: '5,8',
    9: '7,5',
    10: '3,2',
    11: '3,5',
    12: '3,2',
    13: '6,5',
    14: '16,9',
    15: '2,2',
  };

  for (const p of ALL_PROBLEMS) {
    assert.equal(p.expectedFormatted, expected[p.id], `Answer mismatch for Soal ${p.id}`);
  }
});

test('Physics simulation durations and end states agree with exact analytical answers', () => {
  // Soal 1: pentagon ratio a/b = pathLength / R0
  const p1 = ALL_PROBLEMS[0];
  const d1 = getSimulationDuration(p1.simulation);
  const end1 = evaluateSimulation(p1.simulation, d1);
  assert.ok(Math.abs(end1.pathLength / 10 - 1 / Math.sin(36 * DEG)) < 1e-6);

  // Soal 2: triangle T = 3.0s
  const p2 = ALL_PROBLEMS[1];
  assert.ok(Math.abs(getSimulationDuration(p2.simulation) - 3.0) < 1e-6);

  // Soal 5: pentagon s0 = 15, v = 2.5 -> T ≈ 8.6833s
  const p5 = ALL_PROBLEMS[4];
  const end5 = evaluateSimulation(p5.simulation, getSimulationDuration(p5.simulation));
  assert.ok(Math.abs(end5.t - 8.68328157) < 1e-4);

  // Soal 7: stop at s_f = 5.0m -> pathLength ≈ 21.7082m
  const p7 = ALL_PROBLEMS[6];
  const end7 = evaluateSimulation(p7.simulation, getSimulationDuration(p7.simulation));
  assert.ok(Math.abs(end7.sideLength - 5.0) < 1e-6);
  assert.ok(Math.abs(end7.pathLength - 21.7082039) < 1e-4);

  // Soal 9: linear pursuit duration = 7.5s, particles meet at (22.5, 0)
  const p9 = ALL_PROBLEMS[8];
  const d9 = getSimulationDuration(p9.simulation);
  assert.ok(Math.abs(d9 - 7.5) < 1e-9);
  const end9 = evaluateSimulation(p9.simulation, d9);
  assert.ok(Math.abs(end9.particles[0].x - 22.5) < 1e-6);
  assert.ok(Math.abs(end9.particles[0].y) < 1e-6);

  // Soal 10: centripetal accel at R = 4.0m
  const p10 = ALL_PROBLEMS[9];
  const t10 = (10.0 - 4.0) / (4.0 * Math.sin(36 * DEG));
  const snap10 = evaluateSimulation(p10.simulation, t10);
  assert.ok(Math.abs(snap10.R - 4.0) < 1e-6);
  assert.ok(Math.abs(snap10.centripetalAccel - 3.23606798) < 1e-4);

  // Soal 13: accelerated pursuit T ≈ 6.5217s
  const p13 = ALL_PROBLEMS[12];
  const d13 = getSimulationDuration(p13.simulation);
  assert.ok(Math.abs(d13 - 6.52169766) < 1e-5);

  // Soal 14: river frame displacement from north vertex
  const p14 = ALL_PROBLEMS[13];
  const d14 = getSimulationDuration(p14.simulation);
  const end14 = evaluateSimulation(p14.simulation, d14);
  assert.ok(Math.abs(end14.displacementFromStart - 16.8891486) < 1e-4);

  // Soal 15: pentagram half path -> R = 5.0m -> a_n ≈ 2.2249 m/s^2
  const p15 = ALL_PROBLEMS[14];
  const d15 = getSimulationDuration(p15.simulation);
  const half15 = evaluateSimulation(p15.simulation, d15 * 0.5);
  assert.ok(Math.abs(half15.R - 5.0) < 1e-6);
  assert.ok(Math.abs(half15.centripetalAccel - 2.2249223) < 1e-4);
});
