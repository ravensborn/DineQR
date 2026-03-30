import { Router } from 'express';
import { authenticate, authorize } from '../../middleware/auth.js';
import { createCrudController } from '../../controllers/crud.controller.js';
import { userService } from '../../services/user.service.js';
import { body, validate, uuidParam } from '../../middleware/validate.js';

const router = Router();
const controller = createCrudController(userService);

router.use(authenticate, authorize('super_admin'));

router.get('/', controller.list);
router.get('/:id', uuidParam(), validate, controller.getById);

router.post(
	'/',
	body('name').notEmpty().withMessage('Name is required'),
	body('email').isEmail().withMessage('Valid email is required'),
	body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
	body('role').isIn(['super_admin', 'restaurant_admin']).withMessage('Invalid role'),
	validate,
	async (req: any, res: any) => {
		const record = await userService.create(req.body);
		res.status(201).json({ success: true, message: 'User created', data: record });
	},
);

router.put(
	'/:id',
	uuidParam(),
	validate,
	async (req: any, res: any) => {
		const record = await userService.update(req.params.id, req.body);
		res.json({ success: true, message: 'User updated', data: record });
	},
);

router.delete('/:id', uuidParam(), validate, controller.remove);

export default router;
