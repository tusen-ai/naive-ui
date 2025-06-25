<markdown>
# 特殊功能
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const options = {
  allowHtml: true,
  animated: true
}

const markdownText = ref(`
\`\`\`bash
$ pnpm install
\`\`\`


\`\`\`javascript
import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import { useDropNodeOnCanvas } from './useDropNodeOnCanvas';
\`\`\`


\`\`\`mermaid
graph TD
A[Enter Chart Definition] --> B(Preview)
B --> C{decide}
C --> D[Keep]
C --> E[Edit Definition]
E --> B
D --> F[Save Image and Code]
F --> B
\`\`\`

我是一个嵌套测试：
\`\`\`
$1
\`\`\`
`)
</script>

<template>
  <n-markdown :content="markdownText" v-bind="options" />
</template>
