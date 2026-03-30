import { type RouteConfig, route, index } from '@react-router/dev/routes';

export default [
	index('routes/_index.tsx'),
	route(':slug', 'routes/restaurant.tsx'),
] satisfies RouteConfig;
