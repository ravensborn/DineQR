import { Model, DataTypes, type Sequelize } from 'sequelize';

export interface RestaurantAttributes {
	id: string;
	name: string;
	slug: string;
	logo: string | null;
	description: string | null;
	address: string | null;
	phone: string | null;
	working_hours: Record<string, any> | null;
	is_active: boolean;
	theme_color: string | null;
	created_at?: Date;
	updated_at?: Date;
}

export class Restaurant extends Model<RestaurantAttributes> implements RestaurantAttributes {
	declare id: string;
	declare name: string;
	declare slug: string;
	declare logo: string | null;
	declare description: string | null;
	declare address: string | null;
	declare phone: string | null;
	declare working_hours: Record<string, any> | null;
	declare is_active: boolean;
	declare theme_color: string | null;
	declare created_at: Date;
	declare updated_at: Date;
}

export function initRestaurant(sequelize: Sequelize) {
	Restaurant.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING(200),
				allowNull: false,
			},
			slug: {
				type: DataTypes.STRING(200),
				allowNull: false,
				unique: true,
			},
			logo: {
				type: DataTypes.STRING(500),
				allowNull: true,
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			address: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			phone: {
				type: DataTypes.STRING(30),
				allowNull: true,
			},
			working_hours: {
				type: DataTypes.JSONB,
				allowNull: true,
			},
			is_active: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
			theme_color: {
				type: DataTypes.STRING(7),
				allowNull: true,
			},
		},
		{
			sequelize,
			tableName: 'restaurants',
			underscored: true,
			timestamps: true,
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	);
}

export function associateRestaurant(models: { MenuSection: any; MenuItem: any; User: any }) {
	Restaurant.hasMany(models.MenuSection, { foreignKey: 'restaurant_id', as: 'sections' });
	Restaurant.hasMany(models.MenuItem, { foreignKey: 'restaurant_id', as: 'items' });
	Restaurant.hasMany(models.User, { foreignKey: 'restaurant_id', as: 'users' });
}
