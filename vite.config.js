import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [preact()],
	build: {
		minify: 'esbuild',
		outDir: 'dist/ui', // everything goes under dist/ui
		emptyOutDir: true,
		rollupOptions: {
			input: path.resolve(__dirname, 'src/ui/index.jsx'),
			output: {
				entryFileNames: 'script.js', // main JS
				chunkFileNames: null,
				assetFileNames: '[name].[ext]',
			},
		}
	},
	base: '', // This is important for hash routing
});
