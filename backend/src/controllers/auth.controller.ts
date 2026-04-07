/**
 * Auth Controller
 * Handles HTTP request/response for authentication endpoints
 */
import { Context } from 'hono';
import { z } from 'zod';
import { AuthService } from '../services/auth.service';

// Validation schemas
const registerSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(6).max(100),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export class AuthController {
  static async register(c: Context) {
    try {
      const body = await c.req.json();
      const validated = registerSchema.parse(body);
      const user = await AuthService.register(validated.name, validated.email, validated.password);
      return c.json({ success: true, data: user, message: 'Registration successful' }, 201);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return c.json({ success: false, error: 'Validation failed', details: error.errors }, 400);
      }
      return c.json({ success: false, error: error.message }, 400);
    }
  }

  static async login(c: Context) {
    try {
      const body = await c.req.json();
      const validated = loginSchema.parse(body);
      const result = await AuthService.login(validated.email, validated.password);
      return c.json({ success: true, data: result });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return c.json({ success: false, error: 'Validation failed', details: error.errors }, 400);
      }
      return c.json({ success: false, error: error.message }, 401);
    }
  }

  static async getProfile(c: Context) {
    try {
      const user = c.get('user');
      const profile = await AuthService.getProfile(user.userId);
      return c.json({ success: true, data: profile });
    } catch (error: any) {
      return c.json({ success: false, error: error.message }, 404);
    }
  }

  static async getAllUsers(c: Context) {
    try {
      const users = await AuthService.getAllUsers();
      return c.json({ success: true, data: users });
    } catch (error: any) {
      return c.json({ success: false, error: error.message }, 500);
    }
  }
}
