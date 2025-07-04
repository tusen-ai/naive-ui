<markdown>
# Basic
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
      content: 'Help me write an example of Markdown'
    },
    {
      role: 'assistant',
      content: `# This is an H1
## This is an H2
### This is an H3
#### This is an H4
##### This is an H5 \n \`\`\`javascript \n console.log('Hello, world!'); \n \`\`\``
    },
    {
      role: 'assistant',
      loading: true,
      content: `# This is an H1
## This is an H2
### This is an H3
#### This is an H4
##### This is an H5 \n \`\`\`javascript \n console.log('Hello, world!'); \n \`\`\``
    }
  ]

  return message
}
</script>

<template>
  <n-bubble-list v-model:data="data" style="max-height: 300px" :roles="roles" />
</template>
