<markdown>
# 时间

设定 Message 的持续时间。
</markdown>

<template>
  <n-button @click="createMessage">
    持续 5 秒
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
          { duration: 5000 }
        )
      }
    }
  }
})
</script>
