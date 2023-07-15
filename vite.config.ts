import { fileURLToPath, URL } from 'node:url'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true,
    }),
    Components({
      dts: false,
      resolvers: [VantResolver()],
    }),
    createSvgIconsPlugin({ 
      // eslint-disable-next-line no-undef
      iconDirs: [path.resolve(process.cwd(), 'src/icons')]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // '@import "assets/scss/globalVar.scss";@import "assets/scss/globalMixin.scss";'
        additionalData: '@import "./src/styles/variable.scss";'
      }
    }
  }
})
