# 代码 Code

自 NEXT_VERSION 起, 支持 Shiki 作为代码高亮的选项之一

## 预备条件

<n-alert title="注意" type="warning" style="margin-bottom: 16px;" :bordered="false">
  由于包体积原因，Naive UI 不内置 highlight.js 或 Shiki。如果你需要使用代码组件，请确保你在使用之前已经设定了 highlight.js 或 Shiki。
</n-alert>

下面的代码展示了如何为 Code 设定 hljs。比较推荐的方式是按需引入，因为它可以极大地减小打包尺寸。

```html
<template>
  <n-config-provider :hljs="hljs">
    <my-app />
  </n-config-provider>
</template>

<script>
  import { defineComponent } from 'vue'
  import hljs from 'highlight.js/lib/core'
  import javascript from 'highlight.js/lib/languages/javascript'

  hljs.registerLanguage('javascript', javascript)

  export default defineComponent({
    setup() {
      return {
        hljs
      }
    }
  })
</script>
```

下面的代码展示了如何为 Code 设定 shiki。更多内容请参考 [Shiki](https://shiki.style/) 文档。

```html
<template>
  <n-config-provider :shiki="shiki">
    <my-app />
  </n-config-provider>
</template>

<script>
  import { defineComponent } from 'vue'
  import { onMounted, ref } from 'vue'
  import { createHighlighter } from 'shiki'
  export default defineComponent({
    setup() {
      const shiki = ref(null)
      onMounted(async () => {
        const highlighter = await createHighlighter({
          themes: ['github-light', 'github-dark'],
          langs: ['javascript']
        })

        shiki.value = {
          codeToHtml(code: string) {
            return highlighter.codeToHtml(code, {
              lang: 'javascript',
              themes: {
                light: 'github-light',
                dark: 'github-dark'
              }
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
basic.vue
inline.vue
softwrap.vue
loop-debug.vue
line-numbers.vue
shiki.vue
```

## API

### Code Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| code | `string` | `''` | 传入的 code 字符串 |  |
| inline | `boolean` | `false` | 使用行内样式 |  |
| hljs | `Object` | `undefined` | 如果你想局部设定 hljs，可以通过这个属性传给组件 |  |
| language | `string` | `undefined` | 代码在 highlightjs 中的语言 |  |
| show-line-numbers | `boolean` | `false` | 是否显示行号，在 `inline` 或 `word-wrap` 的情况下不生效 | 2.32.0 |
| trim | `boolean` | `true` | 是否显示 trim 后的代码 |  |
| word-wrap | `boolean` | `false` | 代码过长时是否自动换行 | 2.24.0 |
| shiki | `Shiki` | `undefined` | 如果你想使用 shiki 进行代码高亮，可以通过这个属性传给组件 | NEXT_VERSION |

### Shiki 类型

```ts
interface Shiki {
  /**
   * The consumer (e.g. n-code / n-log) only cares about the rendered HTML string.
   * Users may configure languages, themes or hooks when constructing the Shiki
   * instance, but all those details should be hidden behind this single method.
   */
  codeToHtml: (
    code: string,
    options: { lang: string, theme?: string | object }
  ) => string
}
```
