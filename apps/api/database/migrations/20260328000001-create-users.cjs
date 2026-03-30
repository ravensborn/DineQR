'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('users', {
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.literal('gen_random_uuid()'),
				primaryKey: true,
			},
			name: {
				type: Sequelize.STRING(100),
				allowNull: false,
			},
			email: {
				type: Sequelize.STRING(255),
				allowNull: false,
				unique: true,
			},
			password_hash: {
				type: Sequelize.STRING(255),
				allowNull: false,
			},
			role: {
				type: Sequelize.ENUM('super_admin', 'restaurant_admin'),
				allowNull: false,
				defaultValue: 'restaurant_admin',
			},
			restaurant_id: {
				type: Sequelize.UUID,
				allowNull: true,
				defaultValue: null,
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
	},

	async down(queryInterface) {
		await queryInterface.dropTable('users');
		await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_users_role";');
	},
};
