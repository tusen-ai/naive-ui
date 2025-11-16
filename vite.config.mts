import dns from 'node:dns'
import path from 'node:path'
import process from 'node:process'
import { babel } from '@rollup/plugin-babel'
import { configDefaults, defineConfig } from 'vitest/config'
import { createDemoPlugin } from './build/vite-plugin-demo'

dns.setDefaultResultOrder('verbatim')

const isBuildTimeTest = process.argv.some(arg =>
  /(?:^|[\\/])(umd-test|esm-test)/.test(arg)
)

const testExclude = isBuildTimeTest
  ? configDefaults.exclude
  : [...configDefaults.exclude, 'umd-test/**/*', 'esm-test/**/*']

export default defineConfig({
  root: __dirname,
  plugins: createDemoPlugin(),
  resolve: {
    // In production site build, we want to import naive-ui from node_modules
    alias:
      process.env.NODE_ENV !== 'production'
        ? [
            {
              find: 'naive-ui/generic',
              replacement: path.resolve(__dirname, './generic')
            },
            {
              find: 'naive-ui',
              replacement: path.resolve(__dirname, './src')
            }
          ]
        : undefined
  },
  define: {
    'process.env.NODE_ENV': `'${process.env.NODE_ENV}'`,
    'process.env.TUSIMPLE': !!process.env.TUSIMPLE,
    __DEV__: process.env.NODE_ENV !== 'production'
  },
  optimizeDeps: {
    include: [
      '@css-render/plugin-bem',
      'async-validator',
      'css-render',
      'date-fns',
      'date-fns-tz/getTimezoneOffset',
      'evtd',
      'highlight.js',
      'lodash-es',
      'seemly',
      'treemate',
      'vdirs',
      'vooks',
      'vue',
      'vue-router',
      'vueuc',
      '@css-render/vue3-ssr',
      'date-fns-tz',
      'codesandbox/lib/api/define',
      'grapheme-splitter',
      'highlight.js/lib/core',
      'highlight.js/lib/languages/javascript',
      'highlight.js/lib/languages/python',
      'highlight.js/lib/languages/cpp',
      'highlight.js/lib/languages/xml',
      '@vicons/ionicons5',
      '@vicons/ionicons4',
      '@vicons/fluent/Compose16Regular.js'
    ],
    exclude: ['__INDEX__']
  },
  build: {
    outDir: 'site',
    rollupOptions: {
      output: {
        manualChunks: {
          'grapheme-splitter': ['grapheme-splitter'],
          katex: ['katex']
        }
      },
      plugins: [
        babel({
          babelHelpers: 'bundled'
        })
      ]
    }
  },
  esbuild: {
    jsx: 'transform',
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/vitest-setup.ts'],
    exclude: testExclude,
    coverage: {
      provider: 'v8',
      reportsDirectory: path.resolve(__dirname, 'coverage'),
      reporter: ['text', 'lcov', 'json', 'json-summary', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        '**/*.d.ts',
        'src/**/__tests__/**/*.[jt][sx]',
        'src/**/tests/**/*.[jt][sx]'
      ]
    }
  }
})
