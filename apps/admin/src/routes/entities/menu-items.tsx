import { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Switch, Tag, Select } from 'antd';
import CrudPage from '~/components/CrudPage';
import { apiFetch } from '~/lib/api';
import { getUser } from '~/lib/auth';
import { MENU_ITEM_TAG } from '@dineqr/shared';

export default function MenuItemsPage() {
	const [restaurants, setRestaurants] = useState<any[]>([]);
	const [sections, setSections] = useState<any[]>([]);
	const user = getUser();
	const isSuper = user?.role === 'super_admin';

	useEffect(() => {
		if (isSuper) {
			apiFetch('/api/admin/restaurants?limit=100')
				.then((res) => setRestaurants(res.data.records || []))
				.catch(console.error);
		}
		apiFetch('/api/admin/menu-sections?limit=100')
			.then((res) => setSections(res.data.records || []))
			.catch(console.error);
	}, [isSuper]);

	const tagOptions = Object.values(MENU_ITEM_TAG).map((t) => ({
		label: t.charAt(0).toUpperCase() + t.slice(1).replace('_', ' '),
		value: t,
	}));

	const columns = [
		{ title: 'Name', dataIndex: 'name', key: 'name' },
		{
			title: 'Price',
			dataIndex: 'price',
			key: 'price',
			render: (v: number) => <span className="font-semibold text-brand-500">${Number(v).toFixed(2)}</span>,
		},
		{ title: 'Section', dataIndex: ['section', 'name'], key: 'section' },
		...(isSuper
			? [{ title: 'Restaurant', dataIndex: ['restaurant', 'name'], key: 'restaurant' }]
			: []),
		{
			title: 'Featured',
			dataIndex: 'is_featured',
			key: 'is_featured',
			render: (v: boolean) => v ? <Tag color="gold">Featured</Tag> : null,
		},
		{
			title: 'Tags',
			dataIndex: 'tags',
			key: 'tags',
			render: (tags: string[]) =>
				tags?.map((t) => (
					<Tag key={t} color={t === 'spicy' ? 'red' : t === 'vegetarian' ? 'green' : t === 'new' ? 'blue' : 'default'}>
						{t}
					</Tag>
				)),
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
			<Form.Item name="name" label="Item Name" rules={[{ required: true }]}>
				<Input placeholder="e.g. Margherita Pizza" />
			</Form.Item>
			<Form.Item name="description" label="Description">
				<Input.TextArea rows={2} />
			</Form.Item>
			<Form.Item name="price" label="Price ($)" rules={[{ required: true }]}>
				<InputNumber min={0} step={0.5} precision={2} style={{ width: '100%' }} placeholder="0.00" />
			</Form.Item>
			<Form.Item name="section_id" label="Menu Section" rules={[{ required: true }]}>
				<Select placeholder="Select section">
					{sections.map((s) => (
						<Select.Option key={s.id} value={s.id}>
							{s.icon} {s.name} {s.restaurant ? `(${s.restaurant.name})` : ''}
						</Select.Option>
					))}
				</Select>
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
			<Form.Item name="tags" label="Tags">
				<Select mode="multiple" placeholder="Select tags" options={tagOptions} />
			</Form.Item>
			<Form.Item name="display_order" label="Display Order" initialValue={0}>
				<InputNumber min={0} style={{ width: '100%' }} />
			</Form.Item>
			<Form.Item name="is_featured" label="Featured" valuePropName="checked" initialValue={false}>
				<Switch />
			</Form.Item>
			<Form.Item name="is_active" label="Active" valuePropName="checked" initialValue={true}>
				<Switch />
			</Form.Item>
		</>
	);

	return (
		<CrudPage
			title="Menu Items"
			endpoint="/api/admin/menu-items"
			columns={columns}
			formFields={formFields}
			createTitle="Add Item"
			editTitle="Edit Item"
		/>
	);
}
