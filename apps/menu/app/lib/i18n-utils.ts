import { useTranslation } from 'react-i18next';
import { CURRENCIES, type CurrencyCode } from '@dineqr/shared';

/**
 * Resolve a translated field from an entity that has `_i18n` JSON columns.
 * Falls back: current lang → default lang → base field value.
 */
export function useLocalizedField() {
	const { i18n } = useTranslation();
	const lang = i18n.language;

	return (entity: any, field: string, defaultLang?: string): string | null => {
		const i18nField = entity?.[`${field}_i18n`];
		if (i18nField?.[lang]) return i18nField[lang];
		if (defaultLang && i18nField?.[defaultLang]) return i18nField[defaultLang];
		return entity?.[field] ?? null;
	};
}

/**
 * Format a price with the restaurant's currency symbol.
 */
export function formatPrice(price: number, currencyCode?: string): string {
	const code = (currencyCode || 'USD') as CurrencyCode;
	const currency = CURRENCIES[code] || CURRENCIES.USD;
	const formatted = Number(price).toFixed(2);
	return `${currency.symbol}${formatted}`;
}
