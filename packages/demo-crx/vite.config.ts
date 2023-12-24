import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest'

const PORT = 9999

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    crx({
      manifest
    })
  ],
  build: {
    rollupOptions: {
      // add any html pages here
      input: {
        devtools_panel: resolve(__dirname, 'devtools/panel.html'),
      },
    },
  },
  server: {
    port: PORT,
    hmr: {
      port: PORT,
    }
  }
})
