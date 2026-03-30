import { Router } from 'express';
import { authenticate, authorize } from '../../middleware/auth.js';
import { restrictToOwnRestaurant } from '../../middleware/restaurantScope.js';
import { createCrudController } from '../../controllers/crud.controller.js';
import { adPanelService } from '../../services/ad-panel.service.js';
import { upload, getFileUrl } from '../../middleware/upload.js';
import { body, validate, uuidParam } from '../../middleware/validate.js';
import { asyncHandler } from '../../middleware/asyncHandler.js';

const router = Router();
const controller = createCrudController(adPanelService);

router.use(authenticate, authorize('super_admin', 'restaurant_admin'), restrictToOwnRestaurant);

router.get('/', controller.list);
router.get('/:id', uuidParam(), validate, controller.getById);

router.post(
	'/',
	upload.single('image'),
	body('title').notEmpty().withMessage('Title is required'),
	body('restaurant_id').isUUID(4).withMessage('Valid restaurant ID is required'),
	body('position').isIn(['top', 'sidebar', 'inline']).withMessage('Position must be top, sidebar, or inline'),
	validate,
	asyncHandler(async (req, res) => {
		const data = { ...req.body };
		if (req.file) {
			data.image = getFileUrl(req.file.filename);
		}
		const record = await adPanelService.create(data);
		res.status(201).json({ success: true, message: 'Ad panel created', data: record });
	}),
);

router.put(
	'/:id',
	uuidParam(),
	upload.single('image'),
	validate,
	asyncHandler(async (req, res) => {
		const data = { ...req.body };
		if (req.file) {
			data.image = getFileUrl(req.file.filename);
		}
		const record = await adPanelService.update(req.params.id, data);
		res.json({ success: true, message: 'Ad panel updated', data: record });
	}),
);

router.delete('/:id', uuidParam(), validate, controller.remove);

export default router;
