import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env', override: false });

const sequelize = new Sequelize({
  database: process.env.DB_NAME || 'dineqr_db',
  username: process.env.DB_USER || 'dineqr',
  password: process.env.DB_PASS || 'dineqr_secret',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  dialect: 'postgres',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export default sequelize;
