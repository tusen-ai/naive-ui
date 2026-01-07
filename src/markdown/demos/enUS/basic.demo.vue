<markdown>
# Basic

Render Markdown source string.

---
</markdown>

<script lang="ts" setup>
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
  <n-markdown :source="source" />
</template>
