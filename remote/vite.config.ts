import federation, { VitePluginFederationOptions } from '@originjs/vite-plugin-federation'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { createMFDts } from './scripts/dts'

const mfOptions: VitePluginFederationOptions = {
  name: 'remote_app',
  filename: 'remote_app.js',
  exposes: {
    './RButton': './src/components/RButton.vue',
    './Rtest': './src/components/RTest.vue',
    './Adder': './src/components/Adder.vue',
  },
  shared: ['vue', 'element-plus'],
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    federation(mfOptions),
    dts({
      afterBuild: createMFDts(mfOptions),
    }),
  ],
  build: {
    target: 'esnext',
    cssCodeSplit: false,
  },
  server: {
    port: 8001,
  },
})
