<markdown>
# Closable

Set `closable` to make message closable by a click.
</markdown>

<template>
  <n-button @click="createMessage">
    Create a Message
  </n-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      createMessage () {
        message.info(
          "I don't know why nobody told you how to unfold your love",
          {
            closable: true,
            duration: 5000
          }
        )
      }
    }
  }
})
</script>
