'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('ad_panels', {
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
			},
			restaurant_id: {
				type: Sequelize.UUID,
				allowNull: false,
				references: { model: 'restaurants', key: 'id' },
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			title: {
				type: Sequelize.STRING(200),
				allowNull: false,
			},
			image: {
				type: Sequelize.STRING(500),
				allowNull: false,
			},
			link: {
				type: Sequelize.STRING(500),
				allowNull: true,
			},
			position: {
				type: Sequelize.ENUM('top', 'sidebar', 'inline'),
				allowNull: false,
				defaultValue: 'inline',
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
				defaultValue: Sequelize.fn('NOW'),
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.fn('NOW'),
			},
		});

		await queryInterface.addIndex('ad_panels', ['restaurant_id']);
		await queryInterface.addIndex('ad_panels', ['position']);
	},

	async down(queryInterface) {
		await queryInterface.dropTable('ad_panels');
	},
};
