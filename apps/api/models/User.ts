import { Model, DataTypes, type Sequelize } from 'sequelize';

export interface UserAttributes {
	id: string;
	name: string;
	email: string;
	password_hash: string;
	role: 'super_admin' | 'restaurant_admin';
	restaurant_id: string | null;
	is_active: boolean;
	created_at?: Date;
	updated_at?: Date;
}

export class User extends Model<UserAttributes> implements UserAttributes {
	declare id: string;
	declare name: string;
	declare email: string;
	declare password_hash: string;
	declare role: 'super_admin' | 'restaurant_admin';
	declare restaurant_id: string | null;
	declare is_active: boolean;
	declare created_at: Date;
	declare updated_at: Date;
}

export function initUser(sequelize: Sequelize) {
	User.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING(255),
				allowNull: false,
				unique: true,
			},
			password_hash: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			role: {
				type: DataTypes.ENUM('super_admin', 'restaurant_admin'),
				allowNull: false,
				defaultValue: 'restaurant_admin',
			},
			restaurant_id: {
				type: DataTypes.UUID,
				allowNull: true,
			},
			is_active: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
		},
		{
			sequelize,
			tableName: 'users',
			underscored: true,
			timestamps: true,
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	);
}

export function associateUser(models: { Restaurant: any }) {
	User.belongsTo(models.Restaurant, { foreignKey: 'restaurant_id', as: 'restaurant' });
}
