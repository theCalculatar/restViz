import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [preact()],
	resolve: {
		alias: {
			react: 'preact/compat',
			'react-dom': 'preact/compat',
		},
	}, build: {
		minify: 'esbuild',
		cssMinify: 'esbuild',
		outDir: 'dist/ui', // everything goes under dist/ui
		emptyOutDir: true,
		rollupOptions: {
			input: path.resolve(__dirname, 'src/ui/index.tsx'),
			output: {
				entryFileNames: 'script.js', // main JS
				chunkFileNames: null,
				assetFileNames: '[name].[ext]',
			},
		}
	},
	base: '', // This is important for hash routing
});
