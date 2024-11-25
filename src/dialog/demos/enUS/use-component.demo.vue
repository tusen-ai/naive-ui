<markdown>
# Use as a component

Sometimes you may want to use a component.
</markdown>

<script lang="ts">
import { useMessage } from 'naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const message = useMessage()
    return {
      handleNegativeClick() {
        message.warning('Cancel')
      },
      handlePositiveClick() {
        message.success('Confirm')
      }
    }
  }
})
</script>

<template>
  <n-dialog
    title="Dialog"
    content="Are you sure?"
    negative-text="Cancel"
    positive-text="Submit"
    @positive-click="handlePositiveClick"
    @negative-click="handleNegativeClick"
  />
</template>
