import { useTranslation } from 'react-i18next';

const TAG_STYLES: Record<string, { bg: string; text: string; key: string }> = {
	spicy: { bg: 'bg-red-100', text: 'text-red-700', key: 'tags.spicy' },
	vegetarian: { bg: 'bg-green-100', text: 'text-green-700', key: 'tags.vegetarian' },
	vegan: { bg: 'bg-emerald-100', text: 'text-emerald-700', key: 'tags.vegan' },
	new: { bg: 'bg-brand-50', text: 'text-brand-500', key: 'tags.new' },
	popular: { bg: 'bg-amber-100', text: 'text-amber-700', key: 'tags.popular' },
	gluten_free: { bg: 'bg-purple-100', text: 'text-purple-700', key: 'tags.gluten_free' },
};

interface TagBadgeProps {
	tag: string;
}

export default function TagBadge({ tag }: TagBadgeProps) {
	const { t } = useTranslation();
	const style = TAG_STYLES[tag] || { bg: 'bg-gray-100', text: 'text-gray-600', key: '' };
	const label = style.key ? t(style.key) : tag;

	return (
		<span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${style.bg} ${style.text}`}>
			{tag === 'spicy' && '\ud83c\udf36\ufe0f '}
			{tag === 'vegetarian' && '\ud83e\udd6c '}
			{tag === 'vegan' && '\ud83c\udf31 '}
			{tag === 'popular' && '\ud83d\udd25 '}
			{label}
		</span>
	);
}
