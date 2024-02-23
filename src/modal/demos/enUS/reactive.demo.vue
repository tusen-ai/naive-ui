<markdown>
# Imperative API

Provided since `2.38.0`.

You can use `useModal.create` to create a modal. (Please make sure this API is called inside `n-modal-provider`.)
</markdown>

<template>
  <n-button @click="handleClick">
    Start me up
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
        title: 'Modal',
        content: 'Content',
        preset: 'dialog'
      })
      message.info('Shut down in three seconds')
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
