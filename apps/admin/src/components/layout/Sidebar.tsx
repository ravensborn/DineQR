import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import {
	DashboardOutlined,
	ShopOutlined,
	AppstoreOutlined,
	UserOutlined,
	PictureOutlined,
	LogoutOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { getUser, clearAuth } from '~/lib/auth';

interface NavItem {
	labelKey: string;
	path: string;
	icon: React.ReactNode;
	roles?: string[];
}

const navItems: NavItem[] = [
	{ labelKey: 'sidebar.dashboard', path: '/', icon: <DashboardOutlined /> },
	{ labelKey: 'sidebar.restaurants', path: '/restaurants', icon: <ShopOutlined />, roles: ['super_admin'] },
	{ labelKey: 'sidebar.menu', path: '/menu', icon: <AppstoreOutlined /> },
	{ labelKey: 'sidebar.ad_panels', path: '/ad-panels', icon: <PictureOutlined /> },
	{ labelKey: 'sidebar.users', path: '/users', icon: <UserOutlined />, roles: ['super_admin'] },
];

export default function Sidebar() {
	const location = useLocation();
	const [collapsed, setCollapsed] = useState(false);
	const [modal, contextHolder] = Modal.useModal();
	const { t } = useTranslation();
	const user = getUser();
	const userRole = user?.role || 'restaurant_admin';

	const filteredItems = navItems.filter((item) => !item.roles || item.roles.includes(userRole));

	const handleLogout = () => {
		modal.confirm({
			title: t('sidebar.confirm_logout'),
			icon: <ExclamationCircleOutlined />,
			content: t('sidebar.logout_message'),
			okText: t('sidebar.logout'),
			okType: 'danger',
			cancelText: t('common.cancel'),
			onOk() {
				clearAuth();
				window.location.href = '/login';
			},
		});
	};

	return (
		<>
		{contextHolder}
		<aside
			className={`flex h-screen flex-col bg-brand-500 text-white transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}
		>
			{/* Logo */}
			<div className="flex items-center gap-3 border-b border-white/10 px-4 py-5">
				<div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white">
					<span className="text-lg font-bold text-brand-500">DQ</span>
				</div>
				{!collapsed && (
					<div>
						<h1 className="text-lg font-bold leading-tight">DineQR</h1>
						<p className="text-xs text-white/60">{t('sidebar.powered_by')}</p>
					</div>
				)}
			</div>

			{/* Navigation */}
			<nav className="flex-1 overflow-y-auto px-3 py-4">
				<ul className="space-y-1">
					{filteredItems.map((item) => {
						const isActive = item.path === '/' ? location.pathname === '/' : location.pathname.startsWith(item.path);
						return (
							<li key={item.path}>
								<Link
									to={item.path}
									className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
										isActive ? 'bg-white/20 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'
									}`}
								>
									<span className="text-lg">{item.icon}</span>
									{!collapsed && <span>{t(item.labelKey)}</span>}
								</Link>
							</li>
						);
					})}
				</ul>
			</nav>

			{/* Footer */}
			<div className="border-t border-white/10 px-3 py-4">
				{!collapsed && user && (
					<div className="mb-3 px-3">
						<p className="truncate text-sm font-medium">{user.name}</p>
						<p className="truncate text-xs text-white/60">{user.email}</p>
					</div>
				)}
				<button
					onClick={handleLogout}
					className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
				>
					<LogoutOutlined className="text-lg" />
					{!collapsed && <span>{t('sidebar.logout')}</span>}
				</button>
				<button
					onClick={() => setCollapsed(!collapsed)}
					className="mt-2 flex w-full items-center justify-center rounded-lg py-2 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
				>
					{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
				</button>
			</div>
		</aside>
		</>
	);
}
