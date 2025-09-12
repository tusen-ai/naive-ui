<markdown>
# Events

Handle events of buttons.
</markdown>

<script setup lang="ts">
import { useMessage } from 'naive-ui'

const message = useMessage()
function handleClick() {
  message.info('Button Clicked')
}
</script>

<template>
  <n-button @click="handleClick">
    Click Me
  </n-button>
</template>
