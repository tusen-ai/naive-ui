<markdown>
# Imperative API

Provided since `2.38.0`.

You can use `useModal.create` to create a modal. (Please make sure this API is called inside `n-modal-provider`.)
</markdown>

<template>
  <n-flex>
    <n-button @click="showDialogPreset">
      Start me up Dialog
    </n-button>
    <n-button @click="showCardPreset">
      Start me up Card
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
        title: 'Dialog perset',
        preset: 'dialog',
        content: 'Content'
      })
      message.info('Shut down in three seconds')
      setTimeout(() => {
        m.destroy()
      }, 3000)
    }
    const showCardPreset = () => {
      const m = modal.create({
        title: 'Card preset',
        preset: 'card',
        style: {
          width: '400px'
        },
        content: 'Content',
        footer: () =>
          h(
            NButton,
            { type: 'primary', onClick: () => m.destroy() },
            () => 'Close'
          )
      })
    }
    return {
      showDialogPreset,
      showCardPreset
    }
  }
})
</script>
