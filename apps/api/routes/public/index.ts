import { Router } from 'express';
import { asyncHandler } from '../../middleware/asyncHandler.js';
import { publicLimiter } from '../../middleware/rateLimiter.js';
import { Restaurant, MenuSection, MenuItem, AdPanel } from '../../models/index.js';
import { ApiError } from '../../utils/ApiError.js';

const router = Router();

router.use(publicLimiter);

/**
 * Resolve a translated value from an i18n JSON column.
 * Falls back: requested lang → restaurant default_language → base field.
 */
function t(
	i18nField: Record<string, string> | null | undefined,
	baseValue: string | null,
	lang: string | undefined,
	defaultLang: string = 'en',
): string | null {
	if (lang && i18nField?.[lang]) return i18nField[lang];
	if (i18nField?.[defaultLang]) return i18nField[defaultLang];
	return baseValue;
}

/** Apply translations to a plain object */
function translateRecord(
	record: any,
	lang: string | undefined,
	defaultLang: string,
	fields: string[] = ['name', 'description'],
) {
	const obj = record.toJSON ? record.toJSON() : { ...record };
	for (const field of fields) {
		obj[field] = t(obj[`${field}_i18n`], obj[field], lang, defaultLang);
	}
	return obj;
}

// Get restaurant by slug
router.get(
	'/restaurants/:slug',
	asyncHandler(async (req, res) => {
		const lang = req.query.lang as string | undefined;
		const restaurant = await Restaurant.findOne({
			where: { slug: req.params.slug, is_active: true },
		});
		if (!restaurant) throw new ApiError(404, 'Restaurant not found');

		const translated = translateRecord(restaurant, lang, restaurant.default_language);
		res.json({ success: true, data: translated });
	}),
);

// Get full menu for a restaurant
router.get(
	'/restaurants/:slug/menu',
	asyncHandler(async (req, res) => {
		const lang = req.query.lang as string | undefined;
		const restaurant = await Restaurant.findOne({
			where: { slug: req.params.slug, is_active: true },
		});
		if (!restaurant) throw new ApiError(404, 'Restaurant not found');

		const defaultLang = restaurant.default_language;

		const sections = await MenuSection.findAll({
			where: { restaurant_id: restaurant.id, is_active: true },
			order: [['display_order', 'ASC']],
			include: [
				{
					model: MenuItem,
					as: 'items',
					where: { is_active: true },
					required: false,
					separate: true,
					order: [['display_order', 'ASC']],
				},
			],
		});

		const [translatedRestaurant, ads] = await Promise.all([
			Promise.resolve(translateRecord(restaurant, lang, defaultLang)),
			AdPanel.findAll({
				where: { restaurant_id: restaurant.id, is_active: true },
				order: [['display_order', 'ASC']],
				attributes: ['id', 'image', 'link', 'position'],
			}),
		]);

		const translatedSections = sections.map((section) => {
			const s = translateRecord(section, lang, defaultLang);
			if (s.items) {
				s.items = s.items.map((item: any) => translateRecord(item, lang, defaultLang));
			}
			return s;
		});

		res.json({
			success: true,
			data: {
				restaurant: translatedRestaurant,
				sections: translatedSections,
				ads: ads.map((a) => a.toJSON()),
			},
		});
	}),
);

// List all active restaurants (for landing page)
router.get(
	'/restaurants',
	asyncHandler(async (req, res) => {
		const lang = req.query.lang as string | undefined;
		const restaurants = await Restaurant.findAll({
			where: { is_active: true },
			attributes: ['id', 'name', 'slug', 'logo', 'description', 'address', 'default_language', 'currency', 'name_i18n', 'description_i18n'],
			order: [['name', 'ASC']],
		});
		const translated = restaurants.map((r) => translateRecord(r, lang, r.default_language));
		res.json({ success: true, data: translated });
	}),
);

export default router;
