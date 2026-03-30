import { useState, useCallback } from 'react';
import { Table, Button, Modal, Form, message, Popconfirm, Space, Input } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { apiFetch } from '~/lib/api';

interface CrudPageProps {
	title: string;
	endpoint: string;
	columns: any[];
	formFields: React.ReactNode;
	initialData: { records: any[]; meta: { total: number; page: number; limit: number; total_pages: number } };
	createTitle?: string;
	editTitle?: string;
	useFormData?: boolean;
	extraQueryParams?: Record<string, string>;
	rowKey?: string;
	hideTitle?: boolean;
}

export default function CrudPage({
	title,
	endpoint,
	columns,
	formFields,
	initialData,
	createTitle,
	editTitle,
	useFormData = false,
	extraQueryParams = {},
	rowKey = 'id',
	hideTitle = false,
}: CrudPageProps) {
	const { t } = useTranslation();
	const resolvedCreateTitle = createTitle || t('common.create');
	const resolvedEditTitle = editTitle || t('common.edit');

	const [data, setData] = useState<any[]>(initialData.records);
	const [loading, setLoading] = useState(false);
	const [total, setTotal] = useState(initialData.meta.total);
	const [page, setPage] = useState(initialData.meta.page);
	const [search, setSearch] = useState('');
	const [modalOpen, setModalOpen] = useState(false);
	const [editing, setEditing] = useState<any>(null);
	const [submitting, setSubmitting] = useState(false);
	const [form] = Form.useForm();

	const fetchData = useCallback(async (fetchPage?: number, fetchSearch?: string) => {
		setLoading(true);
		try {
			const p = fetchPage ?? page;
			const s = fetchSearch ?? search;
			const params = new URLSearchParams({ page: String(p), limit: '20', ...extraQueryParams });
			if (s) params.set('search', s);
			const res = await apiFetch(`${endpoint}?${params}`);
			setData(res.data.records || []);
			setTotal(res.data.meta?.total || 0);
		} catch (err: any) {
			message.error(err.message || t('common.fetch_error'));
		} finally {
			setLoading(false);
		}
	}, [endpoint, page, search, extraQueryParams, t]);

	const handlePageChange = (newPage: number) => {
		setPage(newPage);
		fetchData(newPage);
	};

	const handleSearch = () => {
		setPage(1);
		fetchData(1, search);
	};

	const handleCreate = () => {
		setEditing(null);
		form.resetFields();
		setModalOpen(true);
	};

	const handleEdit = (record: any) => {
		setEditing(record);
		const values = { ...record };
		for (const key of ['image', 'logo']) {
			if (typeof values[key] === 'string' && values[key]) {
				values[key] = [{ uid: '-1', name: key, status: 'done', url: values[key] }];
			}
		}
		if (Array.isArray(values.images)) {
			values.images = values.images.map((url: string, i: number) => ({
				uid: `-${i + 1}`,
				name: `image-${i + 1}`,
				status: 'done',
				url: url,
			}));
		}
		form.setFieldsValue(values);
		setModalOpen(true);
	};

	const handleDelete = async (id: string) => {
		try {
			await apiFetch(`${endpoint}/${id}`, { method: 'DELETE' });
			message.success(t('common.deleted_success'));
			fetchData();
		} catch (err: any) {
			message.error(err.message || t('common.delete_error'));
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
						if (key === 'logo' || key === 'image' || key === 'images') {
							if (Array.isArray(value)) {
								const existingUrls: string[] = [];
								const fieldName = key === 'images' ? 'images' : key;
								value.forEach((item: any) => {
									if (item.originFileObj) {
										formData.append(fieldName, item.originFileObj);
									} else if (item.url) {
										existingUrls.push(item.url);
									}
								});
								if (existingUrls.length > 0) {
									formData.append('existingImages', JSON.stringify(existingUrls));
								}
							}
						} else if (key.endsWith('_i18n') && typeof value === 'object') {
							formData.append(key, JSON.stringify(value));
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
			message.success(editing ? t('common.updated_success') : t('common.created_success'));
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
		title: t('common.actions'),
		key: 'actions',
		width: 120,
		render: (_: any, record: any) => (
			<Space>
				<Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
				<Popconfirm title={t('common.delete_confirm')} onConfirm={() => handleDelete(record.id)} okText={t('common.yes')} cancelText={t('common.no')}>
					<Button type="link" danger icon={<DeleteOutlined />} />
				</Popconfirm>
			</Space>
		),
	};

	return (
		<div>
			<div className="mb-4 flex items-center justify-between">
				{!hideTitle && <h1 className="text-2xl font-bold text-gray-800">{title}</h1>}
				<Space>
					<Input
						placeholder={t('common.search')}
						prefix={<SearchOutlined />}
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						onPressEnter={handleSearch}
						allowClear
						style={{ width: 250 }}
					/>
					<Button icon={<ReloadOutlined />} onClick={() => fetchData()}>{t('common.refresh')}</Button>
					<Button type="primary" icon={<PlusOutlined />} onClick={handleCreate} style={{ backgroundColor: '#004B93' }}>
						{resolvedCreateTitle}
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
					onChange: handlePageChange,
					showTotal: (total) => t('common.total_records', { count: total }),
				}}
				scroll={{ x: 'max-content' }}
			/>

			<Modal
				title={editing ? resolvedEditTitle : resolvedCreateTitle}
				open={modalOpen}
				onCancel={() => { setModalOpen(false); setEditing(null); form.resetFields(); }}
				onOk={handleSubmit}
				confirmLoading={submitting}
				width={640}
				forceRender
			>
				<Form form={form} layout="vertical">
					{formFields}
				</Form>
			</Modal>
		</div>
	);
}
