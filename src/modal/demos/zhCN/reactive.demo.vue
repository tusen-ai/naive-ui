<markdown>
# 命令式 API

自 `2.38.0` 开始提供。

你可以使用 `useModal.create` 来打开一个模态框。（请确保使用此 API 的组件被 `n-modal-provider` 包含。）
</markdown>

<template>
  <n-flex>
    <n-button @click="showDialogPreset">
      来吧 Dialog
    </n-button>
    <n-button @click="showCardPreset">
      来吧 Card
    </n-button>
    <n-button @click="showAny">
      来吧 随便啥
    </n-button>
  </n-flex>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'
import { useModal, useMessage, NButton } from 'naive-ui'

export default defineComponent({
  setup () {
    const modal = useModal()
    const message = useMessage()

    const showDialogPreset = () => {
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
    const showCardPreset = () => {
      const m = modal.create({
        title: 'Card 预设',
        preset: 'card',
        style: {
          width: '400px'
        },
        content: '内容',
        footer: () =>
          h(
            NButton,
            { type: 'primary', onClick: () => m.destroy() },
            () => '关闭'
          )
      })
    }
    const showAny = () => {
      const m = modal.create({
        style: {
          width: '400px',
          background: '#fff'
        },
        render () {
          return h('div', [
            '随便啥',
            h(
              NButton,
              { type: 'primary', onClick: () => m.destroy() },
              () => '关闭'
            )
          ])
        }
      })
    }
    return {
      showDialogPreset,
      showCardPreset,
      showAny
    }
  }
})
</script>
