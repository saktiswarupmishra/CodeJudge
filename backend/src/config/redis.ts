/**
 * Redis Configuration
 * Connection for BullMQ job queue
 */
import IORedis from 'ioredis';
import { env } from './env';

const connections: IORedis[] = [];

export function getRedisConnection(): IORedis {
  const conn = new IORedis({
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
    maxRetriesPerRequest: null, // Required by BullMQ
    enableReadyCheck: false,
  });

  conn.on('connect', () => {
    // Only log once to avoid terminal spam
    if (connections.length === 1) {
      console.log('✅ Redis connected');
    }
  });

  conn.on('error', (err) => {
    console.error('❌ Redis connection error:', err.message);
  });

  connections.push(conn);
  return conn;
}

export async function disconnectRedis(): Promise<void> {
  if (connections.length > 0) {
    await Promise.all(connections.map(conn => conn.quit().catch(() => {})));
    connections.length = 0;
    console.log('🔌 Redis disconnected');
  }
}
