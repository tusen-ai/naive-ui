# Vite SSG/SSE

## Caveat

This document pertains to SSR (Server-Side Rendering). Please familiarize yourself with the [SSR Caveats](ssr#Caveat) before proceeding.

## Setup Guide

If you are using `vite-sse` or `vite-ssg`. Follow the following steps to setup `naive-ui`.

### 1. Install `naive-ui`, `@css-render/vue3-ssr`

```bash
# pnpm
pnpm i naive-ui @css-render/vue3-ssr

# npm
npm i naive-ui @css-render/vue3-ssr
```

### 2. Modify `vite.config.ts`

Add following content. If there exists content already, merge them.

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

Then you can using naive-ui in `vite-ssg` or `vite-sse` project.
