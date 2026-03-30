import { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Switch, Tag, Select } from 'antd';
import CrudPage from '~/components/CrudPage';
import { apiFetch } from '~/lib/api';
import { getUser } from '~/lib/auth';

export default function MenuSectionsPage() {
	const [restaurants, setRestaurants] = useState<any[]>([]);
	const user = getUser();
	const isSuper = user?.role === 'super_admin';

	useEffect(() => {
		if (isSuper) {
			apiFetch('/api/admin/restaurants?limit=100')
				.then((res) => setRestaurants(res.data.records || []))
				.catch(console.error);
		}
	}, [isSuper]);

	const columns = [
		{ title: 'Name', dataIndex: 'name', key: 'name' },
		{ title: 'Icon', dataIndex: 'icon', key: 'icon', width: 60 },
		...(isSuper
			? [{ title: 'Restaurant', dataIndex: ['restaurant', 'name'], key: 'restaurant' }]
			: []),
		{ title: 'Order', dataIndex: 'display_order', key: 'display_order', width: 80 },
		{
			title: 'Status',
			dataIndex: 'is_active',
			key: 'is_active',
			render: (v: boolean) => <Tag color={v ? 'green' : 'red'}>{v ? 'Active' : 'Inactive'}</Tag>,
		},
	];

	const formFields = (
		<>
			<Form.Item name="name" label="Section Name" rules={[{ required: true }]}>
				<Input placeholder="e.g. Appetizers" />
			</Form.Item>
			<Form.Item name="description" label="Description">
				<Input.TextArea rows={2} />
			</Form.Item>
			<Form.Item name="icon" label="Icon (emoji)">
				<Input placeholder="e.g. 🍕" />
			</Form.Item>
			{isSuper && (
				<Form.Item name="restaurant_id" label="Restaurant" rules={[{ required: true }]}>
					<Select placeholder="Select restaurant">
						{restaurants.map((r) => (
							<Select.Option key={r.id} value={r.id}>
								{r.name}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
			)}
			<Form.Item name="display_order" label="Display Order" initialValue={0}>
				<InputNumber min={0} style={{ width: '100%' }} />
			</Form.Item>
			<Form.Item name="is_active" label="Active" valuePropName="checked" initialValue={true}>
				<Switch />
			</Form.Item>
		</>
	);

	return (
		<CrudPage
			title="Menu Sections"
			endpoint="/api/admin/menu-sections"
			columns={columns}
			formFields={formFields}
			createTitle="Add Section"
			editTitle="Edit Section"
		/>
	);
}
