<markdown>
# Size
</markdown>

<script lang="ts" setup>
import { useMessage } from 'naive-ui'

const message = useMessage()
function handleClose() {
  message.info('tag close')
}
</script>

<template>
  <n-space>
    <n-tag size="small" closable @close="handleClose">
      Real Love
    </n-tag>
    <n-tag closable @close="handleClose">
      Real Love
    </n-tag>
    <n-tag type="success" size="large" closable @close="handleClose">
      Yes It Is
    </n-tag>
  </n-space>
</template>
