import TagBadge from './TagBadge';

interface MenuItemCardProps {
	item: {
		id: string;
		name: string;
		description: string | null;
		price: number;
		image: string | null;
		is_featured: boolean;
		tags: string[];
	};
	apiUrl: string;
}

export default function MenuItemCard({ item, apiUrl }: MenuItemCardProps) {
	const imageUrl = item.image
		? item.image.startsWith('http')
			? item.image
			: `${apiUrl}${item.image}`
		: null;

	return (
		<div
			className={`group overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:shadow-md ${
				item.is_featured ? 'ring-2 ring-amber-400' : ''
			}`}
		>
			{/* Image */}
			{imageUrl && (
				<div className="relative h-44 overflow-hidden bg-gray-100">
					<img
						src={imageUrl}
						alt={item.name}
						loading="lazy"
						className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
					/>
					{item.is_featured && (
						<div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-amber-400 px-2.5 py-1 text-xs font-bold text-white shadow">
							<svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
								<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
							</svg>
							Featured
						</div>
					)}
				</div>
			)}

			{/* Content */}
			<div className="p-4">
				<div className="flex items-start justify-between gap-3">
					<div className="flex-1">
						<h3 className="font-bold text-gray-900">{item.name}</h3>
						{item.description && (
							<p className="mt-1 line-clamp-2 text-sm text-gray-500">{item.description}</p>
						)}
					</div>
					<div className="flex-shrink-0 rounded-lg bg-brand-50 px-3 py-1.5">
						<span className="text-lg font-bold text-brand-500">${Number(item.price).toFixed(2)}</span>
					</div>
				</div>

				{/* Tags */}
				{item.tags && item.tags.length > 0 && (
					<div className="mt-3 flex flex-wrap gap-1.5">
						{item.tags.map((tag: string) => (
							<TagBadge key={tag} tag={tag} />
						))}
					</div>
				)}
			</div>
		</div>
	);
}
