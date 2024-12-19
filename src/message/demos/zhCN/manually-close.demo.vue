<markdown>
# 手动关闭
</markdown>

<script lang="ts">
import type { MessageReactive } from 'naive-ui'
import { useMessage } from 'naive-ui'
import { defineComponent, onBeforeUnmount } from 'vue'

export default defineComponent({
  setup() {
    const message = useMessage()
    let messageReactive: MessageReactive | null = null

    const removeMessage = () => {
      if (messageReactive) {
        messageReactive.destroy()
        messageReactive = null
      }
    }

    onBeforeUnmount(removeMessage)

    return {
      removeMessage,
      createMessage() {
        if (!messageReactive) {
          messageReactive = message.info('3 * 3 * 4 * 4 * ?', {
            duration: 0
          })
        }
      }
    }
  }
})
</script>

<template>
  <n-space>
    <n-button @click="createMessage">
      打开
    </n-button>
    <n-button @click="removeMessage">
      关闭
    </n-button>
  </n-space>
</template>
