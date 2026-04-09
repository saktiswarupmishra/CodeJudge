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

const updateProfileSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  bio: z.string().max(500).optional(),
});

const sendOtpSchema = z.object({
  mobile: z.string().min(10),
});

const verifyOtpSchema = z.object({
  mobile: z.string().min(10),
  otp: z.string().length(6),
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

  static async sendMobileOtp(c: Context) {
    try {
      const body = await c.req.json();
      const validated = sendOtpSchema.parse(body);
      await AuthService.sendMobileOtp(validated.mobile);
      return c.json({ success: true, message: 'OTP sent successfully' });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return c.json({ success: false, error: 'Validation failed', details: error.errors }, 400);
      }
      return c.json({ success: false, error: error.message }, 400);
    }
  }

  static async verifyMobileOtp(c: Context) {
    try {
      const body = await c.req.json();
      const validated = verifyOtpSchema.parse(body);
      const result = await AuthService.verifyMobileOtp(validated.mobile, validated.otp);
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

  static async getPublicProfile(c: Context) {
    try {
      const id = parseInt(c.req.param('id'));
      if (isNaN(id)) {
        return c.json({ success: false, error: 'Invalid user ID' }, 400);
      }
      const profile = await AuthService.getPublicProfile(id);
      return c.json({ success: true, data: profile });
    } catch (error: any) {
      return c.json({ success: false, error: error.message }, 404);
    }
  }

  static async updateProfile(c: Context) {
    try {
      const user = c.get('user');
      const body = await c.req.json();
      const validated = updateProfileSchema.parse(body);
      const profile = await AuthService.updateProfile(user.userId, validated);
      return c.json({ success: true, data: profile });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return c.json({ success: false, error: 'Validation failed', details: error.errors }, 400);
      }
      return c.json({ success: false, error: error.message }, 400);
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
