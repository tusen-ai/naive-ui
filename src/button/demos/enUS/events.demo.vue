<markdown>
# Events

Handle events of buttons.
</markdown>

<template>
  <n-button @click="handleClick">
    Click Me
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
