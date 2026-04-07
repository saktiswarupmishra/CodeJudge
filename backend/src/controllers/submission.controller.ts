/**
 * Submission Controller
 * Handles HTTP request/response for submission endpoints
 */
import { Context } from 'hono';
import { z } from 'zod';
import { SubmissionService } from '../services/submission.service';

const submitSchema = z.object({
  problemId: z.number().int().positive(),
  code: z.string().min(1).max(50000),
  language: z.enum(['CPP', 'JAVA', 'PYTHON', 'JAVASCRIPT']),
});

export class SubmissionController {
  static async submit(c: Context) {
    try {
      const user = c.get('user');
      const body = await c.req.json();
      const validated = submitSchema.parse(body);
      const submission = await SubmissionService.submit(
        user.userId,
        validated.problemId,
        validated.code,
        validated.language
      );
      return c.json({ success: true, data: submission, message: 'Code submitted for evaluation' }, 201);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return c.json({ success: false, error: 'Validation failed', details: error.errors }, 400);
      }
      return c.json({ success: false, error: error.message }, 400);
    }
  }

  static async run(c: Context) {
    try {
      const user = c.get('user');
      const body = await c.req.json();
      const validated = submitSchema.parse(body);
      const submission = await SubmissionService.run(
        user.userId,
        validated.problemId,
        validated.code,
        validated.language
      );
      return c.json({ success: true, data: submission, message: 'Running against sample test cases' }, 201);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return c.json({ success: false, error: 'Validation failed', details: error.errors }, 400);
      }
      return c.json({ success: false, error: error.message }, 400);
    }
  }

  static async getById(c: Context) {
    try {
      const id = parseInt(c.req.param('id'));
      if (isNaN(id)) {
        return c.json({ success: false, error: 'Invalid submission ID' }, 400);
      }
      const user = c.get('user');
      const userId = user.role === 'ADMIN' ? undefined : user.userId;
      const submission = await SubmissionService.getById(id, userId);
      return c.json({ success: true, data: submission });
    } catch (error: any) {
      return c.json({ success: false, error: error.message }, 404);
    }
  }

  static async getByProblem(c: Context) {
    try {
      const problemId = parseInt(c.req.param('problemId'));
      if (isNaN(problemId)) {
        return c.json({ success: false, error: 'Invalid problem ID' }, 400);
      }
      const user = c.get('user');
      const submissions = await SubmissionService.getByProblem(problemId, user.userId);
      return c.json({ success: true, data: submissions });
    } catch (error: any) {
      return c.json({ success: false, error: error.message }, 500);
    }
  }

  static async getUserHistory(c: Context) {
    try {
      const user = c.get('user');
      const { page, limit } = c.req.query();
      const result = await SubmissionService.getUserHistory(
        user.userId,
        page ? parseInt(page) : 1,
        limit ? parseInt(limit) : 20
      );
      return c.json({ success: true, data: result });
    } catch (error: any) {
      return c.json({ success: false, error: error.message }, 500);
    }
  }

  static async getAll(c: Context) {
    try {
      const { page, limit, result } = c.req.query();
      const data = await SubmissionService.getAll({
        page: page ? parseInt(page) : undefined,
        limit: limit ? parseInt(limit) : undefined,
        result: result as any,
      });
      return c.json({ success: true, data });
    } catch (error: any) {
      return c.json({ success: false, error: error.message }, 500);
    }
  }
}
