import { Model, DataTypes, type Sequelize } from 'sequelize';

export interface AdPanelAttributes {
	id: string;
	restaurant_id: string;
	title: string;
	image: string;
	link: string | null;
	position: 'top' | 'sidebar' | 'inline';
	display_order: number;
	is_active: boolean;
	created_at?: Date;
	updated_at?: Date;
}

export class AdPanel extends Model<AdPanelAttributes> implements AdPanelAttributes {
	declare id: string;
	declare restaurant_id: string;
	declare title: string;
	declare image: string;
	declare link: string | null;
	declare position: 'top' | 'sidebar' | 'inline';
	declare display_order: number;
	declare is_active: boolean;
	declare created_at: Date;
	declare updated_at: Date;
}

export function initAdPanel(sequelize: Sequelize) {
	AdPanel.init(
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
			title: {
				type: DataTypes.STRING(200),
				allowNull: false,
			},
			image: {
				type: DataTypes.STRING(500),
				allowNull: false,
			},
			link: {
				type: DataTypes.STRING(500),
				allowNull: true,
			},
			position: {
				type: DataTypes.ENUM('top', 'sidebar', 'inline'),
				allowNull: false,
				defaultValue: 'inline',
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
			tableName: 'ad_panels',
			underscored: true,
			timestamps: true,
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	);
}

export function associateAdPanel(models: { Restaurant: any }) {
	AdPanel.belongsTo(models.Restaurant, { foreignKey: 'restaurant_id', as: 'restaurant' });
}
