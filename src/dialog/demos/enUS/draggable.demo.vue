<markdown>
# draggable dialog

sometimes you want to enable dragging feature for Dialog.
</markdown>

<template>
  <n-space>
    <n-button @click="handleConfirm">
      drag dialog
    </n-button>
  </n-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage, useDialog } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    const dialog = useDialog()
    return {
      handleConfirm () {
        dialog.warning({
          title: 'Confirm',
          content: 'Are you sure?',
          positiveText: 'Sure',
          negativeText: 'Not Sure',
          draggable: true,
          onPositiveClick: () => {
            message.success('Sure')
          },
          onNegativeClick: () => {
            message.error('Not Sure')
          }
        })
      }
    }
  }
})
</script>
