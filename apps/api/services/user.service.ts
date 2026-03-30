import { User, Restaurant } from '../models/index.js';
import { createCrudService } from './crud.service.js';
import bcrypt from 'bcryptjs';
import { ApiError } from '../utils/ApiError.js';

const baseService = createCrudService(User, {
	entityName: 'User',
	searchableFields: ['name', 'email'],
	filterableFields: ['role', 'is_active', 'restaurant_id'],
	defaultOrder: [['created_at', 'DESC']],
	listAttributes: ['id', 'name', 'email', 'role', 'restaurant_id', 'is_active', 'created_at', 'updated_at'],
	includes: [{ model: Restaurant, as: 'restaurant', attributes: ['id', 'name', 'slug'] }],
});

export const userService = {
	...baseService,

	async create(data: any) {
		const existing = await User.findOne({ where: { email: data.email } });
		if (existing) throw new ApiError(409, 'Email already in use');

		const password_hash = await bcrypt.hash(data.password, 12);
		return User.create({ ...data, password_hash });
	},

	async update(id: string, data: any) {
		const user = await User.findByPk(id);
		if (!user) throw new ApiError(404, 'User not found');

		if (data.password) {
			data.password_hash = await bcrypt.hash(data.password, 12);
			delete data.password;
		}
		if (data.email && data.email !== user.email) {
			const existing = await User.findOne({ where: { email: data.email } });
			if (existing) throw new ApiError(409, 'Email already in use');
		}

		return user.update(data);
	},
};
