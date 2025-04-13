import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import ModuleFederationPlugin from '@originjs/vite-plugin-federation';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tsconfigPaths(),
    tailwindcss(),
    ModuleFederationPlugin({
      name: 'auth',
      filename: 'remoteEntry.js',
      exposes: {
        './pages': './src/auth/pages',
        './contexts': './src/auth/contexts',
      },
      remotes: {
        remoteComponents: 'http://localhost:3002/assets/remoteEntry.js',
      },
      shared: [
        'react',
        'react-dom',
        'axios',
        'react-router-dom',
        'i18next',
        'react-i18next',
        '@mui/material',
        'tailwindcss',
        '@mui/lab',
        'react-query',
        'formik',
      ],
    }),
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  preview: {
    port: 3001,
    strictPort: true,
    host: true, // Allow external connections
  },
  server: {
    port: 3001,
    strictPort: true,
    host: true, // Allow external connections
  },
});
