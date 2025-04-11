import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
import federation from '@originjs/vite-plugin-federation'
const { visualizer } = require('rollup-plugin-visualizer')
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const resolvePath = (dir: string) => {
  return path.resolve(__dirname, 'src', dir)
}
// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
    }),
    federation({
      name: 'remote-vue',
      filename: 'remoteEntry.js',
      exposes: {
        './pages': './src/expose/pages',
      },
      shared: {
        vue: { version: '^3.3.0', requiredVersion: '^3.3.0' },
        'vue-router': { version: '^4.2.0', requiredVersion: '^4.2.0' },
        pinia: { version: '^2.1.0', requiredVersion: '^2.1.0' },
        'vue-i18n': { version: '^9.0.0', requiredVersion: '^9.0.0' },
        'element-plus': { version: '^2.4.0', requiredVersion: '^2.4.0' },
        '@vueuse/core': { version: '^10.0.0', requiredVersion: '^10.0.0' },
        dayjs: { version: '^1.11.0', requiredVersion: '^1.11.0' },
        sweetalert2: { version: '^11.0.0', requiredVersion: '^11.0.0' }
      },
    }),
  ],
  resolve: {
    alias: {
      assets: resolvePath('assets'),
      core: resolvePath('core'),
      store: resolvePath('store'),
      modules: resolvePath('modules'),
      layouts: resolvePath('layouts'),
      router: resolvePath('router'),
      components: resolvePath('components'),
      utils: resolvePath('utils'),
      mixins: resolvePath('mixins'),
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "assets/css/element/index.scss" as *;`,
      },
    },
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      plugins: [visualizer()],
      output: {
        manualChunks(id) {
          if (id.includes('element-plus')) {
            return 'elm'
          }
          if (id.includes('lodash')) {
            return 'lodash'
          }
          if (id.includes('@vueuse/core')) {
            return 'vueuse'
          }
          if (id.includes('dayjs')) {
            return 'dayjs'
          }
          if (id.includes('sweetalert2')) {
            return 'sweetalert2'
          }
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
      },
    },
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
  optimizeDeps: {
    include: ['element-plus', '@vueuse/core', 'dayjs', 'sweetalert2'],
  },
})
