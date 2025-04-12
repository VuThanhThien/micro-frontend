import path from "node:path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import federation from "@originjs/vite-plugin-federation";
import { visualizer } from "rollup-plugin-visualizer";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    vue(),
    tailwindcss(),
    visualizer(),
    federation({
      name: "remoteVue",
      filename: "remoteEntry.js",
      exposes: {
        "./pages": "./src/exposes/pages",
      },
      shared: ["vue", "vue-router", "pinia", "tailwindcss", "@vueuse/core"],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
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
