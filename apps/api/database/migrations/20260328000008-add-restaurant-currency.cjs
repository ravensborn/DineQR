'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn('restaurants', 'currency', {
			type: Sequelize.STRING(5),
			allowNull: false,
			defaultValue: 'USD',
		});
	},

	async down(queryInterface) {
		await queryInterface.removeColumn('restaurants', 'currency');
	},
};
