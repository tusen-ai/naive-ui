<markdown>
# AutoScroll
</markdown>

<script lang="ts" setup>
import type { BubbleListData, BubbleListInst, BubbleListRolesType } from 'naive-ui'
import { reactive, ref } from 'vue'
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

function handleAddMessage() {
  const content
    = 'Listen to the following dialogue. Each dialogue has several questions. Select the best option from the three given options A, B, and C in the question and mark it in the corresponding position on the test paper. After listening to each conversation, you have 10 seconds to answer the sub-questions and read the next one. Each dialogue is read only once. For example, you have five seconds to read the example questions on the test paper.'
  const i = data.length
  data.push({
    content,
    role: i % 2 ? 'user' : 'assistant'
  })
}

function handleClearMessage() {
  data.length = 0
}

const bubbleListRef = ref<BubbleListInst>()
function handleScrollToTop() {
  bubbleListRef.value?.scrollTo({ position: 'top' })
}

function handleScrollToBottom() {
  bubbleListRef.value?.scrollTo({ position: 'bottom' })
}
</script>

<template>
  <n-space vertical>
    <n-space>
      <n-button type="info" @click="handleAddMessage">
        Add Message
      </n-button>
      <n-button type="error" @click="handleClearMessage">
        Clear Message
      </n-button>
      <n-button type="info" @click="handleScrollToTop">
        Scroll to top
      </n-button>
      <n-button type="info" @click="handleScrollToBottom">
        Scroll to bottom
      </n-button>
    </n-space>
    <n-bubble-list
      ref="bubbleListRef"
      v-model:data="data"
      style="max-height: 300px"
      :roles="roles"
    />
  </n-space>
</template>
