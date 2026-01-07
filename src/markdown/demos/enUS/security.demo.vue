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
import { ref } from 'vue'

const sanitize = ref(true)
const source = `- Safe link: [naive-ui.com](https://www.naiveui.com)
- Unsafe link: [javascript:alert(1)](javascript:alert(1))

<b>Raw HTML</b>
`
</script>

<template>
  <n-space vertical :size="12">
    <n-switch v-model:value="sanitize" />
    <n-markdown :source="source" :sanitize="sanitize" />
  </n-space>
</template>
