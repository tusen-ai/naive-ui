<markdown>
# 基础用法
</markdown>

<script lang="ts" setup>
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import { ref } from 'vue'

const markdownText = ref(`
   #### 标题 \n 
   这是一个 Markdown 示例。\n 
   - 列表项 1 \n 
   - 列表项 2 **粗体文本** 和 *斜体文本* \n 
   ~one~ and ~~two~~`
)
</script>

<template>
  <n-config-provider
    :unified="unified"
    :md-plugins="[remarkParse, rehypeStringify, remarkRehype]"
  >
    <n-markdown :content="markdownText" />
  </n-config-provider>
</template>
