import { Model, DataTypes, type Sequelize } from 'sequelize';

export interface MenuSectionAttributes {
	id: string;
	restaurant_id: string;
	name: string;
	description: string | null;
	icon: string | null;
	display_order: number;
	is_active: boolean;
	created_at?: Date;
	updated_at?: Date;
}

export class MenuSection extends Model<MenuSectionAttributes> implements MenuSectionAttributes {
	declare id: string;
	declare restaurant_id: string;
	declare name: string;
	declare description: string | null;
	declare icon: string | null;
	declare display_order: number;
	declare is_active: boolean;
	declare created_at: Date;
	declare updated_at: Date;
}

export function initMenuSection(sequelize: Sequelize) {
	MenuSection.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
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
			icon: {
				type: DataTypes.STRING(100),
				allowNull: true,
			},
			display_order: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
			is_active: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
		},
		{
			sequelize,
			tableName: 'menu_sections',
			underscored: true,
			timestamps: true,
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	);
}

export function associateMenuSection(models: { Restaurant: any; MenuItem: any }) {
	MenuSection.belongsTo(models.Restaurant, { foreignKey: 'restaurant_id', as: 'restaurant' });
	MenuSection.hasMany(models.MenuItem, { foreignKey: 'section_id', as: 'items' });
}
