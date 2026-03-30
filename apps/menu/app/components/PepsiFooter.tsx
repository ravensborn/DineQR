import { useTranslation } from 'react-i18next';

export default function PepsiFooter() {
	const { t } = useTranslation();

	return (
		<footer className="bg-brand-500 px-4 py-6 text-center text-white">
			<div className="mx-auto max-w-3xl">
				<p className="text-sm text-white/80">{t('menu.footer')}</p>
			</div>
		</footer>
	);
}
