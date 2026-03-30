import { type RouteConfig, route, index, layout } from '@react-router/dev/routes';

export default [
	route('login', 'routes/login.tsx'),
	layout('routes/_layout.tsx', [
		index('routes/dashboard.tsx'),
		route('restaurants', 'routes/entities/restaurants.tsx'),
		layout('routes/menu.tsx', [
			route('menu', 'routes/entities/menu-sections.tsx'),
			route('menu/items', 'routes/entities/menu-items.tsx'),
		]),
		route('ad-panels', 'routes/entities/ad-panels.tsx'),
		route('users', 'routes/entities/users.tsx'),
	]),
	route('*', 'routes/not-found.tsx'),
] satisfies RouteConfig;
