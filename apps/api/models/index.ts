import sequelize from '../config/database.js';
import { User, initUser, associateUser } from './User.js';
import { Restaurant, initRestaurant, associateRestaurant } from './Restaurant.js';
import { MenuSection, initMenuSection, associateMenuSection } from './MenuSection.js';
import { MenuItem, initMenuItem, associateMenuItem } from './MenuItem.js';
import { AdPanel, initAdPanel, associateAdPanel } from './AdPanel.js';

// Initialize models
initUser(sequelize);
initRestaurant(sequelize);
initMenuSection(sequelize);
initMenuItem(sequelize);
initAdPanel(sequelize);

// All models for association references
const models = { User, Restaurant, MenuSection, MenuItem, AdPanel };

// Setup associations
associateUser(models);
associateRestaurant(models);
associateMenuSection(models);
associateMenuItem(models);
associateAdPanel(models);

export { sequelize, User, Restaurant, MenuSection, MenuItem, AdPanel };
