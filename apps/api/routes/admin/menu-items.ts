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
	upload.single('image'),
	body('name').notEmpty().withMessage('Item name is required'),
	body('price').isDecimal().withMessage('Valid price is required'),
	body('section_id').isUUID(4).withMessage('Valid section ID is required'),
	body('restaurant_id').isUUID(4).withMessage('Valid restaurant ID is required'),
	validate,
	asyncHandler(async (req, res) => {
		const data = { ...req.body };
		if (req.file) data.image = getFileUrl(req.file.filename);
		if (typeof data.tags === 'string') data.tags = JSON.parse(data.tags);
		const record = await menuItemService.create(data);
		res.status(201).json({ success: true, message: 'Menu item created', data: record });
	}),
);

router.put(
	'/:id',
	uuidParam(),
	upload.single('image'),
	validate,
	asyncHandler(async (req, res) => {
		const data = { ...req.body };
		if (req.file) data.image = getFileUrl(req.file.filename);
		if (typeof data.tags === 'string') data.tags = JSON.parse(data.tags);
		const record = await menuItemService.update(req.params.id, data);
		res.json({ success: true, message: 'Menu item updated', data: record });
	}),
);

router.delete('/:id', uuidParam(), validate, controller.remove);

export default router;
