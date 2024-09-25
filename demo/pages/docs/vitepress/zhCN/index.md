# Vitepress

## 注意

本文档涉及到 SSR，请先了解[SSR 的注意事项](ssr#注意)。

## 例子

这是一个使用 `naive-ui`、`vitepress` 的[样例](https://github.com/07akioni/naive-ui-vitepress-demo)，支持 SSR。

你可以直接使用这个样例。

## 从零开始的关键步骤

如果你希望从头开始改造一个 vitepress 项目，遵循下列步骤

### 0. 安装 `@css-render/vue3-ssr` 和 `vite`

确保 `@css-render/vue3-ssr` 的版本 `>=0.15.14`。

由于我们需要使用到 `vite` 的类型声明，但是 `vitepress` 在创建时不会帮你自动安装，我们需要手动安装一遍

```bash
# npm
npm install -D @css-render/vue3-ssr
npm install -D vite

# pnpm
pnpm add -D @css-render/vue3-ssr
pnpm add -D vite
```

### 1. 把下面的内容增加到 `env.d.ts`

```ts
/// <reference types="vite/client" />

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
```

### 2. 把下面的内容增加到 `.vitepress/theme/index.ts`

> 在步骤 `2` 和 `3` 中，需要确保你的 `package.json` 中 `type` 属性的值为 `module`，否则需要将 `.ts` 后缀改为 `.mts`

```ts
// .vitepress/theme/index.ts

import { setup } from "@css-render/vue3-ssr"
import { defineComponent, reactive, inject, h, watchEffect } from "vue"
import DefaultTheme from "vitepress/theme"
import { useData, useRoute } from "vitepress"
import { NConfigProvider, lightTheme, darkTheme } from "naive-ui"
import type { Theme } from 'vitepress'

// 如果使用的是默认的主题
const { Layout } = DefaultTheme;

// 如果你使用自己定制的主题
// import Layout from './Layout.vue'

// 可选
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'

const CssRenderStyle = defineComponent({
    setup() {
        const collect = inject<CallableFunction>("css-render-collect");
        return {
            style: collect!(),
        };
    },
    render() {
        return h("css-render-style", {
            innerHTML: this.style,
        });
    },
});

const VitepressPath = defineComponent({
    setup() {
        const route = useRoute();
        return () => {
            return h("vitepress-path", null, [route.path]);
        };
    },
});

const NaiveUIProvider = defineComponent({
    setup() {
        const isDark = useData().isDark
        const providerProps = reactive({
            abstract: true,
            inlineThemeDisabled: true,

            // set on ssr
            theme: isDark ? darkTheme : lightTheme
        })

        return {
            isDark,
            providerProps,
        }
    },
    mounted() {
        watchEffect(() => {
            // set on client
            this.providerProps.theme = this.isDark ? darkTheme : lightTheme
        })
    },
    render() {
        return h(
            NConfigProvider,
            this.providerProps,
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
    enhanceApp({ app, router, siteData }) {

        if (import.meta.env.SSR) {
            const { collect } = setup(app);
            app.provide("css-render-collect", collect);
        }

    }
} satisfies Theme
```

### 3. 把下面的内容增加到 `.vitepress/config.ts`

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
    if (!html) return
    const style = fileAndStyles[`/${html}`]
    if (style) {
      return code.replace(/<\/head>/, style + '</head>')
    }
  }
})
```

### 4. 在 markdown 文件中开始使用 naive-ui

```md
...

<script setup>
import { NButton } from 'naive-ui'
</script>

<NButton>Hello World</NButton>

...
```
