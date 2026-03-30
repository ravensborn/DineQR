import { Router } from 'express';
import { authenticate, authorize } from '../../middleware/auth.js';
import { asyncHandler } from '../../middleware/asyncHandler.js';
import { Restaurant, MenuSection, MenuItem, User } from '../../models/index.js';

const router = Router();

router.use(authenticate, authorize('super_admin', 'restaurant_admin'));

router.get(
	'/stats',
	asyncHandler(async (req, res) => {
		const isRestaurantAdmin = req.user!.role === 'restaurant_admin';
		const restaurantWhere = isRestaurantAdmin ? { restaurant_id: req.user!.restaurant_id } : {};

		const [restaurants, sections, items, users] = await Promise.all([
			isRestaurantAdmin ? 1 : Restaurant.count({ where: { is_active: true } }),
			MenuSection.count({ where: { ...restaurantWhere, is_active: true } }),
			MenuItem.count({ where: { ...restaurantWhere, is_active: true } }),
			isRestaurantAdmin ? 0 : User.count({ where: { is_active: true } }),
		]);

		res.json({
			success: true,
			data: {
				counts: { restaurants, sections, items, users },
			},
		});
	}),
);

export default router;
