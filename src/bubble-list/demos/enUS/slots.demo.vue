<markdown>
# Custom rendering
</markdown>

<script lang="ts" setup>
import type { BubbleListData, BubbleListRolesType } from 'naive-ui'
import { DislikeOutlined, LikeOutlined } from '@vicons/antd'
import { CopyOutline, Sync } from '@vicons/ionicons5'
import { format } from 'date-fns'
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
    name: 'Naive UI',
    isMarkdown: true
  },
  user: {
    placement: 'end',
    avatar: 'https://avatars.githubusercontent.com/u/60170001?v=4',
    name: 'user'
  }
}

function createData() {
  const message: BubbleListData[] = [
    {
      role: 'user',
      content: 'Help me write an example of Markdown',
      createAt: 1183135260000
    },
    {
      role: 'assistant',
      content: `# This is an H1
## This is an H2
### This is an H3
#### This is an H4
##### This is an H5 \n \`\`\`javascript \n console.log('Hello, world!'); \n \`\`\``,
      createAt: 1751592492626
    },
    {
      role: 'assistant',
      loading: true,
      content: `# This is an H1
## This is an H2
### This is an H3
#### This is an H4
##### This is an H5 \n \`\`\`javascript \n console.log('Hello, world!'); \n \`\`\``,
      createAt: 1751592492626
    }
  ]

  return message
}
</script>

<template>
  <n-bubble-list v-model:data="data" style="max-height: 300px" :roles="roles">
    <template #avatar="{ item }">
      <n-avatar v-if="item.avatar" :src="item.avatar" round />
    </template>
    <template #header="{ item }">
      <n-text depth="3">
        {{ item.name }}

        {{ format(item.createAt, 'yyyy-MM-dd') }}
      </n-text>
    </template>
    <template #footer>
      <div style="display: flex; gap: 2px">
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-button quaternary size="small">
              <template #icon>
                <n-icon><Sync /></n-icon>
              </template>
            </n-button>
          </template>
          Reload
        </n-tooltip>

        <n-tooltip trigger="hover">
          <template #trigger>
            <n-button quaternary size="small">
              <template #icon>
                <n-icon><CopyOutline /></n-icon>
              </template>
            </n-button>
          </template>
          Copy
        </n-tooltip>

        <n-tooltip trigger="hover">
          <template #trigger>
            <n-button quaternary size="small">
              <template #icon>
                <n-icon><LikeOutlined /></n-icon>
              </template>
            </n-button>
          </template>
          Like
        </n-tooltip>

        <n-tooltip trigger="hover">
          <template #trigger>
            <n-button quaternary size="small">
              <template #icon>
                <n-icon><DislikeOutlined /></n-icon>
              </template>
            </n-button>
          </template>
          UnLike
        </n-tooltip>
      </div>
    </template>
    <template #loading>
      <span>Loading...</span>
    </template>
    <template #content="{ item }">
      <n-markdown v-if="item.isMarkdown" :content="item.content" />
      <span v-else>{{ item.content }}</span>
    </template>
  </n-bubble-list>
</template>
