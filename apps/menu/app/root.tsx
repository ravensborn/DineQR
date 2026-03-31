import { Links, Meta, Outlet, Scripts, ScrollRestoration, isRouteErrorResponse } from 'react-router';
import type { Route } from './+types/root';
import './styles/global.css';
import './i18n';
import { useTranslation } from 'react-i18next';
import { RTL_LANGUAGES, type SupportedLanguage } from '@dineqr/shared';

export function Layout({ children }: { children: React.ReactNode }) {
	const { i18n } = useTranslation();
	const lang = (i18n.language || 'en') as SupportedLanguage;
	const dir = RTL_LANGUAGES.includes(lang) ? 'rtl' : 'ltr';

	return (
		<html lang={lang} dir={dir}>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
				<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
				<link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
				<link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
				<link rel="icon" type="image/x-icon" href="/favicon/favicon.ico" />
				<link rel="manifest" href="/favicon/site.webmanifest" />
				<Meta />
				<Links />
			</head>
			<body className="bg-gray-50 text-gray-900" style={{ fontFamily: dir === 'rtl' ? "'Vazirmatn', 'Inter', sans-serif" : "'Inter', sans-serif" }}>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	const { t } = useTranslation();
	let title = t('error.oops');
	let details = t('error.unexpected');

	if (isRouteErrorResponse(error)) {
		title = error.status === 404 ? t('error.not_found_title') : 'Error';
		details = error.status === 404 ? t('error.not_found') : error.statusText || details;
	} else if (error instanceof Error) {
		details = error.message;
	}

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-brand-500 p-8 text-white">
			<h1 className="mb-4 text-6xl font-bold">{title}</h1>
			<p className="mb-8 text-xl opacity-80">{details}</p>
			<a href="/" className="rounded-full bg-white px-6 py-3 font-semibold text-brand-500 transition hover:bg-gray-100">
				{t('error.go_home')}
			</a>
		</div>
	);
}
