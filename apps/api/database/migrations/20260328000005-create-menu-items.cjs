'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('menu_items', {
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.literal('gen_random_uuid()'),
				primaryKey: true,
			},
			section_id: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: 'menu_sections',
					key: 'id',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
			restaurant_id: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: 'restaurants',
					key: 'id',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
			name: {
				type: Sequelize.STRING(200),
				allowNull: false,
			},
			description: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			price: {
				type: Sequelize.DECIMAL(10, 2),
				allowNull: false,
			},
			image: {
				type: Sequelize.STRING(500),
				allowNull: true,
			},
			is_featured: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			is_active: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
			display_order: {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
			tags: {
				type: Sequelize.JSONB,
				allowNull: true,
				defaultValue: [],
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('NOW()'),
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('NOW()'),
			},
		});

		await queryInterface.addIndex('menu_items', ['section_id'], {
			name: 'idx_menu_items_section_id',
		});
		await queryInterface.addIndex('menu_items', ['restaurant_id'], {
			name: 'idx_menu_items_restaurant_id',
		});
	},

	async down(queryInterface) {
		await queryInterface.dropTable('menu_items');
	},
};
