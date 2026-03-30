import { Form, Input, Tabs } from 'antd';
import { LANGUAGE_LABELS, SUPPORTED_LANGUAGES, type SupportedLanguage } from '@dineqr/shared';
import { useTranslation } from 'react-i18next';

interface I18nInputProps {
	fieldName: string;
	label: string;
	required?: boolean;
	placeholder?: string;
	textArea?: boolean;
	rows?: number;
}

const languages = Object.values(SUPPORTED_LANGUAGES) as SupportedLanguage[];

export default function I18nInput({ fieldName, label, required, placeholder, textArea, rows = 2 }: I18nInputProps) {
	const { t } = useTranslation();
	const InputComponent = textArea ? Input.TextArea : Input;

	return (
		<>
			<Form.Item name={fieldName} label={label} rules={required ? [{ required: true }] : undefined}>
				{textArea ? <Input.TextArea rows={rows} placeholder={placeholder} /> : <Input placeholder={placeholder} />}
			</Form.Item>
			<Form.Item label={t('i18n.translations')}>
				<Tabs
					size="small"
					items={languages.map((lang) => ({
						key: lang,
						label: LANGUAGE_LABELS[lang],
						children: (
							<Form.Item name={[`${fieldName}_i18n`, lang]} noStyle>
								{textArea ? (
									<Input.TextArea rows={rows} placeholder={`${label} (${LANGUAGE_LABELS[lang]})`} />
								) : (
									<Input placeholder={`${label} (${LANGUAGE_LABELS[lang]})`} />
								)}
							</Form.Item>
						),
					}))}
				/>
			</Form.Item>
		</>
	);
}
