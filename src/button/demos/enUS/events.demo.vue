<markdown>
# Events

Handle events of buttons.
</markdown>

<template>
  <n-button @click="handleClick">
    Click Me
  </n-button>
</template>
<script setup lang="ts">
import { useMessage } from 'naive-ui'

const message = useMessage()
const handleClick = () => {
  message.info('Button Clicked')
}
</script>
