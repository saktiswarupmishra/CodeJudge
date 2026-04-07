/**
 * Auth Service
 * Handles user registration, login, and JWT token management
 */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/database';
import { env } from '../config/env';
import { JwtPayload, SafeUser } from '../types';

const SALT_ROUNDS = 10;

export class AuthService {
  /**
   * Register a new user
   */
  static async register(name: string, email: string, password: string): Promise<SafeUser> {
    // Check if user already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw new Error('Email already registered');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create user
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
