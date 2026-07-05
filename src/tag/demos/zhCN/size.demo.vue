<markdown>
# 尺寸
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
    <n-tag closable size="tiny" @close="handleClose">
      爱在西元前
    </n-tag>
    <n-tag type="success" closable size="small" @close="handleClose">
      不该
    </n-tag>
    <n-tag type="warning" closable @close="handleClose">
      超人不会飞
    </n-tag>
    <n-tag type="error" closable size="large" @close="handleClose">
      手写的从前
    </n-tag>
  </n-space>
</template>
