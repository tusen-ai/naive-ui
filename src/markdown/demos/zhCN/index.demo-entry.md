# Markdown

`Markdown` 是一个Markdown 渲染组件，内部使用remark渲染。

自 `NEXT_VERSION` 开始提供。

<n-alert title="注意" type="warning" style="margin-bottom: 16px;" :bordered="false">
  由于包体积原因，Naive UI 不内置 unified。如果你需要使用公式组件，请确保你在使用之前已经设定了 unified。
</n-alert>

下面的代码展示了如何为 Markdown 设定 unified。

<!--
```html
<template>
  <n-config-provider
    :unified="unified"
    :md-plugins="[remarkParse, rehypeStringify, remarkRehype]"
  >
    <my-app />
  </n-config-provider>
</template>

<script setup>
  import unified from 'unified'
  import rehypeStringify from 'rehype-stringify'
  import remarkParse from 'remark-parse'
  import remarkRehype from 'remark-rehype'
</script>
``` -->

## 演示

```demo
basic.vue
katex.vue
github-syntax-guide.vue
```

## API

### Markdown Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| content | `string` | `undefined` | 要展示的文本内容 | NEXT_VERSION |
| allowHtml | `boolean` | `false` | 是否允许在markdown内容中使用HTML | NEXT_VERSION |
| enableLatex | `boolean` | `true` | 启用LaTeX数学表达式 | NEXT_VERSION |
