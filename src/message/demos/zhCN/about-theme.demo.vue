<markdown>
# 关于主题的注意事项

如果你不明确指明主题，被创建信息的主题会与对应 `n-message-provider` 的主题一致。
</markdown>

<template>
  <n-button @click="info">
    你可以在 Message 还在的时候切换主题
  </n-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      info () {
        message.info(
          "I don't know why nobody told you how to unfold your love",
          { duration: 5000 }
        )
      }
    }
  }
})
</script>
