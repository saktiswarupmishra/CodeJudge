/**
 * Leaderboard Service
 * Ranks users by problems solved, accuracy, and speed
 */
import { SubmissionResult } from '@prisma/client';
import { prisma } from '../config/database';

export class LeaderboardService {
  /**
   * Get leaderboard data
   */
  static async getLeaderboard(limit = 50) {
    // Get all users with their submission stats
    const users = await prisma.user.findMany({
      where: { role: 'USER' },
      select: {
        id: true,
        name: true,
        submissions: {
          select: {
            problemId: true,
            result: true,
            executionTime: true,
          },
        },
      },
    });

    const leaderboard = users.map((user) => {
      const totalSubmissions = user.submissions.length;
      const acceptedSubmissions = user.submissions.filter(
        (s) => s.result === SubmissionResult.ACCEPTED
      );

      // Count unique problems solved
      const solvedProblemIds = new Set(acceptedSubmissions.map((s) => s.problemId));
      const problemsSolved = solvedProblemIds.size;

      // Calculate accuracy
      const accuracy = totalSubmissions > 0
        ? ((acceptedSubmissions.length / totalSubmissions) * 100)
        : 0;

      // Average execution time of accepted submissions
      const avgTime = acceptedSubmissions.length > 0
        ? acceptedSubmissions.reduce((sum, s) => sum + (s.executionTime || 0), 0) / acceptedSubmissions.length
        : 0;

      return {
        userId: user.id,
        name: user.name,
        problemsSolved,
        totalSubmissions,
        acceptedSubmissions: acceptedSubmissions.length,
        accuracy: Math.round(accuracy * 100) / 100,
        avgExecutionTime: Math.round(avgTime * 100) / 100,
      };
    });

    // Sort: problems solved (desc), then accuracy (desc), then avg time (asc)
    leaderboard.sort((a, b) => {
      if (b.problemsSolved !== a.problemsSolved) return b.problemsSolved - a.problemsSolved;
      if (b.accuracy !== a.accuracy) return b.accuracy - a.accuracy;
      return a.avgExecutionTime - b.avgExecutionTime;
    });

    // Add rank
    return leaderboard.slice(0, limit).map((entry, index) => ({
      rank: index + 1,
      ...entry,
    }));
  }

  /**
   * Get user stats for dashboard
   */
  static async getUserStats(userId: number) {
    const submissions = await prisma.submission.findMany({
      where: { userId },
      select: {
        problemId: true,
        result: true,
        executionTime: true,
        memoryUsage: true,
        language: true,
        createdAt: true,
      },
    });

    const accepted = submissions.filter((s) => s.result === SubmissionResult.ACCEPTED);
    const solvedProblemIds = new Set(accepted.map((s) => s.problemId));

    // Problems by difficulty
    const solvedProblems = await prisma.problem.findMany({
      where: { id: { in: Array.from(solvedProblemIds) } },
      select: { difficulty: true },
    });

    const difficultyBreakdown = {
      EASY: solvedProblems.filter((p) => p.difficulty === 'EASY').length,
      MEDIUM: solvedProblems.filter((p) => p.difficulty === 'MEDIUM').length,
      HARD: solvedProblems.filter((p) => p.difficulty === 'HARD').length,
    };

    // Language breakdown
    const languageStats: Record<string, number> = {};
    for (const s of accepted) {
      languageStats[s.language] = (languageStats[s.language] || 0) + 1;
    }

    // Recent activity (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentSubmissions = submissions.filter((s) => s.createdAt >= thirtyDaysAgo).length;

    return {
      totalSubmissions: submissions.length,
      acceptedSubmissions: accepted.length,
      problemsSolved: solvedProblemIds.size,
      accuracy: submissions.length > 0
        ? Math.round((accepted.length / submissions.length) * 10000) / 100
        : 0,
      difficultyBreakdown,
      languageStats,
      recentSubmissions,
    };
  }
}
