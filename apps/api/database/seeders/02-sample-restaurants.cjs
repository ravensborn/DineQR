'use strict';

const RESTAURANTS = [
	{
		id: '10000000-0000-4000-a000-000000000001',
		name: 'The Golden Fork',
		slug: 'the-golden-fork',
		logo: null,
		description: 'An upscale dining experience with curated international cuisine and an elegant atmosphere.',
		address: '45 Grand Avenue, Downtown District',
		phone: '+1 (555) 123-4567',
		working_hours: JSON.stringify({
			monday: { open: '11:00', close: '22:00' },
			tuesday: { open: '11:00', close: '22:00' },
			wednesday: { open: '11:00', close: '22:00' },
			thursday: { open: '11:00', close: '23:00' },
			friday: { open: '11:00', close: '23:00' },
			saturday: { open: '10:00', close: '23:00' },
			sunday: { open: '10:00', close: '21:00' },
		}),
		is_active: true,
		theme_color: '#004B93',
		created_at: new Date(),
		updated_at: new Date(),
	},
	{
		id: '10000000-0000-4000-a000-000000000002',
		name: 'Burger Junction',
		slug: 'burger-junction',
		logo: null,
		description: 'Premium handcrafted burgers, loaded fries, and thick shakes in a vibrant casual setting.',
		address: '12 Main Street, Food Court Plaza',
		phone: '+1 (555) 987-6543',
		working_hours: JSON.stringify({
			monday: { open: '10:00', close: '23:00' },
			tuesday: { open: '10:00', close: '23:00' },
			wednesday: { open: '10:00', close: '23:00' },
			thursday: { open: '10:00', close: '00:00' },
			friday: { open: '10:00', close: '00:00' },
			saturday: { open: '09:00', close: '00:00' },
			sunday: { open: '09:00', close: '22:00' },
		}),
		is_active: true,
		theme_color: '#E32934',
		created_at: new Date(),
		updated_at: new Date(),
	},
	{
		id: '10000000-0000-4000-a000-000000000003',
		name: 'Levant Kitchen',
		slug: 'levant-kitchen',
		logo: null,
		description: 'Authentic Middle Eastern flavors — mezze platters, charcoal grills, and freshly baked bread.',
		address: '78 Heritage Lane, Old Town',
		phone: '+1 (555) 456-7890',
		working_hours: JSON.stringify({
			monday: { open: '11:00', close: '22:00' },
			tuesday: { open: '11:00', close: '22:00' },
			wednesday: { open: '11:00', close: '22:00' },
			thursday: { open: '11:00', close: '22:00' },
			friday: { open: '11:00', close: '23:00' },
			saturday: { open: '11:00', close: '23:00' },
			sunday: { closed: true },
		}),
		is_active: true,
		theme_color: '#004B93',
		created_at: new Date(),
		updated_at: new Date(),
	},
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface) {
		for (const restaurant of RESTAURANTS) {
			const existing = await queryInterface.rawSelect('restaurants', { where: { slug: restaurant.slug } }, ['id']);
			if (!existing) {
				await queryInterface.bulkInsert('restaurants', [restaurant]);
			}
		}
	},

	async down(queryInterface) {
		await queryInterface.bulkDelete('restaurants', {
			slug: RESTAURANTS.map((r) => r.slug),
		});
	},
};
