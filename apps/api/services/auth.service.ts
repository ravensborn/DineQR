import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/index.js';
import { ApiError } from '../utils/ApiError.js';
import type { TokenPayload } from '../middleware/auth.js';

const ACCESS_SECRET = process.env.SYSTEM_USER_ACCESS_TOKEN_PRIVATE_KEY || 'access_secret';
const REFRESH_SECRET = process.env.SYSTEM_USER_REFRESH_TOKEN_PRIVATE_KEY || 'refresh_secret';
const ACCESS_EXPIRES = process.env.ACCESS_TOKEN_EXPIRES_IN || '15m';
const REFRESH_EXPIRES = process.env.REFRESH_TOKEN_EXPIRES_IN || '30d';

function generateTokens(user: User) {
	const payload: TokenPayload = {
		sub: user.id,
		email: user.email,
		role: user.role,
		restaurant_id: user.restaurant_id,
	};

	const access_token = jwt.sign(payload, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRES });
	const refresh_token = jwt.sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES });

	return { access_token, refresh_token };
}

export const authService = {
	async login(email: string, password: string) {
		const user = await User.findOne({ where: { email } });
		if (!user) throw new ApiError(401, 'Invalid email or password');
		if (!user.is_active) throw new ApiError(403, 'Account is deactivated');

		const isValid = await bcrypt.compare(password, user.password_hash);
		if (!isValid) throw new ApiError(401, 'Invalid email or password');

		const tokens = generateTokens(user);
		const userData = {
			id: user.id,
			name: user.name,
			email: user.email,
			role: user.role,
			restaurant_id: user.restaurant_id,
		};

		return { ...tokens, user: userData };
	},

	async refresh(refreshToken: string) {
		try {
			const decoded = jwt.verify(refreshToken, REFRESH_SECRET) as TokenPayload;
			const user = await User.findByPk(decoded.sub);
			if (!user || !user.is_active) throw new ApiError(401, 'Invalid refresh token');

			const tokens = generateTokens(user);
			return tokens;
		} catch {
			throw new ApiError(401, 'Invalid or expired refresh token');
		}
	},

	async getMe(userId: string) {
		const user = await User.findByPk(userId, {
			attributes: ['id', 'name', 'email', 'role', 'restaurant_id', 'is_active'],
		});
		if (!user) throw new ApiError(404, 'User not found');
		return user;
	},
};
