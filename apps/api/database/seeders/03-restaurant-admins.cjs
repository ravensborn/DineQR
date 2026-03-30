'use strict';

const bcrypt = require('bcryptjs');

const ADMINS = [
	{
		id: '00000000-0000-4000-a000-000000000010',
		name: 'Sarah Mitchell',
		email: 'manager@goldenfork.com',
		password: 'Manager@2026',
		restaurant_id: '10000000-0000-4000-a000-000000000001',
	},
	{
		id: '00000000-0000-4000-a000-000000000011',
		name: 'James Rodriguez',
		email: 'manager@burgerjunction.com',
		password: 'Manager@2026',
		restaurant_id: '10000000-0000-4000-a000-000000000002',
	},
	{
		id: '00000000-0000-4000-a000-000000000012',
		name: 'Omar Hassan',
		email: 'manager@levantkitchen.com',
		password: 'Manager@2026',
		restaurant_id: '10000000-0000-4000-a000-000000000003',
	},
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface) {
		for (const admin of ADMINS) {
			const existing = await queryInterface.rawSelect('users', { where: { email: admin.email } }, ['id']);
			if (!existing) {
				const password_hash = bcrypt.hashSync(admin.password, 12);
				await queryInterface.bulkInsert('users', [
					{
						id: admin.id,
						name: admin.name,
						email: admin.email,
						password_hash,
						role: 'restaurant_admin',
						restaurant_id: admin.restaurant_id,
						is_active: true,
						created_at: new Date(),
						updated_at: new Date(),
					},
				]);
			}
		}
	},

	async down(queryInterface) {
		await queryInterface.bulkDelete('users', {
			email: ADMINS.map((a) => a.email),
		});
	},
};
