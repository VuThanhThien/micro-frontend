import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import ModuleFederationPlugin from "@originjs/vite-plugin-federation";
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    ModuleFederationPlugin({
      name: "artistDetails",
      filename: "remoteEntry.js",
      exposes: {
        "./ArtistDetails": "./src/components/ArtistDetails"
      },
      remotes: {
        ui: "http://localhost:3002/assets/remoteEntry.js"
      },
      shared: ["react", "react-dom", "swr"],
    }),
  ],
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
    modulePreload: false
  },
  preview: {
    port: 3001,
    strictPort: true
  },
  server: {
    port: 3001,
    strictPort: true
  }
});
