<markdown>
# 事件

处理按钮的事件。
</markdown>

<script lang="ts">
import { useMessage } from 'naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const message = useMessage()
    return {
      handleClick() {
        message.info('Button Clicked')
      }
    }
  }
})
</script>

<template>
  <n-button @click="handleClick">
    点它
  </n-button>
</template>
