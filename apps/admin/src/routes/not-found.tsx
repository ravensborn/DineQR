import { Link } from 'react-router';
import { Button, Result } from 'antd';
import { useTranslation } from 'react-i18next';

export default function NotFound() {
	const { t } = useTranslation();

	return (
		<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
			<Result
				status="404"
				title={t('not_found.title')}
				subTitle={t('not_found.subtitle')}
				extra={
					<Link to="/">
						<Button type="primary">{t('not_found.back')}</Button>
					</Link>
				}
			/>
		</div>
	);
}
