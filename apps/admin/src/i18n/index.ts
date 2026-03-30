import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import ar from './locales/ar.json';
import ckb from './locales/ckb.json';

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources: {
			en: { translation: en },
			ar: { translation: ar },
			ckb: { translation: ckb },
		},
		fallbackLng: 'en',
		interpolation: {
			escapeValue: false,
		},
		detection: {
			order: ['localStorage', 'navigator'],
			lookupLocalStorage: 'DINEQR_ADMIN_LANG',
			caches: ['localStorage'],
		},
	});

export default i18n;
