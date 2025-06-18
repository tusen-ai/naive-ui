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
    <n-tag closable size="small" @close="handleClose">
      爱在西元前
    </n-tag>
    <n-tag type="warning" closable @close="handleClose">
      超人不会飞
    </n-tag>
    <n-tag type="info" closable size="large" @close="handleClose">
      哪里都是你
    </n-tag>
  </n-space>
</template>
