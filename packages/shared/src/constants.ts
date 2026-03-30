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

export const SUPPORTED_LANGUAGES = {
	EN: 'en',
	AR: 'ar',
	CKB: 'ckb',
} as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[keyof typeof SUPPORTED_LANGUAGES];

export const LANGUAGE_LABELS: Record<SupportedLanguage, string> = {
	en: 'English',
	ar: 'العربية',
	ckb: 'کوردی',
};

export const RTL_LANGUAGES: SupportedLanguage[] = ['ar', 'ckb'];

export const DEFAULT_LANGUAGE: SupportedLanguage = 'en';

export const CURRENCIES = {
	USD: { code: 'USD', symbol: '$', label: 'US Dollar' },
	EUR: { code: 'EUR', symbol: '€', label: 'Euro' },
	GBP: { code: 'GBP', symbol: '£', label: 'British Pound' },
	IQD: { code: 'IQD', symbol: 'د.ع', label: 'Iraqi Dinar' },
	TRY: { code: 'TRY', symbol: '₺', label: 'Turkish Lira' },
	AED: { code: 'AED', symbol: 'د.إ', label: 'UAE Dirham' },
	SAR: { code: 'SAR', symbol: 'ر.س', label: 'Saudi Riyal' },
	JOD: { code: 'JOD', symbol: 'د.ا', label: 'Jordanian Dinar' },
} as const;

export type CurrencyCode = keyof typeof CURRENCIES;

export const DEFAULT_CURRENCY: CurrencyCode = 'USD';
