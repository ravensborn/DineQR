import { Links, Meta, Outlet, Scripts, ScrollRestoration, isRouteErrorResponse } from 'react-router';
import type { Route } from './+types/root';
import './styles/global.css';

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
				<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
				<Meta />
				<Links />
			</head>
			<body className="bg-gray-50 font-sans text-gray-900">
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
		details = error.status === 404 ? 'This restaurant was not found.' : error.statusText || details;
	} else if (error instanceof Error) {
		details = error.message;
	}

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-brand-500 p-8 text-white">
			<h1 className="mb-4 text-6xl font-bold">{message}</h1>
			<p className="mb-8 text-xl opacity-80">{details}</p>
			<a href="/" className="rounded-full bg-white px-6 py-3 font-semibold text-brand-500 transition hover:bg-gray-100">
				Go Home
			</a>
		</div>
	);
}
