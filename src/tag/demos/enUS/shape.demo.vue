<markdown>
# Shape

Round tag looks like a capsule.
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
    <n-tag closable size="small" round @close="handleClose">
      Real Love
    </n-tag>
    <n-tag type="success" size="large" round closable @close="handleClose">
      Yes It Is
    </n-tag>
    <n-tag type="warning" closable round @close="handleClose">
      I'm Down
    </n-tag>
  </n-space>
</template>
