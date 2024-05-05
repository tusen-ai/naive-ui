# Server-Sider Rendering

Since naive-ui is using CSS in JS, in SSR mode it needs some extra configuration.

## Nuxt.js

See [Nuxt.js](nuxtjs).

## Vitepress

See [Vitepress](vitepress).

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
