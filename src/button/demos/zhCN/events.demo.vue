<markdown>
# 事件

处理按钮的事件。
</markdown>

<script lang="ts" setup>
import { useMessage } from 'naive-ui'

const message = useMessage()
function handleClick() {
  message.info('Button Clicked')
}
</script>

<template>
  <n-button @click="handleClick">
    点它
  </n-button>
</template>
