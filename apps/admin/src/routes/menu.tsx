import { Outlet, useLocation, useNavigate } from 'react-router';
import { Tabs } from 'antd';
import { AppstoreOutlined, CoffeeOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

export default function MenuLayout() {
	const { t } = useTranslation();
	const location = useLocation();
	const navigate = useNavigate();

	const activeKey = location.pathname.includes('/menu/items') ? 'items' : 'sections';

	const items = [
		{
			key: 'sections',
			label: (
				<span className="flex items-center gap-2">
					<AppstoreOutlined />
					{t('menu_sections.title')}
				</span>
			),
		},
		{
			key: 'items',
			label: (
				<span className="flex items-center gap-2">
					<CoffeeOutlined />
					{t('menu_items.title')}
				</span>
			),
		},
	];

	return (
		<div>
			<h1 className="mb-4 text-2xl font-bold text-gray-800">{t('sidebar.menu')}</h1>
			<Tabs
				activeKey={activeKey}
				items={items}
				onChange={(key) => navigate(key === 'items' ? '/menu/items' : '/menu')}
				size="large"
			/>
			<Outlet />
		</div>
	);
}
