/**
 * Environment Configuration
 * Loads and validates environment variables
 */
import dotenv from 'dotenv';
import path from 'path';

// Load .env from project root
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

export const env = {
  // Server
  PORT: parseInt(process.env.PORT || '3000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',

  // Database
  DATABASE_URL: process.env.DATABASE_URL || 'mysql://root:@localhost:3306/online_judge',

  // JWT
  JWT_SECRET: process.env.JWT_SECRET || 'fallback-secret-change-me',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',

  // Redis
  REDIS_HOST: process.env.REDIS_HOST || 'localhost',
  REDIS_PORT: parseInt(process.env.REDIS_PORT || '6379', 10),

  // Docker Execution
  DOCKER_TIMEOUT: parseInt(process.env.DOCKER_TIMEOUT || '10000', 10),
  DOCKER_MEMORY_LIMIT: parseInt(process.env.DOCKER_MEMORY_LIMIT || '268435456', 10),
  DOCKER_CPU_LIMIT: parseInt(process.env.DOCKER_CPU_LIMIT || '1', 10),
  // Twilio SMS
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID || '',
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN || '',
  TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER || '',
} as const;
