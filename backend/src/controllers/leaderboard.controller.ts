/**
 * Leaderboard Controller
 */
import { Context } from 'hono';
import { LeaderboardService } from '../services/leaderboard.service';

export class LeaderboardController {
  static async getLeaderboard(c: Context) {
    try {
      const { limit } = c.req.query();
      const leaderboard = await LeaderboardService.getLeaderboard(
        limit ? parseInt(limit) : 50
      );
      return c.json({ success: true, data: leaderboard });
    } catch (error: any) {
      return c.json({ success: false, error: error.message }, 500);
    }
  }

  static async getUserStats(c: Context) {
    try {
      const user = c.get('user');
      const stats = await LeaderboardService.getUserStats(user.userId);
      return c.json({ success: true, data: stats });
    } catch (error: any) {
      return c.json({ success: false, error: error.message }, 500);
    }
  }
}
