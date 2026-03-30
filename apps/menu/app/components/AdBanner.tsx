interface Ad {
	id: string;
	image: string;
	link: string | null;
}

interface AdBannerProps {
	ad: Ad;
	className?: string;
	apiUrl: string;
}

function resolveUrl(url: string, apiUrl: string) {
	if (url.startsWith('http')) return url;
	return `${apiUrl}${url}`;
}

export default function AdBanner({ ad, className = '', apiUrl }: AdBannerProps) {
	const img = (
		<img
			src={resolveUrl(ad.image, apiUrl)}
			alt=""
			className="h-full w-full object-cover"
			loading="lazy"
		/>
	);

	if (ad.link) {
		return (
			<a href={ad.link} target="_blank" rel="noopener noreferrer" className={`block overflow-hidden rounded-xl shadow-sm ${className}`}>
				{img}
			</a>
		);
	}

	return (
		<div className={`overflow-hidden rounded-xl shadow-sm ${className}`}>
			{img}
		</div>
	);
}

interface AdTopBannerProps {
	ads: Ad[];
	apiUrl: string;
}

export function AdTopBanner({ ads, apiUrl }: AdTopBannerProps) {
	if (ads.length === 0) return null;
	const ad = ads[0];

	return (
		<div className="mx-auto max-w-3xl px-4 pt-4">
			<AdBanner ad={ad} apiUrl={apiUrl} className="h-24 sm:h-32 lg:h-36" />
		</div>
	);
}

interface AdSidebarsProps {
	ads: Ad[];
	apiUrl: string;
}

export function AdSidebars({ ads, apiUrl }: AdSidebarsProps) {
	if (ads.length === 0) return null;

	return (
		<>
			{/* Left sidebar */}
			<div className="hidden w-44 flex-shrink-0 space-y-4 lg:block">
				{ads.filter((_, i) => i % 2 === 0).map((ad) => (
					<AdBanner key={ad.id} ad={ad} apiUrl={apiUrl} className="h-64" />
				))}
			</div>
			{/* Right sidebar */}
			<div className="hidden w-44 flex-shrink-0 space-y-4 lg:block">
				{ads.filter((_, i) => i % 2 === 1).map((ad) => (
					<AdBanner key={ad.id} ad={ad} apiUrl={apiUrl} className="h-64" />
				))}
			</div>
		</>
	);
}

interface AdInlineProps {
	ads: Ad[];
	apiUrl: string;
	index: number;
}

export function AdInline({ ads, apiUrl, index }: AdInlineProps) {
	// Show one ad between each section (cycling through available ads)
	if (ads.length === 0) return null;
	const ad = ads[index % ads.length];

	return (
		<div className="mb-10 lg:hidden">
			<AdBanner ad={ad} apiUrl={apiUrl} className="h-28 sm:h-36" />
		</div>
	);
}
