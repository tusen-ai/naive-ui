<markdown>
# Draggable

Draggable dialog.

</markdown>
<template>
  <n-space>
    <n-button @click="handleConfirm">
      Draggable
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
          title: 'Close',
          content: 'Are you sure?',
          positiveText: 'Sure',
          negativeText: 'Not Sure',
          maskClosable: false,
          onMaskClick: () => {
            message.success('cannot close')
          },
          draggable: true
        })
      }
    }
  }
})
</script>
