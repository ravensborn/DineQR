import { MenuSection } from '../models/index.js';
import { Restaurant } from '../models/index.js';
import { createCrudService } from './crud.service.js';

export const menuSectionService = createCrudService(MenuSection, {
	entityName: 'Menu Section',
	searchableFields: ['name'],
	filterableFields: ['restaurant_id', 'is_active'],
	defaultOrder: [['display_order', 'ASC']],
	includes: [{ model: Restaurant, as: 'restaurant', attributes: ['id', 'name', 'slug'] }],
});
