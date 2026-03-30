import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useLocalizedField, formatPrice } from '~/lib/i18n-utils';
import TagBadge from './TagBadge';

interface ItemDetailModalProps {
	open: boolean;
	onClose: () => void;
	item: {
		id: string;
		name: string;
		description: string | null;
		price: number;
		is_featured: boolean;
		tags: string[];
		name_i18n?: Record<string, string> | null;
		description_i18n?: Record<string, string> | null;
	};
	imageUrls: string[];
	currency?: string;
}

export default function ItemDetailModal({ open, onClose, item, imageUrls, currency }: ItemDetailModalProps) {
	const [mounted, setMounted] = useState(false);
	const [activeSlide, setActiveSlide] = useState(0);
	const sliderRef = useRef<HTMLDivElement>(null);
	const { t } = useTranslation();
	const l = useLocalizedField();
	const name = l(item, 'name') || item.name;
	const description = l(item, 'description');

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		if (open) {
			document.body.style.overflow = 'hidden';
			setActiveSlide(0);
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [open]);

	useEffect(() => {
		if (!open) return;
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};
		document.addEventListener('keydown', handleEsc);
		return () => document.removeEventListener('keydown', handleEsc);
	}, [open, onClose]);

	const handleScroll = useCallback(() => {
		if (!sliderRef.current) return;
		const el = sliderRef.current;
		const index = Math.round(el.scrollLeft / el.offsetWidth);
		setActiveSlide(index);
	}, []);

	const goToSlide = useCallback((index: number) => {
		if (!sliderRef.current) return;
		sliderRef.current.scrollTo({ left: index * sliderRef.current.offsetWidth, behavior: 'smooth' });
	}, []);

	if (!mounted || !open) return null;

	const hasImages = imageUrls.length > 0;
	const hasMultiple = imageUrls.length > 1;

	return createPortal(
		<div
			className="fixed inset-0 z-[9999] flex items-end justify-center sm:items-center sm:p-4"
			onClick={(e) => {
				if (e.target === e.currentTarget) onClose();
			}}
		>
			{/* Backdrop */}
			<div className="absolute inset-0 bg-black/60" style={{ animation: 'fadeIn 150ms ease-out' }} />

			{/* Panel */}
			<div
				className="relative w-full max-w-lg"
				style={{ animation: 'slideUp 250ms cubic-bezier(0.16, 1, 0.3, 1)' }}
			>
				<div className="relative max-h-[90vh] overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl">
					{/* Close */}
					<button
						onClick={onClose}
						className="absolute end-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50"
						aria-label="Close"
					>
						<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
							<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>

					{/* Images with slider */}
					{hasImages ? (
						<div className="relative">
							<div
								ref={sliderRef}
								onScroll={hasMultiple ? handleScroll : undefined}
								className={`flex h-64 sm:h-72 ${hasMultiple ? 'overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide' : 'overflow-hidden'}`}
							>
								{imageUrls.map((url, i) => (
									<img
										key={i}
										src={url}
										alt={`${item.name} ${i + 1}`}
										className="h-full min-w-full flex-shrink-0 object-cover snap-start"
									/>
								))}
							</div>

							<div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/25 to-transparent" />

							{hasMultiple && (
								<>
									<button
										onClick={(e) => { e.stopPropagation(); goToSlide(Math.max(0, activeSlide - 1)); }}
										className={`absolute start-2 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/80 p-1.5 shadow transition hover:bg-white sm:flex ${activeSlide === 0 ? 'opacity-0' : ''}`}
									>
										<svg className="h-5 w-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
											<path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
										</svg>
									</button>
									<button
										onClick={(e) => { e.stopPropagation(); goToSlide(Math.min(imageUrls.length - 1, activeSlide + 1)); }}
										className={`absolute end-2 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/80 p-1.5 shadow transition hover:bg-white sm:flex ${activeSlide === imageUrls.length - 1 ? 'opacity-0' : ''}`}
									>
										<svg className="h-5 w-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
											<path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
										</svg>
									</button>
								</>
							)}

							{hasMultiple && (
								<div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
									{imageUrls.map((_, i) => (
										<button
											key={i}
											onClick={(e) => { e.stopPropagation(); goToSlide(i); }}
											className={`h-2 rounded-full transition-all ${
												i === activeSlide ? 'w-5 bg-white' : 'w-2 bg-white/50'
											}`}
										/>
									))}
								</div>
							)}

							{item.is_featured && (
								<div className="absolute start-3 top-3 flex items-center gap-1.5 rounded-full bg-amber-400 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
									<svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
										<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
									</svg>
									{t('menu.chefs_pick')}
								</div>
							)}
						</div>
					) : (
						<div className="h-6" />
					)}

					{/* Content */}
					<div className="p-6">
						<div className="flex items-start justify-between gap-4">
							<h2 className="text-2xl font-bold text-gray-900">{name}</h2>
							<div className="flex-shrink-0 rounded-xl bg-brand-500 px-4 py-2">
								<span className="text-xl font-bold text-white">{formatPrice(item.price, currency)}</span>
							</div>
						</div>

						{description && (
							<p className="mt-3 leading-relaxed text-gray-600">{description}</p>
						)}

						{item.tags && item.tags.length > 0 && (
							<div className="mt-4 flex flex-wrap gap-2">
								{item.tags.map((tag: string) => (
									<TagBadge key={tag} tag={tag} />
								))}
							</div>
						)}

						<div className="mt-6 flex items-center gap-3 rounded-2xl bg-brand-50 p-4">
							<img
								src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Pepsi_2023.svg/800px-Pepsi_2023.svg.png"
								alt="Pepsi"
								className="h-8 w-8 object-contain"
							/>
							<div>
								<p className="text-sm font-semibold text-brand-500">{t('menu.pepsi_suggest')}</p>
								<p className="text-xs text-brand-400">{t('menu.pepsi_ask')}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>,
		document.body,
	);
}
