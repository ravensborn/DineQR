import { Restaurant } from '../models/index.js';
import { createCrudService } from './crud.service.js';

export const restaurantService = createCrudService(Restaurant, {
	entityName: 'Restaurant',
	searchableFields: ['name', 'slug', 'address'],
	filterableFields: ['is_active'],
	defaultOrder: [['name', 'ASC']],
});
