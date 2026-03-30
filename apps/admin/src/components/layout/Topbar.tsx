import { getUser } from '~/lib/auth';
import { Tag } from 'antd';

export default function Topbar() {
	const user = getUser();

	return (
		<header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
			<div>
				<h2 className="text-lg font-semibold text-gray-800">DineQR Admin Panel</h2>
			</div>
			<div className="flex items-center gap-3">
				{user && (
					<>
						<Tag color={user.role === 'super_admin' ? '#004B93' : '#E32934'}>
							{user.role === 'super_admin' ? 'Super Admin' : 'Restaurant Admin'}
						</Tag>
						<span className="text-sm text-gray-600">{user.name}</span>
					</>
				)}
			</div>
		</header>
	);
}
