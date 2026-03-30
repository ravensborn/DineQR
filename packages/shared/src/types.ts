import type { UserRole, MenuItemTag, SupportedLanguage, CurrencyCode } from './constants';

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

export type I18nString = Partial<Record<SupportedLanguage, string>>;

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
	default_language: SupportedLanguage;
	currency: CurrencyCode;
	name_i18n: I18nString | null;
	description_i18n: I18nString | null;
}

export interface MenuSection extends BaseEntity {
	restaurant_id: string;
	name: string;
	description: string | null;
	icon: string | null;
	display_order: number;
	is_active: boolean;
	name_i18n: I18nString | null;
	description_i18n: I18nString | null;
}

export interface MenuItem extends BaseEntity {
	section_id: string;
	restaurant_id: string;
	name: string;
	description: string | null;
	price: number;
	image: string | null;
	images: string[];
	is_featured: boolean;
	is_active: boolean;
	display_order: number;
	tags: MenuItemTag[];
	name_i18n: I18nString | null;
	description_i18n: I18nString | null;
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
