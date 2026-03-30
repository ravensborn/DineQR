import { useState } from 'react';
import { useNavigate, redirect } from 'react-router';
import { Form, Input, Button, message, Card } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { apiFetch } from '~/lib/api';
import { setToken, setUser, getToken } from '~/lib/auth';

export async function clientLoader() {
	if (getToken()) {
		return redirect('/');
	}
	return null;
}

export default function LoginPage() {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (values: { email: string; password: string }) => {
		setLoading(true);
		try {
			const res = await apiFetch('/api/admin/auth/login', {
				method: 'POST',
				body: JSON.stringify(values),
			});
			setToken(res.data.access_token);
			setUser(res.data.user);
			message.success('Welcome back!');
			navigate('/');
		} catch (err: any) {
			message.error(err.message || 'Login failed');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex min-h-screen items-center justify-center" style={{ background: 'linear-gradient(135deg, #004B93 0%, #002f61 100%)' }}>
			<div className="w-full max-w-md px-4">
				{/* Logo */}
				<div className="mb-8 text-center">
					<div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg">
						<span className="text-3xl font-bold text-brand-500">DQ</span>
					</div>
					<h1 className="text-3xl font-bold text-white">DineQR</h1>
					<p className="mt-1 text-white/60">Powered by Pepsi</p>
				</div>

				<Card className="shadow-2xl" styles={{ body: { padding: '2rem' } }}>
					<h2 className="mb-6 text-center text-xl font-semibold text-gray-800">Sign in to your account</h2>
					<Form layout="vertical" onFinish={handleSubmit} autoComplete="off">
						<Form.Item name="email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
							<Input prefix={<MailOutlined className="text-gray-400" />} placeholder="Email address" size="large" />
						</Form.Item>
						<Form.Item name="password" rules={[{ required: true, message: 'Please enter your password' }]}>
							<Input.Password prefix={<LockOutlined className="text-gray-400" />} placeholder="Password" size="large" />
						</Form.Item>
						<Button type="primary" htmlType="submit" loading={loading} block size="large" style={{ backgroundColor: '#004B93', borderColor: '#004B93', height: 48 }}>
							Sign In
						</Button>
					</Form>
				</Card>

				<p className="mt-6 text-center text-sm text-white/40">&copy; 2026 DineQR by Pepsi. All rights reserved.</p>
			</div>
		</div>
	);
}
