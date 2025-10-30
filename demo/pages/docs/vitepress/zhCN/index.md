# Vitepress

## 注意

本文档涉及到 SSR，请先了解[SSR 的注意事项](ssr#注意)。

## 例子

这是一个使用 `naive-ui`、`vitepress` 的[样例](https://github.com/07akioni/naive-ui-vitepress-demo)，支持 SSR。

你可以直接使用这个样例。

## 从零开始的关键步骤

如果你希望从头开始改造一个 vitepress 项目，遵循下列步骤

### 0. 安装 `@css-render/vue3-ssr`

确保其版本 `>=0.15.14`。

```bash
# npm
npm install --save-dev @css-render/vue3-ssr

# pnpm
pnpm install --save-dev @css-render/vue3-ssr
```

### 1. 把下面的内容增加到 `.vitepress/theme/index.js`

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

### 2. 把下面的内容增加到 `.vitepress/config.mts`

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

### 3. 在 markdown 文件中开始使用 naive-ui

```md
...

<script setup>
import { NButton } from 'naive-ui'
</script>

<NButton>Hello World</NButton>

...
```
