import { Outlet, redirect } from 'react-router';
import Sidebar from '~/components/layout/Sidebar';
import Topbar from '~/components/layout/Topbar';
import { getToken } from '~/lib/auth';

export async function clientLoader() {
	if (!getToken()) {
		return redirect('/login');
	}
	return null;
}

export default function AuthenticatedLayout() {
	return (
		<div className="flex h-screen overflow-hidden bg-gray-50">
			<Sidebar />
			<div className="flex flex-1 flex-col overflow-hidden">
				<Topbar />
				<main className="flex-1 overflow-y-auto p-6">
					<Outlet />
				</main>
			</div>
		</div>
	);
}
