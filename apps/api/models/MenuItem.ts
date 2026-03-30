import { Model, DataTypes, type Sequelize } from 'sequelize';

export interface MenuItemAttributes {
	id: string;
	section_id: string;
	restaurant_id: string;
	name: string;
	description: string | null;
	price: number;
	image: string | null;
	is_featured: boolean;
	is_active: boolean;
	display_order: number;
	tags: string[];
	created_at?: Date;
	updated_at?: Date;
}

export class MenuItem extends Model<MenuItemAttributes> implements MenuItemAttributes {
	declare id: string;
	declare section_id: string;
	declare restaurant_id: string;
	declare name: string;
	declare description: string | null;
	declare price: number;
	declare image: string | null;
	declare is_featured: boolean;
	declare is_active: boolean;
	declare display_order: number;
	declare tags: string[];
	declare created_at: Date;
	declare updated_at: Date;
}

export function initMenuItem(sequelize: Sequelize) {
	MenuItem.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			section_id: {
				type: DataTypes.UUID,
				allowNull: false,
			},
			restaurant_id: {
				type: DataTypes.UUID,
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING(200),
				allowNull: false,
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			price: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: false,
			},
			image: {
				type: DataTypes.STRING(500),
				allowNull: true,
			},
			is_featured: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			is_active: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
			display_order: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
			tags: {
				type: DataTypes.JSONB,
				allowNull: true,
				defaultValue: [],
			},
		},
		{
			sequelize,
			tableName: 'menu_items',
			underscored: true,
			timestamps: true,
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	);
}

export function associateMenuItem(models: { MenuSection: any; Restaurant: any }) {
	MenuItem.belongsTo(models.MenuSection, { foreignKey: 'section_id', as: 'section' });
	MenuItem.belongsTo(models.Restaurant, { foreignKey: 'restaurant_id', as: 'restaurant' });
}
