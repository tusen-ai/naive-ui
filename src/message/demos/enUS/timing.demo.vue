<markdown>
# Timing

Specify the duration of messages.
</markdown>

<script lang="ts">
import { useMessage } from 'naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const message = useMessage()
    return {
      createMessage() {
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
  <n-button @click="createMessage">
    Last for 5 second
  </n-button>
</template>
