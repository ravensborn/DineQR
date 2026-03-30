const BASE_URL = import.meta.env.VITE_API_URL || '';

export async function apiFetch<T = any>(
	endpoint: string,
	options: RequestInit & { isFormData?: boolean } = {},
): Promise<T> {
	const token = localStorage.getItem('DINEQR_ADMIN_TOKEN');
	const { isFormData, ...fetchOptions } = options;

	const headers: Record<string, string> = {};
	if (token) headers['Authorization'] = `Bearer ${token}`;
	if (!isFormData) headers['Content-Type'] = 'application/json';

	const res = await fetch(`${BASE_URL}${endpoint}`, {
		...fetchOptions,
		headers: { ...headers, ...fetchOptions.headers },
		credentials: 'include',
	});

	if (res.status === 401) {
		// Try refresh
		const refreshRes = await fetch(`${BASE_URL}/api/admin/auth/refresh`, {
			method: 'POST',
			credentials: 'include',
		});

		if (refreshRes.ok) {
			const refreshData = await refreshRes.json();
			localStorage.setItem('DINEQR_ADMIN_TOKEN', refreshData.data.access_token);
			headers['Authorization'] = `Bearer ${refreshData.data.access_token}`;

			const retryRes = await fetch(`${BASE_URL}${endpoint}`, {
				...fetchOptions,
				headers: { ...headers, ...fetchOptions.headers },
				credentials: 'include',
			});
			return retryRes.json();
		}

		localStorage.removeItem('DINEQR_ADMIN_TOKEN');
		localStorage.removeItem('DINEQR_ADMIN_USER');
		window.location.href = '/login';
		throw new Error('Session expired');
	}

	const data = await res.json();
	if (!res.ok) throw new Error(data.message || 'Request failed');
	return data;
}
