import { useState, useEffect, useCallback } from 'react';
import { Table, Button, Modal, Form, message, Popconfirm, Space, Input } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { apiFetch } from '~/lib/api';

interface CrudPageProps {
	title: string;
	endpoint: string;
	columns: any[];
	formFields: React.ReactNode;
	createTitle?: string;
	editTitle?: string;
	useFormData?: boolean;
	extraQueryParams?: Record<string, string>;
	rowKey?: string;
}

export default function CrudPage({
	title,
	endpoint,
	columns,
	formFields,
	createTitle = 'Create',
	editTitle = 'Edit',
	useFormData = false,
	extraQueryParams = {},
	rowKey = 'id',
}: CrudPageProps) {
	const [data, setData] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);
	const [total, setTotal] = useState(0);
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState('');
	const [modalOpen, setModalOpen] = useState(false);
	const [editing, setEditing] = useState<any>(null);
	const [submitting, setSubmitting] = useState(false);
	const [form] = Form.useForm();

	const fetchData = useCallback(async () => {
		setLoading(true);
		try {
			const params = new URLSearchParams({ page: String(page), limit: '20', ...extraQueryParams });
			if (search) params.set('search', search);
			const res = await apiFetch(`${endpoint}?${params}`);
			setData(res.data.records || []);
			setTotal(res.data.meta?.total || 0);
		} catch (err: any) {
			message.error(err.message || 'Failed to fetch data');
		} finally {
			setLoading(false);
		}
	}, [endpoint, page, search, extraQueryParams]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const handleCreate = () => {
		setEditing(null);
		form.resetFields();
		setModalOpen(true);
	};

	const handleEdit = (record: any) => {
		setEditing(record);
		form.setFieldsValue(record);
		setModalOpen(true);
	};

	const handleDelete = async (id: string) => {
		try {
			await apiFetch(`${endpoint}/${id}`, { method: 'DELETE' });
			message.success('Deleted successfully');
			fetchData();
		} catch (err: any) {
			message.error(err.message || 'Delete failed');
		}
	};

	const handleSubmit = async () => {
		try {
			const values = await form.validateFields();
			setSubmitting(true);

			let options: RequestInit & { isFormData?: boolean };

			if (useFormData) {
				const formData = new FormData();
				Object.entries(values).forEach(([key, value]) => {
					if (value !== undefined && value !== null) {
						if (key === 'logo' || key === 'image') {
							if (value && typeof value === 'object' && (value as any).file) {
								formData.append(key, (value as any).file.originFileObj || (value as any).file);
							}
						} else if (Array.isArray(value)) {
							formData.append(key, JSON.stringify(value));
						} else {
							formData.append(key, String(value));
						}
					}
				});
				options = { method: editing ? 'PUT' : 'POST', body: formData, isFormData: true };
			} else {
				options = { method: editing ? 'PUT' : 'POST', body: JSON.stringify(values) };
			}

			const url = editing ? `${endpoint}/${editing.id}` : endpoint;
			await apiFetch(url, options);
			message.success(editing ? 'Updated successfully' : 'Created successfully');
			setModalOpen(false);
			form.resetFields();
			setEditing(null);
			fetchData();
		} catch (err: any) {
			if (err.message) message.error(err.message);
		} finally {
			setSubmitting(false);
		}
	};

	const actionColumn = {
		title: 'Actions',
		key: 'actions',
		width: 120,
		render: (_: any, record: any) => (
			<Space>
				<Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
				<Popconfirm title="Delete this record?" onConfirm={() => handleDelete(record.id)} okText="Yes" cancelText="No">
					<Button type="link" danger icon={<DeleteOutlined />} />
				</Popconfirm>
			</Space>
		),
	};

	return (
		<div>
			<div className="mb-4 flex items-center justify-between">
				<h1 className="text-2xl font-bold text-gray-800">{title}</h1>
				<Space>
					<Input
						placeholder="Search..."
						prefix={<SearchOutlined />}
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						onPressEnter={() => { setPage(1); fetchData(); }}
						allowClear
						style={{ width: 250 }}
					/>
					<Button icon={<ReloadOutlined />} onClick={fetchData}>Refresh</Button>
					<Button type="primary" icon={<PlusOutlined />} onClick={handleCreate} style={{ backgroundColor: '#004B93' }}>
						{createTitle}
					</Button>
				</Space>
			</div>

			<Table
				rowKey={rowKey}
				columns={[...columns, actionColumn]}
				dataSource={data}
				loading={loading}
				pagination={{
					current: page,
					total,
					pageSize: 20,
					onChange: (p) => setPage(p),
					showTotal: (t) => `Total ${t} records`,
				}}
				scroll={{ x: 'max-content' }}
			/>

			<Modal
				title={editing ? editTitle : createTitle}
				open={modalOpen}
				onCancel={() => { setModalOpen(false); setEditing(null); form.resetFields(); }}
				onOk={handleSubmit}
				confirmLoading={submitting}
				width={640}
				destroyOnClose
			>
				<Form form={form} layout="vertical" preserve={false}>
					{formFields}
				</Form>
			</Modal>
		</div>
	);
}
