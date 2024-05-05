# Server-Sider Rendering

Since naive-ui is using CSS in JS, in SSR mode it needs some extra configuration.

## Caveat

When using SSR under any framework, it is essential to ensure that the project meets the following conditions:

1. During the build process, any direct or indirect references to the `@css-render/*` and `css-render` packages must have a version of `>=0.15.14`.
2. During the build process, each direct or indirect reference to any `@css-render/*` and `css-render` package should ultimately point to a single target (a package should not have multiple versions or multiple copies of the same version).

You can search for `css-render` in the lock file to check for duplicate packages.

Failure to meet these conditions may result in SSR build failures.

If you encounter issues due to this, you can resolve the problem by directing all related packages to the same version using the `resolution` field in the `package.json` file.

## Nuxt.js

See [Nuxt.js](nuxtjs).

## Vitepress

See [Vitepress](vitepress).

## Vite SSG/SSE

See [Vite SSG/SSE](vite-ssge).

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
