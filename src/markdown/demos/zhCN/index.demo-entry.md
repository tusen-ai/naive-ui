# Markdown

运行时 Markdown 渲染组件。

<n-alert title="Note" type="warning" style="margin-bottom: 16px;" :bordered="false">
  由于包体积原因，Naive UI 不内置 unified/remark。如果你需要使用 NMarkdown，请在使用前配置 markdown 处理器。
</n-alert>

下面的代码展示了如何为 NMarkdown 设定 markdown 处理器。

```html
<template>
  <n-config-provider :markdown="markdown">
    <my-app />
  </n-config-provider>
</template>

<script>
  import { defineComponent } from 'vue'
  import { unified } from 'unified'
  import remarkParse from 'remark-parse'

  export default defineComponent({
    setup() {
      const markdown = unified().use(remarkParse)
      return {
        markdown
      }
    }
  })
</script>
```

## 演示

```demo
basic.vue
hljs.vue
security.vue
```

## API

### Markdown Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| source | `string` | `''` | Markdown 源字符串。 |
| sanitize | `boolean` | `true` | 是否清理链接与图片中的不安全 URL，并转义原始 HTML。 |
| sanitizeHtml | `(html: string) => string` | `undefined` | 对原始 HTML 进行净化并渲染（仅在 `sanitize` 为 `true` 时生效）。 |
| hljs | `Hljs` | `undefined` | highlight.js 实例。 |
| markdown | `MarkdownProcessor` | `undefined` | Markdown 处理器，优先级高于 `NConfigProvider`。 |
