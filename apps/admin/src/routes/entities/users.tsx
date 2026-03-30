import { Form, Input, Select, Switch, Tag } from 'antd';
import { useTranslation } from 'react-i18next';
import CrudPage from '~/components/CrudPage';
import { apiFetch } from '~/lib/api';
import type { Route } from './+types/users';

export async function clientLoader() {
	const [usersRes, restaurantsRes] = await Promise.all([
		apiFetch('/api/admin/users?page=1&limit=20'),
		apiFetch('/api/admin/restaurants?limit=100'),
	]);
	return {
		initialData: usersRes.data,
		restaurants: restaurantsRes.data.records || [],
	};
}

export default function UsersPage({ loaderData }: Route.ComponentProps) {
	const { initialData, restaurants } = loaderData;
	const { t } = useTranslation();

	const columns = [
		{ title: t('users.name'), dataIndex: 'name', key: 'name' },
		{ title: t('users.email'), dataIndex: 'email', key: 'email' },
		{
			title: t('users.role'),
			dataIndex: 'role',
			key: 'role',
			render: (v: string) => (
				<Tag color={v === 'super_admin' ? '#004B93' : '#E32934'}>
					{v === 'super_admin' ? t('topbar.super_admin') : t('topbar.restaurant_admin')}
				</Tag>
			),
		},
		{
			title: t('users.restaurant'),
			dataIndex: ['restaurant', 'name'],
			key: 'restaurant',
			render: (v: string) => v || '—',
		},
		{
			title: t('common.status'),
			dataIndex: 'is_active',
			key: 'is_active',
			render: (v: boolean) => <Tag color={v ? 'green' : 'red'}>{v ? t('common.active') : t('common.inactive')}</Tag>,
		},
	];

	const formFields = (
		<>
			<Form.Item name="name" label={t('users.name')} rules={[{ required: true }]}>
				<Input placeholder={t('users.name_placeholder')} />
			</Form.Item>
			<Form.Item name="email" label={t('users.email')} rules={[{ required: true, type: 'email' }]}>
				<Input placeholder={t('users.email_placeholder')} />
			</Form.Item>
			<Form.Item name="password" label={t('users.password')} rules={[{ min: 6, message: t('users.password_min') }]}>
				<Input.Password placeholder={t('users.password_placeholder')} />
			</Form.Item>
			<Form.Item name="role" label={t('users.role')} rules={[{ required: true }]} initialValue="restaurant_admin">
				<Select>
					<Select.Option value="super_admin">{t('topbar.super_admin')}</Select.Option>
					<Select.Option value="restaurant_admin">{t('topbar.restaurant_admin')}</Select.Option>
				</Select>
			</Form.Item>
			<Form.Item name="restaurant_id" label={t('users.restaurant')}>
				<Select placeholder={t('users.restaurant_select')} allowClear>
					{restaurants.map((r: any) => (
						<Select.Option key={r.id} value={r.id}>
							{r.name}
						</Select.Option>
					))}
				</Select>
			</Form.Item>
			<Form.Item name="is_active" label={t('common.active')} valuePropName="checked" initialValue={true}>
				<Switch />
			</Form.Item>
		</>
	);

	return (
		<CrudPage
			title={t('users.title')}
			endpoint="/api/admin/users"
			columns={columns}
			formFields={formFields}
			initialData={initialData}
			createTitle={t('users.add')}
			editTitle={t('users.edit')}
		/>
	);
}
