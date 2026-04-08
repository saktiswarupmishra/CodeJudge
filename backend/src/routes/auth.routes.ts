/**
 * Auth Routes
 */
import { Hono } from 'hono';
import { AuthController } from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { adminMiddleware } from '../middleware/admin.middleware';

const authRoutes = new Hono();

authRoutes.post('/register', AuthController.register);
authRoutes.post('/login', AuthController.login);
authRoutes.get('/me', authMiddleware, AuthController.getProfile);
authRoutes.put('/me', authMiddleware, AuthController.updateProfile);
authRoutes.get('/profile/:id', AuthController.getPublicProfile);
authRoutes.get('/users', authMiddleware, adminMiddleware, AuthController.getAllUsers);

export default authRoutes;
