<markdown>
# 基础用法
</markdown>

<script lang="ts" setup>
import type { BubbleListData, BubbleListRolesType } from 'naive-ui'
import { reactive } from 'vue'
import 'vue-markdown-unified/dist/themes/prism.min.css'

const data = reactive(createData())

const roles: BubbleListRolesType = {
  assistant: {
    placement: 'start',
    isTyping: true,
    options: {
      step: 5,
      interval: 20
    },
    variant: 'outlined',
    shape: 'corner',
    isMarkdown: true
  },
  user: {
    placement: 'end',
    avatar: 'https://avatars.githubusercontent.com/u/60170001?v=4'
  }
}

function createData() {
  const message: BubbleListData[] = [
    {
      role: 'user',
      content: '帮我写一段Markdown的示例'
    },
    {
      role: 'assistant',
      content: `#### 标题 \n 这是一个 Markdown 示例。\n - 列表项 1 \n - 列表项 2 **粗体文本** 和 *斜体文本* \n \`\`\`javascript \n console.log('Hello, world!'); \n \`\`\``
    },
    {
      role: 'assistant',
      loading: true,
      content: `#### 标题 \n 这是一个 Markdown 示例。\n - 列表项 1 \n - 列表项 2 **粗体文本** 和 *斜体文本* \n \`\`\`javascript \n console.log('Hello, world!'); \n \`\`\``
    }
  ]

  return message
}
</script>

<template>
  <n-bubble-list v-model:data="data" style="max-height: 300px" :roles="roles" />
</template>
