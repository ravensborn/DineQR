import { useMemo } from 'react';
import type { Route } from './+types/restaurant';
import { useTranslation } from 'react-i18next';
import MenuHeader from '~/components/MenuHeader';
import SectionNav from '~/components/SectionNav';
import MenuSectionComponent from '~/components/MenuSection';
import PepsiFooter from '~/components/PepsiFooter';
import { AdTopBanner, AdSidebars, AdInline } from '~/components/AdBanner';

export async function loader({ params, request }: Route.LoaderArgs) {
	const apiUrl = process.env.API_URL || 'http://localhost:4000';
	const url = new URL(request.url);
	const lang = url.searchParams.get('lang') || '';
	const langParam = lang ? `?lang=${lang}` : '';
	const res = await fetch(`${apiUrl}/api/public/restaurants/${params.slug}/menu${langParam}`);
	if (!res.ok) throw new Response('Restaurant not found', { status: 404 });
	const data = await res.json();
	return { ...data.data, apiUrl };
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
	const { restaurant, sections, ads = [], apiUrl } = loaderData;
	const { t } = useTranslation();

	const { topAds, sidebarAds, inlineAds } = useMemo(() => ({
		topAds: ads.filter((a: any) => a.position === 'top'),
		sidebarAds: ads.filter((a: any) => a.position === 'sidebar'),
		inlineAds: ads.filter((a: any) => a.position === 'inline'),
	}), [ads]);

	return (
		<div className="min-h-screen bg-gray-50">
			<MenuHeader restaurant={restaurant} />
			{sections.length > 0 && <SectionNav sections={sections} />}

			{/* Top banner ad */}
			<AdTopBanner ads={topAds} apiUrl={apiUrl} />

			{/* Main content with optional sidebars */}
			<div className="mx-auto flex max-w-7xl justify-center gap-6 px-4 pb-24 pt-4">
				{/* Left sidebar ads (desktop only) */}
				{sidebarAds.length > 0 && (
					<aside className="sticky top-20 hidden h-fit space-y-4 lg:block" style={{ width: 176 }}>
						{sidebarAds.filter((_: any, i: number) => i % 2 === 0).map((ad: any) => (
							<AdInlineSidebar key={ad.id} ad={ad} apiUrl={apiUrl} />
						))}
					</aside>
				)}

				{/* Menu content */}
				<main className="w-full max-w-3xl">
					{sections.length === 0 ? (
						<div className="py-20 text-center">
							<p className="text-lg text-gray-400">{t('menu.empty')}</p>
						</div>
					) : (
						sections.map((section: any, i: number) => (
							<div key={section.id}>
								<MenuSectionComponent section={section} apiUrl={apiUrl} currency={restaurant.currency} />
								{/* Inline ads between sections (mobile only) */}
								{i < sections.length - 1 && inlineAds.length > 0 && (
									<AdInline ads={inlineAds} apiUrl={apiUrl} index={i} />
								)}
							</div>
						))
					)}
				</main>

				{/* Right sidebar ads (desktop only) */}
				{sidebarAds.length > 0 && (
					<aside className="sticky top-20 hidden h-fit space-y-4 lg:block" style={{ width: 176 }}>
						{sidebarAds.filter((_: any, i: number) => i % 2 === 1).map((ad: any) => (
							<AdInlineSidebar key={ad.id} ad={ad} apiUrl={apiUrl} />
						))}
						{/* If odd number, show last one on right too */}
						{sidebarAds.length === 1 && (
							<div className="h-64" />
						)}
					</aside>
				)}
			</div>

			<PepsiFooter />
		</div>
	);
}

function AdInlineSidebar({ ad, apiUrl }: { ad: any; apiUrl: string }) {
	const resolveUrl = (url: string) => url.startsWith('http') ? url : `${apiUrl}${url}`;
	const img = (
		<img src={resolveUrl(ad.image)} alt="" className="h-full w-full object-cover" loading="lazy" />
	);

	const wrapper = ad.link ? (
		<a href={ad.link} target="_blank" rel="noopener noreferrer" className="block h-64 overflow-hidden rounded-xl shadow-sm">
			{img}
		</a>
	) : (
		<div className="h-64 overflow-hidden rounded-xl shadow-sm">{img}</div>
	);

	return wrapper;
}
