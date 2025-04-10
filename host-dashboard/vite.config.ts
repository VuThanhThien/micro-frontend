import { defineConfig } from "vite";
import ModuleFederationPlugin from "@originjs/vite-plugin-federation";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import viteTsconfigPaths from "vite-tsconfig-paths";
import { resolve } from "path";
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    react(),
    svgr({
      include: "**/*.svg",
      svgrOptions: {
        exportType: "default",
      },
    }),
    viteTsconfigPaths(),
    VitePWA({
      srcDir: "public",
      filename: "service-worker.js",
      strategies: "injectManifest",
      injectRegister: false,
      devOptions: {
        enabled: true,
      },
      manifest: false,
      injectManifest: {
        injectionPoint: undefined,
      },
    }),
    tailwindcss(),
    ModuleFederationPlugin({
      name: "dashboard",
      remotes: {
        remoteComponents: "http://localhost:3002/assets/remoteEntry.js",
        remoteAuth: "http://localhost:3001/assets/remoteEntry.js",
      },
      shared: [
        "react",
        "react-dom",
        "axios",
        "react-router-dom",
        "i18next",
        "react-i18next",
        "@mui/material",
        "@mui/lab",
        "tailwindcss",
        "react-query",
        "formik",
      ],
    }),
  ],
  resolve: {
    alias: {
      src: resolve(__dirname, "./src/"),
    },
  },
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false
  },
  preview: {
    port: 3000,
    strictPort: true,
    host: true, 
    open: true,
  },
  server: {
    port: 3000,
    strictPort: true,
    open: true,
    host: true,
  },
});
