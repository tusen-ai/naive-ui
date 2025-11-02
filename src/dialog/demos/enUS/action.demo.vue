<markdown>
# Customize action

Sometimes you may want to customize `action` and `content` .
</markdown>

<script lang="ts" setup>
import { useDialog } from 'naive-ui'

const dialog = useDialog()

function handleConfirm() {
  dialog.warning({
    title: 'Use Render Function',
    content: () => 'Content',
    action: () => 'Action'
  })
}
</script>

<template>
  <n-space>
    <n-button @click="handleConfirm">
      Use Render Function
    </n-button>
  </n-space>
</template>
