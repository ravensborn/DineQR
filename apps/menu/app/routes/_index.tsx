import { useLoaderData, Link } from 'react-router';
import type { Route } from './+types/_index';

const API_URL = process.env.API_URL || 'http://localhost:4000';

export async function loader() {
	const res = await fetch(`${API_URL}/api/public/restaurants`);
	if (!res.ok) return { restaurants: [] };
	const data = await res.json();
	return { restaurants: data.data || [] };
}

export function meta() {
	return [
		{ title: 'DineQR — Digital Menus by Pepsi' },
		{ name: 'description', content: 'Scan, browse, and enjoy. Digital restaurant menus powered by Pepsi.' },
	];
}

export default function IndexPage({ loaderData }: Route.ComponentProps) {
	const { restaurants } = loaderData;

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Hero */}
			<div className="relative overflow-hidden bg-brand-500 px-4 py-20 text-center text-white">
				<div className="absolute inset-0 opacity-10">
					<div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-accent-500" />
					<div className="absolute -bottom-10 -right-10 h-60 w-60 rounded-full bg-white" />
				</div>
				<div className="relative z-10">
					<div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-xl">
						<span className="text-4xl font-bold text-brand-500">DQ</span>
					</div>
					<h1 className="mb-3 text-5xl font-extrabold tracking-tight">DineQR</h1>
					<p className="mb-2 text-xl font-medium text-white/80">Digital Menus, Powered by Pepsi</p>
					<p className="mx-auto max-w-md text-sm text-white/60">
						Scan a QR code at any participating restaurant to instantly view their menu on your phone.
					</p>
				</div>
			</div>

			{/* Restaurants */}
			<div className="mx-auto max-w-5xl px-4 py-12">
				<h2 className="mb-8 text-center text-2xl font-bold text-gray-800">Participating Restaurants</h2>
				{restaurants.length === 0 ? (
					<p className="text-center text-gray-500">No restaurants available yet.</p>
				) : (
					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{restaurants.map((r: any) => (
							<Link
								key={r.id}
								to={`/${r.slug}`}
								className="group overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
							>
								<div className="h-3 bg-brand-500" />
								<div className="p-6">
									<div className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-brand-50 text-2xl font-bold text-brand-500">
										{r.name.charAt(0)}
									</div>
									<h3 className="mb-1 text-lg font-bold text-gray-900 group-hover:text-brand-500">{r.name}</h3>
									{r.description && (
										<p className="mb-3 line-clamp-2 text-sm text-gray-500">{r.description}</p>
									)}
									{r.address && (
										<p className="text-xs text-gray-400">{r.address}</p>
									)}
									<div className="mt-4 text-sm font-semibold text-brand-500">
										View Menu &rarr;
									</div>
								</div>
							</Link>
						))}
					</div>
				)}
			</div>

			{/* Footer */}
			<footer className="bg-brand-500 px-4 py-8 text-center text-white">
				<div className="mb-2 flex items-center justify-center gap-2">
					<div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
						<span className="text-xs font-bold text-brand-500">DQ</span>
					</div>
					<span className="font-semibold">DineQR</span>
				</div>
				<p className="text-sm text-white/60">Powered by Pepsi &copy; 2026</p>
			</footer>
		</div>
	);
}
