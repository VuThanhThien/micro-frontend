import { defineConfig, loadEnv } from 'vite';
import ModuleFederationPlugin from '@originjs/vite-plugin-federation';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';
import { VitePWA } from 'vite-plugin-pwa';
import tailwindcss from '@tailwindcss/vite';

// Fallback Module Federation remote base URLs (the published localhost ports).
const DEFAULT_REMOTE_URLS = {
  remoteComponents: 'http://localhost:3002',
  remoteAuth: 'http://localhost:3001',
  remoteVue: 'http://localhost:3003',
} as const;

// Maps each remote to the env var that overrides its base URL.
const REMOTE_ENV_KEYS = {
  remoteComponents: 'VITE_REMOTE_COMPONENTS_URL',
  remoteAuth: 'VITE_REMOTE_AUTH_URL',
  remoteVue: 'VITE_REMOTE_VUE_URL',
} as const;

type RemoteName = keyof typeof DEFAULT_REMOTE_URLS;

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Resolve the remote micro-frontend base URLs from `VITE_*` env vars so the
  // same bundle can point at different deployments (local ports vs. Docker
  // service names vs. an ingress). Falls back to the published localhost ports.
  const env = loadEnv(mode, process.cwd());
  const remoteUrl = (name: RemoteName): string =>
    env[REMOTE_ENV_KEYS[name]] ?? DEFAULT_REMOTE_URLS[name];

  return {
    base: '/',
    plugins: [
      react(),
      svgr({
        include: '**/*.svg',
        svgrOptions: {
          exportType: 'default',
        },
      }),
      viteTsconfigPaths(),
      VitePWA({
        srcDir: 'public',
        filename: 'service-worker.js',
        strategies: 'injectManifest',
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
        name: 'dashboard',
        remotes: {
          remoteComponents: `${remoteUrl('remoteComponents')}/assets/remoteEntry.js`,
          remoteAuth: `${remoteUrl('remoteAuth')}/assets/remoteEntry.js`,
          remoteVue: `${remoteUrl('remoteVue')}/assets/remoteEntry.js`,
        },
        shared: [
          'react',
          'react-dom',
          'axios',
          'react-router-dom',
          'react-router',
          'i18next',
          'react-i18next',
          '@mui/material',
          '@mui/lab',
          'tailwindcss',
          'react-query',
          'formik',
        ],
      }),
    ],
    resolve: {
      alias: {
        src: resolve(__dirname, './src/'),
      },
    },
    build: {
      target: 'esnext',
      minify: false,
      cssCodeSplit: false,
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
  };
});
