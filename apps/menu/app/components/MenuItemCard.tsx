import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalizedField, formatPrice } from '~/lib/i18n-utils';
import TagBadge from './TagBadge';
import ItemDetailModal from './ItemDetailModal';

interface MenuItemCardProps {
	item: {
		id: string;
		name: string;
		description: string | null;
		price: number;
		images: string[];
		image: string | null;
		is_featured: boolean;
		tags: string[];
		name_i18n?: Record<string, string> | null;
		description_i18n?: Record<string, string> | null;
	};
	apiUrl: string;
	currency?: string;
}

export default function MenuItemCard({ item, apiUrl, currency }: MenuItemCardProps) {
	const [open, setOpen] = useState(false);
	const { t } = useTranslation();
	const l = useLocalizedField();
	const name = l(item, 'name') || item.name;
	const description = l(item, 'description');

	const resolveUrl = (url: string) => (url.startsWith('http') ? url : `${apiUrl}${url}`);

	const imageUrls: string[] =
		item.images && item.images.length > 0
			? item.images.map(resolveUrl)
			: item.image
				? [resolveUrl(item.image)]
				: [];

	const coverImage = imageUrls.length > 0 ? imageUrls[imageUrls.length - 1] : null;

	return (
		<>
			<div
				role="button"
				tabIndex={0}
				onClick={() => setOpen(true)}
				onKeyDown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') setOpen(true);
				}}
				className={`group w-full cursor-pointer overflow-hidden rounded-2xl bg-white text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98] ${
					item.is_featured ? 'ring-2 ring-amber-400' : ''
				}`}
			>
				{coverImage && (
					<div className="relative h-44 overflow-hidden bg-gray-100">
						<img
							src={coverImage}
							alt={item.name}
							loading="lazy"
							className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
						/>
						{imageUrls.length > 1 && (
							<div className="absolute bottom-2 end-2 flex items-center gap-1 rounded-full bg-black/40 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
								<svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
									<path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
								</svg>
								{imageUrls.length}
							</div>
						)}
						{item.is_featured && <FeaturedBadge label={t('menu.featured')} />}
					</div>
				)}

				<div className="p-4">
					<div className="flex items-start justify-between gap-3">
						<h3 className="font-bold text-gray-900 transition-colors group-hover:text-brand-500">{name}</h3>
						<div className="flex-shrink-0 rounded-lg bg-brand-50 px-3 py-1.5">
							<span className="text-lg font-bold text-brand-500">{formatPrice(item.price, currency)}</span>
						</div>
					</div>
					{description && (
						<p className="mt-1 line-clamp-2 text-sm text-gray-500">{description}</p>
					)}
					{item.tags && item.tags.length > 0 && (
						<div className="mt-3 flex flex-wrap gap-1.5">
							{item.tags.map((tag: string) => (
								<TagBadge key={tag} tag={tag} />
							))}
						</div>
					)}
				</div>
			</div>

			<ItemDetailModal
				open={open}
				onClose={() => setOpen(false)}
				item={item}
				imageUrls={imageUrls}
				currency={currency}
			/>
		</>
	);
}

function FeaturedBadge({ label }: { label: string }) {
	return (
		<div className="absolute start-3 top-3 flex items-center gap-1 rounded-full bg-amber-400 px-2.5 py-1 text-xs font-bold text-white shadow">
			<svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
				<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
			</svg>
			{label}
		</div>
	);
}
