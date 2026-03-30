'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		// Add i18n columns to restaurants
		await queryInterface.addColumn('restaurants', 'default_language', {
			type: Sequelize.STRING(5),
			allowNull: false,
			defaultValue: 'en',
		});
		await queryInterface.addColumn('restaurants', 'name_i18n', {
			type: Sequelize.JSONB,
			allowNull: true,
		});
		await queryInterface.addColumn('restaurants', 'description_i18n', {
			type: Sequelize.JSONB,
			allowNull: true,
		});

		// Add i18n columns to menu_sections
		await queryInterface.addColumn('menu_sections', 'name_i18n', {
			type: Sequelize.JSONB,
			allowNull: true,
		});
		await queryInterface.addColumn('menu_sections', 'description_i18n', {
			type: Sequelize.JSONB,
			allowNull: true,
		});

		// Add i18n columns to menu_items
		await queryInterface.addColumn('menu_items', 'name_i18n', {
			type: Sequelize.JSONB,
			allowNull: true,
		});
		await queryInterface.addColumn('menu_items', 'description_i18n', {
			type: Sequelize.JSONB,
			allowNull: true,
		});
	},

	async down(queryInterface) {
		await queryInterface.removeColumn('menu_items', 'description_i18n');
		await queryInterface.removeColumn('menu_items', 'name_i18n');
		await queryInterface.removeColumn('menu_sections', 'description_i18n');
		await queryInterface.removeColumn('menu_sections', 'name_i18n');
		await queryInterface.removeColumn('restaurants', 'description_i18n');
		await queryInterface.removeColumn('restaurants', 'name_i18n');
		await queryInterface.removeColumn('restaurants', 'default_language');
	},
};
