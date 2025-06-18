<markdown>
# Closable

You may need this when using it in a modal.
</markdown>

<script setup lang="ts">
import { useMessage } from 'naive-ui'

const message = useMessage()
function handleClose() {
  message.info('Card Close')
}
</script>

<template>
  <n-card title="Card" closable @close="handleClose">
    Card Content
  </n-card>
</template>

<style>
.n-card {
  max-width: 300px;
}
</style>
