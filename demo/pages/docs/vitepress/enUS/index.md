# Vitepress

## Caveat

This document pertains to SSR (Server-Side Rendering). Please familiarize yourself with the [SSR Caveats](ssr#Caveat) before proceeding.

## Example

This is a [demo](https://github.com/07akioni/naive-ui-vitepress-demo) for using `naive-ui` in `vitepress` with SSR enabled.

You can directly use the demo.

## Key process from scratch

If you want to build your own demo from scratch, follow the next steps:

### 0. Install `@css-render/vue3-ssr`

Make sure its version `>=0.15.14`.

```bash
# npm
npm install --save-dev @css-render/vue3-ssr

# pnpm
pnpm install --save-dev @css-render/vue3-ssr
```

### 1. Add this content to `.vitepress/theme/index.js`

```js
// .vitepress/theme/index.js

import { setup } from '@css-render/vue3-ssr'
import { NConfigProvider } from 'naive-ui'
import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { defineComponent, h, inject } from 'vue'

const { Layout } = DefaultTheme

const CssRenderStyle = defineComponent({
  setup() {
    const collect = inject('css-render-collect')
    return {
      style: collect()
    }
  },
  render() {
    return h('css-render-style', {
      innerHTML: this.style
    })
  }
})

const VitepressPath = defineComponent({
  setup() {
    const route = useRoute()
    return () => {
      return h('vitepress-path', null, [route.path])
    }
  }
})

const NaiveUIProvider = defineComponent({
  render() {
    return h(
      NConfigProvider,
      { abstract: true, inlineThemeDisabled: true },
      {
        default: () => [
          h(Layout, null, { default: this.$slots.default?.() }),
          import.meta.env.SSR ? [h(CssRenderStyle), h(VitepressPath)] : null
        ]
      }
    )
  }
})

export default {
  extends: DefaultTheme,
  Layout: NaiveUIProvider,
  enhanceApp: ({ app }) => {
    if (import.meta.env.SSR) {
      const { collect } = setup(app)
      app.provide('css-render-collect', collect)
    }
  }
}
```

### 2. Add this content to `.vitepress/config.mts`

```ts
import { defineConfig } from 'vitepress'

const fileAndStyles: Record<string, string> = {}

export default defineConfig({
  // ...
  vite: {
    ssr: {
      noExternal: ['naive-ui', 'date-fns', 'vueuc']
    }
  },
  postRender(context) {
    const styleRegex = /<css-render-style>((.|\s)+)<\/css-render-style>/
    const vitepressPathRegex = /<vitepress-path>(.+)<\/vitepress-path>/
    const style = styleRegex.exec(context.content)?.[1]
    const vitepressPath = vitepressPathRegex.exec(context.content)?.[1]
    if (vitepressPath && style) {
      fileAndStyles[vitepressPath] = style
    }
    context.content = context.content.replace(styleRegex, '')
    context.content = context.content.replace(vitepressPathRegex, '')
  },
  transformHtml(code, id) {
    const html = id.split('/').pop()
    if (!html)
      return
    const style = fileAndStyles[`/${html}`]
    if (style) {
      return code.replace(/<\/head>/, `${style}</head>`)
    }
  }
})
```

### 3. Start using naive-ui in your markdown file

```md
...

<script setup>
import { NButton } from 'naive-ui'
</script>

<NButton>Hello World</NButton>

...
```
