# Nuxt.js

## 注意

本文档涉及到 SSR，请先了解[SSR 的注意事项](ssr#注意)。

## Nuxt.js 示例

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

## 在 Nuxt 中使用自动引入

同样可以使用 `unplugin-auto-import` 插件来自动导入 API，使用 `unplugin-vue-components` 插件来按需自动加载组件。在这种情况下，`nuxt.config.ts` 会比上面的例子多几行配置。

```ts
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['nuxtjs-naive-ui'],
  vite: {
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
