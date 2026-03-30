import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

import app from './app.js';
import { sequelize } from './models/index.js';
import logger from './utils/logger.js';

const PORT = parseInt(process.env.PORT || '4000', 10);
const HOST = process.env.HOST || '0.0.0.0';

async function start() {
  try {
    await sequelize.authenticate();
    logger.info('Database connection established successfully.');

    app.listen(PORT, HOST, () => {
      logger.info(`API server running at http://${HOST}:${PORT}`);
    });
  } catch (error) {
    logger.error('Unable to start server:', error);
    process.exit(1);
  }
}

start();
