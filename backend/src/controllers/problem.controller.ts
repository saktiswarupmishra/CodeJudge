/**
 * Problem Controller
 * Handles HTTP request/response for problem endpoints
 */
import { Context } from 'hono';
import { z } from 'zod';
import { ProblemService } from '../services/problem.service';

const createProblemSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']),
  tags: z.array(z.string()).default([]),
  constraints: z.string().optional(),
  testCases: z.array(z.object({
    input: z.string(),
    output: z.string(),
    isHidden: z.boolean().default(false),
  })).min(1),
});

const updateProblemSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  description: z.string().min(1).optional(),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']).optional(),
  tags: z.array(z.string()).optional(),
  constraints: z.string().optional(),
});

export class ProblemController {
  static async getAll(c: Context) {
    try {
      const { difficulty, tag, search, page, limit } = c.req.query();
      const result = await ProblemService.getAll({
        difficulty: difficulty as any,
        tag,
        search,
        page: page ? parseInt(page) : undefined,
        limit: limit ? parseInt(limit) : undefined,
      });
      return c.json({ success: true, data: result });
    } catch (error: any) {
      return c.json({ success: false, error: error.message }, 500);
    }
  }

  static async getById(c: Context) {
    try {
      const id = parseInt(c.req.param('id'));
      if (isNaN(id)) {
        return c.json({ success: false, error: 'Invalid problem ID' }, 400);
      }
      const user = c.get('user');
      const includeHidden = user?.role === 'ADMIN';
      const problem = await ProblemService.getById(id, includeHidden);
      return c.json({ success: true, data: problem });
    } catch (error: any) {
      return c.json({ success: false, error: error.message }, 404);
    }
  }

  static async create(c: Context) {
    try {
      const body = await c.req.json();
      const validated = createProblemSchema.parse(body);
      const problem = await ProblemService.create(validated);
      return c.json({ success: true, data: problem, message: 'Problem created' }, 201);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return c.json({ success: false, error: 'Validation failed', details: error.errors }, 400);
      }
      return c.json({ success: false, error: error.message }, 400);
    }
  }

  static async update(c: Context) {
    try {
      const id = parseInt(c.req.param('id'));
      if (isNaN(id)) {
        return c.json({ success: false, error: 'Invalid problem ID' }, 400);
      }
      const body = await c.req.json();
      const validated = updateProblemSchema.parse(body);
      const problem = await ProblemService.update(id, validated);
      return c.json({ success: true, data: problem });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return c.json({ success: false, error: 'Validation failed', details: error.errors }, 400);
      }
      return c.json({ success: false, error: error.message }, 400);
    }
  }

  static async delete(c: Context) {
    try {
      const id = parseInt(c.req.param('id'));
      if (isNaN(id)) {
        return c.json({ success: false, error: 'Invalid problem ID' }, 400);
      }
      const result = await ProblemService.delete(id);
      return c.json({ success: true, data: result });
    } catch (error: any) {
      return c.json({ success: false, error: error.message }, 404);
    }
  }

  static async addTestCase(c: Context) {
    try {
      const problemId = parseInt(c.req.param('id'));
      const body = await c.req.json();
      const testCase = await ProblemService.addTestCase(problemId, body);
      return c.json({ success: true, data: testCase }, 201);
    } catch (error: any) {
      return c.json({ success: false, error: error.message }, 400);
    }
  }

  static async deleteTestCase(c: Context) {
    try {
      const testCaseId = parseInt(c.req.param('testCaseId'));
      const result = await ProblemService.deleteTestCase(testCaseId);
      return c.json({ success: true, data: result });
    } catch (error: any) {
      return c.json({ success: false, error: error.message }, 404);
    }
  }
}
