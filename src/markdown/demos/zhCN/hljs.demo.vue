<markdown>
# Highlight.js

Naive UI 不内置 highlight.js。你可以通过 `NConfigProvider`（推荐）或组件的 `hljs` 属性注入。

---
</markdown>

<script lang="ts" setup>
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'

if (!hljs.getLanguage('javascript') && !hljs.getLanguage('js')) {
  hljs.registerLanguage('javascript', javascript)
}
if (!hljs.getLanguage('typescript') && !hljs.getLanguage('ts')) {
  hljs.registerLanguage('typescript', typescript)
}

const source = `\`\`\`typescript
interface Foo {
  bar: string
}
\`\`\`

\`\`\`javascript
function add (a, b) {
  return a + b
}
\`\`\`
`
</script>

<template>
  <n-config-provider :hljs="hljs">
    <n-markdown :source="source" />
  </n-config-provider>
</template>
