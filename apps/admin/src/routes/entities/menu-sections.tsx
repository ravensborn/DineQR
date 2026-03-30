import { Form, Input, InputNumber, Switch, Tag, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import CrudPage from '~/components/CrudPage';
import I18nInput from '~/components/I18nInput';
import { apiFetch } from '~/lib/api';
import { getUser } from '~/lib/auth';
export async function clientLoader() {
	const user = getUser();
	const isSuper = user?.role === 'super_admin';

	const fetches: Promise<any>[] = [
		apiFetch('/api/admin/menu-sections?page=1&limit=20'),
	];
	if (isSuper) {
		fetches.push(apiFetch('/api/admin/restaurants?limit=100'));
	}

	const [sectionsRes, restaurantsRes] = await Promise.all(fetches);
	return {
		initialData: sectionsRes.data,
		restaurants: restaurantsRes?.data.records || [],
	};
}

export default function MenuSectionsPage({ loaderData }: any) {
	const { initialData, restaurants } = loaderData;
	const { t } = useTranslation();
	const user = getUser();
	const isSuper = user?.role === 'super_admin';

	const columns = [
		{ title: t('menu_sections.name'), dataIndex: 'name', key: 'name' },
		{ title: t('menu_sections.icon'), dataIndex: 'icon', key: 'icon', width: 60 },
		...(isSuper
			? [{ title: t('menu_sections.restaurant'), dataIndex: ['restaurant', 'name'], key: 'restaurant' }]
			: []),
		{ title: t('menu_sections.order'), dataIndex: 'display_order', key: 'display_order', width: 80 },
		{
			title: t('common.status'),
			dataIndex: 'is_active',
			key: 'is_active',
			render: (v: boolean) => <Tag color={v ? 'green' : 'red'}>{v ? t('common.active') : t('common.inactive')}</Tag>,
		},
	];

	const formFields = (
		<>
			<I18nInput fieldName="name" label={t('menu_sections.name')} required placeholder={t('menu_sections.name_placeholder')} />
			<I18nInput fieldName="description" label={t('menu_sections.description')} textArea rows={2} />
			<Form.Item name="icon" label={t('menu_sections.icon')}>
				<Input placeholder={t('menu_sections.icon_placeholder')} />
			</Form.Item>
			{isSuper && (
				<Form.Item name="restaurant_id" label={t('menu_sections.restaurant')} rules={[{ required: true }]}>
					<Select placeholder={t('menu_sections.restaurant_select')}>
						{restaurants.map((r: any) => (
							<Select.Option key={r.id} value={r.id}>
								{r.name}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
			)}
			<Form.Item name="display_order" label={t('menu_sections.display_order')} initialValue={0}>
				<InputNumber min={0} style={{ width: '100%' }} />
			</Form.Item>
			<Form.Item name="is_active" label={t('common.active')} valuePropName="checked" initialValue={true}>
				<Switch />
			</Form.Item>
		</>
	);

	return (
		<CrudPage
			title={t('menu_sections.title')}
			hideTitle
			endpoint="/api/admin/menu-sections"
			columns={columns}
			formFields={formFields}
			initialData={initialData}
			createTitle={t('menu_sections.add')}
			editTitle={t('menu_sections.edit')}
		/>
	);
}
