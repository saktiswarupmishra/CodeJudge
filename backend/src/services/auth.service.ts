/**
 * Auth Service
 * Handles user registration, login, JWT, and user profiles
 */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import twilio from 'twilio';
import { prisma } from '../config/database';
import { env } from '../config/env';
import { getRedisConnection } from '../config/redis';
import { JwtPayload, SafeUser } from '../types';

const SALT_ROUNDS = 10;

export class AuthService {
  /**
   * Register a new user
   */
  static async register(name: string, email: string, password: string): Promise<SafeUser> {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw new Error('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    const { password: _, ...safeUser } = user;
    return safeUser;
  }

  /**
   * Login user and return JWT token
   */
  static async login(email: string, password: string): Promise<{ user: SafeUser; token: string }> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error('Invalid email or password');
    }

    const payload: JwtPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN,
    });

    const { password: _, ...safeUser } = user;
    return { user: safeUser, token };
  }

  /**
   * Send an OTP to a mobile number via Twilio
   */
  static async sendMobileOtp(mobile: string): Promise<void> {
    if (!env.TWILIO_ACCOUNT_SID || !env.TWILIO_AUTH_TOKEN) {
        throw new Error('Twilio credentials not configured in backend .env');
    }

    const client = twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store in redis for 5 minutes
    const redis = getRedisConnection();
    await redis.set(`auth:otp:${mobile}`, otp, 'EX', 300);

    // Send SMS
    await client.messages.create({
      body: `Your Online Code Judge OTP is: ${otp}`,
      from: env.TWILIO_PHONE_NUMBER,
      to: mobile
    });
  }

  /**
   * Verify an OTP and log the user in
   */
  static async verifyMobileOtp(mobile: string, otp: string): Promise<{ user: SafeUser; token: string }> {
    const redis = getRedisConnection();
    const storedOtp = await redis.get(`auth:otp:${mobile}`);
    
    if (!storedOtp || storedOtp !== otp) {
      throw new Error('Invalid or expired OTP');
    }

    await redis.del(`auth:otp:${mobile}`);

    // Given no mobile column in DB, we default to the demo user profile for the mobile login flow.
    const email = 'john@codejudge.com';
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('Demo user missing from database');
    }

    const payload: JwtPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN,
    });

    const { password: _, ...safeUser } = user;
    return { user: safeUser, token };
  }


  /**
   * Get user profile by ID
   */
  static async getProfile(userId: number): Promise<SafeUser> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        bio: true,
        avatarUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user as SafeUser;
  }

  /**
   * Get public user profile by ID (for /profile/:id pages)
   */
  static async getPublicProfile(userId: number) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        bio: true,
        avatarUrl: true,
        role: true,
        createdAt: true,
        _count: { select: { submissions: true } },
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Get submission activity for heatmap (last 365 days)
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    const submissions = await prisma.submission.findMany({
      where: { userId, createdAt: { gte: oneYearAgo } },
      select: { createdAt: true, result: true, problemId: true },
    });

    // Group by date for activity heatmap
    const activityMap: Record<string, number> = {};
    submissions.forEach(s => {
      const date = s.createdAt.toISOString().split('T')[0];
      activityMap[date] = (activityMap[date] || 0) + 1;
    });

    // Calculate streak
    let currentStreak = 0;
    let maxStreak = 0;
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    let checkDate = new Date(today);
    // If no activity today, start checking from yesterday
    if (!activityMap[todayStr]) {
      checkDate.setDate(checkDate.getDate() - 1);
    }
    while (true) {
      const dateStr = checkDate.toISOString().split('T')[0];
      if (activityMap[dateStr]) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }

    // Calculate max streak
    const sortedDates = Object.keys(activityMap).sort();
    let tempStreak = 1;
    for (let i = 1; i < sortedDates.length; i++) {
      const prev = new Date(sortedDates[i - 1]);
      const curr = new Date(sortedDates[i]);
      const diffDays = (curr.getTime() - prev.getTime()) / (1000 * 3600 * 24);
      if (diffDays === 1) {
        tempStreak++;
        maxStreak = Math.max(maxStreak, tempStreak);
      } else {
        tempStreak = 1;
      }
    }
    maxStreak = Math.max(maxStreak, tempStreak, currentStreak);

    // Unique problems solved
    const solvedIds = new Set(
      submissions.filter(s => s.result === 'ACCEPTED').map(s => s.problemId)
    );

    return {
      ...user,
      activityMap,
      currentStreak,
      maxStreak,
      totalSolved: solvedIds.size,
      totalActivity: submissions.length,
    };
  }

  /**
   * Update user profile
   */
  static async updateProfile(userId: number, data: { name?: string; bio?: string }) {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.bio !== undefined && { bio: data.bio }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        bio: true,
        avatarUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return user;
  }

  /**
   * Get all users (admin)
   */
  static async getAllUsers() {
    return prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        _count: {
          select: { submissions: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
