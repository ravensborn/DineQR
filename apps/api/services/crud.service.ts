import { Op, type Model, type ModelStatic, type FindOptions, type WhereOptions } from 'sequelize';
import { ApiError } from '../utils/ApiError.js';
import { getPagination, getPaginatedResponse } from '../helper/paginate.js';
import type { Request } from 'express';

export interface CrudServiceOptions {
	entityName: string;
	searchableFields?: string[];
	filterableFields?: string[];
	defaultOrder?: [string, string][];
	includes?: any[];
	listAttributes?: string[];
}

export function createCrudService<T extends Model>(model: ModelStatic<T>, opts: CrudServiceOptions) {
	const { entityName, searchableFields = [], filterableFields = [], defaultOrder = [['created_at', 'DESC']], includes = [], listAttributes } = opts;

	return {
		async list(req: Request) {
			const { page, limit, offset } = getPagination(req);
			const where: WhereOptions = {};

			// Search
			const search = req.query.search as string;
			if (search && searchableFields.length > 0) {
				(where as any)[Op.or] = searchableFields.map((field) => ({
					[field]: { [Op.iLike]: `%${search}%` },
				}));
			}

			// Filters
			for (const field of filterableFields) {
				const value = req.query[field];
				if (value !== undefined && value !== '') {
					(where as any)[field] = value;
				}
			}

			const findOptions: FindOptions = {
				where,
				order: defaultOrder as any,
				limit,
				offset,
				include: includes,
			};

			if (listAttributes) {
				findOptions.attributes = listAttributes;
			}

			const { count, rows } = await model.findAndCountAll(findOptions);
			return getPaginatedResponse(rows, count, { page, limit, offset });
		},

		async getById(id: string) {
			const record = await model.findByPk(id, { include: includes });
			if (!record) throw new ApiError(404, `${entityName} not found`);
			return record;
		},

		async create(data: any) {
			return model.create(data);
		},

		async update(id: string, data: any) {
			const record = await model.findByPk(id);
			if (!record) throw new ApiError(404, `${entityName} not found`);
			return record.update(data);
		},

		async remove(id: string) {
			const record = await model.findByPk(id);
			if (!record) throw new ApiError(404, `${entityName} not found`);
			await record.destroy();
			return { message: `${entityName} deleted successfully` };
		},
	};
}
