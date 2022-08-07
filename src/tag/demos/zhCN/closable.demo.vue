<markdown>
# 可关闭
</markdown>

<template>
  <n-space>
    <n-tag closable @close="handleClose">
      爱在西元前
    </n-tag>
    <n-tag type="success" closable @close="handleClose">
      不该
    </n-tag>
    <n-tag type="warning" closable @close="handleClose">
      超人不会飞
    </n-tag>
    <n-tag type="error" closable @close="handleClose">
      手写的从前
    </n-tag>
    <n-tag type="info" closable @click="handleClick" @close="handleClose">
      哪里都是你
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
      },
      handleClick () {
        message.info('tag click')
      }
    }
  }
})
</script>
