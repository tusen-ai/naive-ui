<markdown>
# 基础

渲染 Markdown 字符串。

---
</markdown>

<script lang="ts" setup>
import remarkParse from 'remark-parse'
import { unified } from 'unified'

const markdown = unified().use(remarkParse)

const source = `# NMarkdown

将 **Markdown** 渲染为 Naive UI 的排印组件。

- 行内代码：\`const a = 1\`
- 链接：[naive-ui.com](https://www.naiveui.com)

> 引用支持 _inline_ 样式。

\`\`\`ts
function add (a: number, b: number): number {
  return a + b
}
\`\`\`
`
</script>

<template>
  <n-config-provider :markdown="markdown">
    <n-markdown :source="source" />
  </n-config-provider>
</template>
