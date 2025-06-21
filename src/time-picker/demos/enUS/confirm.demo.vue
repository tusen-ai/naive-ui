<markdown>
# Confirm
</markdown>

<script lang="ts" setup>
import { useMessage } from 'naive-ui'

const message = useMessage()
function handleConfirm(value: number | null) {
  message.success(`Confirm${value}`)
}
</script>

<template>
  <n-space>
    <n-time-picker
      default-formatted-value="00:12:13"
      @confirm="handleConfirm"
    />
  </n-space>
</template>
