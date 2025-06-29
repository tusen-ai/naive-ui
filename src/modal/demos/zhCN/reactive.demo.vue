<markdown>
# 命令式 API

自 `2.38.0` 开始提供。

你可以使用 `useModal.create` 来打开一个模态框。（请确保使用此 API 的组件被 `n-modal-provider` 包含。）
</markdown>

<script lang="ts" setup>
import { NButton, useMessage, useModal } from 'naive-ui'
import { h } from 'vue'

const modal = useModal()
const message = useMessage()

function showDialogPreset() {
  const m = modal.create({
    title: 'Dialog 预设',
    preset: 'dialog',
    content: '内容'
  })
  message.info('三秒钟后关闭')
  setTimeout(() => {
    m.destroy()
  }, 3000)
}

function showCardPreset() {
  const m = modal.create({
    title: 'Card 预设',
    preset: 'card',
    style: {
      width: '400px'
    },
    content: '内容',
    footer: () =>
      h(NButton, { type: 'primary', onClick: () => m.destroy() }, () => '关闭')
  })
}
</script>

<template>
  <n-flex>
    <NButton @click="showDialogPreset">
      来吧 Dialog
    </NButton>
    <NButton @click="showCardPreset">
      来吧 Card
    </NButton>
  </n-flex>
</template>
