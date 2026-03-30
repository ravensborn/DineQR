import { Card, Statistic, Row, Col } from 'antd';
import { ShopOutlined, AppstoreOutlined, CoffeeOutlined, UserOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { apiFetch } from '~/lib/api';
import { getUser } from '~/lib/auth';
import type { Route } from './+types/dashboard';

export async function clientLoader() {
	const res = await apiFetch('/api/admin/dashboard/stats');
	return { stats: res.data.counts };
}

export default function DashboardPage({ loaderData }: Route.ComponentProps) {
	const { stats } = loaderData;
	const { t } = useTranslation();
	const user = getUser();
	const isSuper = user?.role === 'super_admin';

	return (
		<div>
			<h1 className="mb-6 text-2xl font-bold text-gray-800">
				{isSuper ? t('dashboard.title') : t('dashboard.welcome', { name: user?.name })}
			</h1>

			<Row gutter={[24, 24]}>
				{isSuper && (
					<Col xs={24} sm={12} lg={6}>
						<Card hoverable>
							<Statistic title={t('dashboard.restaurants')} value={stats?.restaurants || 0} prefix={<ShopOutlined style={{ color: '#004B93' }} />} />
						</Card>
					</Col>
				)}
				<Col xs={24} sm={12} lg={6}>
					<Card hoverable>
						<Statistic title={t('dashboard.menu_sections')} value={stats?.sections || 0} prefix={<AppstoreOutlined style={{ color: '#004B93' }} />} />
					</Card>
				</Col>
				<Col xs={24} sm={12} lg={6}>
					<Card hoverable>
						<Statistic title={t('dashboard.menu_items')} value={stats?.items || 0} prefix={<CoffeeOutlined style={{ color: '#E32934' }} />} />
					</Card>
				</Col>
				{isSuper && (
					<Col xs={24} sm={12} lg={6}>
						<Card hoverable>
							<Statistic title={t('dashboard.users')} value={stats?.users || 0} prefix={<UserOutlined style={{ color: '#004B93' }} />} />
						</Card>
					</Col>
				)}
			</Row>
		</div>
	);
}
