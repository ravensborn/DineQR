require('dotenv').config({ path: '../../.env', override: false });

const config = {
  username: process.env.DB_USER || 'dineqr',
  password: process.env.DB_PASS || 'dineqr_secret',
  database: process.env.DB_NAME || 'dineqr_db',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  dialect: 'postgres',
  logging: false,
};

module.exports = {
  development: config,
  production: { ...config, logging: false },
};
