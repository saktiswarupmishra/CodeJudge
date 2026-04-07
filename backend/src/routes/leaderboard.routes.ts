/**
 * Leaderboard Routes
 */
import { Hono } from 'hono';
import { LeaderboardController } from '../controllers/leaderboard.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const leaderboardRoutes = new Hono();

// Public leaderboard
leaderboardRoutes.get('/', LeaderboardController.getLeaderboard);

// User stats (requires auth)
leaderboardRoutes.get('/stats', authMiddleware, LeaderboardController.getUserStats);

export default leaderboardRoutes;
