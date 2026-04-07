/** Shared type for seed problem data */
export interface SeedProblem {
  title: string;
  description: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  tags: string[];
  constraints: string;
  testCases: { input: string; output: string; isHidden: boolean }[];
}
