<markdown>
# Basic

Inject `dialog` to create a dialog.
</markdown>

<template>
  <n-space>
    <n-button @click="handleConfirm">
      Confirm
    </n-button>
    <n-button @click="handleSuccess">
      Success
    </n-button>
    <n-button @click="handleError">
      Error
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
          onPositiveClick: () => {
            message.success('Sure')
          },
          onNegativeClick: () => {
            message.error('Not Sure')
          }
        })
      },
      handleSuccess () {
        dialog.success({
          title: 'Success',
          content: 'Cool',
          positiveText: 'Wow!',
          onPositiveClick: () => {
            message.success('Great!')
          }
        })
      },
      handleError () {
        dialog.error({
          title: 'Error',
          content: 'A mistake.',
          positiveText: 'Ahhh!',
          onPositiveClick: () => {
            message.success('I knew it...')
          }
        })
      }
    }
  }
})
</script>
