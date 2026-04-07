/**
 * Submission Service
 * Handles code submission and job queuing
 */
import { Language, SubmissionResult } from '@prisma/client';
import { Queue } from 'bullmq';
import { prisma } from '../config/database';
import { getRedisConnection } from '../config/redis';
import { ExecutionJobData } from '../types';

let executionQueue: Queue | null = null;

function getExecutionQueue(): Queue {
  if (!executionQueue) {
    executionQueue = new Queue('code-execution', {
      connection: getRedisConnection(),
      skipVersionCheck: true,
      defaultJobOptions: {
        removeOnComplete: 100,
        removeOnFail: 50,
        attempts: 1,
      },
    });
  }
  return executionQueue;
}

export class SubmissionService {
  /**
   * Submit code for evaluation against all test cases
   */
  static async submit(userId: number, problemId: number, code: string, language: Language) {
    // Validate problem exists
    const problem = await prisma.problem.findUnique({
      where: { id: problemId },
      include: {
        testCases: true,
      },
    });

    if (!problem) {
      throw new Error('Problem not found');
    }

    if (problem.testCases.length === 0) {
      throw new Error('No test cases available for this problem');
    }

    // Create submission record
    const submission = await prisma.submission.create({
      data: {
        userId,
        problemId,
        code,
        language,
        result: SubmissionResult.PENDING,
      },
    });

    // Queue execution job
    const jobData: ExecutionJobData = {
      submissionId: submission.id,
      code,
      language,
      testCases: problem.testCases.map((tc) => ({
        id: tc.id,
        input: tc.input,
        expectedOutput: tc.output,
      })),
    };

    try {
      await getExecutionQueue().add(`execute-${submission.id}`, jobData, {
        priority: 1,
      });
    } catch (error) {
      // If Redis is not available, mark as error
      await prisma.submission.update({
        where: { id: submission.id },
        data: {
          result: SubmissionResult.RUNTIME_ERROR,
          output: 'Execution queue unavailable. Please try again later.',
        },
      });
    }

    return submission;
  }

  /**
   * Run code against sample (non-hidden) test cases only
   */
  static async run(userId: number, problemId: number, code: string, language: Language) {
    const problem = await prisma.problem.findUnique({
      where: { id: problemId },
      include: {
        testCases: {
          where: { isHidden: false },
        },
      },
    });

    if (!problem) {
      throw new Error('Problem not found');
    }

    // Create submission record (for run mode)
    const submission = await prisma.submission.create({
      data: {
        userId,
        problemId,
        code,
        language,
        result: SubmissionResult.PENDING,
      },
    });

    // Queue with sample test cases only
    const jobData: ExecutionJobData = {
      submissionId: submission.id,
      code,
      language,
      testCases: problem.testCases.map((tc) => ({
        id: tc.id,
        input: tc.input,
        expectedOutput: tc.output,
      })),
    };

    try {
      await getExecutionQueue().add(`run-${submission.id}`, jobData, {
        priority: 2,
      });
    } catch (error) {
      await prisma.submission.update({
        where: { id: submission.id },
        data: {
          result: SubmissionResult.RUNTIME_ERROR,
          output: 'Execution queue unavailable. Please try again later.',
        },
      });
    }

    return submission;
  }

  /**
   * Get submission by ID
   */
  static async getById(submissionId: number, userId?: number) {
    const where: any = { id: submissionId };
    if (userId) {
      where.userId = userId;
    }

    const submission = await prisma.submission.findFirst({
      where,
      include: {
        problem: {
          select: { id: true, title: true, difficulty: true },
        },
        user: {
          select: { id: true, name: true },
        },
      },
    });

    if (!submission) {
      throw new Error('Submission not found');
    }

    return submission;
  }

  /**
   * Get submissions for a problem by user
   */
  static async getByProblem(problemId: number, userId: number) {
    return prisma.submission.findMany({
      where: { problemId, userId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        language: true,
        result: true,
        executionTime: true,
        memoryUsage: true,
        createdAt: true,
      },
      take: 20,
    });
  }

  /**
   * Get all submissions (admin)
   */
  static async getAll(filters?: { page?: number; limit?: number; result?: SubmissionResult }) {
    const page = filters?.page || 1;
    const limit = filters?.limit || 20;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (filters?.result) {
      where.result = filters.result;
    }

    const [submissions, total] = await Promise.all([
      prisma.submission.findMany({
        where,
        include: {
          user: { select: { id: true, name: true, email: true } },
          problem: { select: { id: true, title: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.submission.count({ where }),
    ]);

    return {
      submissions,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get user's submission history
   */
  static async getUserHistory(userId: number, page = 1, limit = 20) {
    const skip = (page - 1) * limit;

    const [submissions, total] = await Promise.all([
      prisma.submission.findMany({
        where: { userId },
        include: {
          problem: { select: { id: true, title: true, difficulty: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.submission.count({ where: { userId } }),
    ]);

    return {
      submissions,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }
}
