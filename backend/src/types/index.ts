/**
 * Type Definitions
 */
import { User } from '@prisma/client';

// JWT payload
export interface JwtPayload {
  userId: number;
  email: string;
  role: string;
}

// Hono context variables
export type Variables = {
  user: JwtPayload;
};

// API response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Submission job data
export interface ExecutionJobData {
  submissionId: number;
  code: string;
  language: string;
  testCases: {
    id: number;
    input: string;
    expectedOutput: string;
  }[];
}

// Execution result
export interface ExecutionResult {
  passed: boolean;
  output: string;
  expectedOutput: string;
  executionTime: number;
  memoryUsage: number;
  error?: string;
}

// Safe user (without password)
export type SafeUser = Omit<User, 'password'>;
