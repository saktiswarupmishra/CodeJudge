/**
 * Redis Configuration
 * Connection for BullMQ job queue
 */
import IORedis from 'ioredis';
import { env } from './env';

let redisConnection: IORedis | null = null;

export function getRedisConnection(): IORedis {
  if (!redisConnection) {
    redisConnection = new IORedis({
      host: env.REDIS_HOST,
      port: env.REDIS_PORT,
      maxRetriesPerRequest: null, // Required by BullMQ
      enableReadyCheck: false,
    });

    redisConnection.on('connect', () => {
      console.log('✅ Redis connected');
    });

    redisConnection.on('error', (err) => {
      console.error('❌ Redis connection error:', err.message);
    });
  }

  return redisConnection;
}

export async function disconnectRedis(): Promise<void> {
  if (redisConnection) {
    await redisConnection.quit();
    redisConnection = null;
    console.log('🔌 Redis disconnected');
  }
}
