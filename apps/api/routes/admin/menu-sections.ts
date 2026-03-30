import { Router } from 'express';
import { authenticate, authorize } from '../../middleware/auth.js';
import { restrictToOwnRestaurant } from '../../middleware/restaurantScope.js';
import { createCrudController } from '../../controllers/crud.controller.js';
import { menuSectionService } from '../../services/menu-section.service.js';
import { body, validate, uuidParam } from '../../middleware/validate.js';

const router = Router();
const controller = createCrudController(menuSectionService);

router.use(authenticate, authorize('super_admin', 'restaurant_admin'), restrictToOwnRestaurant);

router.get('/', controller.list);
router.get('/:id', uuidParam(), validate, controller.getById);

router.post(
	'/',
	body('name').notEmpty().withMessage('Section name is required'),
	body('restaurant_id').isUUID(4).withMessage('Valid restaurant ID is required'),
	validate,
	controller.create,
);

router.put(
	'/:id',
	uuidParam(),
	validate,
	controller.update,
);

router.delete('/:id', uuidParam(), validate, controller.remove);

export default router;
