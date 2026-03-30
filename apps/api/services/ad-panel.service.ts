import { AdPanel } from '../models/index.js';
import { Restaurant } from '../models/index.js';
import { createCrudService } from './crud.service.js';

export const adPanelService = createCrudService(AdPanel, {
	entityName: 'Ad Panel',
	searchableFields: ['title'],
	filterableFields: ['restaurant_id', 'position', 'is_active'],
	defaultOrder: [['display_order', 'ASC']],
	includes: [{ model: Restaurant, as: 'restaurant', attributes: ['id', 'name', 'slug'] }],
});
