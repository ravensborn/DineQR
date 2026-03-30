import type { Route } from './+types/_index';
import { useTranslation } from 'react-i18next';
import { useLocalizedField } from '~/lib/i18n-utils';
import LanguageSwitcher from '~/components/LanguageSwitcher';

const PEPSI_LOGO =
	'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Pepsi_2023.svg/800px-Pepsi_2023.svg.png';

export async function loader() {
	const apiUrl = process.env.API_URL || 'http://localhost:4000';
	const res = await fetch(`${apiUrl}/api/public/restaurants`);
	if (!res.ok) return { restaurants: [] };
	const data = await res.json();
	return { restaurants: data.data || [] };
}

export function meta() {
	return [
		{ title: 'DineQR — The Future of Restaurant Menus, Powered by Pepsi' },
		{
			name: 'description',
			content:
				'DineQR delivers branded digital menus to restaurants everywhere. Scan, browse, and enjoy — powered by Pepsi.',
		},
	];
}

/* ------------------------------------------------------------------ */
/*  Icon components for the "How It Works" and "Features" sections    */
/* ------------------------------------------------------------------ */

function IconHandshake({ className }: { className?: string }) {
	return (
		<svg
			className={className}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M20.5 11.5L14 18l-2.5-2.5" />
			<path d="M3.5 11.5L10 18l1.5-1.5" />
			<path d="M2 6.5h5l3.5 3.5" />
			<path d="M22 6.5h-5l-3.5 3.5" />
			<path d="M12 16l-2-2" />
		</svg>
	);
}

function IconPalette({ className }: { className?: string }) {
	return (
		<svg
			className={className}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<circle cx="12" cy="12" r="10" />
			<circle cx="12" cy="8" r="1.5" fill="currentColor" />
			<circle cx="8.5" cy="12.5" r="1.5" fill="currentColor" />
			<circle cx="15.5" cy="12.5" r="1.5" fill="currentColor" />
			<circle cx="12" cy="16.5" r="1.5" fill="currentColor" />
		</svg>
	);
}

function IconQrScan({ className }: { className?: string }) {
	return (
		<svg
			className={className}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<rect x="3" y="3" width="7" height="7" rx="1" />
			<rect x="14" y="3" width="7" height="7" rx="1" />
			<rect x="3" y="14" width="7" height="7" rx="1" />
			<rect x="14" y="14" width="3" height="3" />
			<line x1="21" y1="14" x2="21" y2="21" />
			<line x1="14" y1="21" x2="21" y2="21" />
		</svg>
	);
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function IndexPage({ loaderData }: Route.ComponentProps) {
	const { restaurants } = loaderData;
	const { t, i18n } = useTranslation();
	const l = useLocalizedField();
	const isRTL = i18n.language === 'ar' || i18n.language === 'ckb';

	return (
		<div className="min-h-screen bg-white">
			{/* ===== Sticky nav bar ===== */}
			<nav className="sticky top-0 z-50 border-b border-brand-600/20 bg-brand-500/95 backdrop-blur">
				<div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
					<div className="flex items-center gap-3">
						<img src={PEPSI_LOGO} alt="Pepsi" className="h-8 w-8 object-contain" />
						<span className="text-lg font-extrabold tracking-tight text-white">
							DineQR
						</span>
					</div>
					<div className="hidden items-center gap-8 text-sm font-medium text-white/80 md:flex">
						<a href="#how-it-works" className="transition hover:text-white">
							{t('landing.how_it_works')}
						</a>
						<a href="#features" className="transition hover:text-white">
							{t('landing.features')}
						</a>
						<a href="#demo" className="transition hover:text-white">
							{t('landing.demo')}
						</a>
						<a href="#for-restaurants" className="transition hover:text-white">
							{t('landing.for_restaurants')}
						</a>
					</div>
					<div className="flex items-center gap-3">
						<LanguageSwitcher />
						<a
							href="#demo"
							className="rounded-full bg-white px-5 py-2 text-sm font-bold text-brand-500 shadow transition hover:bg-gray-100"
						>
							{t('landing.see_demo')}
						</a>
					</div>
				</div>
			</nav>

			{/* ===== Hero ===== */}
			<section className="relative isolate overflow-hidden bg-brand-500 px-6 pb-24 pt-20 text-white md:pb-32 md:pt-28">
				{/* Decorative blobs */}
				<div className="pointer-events-none absolute inset-0 overflow-hidden">
					<div className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-accent-500/15 blur-3xl" />
					<div className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-white/10 blur-3xl" />
					<div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-400/30 blur-2xl" />
				</div>

				<div className="relative z-10 mx-auto max-w-4xl text-center">
					<img
						src={PEPSI_LOGO}
						alt="Pepsi"
						className="mx-auto mb-8 h-20 w-20 drop-shadow-xl md:h-28 md:w-28"
					/>
					<h1 className="mb-4 text-6xl font-extrabold tracking-tight md:text-8xl">
						DineQR
					</h1>
					<p className="mb-3 text-xl font-semibold text-white/90 md:text-2xl">
						{t('landing.tagline')}
					</p>
					<p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
						{t('landing.subtitle')}
					</p>
					<a
						href="#demo"
						className="inline-flex items-center gap-2 rounded-full bg-accent-500 px-8 py-4 text-lg font-bold text-white shadow-xl transition hover:bg-accent-600 hover:shadow-2xl"
					>
						{t('landing.see_action')}
						<svg
							className="h-5 w-5"
							fill="none"
							stroke="currentColor"
							strokeWidth="2.5"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M19 9l-7 7-7-7"
							/>
						</svg>
					</a>
				</div>
			</section>

			{/* ===== How It Works ===== */}
			<section id="how-it-works" className="bg-gray-50 px-6 py-20 md:py-28">
				<div className="mx-auto max-w-6xl">
					<p className="mb-2 text-center text-sm font-bold uppercase tracking-widest text-accent-500">
						{t('landing.how_it_works')}
					</p>
					<h2 className="mb-4 text-center text-3xl font-extrabold text-gray-900 md:text-4xl">
						{t('landing.three_steps')}
					</h2>
					<p className="mx-auto mb-16 max-w-2xl text-center text-gray-500">
						{t('landing.three_steps_desc')}
					</p>

					<div className="grid gap-12 md:grid-cols-3 md:gap-8">
						{/* Step 1 */}
						<div className="group text-center">
							<div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-lg transition group-hover:scale-105 group-hover:shadow-xl">
								<IconHandshake className="h-12 w-12" />
								<span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-accent-500 text-sm font-extrabold text-white shadow">
									1
								</span>
							</div>
							<h3 className="mb-2 text-xl font-bold text-gray-900">
								{t('landing.step1_title')}
							</h3>
							<p className="text-sm leading-relaxed text-gray-500">
								{t('landing.step1_desc')}
							</p>
						</div>

						{/* Step 2 */}
						<div className="group text-center">
							<div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-lg transition group-hover:scale-105 group-hover:shadow-xl">
								<IconPalette className="h-12 w-12" />
								<span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-accent-500 text-sm font-extrabold text-white shadow">
									2
								</span>
							</div>
							<h3 className="mb-2 text-xl font-bold text-gray-900">
								{t('landing.step2_title')}
							</h3>
							<p className="text-sm leading-relaxed text-gray-500">
								{t('landing.step2_desc')}
							</p>
						</div>

						{/* Step 3 */}
						<div className="group text-center">
							<div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-lg transition group-hover:scale-105 group-hover:shadow-xl">
								<IconQrScan className="h-12 w-12" />
								<span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-accent-500 text-sm font-extrabold text-white shadow">
									3
								</span>
							</div>
							<h3 className="mb-2 text-xl font-bold text-gray-900">
								{t('landing.step3_title')}
							</h3>
							<p className="text-sm leading-relaxed text-gray-500">
								{t('landing.step3_desc')}
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* ===== Features ===== */}
			<section id="features" className="px-6 py-20 md:py-28">
				<div className="mx-auto max-w-6xl">
					<p className="mb-2 text-center text-sm font-bold uppercase tracking-widest text-accent-500">
						{t('landing.features')}
					</p>
					<h2 className="mb-4 text-center text-3xl font-extrabold text-gray-900 md:text-4xl">
						{t('landing.everything')}
					</h2>
					<p className="mx-auto mb-16 max-w-2xl text-center text-gray-500">
						{t('landing.everything_desc')}
					</p>

					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{[
							{
								title: t('landing.feat_qr'),
								desc: t('landing.feat_qr_desc'),
								icon: (
									<svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
										<rect x="3" y="3" width="7" height="7" rx="1" />
										<rect x="14" y="3" width="7" height="7" rx="1" />
										<rect x="3" y="14" width="7" height="7" rx="1" />
										<path d="M14 14h3v3h-3zM17 17h4v4h-4zM14 20h2v1h-2z" />
									</svg>
								),
							},
							{
								title: t('landing.feat_brand'),
								desc: t('landing.feat_brand_desc'),
								icon: (
									<svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
										<circle cx="12" cy="12" r="9" />
										<path d="M12 3c3 2 4 5 4 9s-1 7-4 9" />
										<path d="M12 3c-3 2-4 5-4 9s1 7 4 9" />
										<line x1="3" y1="12" x2="21" y2="12" />
									</svg>
								),
							},
							{
								title: t('landing.feat_realtime'),
								desc: t('landing.feat_realtime_desc'),
								icon: (
									<svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
										<path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
									</svg>
								),
							},
							{
								title: t('landing.feat_multi'),
								desc: t('landing.feat_multi_desc'),
								icon: (
									<svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
										<rect x="2" y="3" width="20" height="18" rx="2" />
										<line x1="9" y1="3" x2="9" y2="21" />
										<line x1="2" y1="9" x2="9" y2="9" />
										<line x1="2" y1="15" x2="9" y2="15" />
									</svg>
								),
							},
							{
								title: t('landing.feat_mobile'),
								desc: t('landing.feat_mobile_desc'),
								icon: (
									<svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
										<rect x="6" y="2" width="12" height="20" rx="2" />
										<line x1="10" y1="18" x2="14" y2="18" />
									</svg>
								),
							},
							{
								title: t('landing.feat_roles'),
								desc: t('landing.feat_roles_desc'),
								icon: (
									<svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
										<circle cx="12" cy="8" r="4" />
										<path d="M4 20c0-4 4-7 8-7s8 3 8 7" />
										<path d="M16 4l2 2-4 4" />
									</svg>
								),
							},
						].map((f) => (
							<div
								key={f.title}
								className="group rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
							>
								<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-500 transition group-hover:bg-brand-500 group-hover:text-white">
									{f.icon}
								</div>
								<h3 className="mb-2 text-lg font-bold text-gray-900">{f.title}</h3>
								<p className="text-sm leading-relaxed text-gray-500">{f.desc}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ===== Live Demo ===== */}
			<section id="demo" className="bg-gray-50 px-6 py-20 md:py-28">
				<div className="mx-auto max-w-6xl">
					<p className="mb-2 text-center text-sm font-bold uppercase tracking-widest text-accent-500">
						{t('landing.demo')}
					</p>
					<h2 className="mb-4 text-center text-3xl font-extrabold text-gray-900 md:text-4xl">
						{t('landing.see_dineqr')}
					</h2>
					<p className="mx-auto mb-16 max-w-2xl text-center text-gray-500">
						{t('landing.demo_desc')}
					</p>

					{restaurants.length === 0 ? (
						<p className="text-center text-gray-400">
							{t('landing.no_demo')}
						</p>
					) : (
						<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
							{restaurants.map((r: any) => {
								const rName = l(r, 'name', r.default_language) || r.name;
								const rDesc = l(r, 'description', r.default_language);
								return (
								<a
									key={r.id}
									href={`/${r.slug}`}
									className="group relative overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
								>
									{/* Colored header bar */}
									<div className="relative h-36 bg-gradient-to-br from-brand-500 to-brand-700 p-6">
										<div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.12),transparent)]" />
										<div className="relative z-10">
											<div className="mb-2 flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 text-2xl font-extrabold text-white backdrop-blur-sm">
												{rName.charAt(0)}
											</div>
											<p className="text-xs font-medium text-white/60">
												{t('landing.tap_to_view')}
											</p>
										</div>
										{/* Pepsi badge */}
										<div className="absolute end-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
											<img
												src={PEPSI_LOGO}
												alt="Pepsi"
												className="h-5 w-5 object-contain"
											/>
										</div>
									</div>

									{/* Card body */}
									<div className="p-6">
										<h3 className="mb-1 text-lg font-bold text-gray-900 transition group-hover:text-brand-500">
											{rName}
										</h3>
										{rDesc && (
											<p className="mb-3 line-clamp-2 text-sm text-gray-500">
												{rDesc}
											</p>
										)}
										{r.address && (
											<p className="mb-4 flex items-center gap-1 text-xs text-gray-400">
												<svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0L6.343 16.657a8 8 0 1111.314 0z" />
													<circle cx="12" cy="11" r="3" />
												</svg>
												{r.address}
											</p>
										)}
										<div className="flex items-center gap-2 text-sm font-bold text-brand-500 transition group-hover:gap-3">
											{t('landing.open_menu')}
											<svg className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
											</svg>
										</div>
									</div>
								</a>
								);
							})}
						</div>
					)}
				</div>
			</section>

			{/* ===== For Restaurants ===== */}
			<section id="for-restaurants" className="px-6 py-20 md:py-28">
				<div className="mx-auto max-w-6xl">
					<div className="grid items-center gap-16 lg:grid-cols-2">
						{/* Left — Copy */}
						<div>
							<p className="mb-2 text-sm font-bold uppercase tracking-widest text-accent-500">
								{t('landing.for_restaurants')}
							</p>
							<h2 className="mb-6 text-3xl font-extrabold text-gray-900 md:text-4xl">
								{t('landing.why_choose')}
							</h2>
							<p className="mb-10 text-gray-500">
								{t('landing.why_desc')}
							</p>

							<div className="space-y-6">
								{[
									{
										title: t('landing.benefit_print'),
										desc: t('landing.benefit_print_desc'),
										color: 'bg-green-50 text-green-600',
										icon: (
											<svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-8-6h16" />
											</svg>
										),
									},
									{
										title: t('landing.benefit_instant'),
										desc: t('landing.benefit_instant_desc'),
										color: 'bg-blue-50 text-blue-600',
										icon: (
											<svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
											</svg>
										),
									},
									{
										title: t('landing.benefit_brand'),
										desc: t('landing.benefit_brand_desc'),
										color: 'bg-brand-50 text-brand-500',
										icon: (
											<svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
											</svg>
										),
									},
									{
										title: t('landing.benefit_analytics'),
										desc: t('landing.benefit_analytics_desc'),
										color: 'bg-purple-50 text-purple-600',
										icon: (
											<svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" d="M3 13h4v8H3zM10 9h4v12h-4zM17 5h4v16h-4z" />
											</svg>
										),
									},
								].map((b) => (
									<div key={b.title} className="flex gap-4">
										<div
											className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${b.color}`}
										>
											{b.icon}
										</div>
										<div>
											<h4 className="mb-1 font-bold text-gray-900">{b.title}</h4>
											<p className="text-sm leading-relaxed text-gray-500">
												{b.desc}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Right — Visual / Stats */}
						<div className="relative mx-auto w-full max-w-md">
							{/* Background card */}
							<div className="absolute inset-0 translate-x-4 translate-y-4 rounded-3xl bg-accent-500/10" />
							<div className="relative rounded-3xl bg-brand-500 p-10 text-white shadow-2xl">
								<img
									src={PEPSI_LOGO}
									alt="Pepsi"
									className="mx-auto mb-8 h-16 w-16 drop-shadow-lg"
								/>
								<div className="space-y-6 text-center">
									<div>
										<p className="text-4xl font-extrabold">100%</p>
										<p className="text-sm text-white/60">{t('landing.stat_digital')}</p>
									</div>
									<div className="mx-auto h-px w-16 bg-white/20" />
									<div>
										<p className="text-4xl font-extrabold">&lt; 2s</p>
										<p className="text-sm text-white/60">{t('landing.stat_load')}</p>
									</div>
									<div className="mx-auto h-px w-16 bg-white/20" />
									<div>
										<p className="text-4xl font-extrabold">24/7</p>
										<p className="text-sm text-white/60">{t('landing.stat_uptime')}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* ===== CTA Banner ===== */}
			<section className="bg-gradient-to-r from-brand-500 to-brand-700 px-6 py-16 text-center text-white">
				<div className="mx-auto max-w-3xl">
					<h2 className="mb-4 text-3xl font-extrabold md:text-4xl">
						{t('landing.cta_title')}
					</h2>
					<p className="mb-8 text-lg text-white/70">
						{t('landing.cta_desc')}
					</p>
					<a
						href="#demo"
						className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-bold text-brand-500 shadow-xl transition hover:bg-gray-100"
					>
						{t('landing.explore_demo')}
						<svg
							className={`h-5 w-5 ${isRTL ? 'rotate-180' : ''}`}
							fill="none"
							stroke="currentColor"
							strokeWidth="2.5"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</a>
				</div>
			</section>

			{/* ===== Footer ===== */}
			<footer className="bg-brand-500 px-6 py-12 text-white">
				<div className="mx-auto max-w-6xl">
					<div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
						<div className="flex items-center gap-3">
							<img
								src={PEPSI_LOGO}
								alt="Pepsi"
								className="h-10 w-10 object-contain"
							/>
							<div>
								<p className="text-lg font-extrabold">DineQR</p>
								<p className="text-xs text-white/50">
									{t('landing.footer_tagline')}
								</p>
							</div>
						</div>
						<div className="flex gap-8 text-sm text-white/60">
							<a href="#how-it-works" className="transition hover:text-white">
								{t('landing.how_it_works')}
							</a>
							<a href="#features" className="transition hover:text-white">
								{t('landing.features')}
							</a>
							<a href="#demo" className="transition hover:text-white">
								{t('landing.demo')}
							</a>
							<a href="#for-restaurants" className="transition hover:text-white">
								{t('landing.for_restaurants')}
							</a>
						</div>
					</div>
					<div className="mt-8 border-t border-white/10 pt-6 text-center">
						<p className="text-xs text-white/40">
							{t('landing.copyright')}
						</p>
					</div>
				</div>
			</footer>
		</div>
	);
}
