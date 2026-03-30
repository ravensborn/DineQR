import type { UserRole, MenuItemTag } from './constants';

export interface BaseEntity {
	id: string;
	created_at: string;
	updated_at: string;
}

export interface User extends BaseEntity {
	name: string;
	email: string;
	role: UserRole;
	restaurant_id: string | null;
	is_active: boolean;
}

export interface Restaurant extends BaseEntity {
	name: string;
	slug: string;
	logo: string | null;
	description: string | null;
	address: string | null;
	phone: string | null;
	working_hours: WorkingHours | null;
	is_active: boolean;
	theme_color: string | null;
}

export interface MenuSection extends BaseEntity {
	restaurant_id: string;
	name: string;
	description: string | null;
	icon: string | null;
	display_order: number;
	is_active: boolean;
}

export interface MenuItem extends BaseEntity {
	section_id: string;
	restaurant_id: string;
	name: string;
	description: string | null;
	price: number;
	image: string | null;
	is_featured: boolean;
	is_active: boolean;
	display_order: number;
	tags: MenuItemTag[];
}

export interface WorkingHours {
	[day: string]: { open: string; close: string; closed?: boolean };
}

export interface PaginatedResponse<T> {
	records: T[];
	meta: {
		total: number;
		page: number;
		limit: number;
		total_pages: number;
	};
}

export interface ApiResponse<T = null> {
	success: boolean;
	message: string;
	data: T;
}
