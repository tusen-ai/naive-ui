# Vitepress

## Caveat

This document pertains to SSR (Server-Side Rendering). Please familiarize yourself with the [SSR Caveats](ssr#Caveat) before proceeding.

## Example

This is a [demo](https://github.com/07akioni/naive-ui-vitepress-demo) for using `naive-ui` in `vitepress` with SSR enabled.

You can directly use the demo.

## Key process from scratch

If you want to build your own demo from scratch, follow the next steps:

### 0. Install `@css-render/vue3-ssr` and `vite`

Make sure `@css-render/vue3-ssr`'s version `>=0.15.14`.

When you create a `vitepress` project, `vite` is not automatically installed, but we need its types here.

```bash
# npm
npm install -D @css-render/vue3-ssr
npm install -D vite

# pnpm
pnpm add -D @css-render/vue3-ssr
pnpm add -D vite
```

### 1. Add this content to `env.d.ts`

```ts
/// <reference types="vite/client" />

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
```

### 2. Add this content to `.vitepress/theme/index.ts`

> In steps 2 and 3, ensure that the `type` property in your `package.json` is set to `module`. Otherwise, you'll need to change the `.ts` extension to `.mts`.

```ts
// .vitepress/theme/index.ts

import { setup } from "@css-render/vue3-ssr"
import { defineComponent, reactive, inject, h, watchEffect } from "vue"
import DefaultTheme from "vitepress/theme"
import { useData, useRoute } from "vitepress"
import { NConfigProvider, lightTheme, darkTheme } from "naive-ui"
import type { Theme } from 'vitepress'

// if you use default theme
const { Layout } = DefaultTheme;

// if you use your own theme
// import Layout from './Layout.vue'

// optional
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

### 3. Add this content to `.vitepress/config.ts`

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

### 4. Start using naive-ui in your markdown file

```md
...

<script setup>
import { NButton } from 'naive-ui'
</script>

<NButton>Hello World</NButton>

...
```
