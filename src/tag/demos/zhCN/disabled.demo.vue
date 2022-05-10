<markdown>
# 禁用
</markdown>

<template>
  <n-space align="center" item-style="display: flex;">
    <n-tag closable :disabled="disabled" @close="handleClose">
      爱在西元前
    </n-tag>
    <n-tag type="success" closable :disabled="disabled" @close="handleClose">
      不该
    </n-tag>
    <n-tag type="warning" closable :disabled="disabled" @close="handleClose">
      超人不会飞
    </n-tag>
    <n-tag type="error" closable :disabled="disabled" @close="handleClose">
      手写的从前
    </n-tag>
    <n-tag type="info" closable :disabled="disabled" @close="handleClose">
      哪里都是你
    </n-tag>
    <n-switch v-model:value="disabled" />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      disabled: ref(true),
      handleClose () {
        message.info('tag close')
      }
    }
  }
})
</script>
