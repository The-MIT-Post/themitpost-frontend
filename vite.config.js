import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
	plugins: [
		react(),
		visualizer({
			open: true,
			filename: "stats.html",
			template: "treemap",
			gzipSize: true,
			brotliSize: true,
		}),
	],
	build: {
		sourcemap: true,
	},
	server: {
		host: true,
		port: 5173,
		historyApiFallback: true,
	},
});
