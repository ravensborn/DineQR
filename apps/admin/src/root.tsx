import { Links, Meta, Outlet, Scripts, ScrollRestoration, isRouteErrorResponse } from 'react-router';
import type { Route } from './+types/root';
import './styles/global.css';
import './i18n';
import { useTranslation } from 'react-i18next';
import { RTL_LANGUAGES, type SupportedLanguage } from '@dineqr/shared';

export function Layout({ children }: { children: React.ReactNode }) {
	const { i18n } = useTranslation();
	const lang = i18n.language as SupportedLanguage;
	const dir = RTL_LANGUAGES.includes(lang) ? 'rtl' : 'ltr';

	return (
		<html lang={lang} dir={dir}>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
				<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
				<link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;600;700&display=swap" rel="stylesheet" />
				<Meta />
				<Links />
			</head>
			<body style={{ fontFamily: dir === 'rtl' ? "'Vazirmatn', 'Inter', sans-serif" : "'Inter', sans-serif", margin: 0 }}>
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
	let message = 'Oops!';
	let details = 'An unexpected error occurred.';

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? '404' : 'Error';
		details = error.status === 404 ? 'Page not found.' : error.statusText || details;
	} else if (error instanceof Error) {
		details = error.message;
	}

	return (
		<div style={{ padding: '2rem', textAlign: 'center', fontFamily: "'Inter', sans-serif" }}>
			<h1 style={{ color: '#004B93', fontSize: '3rem' }}>{message}</h1>
			<p style={{ color: '#666' }}>{details}</p>
		</div>
	);
}
