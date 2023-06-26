# Server-Sider Rendering

Since naive-ui is using CSS in JS, in SSR mode it needs some extra configuration.

## Nuxt

If you are using Nuxt, please make sure you are using `naive-ui@>=2.29.0`.

### Nuxt Example

If you are using Nuxt, please see [example](https://github.com/07akioni/naive-ui-nuxt-demo).

### Main Process

1. Install `naive-ui` and `@css-render/vue3-ssr`.
2. Add the following config in your `nuxt.config.ts`.

```ts
import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  build: {
    transpile:
      process.env.NODE_ENV === 'production'
        ? [
            'naive-ui',
            'vueuc',
            '@css-render/vue3-ssr',
            '@juggle/resize-observer'
          ]
        : ['@juggle/resize-observer']
  },
  vite: {
    optimizeDeps: {
      include:
        process.env.NODE_ENV === 'development'
          ? ['naive-ui', 'vueuc', 'date-fns-tz/formatInTimeZone']
          : []
    }
  }
})
```

3. Add the [plugin](https://github.com/07akioni/naive-ui-nuxt-demo/blob/main/plugins/naive-ui.ts) in `plugins` folder of your nuxt project.

## Vite Example

If you are using Vite, please see [example](https://github.com/07akioni/naive-ui-vite-ssr).

## Webpack Example

If you are using Webpack, please see [example](https://github.com/tusen-ai/naive-ui/tree/main/playground/ssr).

## Inline Style Optimization

By default, naive-ui bind inline theme style on components, it may increase SSR rendered HTML size. You may use `inline-theme-disabled` prop on `n-config-provider` to disable it. For pros & cons see `n-config-provider`'s doc.

## Known Issues

The following components has some bugs in SSR scene, please avoid using them if possible. We will fix them gradually.

- `n-scrollbar`, `n-data-table` (It works after vue >= 3.2.36)
- `n-anchor`
- `n-avatar-group`
- `n-watermark`
- `n-affix`
- `n-transfer`
