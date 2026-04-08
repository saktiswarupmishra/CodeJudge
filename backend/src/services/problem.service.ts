/**
 * Problem Service
 * CRUD operations for coding problems + stats, tags, bookmarks
 */
import { Difficulty, SubmissionResult } from '@prisma/client';
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
   * Get all problems (with optional filters + user solve status)
   */
  static async getAll(filters?: {
    difficulty?: Difficulty;
    tag?: string;
    search?: string;
    page?: number;
    limit?: number;
    sort?: string;
    order?: string;
    status?: string;
    userId?: number;
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

    // Determine sort order
    const sortField = filters?.sort || 'id';
    const sortOrder = filters?.order === 'desc' ? 'desc' : 'asc';
    const orderBy: any = {};
    if (sortField === 'title' || sortField === 'difficulty' || sortField === 'id' || sortField === 'createdAt') {
      orderBy[sortField] = sortOrder;
    } else {
      orderBy.id = 'asc';
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
          submissions: {
            select: {
              result: true,
            },
          },
        },
        orderBy,
        skip,
        take: limit,
      }),
      prisma.problem.count({ where }),
    ]);

    // Filter by tag if specified (JSON field)
    let filtered = problems;
    if (filters?.tag) {
      const tagsFilter = filters.tag.split(',').map(t => t.trim().toLowerCase());
      filtered = problems.filter((p) => {
        const tags = (p.tags as string[]) || [];
        return tagsFilter.some(ft => tags.some((t: string) => t.toLowerCase() === ft));
      });
    }

    // Calculate acceptance rate and user status
    let userSolvedIds = new Set<number>();
    let userAttemptedIds = new Set<number>();
    if (filters?.userId) {
      const userSubs = await prisma.submission.findMany({
        where: { userId: filters.userId },
        select: { problemId: true, result: true },
      });
      for (const s of userSubs) {
        if (s.result === SubmissionResult.ACCEPTED) {
          userSolvedIds.add(s.problemId);
        } else {
          userAttemptedIds.add(s.problemId);
        }
      }
    }

    const enriched = filtered.map((p) => {
      const totalSubs = p.submissions.length;
      const acceptedSubs = p.submissions.filter(s => s.result === SubmissionResult.ACCEPTED).length;
      const acceptanceRate = totalSubs > 0 ? Math.round((acceptedSubs / totalSubs) * 1000) / 10 : 0;

      let userStatus = 'todo';
      if (userSolvedIds.has(p.id)) userStatus = 'solved';
      else if (userAttemptedIds.has(p.id)) userStatus = 'attempted';

      const { submissions, ...rest } = p;
      return {
        ...rest,
        acceptanceRate,
        totalSubmissions: totalSubs,
        userStatus,
      };
    });

    // Filter by status if specified
    let finalList = enriched;
    if (filters?.status && filters.status !== 'all') {
      finalList = enriched.filter(p => p.userStatus === filters.status);
    }

    // Sort by acceptance rate if requested
    if (sortField === 'acceptanceRate') {
      finalList.sort((a, b) => sortOrder === 'asc' ? a.acceptanceRate - b.acceptanceRate : b.acceptanceRate - a.acceptanceRate);
    }

    return {
      problems: finalList,
      pagination: {
        page,
        limit,
        total: filters?.status && filters.status !== 'all' ? finalList.length : total,
        totalPages: Math.ceil((filters?.status && filters.status !== 'all' ? finalList.length : total) / limit),
      },
    };
  }

  /**
   * Get all unique tags
   */
  static async getAllTags() {
    const problems = await prisma.problem.findMany({
      select: { tags: true },
    });
    const tagSet = new Set<string>();
    for (const p of problems) {
      const tags = (p.tags as string[]) || [];
      tags.forEach((t: string) => tagSet.add(t));
    }
    return Array.from(tagSet).sort();
  }

  /**
   * Get platform stats (total problems, users, submissions)
   */
  static async getPlatformStats() {
    const [totalProblems, totalUsers, totalSubmissions] = await Promise.all([
      prisma.problem.count(),
      prisma.user.count(),
      prisma.submission.count(),
    ]);

    const difficultyBreakdown = await prisma.problem.groupBy({
      by: ['difficulty'],
      _count: { id: true },
    });

    return {
      totalProblems,
      totalUsers,
      totalSubmissions,
      difficultyBreakdown: {
        EASY: difficultyBreakdown.find(d => d.difficulty === 'EASY')?._count.id || 0,
        MEDIUM: difficultyBreakdown.find(d => d.difficulty === 'MEDIUM')?._count.id || 0,
        HARD: difficultyBreakdown.find(d => d.difficulty === 'HARD')?._count.id || 0,
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

    // Calculate acceptance rate
    const acceptedCount = await prisma.submission.count({
      where: { problemId: id, result: SubmissionResult.ACCEPTED },
    });

    return {
      ...problem,
      acceptanceRate: problem._count.submissions > 0
        ? Math.round((acceptedCount / problem._count.submissions) * 1000) / 10
        : 0,
      acceptedCount,
    };
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

  // ─── Bookmark Methods ─────────────────────────

  static async toggleBookmark(userId: number, problemId: number) {
    const existing = await prisma.bookmark.findUnique({
      where: { userId_problemId: { userId, problemId } },
    });
    if (existing) {
      await prisma.bookmark.delete({ where: { id: existing.id } });
      return { bookmarked: false };
    }
    await prisma.bookmark.create({ data: { userId, problemId } });
    return { bookmarked: true };
  }

  static async getBookmarks(userId: number) {
    const bookmarks = await prisma.bookmark.findMany({
      where: { userId },
      include: {
        problem: {
          select: { id: true, title: true, difficulty: true, tags: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    return bookmarks.map(b => b.problem);
  }

  static async isBookmarked(userId: number, problemId: number) {
    const b = await prisma.bookmark.findUnique({
      where: { userId_problemId: { userId, problemId } },
    });
    return !!b;
  }
}
