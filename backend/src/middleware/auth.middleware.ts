/**
 * Auth Middleware
 * Validates JWT token and attaches user to context
 */
import { Context, Next } from 'hono';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { JwtPayload } from '../types';

export async function authMiddleware(c: Context, next: Next) {
  const authHeader = c.req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ success: false, error: 'Authentication required' }, 401);
  }

  const token = authHeader.substring(7);

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    c.set('user', decoded);
    await next();
  } catch (error) {
    return c.json({ success: false, error: 'Invalid or expired token' }, 401);
  }
}
