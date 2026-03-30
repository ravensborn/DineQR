import { getUser } from '~/lib/auth';
import { Tag, Select } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { LANGUAGE_LABELS, SUPPORTED_LANGUAGES, type SupportedLanguage } from '@dineqr/shared';

const langOptions = Object.values(SUPPORTED_LANGUAGES).map((code) => ({
	value: code,
	label: LANGUAGE_LABELS[code],
}));

export default function Topbar() {
	const user = getUser();
	const { t, i18n } = useTranslation();

	const handleLanguageChange = (lang: SupportedLanguage) => {
		i18n.changeLanguage(lang);
		localStorage.setItem('DINEQR_ADMIN_LANG', lang);
	};

	return (
		<header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
			<div>
				<h2 className="text-lg font-semibold text-gray-800">{t('topbar.title')}</h2>
			</div>
			<div className="flex items-center gap-3">
				<Select
					value={i18n.language as SupportedLanguage}
					onChange={handleLanguageChange}
					options={langOptions}
					style={{ width: 130 }}
					suffixIcon={<GlobalOutlined />}
					size="small"
				/>
				{user && (
					<>
						<Tag color={user.role === 'super_admin' ? '#004B93' : '#E32934'}>
							{user.role === 'super_admin' ? t('topbar.super_admin') : t('topbar.restaurant_admin')}
						</Tag>
						<span className="text-sm text-gray-600">{user.name}</span>
					</>
				)}
			</div>
		</header>
	);
}
