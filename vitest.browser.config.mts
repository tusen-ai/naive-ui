import path from 'node:path'
import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vitest/config'
import vueJsxVapor from 'vue-jsx-vapor/vite'

export default defineConfig({
  plugins: [
    vueJsxVapor({
      interop: true
    })
  ],
  resolve: {
    alias: [
      {
        find: 'naive-ui/generic',
        replacement: path.resolve(import.meta.dirname, './generic')
      },
      {
        find: 'naive-ui',
        replacement: path.resolve(import.meta.dirname, './src')
      }
    ]
  },
  define: {
    'process.env.NODE_ENV': `'test'`,
    __DEV__: true
  },
  oxc: {
    jsx: {
      runtime: 'classic',
      pragma: 'h',
      pragmaFrag: 'Fragment',
      development: false
    }
  },
  test: {
    globals: true,
    include: ['src/**/*.browser.spec.{ts,tsx}'],
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }]
    }
  }
})
