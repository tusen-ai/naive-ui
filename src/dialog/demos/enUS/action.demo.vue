<markdown>
# Customize action

Sometimes you may want to customize `action` and `content` .
</markdown>

<script lang="ts">
import { useDialog } from 'naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const dialog = useDialog()
    return {
      handleConfirm() {
        dialog.warning({
          title: 'Use Render Function',
          content: () => 'Content',
          action: () => 'Action'
        })
      }
    }
  }
})
</script>

<template>
  <n-space>
    <n-button @click="handleConfirm">
      Use Render Function
    </n-button>
  </n-space>
</template>
