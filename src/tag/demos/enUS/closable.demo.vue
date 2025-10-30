<markdown>
# Closable
</markdown>

<script lang="ts" setup>
import { useMessage } from 'naive-ui'

const message = useMessage()
function handleClose() {
  message.info('tag close')
}
function handleClick() {
  message.info('tag click')
}
</script>

<template>
  <n-space>
    <n-tag closable @close="handleClose">
      Real Love
    </n-tag>
    <n-tag type="success" closable @close="handleClose">
      Yes It Is
    </n-tag>
    <n-tag type="warning" closable @close="handleClose">
      I'm Down
    </n-tag>
    <n-tag type="error" closable @close="handleClose">
      Yesterday
    </n-tag>
    <n-tag
      type="info"
      closable
      :trigger-click-on-close="false"
      @click="handleClick"
      @close="handleClose"
    >
      I'm Looking Through You
    </n-tag>
  </n-space>
</template>
