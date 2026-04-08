/**
 * Problem Routes
 */
import { Hono } from 'hono';
import { ProblemController } from '../controllers/problem.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { adminMiddleware } from '../middleware/admin.middleware';

const problemRoutes = new Hono();

// Public routes
problemRoutes.get('/tags', ProblemController.getAllTags);
problemRoutes.get('/stats', ProblemController.getPlatformStats);

problemRoutes.get('/', (c, next) => {
  // Optional auth — try to authenticate but don't fail
  const authHeader = c.req.header('Authorization');
  if (authHeader) {
    return authMiddleware(c, next);
  }
  return next();
}, ProblemController.getAll);

problemRoutes.get('/:id', (c, next) => {
  const authHeader = c.req.header('Authorization');
  if (authHeader) {
    return authMiddleware(c, next);
  }
  return next();
}, ProblemController.getById);

// Bookmark routes (require auth)
problemRoutes.post('/:id/bookmark', authMiddleware, ProblemController.toggleBookmark);
problemRoutes.get('/:id/bookmarked', authMiddleware, ProblemController.isBookmarked);
problemRoutes.get('/user/bookmarks', authMiddleware, ProblemController.getBookmarks);

// Admin-only routes
problemRoutes.post('/', authMiddleware, adminMiddleware, ProblemController.create);
problemRoutes.put('/:id', authMiddleware, adminMiddleware, ProblemController.update);
problemRoutes.delete('/:id', authMiddleware, adminMiddleware, ProblemController.delete);

// Test case management (admin)
problemRoutes.post('/:id/testcases', authMiddleware, adminMiddleware, ProblemController.addTestCase);
problemRoutes.delete('/:id/testcases/:testCaseId', authMiddleware, adminMiddleware, ProblemController.deleteTestCase);

export default problemRoutes;
