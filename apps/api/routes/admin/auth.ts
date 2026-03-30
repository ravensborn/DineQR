import { Router } from 'express';
import { authController } from '../../controllers/auth.controller.js';
import { authenticate } from '../../middleware/auth.js';
import { authLimiter } from '../../middleware/rateLimiter.js';
import { body, validate } from '../../middleware/validate.js';

const router = Router();

router.post(
	'/login',
	authLimiter,
	body('email').isEmail().withMessage('Valid email is required'),
	body('password').notEmpty().withMessage('Password is required'),
	validate,
	authController.login,
);

router.post('/refresh', authController.refresh);
router.post('/logout', authenticate, authController.logout);
router.get('/me', authenticate, authController.me);

export default router;
