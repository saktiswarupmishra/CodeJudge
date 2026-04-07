// ─── User ───────────────────────────────────
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    token: string;
  };
  message?: string;
  error?: string;
}

// ─── Problem ────────────────────────────────
export interface Problem {
  id: number;
  title: string;
  description: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  tags: string[];
  constraints?: string;
  createdAt: string;
  testCases?: TestCase[];
  _count?: { submissions: number; testCases: number };
}

export interface TestCase {
  id: number;
  input: string;
  output: string;
  isHidden: boolean;
}

export interface ProblemListResponse {
  success: boolean;
  data: {
    problems: Problem[];
    pagination: Pagination;
  };
}

// ─── Submission ─────────────────────────────
export interface Submission {
  id: number;
  userId: number;
  problemId: number;
  code: string;
  language: 'CPP' | 'JAVA' | 'PYTHON' | 'JAVASCRIPT';
  result: 'PENDING' | 'ACCEPTED' | 'WRONG_ANSWER' | 'TIME_LIMIT_EXCEEDED' | 'RUNTIME_ERROR' | 'COMPILATION_ERROR';
  executionTime?: number;
  memoryUsage?: number;
  output?: string;
  createdAt: string;
  problem?: { id: number; title: string; difficulty: string };
  user?: { id: number; name: string };
}

// ─── Leaderboard ────────────────────────────
export interface LeaderboardEntry {
  rank: number;
  userId: number;
  name: string;
  problemsSolved: number;
  totalSubmissions: number;
  acceptedSubmissions: number;
  accuracy: number;
  avgExecutionTime: number;
}

// ─── Dashboard Stats ────────────────────────
export interface UserStats {
  totalSubmissions: number;
  acceptedSubmissions: number;
  problemsSolved: number;
  accuracy: number;
  difficultyBreakdown: { EASY: number; MEDIUM: number; HARD: number };
  languageStats: Record<string, number>;
  recentSubmissions: number;
}

// ─── Common ─────────────────────────────────
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
