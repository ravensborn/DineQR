import { useState } from 'react';

interface MenuHeaderProps {
	restaurant: {
		name: string;
		logo: string | null;
		description: string | null;
		address: string | null;
		phone: string | null;
		working_hours: Record<string, any> | null;
	};
}

export default function MenuHeader({ restaurant }: MenuHeaderProps) {
	const [showInfo, setShowInfo] = useState(false);

	return (
		<header>
			{/* Main header bar */}
			<div className="bg-gradient-to-r from-brand-500 to-brand-700 px-4 py-6 text-white">
				<div className="mx-auto flex max-w-3xl items-center justify-between">
					<div className="flex items-center gap-4">
						{restaurant.logo ? (
							<img
								src={restaurant.logo.startsWith('http') ? restaurant.logo : `${restaurant.logo}`}
								alt={restaurant.name}
								className="h-14 w-14 rounded-xl bg-white object-cover p-1"
							/>
						) : (
							<div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 text-2xl font-bold">
								{restaurant.name.charAt(0)}
							</div>
						)}
						<div>
							<h1 className="text-2xl font-bold">{restaurant.name}</h1>
							{restaurant.description && (
								<p className="mt-0.5 text-sm text-white/70">{restaurant.description}</p>
							)}
						</div>
					</div>
					<div className="flex flex-col items-end gap-1">
						<div className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-sm">
							Powered by <span className="font-bold">Pepsi</span>
						</div>
					</div>
				</div>
			</div>

			{/* Restaurant info bar */}
			{(restaurant.address || restaurant.phone) && (
				<div className="border-b border-gray-200 bg-white">
					<div className="mx-auto max-w-3xl px-4 py-3">
						<button
							onClick={() => setShowInfo(!showInfo)}
							className="flex w-full items-center justify-between text-sm text-gray-600"
						>
							<span className="flex items-center gap-4">
								{restaurant.address && (
									<span className="flex items-center gap-1">
										<svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
										</svg>
										<span className="line-clamp-1">{restaurant.address}</span>
									</span>
								)}
							</span>
							<svg className={`h-4 w-4 transition-transform ${showInfo ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
							</svg>
						</button>

						{showInfo && (
							<div className="mt-3 space-y-2 border-t border-gray-100 pt-3 text-sm text-gray-600">
								{restaurant.address && (
									<div className="flex items-start gap-2">
										<span className="font-medium text-gray-700">Address:</span>
										<span>{restaurant.address}</span>
									</div>
								)}
								{restaurant.phone && (
									<div className="flex items-start gap-2">
										<span className="font-medium text-gray-700">Phone:</span>
										<a href={`tel:${restaurant.phone}`} className="text-brand-500 underline">{restaurant.phone}</a>
									</div>
								)}
								{restaurant.working_hours && (
									<div>
										<span className="font-medium text-gray-700">Hours:</span>
										<div className="mt-1 grid grid-cols-2 gap-1 text-xs">
											{Object.entries(restaurant.working_hours).map(([day, hours]: [string, any]) => (
												<div key={day} className="flex justify-between rounded bg-gray-50 px-2 py-1">
													<span className="font-medium capitalize">{day}</span>
													<span>{hours.closed ? 'Closed' : `${hours.open} — ${hours.close}`}</span>
												</div>
											))}
										</div>
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			)}
		</header>
	);
}
