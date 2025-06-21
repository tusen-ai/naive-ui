<markdown>
# 使用 mdPlugins 配置

可以通过`mdPlugins`自定定义插件。
</markdown>

<script lang="ts" setup>
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import { ref } from 'vue'

const markdownText = ref(`
  #### 标题 \n 
  这是一个 Markdown 示例。\n 
  - 列表项 1 \n 
  - 列表项 2 **粗体文本** 和 *斜体文本* \n 

  ### 123 <a name="old"></a>

  ~one~ and ~~two~~
`)
</script>

<template>
  <n-config-provider
    :md-plugins="[unified, remarkParse, rehypeStringify, remarkRehype]"
  >
    <n-markdown
      :content="markdownText"
      :md-plugins="[remarkGfm, rehypeSanitize]"
    />
  </n-config-provider>
</template>
