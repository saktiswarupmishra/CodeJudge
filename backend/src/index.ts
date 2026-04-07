/**
 * Online Coding Judge — Backend Entry Point
 * Hono.js API Server with WebSocket support
 */
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';

import { env } from './config/env';
import { connectDatabase } from './config/database';
import { wsManager } from './utils/websocket';

// Import routes
import authRoutes from './routes/auth.routes';
import problemRoutes from './routes/problem.routes';
import submissionRoutes from './routes/submission.routes';
import leaderboardRoutes from './routes/leaderboard.routes';

// Import middleware
import { rateLimiterMiddleware } from './middleware/rateLimiter.middleware';

// Create Hono app
const app = new Hono();

// ─── Global Middleware ────────────────────────────────────
app.use('*', logger());
app.use('*', cors({
  origin: ['http://localhost:4200', 'http://localhost:3000', 'http://localhost'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.use('*', rateLimiterMiddleware);

// ─── Health Check ─────────────────────────────────────────
app.get('/', (c) => {
  return c.json({
    name: 'Online Coding Judge API',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/health', (c) => {
  return c.json({ status: 'ok', uptime: process.uptime() });
});

// ─── API Routes ───────────────────────────────────────────
app.route('/api/auth', authRoutes);
app.route('/api/problems', problemRoutes);
app.route('/api/submissions', submissionRoutes);
app.route('/api/leaderboard', leaderboardRoutes);

// ─── 404 Handler ──────────────────────────────────────────
app.notFound((c) => {
  return c.json({ success: false, error: 'Route not found' }, 404);
});

// ─── Error Handler ────────────────────────────────────────
app.onError((err, c) => {
  console.error('Unhandled error:', err);
  return c.json({
    success: false,
    error: env.NODE_ENV === 'development' ? err.message : 'Internal Server Error',
  }, 500);
});

// ─── Start Server ─────────────────────────────────────────
async function bootstrap() {
  // Connect to database
  await connectDatabase();

  // Start execution worker (only if Redis is available)
  try {
    const { startExecutionWorker } = await import('./workers/execution.worker');
    startExecutionWorker();
  } catch (error) {
    console.warn('⚠️  Execution worker could not start (Redis may not be available)');
  }

  // Start HTTP server
  const server = serve({
    fetch: app.fetch,
    port: env.PORT,
  }, (info) => {
    console.log('');
    console.log('╔══════════════════════════════════════════════╗');
    console.log('║       Online Coding Judge — API Server       ║');
    console.log('╠══════════════════════════════════════════════╣');
    console.log(`║  🚀 Server:     http://localhost:${info.port}        ║`);
    console.log(`║  📊 API:        http://localhost:${info.port}/api    ║`);
    console.log(`║  🔌 WebSocket:  ws://localhost:${info.port}/ws      ║`);
    console.log(`║  🌍 Environment: ${env.NODE_ENV.padEnd(25)}║`);
    console.log('╚══════════════════════════════════════════════╝');
    console.log('');
  });

  // Initialize WebSocket
  wsManager.init(server as any);

  // Graceful shutdown
  const shutdown = async () => {
    console.log('\n🛑 Shutting down...');
    const { disconnectDatabase } = await import('./config/database');
    const { disconnectRedis } = await import('./config/redis');
    await disconnectDatabase();
    await disconnectRedis();
    process.exit(0);
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

bootstrap().catch((error) => {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
});
