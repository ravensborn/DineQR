export const USER_ROLE = {
	SUPER_ADMIN: 'super_admin',
	RESTAURANT_ADMIN: 'restaurant_admin',
} as const;

export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export const PAGINATION_DEFAULTS = {
	LIMIT: 20,
	MAX_LIMIT: 100,
	OFFSET: 0,
} as const;

export const MENU_ITEM_TAG = {
	SPICY: 'spicy',
	VEGETARIAN: 'vegetarian',
	VEGAN: 'vegan',
	NEW: 'new',
	POPULAR: 'popular',
	GLUTEN_FREE: 'gluten_free',
} as const;

export type MenuItemTag = (typeof MENU_ITEM_TAG)[keyof typeof MENU_ITEM_TAG];
