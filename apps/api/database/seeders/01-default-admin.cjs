'use strict';

const bcrypt = require('bcryptjs');

const ADMIN_ID = '00000000-0000-4000-a000-000000000001';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface) {
		const existing = await queryInterface.rawSelect('users', { where: { email: 'admin@dineqr.com' } }, ['id']);
		if (existing) return;

		const password = process.env.SEED_ADMIN_PASSWORD || 'Admin@dineqr2026';
		const password_hash = bcrypt.hashSync(password, 12);

		await queryInterface.bulkInsert('users', [
			{
				id: ADMIN_ID,
				name: 'DineQR Admin',
				email: 'admin@dineqr.com',
				password_hash,
				role: 'super_admin',
				restaurant_id: null,
				is_active: true,
				created_at: new Date(),
				updated_at: new Date(),
			},
		]);
	},

	async down(queryInterface) {
		await queryInterface.bulkDelete('users', { email: 'admin@dineqr.com' });
	},
};
