<markdown>
# Customize action

Sometimes you may want to customize `action` and `content` .
</markdown>

<template>
  <n-space>
    <n-button @click="handleConfirm">
      Use Render Function
    </n-button>
  </n-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useDialog } from 'naive-ui'

export default defineComponent({
  setup () {
    const dialog = useDialog()
    return {
      handleConfirm () {
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
