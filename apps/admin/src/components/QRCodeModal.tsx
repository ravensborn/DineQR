import { Modal, Button, Space, message } from 'antd';
import { DownloadOutlined, CopyOutlined, LinkOutlined } from '@ant-design/icons';
import { QRCodeSVG } from 'qrcode.react';

interface QRCodeModalProps {
	open: boolean;
	onClose: () => void;
	restaurantId: string;
	restaurantName: string;
	restaurantSlug: string;
}

export default function QRCodeModal({ open, onClose, restaurantId, restaurantName, restaurantSlug }: QRCodeModalProps) {
	const menuUrl = `${(import.meta.env.VITE_MENU_URL || 'http://localhost:3000')}/${restaurantSlug}`;

	const handleDownloadPNG = async () => {
		try {
			const res = await fetch(`/api/admin/restaurants/${restaurantId}/qr-code`, {
				headers: { Authorization: `Bearer ${localStorage.getItem('DINEQR_ADMIN_TOKEN')}` },
			});
			const blob = await res.blob();
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = `${restaurantSlug}-qr.png`;
			a.click();
			URL.revokeObjectURL(url);
			message.success('QR Code downloaded!');
		} catch {
			message.error('Failed to download QR code');
		}
	};

	const handleDownloadSVG = async () => {
		try {
			const res = await fetch(`/api/admin/restaurants/${restaurantId}/qr-code?format=svg`, {
				headers: { Authorization: `Bearer ${localStorage.getItem('DINEQR_ADMIN_TOKEN')}` },
			});
			const text = await res.text();
			const blob = new Blob([text], { type: 'image/svg+xml' });
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = `${restaurantSlug}-qr.svg`;
			a.click();
			URL.revokeObjectURL(url);
			message.success('QR Code downloaded!');
		} catch {
			message.error('Failed to download QR code');
		}
	};

	const handleCopyLink = () => {
		navigator.clipboard.writeText(menuUrl);
		message.success('Menu link copied!');
	};

	return (
		<Modal title={`QR Code — ${restaurantName}`} open={open} onCancel={onClose} footer={null} width={480} centered>
			<div className="flex flex-col items-center py-6">
				<div className="rounded-2xl border-4 border-brand-500 bg-white p-6 shadow-lg">
					<QRCodeSVG
						value={menuUrl}
						size={256}
						fgColor="#004B93"
						bgColor="#FFFFFF"
						level="H"
						includeMargin={false}
					/>
				</div>

				<div className="mt-4 flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2">
					<LinkOutlined className="text-brand-500" />
					<span className="text-sm font-medium text-gray-700">{menuUrl}</span>
				</div>

				<Space className="mt-6">
					<Button type="primary" icon={<DownloadOutlined />} onClick={handleDownloadPNG} style={{ backgroundColor: '#004B93' }}>
						Download PNG
					</Button>
					<Button icon={<DownloadOutlined />} onClick={handleDownloadSVG}>
						Download SVG
					</Button>
					<Button icon={<CopyOutlined />} onClick={handleCopyLink}>
						Copy Link
					</Button>
				</Space>
			</div>
		</Modal>
	);
}
