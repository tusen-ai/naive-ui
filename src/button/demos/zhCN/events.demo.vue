<markdown>
# 事件

处理按钮的事件。
</markdown>

<template>
  <n-button @click="handleClick">
    点它
  </n-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      handleClick () {
        message.info('Button Clicked')
      }
    }
  }
})
</script>
