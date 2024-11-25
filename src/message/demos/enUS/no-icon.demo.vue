<markdown>
# No icon
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
    No icon
  </n-button>
</template>
