import { useLocalizedField } from '~/lib/i18n-utils';
import MenuItemCard from './MenuItemCard';

interface MenuSectionProps {
	section: {
		id: string;
		name: string;
		description: string | null;
		icon: string | null;
		items: any[];
		name_i18n?: Record<string, string> | null;
		description_i18n?: Record<string, string> | null;
	};
	apiUrl: string;
	currency?: string;
}

export default function MenuSectionComponent({ section, apiUrl, currency }: MenuSectionProps) {
	const l = useLocalizedField();
	if (!section.items || section.items.length === 0) return null;

	const name = l(section, 'name') || section.name;
	const description = l(section, 'description');

	return (
		<section id={section.id} className="mb-10 scroll-mt-20">
			{/* Section header */}
			<div className="mb-4">
				<div className="flex items-center gap-2">
					{section.icon && <span className="text-2xl">{section.icon}</span>}
					<h2 className="text-xl font-bold text-gray-900">{name}</h2>
				</div>
				{description && (
					<p className="mt-1 text-sm text-gray-500">{description}</p>
				)}
				<div className="mt-2 h-0.5 w-12 rounded-full bg-brand-500" />
			</div>

			{/* Items grid */}
			<div className="grid gap-4 sm:grid-cols-2">
				{section.items.map((item: any) => (
					<MenuItemCard key={item.id} item={item} apiUrl={apiUrl} currency={currency} />
				))}
			</div>
		</section>
	);
}
