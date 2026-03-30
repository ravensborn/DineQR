import { useState } from 'react';
import { Form, Input, Switch, Tag, Button } from 'antd';
import { QrcodeOutlined } from '@ant-design/icons';
import CrudPage from '~/components/CrudPage';
import QRCodeModal from '~/components/QRCodeModal';

export default function RestaurantsPage() {
	const [qrModal, setQrModal] = useState<{ open: boolean; id: string; name: string; slug: string }>({
		open: false,
		id: '',
		name: '',
		slug: '',
	});

	const columns = [
		{ title: 'Name', dataIndex: 'name', key: 'name', sorter: true },
		{ title: 'Slug', dataIndex: 'slug', key: 'slug', render: (v: string) => <code className="rounded bg-gray-100 px-2 py-1 text-xs">{v}</code> },
		{
			title: 'Status',
			dataIndex: 'is_active',
			key: 'is_active',
			render: (v: boolean) => <Tag color={v ? 'green' : 'red'}>{v ? 'Active' : 'Inactive'}</Tag>,
		},
		{
			title: 'QR Code',
			key: 'qr',
			render: (_: any, record: any) => (
				<Button
					type="link"
					icon={<QrcodeOutlined />}
					onClick={() => setQrModal({ open: true, id: record.id, name: record.name, slug: record.slug })}
				>
					QR Code
				</Button>
			),
		},
	];

	const formFields = (
		<>
			<Form.Item name="name" label="Restaurant Name" rules={[{ required: true, message: 'Name is required' }]}>
				<Input placeholder="e.g. The Golden Fork" />
			</Form.Item>
			<Form.Item name="slug" label="URL Slug" rules={[{ required: true, message: 'Slug is required' }, { pattern: /^[a-z0-9-]+$/, message: 'Lowercase letters, numbers, and hyphens only' }]}>
				<Input placeholder="e.g. the-golden-fork" />
			</Form.Item>
			<Form.Item name="description" label="Description">
				<Input.TextArea rows={3} placeholder="Brief description of the restaurant" />
			</Form.Item>
			<Form.Item name="address" label="Address">
				<Input placeholder="Full address" />
			</Form.Item>
			<Form.Item name="phone" label="Phone">
				<Input placeholder="+1 234 567 890" />
			</Form.Item>
			<Form.Item name="theme_color" label="Theme Color">
				<Input placeholder="#004B93" />
			</Form.Item>
			<Form.Item name="is_active" label="Active" valuePropName="checked" initialValue={true}>
				<Switch />
			</Form.Item>
		</>
	);

	return (
		<>
			<CrudPage
				title="Restaurants"
				endpoint="/api/admin/restaurants"
				columns={columns}
				formFields={formFields}
				createTitle="Add Restaurant"
				editTitle="Edit Restaurant"
			/>
			<QRCodeModal
				open={qrModal.open}
				onClose={() => setQrModal({ ...qrModal, open: false })}
				restaurantId={qrModal.id}
				restaurantName={qrModal.name}
				restaurantSlug={qrModal.slug}
			/>
		</>
	);
}
