'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('restaurants', {
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.literal('gen_random_uuid()'),
				primaryKey: true,
			},
			name: {
				type: Sequelize.STRING(200),
				allowNull: false,
			},
			slug: {
				type: Sequelize.STRING(200),
				allowNull: false,
				unique: true,
			},
			logo: {
				type: Sequelize.STRING(500),
				allowNull: true,
			},
			description: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			address: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			phone: {
				type: Sequelize.STRING(30),
				allowNull: true,
			},
			working_hours: {
				type: Sequelize.JSONB,
				allowNull: true,
			},
			is_active: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
			theme_color: {
				type: Sequelize.STRING(7),
				allowNull: true,
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
	},

	async down(queryInterface) {
		await queryInterface.dropTable('restaurants');
	},
};
