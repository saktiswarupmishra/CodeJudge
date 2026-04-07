/**
 * Problem Service
 * CRUD operations for coding problems
 */
import { Difficulty } from '@prisma/client';
import { prisma } from '../config/database';

interface CreateProblemData {
  title: string;
  description: string;
  difficulty: Difficulty;
  tags: string[];
  constraints?: string;
  testCases: { input: string; output: string; isHidden: boolean }[];
}

interface UpdateProblemData {
  title?: string;
  description?: string;
  difficulty?: Difficulty;
  tags?: string[];
  constraints?: string;
}

export class ProblemService {
  /**
   * Get all problems (with optional filters)
   */
  static async getAll(filters?: {
    difficulty?: Difficulty;
    tag?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const page = filters?.page || 1;
    const limit = filters?.limit || 200;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (filters?.difficulty) {
      where.difficulty = filters.difficulty;
    }

    if (filters?.search) {
      where.title = { contains: filters.search };
    }

    const [problems, total] = await Promise.all([
      prisma.problem.findMany({
        where,
        select: {
          id: true,
          title: true,
          difficulty: true,
          tags: true,
          createdAt: true,
          _count: {
            select: {
              submissions: true,
              testCases: true,
            },
          },
        },
        orderBy: { id: 'asc' },
        skip,
        take: limit,
      }),
      prisma.problem.count({ where }),
    ]);

    // Filter by tag if specified (JSON field)
    let filtered = problems;
    if (filters?.tag) {
      filtered = problems.filter((p) => {
        const tags = (p.tags as string[]) || [];
        return tags.some((t: string) => t.toLowerCase() === filters.tag!.toLowerCase());
      });
    }

    return {
      problems: filtered,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get problem by ID with test cases
   */
  static async getById(id: number, includeHiddenTests = false) {
    const problem = await prisma.problem.findUnique({
      where: { id },
      include: {
        testCases: {
          where: includeHiddenTests ? {} : { isHidden: false },
          select: {
            id: true,
            input: true,
            output: true,
            isHidden: true,
          },
        },
        _count: {
          select: { submissions: true },
        },
      },
    });

    if (!problem) {
      throw new Error('Problem not found');
    }

    return problem;
  }

  /**
   * Create a new problem with test cases (admin)
   */
  static async create(data: CreateProblemData) {
    return prisma.problem.create({
      data: {
        title: data.title,
        description: data.description,
        difficulty: data.difficulty,
        tags: data.tags,
        constraints: data.constraints,
        testCases: {
          create: data.testCases.map((tc) => ({
            input: tc.input,
            output: tc.output,
            isHidden: tc.isHidden,
          })),
        },
      },
      include: { testCases: true },
    });
  }

  /**
   * Update a problem (admin)
   */
  static async update(id: number, data: UpdateProblemData) {
    const problem = await prisma.problem.findUnique({ where: { id } });
    if (!problem) {
      throw new Error('Problem not found');
    }

    return prisma.problem.update({
      where: { id },
      data: {
        ...(data.title && { title: data.title }),
        ...(data.description && { description: data.description }),
        ...(data.difficulty && { difficulty: data.difficulty }),
        ...(data.tags && { tags: data.tags }),
        ...(data.constraints !== undefined && { constraints: data.constraints }),
      },
      include: { testCases: true },
    });
  }

  /**
   * Delete a problem (admin)
   */
  static async delete(id: number) {
    const problem = await prisma.problem.findUnique({ where: { id } });
    if (!problem) {
      throw new Error('Problem not found');
    }

    await prisma.problem.delete({ where: { id } });
    return { message: 'Problem deleted successfully' };
  }

  /**
   * Add test case to a problem (admin)
   */
  static async addTestCase(
    problemId: number,
    data: { input: string; output: string; isHidden: boolean }
  ) {
    return prisma.testCase.create({
      data: {
        problemId,
        input: data.input,
        output: data.output,
        isHidden: data.isHidden,
      },
    });
  }

  /**
   * Delete a test case (admin)
   */
  static async deleteTestCase(testCaseId: number) {
    await prisma.testCase.delete({ where: { id: testCaseId } });
    return { message: 'Test case deleted successfully' };
  }
}
