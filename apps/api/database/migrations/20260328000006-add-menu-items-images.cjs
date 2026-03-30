'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn('menu_items', 'images', {
			type: Sequelize.JSONB,
			allowNull: true,
			defaultValue: [],
		});

		// Migrate existing image data to images array
		await queryInterface.sequelize.query(`
			UPDATE menu_items
			SET images = CASE
				WHEN image IS NOT NULL AND image != '' THEN jsonb_build_array(image)
				ELSE '[]'::jsonb
			END
		`);
	},

	async down(queryInterface) {
		await queryInterface.removeColumn('menu_items', 'images');
	},
};
