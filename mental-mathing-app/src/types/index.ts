export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Example {
  problem: string;
  steps: string[];
  answer: string;
}

export interface MentalMathTrick {
  id: string;
  name: string;
  difficulty: Difficulty;
  shortDescription: string;
  explanation: string;
  formula: string;
  examples: Example[];
  generateProblem: () => Problem;
  validateAnswer: (problem: Problem, userAnswer: string) => boolean;
  getSolution: (problem: Problem) => Solution;
}

export interface Problem {
  id: string;
  trickId: string;
  question: string;
  correctAnswer: number;
  data: any; // Additional data for solution generation
}

export interface Solution {
  steps: string[];
  answer: string;
}

export interface PracticeSession {
  trickId: string;
  correct: boolean;
  timestamp: number;
}

export interface TrickStats {
  attempts: number;
  correct: number;
  lastPracticed: number | null;
}

export interface UserProgress {
  totalProblems: number;
  totalCorrect: number;
  currentStreak: number;
  bestStreak: number;
  trickStats: Record<string, TrickStats>;
  sessions: PracticeSession[];
}

export interface ThemeColors {
  background: string;
  surface: string;
  surfaceLight: string;
  primary: string;
  primaryDark: string;
  secondary: string;
  text: string;
  textSecondary: string;
  border: string;
  success: string;
  error: string;
  warning: string;
}
