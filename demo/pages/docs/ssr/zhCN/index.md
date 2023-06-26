# 服务端渲染 Server-Sider Rendering

由于 naive-ui 在使用 CSS in JS，在 SSR 的情况下需要一些额外的配置。

## Nuxt

如果你在使用 Nuxt，请确保你在使用 `naive-ui@>=2.29.0`。

### Nuxt 示例

如果你在使用 Nuxt，参考[例子](https://github.com/07akioni/naive-ui-nuxt-demo)。

### 重点步骤

1. 安装 `naive-ui` 和 `@css-render/vue3-ssr`
2. 在 `nuxt.config.ts` 增添下列配置

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

3. 在 Nuxt 项目的 `plugins` 文件夹增加这个[插件](https://github.com/07akioni/naive-ui-nuxt-demo/blob/main/plugins/naive-ui.ts)

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
