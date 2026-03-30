'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('menu_sections', {
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.literal('gen_random_uuid()'),
				primaryKey: true,
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
			icon: {
				type: Sequelize.STRING(100),
				allowNull: true,
			},
			display_order: {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
			is_active: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: true,
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

		await queryInterface.addIndex('menu_sections', ['restaurant_id'], {
			name: 'idx_menu_sections_restaurant_id',
		});
	},

	async down(queryInterface) {
		await queryInterface.dropTable('menu_sections');
	},
};
