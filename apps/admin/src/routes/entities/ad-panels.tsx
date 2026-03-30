import { Form, Input, InputNumber, Switch, Tag, Select, Upload, Alert } from 'antd';
import { PlusOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import CrudPage from '~/components/CrudPage';
import { apiFetch } from '~/lib/api';
import { getUser } from '~/lib/auth';

export async function clientLoader() {
	const user = getUser();
	const isSuper = user?.role === 'super_admin';

	const fetches: Promise<any>[] = [
		apiFetch('/api/admin/ad-panels?page=1&limit=20'),
	];
	if (isSuper) {
		fetches.push(apiFetch('/api/admin/restaurants?limit=100'));
	}

	const [adsRes, restaurantsRes] = await Promise.all(fetches);
	return {
		initialData: adsRes.data,
		restaurants: restaurantsRes?.data.records || [],
	};
}

const IMAGE_SIZE_HINTS: Record<string, { size: string; ratio: string }> = {
	top: { size: '1200 × 200', ratio: '6:1' },
	sidebar: { size: '350 × 500', ratio: '7:10' },
	inline: { size: '800 × 200', ratio: '4:1' },
};

function PositionImageHint() {
	const { t } = useTranslation();
	const position = Form.useWatch('position');
	const hint = IMAGE_SIZE_HINTS[position];
	if (!hint) return null;

	const positionLabels: Record<string, string> = {
		top: t('ad_panels.position_top'),
		sidebar: t('ad_panels.position_sidebar'),
		inline: t('ad_panels.position_inline'),
	};

	return (
		<Alert
			type="info"
			showIcon
			icon={<InfoCircleOutlined />}
			message={`${positionLabels[position]}: ${t('ad_panels.recommended_size')} ${hint.size}px (${hint.ratio})`}
			style={{ marginBottom: 16 }}
		/>
	);
}

export default function AdPanelsPage({ loaderData }: any) {
	const { initialData, restaurants } = loaderData;
	const { t } = useTranslation();
	const user = getUser();
	const isSuper = user?.role === 'super_admin';

	const positionLabels: Record<string, string> = {
		top: t('ad_panels.position_top'),
		sidebar: t('ad_panels.position_sidebar'),
		inline: t('ad_panels.position_inline'),
	};

	const positionColors: Record<string, string> = {
		top: 'blue',
		sidebar: 'purple',
		inline: 'orange',
	};

	const columns = [
		{ title: t('ad_panels.name'), dataIndex: 'title', key: 'title' },
		{
			title: t('ad_panels.image'),
			dataIndex: 'image',
			key: 'image',
			width: 80,
			render: (v: string) => v ? <img src={v} alt="" className="h-10 w-16 rounded object-cover" /> : '—',
		},
		{
			title: t('ad_panels.position'),
			dataIndex: 'position',
			key: 'position',
			render: (v: string) => <Tag color={positionColors[v] || 'default'}>{positionLabels[v] || v}</Tag>,
		},
		...(isSuper
			? [{ title: t('ad_panels.restaurant'), dataIndex: ['restaurant', 'name'], key: 'restaurant' }]
			: []),
		{ title: t('ad_panels.display_order'), dataIndex: 'display_order', key: 'display_order', width: 80 },
		{
			title: t('common.status'),
			dataIndex: 'is_active',
			key: 'is_active',
			render: (v: boolean) => <Tag color={v ? 'green' : 'red'}>{v ? t('common.active') : t('common.inactive')}</Tag>,
		},
	];

	const positionOptions = [
		{ value: 'top', label: t('ad_panels.position_top') },
		{ value: 'sidebar', label: t('ad_panels.position_sidebar') },
		{ value: 'inline', label: t('ad_panels.position_inline') },
	];

	const formFields = (
		<>
			<Form.Item name="title" label={t('ad_panels.name')} rules={[{ required: true }]}>
				<Input placeholder={t('ad_panels.name_placeholder')} />
			</Form.Item>
			<Form.Item name="position" label={t('ad_panels.position')} rules={[{ required: true }]} initialValue="inline">
				<Select options={positionOptions} />
			</Form.Item>
			<PositionImageHint />
			<Form.Item name="image" label={t('ad_panels.image')} valuePropName="fileList" getValueFromEvent={(e: any) => (Array.isArray(e) ? e : e?.fileList)}>
				<Upload listType="picture-card" maxCount={1} beforeUpload={() => false} accept="image/*">
					<div>
						<PlusOutlined />
						<div style={{ marginTop: 8 }}>{t('ad_panels.upload')}</div>
					</div>
				</Upload>
			</Form.Item>
			<Form.Item name="link" label={t('ad_panels.link')}>
				<Input placeholder={t('ad_panels.link_placeholder')} />
			</Form.Item>
			{isSuper && (
				<Form.Item name="restaurant_id" label={t('ad_panels.restaurant')} rules={[{ required: true }]}>
					<Select placeholder={t('ad_panels.restaurant_select')}>
						{restaurants.map((r: any) => (
							<Select.Option key={r.id} value={r.id}>
								{r.name}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
			)}
			<Form.Item name="display_order" label={t('ad_panels.display_order')} initialValue={0}>
				<InputNumber min={0} style={{ width: '100%' }} />
			</Form.Item>
			<Form.Item name="is_active" label={t('common.active')} valuePropName="checked" initialValue={true}>
				<Switch />
			</Form.Item>
		</>
	);

	return (
		<CrudPage
			title={t('ad_panels.title')}
			endpoint="/api/admin/ad-panels"
			columns={columns}
			formFields={formFields}
			initialData={initialData}
			createTitle={t('ad_panels.add')}
			editTitle={t('ad_panels.edit')}
			useFormData={true}
		/>
	);
}
