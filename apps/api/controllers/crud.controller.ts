import type { Request, Response } from 'express';
import { asyncHandler } from '../middleware/asyncHandler.js';

export function createCrudController(service: any) {
	return {
		list: asyncHandler(async (req: Request, res: Response) => {
			const result = await service.list(req);
			res.json({ success: true, data: result });
		}),

		getById: asyncHandler(async (req: Request, res: Response) => {
			const record = await service.getById(req.params.id);
			res.json({ success: true, data: record });
		}),

		create: asyncHandler(async (req: Request, res: Response) => {
			const record = await service.create(req.body);
			res.status(201).json({ success: true, message: 'Created successfully', data: record });
		}),

		update: asyncHandler(async (req: Request, res: Response) => {
			const record = await service.update(req.params.id, req.body);
			res.json({ success: true, message: 'Updated successfully', data: record });
		}),

		remove: asyncHandler(async (req: Request, res: Response) => {
			const result = await service.remove(req.params.id);
			res.json({ success: true, message: result.message, data: null });
		}),
	};
}
