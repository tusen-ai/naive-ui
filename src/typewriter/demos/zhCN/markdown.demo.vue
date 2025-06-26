<markdown>
# Markdown 渲染

参考 NMarkdown 组件
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'
import 'vue-markdown-unified/dist/themes/prism.min.css'

const num = ref(1)
const content = ref(`# This is an H1
## This is an H2
### This is an H3
#### This is an H4
##### This is an H5
`)

function setContents() {
  if (num.value === 1) {
    content.value += `
> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
> consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
> Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.
>
> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
> id sem consectetuer libero luctus adipiscing.

---

an example | *an example* | **an example**

~~这是删除线~~ (两个波浪线)

~这不会被渲染为删除线~ (单个波浪线)

\`\`\`javascript
import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import { useDropNodeOnCanvas } from './useDropNodeOnCanvas';
\`\`\``
  }
  else {
    content.value = `# This is an H1
## This is an H2
### This is an H3
#### This is an H4
##### This is an H5
---`
  }
  num.value = num.value === 1 ? 2 : 1
}
</script>

<template>
  <n-button @click="setContents">
    重新加载内容
  </n-button>
  <n-typewriter
    :is-markdown="true"
    :content="content"
    :options="{
      interval: 5,
      step: 2,
    }"
  />
</template>
