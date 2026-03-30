import MenuItemCard from './MenuItemCard';

interface MenuSectionProps {
	section: {
		id: string;
		name: string;
		description: string | null;
		icon: string | null;
		items: any[];
	};
	apiUrl: string;
}

export default function MenuSectionComponent({ section, apiUrl }: MenuSectionProps) {
	if (!section.items || section.items.length === 0) return null;

	return (
		<section id={section.id} className="mb-10 scroll-mt-20">
			{/* Section header */}
			<div className="mb-4">
				<div className="flex items-center gap-2">
					{section.icon && <span className="text-2xl">{section.icon}</span>}
					<h2 className="text-xl font-bold text-gray-900">{section.name}</h2>
				</div>
				{section.description && (
					<p className="mt-1 text-sm text-gray-500">{section.description}</p>
				)}
				<div className="mt-2 h-0.5 w-12 rounded-full bg-brand-500" />
			</div>

			{/* Items grid */}
			<div className="grid gap-4 sm:grid-cols-2">
				{section.items.map((item: any) => (
					<MenuItemCard key={item.id} item={item} apiUrl={apiUrl} />
				))}
			</div>
		</section>
	);
}
