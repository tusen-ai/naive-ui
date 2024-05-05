# Nuxt

## Nuxt Demo

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

> If you are using this module, make sure:
>
> 1. `@css-render/*` and `css-render` packages' version satisfies `>=0.15.4`.
> 2. Each of `@css-render/*` and `css-render` only resolves 1 target. (No different versions of same package & No duplicate for the same version)
>
> You can search in lock file for `css-render` to check if there's duplicate.

## Using Auto Import in Nuxt

You can also use the `unplugin-auto-import` plugin to automatically import APIs and the `unplugin-vue-components` plugin to automatically import components on demand. In this case, the `nuxt.config.ts` file will have a few additional configuration lines compared to the example above.

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
