<markdown>
# Imperative API

Provided since `2.38.0`.

You can use `useModal.create` to create a modal. (Please make sure this API is called inside `n-modal-provider`.)
</markdown>

<script lang="ts" setup>
import { NButton, useMessage, useModal } from 'naive-ui'
import { h } from 'vue'

const modal = useModal()
const message = useMessage()

function showDialogPreset() {
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

function showCardPreset() {
  const m = modal.create({
    title: 'Card preset',
    preset: 'card',
    style: {
      width: '400px'
    },
    content: 'Content',
    footer: () =>
      h(NButton, { type: 'primary', onClick: () => m.destroy() }, () => 'Close')
  })
}
</script>

<template>
  <n-flex>
    <NButton @click="showDialogPreset">
      Start me up Dialog
    </NButton>
    <NButton @click="showCardPreset">
      Start me up Card
    </NButton>
  </n-flex>
</template>
