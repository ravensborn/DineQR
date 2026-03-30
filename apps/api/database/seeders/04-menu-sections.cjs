'use strict';

const SECTIONS = [
	// The Golden Fork
	{ id: '20000000-0000-4000-a000-000000000001', restaurant_id: '10000000-0000-4000-a000-000000000001', name: 'Starters', description: 'Begin your journey with our carefully crafted appetizers', icon: '🥗', display_order: 1 },
	{ id: '20000000-0000-4000-a000-000000000002', restaurant_id: '10000000-0000-4000-a000-000000000001', name: 'Main Courses', description: 'Signature dishes from our head chef', icon: '🥩', display_order: 2 },
	{ id: '20000000-0000-4000-a000-000000000003', restaurant_id: '10000000-0000-4000-a000-000000000001', name: 'Pepsi Drinks', description: 'Refreshing beverages to complement your meal', icon: '🥤', display_order: 3 },
	{ id: '20000000-0000-4000-a000-000000000004', restaurant_id: '10000000-0000-4000-a000-000000000001', name: 'Desserts', description: 'Sweet endings to a perfect meal', icon: '🍰', display_order: 4 },

	// Burger Junction
	{ id: '20000000-0000-4000-a000-000000000010', restaurant_id: '10000000-0000-4000-a000-000000000002', name: 'Signature Burgers', description: 'Handcrafted patties with premium toppings', icon: '🍔', display_order: 1 },
	{ id: '20000000-0000-4000-a000-000000000011', restaurant_id: '10000000-0000-4000-a000-000000000002', name: 'Sides & Fries', description: 'The perfect sidekicks', icon: '🍟', display_order: 2 },
	{ id: '20000000-0000-4000-a000-000000000012', restaurant_id: '10000000-0000-4000-a000-000000000002', name: 'Pepsi Drinks', description: 'Ice-cold beverages', icon: '🥤', display_order: 3 },
	{ id: '20000000-0000-4000-a000-000000000013', restaurant_id: '10000000-0000-4000-a000-000000000002', name: 'Shakes & Desserts', description: 'Thick shakes and sweet treats', icon: '🥤', display_order: 4 },

	// Levant Kitchen
	{ id: '20000000-0000-4000-a000-000000000020', restaurant_id: '10000000-0000-4000-a000-000000000003', name: 'Mezze', description: 'Traditional sharing plates to start', icon: '🧆', display_order: 1 },
	{ id: '20000000-0000-4000-a000-000000000021', restaurant_id: '10000000-0000-4000-a000-000000000003', name: 'Grills', description: 'Charcoal-grilled meats and kebabs', icon: '🔥', display_order: 2 },
	{ id: '20000000-0000-4000-a000-000000000022', restaurant_id: '10000000-0000-4000-a000-000000000003', name: 'Wraps & Sandwiches', description: 'Freshly rolled and packed with flavor', icon: '🌯', display_order: 3 },
	{ id: '20000000-0000-4000-a000-000000000023', restaurant_id: '10000000-0000-4000-a000-000000000003', name: 'Pepsi Drinks', description: 'Cool refreshments', icon: '🥤', display_order: 4 },
	{ id: '20000000-0000-4000-a000-000000000024', restaurant_id: '10000000-0000-4000-a000-000000000003', name: 'Sweets', description: 'Traditional Middle Eastern desserts', icon: '🍯', display_order: 5 },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface) {
		for (const section of SECTIONS) {
			const existing = await queryInterface.rawSelect('menu_sections', { where: { id: section.id } }, ['id']);
			if (!existing) {
				await queryInterface.bulkInsert('menu_sections', [
					{ ...section, is_active: true, created_at: new Date(), updated_at: new Date() },
				]);
			}
		}
	},

	async down(queryInterface) {
		await queryInterface.bulkDelete('menu_sections', {
			id: SECTIONS.map((s) => s.id),
		});
	},
};
