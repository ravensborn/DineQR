export const TOKEN_KEY = 'DINEQR_ADMIN_TOKEN';
export const USER_KEY = 'DINEQR_ADMIN_USER';

export function getToken(): string | null {
	return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
	localStorage.setItem(TOKEN_KEY, token);
}

export function getUser(): any | null {
	const raw = localStorage.getItem(USER_KEY);
	if (!raw) return null;
	try {
		return JSON.parse(raw);
	} catch {
		return null;
	}
}

export function setUser(user: any): void {
	localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearAuth(): void {
	localStorage.removeItem(TOKEN_KEY);
	localStorage.removeItem(USER_KEY);
}

export function isAuthenticated(): boolean {
	return !!getToken();
}
