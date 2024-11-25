<markdown>
# Caveat about theme

If you don't specify the theme, the theme of created message will be the same as its `n-message-provider`.
</markdown>

<script lang="ts">
import { useMessage } from 'naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const message = useMessage()
    return {
      info() {
        message.info(
          'I don\'t know why nobody told you how to unfold your love',
          { duration: 5000 }
        )
      }
    }
  }
})
</script>

<template>
  <n-button @click="info">
    You can change the theme while the message is active
  </n-button>
</template>
