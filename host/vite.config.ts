import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    federation({
      remotes: {
        remote_app: {
          external: 'http://127.0.0.1:5500/remote/dist/assets/remote_app.js',
          format: 'esm',
        },
      },
      shared: ['vue', 'element-plus'],
    }),
  ],
  server: {
    port: 8000,
  },
  optimizeDeps: {
    include: ['element-plus'],
  },
})
