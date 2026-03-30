import { Router } from 'express';
import { authenticate, authorize } from '../../middleware/auth.js';
import { createCrudController } from '../../controllers/crud.controller.js';
import { restaurantService } from '../../services/restaurant.service.js';
import { generateQRCodePNG, generateQRCodeSVG, getMenuUrl } from '../../services/qrcode.service.js';
import { upload, getFileUrl } from '../../middleware/upload.js';
import { body, validate, uuidParam } from '../../middleware/validate.js';
import { asyncHandler } from '../../middleware/asyncHandler.js';
import { Restaurant } from '../../models/index.js';
import { ApiError } from '../../utils/ApiError.js';

const router = Router();
const controller = createCrudController(restaurantService);

router.use(authenticate, authorize('super_admin'));

// List
router.get('/', controller.list);

// Get by ID
router.get('/:id', uuidParam(), validate, controller.getById);

// Create
router.post(
	'/',
	upload.single('logo'),
	body('name').notEmpty().withMessage('Name is required'),
	body('slug').notEmpty().withMessage('Slug is required').matches(/^[a-z0-9-]+$/).withMessage('Slug must be lowercase with hyphens only'),
	validate,
	asyncHandler(async (req, res) => {
		const data = { ...req.body };
		if (req.file) data.logo = getFileUrl(req.file.filename);
		const record = await restaurantService.create(data);
		res.status(201).json({ success: true, message: 'Restaurant created', data: record });
	}),
);

// Update
router.put(
	'/:id',
	uuidParam(),
	upload.single('logo'),
	validate,
	asyncHandler(async (req, res) => {
		const data = { ...req.body };
		if (req.file) data.logo = getFileUrl(req.file.filename);
		const record = await restaurantService.update(req.params.id, data);
		res.json({ success: true, message: 'Restaurant updated', data: record });
	}),
);

// Delete
router.delete('/:id', uuidParam(), validate, controller.remove);

// QR Code generation
router.get(
	'/:id/qr-code',
	uuidParam(),
	validate,
	asyncHandler(async (req, res) => {
		const restaurant = await Restaurant.findByPk(req.params.id);
		if (!restaurant) throw new ApiError(404, 'Restaurant not found');

		const format = req.query.format as string;
		const menuUrl = getMenuUrl(restaurant.slug);

		if (format === 'svg') {
			const svg = await generateQRCodeSVG(restaurant.slug);
			res.set('Content-Type', 'image/svg+xml');
			res.send(svg);
		} else {
			const png = await generateQRCodePNG(restaurant.slug);
			res.set('Content-Type', 'image/png');
			res.set('Content-Disposition', `attachment; filename="${restaurant.slug}-qr.png"`);
			res.send(png);
		}
	}),
);

// Get menu URL for restaurant
router.get(
	'/:id/menu-url',
	uuidParam(),
	validate,
	asyncHandler(async (req, res) => {
		const restaurant = await Restaurant.findByPk(req.params.id);
		if (!restaurant) throw new ApiError(404, 'Restaurant not found');
		res.json({ success: true, data: { url: getMenuUrl(restaurant.slug) } });
	}),
);

export default router;
