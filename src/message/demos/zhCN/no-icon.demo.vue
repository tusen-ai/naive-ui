<markdown>
# 无图标
</markdown>

<script lang="ts">
import { useMessage } from 'naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const message = useMessage()
    return {
      createMessage() {
        message.warning('I never needed anybody\'s help in any way', {
          showIcon: false
        })
      }
    }
  }
})
</script>

<template>
  <n-button @click="createMessage">
    无图标
  </n-button>
</template>
