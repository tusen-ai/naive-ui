<markdown>
# 基础

渲染 Markdown 字符串。

---
</markdown>

<script lang="ts" setup>
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
  <n-markdown :source="source" />
</template>
