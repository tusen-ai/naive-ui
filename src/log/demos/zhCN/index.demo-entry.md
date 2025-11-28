# 日志 Log

<!--single-column-->

如果你有一些日志要展示，可以使用 Log。

自 NEXT_VERSION 起支持使用 Shiki 高亮

<n-alert title="注意" type="warning" style="margin-bottom: 16px;" :bordered="false">
  由于尺寸原因，Naive UI 不内置高亮器 highlight.js 或 shiki。如果你需要高亮日志，请确保你在使用之前已经设定了 highlight.js 或 shiki
</n-alert>

在本页如何 highlight.js 高亮的演示中，我们定义了一个叫做 `naive-log` 的语言来高亮全部的数字。下面的代码是我们怎么定义的。如果你想了解 highlight.js，可以参考 <n-a href="https://highlightjs.org/" target="_blank">highlight.js</n-a> 和 <n-a href="https://highlightjs.readthedocs.io/en/latest/index.html" target="_blank">highlight.js developer documentation</n-a>

Shiki 的高亮用法参考下方的 Shiki 示例，你可以阅读 <n-a href="https://shiki.matsu.io/" target="_blank">Shiki</n-a> 文档了解更多 Shiki 的用法

```html
<template>
  <n-config-provider :hljs="hljs">
    <my-app />
  </n-config-provider>
</template>

<script>
  import { defineComponent } from 'vue'
  import hljs from 'highlight.js/lib/core'

  hljs.registerLanguage('naive-log', () => ({
    contains: [
      {
        className: 'number',
        begin: /\d+/
      }
    ]
  }))

  export default defineComponent({
    setup() {
      return {
        hljs
      }
    }
  })
</script>
```

```html
<template>
  <n-config-provider :shiki="shiki">
    <my-app />
  </n-config-provider>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue'
  import { createHighlighter } from 'shiki'

  export default defineComponent({
    setup() {
      const shiki = ref()

      const naiveLogLanguage: LanguageInput = {
        name: 'naive-shiki-log',
        scopeName: 'source.naive-shiki-log',
        patterns: [
          {
            name: 'constant.numeric.naive-shiki-log',
            match: '\\b\\d+(?:\\.\\d+)?\\b'
          },
          {
            name: 'keyword.operator.naive-shiki-log',
            match: '\\b(INFO|WARN|ERROR|DEBUG)\\b'
          },
          {
            begin: '\\[',
            end: '\\]',
            name: 'punctuation.definition.bracket.naive-shiki-log'
          }
        ],
        repository: {}
      }

      onMounted(async () => {
        const highlighter = await createHighlighter({
          themes: ['vitesse-light'],
          langs: [naiveLogLanguage]
        })

        shiki.value = {
          codeToHtml(code: string) {
            return highlighter.codeToHtml(code, {
              lang: 'naive-shiki-log',
              theme: 'vitesse-light'
            })
          }
        }
      })

      return {
        shiki
      }
    }
  })
</script>
```

## 演示

```demo
size.vue
event.vue
scroll.vue
highlight.vue
shiki.vue
loading.vue
auto-bottom.vue
```

## API

### Log Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| font-size | `number` | `14` | 文字大小 |
| hljs | `Object` | `undefined` | 如果你想局部设定 `hljs` ，可以通过这个属性传给组件 |
| language | `string` | `undefined` | 日志在 `highlightjs` 中的语言 |
| line-height | `number` | `1.25` | 行高 |
| lines | `Array<string>` | `undefined` | 按行显示日志内容，在同时存在 `log` 参数时，该参数无效 |
| loading | `boolean` | `false` | 是否显示加载中 |
| log | `string` | `undefined` | 日志的内容 |
| rows | `number` | `15` | 日志的尺寸 |
| trim | `boolean` | `false` | 是否显示 `trim` 后的日志 |
| on-require-more | `(from: 'top' \| 'bottom') => void` | `undefined` | 滚动加载日志的回调函数 |
| on-reach-top | `() => void` | `undefined` | 滚动到顶部的回调函数 |
| on-reach-bottom | `() => void` | `undefined` | 滚动到底部的回调函数 |
| shiki | `Shiki` | `undefined` | 如果你想局部设定 `shiki` ，可以通过这个属性传给组件 | NEXT_VERSION |

### Log Methods

| 名称 | 参数 | 说明 |
| --- | --- | --- |
| scrollTo | `(options: { top?: number, position?: 'top' \| 'bottom', silent?: boolean })` | 滚动事件的回调函数 |

### Shiki Interface

```ts
interface Shiki {
  /**
   * The consumer (e.g. n-code / n-log) only cares about the rendered HTML string.
   * Users may configure languages, themes or hooks when constructing the Shiki
   * instance, but all those details should be hidden behind this single method.
   */
  codeToHtml: (code: string) => string
}
```
