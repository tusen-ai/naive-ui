import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import siteConfig from '../vite.config'
import './vite.init'
// https://vitejs.dev/config/
export default defineConfig({
  ...siteConfig,
  ...{
    root: __dirname,
    resolve: {
      alias: [
        {
          find: /^naive-ui(\/(es|lib))?$/,
          replacement: path.resolve(__dirname, '../src')
        }
      ]
    },
    plugins: [
      vue(),
      Components({
        dts: false,
        resolvers: [NaiveUiResolver()]
      })
    ],
    build: {}
  }
})
