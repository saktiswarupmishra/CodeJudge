/**
 * Rate Limiter Middleware
 * Simple in-memory sliding window rate limiter
 * Limits requests per IP address
 */
import { Context, Next } from 'hono';

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const store = new Map<string, RateLimitEntry>();
const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 100;    // requests per window

// Clean up expired entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of store.entries()) {
    if (now > value.resetTime) {
      store.delete(key);
    }
  }
}, 60 * 1000);

export async function rateLimiterMiddleware(c: Context, next: Next) {
  // Get client IP from headers or connection
  const ip = c.req.header('x-forwarded-for') ||
             c.req.header('x-real-ip') ||
             'unknown';

  const now = Date.now();
  const entry = store.get(ip);

  if (!entry || now > entry.resetTime) {
    // New window
    store.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    c.header('X-RateLimit-Limit', String(MAX_REQUESTS));
    c.header('X-RateLimit-Remaining', String(MAX_REQUESTS - 1));
    await next();
    return;
  }

  if (entry.count >= MAX_REQUESTS) {
    const retryAfter = Math.ceil((entry.resetTime - now) / 1000);
    c.header('Retry-After', String(retryAfter));
    c.header('X-RateLimit-Limit', String(MAX_REQUESTS));
    c.header('X-RateLimit-Remaining', '0');
    return c.json(
      { success: false, error: 'Too many requests. Please try again later.' },
      429
    );
  }

  entry.count++;
  c.header('X-RateLimit-Limit', String(MAX_REQUESTS));
  c.header('X-RateLimit-Remaining', String(MAX_REQUESTS - entry.count));
  await next();
}
