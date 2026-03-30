import { Router } from 'express';
import { authenticate, authorize } from '../../middleware/auth.js';
import { restrictToOwnRestaurant } from '../../middleware/restaurantScope.js';
import { createCrudController } from '../../controllers/crud.controller.js';
import { menuItemService } from '../../services/menu-item.service.js';
import { upload, getFileUrl } from '../../middleware/upload.js';
import { body, validate, uuidParam } from '../../middleware/validate.js';
import { asyncHandler } from '../../middleware/asyncHandler.js';

const router = Router();
const controller = createCrudController(menuItemService);

router.use(authenticate, authorize('super_admin', 'restaurant_admin'), restrictToOwnRestaurant);

router.get('/', controller.list);
router.get('/:id', uuidParam(), validate, controller.getById);

router.post(
	'/',
	upload.array('images', 10),
	body('name').notEmpty().withMessage('Item name is required'),
	body('price').isDecimal().withMessage('Valid price is required'),
	body('section_id').isUUID(4).withMessage('Valid section ID is required'),
	body('restaurant_id').isUUID(4).withMessage('Valid restaurant ID is required'),
	validate,
	asyncHandler(async (req, res) => {
		const data = { ...req.body };
		if (req.files && Array.isArray(req.files) && req.files.length > 0) {
			data.images = req.files.map((f: Express.Multer.File) => getFileUrl(f.filename));
		}
		if (typeof data.tags === 'string') data.tags = JSON.parse(data.tags);
		if (typeof data.images === 'string') data.images = JSON.parse(data.images);
		const record = await menuItemService.create(data);
		res.status(201).json({ success: true, message: 'Menu item created', data: record });
	}),
);

router.put(
	'/:id',
	uuidParam(),
	upload.array('images', 10),
	validate,
	asyncHandler(async (req, res) => {
		const data = { ...req.body };
		if (req.files && Array.isArray(req.files) && req.files.length > 0) {
			// New files uploaded — merge with existing if provided
			const newImages = req.files.map((f: Express.Multer.File) => getFileUrl(f.filename));
			const existingImages = data.existingImages ? JSON.parse(data.existingImages) : [];
			data.images = [...existingImages, ...newImages];
			delete data.existingImages;
		} else if (data.existingImages) {
			data.images = JSON.parse(data.existingImages);
			delete data.existingImages;
		}
		if (typeof data.tags === 'string') data.tags = JSON.parse(data.tags);
		if (typeof data.images === 'string') data.images = JSON.parse(data.images);
		const record = await menuItemService.update(req.params.id, data);
		res.json({ success: true, message: 'Menu item updated', data: record });
	}),
);

router.delete('/:id', uuidParam(), validate, controller.remove);

export default router;
