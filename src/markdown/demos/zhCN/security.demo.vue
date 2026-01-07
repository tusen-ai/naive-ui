<markdown>
# 安全

默认开启 `sanitize`，会移除不安全 URL，并且转义原始 HTML。
如果你想在净化后渲染原始 HTML，请提供 `sanitizeHtml`。

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
const source = `- 安全链接：[naive-ui.com](https://www.naiveui.com)
- 不安全链接：[javascript:alert(1)](javascript:alert(1))

<b>原始 HTML</b>
`
</script>

<template>
  <n-space vertical :size="12">
    <n-switch v-model:value="sanitize" />
    <n-markdown :source="source" :sanitize="sanitize" />
  </n-space>
</template>
