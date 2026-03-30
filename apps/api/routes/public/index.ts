import { Router } from 'express';
import { asyncHandler } from '../../middleware/asyncHandler.js';
import { publicLimiter } from '../../middleware/rateLimiter.js';
import { Restaurant, MenuSection, MenuItem } from '../../models/index.js';
import { ApiError } from '../../utils/ApiError.js';

const router = Router();

router.use(publicLimiter);

// Get restaurant by slug
router.get(
	'/restaurants/:slug',
	asyncHandler(async (req, res) => {
		const restaurant = await Restaurant.findOne({
			where: { slug: req.params.slug, is_active: true },
		});
		if (!restaurant) throw new ApiError(404, 'Restaurant not found');
		res.json({ success: true, data: restaurant });
	}),
);

// Get full menu for a restaurant
router.get(
	'/restaurants/:slug/menu',
	asyncHandler(async (req, res) => {
		const restaurant = await Restaurant.findOne({
			where: { slug: req.params.slug, is_active: true },
		});
		if (!restaurant) throw new ApiError(404, 'Restaurant not found');

		const sections = await MenuSection.findAll({
			where: { restaurant_id: restaurant.id, is_active: true },
			order: [
				['display_order', 'ASC'],
				[{ model: MenuItem, as: 'items' }, 'display_order', 'ASC'],
			],
			include: [
				{
					model: MenuItem,
					as: 'items',
					where: { is_active: true },
					required: false,
				},
			],
		});

		res.json({ success: true, data: { restaurant, sections } });
	}),
);

// List all active restaurants (for landing page)
router.get(
	'/restaurants',
	asyncHandler(async (_req, res) => {
		const restaurants = await Restaurant.findAll({
			where: { is_active: true },
			attributes: ['id', 'name', 'slug', 'logo', 'description', 'address'],
			order: [['name', 'ASC']],
		});
		res.json({ success: true, data: restaurants });
	}),
);

export default router;
