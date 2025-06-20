<markdown>
# Markdown 渲染

参考markdown组件
</markdown>

<script lang="ts" setup>
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'

const content = `#### 标题 \n 这是一个 Markdown 示例。\n - 列表项 1 \n - 列表项 2 **粗体文本** 和 *斜体文本* \n \`\`\`javascript \n console.log('Hello, world!'); \n \`\`\``
</script>

<template>
  <n-config-provider
    :unified="unified"
    :md-plugins="[remarkParse, rehypeStringify, remarkRehype]"
  >
    <n-typing-bubble
      :is-markdown="true"
      :content="content"
    />
  </n-config-provider>
</template>
