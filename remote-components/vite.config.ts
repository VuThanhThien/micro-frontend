import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import ModuleFederationPlugin from "@originjs/vite-plugin-federation";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    svgr({
      include: "**/*.svg",
      svgrOptions: {
        exportType: "default",
      },
    }),
    ModuleFederationPlugin({
      name: "remoteComponents",
      filename: "remoteEntry.js",
      exposes: {
        "./components": "./src/components",
        "./pages": "./src/pages",
        "./contexts": "./src/contexts",
      },
      shared: [
        "react",
        "react-dom",
        "react-router-dom",
        "i18next",
        "react-i18next",
        "@mui/material",
        "tailwindcss",
        "react-query",
        "formik",
      ],
    }),
  ],
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
    modulePreload: false,
  },
  preview: {
    port: 3002,
    strictPort: true,
  },
  server: {
    port: 3002,
    strictPort: true,
  },
});
