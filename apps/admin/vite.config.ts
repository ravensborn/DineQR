import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
	server: {
		port: 3001,
		proxy: {
			'/api': {
				target: 'http://localhost:4000',
				changeOrigin: true,
			},
			'/uploads': {
				target: 'http://localhost:4000',
				changeOrigin: true,
			},
		},
	},
});
