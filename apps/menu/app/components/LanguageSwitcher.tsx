import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LANGUAGE_LABELS, SUPPORTED_LANGUAGES, type SupportedLanguage } from '@dineqr/shared';

const languages = Object.values(SUPPORTED_LANGUAGES) as SupportedLanguage[];

export default function LanguageSwitcher() {
	const { i18n } = useTranslation();
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	const currentLang = (i18n.language || 'en') as SupportedLanguage;

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const handleSelect = (lang: SupportedLanguage) => {
		i18n.changeLanguage(lang);
		localStorage.setItem('DINEQR_MENU_LANG', lang);
		setOpen(false);
	};

	return (
		<div ref={ref} className="relative">
			<button
				onClick={() => setOpen(!open)}
				className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition hover:bg-white/25"
			>
				<svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
					<circle cx="12" cy="12" r="10" />
					<path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
				</svg>
				{LANGUAGE_LABELS[currentLang]}
				<svg className={`h-3 w-3 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
					<path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
				</svg>
			</button>

			{open && (
				<div className="absolute end-0 top-full z-50 mt-1 min-w-[120px] overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-black/5">
					{languages.map((lang) => (
						<button
							key={lang}
							onClick={() => handleSelect(lang)}
							className={`flex w-full items-center gap-2 px-4 py-2.5 text-sm transition-colors ${
								currentLang === lang
									? 'bg-brand-50 font-semibold text-brand-500'
									: 'text-gray-700 hover:bg-gray-50'
							}`}
						>
							{currentLang === lang && (
								<svg className="h-3.5 w-3.5 text-brand-500" fill="currentColor" viewBox="0 0 20 20">
									<path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
								</svg>
							)}
							{!currentLang || currentLang !== lang ? <span className="w-3.5" /> : null}
							{LANGUAGE_LABELS[lang]}
						</button>
					))}
				</div>
			)}
		</div>
	);
}
