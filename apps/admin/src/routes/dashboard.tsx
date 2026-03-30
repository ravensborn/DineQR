import { useState, useEffect } from 'react';
import { Card, Statistic, Row, Col, Spin } from 'antd';
import { ShopOutlined, AppstoreOutlined, CoffeeOutlined, UserOutlined } from '@ant-design/icons';
import { apiFetch } from '~/lib/api';
import { getUser } from '~/lib/auth';

export default function DashboardPage() {
	const [stats, setStats] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const user = getUser();
	const isSuper = user?.role === 'super_admin';

	useEffect(() => {
		apiFetch('/api/admin/dashboard/stats')
			.then((res) => setStats(res.data.counts))
			.catch(console.error)
			.finally(() => setLoading(false));
	}, []);

	if (loading) {
		return (
			<div className="flex h-64 items-center justify-center">
				<Spin size="large" />
			</div>
		);
	}

	return (
		<div>
			<h1 className="mb-6 text-2xl font-bold text-gray-800">
				{isSuper ? 'Dashboard' : `Welcome, ${user?.name}`}
			</h1>

			<Row gutter={[24, 24]}>
				{isSuper && (
					<Col xs={24} sm={12} lg={6}>
						<Card hoverable>
							<Statistic title="Restaurants" value={stats?.restaurants || 0} prefix={<ShopOutlined style={{ color: '#004B93' }} />} />
						</Card>
					</Col>
				)}
				<Col xs={24} sm={12} lg={6}>
					<Card hoverable>
						<Statistic title="Menu Sections" value={stats?.sections || 0} prefix={<AppstoreOutlined style={{ color: '#004B93' }} />} />
					</Card>
				</Col>
				<Col xs={24} sm={12} lg={6}>
					<Card hoverable>
						<Statistic title="Menu Items" value={stats?.items || 0} prefix={<CoffeeOutlined style={{ color: '#E32934' }} />} />
					</Card>
				</Col>
				{isSuper && (
					<Col xs={24} sm={12} lg={6}>
						<Card hoverable>
							<Statistic title="Users" value={stats?.users || 0} prefix={<UserOutlined style={{ color: '#004B93' }} />} />
						</Card>
					</Col>
				)}
			</Row>
		</div>
	);
}
