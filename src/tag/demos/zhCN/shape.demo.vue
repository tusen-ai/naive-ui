<markdown>
# 形状

圆的 Tag 长得像个胶囊。
</markdown>

<template>
  <n-space>
    <n-tag type="success" size="small" round closable @close="handleClose">
      不该
    </n-tag>
    <n-tag type="error" closable round @close="handleClose">
      手写的从前
    </n-tag>
    <n-tag type="error" closable size="large" round @close="handleClose">
      手写的从前
    </n-tag>
  </n-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      handleClose () {
        message.info('tag close')
      }
    }
  }
})
</script>
