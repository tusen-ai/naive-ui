<markdown>
# 使用 mdPlugins 配置

可以通过`mdPlugins`自定定义插件。
</markdown>

<script lang="ts" setup>
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
  <n-markdown
    :content="markdownText"
  />
</template>
