/**
 * Submission Routes
 */
import { Hono } from 'hono';
import { SubmissionController } from '../controllers/submission.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { adminMiddleware } from '../middleware/admin.middleware';

const submissionRoutes = new Hono();

// All submission routes require authentication
submissionRoutes.use('/*', authMiddleware);

submissionRoutes.post('/submit', SubmissionController.submit);
submissionRoutes.post('/run', SubmissionController.run);
submissionRoutes.get('/history', SubmissionController.getUserHistory);
submissionRoutes.get('/all', adminMiddleware, SubmissionController.getAll);
submissionRoutes.get('/problem/:problemId', SubmissionController.getByProblem);
submissionRoutes.get('/:id', SubmissionController.getById);

export default submissionRoutes;
