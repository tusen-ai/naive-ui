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
          ? ['naive-ui', 'vueuc', 'date-fns-tz/esm/formatInTimeZone']
          : []
    }
  }
})
```

3. 在 Nuxt 项目的 `plugins` 文件夹增加这个[插件](https://github.com/07akioni/naive-ui-nuxt-demo/blob/main/plugins/naive-ui.ts)

## 自动引入并在打包时只打包实际使用到的部分

创建一个文件，放入 modules 下，文件名任意，这里使用 `naive-ui.ts`：

```ts
// 文件 modules/naive-ui.ts
import { defineNuxtModule } from '@nuxt/kit'
import { Component } from '@nuxt/schema'
import { kebabCase } from 'lodash'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { readFileSync } from 'node:fs'

export default defineNuxtModule({
  hooks: {
    // 生成时，只打包使用到的组件
    'vite:extend'(viteBuildContext) {
      if (process.env.NODE_ENV === 'production') {
        const plugins = viteBuildContext.config.plugins
        if (!plugins.some((it: any) => it.name == 'unplugin-vue-components')) {
          plugins.push(
            Components({
              resolvers: [NaiveUiResolver()],
              dts: true
            })
          )
        }
      }
    },
    'components:extend'(components) {
      // 支持开发时的 hot reload
      if (process.env.NODE_ENV === 'development') {
        const text = readFileSync('node_modules/naive-ui/volar.d.ts', 'utf8')
        const matches = text.matchAll(/(\w+):\s*typeof\s+import/g)
        const names = [...matches].map(it => it[1])
        const list = names.map<Component>(name => ({
          filePath: 'naive-ui',
          pascalName: name,
          kebabName: kebabCase(name),
          chunkName: '',
          shortPath: '',
          export: name,
          prefetch: false,
          preload: false
        }))
        components.push(...list)
      }
    }
  }
})
```

修改 `nuxt.config.ts`，引用该模块：

```ts
// ...
export default defineNuxtConfig({
  // ...
  modules: ['./modules/naive-ui']
})
```

## Vite 示例

如果你是用的是 Vite，请参考[例子](https://github.com/07akioni/naive-ui-vite-ssr)。

## Webpack 示例

如果你使用的是 Webpack，请参考[例子](https://github.com/TuSimple/naive-ui/tree/main/playground/ssr)。

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
