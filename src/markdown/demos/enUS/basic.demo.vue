<markdown>
# Basic

Render Markdown source string.

---
</markdown>

<script lang="ts" setup>
import remarkParse from 'remark-parse'
import { unified } from 'unified'

const markdown = unified().use(remarkParse)

const source = `# NMarkdown

Render **Markdown** into Naive UI typography components.

- Inline code: \`const a = 1\`
- Link: [naive-ui.com](https://www.naiveui.com)

> Blockquote supports _inline_ styles.

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
