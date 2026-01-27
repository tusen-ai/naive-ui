<markdown>
# Security

By default, `sanitize` is enabled. It strips unsafe URLs and escapes raw HTML.
Provide `sanitizeHtml` if you want to render raw HTML after sanitizing it.

```ts
import DOMPurify from 'dompurify'

const clean = DOMPurify.sanitize('<b>hello there</b>')
const sanitizeHtml = (html: string): string => DOMPurify.sanitize(html)
```

---
</markdown>

<script lang="ts" setup>
import remarkParse from 'remark-parse'
import { unified } from 'unified'
import { ref } from 'vue'

const markdown = unified().use(remarkParse)

const sanitize = ref(true)
const source = `- Safe link: [naive-ui.com](https://www.naiveui.com)
- Unsafe link: [javascript:alert(1)](javascript:alert(1))

<b>Raw HTML</b>
`
</script>

<template>
  <n-config-provider :markdown="markdown">
    <n-space vertical :size="12">
      <n-switch v-model:value="sanitize" />
      <n-markdown :source="source" :sanitize="sanitize" />
    </n-space>
  </n-config-provider>
</template>
