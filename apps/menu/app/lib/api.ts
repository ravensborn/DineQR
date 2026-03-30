const API_URL = process.env.API_URL || 'http://localhost:4000';

export async function fetchPublicAPI<T = any>(path: string): Promise<T> {
	const res = await fetch(`${API_URL}/api/public${path}`);
	if (!res.ok) {
		throw new Response('Not Found', { status: res.status });
	}
	const data = await res.json();
	return data.data;
}

export function getImageUrl(path: string | null): string {
	if (!path) return '';
	if (path.startsWith('http')) return path;
	return `${API_URL}${path}`;
}
