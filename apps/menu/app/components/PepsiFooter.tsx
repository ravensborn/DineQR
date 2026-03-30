export default function PepsiFooter() {
	return (
		<footer className="bg-brand-500 px-4 py-8 text-center text-white">
			<div className="mx-auto max-w-3xl">
				<div className="mb-3 flex items-center justify-center gap-3">
					<div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
						<span className="text-sm font-bold text-brand-500">DQ</span>
					</div>
					<div className="text-left">
						<p className="text-sm font-bold">DineQR</p>
						<p className="text-xs text-white/60">Digital Menus by Pepsi</p>
					</div>
				</div>
				<div className="my-4 h-px bg-white/10" />
				<p className="text-xs text-white/40">&copy; 2026 DineQR. Powered by Pepsi. All rights reserved.</p>
			</div>
		</footer>
	);
}
