import { useState, useEffect, useRef } from 'react';
import { useLocalizedField } from '~/lib/i18n-utils';

interface SectionNavProps {
	sections: Array<{ id: string; name: string; icon: string | null; name_i18n?: Record<string, string> | null }>;
}

export default function SectionNav({ sections }: SectionNavProps) {
	const [activeId, setActiveId] = useState(sections[0]?.id || '');
	const navRef = useRef<HTMLDivElement>(null);
	const l = useLocalizedField();

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						setActiveId(entry.target.id);
					}
				}
			},
			{ rootMargin: '-100px 0px -60% 0px', threshold: 0.1 },
		);

		sections.forEach((section) => {
			const el = document.getElementById(section.id);
			if (el) observer.observe(el);
		});

		return () => observer.disconnect();
	}, [sections]);

	useEffect(() => {
		// Scroll active button into view in the nav
		const activeBtn = document.querySelector(`[data-nav-id="${activeId}"]`);
		if (activeBtn && navRef.current) {
			activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
		}
	}, [activeId]);

	const handleClick = (id: string) => {
		const el = document.getElementById(id);
		if (el) {
			el.scrollIntoView({ behavior: 'smooth', block: 'start' });
			setActiveId(id);
		}
	};

	return (
		<div className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 backdrop-blur-md">
			<div
				ref={navRef}
				className="scrollbar-hide mx-auto flex max-w-3xl gap-2 overflow-x-auto px-4 py-3"
			>
				{sections.map((section) => (
					<button
						key={section.id}
						data-nav-id={section.id}
						onClick={() => handleClick(section.id)}
						className={`flex flex-shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all ${
							activeId === section.id
								? 'bg-brand-500 text-white shadow-md'
								: 'bg-gray-100 text-gray-600 hover:bg-gray-200'
						}`}
					>
						{section.icon && <span>{section.icon}</span>}
						<span>{l(section, 'name') || section.name}</span>
					</button>
				))}
			</div>
		</div>
	);
}
