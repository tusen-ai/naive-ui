<markdown>
# 时间

设定 Message 的持续时间。
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
    持续 5 秒
  </n-button>
</template>
