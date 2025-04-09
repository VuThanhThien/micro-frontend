import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import ModuleFederationPlugin from "@originjs/vite-plugin-federation";
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    ModuleFederationPlugin({
      name: "dashboard",
      remotes: {
        core: "http://localhost:3002/assets/remoteEntry.js",
        auth: "http://localhost:3001/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom", "axios", "swr"]
    })
  ],
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
    modulePreload: false
  },
  preview: {
    port: 3000,
    strictPort: true
  },
  server: {
    port: 3000,
    strictPort: true
  }
});
