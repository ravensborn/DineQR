import { useLoaderData } from 'react-router';
import type { Route } from './+types/restaurant';
import MenuHeader from '~/components/MenuHeader';
import SectionNav from '~/components/SectionNav';
import MenuSectionComponent from '~/components/MenuSection';
import PepsiFooter from '~/components/PepsiFooter';

const API_URL = process.env.API_URL || 'http://localhost:4000';

export async function loader({ params }: Route.LoaderArgs) {
	const res = await fetch(`${API_URL}/api/public/restaurants/${params.slug}/menu`);
	if (!res.ok) throw new Response('Restaurant not found', { status: 404 });
	const data = await res.json();
	return data.data;
}

export function meta({ data }: Route.MetaArgs) {
	if (!data?.restaurant) return [{ title: 'Menu — DineQR' }];
	return [
		{ title: `${data.restaurant.name} — Menu | DineQR` },
		{ name: 'description', content: data.restaurant.description || `View the menu for ${data.restaurant.name}` },
		{ property: 'og:title', content: `${data.restaurant.name} — Digital Menu` },
		{ property: 'og:description', content: data.restaurant.description || 'Browse our menu' },
	];
}

export default function RestaurantPage({ loaderData }: Route.ComponentProps) {
	const { restaurant, sections } = loaderData;

	return (
		<div className="min-h-screen bg-gray-50">
			<MenuHeader restaurant={restaurant} />
			{sections.length > 0 && <SectionNav sections={sections} />}
			<main className="mx-auto max-w-3xl px-4 pb-24 pt-4">
				{sections.length === 0 ? (
					<div className="py-20 text-center">
						<p className="text-lg text-gray-400">This menu is being prepared. Check back soon!</p>
					</div>
				) : (
					sections.map((section: any) => (
						<MenuSectionComponent key={section.id} section={section} apiUrl={API_URL} />
					))
				)}
			</main>
			<PepsiFooter />
		</div>
	);
}
