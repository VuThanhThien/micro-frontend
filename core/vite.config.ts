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
      name: "core",
      filename: "remoteEntry.js",
      exposes: {
        "./components": "./src/components"
      },
      shared: ["react", "react-dom"],
    }),
  ],
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
    
  }
})
