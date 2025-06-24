<markdown>
# 基础用法
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const options = {
  allowHtml: true
}

const markdownText = ref(`
# This is an H1
## This is an H2
### This is an H3
#### This is an H4
##### This is an H5

The point of reference-style links is not that they’re easier to write. The point is that with reference-style links, your document source is vastly more readable. Compare the above examples: using reference-style links, the paragraph itself is only 81 characters long; with inline-style links, it’s 176 characters; and as raw \`HTML\`, it’s 234 characters. In the raw \`HTML\`, there’s more markup than there is text.

---

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

---

1. Bird
1. McHale
1. Parish
    1. Bird
    1. McHale
        1. Parish

---

- Red
- Green
- Blue
    - Red
    - Green
        - Blue

---

This is [an example](http://example.com/ "Title") inline link.

<http://example.com/>


| title | title | title |
| --- | --- | --- |
| content | content | content |


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

---

![](https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg)

![](https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg)
`)
</script>

<template>
  <n-markdown
    :content="markdownText"
    :remark-rehype-options="{
      fontSize: '22px',
    }"
    v-bind="options"
  />
</template>
