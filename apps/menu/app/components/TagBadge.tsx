const TAG_STYLES: Record<string, { bg: string; text: string; label: string }> = {
	spicy: { bg: 'bg-red-100', text: 'text-red-700', label: 'Spicy' },
	vegetarian: { bg: 'bg-green-100', text: 'text-green-700', label: 'Vegetarian' },
	vegan: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Vegan' },
	new: { bg: 'bg-brand-50', text: 'text-brand-500', label: 'New' },
	popular: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Popular' },
	gluten_free: { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Gluten Free' },
};

interface TagBadgeProps {
	tag: string;
}

export default function TagBadge({ tag }: TagBadgeProps) {
	const style = TAG_STYLES[tag] || { bg: 'bg-gray-100', text: 'text-gray-600', label: tag };

	return (
		<span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${style.bg} ${style.text}`}>
			{tag === 'spicy' && '🌶️ '}
			{tag === 'vegetarian' && '🥬 '}
			{tag === 'vegan' && '🌱 '}
			{tag === 'popular' && '🔥 '}
			{style.label}
		</span>
	);
}
