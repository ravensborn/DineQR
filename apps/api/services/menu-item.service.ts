import { MenuItem, MenuSection, Restaurant } from '../models/index.js';
import { createCrudService } from './crud.service.js';

export const menuItemService = createCrudService(MenuItem, {
	entityName: 'Menu Item',
	searchableFields: ['name', 'description'],
	filterableFields: ['restaurant_id', 'section_id', 'is_active', 'is_featured'],
	defaultOrder: [['display_order', 'ASC']],
	includes: [
		{ model: MenuSection, as: 'section', attributes: ['id', 'name'] },
		{ model: Restaurant, as: 'restaurant', attributes: ['id', 'name', 'slug'] },
	],
});
