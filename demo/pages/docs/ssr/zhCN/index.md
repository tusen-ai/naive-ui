# 服务端渲染 Server-Sider Rendering

由于 naive-ui 在使用 CSS in JS，在 SSR 的情况下需要一些额外的配置。

## 注意

无论在任何框架下使用 SSR，需要确保项目满足以下条件：

1. 构建时，任何被直接和间接引用的 `@css-render/*` 和 `css-render` 包版本都 `>=0.15.14`
2. 构建时，任何被直接和间接引用的每个 `@css-render/*` 和 `css-render` 包最终只都指向一个目标（一个包不会有多个版本，也不会有同一个版本的多个副本）

你可以在 lock file 中搜索 `css-render` 去检查是否有重复的包。

如果上述条件没有满足，可能会导致 SSR 构建失败。

如果因为这个原因遇到问题，你可以通过 `package.json` 中的 `resolution` 字段来让所有相关包指向同一个版本来解决问题。

## Nuxt.js

参考 [Nuxt.js](nuxtjs)。

## Vitepress

参考 [Vitepress](vitepress)。

## Vite SSG/SSE

参考 [Vite SSG/SSE](vite-ssge)。

## Vite 示例

如果你是用的是 Vite，请参考[例子](https://github.com/07akioni/naive-ui-vite-ssr)。

## Webpack 示例

如果你使用的是 Webpack，请参考[例子](https://github.com/tusen-ai/naive-ui/tree/main/playground/ssr)。

## 内联样式优化

默认情况下，naive-ui 会在组件上绑定 inline 主题样式，这可能会影响 SSR 的尺寸。你可以使用 `n-config-provider` 的 `inline-theme-disabled` 属性来优化，详细的优劣请参考 `n-config-provider` 的文档。

## 已知问题

下列组件在 SSR 场景中存在一些 Bug，使用时请尽量规避，我们会逐步修复。

- `n-scrollbar`, `n-data-table`（vue 版本 >= 3.2.36 后没有问题)
- `n-anchor`
- `n-avatar-group`
- `n-watermark`
- `n-affix`
- `n-transfer`
