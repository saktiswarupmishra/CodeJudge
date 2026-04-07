/**
 * Admin Middleware
 * Ensures the authenticated user has admin role
 * Must be used AFTER authMiddleware
 */
import { Context, Next } from 'hono';

export async function adminMiddleware(c: Context, next: Next) {
  const user = c.get('user');

  if (!user) {
    return c.json({ success: false, error: 'Authentication required' }, 401);
  }

  if (user.role !== 'ADMIN') {
    return c.json({ success: false, error: 'Admin access required' }, 403);
  }

  await next();
}
