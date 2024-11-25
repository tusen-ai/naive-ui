# Nuxt.js

## Caveat

This document pertains to SSR (Server-Side Rendering). Please familiarize yourself with the [SSR Caveats](ssr#Caveat) before proceeding.

## Nuxt.js Demo

You can refer to [example](https://github.com/07akioni/naive-ui-nuxt-demo).

## Using Nuxt Module

This is the same approach which previous demo uses.

Install the [module](https://github.com/07akioni/nuxtjs-naive-ui) to your Nuxt application with one command:

```bash
# npm
npx nuxi module add nuxtjs-naive-ui

# pnpm
pnpm dlx nuxi module add nuxtjs-naive-ui
```

## Using Auto Import in Nuxt

You can also use the `unplugin-auto-import` plugin to automatically import APIs and the `unplugin-vue-components` plugin to automatically import components on demand. In this case, the `nuxt.config.ts` file will have a few additional configuration lines compared to the example above.

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
