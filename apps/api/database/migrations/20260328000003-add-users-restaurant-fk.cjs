'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addConstraint('users', {
			fields: ['restaurant_id'],
			type: 'foreign key',
			name: 'fk_users_restaurant_id',
			references: {
				table: 'restaurants',
				field: 'id',
			},
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		});

		await queryInterface.addIndex('users', ['restaurant_id'], {
			name: 'idx_users_restaurant_id',
		});
	},

	async down(queryInterface) {
		await queryInterface.removeConstraint('users', 'fk_users_restaurant_id');
		await queryInterface.removeIndex('users', 'idx_users_restaurant_id');
	},
};
