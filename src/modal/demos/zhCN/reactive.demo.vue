<markdown>
# 命令式 API

自 NEXT_VERSION 开始提供。

你可以使用 `useModal.create` 来打开一个模态框。（请确保使用此 API 的组件被 `n-modal-provider` 包含。）
</markdown>

<template>
  <n-button @click="handleClick">
    来吧
  </n-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useModal, useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const modal = useModal()
    const message = useMessage()

    const handleClick = () => {
      const modalInst = modal.create({
        title: '模态框',
        content: '内容',
        preset: 'dialog'
      })
      message.info('三秒钟后关闭')
      setTimeout(() => {
        modalInst.destroy()
      }, 3000)
    }

    return {
      handleClick
    }
  }
})
</script>
