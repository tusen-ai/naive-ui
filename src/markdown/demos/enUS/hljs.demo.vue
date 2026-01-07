<markdown>
# Highlight.js

Naive UI doesn't bundle highlight.js. Inject it via `NConfigProvider` (recommended) or the `hljs` prop.

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
