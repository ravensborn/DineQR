import { useState } from 'react';
import { Form, Input, Switch, Tag, Button, Select } from 'antd';
import { QrcodeOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { LANGUAGE_LABELS, SUPPORTED_LANGUAGES, CURRENCIES, type SupportedLanguage, type CurrencyCode } from '@dineqr/shared';
import CrudPage from '~/components/CrudPage';
import QRCodeModal from '~/components/QRCodeModal';
import I18nInput from '~/components/I18nInput';
import { apiFetch } from '~/lib/api';
import type { Route } from './+types/restaurants';

const langOptions = Object.values(SUPPORTED_LANGUAGES).map((code) => ({
	value: code,
	label: LANGUAGE_LABELS[code as SupportedLanguage],
}));

const currencyOptions = Object.values(CURRENCIES).map((c) => ({
	value: c.code,
	label: `${c.symbol} — ${c.label} (${c.code})`,
}));

export async function clientLoader() {
	const res = await apiFetch('/api/admin/restaurants?page=1&limit=20');
	return { initialData: res.data };
}

export default function RestaurantsPage({ loaderData }: Route.ComponentProps) {
	const { initialData } = loaderData;
	const { t } = useTranslation();
	const [qrModal, setQrModal] = useState<{ open: boolean; id: string; name: string; slug: string }>({
		open: false,
		id: '',
		name: '',
		slug: '',
	});

	const columns = [
		{ title: t('restaurants.name'), dataIndex: 'name', key: 'name', sorter: true },
		{ title: t('restaurants.slug'), dataIndex: 'slug', key: 'slug', render: (v: string) => <code className="rounded bg-gray-100 px-2 py-1 text-xs">{v}</code> },
		{
			title: t('restaurants.currency'),
			dataIndex: 'currency',
			key: 'currency',
			width: 100,
			render: (v: string) => {
				const c = CURRENCIES[v as CurrencyCode] || CURRENCIES.USD;
				return <span>{c.symbol} {c.code}</span>;
			},
		},
		{
			title: t('common.status'),
			dataIndex: 'is_active',
			key: 'is_active',
			render: (v: boolean) => <Tag color={v ? 'green' : 'red'}>{v ? t('common.active') : t('common.inactive')}</Tag>,
		},
		{
			title: t('restaurants.qr_code'),
			key: 'qr',
			render: (_: any, record: any) => (
				<Button
					type="link"
					icon={<QrcodeOutlined />}
					onClick={() => setQrModal({ open: true, id: record.id, name: record.name, slug: record.slug })}
				>
					{t('restaurants.qr_code')}
				</Button>
			),
		},
	];

	const formFields = (
		<>
			<I18nInput fieldName="name" label={t('restaurants.name')} required placeholder={t('restaurants.name_placeholder')} />
			<Form.Item name="slug" label={t('restaurants.slug')} rules={[{ required: true }, { pattern: /^[a-z0-9-]+$/, message: t('restaurants.slug_error') }]}>
				<Input placeholder={t('restaurants.slug_placeholder')} />
			</Form.Item>
			<I18nInput fieldName="description" label={t('restaurants.description')} placeholder={t('restaurants.description_placeholder')} textArea rows={3} />
			<Form.Item name="address" label={t('restaurants.address')}>
				<Input placeholder={t('restaurants.address_placeholder')} />
			</Form.Item>
			<Form.Item name="phone" label={t('restaurants.phone')}>
				<Input placeholder={t('restaurants.phone_placeholder')} />
			</Form.Item>
			<Form.Item name="theme_color" label={t('restaurants.theme_color')}>
				<Input placeholder="#004B93" />
			</Form.Item>
			<Form.Item name="default_language" label={t('restaurants.default_language')} initialValue="en">
				<Select options={langOptions} />
			</Form.Item>
			<Form.Item name="currency" label={t('restaurants.currency')} initialValue="USD">
				<Select options={currencyOptions} showSearch optionFilterProp="label" />
			</Form.Item>
			<Form.Item name="is_active" label={t('common.active')} valuePropName="checked" initialValue={true}>
				<Switch />
			</Form.Item>
		</>
	);

	return (
		<>
			<CrudPage
				title={t('restaurants.title')}
				endpoint="/api/admin/restaurants"
				columns={columns}
				formFields={formFields}
				initialData={initialData}
				createTitle={t('restaurants.add')}
				editTitle={t('restaurants.edit')}
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
