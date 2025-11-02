# Vite SSG/SSE

## 注意

本文档涉及到 SSR，请先了解[SSR 的注意事项](ssr#注意)。

## 配置指南

如果你正在使用 `vite-sse` 或者 `vite-ssg`，通过下面的步骤设定 `naive-ui`。

### 1. 安装 `naive-ui`、`@css-render/vue3-ssr`

```bash
# pnpm
pnpm i naive-ui @css-render/vue3-ssr

# npm
npm i naive-ui @css-render/vue3-ssr
```

### 2. 修改 `vite.config.ts`

增加下列内容，如果已经存在一些内容，则合并他们。

```ts
import { setup } from '@css-render/vue3-ssr'

defineConfig({
  ssr: {
    noExternal: ['naive-ui', 'vueuc', 'date-fns']
  },
  ssgOptions: {
    async onBeforePageRender(_, __, appCtx) {
      const { collect } = setup(appCtx.app)
      ;(appCtx as any).__collectStyle = collect
      return undefined
    },
    async onPageRendered(_, renderedHTML, appCtx) {
      return renderedHTML.replace(
        /<\/head>/,
        `${(appCtx as any).__collectStyle()}</head>`
      )
    }
  }
})
```

现在你可以在 `vite-ssg` 或 `vite-sse` 项目中使用 `naive-ui` 了。
