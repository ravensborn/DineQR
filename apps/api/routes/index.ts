import { Router } from 'express';
import authRoutes from './admin/auth.js';
import dashboardRoutes from './admin/dashboard.js';
import restaurantRoutes from './admin/restaurants.js';
import menuSectionRoutes from './admin/menu-sections.js';
import menuItemRoutes from './admin/menu-items.js';
import userRoutes from './admin/users.js';
import publicRoutes from './public/index.js';
import { adminLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// Health check
router.get('/api/health', (_req, res) => {
	res.json({ success: true, message: 'DineQR API is running', data: null });
});

// Admin routes
router.use('/api/admin/auth', authRoutes);
router.use('/api/admin/dashboard', adminLimiter, dashboardRoutes);
router.use('/api/admin/restaurants', adminLimiter, restaurantRoutes);
router.use('/api/admin/menu-sections', adminLimiter, menuSectionRoutes);
router.use('/api/admin/menu-items', adminLimiter, menuItemRoutes);
router.use('/api/admin/users', adminLimiter, userRoutes);

// Public routes
router.use('/api/public', publicRoutes);

export default router;
