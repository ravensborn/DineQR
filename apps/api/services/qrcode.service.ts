import QRCode from 'qrcode';

const MENU_BASE_URL = process.env.VITE_MENU_URL || 'http://localhost:3000';

export async function generateQRCodePNG(slug: string): Promise<Buffer> {
	const url = `${MENU_BASE_URL}/${slug}`;
	return QRCode.toBuffer(url, {
		width: 512,
		margin: 2,
		color: { dark: '#004B93', light: '#FFFFFF' },
		errorCorrectionLevel: 'H',
	});
}

export async function generateQRCodeSVG(slug: string): Promise<string> {
	const url = `${MENU_BASE_URL}/${slug}`;
	return QRCode.toString(url, {
		type: 'svg',
		width: 512,
		margin: 2,
		color: { dark: '#004B93', light: '#FFFFFF' },
		errorCorrectionLevel: 'H',
	});
}

export function getMenuUrl(slug: string): string {
	return `${MENU_BASE_URL}/${slug}`;
}
