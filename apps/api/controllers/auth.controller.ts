import type { Request, Response } from 'express';
import { authService } from '../services/auth.service.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const REFRESH_COOKIE = 'dineqr_refresh_token';
const COOKIE_OPTIONS = {
	httpOnly: true,
	secure: process.env.NODE_ENV === 'production',
	sameSite: 'lax' as const,
	path: '/api/admin/auth',
	maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
};

export const authController = {
	login: asyncHandler(async (req: Request, res: Response) => {
		const { email, password } = req.body;
		const { access_token, refresh_token, user } = await authService.login(email, password);

		res.cookie(REFRESH_COOKIE, refresh_token, COOKIE_OPTIONS);
		res.json({ success: true, message: 'Login successful', data: { access_token, user } });
	}),

	refresh: asyncHandler(async (req: Request, res: Response) => {
		const refreshToken = req.cookies[REFRESH_COOKIE];
		if (!refreshToken) {
			return res.status(401).json({ success: false, message: 'No refresh token', data: null });
		}

		const { access_token, refresh_token } = await authService.refresh(refreshToken);
		res.cookie(REFRESH_COOKIE, refresh_token, COOKIE_OPTIONS);
		res.json({ success: true, data: { access_token } });
	}),

	logout: asyncHandler(async (_req: Request, res: Response) => {
		res.clearCookie(REFRESH_COOKIE, { path: '/api/admin/auth' });
		res.json({ success: true, message: 'Logged out successfully', data: null });
	}),

	me: asyncHandler(async (req: Request, res: Response) => {
		const user = await authService.getMe(req.user!.sub);
		res.json({ success: true, data: user });
	}),
};
