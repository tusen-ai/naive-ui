<markdown>
# Press down ESC

Sometimes I just press ESC subconsciously.
</markdown>

<template>
  <n-button @click="handleButtonClick">
    Callback on ESC Clicked
  </n-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage, useDialog } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    const dialog = useDialog()

    return {
      handleButtonClick () {
        dialog.success({
          title: 'Close',
          content: 'Are you sure?',
          positiveText: 'Sure',
          negativeText: 'Not Sure',
          closeOnEsc: false,
          onEscPress: () => {
            message.success('cannot press down ESC to close')
          }
        })
      }
    }
  }
})
</script>
