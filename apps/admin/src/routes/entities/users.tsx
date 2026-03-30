import { useState, useEffect } from 'react';
import { Form, Input, Select, Switch, Tag } from 'antd';
import CrudPage from '~/components/CrudPage';
import { apiFetch } from '~/lib/api';

export default function UsersPage() {
	const [restaurants, setRestaurants] = useState<any[]>([]);

	useEffect(() => {
		apiFetch('/api/admin/restaurants?limit=100')
			.then((res) => setRestaurants(res.data.records || []))
			.catch(console.error);
	}, []);

	const columns = [
		{ title: 'Name', dataIndex: 'name', key: 'name' },
		{ title: 'Email', dataIndex: 'email', key: 'email' },
		{
			title: 'Role',
			dataIndex: 'role',
			key: 'role',
			render: (v: string) => (
				<Tag color={v === 'super_admin' ? '#004B93' : '#E32934'}>
					{v === 'super_admin' ? 'Super Admin' : 'Restaurant Admin'}
				</Tag>
			),
		},
		{
			title: 'Restaurant',
			dataIndex: ['restaurant', 'name'],
			key: 'restaurant',
			render: (v: string) => v || '—',
		},
		{
			title: 'Status',
			dataIndex: 'is_active',
			key: 'is_active',
			render: (v: boolean) => <Tag color={v ? 'green' : 'red'}>{v ? 'Active' : 'Inactive'}</Tag>,
		},
	];

	const formFields = (
		<>
			<Form.Item name="name" label="Full Name" rules={[{ required: true }]}>
				<Input placeholder="John Doe" />
			</Form.Item>
			<Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
				<Input placeholder="user@example.com" />
			</Form.Item>
			<Form.Item name="password" label="Password" rules={[{ min: 6, message: 'At least 6 characters' }]}>
				<Input.Password placeholder="Leave empty to keep current" />
			</Form.Item>
			<Form.Item name="role" label="Role" rules={[{ required: true }]} initialValue="restaurant_admin">
				<Select>
					<Select.Option value="super_admin">Super Admin</Select.Option>
					<Select.Option value="restaurant_admin">Restaurant Admin</Select.Option>
				</Select>
			</Form.Item>
			<Form.Item name="restaurant_id" label="Restaurant">
				<Select placeholder="Select restaurant (for restaurant admins)" allowClear>
					{restaurants.map((r) => (
						<Select.Option key={r.id} value={r.id}>
							{r.name}
						</Select.Option>
					))}
				</Select>
			</Form.Item>
			<Form.Item name="is_active" label="Active" valuePropName="checked" initialValue={true}>
				<Switch />
			</Form.Item>
		</>
	);

	return (
		<CrudPage
			title="Users"
			endpoint="/api/admin/users"
			columns={columns}
			formFields={formFields}
			createTitle="Add User"
			editTitle="Edit User"
		/>
	);
}
