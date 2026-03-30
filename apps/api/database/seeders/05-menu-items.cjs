'use strict';

const PEPSI_DRINKS = (sectionId, restaurantId, startId) => [
	{ id: `30000000-0000-4000-a000-${String(startId).padStart(12, '0')}`, section_id: sectionId, restaurant_id: restaurantId, name: 'Pepsi', description: 'Classic Pepsi cola — 330ml can', price: 2.50, is_featured: true, display_order: 1, tags: JSON.stringify(['popular']) },
	{ id: `30000000-0000-4000-a000-${String(startId + 1).padStart(12, '0')}`, section_id: sectionId, restaurant_id: restaurantId, name: 'Pepsi Zero Sugar', description: 'All the taste, zero sugar — 330ml can', price: 2.50, is_featured: false, display_order: 2, tags: JSON.stringify([]) },
	{ id: `30000000-0000-4000-a000-${String(startId + 2).padStart(12, '0')}`, section_id: sectionId, restaurant_id: restaurantId, name: 'Diet Pepsi', description: 'Light and refreshing — 330ml can', price: 2.50, is_featured: false, display_order: 3, tags: JSON.stringify([]) },
	{ id: `30000000-0000-4000-a000-${String(startId + 3).padStart(12, '0')}`, section_id: sectionId, restaurant_id: restaurantId, name: 'Mountain Dew', description: 'Bold citrus kick — 330ml can', price: 2.50, is_featured: false, display_order: 4, tags: JSON.stringify(['popular']) },
	{ id: `30000000-0000-4000-a000-${String(startId + 4).padStart(12, '0')}`, section_id: sectionId, restaurant_id: restaurantId, name: '7UP', description: 'Crisp lemon-lime — 330ml can', price: 2.50, is_featured: false, display_order: 5, tags: JSON.stringify([]) },
	{ id: `30000000-0000-4000-a000-${String(startId + 5).padStart(12, '0')}`, section_id: sectionId, restaurant_id: restaurantId, name: 'Mirinda Orange', description: 'Sweet orange fizz — 330ml can', price: 2.50, is_featured: false, display_order: 6, tags: JSON.stringify([]) },
	{ id: `30000000-0000-4000-a000-${String(startId + 6).padStart(12, '0')}`, section_id: sectionId, restaurant_id: restaurantId, name: 'Pepsi (1L Bottle)', description: 'Share-size Pepsi bottle', price: 4.50, is_featured: false, display_order: 7, tags: JSON.stringify([]) },
];

const ALL_ITEMS = [
	// ===== THE GOLDEN FORK =====
	// Starters
	{ id: '30000000-0000-4000-a000-000000000001', section_id: '20000000-0000-4000-a000-000000000001', restaurant_id: '10000000-0000-4000-a000-000000000001', name: 'Truffle Arancini', description: 'Crispy risotto balls with black truffle aioli and parmesan shavings', price: 14.00, is_featured: true, display_order: 1, tags: JSON.stringify(['vegetarian']) },
	{ id: '30000000-0000-4000-a000-000000000002', section_id: '20000000-0000-4000-a000-000000000001', restaurant_id: '10000000-0000-4000-a000-000000000001', name: 'Beef Carpaccio', description: 'Thinly sliced wagyu with capers, arugula, and aged parmesan', price: 16.00, is_featured: false, display_order: 2, tags: JSON.stringify([]) },
	{ id: '30000000-0000-4000-a000-000000000003', section_id: '20000000-0000-4000-a000-000000000001', restaurant_id: '10000000-0000-4000-a000-000000000001', name: 'Seared Scallops', description: 'Pan-seared scallops on pea purée with crispy prosciutto', price: 18.00, is_featured: false, display_order: 3, tags: JSON.stringify(['popular']) },
	{ id: '30000000-0000-4000-a000-000000000004', section_id: '20000000-0000-4000-a000-000000000001', restaurant_id: '10000000-0000-4000-a000-000000000001', name: 'Burrata Salad', description: 'Creamy burrata with heirloom tomatoes, basil, and aged balsamic', price: 15.00, is_featured: false, display_order: 4, tags: JSON.stringify(['vegetarian']) },
	{ id: '30000000-0000-4000-a000-000000000005', section_id: '20000000-0000-4000-a000-000000000001', restaurant_id: '10000000-0000-4000-a000-000000000001', name: 'French Onion Soup', description: 'Classic slow-cooked onion broth with gruyère crouton', price: 12.00, is_featured: false, display_order: 5, tags: JSON.stringify(['vegetarian']) },

	// Main Courses
	{ id: '30000000-0000-4000-a000-000000000010', section_id: '20000000-0000-4000-a000-000000000002', restaurant_id: '10000000-0000-4000-a000-000000000001', name: 'Grilled Ribeye Steak', description: '300g prime ribeye with roasted garlic butter, truffle fries, and seasonal vegetables', price: 42.00, is_featured: true, display_order: 1, tags: JSON.stringify(['popular']) },
	{ id: '30000000-0000-4000-a000-000000000011', section_id: '20000000-0000-4000-a000-000000000002', restaurant_id: '10000000-0000-4000-a000-000000000001', name: 'Pan-Roasted Salmon', description: 'Atlantic salmon with lemon dill sauce, asparagus, and wild rice', price: 34.00, is_featured: false, display_order: 2, tags: JSON.stringify([]) },
	{ id: '30000000-0000-4000-a000-000000000012', section_id: '20000000-0000-4000-a000-000000000002', restaurant_id: '10000000-0000-4000-a000-000000000001', name: 'Lobster Linguine', description: 'Fresh lobster tail with cherry tomatoes, white wine, and garlic', price: 38.00, is_featured: false, display_order: 3, tags: JSON.stringify([]) },
	{ id: '30000000-0000-4000-a000-000000000013', section_id: '20000000-0000-4000-a000-000000000002', restaurant_id: '10000000-0000-4000-a000-000000000001', name: 'Duck Confit', description: 'Slow-cooked duck leg with cherry reduction and dauphinoise potatoes', price: 36.00, is_featured: false, display_order: 4, tags: JSON.stringify([]) },
	{ id: '30000000-0000-4000-a000-000000000014', section_id: '20000000-0000-4000-a000-000000000002', restaurant_id: '10000000-0000-4000-a000-000000000001', name: 'Wild Mushroom Risotto', description: 'Arborio rice with porcini, shiitake, and truffle oil', price: 28.00, is_featured: false, display_order: 5, tags: JSON.stringify(['vegetarian', 'popular']) },

	// Pepsi Drinks for Golden Fork
	...PEPSI_DRINKS('20000000-0000-4000-a000-000000000003', '10000000-0000-4000-a000-000000000001', 100),

	// Desserts
	{ id: '30000000-0000-4000-a000-000000000020', section_id: '20000000-0000-4000-a000-000000000004', restaurant_id: '10000000-0000-4000-a000-000000000001', name: 'Crème Brûlée', description: 'Classic vanilla custard with caramelized sugar crust', price: 12.00, is_featured: true, display_order: 1, tags: JSON.stringify(['vegetarian', 'popular']) },
	{ id: '30000000-0000-4000-a000-000000000021', section_id: '20000000-0000-4000-a000-000000000004', restaurant_id: '10000000-0000-4000-a000-000000000001', name: 'Chocolate Lava Cake', description: 'Warm dark chocolate fondant with vanilla ice cream', price: 14.00, is_featured: false, display_order: 2, tags: JSON.stringify(['vegetarian']) },
	{ id: '30000000-0000-4000-a000-000000000022', section_id: '20000000-0000-4000-a000-000000000004', restaurant_id: '10000000-0000-4000-a000-000000000001', name: 'Tiramisu', description: 'Espresso-soaked ladyfingers with mascarpone cream', price: 13.00, is_featured: false, display_order: 3, tags: JSON.stringify(['vegetarian']) },

	// ===== BURGER JUNCTION =====
	// Signature Burgers
	{ id: '30000000-0000-4000-a000-000000000030', section_id: '20000000-0000-4000-a000-000000000010', restaurant_id: '10000000-0000-4000-a000-000000000002', name: 'Classic Smash Burger', description: 'Double smash patties, American cheese, pickles, special sauce, brioche bun', price: 12.50, is_featured: true, display_order: 1, tags: JSON.stringify(['popular']) },
	{ id: '30000000-0000-4000-a000-000000000031', section_id: '20000000-0000-4000-a000-000000000010', restaurant_id: '10000000-0000-4000-a000-000000000002', name: 'Spicy Jalapeño Burger', description: 'Beef patty, pepper jack cheese, jalapeños, chipotle mayo, crispy onions', price: 13.50, is_featured: false, display_order: 2, tags: JSON.stringify(['spicy', 'popular']) },
	{ id: '30000000-0000-4000-a000-000000000032', section_id: '20000000-0000-4000-a000-000000000010', restaurant_id: '10000000-0000-4000-a000-000000000002', name: 'BBQ Bacon Burger', description: 'Angus patty, smoked bacon, cheddar, crispy onion rings, smoky BBQ sauce', price: 14.50, is_featured: false, display_order: 3, tags: JSON.stringify([]) },
	{ id: '30000000-0000-4000-a000-000000000033', section_id: '20000000-0000-4000-a000-000000000010', restaurant_id: '10000000-0000-4000-a000-000000000002', name: 'Truffle Mushroom Burger', description: 'Wagyu patty, sautéed mushrooms, Swiss cheese, truffle aioli', price: 16.00, is_featured: true, display_order: 4, tags: JSON.stringify(['new']) },
	{ id: '30000000-0000-4000-a000-000000000034', section_id: '20000000-0000-4000-a000-000000000010', restaurant_id: '10000000-0000-4000-a000-000000000002', name: 'Veggie Garden Burger', description: 'Black bean patty, avocado, lettuce, tomato, herb yogurt sauce', price: 11.50, is_featured: false, display_order: 5, tags: JSON.stringify(['vegetarian']) },
	{ id: '30000000-0000-4000-a000-000000000035', section_id: '20000000-0000-4000-a000-000000000010', restaurant_id: '10000000-0000-4000-a000-000000000002', name: 'The Triple Stack', description: 'Triple beef patties, triple cheese, bacon, double sauce — not for the faint hearted', price: 18.00, is_featured: false, display_order: 6, tags: JSON.stringify(['popular', 'new']) },

	// Sides & Fries
	{ id: '30000000-0000-4000-a000-000000000040', section_id: '20000000-0000-4000-a000-000000000011', restaurant_id: '10000000-0000-4000-a000-000000000002', name: 'Classic Fries', description: 'Golden crispy fries with ketchup', price: 4.50, is_featured: false, display_order: 1, tags: JSON.stringify(['vegetarian']) },
	{ id: '30000000-0000-4000-a000-000000000041', section_id: '20000000-0000-4000-a000-000000000011', restaurant_id: '10000000-0000-4000-a000-000000000002', name: 'Loaded Cheese Fries', description: 'Fries smothered in cheese sauce, bacon bits, and jalapeños', price: 7.50, is_featured: true, display_order: 2, tags: JSON.stringify(['spicy', 'popular']) },
	{ id: '30000000-0000-4000-a000-000000000042', section_id: '20000000-0000-4000-a000-000000000011', restaurant_id: '10000000-0000-4000-a000-000000000002', name: 'Onion Rings', description: 'Beer-battered onion rings with ranch dip', price: 5.50, is_featured: false, display_order: 3, tags: JSON.stringify(['vegetarian']) },
	{ id: '30000000-0000-4000-a000-000000000043', section_id: '20000000-0000-4000-a000-000000000011', restaurant_id: '10000000-0000-4000-a000-000000000002', name: 'Chicken Wings (8pc)', description: 'Crispy wings tossed in your choice of buffalo, BBQ, or garlic parmesan', price: 9.50, is_featured: false, display_order: 4, tags: JSON.stringify(['spicy']) },
	{ id: '30000000-0000-4000-a000-000000000044', section_id: '20000000-0000-4000-a000-000000000011', restaurant_id: '10000000-0000-4000-a000-000000000002', name: 'Coleslaw', description: 'Creamy homemade coleslaw', price: 3.50, is_featured: false, display_order: 5, tags: JSON.stringify(['vegetarian', 'gluten_free']) },

	// Pepsi Drinks for Burger Junction
	...PEPSI_DRINKS('20000000-0000-4000-a000-000000000012', '10000000-0000-4000-a000-000000000002', 200),

	// Shakes & Desserts
	{ id: '30000000-0000-4000-a000-000000000050', section_id: '20000000-0000-4000-a000-000000000013', restaurant_id: '10000000-0000-4000-a000-000000000002', name: 'Chocolate Milkshake', description: 'Thick and creamy Belgian chocolate shake', price: 6.50, is_featured: true, display_order: 1, tags: JSON.stringify(['popular', 'vegetarian']) },
	{ id: '30000000-0000-4000-a000-000000000051', section_id: '20000000-0000-4000-a000-000000000013', restaurant_id: '10000000-0000-4000-a000-000000000002', name: 'Vanilla Milkshake', description: 'Classic vanilla bean shake topped with whipped cream', price: 6.00, is_featured: false, display_order: 2, tags: JSON.stringify(['vegetarian']) },
	{ id: '30000000-0000-4000-a000-000000000052', section_id: '20000000-0000-4000-a000-000000000013', restaurant_id: '10000000-0000-4000-a000-000000000002', name: 'Strawberry Milkshake', description: 'Fresh strawberry shake with real fruit', price: 6.50, is_featured: false, display_order: 3, tags: JSON.stringify(['vegetarian']) },
	{ id: '30000000-0000-4000-a000-000000000053', section_id: '20000000-0000-4000-a000-000000000013', restaurant_id: '10000000-0000-4000-a000-000000000002', name: 'Brownie Sundae', description: 'Warm chocolate brownie with vanilla ice cream and chocolate sauce', price: 7.50, is_featured: false, display_order: 4, tags: JSON.stringify(['vegetarian']) },

	// ===== LEVANT KITCHEN =====
	// Mezze
	{ id: '30000000-0000-4000-a000-000000000060', section_id: '20000000-0000-4000-a000-000000000020', restaurant_id: '10000000-0000-4000-a000-000000000003', name: 'Hummus', description: 'Creamy chickpea dip with tahini, olive oil, and warm pita bread', price: 8.00, is_featured: true, display_order: 1, tags: JSON.stringify(['vegetarian', 'vegan', 'popular']) },
	{ id: '30000000-0000-4000-a000-000000000061', section_id: '20000000-0000-4000-a000-000000000020', restaurant_id: '10000000-0000-4000-a000-000000000003', name: 'Baba Ganoush', description: 'Smoky roasted eggplant dip with pomegranate seeds', price: 8.50, is_featured: false, display_order: 2, tags: JSON.stringify(['vegetarian', 'vegan']) },
	{ id: '30000000-0000-4000-a000-000000000062', section_id: '20000000-0000-4000-a000-000000000020', restaurant_id: '10000000-0000-4000-a000-000000000003', name: 'Falafel Plate', description: 'Six crispy falafel balls with tahini sauce and pickled turnips', price: 9.00, is_featured: false, display_order: 3, tags: JSON.stringify(['vegetarian', 'vegan', 'popular']) },
	{ id: '30000000-0000-4000-a000-000000000063', section_id: '20000000-0000-4000-a000-000000000020', restaurant_id: '10000000-0000-4000-a000-000000000003', name: 'Fattoush Salad', description: 'Fresh mixed greens with crispy pita chips, sumac, and pomegranate dressing', price: 9.50, is_featured: false, display_order: 4, tags: JSON.stringify(['vegetarian', 'vegan']) },
	{ id: '30000000-0000-4000-a000-000000000064', section_id: '20000000-0000-4000-a000-000000000020', restaurant_id: '10000000-0000-4000-a000-000000000003', name: 'Muhammara', description: 'Spicy red pepper and walnut dip with pomegranate molasses', price: 8.00, is_featured: false, display_order: 5, tags: JSON.stringify(['spicy', 'vegetarian', 'vegan']) },
	{ id: '30000000-0000-4000-a000-000000000065', section_id: '20000000-0000-4000-a000-000000000020', restaurant_id: '10000000-0000-4000-a000-000000000003', name: 'Mezze Platter for Two', description: 'Hummus, baba ganoush, falafel, fattoush, and warm bread', price: 22.00, is_featured: true, display_order: 6, tags: JSON.stringify(['vegetarian', 'popular']) },

	// Grills
	{ id: '30000000-0000-4000-a000-000000000070', section_id: '20000000-0000-4000-a000-000000000021', restaurant_id: '10000000-0000-4000-a000-000000000003', name: 'Mixed Grill Platter', description: 'Lamb chops, chicken shish, kofte kebab, with grilled vegetables and rice', price: 32.00, is_featured: true, display_order: 1, tags: JSON.stringify(['popular']) },
	{ id: '30000000-0000-4000-a000-000000000071', section_id: '20000000-0000-4000-a000-000000000021', restaurant_id: '10000000-0000-4000-a000-000000000003', name: 'Lamb Kebab', description: 'Charcoal-grilled minced lamb with spices, served with onion sumac salad', price: 24.00, is_featured: false, display_order: 2, tags: JSON.stringify(['spicy']) },
	{ id: '30000000-0000-4000-a000-000000000072', section_id: '20000000-0000-4000-a000-000000000021', restaurant_id: '10000000-0000-4000-a000-000000000003', name: 'Chicken Shish Tawook', description: 'Marinated chicken breast cubes grilled to perfection, with garlic sauce', price: 20.00, is_featured: false, display_order: 3, tags: JSON.stringify(['popular', 'gluten_free']) },
	{ id: '30000000-0000-4000-a000-000000000073', section_id: '20000000-0000-4000-a000-000000000021', restaurant_id: '10000000-0000-4000-a000-000000000003', name: 'Grilled Sea Bass', description: 'Whole sea bass with lemon, herbs, and tahini sauce', price: 28.00, is_featured: false, display_order: 4, tags: JSON.stringify(['gluten_free']) },
	{ id: '30000000-0000-4000-a000-000000000074', section_id: '20000000-0000-4000-a000-000000000021', restaurant_id: '10000000-0000-4000-a000-000000000003', name: 'Lamb Chops', description: 'Four tender lamb chops marinated in rosemary and garlic', price: 30.00, is_featured: false, display_order: 5, tags: JSON.stringify(['new']) },

	// Wraps & Sandwiches
	{ id: '30000000-0000-4000-a000-000000000080', section_id: '20000000-0000-4000-a000-000000000022', restaurant_id: '10000000-0000-4000-a000-000000000003', name: 'Shawarma Wrap', description: 'Slow-roasted chicken shawarma with garlic sauce, pickles, and fries in fresh taboon bread', price: 11.00, is_featured: true, display_order: 1, tags: JSON.stringify(['popular']) },
	{ id: '30000000-0000-4000-a000-000000000081', section_id: '20000000-0000-4000-a000-000000000022', restaurant_id: '10000000-0000-4000-a000-000000000003', name: 'Falafel Wrap', description: 'Crispy falafel with hummus, fresh vegetables, and tahini', price: 9.00, is_featured: false, display_order: 2, tags: JSON.stringify(['vegetarian', 'vegan']) },
	{ id: '30000000-0000-4000-a000-000000000082', section_id: '20000000-0000-4000-a000-000000000022', restaurant_id: '10000000-0000-4000-a000-000000000003', name: 'Kafta Sandwich', description: 'Spiced ground beef with tomatoes, onions, and parsley in saj bread', price: 10.00, is_featured: false, display_order: 3, tags: JSON.stringify(['spicy']) },

	// Pepsi Drinks for Levant Kitchen
	...PEPSI_DRINKS('20000000-0000-4000-a000-000000000023', '10000000-0000-4000-a000-000000000003', 300),

	// Sweets
	{ id: '30000000-0000-4000-a000-000000000090', section_id: '20000000-0000-4000-a000-000000000024', restaurant_id: '10000000-0000-4000-a000-000000000003', name: 'Kunafa', description: 'Warm shredded phyllo pastry filled with sweet cheese, soaked in rose syrup', price: 10.00, is_featured: true, display_order: 1, tags: JSON.stringify(['vegetarian', 'popular']) },
	{ id: '30000000-0000-4000-a000-000000000091', section_id: '20000000-0000-4000-a000-000000000024', restaurant_id: '10000000-0000-4000-a000-000000000003', name: 'Baklava Assortment', description: 'Six pieces of pistachio and walnut baklava with honey syrup', price: 8.00, is_featured: false, display_order: 2, tags: JSON.stringify(['vegetarian']) },
	{ id: '30000000-0000-4000-a000-000000000092', section_id: '20000000-0000-4000-a000-000000000024', restaurant_id: '10000000-0000-4000-a000-000000000003', name: 'Mastic Ice Cream', description: 'Three scoops of traditional stretchy mastic ice cream with pistachios', price: 7.00, is_featured: false, display_order: 3, tags: JSON.stringify(['vegetarian', 'gluten_free']) },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface) {
		for (const item of ALL_ITEMS) {
			const existing = await queryInterface.rawSelect('menu_items', { where: { id: item.id } }, ['id']);
			if (!existing) {
				await queryInterface.bulkInsert('menu_items', [
					{
						...item,
						image: null,
						is_active: true,
						created_at: new Date(),
						updated_at: new Date(),
					},
				]);
			}
		}
	},

	async down(queryInterface) {
		await queryInterface.bulkDelete('menu_items', {
			id: ALL_ITEMS.map((i) => i.id),
		});
	},
};
