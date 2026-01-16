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
    <n-tag size="tiny" closable @close="handleClose">
      Real Love
    </n-tag>
    <n-tag type="success" size="small" closable @close="handleClose">
      Yes It Is
    </n-tag>
    <n-tag type="warning" closable @close="handleClose">
      I'm Down
    </n-tag>
    <n-tag type="error" size="large" closable @close="handleClose">
      Yesterday
    </n-tag>
  </n-space>
</template>
