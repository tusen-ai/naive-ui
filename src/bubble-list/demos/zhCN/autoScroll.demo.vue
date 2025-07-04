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

function handleAddMessage() {
  const content
    = '听下面一段对话，每段对话有几个小题，从题中所给的A、B、C三个选项中选出最佳选项，并标在试卷的相应位置。听完每段对话后，你都有10秒钟的时间来回答有关小题和阅读下一小题。每段对话仅读一遍。例如，你有5秒钟的时间阅读试卷上的例题。'
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
        添加对话
      </n-button>
      <n-button type="error" @click="handleClearMessage">
        清空对话
      </n-button>
      <n-button type="info" @click="handleScrollToTop">
        滚动到顶部
      </n-button>
      <n-button type="info" @click="handleScrollToBottom">
        滚动到底部
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
