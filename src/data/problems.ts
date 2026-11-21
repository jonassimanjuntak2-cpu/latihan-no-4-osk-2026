import { PROBLEMS_PART_1 } from './problemsPart1';
import { PROBLEMS_PART_2 } from './problemsPart2';
import { ProblemItem } from '../types/physics';

export const ALL_PROBLEMS: ProblemItem[] = [
  ...PROBLEMS_PART_1,
  ...PROBLEMS_PART_2,
];

export function getProblemById(id: number): ProblemItem | undefined {
  return ALL_PROBLEMS.find((p) => p.id === id);
}
