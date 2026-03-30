import { Form, Input, InputNumber, Switch, Tag, Select, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import CrudPage from '~/components/CrudPage';
import I18nInput from '~/components/I18nInput';
import { apiFetch } from '~/lib/api';
import { getUser } from '~/lib/auth';
import { MENU_ITEM_TAG } from '@dineqr/shared';
export async function clientLoader() {
	const user = getUser();
	const isSuper = user?.role === 'super_admin';

	const fetches: Promise<any>[] = [
		apiFetch('/api/admin/menu-items?page=1&limit=20'),
		apiFetch('/api/admin/menu-sections?limit=100'),
	];
	if (isSuper) {
		fetches.push(apiFetch('/api/admin/restaurants?limit=100'));
	}

	const [itemsRes, sectionsRes, restaurantsRes] = await Promise.all(fetches);
	return {
		initialData: itemsRes.data,
		sections: sectionsRes.data.records || [],
		restaurants: restaurantsRes?.data.records || [],
	};
}

export default function MenuItemsPage({ loaderData }: any) {
	const { initialData, sections, restaurants } = loaderData;
	const { t } = useTranslation();
	const user = getUser();
	const isSuper = user?.role === 'super_admin';

	const tagOptions = Object.values(MENU_ITEM_TAG).map((tag) => ({
		label: tag.charAt(0).toUpperCase() + tag.slice(1).replace('_', ' '),
		value: tag,
	}));

	const columns = [
		{ title: t('menu_items.name'), dataIndex: 'name', key: 'name' },
		{
			title: t('menu_items.images'),
			dataIndex: 'images',
			key: 'images',
			width: 100,
			render: (images: string[]) =>
				images && images.length > 0 ? (
					<div className="flex gap-1">
						{images.slice(0, 3).map((img, i) => (
							<img key={i} src={img} alt="" className="h-10 w-10 rounded object-cover" />
						))}
						{images.length > 3 && <span className="flex h-10 w-10 items-center justify-center rounded bg-gray-100 text-xs text-gray-500">+{images.length - 3}</span>}
					</div>
				) : '—',
		},
		{
			title: t('menu_items.price'),
			dataIndex: 'price',
			key: 'price',
			render: (v: number) => <span className="font-semibold text-brand-500">${Number(v).toFixed(2)}</span>,
		},
		{ title: t('menu_items.section'), dataIndex: ['section', 'name'], key: 'section' },
		...(isSuper
			? [{ title: t('menu_items.restaurant'), dataIndex: ['restaurant', 'name'], key: 'restaurant' }]
			: []),
		{
			title: t('menu_items.featured'),
			dataIndex: 'is_featured',
			key: 'is_featured',
			render: (v: boolean) => v ? <Tag color="gold">{t('menu_items.featured')}</Tag> : null,
		},
		{
			title: t('menu_items.tags'),
			dataIndex: 'tags',
			key: 'tags',
			render: (tags: string[]) =>
				tags?.map((tag) => (
					<Tag key={tag} color={tag === 'spicy' ? 'red' : tag === 'vegetarian' ? 'green' : tag === 'new' ? 'blue' : 'default'}>
						{tag}
					</Tag>
				)),
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
			<I18nInput fieldName="name" label={t('menu_items.name')} required placeholder={t('menu_items.name_placeholder')} />
			<I18nInput fieldName="description" label={t('menu_items.description')} textArea rows={2} />
			<Form.Item name="images" label={t('menu_items.images')} valuePropName="fileList" getValueFromEvent={(e: any) => (Array.isArray(e) ? e : e?.fileList)}>
				<Upload listType="picture-card" maxCount={10} multiple beforeUpload={() => false} accept="image/*">
					<div>
						<PlusOutlined />
						<div style={{ marginTop: 8 }}>{t('menu_items.upload')}</div>
					</div>
				</Upload>
			</Form.Item>
			<Form.Item name="price" label={t('menu_items.price')} rules={[{ required: true }]}>
				<InputNumber min={0} step={0.5} precision={2} style={{ width: '100%' }} placeholder={t('menu_items.price_placeholder')} />
			</Form.Item>
			<Form.Item name="section_id" label={t('menu_items.section')} rules={[{ required: true }]}>
				<Select placeholder={t('menu_items.section_select')}>
					{sections.map((s: any) => (
						<Select.Option key={s.id} value={s.id}>
							{s.icon} {s.name} {s.restaurant ? `(${s.restaurant.name})` : ''}
						</Select.Option>
					))}
				</Select>
			</Form.Item>
			{isSuper && (
				<Form.Item name="restaurant_id" label={t('menu_items.restaurant')} rules={[{ required: true }]}>
					<Select placeholder={t('menu_items.restaurant_select')}>
						{restaurants.map((r: any) => (
							<Select.Option key={r.id} value={r.id}>
								{r.name}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
			)}
			<Form.Item name="tags" label={t('menu_items.tags')}>
				<Select mode="multiple" placeholder={t('menu_items.tags_select')} options={tagOptions} />
			</Form.Item>
			<Form.Item name="display_order" label={t('menu_items.display_order')} initialValue={0}>
				<InputNumber min={0} style={{ width: '100%' }} />
			</Form.Item>
			<Form.Item name="is_featured" label={t('menu_items.featured')} valuePropName="checked" initialValue={false}>
				<Switch />
			</Form.Item>
			<Form.Item name="is_active" label={t('common.active')} valuePropName="checked" initialValue={true}>
				<Switch />
			</Form.Item>
		</>
	);

	return (
		<CrudPage
			title={t('menu_items.title')}
			hideTitle
			endpoint="/api/admin/menu-items"
			columns={columns}
			formFields={formFields}
			initialData={initialData}
			createTitle={t('menu_items.add')}
			editTitle={t('menu_items.edit')}
			useFormData={true}
		/>
	);
}
