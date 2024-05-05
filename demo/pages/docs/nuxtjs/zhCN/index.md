# Nuxt.js

## Nuxt 示例

参考[例子](https://github.com/07akioni/naive-ui-nuxt-demo)。

## 使用 Nuxt Module

这和上一个示例使用的是同样的方式。

在你的 Nuxt 应用中使用下列命令安装此[模块](https://github.com/07akioni/nuxtjs-naive-ui)：

```bash
# npm
npx nuxi module add nuxtjs-naive-ui

# pnpm
pnpm dlx nuxi module add nuxtjs-naive-ui
```

> 使用该模块，请确保:
>
> 1. `@css-render/*` 和 `css-render` 的版本都 `>=0.15.4`
> 2. 每个 `@css-render/*` 和 `css-render` 包最终只都指向一个目标（一个包不会有多个版本，也不会有同一个版本的多个副本）
>
> 你可以在 lock file 中搜索 `css-render` 去检查是不是有重复的

## 在 Nuxt 中使用自动引入

同样可以使用 `unplugin-auto-import` 插件来自动导入 API，使用 `unplugin-vue-components` 插件来按需自动加载组件。在这种情况下，`nuxt.config.ts` 会比上面的例子多几行配置。

```ts
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  build: {
    transpile:
      process.env.NODE_ENV === 'production'
        ? [
            'naive-ui',
            'vueuc',
            '@css-render/vue3-ssr',
            'juggle/resize-observer'
          ]
        : ['@juggle/resize-observer']
  },
  vite: {
    optimizeDeps: {
      include:
        process.env.NODE_ENV === 'development'
          ? ['naive-ui', 'vueuc', 'date-fns-tz/esm/formatInTimeZone']
          : []
    },
    plugins: [
      AutoImport({
        imports: [
          {
            'naive-ui': [
              'useDialog',
              'useMessage',
              'useNotification',
              'useLoadingBar'
            ]
          }
        ]
      }),
      Components({
        resolvers: [NaiveUiResolver()]
      })
    ]
  }
})
```
