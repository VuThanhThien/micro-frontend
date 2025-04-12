import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import federation from "@originjs/vite-plugin-federation";
import { visualizer } from "rollup-plugin-visualizer";


// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    vue(),
    visualizer(),
    federation({
      name: "remoteVue",
      filename: "remoteEntry.js",
      exposes: {
        "./pages": "./src/exposes/pages",
      },
      shared: ["vue", "vue-router", "pinia"],
    }),
  ],
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
    outDir: "dist",
    sourcemap: true,
  },
  preview: {
    port: 3003,
    strictPort: true,
    host: true,
  },
  server: {
    port: 3003,
    strictPort: true,
    host: true,
  },
  optimizeDeps: {},
});
